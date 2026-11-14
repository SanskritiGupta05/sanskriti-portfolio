// Fuji scene (v2): an interactive pixel-art banner.
// Mount Fuji over a lake; a temple complex on the right (a wide main hall and a five-storey pagoda);
// a torii gate on the path with a shrine bell hanging from it; Pixel-Play-style cherry trees whose
// blossoms sway in the wind; birds, sparrows, a koi, and a lady in a kimono who walks to the temple.
//
// Hover:  things react before you click — bells sway, a tree rustles, the lady pauses and bows,
//         sparrows hop away if you get too close. The cursor becomes a pointer over anything clickable.
// Click:  pagoda / hall → wind bells chime · torii bell → it swings and jingles · cherry tree → it shakes
//         and sheds a shower of petals · lady → she scatters seed, sparrows come down to peck · bird → it
//         and its neighbours fly off · lake → ripples, and sometimes a koi leaps.
//
// Usage: const scene = mountFujiScene(canvas); … scene.destroy();
// Renders at W × H pixels; scale it up with `image-rendering: pixelated`. Soft edges come from a CSS mask.

import { chime, chirp, suzu, rustle, splash } from './scene-audio.js';

export const W = 440;
export const H = 170;

// ---------- palette ----------
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const C = Object.fromEntries(Object.entries({
  sky0: '#b4d0e4', sky1: '#c9dfeb', sky2: '#e0ebef', sky3: '#f3ebe3',
  cloud: '#fbfcfd', cloud2: '#e7eef4', ray: '#fff7e8',
  fujiL: '#9aadd0', fuji: '#8296bf', fujiM: '#7084ae', fujiS: '#5f719a', fujiD: '#4e5f86', fujiHaze: '#b2bfd5',
  forestFar: '#6d8a8c', forestFarD: '#5a777c',
  snow: '#fafbfd', snowS: '#e1e7f1', snowD: '#c0cbdf', rock: '#6d7b9c',
  hill0: '#a4b6ba', hill1: '#8aa29e', hill2: '#729287',
  forest: '#5a8661', forestL: '#78a46d', forestD: '#41684d', forestDD: '#30523d',
  lake: '#a3c3d6', lakeL: '#dceaf1', lakeD: '#82a6bf',
  grass: '#8db36e', grassL: '#a9c780', grassD: '#6f9a58', grassDD: '#5b8549',
  path: '#dccaa8', pathL: '#ebdbbd', pathD: '#c4ab86',
  red: '#cc4436', redD: '#9c2f2a', redL: '#e3654f', roof: '#414d58', roofL: '#5f6f7a', roofD: '#2a3239', tile: '#53626d',
  wall: '#f0e5d2', wallD: '#d9cbb3', lattice: '#6b4a3a', bronze: '#7d8c74', bronzeD: '#56634f', gold: '#e6b450', goldD: '#a77a26', goldL: '#f6dc8e',
  bark: '#4a302a', barkD: '#2f1e1b', barkL: '#6a4a40',
  bl0: '#fff6f8', bl1: '#fbe3ea', bl2: '#f5cbd8', bl3: '#eab0c3', bl4: '#d891a8',
  ink: '#2a2324', stone: '#a49c92', stoneL: '#bdb6ac', stoneD: '#7f776e',
  kimono: '#3f5b8c', kimonoL: '#8fa6d6', obi: '#cc4436', hair: '#1f1717', hairL: '#3a2c2a', skin: '#f2c8a7', skinS: '#e2aa8a', kanzashi: '#f4a6bb', tabi: '#fbf6ee', zori: '#5b3e37',
  bird: '#3c3331', sparrow: '#8b6a4f', sparrowD: '#5b4535', sparrowL: '#d4b896', seed: '#d4a94e',
  koi: '#e8743c', koiL: '#fbe9dc', rope: '#f3efe6', ropeR: '#cc4436',
}).map(([k, v]) => [k, hex(v)]));

// ---------- helpers ----------
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const dither = (x, y, t) => (BAYER[y & 3][x & 3] + 0.5) / 16 < t;
const hash = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

class Buf {
  constructor() { this.d = new Uint8ClampedArray(W * H * 4); }
  px(x, y, c, a = 255) {
    x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = (y * W + x) * 4;
    if (a >= 255) { this.d[i] = c[0]; this.d[i + 1] = c[1]; this.d[i + 2] = c[2]; this.d[i + 3] = 255; return; }
    const k = a / 255, ia = this.d[i + 3] / 255, oa = k + ia * (1 - k);
    for (let j = 0; j < 3; j++) this.d[i + j] = (c[j] * k + this.d[i + j] * ia * (1 - k)) / (oa || 1);
    this.d[i + 3] = oa * 255;
  }
  rect(x, y, w, h, c) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, c); }
  hline(x0, x1, y, c) { for (let x = Math.round(x0); x <= Math.round(x1); x++) this.px(x, y, c); }
  line(x0, y0, x1, y1, c, w = 1) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let i = 0; i < w; i++) this.px(x - (w >> 1) + i, y, c); }
  }
  sprite(rows, x, y, pal, flip = false, a = 255) {
    rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.' && pal[ch]) this.px(flip ? x + r.length - 1 - i : x + i, y + j, pal[ch], a); }));
  }
}

// ---------- layout ----------
const FUJI = { cx: 176, peak: 24, base: 116 };
const GROUND_Y = 131;
const LAKE_TOP = 118;
const lakeRight = (y) => 268 - (y - LAKE_TOP) * 3 + Math.sin(y) * 2;
const HALL = { cx: 336, base: 129, w: 50 };
const PAGODA = { cx: 400, base: 120 };
const TORII = { cx: 292, base: 142, w: 34, h: 32 };
// the path: from the bottom of the frame, through the torii, to the hall steps
const PATH = [[150, H + 2], [TORII.cx, TORII.base], [HALL.cx - 2, HALL.base + 4]];
function pathAt(t) { // t: 0 (bottom) … 1 (hall); returns [x, y]
  const seg = t < 0.82 ? 0 : 1, k = seg === 0 ? t / 0.82 : (t - 0.82) / 0.18;
  const [a, b] = [PATH[seg], PATH[seg + 1]];
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
}
const pathXAtY = (y) => (y >= TORII.base ? TORII.cx - ((y - TORII.base) / (H + 2 - TORII.base)) * (TORII.cx - 150) : TORII.cx + ((TORII.base - y) / (TORII.base - HALL.base - 4)) * (HALL.cx - 2 - TORII.cx));

