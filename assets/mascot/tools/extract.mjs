// Turn a pixel-art reference image into a mascot sprite grid.
//
//   node assets/mascot/tools/extract.mjs <image.png> <cellX> <cellY> <originX> <originY> <cols> <rows> <out.json>
//
// - cellX / cellY: size of one art pixel in screen px (can be fractional, e.g. 5.29)
// - originX / originY: top-left of the first cell, in screen px
// - cols / rows: how many cells to read
// Each cell takes the median colour of its centre. Colours close to the background become '.',
// colours close to an existing PALETTE entry reuse its key, and anything else gets a new key.
// The output JSON has { grid: [...rows], newColours: { key: '#hex' } }.
// Uses only Node built-ins (zlib) and reads 8-bit, non-interlaced RGB/RGBA PNGs (what macOS `sips` writes).

import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { PALETTE } from '../mascot.js';

const [file, cellX, cellY, originX, originY, cols, rows, out] = process.argv.slice(2);
if (!out) { console.error('usage: extract.mjs <image.png> <cellX> <cellY> <originX> <originY> <cols> <rows> <out.json>'); process.exit(1); }

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
const sx = +cellX, sy = +cellY, ox = +originX, oy = +originY, NX = +cols, NY = +rows;
const inset = Math.max(1, Math.min(sx, sy) * 0.25);
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
for (let r = 0; r < NY; r++) {
  let row = '';
  for (let q = 0; q < NX; q++) {
    const x0 = ox + q * sx, y0 = oy + r * sy, ch = [[], [], []];
    for (let y = Math.round(y0 + inset); y <= Math.round(y0 + sy - inset); y++) for (let x = Math.round(x0 + inset); x <= Math.round(x0 + sx - inset); x++) {
      if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
      img.at(x, y).forEach((v, i) => ch[i].push(v));
    }
    if (!ch[0].length) { row += '.'; continue; }
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

writeFileSync(out, JSON.stringify({ source: file, cellX: sx, cellY: sy, originX: ox, originY: oy, grid, newColours }, null, 0));
console.log(`${NX}×${NY} grid, ${Object.keys(newColours).length} new colours → ${out}`);
