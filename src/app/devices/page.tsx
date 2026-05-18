"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader, StatusBadge } from "@/components/ui/deadzone";
import { allDevices, mtkDevices, snapdragonDevices, DeadZoneDevice } from "@/data/deadzone-devices";
import { cn } from "@/lib/utils";
import { Cpu, Monitor, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type DeviceRow = DeadZoneDevice & {
    romCount: number;
};

export default function DevicesPage() {
    const searchParams = useSearchParams();
    const initialSoc = searchParams.get("soc");
    const [search, setSearch] = useState("");
    const [soc, setSoc] = useState<"All" | "MTK" | "Snapdragon">(initialSoc === "MTK" || initialSoc === "Snapdragon" ? initialSoc : "All");
    const [rows, setRows] = useState<DeviceRow[]>(allDevices.map((device) => ({ ...device, romCount: 0 })));

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await fetch("/api/devices");
                const data = await res.json();
                if (!Array.isArray(data) || data.length === 0) return;

                const byCodename = new Map(data.map((device: any) => [device.codename, device]));
                setRows(allDevices.map((device) => {
                    const apiDevice: any = byCodename.get(device.codename);
                    return {
                        ...device,
                        romCount: apiDevice?.romCount || apiDevice?.roms?.length || 0,
                    };
                }));
            } catch (error) {
                console.error("Devices page fetch failed:", error);
            }
        };
        fetchDevices();
    }, []);

    const filtered = useMemo(() => {
        const query = search.toLowerCase();
        return rows.filter((device) => {
            const matchesSearch = device.codename.includes(query) ||
                device.name.toLowerCase().includes(query) ||
                device.brand.toLowerCase().includes(query) ||
                device.soc.toLowerCase().includes(query);
            const matchesSoc = soc === "All" || device.soc === soc;
            return matchesSearch && matchesSoc;
        });
    }, [rows, search, soc]);

    const groups = [
        { key: "MTK" as const, label: "MTK Devices", devices: filtered.filter((device) => device.soc === "MTK"), accent: "purple" as const },
        { key: "Snapdragon" as const, label: "Snapdragon Devices", devices: filtered.filter((device) => device.soc === "Snapdragon"), accent: "blue" as const },
    ];

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Device Support Matrix"
                        title={<>MTK and Snapdragon <span className="text-gradient">separated clearly</span>.</>}
                        description="Search by device name or codename, filter by SoC group, and open builds only when ROMs are available."
                        align="center"
                    />

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <GlassCard accent="purple" className="p-5">
                            <p className="text-4xl font-black text-white">{mtkDevices.length}</p>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-200">MTK Devices</p>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-5">
                            <p className="text-4xl font-black text-white">{snapdragonDevices.length}</p>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Snapdragon Devices</p>
                        </GlassCard>
                        <GlassCard accent="cyan" className="p-5">
                            <p className="text-4xl font-black text-white">{allDevices.length}</p>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Total Devices</p>
                        </GlassCard>
                    </div>

                    <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto]">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search codename, device name, brand, or SoC..."
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {(["All", "MTK", "Snapdragon"] as const).map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setSoc(item)}
                                    className={cn(
                                        "min-h-14 shrink-0 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.16em]",
                                        soc === item ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-400"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        {groups.map((group) => (
                            <section key={group.key}>
                                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                    <h2 className="text-2xl font-black text-white">{group.label}</h2>
                                    <RomBadge accent={group.accent}>{group.devices.length} shown</RomBadge>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {group.devices.map((device) => {
                                        const hasRoms = device.romCount > 0;
                                        return (
                                            <GlassCard key={device.codename} accent={group.accent} className="p-5">
                                                <div className="mb-5 flex items-start justify-between gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/20 bg-white/[0.05]">
                                                        {device.soc === "MTK" ? <Monitor className="h-6 w-6" /> : <Cpu className="h-6 w-6" />}
                                                    </div>
                                                    <StatusBadge comingSoon={!hasRoms} stable={hasRoms} />
                                                </div>
                                                <h3 className="text-lg font-black text-white">{device.name}</h3>
                                                <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">SoC</p>
                                                        <p className="mt-1 font-bold text-white">{device.soc}</p>
                                                    </div>
                                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROMs</p>
                                                        <p className="mt-1 font-bold text-white">{hasRoms ? device.romCount : "Soon"}</p>
                                                    </div>
                                                </div>
                                                {hasRoms ? (
                                                    <Link href={`/download/${device.codename}`} className="mt-5 flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                                        Open Builds
                                                    </Link>
                                                ) : (
                                                    <div className="mt-5 flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                                                        Coming Soon
                                                    </div>
                                                )}
                                            </GlassCard>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
