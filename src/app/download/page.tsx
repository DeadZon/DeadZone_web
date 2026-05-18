"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Search, Cpu, ChevronRight, Layers, Smartphone, Server, HardDriveDownload, BadgeInfo } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
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

const servers = ["PixelDrain", "GitHub Release", "Backup Mirror"];
const versions = ["Stable", "Test", "Legend", "Gaming", "EPiC"];

function deviceTags(device: PublicDevice) {
    return [
        "Global Base",
        "China Base",
        "HyperOS 3",
        "Fastboot ZIP",
        device.soc,
        device.romCount > 0 ? "Stable" : "Coming Soon",
    ];
}

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
    const soc = staticMatch?.soc || (String(device.chipset || "").toLowerCase().includes("mtk") ? "MTK" : "Snapdragon");

    return {
        id: device.id || device.codename,
        codename: device.codename,
        name: device.name,
        brand: device.brand || staticMatch?.brand || "Device",
        soc,
        platform: staticMatch?.platform || device.platform || "HyperOS 3 / Global ROM Base / CN features",
        status: device.status === "INACTIVE" ? "coming_soon" : staticMatch?.status || "supported",
        chipset: device.chipset || staticMatch?.soc || soc,
        romCount: device.romCount || device.roms?.length || 0,
    };
}

function DeviceVisual({ device }: { device: PublicDevice }) {
    const accent = device.soc === "MTK" ? "from-purple-400/35 via-fuchsia-500/15 to-cyan-300/20" : "from-blue-400/35 via-cyan-500/15 to-fuchsia-300/20";

    return (
        <div className={cn("relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br", accent)}>
            <div className="absolute inset-0 deadzone-grid opacity-35" />
            <div className="relative h-28 w-14 rounded-[1.4rem] border border-white/25 bg-black/55 p-1 shadow-2xl shadow-black/60">
                <div className="h-full rounded-[1.05rem] border border-white/10 bg-gradient-to-b from-white/10 via-cyan-400/10 to-fuchsia-500/10">
                    <div className="mx-auto mt-2 h-1 w-5 rounded-full bg-white/30" />
                </div>
            </div>
            <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                {device.codename}
            </div>
        </div>
    );
}

