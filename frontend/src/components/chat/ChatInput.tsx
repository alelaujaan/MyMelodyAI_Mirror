import { useState } from "react";

import { useMirrorStore } from "../../store/mirrorStore";

export default function ChatInput() {

    const [message, setMessage] = useState("");

    const askLuna = useMirrorStore(
        (state) => state.askLuna
    );

    const isThinking = useMirrorStore(
        (state) => state.isThinking
    );

    async function send() {

        const text = message.trim();

        if (!text) return;

        setMessage("");

        await askLuna(text);

    }

    return (

        <div className="flex w-full max-w-2xl gap-3">

            <input

                className="
                    flex-1
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-5
                    py-3
                    text-white
                    placeholder:text-gray-400
                    backdrop-blur-xl
                    outline-none
                "

                placeholder="Habla con Luna..."

                value={message}

                disabled={isThinking}

                onChange={(e) => setMessage(e.target.value)}

                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        send();

                    }

                }}

            />

            <button

                className="
                    rounded-2xl
                    bg-pink-500
                    px-6
                    text-white
                    disabled:opacity-50
                "

                disabled={isThinking}

                onClick={send}

            >

                ➜

            </button>

        </div>

    );

}