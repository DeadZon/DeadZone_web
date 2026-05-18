"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { HeroSection } from "@/components/hero-section";
import { motion } from "framer-motion";
import { AlertTriangle, Battery, Cpu, Gamepad2, Lock, Network, Palette, RadioTower, Shield, Sparkles, Trophy, Zap } from "lucide-react";
import { GlassCard, NeonDivider, PlatformPill, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { PremiumButton } from "@/components/ui/premium-button";
import { allDevices, mtkDevices, snapdragonDevices } from "@/data/deadzone-devices";
import { useRouter } from "next/navigation";
import { DeviceImage } from "@/components/device-image";

const promise = [
    "Stability",
    "Performance",
    "Battery Optimization",
    "Gaming Experience",
    "Smooth UI/UX",
    "Better Connectivity",
    "Exclusive Mods",
    "CN Features Integration",
];

const flavors = [
    { name: "DeadZone Stable", accent: "cyan" as const, icon: Shield, desc: "Daily-driver builds focused on stability, smoothness, and core reliability." },
    { name: "DeadZone Gaming", accent: "magenta" as const, icon: Gamepad2, desc: "Latency-aware tuning, thermal discipline, and a sharper gaming profile." },
    { name: "DeadZone EPiC", accent: "blue" as const, icon: Sparkles, desc: "Electric feature channel for enhanced UI, mods, and enthusiast controls." },
    { name: "DeadZone Legend", accent: "gold" as const, icon: Trophy, desc: "Premium gold channel for flagship presentation and exclusive release polish." },
];

const mainFeatures = [
    { title: "System Optimized", icon: Zap, accent: "cyan" as const, desc: "UI responsiveness, performance tuning, battery behavior, and daily-driver smoothness are treated as first-class engineering targets." },
    { title: "Gaming Focused", icon: Gamepad2, accent: "magenta" as const, desc: "Performance profiles, frame-rate unlock-ready workflows, and lower-latency interaction tuning for devices that can handle it." },
    { title: "Fully Secure", icon: Lock, accent: "blue" as const, desc: "Privacy-minded defaults, stability checks, clear flashing notes, and careful integrity language without promising unsupported banking bypasses." },
];

const showcaseCodenames = ["zircon", "garnet", "xaga", "marble"];

const core = [
    { label: "Performance", icon: Zap, accent: "cyan" as const },
    { label: "Stability", icon: Shield, accent: "blue" as const },
    { label: "Customization", icon: Palette, accent: "magenta" as const },
    { label: "Battery", icon: Battery, accent: "gold" as const },
    { label: "Connectivity", icon: Network, accent: "purple" as const },
    { label: "Security", icon: Lock, accent: "cyan" as const },
];

export default function Home() {
    const router = useRouter();

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />
            <HeroSection />

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="DeadZone Core"
                        title="Refine your HyperOS experience."
                        description="A polished ROM-site path rebuilt for DeadZone's cyberpunk engineering identity and real device matrix."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {mainFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                            >
                                <GlassCard accent={feature.accent} className="h-full p-6 md:p-7">
                                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-current/25 bg-white/[0.05]">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white">{feature.title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-zinc-400">{feature.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Device Showcase"
                        title="Real hardware, DeadZone presentation."
                        description="Featured devices use local product images when available, with a premium fallback so the showcase never breaks."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {showcaseCodenames.map((codename, index) => {
                            const device = allDevices.find((item) => item.codename === codename);
                            if (!device) return null;

                            return (
                                <motion.div
                                    key={device.codename}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                >
                                    <GlassCard accent={device.soc === "MTK" ? "purple" : "blue"} className="h-full p-5">
                                        <DeviceImage codename={device.codename} name={device.name} src={device.image} alt={device.imageAlt} soc={device.soc} priority={index === 0} />
                                        <h3 className="mt-5 text-lg font-black text-white">{device.name}</h3>
                                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <RomBadge accent={device.soc === "MTK" ? "purple" : "blue"}>{device.soc}</RomBadge>
                                            <RomBadge accent={device.status === "coming_soon" ? "slate" : "cyan"}>{device.status === "coming_soon" ? "Coming Soon" : "Stable"}</RomBadge>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="DeadZone Promise"
                        title="Premium ROM engineering without the generic template feel."
                        description="The public site now frames DeadZone as a serious HyperOS engineering program, not just another download page."
                        align="center"
                    />
                    <GlassCard accent="cyan" className="p-5 md:p-7">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {promise.map((item, index) => (
                                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Core {String(index + 1).padStart(2, "0")}</p>
                                    <p className="mt-2 text-sm font-black text-white">{item}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="ROM Channels"
                        title="Stable, Gaming, EPiC, and Legend."
                        description="Each flavor has a distinct visual signal so releases can feel premium while staying easy to scan."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {flavors.map((flavor, index) => (
                            <motion.div
                                key={flavor.name}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                            >
                                <GlassCard accent={flavor.accent} className="h-full p-6">
                                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-current/25 bg-white/[0.05]">
                                        <flavor.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-black text-white">{flavor.name}</h3>
                                    <p className="mt-3 text-sm leading-7 text-zinc-400">{flavor.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Wide Device Support"
                        title="Separated MTK and Snapdragon support matrix."
                        description="Device coverage comes from the local MEZO registry and remains available even when the web database is not configured."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <GlassCard accent="purple" className="p-6">
                            <RadioTower className="mb-6 h-8 w-8 text-purple-200" />
                            <p className="text-5xl font-black text-white">{mtkDevices.length}</p>
                            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">MTK Devices</p>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-6">
                            <Cpu className="mb-6 h-8 w-8 text-blue-200" />
                            <p className="text-5xl font-black text-white">{snapdragonDevices.length}</p>
                            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Snapdragon Devices</p>
                        </GlassCard>
                        <GlassCard accent="cyan" className="p-6">
                            <Sparkles className="mb-6 h-8 w-8 text-cyan-200" />
                            <p className="text-5xl font-black text-white">{allDevices.length}</p>
                            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Total Matrix</p>
                        </GlassCard>
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <PremiumButton variant="secondary" onClick={() => router.push("/devices?soc=MTK")}>View MTK Devices</PremiumButton>
                        <PremiumButton variant="secondary" onClick={() => router.push("/devices?soc=Snapdragon")}>View Snapdragon Devices</PremiumButton>
                        <PremiumButton onClick={() => router.push("/devices")}>View All Devices</PremiumButton>
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Engineering Core" title="The core signals users expect from a serious ROM." align="center" />
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                        {core.map((item) => (
                            <PlatformPill key={item.label} accent={item.accent}>
                                <item.icon className="mr-2 h-4 w-4" /> {item.label}
                            </PlatformPill>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
                    <GlassCard accent="gold" className="p-7">
                        <RomBadge accent="gold">Paid ROM</RomBadge>
                        <h2 className="mt-5 text-3xl font-black text-white">One-time payment premium channel.</h2>
                        <p className="mt-4 text-sm leading-7 text-zinc-300">
                            DeadZone premium releases can be presented as a serious paid ROM program with one-time payment positioning, support clarity, and build provenance.
                        </p>
                    </GlassCard>
                    <GlassCard accent="cyan" className="p-7">
                        <RomBadge accent="cyan">Later Stage</RomBadge>
                        <h2 className="mt-5 text-3xl font-black text-white">Free version planned after maturity.</h2>
                        <p className="mt-4 text-sm leading-7 text-zinc-300">
                            The site can communicate free-stage availability without publishing fake links or pretending builds are live before they are ready.
                        </p>
                    </GlassCard>
                </div>
            </section>

            <NeonDivider />

            <section className="px-6 py-14 pb-24">
                <div className="mx-auto max-w-5xl">
                    <GlassCard accent="red" className="p-6 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10">
                                <AlertTriangle className="h-7 w-7 text-red-200" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Flash at your own risk.</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    Installing custom ROMs can wipe data or damage a device when done incorrectly. Back up your files, unlock the bootloader, verify your build, and follow the install notes for your exact codename.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
