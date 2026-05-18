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
    Loader2
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/premium-button";

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

    if (loading) {
        return (
            <main className="min-h-screen relative">
                <Starfield />
                <Navbar />
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
                    <div className="h-8 w-48 bg-white/5 rounded-xl animate-pulse mb-12" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 space-y-8">
                            <div className="h-[400px] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/5" />
                            <div className="h-[120px] rounded-[2rem] bg-white/5 animate-pulse border border-white/5" />
                        </div>
                        <div className="lg:col-span-2 space-y-8">
                            <div className="h-16 w-full bg-white/5 rounded-2xl animate-pulse" />
                            <div className="h-[600px] rounded-[3rem] bg-white/5 animate-pulse border border-white/5" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!device) {
        return (
            <main className="min-h-screen relative flex flex-col items-center justify-center px-6">
                <Starfield />
                <h1 className="text-4xl font-bold text-white mb-4">Device Not Found</h1>
                <p className="text-zinc-500 mb-8">The requested device could not be located in our database.</p>
                <Link href="/download" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold">
                    Back to Download Center
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <Link
                    href="/download"
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group w-fit"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Downloads</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Device Header & Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-10 rounded-[2.5rem] glass border border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] -mr-16 -mt-16 rounded-full" />

                            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8">
                                <Smartphone className="text-blue-500 w-10 h-10" />
                            </div>

                            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">{device.name}</h1>
                            <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em] mb-8">{device.codename}</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Cpu className="w-5 h-5 text-zinc-500" />
                                    <div>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Chipset</p>
                                        <p className="text-sm text-zinc-300 font-medium">{device.chipset}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Layout className="w-5 h-5 text-zinc-500" />
                                    <div>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Brand</p>
                                        <p className="text-sm text-zinc-300 font-medium">{device.brand}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="p-8 rounded-[2rem] glass border border-white/10 bg-emerald-500/5">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" /> System Integrity
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                This device is officially supported by MoveOS Team. All builds are verified and passed internal stability tests.
                            </p>
                        </div>
                    </div>

                    {/* ROM Selection & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {device.roms.length > 0 ? (
                            <>
                                <div className="flex flex-wrap gap-4 mb-8">
                                    {device.roms.map((rom: any) => (
                                        <button
                                            key={rom.id}
                                            onClick={() => setSelectedRom(rom)}
                                            className={cn(
                                                "px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border",
                                                selectedRom?.id === rom.id
                                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                    : "bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:border-white/20"
                                            )}
                                        >
                                            v{rom.version}
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
                                            className="space-y-8"
                                        >
                                            <div className="p-10 rounded-[3rem] glass border border-white/10 relative overflow-hidden">
                                                <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                                                    <div>
                                                        <h2 className="text-3xl font-bold text-white mb-2">MoveOS v{selectedRom.version}</h2>
                                                        <p className="text-zinc-500 text-sm">Released on {new Date(selectedRom.releaseDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <PremiumButton
                                                        onClick={async () => {
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
                                                            window.open(selectedRom.downloadUrl, "_blank");
                                                        }}
                                                        loading={isDownloading}
                                                        className="px-10 py-5 rounded-[2rem] text-sm"
                                                        icon={<Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />}
                                                    >
                                                        Download Build
                                                    </PremiumButton>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <h4 className="text-white font-bold flex items-center gap-2">
                                                            <History className="w-5 h-5 text-blue-500" /> Changelog
                                                        </h4>
                                                        <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 text-zinc-400 text-sm leading-relaxed whitespace-pre-line font-medium italic">
                                                            {selectedRom.changelog || "No changelog provided for this release."}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <h4 className="text-white font-bold flex items-center gap-2">
                                                            <Terminal className="w-5 h-5 text-blue-500" /> Build Information
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-4">
                                                            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex justify-between items-center">
                                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Android Version</span>
                                                                <span className="text-white font-bold">{selectedRom.androidVersion}</span>
                                                            </div>
                                                            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex justify-between items-center">
                                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">File Size</span>
                                                                <span className="text-white font-bold">{selectedRom.fileSize || "1.8 GB"}</span>
                                                            </div>
                                                            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex justify-between items-center">
                                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Build Type</span>
                                                                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] bg-emerald-500/10 px-2 py-1 rounded-md">{selectedRom.type}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Installation Guide */}
                                            <div className="p-10 rounded-[3rem] glass border border-white/10 bg-white/[0.01]">
                                                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                                    <Info className="w-6 h-6 text-blue-500" /> Installation Guide
                                                </h3>
                                                <div className="prose prose-invert max-w-none prose-zinc text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                                                    {selectedRom.installationGuide || (
                                                        `1. Backup all your important data.
                                                        2. Ensure your bootloader is unlocked.
                                                        3. Boot into your preferred custom recovery (TWRP/OrangeFox).
                                                        4. Wipe Data, Cache, and Dalvik.
                                                        5. Flash the MoveOS zip file.
                                                        6. (Optional) Flash Magisk for root access.
                                                        7. Reboot and enjoy the MoveOS experience.`
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <div className="p-20 rounded-[3rem] glass border border-white/10 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">No Builds Registered</h3>
                                <p className="text-zinc-500">Official builds for this hardware cluster are coming soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main >
    );
}
