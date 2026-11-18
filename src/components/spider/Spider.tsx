"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useReducedMotion } from "motion/react";
import { HoloTilt } from "./Holo";

// Pieces for the Spider-Verse case study. Card data, colours and motion numbers are read from
// the live site (spider-verse-cards.netlify.app); the stills are captures of it on a phone.

const RED = "#c8402c";
export const STAGE = "#0b0607";

export const CARDS = [
  { id: "peter", name: "Peter Parker", sub: "The Spider-Man", earth: "Earth-616", no: "#001", a: "#E21B22", b: "#8B0A0F", quote: "True strength isn't in the mask you wear. It's in the choices you make." },
  { id: "miles", name: "Miles Morales", sub: "The Ultimate Spider-Man", earth: "Earth-1610", no: "#002", a: "#3BC4FF", b: "#E21B22", quote: "Your story begins the moment you stop trying to be someone else." },
  { id: "gwen", name: "Spider-Gwen", sub: "Gwen Stacy", earth: "Earth-65", no: "#003", a: "#FF4DB8", b: "#3DFFF0", quote: "Move with purpose, fight with heart, and never lose yourself." },
  { id: "miguel", name: "Miguel O'Hara", sub: "The Spider of Tomorrow", earth: "Earth-928", no: "#004", a: "#1E5CFF", b: "#E21B22", quote: "The future belongs to those willing to rewrite it." },
  { id: "noir", name: "Spider-Man Noir", sub: "The Shadow Web-Slinger", earth: "Earth-90214", no: "#005", a: "#D21B1C", b: "#4A0A0C", quote: "Hope shines brightest where the shadows run deepest." },
  { id: "punk", name: "Spider-Punk", sub: "The Anarchic Web-Slinger", earth: "Earth-138", no: "#006", a: "#C8FF2E", b: "#FF2A2A", quote: "Question everything. Especially the rules that were never made for you." },
  { id: "ham", name: "Spider-Ham", sub: "Peter Porker", earth: "Earth-8311", no: "#007", a: "#FF5A5A", b: "#FFD84A", quote: "A little laughter can save the day just as well as superpowers." },
];

// a live capture of the site, in a slim phone outline
export function LivePhone({ name, alt, className = "" }: { name: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[30px] bg-[#111] p-[5px] shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${className}`}>
      <div className="overflow-hidden rounded-[25px]">
        <Image src={`/assets/cases/spider/${name}.webp`} alt={alt} width={420} height={908} sizes="240px" className="block h-auto w-full" />
      </div>
    </div>
  );
}

// ——— flow chart 1: the feeling I was designing for ———
const BEATS = [
  { x: 70, y: 150, t: "Open", d: "Tap the button" },
  { x: 250, y: 96, t: "Wait", d: "A 5.8s orbit" },
  { x: 430, y: 26, t: "Reveal", d: "One card pulled out" },
  { x: 570, y: 66, t: "Joy", d: "Your colours + quote" },
];

// a smooth line through the beats (Catmull-Rom turned into cubic Béziers)
const PTS = [{ x: 20, y: 174 }, ...BEATS, { x: 612, y: 72 }];
const CURVE = PTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const p0 = PTS[i - 2] ?? PTS[i - 1];
  const p1 = PTS[i - 1];
  const p2 = PTS[i + 1] ?? p;
  const c1 = { x: p1.x + (p.x - p0.x) / 6, y: p1.y + (p.y - p0.y) / 6 };
  const c2 = { x: p.x - (p2.x - p1.x) / 6, y: p.y - (p2.y - p1.y) / 6 };
  return `${d} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p.x} ${p.y}`;
}, "");

