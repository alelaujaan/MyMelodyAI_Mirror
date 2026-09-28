import { useEffect } from "react";

import { useMirrorStore } from "../../store/mirrorStore";

export default function SpeechBubble() {

    const speechBubble = useMirrorStore(
        (state) => state.speechBubble
    );

    const setMirrorState = useMirrorStore(
        (state) => state.setMirrorState
    );

    useEffect(() => {
        if (!speechBubble) return;

        const timeout = setTimeout(() => {

            useMirrorStore.setState({
                speechBubble: "",
            });

            setMirrorState(useMirrorStore.getState().mirrorState);

        }, 6000);

        return () => clearTimeout(timeout);

    }, [speechBubble, setMirrorState]);

    if (!speechBubble) return null;

    return (
        <div
            className="
                absolute
                -top-24
                left-1/2
                -translate-x-1/2
                w-[min(900px,80vw)]
                rounded-3xl
                border
                border-white/10
                bg-white/10
                backdrop-blur-xl
                shadow-2xl
                px-8
                py-5
                animate-fade-in
            "
        >
            <p className="text-white text-lg text-center leading-relaxed">
                {speechBubble}
            </p>
        </div>
    );
}
