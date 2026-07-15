export const MirrorState = {

    BOOTING: "BOOTING",

    WAITING_PRESENCE: "WAITING_PRESENCE",

    USER_DETECTED: "USER_DETECTED",

    USER_IDENTIFIED: "USER_IDENTIFIED",

    GUEST_MODE: "GUEST_MODE",

    READY: "READY",

    LISTENING: "LISTENING",

    THINKING: "THINKING",

    TALKING: "TALKING",

    PRIVACY: "PRIVACY",

    SLEEPING: "SLEEPING",

} as const;

export type MirrorState =
    (typeof MirrorState)[keyof typeof MirrorState];

export const AvatarStates = {

    IDLE: "idle",

    HAPPY: "happy",

    LISTENING: "listening",

    THINKING: "thinking",

    TALKING: "talking",

    SLEEPING: "sleeping",

} as const;

export type AvatarState =
    (typeof AvatarStates)[keyof typeof AvatarStates];