// ---------- static painting ----------
function paintSky(b) {
  const stops = [C.sky0, C.sky1, C.sky2, C.sky3], bands = 10, bandH = 120 / bands;
  const mix = (t) => { const k = t * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(k)), f = k - i; return stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * f)); };
  for (let y = 0; y < 120; y++) {
    const band = Math.floor(y / bandH), inBand = y - band * bandH, c0 = mix(band / (bands - 1)), c1 = mix(Math.min(1, (band + 1) / (bands - 1)));
    for (let x = 0; x < W; x++) b.px(x, y, inBand > bandH - 3 && dither(x, y, 0.5) ? c1 : c0);
  }
}

const fujiHalf = (y) => (y < FUJI.peak ? -1 : 5 + 205 * Math.pow((y - FUJI.peak) / (FUJI.base - FUJI.peak), 1.5));
function paintFuji(b, r) {
  for (let y = FUJI.peak; y <= FUJI.base + 4; y++) {
    const hw = fujiHalf(y);
    for (let x = Math.floor(FUJI.cx - hw); x <= Math.ceil(FUJI.cx + hw); x++) {
      const dx = x - FUJI.cx, side = dx / hw, dy = y - FUJI.peak;
      if (y === FUJI.peak && (Math.abs(dx) > 4 || dx === 0)) continue; // crater notch
      const ang = Math.atan2(dx, dy + 6), ridge = Math.sin(ang * 36 + Math.sin(ang * 9) * 1.6);
      // lit from the left: four tones with dithered borders
      let c = side < -0.35 ? C.fujiL : side < 0.05 ? (dither(x, y, (side + 0.35) / 0.4) ? C.fuji : C.fujiL) : side < 0.45 ? (dither(x, y, (side - 0.05) / 0.4) ? C.fujiM : C.fuji) : (dither(x, y, (side - 0.45) / 0.3) ? C.fujiS : C.fujiM);
      if (ridge > 0.8 && dy > 10 && dither(x, y, 0.8)) c = side > 0 ? C.fujiD : C.fujiS;      // gullies
      else if (ridge < -0.9 && dy > 10 && side < 0.2 && dither(x, y, 0.4)) c = C.fujiL;       // sunlit ridge crests
      if (hash(x, y, 3) < 0.035 && dy > 14) c = side > 0.2 ? C.fujiD : C.fujiS;              // rocky speckle
      // snow cap: bright on the left, blue in shadow, with fingers down the gullies and rocks poking through
      const finger = ridge > 0.3 ? (ridge - 0.3) * 30 * (0.55 + 0.45 * Math.abs(Math.sin(ang * 4.3))) : 0;
      const snowLine = FUJI.peak + 25 + Math.sin(x * 0.21) * 1.6 + Math.sin(x * 0.57) * 1.1 + finger;
      if (y < snowLine) {
        c = side > 0.5 ? C.snowD : side > 0.15 ? (dither(x, y, (side - 0.15) / 0.35) ? C.snowD : C.snowS) : side > -0.2 ? (dither(x, y, 0.35) ? C.snowS : C.snow) : C.snow;
        if (hash(x, y, 9) < 0.02 && dy > 8) c = C.rock;
      } else if (y < snowLine + 1.5 && dither(x, y, 0.5)) c = C.snowS;
      // a belt of forest on the lower slopes, then haze
      const belt = FUJI.base - 16 + Math.sin(x * 0.3) * 1.5;
      if (y > belt) c = (x + y * 2) % 7 === 0 ? C.forestFarD : C.forestFar;
      if (y === Math.round(belt) && hash(x, 0, 5) < 0.5) c = C.forestFarD;
      const haze = Math.max(0, (y - (FUJI.base - 30)) / 34);
      if (dither(x, y, haze * 0.8)) c = C.fujiHaze;
      b.px(x, y, c);
    }
  }
  // cloud bank on the shoulders
  for (let i = 0; i < 30; i++) {
    const x = 30 + r() * 300, y = 80 + r() * 14, rx = 6 + r() * 13, ry = 2 + r() * 3;
    for (let yy = -ry; yy <= ry; yy++) for (let xx = -rx; xx <= rx; xx++) {
      const d = (xx * xx) / (rx * rx) + (yy * yy) / (ry * ry);
      if (d < 1 && dither(Math.round(x + xx), Math.round(y + yy), 1 - d * 0.7)) b.px(x + xx, y + yy, yy < 0 ? C.cloud : C.cloud2, 215);
    }
  }
}

function paintHills(b) {
  [{ base: 104, amp: 7, f: 0.033, ph: 1, c: C.hill0 }, { base: 110, amp: 6, f: 0.048, ph: 3, c: C.hill1 }, { base: 116, amp: 5, f: 0.068, ph: 5, c: C.hill2 }].forEach((h, k) => {
    for (let x = 0; x < W; x++) {
      const bump = (x * 37 + k * 11) % 9 < 3 ? 1 : 0;
      const top = Math.round(h.base - h.amp * (0.6 + 0.4 * Math.sin(x * h.f + h.ph)) - Math.sin(x * h.f * 2.7) * 2) - bump;
      for (let y = top; y < GROUND_Y; y++) b.px(x, y, y === top && k < 2 ? C.hill0 : h.c);
    }
  });
}

function paintLake(b) {
  for (let y = LAKE_TOP; y < GROUND_Y; y++) for (let x = 0; x < lakeRight(y); x++) {
    let c = y < LAKE_TOP + 2 && dither(x, y, 0.5) ? C.lakeD : C.lake;
    if ((x * 7 + y * 13) % 31 === 0) c = C.lakeL;
    b.px(x, y, c);
  }
  for (let y = LAKE_TOP + 1; y < GROUND_Y - 1; y++) { // Fuji's snow, reflected and broken by ripples
    const hw = Math.max(0, 24 - (y - LAKE_TOP) * 2.6);
    for (let x = FUJI.cx - hw; x < FUJI.cx + hw; x++) if (dither(x, y, 0.38) && (y % 2 === 0 || hash(x, y, 1) < 0.5)) b.px(x, y, C.lakeL);
  }
  // reeds along the shore
  for (let x = 4; x < 250; x += 3 + ((x * 7) % 5)) { const y = GROUND_Y - 1; b.px(x, y, C.grassDD); b.px(x, y - 1, C.grassD); if (x % 2) b.px(x + 1, y - 2, C.grassD); }
}

