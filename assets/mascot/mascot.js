// Sanskriti pixel mascot.
// A 40×40 pixel sprite built from simple shapes, so poses and frames stay consistent.
// Framework-free: buildFrame() returns a grid of palette keys, toSVG() turns it into crisp SVG.

export const SIZE = 40;

export const PALETTE = {
  K: '#1c110d', // outline
  H: '#3a2520', // hair
  h: '#6a4434', // hair highlight
  S: '#c98d68', // skin
  s: '#ad7352', // skin shadow
  B: '#de7c6c', // blush
  E: '#22140f', // eyes
  W: '#ffffff', // eye shine / egg white
  G: '#141414', // glasses frame
  g: '#c9dbe6', // glasses lens
  M: '#8a3b2f', // mouth
  R: '#c4303a', // red top
  r: '#9e242d', // red top shadow
  J: '#efe3cb', // cream jacket
  j: '#d6c3a2', // jacket shadow
  O: '#f4efe6', // bowl
  o: '#d9d1c3', // bowl shadow
  P: '#c4303a', // bowl pattern
  Y: '#e2a24c', // broth
  N: '#f5d98a', // noodles
  n: '#2f4a2c', // nori
  Z: '#f0b63c', // egg yolk
  C: '#cf9c63', // chopsticks (light wood, so they show against the hair)
  w: '#c3bdb4', // steam
  Q: '#fbf8f1', // paper
  q: '#9a948a', // pencil marks / text lines
  y: '#f2c14e', // pencil body
  T: '#3a2a22', // pencil tip / book spine
  L: '#3b6ea8', // book cover
  l: '#2c5585', // book cover shadow
  p: '#e98aa0', // eraser
};

const blank = () => Array.from({ length: SIZE }, () => Array(SIZE).fill('.'));
const inside = (x, y) => x >= 0 && x < SIZE && y >= 0 && y < SIZE;
const set = (g, x, y, c) => { if (inside(x, y)) g[y][x] = c; };
const get = (g, x, y) => (inside(x, y) ? g[y][x] : '.');
const pts = (g, list, c) => list.forEach(([x, y]) => set(g, x, y, c));
const rect = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) set(g, i, j, c); };
const ellipse = (g, cx, cy, rx, ry, c, clip = () => true) => {
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
    if (dx * dx + dy * dy <= 1 && clip(x, y)) set(g, x, y, c);
  }
};
const line = (g, x0, y0, x1, y1, c) => {
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    set(g, x0, y0, c);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
};
// 1px outer outline around everything drawn so far.
const outline = (g) => {
  const out = g.map((r) => r.slice());
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    if (g[y][x] !== '.') continue;
    const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const v = get(g, x + dx, y + dy); return v !== '.' && v !== 'w'; });
    if (n) out[y][x] = 'K';
  }
  return out;
};

// ---------- body parts ----------

// left edge of the hair silhouette per row (mirrored on the right) — wavy, flaring out
const HAIR_EDGE = { 12: 8, 13: 7, 14: 7, 15: 7, 16: 6, 17: 6, 18: 7, 19: 6, 20: 5, 21: 6, 22: 6, 23: 5, 24: 5, 25: 6, 26: 5, 27: 4, 28: 5, 29: 5, 30: 4, 31: 5, 32: 6, 33: 6, 34: 8 };

function backHair(g) {
  ellipse(g, 20, 13, 12.5, 10, 'H');
  for (const [y, l] of Object.entries(HAIR_EDGE)) {
    const yy = +y, r = 39 - l + (yy % 3 === 0 ? 1 : 0);
    rect(g, l, yy, r - l + 1, 1, 'H');
  }
  // ragged ends
  pts(g, [[7, 35], [9, 35], [31, 35], [33, 35]], 'H');
}

function torso(g) {
  ellipse(g, 20, 39, 13, 12, 'J', (x, y) => y >= 27);
  rect(g, 18, 23, 5, 5, 's'); // neck
  // red top with a square neckline
  rect(g, 16, 28, 9, 12, 'R');
  rect(g, 18, 27, 5, 2, 'S');
  pts(g, [[16, 28], [24, 28]], 'J');
  rect(g, 23, 30, 2, 10, 'r');
  // jacket lapels
  line(g, 15, 28, 12, 39, 'j');
  line(g, 25, 28, 28, 39, 'j');
  line(g, 31, 31, 32, 39, 'j');
}

function frontHair(g) {
  for (let y = 24; y <= 35; y++) {
    const wave = [0, 1, 1, 0][(y + 1) % 4];
    const end = y > 32 ? (y - 32) : 0;
    rect(g, 9 + wave + end, y, 4 - end, 1, 'H');
    rect(g, 27 + end, y, 4 - wave - end, 1, 'H');
  }
  pts(g, [[10, 27], [11, 30], [28, 28], [29, 31]], 'h');
}

