import React from "react";
import Link from "next/link";
import { Flame, Github, Send, ShieldCheck } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/60 px-6 pb-10 pt-16 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/25 bg-gradient-to-br from-red-700 to-zinc-950">
                                <Flame className="h-5 w-5 text-red-100" />
                            </div>
                            <div>
                                <span className="block text-xl font-black uppercase tracking-[0.16em] text-white">DeadZone</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-300/80">ROM Foundation</span>
                            </div>
                        </Link>
                        <p className="max-w-md text-sm leading-7 text-zinc-400">
                            Premium Android ROM builds for Snapdragon and MTK devices, with release metadata, changelogs, checksums, and install guidance managed through the DeadZone dashboard.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <Link href="https://github.com/DeadZon/DeadZone_web" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-red-400/30 hover:text-white">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="/community" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-red-400/30 hover:text-white">
                                <Send className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">ROM</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/download" className="text-zinc-400 transition-colors hover:text-white">Downloads</Link></li>
                            <li><Link href="/download" className="text-zinc-400 transition-colors hover:text-white">Devices</Link></li>
                            <li><Link href="/installation" className="text-zinc-400 transition-colors hover:text-white">Installation</Link></li>
                            <li><Link href="/features" className="text-zinc-400 transition-colors hover:text-white">Features</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Project</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/community" className="text-zinc-400 transition-colors hover:text-white">Community</Link></li>
                            <li><Link href="/team" className="text-zinc-400 transition-colors hover:text-white">Team</Link></li>
                            <li><Link href="/contact" className="text-zinc-400 transition-colors hover:text-white">Contact</Link></li>
                            <li><Link href="/admin" className="text-zinc-400 transition-colors hover:text-white">Admin</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
                    <p>Copyright {new Date().getFullYear()} DeadZone. Not affiliated with Google, Xiaomi, or MediaTek.</p>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <ShieldCheck className="h-4 w-4 text-red-300" />
                        Flash at your own risk. Back up your data first.
                    </div>
                </div>
            </div>
        </footer>
    );
}
