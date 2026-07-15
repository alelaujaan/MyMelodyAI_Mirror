import { motion } from "framer-motion";

type GlassCardProps = {

    children: React.ReactNode;

    className?: string;

};

export default function GlassCard({

    children,

    className = "",

}: GlassCardProps) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 25,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.45,
            }}

            className={`
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                shadow-2xl
                p-6
                ${className}
            `}

        >

            {children}

        </motion.div>

    );

}