function SelectorGroup({ title, icon, options }: { title: string; icon: React.ReactNode; options: string[] }) {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                {icon} {title}
            </h3>
            <div className="grid grid-cols-1 gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => setSelected(option)}
                        className={cn(
                            "min-h-11 rounded-2xl border px-4 text-left text-xs font-black uppercase tracking-[0.14em] transition-colors",
                            selected === option ? "border-cyan-300/35 bg-cyan-400/12 text-white" : "border-white/10 bg-white/[0.04] text-zinc-500 hover:text-zinc-200"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function DownloadPage() {
    const [search, setSearch] = useState("");
    const [activeBrand, setActiveBrand] = useState("All");
    const [devices, setDevices] = useState<PublicDevice[]>(allDevices.map(fromStatic));
    const [selectedCodename, setSelectedCodename] = useState(allDevices[0]?.codename || "");
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
                    const merged = [...apiDevices, ...missingStatic].sort((a, b) => a.codename.localeCompare(b.codename));
                    setDevices(merged);
                    setSelectedCodename(merged[0]?.codename || "");
                }
            } catch (error) {
                console.error("Download page device fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDevices();
    }, []);

    const brands = useMemo(() => ["All", ...Array.from(new Set(devices.map((d) => d.brand).filter(Boolean)))], [devices]);

    const filteredDevices = devices.filter((d) => {
        const query = search.toLowerCase();
        const matchesSearch = d.name.toLowerCase().includes(query) ||
            d.codename.toLowerCase().includes(query) ||
            d.chipset.toLowerCase().includes(query) ||
            d.soc.toLowerCase().includes(query);
        const matchesBrand = activeBrand === "All" || d.brand === activeBrand;
        return matchesSearch && matchesBrand;
    });

    const selectedDevice = devices.find((device) => device.codename === selectedCodename) || filteredDevices[0] || devices[0];

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Download Center"
                        title={<>Select your <span className="text-gradient">DeadZone build</span>.</>}
                        description="Choose a supported device, inspect codename and platform tags, then open builds only when real ROM records exist."
                        align="center"
                    />

                    <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto]">
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
                                        activeBrand === brand ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <GlassCard key={i} accent="cyan" className="h-[420px] animate-pulse p-8" />
                                ))
                            ) : (
                                filteredDevices.map((device, i) => {
                                    const hasRoms = device.romCount > 0;
                                    const accent = device.soc === "MTK" ? "purple" : "blue";
                                    const body = (
                                        <GlassCard accent={accent} className="h-full p-5 transition-all duration-500 group-hover:border-cyan-300/35">
                                            <DeviceVisual device={device} />
                                            <div className="mt-5 flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="text-xl font-black tracking-tight text-white">{device.name}</h3>
                                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                                </div>
                                                <StatusBadge comingSoon={!hasRoms} stable={hasRoms} />
                                            </div>
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {deviceTags(device).slice(0, 6).map((tag) => (
                                                    <RomBadge key={tag} accent={tag === "MTK" ? "purple" : tag === "Snapdragon" ? "blue" : tag === "Coming Soon" ? "slate" : "cyan"}>
                                                        {tag}
                                                    </RomBadge>
                                                ))}
                                            </div>
                                            <div className={cn(
                                                "mt-6 flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 text-xs font-black uppercase tracking-[0.14em] transition-all",
                                                hasRoms ? "bg-cyan-400/10 text-cyan-100 group-hover:bg-cyan-400 group-hover:text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-500"
                                            )}>
                                                {hasRoms ? "Open Builds" : "Coming Soon"} <ChevronRight className="h-4 w-4" />
                                            </div>
                                        </GlassCard>
                                    );

                                    return (
                                        <motion.div
                                            key={device.codename}
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.015 }}
                                            layout
                                            onMouseEnter={() => setSelectedCodename(device.codename)}
                                        >
                                            {hasRoms ? (
                                                <Link href={`/download/${device.codename}`} className="group block h-full" onFocus={() => setSelectedCodename(device.codename)}>
                                                    {body}
                                                </Link>
                                            ) : (
                                                <button className="group block h-full w-full text-left" onClick={() => setSelectedCodename(device.codename)}>
                                                    {body}
                                                </button>
                                            )}
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            <GlassCard accent={selectedDevice?.soc === "MTK" ? "purple" : "blue"} className="p-6">
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div>
                                        <RomBadge accent="cyan">Build Selector</RomBadge>
                                        <h2 className="mt-4 text-2xl font-black text-white">{selectedDevice?.name || "Select Device"}</h2>
                                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{selectedDevice?.codename || "codename"}</p>
                                    </div>
                                    <Smartphone className="h-8 w-8 text-cyan-200" />
                                </div>

                                <div className="space-y-6">
                                    <SelectorGroup title="Select Download Server" icon={<Server className="h-4 w-4" />} options={servers} />
                                    <SelectorGroup title="Select Version" icon={<HardDriveDownload className="h-4 w-4" />} options={versions} />

                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                                            <BadgeInfo className="h-4 w-4" /> Device Info
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                ["Codename", selectedDevice?.codename],
                                                ["Device name", selectedDevice?.name],
                                                ["SoC", selectedDevice?.chipset || selectedDevice?.soc],
                                                ["Platform", selectedDevice?.platform],
                                                ["Status", selectedDevice?.romCount ? "Stable/Test available" : "Coming Soon"],
                                            ].map(([label, value]) => (
                                                <div key={label} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{label}</span>
                                                    <span className="text-right text-sm font-bold text-white">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedDevice?.romCount ? (
                                        <Link href={`/download/${selectedDevice.codename}`} className="flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-cyan-500/20">
                                            Continue to ROMs
                                        </Link>
                                    ) : (
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-zinc-400">
                                            No ROM is registered for this codename yet, so DeadZone is not showing a placeholder download link.
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </aside>
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
