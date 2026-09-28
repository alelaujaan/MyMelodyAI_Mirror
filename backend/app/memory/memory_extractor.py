import json

from ollama import chat


class MemoryExtractor:

    def __init__(self, model: str = "qwen3:4b") -> None:

        self.model = model

        self.system_prompt = """
Eres un extractor de memoria para un asistente personal llamado Luna.

Tu tarea es detectar si el mensaje del usuario contiene
información personal que pueda ser útil recordar en futuras
conversaciones.

Debes guardar solamente información estable y útil.

Ejemplos que SÍ deben guardarse:

- El usuario dice su nombre.
- El usuario indica una preferencia.
- El usuario indica algo que le gusta o no le gusta.
- El usuario proporciona información personal relevante.
- El usuario pide explícitamente que Luna recuerde algo.

Ejemplos que NO deben guardarse:

- Saludos.
- Preguntas normales.
- Conversaciones casuales.
- Información temporal.
- Opiniones sobre un tema que no sean una preferencia personal.
- Preguntas sobre Luna.

Devuelve ÚNICAMENTE JSON válido.

Si hay un recuerdo:

{
    "should_save": true,
    "key": "nombre_de_la_memoria",
    "value": "valor_de_la_memoria"
}

Si no hay ningún recuerdo:

{
    "should_save": false,
    "key": null,
    "value": null
}

La clave debe ser corta, descriptiva y estar en inglés.
El valor debe contener únicamente la información que merece
ser recordada.
"""

    def extract(self, message: str) -> dict:

        response = chat(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": self.system_prompt,
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
        )

        content = response["message"]["content"].strip()

        try:

            result = json.loads(content)

        except json.JSONDecodeError:

            return {
                "should_save": False,
                "key": None,
                "value": None,
            }

        if not isinstance(result, dict):

            return {
                "should_save": False,
                "key": None,
                "value": None,
            }

        should_save = result.get(
            "should_save",
            False,
        )

        key = result.get("key")
        value = result.get("value")

        if (
            should_save is not True
            or not isinstance(key, str)
            or not isinstance(value, str)
            or not key.strip()
            or not value.strip()
        ):

            return {
                "should_save": False,
                "key": None,
                "value": None,
            }

        return {
            "should_save": True,
            "key": key.strip(),
            "value": value.strip(),
        }


memory_extractor = MemoryExtractor()