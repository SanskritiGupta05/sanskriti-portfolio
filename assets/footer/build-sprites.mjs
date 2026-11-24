// Builds the footer's pixel sprites (pixel Sanskriti resting her chin on her hands, and her
// travel suitcase) from Sanskriti's footer reference. Its pixel grid isn't regular (it drifts by up
// to ~1.5 px between areas), so the cells are found by extract-adaptive.mjs, which cuts on the real
// pixel edges instead of a fixed grid (used for the suitcase; the girl looked best on the regular grid):
//   node assets/mascot/tools/extract.mjs explorations/_ref/footer-ref.png 3.5 3.5 322 196 99 90 assets/footer/girl.raw.json  (girl: regular grid)
//   node assets/footer/extract-adaptive.mjs explorations/_ref/footer-ref.png 1268 348 1414 510 2 4 assets/footer/case.raw.json 0.75
// then: node assets/footer/build-sprites.mjs  →  assets/footer/sprites.js
// Cleaning only removes things that aren't part of the sprite (the cherry branch, background specks,
// sushi in front) and snaps colours to the home mascot's palette; no pixel of her or the bag is redrawn.
import { readFileSync, writeFileSync } from 'node:fs';
import { PALETTE, buildFrame } from '../mascot/mascot.js';

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
// a lone pixel whose four neighbours all share one other colour takes that colour
// (texture noise from the reference; pixel art keeps flat areas flat)
const smooth = (g) => {
  const H = g.length, W = g[0].length, out = g.map((r) => [...r]);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const n = [g[y - 1][x], g[y + 1][x], g[y][x - 1], g[y][x + 1]];
    if (g[y][x] !== '.' && n[0] !== '.' && n.every((c) => c === n[0]) && n[0] !== g[y][x]) out[y][x] = n[0];
  }
  for (let y = 0; y < H; y++) g[y] = out[y];
};
// grey anti-aliasing on an outer edge becomes the solid outline
const solidEdge = (g) => {
  const H = g.length, W = g[0].length, empty = (y, x) => y < 0 || y >= H || x < 0 || x >= W || g[y][x] === '.';
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
    if ('gjrp'.includes(g[y][x]) && (empty(y - 1, x) || empty(y + 1, x) || empty(y, x - 1) || empty(y, x + 1))) g[y][x] = 'a';
};
const pal = (raw, layers) => {
  const all = { ...PALETTE, ...raw.newColours }, used = {};
  for (const l of layers) for (const r of l) for (const c of r) if (c !== '.') used[c] = all[c];
  return used;
};
const rows = (g) => g.map((r) => r.join(''));

// --- pixel Sanskriti, chin on her hands, with her heart mug ---
// Read on the regular 3.5 px grid (her pick: this version, with home colours and hair shades, looked
// best; the adaptive re-read and the hair clean-up were rolled back for her).
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
// Open eyes, shown now and then: the home coffee pose's own open eyes (7×7, read from her reference),
// copied pixel for pixel over the closed ^ ^ arcs. A separate layer, so her picked sprite is untouched:
// the arcs' area is painted skin ('e') and the home eye pixels go on top.
const home = buildFrame('coffee', 0); // the reference eyes are open on frame 0
const eyes = girl.map((r) => r.map(() => '.'));
for (const [arc, homeBox] of [
  [{ x0: 41, x1: 47 }, { x0: 19, x1: 25, cx: 44 }], // left eye: home x19–25 → centred on the left arc (col 44)
  [{ x0: 59, x1: 65 }, { x0: 33, x1: 39, cx: 62 }], // right eye: home x33–39 → centred on the right arc (col 62)
]) {
  for (let y = 44; y <= 48; y++) for (let x = arc.x0; x <= arc.x1; x++) if (girl[y][x] !== 'e' && girl[y][x] !== 'k') eyes[y][x] = 'e';
  const dx = homeBox.cx - (homeBox.x0 + homeBox.x1) / 2;
  for (let y = 23; y <= 29; y++) for (let x = homeBox.x0; x <= homeBox.x1; x++) {
    const c = home[y][x];
    if ('aqngb'.includes(c)) eyes[y + 20][Math.round(x + dx)] = c; // home rows 23–29 → footer rows 43–49
  }
}

