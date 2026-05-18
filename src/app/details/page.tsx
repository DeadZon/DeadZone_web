"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { BookOpen, Cpu, Download, Github, History, MessageCircle, ShieldCheck, Sparkles, Globe2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const resources = [
    {
        title: "HyperOS 3 / China Features",
        desc: "DeadZone tracks HyperOS 3 behavior, CN feature integration, and device-specific polish without copying another ROM identity.",
        href: "/features",
        icon: Sparkles,
        accent: "magenta" as const,
    },
    {
        title: "Global Base Integration",
        desc: "Global ROM base workflows stay visible so users understand the build foundation before flashing.",
        href: "/devices",
        icon: Globe2,
        accent: "cyan" as const,
    },
    {
        title: "Installation Guide",
        desc: "Safe flashing notes, bootloader reminders, backup warnings, and codename verification.",
        href: "/installation",
        icon: BookOpen,
        accent: "blue" as const,
    },
    {
        title: "Changelog",
        desc: "Release notes are surfaced per ROM when builds are registered in the DeadZone dashboard.",
        href: "/download",
        icon: History,
        accent: "purple" as const,
    },
    {
        title: "Community Chat",
        desc: "Telegram/community entry points for support, feedback, and release discussion.",
        href: "/community",
        icon: MessageCircle,
        accent: "cyan" as const,
    },
    {
        title: "GitHub Releases",
        desc: "Repository and release automation references for public build artifacts when available.",
        href: "https://github.com/DeadZon/DeadZone_web",
        icon: Github,
        accent: "blue" as const,
    },
    {
        title: "PixelDrain Archive",
        desc: "Download mirrors appear only when real ROM records provide PixelDrain URLs.",
        href: "/download",
        icon: Download,
        accent: "cyan" as const,
    },
    {
        title: "Acknowledgments",
        desc: "Credits and build ecosystem notes for contributors, testers, and upstream Android work.",
        href: "/team",
        icon: ShieldCheck,
        accent: "gold" as const,
    },
];

export default function DetailsPage() {
    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Resources"
                        title={<>DeadZone <span className="text-gradient">details hub</span>.</>}
                        description="Engineering notes, release resources, install paths, community links, and support status in one premium ROM hub."
                        align="center"
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {resources.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                            >
                                <Link href={item.href} className="group block h-full">
                                    <GlassCard accent={item.accent} className="h-full p-6 transition-all group-hover:border-cyan-300/35">
                                        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-current/25 bg-white/[0.05]">
                                            <item.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-xl font-black text-white">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-zinc-400">{item.desc}</p>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                        <GlassCard accent="cyan" className="p-7 md:p-8">
                            <RomBadge accent="cyan">Support DeadZone Development</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white">Support channels are coming soon.</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                DeadZone will publish clean support instructions when they are ready. For now, contact the team through Telegram or community channels. No bank, card, or payment details are hardcoded on the site.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Link href="/community" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                    <MessageCircle className="h-4 w-4" /> Community
                                </Link>
                                <Link href="/download" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.16em] text-white">
                                    <Download className="h-4 w-4" /> Downloads
                                </Link>
                            </div>
                        </GlassCard>

                        <GlassCard accent="gold" className="p-7 md:p-8">
                            <RomBadge accent="gold">Engineering Guardrails</RomBadge>
                            <div className="mt-6 space-y-4">
                                {[
                                    ["Codename first", "Every download page repeats the exact device codename before flashing."],
                                    ["No fake mirrors", "DeadZone only shows PixelDrain, GitHub, or backup links that exist in release data."],
                                    ["Careful security language", "Stability and privacy notes are presented without unsupported banking or integrity promises."],
                                ].map(([title, desc]) => (
                                    <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <h3 className="flex items-center gap-2 text-sm font-black text-white">
                                            <Cpu className="h-4 w-4 text-cyan-300" /> {title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-zinc-400">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
