"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// A small pixel maneki-neko (lucky cat) sitting on a red cushion, waving its raised paw.
// Built from simple shapes on a 35×42 grid. Each shape gets a soft warm-brown outline on its
// edge, a highlight on its upper-left and a shadow on its lower-right, so it reads as rounded.
// The paw waves through three sprite frames.

const W = 35;
const H = 42;
const C = {
  line: "#6a4636",
  lineSoft: "#a07a62",
  fur: "#fff7ec",
  hi: "#ffffff",
  shade: "#efdfcb",
  spot: "#f4a85c",
  spotHi: "#f9c487",
  spotShade: "#de8a3e",
  pink: "#f7a9b9",
  pinkD: "#e8879b",
  red: "#dc4b3c",
  redHi: "#ef7362",
  redD: "#b0352a",
  gold: "#f6c851",
  goldHi: "#fff0b2",
  goldD: "#cf972c",
  eye: "#4a3128",
};

type Cell = string | null;
type Grid = Cell[][];
const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
const inTri = (x: number, y: number, a: number[], b: number[], c: number[]) => {
  const s = (p: number[], q: number[], r: number[]) => (p[0] - r[0]) * (q[1] - r[1]) - (q[0] - r[0]) * (p[1] - r[1]);
  const d1 = s([x, y], a, b), d2 = s([x, y], b, c), d3 = s([x, y], c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

type Tone = { base: string; hi: string; shade: string };
// paint a shape: outline on its edge, light upper-left, shadow lower-right
function paint(g: Grid, inside: (x: number, y: number) => boolean, tone: (x: number, y: number) => Tone, line = C.line) {
  const at = (x: number, y: number) => inside(x + 0.5, y + 0.5);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!at(x, y)) continue;
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !at(x + dx, y + dy))) {
        g[y][x] = line;
        continue;
      }
      const t = tone(x, y);
      g[y][x] = !at(x + 2, y + 2) ? t.shade : !at(x - 2, y - 2) ? t.hi : t.base;
    }
}

const FUR: Tone = { base: C.fur, hi: C.hi, shade: C.shade };
const SPOT: Tone = { base: C.spot, hi: C.spotHi, shade: C.spotShade };
const PINK: Tone = { base: C.pink, hi: "#fbc7d2", shade: C.pinkD };
const GOLD: Tone = { base: C.gold, hi: C.goldHi, shade: C.goldD };
const RED: Tone = { base: C.red, hi: C.redHi, shade: C.redD };
const set = (g: Grid, cells: number[][], c: string) => cells.forEach(([x, y]) => (g[y][x] = c));

// the raised paw in three positions: up, halfway, bent forward
const PAWS = [
  { top: 9, cx: 28.6, cy: 8.6, rx: 3.9, ry: 3.6 },
  { top: 11, cx: 28.2, cy: 10.8, rx: 4, ry: 3.3 },
  { top: 13.5, cx: 27.4, cy: 13.6, rx: 4.3, ry: 3 },
];

function cat(frame: 0 | 1 | 2): Grid {
  const g: Grid = Array.from({ length: H }, () => Array<Cell>(W).fill(null));
  const fur = (x: number, y: number) => (inEllipse(x, y, 10.5, 7.6, 3.8, 3.2) || inEllipse(x, y, 24, 31, 3.6, 3.6) ? SPOT : FUR);

  // red cushion (zabuton) with gold tassels
  paint(g, (x, y) => x > 2.5 && x < 32.5 && y > 36.5 && y < 41.5, () => RED, C.redD);
  set(g, [[3, 40], [31, 40], [3, 37], [31, 37]], C.gold);

  // body, then head with ears on top
  paint(g, (x, y) => inEllipse(x, y, 17.5, 28.8, 12.2, 10) && y < 38, fur);
  paint(
    g,
    (x, y) => inEllipse(x, y, 17.5, 13, 13, 10) || inTri(x, y, [4.6, 0.6], [5.6, 9], [12.6, 4.6]) || inTri(x, y, [30.4, 0.6], [29.4, 9], [22.4, 4.6]),
    (x, y) => (inTri(x, y, [6.4, 3.2], [7, 7.4], [11, 5.6]) || inTri(x, y, [28.6, 3.2], [28, 7.4], [24, 5.6]) ? PINK : fur(x, y)),
  );

  // face: happy closed eyes, whiskers, nose, mouth, blush
  set(g, [[10, 13], [11, 12], [12, 12], [13, 13]], C.eye);
  set(g, [[22, 13], [23, 12], [24, 12], [25, 13]], C.eye);
  set(g, [[5, 15], [6, 15], [7, 16], [5, 18], [6, 17], [7, 17], [29, 15], [28, 15], [27, 16], [29, 18], [28, 17], [27, 17]], C.lineSoft);
  set(g, [[9, 16], [10, 16], [24, 16], [25, 16]], C.pink);
  set(g, [[16, 15], [17, 15], [18, 15], [17, 16]], C.pinkD);
  set(g, [[17, 17], [16, 18], [15, 18], [18, 18], [19, 18]], C.eye);

  // red collar with a gold bell
  for (let x = 4; x <= 30; x++) {
    if (g[22][x] && g[22][x] !== C.line) g[22][x] = C.red;
    if (g[23][x] && g[23][x] !== C.line) g[23][x] = C.redD;
  }
  paint(g, (x, y) => inEllipse(x, y, 17.5, 25.3, 2.6, 2.4), () => GOLD, C.goldD);
  set(g, [[17, 26]], C.line);

  // the resting paw, holding a gold koban coin
  paint(g, (x, y) => inEllipse(x, y, 12, 30, 4.6, 5.6), () => GOLD, C.goldD);
  set(g, [[12, 28], [12, 29], [12, 30], [12, 31]], C.goldD);
  set(g, [[11, 27], [10, 28]], C.goldHi);
  paint(g, (x, y) => inEllipse(x, y, 9.8, 34, 3.5, 2.6), () => FUR);
  set(g, [[9, 34], [11, 34]], C.lineSoft);

  // the raised paw
  const p = PAWS[frame];
  paint(
    g,
    (x, y) => (x > 25 && x < 32.4 && y > p.top && y < 25) || inEllipse(x, y, p.cx, p.cy, p.rx, p.ry),
    (x, y) => (inEllipse(x, y, p.cx, p.cy - 0.4, p.rx - 1.6, p.ry - 1.6) ? PINK : FUR),
  );
  return g;
}

const FRAMES = [cat(0), cat(1), cat(2)];
// wave (up, halfway, bent, halfway) twice, then rest with the paw up
const BEATS = [0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0] as const;

export function LuckyCat({ className = "", px = 2 }: { className?: string; px?: number }) {
  const still = useReducedMotion();
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setBeat((b) => (b + 1) % BEATS.length), 130);
    return () => clearInterval(id);
  }, [still]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W * px}
      height={H * px}
      shapeRendering="crispEdges"
      role="img"
      aria-label="A lucky cat waving"
      className={className}
    >
      {FRAMES[BEATS[beat]].flatMap((row, y) => row.map((c, x) => (c ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={c} /> : null)))}
    </svg>
  );
}
