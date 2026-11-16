"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// A cherry branch reaching in from the page's left edge, painted the same way as the cherry trees in the
// footer's Fuji scene: a pixel skeleton of dark bark plus hundreds of small, ragged blossom clusters in the
// scene's five pinks, lit from the top-left, swaying in a breeze and now and then dropping a petal.
const W = 150, H = 116, SCALE = 2.5;
const C = {
  bark: "#4a302a", barkD: "#2f1e1b", barkL: "#6a4a40",
  bl0: "#fff6f8", bl1: "#fbe3ea", bl2: "#f5cbd8", bl3: "#eab0c3", bl4: "#d891a8",
};
const hash = (x: number, y: number, s: number) => {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

class Buf {
  d = new Uint8ClampedArray(W * H * 4);
  px(x: number, y: number, hex: string) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const [r, g, b] = rgb(hex), k = (y * W + x) * 4;
    this.d[k] = r; this.d[k + 1] = g; this.d[k + 2] = b; this.d[k + 3] = 255;
  }
  line(x0: number, y0: number, x1: number, y1: number, hex: string, w = 1) {
    const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2) + 1, o = Math.floor((w - 1) / 2);
    for (let i = 0; i <= n; i++) {
      const x = x0 + ((x1 - x0) * i) / n, y = y0 + ((y1 - y0) * i) / n;
      for (let a = 0; a < w; a++) for (let b = 0; b < w; b++) this.px(x - o + a, y - o + b, hex);
    }
  }
}

type Cluster = { x: number; y: number; r: number; seed: number; h: number };

// The skeleton: a main limb comes in from off the left edge and droops gently to the right, with side
// shoots of different lengths along it, each splitting into a few twigs. Blossom gathers along the outer
// two thirds of every limb and thickest at the twig tips, so it reads as a long drift of pink, not a ball.
function build() {
  const r = rng(23), bark = new Buf(), segs: [number, number, number, number, number, number][] = [];
  function grow(x0: number, y0: number, ang: number, len: number, w: number, depth: number) {
    const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
    segs.push([x0, y0, x1, y1, w, depth]);
    if (depth === 0 || len < 2.5) return;
    const n = depth > 3 ? 2 : r() < 0.5 ? 2 : 3;
    for (let i = 0; i < n; i++)
      grow(x1, y1, ang + (i - (n - 1) / 2) * (0.45 + r() * 0.3) + (r() - 0.5) * 0.3 + 0.04, len * (0.55 + r() * 0.35), Math.max(1, Math.round(w * 0.62)), depth - 1);
  }
  // the main limb in four kinked pieces, with a side shoot off each joint
  let x = -3, y = 40, ang = 0.06;
  const main = [[24, 5], [24, 4], [22, 3], [18, 2]] as const;
  main.forEach(([len, w], k) => {
    const x1 = x + Math.cos(ang) * len, y1 = y + Math.sin(ang) * len;
    segs.push([x, y, x1, y1, w, 6]);
    grow(x1, y1, ang - 0.7 - r() * 0.3, 10 + r() * 6, Math.max(1, w - 2), 3); // up-right shoot
    if (k % 2 === 0) grow(x1, y1, ang + 0.75 + r() * 0.3, 8 + r() * 6, Math.max(1, w - 2), 3); // down-right shoot
    x = x1; y = y1; ang += 0.1 + (r() - 0.5) * 0.12;
  });
  grow(x, y, ang, 9, 1, 3); // the tip
  segs.forEach(([x0, y0, x1, y1, w]) => {
    bark.line(x0, y0, x1, y1, C.bark, w);
    if (w > 1) bark.line(x0, y0 - Math.ceil(w / 2), x1, y1 - Math.ceil(w / 2), C.barkL, 1); // lit top edge
    if (w > 2) bark.line(x0, y0 + Math.floor(w / 2), x1, y1 + Math.floor(w / 2), C.barkD, 1); // shaded underside
  });
  const pts: [number, number, number][] = [];
  segs.forEach(([x0, y0, x1, y1, w, depth]) => {
    if (x1 < 14) return; // keep the stretch nearest the edge bare
    const steps = depth >= 6 ? 3 : depth >= 2 ? 2 : 1;
    for (let k = 1; k <= steps; k++) { const t = k / steps; pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, depth === 0 ? 3 : w > 2 ? 1 : 2]); }
  });
  const ys = pts.map((p) => p[1]), minY = Math.min(...ys), maxY = Math.max(...ys);
  const clusters: Cluster[] = [];
  pts.forEach(([px, py, n]) => {
    for (let i = 0; i < n; i++) {
      const cx = px + (r() - 0.5) * 6, cy = py + (r() - 0.6) * 5;
      clusters.push({ x: cx, y: cy, r: 1.5 + r() * 2, seed: (r() * 1e6) | 0, h: Math.max(0, Math.min(1, (maxY - cy) / (maxY - minY + 1))) });
    }
  });
  clusters.sort((a, c) => c.y - a.y); // lower (shadowed) clusters first
  return { bark, clusters };
}

function paint(out: Buf, clusters: Cluster[], t: number) {
  clusters.forEach((c) => {
    const sway = Math.sin(t * 0.9 + c.y * 0.08 + c.x * 0.02) * 0.9 * (0.3 + (c.x / W) * 0.9); // the tips move most
    const ox = Math.round(c.x + sway), oy = Math.round(c.y), rr = c.r;
    for (let yy = -3; yy <= 3; yy++) for (let xx = -3; xx <= 3; xx++) {
      const d = Math.sqrt(xx * xx + yy * yy) / rr;
      if (d > 1.15 || hash(c.seed + xx, yy, 2) < d * 0.55) continue; // airy, ragged edges
      const l = -(xx + yy) / (rr * 2) + c.h * 0.6 + (hash(c.seed, xx * 7 + yy, 1) - 0.5) * 0.5; // lit from the top-left
      out.px(ox + xx, oy + yy, l > 0.75 ? C.bl0 : l > 0.35 ? C.bl1 : l > 0 ? C.bl2 : l > -0.35 ? C.bl3 : C.bl4);
    }
  });
}

export function SakuraBranch() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const { bark, clusters } = build();
    // a few petals drifting down from the branch
    const petals = Array.from({ length: 5 }, (_, i) => ({ x0: 20 + i * 17, phase: i * 1.7, speed: 4 + (i % 3) * 1.5 }));
    let raf = 0, last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / 12) return; // 12 fps, like the scene: choppy on purpose, and cheap
      last = now;
      const t = reduce ? 0 : now / 1000, out = new Buf();
      out.d.set(bark.d);
      paint(out, clusters, t);
      if (!reduce) petals.forEach((p) => {
        const k = ((t * p.speed + p.phase * 10) % (H + 10)) - 4;
        out.px(p.x0 + 10 + k * 0.6 + Math.sin(t * 2 + p.phase) * 2, 58 + k, k % 6 < 3 ? C.bl2 : C.bl3);
      });
      ctx.putImageData(new ImageData(out.d, W, H), 0, 0);
      if (reduce) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <canvas
      ref={canvas}
      width={W}
      height={H}
      aria-hidden="true"
      className="pointer-events-none absolute top-6 left-0 z-10 hidden [image-rendering:pixelated] md:block"
      style={{ width: W * SCALE }}
    />
  );
}
