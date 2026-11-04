// Deterministic drawing helpers — every "random" shape is seeded so the server
// and the browser render exactly the same SVG (no hydration mismatch).

export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Pt = [x: number, y: number, width: number];

/** Turns a centre-line with per-point widths into a filled, tapered brush stroke. */
export function brushPath(pts: Pt[]): string {
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const [x, y, w] = pts[i];
    const [x2, y2] = pts[Math.min(i + 1, pts.length - 1)];
    const [x0, y0] = pts[Math.max(i - 1, 0)];
    const dx = x2 - x0;
    const dy = y2 - y0;
    const l = Math.hypot(dx, dy) || 1;
    const nx = -dy / l;
    const ny = dx / l;
    left.push([x + (nx * w) / 2, y + (ny * w) / 2]);
    right.push([x - (nx * w) / 2, y - (ny * w) / 2]);
  }
  const f = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  return `M${left.map(f).join(" L")} L${right.reverse().map(f).join(" L")} Z`;
}

/** The ensō: an almost-closed circle with a fat start and a dry, tapering tail. */
export const ENSO = (() => {
  const cx = 112;
  const cy = 112;
  const R = 92;
  const pts: Pt[] = [];
  for (let i = 0; i <= 90; i++) {
    const t = i / 90;
    const ang = ((-70 + t * 330) * Math.PI) / 180;
    const w = t < 0.08 ? 3 + (t / 0.08) * 13 : t < 0.7 ? 16 - (t - 0.08) * 6 : Math.max(1, 12.3 * (1 - (t - 0.7) / 0.3));
    const r = R + Math.sin(t * 9) * 1.5;
    pts.push([cx + Math.cos(ang) * r, cy + Math.sin(ang) * r, w]);
  }
  const rnd = seeded(3);
  const dry: string[] = [];
  for (let k = 0; k < 4; k++) {
    const off = -5 + k * 3.3;
    const a0 = -40 + k * 40 + rnd() * 20;
    const a1 = a0 + 60 + rnd() * 60;
    const p: string[] = [];
    for (let a = a0; a <= a1; a += 4) {
      const rr = R + off;
      p.push(`${(cx + Math.cos((a * Math.PI) / 180) * rr).toFixed(1)} ${(cy + Math.sin((a * Math.PI) / 180) * rr).toFixed(1)}`);
    }
    dry.push(`M${p.join(" L")}`);
  }
  // centre-line used as the draw-in mask
  const a0 = (-70 * Math.PI) / 180;
  const a1 = (260 * Math.PI) / 180;
  const centre = `M${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A${R} ${R} 0 1 1 ${(cx + Math.cos(a1) * R).toFixed(1)} ${(cy + Math.sin(a1) * R).toFixed(1)}`;
  return { body: brushPath(pts), dry, centre };
})();

export const UNDERLINE = (() => {
  const pts: Pt[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    pts.push([t * 330, 8 + Math.sin(t * 3.1) * -4 + t * 3, t < 0.1 ? 1 + t * 60 : 7 - (t - 0.1) * 6.5]);
  }
  return brushPath(pts);
})();

/** Washi paper fibres as a data-URI tile. */
export const WASHI = (() => {
  const rnd = seeded(3);
  let d = "";
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 600;
    const y = rnd() * 600;
    const a = rnd() * Math.PI * 2;
    const l = 6 + rnd() * 22;
    d += `M${x.toFixed(1)} ${y.toFixed(1)} q${(Math.cos(a) * l * 0.5 + rnd() * 4).toFixed(1)} ${(Math.sin(a) * l * 0.5 + rnd() * 4).toFixed(1)} ${(Math.cos(a) * l).toFixed(1)} ${(Math.sin(a) * l).toFixed(1)} `;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><path d='${d}' stroke='%23888888' stroke-opacity='0.10' stroke-width='0.7' fill='none'/></svg>`;
  return `url("data:image/svg+xml;utf8,${svg.replace(/#/g, "%23").replace(/"/g, "'")}")`;
})();

/** Stepped pixel border; `extra` are the pixels that dissolve in on scroll. */
export function pixelEdge(seed: number, width = 1440) {
  const P = 16;
  const rnd = seeded(seed);
  const base: { x: number; h: number }[] = [];
  const extra: { x: number; y: number; s: number }[] = [];
  for (let x = 0; x < width; x += P) {
    const v = rnd();
    const h = v < 0.45 ? 0 : v < 0.8 ? P : P * 2;
    base.push({ x, h });
    if (rnd() < 0.18) extra.push({ x, y: P + h + (rnd() < 0.5 ? 0 : P), s: rnd() < 0.5 ? P : P / 2 });
  }
  return { P, base, extra };
}

/** Footer rooftops. */
export function rooftops() {
  const rnd = seeded(11);
  const houses: { x: number; w: number; h: number; win: number[] }[] = [];
  let x = 0;
  while (x < 1440) {
    if (x > 96 && x < 300) {
      x = 300;
      continue;
    }
    const w = 58 + Math.floor(rnd() * 70);
    const h = 34 + Math.floor(rnd() * 46);
    const win: number[] = [];
    if (rnd() > 0.25) win.push(Math.round(w * 0.25));
    if (rnd() > 0.55) win.push(Math.round(w * 0.6));
    houses.push({ x, w, h, win });
    x += w + Math.floor(rnd() * 6);
  }
  return houses;
}
