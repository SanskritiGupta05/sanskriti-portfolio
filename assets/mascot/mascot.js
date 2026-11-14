// Sanskriti pixel mascot (v3).
// The base sprite is read pixel-for-pixel from Sanskriti's chosen reference (cup of coffee pose),
// so she looks exactly like it. Other activities swap the mug for a new prop and change
// the eyes/mouth; sparkles, steam and blinks are animated in code.
// Framework-free: buildFrame() returns a grid of palette keys, toSVG() turns it into crisp SVG.

export const SIZE = 64;

export const PALETTE = {
  // from the reference
  a: '#251513', // outline
  t: '#402b2b', // hair
  i: '#583c3b', // hair highlight
  r: '#86574e', // hair light streak
  p: '#9a665a', // hair lightest streak
  e: '#fdc69f', // skin
  o: '#e3a784', // skin shadow
  k: '#f08f66', // blush
  d: '#9d2e30', // red top / mouth
  s: '#551518', // red shadow
  m: '#712923', // coffee
  b: '#fde7c9', // cardigan / mug
  n: '#f8ddbe', // cardigan light
  c: '#cc8c6a', // cardigan creases
  l: '#b25b3e', // warm accent
  q: '#fbead9', // eye shine / steam
  j: '#dbd0c7', // steam shadow
  g: '#aa9b8d', // grey accent
  // added for props
  G: '#a25a0c', // sparkle gold
  O: '#f6f0e5', // bowl
  P: '#dcd2c2', // bowl shadow
  Y: '#e5a54e', // broth
  N: '#f6dc8e', // noodles
  Z: '#f2b43a', // egg yolk
  W: '#ffffff', // egg white / page
  U: '#2f4a2c', // nori
  C: '#cf9c63', // chopsticks
  X: '#8f877c', // pencil marks / text lines
  Q: '#fbf6ec', // paper
  y: '#f2c14e', // pencil
  T: '#3a2a22', // pencil tip / spine
  L: '#3b6ea8', // book cover
  V: '#2c5585', // book cover shadow
  E: '#e98aa0', // eraser
};

