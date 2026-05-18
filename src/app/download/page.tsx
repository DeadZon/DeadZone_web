"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Search, Monitor, Cpu, ChevronRight, Layers } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { allDevices, DeadZoneDevice } from "@/data/deadzone-devices";
import { GlassCard, RomBadge, SectionHeader, StatusBadge } from "@/components/ui/deadzone";

type PublicDevice = DeadZoneDevice & {
    id: string;
    chipset: string;
    romCount: number;
    fromFallback?: boolean;
};

function fromStatic(device: DeadZoneDevice): PublicDevice {
    return {
        ...device,
        id: device.codename,
        chipset: device.soc,
        romCount: 0,
        fromFallback: true,
    };
}

function fromApi(device: any): PublicDevice {
    const staticMatch = allDevices.find((item) => item.codename === device.codename);
    return {
        id: device.id || device.codename,
        codename: device.codename,
        name: device.name,
        brand: device.brand || staticMatch?.brand || "Device",
        soc: staticMatch?.soc || (String(device.chipset || "").toLowerCase().includes("mtk") ? "MTK" : "Snapdragon"),
        platform: staticMatch?.platform || device.platform || "HyperOS 3",
        status: device.status === "INACTIVE" ? "coming_soon" : staticMatch?.status || "supported",
        chipset: device.chipset || staticMatch?.soc || "Unknown",
        romCount: device.romCount || device.roms?.length || 0,
    };
}

export default function DownloadPage() {
    const [search, setSearch] = useState("");
    const [activeBrand, setActiveBrand] = useState("All");
    const [devices, setDevices] = useState<PublicDevice[]>(allDevices.map(fromStatic));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await fetch("/api/devices");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const apiDevices = data.map(fromApi);
                    const known = new Set(apiDevices.map((device) => device.codename));
                    const missingStatic = allDevices.filter((device) => !known.has(device.codename)).map(fromStatic);
                    setDevices([...apiDevices, ...missingStatic].sort((a, b) => a.codename.localeCompare(b.codename)));
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
        const query = search.toLowerCase();
        const matchesSearch = d.name.toLowerCase().includes(query) ||
            d.codename.toLowerCase().includes(query) ||
            d.chipset.toLowerCase().includes(query) ||
            d.soc.toLowerCase().includes(query);
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
                        title={<>DeadZone <span className="text-gradient">release matrix</span>.</>}
                        description="Public downloads try the live API first, then fall back to the MEZO-derived static device catalog when the database is unavailable."
                        align="center"
                    />

                    <div className="mx-auto mb-12 grid max-w-5xl gap-4 md:grid-cols-[1fr_auto]">
                        <div className="group relative w-full">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-cyan-300" />
                            <input
                                type="text"
                                placeholder="Search device, codename, SoC, or chipset..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none backdrop-blur-xl transition-all placeholder:text-zinc-600 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20"
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
                                            ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
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
                                <GlassCard key={i} accent="cyan" className="h-[360px] animate-pulse p-8" />
                            ))
                        ) : (
                            filteredDevices.map((device, i) => {
                                const hasRoms = device.romCount > 0;
                                return (
                                    <motion.div key={device.codename} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} layout>
                                        <Link href={`/download/${device.codename}`} className="group block h-full">
                                            <GlassCard accent={device.soc === "MTK" ? "purple" : "blue"} className="h-full p-6 transition-all duration-500">
                                                <div className="mb-8 flex items-start justify-between gap-4">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-current/25 bg-white/[0.05] transition-transform group-hover:scale-105">
                                                        <Monitor className="h-8 w-8" />
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <RomBadge accent={device.soc === "MTK" ? "purple" : "blue"}>{device.soc}</RomBadge>
                                                        <StatusBadge comingSoon={!hasRoms} stable={hasRoms} />
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-black tracking-tight text-white">{device.name}</h3>
                                                <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>

                                                <div className="mt-7 space-y-3">
                                                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                        <Cpu className="mt-0.5 h-5 w-5 shrink-0" />
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Platform</p>
                                                            <p className="mt-1 text-sm font-bold text-zinc-200">{device.platform}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Brand</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{device.brand}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROMs</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{hasRoms ? device.romCount : "Soon"}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={cn(
                                                    "mt-7 flex min-h-[3.25rem] items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.14em] transition-all",
                                                    hasRoms ? "bg-cyan-400/10 text-cyan-100 group-hover:bg-cyan-400 group-hover:text-slate-950" : "bg-white/[0.05] text-zinc-400"
                                                )}>
                                                    {hasRoms ? "Open Builds" : "Coming Soon"} <ChevronRight className="h-5 w-5" />
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>

                    {!loading && filteredDevices.length === 0 && (
                        <GlassCard accent="slate" className="mt-8 p-10 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
                                <Layers className="h-7 w-7 text-zinc-500" />
                            </div>
                            <h3 className="text-xl font-black text-white">No supported device found</h3>
                            <p className="mt-2 text-sm text-zinc-500">Try a different device name, codename, brand, or SoC.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
