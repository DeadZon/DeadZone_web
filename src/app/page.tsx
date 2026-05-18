"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { HeroSection } from "@/components/hero-section";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

function Counter({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(Math.floor(latest)),
        });
        return () => controls.stop();
    }, [value]);

    return <span>{display.toLocaleString()}</span>;
}

function StatsGrid() {
    const [stats, setStats] = useState({ activeUsers: 52400, devices: 32 });

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => {
                if (data.activeUsers) setStats(data);
            })
            .catch(console.error);
    }, []);

    const items = [
        { label: "Active Users", value: stats.activeUsers, suffix: "+" },
        { label: "Devices", value: stats.devices, suffix: "+" },
        { label: "Updates", value: "Weekly", isString: true },
        { label: "Rating", value: "4.9", isString: true, suffix: "/5" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {items.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                            {stat.isString ? (
                                <>{stat.value}{stat.suffix}</>
                            ) : (
                                <><Counter value={stat.value as number} />{stat.suffix}</>
                            )}
                        </div>
                        <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <HeroSection />

            {/* Stats Section */}
            <section className="py-20 px-6">
                <StatsGrid />
            </section>

            {/* VIP Access Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-1px relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
                    <div className="absolute inset-0 bg-zinc-950 rounded-[3.5rem] m-[2px]" />

                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64 group-hover:bg-indigo-500/20 transition-colors duration-1000" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-500/10 blur-[100px] -ml-40 -mb-40 group-hover:bg-fuchsia-500/20 transition-colors duration-1000" />

                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Exclusive Access</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter"
                        >
                            Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">VIP Experience</span>
                        </motion.h2>

                        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Get early access to private builds, exclusive features, and direct support from the developers. Join our elite circle.
                        </p>

                        <motion.a
                            href="https://t.me/Msaeed9"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all uppercase tracking-tight"
                        >
                            Get VIP Access
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </motion.a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
