"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

// Hero buttons in the style of Sanskriti's two references (the references set the STYLE; the labels come from the page).
//  - tone "lacquer" (primary): a lacquer-red pill with a felt texture, a pale cherry-blossom sprig top-left and
//    gold seigaiha waves bottom-right, cream serif label.
//  - tone "paper" (secondary): a cream paper pill with a thin red border, a pink blossom sprig on the left with a
//    loose petal, red serif label.
//  - arrow (optional): "up-right" or "down", nudged in its direction on hover.
// The flowers are drawn to feel painted, not stamped: every petal has its own size and angle, a soft gradient
// from a deeper pink base to a pale edge, a notch at the tip, and the sprig sways gently all the time.

type Tone = "lacquer" | "paper";

const PAL = {
  lacquer: { edge: "#fdf0ea", mid: "#f7d3c7", base: "#e7a291", line: "#c27a6a", eye: "#d7675a", pollen: "#f3cf7a", branch: "#d9a38f", branchD: "#b97f6c", bud: "#f4c3b5", budD: "#de8f7f", sepal: "#9b4a3b" },
  paper: { edge: "#fbd3c8", mid: "#f2a998", base: "#df7a68", line: "#b9584a", eye: "#b8463a", pollen: "#e9b45a", branch: "#8c5a47", branchD: "#6d4235", bud: "#f0a495", budD: "#d36f5f", sepal: "#7a3a2c" },
};

// a sakura petal: round and full, swelling out from the centre, with a soft notch at the tip
const petalPath = (r: number, w: number) =>
  `M0 0C${-r * w * 1.05} ${-r * 0.12} ${-r * w * 1.2} ${-r * 0.9} ${-r * 0.24} ${-r * 1.04}Q${-r * 0.08} ${-r * 1.0} 0 ${-r * 0.88}Q${r * 0.08} ${-r * 1.0} ${r * 0.24} ${-r * 1.04}C${r * w * 1.2} ${-r * 0.9} ${r * w * 1.05} ${-r * 0.12} 0 0Z`;

const jitter = (i: number, seed: number) => Math.sin(i * 12.9898 + seed * 78.233) * 0.5; // -0.5…0.5, stable
// round so the server and the browser render identical numbers (avoids hydration mismatches)
const q = (n: number) => Math.round(n * 100) / 100;

function Blossom({ x, y, r, rot = 0, seed, gid, tone, sway = 6 }: { x: number; y: number; r: number; rot?: number; seed: number; gid: string; tone: Tone; sway?: number }) {
  const c = PAL[tone];
  return (
    <motion.g
      style={{ originX: 0.5, originY: 0.5 }}
      variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: [0, sway, -sway * 0.5, 0], scale: [1, 1.06, 1] }, press: { scale: 0.96 } }}
      transition={{ duration: 1.1, ease: "easeInOut", delay: seed * 0.05 }}
    >
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = q(i * 72 + jitter(i, seed) * 16), s = q(1 + jitter(i + 7, seed) * 0.16), w = q(0.98 + jitter(i + 3, seed) * 0.16), k = q(jitter(i + 11, seed) * 18);
          return (
            <g key={i} transform={`rotate(${a}) skewX(${k}) scale(${s})`}>
              <path d={petalPath(q(r), w)} fill={`url(#${gid}-petal)`} stroke={c.line} strokeOpacity={0.35} strokeWidth={0.45} />
              <path d={`M0 ${-r * 0.28}Q${r * 0.16} ${-r * 0.55} ${r * 0.02} ${-r * 0.8}`} stroke={c.line} strokeOpacity={0.25} strokeWidth={0.5} fill="none" />
            </g>
          );
        })}
        <circle r={r * 0.26} fill={c.eye} opacity={0.85} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const t = ((i * 51 + seed * 13) * Math.PI) / 180, l = r * (0.42 + jitter(i, seed + 2) * 0.12), sx = q(Math.cos(t) * l), sy = q(Math.sin(t) * l);
          return (
            <g key={i}>
              <line x2={sx} y2={sy} stroke={c.eye} strokeWidth={0.45} />
              <circle cx={sx} cy={sy} r={0.75} fill={c.pollen} />
            </g>
          );
        })}
      </g>
    </motion.g>
  );
}

