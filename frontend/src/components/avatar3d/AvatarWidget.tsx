import AvatarScene from "./AvatarScene";
import SpeechBubble from "./SpeechBubble";

import { useMirrorStore } from "../../store/mirrorStore";

export default function AvatarWidget() {

    const askLuna = useMirrorStore(
        (state) => state.askLuna
    );

    return (

        <div className="relative w-full h-full flex flex-col items-center">

            <SpeechBubble />

            <div className="w-full h-[600px]">

                <AvatarScene />

            </div>

            <button
                className="
                    mt-6
                    rounded-xl
                    bg-pink-500
                    px-5
                    py-2
                    text-white
                    transition
                    hover:bg-pink-400
                "
                onClick={() => askLuna("Hola Luna")}
            >
                Hablar con Luna
            </button>

        </div>

    );

}