export function FeelingCurve() {
  return (
    <figure className="grid gap-3">
      <div className="rounded-2xl border border-line bg-bg p-4 md:p-6">
        <svg viewBox="0 0 620 230" className="h-auto w-full overflow-visible" role="img" aria-label="Excitement rises from opening the pack, through the wait, to a peak at the reveal, then settles into joy">
          <line x1="20" y1="180" x2="610" y2="180" stroke="currentColor" className="text-line" />
          <text x="20" y="12" className="fill-muted-foreground text-[11px]">excitement</text>
          <motion.path
            d={CURVE}
            fill="none"
            stroke={RED}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {BEATS.map((b, i) => (
            <motion.g key={b.t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.35 }}>
              <line x1={b.x} y1={b.y} x2={b.x} y2="180" stroke={RED} strokeDasharray="3 4" opacity="0.4" />
              <circle cx={b.x} cy={b.y} r="6" fill={RED} stroke="white" strokeWidth="2.5" />
              <text x={b.x} y="202" textAnchor="middle" className="fill-[currentColor] font-serif text-[15px] text-head">
                {b.t}
              </text>
              <text x={b.x} y="220" textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {b.d}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
      <figcaption className="label">The feeling of opening a pack, and where each beat lives in the app</figcaption>
    </figure>
  );
}

// ——— flow chart 2: how it was made ———
const STEPS = [
  { tool: "Notebook", t: "The feeling", d: "Open, wait, reveal, joy" },
  { tool: "ChatGPT", t: "Words first", d: "A card spec and 7 empty templates" },
  { tool: "Figma", t: "Make them mine", d: "Art, names, Earths, stats, colours" },
  { tool: "Cursor", t: "Bring it alive", d: "Orbit, pick and reveal, vibecoded" },
  { tool: "Capacitor", t: "Hold it", d: "Wrapped as an iOS app" },
  { tool: "X", t: "Share it", d: "Posted a screen recording" },
];

export function ProcessChart() {
  return (
    <figure className="grid gap-3">
      <ol className="grid gap-3 rounded-2xl border border-line bg-bg p-4 sm:grid-cols-3 md:grid-cols-6 md:gap-0 md:p-5">
        {STEPS.map((s, i) => (
          <motion.li
            key={s.t}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative grid content-start gap-1 md:px-2"
          >
            <span className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-sm text-white" style={{ background: RED }}>
                {i + 1}
              </span>
              {i < STEPS.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 border-t border-dashed md:block" style={{ borderColor: RED }} />}
            </span>
            <span className="label mt-1">{s.tool}</span>
            <span className="font-serif text-lg leading-tight text-head">{s.t}</span>
            <span className="text-sm leading-snug text-muted-foreground">{s.d}</span>
          </motion.li>
        ))}
      </ol>
      <figcaption className="label">How it was made, start to finish</figcaption>
    </figure>
  );
}

// ——— the ChatGPT templates, then the finished cards ———
export function TemplateSwap() {
  const [done, setDone] = useState(false);
  return (
    <div className="grid gap-4">
      <div className="flex w-fit gap-1 rounded-full border border-line bg-surface/60 p-1">
        {(["ChatGPT template", "Finished card"] as const).map((t, i) => (
          <button
            key={t}
            type="button"
            aria-pressed={done === (i === 1)}
            onClick={() => setDone(i === 1)}
            className={`rounded-full px-4 py-1 text-sm transition ${done === (i === 1) ? "bg-bg text-head shadow-sm" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ol className="grid grid-cols-4 gap-2 rounded-2xl p-3 sm:grid-cols-7" style={{ background: STAGE }}>
        {CARDS.map((c, i) => (
          <li key={c.id} className="relative aspect-[593/900]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={done ? "f" : "t"}
                className="absolute inset-0"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Image
                  src={done ? `/assets/cases/spider/card-${c.id}.webp` : `/assets/cases/spider/t-${c.id}.webp`}
                  alt={done ? `${c.name} card` : `Empty template for ${c.name}`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ——— the cast: pick a card, and the stage takes its colours, like the app does ———
export function Cast() {
  const [pick, setPick] = useState(1);
  const c = CARDS[pick];
  return (
    <div className="overflow-hidden rounded-[22px] text-[#f4ece6]" style={{ background: STAGE }}>
      <div
        className="grid gap-6 p-5 transition-[background] duration-700 md:grid-cols-[240px_1fr] md:items-center md:p-8"
        style={{ background: `radial-gradient(ellipse 65% 60% at 25% 45%, ${c.a}38 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, ${c.b}22 0%, transparent 60%)` }}
      >
        <HoloTilt className="mx-auto w-[200px] md:w-[240px]" rounded="rounded-[14px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={c.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}>
              <Image src={`/assets/cases/spider/card-${c.id}.webp`} alt={`${c.name} card`} width={540} height={814} sizes="240px" className="block h-auto w-full" />
            </motion.div>
          </AnimatePresence>
        </HoloTilt>
        <div className="grid content-center gap-4">
          <span className="label !text-[#f4ece6]/55">
            {c.no} · Legendary · {c.earth}
          </span>
          <div>
            <h3 className="font-serif text-h1 text-white">{c.name}</h3>
            <p className="text-sm text-[#f4ece6]/65">{c.sub}</p>
          </div>
          <p className="font-serif text-lg text-pretty text-white/90 italic">&ldquo;{c.quote}&rdquo;</p>
          <div className="flex items-center gap-2 text-sm text-[#f4ece6]/60">
            <span className="size-4 rounded-full ring-1 ring-white/20" style={{ background: c.a }} />
            <span className="size-4 rounded-full ring-1 ring-white/20" style={{ background: c.b }} />
            <span className="ml-1">
              {c.a} · {c.b}
            </span>
          </div>
          <div role="tablist" aria-label="Choose a card" className="mt-2 flex flex-wrap gap-1.5">
            {CARDS.map((k, i) => (
              <button
                key={k.id}
                role="tab"
                aria-selected={i === pick}
                onClick={() => setPick(i)}
                className={`rounded-full border px-3 py-1 text-sm transition ${i === pick ? "border-white/60 bg-white/10 text-white" : "border-white/10 text-[#f4ece6]/60 hover:text-white"}`}
              >
                {k.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ——— flow chart 3: the reveal, to the millisecond ———
const PHASES = [
  { ms: 280, t: "Hold", d: "The stack sits still for a beat", still: "live-stack" },
  { ms: 620, t: "Wake", d: "Cards lift off the stack", still: null },
  { ms: 900, t: "Prepare", d: "They spread into a ring", still: null },
  { ms: 5800, t: "Orbit", d: "Ramp up, weave, then coast", still: "live-orbit" },
];

export function RevealTimeline() {
  const total = PHASES.reduce((s, p) => s + p.ms, 0);
  return (
    <figure className="grid gap-5">
      <div className="grid gap-3 rounded-2xl border border-line bg-bg p-4 md:p-5">
        <div className="flex h-11 overflow-hidden rounded-lg border border-line">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.t}
              className="grid min-w-0 place-items-center border-r border-line px-1 text-sm"
              style={{ flexBasis: `${(p.ms / total) * 100}%`, background: i === 3 ? "#fdece6" : "transparent" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="truncate text-head">{p.ms >= 900 ? p.t : ""}</span>
            </motion.div>
          ))}
          <div className="grid shrink-0 place-items-center px-3 text-sm text-white" style={{ background: RED }}>
            Reveal
          </div>
        </div>
        <ol className="grid gap-2 sm:grid-cols-5">
          {[...PHASES, { ms: 0, t: "Reveal", d: "Your card, your colours", still: null }].map((p) => (
            <li key={p.t} className="grid gap-0.5">
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-lg text-head">{p.t}</span>
                {p.ms > 0 && <span className="label">{p.ms}ms</span>}
              </span>
              <span className="text-sm leading-snug text-muted-foreground">{p.d}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          ["live-landing", "Tap"],
          ["live-stack", "The stack wakes"],
          ["live-orbit", "The orbit"],
          ["live-orbit-tint", "Slowing, tinting"],
          ["live-reveal-punk", "The reveal"],
        ].map(([n, c]) => (
          <figure key={n} className="grid gap-2">
            <LivePhone name={n} alt={c} />
            <figcaption className="label">{c}</figcaption>
          </figure>
        ))}
      </div>
      <figcaption className="label">The reveal, phase by phase, with the timings from the live code. Stills are captures of the live site.</figcaption>
    </figure>
  );
}

// ——— the orbit, seen from the side: an ellipse 224 wide and 29 tall, three depth lanes ———
const LANE_Z = [42, 0, -38];
export function OrbitDiagram() {
  const box = useRef<HTMLDivElement>(null);
  const seen = useInView(box, { margin: "60px" });
  const still = useReducedMotion();
  const [t, setT] = useState(0);
  useAnimationFrame((_, dt) => {
    if (seen && !still) setT((v) => v + dt / 1000);
  });
  const cards = CARDS.map((c, i) => {
    const ang = t * 0.9 + (i / CARDS.length) * Math.PI * 2;
    const lane = i % 3;
    const breath = 1 + Math.sin(t * Math.PI * 2 * 0.52) * 0.13 * 0.5;
    const x = Math.cos(ang) * 224 * breath;
    const depth = Math.sin(ang);
    const y = depth * 29;
    const z = depth * 78 + LANE_Z[lane];
    const scale = 0.62 + ((z + 120) / 240) * 0.5;
    return { ...c, x, y, z, scale };
  }).sort((p, q) => p.z - q.z);
  return (
    <figure className="grid gap-3">
      <div ref={box} className="relative overflow-hidden rounded-2xl" style={{ background: STAGE }}>
        <svg viewBox="-300 -110 600 220" className="h-auto w-full" role="img" aria-label="Seven cards orbiting on a flat ellipse, passing in front of and behind each other">
          <ellipse cx="0" cy="0" rx="224" ry="29" fill="none" stroke="white" strokeOpacity="0.15" strokeDasharray="4 6" />
          {cards.map((c) => (
            <g key={c.id} transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) scale(${c.scale.toFixed(3)})`} opacity={c.z < -60 ? 0.6 : 1}>
              <rect x="-24" y="-36" width="48" height="72" rx="5" fill="#140c0d" stroke={c.a} strokeWidth="2" />
              <rect x="-17" y="-28" width="34" height="34" rx="2" fill={c.a} opacity="0.35" />
              <rect x="-17" y="12" width="34" height="4" rx="2" fill={c.b} opacity="0.8" />
              <rect x="-17" y="20" width="22" height="4" rx="2" fill="white" opacity="0.3" />
            </g>
          ))}
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-5 gap-y-1 p-3 text-sm text-[#f4ece6]/60">
          <span>radius 224 × 29</span>
          <span>depth 78</span>
          <span>3 lanes: +42, 0, −38</span>
          <span>breathes ±13% at 0.52Hz</span>
        </div>
      </div>
      <figcaption className="label">The shuffle, redrawn from the live code&apos;s numbers</figcaption>
    </figure>
  );
}
