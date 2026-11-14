// Stamp accent: pixel-art stamps with an embossed "S", in the same chunky style and palette as the mascot.
// Three versions to choose from: a postage stamp, a wax seal and a hanko (Japanese name seal).
// buildStamp(kind) returns a grid of palette keys; toSVG(grid, size) renders crisp SVG.

export const PALETTE = {
  a: '#251513', // outline (same as the mascot)
  p: '#fdf3e4', // paper
  q: '#f1dcbc', // paper shadow
  r: '#9d2e30', // red (her top)
  R: '#b8403e', // red, lighter
  d: '#6e1d20', // red, dark
  h: '#d9665c', // red highlight
  g: '#a25a0c', // gold (the sparkles)
  G: '#c98a3a', // gold, light
  w: '#fffaf2', // white
  i: '#c74a45', // hanko ink
  I: '#a8333a', // hanko ink, darker speckle
};

// a bold pixel "S", 10 × 12
const S = [
  '..######..',
  '.########.',
  '###....###',
  '###.......',
  '###.......',
  '.#######..',
  '..#######.',
  '.......###',
  '.......###',
  '###....###',
  '.########.',
  '..######..',
];

const blank = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const inside = (g, x, y) => y >= 0 && y < g.length && x >= 0 && x < g[0].length;
const set = (g, x, y, c) => { if (inside(g, x, y)) g[y][x] = c; };
const get = (g, x, y) => (inside(g, x, y) ? g[y][x] : '.');
const rect = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) set(g, i, j, c); };
const disc = (g, cx, cy, r, c, test = () => true) => {
  for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) {
    const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
    if (dx * dx + dy * dy <= r * r && test(x, y)) set(g, x, y, c);
  }
};
const outline = (g, c = 'a') => {
  const src = g.map((r) => r.slice());
  for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) {
    if (src[y][x] !== '.') continue;
    if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (src[y + dy]?.[x + dx] ?? '.') !== '.')) g[y][x] = c;
  }
};

// Raised letter: the face in `face`, a highlight along its top-left edges, a cast shadow down-right.
function embossS(g, ox, oy, face, light, shadow) {
  const on = (x, y) => S[y]?.[x] === '#';
  for (let y = 0; y < S.length; y++) for (let x = 0; x < S[0].length; x++) {
    if (on(x, y)) continue;
    if (on(x - 1, y - 1) || on(x - 1, y) || on(x, y - 1)) set(g, ox + x, oy + y, shadow);
  }
  for (let y = 0; y < S.length; y++) for (let x = 0; x < S[0].length; x++) {
    if (!on(x, y)) continue;
    set(g, ox + x, oy + y, !on(x, y - 1) ? light : face); // light catches the top edges only
  }
}

// Pressed-in letter (for the hanko, where the S is carved out of the ink)
function carveS(g, ox, oy, paper) {
  for (let y = 0; y < S.length; y++) for (let x = 0; x < S[0].length; x++) if (S[y][x] === '#') set(g, ox + x, oy + y, paper);
}

// ---------- 1. postage stamp ----------
function postage() {
  const W = 30, H = 36, g = blank(W, H);
  rect(g, 1, 1, W - 2, H - 2, 'p');
  // inner red panel with a fine frame
  rect(g, 4, 4, W - 8, H - 8, 'a');
  rect(g, 5, 5, W - 10, H - 10, 'r');
  rect(g, 6, 6, W - 12, 1, 'R'); rect(g, 6, 6, 1, H - 13, 'R');
  rect(g, 6, H - 7, W - 12, 1, 'd'); rect(g, W - 7, 7, 1, H - 13, 'd');
  embossS(g, 10, 11, 'R', 'h', 'd');
  // a tiny gold value mark in the corner
  set(g, W - 9, H - 9, 'G'); set(g, W - 10, H - 9, 'g');
  outline(g);
  // perforated edge: round bites every 3 px (outline pixel removed, a dark notch just inside)
  for (let x = 3; x < W - 2; x += 3) { set(g, x, 0, '.'); set(g, x, 1, 'a'); set(g, x, H - 1, '.'); set(g, x, H - 2, 'a'); }
  for (let y = 3; y < H - 2; y += 3) { set(g, 0, y, '.'); set(g, 1, y, 'a'); set(g, W - 1, y, '.'); set(g, W - 2, y, 'a'); }
  // soft paper shadow, bottom-right
  for (let y = 2; y < H; y++) for (let x = 2; x < W; x++) if (g[y][x] === '.' && g[y - 1][x - 1] !== '.' && g[y - 1][x - 1] !== 'q') g[y][x] = 'q';
  return g;
}

// ---------- 2. wax seal ----------
function wax() {
  const W = 34, H = 34, g = blank(W, H), c = 17;
  // irregular blob: a circle with a few drips and bulges
  disc(g, c, c, 14, 'r');
  [[5, 9, 3], [28, 7, 3], [30, 22, 3.5], [8, 27, 3], [18, 31, 2.5], [3, 18, 2.5]].forEach(([x, y, r]) => disc(g, x, y, r, 'r'));
  // shading: lighter top-left, darker bottom-right of the blob
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x] === 'r') {
    const t = (x - c) + (y - c);
    if (t < -16) g[y][x] = 'R'; else if (t > 16) g[y][x] = 'd';
  }
  // pressed ring
  disc(g, c, c, 10.5, 'd', (x, y) => { const d = Math.hypot(x + 0.5 - c, y + 0.5 - c); return d > 9.6; });
  disc(g, c, c, 9.6, 'r');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x] === 'r' && Math.hypot(x + 0.5 - c, y + 0.5 - c) < 9.6 && x + y < 2 * c - 9) g[y][x] = 'R';
  embossS(g, 12, 11, 'R', 'h', 'd');
  // a glossy glint
  set(g, 9, 7, 'w'); set(g, 10, 7, 'h'); set(g, 8, 8, 'h');
  outline(g);
  return g;
}

// ---------- 3. hanko (name seal impression) ----------
function hanko() {
  const W = 30, H = 30, g = blank(W, H), c = 15;
  disc(g, c, c, 13.5, 'i');
  disc(g, c, c, 11.6, 'p');
  disc(g, c, c, 10.4, 'i');
  carveS(g, 10, 9, 'p');
  // uneven ink: a few darker speckles and dry gaps, like a real stamp
  [[6, 9], [22, 6], [24, 19], [8, 21], [15, 3], [27, 14], [4, 15], [19, 26]].forEach(([x, y]) => g[y][x] === 'i' && set(g, x, y, 'I'));
  [[5, 12], [23, 23], [13, 27], [26, 10], [17, 5]].forEach(([x, y]) => g[y][x] === 'i' && set(g, x, y, 'p'));
  return g;
}

export const STAMPS = {
  postage: { label: 'Postage stamp', build: postage },
  wax: { label: 'Wax seal', build: wax },
  hanko: { label: 'Hanko seal', build: hanko },
};

export const buildStamp = (kind) => STAMPS[kind].build();

export function toSVG(grid, size = 160) {
  const H = grid.length, W = grid[0].length;
  let rects = '';
  for (let y = 0; y < H; y++) {
    let x = 0;
    while (x < W) {
      const c = grid[y][x];
      if (c === '.') { x++; continue; }
      let run = 1;
      while (x + run < W && grid[y][x + run] === c) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETTE[c]}"/>`;
      x += run;
    }
  }
  const scale = size / Math.max(W, H);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${Math.round(W * scale)}" height="${Math.round(H * scale)}" shape-rendering="crispEdges" role="img" aria-label="Stamp with an embossed S">${rects}</svg>`;
}