// 64×64, read from the reference image (one letter per pixel, '.' = transparent)
const BASE = [
  '................................................................',
  '................................................................',
  '.................................aaaaa..........................',
  '..........................aaaaaaaiiiiiaa........................',
  '........................aatiitttttaatitta.......................',
  '.......................aatitttaaataaaatta.......................',
  '....................gaaaittttttaaaaaaaataatii...................',
  '....................aaiittaaaaaaaaataaaaaaaaaa..................',
  '..................aaarittaaattttaaaaaaaaatiiaaa.................',
  '.................aappittattttttttaaatttttttttiaa................',
  '................aarppttattttttaaaaatttttttttttiaa...............',
  '...............aaippptttitttaaaaaatttttaattttttiat..............',
  '..............aatrrtttipptiiaaaaataaattttaattttppaq.............',
  '..............aarrtttrpprriaaceeelaaaattttattttpitq.............',
  '..............arrrtatrtttptakeeeeeoaaatttttatppttia.............',
  '.............arrrtttttttttaaeeeeeeekaatttttaatttttaa............',
  '.............arrttattttattaaeeeeeeekarttttttatttttta............',
  '............atittatttttattaaeeeeeeeearprttttaattttta............',
  '............aitaaattttaattakeeeeeeeekapppptttaatttiaa...........',
  '...........aataaattttaaattaeeeeeeaaaaaippptttaattttiai..........',
  '..........aataaatttttaaataceeeeeeeeecattraatttaatttiaa..........',
  '.........aataaattttitaalaaeeeeeeeeeeeaatitatttaaaattaaa.........',
  '........aa.aaaatttiiaalaakeeeeeeeeeeekaaitattttaaattaaaa........',
  '........aaaattttiiiaaaaaaeeeeeeeetaaaaaaittattttaaaaaa.aa.......',
  '........aaiitttiiiaaannaaaeeeeeeeaaanpaatittatttttaaaa.aa.......',
  '......aairpiiiiiaaaagqqaaaeeeeeeeaaaqqaaaiittaattttaaa.aa.......',
  '......aarpiitaaaaacabqqaaaeeeeeeeaaaqqqaaaiittaattttaaaaa.......',
  '.....aarriiaaaaaaaaaqqqaaaeeeeeeeaaaqqqbaaaaiiiiiitttaaa........',
  '.....arraaaaattaaakknqqaaaeeeeeeeaaaqqqkkkaaaaaaiiiiaaat........',
  '.....arraaaattaaaakekbqaaeeeeeeeeaaqqqkkekataaaaaaiiiaa.........',
  '.....araaaattaaaaaekkkkeeeeeeeeeeeeekkkkkeeakkkcaaaiiia.........',
  '.....ataaattaaaaaakkkkkeeeedeeedeeeekkkkkekrklecaaaatiaa........',
  '......aqaattaatataaekkeeeeeodddeeeeeekkkeeaeeekaaaaatiaa........',
  '......a.tataattqqaaaeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaataa........',
  '......aaaataatqqaaaaaeeeeeeeeeeeeeeeeeeeaaaaaaaaataaataa........',
  '........qatattqqaaaaaaakeeeeeeeeeeeeeeaaaaaaaaaattaaata.........',
  '.........aaattqqqqaaaaaaaceeeeeeeekkaaaaattaataattaata..........',
  '....a...aaaattaaq.qaaaaaaaaaaaaaaaaaaaaatttaatatttaaaa..........',
  '...a..aaaaiitaattaqaaaataaaaaakkkkkaaatttttattatttaa............',
  '...a.aaarrrttaattqqaaattaaaaaakkkeeaatttttaattatttaa...ai.......',
  '...aaaarrittaattq.aaatttaaaaakkeeeaaiititaaatttatttaaaaai.......',
  '...jaaiitttatttaaaaaaaaaannaeeeeeaaiiittaaaaatttatttttaa........',
  '....aaitttaattaabbbbbbaanbaaeeeeeatitttaabaaaatttatttaa.........',
  '....arttaaattaabommmmmnnabasaeeekaitataabbbaaattttitttaa........',
  '....aittaattaaabbbbbbbbbaaddaaaaaattatacbcctaaaitaiiiiiaa.......',
  '...aiitaaattaaaabbbbbbeoaaamdddddattatabncbbaaaiitaaiiiita......',
  '...aittaaataaeeabblblbeaeeeadddddattaanncbbbaaaaiiaaatiiiag.....',
  '...aata.jataeedabbdddbeameeeaddddaattancbbbbaaaattaaaaaiiia.....',
  '....att..ataeeeabbbdbbeaeeeeeaddddattaanbbbnoaaaataataaaiia.....',
  '.....ata..aaeelabbbbbbeaeeeeeadddattaabbbooonaaaataattaaiia.....',
  '......aaaaaaaeeaabbbbegaeeeeeaaaataaabcccbbbbaaattaattaaiia.....',
  '.........aaaaoeoaaaaaaaaoeeeklbbnaannccbbbbbbaaataatttaaia......',
  '....a...aaaabaamaacoaassaaokaobbcngacbbbbbbobbaaaaatttataa......',
  '.......aattabbaabbcbnasssaaacbbbcbbbabbbbbbobbaaaatttaaaa.......',
  '......aatttabbbbbbcbnadddaccbbbbcbbbbabbbbonbjaattttaaa.........',
  '....aaatttaaabbbocbbnadddanbbbbccbbbbbcoooobbaaattata...........',
  '....iatttaaaabbccebbaddddajbbbcebbbbbbccbbbbiaaattata...a.......',
  '.....atttaaabbccnbbbaddddmabbbcbbbbbbbccbbbbaaaattaaaqqja.......',
  '......aaaaaabbcbbbbaadddddaabbcbbbbbbbbcbbbaaaaaata.aaa.........',
  '........aaaaabcbbbbaaaaaaaaabbcbbbbbbbbbbbbaaaaaaaa.............',
  '............aaaaaaaa.......aaaaaaaaaaaaaaaaa....................',
  '................................................................',
  '................................................................',
  '................................................................',
];

