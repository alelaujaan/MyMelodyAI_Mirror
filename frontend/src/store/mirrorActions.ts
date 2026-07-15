import { MirrorState } from "./mirrorTypes";

export function avatarFromMirrorState(
    state: MirrorState
) {
    switch (state) {

        case MirrorState.BOOTING:
            return "idle";

        case MirrorState.WAITING_PRESENCE:
            return "sleeping";

        case MirrorState.USER_DETECTED:
            return "happy";

        case MirrorState.USER_IDENTIFIED:
            return "happy";

        case MirrorState.READY:
            return "idle";

        case MirrorState.LISTENING:
            return "listening";

        case MirrorState.THINKING:
            return "thinking";

        case MirrorState.TALKING:
            return "talking";

        case MirrorState.PRIVACY:
            return "sleeping";

        case MirrorState.SLEEPING:
            return "sleeping";

        default:
            return "idle";
    }
}