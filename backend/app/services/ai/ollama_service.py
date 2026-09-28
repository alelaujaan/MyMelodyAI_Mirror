import os
import time
from pathlib import Path

from ollama import Client

from app.memory.conversation_database import conversation_database
from app.memory.long_term_memory import long_term_memory
from app.memory.memory_detector import memory_detector
from app.memory.memory_extractor import memory_extractor
from app.memory.complexity_detector import complexity_detector


class OllamaService:

    def __init__(
        self,
        model: str = "qwen3:4b-instruct",
    ) -> None:

        self.model = model

        # ========================================================
        # OLLAMA
        # ========================================================

        self.ollama_host = os.getenv(
            "OLLAMA_HOST",
            "http://localhost:11434",
        )

        self.client = Client(
            host=self.ollama_host
        )

        print(
            f"[OLLAMA] Host: {self.ollama_host}"
        )

        print(
            f"[OLLAMA] Modelo: {self.model}"
        )

        self.system_prompt = self._load_system_prompt()

    # ============================================================
    # SYSTEM PROMPT
    # ============================================================

    def _load_system_prompt(self) -> str:

        prompt_path = (
            Path(__file__).parent
            / "prompts"
            / "luna_system.txt"
        )

        return prompt_path.read_text(
            encoding="utf-8"
        ).strip()

    # ============================================================
    # MEMORIA A LARGO PLAZO
    # ============================================================

    def _build_memory_context(self) -> str:

        memories = long_term_memory.get_all()

        if not memories:
            return ""

        lines = []

        for memory in memories:

            lines.append(
                f"- {memory['key']}: {memory['value']}"
            )

        return (
            "\n\n"
            "MEMORIA A LARGO PLAZO DEL USUARIO:\n"
            + "\n".join(lines)
            + "\n"
        )

    # ============================================================
    # LIMPIEZA DE RESPUESTA
    # ============================================================

    def _clean_response(
        self,
        answer: str,
    ) -> str:
        """
        Limpia respuestas de Qwen que puedan contener
        razonamiento interno o bloques <think>.
        """

        if not answer:
            return ""

        answer = answer.strip()

        # --------------------------------------------------------
        # Caso principal:
        #
        # razonamiento...
        # </think>
        #
        # respuesta final
        # --------------------------------------------------------

        if "</think>" in answer:

            answer = answer.split(
                "</think>",
                1,
            )[1]

        # --------------------------------------------------------
        # Eliminar etiquetas residuales
        # --------------------------------------------------------

        answer = answer.replace(
            "<think>",
            "",
        )

        answer = answer.replace(
            "</think>",
            "",
        )

        return answer.strip()

    # ============================================================
    # GENERATE
    # ============================================================

    def generate(
        self,
        message: str,
    ) -> str:

        total_start = time.perf_counter()

        # ========================================================
        # 1. COMPLEJIDAD
        # ========================================================

        start = time.perf_counter()

        max_tokens = complexity_detector.detect(
            message
        )

        complexity_time = (
            time.perf_counter()
            - start
        )

        print(
            f"[LATENCIA] ComplexityDetector: "
            f"{complexity_time:.4f}s"
        )

        print(
            f"[QWEN] Presupuesto de tokens: "
            f"{max_tokens}"
        )

        # ========================================================
        # 2. GUARDAR MENSAJE DEL USUARIO
        # ========================================================

        start = time.perf_counter()

        conversation_database.add_message(
            role="user",
            content=message,
        )

        print(
            f"[LATENCIA] Guardado usuario: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 3. DETECTOR DE MEMORIA
        # ========================================================

        start = time.perf_counter()

        should_extract_memory = (
            memory_detector.should_check(
                message
            )
        )

        print(
            f"[LATENCIA] MemoryDetector: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 4. EXTRACTOR DE MEMORIA
        # ========================================================

        if should_extract_memory:

            start = time.perf_counter()

            try:

                extracted_memories = (
                    memory_extractor.extract(
                        message
                    )
                )

                for memory in extracted_memories:

                    long_term_memory.add(
                        key=memory["key"],
                        value=memory["value"],
                    )

            except Exception as error:

                print(
                    f"[MEMORY ERROR] {error}"
                )

            print(
                f"[LATENCIA] MemoryExtractor: "
                f"{time.perf_counter() - start:.4f}s"
            )

        else:

            print(
                "[LATENCIA] MemoryExtractor: omitido"
            )

        # ========================================================
        # 5. CONSTRUIR CONTEXTO DE MEMORIA
        # ========================================================

        start = time.perf_counter()

        memory_context = (
            self._build_memory_context()
        )

        print(
            f"[LATENCIA] Construcción contexto: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 6. HISTORIAL RECIENTE
        # ========================================================

        start = time.perf_counter()

        history = conversation_database.get_messages(
            limit=4
        )

        print(
            f"[LATENCIA] Historial SQLite: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 7. CONSTRUIR MENSAJES
        # ========================================================

        start = time.perf_counter()

        messages = [

            {
                "role": "system",
                "content": (
                    self.system_prompt
                    + memory_context
                ),
            },

            *history,

        ]

        print(
            f"[LATENCIA] Construcción mensajes: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 8. LLAMADA A OLLAMA
        # ========================================================
        #
        # think=False evita que Qwen3 utilice el presupuesto
        # de salida para razonamiento interno.
        #
        # En local:
        #   OLLAMA_HOST=http://localhost:11434
        #
        # En Docker:
        #   OLLAMA_HOST=http://ollama:11434
        # ========================================================

        start = time.perf_counter()

        response = self.client.chat(

            model=self.model,

            messages=messages,

            think=False,

            options={
                "num_predict": max_tokens,
            },

        )

        qwen_time = (
            time.perf_counter()
            - start
        )

        print(
            f"[LATENCIA] Qwen respuesta: "
            f"{qwen_time:.2f}s"
        )

        # ========================================================
        # 9. INFORMACIÓN DE DEBUG
        # ========================================================

        done_reason = getattr(
            response,
            "done_reason",
            None,
        )

        print(
            f"[QWEN] done_reason="
            f"{done_reason}"
        )

        # ========================================================
        # 10. EXTRAER RESPUESTA RAW
        # ========================================================

        try:

            raw_answer = (
                response["message"]["content"]
                or ""
            )

        except Exception:

            raw_answer = ""

        print(
            f"[QWEN RAW LENGTH] "
            f"{len(raw_answer)} caracteres"
        )

        print(
            f"[QWEN RAW] "
            f"{raw_answer!r}"
        )

        # ========================================================
        # 11. LIMPIAR RESPUESTA
        # ========================================================

        start = time.perf_counter()

        answer = self._clean_response(
            raw_answer
        )

        print(
            f"[LATENCIA] Limpieza respuesta: "
            f"{time.perf_counter() - start:.4f}s"
        )

        print(
            f"[QWEN CLEAN] "
            f"{answer!r}"
        )

        # ========================================================
        # 12. GUARDAR RESPUESTA DE LUNA
        # ========================================================

        start = time.perf_counter()

        conversation_database.add_message(
            role="assistant",
            content=answer,
        )

        print(
            f"[LATENCIA] Guardado respuesta: "
            f"{time.perf_counter() - start:.4f}s"
        )

        # ========================================================
        # 13. LATENCIA TOTAL
        # ========================================================

        total_time = (
            time.perf_counter()
            - total_start
        )

        print(
            "[LATENCIA] ============================="
        )

        print(
            f"[LATENCIA] TOTAL: "
            f"{total_time:.2f}s"
        )

        print(
            "[LATENCIA] ============================="
        )

        return answer

    # ============================================================
    # LIMPIAR MEMORIA
    # ============================================================

    def clear_memory(self):

        conversation_database.clear()


# ================================================================
# INSTANCIA GLOBAL
# ================================================================

ollama_service = OllamaService()