import { create } from "zustand";

import { MirrorState } from "./mirrorTypes";
import type { AvatarState } from "./mirrorTypes";
import { avatarFromMirrorState } from "./mirrorActions";

interface MirrorStore {

    mirrorState: MirrorState;

    avatarState: AvatarState;

    currentUser: string | null;

    privacyMode: boolean;

    setMirrorState: (state: MirrorState) => void;

    setCurrentUser: (user: string | null) => void;

    togglePrivacyMode: () => void;

}

export const useMirrorStore = create<MirrorStore>((set) => ({

    mirrorState: MirrorState.BOOTING,

    avatarState: "idle",

    currentUser: null,

    privacyMode: false,

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

}));