function face(g) {
  ellipse(g, 20, 17.5, 9, 8, 'S');
  // jaw shading
  pts(g, [[15, 24], [16, 25], [17, 25], [23, 25], [24, 25], [25, 24]], 's');
}

function bangs(g) {
  ellipse(g, 20, 9, 11, 3.6, 'H');
  // parted slightly left: hair sweeps down on both sides, a sliver of forehead shows
  const left = { 11: [11, 18], 12: [11, 16], 13: [11, 14], 14: [11, 13] };
  const right = { 11: [21, 29], 12: [23, 29], 13: [25, 29], 14: [26, 29], 15: [27, 29] };
  for (const [y, [a, b]] of Object.entries(left)) rect(g, a, +y, b - a + 1, 1, 'H');
  for (const [y, [a, b]] of Object.entries(right)) rect(g, a, +y, b - a + 1, 1, 'H');
  // strands framing the face
  for (let y = 15; y <= 23; y++) { set(g, 11, y, 'H'); set(g, 29, y, 'H'); }
  pts(g, [[12, 15], [12, 16], [28, 16], [28, 17], [12, 22], [28, 21]], 'H');
  // highlights
  pts(g, [[14, 6], [15, 6], [16, 6], [13, 7], [23, 6], [24, 6], [25, 7], [13, 11], [14, 12], [26, 12], [27, 13], [7, 20], [6, 27], [33, 22], [34, 28]], 'h');
}

function glasses(g) {
  // pushed up on the head
  rect(g, 12, 4, 7, 4, 'G'); rect(g, 13, 5, 5, 2, 'g');
  rect(g, 22, 4, 7, 4, 'G'); rect(g, 23, 5, 5, 2, 'g');
  rect(g, 19, 5, 3, 1, 'G');
  pts(g, [[10, 6], [11, 6], [29, 6], [30, 6]], 'G');
  pts(g, [[13, 5], [23, 5]], 'W');
}

function eyes(g, mode) {
  const L = 14, R = 24; // left x of each 3px-wide eye
  if (mode === 'blink') { rect(g, L, 18, 3, 1, 'E'); rect(g, R, 18, 3, 1, 'E'); return; }
  if (mode === 'down') {
    // lids lowered, looking at what she's holding
    rect(g, L, 18, 3, 1, 'E'); rect(g, L + 1, 19, 2, 1, 'E');
    rect(g, R, 18, 3, 1, 'E'); rect(g, R, 19, 2, 1, 'E');
    return;
  }
  if (mode === 'happy') {
    pts(g, [[L, 18], [L + 1, 17], [L + 2, 18], [R, 18], [R + 1, 17], [R + 2, 18]], 'E');
    return;
  }
  for (const x of [L, R]) {
    rect(g, x, 16, 3, 3, 'E');
    set(g, x, 16, 'S');
    set(g, x + 1, 16, 'W');
  }
}

function cheeks(g) {
  pts(g, [[13, 20], [14, 20], [13, 21], [26, 20], [27, 20], [27, 21]], 'B');
  set(g, 20, 20, 's'); // nose
}

function mouth(g, mode) {
  if (mode === 'open') { rect(g, 19, 22, 3, 2, 'M'); set(g, 20, 23, 'B'); return; }
  if (mode === 'flat') { pts(g, [[19, 22], [20, 23], [21, 22]], 'M'); return; }
  pts(g, [[18, 22], [19, 23], [20, 23], [21, 23], [22, 22]], 'M');
}

function hand(g, x, y) {
  rect(g, x, y, 3, 3, 'S');
  set(g, x + 2, y + 2, 's');
}

// ---------- props ----------

function ramen(g, f) {
  const lift = f % 4 === 1 || f % 4 === 2;
  // bowl
  ellipse(g, 20, 37, 10, 6.5, 'O', (x, y) => y >= 32);
  ellipse(g, 20, 32, 10, 2.6, 'O');
  ellipse(g, 20, 32, 8.4, 1.7, 'Y');
  for (let x = 11; x <= 29; x++) if (get(g, x, 35) === 'O') set(g, x, 35, 'P');
  for (let y = 33; y <= 39; y++) for (let x = 25; x <= 30; x++) if (get(g, x, y) === 'O') set(g, x, y, 'o');
  // noodles, egg, nori
  pts(g, [[14, 32], [15, 31], [16, 32], [17, 31], [18, 32], [20, 32], [21, 31]], 'N');
  pts(g, [[23, 31], [24, 31], [23, 32]], 'W'); pts(g, [[24, 32]], 'Z');
  rect(g, 26, 30, 2, 2, 'n');
  // hands holding the bowl
  hand(g, 9, 32); hand(g, 29, 33);
  // chopsticks: resting in the bowl, or lifting noodles to the mouth
  if (lift) {
    // noodles hang from the chopstick tips down to the bowl
    line(g, 30, 32, 24, 25, 'C'); line(g, 31, 32, 25, 25, 'C');
    pts(g, [[23, 25], [22, 26], [23, 27], [22, 28], [23, 29], [22, 30], [21, 26], [20, 27], [21, 28], [20, 29], [21, 30]], 'N');
  } else {
    line(g, 30, 33, 25, 28, 'C'); line(g, 31, 33, 26, 28, 'C');
  }
}

