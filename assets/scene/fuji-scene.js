// Fuji scene: an interactive pixel-art banner.
// Mount Fuji behind a lake and hills, a red five-storey pagoda on the right, a torii gate on the left,
// cherry trees with falling petals, drifting clouds, birds, and a lady in a kimono who walks to the temple
// and feeds the birds.
//
// Interactions:
//   - click the pagoda → its wind bells ring (Web Audio chime) and sway
//   - click a bird (flying or on the ground) → it and its neighbours fly off
//   - click the lady → she scatters food; sparrows fly down to peck at it (she also does this on her own)
//
// Usage:  const scene = mountFujiScene(canvas);  …  scene.destroy();
// The canvas renders at a low resolution (W × H) and should be scaled up with `image-rendering: pixelated`.
// Soft, transparent edges are done with a CSS mask on the canvas (see the demo).

import { chime, chirp } from './scene-audio.js';

export const W = 400;
export const H = 170;

// ---------- palette ----------
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const C = Object.fromEntries(Object.entries({
  sky0: '#b7d3e6', sky1: '#cfe2ec', sky2: '#e6eef0', sky3: '#f5ebe2',
  cloud: '#fbfcfd', cloud2: '#e9f0f5',
  fujiL: '#93a6ca', fuji: '#7a8eb7', fujiS: '#62749d', fujiD: '#53648b', fujiHaze: '#adbad2',
  snow: '#f8fafc', snowS: '#dbe2ee', snowD: '#bcc7dc',
  hill0: '#9fb2b6', hill1: '#86a09c', hill2: '#6f8f86',
  forest: '#5a8661', forestL: '#76a26c', forestD: '#41684d', forestDD: '#33553f',
  lake: '#a5c4d6', lakeL: '#d9e8f0', lakeD: '#86a9c1',
  grass: '#8db36e', grassL: '#a6c47f', grassD: '#6f9a58',
  path: '#dccaa8', pathL: '#ead9bb', pathD: '#c4ab86',
  red: '#cc4436', redD: '#9c2f2a', redL: '#e3654f', roof: '#3f4b55', roofL: '#5c6c77', roofD: '#2a3239',
  wall: '#efe3cf', bronze: '#7d8c74', bronzeD: '#56634f', gold: '#e2b04a', goldD: '#a77a26',
  bloom: '#f6cdd8', bloomL: '#fde8ee', bloomM: '#eeadc0', bloomD: '#de8ea7', bark: '#5b3e37', barkD: '#3e2a26',
  ink: '#2a2324', stone: '#a49c92', stoneD: '#7f776e',
  kimono: '#3f5b8c', kimonoL: '#5875a6', kimonoD: '#2e4268', obi: '#cc4436', hair: '#1f1717', skin: '#f2c8a7', kanzashi: '#f4a6bb',
  bird: '#3c3331', sparrow: '#8b6a4f', sparrowD: '#5b4535', sparrowL: '#c9ab8a', grain: '#d4a94e',
}).map(([k, v]) => [k, hex(v)]));

// ---------- tiny helpers ----------
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const dither = (x, y, t) => (BAYER[y & 3][x & 3] + 0.5) / 16 < t; // ordered dither: true with probability t

class Buf {
  constructor() { this.d = new Uint8ClampedArray(W * H * 4); }
  px(x, y, c, a = 255) {
    x |= 0; y |= 0; if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = (y * W + x) * 4;
    if (a >= 255) { this.d[i] = c[0]; this.d[i + 1] = c[1]; this.d[i + 2] = c[2]; this.d[i + 3] = 255; return; }
    const k = a / 255, ia = this.d[i + 3] / 255, oa = k + ia * (1 - k);
    for (let j = 0; j < 3; j++) this.d[i + j] = (c[j] * k + this.d[i + j] * ia * (1 - k)) / (oa || 1);
    this.d[i + 3] = oa * 255;
  }
  rect(x, y, w, h, c) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, c); }
  hline(x0, x1, y, c) { for (let x = Math.round(x0); x <= Math.round(x1); x++) this.px(x, y, c); }
  sprite(rows, x, y, pal, flip = false) {
    rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.' && pal[ch]) this.px(flip ? x + r.length - 1 - i : x + i, y + j, pal[ch]); }));
  }
}

// ---------- static layers ----------
const FUJI = { cx: 168, peak: 30, base: 118 };
const fujiHalf = (y) => (y < FUJI.peak ? -1 : 4 + 196 * Math.pow((y - FUJI.peak) / (FUJI.base - FUJI.peak), 1.45));
const PAGODA = { cx: 334, base: 121 };
const TORII = { x: 52, base: 148 };
const GROUND_Y = 131; // top of the foreground meadow
// the path's centre line: from the bottom (x≈130) up to the pagoda steps (x≈300)
const pathX = (y) => 300 - ((y - (GROUND_Y - 2)) / (H - GROUND_Y + 2)) * 170;
const pathY = (x) => GROUND_Y - 2 + ((300 - x) / 170) * (H - GROUND_Y + 2);