// where things are in BASE
const EYE_L = { x0: 19, x1: 25, y0: 23, y1: 29 };
const EYE_R = { x0: 33, x1: 38, y0: 23, y1: 29 };
const STEAM = { x0: 5, x1: 19, y0: 31, y1: 41 };
const EYE_CHARS = 'aqngb';
const HAIR_CHARS = 'atirp';

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
const oEllipse = (g, cx, cy, rx, ry, c, clip) => { ellipse(g, cx, cy, rx + 1, ry + 1, 'a', clip); ellipse(g, cx, cy, rx, ry, c, clip); };
const oRect = (g, x, y, w, h, c) => { rect(g, x - 1, y - 1, w + 2, h + 2, 'a'); rect(g, x, y, w, h, c); };
const hand = (g, cx, cy) => { oEllipse(g, cx, cy, 2.6, 3.1, 'e'); set(g, Math.round(cx) + 1, Math.round(cy) + 2, 'o'); };

// ---------- face ----------

function clearEyes(g) {
  for (const b of [EYE_L, EYE_R]) for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) {
    if (EYE_CHARS.includes(get(g, x, y))) set(g, x, y, 'e');
  }
}

function eyes(g, mode) {
  if (mode === 'open') return; // the reference eyes
  clearEyes(g);
  for (const x0 of [19, 33]) {
    if (mode === 'blink') { rect(g, x0, 27, 6, 1, 'a'); continue; }
    if (mode === 'happy') { pts(g, [[x0, 27], [x0 + 1, 26], [x0 + 2, 25], [x0 + 3, 25], [x0 + 4, 26], [x0 + 5, 27]], 'a'); continue; }
    if (mode === 'down') { rect(g, x0, 27, 6, 1, 'a'); rect(g, x0 + 1, 28, 4, 1, 'a'); continue; }
  }
}

function mouth(g, mode) {
  if (mode === 'smile') return; // the reference smile
  pts(g, [[27, 31], [31, 31], [28, 32], [29, 32], [30, 32]], 'e');
  if (mode === 'open') { rect(g, 28, 31, 3, 2, 'd'); set(g, 29, 32, 's'); }
  if (mode === 'flat') rect(g, 28, 32, 3, 1, 'd');
}

// ---------- extras ----------

function removeSteam(g) {
  for (let y = STEAM.y0; y <= STEAM.y1; y++) for (let x = STEAM.x0; x <= STEAM.x1; x++) {
    if (!'qjg'.includes(get(g, x, y))) continue;
    const hairy = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => HAIR_CHARS.includes(get(g, x + dx, y + dy))).length;
    set(g, x, y, hairy >= 2 ? 't' : '.');
  }
}

// the steam rising from the mug drifts up and down by a pixel
function driftSteam(g, f) {
  if (f % 2 === 0) return;
  const moved = [];
  for (let y = STEAM.y0; y <= STEAM.y1; y++) for (let x = STEAM.x0; x <= STEAM.x1; x++) if ('qj'.includes(get(g, x, y))) moved.push([x, y, get(g, x, y)]);
  removeSteam(g);
  moved.forEach(([x, y, c]) => set(g, x, y - 1, c));
}

function sparkle(g, x, y, r, on) {
  if (!on) { set(g, x, y, 'G'); return; }
  for (let i = 1; i <= r; i++) pts(g, [[x + i, y], [x - i, y], [x, y + i], [x, y - i]], 'G');
}

function sparkles(g, f) {
  const t = f % 4;
  sparkle(g, 8, 11, 3, t !== 2);
  sparkle(g, 4, 18, 2, t !== 0);
  sparkle(g, 59, 33, 3, t !== 1);
}

function steamCurl(g, x, y, f) {
  const s = f % 2 ? 1 : 0;
  const curl = [[x + s, y], [x - 1 + s, y - 1], [x - 1 + s, y - 2], [x + s, y - 3], [x + 1 + s, y - 4], [x + 1 + s, y - 5], [x + s, y - 6]];
  pts(g, curl, 'q');
  curl.forEach(([cx, cy]) => [-1, 1].forEach((dx) => { if (get(g, cx + dx, cy) !== 'q') set(g, cx + dx, cy, 'a'); }));
}

// ---------- props (each one covers the mug and hands) ----------

