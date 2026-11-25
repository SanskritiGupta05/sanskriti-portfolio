"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const EN = ["Sa", "n", "s", "kri", "ti"];
const JA = ["サ", "ン", "ス", "クリ", "ティ"];
const START_MS = 2500;
const HOLD_MS = 4000;
const EASE = [0.4, 0, 0.2, 1] as const;

export function NameSwap({ className = "" }: { className?: string }) {
    const reduce = useReducedMotion();
    const [ja, setJa] = useState(false);
    const [w, setW] = useState<{ en: number; ja: number } | null>(null);
    const enRef = useRef<HTMLSpanElement>(null);
    const jaRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const measure = () =>
            setW({ en: enRef.current?.offsetWidth ?? 0, ja: jaRef.current?.offsetWidth ?? 0 });
        measure();
        document.fonts?.ready.then(measure);
    }, []);

    useEffect(() => {
        if (reduce) return;
        let timer = window.setTimeout(function tick() {
            setJa((v) => !v);
            timer = window.setTimeout(tick, HOLD_MS);
        }, START_MS);
        return () => window.clearTimeout(timer);
    }, [reduce]);

    const layer = (parts: string[], shown: boolean) =>
        parts.map((p, i) => (
            <motion.span
                key={i}
                className="inline-block"
                initial={false}
                animate={
                    shown
                        ? { opacity: 1, filter: "blur(0px)", y: 0 }
                        : { opacity: 0, filter: "blur(4px)", y: shown ? 0 : "0.12em" }
                }
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
            >
                {p}
            </motion.span>
        ));

    return (
        <motion.span
            role="text"
            aria-label="Sanskriti"
            className={`relative inline-block whitespace-nowrap align-bottom ${className}`}
            initial={false}
            animate={w ? { width: ja ? w.ja : w.en } : undefined}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
            <span ref={enRef} aria-hidden="true" className="inline-block">
                {layer(EN, !ja)}
            </span>
            <span
                ref={jaRef}
                aria-hidden="true"
                className="font-jp absolute top-0 left-0 inline-block text-[0.92em] font-light tracking-[0.02em]"
            >
                {layer(JA, ja)}
            </span>
        </motion.span>
    );
}
