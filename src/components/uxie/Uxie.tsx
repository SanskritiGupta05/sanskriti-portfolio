"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Pieces for the UXie (UX Laws) case study: her own screen recordings as looping clips,
// Figma screens in a phone outline, and the flow charts drawn in HTML/SVG.

const RED = "#c8553b";

// a recording that only plays while it's on screen
export function Clip({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const seen = useInView(ref, { margin: "100px" });
  const still = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (seen && !still) v.play().catch(() => {});
    else v.pause();
  }, [seen, still]);
  return (
    <figure className={`grid gap-2 ${className}`}>
      <div className="overflow-hidden rounded-[22px] border border-line bg-surface/40 shadow-[0_24px_40px_-30px_rgba(60,40,20,0.55)]">
        <video
          ref={ref}
          src={`/assets/cases/uxie/${src}.mp4`}
          poster={`/assets/cases/uxie/${src}.jpg`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="block aspect-[480/854] h-auto w-full object-cover"
        />
      </div>
      <figcaption className="label">{label}</figcaption>
    </figure>
  );
}

// the wide showreel in the hero
export function Reel() {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  useEffect(() => {
    if (still) ref.current?.pause();
  }, [still]);
  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-surface/40">
      <video
        ref={ref}
        src="/assets/cases/uxie/showreel.mp4"
        poster="/assets/cases/uxie/showreel.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        aria-label="UXie showreel"
        className="block aspect-[4/3] h-auto w-full object-cover"
      />
    </div>
  );
}

// a Figma screen in a thin phone outline
export function Screen({ name, caption }: { name: string; caption?: string }) {
  return (
    <figure className="grid content-start gap-2">
      <div className="overflow-hidden rounded-[24px] border border-line bg-bg shadow-[0_18px_30px_-26px_rgba(60,40,20,0.5)]">
        <Image src={`/assets/cases/uxie/fig-${name}.webp`} alt={caption ?? name} width={402} height={874} sizes="220px" className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="label">{caption}</figcaption>}
    </figure>
  );
}

export function Screens({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
      {items.map(([n, c]) => (
        <Screen key={n} name={n} caption={c} />
      ))}
    </div>
  );
}

// a recording beside its story
export function Beat({ clip, label, children }: { clip: string; label: string; children: ReactNode }) {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-[220px_1fr]">
      <Clip src={clip} label={label} className="mx-auto w-full max-w-[220px]" />
      <div className="grid content-start gap-6">{children}</div>
    </div>
  );
}

// ——— the eight categories ———
export const CATEGORIES: { name: string; line: string; n: number; tint: string }[] = [
  { name: "Attention & Perception", line: "What users notice, and in what order", n: 37, tint: "#fde3dc" },
  { name: "Simplicity & Effort", line: "Cutting the cost of thinking and doing", n: 24, tint: "#fdf0d2" },
  { name: "Memory & Recall", line: "What sticks, and what fades", n: 38, tint: "#e3f0dc" },
  { name: "Decisions & Choice", line: "How users weigh options and commit", n: 58, tint: "#dcebf5" },
  { name: "Motivation & Habit", line: "What pulls users back", n: 45, tint: "#ece2f5" },
  { name: "Social Influence", line: "How other people shape behaviour", n: 29, tint: "#f5e0ea" },
  { name: "Trust & Credibility", line: "Why users believe a product", n: 24, tint: "#e6e2da" },
  { name: "Feedback & Expectation", line: "Knowing what happened and what's next", n: 24, tint: "#fbe7d3" },
];

