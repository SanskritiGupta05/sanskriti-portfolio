"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

// A pixel-art cherry blossom branch reaching in from the page's left edge (mirrors the lantern on the right).
// Drawn at a tiny size on a canvas, its edges snapped to hard pixels, then scaled up 3× with no smoothing.
const W = 96, H = 64;
const C = {
  bark: "#7a4a3a", barkD: "#5a3327", barkL: "#9a6650",
  petal: "#f6a091", petalL: "#fdd6cc", petalD: "#ea7d6e", heart: "#c44c45", bud: "#ef8f86", budD: "#d7685f",
};

// a seeded random so the branch looks the same on every load
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

type P = [number, number];
const bez = (a: P, c: P, b: P, t: number): P => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];

function draw(ctx: CanvasRenderingContext2D) {
  const rand = rng(11);
  const dot = (x: number, y: number, r: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  // a limb: a curve that tapers from r0 to r1, with a lit top edge and a shaded underside
  const limb = (a: P, c: P, b: P, r0: number, r1: number) => {
    for (let i = 0; i <= 60; i++) {
      const t = i / 60, [x, y] = bez(a, c, b, t), r = r0 + (r1 - r0) * t;
      dot(x, y + r * 0.35, r, C.barkD);
    }
    for (let i = 0; i <= 60; i++) {
      const t = i / 60, [x, y] = bez(a, c, b, t), r = r0 + (r1 - r0) * t;
      dot(x, y, r * 0.8, C.bark);
      if (r > 1.2) dot(x - 0.2, y - r * 0.45, r * 0.3, C.barkL);
    }
  };
  // a five-petal blossom
  const blossom = (x: number, y: number, s0 = 1) => {
    const s = s0 * 1.3, turn = rand() * Math.PI;
    for (let k = 0; k < 5; k++) {
      const a = turn + (k * Math.PI * 2) / 5;
      dot(x + Math.cos(a) * 2.1 * s, y + Math.sin(a) * 2.1 * s, 1.75 * s, k % 2 ? C.petal : C.petalD);
      dot(x + Math.cos(a) * 2.5 * s, y + Math.sin(a) * 2.5 * s - 0.3, 0.8 * s, C.petalL);
    }
    dot(x, y, 1.1 * s, C.heart);
  };
  const bud = (x: number, y: number) => { dot(x, y, 1.2, C.bud); dot(x + 0.4, y + 0.5, 0.6, C.budD); };

  // the main branch comes in from off the left edge and droops gently to the right
  const main: [P, P, P] = [[-4, 12], [34, 14], [86, 40]];
  limb(...main, 4.2, 0.9);
  // side twigs
  const twigs: [P, P, P, number][] = [
    [bez(...main, 0.28), [30, 4], [42, 3], 1.3],
    [bez(...main, 0.45), [46, 34], [50, 52], 1.4],
    [bez(...main, 0.68), [70, 22], [80, 20], 1.1],
    [bez(...main, 0.18), [16, 26], [22, 36], 1.1],
  ];
  twigs.forEach(([a, c, b, r]) => limb(a, c, b, r, 0.5));

  // blossoms clustered along the branch and the twig tips, with buds at the ends
  ([[16, 10, 1], [29, 12, 1.1], [43, 4, 1], [36, 3.5, 0.85], [55, 26, 1.15], [49, 41, 1], [51, 52, 1.05], [68, 28, 1], [80, 21, 0.9], [74, 36, 1], [22, 34, 0.95], [10, 17, 0.8]] as const)
    .forEach(([x, y, s]) => blossom(x, y, s));
  ([[47, 1.5], [55, 57], [85, 18], [88, 41], [25, 40], [62, 20]] as const).forEach(([x, y]) => bud(x, y));
  // a few loose petals drifting below
  ([[30, 50], [64, 58], [40, 61]] as const).forEach(([x, y]) => dot(x, y, 0.9, C.petal));

  // snap to hard pixels: every pixel is either fully drawn or empty
  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 3; i < img.data.length; i += 4) img.data[i] = img.data[i] > 110 ? 255 : 0;
  ctx.putImageData(img, 0, 0);
}

export function SakuraBranch() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (ctx) draw(ctx);
  }, []);
  return (
    <motion.canvas
      ref={canvas}
      width={W}
      height={H}
      aria-hidden="true"
      className="pointer-events-none absolute top-24 left-0 z-10 hidden w-[288px] [image-rendering:pixelated] md:block"
      style={{ transformOrigin: "0% 30%" }}
      // a slow breeze
      animate={reduce ? undefined : { rotate: [0, 1.4, -0.6, 0] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
