import { create } from "zustand";

import { MirrorState } from "./mirrorTypes";
import type { AvatarState } from "./mirrorTypes";

import { avatarFromMirrorState } from "./mirrorActions";
import { sendMessage } from "../services/chatService";

interface MirrorStore {
    mirrorState: MirrorState;

    avatarState: AvatarState;

    currentUser: string | null;

    privacyMode: boolean;

    speechBubble: string;

    isThinking: boolean;

    setMirrorState: (state: MirrorState) => void;

    setCurrentUser: (user: string | null) => void;

    togglePrivacyMode: () => void;

    askLuna: (message: string) => Promise<void>;
}

export const useMirrorStore = create<MirrorStore>((set) => ({

    mirrorState: MirrorState.BOOTING,

    avatarState: "idle",

    currentUser: null,

    privacyMode: false,

    speechBubble: "",

    isThinking: false,

    setMirrorState: (state) =>
        set({
            mirrorState: state,
            avatarState: avatarFromMirrorState(state),
        }),

    setCurrentUser: (user) =>
        set({
            currentUser: user,
        }),

    togglePrivacyMode: () =>
        set((state) => ({
            privacyMode: !state.privacyMode,
        })),

    askLuna: async (message: string) => {

        set({
            isThinking: true,
            avatarState: "thinking",
        });

        try {

            const response = await sendMessage(message);

            set({
                speechBubble: response.message,
                avatarState: "talking",
                isThinking: false,
            });

            // Aproximadamente 14 caracteres por segundo
            const talkingTime = Math.max(
                1500,
                Math.min(
                    8000,
                    response.message.length * 70
                )
            );

            await new Promise((resolve) =>
                setTimeout(resolve, talkingTime)
            );

            set({
                avatarState: "idle",
            });

        } catch (error) {

            console.error(error);

            set({
                speechBubble: "Lo siento, ha ocurrido un error.",
                avatarState: "idle",
                isThinking: false,
            });

        }

    },

}));