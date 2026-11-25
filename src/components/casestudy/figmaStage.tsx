"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";

export const FIGMA_FONT = {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};
export const HQ = "/assets/cases/bounce/v5/hq";
export const C = {
    blue: "#0d99ff",
    orange: "#ff7a29",
    green: "#14ae5c",
    red: "#f24822",
    purple: "#9747ff",
};

export function useStageClock(total: number) {
    const wrap = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [t, setT] = useState(0);
    const raf = useRef<number | undefined>(undefined);
    const start = useRef(0);
    const play = () => {
        if (raf.current) cancelAnimationFrame(raf.current);
        start.current = performance.now();
        setT(0);
        const tick = (now: number) => {
            const e = Math.floor((now - start.current) / 100) * 100;
            setT((prev) => (e !== prev ? e : prev));
            if (e < total + 200) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
    };
    return { wrap, scale, setScale, t, setT, play, raf };
}

export function Stage({
    w,
    h,
    total,
    children,
}: {
    w: number;
    h: number;
    total: number;
    children: (t: number, replay: () => void, done: boolean) => ReactNode;
}) {
    const { wrap, scale, setScale, t, setT, play, raf } = useStageClock(total);
    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / w)));
        ro.observe(el);
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        let started = false;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting || started) return;
                started = true;
                io.disconnect();
                if (reduce) setT(total + 1);
                else play();
            },
            { threshold: 0.45 },
        );
        io.observe(el);
        const r = raf;
        return () => {
            ro.disconnect();
            io.disconnect();
            if (r.current) cancelAnimationFrame(r.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            ref={wrap}
            className="relative w-full overflow-hidden rounded-2xl border border-black/[0.05] bg-[#f5f5f5]"
            style={{ height: h * scale }}
        >
            <div
                className="absolute top-0 left-0 origin-top-left"
                style={{
                    width: w,
                    height: h,
                    transform: `scale(${scale})`,
                    ...FIGMA_FONT,
                }}
            >
                {children(t, play, t >= total)}
            </div>
            <style>{`@keyframes figfade { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }`}</style>
        </div>
    );
}

export function Tabs({ labels, active }: { labels: string[]; active: number }) {
    return (
        <div className="absolute top-5 left-6 flex items-center gap-1 rounded-lg border border-[#e2e2e2] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {labels.map((label, i) => {
                const on = active === i;
                return (
                    <span
                        key={label}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-300 ${on ? "bg-[#1e1e1e] text-white" : "text-[#8c8c8c]"}`}
                    >
                        <span
                            className={`grid size-4 place-items-center rounded-full text-[10px] ${on ? "bg-white text-[#1e1e1e]" : "bg-[#efefef] text-[#8c8c8c]"}`}
                        >
                            {i + 1}
                        </span>
                        {label}
                    </span>
                );
            })}
        </div>
    );
}

export function Caption({
    step,
    text,
    done,
    onReplay,
    color,
}: {
    step: number;
    text: string;
    done: boolean;
    onReplay: () => void;
    color?: string;
}) {
    return (
        <div className="absolute right-6 bottom-5 left-6 flex items-center gap-3 rounded-lg border border-[#e2e2e2] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span
                className="grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white transition-colors duration-300"
                style={{ background: color ?? "#1e1e1e" }}
            >
                {step}
            </span>
            <span
                key={text}
                className="animate-[figfade_400ms_ease] text-[13px] leading-[18px] text-[#1e1e1e]"
            >
                {text}
            </span>
            <button
                type="button"
                onClick={onReplay}
                className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-md border border-[#e2e2e2] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1e1e1e] transition-opacity hover:bg-[#f5f5f5] ${done ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                        d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Replay
            </button>
        </div>
    );
}

export function SectionBox({
    x,
    y,
    w,
    h,
    label,
    after,
    show = true,
}: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    after?: boolean;
    show?: boolean;
}) {
    return (
        <div
            className={`absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${show ? "opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ left: x, top: y, width: w, height: h }}
        >
            <div
                className={`absolute inset-0 rounded-md border ${after ? "border-[#bfe7c9] bg-[#f3fbf5]" : "border-[#e2e2e2] bg-white"}`}
            />
            <span
                className={`absolute rounded px-2 py-[3px] text-[11px] font-medium ${after ? "bg-[#14ae5c] text-white" : "bg-[#e6e6e6] text-[#1e1e1e]"}`}
                style={{ left: 18, top: 14 }}
            >
                {label}
            </span>
        </div>
    );
}

export function FrameName({
    x,
    y,
    children,
    show = true,
}: {
    x: number;
    y: number;
    children: ReactNode;
    show?: boolean;
}) {
    return (
        <span
            className={`absolute text-[11px] text-[#8c8c8c] transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
            style={{ left: x, top: y }}
        >
            {children}
        </span>
    );
}

export function Screen({
    x,
    y,
    w,
    h,
    srcs,
    active = 0,
    alt,
    dim,
    show = true,
}: {
    x: number;
    y: number;
    w: number;
    h: number;
    srcs: string[];
    active?: number;
    alt: string;
    dim?: boolean;
    show?: boolean;
}) {
    return (
        <div
            className={`absolute overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.09] transition-all duration-700 ${dim ? "opacity-30 grayscale" : show ? "opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ left: x, top: y, width: w, height: h }}
        >
            {srcs.map((s, i) => (
                <Image
                    key={s}
                    src={`${HQ}/${s}.webp`}
                    alt={i === active ? alt : ""}
                    width={1320}
                    height={Math.round((1320 * h) / w)}
                    unoptimized
                    className="absolute inset-0 block h-full w-full object-cover object-top transition-opacity duration-500"
                    style={{ opacity: i === active ? 1 : 0 }}
                />
            ))}
        </div>
    );
}

export function Highlight({
    x,
    y,
    w,
    h,
    color,
    label,
    show,
    below,
}: {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    label: string;
    show: boolean;
    below?: boolean;
}) {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[6px] border-2 border-dashed transition-all duration-500 ease-out"
            style={{
                left: x - 2,
                top: y - 2,
                width: w + 4,
                height: h + 4,
                borderColor: color,
                background: `${color}14`,
                opacity: show ? 1 : 0,
                transform: show ? "scale(1)" : "scale(0.95)",
            }}
        >
            <span
                className="absolute left-0 rounded px-1.5 py-[2px] text-[10px] font-semibold whitespace-nowrap text-white shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                style={{
                    background: color,
                    [below ? "top" : "bottom"]: "calc(100% + 3px)",
                }}
            >
                {label}
            </span>
        </span>
    );
}

