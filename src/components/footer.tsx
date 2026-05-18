import React from "react";
import Link from "next/link";
import { Rocket, Github, Twitter, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                                <Rocket className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Project<span className="text-blue-500">Move</span></span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Experience the ultimate performance on your MediaTek device with MoveOS. Designed for enthusiasts, by enthusiasts.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <Github className="w-4 h-4 text-zinc-400" />
                            </Link>
                            <Link href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <Send className="w-4 h-4 text-zinc-400" />
                            </Link>
                            <Link href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <Twitter className="w-4 h-4 text-zinc-400" />
                            </Link>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/download" className="text-zinc-400 hover:text-white transition-colors">Download</Link></li>
                            <li><Link href="/installation" className="text-zinc-400 hover:text-white transition-colors">Installation</Link></li>
                            <li><Link href="/gallery" className="text-zinc-400 hover:text-white transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/team" className="text-zinc-400 hover:text-white transition-colors">Team</Link></li>
                            <li><Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/community" className="text-zinc-400 hover:text-white transition-colors">Community</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-xs">© {new Date().getFullYear()} Project Move. Not affiliated with Google or Xiaomi.</p>
                </div>
            </div>
        </footer>
    );
}
