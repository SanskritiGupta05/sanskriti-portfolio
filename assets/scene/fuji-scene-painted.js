// Fuji scene, painterly version (Mythili-style): the same place and the same life as the pixel scene,
// drawn with soft shapes, gradients, blur and film grain instead of pixels.
//
// Interactions (same as the pixel version):
//   - click the pagoda → wind bells ring, sway, and gold sparkles rise
//   - click a bird (sky or ground) → it and its neighbours fly off, with a chirp
//   - click the lady → she scatters food; sparrows fly down to peck at it
//   - click the lake → ripple rings
// Ambient: drifting cloud shadows, falling petals, lake shimmer, flocks of birds, the lady walking up to the temple.
//
// Usage: const scene = mountFujiScenePainted(canvas); … scene.destroy();
// Layout uses a 1200 × 510 logical space (exactly 3× the pixel scene), scaled to the canvas size.

import { chime, chirp } from './scene-audio.js';

export const LW = 1200;
export const LH = 510;

function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// layout (3× the pixel scene)
const FUJI = { cx: 505, peak: 90, base: 365 };
const PAGODA = { cx: 1002, base: 363 };
const TORII = { x: 150, base: 446 };
const GROUND_Y = 393;
const pathX = (y) => 900 - ((y - (GROUND_Y - 6)) / (LH - GROUND_Y + 6)) * 510;
const pathY = (x) => GROUND_Y - 6 + ((900 - x) / 510) * (LH - GROUND_Y + 6);
const lakeRight = (y) => 786 - (y - 360) * 9 + Math.sin(y * 0.3) * 6;

const blur = (ctx, px, fn) => { ctx.save(); ctx.filter = `blur(${px}px)`; fn(); ctx.restore(); };
const ellipse = (ctx, x, y, rx, ry, fill) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); };

// ---------- static painting ----------
function fujiPath(ctx) {
  ctx.beginPath();
  ctx.moveTo(-90, FUJI.base);
  ctx.quadraticCurveTo(330, 255, FUJI.cx - 12, FUJI.peak + 2);
  ctx.lineTo(FUJI.cx - 4, FUJI.peak - 1); ctx.lineTo(FUJI.cx + 5, FUJI.peak + 1); ctx.lineTo(FUJI.cx + 13, FUJI.peak);
  ctx.quadraticCurveTo(690, 255, 1110, FUJI.base);
  ctx.closePath();
}