function roundTree(b, x, y, h, r, bloom = false) {
  const cols = bloom ? [C.bl4, C.bl3, C.bl2, C.bl1] : [C.forestDD, C.forestD, C.forest, C.forestL];
  const rx = h * 0.55, ry = h * 0.5, lump = (a) => 1 + Math.sin(a * 5 + x) * 0.12 + Math.sin(a * 9 + y) * 0.06;
  for (let yy = -ry - 1; yy <= ry + 1; yy++) for (let xx = -rx - 1; xx <= rx + 1; xx++) {
    const d = Math.sqrt((xx * xx) / (rx * rx) + (yy * yy) / (ry * ry)) / lump(Math.atan2(yy, xx));
    if (d > 1) continue;
    const light = -(xx / rx) * 0.5 - (yy / ry) * 0.6;
    let k = light > 0.45 ? 3 : light > 0.05 ? 2 : light > -0.4 ? 1 : 0;
    if (d > 0.86 && yy > 0) k = 0; if (k >= 2 && r() < 0.06) k = 3;
    b.px(x + xx, y + yy, cols[k]);
  }
}
function pine(b, x, y, h) {
  for (let j = 0; j < h; j++) { const w = Math.round((j / h) * h * 0.32 + (j % 3 === 0 ? 1 : 0)); for (let i = -w; i <= w; i++) b.px(x + i, y - h + j, i < 0 ? C.forestD : C.forestDD); }
}

function paintTempleHill(b, r) {
  for (let x = 250; x < W; x++) {
    const top = Math.round(118 - Math.min(26, (x - 250) * 0.36) + Math.sin(x * 0.2) * 1.2);
    for (let y = top; y < GROUND_Y + 2; y++) b.px(x, y, dither(x, y, 0.3) ? C.forestD : C.forest);
  }
  for (let i = 0; i < 110; i++) {
    const x = 252 + r() * 190, top = 118 - Math.min(26, (x - 250) * 0.36);
    if (Math.abs(x - PAGODA.cx) < 18 || Math.abs(x - HALL.cx) < 30) continue; // keep the buildings clear
    if (r() < 0.18) pine(b, x, top + 10 + r() * 8, 9 + r() * 6); else roundTree(b, x, top + r() * 14, 5 + r() * 5, r, r() < 0.3);
  }
}

function paintGround(b, r) {
  for (let y = GROUND_Y; y < H; y++) for (let x = 0; x < W; x++) {
    const n = Math.sin(x * 0.31 + y * 0.7) + Math.sin(x * 0.07 - y * 0.3);
    b.px(x, y, n > 1.1 ? C.grassL : n < -1.2 ? C.grassD : C.grass);
  }
  // path with soft edges and a few pebbles
  for (let y = HALL.base + 2; y < H; y++) {
    const cx = pathXAtY(y), hw = y < TORII.base ? 5 : 5 + ((y - TORII.base) / (H - TORII.base)) * 24;
    for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) {
      const edge = Math.abs(x - cx) > hw - 1.5;
      b.px(x, y, edge && dither(x, y, 0.5) ? C.grassD : hash(x, y, 4) < 0.05 ? C.pathD : dither(x, y, 0.15) ? C.pathL : C.path);
    }
  }
  // grass tufts (denser at the front), fallen petals and tiny flowers
  for (let i = 0; i < 260; i++) {
    const x = r() * W | 0, y = GROUND_Y + 6 + ((1 - Math.pow(r(), 2)) * (H - GROUND_Y - 6) | 0);
    if (Math.abs(x - pathXAtY(y)) < 8 + (y - GROUND_Y) * 0.8) continue;
    const h = 2 + (r() * 3 | 0) + ((y - GROUND_Y) > 25 ? 1 : 0);
    for (let k = 0; k < h; k++) { b.px(x, y - k, k === h - 1 ? C.grassL : C.grassD); if (k > 0 && r() < 0.5) b.px(x + (r() < 0.5 ? -1 : 1), y - k + 1, C.grassD); }
  }
  for (let i = 0; i < 30; i++) {
    const x = r() * W | 0, y = GROUND_Y + 4 + (r() * (H - GROUND_Y - 6) | 0);
    if (Math.abs(x - pathXAtY(y)) < 10 + (y - GROUND_Y) * 0.7) continue;
    b.px(x, y, C.wall); b.px(x, y - 1, C.gold); b.px(x - 1, y, C.wall); b.px(x + 1, y, C.wall);
  }
}

function lantern(b, x, base) {
  b.rect(x - 1, base - 3, 5, 3, C.stoneD); b.rect(x, base - 9, 3, 6, C.stone); b.px(x + 2, base - 6, C.stoneD);
  b.rect(x - 1, base - 11, 5, 2, C.stoneD); b.rect(x - 1, base - 15, 5, 4, C.stone); b.rect(x, base - 14, 3, 2, C.gold);
  b.rect(x - 3, base - 17, 9, 2, C.stoneD); b.px(x - 3, base - 18, C.stone); b.px(x + 5, base - 18, C.stone); b.rect(x, base - 19, 3, 2, C.stoneL);
}

// a swept roof: `rows` tall, from `w` wide at the eave to `top` wide at the ridge, tiles every 2 px
function roof(b, cx, y, w, top, rows, sweep = 3) {
  for (let k = 0; k < rows; k++) {
    const t = k / (rows - 1), half = (w + (top - w) * t) / 2;
    for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) {
      let c = k === 0 ? C.roofD : k === rows - 1 ? C.roofL : C.roof;
      if (k > 0 && k < rows - 1 && (x - cx) % 2 === 0) c = C.tile;
      b.px(x, y - k, c);
    }
  }
  for (let s = 1; s <= sweep; s++) { b.px(cx - w / 2 - s, y - s, s === sweep ? C.roofL : C.roofD); b.px(cx + w / 2 + s, y - s, s === sweep ? C.roofL : C.roofD); }
  b.hline(cx - w / 2 + 2, cx + w / 2 - 2, y + 1, C.redD); // rafter line
  for (let x = Math.round(cx - w / 2) + 3; x < cx + w / 2 - 2; x += 3) b.px(x, y + 2, C.redD);
}

