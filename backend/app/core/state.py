from enum import Enum


class MirrorState(str, Enum):
    """
    Global states of the mirror.

    The entire application revolves around these states.
    """

    BOOTING = "BOOTING"

    IDLE = "IDLE"

    PRESENCE_DETECTED = "PRESENCE_DETECTED"

    RECOGNIZING_FACE = "RECOGNIZING_FACE"

    USER_RECOGNIZED = "USER_RECOGNIZED"

    GUEST_MODE = "GUEST_MODE"

    SHOWING_INFORMATION = "SHOWING_INFORMATION"

    LISTENING = "LISTENING"

    THINKING = "THINKING"

    SPEAKING = "SPEAKING"

    MAKEUP_MODE = "MAKEUP_MODE"

    PRIVACY_MODE = "PRIVACY_MODE"

    NIGHT_MODE = "NIGHT_MODE"

    SLEEPING = "SLEEPING"

    ERROR = "ERROR"