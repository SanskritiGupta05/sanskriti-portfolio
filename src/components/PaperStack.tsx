"use client";

import {
    motion,
    type MotionValue,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react";
import { createRef, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";

function usePinTop(ref: React.RefObject<HTMLDivElement | null>) {
    const [pinTop, setPinTop] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const fit = () => setPinTop(Math.min(0, window.innerHeight - el.offsetHeight));
        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(el);
        window.addEventListener("resize", fit);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", fit);
        };
    }, [ref]);
    return pinTop;
}

export function PaperStack({
    hero,
    sheets,
}: {
    hero: ReactNode;
    sheets: { id: string; content: ReactNode }[];
}) {
    const heroRef = useRef<HTMLDivElement>(null);
    const [refs] = useState(() =>
        sheets.map(() => createRef<HTMLDivElement>() as RefObject<HTMLDivElement | null>),
    );
    const pinTop = usePinTop(heroRef);
    const still = useReducedMotion();

    const firstRise = useRise(refs[0], true);
    const heroScale = useTransform(firstRise, [0, 1], [1, 0.95]);
    const heroFade = useTransform(firstRise, [0, 1], [1, 0.55]);

    return (
        <>
            <motion.div
                ref={heroRef}
                className="sticky origin-top"
                style={{
                    top: pinTop,
                    scale: still ? 1 : heroScale,
                    opacity: still ? 1 : heroFade,
                }}
            >
                {hero}
            </motion.div>
            {sheets.map((sh, i) => (
                <Sheet
                    key={sh.id}
                    id={sh.id}
                    layer={i}
                    pin={i < sheets.length - 1}
                    own={refs[i]}
                    next={refs[i + 1] ?? refs[i]}
                >
                    {sh.content}
                </Sheet>
            ))}
        </>
    );
}

function useRise(ref: React.RefObject<HTMLDivElement | null>, on: boolean): MotionValue<number> {
    const rise = useMotionValue(0);
    useEffect(() => {
        if (!on) return;
        const update = () => {
            const el = ref.current;
            if (!el) return;
            const h = window.innerHeight;
            const top = el.getBoundingClientRect().top;
            rise.set(Math.min(1, Math.max(0, (h - top) / h)));
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        const ro = new ResizeObserver(update);
        ro.observe(document.body);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            ro.disconnect();
        };
    }, [ref, on, rise]);
    return rise;
}

function Sheet({
    id,
    layer,
    pin,
    own: ref,
    next,
    children,
}: {
    id: string;
    layer: number;
    pin: boolean;
    own: React.RefObject<HTMLDivElement | null>;
    next: React.RefObject<HTMLDivElement | null>;
    children: ReactNode;
}) {
    const pinTop = usePinTop(ref);
    const still = useReducedMotion();
    const under = useRise(next, pin && next !== ref);
    const sinkScale = useTransform(under, [0, 1], [1, 0.95]);
    const veil = useTransform(under, [0, 1], [0, 0.5]);
    const sinks = pin && !still;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });
    const tilt = useTransform(scrollYProgress, [0, 0.7], [layer % 2 ? 1.4 : -1.6, 0]);
    const inset = useTransform(scrollYProgress, [0.8, 1], [12, 0]);
    const width = useTransform(inset, (v) => `calc(100vw - ${v * 2}px)`);
    const radius = useTransform(scrollYProgress, [0.8, 1], [22, 0]);

    return (
        <motion.div
            ref={ref}
            id={id}
            className={`ml-[50%] -translate-x-1/2 ${pin ? "sticky" : "relative"}`}
            style={{
                width: still ? "100vw" : width,
                zIndex: 10 + layer,
                ...(pin ? { top: pinTop } : {}),
            }}
        >
            <motion.div className="origin-top" style={sinks ? { scale: sinkScale } : undefined}>
                <motion.div
                    className={`relative border border-line bg-bg shadow-[0_-24px_60px_-34px_rgba(60,40,20,0.45)] [background-image:radial-gradient(color-mix(in_srgb,var(--dot)_40%,transparent)_1.6px,transparent_1.9px)] [background-size:22px_22px] ${layer % 2 ? "origin-top-right" : "origin-top-left"}`}
                    style={{ rotate: still ? 0 : tilt, borderRadius: still ? 0 : radius }}
                >
                    <Paperclip
                        className={`absolute -top-4 ${layer % 2 ? "right-10 md:right-16" : "left-10 md:left-16"}`}
                    />
                    {children}
                    {sinks && (
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-bg"
                            style={{ opacity: veil }}
                        />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function Paperclip({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 46"
            aria-hidden="true"
            className={`h-[46px] w-4 -rotate-6 drop-shadow-[0_2px_1.5px_rgba(40,30,20,0.3)] ${className}`}
        >
            <defs>
                <linearGradient id="clip-steel" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8d8a85" />
                    <stop offset="0.45" stopColor="#d9d6d0" />
                    <stop offset="1" stopColor="#8d8a85" />
                </linearGradient>
            </defs>
            <path
                d="M5.5 16 V8 a3.5 3.5 0 0 1 7 0 V36 a5 5 0 0 1 -10 0 V11 a2 2 0 0 1 4 0 V33"
                fill="none"
                stroke="url(#clip-steel)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