const BELLS = []; // eave bells (pagoda + hall): [x, y]
function paintPagoda(b) {
  const { cx, base } = PAGODA;
  let y = base;
  b.rect(cx - 17, y - 3, 34, 3, C.stone); b.hline(cx - 17, cx + 16, y - 1, C.stoneD); y -= 3;
  for (let i = 0; i < 5; i++) {
    const bw = Math.round(24 - i * 3.2), bh = i === 0 ? 11 : 8, rw = bw + 18 - i;
    const x0 = Math.round(cx - bw / 2);
    b.rect(x0, y - bh, bw, bh, C.red);
    b.rect(x0 + 2, y - bh + 2, bw - 4, bh - 3, C.wall);
    for (let x = x0 + 3; x < x0 + bw - 3; x += 2) b.px(x, y - bh + 3, C.wallD);
    b.rect(cx - 2, y - bh + 2, 4, bh - 3, i === 0 ? C.ink : C.lattice); if (i > 0) b.px(cx, y - bh + 3, C.gold);
    b.rect(x0 + bw - 2, y - bh, 2, bh, C.redD);
    if (i > 0) { b.hline(x0 - 2, x0 + bw + 1, y - 1, C.redL); for (let x = x0 - 2; x <= x0 + bw + 1; x += 3) b.px(x, y, C.redD); } // balcony
    y -= bh;
    roof(b, cx, y, rw, Math.max(6, bw - 6), 5, 3);
    BELLS.push([Math.round(cx - rw / 2 - 3), y - 2], [Math.round(cx + rw / 2 + 3), y - 2]);
    y -= 5;
  }
  b.rect(cx - 1, y - 20, 3, 20, C.bronze); b.rect(cx + 1, y - 20, 1, 20, C.bronzeD);
  for (let k = 0; k < 8; k++) b.hline(cx - 2, cx + 2, y - 3 - k * 2, C.bronzeD);
  b.px(cx, y - 22, C.bronze); b.px(cx, y - 23, C.gold); b.px(cx, y - 24, C.goldL);
  PAGODA.top = y - 24;
  PAGODA.box = { x0: cx - 22, x1: cx + 22, y0: PAGODA.top, y1: base + 2 };
}

function paintHall(b) {
  const { cx, base, w } = HALL, x0 = cx - w / 2;
  // stone platform and steps
  b.rect(x0 - 4, base - 3, w + 8, 3, C.stone); b.hline(x0 - 4, x0 + w + 3, base - 1, C.stoneD);
  for (let s = 0; s < 3; s++) b.rect(cx - 7 + s, base + s, 14 - s * 2, 1, s % 2 ? C.stone : C.stoneL);
  // body: red pillars, white walls, lattice doors, a dark entrance
  const y0 = base - 15;
  b.rect(x0, y0, w, 12, C.wall);
  for (let x = x0; x <= x0 + w; x += 8) b.rect(x, y0, 2, 12, C.red);
  for (let x = x0 + 3; x < x0 + w - 2; x += 8) for (let yy = y0 + 2; yy < y0 + 11; yy += 2) for (let xx = x; xx < x + 4; xx += 2) b.px(xx, yy, C.lattice);
  b.rect(cx - 5, y0 + 2, 10, 10, C.ink); b.rect(cx - 5, y0 + 2, 10, 1, C.redD);
  b.hline(x0, x0 + w, y0, C.redD); b.hline(x0 - 1, x0 + w + 1, base - 4, C.redL);
  // big swept hip-and-gable roof
  roof(b, cx, y0 - 1, w + 22, w - 8, 9, 4);
  const gy = y0 - 10;
  b.rect(cx - 7, gy - 3, 14, 3, C.roof); b.rect(cx - 5, gy - 2, 10, 1, C.wallD); // gable
  b.hline(cx - (w - 8) / 2, cx + (w - 8) / 2, gy, C.roofD);                       // ridge
  b.px(cx - (w - 8) / 2 - 1, gy - 1, C.gold); b.px(cx + (w - 8) / 2 + 1, gy - 1, C.gold); // ridge ornaments
  b.rect(cx - 2, y0 - 6, 5, 3, C.ink); b.px(cx, y0 - 5, C.gold); // name plaque
  BELLS.push([Math.round(cx - (w + 22) / 2 - 4), y0 - 4], [Math.round(cx + (w + 22) / 2 + 4), y0 - 4]);
  HALL.box = { x0: x0 - 14, x1: x0 + w + 14, y0: gy - 4, y1: base + 3 };
}

function paintTorii(b) {
  const { cx, base, w, h } = TORII, x = cx - w / 2, top = base - h;
  for (const px of [x + 5, x + w - 8]) { b.rect(px, top + 6, 3, h - 6, C.red); b.rect(px + 2, top + 6, 1, h - 6, C.redD); b.rect(px - 1, base - 3, 5, 3, C.ink); }
  b.rect(x, top + 1, w, 3, C.ink); b.px(x - 1, top, C.ink); b.px(x - 2, top - 1, C.ink); b.px(x + w, top, C.ink); b.px(x + w + 1, top - 1, C.ink);
  b.rect(x + 1, top + 4, w - 2, 2, C.red); b.rect(x + 1, top + 5, w - 2, 1, C.redD);
  b.rect(x + 3, top + 11, w - 6, 2, C.red); b.rect(x + 3, top + 12, w - 6, 1, C.redD);
  b.rect(cx - 2, top + 6, 4, 5, C.ink); b.px(cx - 1, top + 8, C.gold);
  TORII.bellAnchor = [cx, top + 13];
}

// ---------- Pixel-Play-style cherry trees ----------
// A branching skeleton (drawn into the backdrop) plus hundreds of tiny blossom clusters drawn every frame,
// so the canopy can sway, rustle and shed petals.
function makeCherry(b, r, x, base, size, lean) {
  const tips = [], segs = [];
  function grow(x0, y0, ang, len, w, depth) {
    const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
    segs.push([x0, y0, x1, y1, w]);
    if (depth === 0 || len < 2.5) { tips.push([x1, y1, depth]); return; }
    const n = depth > 3 ? 2 : r() < 0.55 ? 2 : 3;
    for (let i = 0; i < n; i++) grow(x1, y1, ang + (i - (n - 1) / 2) * (0.62 + r() * 0.3) + (r() - 0.5) * 0.35, len * (0.7 + r() * 0.14), Math.max(1, Math.round(w * 0.65)), depth - 1);
    if (depth <= 3) tips.push([x1, y1, depth]);
  }
  grow(x, base, -Math.PI / 2 + lean, size * 0.34, Math.max(2, Math.round(size / 11)), 6);
  // trunk and branches: dark, with a lighter edge on the lit side
  segs.forEach(([x0, y0, x1, y1, w]) => { b.line(x0, y0, x1, y1, C.bark, w); if (w > 1) b.line(x0 - 1, y0, x1 - 1, y1, C.barkL, 1); });
  segs.slice(0, 3).forEach(([x0, y0, x1, y1, w]) => b.line(x0 + Math.floor(w / 2), y0, x1 + Math.floor(w / 2), y1, C.barkD, 1));
  // fallen petals pooled under the tree
  for (let i = 0; i < size * 6; i++) { const px = x + (r() - 0.5) * size * 1.6, py = base - 1 + r() * 4; if (py < H) b.px(px, py, r() < 0.5 ? C.bl2 : C.bl1); }
  // blossom clusters around the tips and along the upper branches
  const clusters = [], minY = Math.min(...tips.map((t) => t[1])), maxY = base - size * 0.25;
  tips.forEach(([tx, ty, depth]) => {
    const n = depth === 0 ? 4 : 2;
    for (let i = 0; i < n; i++) {
      const cx = tx + (r() - 0.5) * 7, cy = ty + (r() - 0.6) * 5;
      clusters.push({ x: cx, y: cy, r: 1.6 + r() * 2.2, seed: (r() * 1e6) | 0, h: Math.max(0, Math.min(1, (maxY - cy) / (maxY - minY + 1))), gone: 0 });
    }
  });
  clusters.sort((a, c) => c.y - a.y); // lower (shadowed) clusters first
  return { x, base, size, clusters, shake: 0, box: { x0: x - size * 0.9, x1: x + size * 0.9, y0: minY - 4, y1: base } };
}

