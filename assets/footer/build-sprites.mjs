// Builds the footer's pixel sprites (pixel Sanskriti resting her chin on her hands, and her
// travel suitcase) from Sanskriti's footer reference, read cell by cell with the mascot tool:
//   node assets/mascot/tools/extract.mjs explorations/_ref/footer-ref.png 3.5 3.5 322 196 99 90 assets/footer/girl.raw.json
//   node assets/mascot/tools/extract.mjs explorations/_ref/footer-ref.png 2.9 2.9 1268 348 50 56 assets/footer/case.raw.json
// then: node assets/footer/build-sprites.mjs  →  assets/footer/sprites.js
// Cleaning only removes things that aren't part of the sprite (the cherry branch, background specks,
// sushi in front); no pixel of her or the bag is redrawn.
import { readFileSync, writeFileSync } from 'node:fs';
import { PALETTE } from '../mascot/mascot.js';

const load = (f) => JSON.parse(readFileSync(new URL(f, import.meta.url)));
const toCells = (rows) => rows.map((r) => [...r]);
const blank = (g, y0, y1, x0, x1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g[y]?.[x] !== undefined) g[y][x] = '.'; };
const despeck = (g) => {
  const H = g.length, W = g[0].length, on = (y, x) => y >= 0 && y < H && x >= 0 && x < W && g[y][x] !== '.';
  const out = g.map((r) => [...r]);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (on(y, x) && !on(y - 1, x) && !on(y + 1, x) && !on(y, x - 1) && !on(y, x + 1)) out[y][x] = '.';
  return out;
};
// peel off pale, washed-out pixels on a sprite's outer edge: blends with the reference's cream
// background that would show as a light fringe on the night page
const pale = (hex) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)); return (r + g + b) / 3 > 185 && Math.max(r, g, b) - Math.min(r, g, b) < 60; };
const defringe = (g, colours, passes = 2) => {
  for (let p = 0; p < passes; p++) {
    const H = g.length, W = g[0].length, empty = (y, x) => y < 0 || y >= H || x < 0 || x >= W || g[y][x] === '.';
    const kill = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      if (c !== '.' && colours[c] && pale(colours[c]) && (empty(y - 1, x) || empty(y + 1, x) || empty(y, x - 1) || empty(y, x + 1))) kill.push([y, x]);
    }
    for (const [y, x] of kill) g[y][x] = '.';
  }
  return g;
};
// split a rectangle out of g into its own full-size layer
const take = (g, y0, y1, x0, x1, keep = () => true) => {
  const layer = g.map((r) => r.map(() => '.'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g[y][x] !== '.' && keep(y, x)) { layer[y][x] = g[y][x]; g[y][x] = '.'; }
  return layer;
};
// Snap every colour to the nearest colour of the home-page mascot's palette, so the footer sprites
// use the same crisp, limited colours (solid dark outline, the same hair browns, skin and cream)
// instead of the reference's soft in-between blends. Weighted RGB distance (closer to how we see it).
const rgbOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
// the 19 colours of the home coffee pose, plus a few hair-shadow and steam shades from the ramen pose
const GIRL_KEYS = 'atebikdcqrpnGomlsgj' + 'HTu*D';
const near = (hex, keys) => {
  const [r, g, b] = rgbOf(hex);
  let best = null, bd = Infinity;
  for (const k of keys) {
    const h = PALETTE[k];
    const [R, G, B] = rgbOf(h), rm = (r + R) / 2;
    const d = (2 + rm / 256) * (r - R) ** 2 + 4 * (g - G) ** 2 + (2 + (255 - rm) / 256) * (b - B) ** 2;
    if (d < bd) { bd = d; best = k; }
  }
  return best;
};
// Hair and outline: the reference's browns are lighter and redder than the home mascot's, so the dark
// tones are graded onto the home pose's own three hair shades by lightness (pixel-count quantiles):
// darkest → outline 'a', middle → hair 't', lighter → 'i', lightest strands → the highlight brown 'r'. Saturated reds (her top) are left out.
const gradeHair = (layers, colours) => {
  const isHair = (hex) => { const [r, g, b] = rgbOf(hex); const L = (r + g + b) / 3; return L < 150 && !(r - g > 70 && r > 120); };
  const count = {};
  for (const l of layers) for (const row of l) for (const c of row) if (c !== '.' && isHair(colours[c])) count[c] = (count[c] || 0) + 1;
  const keys = Object.keys(count).sort((p, q) => rgbOf(colours[p]).reduce((s, v) => s + v) - rgbOf(colours[q]).reduce((s, v) => s + v));
  const total = keys.reduce((s, k) => s + count[k], 0);
  const map = {};
  let run = 0;
  for (const k of keys) { const mid = (run + count[k] / 2) / total; map[k] = mid < 0.32 ? 'a' : mid < 0.76 ? 't' : mid < 0.92 ? 'i' : 'r'; run += count[k]; }
  for (const l of layers) for (const row of l) for (let x = 0; x < row.length; x++) if (map[row[x]]) row[x] = map[row[x]];
};
const snap = (layers, colours, keys) => {
  const memo = {};
  for (const l of layers) for (const row of l) for (let x = 0; x < row.length; x++) {
    const c = row[x];
    if (c === '.' || PALETTE[c] && 'atebikdcqrpnGomlsgjHTu*D'.includes(c)) continue;
    row[x] = memo[c] ??= near(colours[c], keys);
  }
};
const pal = (raw, layers) => {
  const all = { ...PALETTE, ...raw.newColours }, used = {};
  for (const l of layers) for (const r of l) for (const c of r) if (c !== '.') used[c] = all[c];
  return used;
};
const rows = (g) => g.map((r) => r.join(''));

// --- pixel Sanskriti, chin on her hands, with her heart mug ---
const girlRaw = load('./girl.raw.json');
let girl = toCells(girlRaw.grid).slice(0, 85); // below row 84 is the counter and the sushi in front
blank(girl, 0, 15, 0, 46); // the cherry branch in the top-left corner
blank(girl, 78, 84, 88, 98); // a plate peeking in at the bottom right
girl = despeck(girl);
const girlColours = { ...PALETTE, ...girlRaw.newColours };
const bubble = take(girl, 0, 19, 70, 98);
const sparkles = take(girl, 20, 41, 9, 27);
const steam = take(girl, 50, 71, 0, 14); // steam is pale by nature: not defringed
defringe(girl, girlColours); defringe(bubble, girlColours); defringe(sparkles, girlColours);
gradeHair([girl, bubble], girlColours);
snap([girl, bubble, steam], girlColours, [...GIRL_KEYS]);
for (const row of sparkles) for (let x = 0; x < row.length; x++) if (row[x] !== '.') row[x] = 'G'; // the home mascot's sparkle gold
const GIRL = { w: girl[0].length, h: girl.length, palette: pal(girlRaw, [girl, bubble, sparkles, steam]), body: rows(girl), bubble: rows(bubble), sparkles: rows(sparkles), steam: rows(steam) };

// --- the travel suitcase, with four stickers that peel off ---
const caseRaw = load('./case.raw.json');
let bag = toCells(caseRaw.grid).slice(0, 52); // rows 52+ are sushi rolls in front of it
bag[0] = bag[0].map(() => '.');
blank(bag, 0, 13, 38, 49); // background specks right of the handle
bag.push(bag[0].map((_, x) => (x >= 2 && x <= 49 ? 'a' : '.'))); // close the bottom edge where the sushi was
bag = despeck(bag);
defringe(bag, { ...PALETTE, ...caseRaw.newColours });
const BODY = new Set(['n', 'b', 'q', 'e', 'Á', '.']);
// each sticker: its rectangle; the sticker is everything between its first and last non-case pixel on each row
const STICKERS = { cat: [23, 34, 8, 19], torii: [28, 38, 23, 35], fox: [38, 50, 8, 19], sakura: [41, 51, 22, 36] };
const stickers = {};
for (const [name, [y0, y1, x0, x1]] of Object.entries(STICKERS)) {
  const layer = bag.map((r) => r.map(() => '.'));
  for (let y = y0; y <= y1; y++) {
    const xs = []; for (let x = x0; x <= x1; x++) if (!BODY.has(bag[y][x])) xs.push(x);
    if (!xs.length) continue;
    for (let x = xs[0]; x <= xs[xs.length - 1]; x++) { layer[y][x] = bag[y][x] === '.' ? 'n' : bag[y][x]; bag[y][x] = 'n'; } // the case shows plain under it
  }
  stickers[name] = { rows: rows(layer), box: [y0, y1, x0, x1] };
}
// the suitcase gets the same limited palette, plus the ramen pose's two sakura pinks and red-orange for the stickers
{
  const caseColours = { ...PALETTE, ...caseRaw.newColours };
  const layers = [bag, ...Object.values(stickers).map((st) => toCells(st.rows))];
  snap(layers, caseColours, [...GIRL_KEYS, '}', '{', '1']);
  Object.values(stickers).forEach((st, i) => { st.rows = rows(layers[i + 1]); });
}
const CASE = { w: bag[0].length, h: bag.length, palette: pal(caseRaw, [bag, ...Object.values(stickers).map((s) => toCells(s.rows))]), body: rows(bag), stickers };

writeFileSync(new URL('./sprites.js', import.meta.url), `// Generated by build-sprites.mjs from Sanskriti's footer reference. Do not edit by hand.\n// Grids of palette keys ('.' = empty); every layer is the full size of its sprite.\nexport const GIRL = ${JSON.stringify(GIRL)};\nexport const CASE = ${JSON.stringify(CASE)};\n`);
console.log('girl', GIRL.w, GIRL.h, Object.keys(GIRL.palette).length, 'colours; case', CASE.w, CASE.h, Object.keys(CASE.palette).length);
