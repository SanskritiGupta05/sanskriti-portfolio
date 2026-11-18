"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// A tiny pixel maneki-neko (lucky cat) that waves its raised paw: two frames, like old sprites.
// The cat is built from simple shapes on a 24×26 grid; every cell on a shape's edge becomes
// dark outline, so the pixels stay clean and readable at 3px each.

const W = 24;
const H = 26;
const C = {
  line: "#3b2a24",
  fur: "#fffaf3",
  shade: "#ece2d4",
  spot: "#f2a24e",
  pink: "#f6a8b8",
  red: "#d6402f",
  gold: "#f4c24f",
  goldD: "#c8912c",
};

type Cell = string | null;
const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
const inTri = (x: number, y: number, a: number[], b: number[], c: number[]) => {
  const s = (p: number[], q: number[], r: number[]) => (p[0] - r[0]) * (q[1] - r[1]) - (q[0] - r[0]) * (p[1] - r[1]);
  const d1 = s([x, y], a, b), d2 = s([x, y], b, c), d3 = s([x, y], c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

// paint one shape: fill(x,y) returns its colour (or null outside); edges become outline
function paint(grid: Cell[][], inside: (x: number, y: number) => boolean, fill: (x: number, y: number) => string) {
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!inside(x + 0.5, y + 0.5)) continue;
      const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !inside(x + dx + 0.5, y + dy + 0.5));
      grid[y][x] = edge ? C.line : fill(x, y);
    }
}

function cat(frame: 0 | 1): Cell[][] {
  const g: Cell[][] = Array.from({ length: H }, () => Array<Cell>(W).fill(null));
  const fur = (x: number, y: number) => (inEllipse(x, y, 7, 5, 2.6, 2.2) || inEllipse(x, y, 16, 20, 2.4, 2.4) ? C.spot : y > 20 ? C.shade : C.fur);
  // body, then head (with ears) on top
  paint(g, (x, y) => inEllipse(x, y, 11.5, 19, 8, 6.6) && y < 25, fur);
  paint(
    g,
    (x, y) => inEllipse(x, y, 11.5, 8.5, 8.6, 6.6) || inTri(x, y, [3.2, 0.6], [3.8, 6], [8.6, 3.2]) || inTri(x, y, [19.8, 0.6], [19.2, 6], [14.4, 3.2]),
    (x, y) => (inTri(x, y, [4.4, 2.4], [4.8, 5], [7.4, 3.6]) || inTri(x, y, [18.6, 2.4], [18.2, 5], [15.6, 3.6]) ? C.pink : fur(x, y)),
  );
  // face: happy closed eyes, pink nose and cheeks, little mouth
  const dots: [number, number, string][] = [
    [7, 8, C.line], [8, 7, C.line], [9, 8, C.line],
    [14, 8, C.line], [15, 7, C.line], [16, 8, C.line],
    [11, 10, C.pink], [12, 10, C.pink],
    [10, 11, C.line], [13, 11, C.line], [11, 12, C.line], [12, 12, C.line],
    [6, 10, C.pink], [17, 10, C.pink],
  ];
  dots.forEach(([x, y, c]) => (g[y][x] = c));
  // red collar with a gold bell
  for (let x = 5; x <= 18; x++) if (g[14][x] && g[14][x] !== C.line) g[14][x] = C.red;
  [[11, 15], [12, 15], [11, 16], [12, 16]].forEach(([x, y]) => (g[y][x] = C.gold));
  g[16][11] = C.goldD;
  g[16][12] = C.goldD;
  // the resting paw holding a gold koban coin
  paint(g, (x, y) => inEllipse(x, y, 8, 19.5, 3, 3.6), () => C.gold);
  g[19][8] = C.goldD;
  g[20][8] = C.goldD;
  paint(g, (x, y) => inEllipse(x, y, 6.6, 22, 2.2, 1.7), () => C.fur);
  // the raised paw: upright, or bent forward mid-wave
  if (frame === 0) paint(g, (x, y) => (x > 16.5 && x < 21.5 && y > 6 && y < 16) || inEllipse(x, y, 19, 5.6, 2.6, 2.4), (x, y) => (y < 7 ? C.pink : C.fur));
  else paint(g, (x, y) => (x > 16.5 && x < 21.5 && y > 9 && y < 16) || inEllipse(x, y, 18.2, 9, 2.8, 2), (x, y) => (y < 9 ? C.pink : C.fur));
  return g;
}

const FRAMES = [cat(0), cat(1)];

export function LuckyCat({ className = "", px = 3 }: { className?: string; px?: number }) {
  const still = useReducedMotion();
  const [frame, setFrame] = useState<0 | 1>(0);
  useEffect(() => {
    if (still) return;
    // wave, wave, then rest a moment
    const beats = [0, 1, 0, 1, 0, 0, 0, 0] as const;
    let i = 0;
    const id = setInterval(() => setFrame(beats[(i = (i + 1) % beats.length)]), 260);
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
      {FRAMES[frame].flatMap((row, y) => row.map((c, x) => (c ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={c} /> : null)))}
    </svg>
  );
}