function paintSky(b) {
  // calm horizontal bands (like old pixel skies), dithered only where two bands meet
  const stops = [C.sky0, C.sky1, C.sky2, C.sky3];
  const bands = 9, bandH = 120 / bands;
  const mix = (t) => { const k = t * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(k)), f = k - i; return stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * f)); };
  for (let y = 0; y < 120; y++) {
    const band = Math.floor(y / bandH), inBand = y - band * bandH;
    const c0 = mix(band / (bands - 1)), c1 = mix(Math.min(1, (band + 1) / (bands - 1)));
    for (let x = 0; x < W; x++) b.px(x, y, inBand > bandH - 3 && dither(x, y, 0.5) ? c1 : c0);
  }
}

function paintFuji(b, r) {
  const n = (x) => Math.sin(x * 0.21) * 1.6 + Math.sin(x * 0.57 + 1) * 1.1;
  for (let y = FUJI.peak; y <= FUJI.base + 4; y++) {
    const hw = fujiHalf(y);
    for (let x = Math.floor(FUJI.cx - hw); x <= Math.ceil(FUJI.cx + hw); x++) {
      const dx = x - FUJI.cx, side = dx / hw; // -1 left … 1 right
      if (y === FUJI.peak && Math.abs(dx) > 3) continue; // flat crater rim
      const ang = Math.atan2(dx, (y - FUJI.peak) + 6);   // direction from the summit, so ridges fan out
      const ridge = Math.sin(ang * 34 + Math.sin(ang * 9) * 1.5);
      // light from the left: lit, mid and shaded bands with dithered borders
      let c = side < -0.25 ? C.fujiL : side < 0.35 ? (dither(x, y, (side + 0.25) / 0.6) ? C.fuji : C.fujiL) : side < 0.6 ? (dither(x, y, (side - 0.35) / 0.25) ? C.fujiS : C.fuji) : C.fujiS;
      // radial gullies: a darker line on the shaded side of each ridge
      if (ridge > 0.82 && y > FUJI.peak + 8 && dither(x, y, 0.75)) c = side > 0.1 ? C.fujiD : C.fujiS;
      // snow cap: a jagged line, with fingers of snow running down the ridges
      const finger = ridge > 0.35 ? (ridge - 0.35) * 26 : 0;
      const snowLine = FUJI.peak + 23 + n(x) * 1.6 + finger * (0.6 + 0.4 * Math.abs(Math.sin(ang * 5)));
      if (y < snowLine) c = side > 0.45 ? C.snowD : side > 0.1 ? (dither(x, y, 0.5) ? C.snowS : C.snow) : C.snow;
      else if (y < snowLine + 1.5 && dither(x, y, 0.5)) c = C.snowS;
      // haze toward the base
      const haze = Math.max(0, (y - (FUJI.base - 26)) / 30);
      if (dither(x, y, haze)) c = C.fujiHaze;
      b.px(x, y, c);
    }
  }
}

function paintClouds(b, r) {
  // soft cloud bank hugging Fuji's shoulders
  for (let i = 0; i < 26; i++) {
    const x = 40 + r() * 280, y = 82 + r() * 14, rx = 6 + r() * 12, ry = 2 + r() * 3;
    for (let yy = -ry; yy <= ry; yy++) for (let xx = -rx; xx <= rx; xx++) {
      const d = (xx * xx) / (rx * rx) + (yy * yy) / (ry * ry);
      if (d < 1 && dither(Math.round(x + xx), Math.round(y + yy), 1 - d * 0.7)) b.px(x + xx, y + yy, yy < 0 ? C.cloud : C.cloud2, 210);
    }
  }
}

function paintHills(b, r) {
  const ranges = [
    { base: 104, amp: 7, freq: 0.035, ph: 1, c: C.hill0 },
    { base: 110, amp: 6, freq: 0.05, ph: 3, c: C.hill1 },
    { base: 116, amp: 5, freq: 0.07, ph: 5, c: C.hill2 },
  ];
  ranges.forEach((h, k) => {
    for (let x = 0; x < W; x++) {
      const bump = (x * 37 + k * 11) % 9 < 3 ? 1 : 0; // tiny tree tops along the ridge line
      const top = Math.round(h.base - h.amp * (0.6 + 0.4 * Math.sin(x * h.freq + h.ph)) - Math.sin(x * h.freq * 2.7) * 2) - bump;
      for (let y = top; y < GROUND_Y; y++) b.px(x, y, y === top && k < 2 ? C.hill0 : h.c);
    }
  });
}