// steam curls rising beside her, outside the hair so it reads clearly
function steam(g, f) {
  const s = f % 2;
  const curl = (x, y) => (s ? [[x, y], [x - 1, y - 1], [x - 1, y - 2], [x, y - 3], [x, y - 4]] : [[x - 1, y], [x, y - 1], [x, y - 2], [x - 1, y - 3], [x - 1, y - 4]]);
  pts(g, curl(3, 31), 'w'); pts(g, curl(37, 29), 'w');
}

const FUJI = [
  [16, 36], [17, 35], [18, 34], [19, 33], [20, 33], [21, 34], [22, 35], [23, 36], // mountain
  [18, 33], [21, 33], // snow cap edge
  [14, 31], [15, 31], [16, 32], // cloud
  [24, 31], // sun
];

function drawing(g, f) {
  // sketchbook, slightly tilted toward us
  rect(g, 10, 29, 17, 10, 'Q');
  for (let x = 11; x <= 25; x += 2) set(g, x, 29, 'T'); // spiral binding
  // the doodle appears stroke by stroke
  const shown = Math.min(FUJI.length, 4 + (f % 8) * 2);
  pts(g, FUJI.slice(0, shown), 'q');
  // left hand holds the book, right hand draws
  hand(g, 8, 33);
  const tip = [[17, 35], [19, 33], [21, 34], [23, 36]][f % 4];
  const [tx, ty] = tip;
  line(g, tx + 1, ty - 1, tx + 6, ty - 6, 'y');
  set(g, tx, ty, 'T');
  pts(g, [[tx + 7, ty - 7], [tx + 6, ty - 7]], 'p');
  hand(g, tx + 3, ty - 3);
}

function reading(g, f) {
  const flip = f % 6 === 3;
  // open book: cover, two pages, spine
  rect(g, 9, 30, 23, 9, 'L');
  rect(g, 10, 30, 10, 8, 'Q'); rect(g, 21, 30, 10, 8, 'Q');
  rect(g, 20, 30, 1, 9, 'T');
  for (let y = 32; y <= 36; y += 2) { rect(g, 11, y, 7, 1, 'q'); rect(g, 22, y, 7, 1, 'q'); }
  rect(g, 9, 38, 23, 1, 'l');
  if (flip) {
    // a page mid-turn
    pts(g, [[21, 29], [22, 28], [23, 27], [24, 27], [25, 28], [21, 28], [22, 27]], 'Q');
    rect(g, 22, 29, 4, 1, 'Q');
  }
  hand(g, 7, 33); hand(g, 31, 33);
}

// ---------- frames ----------

export const ACTIVITIES = {
  ramen: { label: 'eating ramen', frames: 8, speed: 260 },
  drawing: { label: 'drawing', frames: 16, speed: 220 },
  reading: { label: 'reading', frames: 12, speed: 380 },
};

export function buildFrame(activity = 'ramen', f = 0, { blink = false } = {}) {
  const g = blank();
  backHair(g);
  torso(g);
  frontHair(g);
  face(g);
  bangs(g);
  glasses(g);
  cheeks(g);

  const lift = activity === 'ramen' && (f % 4 === 1 || f % 4 === 2);
  const eyeMode = blink ? 'blink' : activity === 'ramen' ? (lift ? 'happy' : 'open') : 'down';
  eyes(g, eyeMode);
  mouth(g, activity === 'ramen' ? (lift ? 'open' : 'smile') : activity === 'drawing' ? 'flat' : 'smile');

  if (activity === 'ramen') ramen(g, f);
  if (activity === 'drawing') drawing(g, f);
  if (activity === 'reading') reading(g, f);

  const out = outline(g);
  if (activity === 'ramen') steam(out, f);
  return out;
}

export function toSVG(grid, scale = 8) {
  let rects = '';
  for (let y = 0; y < SIZE; y++) {
    let x = 0;
    while (x < SIZE) {
      const c = grid[y][x];
      if (c === '.') { x++; continue; }
      let run = 1;
      while (x + run < SIZE && grid[y][x + run] === c) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETTE[c] || '#f0f'}"/>`;
      x += run;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE * scale}" height="${SIZE * scale}" shape-rendering="crispEdges" role="img" aria-label="Pixel-art Sanskriti">${rects}</svg>`;
}
