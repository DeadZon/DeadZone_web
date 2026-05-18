"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Image as ImageIcon, X, Smartphone, SlidersHorizontal, Settings, Gamepad2, Info, Wrench, Download, Grid3X3 } from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { cn } from "@/lib/utils";

const placeholders = [
    { id: "system-ui", title: "System UI", category: "Interface", icon: Smartphone, accent: "cyan" as const, description: "Refined HyperOS surfaces, status areas, and daily-driver polish." },
    { id: "control-center", title: "Control Center", category: "Interface", icon: SlidersHorizontal, accent: "blue" as const, description: "Quick toggles, network controls, and visual balance for fast interaction." },
    { id: "settings", title: "Settings", category: "System", icon: Settings, accent: "purple" as const, description: "DeadZone-ready configuration areas and clean system organization." },
    { id: "launcher", title: "Launcher", category: "Interface", icon: Grid3X3, accent: "magenta" as const, description: "Home screen spacing, icons, and smooth navigation preview." },
    { id: "gaming", title: "Gaming", category: "Performance", icon: Gamepad2, accent: "magenta" as const, description: "Gaming profiles and performance-focused presentation slots." },
    { id: "about-device", title: "About Device", category: "System", icon: Info, accent: "gold" as const, description: "Build identity, version metadata, and ROM channel signal." },
    { id: "deadzone-tools", title: "DeadZone Tools", category: "Tools", icon: Wrench, accent: "cyan" as const, description: "Future hub for ROM utilities, tuning controls, and engineering options." },
    { id: "installation", title: "Installation", category: "Install", icon: Download, accent: "blue" as const, description: "Flashing flow, verification notes, and release guidance placeholders." },
];

export default function GalleryPage() {
    const [screenshots, setScreenshots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<any>(null);

    useEffect(() => {
        fetch("/api/screenshots")
            .then((res) => res.json())
            .then((data) => {
                setScreenshots(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const sourceItems = screenshots.length > 0 ? screenshots : placeholders;
    const categories = ["All", ...Array.from(new Set(sourceItems.map((s) => s.category).filter(Boolean)))];
    const filteredItems = selectedCategory === "All" ? sourceItems : sourceItems.filter((s) => s.category === selectedCategory);
    const usingPlaceholders = !loading && screenshots.length === 0;

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Screenshots"
                        title="DeadZone Gallery"
                        description="Take a visual tour of the refined DeadZone HyperOS interface."
                        align="center"
                    />

                    {usingPlaceholders && (
                        <GlassCard accent="cyan" className="mb-8 p-5 text-center">
                            <p className="text-sm leading-7 text-zinc-400">
                                Real ROM screenshots are not uploaded yet. These polished placeholders reserve the gallery structure for the next media drop.
                            </p>
                        </GlassCard>
                    )}

                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "min-h-11 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.16em] transition-all",
                                    selectedCategory === cat ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <GlassCard key={index} accent="cyan" className="aspect-[9/14] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredItems.map((item, i) => {
                                const Icon = item.icon || ImageIcon;
                                const accent = item.accent || "cyan";
                                const hasImage = Boolean(item.imageUrl);

                                return (
                                    <motion.button
                                        key={item.id || item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="group block h-full text-left"
                                        onClick={() => hasImage && setLightboxImage(item)}
                                    >
                                        <GlassCard accent={accent} className="h-full overflow-hidden p-0">
                                            <div className="relative aspect-[9/14] overflow-hidden">
                                                {hasImage ? (
                                                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-white/[0.08] via-cyan-400/[0.05] to-fuchsia-500/[0.09] p-5">
                                                        <div className="deadzone-grid absolute inset-0 opacity-35" />
                                                        <div className="relative flex items-center justify-between">
                                                            <RomBadge accent={accent}>{item.category}</RomBadge>
                                                            <Icon className="h-6 w-6 text-white/75" />
                                                        </div>
                                                        <div className="relative rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
                                                            <div className="mb-3 h-2 w-20 rounded-full bg-white/20" />
                                                            <div className="space-y-2">
                                                                <div className="h-3 rounded-full bg-cyan-300/20" />
                                                                <div className="h-3 w-3/4 rounded-full bg-fuchsia-300/20" />
                                                                <div className="h-16 rounded-2xl border border-white/10 bg-white/[0.04]" />
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <h3 className="text-2xl font-black text-white">{item.title}</h3>
                                                            <p className="mt-2 text-sm leading-6 text-zinc-300">{item.description}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {hasImage && (
                                                <div className="p-5">
                                                    {item.category && <RomBadge accent="cyan">{item.category}</RomBadge>}
                                                    <h3 className="mt-3 text-lg font-black text-white">{item.title}</h3>
                                                    {item.description && <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>}
                                                </div>
                                            )}
                                        </GlassCard>
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {lightboxImage && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md" onClick={() => setLightboxImage(null)}>
                    <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition-colors hover:bg-white/20" onClick={() => setLightboxImage(null)} aria-label="Close screenshot">
                        <X className="h-6 w-6 text-white" />
                    </button>
                    <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <img src={lightboxImage.imageUrl} alt={lightboxImage.title} className="mx-auto max-h-[78vh] w-auto rounded-3xl" />
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-black text-white">{lightboxImage.title}</h3>
                            {lightboxImage.description && <p className="mt-2 text-zinc-400">{lightboxImage.description}</p>}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