function paintLake(b) {
  for (let y = 120; y < GROUND_Y; y++) for (let x = 0; x < 262 - (y - 120) * 3 + Math.sin(y) * 2; x++) {
    let c = C.lake;
    if (y < 123 && dither(x, y, 0.4)) c = C.lakeD; // shoreline shadow
    if ((x * 7 + y * 13) % 29 === 0) c = C.lakeL;
    b.px(x, y, c);
  }
  // faint reflection of Fuji's snow
  for (let y = 121; y < 130; y++) {
    const hw = Math.max(0, 22 - (y - 121) * 2.4);
    for (let x = FUJI.cx - hw; x < FUJI.cx + hw; x++) if (dither(x, y, 0.35)) b.px(x, y, C.lakeL);
  }
}

function tree(b, x, y, h, r, bloom = false) {
  // a small round tree (green or blossom) used for the forested hill
  const cols = bloom ? [C.bloomD, C.bloomM, C.bloom, C.bloomL] : [C.forestDD, C.forestD, C.forest, C.forestL];
  const rx = h * 0.55, ry = h * 0.5;
  for (let yy = -ry; yy <= ry; yy++) for (let xx = -rx; xx <= rx; xx++) {
    const d = (xx * xx) / (rx * rx) + (yy * yy) / (ry * ry);
    if (d > 1 || (d > 0.75 && r() < 0.35)) continue;
    const light = -(xx / rx) * 0.5 - (yy / ry) * 0.6; // lit from the top-left
    const k = light > 0.45 ? 3 : light > 0.05 ? 2 : light > -0.4 ? 1 : 0;
    b.px(x + xx, y + yy, cols[k]);
  }
}

function paintHillRight(b, r) {
  // the wooded rise the pagoda stands on
  for (let x = 236; x < W; x++) {
    const top = Math.round(118 - Math.min(22, (x - 236) * 0.42) + Math.sin(x * 0.2) * 1.2);
    for (let y = top; y < GROUND_Y + 2; y++) b.px(x, y, dither(x, y, 0.3) ? C.forestD : C.forest);
  }
  for (let i = 0; i < 70; i++) {
    const x = 238 + r() * 165, top = 118 - Math.min(22, (x - 236) * 0.42);
    if (Math.abs(x - PAGODA.cx) < 15 && r() < 0.8) continue; // keep the pagoda clear
    tree(b, x, top + r() * 16, 5 + r() * 5, r, r() < 0.28);
  }
}

function paintGround(b, r) {
  for (let y = GROUND_Y; y < H; y++) for (let x = 0; x < W; x++) {
    const n = Math.sin(x * 0.31 + y * 0.7) + Math.sin(x * 0.07 - y * 0.3);
    b.px(x, y, n > 1.1 ? C.grassL : n < -1.2 ? C.grassD : C.grass);
  }
  // the path: comes in from the bottom-left, runs past the torii and climbs to the pagoda
  for (let y = GROUND_Y - 2; y < H; y++) {
    const t = (y - (GROUND_Y - 2)) / (H - GROUND_Y + 2);
    const cx = pathX(y), hw = 6 + t * 26;
    for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) {
      const edge = Math.abs(x - cx) > hw - 2;
      b.px(x, y, edge && dither(x, y, 0.5) ? C.grassD : (x + y * 3) % 17 === 0 ? C.pathD : dither(x, y, 0.15) ? C.pathL : C.path);
    }
  }
  // stone steps up to the pagoda
  for (let s = 0; s < 4; s++) b.rect(PAGODA.cx - 8 + s, PAGODA.base + 2 + s * 3, 16 - s * 2, 2, s % 2 ? C.stone : C.stoneD);
  // grass tufts
  for (let i = 0; i < 140; i++) { const x = r() * W | 0, y = GROUND_Y + 2 + (r() * (H - GROUND_Y - 2) | 0); b.px(x, y, C.grassD); b.px(x, y - 1, C.grassL); }
}

// a stone lantern (tōrō) beside the path
function paintLantern(b, x, base) {
  b.rect(x - 1, base - 3, 5, 3, C.stoneD);            // foot
  b.rect(x, base - 9, 3, 6, C.stone); b.px(x + 2, base - 6, C.stoneD); // post
  b.rect(x - 1, base - 11, 5, 2, C.stoneD);           // platform
  b.rect(x - 1, base - 15, 5, 4, C.stone); b.rect(x, base - 14, 3, 2, C.gold); // light box with a warm window
  b.rect(x - 3, base - 17, 9, 2, C.stoneD); b.px(x - 3, base - 18, C.stone); b.px(x + 5, base - 18, C.stone); // roof
  b.rect(x, base - 19, 3, 2, C.stone); b.px(x + 1, base - 20, C.stoneD);  // finial
}

