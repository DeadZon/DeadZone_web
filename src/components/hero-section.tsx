import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Smartphone } from "lucide-react";
import { PremiumButton } from "./ui/premium-button";
import { useRouter } from "next/navigation";

export function HeroSection() {
    const [heroAlert, setHeroAlert] = useState("DeadZone v2.0 Now Available");
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data.heroAlertText) setHeroAlert(data.heroAlertText);
            } catch (err) {
                console.error("Hero fetch failed", err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-pulse"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{heroAlert}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                    >
                        Ultimate <span className="text-gradient">Performance</span><br />
                        For Your Device
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
                    >
                        DeadZone is a performance-first Android ROM optimized for MediaTek-powered Xiaomi,
                        Redmi, and Poco devices. Zero bloat, maximum efficiency.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 mb-20"
                    >
                        <PremiumButton
                            onClick={() => router.push("/download")}
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            Get Started
                        </PremiumButton>
                        <button
                            onClick={() => router.push("/features")}
                            className="px-8 py-4 glass hover:bg-white/10 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                            Learn More
                        </button>
                    </motion.div>

                    {/* Key Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {[
                            { icon: Cpu, title: "Optimized Kernel", desc: "Tuned for low latency and high responsiveness." },
                            { icon: Zap, title: "Ultra Stable", desc: "Rigorous testing for daily driver reliability." },
                            { icon: Smartphone, title: "Modern UI", desc: "Clean aesthetics with useful customizations." },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                className="p-8 rounded-3xl glass text-left group hover:bg-white/[0.05] transition-colors"
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-blue-500 w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