function drawCherry(out, tree, t, wind) {
  tree.clusters.forEach((c) => {
    if (c.gone > 0.98) return;
    const sway = Math.sin(t * 0.9 + c.y * 0.08 + c.x * 0.02) * (0.6 + wind) * (0.3 + c.h) + (tree.shake ? (hash(c.seed, Math.floor(t * 10), 7) - 0.5) * 3 * tree.shake : 0);
    const ox = Math.round(c.x + sway), oy = Math.round(c.y), rr = c.r;
    for (let yy = -3; yy <= 3; yy++) for (let xx = -3; xx <= 3; xx++) {
      const d = Math.sqrt(xx * xx + yy * yy) / rr;
      if (d > 1.15 || hash(c.seed + xx, yy, 2) < d * 0.55 + c.gone) continue; // airy, ragged edges
      // light from the top-left; higher clusters are paler
      const l = -(xx + yy) / (rr * 2) + c.h * 0.6 + (hash(c.seed, xx * 7 + yy, 1) - 0.5) * 0.5;
      const col = l > 0.75 ? C.bl0 : l > 0.35 ? C.bl1 : l > 0 ? C.bl2 : l > -0.35 ? C.bl3 : C.bl4;
      out.px(ox + xx, oy + yy, col);
    }
  });
}

// ---------- sprites ----------
const LADY_BODY = [
  '...hhh.....', '..hhHhh.k..', '..hhhhhhk..', '..hhhsss...', '..hhsSss...', '...hsss....', '....ss.....',
  '..KKKKKK...', '.KKKKKKKK..', '.KKdKKKKKs.', '.KKoooooK..', '.KKoGoooK..', '..KKKKKK...', '..KKKdKK...',
  '..KKKKKK...', '..KKKKKdK..', '..KKKKKKK..', '..KKKKKKK..',
];
const LADY_FEET = [
  ['...KKKKK...', '...w..w....', '...z..z....'],
  ['..KKK.KK...', '..w....w...', '..z....z...'],
  ['...KKKKK...', '....ww.....', '....zz.....'],
  ['...KK.KKK..', '...w....w..', '...z....z..'],
];
const LADY_THROW = [['.KKKKKKKs..', '.KKdKKKK...'], ['.KKKKKKKKss', '.KKdKKKK...']];
const LADY_PAL = { h: C.hair, H: C.hairL, k: C.kanzashi, s: C.skin, S: C.skinS, K: C.kimono, d: C.kimonoL, o: C.obi, G: C.gold, w: C.tabi, z: C.zori };

const BIRD = [['b...b', '.b.b.', '..b..'], ['.....', 'bbbbb', '..b..'], ['.....', '.bbb.', 'b.b.b']];
const SPARROW_STAND = ['...ss.', '..sDse', 'sssss.', '.sLL..', '..l.l.'];
const SPARROW_PECK = ['......', 'sss...', '.ssss.', '..sDse', '..l.l.'];
const SPARROW_LOOK = ['..ss..', '.sDse.', 'sssss.', '.sLL..', '..l.l.'];
const SPARROW_PAL = { s: C.sparrow, D: C.ink, e: C.goldD, L: C.sparrowL, l: C.sparrowD, b: C.sparrow };
const KOI = [['.ooo.', 'ooWoo'], ['..oo.', '.oWoo', 'oo...']];