function ramen(g, f) {
  const lift = f % 4 === 1 || f % 4 === 2;
  oEllipse(g, 20, 46, 13, 9, 'O', (x, y) => y >= 45);
  oEllipse(g, 20, 45, 13, 3.6, 'O');
  ellipse(g, 20, 45, 11.2, 2.4, 'Y');
  for (let x = 6; x <= 34; x++) if (get(g, x, 50) === 'O') set(g, x, 50, 'd');
  for (let y = 46; y < SIZE; y++) for (let x = 26; x <= 34; x++) if (get(g, x, y) === 'O') set(g, x, y, 'P');
  pts(g, [[11, 45], [12, 44], [13, 45], [14, 44], [15, 45], [16, 44], [17, 45], [19, 44], [20, 45]], 'N');
  rect(g, 22, 44, 3, 2, 'W'); set(g, 23, 44, 'Z');
  oRect(g, 27, 42, 3, 3, 'U');
  hand(g, 7, 49); hand(g, 34, 49);
  if (lift) {
    line(g, 34, 47, 30, 34, 'C'); line(g, 35, 47, 31, 34, 'C');
    for (let y = 35; y <= 44; y++) { set(g, 29 - (y % 2), y, 'N'); set(g, 27 + (y % 2), y, 'N'); }
  } else {
    line(g, 35, 48, 29, 39, 'C'); line(g, 36, 48, 30, 39, 'C');
    steamCurl(g, 13, 41, f); steamCurl(g, 18, 40, f + 1);
  }
}

const FUJI = [
  [11, 51], [12, 50], [13, 49], [14, 48], [15, 47], [16, 46], [17, 45], [18, 45], [19, 45], [20, 45],
  [21, 46], [22, 47], [23, 48], [24, 49], [25, 50], [26, 51],
  [16, 47], [17, 48], [18, 47], [19, 48], [20, 47], [21, 48],
  [25, 43], [26, 42], [27, 43], [26, 44],
];

function drawing(g, f) {
  oRect(g, 7, 41, 24, 13, 'Q');
  for (let x = 8; x <= 29; x += 2) set(g, x, 40, 'T');
  const shown = Math.min(FUJI.length, 6 + (f % 12) * 2);
  pts(g, FUJI.slice(0, shown), 'X');
  hand(g, 6, 49);
  // pencil held from the right, angled down so it never covers her face
  const [tx, ty] = FUJI[shown - 1];
  line(g, tx + 1, ty + 1, tx + 9, ty + 5, 'y');
  set(g, tx, ty, 'T');
  pts(g, [[tx + 10, ty + 5], [tx + 10, ty + 6], [tx + 9, ty + 6]], 'E');
  hand(g, tx + 6, ty + 4);
}

function reading(g, f) {
  const flip = f % 6 === 3;
  oRect(g, 5, 41, 35, 13, 'L');
  rect(g, 6, 41, 15, 11, 'W'); rect(g, 24, 41, 15, 11, 'W');
  rect(g, 21, 41, 3, 13, 'T');
  for (let y = 43; y <= 49; y += 2) { rect(g, 8, y, 11, 1, 'X'); rect(g, 26, y, 11, 1, 'X'); }
  rect(g, 5, 53, 35, 1, 'V');
  if (flip) for (let i = 0; i < 9; i++) rect(g, 24 + i, 40 - Math.round(Math.sin((i / 8) * Math.PI) * 4), 1, 2, 'W');
  hand(g, 4, 47); hand(g, 41, 47);
}

// ---------- frames ----------

export const ACTIVITIES = {
  coffee: { label: 'sipping coffee', frames: 8, speed: 360 },
  ramen: { label: 'eating ramen', frames: 8, speed: 260 },
  drawing: { label: 'drawing', frames: 24, speed: 200 },
  reading: { label: 'reading', frames: 12, speed: 380 },
};

export function buildFrame(activity = 'coffee', f = 0, { blink = false } = {}) {
  const g = BASE.map((r) => r.split(''));
  const lift = activity === 'ramen' && (f % 4 === 1 || f % 4 === 2);
  const sip = activity === 'coffee' && f % 8 === 5;

  if (activity === 'coffee') driftSteam(g, f);
  else removeSteam(g);

  const eyeMode = blink ? 'blink' : (lift || sip) ? 'happy' : (activity === 'drawing' || activity === 'reading') ? 'down' : 'open';
  eyes(g, eyeMode);
  mouth(g, lift ? 'open' : activity === 'drawing' ? 'flat' : 'smile');

  if (activity === 'ramen') ramen(g, f);
  if (activity === 'drawing') drawing(g, f);
  if (activity === 'reading') reading(g, f);

  sparkles(g, f);
  return g;
}

export function toSVG(grid, scale = 5) {
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
