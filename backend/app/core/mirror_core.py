from app.core.state import MirrorState


class MirrorCore:
    """
    Central brain of MirrorAI.

    Responsible for managing the current state of the system.
    """

    def __init__(self):
        self._state = MirrorState.BOOTING

    @property
    def state(self) -> MirrorState:
        return self._state

    def set_state(self, state: MirrorState):
        self._state = state