export function CategoryGrid() {
  const max = Math.max(...CATEGORIES.map((c) => c.n));
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {CATEGORIES.map((c, i) => (
        <motion.li
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: (i % 2) * 0.06 + Math.floor(i / 2) * 0.05 }}
          className="grid gap-2 rounded-2xl border border-line bg-bg p-4"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="flex items-center gap-2 font-serif text-lg text-head">
              <span aria-hidden="true" className="size-3 rounded-full border border-black/10" style={{ background: c.tint }} />
              {c.name}
            </span>
            <span className="label">{c.n} laws</span>
          </div>
          <p className="printed text-sm text-muted-foreground">{c.line}</p>
          <span aria-hidden="true" className="h-1.5 rounded-full bg-surface">
            <span className="block h-full rounded-full" style={{ width: `${(c.n / max) * 100}%`, background: c.tint, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }} />
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

// ——— flow chart 1: the core loop ———
const LOOP = [
  { k: "01", t: "Explore", d: "Swipe the deck of 8 categories" },
  { k: "02", t: "Browse", d: "A grid of illustrated law cards" },
  { k: "03", t: "Recall", d: "\"Think you remember?\" then flip" },
  { k: "04", t: "Learn", d: "Read the law, or listen to it" },
  { k: "05", t: "Play", d: "5 questions, with the why" },
];

export function LoopChart() {
  return (
    <figure className="grid gap-3">
      <div className="relative rounded-2xl border border-line bg-bg px-4 pt-6 pb-16 md:px-6">
        <ol className="relative z-10 grid gap-3 md:grid-cols-5 md:gap-0">
          {LOOP.map((s, i) => (
            <li key={s.k} className="flex items-center md:flex-col md:items-stretch">
              <div className="flex w-full items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="grid flex-1 gap-1 rounded-xl border border-line bg-surface/50 p-3"
                >
                  <span className="label" style={{ color: RED }}>
                    {s.k}
                  </span>
                  <span className="font-serif text-lg text-head">{s.t}</span>
                  <span className="text-sm leading-snug text-muted-foreground">{s.d}</span>
                </motion.div>
                {i < LOOP.length - 1 && (
                  <span aria-hidden="true" className="hidden w-6 shrink-0 text-center text-muted-foreground md:block">
                    →
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
        {/* the way back: results send you to the laws you missed, and the deck is always one tap away */}
        <svg aria-hidden="true" className="absolute inset-x-6 bottom-3 hidden h-12 w-[calc(100%-3rem)] md:block" viewBox="0 0 100 20" preserveAspectRatio="none">
          <motion.path
            d="M 90 0 C 90 18, 10 18, 10 0"
            fill="none"
            stroke={RED}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
          />
        </svg>
        <span className="label absolute bottom-3 left-1/2 hidden -translate-x-1/2 bg-bg px-2 md:block" style={{ color: RED }}>
          missed one? back to that law
        </span>
      </div>
      <figcaption className="label">The core loop: see it, try to remember it, learn it, test it.</figcaption>
    </figure>
  );
}

// ——— flow chart 2: the app map ———
const BRANCHES: { root: string; steps: string[] }[] = [
  { root: "Category", steps: ["Law cards grid", "Flashcard", "Law page", "Related laws"] },
  { root: "Play", steps: ["Intro", "5 questions", "Correct / Not quite + Why?", "Results x/5"] },
  { root: "Saved", steps: ["Folders", "Law page"] },
  { root: "Search", steps: ["Results", "Law page"] },
];

export function AppMap() {
  return (
    <figure className="grid gap-3">
      <div className="rounded-2xl border border-line bg-bg p-5 md:p-6">
        <div className="mx-auto w-fit rounded-full border border-ink bg-ink px-4 py-1.5 text-sm text-bg">Home · the deck</div>
        <div aria-hidden="true" className="mx-auto h-5 w-px bg-line" />
        <div className="grid gap-6 md:grid-cols-4 md:gap-3">
          {BRANCHES.map((b, bi) => (
            <div key={b.root} className="relative grid content-start justify-items-center">
              {/* the bar joining the branches */}
              <span aria-hidden="true" className={`absolute top-0 hidden h-px bg-line md:block ${bi === 0 ? "left-1/2 right-0" : bi === BRANCHES.length - 1 ? "left-0 right-1/2" : "inset-x-0"}`} />
              <span aria-hidden="true" className="hidden h-4 w-px bg-line md:block" />
              <span className="rounded-full border px-3 py-1 text-sm text-head" style={{ borderColor: RED }}>
                {b.root}
              </span>
              {b.steps.map((s) => (
                <div key={s} className="grid justify-items-center">
                  <span aria-hidden="true" className="h-4 w-px bg-line" />
                  <span className="max-w-[16ch] rounded-lg border border-line bg-surface/50 px-2.5 py-1 text-center text-sm leading-snug text-ink">{s}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="printed mt-6 text-center text-sm text-muted-foreground">Every road ends on the same law page, so there is one place to get right.</p>
      </div>
      <figcaption className="label">The app map: four doors, one law page.</figcaption>
    </figure>
  );
}

// ——— the anatomy of a law page ———
const PARTS: [string, string][] = [
  ["The idea", "The law in one plain sentence."],
  ["Why it matters", "What it changes for the person using the product."],
  ["In UX", "Three things to actually do about it."],
  ["Example", "Where you've already met it."],
  ["Design takeaway", "The line to remember if you forget the rest."],
  ["Related laws", "Where to go next, so reading turns into wandering."],
  ["Origin & further reading", "The research it comes from, for the curious."],
];

export function Anatomy() {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-[200px_1fr]">
      <figure className="grid gap-2">
        <div className="h-[520px] overflow-y-auto rounded-[22px] border border-line bg-bg [scrollbar-width:thin]">
          <Image src="/assets/cases/uxie/fig-lawpage-full.webp" alt="A full law page from the Figma file, Expectations Bias" width={389} height={2400} sizes="200px" className="block h-auto w-full" />
        </div>
        <figcaption className="label">Scroll it: the full page, from Figma</figcaption>
      </figure>
      <ol className="grid gap-3">
        {PARTS.map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[28px_1fr] items-baseline gap-2 border-b border-dashed border-line pb-3">
            <span className="label" style={{ color: RED }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="font-serif text-lg text-head">{t}</span>
              <p className="printed text-sm text-muted-foreground">{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