export function Pin({
    x,
    y,
    n,
    show,
    color = C.purple,
}: {
    x: number;
    y: number;
    n: number | string;
    show: boolean;
    color?: string;
}) {
    return (
        <span
            className={`absolute grid size-6 place-items-center rounded-[12px] rounded-bl-[2px] border-2 border-white text-[11px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            style={{ left: x, top: y, background: color }}
        >
            {n}
        </span>
    );
}

export function CommentCard({
    n,
    title,
    sub,
    show,
    color = C.purple,
}: {
    n: number | string;
    title: string;
    sub: string;
    show: boolean;
    color?: string;
}) {
    return (
        <div
            className={`flex gap-2.5 rounded-[10px] bg-white p-3 shadow-[0_4px_14px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out ${show ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
        >
            <span
                className="grid size-5 shrink-0 place-items-center rounded-[10px] rounded-bl-[2px] text-[10px] font-semibold text-white"
                style={{ background: color }}
            >
                {n}
            </span>
            <span className="grid gap-1">
                <span className="text-[12px] leading-4 font-semibold text-[#1e1e1e]">{title}</span>
                <span className="text-[11px] leading-[15px] text-[#5c5c5c]">{sub}</span>
            </span>
        </div>
    );
}

export function Cursor({
    x,
    y,
    show,
    clicking,
}: {
    x: number;
    y: number;
    show: boolean;
    clicking?: boolean;
}) {
    return (
        <span
            className="pointer-events-none absolute z-20 transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ left: x, top: y, opacity: show ? 1 : 0 }}
        >
            <span
                className={`absolute -top-3 -left-3 size-6 rounded-full bg-[#0d99ff]/30 transition-transform duration-300 ${clicking ? "scale-150 opacity-100" : "scale-0 opacity-0"}`}
            />
            <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                aria-hidden="true"
                className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
                <path
                    d="M1 1 L1 16 L5 12.5 L8 19 L10.5 17.8 L7.5 11.5 L13 11.5 Z"
                    fill="#1e1e1e"
                    stroke="#fff"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

export function Spotlight({
    phone,
    area,
    color,
    show,
}: {
    phone: { x: number; y: number; w: number; h: number };
    area: { x: number; y: number; w: number; h: number };
    color: string;
    show: boolean;
}) {
    const pad = 4;
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute overflow-hidden rounded-[14px]"
            style={{ left: phone.x, top: phone.y, width: phone.w, height: phone.h }}
        >
            <span
                className="absolute rounded-[8px]"
                style={{
                    left: area.x - phone.x - pad,
                    top: area.y - phone.y - pad,
                    width: area.w + pad * 2,
                    height: area.h + pad * 2,
                    border: `1.5px solid ${show ? color : "transparent"}`,
                    boxShadow: `0 0 0 999px rgba(24,24,27,${show ? 0.34 : 0})`,
                    transform: show ? "scale(1)" : "scale(1.04)",
                    transition:
                        "box-shadow 450ms cubic-bezier(0.22,1,0.36,1), border-color 450ms cubic-bezier(0.22,1,0.36,1), transform 450ms cubic-bezier(0.22,1,0.36,1)",
                }}
            />
        </div>
    );
}

export function NoteCard({
    n,
    title,
    sub,
    color,
    state,
    onFocus,
    onBlur,
    compact,
}: {
    n: number;
    title: string;
    sub: string;
    color: string;
    state: "hidden" | "active" | "read" | "rest";
    onFocus?: () => void;
    onBlur?: () => void;
    compact?: boolean;
}) {
    const shown = state !== "hidden";
    const active = state === "active";
    return (
        <div
            tabIndex={state === "rest" ? 0 : -1}
            onMouseEnter={onFocus}
            onMouseLeave={onBlur}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`relative flex rounded-[10px] bg-white outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${compact ? "flex-col gap-2 p-2.5" : "gap-2.5 p-3"} ${shown ? "translate-0" : `pointer-events-none ${compact ? "translate-y-2" : "translate-x-3"}`} ${state === "rest" ? "cursor-default hover:-translate-y-0.5" : ""}`}
            style={{
                opacity: !shown ? 0 : state === "read" ? 0.5 : 1,
                boxShadow: active
                    ? `0 8px 22px -6px rgba(0,0,0,0.16), 0 0 0 1.5px ${color}`
                    : "0 4px 14px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.07)",
            }}
        >
            <span
                className="grid size-5 shrink-0 place-items-center rounded-[10px] rounded-bl-[2px] text-[10px] font-semibold text-white"
                style={{ background: color }}
            >
                {n}
            </span>
            <span className="grid gap-1">
                <span className="text-[12px] leading-4 font-semibold text-[#1e1e1e]">{title}</span>
                <span className="text-[11px] leading-[15px] text-[#5c5c5c]">{sub}</span>
            </span>
        </div>
    );
}
