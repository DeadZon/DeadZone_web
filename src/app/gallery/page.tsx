

"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function GalleryPage() {
    const [screenshots, setScreenshots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<any>(null);

    useEffect(() => {
        fetch("/api/screenshots")
            .then(res => res.json())
            .then(data => {
                setScreenshots(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = ["All", ...Array.from(new Set(screenshots.map(s => s.category).filter(Boolean)))];
    const filteredScreenshots = selectedCategory === "All"
        ? screenshots
        : screenshots.filter(s => s.category === selectedCategory);

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <ImageIcon className="w-3.5 h-3.5" /> Screenshots
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Gallery <span className="text-blue-500">Showcase</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Explore MoveOS UI and features through screenshots.
                    </motion.p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${selectedCategory === cat
                                        ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    ) : filteredScreenshots.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-zinc-500">No screenshots available.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredScreenshots.map((screenshot, i) => (
                                <motion.div
                                    key={screenshot.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-all cursor-pointer"
                                    onClick={() => setLightboxImage(screenshot)}
                                >
                                    <div className="aspect-[9/16] relative overflow-hidden">
                                        <img
                                            src={screenshot.imageUrl}
                                            alt={screenshot.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-6">
                                        {screenshot.category && (
                                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20 mb-3 inline-block">
                                                {screenshot.category}
                                            </span>
                                        )}
                                        <h3 className="text-lg font-bold text-white mb-2">{screenshot.title}</h3>
                                        {screenshot.description && (
                                            <p className="text-sm text-zinc-400">{screenshot.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightboxImage.imageUrl}
                            alt={lightboxImage.title}
                            className="w-full h-auto rounded-3xl"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">{lightboxImage.title}</h3>
                            {lightboxImage.description && (
                                <p className="text-zinc-400">{lightboxImage.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