// fallen petals and little flowers scattered in the grass
function paintGroundDetails(b, r) {
  for (let i = 0; i < 160; i++) {
    const x = r() * W | 0, y = GROUND_Y + 1 + (r() * (H - GROUND_Y - 1) | 0);
    if (Math.abs(x - pathX(y)) < 8 + (y - GROUND_Y) * 0.7) continue; // keep the path clean-ish
    b.px(x, y, r() < 0.7 ? C.bloom : C.bloomL);
  }
  for (let i = 0; i < 26; i++) {
    const x = r() * W | 0, y = GROUND_Y + 4 + (r() * (H - GROUND_Y - 6) | 0);
    if (Math.abs(x - pathX(y)) < 10 + (y - GROUND_Y) * 0.7) continue;
    b.px(x, y, C.wall); b.px(x, y - 1, C.gold); b.px(x - 1, y, C.wall); b.px(x + 1, y, C.wall); // tiny white flower
  }
}

function paintTorii(b) {
  const { x, base } = TORII, w = 34, h = 40, top = base - h;
  // posts (slightly tapered)
  for (const px of [x + 5, x + w - 8]) { b.rect(px, top + 6, 3, h - 6, C.red); b.rect(px + 2, top + 6, 1, h - 6, C.redD); b.rect(px - 1, base - 3, 5, 3, C.ink); }
  // kasagi (top beam, curved up at the ends) and shimaki
  b.rect(x, top + 1, w, 3, C.ink); b.px(x - 1, top, C.ink); b.px(x + w, top, C.ink);
  b.rect(x + 1, top + 3, w - 2, 2, C.red); b.rect(x + 1, top + 4, w - 2, 1, C.redD);
  // nuki (lower beam) and the tablet
  b.rect(x + 2, top + 10, w - 4, 2, C.red); b.rect(x + 2, top + 11, w - 4, 1, C.redD);
  b.rect(x + w / 2 - 2, top + 5, 4, 5, C.ink); b.px(x + w / 2 - 1, top + 7, C.gold);
}

const BELLS = []; // eave-corner bells: [x, y] at rest; they sway when the pagoda is clicked
function paintPagoda(b) {
  const { cx, base } = PAGODA;
  BELLS.length = 0;
  let y = base;
  // stone plinth
  b.rect(cx - 15, y - 3, 30, 3, C.stone); b.rect(cx - 15, y - 1, 30, 1, C.stoneD); y -= 3;
  for (let i = 0; i < 5; i++) {
    const bw = 20 - i * 2.4, bh = i === 0 ? 9 : 7, rw = bw + 13 - i * 0.6;
    // body: red frame with cream panels and a dark door/window
    const x0 = Math.round(cx - bw / 2), x1 = Math.round(cx + bw / 2);
    b.rect(x0, y - bh, x1 - x0, bh, C.red);
    b.rect(x0 + 2, y - bh + 2, x1 - x0 - 4, bh - 4, C.wall);
    b.rect(cx - 1, y - bh + 2, 3, bh - 3, i === 0 ? C.ink : C.redD);
    b.rect(x1 - 2, y - bh, 2, bh, C.redD);
    // railing balcony
    b.hline(x0 - 1, x1, y - 2, C.redL);
    y -= bh;
    // roof: thick dark band with upturned eaves
    const rx0 = cx - rw / 2, rx1 = cx + rw / 2;
    for (let k = 0; k < 4; k++) {
      const inset = k * (rw * 0.12);
      b.hline(rx0 + inset, rx1 - inset, y - k, k === 0 ? C.roofD : k === 3 ? C.roofL : C.roof);
    }
    b.px(rx0 - 1, y - 1, C.roof); b.px(rx1 + 1, y - 1, C.roof); b.px(rx0 - 2, y - 2, C.roofL); b.px(rx1 + 2, y - 2, C.roofL);
    b.px(rx0 - 3, y - 3, C.roofL); b.px(rx1 + 3, y - 3, C.roofL); // corners sweep up
    for (let x = Math.round(rx0) + 1; x < rx1; x += 3) b.px(x, y + 2, C.redD); // bracket ends under the eave
    b.hline(rx0, rx1, y + 1, C.redD); // red rafter line under the eave
    BELLS.push([Math.round(rx0 - 1), y + 1], [Math.round(rx1 + 1), y + 1]);
    y -= 4;
  }
  // sorin (bronze spire with rings)
  b.rect(cx - 1, y - 18, 3, 18, C.bronze); b.rect(cx + 1, y - 18, 1, 18, C.bronzeD);
  for (let k = 0; k < 7; k++) b.hline(cx - 2, cx + 2, y - 3 - k * 2, C.bronzeD);
  b.px(cx, y - 20, C.bronze); b.px(cx, y - 21, C.gold);
  PAGODA.top = y - 21;
  PAGODA.box = { x0: cx - 22, x1: cx + 22, y0: PAGODA.top, y1: base + 2 };
}