// Sparkles: four-point stars (✦, curved-in sides, a bright centre) drawn here in place of the reference's
// plain crosses, at the same two spots. G = the home sparkle gold, = = its light gold. Two layers so
// they can twinkle in turn.
const STAR_BIG = [
  '.....G.....',
  '.....G.....',
  '....GGG....',
  '....GGG....',
  '...GG=GG...',
  'GGGG===GGGG',
  '...GG=GG...',
  '....GGG....',
  '....GGG....',
  '.....G.....',
  '.....G.....',
];
const STAR_SMALL = ['...G...', '...G...', '..GGG..', 'GGG=GGG', '..GGG..', '...G...', '...G...'];
const star = (cx, cy, art) => {
  const l = girl.map((r) => r.map(() => '.'));
  const h = (art.length - 1) / 2;
  art.forEach((row, y) => [...row].forEach((c, x) => { if (c !== '.') l[cy - h + y][cx - h + x] = c; }));
  return l;
};
const sparkleBig = star(21, 27, STAR_BIG);
const sparkleSmall = star(15, 36, STAR_SMALL);

// the reference's speech bubble is taken out of her (and still counts in the hair grading above) but not
// exported: the footer draws its own crisp bubble that cycles through her socials
const GIRL = {
  w: girl[0].length,
  h: girl.length,
  palette: pal(girlRaw, [girl, steam, eyes, sparkleBig, sparkleSmall]),
  body: rows(girl),
  eyes: rows(eyes),
  sparkleBig: rows(sparkleBig),
  sparkleSmall: rows(sparkleSmall),
  steam: rows(steam),
};

// --- the travel suitcase, with four stickers that peel off ---
const caseRaw = load('./case.raw.json');
let bag = toCells(caseRaw.grid).slice(0, 51); // rows 51+ are sushi rolls in front of it
bag[0] = bag[0].map(() => '.');
blank(bag, 0, 10, 36, 45); // background specks right of the handle
// rows 49–50: sushi in front of the bottom-left corner; fill with the case's own outline and body
for (const y of [49, 50]) for (let x = 0; x <= 21; x++) bag[y][x] = x === 0 ? '.' : x === 1 ? 'a' : 'n';
bag.push(bag[0].map((_, x) => (x >= 1 && x <= 45 ? 'a' : '.'))); // close the bottom edge
bag = despeck(bag);
defringe(bag, { ...PALETTE, ...caseRaw.newColours });
const BODY = new Set(['n', 'b', 'q', 'e', 'Á', '.']);
// each sticker: its rectangle; the sticker is everything between its first and last non-case pixel on each row
const STICKERS = { cat: [23, 34, 6, 18], torii: [27, 37, 22, 32], fox: [38, 47, 5, 17], sakura: [42, 50, 21, 32] };
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
  smooth(bag); solidEdge(bag);
  Object.values(stickers).forEach((st, i) => { st.rows = rows(layers[i + 1]); });
}
const CASE = { w: bag[0].length, h: bag.length, palette: pal(caseRaw, [bag, ...Object.values(stickers).map((s) => toCells(s.rows))]), body: rows(bag), stickers };

writeFileSync(new URL('./sprites.js', import.meta.url), `// Generated by build-sprites.mjs from Sanskriti's footer reference. Do not edit by hand.\n// Grids of palette keys ('.' = empty); every layer is the full size of its sprite.\nexport const GIRL = ${JSON.stringify(GIRL)};\nexport const CASE = ${JSON.stringify(CASE)};\n`);
console.log('girl', GIRL.w, GIRL.h, Object.keys(GIRL.palette).length, 'colours; case', CASE.w, CASE.h, Object.keys(CASE.palette).length);
