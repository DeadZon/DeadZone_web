"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Download, Flame, Send, ShieldCheck, Smartphone } from "lucide-react";
import { PremiumButton } from "./ui/premium-button";
import { useRouter } from "next/navigation";
import { GlassCard, RomBadge } from "./ui/deadzone";

export function HeroSection() {
    const [heroAlert, setHeroAlert] = useState("DeadZone release channel online");
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
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36 lg:pb-24">
            <div className="deadzone-grid pointer-events-none absolute inset-x-0 top-0 h-[680px] opacity-40" />
            <div className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px] md:h-[520px] md:w-[520px]" />

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 backdrop-blur-xl"
                    >
                        <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.9)]" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">{heroAlert}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.7 }}
                        className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl"
                    >
                        DeadZone ROM for serious Android performance.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16, duration: 0.7 }}
                        className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
                    >
                        A cinematic, gaming-ready ROM foundation for Snapdragon and MTK devices. Clean builds, clear metadata, verified downloads, and a dashboard built for real release operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24, duration: 0.7 }}
                        className="mt-9 grid gap-3 sm:flex sm:flex-wrap"
                    >
                        <PremiumButton onClick={() => router.push("/download")} icon={<Download className="h-5 w-5" />}>
                            Download ROMs
                        </PremiumButton>
                        <PremiumButton variant="secondary" onClick={() => router.push("/download")} icon={<Smartphone className="h-5 w-5" />}>
                            View Supported Devices
                        </PremiumButton>
                        <PremiumButton variant="secondary" onClick={() => router.push("/community")} icon={<Send className="h-5 w-5" />}>
                            Join Telegram
                        </PremiumButton>
                    </motion.div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <RomBadge>DeadZone Base</RomBadge>
                        <RomBadge>Gaming</RomBadge>
                        <RomBadge>EPiC</RomBadge>
                        <RomBadge>Legend</RomBadge>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.8 }}
                    className="relative"
                >
                    <GlassCard className="p-5 sm:p-6">
                        <div className="rounded-[1.5rem] border border-white/10 bg-black/50 p-5">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
                                        <Flame className="h-6 w-6 text-red-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-[0.18em] text-white">DeadZone Control</p>
                                        <p className="text-xs text-zinc-500">Release pipeline preview</p>
                                    </div>
                                </div>
                                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                                    Stable
                                </span>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { icon: Cpu, label: "Platform", value: "Snapdragon / MTK" },
                                    { icon: ShieldCheck, label: "Integrity", value: "SHA-256 checksums" },
                                    { icon: ArrowRight, label: "Flow", value: "Actions -> Release -> Install" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5 text-red-300" />
                                            <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">{item.label}</span>
                                        </div>
                                        <span className="text-right text-sm font-bold text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">Flash warning</p>
                                <p className="mt-2 text-sm leading-6 text-zinc-300">Unlock bootloader, back up data, and read install notes before flashing.</p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
