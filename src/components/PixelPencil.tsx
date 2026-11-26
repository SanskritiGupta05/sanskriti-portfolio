"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// A tiny pixel pencil for the Toolkit tag: it scribbles a wavy line, pauses, and starts over.
// Drawn on a 20×16 grid at 2px a cell (crisp, unsmoothed), moving in steps like a sprite.
// Same approach as the tamagotchi: shapes on a grid, a soft outline on each shape's edge.

const W = 20;
const H = 16;
const C = {
  line: "#3c5a78",
  lead: "#2b2b2b",
  wood: "#f2d3a2",
  body: "#f5c542",
  bodyHi: "#fde08a",
  bodyShade: "#d9a52e",
  band: "#b8c4cf",
  eraser: "#ef8f8f",
  ink: "#2b5f8c",
};

// the pencil, drawn by hand, pointing down-left; its tip is the bottom-left cell
// o outline · l lead · w wood · h highlight · Y body · s shade · b metal band · e eraser
const SPRITE = [
  "........ooo.",
  ".......oeeeo",
  "......oeeeeo",
  ".....obbeeo.",
  "....ohYbbo..",
  "...ohYYso...",
  "..ohYYso....",
  "..owYso.....",
  ".owwso......",
  ".owwo.......",
  "llo.........",
  "l...........",
];
const KEY: Record<string, string> = { o: C.line, l: C.lead, w: C.wood, h: C.bodyHi, Y: C.body, s: C.bodyShade, b: C.band, e: C.eraser };
type Cell = { x: number; y: number; c: string };
const PENCIL: Cell[] = SPRITE.flatMap((row, y) =>
  [...row].flatMap((ch, x) => (KEY[ch] ? [{ x, y: y - (SPRITE.length - 1), c: KEY[ch] }] : [])),
);

// the scribble: a little wave the tip follows one cell at a time, each cell touching the last
const WAVE = [0, -1, -1, 0, 1, 1, 0, -1];
const PATH = WAVE.map((dy, i) => ({ x: 1 + i, y: 13 + dy }));
const STEPS = PATH.length + 7; // drawing, then a pause with the finished line

export function PixelPencil({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(PATH.length - 1);

  useEffect(() => {
    if (reduce) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), 140);
    return () => clearInterval(id);
  }, [reduce]);

  const drawn = Math.min(step, PATH.length - 1);
  const tip = PATH[drawn];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W * 2} height={H * 2} shapeRendering="crispEdges" aria-hidden="true" className={`block ${className}`}>
      {PATH.slice(0, drawn + 1).map((p) => (
        <rect key={`i${p.x}`} x={p.x} y={p.y} width={1.02} height={1.02} fill={C.ink} />
      ))}
      {PENCIL.map((p) => (
        <rect key={`p${p.x},${p.y}`} x={tip.x + p.x} y={tip.y + p.y} width={1.02} height={1.02} fill={p.c} />
      ))}
    </svg>
  );
}
