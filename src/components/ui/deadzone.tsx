import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
    eyebrow,
    title,
    description,
    align = "left",
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: "left" | "center";
}) {
    return (
        <div className={cn("mb-10", align === "center" && "text-center mx-auto max-w-3xl")}>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-red-400">
                {eyebrow}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-sm md:text-base leading-7 text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}

export function GlassCard({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/55 shadow-2xl shadow-black/40 backdrop-blur-2xl",
                "before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-red-500/[0.05]",
                className
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export function RomBadge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-red-200",
                className
            )}
        >
            {children}
        </span>
    );
}

export function StatusBadge({
    stable,
    test,
}: {
    stable?: boolean;
    test?: boolean;
}) {
    const label = test ? "Test Build" : stable === false ? "Experimental" : "Stable";
    const classes = test
        ? "border-amber-400/25 bg-amber-500/10 text-amber-200"
        : stable === false
            ? "border-zinc-400/20 bg-white/5 text-zinc-300"
            : "border-emerald-400/25 bg-emerald-500/10 text-emerald-200";

    return (
        <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]", classes)}>
            {label}
        </span>
    );
}

export function PlatformPill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-zinc-200">
            {children}
        </span>
    );
}
