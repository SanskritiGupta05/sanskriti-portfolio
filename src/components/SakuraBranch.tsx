"use client";

import { motion, useReducedMotion } from "motion/react";

// A cherry branch reaching in from the page's left edge (mirrors the lantern on the right).
// Smooth, painted SVG: a tapering branch, soft-pink five-petal blossoms (the Fuji scene's pinks,
// painted like the blossoms on the hero buttons), buds, and a few petals drifting down.
// (The pixel-art version is in git history: commit cde2c80.)
const BARK = "#5a3a2e", BARK_L = "#7d5444", BARK_D = "#3e271f";
const PINK = { edge: "#fff4f7", mid: "#fbd9e3", base: "#f2b4c6", line: "#e391a9", heart: "#c9506a", pollen: "#f2c96b", bud: "#eea3b8", budD: "#d9809a" };

// a sakura petal: round and full, with a soft notch at the tip
const q = (n: number) => Math.round(n * 100) / 100; // rounded so server and browser draw the same numbers
const petal = (r: number, w = 0.62) =>
  `M0 0C${q(-r * w * 1.05)} ${q(-r * 0.12)} ${q(-r * w * 1.2)} ${q(-r * 0.9)} ${q(-r * 0.24)} ${q(-r * 1.04)}Q${q(-r * 0.08)} ${q(-r)} 0 ${q(-r * 0.88)}Q${q(r * 0.08)} ${q(-r)} ${q(r * 0.24)} ${q(-r * 1.04)}C${q(r * w * 1.2)} ${q(-r * 0.9)} ${q(r * w * 1.05)} ${q(-r * 0.12)} 0 0Z`;

// the branch: one main limb in tapering pieces, and side twigs
const LIMBS: { d: string; w: number }[] = [
  { d: "M-12 118 C40 112 80 120 120 128", w: 11 },
  { d: "M118 128 C160 136 200 140 240 150", w: 8 },
  { d: "M238 150 C270 158 300 168 330 182", w: 5.5 },
  { d: "M328 181 C345 190 356 198 366 208", w: 3 },
  { d: "M96 124 C110 100 122 82 140 66", w: 5 },
  { d: "M139 67 C148 56 160 48 174 44", w: 3 },
  { d: "M178 138 C190 116 206 100 226 92", w: 4 },
  { d: "M190 141 C196 162 200 178 198 198", w: 3.5 },
  { d: "M280 166 C292 148 306 136 324 130", w: 3 },
  { d: "M60 117 C66 136 70 150 64 168", w: 3 },
];
// blossoms: [x, y, size, turn]
const FLOWERS: [number, number, number, number][] = [
  [140, 64, 15, 10], [170, 42, 12, 40], [156, 52, 9, 70], [124, 86, 11, 0], [226, 90, 15, 20], [206, 102, 11, 55],
  [248, 150, 13, 30], [200, 196, 14, 5], [196, 172, 10, 60], [324, 128, 13, 15], [304, 140, 10, 45], [334, 184, 12, 25],
  [366, 208, 10, 50], [64, 168, 12, 35], [90, 132, 10, 65], [270, 162, 9, 10], [176, 140, 9, 30],
];
const BUDS: [number, number, number][] = [[182, 40, 20], [236, 86, -30], [204, 210, 10], [340, 124, -40], [372, 216, 30], [58, 180, 15], [150, 78, -20]];
const FALLING = [{ x: 150, d: 0 }, { x: 240, d: 2.4 }, { x: 330, d: 4.8 }, { x: 110, d: 6.6 }];
const STAMENS = [0, 1, 2, 3, 4, 5, 6].map((k) => { const a = (k * 51.4 * Math.PI) / 180; return [Math.cos(a), Math.sin(a)]; });

function Blossom({ x, y, s, turn }: { x: number; y: number; s: number; turn: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={petal(s)} transform={`rotate(${k * 72})`} fill="url(#sb-petal)" stroke={PINK.line} strokeWidth={0.5} strokeOpacity={0.45} />
      ))}
      {STAMENS.map(([cx, cy], k) => (
        <g key={k}>
          <line x1={0} y1={0} x2={q(cx * s * 0.42)} y2={q(cy * s * 0.42)} stroke={PINK.heart} strokeWidth={0.7} />
          <circle cx={q(cx * s * 0.42)} cy={q(cy * s * 0.42)} r={0.9} fill={PINK.pollen} />
        </g>
      ))}
      <circle r={q(s * 0.16)} fill={PINK.heart} />
    </g>
  );
}

export function SakuraBranch() {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 390 240"
      aria-hidden="true"
      className="pointer-events-none absolute top-8 left-0 z-10 hidden w-[360px] overflow-visible md:block"
      style={{ transformOrigin: "0% 50%" }}
      animate={reduce ? undefined : { rotate: [0, 1.2, -0.5, 0] }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
    >
      <defs>
        <radialGradient id="sb-petal" cx="0.5" cy="0.95" r="1">
          <stop offset="0" stopColor={PINK.base} />
          <stop offset="0.45" stopColor={PINK.mid} />
          <stop offset="1" stopColor={PINK.edge} />
        </radialGradient>
      </defs>

      {/* the branch: a dark under-stroke, the bark, and a lit top edge */}
      <g fill="none" strokeLinecap="round">
        {LIMBS.map((l, i) => <path key={`d${i}`} d={l.d} stroke={BARK_D} strokeWidth={l.w} transform="translate(0 1.2)" />)}
        {LIMBS.map((l, i) => <path key={`b${i}`} d={l.d} stroke={BARK} strokeWidth={q(l.w * 0.86)} />)}
        {LIMBS.map((l, i) => l.w > 4 && <path key={`l${i}`} d={l.d} stroke={BARK_L} strokeWidth={q(l.w * 0.22)} transform={`translate(0 ${q(-l.w * 0.25)})`} />)}
      </g>

      {BUDS.map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
          <ellipse rx={3.6} ry={5.2} fill={PINK.bud} />
          <ellipse rx={2} ry={3} cy={1.4} fill={PINK.budD} />
          <path d="M-3 3.5Q0 6.5 3 3.5" stroke={BARK} strokeWidth={1.4} fill="none" />
        </g>
      ))}
      {FLOWERS.map(([x, y, s, t], i) => <Blossom key={i} x={x} y={y} s={s} turn={t} />)}

      {/* a few petals drifting down and away */}
      {!reduce && FALLING.map((p, i) => (
        <motion.path
          key={i}
          d={petal(5)}
          fill={PINK.base}
          initial={{ x: p.x, y: 120, opacity: 0, rotate: 0 }}
          animate={{ x: [p.x, p.x + 30, p.x + 10, p.x + 46], y: [120, 170, 220, 280], opacity: [0, 1, 1, 0], rotate: [0, 120, 220, 340] }}
          transition={{ duration: 7, delay: p.d, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.svg>
  );
}