// a cherry tree: trunk, branches and a lumpy canopy of blossom clusters
function paintCherry(b, r, x, base, size, flip = 1) {
  const trunkTop = base - size * 0.9;
  for (let y = base; y > trunkTop; y--) {
    const t = (base - y) / (base - trunkTop), xx = x + Math.sin(t * 2.2) * 3 * flip;
    b.rect(Math.round(xx) - 1, y, 3 - (t > 0.6 ? 1 : 0), 1, C.bark); b.px(Math.round(xx) + 1, y, C.barkD);
  }
  const blobs = [];
  for (let i = 0; i < 9 + size / 4; i++) blobs.push([x + (r() - 0.5) * size * 1.6, trunkTop - r() * size * 0.55 + size * 0.15, 4 + r() * size * 0.28]);
  // branches out to the blobs
  for (const [bx, by] of blobs) { const n = 12; for (let k = 0; k <= n; k++) b.px(x + (bx - x) * k / n, trunkTop + (by - trunkTop) * k / n, C.barkD); }
  for (const [bx, by, rad] of blobs) {
    for (let yy = -rad; yy <= rad; yy++) for (let xx = -rad; xx <= rad; xx++) {
      const d = (xx * xx + yy * yy) / (rad * rad);
      if (d > 1 || (d > 0.7 && r() < 0.4)) continue;
      const light = -(xx + yy) / (rad * 2);
      b.px(bx + xx, by + yy, light > 0.25 ? C.bloomL : light > -0.05 ? C.bloom : light > -0.3 ? C.bloomM : C.bloomD);
    }
  }
  return blobs;
}

// ---------- sprites ----------
// lady in a kimono (11×21), three-quarter view facing right
// h hair · H hair shine · k kanzashi · s skin · S skin shade · K kimono · d kimono pattern · o obi · G obi cord · w tabi · z zori
const LADY_BODY = [
  '...hhh.....',
  '..hhHhh.k..',
  '..hhhhhhk..',
  '..hhhsss...',
  '..hhsSss...',
  '...hsss....',
  '....ss.....',
  '..KKKKKK...',
  '.KKKKKKKK..',
  '.KKdKKKKKs.',
  '.KKoooooK..',
  '.KKoGoooK..',
  '..KKKKKK...',
  '..KKKdKK...',
  '..KKKKKK...',
  '..KKKKKdK..',
  '..KKKKKKK..',
  '..KKKKKKK..',
];
const LADY_FEET = {
  stand: ['...KKKKK...', '...w..w....', '...z..z....'],
  walkA: ['..KKK.KK...', '..w....w...', '..z....z...'],
  walkB: ['...KKKKK...', '....ww.....', '....zz.....'],
};
const LADY_THROW_ARM = ['.KKKKKKKKss', '.KKdKKKK...']; // replaces rows 8–9 while she throws
const LADY_PAL = { h: C.hair, H: hex('#3a2c2a'), k: C.kanzashi, s: C.skin, S: hex('#e2aa8a'), K: C.kimono, d: hex('#8fa6d6'), o: C.obi, G: C.gold, w: C.wall, z: C.bark };

const SKYBIRD = [['b...b', '.b.b.', '..b..'], ['.....', 'bb.bb', '..b..']];
// sparrow (6×5), facing right: s body · D eye · e beak · L belly · l legs. [standing, pecking]
const SPARROW = [
  ['...ss.', '..sDse', 'sssss.', '.sLL..', '..l.l.'],
  ['......', 'sss...', '.ssss.', '..sDse', '..l.l.'],
];

