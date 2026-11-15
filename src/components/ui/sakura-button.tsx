"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

// The hero buttons, built from Sanskriti's two references:
//  - tone "lacquer" (primary, "View work ↗"): a lacquer-red pill with a felt texture, a cherry-blossom sprig top-left,
//    seigaiha waves bottom-right and a cream serif label. Hover: lifts, the sprig sways, the waves drift, the arrow nudges.
//  - tone "paper" (secondary, "Contact ✉"): a cream paper pill with a thin red border, a pink blossom sprig on the left
//    with a falling petal, a red serif label and an envelope. Hover: lifts, the sprig sways, the petal drifts down.

const petal = (r: number) =>
  `M0 0C${-r * 0.95} ${-r * 0.35} ${-r * 0.72} ${-r * 1.05} ${-r * 0.14} ${-r * 1.02}L0 ${-r * 0.88}L${r * 0.14} ${-r * 1.02}C${r * 0.72} ${-r * 1.05} ${r * 0.95} ${-r * 0.35} 0 0Z`;

type Tone = "lacquer" | "paper";
const PAL = {
  lacquer: { petal: "#f7ddd3", vein: "#e4a99a", centre: "#e8b06f", dot: "#b9473a", branch: "#d99c89", bud: "#f2c6b8", budCap: "#c9826f" },
  paper: { petal: "#ef9f8f", vein: "#d9786a", centre: "#c2463a", dot: "#9c2f25", branch: "#a8705f", bud: "#e88f80", budCap: "#9c5a48" },
};

function Blossom({ x, y, r, rot = 0, tone }: { x: number; y: number; r: number; rot?: number; tone: Tone }) {
  const c = PAL[tone];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={petal(r)} fill={c.petal} />
          <path d={`M0 ${-r * 0.35}L0 ${-r * 0.75}`} stroke={c.vein} strokeWidth={0.6} />
        </g>
      ))}
      <circle r={r * 0.22} fill={c.centre} />
      {[20, 92, 164, 236, 308].map((a) => {
        const t = (a * Math.PI) / 180;
        return <circle key={a} cx={Math.cos(t) * r * 0.45} cy={Math.sin(t) * r * 0.45} r={0.7} fill={c.dot} />;
      })}
    </g>
  );
}

function Bud({ x, y, rot, tone }: { x: number; y: number; rot: number; tone: Tone }) {
  const c = PAL[tone];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M0 0L0-4" stroke={c.branch} strokeWidth={1} />
      <ellipse cy={-6.5} rx={2.4} ry={3.4} fill={c.bud} />
      <path d="M-2-4.2Q0-2.6 2-4.2" stroke={c.budCap} strokeWidth={1} fill="none" />
    </g>
  );
}

type Props = HTMLMotionProps<"a"> & { tone?: Tone };

export function SakuraButtonLink({ className, children, tone = "lacquer", ...props }: Props) {
  const c = PAL[tone], lacquer = tone === "lacquer";
  return (
    <motion.a
      data-slot="button"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="press"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -2, scale: 1 }, press: { y: 0, scale: 0.97 } }}
      transition={{ type: "spring", stiffness: 480, damping: 26, mass: 0.6 }}
      className={cn(
        "relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pr-9 pl-[84px] font-serif text-lg outline-none",
        lacquer
          ? "bg-[#a8352b] text-[#f6e7d3] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.2),0_8px_18px_-8px_rgba(120,30,20,0.55)]"
          : "border-[1.5px] border-[#8e2f24] bg-[#f6ead8] text-[#7a2a20] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_18px_-10px_rgba(120,60,30,0.35)]",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {/* felt-paper texture and a soft sheen */}
      <svg className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full mix-blend-multiply", lacquer ? "opacity-40" : "opacity-[0.14]")} aria-hidden="true">
        <filter id={`sakura-felt-${tone}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={4} />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.12  0 0 0 0 0.08  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#sakura-felt-${tone})`} />
      </svg>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_30%_10%,rgba(255,220,200,0.18),transparent_60%)]" aria-hidden="true" />

      {/* cherry-blossom sprig, top-left */}
      <motion.svg
        viewBox="0 0 64 44"
        className="pointer-events-none absolute top-0.5 left-3 h-12 w-[70px] origin-bottom-left"
        variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -5, 3, -2, 0] }, press: { rotate: -3 } }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <path d="M2 42C10 34 18 28 26 23S42 13 54 8" stroke={c.branch} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <path d="M14 33C11 37 11 40 13 43M40 15C44 13 47 14 50 17" stroke={c.branch} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        <Bud x={54} y={8} rot={60} tone={tone} />
        <Bud x={50} y={17} rot={115} tone={tone} />
        <Bud x={13} y={43} rot={190} tone={tone} />
        <Blossom x={30} y={18} r={8} rot={8} tone={tone} />
        <Blossom x={16} y={32} r={5.5} rot={-20} tone={tone} />
      </motion.svg>

      {/* seigaiha waves, bottom-right (lacquer) */}
      {lacquer && <motion.svg
        viewBox="0 0 84 34"
        className="pointer-events-none absolute -right-1 -bottom-1 h-9 w-[88px] opacity-70"
        variants={{ rest: { x: 0 }, hover: { x: -5 }, press: { x: -3 } }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        aria-hidden="true"
      >
        {[
          [14, 22], [38, 22], [62, 22], [86, 22],
          [2, 30], [26, 30], [50, 30], [74, 30],
          [14, 38], [38, 38], [62, 38], [86, 38],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} fill="#a8352b" stroke="#e7b08c" strokeWidth={1.1}>
            <circle cx={cx} cy={cy} r={12} />
            <circle cx={cx} cy={cy} r={8.4} fill="none" />
            <circle cx={cx} cy={cy} r={4.8} fill="none" />
          </g>
        ))}
      </motion.svg>}

      {/* a single petal drifting down (paper) */}
      {!lacquer && (
        <motion.svg
          viewBox="-6 -6 12 12"
          className="pointer-events-none absolute bottom-2 left-[66px] size-3"
          variants={{ rest: { x: 0, y: 0, rotate: 20, opacity: 1 }, hover: { x: [0, 6, 10], y: [0, 5, 12], rotate: [20, 80, 140], opacity: [1, 1, 0] }, press: { y: 2 } }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          aria-hidden="true"
        >
          <path d={petal(5)} fill={c.petal} />
        </motion.svg>
      )}

      <span className="relative">{children as React.ReactNode}</span>
      {lacquer ? (
        <motion.span
          className="relative text-lg leading-none"
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 }, press: { x: 1, y: -1 } }}
          aria-hidden="true"
        >
          ↗
        </motion.span>
      ) : (
        <motion.svg
          viewBox="0 0 24 18"
          className="relative ml-1 h-[18px] w-6"
          variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -2, rotate: -6 }, press: { y: 0, rotate: 0 } }}
          aria-hidden="true"
        >
          <rect x="1" y="1" width="22" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth={1.8} />
          <path d="M2 2.5L12 10L22 2.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
        </motion.svg>
      )}
    </motion.a>
  );
}
