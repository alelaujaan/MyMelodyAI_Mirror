import { useMemo } from "react";

import { motion } from "framer-motion";

import { useMirrorStore } from "../../store/mirrorStore";

import { fadeAnimation } from "../../animations/fade";

export default function GreetingWidget() {

    const currentUser = useMirrorStore(
        (state) => state.currentUser
    );

    const greeting = useMemo(() => {

        const hour = new Date().getHours();

        if (hour < 12)
            return "Buenos días";

        if (hour < 20)
            return "Buenas tardes";

        return "Buenas noches";

    }, []);

    return (

        <motion.div
            {...fadeAnimation}
            className="flex flex-col items-center"
        >

            <h2 className="text-4xl font-extralight">

                {greeting}

                {currentUser ? `, ${currentUser}` : ""}

            </h2>

            <p className="mt-4 text-xl italic text-white/60">

                "Hoy va a ser un gran día ❤️"

            </p>

        </motion.div>

    );

}