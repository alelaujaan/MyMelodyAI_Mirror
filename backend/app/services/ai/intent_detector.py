import re


class IntentDetector:

    def detect(self, message: str) -> str | None:

        text = message.lower().strip()

        # -----------------------------------------
        # FECHA ACTUAL
        # -----------------------------------------

        if re.search(
            r"\b("
            r"qué día es hoy|"
            r"que día es hoy|"
            r"qué dia es hoy|"
            r"que dia es hoy|"
            r"dime qué día es hoy|"
            r"dime que día es hoy|"
            r"dime qué dia es hoy|"
            r"dime que dia es hoy"
            r")\b",
            text,
        ):
            return "current_date"

        return None


intent_detector = IntentDetector()