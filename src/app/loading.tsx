"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#030203]">
            {/* Background elements to match the site theme */}
            <div className="absolute inset-0 bg-mesh opacity-50" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-red-700 to-zinc-950 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-600/20 mb-8 border border-red-400/25"
                >
                    <Flame className="text-red-100 w-12 h-12" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-2"
                >
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        Dead<span className="text-red-400">Zone</span>
                    </h2>
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                className="w-1.5 h-1.5 rounded-full bg-red-500"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
