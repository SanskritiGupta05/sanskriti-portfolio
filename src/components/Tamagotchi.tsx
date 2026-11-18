"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// A tiny pixel tamagotchi: a pink egg-shaped shell on a keyring, a cream bezel, three buttons
// and a green LCD screen with a little cat on it. The cat blinks and hops now and then;
// click the toy to feed it and it beams, hops and shows a heart.
// Same approach as the lucky cat: simple shapes on a grid, a soft outline on each shape's edge,
// a highlight on the upper-left and a shadow on the lower-right.

const W = 34;
const H = 42;
const C = {
  line: "#93495d",
  shell: "#f7b5c5",
  shellHi: "#fdd9e2",
  shellShade: "#e98ba3",
  ring: "#d9b26a",
  ringD: "#a9803c",
  bezel: "#fdeef1",
  bezelD: "#f1d2da",
  lcd: "#cfe6b8",
  lcdD: "#bcd9a2",
  ink: "#3e5a3a",
  heart: "#e2506c",
  b1: "#ffd86e",
  b2: "#a9dcf3",
  b3: "#ff9fb4",
};

type Cell = string | null;
type Grid = Cell[][];
type Tone = { base: string; hi: string; shade: string };
const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
const inRound = (x: number, y: number, x0: number, y0: number, x1: number, y1: number, r: number) => {
  const cx = Math.min(Math.max(x, x0 + r), x1 - r);
  const cy = Math.min(Math.max(y, y0 + r), y1 - r);
  return x >= x0 && x <= x1 && y >= y0 && y <= y1 && (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
};
function paint(g: Grid, inside: (x: number, y: number) => boolean, t: Tone, line = C.line) {
  const at = (x: number, y: number) => inside(x + 0.5, y + 0.5);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!at(x, y)) continue;
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !at(x + dx, y + dy))) g[y][x] = line;
      else g[y][x] = !at(x + 2, y + 2) ? t.shade : !at(x - 2, y - 2) ? t.hi : t.base;
    }
}

// the little cat on the screen, 13×10, drawn in LCD ink
const PET: Record<"idle" | "blink" | "happy", string[]> = {
  idle: [
    "..#.......#..",
    ".#.#.....#.#.",
    ".#..#####..#.",
    "#...........#",
    "#..#.....#..#",
    "#...........#",
    "#....#.#....#",
    ".#....#....#.",
    "..#########..",
    ".............",
  ],
  blink: [
    "..#.......#..",
    ".#.#.....#.#.",
    ".#..#####..#.",
    "#...........#",
    "#..##...##..#",
    "#...........#",
    "#....#.#....#",
    ".#....#....#.",
    "..#########..",
    ".............",
  ],
  happy: [
    "..#.......#..",
    ".#.#.....#.#.",
    ".#..#####..#.",
    "#..#.....#..#",
    "#.#.#...#.#.#",
    "#...........#",
    "#...#...#...#",
    ".#...###...#.",
    "..#########..",
    ".............",
  ],
};
const HEART = [".#.#.", "#####", ".###.", "..#.."];

function draw(pet: keyof typeof PET, hop: boolean, heart: boolean): Grid {
  const g: Grid = Array.from({ length: H }, () => Array<Cell>(W).fill(null));
  // keyring loop
  for (let y = 0; y < 10; y++)
    for (let x = 0; x < W; x++) {
      const d = Math.hypot(x + 0.5 - 17, y + 0.5 - 5);
      if (d <= 4.2 && d >= 2.6) g[y][x] = d > 3.6 || (x < 16 && y < 5) ? (d > 3.6 ? C.ringD : C.ring) : C.ring;
    }
  // egg-shaped shell, a little narrower at the top
  paint(g, (x, y) => inEllipse(x, y, 17, 24.5, 15.2 - Math.max(0, 22 - y) * 0.12, 15.6), { base: C.shell, hi: C.shellHi, shade: C.shellShade });
  // bezel and screen
  paint(g, (x, y) => inRound(x, y, 7.5, 13, 26.5, 30, 3.2), { base: C.bezel, hi: "#ffffff", shade: C.bezelD });
  paint(g, (x, y) => inRound(x, y, 9.5, 15, 24.5, 28, 1.6), { base: C.lcd, hi: C.lcd, shade: C.lcdD }, C.ink);
  // the pet, hopping up a pixel when happy
  const sprite = PET[pet];
  const oy = hop ? 16 : 17;
  sprite.forEach((row, y) => [...row].forEach((c, x) => c === "#" && (g[oy + y][11 + x] = C.ink)));
  if (heart) HEART.forEach((row, y) => [...row].forEach((c, x) => c === "#" && (g[15 + y][19 + x] = C.heart)));
  // three buttons
  paint(g, (x, y) => inEllipse(x, y, 11, 34, 2.2, 2), { base: C.b1, hi: "#fff3c4", shade: "#e9b843" });
  paint(g, (x, y) => inEllipse(x, y, 17, 35.5, 2.2, 2), { base: C.b2, hi: "#e3f5fd", shade: "#7cc2e3" });
  paint(g, (x, y) => inEllipse(x, y, 23, 34, 2.2, 2), { base: C.b3, hi: "#ffd3dd", shade: "#ec7a96" });
  return g;
}

const FRAMES = {
  idle: draw("idle", false, false),
  blink: draw("blink", false, false),
  hop: draw("idle", true, false),
  happy: draw("happy", false, true),
  happyHop: draw("happy", true, true),
};
type Frame = keyof typeof FRAMES;
// a calm loop: sit, blink now and then, a little hop
const IDLE: Frame[] = ["idle", "idle", "idle", "idle", "blink", "idle", "idle", "idle", "idle", "idle", "hop", "idle", "hop", "idle", "idle", "blink", "idle", "idle"];
const FED: Frame[] = ["happyHop", "happy", "happyHop", "happy", "happyHop", "happy", "happy", "happy"];

export function Tamagotchi({ className = "", px = 2 }: { className?: string; px?: number }) {
  const still = useReducedMotion();
  const [frame, setFrame] = useState<Frame>("idle");
  const fed = useRef(0); // beats of "happy" left after a feed
  const beat = useRef(0);

  useEffect(() => {
    if (still) return;
    const id = setInterval(() => {
      if (fed.current > 0) {
        setFrame(FED[FED.length - fed.current]);
        fed.current--;
        return;
      }
      beat.current = (beat.current + 1) % IDLE.length;
      setFrame(IDLE[beat.current]);
    }, 220);
    return () => clearInterval(id);
  }, [still]);

  const feed = () => {
    if (still) {
      setFrame("happy");
      setTimeout(() => setFrame("idle"), 1600);
      return;
    }
    fed.current = FED.length;
  };

  return (
    <button type="button" onClick={feed} aria-label="Feed the little pixel pet" title="Feed me!" className={`cursor-pointer transition-transform hover:-rotate-6 active:scale-95 ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W * px} height={H * px} shapeRendering="crispEdges" aria-hidden="true" className="block">
        {FRAMES[frame].flatMap((row, y) => row.map((c, x) => (c ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={c} /> : null)))}
      </svg>
    </button>
  );
}