function Bud({ x, y, rot, s = 1, gid, tone }: { x: number; y: number; rot: number; s?: number; gid: string; tone: Tone }) {
  const c = PAL[tone];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0Q1.8-2.4 0.2-4.6" stroke={c.branch} strokeWidth={0.9} fill="none" strokeLinecap="round" />
      <path d="M0-4.2C-3-5-3.4-9.6 0.8-12.8C3.2-9.4 2.8-5.4 0-4.2Z" fill={`url(#${gid}-bud)`} />
      <path d="M-2.2-4.6Q-1.2-7 0-5.4Q1.2-7 2.2-4.6Q0-3.4-2.2-4.6Z" fill={c.sepal} />
    </g>
  );
}

// the sprig: a tapered, curving branch with twigs, two or three open flowers and buds at the tips
function Sprig({ tone, gid }: { tone: Tone; gid: string }) {
  const c = PAL[tone], lacquer = tone === "lacquer";
  return (
    <>
      <defs>
        <radialGradient id={`${gid}-petal`} cx="0.5" cy="1" r="1" fx="0.5" fy="1">
          <stop offset="0" stopColor={c.base} />
          <stop offset="0.45" stopColor={c.mid} />
          <stop offset="1" stopColor={c.edge} />
        </radialGradient>
        <linearGradient id={`${gid}-bud`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={c.budD} />
          <stop offset="1" stopColor={c.bud} />
        </linearGradient>
        <filter id={`${gid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.6" stdDeviation="0.6" floodColor="#3a0f0a" floodOpacity={lacquer ? 0.35 : 0.18} />
        </filter>
      </defs>
      <g filter={`url(#${gid}-soft)`}>
        {/* the branch arcs like in the references: it rises from the bottom-left, bends over to the right and
            droops at the tip. It's drawn in pieces that get thinner towards the tip, so it tapers smoothly. */}
        {[
          ["M-3 62C1 54 5 47 10 40", 3.8],
          ["M10 40C14 33 17 27 23 21", 3],
          ["M23 21C28 16 33 12.5 40 10.5", 2.3],
          ["M40 10.5C47 8.5 54 8 60 9.5", 1.7],
          ["M60 9.5C66 11 71 13.5 76 17.5", 1.1],
        ].map(([d, w]) => (
          <path key={d} d={d as string} stroke={c.branch} strokeWidth={w as number} fill="none" strokeLinecap="round" />
        ))}
        {/* a darker edge on the underside of the thick part, for a bit of roundness */}
        <path d="M-1.6 63C2.4 55 6.4 48 11.4 41C15.4 34 18.4 28.4 24.2 22.4" stroke={c.branchD} strokeWidth={0.8} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
        {/* curving twigs, each ending in a bud */}
        <path d="M47 8.8C49.5 5.8 52.5 3.6 56 2.8M58 9.2C61 12.5 61.5 16.5 59.5 20.5M37 11.5C39.5 14.5 43 16.5 47 17M7.5 44C4.5 46 3 49 3.5 52.5" stroke={c.branch} strokeWidth={1.1} fill="none" strokeLinecap="round" />
        <Bud x={56} y={2.8} rot={72} s={0.85} gid={gid} tone={tone} />
        <Bud x={59.5} y={20.5} rot={172} s={0.8} gid={gid} tone={tone} />
        <Bud x={76} y={17.5} rot={128} s={0.9} gid={gid} tone={tone} />
        <Bud x={47} y={17} rot={112} s={0.75} gid={gid} tone={tone} />
        <Bud x={3.5} y={52.5} rot={200} s={0.75} gid={gid} tone={tone} />
        {/* open flowers, tucked along the curve */}
        {lacquer ? (
          <>
            <Blossom x={29} y={24} r={10.5} rot={10} seed={1} gid={gid} tone={tone} />
            <Blossom x={13} y={42} r={7.5} rot={-24} seed={2} gid={gid} tone={tone} sway={8} />
          </>
        ) : (
          <>
            <Blossom x={27} y={22} r={9} rot={4} seed={3} gid={gid} tone={tone} />
            <Blossom x={11} y={39} r={8.5} rot={-30} seed={4} gid={gid} tone={tone} sway={8} />
            <Blossom x={26} y={39} r={7} rot={22} seed={5} gid={gid} tone={tone} sway={9} />
          </>
        )}
      </g>
    </>
  );
}

type Props = HTMLMotionProps<"a"> & { tone?: Tone; arrow?: "up-right" | "down" };

export function SakuraButtonLink({ className, children, tone = "lacquer", arrow, ...props }: Props) {
  const gid = `sk${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const c = PAL[tone], lacquer = tone === "lacquer";
  return (
    <motion.a
      data-slot="button"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="press"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -2, scale: 1 }, press: { y: 0, scale: 0.97 } }}
      transition={{ type: "spring", stiffness: 420, damping: 24, mass: 0.6 }}
      className={cn(
        "relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-[92px] font-serif text-lg outline-none",
        lacquer
          ? "pr-[72px] bg-[radial-gradient(140%_120%_at_25%_0%,#b8443a_0%,#a2352b_45%,#8c2a22_100%)] text-[#f7e9d6] shadow-[inset_0_1px_0_rgba(255,225,210,0.28),inset_0_-2px_3px_rgba(60,10,5,0.28),0_10px_20px_-10px_rgba(120,30,20,0.6)]"
          : "pr-9 border-[1.5px] border-[#8e2f24] bg-[radial-gradient(140%_120%_at_30%_0%,#fbf3e6_0%,#f5e7d3_60%,#efdcc4_100%)] text-[#7a2a20] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(140,80,40,0.12),0_10px_20px_-12px_rgba(120,60,30,0.4)]",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {/* felt / paper-fibre texture */}
      <svg className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full mix-blend-multiply", lacquer ? "opacity-45" : "opacity-[0.18]")} aria-hidden="true">
        <filter id={`${gid}-felt`}>
          <feTurbulence type="fractalNoise" baseFrequency={lacquer ? "0.9" : "0.65 1.4"} numOctaves={3} seed={lacquer ? 4 : 9} />
          <feColorMatrix values={lacquer ? "0 0 0 0 0.42  0 0 0 0 0.1  0 0 0 0 0.07  0 0 0 0.85 0" : "0 0 0 0 0.55  0 0 0 0 0.38  0 0 0 0 0.25  0 0 0 0.9 0"} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${gid}-felt)`} />
      </svg>

      {/* the sprig: sways gently on its own, and more when hovered */}
      <motion.svg
        viewBox="0 0 80 60"
        className="pointer-events-none absolute top-1 left-2 h-[60px] w-20"
        style={{ originX: 0, originY: 1 }}
        variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -4, 2.5, -1, 0] }, press: { rotate: -2 } }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <motion.g
          style={{ originX: 0, originY: 1 }}
          animate={{ rotate: [0, 1.4, 0, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sprig tone={tone} gid={gid} />
        </motion.g>
      </motion.svg>

      {/* a loose petal, drifting away on hover */}
      <motion.svg
        viewBox="-6 -6 12 12"
        className={cn("pointer-events-none absolute size-3.5", lacquer ? "top-1.5 left-[84px]" : "bottom-2.5 left-[80px]")}
        variants={{ rest: { x: 0, y: 0, rotate: 25, opacity: 0.95 }, hover: { x: [0, 7, 12], y: [0, 6, 14], rotate: [25, 90, 160], opacity: [0.95, 0.95, 0] }, press: { y: 2 } }}
        transition={{ duration: 1.4, ease: "easeIn" }}
        aria-hidden="true"
      >
        <path d={petalPath(5, 0.8)} fill={lacquer ? c.mid : c.base} opacity={0.9} />
      </motion.svg>

      {/* seigaiha waves, bottom-right (lacquer), fading towards the label */}
      {lacquer && (
        <motion.svg
          viewBox="0 0 100 40"
          className="pointer-events-none absolute -right-2 -bottom-1 h-10 w-[100px] [mask-image:linear-gradient(to_right,transparent,#000_45%)]"
          variants={{ rest: { x: 0 }, hover: { x: -6 }, press: { x: -3 } }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          aria-hidden="true"
        >
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const R = 13, cx = col * 2 * R + (row % 2 ? R : 0) - 4, cy = 22 + row * R * 0.62;
              return (
                <g key={`${row}-${col}`} fill="#9a3027" stroke="#e8b48d" strokeOpacity={0.85} strokeWidth={1.25}>
                  <circle cx={cx} cy={cy} r={R} />
                  <circle cx={cx} cy={cy} r={R * 0.7} fill="none" />
                  <circle cx={cx} cy={cy} r={R * 0.42} fill="none" />
                  <circle cx={cx} cy={cy} r={R * 0.15} fill="none" />
                </g>
              );
            }),
          )}
        </motion.svg>
      )}

      <span className="relative">{children as React.ReactNode}</span>
      {arrow && (
        <motion.span
          className="relative leading-none"
          variants={
            arrow === "down"
              ? { rest: { y: 0 }, hover: { y: [0, 3, 0, 3, 0] }, press: { y: 2 } }
              : { rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 }, press: { x: 1, y: -1 } }
          }
          transition={arrow === "down" ? { duration: 0.9, ease: "easeInOut" } : undefined}
          aria-hidden="true"
        >
          {arrow === "down" ? "↓" : "↗"}
        </motion.span>
      )}
    </motion.a>
  );
}
