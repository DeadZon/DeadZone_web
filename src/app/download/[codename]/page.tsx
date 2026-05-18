"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Download,
    Info,
    ShieldCheck,
    Terminal,
    History,
    Cpu,
    Smartphone,
    Layout,
    Github,
    Link as LinkIcon,
    Fingerprint,
    Wrench,
    AlertTriangle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, StatusBadge } from "@/components/ui/deadzone";

function platformLabel(device: any, rom?: any) {
    const text = `${rom?.platform || ""} ${rom?.soc || ""} ${device?.chipset || ""}`.toLowerCase();
    if (text.includes("snapdragon") || text.includes("qualcomm")) return "Snapdragon";
    if (text.includes("mtk") || text.includes("mediatek") || text.includes("dimensity") || text.includes("helio")) return "MTK";
    return rom?.platform || "Android";
}

function InfoRow({ label, value }: { label: string; value?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{label}</span>
            <span className="break-all text-right text-sm font-bold text-white">{value || "Not set"}</span>
        </div>
    );
}

export default function DeviceDetailPage({ params }: { params: { codename: string } }) {
    const [device, setDevice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedRom, setSelectedRom] = useState<any>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const res = await fetch(`/api/devices/${params.codename}`);
                const data = await res.json();
                if (!data.error) {
                    setDevice(data);
                    if (data.roms && data.roms.length > 0) {
                        setSelectedRom(data.roms[0]);
                    }
                }
            } catch (error) {
                console.error("Device fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [params.codename]);

    const handleDownload = async () => {
        if (!selectedRom) return;
        setIsDownloading(true);
        try {
            await fetch("/api/downloads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ romId: selectedRom.id }),
            });
        } catch (err) {
            console.error("Tracking failed", err);
        } finally {
            setIsDownloading(false);
        }
        window.open(selectedRom.pixeldrainUrl || selectedRom.downloadUrl, "_blank");
    };

    if (loading) {
        return (
            <main className="min-h-screen relative">
                <Starfield />
                <Navbar />
                <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
                    <div className="h-8 w-48 animate-pulse rounded-xl bg-white/5 mb-12" />
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="h-[420px] animate-pulse rounded-[2rem] bg-white/5 lg:col-span-1" />
                        <div className="h-[620px] animate-pulse rounded-[2rem] bg-white/5 lg:col-span-2" />
                    </div>
                </div>
            </main>
        );
    }

    if (!device) {
        return (
            <main className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center">
                <Starfield />
                <h1 className="mb-4 text-4xl font-black text-white">Device Not Found</h1>
                <p className="mb-8 text-zinc-500">The requested device could not be located in the DeadZone database.</p>
                <Link href="/download" className="rounded-2xl bg-red-600 px-8 py-4 font-bold text-white">
                    Back to Download Center
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
                <Link href="/download" className="mb-10 flex w-fit items-center gap-2 text-zinc-500 transition-colors hover:text-white">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-[0.16em]">Back to Downloads</span>
                </Link>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-1">
                        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
                            <GlassCard className="p-7">
                                <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-red-400/20 bg-red-500/10">
                                    <Smartphone className="h-10 w-10 text-red-200" />
                                </div>
                                <h1 className="text-4xl font-black leading-tight text-white">{device.name}</h1>
                                <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>

                                <div className="mt-8 space-y-3">
                                    <InfoRow label="Brand" value={device.brand} />
                                    <InfoRow label="Chipset" value={device.chipset} />
                                    <InfoRow label="Platform" value={platformLabel(device, selectedRom)} />
                                    <InfoRow label="Builds" value={device.roms.length} />
                                </div>
                            </GlassCard>
                        </motion.div>

                        <GlassCard className="p-6">
                            <h3 className="mb-3 flex items-center gap-2 font-black text-white">
                                <ShieldCheck className="h-5 w-5 text-emerald-300" /> Device Support
                            </h3>
                            <p className="text-sm leading-7 text-zinc-400">
                                This page shows DeadZone releases registered for this exact codename. Confirm the codename before flashing.
                            </p>
                        </GlassCard>
                    </div>

                    <div className="space-y-7 lg:col-span-2">
                        {device.roms.length > 0 ? (
                            <>
                                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                    {device.roms.map((rom: any) => (
                                        <button
                                            key={rom.id}
                                            onClick={() => setSelectedRom(rom)}
                                            className={cn(
                                                "min-h-14 shrink-0 rounded-2xl border px-5 text-left transition-all",
                                                selectedRom?.id === rom.id
                                                    ? "border-red-400/40 bg-red-500/15 text-white"
                                                    : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                            )}
                                        >
                                            <span className="block text-xs font-black uppercase tracking-[0.16em]">{rom.flavor || "DeadZone"}</span>
                                            <span className="mt-1 block text-sm font-bold">v{rom.version}</span>
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {selectedRom && (
                                        <motion.div
                                            key={selectedRom.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-7"
                                        >
                                            <GlassCard className="p-6 md:p-8">
                                                <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                                    <div>
                                                        <div className="mb-4 flex flex-wrap gap-2">
                                                            <RomBadge>{selectedRom.flavor ? `DeadZone ${selectedRom.flavor}` : "DeadZone ROM"}</RomBadge>
                                                            <StatusBadge stable={selectedRom.isStable} test={selectedRom.isTestBuild} />
                                                            {selectedRom.flashType && <RomBadge className="border-white/10 bg-white/[0.04] text-zinc-200">{selectedRom.flashType}</RomBadge>}
                                                        </div>
                                                        <h2 className="text-3xl font-black text-white md:text-5xl">DeadZone v{selectedRom.version}</h2>
                                                        <p className="mt-3 text-sm text-zinc-500">Released {new Date(selectedRom.releaseDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <PremiumButton onClick={handleDownload} loading={isDownloading} icon={<Download className="h-5 w-5" />}>
                                                        Download Build
                                                    </PremiumButton>
                                                </div>

                                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                                    <div>
                                                        <h4 className="mb-4 flex items-center gap-2 font-black text-white">
                                                            <History className="h-5 w-5 text-red-300" /> Changelog
                                                        </h4>
                                                        <div className="min-h-[220px] rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-zinc-300 whitespace-pre-line">
                                                            {selectedRom.changelog || "No changelog provided for this release."}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-4 flex items-center gap-2 font-black text-white">
                                                            <Terminal className="h-5 w-5 text-red-300" /> Build Information
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <InfoRow label="Android" value={selectedRom.androidVersion} />
                                                            <InfoRow label="Platform" value={selectedRom.platform || platformLabel(device, selectedRom)} />
                                                            <InfoRow label="SoC" value={selectedRom.soc || device.chipset} />
                                                            <InfoRow label="File size" value={selectedRom.fileSize} />
                                                            <InfoRow label="Type" value={selectedRom.type} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </GlassCard>

                                            <GlassCard className="p-6 md:p-8">
                                                <h3 className="mb-6 flex items-center gap-3 text-2xl font-black text-white">
                                                    <LinkIcon className="h-6 w-6 text-red-300" /> Release Links
                                                </h3>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <a href={selectedRom.pixeldrainUrl || selectedRom.downloadUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-red-400/35">
                                                        <Download className="mb-4 h-6 w-6 text-red-300" />
                                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">PixelDrain / Mirror</p>
                                                        <p className="mt-2 break-all text-sm font-bold text-white">{selectedRom.pixeldrainUrl || selectedRom.downloadUrl}</p>
                                                    </a>
                                                    {selectedRom.githubRunUrl && (
                                                        <a href={selectedRom.githubRunUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-red-400/35">
                                                            <Github className="mb-4 h-6 w-6 text-red-300" />
                                                            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">GitHub Run</p>
                                                            <p className="mt-2 break-all text-sm font-bold text-white">{selectedRom.githubRunUrl}</p>
                                                        </a>
                                                    )}
                                                </div>
                                                {selectedRom.sha256 && (
                                                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                                                        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                                                            <Fingerprint className="h-4 w-4 text-red-300" /> SHA-256
                                                        </div>
                                                        <p className="break-all font-mono text-xs leading-6 text-zinc-300">{selectedRom.sha256}</p>
                                                    </div>
                                                )}
                                            </GlassCard>

                                            <GlassCard className="p-6 md:p-8">
                                                <h3 className="mb-6 flex items-center gap-3 text-2xl font-black text-white">
                                                    <Info className="h-6 w-6 text-red-300" /> Installation Guide
                                                </h3>
                                                <div className="text-sm leading-8 text-zinc-300 whitespace-pre-line">
                                                    {selectedRom.installationGuide || (
                                                        `1. Back up all important data.
2. Confirm this build matches ${device.name} (${device.codename}).
3. Unlock the bootloader and boot into the required flashing environment.
4. Flash the DeadZone package using the listed flash type.
5. Verify boot, then restore data only after the first setup is complete.`
                                                    )}
                                                </div>
                                                <div className="mt-6 flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                                                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                                                    <p className="text-sm leading-6 text-amber-50/80">Flash at your own risk. Backup required. Unlocked bootloader required.</p>
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <GlassCard className="p-12 text-center">
                                <h3 className="text-xl font-black text-white">No Builds Registered</h3>
                                <p className="mt-2 text-zinc-500">Official builds for this hardware are coming soon.</p>
                            </GlassCard>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
