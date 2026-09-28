import re


class ComplexityDetector:

    # ---------------------------------
    # Preguntas claramente complejas
    # ---------------------------------

    COMPLEX_PATTERNS = [

        r"\bexplica\b",
        r"\bexplícame\b",
        r"\bexplicame\b",

        r"\banaliza\b",
        r"\banalizar\b",

        r"\bcompara\b",
        r"\bcomparar\b",

        r"\brazona\b",
        r"\brazonar\b",

        r"\bdetalla\b",
        r"\bdetalladamente\b",

        r"\bpaso a paso\b",

        r"\bcómo funciona\b",
        r"\bcomo funciona\b",

        r"\bpor qué\b",
        r"\bpor que\b",

        r"\bdiferencia entre\b",

        r"\bventajas y desventajas\b",

        r"\bpros y contras\b",

        r"\barquitectura\b",

        r"\bdiseña\b",
        r"\bdiseñar\b",

        r"\bsoluciona\b",
        r"\bsolucionar\b",

        r"\bresuelve\b",
        r"\bresolver\b",

        r"\bproblema\b",

        r"\berror\b",

    ]

    # ---------------------------------
    # Preguntas informativas
    # ---------------------------------

    INFORMATION_PATTERNS = [

        r"\bqué es\b",
        r"\bque es\b",

        r"\bqué son\b",
        r"\bque son\b",

        r"\bpara qué sirve\b",
        r"\bpara que sirve\b",

        r"\bpara qué se usa\b",
        r"\bpara que se usa\b",

        r"\bqué significa\b",
        r"\bque significa\b",

    ]

    def detect(self, message: str) -> int:

        # ---------------------------------
        # Normalización
        # ---------------------------------

        text = message.lower().strip()

        print(
            f"[COMPLEXITY] Mensaje: {message!r}"
        )

        print(
            f"[COMPLEXITY] Normalizado: {text!r}"
        )

        # ---------------------------------
        # Mensaje vacío
        # ---------------------------------

        if not text:

            print(
                "[COMPLEXITY] Resultado: 256"
            )

            return 256

        # ---------------------------------
        # 1. Patrones complejos
        # ---------------------------------

        for pattern in self.COMPLEX_PATTERNS:

            if re.search(pattern, text):

                print(
                    f"[COMPLEXITY] "
                    f"Patrón complejo: {pattern}"
                )

                print(
                    "[COMPLEXITY] Resultado: 1024"
                )

                return 1024

        # ---------------------------------
        # 2. Preguntas informativas
        # ---------------------------------

        for pattern in self.INFORMATION_PATTERNS:

            if re.search(pattern, text):

                print(
                    f"[COMPLEXITY] "
                    f"Patrón informativo: {pattern}"
                )

                print(
                    "[COMPLEXITY] Resultado: 512"
                )

                return 1024

        # ---------------------------------
        # 3. Mensajes muy largos
        # ---------------------------------

        words = text.split()

        print(
            f"[COMPLEXITY] "
            f"Número de palabras: {len(words)}"
        )

        if len(words) >= 40:

            print(
                "[COMPLEXITY] "
                "Mensaje muy largo"
            )

            print(
                "[COMPLEXITY] Resultado: 1024"
            )

            return 4096

        # ---------------------------------
        # 4. Mensajes medianamente largos
        # ---------------------------------

        if len(words) >= 20:

            print(
                "[COMPLEXITY] "
                "Mensaje medianamente largo"
            )

            print(
                "[COMPLEXITY] Resultado: 512"
            )

            return 1024

        # ---------------------------------
        # 5. Varias preguntas
        # ---------------------------------

        question_marks = text.count("?")

        print(
            f"[COMPLEXITY] "
            f"Número de preguntas: {question_marks}"
        )

        if question_marks >= 2:

            print(
                "[COMPLEXITY] "
                "Varias preguntas detectadas"
            )

            print(
                "[COMPLEXITY] Resultado: 512"
            )

            return 2048

        # ---------------------------------
        # 6. Mensaje normal de longitud media
        # ---------------------------------

        if len(words) >= 10:

            print(
                "[COMPLEXITY] "
                "Mensaje de longitud media"
            )

            print(
                "[COMPLEXITY] Resultado: 512"
            )

            return 1024

        # ---------------------------------
        # 7. Mensaje corto
        # ---------------------------------

        print(
            "[COMPLEXITY] "
            "Mensaje corto"
        )

        print(
            "[COMPLEXITY] Resultado: 256"
        )

        return 512


complexity_detector = ComplexityDetector()