// ---------- scene ----------
export function mountFujiScene(canvas, { seed = 7, fps = 14 } = {}) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const r = rng(seed);

  // static backdrop
  const bg = new Buf();
  paintSky(bg); paintFuji(bg, r); paintClouds(bg, r); paintHills(bg, r); paintLake(bg);
  paintHillRight(bg, r); paintGround(bg, r); paintGroundDetails(bg, r); paintPagoda(bg); paintTorii(bg);
  paintLantern(bg, 246, 146);
  const blossomBlobs = [
    ...paintCherry(bg, r, 14, H - 6, 40, 1),
    ...paintCherry(bg, r, 378, H - 4, 36, -1),
    ...paintCherry(bg, r, 270, GROUND_Y + 4, 18, 1),
  ];

  // moving things
  const petals = Array.from({ length: 34 }, () => newPetal(true));
  function newPetal(anywhere = false) {
    const [bx, by, rad] = blossomBlobs[(r() * blossomBlobs.length) | 0];
    return { x: bx + (r() - 0.5) * rad * 2, y: anywhere ? r() * H : by + (r() - 0.5) * rad, vx: 0.25 + r() * 0.35, vy: 0.18 + r() * 0.22, ph: r() * 6, c: r() < 0.5 ? C.bloom : C.bloomL };
  }
  const clouds = [{ x: 40, y: 18, w: 34 }, { x: 250, y: 10, w: 26 }, { x: 330, y: 30, w: 20 }];
  const flock = [];
  function spawnFlock() {
    const n = 3 + ((r() * 3) | 0), y = 22 + r() * 30, dir = r() < 0.5 ? 1 : -1, x = dir > 0 ? -10 : W + 10;
    for (let i = 0; i < n; i++) flock.push({ x: x - dir * i * (7 + r() * 4), y: y + (i % 2) * 4 + r() * 3, vx: dir * (0.45 + r() * 0.15), vy: 0, flap: (r() * 2) | 0, flee: false });
  }
  spawnFlock();
  const sparrows = []; // on the ground
  const grains = [];
  const notes = [];   // little sparkles rising from the bells
  const ripples = []; // rings on the lake where it's clicked
  const shadows = [{ x: 60, y: 150, w: 70 }, { x: 260, y: 160, w: 90 }]; // cloud shadows drifting over the meadow
  let bellSwing = 0;

  const START_X = 132, FEED_X = 196;
  const lady = { x: START_X, y: 0, state: 'walk', t: 0, target: FEED_X, alpha: 255 };
  const placeLady = () => { lady.y = Math.round(pathY(lady.x + 5)) - 20; };
  placeLady();
  let frame = 0, last = 0, raf = 0, idleFeed = 220;

  // ---- interactions ----
  const toScene = (e) => { const rc = canvas.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width * W, (e.clientY - rc.top) / rc.height * H]; };
  const near = (a, x, y, d) => Math.abs(a.x - x) < d && Math.abs(a.y - y) < d;
  const inBox = (bx, x, y) => x >= bx.x0 && x <= bx.x1 && y >= bx.y0 && y <= bx.y1;
  const ladyBox = () => ({ x0: lady.x - 2, x1: lady.x + 13, y0: lady.y - 2, y1: lady.y + 22 });

  function scareSkyBirds(x, y) { chirp((x / W) * 2 - 1); flock.forEach((bd) => { if (near(bd, x, y, 28)) { bd.flee = true; bd.vy = -1.2 - Math.random(); bd.vx *= 2.5; } }); }
  function scareSparrows() { if (sparrows.length) chirp(); sparrows.forEach((s) => { s.state = 'leave'; s.vy = -1.4 - Math.random(); s.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random()); }); }
  function feed() {
    if (lady.state !== 'idle' && lady.state !== 'walk') return; // she stops walking to feed them
    lady.state = 'throw'; lady.t = 0;
    for (let i = 0; i < 9; i++) grains.push({ x: lady.x + 10, y: lady.y + 8, vx: 0.4 + Math.random() * 1.1, vy: -0.6 - Math.random() * 0.6, landed: false });
    const n = 2 + ((Math.random() * 2) | 0);
    for (let i = 0; i < n; i++) sparrows.push({ x: lady.x + 14 + Math.random() * 20 + (Math.random() < 0.5 ? -60 : 60), y: lady.y - 40 - Math.random() * 20, tx: lady.x + 13 + i * 6 + Math.random() * 4, ty: lady.y + 16, state: 'arrive', t: 0, vx: 0, vy: 0, flip: Math.random() < 0.5 });
  }
  function onClick(e) {
    const [x, y] = toScene(e);
    const hitSparrow = sparrows.some((s) => near(s, x - 2, y - 2, 7));
    const hitSky = flock.some((bd) => near(bd, x - 2, y - 1, 9));
    if (hitSparrow) return scareSparrows();
    if (hitSky) return scareSkyBirds(x, y);
    if (inBox(ladyBox(), x, y)) return feed();
    if (y >= 120 && y < GROUND_Y && x < 262 - (y - 120) * 3) { ripples.push({ x, y, r: 0 }); return; }
    if (PAGODA.box && inBox(PAGODA.box, x, y)) { bellSwing = 1; chime(); for (let i = 0; i < 6; i++) notes.push({ x: PAGODA.cx + (Math.random() - 0.5) * 30, y: PAGODA.top + 20 + Math.random() * 40, life: 30 + Math.random() * 20 }); }
  }
  function onMove(e) {
    const [x, y] = toScene(e);
    const hot = sparrows.some((s) => near(s, x - 2, y - 2, 7)) || flock.some((bd) => near(bd, x - 2, y - 1, 9)) || inBox(ladyBox(), x, y) || (PAGODA.box && inBox(PAGODA.box, x, y));
    canvas.style.cursor = hot ? 'pointer' : 'default';
  }
  canvas.addEventListener('click', onClick);
  canvas.addEventListener('pointermove', onMove);

  // ---- simulation step ----
  function step() {
    frame++;
    // clouds and petals drift
    clouds.forEach((c) => { c.x += 0.06; if (c.x > W + 40) c.x = -c.w - 10; });
    petals.forEach((p, i) => { p.x += p.vx + Math.sin(frame * 0.08 + p.ph) * 0.25; p.y += p.vy; if (p.y > H || p.x > W + 2) petals[i] = newPetal(); });
    // sky birds
    flock.forEach((bd) => { bd.x += bd.vx; bd.y += bd.vy + (bd.flee ? 0 : Math.sin(frame * 0.1 + bd.x * 0.05) * 0.08); if (frame % (bd.flee ? 2 : 4) === 0) bd.flap ^= 1; });
    for (let i = flock.length - 1; i >= 0; i--) if (flock[i].x < -20 || flock[i].x > W + 20 || flock[i].y < -12) flock.splice(i, 1);
    if (!flock.length && Math.random() < 0.01) spawnFlock();
    // lady
    lady.t++;
    if (lady.state === 'walk') { lady.x += 0.5; placeLady(); if (lady.x >= lady.target) { lady.state = 'idle'; lady.t = 0; } }
    else if (lady.state === 'throw') { if (lady.t > 10) { lady.state = 'idle'; lady.t = 0; } }
    else if (lady.state === 'idle') {
      if (lady.t > idleFeed && !sparrows.length) { feed(); idleFeed = 260 + Math.random() * 160; }
      if (lady.t > 520 && !sparrows.length) { lady.state = 'toTemple'; lady.t = 0; }
    } else if (lady.state === 'toTemple') {
      // walk up the path toward the pagoda steps and fade into the temple
      lady.x += 0.45; placeLady();
      if (lady.x > PAGODA.cx - 40) lady.alpha = Math.max(0, lady.alpha - 5);
      if (lady.alpha === 0) { Object.assign(lady, { x: START_X, state: 'walk', t: 0, alpha: 0 }); placeLady(); }
    }
    if (lady.state === 'walk' && lady.alpha < 255) { lady.alpha = Math.min(255, lady.alpha + 6); // fades in as she arrives
    }
    // grains fall to the ground
    grains.forEach((g) => { if (g.landed) return; g.x += g.vx; g.y += g.vy; g.vy += 0.12; if (g.y >= lady.y + 20) { g.y = lady.y + 20; g.landed = true; } });
    // sparrows: fly in, peck, leave
    sparrows.forEach((s) => {
      s.t++;
      if (s.state === 'arrive') { s.x += (s.tx - s.x) * 0.08; s.y += (s.ty - s.y) * 0.08; if (Math.abs(s.x - s.tx) < 0.6 && Math.abs(s.y - s.ty) < 0.6) { s.state = 'peck'; s.t = 0; } }
      else if (s.state === 'peck') { if (s.t % 20 === 0 && Math.random() < 0.3) { s.x += Math.random() < 0.5 ? -1 : 1; s.flip = !s.flip; } if (s.t > 150) { s.state = 'leave'; s.vy = -1.2; s.vx = (s.flip ? -1 : 1) * 1.2; } }
      else if (s.state === 'leave') { s.x += s.vx; s.y += s.vy; s.vy -= 0.02; }
    });
    for (let i = sparrows.length - 1; i >= 0; i--) if (sparrows[i].y < -10 || sparrows[i].x < -10 || sparrows[i].x > W + 10) sparrows.splice(i, 1);
    if (!sparrows.length && grains.length) for (let i = grains.length - 1; i >= 0; i--) if (grains[i].landed && Math.random() < 0.05) grains.splice(i, 1);
    // bells and notes
    bellSwing *= 0.96; if (bellSwing < 0.02) bellSwing = 0;
    ripples.forEach((rp) => { rp.r += 0.35; }); for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].r > 14) ripples.splice(i, 1);
    shadows.forEach((sh) => { sh.x += 0.12; if (sh.x - sh.w > W) sh.x = -sh.w; });
    notes.forEach((n) => { n.y -= 0.4; n.x += Math.sin(n.y * 0.2) * 0.2; n.life--; });
    for (let i = notes.length - 1; i >= 0; i--) if (notes[i].life <= 0) notes.splice(i, 1);
  }

  // ---- draw ----
  const out = new Buf();
  const img = ctx.createImageData(W, H);
  function draw() {
    out.d.set(bg.d);
    // sky clouds (soft pixel puffs)
    clouds.forEach((c) => {
      for (let yy = -4; yy <= 4; yy++) for (let xx = -c.w / 2; xx <= c.w / 2; xx++) {
        const d = (xx * xx) / ((c.w / 2) ** 2) + (yy * yy) / 16 + (yy > 0 ? 0.2 : 0);
        if (d < 1 && dither(Math.round(c.x + xx), Math.round(c.y + yy), 1.1 - d)) out.px(c.x + xx, c.y + yy, yy > 1 ? C.cloud2 : C.cloud, 200);
      }
    });
    // cloud shadows: a soft darker patch sliding across the meadow
    shadows.forEach((sh) => {
      for (let y = GROUND_Y; y < H; y++) for (let x = Math.max(0, sh.x - sh.w); x < Math.min(W, sh.x + sh.w); x++) {
        const d = ((x - sh.x) / sh.w) ** 2 + ((y - sh.y) / 14) ** 2;
        if (d < 1 && dither(x, y, (1 - d) * 0.55)) out.px(x, y, C.ink, 26);
      }
    });
    // ripples where the lake was clicked
    ripples.forEach((rp) => {
      const a = Math.max(0, 255 - rp.r * 18);
      for (let t = 0; t < Math.PI * 2; t += 0.18) { const x = rp.x + Math.cos(t) * rp.r, y = rp.y + Math.sin(t) * rp.r * 0.35; if (y >= 120 && y < GROUND_Y) out.px(x, y, C.lakeL, a); }
    });
    // lake sparkles
    for (let i = 0; i < 10; i++) { const x = ((i * 53 + frame * 0.7) % 260) | 0, y = 122 + ((i * 7) % 8); if ((frame + i * 5) % 12 < 6) out.px(x, y, C.lakeL); }
    // bells sway when rung
    BELLS.forEach(([x, y], i) => { const off = Math.round(Math.sin(frame * 0.6 + i) * 1.5 * bellSwing); out.px(x + off, y + 1, C.gold); out.px(x + off, y + 2, C.goldD); });
    notes.forEach((n) => { const a = Math.min(255, n.life * 8); out.px(n.x, n.y, C.gold, a); out.px(n.x + 1, n.y - 1, C.gold, a * 0.6); });
    // grains
    grains.forEach((g) => out.px(g.x, g.y, C.grain));
    // lady
    if (lady.alpha > 0) {
      const walking = lady.state === 'walk' || lady.state === 'toTemple';
      const rows = LADY_BODY.slice();
      if (lady.state === 'throw') { rows[8] = LADY_THROW_ARM[0]; rows[9] = LADY_THROW_ARM[1]; }
      const feet = walking ? ((lady.t >> 3) % 2 ? LADY_FEET.walkA : LADY_FEET.walkB) : LADY_FEET.stand;
      const bob = walking && (lady.t >> 3) % 2 ? 1 : 0; // a little step bounce
      [...rows, ...feet].forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') out.px(lady.x + i, lady.y + j + (j < rows.length ? bob : 0), LADY_PAL[ch], lady.alpha); }));
    }
    // sparrows
    sparrows.forEach((s) => {
      const fr = s.state === 'peck' && (s.t >> 3) % 2 ? SPARROW[1] : s.state === 'peck' ? SPARROW[0] : SKYBIRD[(s.t >> 2) % 2];
      const pal = { s: C.sparrow, D: C.ink, e: C.goldD, L: C.sparrowL, l: C.sparrowD, b: C.sparrow };
      out.sprite(fr, s.x, s.y, pal, s.flip);
    });
    // sky birds
    flock.forEach((bd) => out.sprite(SKYBIRD[bd.flap], bd.x, bd.y, { b: C.bird }));
    // falling petals
    petals.forEach((p) => { out.px(p.x, p.y, p.c); if ((frame + p.ph * 10) % 20 < 10) out.px(p.x + 1, p.y, C.bloomM); });

    img.data.set(out.d);
    ctx.putImageData(img, 0, 0);
  }

  function loop(ts) {
    raf = requestAnimationFrame(loop);
    if (ts - last < 1000 / fps) return;
    last = ts;
    step(); draw();
  }
  draw();
  raf = requestAnimationFrame(loop);

  return {
    ringBells: () => onClick({ clientX: 0, clientY: 0 }),
    destroy() { cancelAnimationFrame(raf); canvas.removeEventListener('click', onClick); canvas.removeEventListener('pointermove', onMove); },
  };
}