function paintStatic(ctx, r) {
  // sky
  let g = ctx.createLinearGradient(0, 0, 0, 360);
  g.addColorStop(0, '#b4d0e4'); g.addColorStop(0.55, '#d9e8ee'); g.addColorStop(1, '#f6ece3');
  ctx.fillStyle = g; ctx.fillRect(0, 0, LW, LH);
  g = ctx.createRadialGradient(930, 110, 10, 930, 110, 300);
  g.addColorStop(0, 'rgba(255,240,215,0.65)'); g.addColorStop(1, 'rgba(255,240,215,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, LW, LH);
  // high wispy clouds
  blur(ctx, 12, () => { for (let i = 0; i < 9; i++) ellipse(ctx, r() * LW, 30 + r() * 70, 60 + r() * 90, 8 + r() * 10, 'rgba(255,255,255,0.55)'); });

  // Fuji body: lit from the left
  fujiPath(ctx);
  g = ctx.createLinearGradient(300, 0, 800, 0);
  g.addColorStop(0, '#a9b9d8'); g.addColorStop(0.45, '#8a9cc5'); g.addColorStop(1, '#6a7aa4');
  ctx.fillStyle = g; ctx.fill();
  ctx.save(); fujiPath(ctx); ctx.clip();
  // ridges fanning from the summit
  blur(ctx, 1.2, () => {
    for (let i = -16; i <= 16; i++) {
      const bx = FUJI.cx + i * 38 + (r() - 0.5) * 14;
      ctx.beginPath(); ctx.moveTo(FUJI.cx + i * 1.5, FUJI.peak + 8);
      ctx.quadraticCurveTo(FUJI.cx + i * 16, 220, bx, FUJI.base);
      ctx.strokeStyle = i > 0 ? 'rgba(60,75,118,0.22)' : 'rgba(255,255,255,0.16)'; ctx.lineWidth = 2 + r() * 1.5; ctx.stroke();
    }
  });
  // snow cap with fingers down the ridges
  // irregular fingers: each one gets its own length and width
  const fingers = []; for (let fx = 270; fx < 750; fx += 20 + r() * 26) fingers.push([fx, 6 + r() * 30, 5 + r() * 9]);
  ctx.beginPath(); ctx.moveTo(250, 0); ctx.lineTo(760, 0);
  for (let x = 760; x >= 250; x -= 2) {
    const dx = x - FUJI.cx;
    let finger = 0; for (const [fx, len, wdt] of fingers) { const d = (x - fx) / wdt; if (Math.abs(d) < 1.6) finger = Math.max(finger, len * Math.exp(-d * d)); }
    ctx.lineTo(x, 148 + Math.abs(dx) * 0.15 + finger + Math.sin(x * 0.31) * 3 + Math.sin(x * 1.3) * 1.2);
  }
  ctx.closePath();
  g = ctx.createLinearGradient(380, 0, 700, 0);
  g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#f1f4f9'); g.addColorStop(1, '#cdd7e8');
  ctx.fillStyle = g; ctx.fill();
  // haze toward the base
  g = ctx.createLinearGradient(0, 250, 0, FUJI.base);
  g.addColorStop(0, 'rgba(225,232,240,0)'); g.addColorStop(1, 'rgba(225,232,240,0.9)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, LW, LH);
  ctx.restore();
  // cloud bank on Fuji's shoulders
  blur(ctx, 7, () => { for (let i = 0; i < 30; i++) ellipse(ctx, 120 + r() * 840, 252 + r() * 40, 26 + r() * 40, 8 + r() * 10, `rgba(255,255,255,${0.6 + r() * 0.3})`); });

  // hill ranges
  [['#aabdc2', 315, 18, 0.011, 1], ['#8fa9a3', 330, 16, 0.016, 3], ['#76978b', 348, 13, 0.022, 5]].forEach(([c, base, amp, f, ph], k) => {
    const draw = () => {
      ctx.beginPath(); ctx.moveTo(0, LH);
      for (let x = 0; x <= LW; x += 6) ctx.lineTo(x, base - amp * (0.6 + 0.4 * Math.sin(x * f + ph)) - Math.sin(x * f * 2.7) * 5);
      ctx.lineTo(LW, LH); ctx.closePath(); ctx.fillStyle = c; ctx.fill();
    };
    k === 0 ? blur(ctx, 1.5, draw) : draw();
  });

  // lake, with Fuji's reflection
  ctx.save();
  ctx.beginPath(); ctx.moveTo(0, 360); for (let y = 360; y <= GROUND_Y + 2; y += 3) ctx.lineTo(lakeRight(y), y); ctx.lineTo(0, GROUND_Y + 2); ctx.closePath();
  g = ctx.createLinearGradient(0, 360, 0, GROUND_Y); g.addColorStop(0, '#8fb5cd'); g.addColorStop(1, '#b6d2e1');
  ctx.fillStyle = g; ctx.fill(); ctx.clip();
  blur(ctx, 3, () => { ctx.globalAlpha = 0.28; ctx.translate(0, 2 * 362); ctx.scale(1, -0.32); fujiPath(ctx); ctx.fillStyle = '#ffffff'; ctx.fill(); });
  ctx.restore();

  // wooded rise on the right (the pagoda's hill)
  ctx.beginPath(); ctx.moveTo(690, LH);
  for (let x = 690; x <= LW; x += 6) ctx.lineTo(x, 356 - Math.min(64, (x - 690) * 0.42) + Math.sin(x * 0.06) * 3);
  ctx.lineTo(LW, LH); ctx.closePath(); ctx.fillStyle = '#5c8763'; ctx.fill();
  const trees = [];
  for (let i = 0; i < 120; i++) {
    const x = 700 + r() * 510, top = 356 - Math.min(64, (x - 690) * 0.42);
    if (Math.abs(x - PAGODA.cx) < 46 && r() < 0.85) continue;
    trees.push([x, top + r() * 44, 12 + r() * 16, r() < 0.28]);
  }
  trees.sort((a, b) => a[1] - b[1]).forEach(([x, y, rad, bloom]) => softTree(ctx, x, y, rad, bloom));

  // meadow
  g = ctx.createLinearGradient(0, GROUND_Y, 0, LH); g.addColorStop(0, '#a3c385'); g.addColorStop(1, '#7ea763');
  ctx.fillStyle = g; ctx.fillRect(0, GROUND_Y, LW, LH - GROUND_Y);
  for (let i = 0; i < 1800; i++) {
    const x = r() * LW, y = GROUND_Y + r() * (LH - GROUND_Y), len = 3 + (y - GROUND_Y) * 0.05;
    ctx.strokeStyle = r() < 0.5 ? 'rgba(80,120,60,0.35)' : 'rgba(200,225,160,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - 0.5) * 2, y - len); ctx.stroke();
  }
  // path to the pagoda
  blur(ctx, 1.5, () => {
    ctx.beginPath();
    for (let y = GROUND_Y - 6; y <= LH; y += 4) { const t = (y - (GROUND_Y - 6)) / (LH - GROUND_Y + 6); ctx.lineTo(pathX(y) - (14 + t * 78), y); }
    for (let y = LH; y >= GROUND_Y - 6; y -= 4) { const t = (y - (GROUND_Y - 6)) / (LH - GROUND_Y + 6); ctx.lineTo(pathX(y) + (14 + t * 78), y); }
    ctx.closePath(); ctx.fillStyle = '#e4d3b3'; ctx.fill();
  });
  for (let i = 0; i < 160; i++) { const y = GROUND_Y + r() * (LH - GROUND_Y), t = (y - GROUND_Y) / (LH - GROUND_Y); ellipse(ctx, pathX(y) + (r() - 0.5) * (20 + t * 140), y, 1.6, 1, 'rgba(160,130,95,0.45)'); }
  // stone steps
  for (let s = 0; s < 4; s++) { ctx.fillStyle = s % 2 ? '#aaa298' : '#8a8279'; ctx.fillRect(PAGODA.cx - 26 + s * 4, PAGODA.base + 4 + s * 9, 52 - s * 8, 6); }

  paintPagoda(ctx);
  paintTorii(ctx);
  paintLantern(ctx, 738, 438);
  // fallen petals and little flowers in the grass
  for (let i = 0; i < 260; i++) {
    const x = r() * LW, y = GROUND_Y + 4 + r() * (LH - GROUND_Y - 4);
    if (Math.abs(x - pathX(y)) < 30 + (y - GROUND_Y) * 0.7) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3); ellipse(ctx, 0, 0, 2.4, 1.3, r() < 0.7 ? '#f5c9d5' : '#fde8ee'); ctx.restore();
  }
  // cherry trees (in front)
  const blobs = [];
  blobs.push(...cherry(ctx, r, 42, LH - 10, 120, 1), ...cherry(ctx, r, 1134, LH - 8, 108, -1), ...cherry(ctx, r, 810, GROUND_Y + 14, 56, 1));
  return blobs;
}

function softTree(ctx, x, y, rad, bloom) {
  const g = ctx.createRadialGradient(x - rad * 0.35, y - rad * 0.4, rad * 0.1, x, y, rad);
  if (bloom) { g.addColorStop(0, '#fde6ee'); g.addColorStop(0.5, '#f2b9c9'); g.addColorStop(1, '#d98aa4'); }
  else { g.addColorStop(0, '#8dbb7c'); g.addColorStop(0.55, '#5e8d63'); g.addColorStop(1, '#3e6549'); }
  ellipse(ctx, x, y, rad, rad * 0.88, g);
}

function cherry(ctx, r, x, base, size, flip) {
  const top = base - size * 0.95;
  // trunk
  ctx.strokeStyle = '#5b3e37'; ctx.lineCap = 'round';
  ctx.lineWidth = size * 0.09; ctx.beginPath(); ctx.moveTo(x, base); ctx.quadraticCurveTo(x + size * 0.12 * flip, base - size * 0.5, x - size * 0.05 * flip, top); ctx.stroke();
  const blobs = [];
  for (let i = 0; i < 12 + size / 10; i++) blobs.push([x + (r() - 0.5) * size * 1.7, top - r() * size * 0.55 + size * 0.15, 10 + r() * size * 0.26]);
  ctx.lineWidth = size * 0.025;
  blobs.forEach(([bx, by]) => { ctx.beginPath(); ctx.moveTo(x, top + size * 0.1); ctx.quadraticCurveTo((x + bx) / 2, by + 12, bx, by); ctx.strokeStyle = '#4a322d'; ctx.stroke(); });
  // canopy: many small overlapping clusters, darker underneath and brighter on top, softly blurred
  const clusters = [];
  blobs.forEach(([bx, by, rad]) => { for (let k = 0; k < 9; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad; clusters.push([bx + Math.cos(a) * d, by + Math.sin(a) * d * 0.8, 4 + r() * rad * 0.42]); } });
  clusters.sort((p, q) => q[1] - p[1]); // back (lower) first
  blur(ctx, 0.8, () => clusters.forEach(([cx, cy, cr]) => {
    const light = Math.max(0, Math.min(1, (top + size * 0.3 - cy) / (size * 0.9)));
    const g = ctx.createRadialGradient(cx - cr * 0.3, cy - cr * 0.35, cr * 0.1, cx, cy, cr);
    g.addColorStop(0, light > 0.5 ? '#fff3f7' : '#fbdde6'); g.addColorStop(0.55, light > 0.4 ? '#f6c9d6' : '#eeb2c4'); g.addColorStop(1, light > 0.3 ? '#e8a6ba' : '#d78ba3');
    ellipse(ctx, cx, cy, cr, cr * 0.9, g);
  }));
  for (let k = 0; k < clusters.length * 0.6; k++) { const [cx, cy, cr] = clusters[(r() * clusters.length) | 0]; ellipse(ctx, cx + (r() - 0.5) * cr, cy + (r() - 0.5) * cr, 1.3, 1.3, 'rgba(255,255,255,0.75)'); }
  return blobs;
}

const BELLS = [];
function paintPagoda(ctx) {
  const { cx, base } = PAGODA;
  BELLS.length = 0;
  // soft ground shadow
  blur(ctx, 6, () => ellipse(ctx, cx + 12, base + 2, 60, 8, 'rgba(30,40,40,0.25)'));
  let y = base;
  ctx.fillStyle = '#aaa298'; ctx.fillRect(cx - 46, y - 9, 92, 9); ctx.fillStyle = '#8a8279'; ctx.fillRect(cx - 46, y - 3, 92, 3);
  y -= 9;
  for (let i = 0; i < 5; i++) {
    const bw = 60 - i * 7.2, bh = i === 0 ? 27 : 21, rw = bw + 40 - i * 2;
    const x0 = cx - bw / 2;
    let g = ctx.createLinearGradient(x0, 0, x0 + bw, 0); g.addColorStop(0, '#e05a48'); g.addColorStop(0.7, '#c94234'); g.addColorStop(1, '#962c28');
    ctx.fillStyle = g; ctx.fillRect(x0, y - bh, bw, bh);
    ctx.fillStyle = '#f1e6d2'; ctx.fillRect(x0 + 6, y - bh + 6, bw - 12, bh - 12);
    ctx.fillStyle = i === 0 ? '#2c2526' : '#9a2e2a'; ctx.fillRect(cx - 4, y - bh + 6, 8, bh - 8);
    ctx.fillStyle = '#e8705c'; ctx.fillRect(x0 - 3, y - 6, bw + 6, 2);
    y -= bh;
    // roof with swept-up eaves
    const L = cx - rw / 2, R = cx + rw / 2;
    ctx.beginPath();
    ctx.moveTo(L - 6, y - 9);
    ctx.quadraticCurveTo(L + 14, y + 4, cx, y + 3);
    ctx.quadraticCurveTo(R - 14, y + 4, R + 6, y - 9);
    ctx.quadraticCurveTo(R - 8, y - 8, R - rw * 0.2, y - 15);
    ctx.lineTo(L + rw * 0.2, y - 15);
    ctx.quadraticCurveTo(L + 8, y - 8, L - 6, y - 9);
    g = ctx.createLinearGradient(0, y - 15, 0, y + 4); g.addColorStop(0, '#6a7a85'); g.addColorStop(0.6, '#3f4b55'); g.addColorStop(1, '#262e35');
    ctx.fillStyle = g; ctx.fill();
    ctx.fillStyle = '#9c2f2a'; ctx.fillRect(L + 10, y + 3, rw - 20, 2);
    BELLS.push([L - 6, y - 7], [R + 6, y - 7]);
    y -= 15;
  }
  // bronze spire
  let g = ctx.createLinearGradient(cx - 4, 0, cx + 4, 0); g.addColorStop(0, '#9aa98f'); g.addColorStop(1, '#55624f');
  ctx.fillStyle = g; ctx.fillRect(cx - 3, y - 54, 7, 54);
  for (let k = 0; k < 8; k++) { ctx.fillStyle = '#55624f'; ctx.fillRect(cx - 6, y - 8 - k * 6, 13, 2); }
  ellipse(ctx, cx + 0.5, y - 58, 3, 4, '#e2b04a');
  PAGODA.top = y - 62;
  PAGODA.box = { x0: cx - 66, x1: cx + 66, y0: PAGODA.top, y1: base + 4 };
}

function paintTorii(ctx) {
  const { x, base } = TORII, w = 104, h = 122, top = base - h;
  blur(ctx, 5, () => ellipse(ctx, x + w / 2 + 8, base + 2, w * 0.6, 6, 'rgba(30,40,30,0.22)'));
  const post = (px) => {
    const g = ctx.createLinearGradient(px, 0, px + 10, 0); g.addColorStop(0, '#e0604e'); g.addColorStop(1, '#a8312b');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(px + 1, top + 18); ctx.lineTo(px + 9, top + 18); ctx.lineTo(px + 10, base - 8); ctx.lineTo(px, base - 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2a2324'; ctx.fillRect(px - 2, base - 9, 14, 9);
  };
  post(x + 16); post(x + w - 26);
  // kasagi: black top beam curving up at the ends, red beam below it
  ctx.beginPath(); ctx.moveTo(x - 8, top - 2); ctx.quadraticCurveTo(x + w / 2, top + 8, x + w + 8, top - 2); ctx.lineTo(x + w + 4, top + 8); ctx.quadraticCurveTo(x + w / 2, top + 15, x - 4, top + 8); ctx.closePath();
  ctx.fillStyle = '#2a2324'; ctx.fill();
  ctx.fillStyle = '#c94234'; ctx.fillRect(x + 2, top + 11, w - 4, 6);
  ctx.fillStyle = '#c94234'; ctx.fillRect(x + 6, top + 32, w - 12, 7); ctx.fillStyle = '#962c28'; ctx.fillRect(x + 6, top + 37, w - 12, 2);
  ctx.fillStyle = '#2a2324'; ctx.fillRect(x + w / 2 - 6, top + 16, 12, 16); ctx.fillStyle = '#e2b04a'; ctx.fillRect(x + w / 2 - 2, top + 21, 4, 5);
}

function paintLantern(ctx, x, base) {
  blur(ctx, 3, () => ellipse(ctx, x + 6, base, 18, 3, 'rgba(30,40,30,0.25)'));
  const stone = (x0, y0, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x0, y0, w, h); };
  stone(x - 12, base - 8, 24, 8, '#8a8279'); stone(x - 5, base - 30, 10, 22, '#aaa298'); stone(x - 12, base - 36, 24, 6, '#8a8279');
  stone(x - 10, base - 50, 20, 14, '#aaa298'); stone(x - 5, base - 46, 10, 7, '#f0c464');
  ctx.beginPath(); ctx.moveTo(x - 19, base - 50); ctx.lineTo(x + 19, base - 50); ctx.lineTo(x + 6, base - 60); ctx.lineTo(x - 6, base - 60); ctx.closePath(); ctx.fillStyle = '#8a8279'; ctx.fill();
  ellipse(ctx, x, base - 63, 4, 4, '#aaa298');
}

// ---------- the scene ----------
export function mountFujiScenePainted(canvas, { seed = 11 } = {}) {
  const ctx = canvas.getContext('2d');
  const bg = document.createElement('canvas');
  let scale = 1, blossomBlobs = [];

  // film grain: a small noise tile drawn over everything
  const grain = document.createElement('canvas'); grain.width = grain.height = 160;
  { const g = grain.getContext('2d'), id = g.createImageData(160, 160); for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 22; } g.putImageData(id, 0, 0); }
  // a soft cloud-shadow sprite
  const shadowSprite = document.createElement('canvas'); shadowSprite.width = 360; shadowSprite.height = 120;
  { const g = shadowSprite.getContext('2d'); g.filter = 'blur(18px)'; for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(80 + i * 40, 60 + Math.sin(i) * 10, 70, 26, 0, 0, Math.PI * 2); g.fillStyle = 'rgba(25,35,45,0.11)'; g.fill(); } }

  function build() {
    const dpr = Math.min(2, window.devicePixelRatio || 1), w = Math.max(300, canvas.clientWidth || LW);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * dpr * LH / LW);
    bg.width = canvas.width; bg.height = canvas.height; scale = canvas.width / LW;
    const b = bg.getContext('2d'); b.setTransform(scale, 0, 0, scale, 0, 0);
    blossomBlobs = paintStatic(b, rng(seed));
  }
  build();
  const ro = new ResizeObserver(() => build()); ro.observe(canvas);

  const r = Math.random;
  const petals = Array.from({ length: 46 }, () => newPetal(true));
  function newPetal(anywhere = false) {
    const [bx, by, rad] = blossomBlobs[(r() * blossomBlobs.length) | 0] || [600, 300, 20];
    return { x: bx + (r() - 0.5) * rad * 2, y: anywhere ? r() * LH : by, vx: 0.5 + r() * 0.6, vy: 0.35 + r() * 0.4, rot: r() * 6, vr: (r() - 0.5) * 0.1, ph: r() * 6, c: r() < 0.5 ? '#f6c8d4' : '#fde6ee' };
  }
  const shadows = [{ x: 100, y: 430 }, { x: 760, y: 470 }];
  const flock = [];
  function spawnFlock() {
    const n = 3 + ((r() * 3) | 0), y = 60 + r() * 90, dir = r() < 0.5 ? 1 : -1, x = dir > 0 ? -30 : LW + 30;
    for (let i = 0; i < n; i++) flock.push({ x: x - dir * i * (24 + r() * 12), y: y + (i % 2) * 12 + r() * 8, vx: dir * (0.9 + r() * 0.3), vy: 0, ph: r() * 6, flee: false });
  }
  spawnFlock();
  const sparrows = [], grains = [], notes = [], ripples = [];
  let bellSwing = 0, frame = 0, raf = 0, last = 0, idleFeed = 420;

  const START_X = 396, FEED_X = 588;
  const lady = { x: START_X, y: 0, state: 'walk', t: 0, alpha: 1, face: 1 };
  const placeLady = () => { lady.y = pathY(lady.x); };
  placeLady();

  // ---- interactions ----
  const toScene = (e) => { const rc = canvas.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width * LW, (e.clientY - rc.top) / rc.height * LH]; };
  const near = (a, x, y, d) => Math.abs(a.x - x) < d && Math.abs(a.y - y) < d;
  const inBox = (bx, x, y) => x >= bx.x0 && x <= bx.x1 && y >= bx.y0 && y <= bx.y1;
  const ladyBox = () => ({ x0: lady.x - 18, x1: lady.x + 18, y0: lady.y - 64, y1: lady.y + 4 });
  const inLake = (x, y) => y > 360 && y < GROUND_Y && x < lakeRight(y);

  function scareSky(x, y) { chirp((x / LW) * 2 - 1); flock.forEach((bd) => { if (near(bd, x, y, 80)) { bd.flee = true; bd.vy = -2.4 - r() * 1.5; bd.vx *= 2.6; } }); }
  function scareSparrows() { if (sparrows.length) chirp(); sparrows.forEach((s) => { s.state = 'leave'; s.vy = -2.6 - r(); s.vx = (r() < 0.5 ? -1 : 1) * (2 + r() * 2); }); }
  function feed() {
    if (lady.state !== 'idle' && lady.state !== 'walk') return; // she stops walking to feed them
    lady.state = 'throw'; lady.t = 0;
    for (let i = 0; i < 12; i++) grains.push({ x: lady.x + 14, y: lady.y - 34, vx: 1 + r() * 2.6, vy: -1.4 - r() * 1.2, landed: false, gy: lady.y + 4 + r() * 6 });
    const n = 2 + ((r() * 2) | 0);
    for (let i = 0; i < n; i++) sparrows.push({ x: lady.x + (r() < 0.5 ? -180 : 220), y: lady.y - 160 - r() * 60, tx: lady.x + 40 + i * 18 + r() * 10, ty: lady.y + 4 + r() * 4, state: 'arrive', t: 0, vx: 0, vy: 0, flip: r() < 0.5 });
    setTimeout(() => chirp(0.2), 700);
  }
  function onClick(e) {
    const [x, y] = toScene(e);
    if (sparrows.some((s) => near(s, x, y, 16))) return scareSparrows();
    if (flock.some((bd) => near(bd, x, y, 22))) return scareSky(x, y);
    if (inBox(ladyBox(), x, y)) return feed();
    if (PAGODA.box && inBox(PAGODA.box, x, y)) { bellSwing = 1; chime(); for (let i = 0; i < 8; i++) notes.push({ x: PAGODA.cx + (r() - 0.5) * 90, y: PAGODA.top + 60 + r() * 120, life: 60 + r() * 40 }); return; }
    if (inLake(x, y)) ripples.push({ x, y, r: 0 });
  }
  function onMove(e) {
    const [x, y] = toScene(e);
    const hot = sparrows.some((s) => near(s, x, y, 16)) || flock.some((bd) => near(bd, x, y, 22)) || inBox(ladyBox(), x, y) || (PAGODA.box && inBox(PAGODA.box, x, y)) || inLake(x, y);
    canvas.style.cursor = hot ? 'pointer' : 'default';
  }
  canvas.addEventListener('click', onClick);
  canvas.addEventListener('pointermove', onMove);

  // ---- simulation ----
  function step() {
    frame++;
    petals.forEach((p, i) => { p.x += p.vx + Math.sin(frame * 0.05 + p.ph) * 0.5; p.y += p.vy; p.rot += p.vr; if (p.y > LH || p.x > LW + 4) petals[i] = newPetal(); });
    shadows.forEach((s) => { s.x += 0.25; if (s.x > LW + 200) s.x = -380; });
    flock.forEach((bd) => { bd.x += bd.vx; bd.y += bd.vy + (bd.flee ? 0 : Math.sin(frame * 0.05 + bd.ph) * 0.15); bd.ph += bd.flee ? 0.5 : 0.22; });
    for (let i = flock.length - 1; i >= 0; i--) if (flock[i].x < -60 || flock[i].x > LW + 60 || flock[i].y < -40) flock.splice(i, 1);
    if (!flock.length && r() < 0.008) spawnFlock();

    lady.t++;
    if (lady.state === 'walk') { lady.x += 0.7; placeLady(); lady.alpha = Math.min(1, lady.alpha + 0.03); if (lady.x >= FEED_X) { lady.state = 'idle'; lady.t = 0; } }
    else if (lady.state === 'throw') { if (lady.t > 24) { lady.state = 'idle'; lady.t = 0; } }
    else if (lady.state === 'idle') {
      if (lady.t > idleFeed && !sparrows.length) { feed(); idleFeed = 520 + r() * 300; }
      if (lady.t > 1000 && !sparrows.length) { lady.state = 'toTemple'; lady.t = 0; }
    } else if (lady.state === 'toTemple') {
      lady.x += 0.6; placeLady();
      if (lady.x > PAGODA.cx - 120) lady.alpha = Math.max(0, lady.alpha - 0.02);
      if (lady.alpha === 0) { lady.x = START_X; placeLady(); lady.state = 'walk'; lady.t = 0; }
    }
    grains.forEach((g) => { if (g.landed) return; g.x += g.vx; g.y += g.vy; g.vy += 0.16; if (g.y >= g.gy) { g.y = g.gy; g.landed = true; } });
    sparrows.forEach((s) => {
      s.t++;
      if (s.state === 'arrive') { s.x += (s.tx - s.x) * 0.05; s.y += (s.ty - s.y) * 0.05; if (Math.abs(s.x - s.tx) < 1 && Math.abs(s.y - s.ty) < 1) { s.state = 'peck'; s.t = 0; } }
      else if (s.state === 'peck') { if (s.t % 40 === 0 && r() < 0.4) { s.x += (r() < 0.5 ? -4 : 4); s.flip = !s.flip; } if (s.t > 330) { s.state = 'leave'; s.vy = -2.4; s.vx = (s.flip ? -1 : 1) * 2.4; } }
      else { s.x += s.vx; s.y += s.vy; s.vy -= 0.03; }
    });
    for (let i = sparrows.length - 1; i >= 0; i--) if (sparrows[i].y < -30 || sparrows[i].x < -30 || sparrows[i].x > LW + 30) sparrows.splice(i, 1);
    if (!sparrows.length) for (let i = grains.length - 1; i >= 0; i--) if (grains[i].landed && r() < 0.03) grains.splice(i, 1);
    bellSwing *= 0.975; if (bellSwing < 0.01) bellSwing = 0;
    notes.forEach((n) => { n.y -= 0.7; n.x += Math.sin(n.y * 0.06) * 0.4; n.life--; }); for (let i = notes.length - 1; i >= 0; i--) if (notes[i].life <= 0) notes.splice(i, 1);
    ripples.forEach((rp) => { rp.r += 0.7; }); for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].r > 46) ripples.splice(i, 1);
  }

  // ---- drawing ----
  function drawLady() {
    if (lady.alpha <= 0) return;
    const { x, y } = lady, walking = lady.state === 'walk' || lady.state === 'toTemple';
    const step = walking ? Math.sin(lady.t * 0.18) : 0, bob = walking ? Math.abs(step) * 1.5 : 0;
    ctx.save(); ctx.globalAlpha = lady.alpha;
    ellipse(ctx, x + 3, y + 1, 15, 3.5, 'rgba(30,40,30,0.25)');
    ctx.translate(x, y - bob);
    // zori peeking out while walking
    ctx.fillStyle = '#5b3e37'; ctx.fillRect(-6 + step * 3, -3, 6, 3); ctx.fillRect(1 - step * 3, -3, 6, 3);
    // kimono: narrow at the shoulders, flaring to the hem
    let g = ctx.createLinearGradient(-12, 0, 12, 0); g.addColorStop(0, '#5b78ad'); g.addColorStop(1, '#2f4470');
    ctx.beginPath(); ctx.moveTo(-8, -46); ctx.lineTo(8, -46); ctx.quadraticCurveTo(11, -20, 12, -3); ctx.lineTo(-11, -3); ctx.quadraticCurveTo(-10, -22, -8, -46); ctx.fillStyle = g; ctx.fill();
    // pattern: small pink flowers
    [[-4, -16], [5, -10], [-2, -7], [6, -22], [-6, -26]].forEach(([px, py]) => ellipse(ctx, px, py, 1.5, 1.5, '#f2c4d0'));
    // obi with a gold cord
    ctx.fillStyle = '#cc4436'; ctx.fillRect(-9, -36, 18, 7); ctx.fillStyle = '#e2b04a'; ctx.fillRect(-9, -33, 18, 1.2);
    // long sleeve + arm (reaching out while throwing)
    const throwing = lady.state === 'throw';
    ctx.fillStyle = '#3f5b8c';
    ctx.beginPath(); throwing ? (ctx.moveTo(4, -44), ctx.lineTo(20, -38), ctx.lineTo(19, -32), ctx.lineTo(4, -36)) : (ctx.moveTo(4, -44), ctx.quadraticCurveTo(12, -34, 9, -24), ctx.lineTo(3, -26)); ctx.closePath(); ctx.fill();
    ellipse(ctx, throwing ? 22 : 9, throwing ? -36 : -24, 2.2, 2.2, '#f2c8a7');
    // head, hair, bun and kanzashi
    ellipse(ctx, 1, -52, 6.5, 7, '#f2c8a7');
    ctx.fillStyle = '#1f1717'; ctx.beginPath(); ctx.ellipse(-1, -54, 7.5, 7, 0, Math.PI * 0.75, Math.PI * 2.15); ctx.fill();
    ellipse(ctx, -5, -61, 4.5, 4, '#1f1717');
    ellipse(ctx, -1, -64, 2, 2, '#f4a6bb'); ellipse(ctx, 0.5, -65.5, 1.2, 1.2, '#fde6ee');
    ellipse(ctx, 6, -50, 1.6, 1.4, '#f0a99a'); // cheek blush
    ctx.restore();
  }

  function drawSparrow(s) {
    ctx.save(); ctx.translate(s.x, s.y); if (s.flip) ctx.scale(-1, 1);
    const flying = s.state !== 'peck', peck = s.state === 'peck' && (s.t >> 4) % 2;
    if (flying) {
      const w = Math.sin(s.t * 0.8) * 5;
      ctx.strokeStyle = '#7d5d45'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-7, -w); ctx.lineTo(0, 0); ctx.lineTo(7, -w); ctx.stroke();
    } else {
      ellipse(ctx, -5, -4, 4, 1.6, '#5b4535'); // tail
      ellipse(ctx, 0, -5, 6, 4.2, '#8b6a4f'); ellipse(ctx, 0.5, -3.5, 4, 2.2, '#d1b393');
      const hx = peck ? 5 : 4.5, hy = peck ? -2 : -9;
      ellipse(ctx, hx, hy, 3.2, 3, '#7a5a42'); ellipse(ctx, hx + 1, hy - 0.6, 0.8, 0.8, '#1f1717');
      ctx.fillStyle = '#a77a26'; ctx.beginPath(); ctx.moveTo(hx + 3, hy); ctx.lineTo(hx + 5.5, hy + 0.8); ctx.lineTo(hx + 3, hy + 1.3); ctx.fill();
      ctx.strokeStyle = '#5b4535'; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(-1, -1); ctx.lineTo(-1, 1); ctx.moveTo(2, -1); ctx.lineTo(2, 1); ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    // cloud shadows sliding over the hills and meadow
    shadows.forEach((s) => ctx.drawImage(shadowSprite, s.x - 180, s.y - 60));
    // lake shimmer + ripples
    ctx.save(); ctx.beginPath(); ctx.moveTo(0, 360); for (let yy = 360; yy <= GROUND_Y + 2; yy += 3) ctx.lineTo(lakeRight(yy), yy); ctx.lineTo(0, GROUND_Y + 2); ctx.closePath(); ctx.clip();
    for (let i = 0; i < 26; i++) { const sx = (i * 137 + frame * 0.6) % 780, sy = 366 + ((i * 29) % 26), a = 0.25 + 0.35 * Math.sin(frame * 0.05 + i); ctx.fillStyle = `rgba(255,255,255,${Math.max(0, a)})`; ctx.fillRect(sx, sy, 10 + (i % 3) * 4, 1.2); }
    ripples.forEach((rp) => { ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, 0.75 - rp.r / 60)})`; ctx.lineWidth = 1.4; for (const k of [1, 0.6]) { ctx.beginPath(); ctx.ellipse(rp.x, rp.y, rp.r * k, rp.r * k * 0.32, 0, 0, Math.PI * 2); ctx.stroke(); } });
    ctx.restore();
    // pagoda bells and sparkles
    BELLS.forEach(([bx, by], i) => { const sw = Math.sin(frame * 0.35 + i) * 3 * bellSwing; ctx.strokeStyle = '#a77a26'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + sw, by + 5); ctx.stroke(); ellipse(ctx, bx + sw, by + 7, 2.2, 2.6, '#e2b04a'); });
    notes.forEach((n) => { const a = Math.min(1, n.life / 40); ctx.fillStyle = `rgba(242,196,90,${a})`; ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(Math.PI / 4); ctx.fillRect(-2, -2, 4, 4); ctx.restore(); });
    // grains, lady, sparrows (sorted roughly by depth)
    grains.forEach((g) => ellipse(ctx, g.x, g.y, 1.4, 1.1, '#d4a94e'));
    drawLady();
    sparrows.forEach(drawSparrow);
    // sky birds: soft gull-wing strokes
    flock.forEach((bd) => { const w = Math.sin(bd.ph) * 6; ctx.strokeStyle = 'rgba(60,51,49,0.85)'; ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bd.x - 9, bd.y - w); ctx.quadraticCurveTo(bd.x - 4, bd.y - 4 - w * 0.3, bd.x, bd.y); ctx.quadraticCurveTo(bd.x + 4, bd.y - 4 - w * 0.3, bd.x + 9, bd.y - w); ctx.stroke(); });
    // petals tumbling
    petals.forEach((p) => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ellipse(ctx, 0, 0, 3, 1.7 * Math.abs(Math.cos(frame * 0.08 + p.ph)) + 0.4, p.c); ctx.restore(); });
    // film grain over everything
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = ctx.createPattern(grain, 'repeat'); ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.restore();
  }

  function loop(ts) { raf = requestAnimationFrame(loop); if (ts - last < 1000 / 30) return; last = ts; step(); draw(); }
  draw();
  raf = requestAnimationFrame(loop);

  return { destroy() { cancelAnimationFrame(raf); ro.disconnect(); canvas.removeEventListener('click', onClick); canvas.removeEventListener('pointermove', onMove); } };
}
