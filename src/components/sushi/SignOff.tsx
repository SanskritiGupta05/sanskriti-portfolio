"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// The footer's "hire me" sign-off: a heading over the noren, like the shop's name above its door
// (Sanskriti's pick). A small playful flourish rides on it; four to compare on /lab/footer-socials:
//   swap  – "Japan trip" drifts into 日本旅行 (nihon ryokō) and back, like her name in the hero
//   plane – a tiny paper plane flies a dotted loop over the line once, when it comes into view
//   stamp – a red passport-style stamp, 旅 ("trip"), thumps down beside the line
//   fund  – a "Japan trip fund" meter: every sushi a visitor picks off the belt chips in its plate price
export type Flourish = "none" | "swap" | "plane" | "stamp" | "fund";

const EASE = [0.4, 0, 0.2, 1] as const;

function TripSwap() {
  const reduce = useReducedMotion();
  const [ja, setJa] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setJa((v) => !v), 3600);
    return () => window.clearInterval(t);
  }, [reduce]);
  const layer = (text: string, shown: boolean, className = "") => (
    <motion.span
      className={`col-start-1 row-start-1 ${className}`}
      initial={false}
      animate={shown ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(4px)", y: "0.12em" }}
      transition={{ duration: 0.55, ease: EASE }}
      aria-hidden={!shown}
    >
      {text}
    </motion.span>
  );
  return (
    <span className="inline-grid justify-items-start align-baseline">
      {layer("Japan trip.", !ja, "font-worn")}
      {layer("日本旅行", ja, "font-jp font-light tracking-[0.04em]")}
    </span>
  );
}

// a paper plane that flies a dotted loop across the heading once, then parks at the end
function Plane() {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const path = "M8 40 C 90 0, 170 50, 250 24 S 380 0, 430 22 S 520 44, 548 12";
  return (
    <svg ref={ref} viewBox="0 0 560 50" aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[54px] h-[50px] w-full overflow-visible">
      <defs>
        {/* the dotted trail is uncovered by a solid stroke that grows along the same path */}
        <mask id="plane-trail" maskUnits="userSpaceOnUse" x="-20" y="-20" width="600" height="90">
          <motion.path
            d={path}
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={seen ? { pathLength: 1 } : undefined}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </mask>
      </defs>
      <path d={path} fill="none" stroke="var(--scribble)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0.1 6" opacity="0.8" mask="url(#plane-trail)" />
      <motion.g
        initial={{ offsetDistance: reduce ? "100%" : "0%" } as never}
        animate={seen ? ({ offsetDistance: "100%" } as never) : undefined}
        transition={{ duration: 2.2, ease: "easeInOut" }}
        style={{ offsetPath: `path("${path}")`, offsetRotate: "auto" } as never}
      >
        {/* a folded paper plane, nose pointing along the path */}
        <path d="M10 0 L-8 -7 L-4 0 L-8 7Z" fill="var(--bg)" stroke="var(--scribble)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M10 0 L-4 0" stroke="var(--scribble)" strokeWidth="1.1" />
      </motion.g>
    </svg>
  );
}

// a round red hanko/passport stamp with 旅 ("trip"), thumping down once in view
function Stamp() {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-[-6px] -right-[64px] grid max-md:top-auto max-md:-right-1 max-md:-bottom-12 max-md:size-[44px] size-[52px] place-items-center rounded-full border-2 border-[var(--scribble)] font-mono text-[var(--scribble)] mix-blend-multiply dark:mix-blend-normal"
      initial={reduce ? { opacity: 0.85, rotate: -12 } : { opacity: 0, scale: 1.8, rotate: -4 }}
      animate={seen ? { opacity: 0.85, scale: 1, rotate: -12 } : undefined}
      transition={{ delay: 0.5, type: "spring", stiffness: 520, damping: 20 }}
    >
      <span className="absolute inset-[4px] rounded-full border border-dashed border-current opacity-60" />
      <span className="font-jp text-[22px] leading-none font-semibold">旅</span>
      <span className="absolute bottom-[7px] text-[7px] tracking-[0.18em]">2026</span>
    </motion.span>
  );
}

// kaiten-zushi style: the plate colour sets the price
const PRICE: Record<string, number> = { blue: 100, pink: 150, cream: 200, red: 300, matcha: 350, lacquer: 500 };
const GOAL = 300000;
const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

function Fund({ saved, last }: { saved: number; last: number | null }) {
  return (
    <div className="mt-3 grid w-full max-w-[300px] gap-1.5 text-sm text-muted-foreground">
      <div className="flex items-baseline justify-between gap-3">
        <span className="label">Japan trip fund</span>
        <span className="relative text-ink tabular-nums">
          {yen(saved)}
          {last !== null && (
            <motion.span
              key={saved}
              className="absolute -top-4 right-0 text-[11px] text-[var(--scribble)]"
              initial={{ opacity: 1, y: 4 }}
              animate={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.1 }}
            >
              +{yen(last)}
            </motion.span>
          )}
        </span>
      </div>
      <div className="skeu-sunk h-1.5 overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full bg-[var(--scribble)]"
          initial={false}
          animate={{ width: `${Math.max(1.5, Math.min(100, (saved / GOAL) * 100))}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      <span className="text-[12px]">{saved ? "Arigatō! Keep the sushi coming." : "Pick a sushi off the belt to chip in."}</span>
    </div>
  );
}

export function useTripFund() {
  const [state, setState] = useState({ saved: 0, last: null as number | null });
  const add = (plate: string) => setState((s) => ({ saved: s.saved + (PRICE[plate] ?? 100), last: PRICE[plate] ?? 100 }));
  return { ...state, add };
}

export function SignOffSign({ flourish = "none", fund }: { flourish?: Flourish; fund?: { saved: number; last: number | null } }) {
  return (
    <div className="relative z-10 mx-auto mt-[24px] grid max-w-[560px] justify-items-center gap-2 px-6 text-center">
      <span className="label">Before you go</span>
      <p className="relative font-serif text-h2m text-balance text-head md:text-h2">
        Hire me, so I can fund my dream{" "}
        {flourish === "swap" ? (
          <TripSwap />
        ) : (
          <span className="relative inline-block font-worn">
            Japan trip.
            {flourish === "stamp" && <Stamp />}
          </span>
        )}
      </p>
      {flourish === "plane" && <Plane />}
      {flourish === "fund" && fund && <Fund {...fund} />}
    </div>
  );
}
