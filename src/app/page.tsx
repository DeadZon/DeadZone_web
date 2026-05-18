"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { HeroSection } from "@/components/hero-section";
import { motion } from "framer-motion";
import { AlertTriangle, Cpu, Download, Gamepad2, Github, Shield, Sparkles, Trophy, Wrench } from "lucide-react";
import { GlassCard, PlatformPill, RomBadge, SectionHeader } from "@/components/ui/deadzone";

const flavors = [
    { name: "DeadZone Base", icon: Shield, desc: "Clean daily-driver builds with balanced performance, battery, and stability." },
    { name: "DeadZone Gaming", icon: Gamepad2, desc: "Tuned for low latency, thermal awareness, and focused gaming sessions." },
    { name: "DeadZone EPiC", icon: Sparkles, desc: "Feature-rich builds for users who want extra customization and polish." },
    { name: "DeadZone Legend", icon: Trophy, desc: "Flagship-style release track for premium devices and showcase builds." },
];

const flow = [
    { title: "GitHub Actions", desc: "Builds are tracked from CI so maintainers can link every release to its run.", icon: Github },
    { title: "PixelDrain / GitHub Release", desc: "Downloads point to clear external release mirrors with optional checksums.", icon: Download },
    { title: "Install", desc: "Flash type, platform notes, changelog, and warnings stay visible before download.", icon: Wrench },
];

export default function Home() {
    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />
            <HeroSection />

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="ROM Flavors"
                        title="Four tracks. One DeadZone identity."
                        description="DeadZone can present different build flavors without splitting the site or admin workflow."
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
                                <GlassCard className="h-full p-6">
                                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
                                        <flavor.icon className="h-7 w-7 text-red-200" />
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
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <SectionHeader
                        eyebrow="Supported Platforms"
                        title="Built for modern Xiaomi-class Android devices."
                        description="The foundation supports Snapdragon and MTK release metadata, plus HyperOS and MIUI-ready labeling for device pages."
                    />
                    <GlassCard className="p-6">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <PlatformPill><Cpu className="mr-2 h-4 w-4 text-red-300" /> Snapdragon</PlatformPill>
                            <PlatformPill><Cpu className="mr-2 h-4 w-4 text-red-300" /> MTK</PlatformPill>
                            <PlatformPill>HyperOS 3</PlatformPill>
                            <PlatformPill>HyperOS 2</PlatformPill>
                            <PlatformPill>HyperOS 1</PlatformPill>
                            <PlatformPill>MIUI-ready foundation</PlatformPill>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Download Flow"
                        title="A release path users can understand."
                        description="Each ROM build can expose its CI run, mirror, checksum, stability state, and install method."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {flow.map((step, index) => (
                            <GlassCard key={step.title} className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05]">
                                        <step.icon className="h-6 w-6 text-red-300" />
                                    </div>
                                    <RomBadge>Step {index + 1}</RomBadge>
                                </div>
                                <h3 className="text-xl font-black text-white">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">{step.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14 pb-24">
                <div className="mx-auto max-w-5xl">
                    <GlassCard className="p-6 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/10">
                                <AlertTriangle className="h-7 w-7 text-amber-200" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Flash responsibly.</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    Installing custom ROMs can wipe data or damage a device when done incorrectly. Back up your files, unlock the bootloader, verify your build, and follow the install notes for your exact device.
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