// ---------- the scene ----------
export function mountFujiScene(canvas, { seed = 7, fps = 30 } = {}) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const r = rng(seed);

  const bg = new Buf();
  BELLS.length = 0;
  paintSky(bg); paintFuji(bg, r); paintHills(bg); paintLake(bg); paintTempleHill(bg, r); paintGround(bg, r);
  paintPagoda(bg); paintHall(bg); paintTorii(bg);
  lantern(bg, TORII.cx - 26, TORII.base + 8); lantern(bg, TORII.cx + 24, TORII.base + 8);
  const trees = [makeCherry(bg, r, 34, H + 2, 68, 0.1), makeCherry(bg, r, 414, H + 2, 60, -0.12), makeCherry(bg, r, 238, GROUND_Y + 4, 30, 0.05)];

  // ---- state ----
  const rand = Math.random;
  let time = 0, frame = 0, wind = 0.4, gust = 0, raf = 0, last = 0;
  const petals = [];
  const clouds = [{ x: 40, y: 16, w: 36 }, { x: 260, y: 9, w: 26 }, { x: 350, y: 30, w: 20 }];
  const shadows = [{ x: 60, y: 152, w: 70 }, { x: 290, y: 160, w: 90 }];
  const flock = [], sparrows = [], seeds = [], notes = [], ripples = [], splashes = [];
  let koi = null;
  const bells = BELLS.map(([x, y]) => ({ x, y, a: 0, v: 0 }));      // pendulum angle + velocity
  const toriiBell = { a: 0, v: 0 };
  let hover = null, pointer = null;

  function spawnFlock() {
    const n = 3 + ((rand() * 3) | 0), y = 18 + rand() * 30, dir = rand() < 0.5 ? 1 : -1, x = dir > 0 ? -12 : W + 12;
    for (let i = 0; i < n; i++) flock.push({ x: x - dir * Math.abs(i - n / 2) * 7, y: y + Math.abs(i - n / 2) * 3, vx: dir * (0.5 + rand() * 0.1), vy: 0, ph: rand() * 6, flap: 0, flee: false });
  }
  spawnFlock();

  const lady = { t: 0.02, state: 'walk', clock: 0, alpha: 1, bow: 0, x: 0, y: 0 };
  const FEED_T = 0.36, TORII_T = 0.8;
  const placeLady = () => { const [x, y] = pathAt(lady.t); lady.x = x - 5; lady.y = y - 20; };
  placeLady();
  let nextFeed = 300, rangTorii = false;

  // ---- actions ----
  const ringBells = (strength = 1) => { bells.forEach((bl, i) => { bl.v += (0.25 + (i % 3) * 0.05) * strength * (i % 2 ? 1 : -1); }); };
  function templeChime(x, y) { ringBells(1); chime(); for (let i = 0; i < 8; i++) notes.push({ x: x + (rand() - 0.5) * 30, y: y + (rand() - 0.5) * 20, life: 40 + rand() * 20 }); }
  function ringTorii() { toriiBell.v += 0.5 * (rand() < 0.5 ? 1 : -1); suzu(); const [ax, ay] = TORII.bellAnchor; for (let i = 0; i < 5; i++) notes.push({ x: ax + (rand() - 0.5) * 12, y: ay + 8, life: 30 + rand() * 15 }); }
  function newPetal(x, y, vx = 0.3 + rand() * 0.3, vy = 0.15 + rand() * 0.2) { return { x, y, vx, vy, ph: rand() * 6, c: rand() < 0.5 ? C.bl1 : C.bl2, life: 600 }; }
  function shakeTree(tree) {
    tree.shake = 1; rustle();
    for (let i = 0; i < 26; i++) { const c = tree.clusters[(rand() * tree.clusters.length) | 0]; petals.push(newPetal(c.x, c.y, (rand() - 0.3) * 1.6, -rand() * 0.8)); }
    for (let i = 0; i < 6; i++) tree.clusters[(rand() * tree.clusters.length) | 0].gone = 0.7; // a few clusters thin out, then grow back
  }
  function feed() {
    if (!['walk', 'idle'].includes(lady.state) || lady.alpha < 0.5) return;
    lady.state = 'throw'; lady.clock = 0;
    const hx = lady.x + 10, hy = lady.y + 9, groundY = lady.y + 20;
    for (let i = 0; i < 10; i++) seeds.push({ x: hx, y: hy, vx: 0.5 + rand() * 1.3, vy: -0.9 - rand() * 0.7, gy: groundY + rand() * 2, landed: false });
    const n = 2 + ((rand() * 2) | 0);
    for (let i = 0; i < n; i++) {
      const side = rand() < 0.5 ? -1 : 1, tx = lady.x + 16 + i * 7 + rand() * 4;
      sparrows.push({ x: tx + side * (70 + rand() * 40), y: lady.y - 50 - rand() * 20, sx: 0, sy: 0, tx, ty: groundY - 4, state: 'arrive', clock: -i * 8, k: 0, flip: side > 0, hop: 0 });
    }
    setTimeout(() => chirp(0.3), 500);
  }
  function scareSparrows(fromX) {
    if (!sparrows.some((s) => s.state !== 'leave')) return;
    chirp(); sparrows.forEach((s) => { if (s.state === 'leave') return; s.state = 'leave'; s.vx = (s.x < fromX ? -1 : 1) * (1.4 + rand()); s.vy = -1.6 - rand(); s.clock = 0; });
  }
  function scareFlock(x, y) {
    chirp((x / W) * 2 - 1);
    flock.forEach((bd) => { if (Math.hypot(bd.x - x, bd.y - y) < 40) { bd.flee = true; bd.vy = -0.6; bd.vx = (bd.x < x ? -1 : 1) * 1.6; } });
  }
  function lakeClick(x, y) {
    ripples.push({ x, y, r: 0 });
    if (!koi && rand() < 0.55) koi = { x0: x - 8, y0: y, x1: x + 8, t: 0 };
  }

  // ---- hit testing ----
  const toScene = (e) => { const rc = canvas.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width * W, (e.clientY - rc.top) / rc.height * H]; };
  const inBox = (b, x, y) => b && x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1;
  const ladyBox = () => ({ x0: lady.x - 2, x1: lady.x + 12, y0: lady.y - 1, y1: lady.y + 21 });
  const inLake = (x, y) => y >= LAKE_TOP && y < GROUND_Y && x < lakeRight(y);
  function targetAt(x, y) {
    if (sparrows.some((s) => s.state !== 'leave' && Math.abs(s.x + 3 - x) < 6 && Math.abs(s.y + 2 - y) < 5)) return { kind: 'sparrow' };
    if (flock.some((b) => Math.abs(b.x + 2 - x) < 7 && Math.abs(b.y + 1 - y) < 6)) return { kind: 'bird' };
    if (lady.alpha > 0.5 && inBox(ladyBox(), x, y)) return { kind: 'lady' };
    const [ax, ay] = TORII.bellAnchor; if (Math.abs(x - ax) < 5 && y > ay - 2 && y < ay + 13) return { kind: 'toriiBell' };
    if (inBox(PAGODA.box, x, y)) return { kind: 'temple', x: PAGODA.cx, y: PAGODA.top + 40 };
    if (inBox(HALL.box, x, y)) return { kind: 'temple', x: HALL.cx, y: HALL.base - 18 };
    if (inLake(x, y)) return { kind: 'lake' };
    const tree = trees.find((t) => inBox(t.box, x, y)); if (tree) return { kind: 'tree', tree };
    return null;
  }
  function onClick(e) {
    const [x, y] = toScene(e), t = targetAt(x, y);
    if (!t) return;
    ({ sparrow: () => scareSparrows(x), bird: () => scareFlock(x, y), lady: feed, toriiBell: ringTorii, temple: () => templeChime(t.x, t.y), lake: () => lakeClick(x, y), tree: () => shakeTree(t.tree) })[t.kind]();
  }
  function onMove(e) {
    pointer = toScene(e); hover = targetAt(...pointer);
    canvas.style.cursor = hover ? 'pointer' : 'default';
    // sparrows are skittish: bring the pointer too close and they fly off
    if (sparrows.some((s) => s.state === 'peck' && Math.hypot(s.x + 3 - pointer[0], s.y + 2 - pointer[1]) < 9)) scareSparrows(pointer[0]);
  }
  function onLeave() { hover = null; pointer = null; canvas.style.cursor = 'default'; }
  canvas.addEventListener('click', onClick);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);

  // ---- simulation ----
  function step(dt) {
    frame++; time += dt;
    // wind with occasional gusts
    if (rand() < 0.004) gust = 1;
    gust *= 0.985; wind = 0.35 + gust * 0.9 + Math.sin(time * 0.3) * 0.1;
    // petals: steady drift plus extra in gusts
    if (rand() < 0.25 + gust * 0.6) { const tr = trees[(rand() * trees.length) | 0], c = tr.clusters[(rand() * tr.clusters.length) | 0]; petals.push(newPetal(c.x, c.y)); }
    petals.forEach((p) => { p.x += p.vx + wind * 0.5 + Math.sin(time * 2 + p.ph) * 0.25; p.y += p.vy + Math.cos(time * 1.7 + p.ph) * 0.12; p.vy = Math.min(p.vy + 0.004, 0.45); p.vx *= 0.995; p.life--; });
    for (let i = petals.length - 1; i >= 0; i--) if (petals[i].y > H || petals[i].x > W + 3 || petals[i].life <= 0) petals.splice(i, 1);
    trees.forEach((t) => { t.shake *= 0.94; if (t.shake < 0.02) t.shake = 0; t.clusters.forEach((c) => { if (c.gone > 0) c.gone = Math.max(0, c.gone - 0.0015); }); });
    if (hover?.kind === 'tree' && rand() < 0.08) hover.tree.shake = Math.max(hover.tree.shake, 0.25);
    clouds.forEach((c) => { c.x += 0.05; if (c.x > W + 40) c.x = -c.w - 10; });
    shadows.forEach((s) => { s.x += 0.12; if (s.x - s.w > W) s.x = -s.w; });

    // bells: damped pendulums; hovering the temple or the torii bell nudges them
    bells.forEach((bl) => { bl.v += -bl.a * 0.08 + (hover?.kind === 'temple' ? (rand() - 0.5) * 0.02 : 0) + (rand() - 0.5) * 0.004 * wind; bl.v *= 0.95; bl.a += bl.v; });
    toriiBell.v += -toriiBell.a * 0.06 + (hover?.kind === 'toriiBell' ? (rand() - 0.5) * 0.03 : 0) + (rand() - 0.5) * 0.003 * wind; toriiBell.v *= 0.965; toriiBell.a += toriiBell.v;

    // sky birds: flap, glide, flee
    flock.forEach((bd) => {
      bd.ph += bd.flee ? 0.7 : 0.3;
      bd.flap = bd.flee ? Math.floor(bd.ph) % 3 : (Math.sin(bd.ph * 0.25) > 0.3 ? 1 : Math.floor(bd.ph) % 3); // they glide now and then
      if (bd.flee) { bd.vy -= 0.04; bd.vx *= 1.02; }
      bd.x += bd.vx; bd.y += bd.vy + (bd.flee ? 0 : Math.sin(time + bd.x * 0.05) * 0.05);
    });
    for (let i = flock.length - 1; i >= 0; i--) { const b = flock[i]; if (b.x < -20 || b.x > W + 20 || b.y < -15) flock.splice(i, 1); }
    if (!flock.length && rand() < 0.006) spawnFlock();

    // the lady: walk to her spot, feed the birds, walk on through the torii (ringing its bell), into the hall
    lady.clock++;
    lady.bow = hover?.kind === 'lady' && lady.state !== 'throw' ? Math.min(1, lady.bow + 0.15) : Math.max(0, lady.bow - 0.1);
    const paused = lady.bow > 0.5;
    if (lady.state === 'walk' && !paused) {
      lady.t += 0.0007; lady.alpha = Math.min(1, lady.alpha + 0.03);
      if (lady.t >= FEED_T && nextFeed !== 9999) { lady.state = 'idle'; lady.clock = 0; }
      if (lady.t >= TORII_T && !rangTorii) { rangTorii = true; ringTorii(); }
      if (lady.t > 0.93) lady.alpha = Math.max(0, lady.alpha - 0.05);
      if (lady.t >= 1) { lady.t = 0.02; lady.alpha = 0; nextFeed = 300; rangTorii = false; }
    } else if (lady.state === 'throw') {
      if (lady.clock > 24) { lady.state = lady.t < FEED_T ? 'walk' : 'idle'; lady.clock = 0; }
    } else if (lady.state === 'idle') {
      if (lady.clock > nextFeed && nextFeed !== 9999 && !sparrows.length) { feed(); nextFeed = 9999; }
      else if (lady.clock > 420 && !sparrows.length && !paused) { lady.state = 'walk'; nextFeed = 9999; }
    }
    placeLady();

    // seeds arc and bounce once
    seeds.forEach((s) => { if (s.landed) return; s.x += s.vx; s.y += s.vy; s.vy += 0.12; if (s.y >= s.gy) { if (Math.abs(s.vy) > 0.6) { s.vy *= -0.3; s.vx *= 0.5; s.y = s.gy; } else { s.y = s.gy; s.landed = true; } } });
    // sparrows: glide in on an arc, land with a hop, peck / look / hop around, then leave
    sparrows.forEach((s) => {
      s.clock++;
      if (s.state === 'arrive') {
        if (s.clock < 0) return;
        if (!s.k) { s.sx = s.x; s.sy = s.y; }
        s.k = Math.min(1, s.k + 0.018); const e = 1 - Math.pow(1 - s.k, 3);
        s.x = s.sx + (s.tx - s.sx) * e; s.y = s.sy + (s.ty - s.sy) * e - Math.sin(e * Math.PI) * 10;
        s.flip = s.tx < s.sx;
        if (s.k >= 1) { s.state = 'peck'; s.clock = 0; s.hop = 1; }
      } else if (s.state === 'peck') {
        if (s.hop > 0) s.hop = Math.max(0, s.hop - 0.12);
        if (s.clock % 50 === 25 && rand() < 0.5) { s.hop = 1; s.x += rand() < 0.5 ? -2 : 2; if (rand() < 0.5) s.flip = !s.flip; }
        if (s.clock > 360) { s.state = 'leave'; s.vx = (s.flip ? -1 : 1) * 1.3; s.vy = -1.4; s.clock = 0; }
      } else { s.vy -= 0.03; s.x += s.vx; s.y += s.vy; }
    });
    for (let i = sparrows.length - 1; i >= 0; i--) { const s = sparrows[i]; if (s.y < -10 || s.x < -10 || s.x > W + 10) sparrows.splice(i, 1); }
    if (!sparrows.length) for (let i = seeds.length - 1; i >= 0; i--) if (seeds[i].landed && rand() < 0.02) seeds.splice(i, 1);

    notes.forEach((n) => { n.y -= 0.35; n.x += Math.sin(n.y * 0.3) * 0.2; n.life--; }); for (let i = notes.length - 1; i >= 0; i--) if (notes[i].life <= 0) notes.splice(i, 1);
    ripples.forEach((rp) => { rp.r += 0.25; }); for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].r > 15) ripples.splice(i, 1);
    if (koi) { koi.t += 0.035; if (koi.t >= 1) { splashes.push({ x: koi.x1, y: koi.y0, life: 18 }); ripples.push({ x: koi.x1, y: koi.y0, r: 0 }); splash(); koi = null; } }
    splashes.forEach((s) => s.life--); for (let i = splashes.length - 1; i >= 0; i--) if (splashes[i].life <= 0) splashes.splice(i, 1);
  }

  // ---- drawing ----
  const out = new Buf(), img = ctx.createImageData(W, H);
  const RAYS = [{ x: 330, w: 10 }, { x: 368, w: 13 }, { x: 402, w: 8 }, { x: 292, w: 7 }];
  function draw() {
    out.d.set(bg.d);
    // sun rays
    RAYS.forEach((ray, i) => {
      const pulse = 0.55 + 0.45 * Math.sin(time * 0.6 + i * 1.7);
      for (let y = 0; y < 124; y++) { const cx = ray.x - y * 0.62, fade = (1 - y / 124) * pulse; for (let x = Math.round(cx - ray.w / 2); x <= cx + ray.w / 2; x++) { const edge = 1 - Math.abs(x - cx) / (ray.w / 2); if (dither(x, y, edge * fade * 0.45)) out.px(x, y, C.ray, 50); } }
    });
    // drifting clouds
    clouds.forEach((c) => { for (let yy = -4; yy <= 4; yy++) for (let xx = -c.w / 2; xx <= c.w / 2; xx++) { const d = (xx * xx) / ((c.w / 2) ** 2) + (yy * yy) / 16 + (yy > 0 ? 0.2 : 0); if (d < 1 && dither(Math.round(c.x + xx), Math.round(c.y + yy), 1.1 - d)) out.px(c.x + xx, c.y + yy, yy > 1 ? C.cloud2 : C.cloud, 205); } });
    // cloud shadows over the meadow
    shadows.forEach((sh) => { for (let y = GROUND_Y; y < H; y++) for (let x = Math.max(0, Math.round(sh.x - sh.w)); x < Math.min(W, sh.x + sh.w); x++) { const d = ((x - sh.x) / sh.w) ** 2 + ((y - sh.y) / 14) ** 2; if (d < 1 && dither(x, y, (1 - d) * 0.5)) out.px(x, y, C.ink, 24); } });
    // lake: sparkles, ripples, koi
    for (let i = 0; i < 12; i++) { const x = ((i * 53 + frame * 0.35) % 250) | 0, y = LAKE_TOP + 2 + ((i * 7) % 9); if ((frame + i * 9) % 24 < 12 && x < lakeRight(y)) out.px(x, y, C.lakeL); }
    ripples.forEach((rp) => { const a = Math.max(0, 255 - rp.r * 17); for (let th = 0; th < Math.PI * 2; th += 0.15) { const x = rp.x + Math.cos(th) * rp.r, y = rp.y + Math.sin(th) * rp.r * 0.35; if (inLake(x, y)) out.px(x, y, C.lakeL, a); } });
    if (koi) { const x = koi.x0 + (koi.x1 - koi.x0) * koi.t, y = koi.y0 - Math.sin(koi.t * Math.PI) * 7; out.sprite(KOI[koi.t < 0.5 ? 0 : 1], x - 2, y - 1, { o: C.koi, W: C.koiL }); }
    splashes.forEach((s) => { for (let i = 0; i < 5; i++) out.px(s.x + (i - 2) * 1.5, s.y - (18 - s.life) * 0.25 - Math.abs(i - 2), C.lakeL, s.life * 14); });
    // temple bells (pendulums) and the torii bell on its rope
    bells.forEach((bl) => { const ox = Math.round(Math.sin(bl.a) * 2); out.px(bl.x + ox * 0.5, bl.y + 1, C.goldD); out.px(bl.x + ox, bl.y + 2, C.gold); out.px(bl.x + ox, bl.y + 3, C.goldD); });
    {
      const [ax, ay] = TORII.bellAnchor, len = 8, a = toriiBell.a;
      for (let k = 0; k <= len; k++) out.px(ax + Math.sin(a) * k, ay + Math.cos(a) * k, k % 2 ? C.ropeR : C.rope);
      const bx = ax + Math.sin(a) * (len + 1), by = ay + Math.cos(a) * (len + 1);
      out.rect(Math.round(bx) - 1, Math.round(by), 3, 3, C.gold); out.px(bx - 1, by, C.goldL); out.px(bx, by + 2, C.goldD); out.px(bx + 1, by + 2, C.goldD);
      if (hover?.kind === 'toriiBell') out.px(bx + 2, by - 1, C.goldL); // a tiny glint when hovered
    }
    notes.forEach((n) => { const al = Math.min(255, n.life * 9); out.px(n.x, n.y, C.goldL, al); out.px(n.x + 1, n.y - 1, C.gold, al * 0.6); });
    // cherry trees (canopies sway in the wind)
    trees.forEach((t) => drawCherry(out, t, time, wind));
    // seeds, lady, sparrows
    seeds.forEach((s) => out.px(s.x, s.y, C.seed));
    if (lady.alpha > 0) {
      const walking = lady.state === 'walk' && lady.bow < 0.5, a = Math.round(lady.alpha * 255);
      const rows = LADY_BODY.slice();
      if (lady.state === 'throw') { const f = LADY_THROW[lady.clock < 8 ? 0 : 1]; rows[8] = f[0]; rows[9] = f[1]; }
      const wf = walking ? Math.floor(lady.clock / 7) % 4 : 0, feet = LADY_FEET[wf];
      const bob = walking && wf % 2 ? 1 : 0, bow = lady.bow > 0.5 ? 1 : 0;
      [4, 5, 6].forEach((dx) => out.px(lady.x + dx, lady.y + 21, C.grassDD, Math.round(a * 0.45))); // soft shadow
      rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') out.px(lady.x + i, lady.y + j + bob + (j < 7 ? bow : 0), LADY_PAL[ch], a); }));
      feet.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') out.px(lady.x + i, lady.y + rows.length + j, LADY_PAL[ch], a); }));
    }
    sparrows.forEach((s) => {
      if (s.state === 'arrive' && s.clock < 0) return;
      const flying = s.state !== 'peck';
      const fr = flying ? BIRD[Math.floor(s.clock / 3) % 3] : (s.clock % 60 < 30 ? (Math.floor(s.clock / 6) % 2 ? SPARROW_PECK : SPARROW_STAND) : SPARROW_LOOK);
      out.sprite(fr, s.x, s.y - (s.hop ? Math.round(Math.sin(s.hop * Math.PI) * 2) : 0), SPARROW_PAL, s.flip);
    });
    // sky birds
    flock.forEach((bd) => out.sprite(BIRD[bd.flap], bd.x, bd.y, { b: C.bird }));
    // petals
    petals.forEach((p) => { out.px(p.x, p.y, p.c); if ((frame + p.ph * 10) % 16 < 8) out.px(p.x + 1, p.y, C.bl3); });

    img.data.set(out.d);
    ctx.putImageData(img, 0, 0);
  }

  function loop(ts) {
    raf = requestAnimationFrame(loop);
    if (ts - last < 1000 / fps) return;
    const dt = Math.min(0.1, (ts - last) / 1000 || 1 / fps); last = ts;
    step(dt); draw();
  }
  draw();
  raf = requestAnimationFrame(loop);

  return {
    destroy() { cancelAnimationFrame(raf); canvas.removeEventListener('click', onClick); canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave); },
  };
}
