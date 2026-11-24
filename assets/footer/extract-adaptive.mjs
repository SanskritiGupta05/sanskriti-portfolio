// Like assets/mascot/tools/extract.mjs, but for pixel art whose grid isn't perfectly regular
// (Sanskriti's footer reference drifts by up to ~1.5 px between areas, so one fixed grid straddles
// two art pixels in places and gives broken outlines and stray specks).
// It finds the real cell boundaries: the colour-edge strength summed down every column and across
// every row, then the cut lines (3 or 4 px apart for a ~3.5 px grid) that land on the strongest edges
// (dynamic programming). Each cell then takes the median colour of its inner pixels.
//
//   node assets/footer/extract-adaptive.mjs <image.png> <x0> <y0> <x1> <y1> <minGap> <maxGap> <out.json> [penalty=1]
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { PALETTE } from '../mascot/mascot.js';

const [file, X0, Y0, X1, Y1, MIN, MAX, out] = process.argv.slice(2);
function decodePNG(buf) {
  let pos = 8, width, height, bitDepth, colorType, interlace;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8), data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; interlace = data[12]; }
    if (type === 'IDAT') idat.push(data);
    if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (bitDepth !== 8 || interlace !== 0 || ![2, 6].includes(colorType)) throw new Error(`unsupported PNG (bitDepth ${bitDepth}, colorType ${colorType}, interlace ${interlace})`);
  const bpp = colorType === 6 ? 4 : 3, stride = width * bpp, raw = inflateSync(Buffer.concat(idat));
  const px = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? px[y * stride + i - bpp] : 0, b = y ? px[(y - 1) * stride + i] : 0, c = i >= bpp && y ? px[(y - 1) * stride + i - bpp] : 0;
      let v = line[i];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[y * stride + i] = v & 255;
    }
  }
  return { width, height, at: (x, y) => { const k = y * stride + x * bpp; return [px[k], px[k + 1], px[k + 2]]; } };
}

const img = decodePNG(readFileSync(file));
const x0 = +X0, y0 = +Y0, x1 = +X1, y1 = +Y1, gmin = +MIN, gmax = +MAX;
const diff = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);

// edge strength between pixel i-1 and i, along one axis
const ex = new Float64Array(x1 - x0 + 1), ey = new Float64Array(y1 - y0 + 1);
for (let y = y0; y <= y1; y++) for (let x = x0 + 1; x <= x1; x++) ex[x - x0] += diff(img.at(x, y), img.at(x - 1, y));
for (let x = x0; x <= x1; x++) for (let y = y0 + 1; y <= y1; y++) ey[y - y0] += diff(img.at(x, y), img.at(x, y - 1));

// best cut positions 0 = c0 < c1 < … with gaps in [gmin, gmax], maximising the edge strength at the cuts
// each cut costs `penalty` × the mean edge strength, so it only cuts where there's a real edge
// (otherwise it would always take the shortest gaps, since every cut adds score)
const penalty = +(process.argv[10] ?? 1);
function cuts(raw) {
  const mean = raw.reduce((s, v) => s + v, 0) / raw.length;
  const e = raw.map((v) => v - penalty * mean);
  const n = e.length, best = new Float64Array(n).fill(-Infinity), prev = new Int32Array(n).fill(-1);
  for (let i = 0; i <= gmax && i < n; i++) best[i] = e[i];
  for (let i = 1; i < n; i++) for (let g = gmin; g <= gmax; g++) {
    const j = i - g;
    if (j >= 0 && best[j] > -Infinity && best[j] + e[i] > best[i]) { best[i] = best[j] + e[i]; prev[i] = j; }
  }
  let end = n - 1;
  for (let i = n - 1; i >= n - gmax && i >= 0; i--) if (best[i] > best[end]) end = i;
  const out = [];
  for (let i = end; i >= 0; i = prev[i]) { out.push(i); if (prev[i] < 0) break; }
  return out.reverse();
}
const cx = cuts(ex).map((v) => v + x0), cy = cuts(ey).map((v) => v + y0);

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
const bg = img.at(5, 5);
const pal = Object.entries(PALETTE).map(([k, h]) => [k, rgb(h)]);
const used = new Set(Object.keys(PALETTE));
const free = [];
for (let u = 0x100; u < 0x52f; u++) { const ch = String.fromCharCode(u); if (!used.has(ch) && /\p{L}/u.test(ch)) free.push(ch); }
const newColours = {};
const grid = [];
for (let r = 0; r + 1 < cy.length; r++) {
  let row = '';
  for (let q = 0; q + 1 < cx.length; q++) {
    // inner pixels only: skip the first pixel of each cell, where the soft edge sits
    const xa = cx[q] + 1, xb = cx[q + 1] - 1, ya = cy[r] + 1, yb = cy[r + 1] - 1;
    const ch = [[], [], []];
    for (let y = ya; y <= Math.max(ya, yb); y++) for (let x = xa; x <= Math.max(xa, xb); x++) img.at(x, y).forEach((v, i) => ch[i].push(v));
    const p = ch.map((a) => a.sort((m, n) => m - n)[a.length >> 1]);
    if (dist(p, bg) < 14) { row += '.'; continue; }
    let best = null, bd = 1e9;
    for (const [k, c] of pal) { const d = dist(p, c); if (d < bd) { bd = d; best = k; } }
    if (bd < 16) { row += best; continue; }
    const k = free.shift();
    newColours[k] = hex(p); pal.push([k, p]); row += k;
  }
  grid.push(row);
}
writeFileSync(out, JSON.stringify({ source: file, region: [x0, y0, x1, y1], cutsX: cx, cutsY: cy, grid, newColours }));
console.log(`${cx.length - 1}×${cy.length - 1} grid, ${Object.keys(newColours).length} new colours → ${out}`);
