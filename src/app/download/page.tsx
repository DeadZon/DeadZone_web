"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Search, Monitor, Cpu, Download as DownloadIcon, ChevronRight, Layers } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GlassCard, RomBadge, SectionHeader, StatusBadge } from "@/components/ui/deadzone";

function platformLabel(device: any) {
    const text = `${device.platform || ""} ${device.chipset || ""}`.toLowerCase();
    if (text.includes("snapdragon") || text.includes("qualcomm")) return "Snapdragon";
    if (text.includes("mtk") || text.includes("mediatek") || text.includes("dimensity") || text.includes("helio")) return "MTK";
    return "Android";
}

export default function DownloadPage() {
    const [search, setSearch] = useState("");
    const [activeBrand, setActiveBrand] = useState("All");
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await fetch("/api/devices");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDevices(data);
                }
            } catch (error) {
                console.error("Download page device fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDevices();
    }, []);

    const brands = ["All", ...Array.from(new Set(devices.map((d) => d.brand).filter(Boolean)))];

    const filteredDevices = devices.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.codename.toLowerCase().includes(search.toLowerCase()) ||
            d.chipset?.toLowerCase().includes(search.toLowerCase());
        const matchesBrand = activeBrand === "All" || d.brand === activeBrand;
        return matchesSearch && matchesBrand;
    });

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section id="devices" className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Download Center"
                        title={<>Find the right <span className="text-gradient">DeadZone</span> build.</>}
                        description="Search supported hardware, review platform details, and open the device page for ROM flavor, stability, mirrors, and checksums."
                        align="center"
                    />

                    <div className="mx-auto mb-12 grid max-w-5xl gap-4 md:grid-cols-[1fr_auto]">
                        <div className="group relative w-full">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-red-300" />
                            <input
                                type="text"
                                placeholder="Search device, codename, or chipset..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none backdrop-blur-xl transition-all placeholder:text-zinc-600 focus:border-red-400/40 focus:ring-2 focus:ring-red-500/20"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {brands.map((brand) => (
                                <button
                                    key={brand}
                                    onClick={() => setActiveBrand(brand)}
                                    className={cn(
                                        "min-h-14 shrink-0 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.16em] transition-all",
                                        activeBrand === brand
                                            ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                            : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <GlassCard key={i} className="h-[360px] animate-pulse p-8" />
                            ))
                        ) : (
                            filteredDevices.map((device, i) => (
                                <motion.div
                                    key={device.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    layout
                                >
                                    <Link href={`/download/${device.codename}`} className="group block h-full">
                                        <GlassCard className="h-full p-6 transition-all duration-500 group-hover:border-red-400/30 group-hover:shadow-red-950/30">
                                            <div className="mb-8 flex items-start justify-between gap-4">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-red-400/20 bg-red-500/10 transition-transform group-hover:scale-105">
                                                    <Monitor className="h-8 w-8 text-red-200" />
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <RomBadge>{device.brand || "Device"}</RomBadge>
                                                    <StatusBadge stable={device.status !== "INACTIVE"} />
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black tracking-tight text-white transition-colors group-hover:text-red-100">{device.name}</h3>
                                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>

                                            <div className="mt-7 space-y-3">
                                                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                    <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Chipset</p>
                                                        <p className="mt-1 text-sm font-bold text-zinc-200">{device.chipset || "Unknown chipset"}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Platform</p>
                                                        <p className="mt-1 text-sm font-bold text-white">{platformLabel(device)}</p>
                                                    </div>
                                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Builds</p>
                                                        <p className="mt-1 text-sm font-bold text-white">{device.romCount || 0}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-7 flex min-h-[3.25rem] items-center justify-center gap-3 rounded-2xl bg-red-600/10 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-red-100 transition-all group-hover:bg-red-600 group-hover:text-white">
                                                View ROMs <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </GlassCard>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {!loading && filteredDevices.length === 0 && (
                        <GlassCard className="mt-8 p-10 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
                                <Layers className="h-7 w-7 text-zinc-500" />
                            </div>
                            <h3 className="text-xl font-black text-white">No supported device found</h3>
                            <p className="mt-2 text-sm text-zinc-500">Try a different device name, codename, brand, or chipset.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
