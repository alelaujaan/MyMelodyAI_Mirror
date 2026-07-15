import "./Avatar.css";

import { motion } from "framer-motion";

import { useMirrorStore } from "../../store/mirrorStore";
import { avatarAnimation } from "../../animations/avatar";

export default function AvatarWidget() {

    const avatarState = useMirrorStore(
        (state) => state.avatarState
    );

    return (

        <motion.div
            className="avatar-container"
            animate={avatarAnimation[avatarState]}
            transition={{
                duration: 0.45,
                ease: "easeInOut",
            }}
        >

            <div className="flex flex-col items-center">

                <motion.img
                    src="/avatar-placeholder.png"
                    alt="Avatar"
                    className="w-64 select-none"
                    draggable={false}
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <p className="mt-6 text-lg text-pink-300 font-light">

                    Estado: {avatarState}

                </p>

            </div>

        </motion.div>

    );

}