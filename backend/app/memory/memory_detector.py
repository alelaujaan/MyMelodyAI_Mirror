import re


class MemoryDetector:

    # Frases que indican claramente intención de guardar
    EXPLICIT_PATTERNS = [

        r"\brecuerda\b",
        r"\brecuerdes\b",
        r"\bno olvides\b",
        r"\bacuérdate\b",
        r"\bacuerdate\b",

    ]

    # Frases que normalmente contienen información personal
    PERSONAL_PATTERNS = [

        r"\bme llamo\b",
        r"\bmi nombre es\b",
        r"\bsoy\b",

        r"\bme gusta\b",
        r"\bme encanta\b",
        r"\bno me gusta\b",
        r"\bodio\b",

        r"\bmi comida favorita\b",
        r"\bmi bebida favorita\b",
        r"\bmi película favorita\b",
        r"\bmi musica favorita\b",
        r"\bmi música favorita\b",
        r"\bmi serie favorita\b",

        r"\btrabajo en\b",
        r"\btrabajo de\b",
        r"\bvivo en\b",

    ]

    def should_check(self, message: str) -> bool:

        text = message.lower().strip()

        if not text:
            return False

        # ---------------------------------
        # Memoria explícita
        # ---------------------------------

        for pattern in self.EXPLICIT_PATTERNS:

            if re.search(pattern, text):

                return True

        # ---------------------------------
        # Información personal
        # ---------------------------------

        for pattern in self.PERSONAL_PATTERNS:

            if re.search(pattern, text):

                return True

        return False


memory_detector = MemoryDetector()