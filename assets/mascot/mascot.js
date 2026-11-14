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
  // extra colours from the reading reference
  A: '#e7dad7', B: '#c08550', D: '#d7b392', F: '#b5aba7', H: '#6d3f35', I: '#e88056', J: '#ad7757', K: '#faac80',
  M: '#9b5321', R: '#b3896e', S: '#69615d', u: '#3f1815', v: '#5f2916', w: '#c09882', x: '#766e6a', z: '#ae7136',
  // extra colours from the ramen reference
  '%': '#9c5948', '&': '#efbd89', '*': '#e2c69e', '+': '#c56b27', '=': '#ffbc66', '?': '#66431f', '@': '#d8ad70', '^': '#df863c',
  '~': '#b55823', '<': '#907e35', '>': '#4d4020', '{': '#f18a85', '}': '#f26972', '|': '#fa8b2a', ';': '#7c7030', ':': '#f3a696',
  '!': '#c3bab9', $: '#ac4329', '#': '#ee7048',
  // extra colours from the drawing reference
  'À': '#ff9b71', 'Á': '#efd2ad', 'Â': '#e57232', 'Ã': '#eca568', 'Ä': '#8c6e74', 'Å': '#f29343', 'Æ': '#faa756', 'Ç': '#c54e36',
  'È': '#846c59', 'É': '#dd583e', 'Ê': '#de6656', 'Ë': '#a08695', 'Ì': '#d8c1b4', 'Í': '#e85662', 'Î': '#9f8068',
  // extra colours from the drawing reference (2× read)
  'Ā': '#301e1b', 'ā': '#502d27', 'Ă': '#61372e', 'ă': '#aea19c', 'Ą': '#905141', 'ą': '#804c3f', 'Ć': '#423937', 'ć': '#b45d05',
  'Ĉ': '#9b4907', 'ĉ': '#ea9378', 'Ċ': '#c37452', 'ċ': '#f98656', 'Č': '#ffbc92', 'č': '#491608', 'Ď': '#dd7447', 'ď': '#989089',
  'Đ': '#d9815f', 'đ': '#be9672', 'Ē': '#634e3a', 'ē': '#c2b49d', 'Ĕ': '#b86c48', 'ĕ': '#7c3a2a', 'Ė': '#824a27', 'ė': '#af4e35',
  'Ę': '#c3a58d', 'ę': '#ffd6af', 'Ě': '#92745e', 'ě': '#cfa382', 'Ĝ': '#9d5333', 'ĝ': '#d39c73', 'Ğ': '#d6baa2', 'ğ': '#c87f5e',
  'Ġ': '#9b7d80', 'ġ': '#ac3025', 'Ģ': '#675158', 'ģ': '#d66b2e', 'Ĥ': '#f4b272', 'ĥ': '#ca7b3a', 'Ħ': '#d19c46', 'ħ': '#1d1403',
  'Ĩ': '#311d0a', 'ĩ': '#472812', 'Ī': '#f9a147', 'ī': '#8a6649', 'Ĭ': '#78644f', 'ĭ': '#cd5546', 'Į': '#d27e50', 'į': '#e09162',
  'İ': '#c8b285', 'ı': '#8b7a49', 'Ĳ': '#a86548', 'ĳ': '#8c7786', 'Ĵ': '#773f1b', 'ĵ': '#e6766a', 'Ķ': '#682e09', 'ķ': '#532406',
  'ĸ': '#9e3f31', 'Ĺ': '#fe9781', 'ĺ': '#ffb8ae', 'Ļ': '#fb817c', 'ļ': '#c4663b', 'Ľ': '#7c2013', 'ľ': '#e17d7f', 'Ŀ': '#ffb0a0',
  'ŀ': '#c4aeac', 'Ł': '#ee6560', 'ł': '#eea379', 'Ń': '#e49251', 'ń': '#ffcdbd', 'Ņ': '#c34329', 'ņ': '#fec182', 'Ň': '#ba6a5c',
  'ň': '#ce796f', 'ŉ': '#ecccbc', 'Ŋ': '#de8370', 'ŋ': '#9c2e1b', 'Ō': '#9e7452', 'ō': '#ac937e', 'Ŏ': '#e69688', 'ŏ': '#e74c4f',
  'Ő': '#8c6060', 'ő': '#7e707c', 'Œ': '#9f8d73',
  0: '#5b4e4b', 1: '#ce6a47', 2: '#6d5b46', 3: '#8d402f', 4: '#882c24', 5: '#677c57', 6: '#7a8d60', 7: '#4d5f44', 8: '#3f4e3b', 9: '#8d9b63',
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

// grids can be different sizes (each pose keeps the resolution of its reference)
const inside = (g, x, y) => y >= 0 && y < g.length && x >= 0 && x < g[0].length;
const set = (g, x, y, c) => { if (inside(g, x, y)) g[y][x] = c; };
const get = (g, x, y) => (inside(g, x, y) ? g[y][x] : '.');
const pts = (g, list, c) => list.forEach(([x, y]) => set(g, x, y, c));
const rect = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) set(g, i, j, c); };
const ellipse = (g, cx, cy, rx, ry, c, clip = () => true) => {
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
    if (dx * dx + dy * dy <= 1 && clip(x, y)) set(g, x, y, c);
  }
};
const linePts = (x0, y0, x1, y1) => {
  const out = [];
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    out.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
  return out;
};
const line = (g, x0, y0, x1, y1, c) => pts(g, linePts(x0, y0, x1, y1), c);
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
  if (!on) return;
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

// ---------- ramen pose: its own exact sprite (from Sanskriti's ramen reference) ----------

// read cell by cell from the reference (11 screen px per art pixel), 97×92
const RAMEN = [
  '.................................................................................................',
  '.................................................................................................',
  '.................................................................................................',
  '.................................................................................................',
  '....................................................aaaaaaa......................................',
  '............................................aaaaaaaaaaaaaaaaaa...................................',
  '.........................................FXXaaaaaaaaHHHHHHtaaaF..................................',
  '........................................aaaaatttttttHHHHHHittaa..................................',
  '......................................TaaatiiitttttttaaaatittTa..................................',
  '.....................................aaaiiiitttaaaattttaaattttaa.................................',
  '..................................aaaaalHitttttaaaatttttaaatttaa.................................',
  '.................................aaaap%itttttaaaataaaattaaatttaaaaaT.............................',
  '................................aaa%%%tttttaaaaaaaaaaaataaaaaaaaaaaaa............................',
  '...............................aaa%%%ttttTaaaaaaaaaaaaaaaaaaaaTiiiiaaaa..........................',
  '..............................aaa%%%%tttaaaatttttaaaaaaaaaattttttiiiiaaa.........................',
  '..................G..........Taa%%%Htttaaattttttttaaaaaatttttttttttiiiuai........................',
  '..................G.........Faa%%%%tttaaTttttttttttaaautttttttttttttiiiaat.......................',
  '.................zDz........aau%%%%ttTatitttttaaattaaatttttttttttttttiiuaaF......................',
  '...............&cn.R&&.....aaTr%%%%HtuiiitttTaaaaataTttttttTuaTtttttttiiTaag.....................',
  '...............BB*.*BB.....aaH%%rr%%tiHitttTaaaaaauutttttttttTaTtttttttHHaaaF....................',
  '.................Gbz.......aa%%Httttt%%ttttaaaaaaaatttttttttttaattttttt%%uaaa....................',
  '..................G......0aa%%%tttt%%%%rHiaaaaaaaaataaattttttttaatttt%%%%%aaaj...................',
  '..................G......aat%%ttttt%%%%%%iaaaIeeeeIaaaaattttttttaat%%%%%%%taaa...................',
  '.........................aa%%%ttat%%%it%%aaIKeeeeeeeIaaatttttttttaat%%%t%iiaaa...................',
  '.........................aT%%ttaat%%ttt%%aakeeeeeeeeeaaatttttttttaattttttiiaaa...................',
  '............Gq..........aaH%ttuat%%ttttttaIeeeeeeeeeeIaa%tttttttttaattttttitaaa..................',
  '............Bc.........aaaHittaat%rttatttaIeeeeeeeeeeeaa%tttitttttaattttttitaaa..................',
  '..........qGDcG........aaiittaaTtttttatttaIeeeeeeeeeeeaa%%H%%%tttttaattttttiaaa..................',
  '............Gq........aauittaaattttttatttakeeeeeeeeeeeuar%%%%%tttttaaTttttttTaa..................',
  '............Bq......aaaaittaaaatttttaatttaeeeeeeeeee&eeat%%%%%tttttaaattttttiaaaO................',
  '..................xaaTaattaaaattttttaattaaeeeeeeeeaaaaaaa%%vt%TtttttaaaTttttiaaaa................',
  '..................aa..attaaaattttttaaattaaDeeeeee&ueeeeaai%ittatttttaaaatttttaaaaa...............',
  '................Oaa..aataaaatttttiaaaItaaeeeeeeeeeeeeeeIaaiittattttttaaaaatttaaaaaa..............',
  '................jaa..aaaaatttttiHiaaukTaIeeeeeeeeeeeeeeeaaiitttattttttaaaaattaaa.aaa.............',
  '.................aaa.aaaattttttiiaaakTaveeeeeeeeeeeeeeeeIaaiittaattttttaaaaataaa..aaa............',
  '.................aaaaaaTtttttiiiaaa1aaaaa*eeeeeeeeeaaaaaaaaiitttaattttttuaaaaaaa...aaO...........',
  '.................jaaaaHittttHiiaaaaaaaaaaaeeeeeeeeTaaaaaaaaaiitttaattttttTaaaaaaa..aaa...........',
  '................xtaT%%3iiiiiiiuaaaaannbaaaeeeeeeeeaaaabbnaaaTiiittTaauuttttuaaaaa..aaa...........',
  '...............iaam%%riiiiiitaaaaIaabbbaaa2eeeeeeeaaaabbbqaaauiitttTTuuttttttaaaaF.aaa...........',
  '..............aaaH%%%iitaaaaaaaaa3abbbbaaaieeeeeeeaaaabbbbgaaaaTiiiiiiiititTTtTaaaSuaa...........',
  '.............aaa%%%%%TaaaaaaaauaaaaPbbbaaaTeeeeeeeuaaubbbbbTaIaaaiiiiiiiiiiaattaaaaaa............',
  '............0aa%%%%aaaaaaaaattaaaavxbbbuuuTeeeeeeeeuuubbbbbTaaaaaaaaaaaiiiiiaaataaaa.............',
  '............aaa%%%aaaaaaT&&DtuaaaakkbbbuuuteeeeeeeeuuubbbbbvIkaauaaaaaaaaiiiiaaaaaa..............',
  '............aa%%%aaaaaattt**&aaaaaeekqbnuueeeeeeeeeiuuqbbkkkeeIataIIIIaaaaiiiiaaaaa..............',
  '............aa%%iaaaaatttT&&&aaaaaekkkKeeeeeeeeeeeeeeeeekkkkkeeaaaIlkkaaaaaiiiiaaaa..............',
  '............aatiaaaaatttT**&aaaaaaekkkkeeeeeeeeeeeeeeeekkkkkkeeaaK1l&kaaaaaaiiiua................',
  '............aaaiaaTaattt&*&aaaaaaa&kkkkeeeeeeeeeeeeeeeekkkkkkeeaa&&&eaaaaaaatiiiaa.....G.........',
  '.............aata.iattT**&aaaaaaaaa&kk&eeeeedeeee3eeeeeekkkkeeIaa&&&aaaaTtaaaiiiaa.....G.........',
  '..............aau.tatt&&&aaaaauaaaaeeeeeeeeee34d3eeeeeeeeeeeeeaaaaaaaaaattuaatiiaa....G.G........',
  '...............aaa.atti&*eaaaTuaaaaakeeeeeeeeM++Meeeeeeeeeeeeaaaaaaaaaaattuaatiiaa..GG...GG......',
  '................aaaaatt**&&*&TTaaaaaa+eeeeeevy==MeeeeeeeeeeIaaaaaataaaatttTaatiTaa....G.G........',
  '..................aaaattaaa&*iTaaaaaaaaaaaTu=++=MeeeeeeeeIaaaaaaTttaaaatttaaatiaaa.....G.........',
  '............taa....aaatttaaa*uaaeeeuau3====m=++=leeeekIaaaaaaaautttaaattttaattaaa......G.........',
  '...........aajT....aaTattaaaaaa&eeeea==uaau==++=aaaaaaaaaaaaaaattttaaatttaaataaa.................',
  '..........Taa.....aaataaaa?&=aee&aaaaa@====a=++=aaaaaIIIaaaaatttttaaattttaaaaaa...aaa............',
  '..........aa.....aaatta==&=&aeeeaeeeea=@aaaa=++=aaaIIIIIaaatttttttaaattttaaaaaa....aaa...........',
  '..........aaa..0aaatituaaaaaaeeeeeeeeaaaaaaa==y^aaaIIIIKaa%HtHittaaaattttaaaaaa0...aaa...........',
  '..........taaaaaaatritta&===aeeeeeeeIaaaaaaaY==^aaIk&eeaa%%%%Httaaaaattttttttaaaaaaaaa...........',
  '...........atttTat%Httaa=@aaaeeeeeeeaaaaaaaa?=+=aIkeeeeat%%%itaaaaaaaatttttttttaaaataa...........',
  '...........Taaaai%ittaaaaaaaaeeeeeeIaaaataaa=++=akeee&aa%%tttaaaeeeaaaattttaTttttttaa............',
  '............0aa%%tttaaaTTaanaaeeee1aaaattaaa=++=aKeee&aT%ttataanenenaaaaiittaattttaa.............',
  '...........aav%%iiiaaattaanenaakk1aaaatttaav^=+=aae&&aaiitttaaeneeneeaaatiiiitaaaaa..............',
  '..........aa%%%iitaaattaaoeeenaaaanaaTttaa3v^=+=auaaaaaittataaeeecBBBaaaaaiiiiitaaaaa............',
  '..........ar%%iiTaaattaaeceeeeneeeeaaTttaaIu^=+=a4mmmaatttaaaneeBBeeeaaaaaaTtiiiitaaaaa..........',
  '..........arHtTaaaattaaeecoeeeeeee&aattaaIIu=++=amm4maatttaaaeeBBeeeeeaataaaaaiiiiitaaaa.........',
  '........tarituaaaattTaeeeecceneeecCeaaaaaaaa=+==vaaaaaaatttaan11eeeeeeaattaaaaaaitttttaaS........',
  '........aaHttaaaaattaaeeeneeBcccce&aaaaauauu=+=+=3?suaaaaatTa&1eeeeeeenauttaaaaaaatttttaaX.......',
  '........aattuaaaaTttaaeeeeneeeeeeaaaIkk%3Ml~=^^+^~~muvkkTaaaaleeeeeeeneaattaaataaaattttaaT.......',
  '........aattaa.aaTttaaeeeenneeenavkl44aaauuY+Yu<u^anbPau4kCaaleeee&BceeeaattaatTaaaatttaaT.......',
  '........0aTtaa.aaaTTaaeeeenenenaKl44aabnnbna^u<><ab{}nbaa44KaJeeeBBBBBceaattaatttaaaattaaT.......',
  '.........jataa..aataaeceeenenneakuaYabb||||ba;?<>b:en::baaakaeeelJneeeecaaataatttaaaattaaa.......',
  '..........aaaaT.aaTaanceeennneoakva^abb||||nv?;><J}}{nn&aakuaaallenneneenaauaattttaaattaaT.......',
  '...........aaaaaaaaannccennnncBadkkaaaCneen3+~>;33nc1aaakkaaaaaaee1BBeeeeaaaaattttaaataaT........',
  '.............aaaaaaannecceencc*amdkkkkaaaaaaaaaaaaaaaukkIaae&e&alllB1BoenHaaatttttaaiiaaF........',
  '...............taaaannnneccceenavddddkkkkkkkkkkkkkkkkkdddaeeeeeeannBneBonnaaattttaaaiaaa.........',
  '...........a....aataTnnneennnneuaddddddddddddddddddddddddaa1eeeeaaenBnnBeneaatttaaataaa..........',
  '..........aa....aataanenennneeooa4dddddddddddddddddddddda1eeeeeeaanneBnnBnnaatttaaaaaO...........',
  '..........ax..aaatttaaennnnneoooaadddddIIIddddddIII~ddddaeeeeeeeaaneeBneBBnaattaaaaa.............',
  '..........aa!aaattttaa>nene&@ooo@addd$Iddd$Idd1Iddd$IddIakeeeeeeaannnBnneBeaataaa................',
  '..........aaaaattttaaaaooooooooooaaI1Id$IIdlIIId$Ikd$IId$aeeeee#annneBnnneeaaTTaa................',
  '...........aatttttaaaaaaaooooooaaaaadd$Id$Iddddl1ddIdd$daaueeeIannnneBnnnnnaaatuaa..a............',
  '...........Aaaaaaaaaaaaaaaaaaaaaaaaaaddd$ddIIIIIdIdddddaaaaaaaanennncBnnnniaaaaaaaaaa............',
  '.........TaT%%%%%M%MMMMMMMMMMMMMMMMMaavdddIddddI1ddddmaa%333awennnnccnnnn*aaMMMMMMl%%?a..........',
  '.........z+llllllllllllllllllllllllllaaam44mmmmmm4mmsaaMllllaaannekCennnaaallll~llllllz..........',
  '.........1111zlllllllllllllll~llllllllaaddddddddddddaallllllllaaaaaaaaaaaaMlllllllzll1+..........',
  '............111111111111111111111lz1lllaaaaaaaaaaaaaaMlllllll~Mvuuuuuuua111111111111.............',
  '...................111111111111111111111111lz11111111111111111111111111111111....................',
  '..................................1111111111111111111111111111...................................',
  '.................................................................................................',
  '.................................................................................................',
  '.................................................................................................',
  '.................................................................................................',
];

const RAMEN_EYES = [{ x0: 34, x1: 41, y0: 35, y1: 43 }, { x0: 51, x1: 60, y0: 35, y1: 43 }];
const RAMEN_SPARKLES = [{ x0: 14, x1: 22, y0: 15, y1: 22, c: [18, 19] }, { x0: 10, x1: 15, y0: 25, y1: 29, c: [12, 27] }, { x0: 82, x1: 92, y0: 46, y1: 52, c: [87, 49] }];
const RAMEN_STEAM = { x0: 18, x1: 30, y0: 41, y1: 52, chars: '&*D' };
const RAMEN_NOODLES = { x0: 42, x1: 50, y0: 52, y1: 66 };

const lum = (c) => { const h = PALETTE[c]; if (!h) return 0; const [r, g2, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return 0.3 * r + 0.59 * g2 + 0.11 * b; };
const isHair = (c) => HAIR_CHARS.includes(c) || (c !== '.' && lum(c) < 80);

// closes the eyes: dark pupils and bright shines inside each eye box become skin, then a lid line is drawn
function blinkIn(g, boxes, lidRow, thick = 1) {
  for (const b of boxes) {
    for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) {
      const c = get(g, x, y), L = lum(c);
      if (c !== '.' && (L < 110 || L > 228)) set(g, x, y, 'e');
    }
    rect(g, b.x0 + thick, lidRow, b.x1 - b.x0 + 1 - 2 * thick, thick, 'a');
    rect(g, b.x0, lidRow - thick, thick, thick, 'a'); rect(g, b.x1 - thick + 1, lidRow - thick, thick, thick, 'a');
  }
}

// one sparkle rests (fully hidden) while the others shine
function twinkle(g, boxes, f) {
  const b = boxes[f % boxes.length];
  for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) if (get(g, x, y) !== '.' && !isHair(get(g, x, y))) set(g, x, y, '.');
}

// the steam curl rises and settles back
function riseSteam(g, box, f, step = 1) {
  if (f % 2 === 0) return;
  const isSteam = (c) => (box.chars ? box.chars.includes(c) : c !== '.' && lum(c) > 120);
  const moved = [];
  for (let y = box.y0; y <= box.y1; y++) for (let x = box.x0; x <= box.x1; x++) if (isSteam(get(g, x, y))) moved.push([x, y, get(g, x, y)]);
  moved.forEach(([x, y]) => {
    const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => get(g, x + dx, y + dy));
    const hairy = near.filter((c) => HAIR_CHARS.includes(c)).length, empty = near.filter((c) => c === '.').length;
    set(g, x, y, box.light || empty >= 2 ? '.' : hairy >= 2 ? 't' : 'a');
  });
  moved.forEach(([x, y, c]) => set(g, x, y - step, c));
}

// slurp: the hanging noodles wiggle side to side
function wiggleNoodles(g, box, f) {
  if (f % 2 === 0) return;
  for (let y = box.y0; y <= box.y1; y++) {
    const dir = y % 2 ? 1 : -1;
    const row = g[y].slice(box.x0, box.x1 + 1);
    for (let i = 0; i < row.length; i++) {
      const src = Math.min(row.length - 1, Math.max(0, i - dir));
      g[y][box.x0 + i] = row[src];
    }
  }
}

function ramenFrame(f, blink) {
  const g = RAMEN.map((r) => [...r]);
  if (blink) blinkIn(g, RAMEN_EYES, 41);
  wiggleNoodles(g, RAMEN_NOODLES, f);
  riseSteam(g, RAMEN_STEAM, f);
  twinkle(g, RAMEN_SPARKLES, f);
  g.viewBox = '-6.91 -0.64 110.45 94.55';
  return g;
}

// ---------- drawing pose: its own exact sprite (from Sanskriti's drawing reference) ----------

// read at twice the art-pixel resolution (5.29 × 5.18 screen px per cell, 230×200) so the sketchbook painting and the cat keep their detail.
// Regenerate with: node assets/mascot/tools/extract.mjs <drawing-ref.png> 5.29 5.18 20.08 143.93 230 200 out.json
const DRAWING = [
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '......................................................................................................................................................................................................................................',
  '.............................................................................................................................TaaaaaaaaaaaTTaO.........................................................................................',
  '.............................................................................................................................TaaaaaaaaaaaaaaA.........................................................................................',
  '...............................................................................................................aaaĀĀĀĀĀĀĀĀĀĀĀĀĀaaĀĀĀĀĀĀĀĀĀĀaĀĀĀĀt.....................................................................................',
  '..............................................................................................................AaĀĀĀĀĀĀĀĀĀĀĀĀĀĀĀĀTTttāāāāāāaaĀĀaĀĀ.....................................................................................',
  '...........................................................................................................aaaaaĀaĀĀĀĀĀĀĀĀĀĀĀĀHHHHHHHHHHHHHHuĀĀĀaaa...................................................................................',
  '..........................................................................................................!aaaaĀĀaaĀĀĀĀĀĀaĀĀĀiHHHHHHHHHHHHHHāāĀaaaĀ...................................................................................',
  '.......................................................................................................aĀĀaaaaaĀĀaaĀĀĀĀĀaaĀaHHHHHHHHHHHHHHHHHHātaĀĀĀĀ.................................................................................',
  '.....................................................................................................0iaĀaaaĀaĀĀĀāāāāāāāāāāāāHHHHHHHHHHHHHHHHHāātĀĀĀĀ.................................................................................',
  '....................................................................................................ĀĀaaaĀĀĀĀāāāāāiāiiāāāāāāāĂHHHHĀĀĀĀĂHHHHHHHĂāāĀĀĀĀĀ................................................................................',
  '.................................................................................................FăSĀĀaaaaĀTtĂāāĂĂĂĂāāāāāāāāāāĂĂĂĂaĀaĀāāĂHHHHĂāāāTĀĀĀĀ................................................................................',
  '................................................................................................OaaaaĀĀaaāĂĂĂĂĂĂĂĂāāāāāāāāāāāāāāĀĀaaaaaaĀāHHHāāĂāāĀĀĀa0...............................................................................',
  '............................................................................................tĀĀĀĀaaaatĂ%ĄĄąĂĂĂĂāāāāāāāāāāāāāāāāāātātaaaaaaĀāāāāāāāĀĀaa0...............................................................................',
  '............................................................................................ĆĀĀĀĀaaaTĄĄĄĄĄĄĂĂĂĂāāāāāāāāāāāāāāāāāāāāāaaaaaaatāāāāāāaaaa0...............................................................................',
  '..........................................................................................SSaaĀĀĀĀĂĄĄĄĄĄĄHāāāāāāāāāāTTTTĀĀĀTāāāāāāāāTaaaaĀĀĀtāāāāāaaaaĀxxxxxxF........................................................................',
  '..........................................................................................ĀaaaaĀĀĂ%%ĄĄĄĄĄāāāāāāāāātaĀĀĀĀaaĀaāāāāāāāātaaaaaĀĀtāttāāĀaaaaaaaaĀĀS........................................................................',
  '........................................................................................aĀĀaaaąĄ%%%%%ąĂāāāāāāāāāāāātātĀĀĀaĀĀĀaĀTāāāāāāaaaaĀĀĀtttTĀĀaaĀaaaaĀĀaaaaă.....................................................................',
  '.......................................................................................OaaaaĀĀĄ%%%Ą%%ĂāāāāāāāāāāāāāāāāaĀĀĀaaaaaĀāāāāāāĀaaaaaatāttĀĀaaĀĀĀĀĀĀĀaaaĀĀ.....................................................................',
  '......................................................................................ĀĀaaaa%%%%%%ąHāāāāāāāāāāāāāāāāāāāāĀĀaaaaaĀĀĀāāāāĀaaaaaaĀaĀaĀĀaatāĂĂĂĂĂaaaaaĀĀĀ..................................................................',
  '......................................................................................ĀĀĀĀuą%%%%%%HHāāāāāāāātaaĀaĀĀaaatāaaaaĀĀaĀĀĀTāāāĀaaĀĀĀaaaĀaaĀĀaāĂĂĂĂĂĂHiaaaĀĀa..................................................................',
  '....................................................................................!TĀĀĀĀĄĄ%%%%ąrĂāāāāāāāāĀĀaaaaaĀĀaaĀaaaaaaaĀĀaaĀTātaaaaaaaaaaĀaĀttāāĂĂĂĂĂHĂāāĀĀaaFF................................................................',
  '....................................................................................aaĀĀĂH%%%%%ĄāāāāāāāāāĀĀĀĀĀaaaaĀĀaĀĀaaaaaaaĀĀaaaĀTtaaĀaaaaaaaĀāāāāāāāāāĂĂĂĂĂHĀĀaaaĀ................................................................',
  '..................................................................................ÄSaaaaHą%%%%ĄąāāāāāāāĀĀĀĀĀaĀaĀĀaaĀĀĀĀĀĀaaaaĀaaĀaaaĀĀaĀĀaĀĀĀaaaĀāāāāāāāāāĂĂĂĂHHuĀaaaĀXX..............................................................',
  '..................................................................................aaaaĀT%%%%%%āāāāāāātĀaaaaĀĀĀāāāāāāāāātĀaaaĀaĀĀaaaĀaaĀaaaaaĀatāāāāāāāāāāāāāĂĂHHĂĂaaaĀĀa..............................................................',
  '................................................................................ASaaaĀ%%%%%%%%āāāāāāāĀaaaaaāāāāāāāāāāāāāttaaĀaĀĀaaaĀaaĀaaaaĀTāāāāāāāāāāāāāāāāāHĂĂĂĂĂĀĀaa!j............................................................',
  '................................................................................ĀĀĀĀĀā%%%%%%%%āāāāātaaĀĀaāĂĂĂāāāāāāāāāāāāāaaĀaaaĀĀĀaĀaĀĀĀatāāāāāāāāāāāāāāāāāāāāĂĂĂHHĀaaaaĀ............................................................',
  '........................................................GG....................jjaaĀĀĄ%%%%%%%%%āāāāĀaaaauuĂĂĂāāāāāāāāāāāāāāttĀaaĀaaĀĀaĀĀĀaĀāāāāāāāāāāāāāāāāāāāāāāĂĂĂHHaaaĀĀăj..........................................................',
  '........................................................GG....................ĀaaaĀv%%%%Ăā%%%%āāāĀaaaau%%%ĄāāāāāāāāāāāāāāāāāaaaaaaaaTTāāāāāāāāāāāāāāāāāāāāāāāāāāāāĄĄHHaĀĀĀĀa..........................................................',
  '........................................................GG....................ĀaaaĀv%%%%āā%%%%āāTaaĀĀ%%%%%ĄtāāāāāāāāāāāāāāāāĀaaaaaaaāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāĄĄĄĄĀĀĀĀaaX.........................................................',
  '........................................................Gć....................ĀĀaa%%%%%%āāāā%%āāaaĀą%%%%%āāāāāāāāāāāāāāāāāāāāaaaaĀāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāā%%%%āaaĀĀ.........................................................',
  '........................................................Gćq.................ĀĀĀĀĀĀ%%%%%%āāāā%%āāaaĂą%%%Ą%āāāāāāāāāāāĀĀĀĀāāāāāaaaaĀāāāāāāāāāāĀaĀĀatāāāāāāāāāāāāāāāāāā%%%%TaaĀĀ.........................................................',
  '......................................................GGq.ćG................aĀĀĀHH%%%%ĂĂāāāāāāāaT%%%%%HāāāāāāāāāāāĀĀĀĀĀĀaTāāāaaaāāāāāāāāāāāāātĀĀaaĀāāāāāāāāāāāāāāāāā%%%%ĄaĀĀĀaa.......................................................',
  '......................................................~G..ćG................ĀaaaHą%%%%HĂāāāāāāTaā%%%ĄĄĂāāāāāāāāāāāĀĀĀĀĀĀaĀāāāaaĀāāāāāāāāāāāāāāaĀaaĀĀaāāāāāāāāāāāāāāā%%%%%ĀĀĀaaa.......................................................',
  '..................................................qGććb....qĈGGG............Āaaa%%%%%%ĂĂāāāāāāāą%%%%ątāāāāāāāāāāaaaaaĀĀaĀaaāāĀāāāāāāāāāāāāāāāāāāāĀaaaaāāāāāāāāāāāā%%%%%%%%%aaĀĀ.......................................................',
  '..................................................qGććq...q.ććGG............ĀĀĀĀ%%%%%%ĂĂāāāāāāāąĄ%%%ąāāāāāāāāātĀaaaaaaaaĀĀĀāāĀāāāāāāāāāāāāāāāāāāāaaaaĀtāāāāāāāāāāĂ%%%%%%%%%aaaag......................................................',
  '......................................................ććqqGĈ..............ĀĀaĀ%%%%%%%%āāāāāāāā%%%%%āāāāāāāāāāaaĀĀaaaaaaaĀĀĀĀtāāāāāāāāāāāāāāāāāāāāāāĀĀaaatāĂĂĂāāāāĂ%%%%%%%%ĄĂāaaĀĀ.....................................................',
  '......................................................GGqqGG..............aĀaĀ%%%%%%%Ąāāāāāāāā%%%%%āāāāāāāāātaaaĀĀaaaaaĀĀĀĀĀtāāāāāāāāāāāāāāāāāāāāāāaaaaatāĂĂĂāāāāĂ%%%%%%%%%ĂĂĀĀĀĀ.....................................................',
  '........................................................Gć..............ĀĀaaĀā%%%%%%āāāāāāāāH%%%%%āāāāāāāāāaaaaaĀĀaaaĀĀĀaaĀĀāāāāāāāāāāāāāāāāāāāāāāāāāaaaaaĂĂĄ%%%%%%%%%ĂĂĂĂĂĂĂaĀĀa.....................................................',
  '........................................................Gć..............ĀĀaaaā%%%%%%āāāāāāāāH%%%%%āāāāāāāāāĀaaaaĀĀaaaĀĀĀaĀĀĀāāāĀaĀāāāāāāāāāāāāāāāāāāāaĀĀĀaĂĂĄ%%%%%%%%%ĂĂĂĂĂĂāaĀaaĀĀ...................................................',
  '........................................................GG..............ĀĀaĀt%%%%%āāāāāāāĀā%%%%%%%%%āāāĂĂāāĀaaaaaaaĀĀĀĀaĀĀĀĀāĀĀaĀĀĀaāāāāāāāāāāāāāāāāāāĀaĀaĀāā%%%%%%%āāāāāĂĂĂāāāĀĀĀĀ...................................................',
  '........................................................GG..............aĀaaā%%%%ĄāāāāāāāĀā%%%%%%%%%āāāĂĂāāĀaĀĀĀaĀĀĀĀĀĀĀĀĀĀuāĀaaĀĀaaāāāāāāāāāāāāāāāāāāĀaaaaāā%%%%%%ĄtāāāāĂĂĂĂāāĀĀĀĀ...................................................',
  '........................................................GG..............aaaaĄ%%%āāāāāāāTaĀ%%%%%%%%%%ĂĂĂĂĂĀĀĀĀĀuIIkeeeeeee&&ĉaaaĀĀaaaaāāāāāāāāāāāāāāāāāāāĀaaatāā%%%3āāāāāāāāĂĂĂāĀaaa...................................................',
  '........................................................................ĀaaĀ%%%%āāāāāāāTaĀ%%%%%%%%%%ĂĂĂĂĂaaĀĀĀĊċKČČČČČČČČČČČaĀĀĀaaaaaĀāāāāāāāāāāāāāāāāāāĀaaatāā%%ĄĂāāāāāāāāĂĂĂĂaaaa...................................................',
  '........................................................................Āaaā%%ĂĂāāāāāāĀĀĀā%%%%%%%%%%%%%ĂĂaaaĀċċČČČČČČČČČČČČČeKċaaaaaaaāāāāāāāāāāāāāāāāāāāaaaĀTāāāāāāāāāāāāāĂĂĂĂaaaa..ĀĀA..............................................',
  '........................................................................aaaā%%ĂĂāāāātTaaĀv%%%%%%%%%%%%%ātaaačċKČČČČČČČČČČČČeeK#uaaaaaaāāāāāāāāāāāāāāāāāāāĀĀaaĀtāāāāāāāāāāāāĂĂĂĂĀaaa..ĀĀA..............................................',
  '............................................ee........................ĀaaaĂĂĂĂāāāāāāĀaaaĂ%%%%āāāāH%%%%%ĀaaaIċČČČČČČČČČČČČČČČČČČeĎaaaaaHĄāāāāāāāāāāāāāāāāāāĀaaaaāāāāāāāāāāāāāĂĂĂaaaĀ..ĀĀA..............................................',
  '............................................ćć.......................OĀĀaĀĂĂĂĂāāāāāāĀĀaaāą%%%āāāāH%%%%%ĀaaaIċČČČČČČČČČČČČČČČČČČeĎaaaaa%%āāāāāāāāāāāāāāāāāāTaaaĀTāāāāāāāāāāāāāĂĂĀĀĀĀ..ĀĀj..............................................',
  '............................................ćć.....................AĀĀĀĀaaĂĂāāāāāāāāĀĀaaĂH%%āāāāāĂ%%%%%ĀaaaċkČČČČČČČČČČČČČČČČČČČČIaaaa%%%%āāāāāāāāāāāāāāāāātĀaaaaāāāāāāāāāāāāĂĂtāĀĀ..ĀĀA..............................................',
  '............................................ćć.....................xaaaĀaaĂĂāāāāāāāTaaauHH%%āāāāāĂĄĄ%%%aaĀuċÀČČČČČČČČČČČČČČČČČČČČkĀaaal%%%āāāāāāāĂĂāāāāāāāātĀĀaaaāāāāāāāāāāāāĂĂāāaa..aaA..............................................',
  '............................................ćć..................aĀĀĀaaaĀāĂĂĂāāāāāāĀĀaaaāHHāāāāāāāĂĂĂĂĂĀaĀċċČČČČČČČČČČČČČČČČČČČČČČČĀaaa%%%%%āāāHĄĄ%%āāāāāāāāāāaaaaaāāāāāāāāāāāāāĂāaa0XĀĀO..............................................',
  '.........................................qqÁććq..q............F!aaĀĀaaaaĂĂĂĂāāāāātaaaĀĀāĂĂāāāāāTāĂĂĂĂāaĀĀċċČČČČČČČČČČČČČČČČČČČČČČeĀaaa%%%%%āāāH%%%%āāāāāāāāāāaaaaaāāāāāāāāāāāāāĂĂaaaaĀĀ...............................................',
  '.......................................wGćć~..ćGGG..........ĀaaaaaaĀĀaaaĂĂāāāāāāaaaaaaāāāāāāāāāaiĂĂĂĂāaĀaċċČČČČČČČČČČČČČČČČČČČČČČČaaaaĄ%%%%%%%%%%%%ĀĀāāāāāāāātaaaaaaāāāāāāāāāāāĂĂĀaaaĀ................................................',
  '.......................................PGGćzqq~GG~..........ĀaaaĀaaĀĀaaaĂĂāāāāāāaaaaaaāāāāāāāātaāĂĂĂĂāaaaċċČČČČČČČČČČČČČČČČČČČČČČČĀĀĀaH%%%%%%%%%%%%aaāāāāāāāātĀaaaaaāāāāāāāāāāāĂĂTĀaaa................................................',
  '...........................................qGG............aaĀĀĀa...gĀaĀāāāāāāāaaaĀaaaāāāāāāāāāĀaāĂāāāāaaaċċČČČČČČČČČČČČČČČČČČČČČČČÀkaaāā%%%%%%%%%%%aaĀāāāāāāāāaaaaaaaaāāāāāāāāāāāāiaaaa...............................................',
  '............................................ćG............aaaĀĀĀ...ďaauĂāāāāāāaaaaaaaāāāāāāāāāaaāĂāāāāĀaaċkČČČČČČČČČČČČČČČČČČČČČČČÀĉaatu%%%%%%%%%%ąĀaatāāāāāāāaaaaaaaatāāāāāāāāāāāāaaaaď..............................................',
  '............................................ćć...........ĀĀaaa.....xaaāāāāāāaĀaaaaaĀāāāāāāāāāāaatāāāāāĀaaČČČČČČČČČČČČČČČČČČČČČČČeČČ&aaaa%%%%%%tāāĂĂĀĀaTāāāāāāāāāĀaaaaaaaĀāāāāāāāāĂāaaaaĀĀď............................................',
  '............................................ćG..........ĀĀaaSx....aaaĀāāāāātaaaaaaaĀāāāāāāāāāāaĀĀāāāāāĀaĀČČČČČČČČČČČČČČČČČČeČHĀĀaaĀĀĀĀaaĂĂ%%%%āāāĂāaaaĀtāāāāāāāāĀĀaaaaaaatāāāāāāāāĂaaaaaĀĆ............................................',
  '............................................&&..........ĀĀaa......ĀĀaatāātĀaaaaaaaāāāāāāāāāāāaaaaāāāāāĀĀaČČČČČČČČČČČČČČČČČČ&aĀĀaaaĀaaaaaāāHH%%āāāāāĀaaĀĀāāāāāāāāāāaaaaaaaaaāāāāāāāāĀaaaaaaaa..........................................',
  '........................................................aaaaO.....ĀaaĀtāTĀaaaaaaaaāāāāāāāāāāĀaaaaāāāāāĀaaČČČČČČČČČČČČČČČČČuĀĀaaaaĀĀaaaaaĀTHH%%āāāāāĀaaĀĀTāāāāāāāāāaaaaaaaaaĀĀāāāāāāĀaaaĀaaaĀ.O........................................',
  '........................................................aaaĀ......ĀaĀāāāĀaaaaaĀĀtāāāāāāāāāĂĂaaaaaaāāāĀaaaÎ&ČČČČČČČČČČČČČČČĀĀĀHČČČČeČĐBaaĀĀĂĂĂĂĂāātāātaaaaaāāāāāāāātāaaaaaaaaaāātāāāĀaaĀO.ĀĀĀĀĀ........................................',
  '........................................................aaaĀ.....OĀĀĀtaaaaaaaaĀĀāāāāāāāāāāĂĂaaaaaĀāāāaaaaĀĀeČČČČČČČČČČČČČeĀuČČČČČČČČċkĀĀaaĂĂĂĂĂāāāāāāaaaaatāāāāāāāāāaaaaaaaaaaattāāĀĀaa..ĀĀĀĀĀ........................................',
  '........................................................aaaaii...OaaĀaaaaaaĀaaāāāāāāāāāāĂĂĂaaaaaaĀāāāaaaaĀĀČČČČČČČČČČČČČČČČČČČČČČČČČČČTĀaatāĂĂĂĂttāāāuaaaaaĀāāāāāāāāātaĀĀĀaaaaaaatāĀĀaa....XĀĀĀa......................................',
  '........................................................aaaaĀĀA.ĀaaaaaaaaaaĀTtāāāāāāāāāāĂĂĂaaaaaaĀāātĀĀĐe&đČČČČČČČČČČČČČČČČČČČČČČČČČČeI4aaaaĂĂĂĂāāāāāĀaaaaaaaāāāāāāāttTTĀĀaaaaaaĀāāĀĀaa....ďTĀĀa......................................',
  '.........................................................ĀĀaaĀĀĀaaaaaaaaĀaāāāāāāāāāāāāĂĂĂĂaĀaaaaċTāāaaĀkČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČaaaaĂĂĂĂĂāāāāttĀĀaaaaaattāāāātāāāāaĀaĀĀaĀĀĀĀaaaa.....ĀaĀĀĀ....................................',
  '.........................................................ĀĀaaaaaaaaaaaaĀTTāāāāāāāāāāāāĂĂĂĂaaaaaaċāāāaaĀkČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČaaaaĂĂĂĂĂāāāātāĀaaaaaaatāāāāāāāāātaaaaĀaaaaaaaaa.....ĀaĀĀĀ....................................',
  '..........................................................aaaaaaaaaatāāāāāāāāāāāāāāāĂĂĂĂĀaaaaaIċāātĀakċČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČKċaaaaĂĂĂĂĂāātāāāĀĀaaaaaaĀāāāāāāātttāĀĀaaaaaaaaaĀ....aaĀĀĀ....................................',
  '..........................................................aaaaaaaĀĀĀāāāāāāāāāāāāāāāĂĂĂĂĂaaaaaĀċkāātĀĀĐċČČČČČČČČČČČČČČČČČČČČČČČeeČeeČ&ČeČČkaaaĀĂĂĂĂĂtāāāāāaaaaaaaaĀāāāāāāātttāĀĀaaaaaaaaaĀ....ĀĀĀĀĀ....................................',
  '..........................................................aaĀĀaT%%%%%%ĂĂĂĂāāāāāāĂĂĂĂĂĂaaaaaaĀkkuTtĀauĉČČČČČČČČČČČČČČČČČČČČČČČÎĀĀaaĀĀaaĀaaĀĂaaĀĀĀĂĂĂĂĂāāāāāttaaaaaaaaāāāāātāāāāāttaaaaaaaaĀ...ĀĀaaa....................................',
  '.......................................................OĀaaaĀĀĀā%%%%%ĄĂĂĂĂāāāāĂĂĂĂĂĂĂĂaĀaaaaaċIaaĀĀaĊČeeČČČČČČČČČČČČČČČČČČČČeRaaaaĀĀaaaaaaaaaaaaĂĂĂĂĂāāātttTaaĀaaaaaĀuātāāāāāttttĀĀĀaaaaaa...ĀĀaaa....................................',
  '......................................................ĀĀaaaa%%%%%%%%ĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂaaaaaaaaIċĀaaaĀaaaĀĀaČeČČČČČČČČČČČČČČČČČTĀaaaĀĀĀaaaaaaaaaaaaauĂĂĂĂĂĂāātāttāttttāāāttāāāāāttttātaaaaaaaa..Taaaa....................................',
  '......................................................ĀĀĀaĀu%%%%%%%%ĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂāaaaaaaaaĂ?aaaĀaaaĀaaaDeeČČČČČČČČČČČČČČČČĀĀaaaĀnnnÁÁÌĀaaaaaaaaĀĂĂĂĂĂĂĂātāāttttttātttāāāāāāāttāttĀaaaaaaaj.ĀaĀaa....................................',
  '.....................................................aaĀĀĄ%%%%%%%%ĂĂĂĂĂĂĂĂĂĂĂĂĂĂĀĀaaaaaaaaaaaaaaaĀĀĀĀaaaaĀĀeČČČČČČČČČČČČČČČeaaaaaaaĀnnnbbbĀĀaaaaaaaaĀĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂāāāāāāĀĀttttĀaaaaaĀĀĀaĀĀĀ....................................',
  '....................................................ÄaaauĄ%%%%%%ĄĄĂĂĂĂĂĂāāāāāāāāĀaaaaaaaaaaaaaaaaaĒĒĒĒĒĀaaawČČČČČČČČČČČČČČČeaaaaaaaabnbbnntāaaaaaaaĀĀĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂāāāāātĀaĀTttTaaaaaaaaaĀtt....................................',
  '....................................................ĀĀaa%%%%%%%%ĂĂĂĂĂĂĀaaaaaĀĀaĀĀĀaaaaaaaaaĀĀaaaaÁnbbgaaĀaaaRČČČČČČČČČČČČČČeaaaaaaaaēbbbbbbqĀaaaaaaĀĀĀĀaaĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĀaaĀtTttaaaaaaaaa......................................',
  '..................................................ĀaaĀ%%%%%%%%%%ĂĂĂTaĀaaaaaaĀĀaaaaaĀaaaaaĀĀĀaaaĀ2nnbbēaaaaaaHeČČČČČČČČČČČČČČĀaaaaaaaSqbbbbbbĀaaaĀĀĀĀaaaaatāĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĂĀaaaTtTaaaaaĀaa......................................',
  '.................................................Aaaaa%%%%%%%%ĂāĀaĀaaaaaaaaaaaaaaaĀĀttaaaĀĔaaaaÌbbbbbTĀaaaaaaeeČČČČČČČČČČČČČaaaaaaaaaďbbbbbbbbaaĀÀkĀaaaaaaaĀĀaaaaaaĀĀĀĂĂĂĂĂĂĂĂĂĂĂāĀaaaaTaaaaaĀ........................................',
  '.................................................AĀaat%%%%%%āāaaaaaaaaaaaaaaĀĀaĀaaāāātaaaaĎĔĄĀĀnbbbbbTĀaaaaaĀDeČČČČČČČČČČČČeaaaaaaaaa0bbbbbbbbĀaaKÀċĕaaaaaaaaaaaaaaaaaĀĀĂĂĂĂĂĂĂĂĂĂĂĀaaaaaaaaaĀ........................................',
  '.................................................AĀaĀā%%%%%%aaaaaaaaaaaaaaaaĀaĀattāāāāaaaaĕċkĀĀēbbbbbĒĀaaaaaĀĀeČČČČČČČČČČČČeĀaaaaaaaaĀbbbbbbbqĀĀawRĊāaaaaaaaaaaaaaĀĀaaaĀĀāāĂĂĂĂĂĂĂĂuaaaaaaaaĀg........................................',
  '................................................ĀĀĀĀąą%%ąĄĀĀaaaaaaaaaĀaaaaaĀaĀtāāttāāĀaaaaaĖċaaĒbbbbbăaĀaaaaaĀeČČČČČČČČČČČČe*aaaaaaaaabbbbbbbbĀĀaaĀaaĀĀtTtaaaĐĐĐĐcĐcaaaĀaaaĀuĂĂĂĂĂĂĂāaaaaaaaĀF........................................',
  '................................................ĀĀĀa%%%%ĂĂaĀaaaaaaaĀĀĀTĀaaaaāāāāāāāāuĀĀaaaaĀcaaĀbbbbbbĀaaĀaaaĀČČČČČČČČČČČČČČeaaaaĀĀaaabbbbbbbbaaaĀĀĎĐaaāāĀaaaIIIċċċkaaaaaaaĀĀĂĂĂĂĂĂĂĂaaaaaaaa.........................................',
  '................................................ĀaĀĂĄ%%%uaaaaaaaaaaattTaaĀautāāāāāātaaaaaaaĀĀĀĀabbbbbbaaĀĀĀĀĀaČČČČČČČČČČČČČČČąĀĀĀĀĀĀĀĀbbbbbbbbJo&eČKÃĀaTtaaĖIIĎĎIċċċaaaaaaaĀĀĀĀĂĂĂĂĂĂĂĂaaaaĀ..........................................',
  '................................................ĀaĀĂąąHĂaaaaaaaaaaatttĀaaaāāāāāāāāātaaaaaaaaaĀĀĀbbbbbbaĀĀĀĀĀĀĀČČČČČČČČČČČČČČČwĀĀĀĀĀĀĀĀbbbbbbneČČČČČČČkaaĀaaIċÇėėėÀċIaaaaaaaaaaaĂĂĂĂĂĂĂĂaaaaa..........................................',
  '................................................aauHąąĂāĀaaaaaaaaaĀttTĀĀaaāāāāāāāāāTaaaaaaaaaKāĀgqbbbbbĀĀĀĀĀĀĀČČČČČČČČČČČČČČČeĀĀĀĀĀĀĀĀbbbbbbÀÀÀČČČČČČČĀaaaĀIċėėėlČIċĀaaaaaaaaaaĀāĂĂĂĂĂĂuĀaaa..........................................',
  '................................................ĀaĀĂĂāĀĀaĀa.ĆaaaĀTtttaĀĀāāāāāāāāātĀĀĀaaaaaaaĀcKKĀĒbbbbqTĀĀĀĀĀĀČČČČČČČČČČČČČČČČČāĀĀĀĀĀÈbbbbÀÀÀÀkÀÀČČČČČĀaaaČKċėėėČČKkaaaaaaaaaaaaattĂĂĂĂĂĀaaa..........................................',
  '................................................ĀaĀĂĂĂaaaĀĀOĆaaaaTāttaaaāāāāāāāāttĀaaaaaaaaaĀuKKTgbbbbbTĀĀĀĀĀĀČČČČČČČČČČČČČČČČČāĀĀĀĀĀĘbnkÀÀÀÀÀÀÀÀÀČČČČĀaĀaKČkėČČČČkIaaaaaaaaaaaaaTtĂĂĂĂĂāaaaa!........................................',
  '................................................ĀaaĂāāĀaaF.ĆaaaaāāttaĀaāāāāāāāāāĀaaaaĀĀaaaaaaĀČČČČÀČbbbbĀĀĀĀĀāČČČČČČČČČČČČČČČČČČČČČČČČČČkÀÀÀÀÀÀÀÀÀČČČČaaĀČČČČČČČČČĀaaaaaaaaaaaĀaaatāĂĂĂĂĂaaaa!............Gć..........................',
  '................................................ĀaĀĂāāaaa!W0aaaĀāāttaaaāāāāāāāāāĀaaaaĀĀaaaaĀaĀeČČKÀÀenbniĀĀĀĀ&ČČČČČČČČČČČČČČČČČČČČČČČČČÀÀÀÀÀÀÀÀÀÀÀKČČČaaaČČČČČČČČ&aaaaaaaaĀĀaaaaaattĂĂĂĂĂaaaaă............Gć..........................',
  '................................................ĀĀĀĀāaaa...ĀĀĀĀāāātĀaaĂĂĂĂāāāāaaaaaaaaaĀaaĀĀĀĀeČKÀÀÀÀÀęČČeeeČČČČČČČČČČČČČČČČČČČČČČČČČČČÀÀÀÀÀÀÀÀÀÀÀKČČČĀĀaĔČČČČČČĀĀaaaaaaaaĀttaaaaaatāĂĂĂĂaaaaă............Gć..........................',
  '................................................ĀĀĀĀāaĀĀ...aaaaāāāāĀaaĂĂĂĂāāātaaaaaaaaaaaaaaaĀwČÀÀÀÀÀÀÀÀČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČÀÀÀÀÀÀÀÀÀÀÀeČČĐĀĀĀaaaĀaaaaaaaaaaaaauātaaaaaaāāāĂĂĂaaaaă............GGO.........................',
  '.................................................AĀatĀĀĀ...aaaĀāāāāaaĀĂĂĂĂāātaaaaaaaaaaaaaaaaĀHKÀÀÀÀÀÀÀÀÀČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČÀÀÀÀÀÀÀÀÀÀeeČČaaĀĀaaaaaaaaaaaaaaaaauāttaaaaaĀāāāĂĂaaaaă...........Gq.ćG........................',
  '.................................................OĀaĀĀĀĀ...ĀaaTāāātaauĂĂĂĂāāĀaaaaaaaaaĀĀaaaĀĀĀĀKÀÀÀÀÀÀÀÀÀČČČČČČČČČČČČČČČČČČČČ3ČČČČČČČČČČÀÀÀÀÀÀÀÀČeeČcaaaaaaaaaaaaaaaaaaaaaĀttāĀĀaaaĀtāĂĂĂaaaaă..........bG..z~........................',
  '..................................................AaaĀTa...ĀĀaĀāāātaaāĂĂĂĂāāĀaaaaaaaaTTTaaaaaĀĀÀÀÀÀÀÀÀÀÀÀČČČČČČČČČ33eeČČČČČČ4ĕČČČČČČČČČČČÀkÀÀÀKČČeeąaaaaaaaaTtĀaaaaaaaaaaattttāaaaaaāāĂĂĂaaaaă.......ćććć....qććGć....................',
  '..................................................AaĀĀĀĀA..ĀaaĀāāātĀatĂĂĂĂātaaaaaaaaaTTtĀaaaaaa#ÀÀÀÀÀÀÀÀÀČČČČČČČČČ34eeČČČČČČ4ĕČČČČČČČČČČČČČeeeČČČČČĀĀaaaaaaattĀaaaaaaaaaaĀtttttaaaaaāāāĂĂaaaĀă.......ćGGG....bććGG....................',
  '....................................................ĀĀĀĀĀa.ĀaaaāāāāĀaaĂĂĂĂāātaaaaaaatTTTaaaaaaaĀKÀÀÀÀÀÀÀČČČČČČČČČČČČ44444444ČČČČČČČČČČČČČČČČČČČČČÀaaaaaaaattāāāĀaaaaaaaaĀttttttaaaaatāāĂaaaaĀ............ćq.GĈ........................',
  '....................................................ĀĀĀaaĀĀĀĀaaāāātĀĀĀĂĂĂĂāāāaaaaaaĀtttTaaaaaaaauKÀÀÀÀÀČČČČČČČČČČČČČĕ4444444ČČČČČČČČČČČČČČČČČČČeoaaaaaaaaattāāāĀaaaaaaaaĀttttttaaaaatāāĂaaaĀĀ............ćb.ĈĈ........................',
  '......................................................aaaĀĀaaaaĀāāttaaaĂĂĂāāāāaaaaaaTttTĀaaaaaaaaĀÀČČČeČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČ%ĀaaĀaaaaaĀāāāttāĀaaaaaaattttttttaaaĀātāāĀĀaaa..............GG..........................',
  '......................................................0ĀĀĀaaaaaaTTtTaaĀĂĂĂāāāāaaaaaaTTtTĀĀaaaaaaaaavČČeeČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČÃlaaaaaaaaaaTāāāāttaaaaaaaattttttttaaaaāāātaĀĀĀT..............Gć..........................',
  '..........................................................aaaaaaĀaTTaaĀaĂĂĂāātāĀaaaaaaTTtTaaaaaaaaaa3ĎeeČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČČ&caaaaaaaaaaTāttāātTaaaaaaaatttttttTĀaattāāĀaaĀĀ................Gć..........................',
  '..........................................................qaaaaaaaaĀĀĀĀaĀĂĂĂātttaaaaaaTTTTaaaaaaaaaaaaĀkČČeeČČČČČČČČČČČČČČČČČČČČČČČČČČeeĉĊĀĀaaaaaaaaatāāāttttTaaaaaaaaTTtttttTaĀĀātttĀaaaĀ......ĀĀ........Gć..........................',
  '..............................................gĀTĀ.........ĀaaaaaTāātTaaĀĀāāĂtttTTaaaĀaaTTĀĀaaaaaaaaaaaaaĀąČČČČČČČČČČČČČČČČČČČČČČČČeIIĀĀĀĀĀĀaaaaaaaĀTāāāāāttĀĀawwwwĘaaĀaĀātttaaĀāātaaaaa......ĀĀĀĀĆj..................................',
  '..............................................aĀĀĀ!........ĀaaaaĀtttttaĀĀaāāĂtttttaaaaaaTTĀĀĀaaaaaaaaaaaĀĀačv>cĐČČČČČČČČČČČČČČČeČIĎĀaaaaĀĀĀaaaaaaaatāāāāāāTĀĀĀĀęęęęęĀaaaĀātttaaaTTaaaaaa......ĀĀĀĀaa..................................',
  '............................................ĀĀaaaĀj.......ĀaaaaĀātttttātaaaatttttātTaaaaĀTĀaaaaaaĀaaaaaaĀĀaaĀĀĀaauT2ÈÈÎÎÎÎĚĒāTĀĀĀaaĀĀaĎIIIĀaaaaaaātāāāāātĀĀĀĀÌnęęęęęęnĀaaĀaTtātaaaaaaaaa.........aaaĀF................................',
  '............................................ĀĀĀĀ..........aaaaaĀāttttttTaaaaaatttttTaaaaaTaaaaaauoaaĀĀaaĀaaaĀĀaaaaĀaaaaaaaaaaaĀĀĀavIIIIIIIaaaaaTāātāāāāāaaĀĀĀęęęęęęęęęĀaaaaTtttaaaaaaaaa.........aaĀĀS................................',
  '.............................ÁÁ............FĀĀĀA........ďXĀaaaaTātttttĀĀaaaaaaĀĀātttTaaaaĀaaaaÎRoĚĀĀÈěwaaaaaaaaaaaaaaaaaaaaaauJJĊcIIIIIIIIaaaĀāĂāāāāāāāTaa*ęęęęęęę&&ęę*āaaaĀttTĀTaaaaaaaXXj......ĀĀĀaS................................',
  '.............................cc...........aaaaĀ.........ĀĀaaaaaāāāātTTaaaaaaaaaatttTTaaaaaaaaĀoKKaĀaK&&ĀaaaaaaaaaaaaaaaaaaaaĀĜIIIIIIIIIIIĎaaaĀHHĂāĂĂĂāTaĀaęęęęęęĊĊĊĊĐĐeÁaaaĀtTTTTaaaaaaaĀĀĀ.....ďĀĀaa0................................',
  '...........................wđP............Āaaa........TĀaaaaaĂāāāāttaaaaaaaaaaaaaĀttTĀaaaaaaroKKĒaa&ČČeTĀaaaaaaĀtTTtĀaaaaaaĀĀĊIIIIIIIIIIaaaaąĄHHHHąĂĂuĀĀĘÁęęęeĊĊĊĊeęęęęęÁaaaaTTTTttaaTāĀĀaaĀĀĀTĀaĀĀaai................................',
  '..........................bcc.............aĀĀĀ........ĀaaaaaĀĂĂĂāāttaaaaaaaaaaaaaaTttTaaaaaĀĝKKKaaaČČeeTaaaaaaatttTtĀaaaaaauIIIIIIIIIČKČĀĀĀĀĄĄHHHąHāāaĀĀęęęęęęĊĊĝÁęęęęęęęaaaaTTtttTaatāĀaaaaaaĀĀaĀĀĀai................................',
  '.........................ccc..............aaĀĀĀĀ...ĀTTĀaaaaāĄĄĂĂāttĀaaaaaaaaaaaaaaTtaaaaaaa:KKKKaaaeeeČaaaaaaĀTTttttĀaaaauIĎIIIIkKČČČeČąaĀą%%ĄĄĄąĂātaaa&ęęęęĊĊĊęęęęęęęęęęĀaaaaatttttttātTaaaaaaTāāaĀĀ0................................',
  '.........................ĝcc..............aaaāĀĀ...aaaaaaautĄĄĂĂāāTĀaaaaaaaaaaaaaaTTaaaaaaa&KKKKaaaeeeeaaaaaaTttttttaaaaaĕÀIIIIIČČČČČČąaaaĄ%ĄĄĄĄĄāāĀaaaeęęęęĊĊĊęęęęęęęęęęaaaaaatTttttāāttaaaaaaāāāaĀĀă................................',
  '.........................ĝcc..............ĀaaāaĀĀĀĀaaaaĀāTĄĄĂĂāāāaĀaaaaaaabb2Āaaaattaaaaaa*eeeeeĀaa&ČÎĀĀaTĀaĀtttttTaaaaakÀKKKČČČČČČČČČaaĀāĄ%Ą%HāāttaaaĂęęęęĊĊcęęęęęęęęęęęÁĞaaaaaattttāāātāāāāāāāāĀaa..................................',
  '.........................cccD.............ĀaaāTTaĀaaaaāāTT%ĄĂĂāāāaaaaĀĀaabnbbPaaaatĀaaaaĀĀÁeeeeeĀĀĀČČ>ĀĀaTTaĀtttttTaaaaaÀKČČČČČČČČČČČ&aauĂĄĄĄĄāātTTaaĀęęęęęĊĊęęęęęęęęęęęęęÁĀĀaaaaĀtāāāāāāāāāāāāāĀĀĀĀ..................................',
  '...........................cĝĝĝĝĝ.........aaaaāāāāTĀtTaaĄĄąĕāāāTaaaaTTaaĀbnnnnĀaaaĀaaaaaÁÁęęęęęęKĀĀTHaattTaāāāāttĀaaaaaĀĀěČČČČČČČČČČěaaaH%ąąĂāātĀTĀĀĀÁęęęęğğČęęęęęęęęęęęęęęÁgaaaĀaĀĀĀTutātātTTĀĀaĀ...............xTTTĀ................',
  '...........................ĝcĝĝĝĝ..........SaĀāāāāāāāaaaĄĄHHĂāāĀaaaTTTaaabntTtaaaaaaaaa>ęęęęęęęęÃaaaaaatttaāāāāttaaaaaaaaĂ&ČČČČČČČČČđaaaHĄąąāāāTTTaĀĀęęęęęĊĊęęęęęęęęęęęęęęęęÁaaaĀTĀĀaTĀtāāttTĀĀĀaa...............TaĀaaO...............',
  '...............................ccĝĝq........aĀĀaĀāāTĀa%ĄĄĄĂĂĂĂĀaaaTtĀaaaaĀTĆXXÄaaaaaaÈnęęęęęęęęęÃÃaaaaTttĀĀāāāāāĀaaaaĀduaaĀ%ČČČČČČČČĀĀaāĂĂĂāāāĀaTĀaaaęęęęcĊĊęęęęęęęęęęęęęęęęęaaaĀātttĀaaaaaaaaĀĀ................TaavuaĀĀ..............',
  '...............................wccĝb........ĀĀĀaaĀaaaĀ%%ĄĄāāāāaĀaaTtĀaaaaaiSSXÄaĀaaaaÁęęęęęęęęęęoÃaĀĀaTTTauāāāātĀaaaaad4aĀĀĀČČČČČČČČaĀaāĂĂĂāāāaĀTĀĀaaęęęęğĊĊęęęęęęęęęęęęęęęęęĀĀaĀTtTtĀaaaaaaĀaaa................ĀĀzÂÂ+ĀĀ..............',
  '...........................đc....ccĘ..........aaaaaaĂHąąĂāāāaaaaāātTaaaaaaĀSSxÄĠaaaĀęęęęęęęęęęęęČeĀĀaTTTTaāāāāāĀaaaaā4dġġ$aaaaĀaaaaĀaaĀĂĂĂāāāāatāĀaaaęęęğğKęęęęęęęęęęęęęęęęęęnēaaaTTtāāttTTĀĀĀaaaa......0ĀaĀ....Āu^ÂÂÂĀĀ..............',
  '...........................cc....ĝcĘ..........AjaaĀĀĂHąąāāāāaaaaTttTaaaaaaĀĢĢĢĠĠaaaTęęęęęęęęęęęęČČĀaaTTTTaāāāāāaaaaam4ġġġġdmaĀĀĀaaaaaaĀĂĂĂāāāāĀāāaaaĀęęęğĊČęęęęęęęęęęęęęęęęęęęĞaĀaTTtttttttTaaaaaaaĆ....Āaaa....ĀsÂÂÂÂĀĀ..............',
  '...........................ĝc..běĝcĘ............aaĀHĂĂāāāāĀaaaTTTtĀaaaaaaaaaĢĢĠÄÄaağĊğğğğcęęęęęęČČaaaTTTĀaāāāāāaaaaamġġġġġġġġġddġġġġaaaĂĂātāāāĀtTaaaĀęęęĊĊęęęęęęęeĊğğĊĊğğęęęęęęaaaĀttttttāāāāāTĀaaaĀĀď.Āaaaaa...ĀuÂÂÂ^aa..............',
  '.........................ĝĝĝě..bĝĝĝP............aaaĂHĂāāāāaaaatTTTaaaaaaaaaaĢĢĢÄÄĀĀĀğğğğĊĊĊĊęęęęČČĀĀaTTTĀaāāāāāāĀaaamġġġġġġġġġġġġġġġĀaaĂĂāāāāāattĀĀĀaÁęęĊĊęęęęęęğĊĊğğĊğğĊĊğnęęęaaaattttTtāāāāāĀĀaaaaĀX.aa^Åaa...aĀÂģģĀaa..............',
  '........................Ìcc...*ccĝĝ...........0tĀaĂĂĂāāāĀĀaaaTTttTaaaaaaaaaĀĀĢĢĢÄSaaęęęoĊĊĊĊĝęęęeeeāĀĀTTTaĀāāāāāaaaa4ġġġġġġġġġġġġġġġaaaāāāāāāTattĀaaaęęeĊĊęęęęoĊğĊĊĊęęęęÁĊĊĝĝęęÁĀaaĀtttttāāāāāaaĀĀaaaĀĆaa^^?a...ĀĀģģ+aaA..............',
  '........................ĝcc...ĝcc.............aaĀĀĂĂāāāāĀaaaaTTtaaaĀaaaaĀaaĀĀĢĢĢÄÄaaęęęęęęĊĊĊğęęeeeěaaTTtaaāāāāātaaauġġġġġġġġġġġġġġġaaaāāāāāttatāĀaaĀęeČĊĊęęęęĊĊĊcęęęęęęęęęĐĊęęęĒaaatttttttāāĀaaÂÂuaaaĀĀĀÅ^^Ā...ĀauuĀĀĢ...............',
  '.......................Ğcĝ...đĝĞq.............aaaāĂĂāāāāaaaaTtTĀaaaĀęęęęęęnĘaaĢĢÄÄSa2nęęęęęeĊĊĊğęeeeaaĀtTTaāāāāāāTĀaauġġġġġġġġġġġġġġaaaĀāāāttāĀĀTĀĀaaĒ&KĊĊęęĝğğĊęęęęęęęęęęęęęęęęÁaaaattttTTttĀĀģÂÂģāaaaaĀe^&a!..aaĒaaĀ..jtttF!........',
  '.......................Áĝĝ...cb.............xxaaaĂĂĂāāāāaaaaātaaaanęęęęęęęęęaaĢĢĢĠĠĀĀÈęęęęęęoĊĊĊęeeČĂaĀtTTatāāāāāāTaaĀġġġġġġġġġġġġġġuaaaāāttāāuaTttĀaa&KĊĊnęĊğęęęęęęęęęęęęęęęęęęęĀaaatttTttTTĀaÂÂÂÂ%aaaaĀÁÁÁa!W.aTÎÎa!..Āaaaaa........',
  '.........................đD..ĝn.............aĀaaĂĂĂĂāāTĀaaaĀĀĀaaĘęęęęęęęęęęęÁĀĀ0ĢÄĠSaaęęęęęęęeĊĊĊĝČeeĀĀaaTĀĀĀāāāāāāĀaĀs4ġġġġġġġġġġġġdaaaĀTttāāttĀTTaaaĀaaĀĀauBęęęęęęęęęęęęęęęęęęęēaaaaĀTTttTTaaĎÂģģ$aaaaaKKĤaĀWxĀĒRÎa!.0ĀaĘaaĀ........',
  '.........................cc..ĝÌ.............ĀaaaĂĂĂĂāāĀaaaaaaĀĀĀęęęęęęęęęęęęęaaĢĢĢÄÄaa*ęęęęęęęĊĊĔĔČeeaaaaTTTaāāāāāāāĀĀĀmġġġġġġġġġġġġdaaaaĀtttāāāĀTTaaaaaaaaaaĔĊĊĝĝĝĝęęęęęęęęęęęęęęTaaaattttTTaaĜĎ4vėĀaaaĀĤĤÃaĀ.ĀĀÎRÎaj.aĀrČ&ĀĀ........',
  '............................................ĀaaaĂĂāāātaaaaaaaaÁęęęęęęęęęĐĐaaaaaĀĢĢÄÄaaaaĀĀęeeęeeĔĔĊeČ&RaaĀĀTĀaTāāāāāĀĀaavġġġġġġġġġġdĀaavaattttāāTĀaaaĀĀÁnnÁęn&&ĊĊĊĊĊĊĊęęęęęęęęęęęęęaaaaĀĀTTTTTĀĀvvĥÅĦaaaĀÆÅÅħĀ.aĀTĀTĀOFaweo&aa........',
  '.....................!TĀaaĀĀaĀĀĀĀaaĢ........ĀaaaĂĂāāāTaaaaaaaaÁęęęęęęęĊğpuaaaĀĀaai0ÄÄaaaaĀĀTeeeeĔĊĊeČČČĀaaaaaaĀāāāāāātaaudġġġġġġġġġ4aaĀ4aaĀĀTtTaĀĀĀa2nnęęęęęęęęęĊĔĔĊĊĊĊĊĊęęęęęęęęęęĀaaaaaTTTTTaaCÆ^ÆÆaaaĀÅÅÅħa.auÇėHĀjĀa&ČooĀa........',
  '...................ăaĀĀaaĀĀaaĀĀĀĀaaĀTT......ĀaaaĂĂāāāaaaaaaaaTęęęęęeğğĊğĀaaaČeeeħaaÄÄaĀuĀĀaa*eeeeĊĊĊČČeĀaaaaaaĀatāāāttĀaaaġġġġġġġġġaaa44aaaaaaaaaaaeęęęęęęęęęęęęęęęęĊĊĊĊĊğğęnęęęęęęĀĀaaaaaTTTTTaJÆ^ÆÆĀaaaÅÅÅĨaaaĂÇÇĜaTĀaČ&ČĀĀĀ........',
  '.................ÄĀaaĀĀaaĀĀĀĀĀĀĀĀĀaĀĀaaT....ĀaaaĂāāāāaaaaaaaĂwęęęęğĊĊğeěaaeČČČČČČ&ĀĀÄÄaČČ&aaĀ*eeeĊĊĊČeeĀĀaaaaaaaatāāttĀaaĀġġġġġġġġmaač4mĀaaaĀĀaaĀaağğeęęęęęęęęęęęęęę&&ĊĊĊğğğğęęęęęęTaaaaaaaTttTĀĀYÆÅÆvaaaÅÅÅĨaaaėÇÇ3aaĀĩeČĘaĀÌ........',
  '................ĀaĀĀ2ÁęeeęęęęęęęęęęDDĨaĀa...ĀaaaāāāātaaaaaaĀęęęęęęĐğeęĘaaĨČČČČČČČČlĀĀÄaeČČČaaaČeeeĊĊĊČČĀĀaaĀaaaaaaāāāāāaaadġġġġġġ4aa4444ĩuaaĀĀÁęęęęğĊĊĊğcęęęęęęęęęęęęęęęğeeğĊeęęęęęTaaaaaaaTtTTTauÆÅÆÅaaa^ÅÅĩaaaÇÇÇ4aaĀeeeaa..........',
  '................aannnęęĉĉĉĉkkkĉĉĉĝK&ęnĘiaa..aaaĀāāāātĀaaaaaĀnęęęęĊğĝęęāauRČČČČČČČČČČaaaĀČČČ&aaĚeeČğĊĊe&aaaaĀĀaaaaaĀtāāāTaaasġġġġġvaad4ĨĀaaaaÁnęęęęęęęoĊğğğęęęęęęęęęęęęęęcoęcĊğ&ęęęęTaaaaaaaTTTTTaĀÆÅÅÆaaaIÅÅĩaaaÇÇÇvaaĀČČeaa..........',
  '...........FaaaĀĀannb3ĕ33ĕĕ3ĕĕĕĕĕ333nnnÁaĀ..ĀaaĀuātātaaaaaaÁęęęęğĊeęęÁĀaČČČČČČČČČČČČKaaaČČČČĀĀĚeeeČ&ĊČ&aaaĀTĀaaaaaaĀāāāāaaasdddġġuaaaaaaaaaÁęęęęęęęęęęęęcğĊĝęęęęęęęęęęęęęĊęęęğğęęęęęÁaaaaaaĀtTTTĀĀÆÆ^ĪĖaĀ~ÅÅvaasÇÇÇaaaĤK&Āaa..........',
  '..........ĀaaaaaĀĀnnnnn%3ĕĕ33ĕĕ4ĕpnnnnęÁaa..TĀaaatāāāaaaaaÁęęęęęğğęęęēaĀČČČČČČČČČČČČČKaa&ČČČaaīeeČČČĊĂaaaĀTTĀaaaaaaĀāātāaaau444dġvaaaĀĀĨĀĀĀęęęęęęęęęęęęęęğĊĊĊęęęęęęęęęęęęęĐęęğğ&eęęęnaaaaaaĀtTTTĀaĩĪ^ĪzĨĀMÅÅĖaa4ÇÇÇaaĀKKKĀaĀ..........',
  '.........aaĀĬRnÁĠĀbnnnnnnnnnnnnnnnnnnnęeaa....aaaaāāātaaaanęęęęoĐnęęaaaaČČČČČČČČČČČČČČĊavČČČaaīČČČČČ1āĀaaTTTTaaaaaaaāāātaaau4444ĀaaaĩHČ&ĀĀÁęęęęęęęęęęęęęęę&oğĐęęęęęęęęęęęęęęęnęĊĐęęęnaaaaaaĀTTTTTĀaÅÅÅÆuaaÅÅ^aaÇÇÇ3aa&&K?aĢ...........',
  '.........aaannęęÁabnnnnnnnnnnnnnnnnnnnęęaa....aaaaāāātaaaanęęęęĉĊęęęaaĨĊČČČČČČIIČČČČČČČĀaČČKaĀĚČČČČČ1āaaaTTTĀaaaaaaatāātaaau444uaaĀĀČČČČaaÁęęęęęęęęęęęęęęęęęĊĊĊęęęęęęęęęęęęęęęę&ĐęęęnaaaaaaĀTTTTTĀaĪÆ^ĪBaaÅÅ^aaÇÇÇmaa&&Kaa!...........',
  '........aĀĀęęnnę*annnnnnnnnnnnnnnnnnnnęÁaa....jtaaĀĀttaaaaęęęęğĊęęęnĀaĩČČČČČČČkauČČČČČČČauKlĀĀČČČČČČKĂaaaTTTĀaaaaaaatttāaaau44ĀaasČČČČČeaaęęęęęęęęęęęęęęęęęęęoĊĊęęęęęęęęęęęęęęęęęęęęnaaaaaaTTTTtĀaĀĨÆ^ÅĪaaÅÅ^aĀÇÇÇĨĀĤKKpaa............',
  '........ĀĀTnęęĀĀĀannnnnnnnnnnnnnnnnnnnęeaa......ĀaaaTāĀaaaęęęęğĊęęęnĀaāČČČČČČČČČaĀČČČČČČaaKuaĀ&ee&&&&?aaaTTĀĀaaaaaĀĀtTttaaau44ĀĀĀČČČČČČČaaęęęęęęęęęęęęęęęęęęęeĊĊęęęęęęęęęęęęęęęęęęęęnĀaaaaaTTTTĀĀĀĀa^^^ĪĀĀÅÅ^aaėÇėĀĀĤĤÃÈĀaa...........',
  '........aannnaaĀaannnnnn:ĊğbnnĊĊĊnnnnneeaa.......aaaaaaaaĀęęęnğğęęęeaaĩČČČČČČČČČKĨapČČČKaaĀaaaaĀaaaaaaaaaaaaaaaaaaaaĀaaaaas44aaTeČČČČČČKĀaęęęęęęęęęĐoęęęęęęęęęęĊĊcęęęęęęęęęęęęęęęęęęnaaaaaTTTTaĀĀnDačÂ^ĪĪavÅÅaĂėÇ3ĀoĤÃaĀĀĀĀa..........',
  '........ĀannnaaĀaannnnnnÇÇÇĭbeÇÇÇnnnnneČaa.....W.aaaaaaaaĀnęęęğĐęęęeaaāČČČČČČČČČČKaakkÀkĀaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaĀaaTeČČČČČČKĀĀęęęęęęęęęĐoęęęęęęęęęęĊĊcęęęęęęęęęęęęęęęęęęnĀaaaaTTTTĀĀnnaaač^ÆÆauÅÅĀ3ÇÇĕaoĤHaaÁęaa..........',
  '........aannnaĀ.aannnnnęĭĭÇÇbĭÇÇÇnnnnneČaaĀĀĀĀĀĀaaaaaaaaaĀęęęęğğęęeeĀaTČČČČČČČČČČČČpaaĨaĀĢaaĀĀĀĀaĀĀĀĀĀĀĀĀĀĀĀĨaaaĀaaaaaaaaaaaaaaĀĀaaĀĀĀučaaÈÈęęęęęęęĐĐęęęęęęęęęęęğğğęęęęęęęęęęęęęęęęęÁaaaaTTTTTĀaęęāTaĀĀĀaaaaaaaaaaaaĀaaĀęnĀa..........',
  '........ĀĀnnnĀĀWaannnnnęÇÇÇÇĭĭÇÇÇnnnnneČaaaĀĀĀĀaaĀĀaaaaaaaęęęęğğęęeeaaĀIČČČČČČČČČČČČĩĀaaiĢaĀbbnnbbbbbbbbbbbbbbbbbbbgăēēēēēēăgďXTaaaĀĀaaaaaĀawÁęęęęęğğęęęęęęęęęęęğğğęęęęęęęęęęęęęęęęęeaaaaTTTTTĀĀęennbÈĆaaaaaaaaaaaaĀāĬnęeÁĀa..........',
  '........ĀĀnnnĀĀ.aannnnnęÇÇÇÇÇÇÇÇÇnnnnneČaaĐĐĐĐĐĐĐĐĐĐĮĔĔĔĀaaęęeeĮceĀĀaaaaeČČČČIKČČČČČÃkaT0xxĀĀbnbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnbbPÈiĀaaĀĀaĀanęęęęĮĮęęęęęęęęęęęęnğĊęęęęęęęęęęęęęęęTĀaaĀTTTTTĀĀĀęęnnnbnnnnnnnnnnnnnnnneeeeaa..........',
  '........aannnĀĀxaannnnnnĭĭÇÇÇÇÇĭĭnnnnneČaaĮĐĐĐĐĐĐĐĮĮĮĔĔ1aaaeeeeĐĮ&aaaaaaeeČČČČIIČeČČkkaaiĢxaaÁÁÁÁÁÁÁnnnnnnnnnnnnbbbbbbbbbbbbbbbbbbbbbbbbbbnnĀĀnęęęęĮĐęęęęęęęęęęęęęĮğęęęęęęęęęęęęęęęāaaaTTTTTTĀĀaęęnnnnnnnnnnnnnnnnnnęęeeeeaa..........',
  '........aannnnaaaannnnnnnÇÇÇÇÇÇĭnnnnnneeaaĐĐĐĐĐĐĐĐĐĮĮĮĮĮĊaaaeeeeaaaĀeeaauoČČČČČČIIIĎvaaĀĆ0bnaÁnnnęęnnnnnnnnnnnnnnnnnnÁnbbbbbbbnnnnnnbbbbbbbbĀĀĀJeeeĐĐęęęęęęęęęęęęęęęęęęęęęęęęęę&&&&Āaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnęęeeeeaa..........',
  '........ĀĀÎbnęaaĀĀnnnnnnnnĉÇÇÇĐnnnnnnneČaaįĐĮĮĐĐĮĮĮĮĮĮĮĊĔaaĀ*eeČaaĀweČħaĀaČČČČČČċ#ĮĂaaĀĀĀqbnannnęnnbbnnnbbbbbbnnnnnnÁÁÁnbÉÉÉÉębbbnÁÁÁÁnbbbbnĕaaaaeeĐĐęęęęęęęęęęęęęęęęęęęęęęęęęę&&ČČĀaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnęęeeeeaa..........',
  '.........ĀĀanęęnnĀnnnnnnnnnĭÇÇnnnnnnnnČ&aaĀaaaĀĨĮĮĮĮĐĮĮĮ1ĊaĀĀĀĀĀaaeeeeeeĀaaaįČČKċHaaa&Č&aanna2nbbbnnnbbbbbbbbbnnbbbbbbbÉÉÉÉÉÉÉÉbbnnbnnnbbbbĔ&&aaa&&ĐĐęęęęęęęęęęęęęęęęęęęęęęeeKKKKĀĀĀĀaaaaaaaaĀaannnnnnnnnnnnneÊÊnnnnİııeeeaa..........',
  '.........ĀaannnnnĀbnnnnnnnnn:nnnnnnnnee&aaaaaaaaaaaĄįĮĮĮ1ĊĀĀaaaĀĀĨeeeeeeRěaaĀĀĀaĀaaaeČČČaaabaānnęnęnÁnbbbbbbbbbbbbnnbbČÉÉÉÉÉÉÉÉÉbbnbnÁnbbbbĔeČaaĀ&KįĐeęęęęęęęęęęęęęęęęęęęęęee&KKKaaaĀĀĀĀaĀĀaaĀaannnnnnnnnnnnęÊÊÊÊnnęıııeeeaa..........',
  '..........SaaĀbbnĀnnnnnnnnnnnnnnnnnnnee&aa3334aaaaaĀaĀĮĮ1Ċ1ĔaaaĀqbbnęęeeČČ2āĀaaaaĀeeeČČČČDaaaTnbbbbbbbbqbbbbbbbbbbbbbb#######ÉÉÉębbbbÁbbbbĲĲČČaaĀoÃĤįĮ&ČeęęęęęęęęęęeęęĒTaaaaaĀĀaaaaĮĐĐĮĮĮĐĐĮĮJaannnnnnnnnnnnÊÊÊÊÊnęıııeeeeaa..........',
  '..........aaaĀĀĀĀaęnnnnnnnnnnnnnnnnnnee2aĀd3333lĔĔvĀaĀĮĮĮĮĔĔHaaĀbbbbbb}ÊeeeęÁÁeÁÁÁeČČeeČ&&īaaTnnnbbbbbbĠĠĠÄÄXPbbbbbbbn#####É###Éębbbbnbbbb%JeDaaaHoÃĐĐÃČČČeeeeeeeęÁ*ĀĀĀĀaaaaaĀĀaaaaĨĀ%ğĮĮĐĮĮĮJaannnnnnnnnnnnÊÊÊÊÊbnı&eeeeeĀĀ..........',
  '........aaaaĀaĀaaaoÁnnnnnnnnnnnnnnnnęČĀĀāv$dĭĭĭĭĭldĕaaĮĮĮĮĮĮĀaabbbbb:ÍÀK}bbnęęęęęęęęęęęęęęeeaTbbbbbbbbĳbbbbbbăÌbbbbbbb#####ÉÉÉ##nbbbbbbbbR%eeĀaaaaaaađoee&&&ČČ&ČwđĀĀĀĀĀĀĴ^Â^^^^MuaĀĀaaaĩĐĮĮĮĐJĀĀnnnnnnneÊÊÊČÊÊÊÊÊbÊÊÊeeeeeĀĀ..........',
  '....jjĀaaaaĨllĜ33aĀÈęnnnnnnnnnnnnnnÁĞīaa3dd$ĭĭĭl4444aaĐĐĐĮĊJĀaĂbbbbb}KKÀ{be}ÍĵnnnęnnnnęęeeÁeÁnnnbbbbqĠbbbbbbbbĠgbbbbbbI#########bbbbnbbbbĔĲeĞaaaaaaaaaĀaaaaaaaaĀaaaĀĀĀ^^^^^^^^^^ÂĥĎĶķaaaĀāJğĐJĀĀnnnnnnę:ÊÊÊÊ:ÊÊÊÊÊÊÊÊÊeeeeaa..........',
  '...FĀaaĀ%lĭĭllĸĸĸmĀĀīįnnnnnnnnnnnęoĒĀau3ĸĸĭ11ėd44444aaĐĐĮĮaaĀPbbbbbb{ĉĵmbb}ĹĹÍbbbbnÍ:bbbbbbbnnnnbbqËËbbbbbbbbbbgjbbbbbb########nbbbbbbbbcĲeeĀaavĔĔllĲĀaaaaaaaaaaaaPnbnÂ^^^^^^^^^^^^^ÂÂ^ĩaaĀuĐīaĀnnnnnnÊÊÊÊÊÊÊdIĭÊÊÊÊÊÊĹeeeaa..........',
  '.AaaaĀĕĕ11ĭĭĭÇėėėĸ3uaaąąĘēĞÌÌÌÁĞĬĀaaĀu3ėĭĭĭ$44444444aaĐĐĐBaaēqbbbbbbbĺbĚgbĲÍĵnbbbb}ĻĵnbbbbbbbbnbbbËjbbbbbbbbbbbbăFbbbbbnI#####nbbbbbbbbblle*aaaĲĔ11ĔĊĊĲĲ%Ą%ĨaaĀĀĞÌbbbn^^^^^^^^^^^^^^^^^^ÂĨaaĀĀaĀnnnnnnęÊÊÊÊÊÊ1=ļÉÊÊÊÊÊKeeeaa..........',
  '.jaauĕÇĭ11ĭĭĭĭĭĭĭĭĭėėuaĀaaaaaaaaaaalļĭĭĭĭl4444444444aaĮĮĨĀaabbbbeĺbbbbbqāābbbbbbbb}ębÍÍbbbbbbbbbÌËqqbnēbqbbbqbbbbPăTqbbbbbbbbbbbbbnnbbbbleęiaauļ1ĮĐĮĮĐĮĮĮĮĮBaaTPbbbbbb&^^^^^^^^^^^^^^^^^^Â^ĨĀaaĀęęnnnnnoÊÊÊÊÇÆ=ÆÉÊÊÊÊKeeeeaa..........',
  '.jaa44444444lĭĭĭĭĭļÇllĄĕĂvĩĩĩĩĩĩHĔĔĭĭĭl$444444444444aaĮĮaĀixbbbęČĻębbbbqāqbbbb}nbāÎwĵČĻÍbbbbbbÌĳďgËăăËnbËFbbFbnFbqATbbbbbbbbbbbnbbbbbbbcĲeęĀaaĕĮĮĮĐĐĮĮĮĐĮĮĨaaÄbbbbbbbbnn^^^^^^^^^^^^Å^^^^Â^^vaĀaęęnnnnnnneĹĭĽĎÃkĸÊĐįęęeeeeaa..........',
  '.AaaeęÁ&44444444ĸėlllĭļļĭļĭĭļļļļlĭĭĭĭėd44444444444sĀaaĄaaaqqbbľ}ČKÍ{bbbbābbbqĵĿĵuÎnnĵ{}nbbbbbgĳF!FFăăFnËăFnnFFAFFFF$iÌbbbbbbbbbbbbbbbbnlĊeeaaa1ĮĊĨaaaĮĐĐĮħaaĒbbbbbbbbbbÎaaĨ^^^^^Âęnbb^^^^^^^Âļaaa2nnnnnnnnĭÊÊÊ4ÊÊÊĉęęęeeeeaa..........',
  '..ĀawęęęęęęęĖ3Ą344m444ĭÇĭ1ĭĭĭĭĭĭĭĭĭd44d444444444ĕmĀaaĀĨaaĀqbbbÍKĤÀĹĵbbnāÁbbb:ĉĵĵbbbbĵĵnbbbqËĳFēFFFËË!ÌggŀŀŀŀŀŀŀŀŀďĆĆt0FAbbbnnbbnnbbbbb*lĝęRaaĀ1ĊĀĀaaaĀBĮğaaTbbbbbbbbbbaaaĀĀz^^^^įbbbbÃį^^^^^^^ĥĩĀĀbbnnnnęĭÊÊÊÊĲÊÊÊÊÊęęeeeeaa..........',
  '..aaaÁeeęęęęęęęęęÁę444444llllĭĭĭļd44d4dd4d444d4uaaaaaĀĀabbbbbbÍĹĉļĵbbbĂĂbbbāĸÎnbbbbbbbqqbËËŀŀŀŀŀăăŀŀŀFŀŀŀŀŀŀŀŀ!!TtĢ0ĆiiŀÌbbbbnbbbbbbbbĲĲęęaaa11ĩĀu^ÂuĀaĮaaĚbbbbbbbbbPĀaMÂ^aaDnnbbbbbbbb^^^^^^^ÂMĀĀbbnnnnÊÊÊÊÊÊnÊÊÊÊÊęęeeeeaa..........',
  '..aaaęęęęeeeeęęęęęęęęęeĲ44m444ĭėddddddd4ddd444aaaaaaaaĀĀqbbbbbbŁbābbqēĂHĂāĩāvvRbK}ĵbbbbăËg!ŀŀŀŀăŀŀŀŀ!F!ŀŀŀŀŀŀŀĢt0ĢĢĢĆ00tS!ÌbbbbbbbbbbblĲęęĀaaĊĊĀaĥ^^^Ĩaaaaqbbbbbbbbbaas^^^ķaÈnbbbbbbbbb^^^^^^^^^ĨĀaTnnnnÊÊÊÊÊÊnÊÊÊÊÊęęeeeeaa..........',
  '..aaanęęęęęęęęęęęęęęęęęęęęę&e444d4d4dddd4dĕuaaaĨįIĥaaaXqqbbbbbbbqābbĂHĂĂĂÌÁbbbĕlkĹĹĵÌŀă!!ÌÌÌŀŀŀŀŀŀ!!!ŀ!ÌÌĀttĀtĢĢĢ0ĢĢ00000tTSSÄbbbbbbbĔĔęeaaaĔ1Jaa^^^^^aaaabbbbbbbbnaĀĥ^^^^Âaabbbbbbbbbbbn^^^^^^^^vaannnnĭÊÊÊÊnnęÊÊÊĭęęeeeeaa..........',
  '..aaanęęęęeeęęęęęęęęęęeeęęęęęł4444d4dddd3daaĨĀįįįĮĮaaagbqqĵ{nbbbqĂÌĂāĂbbbbbbbbĉnŁĹŁbÌŀŀŀÌÌÌÌÌÌÌÌ!!!!!!ÌÌ!ăTTĀTTTtĀtttTĀttĀTĀaggbbbbbnllęÁaaaĊ1āau^I^^^^aaaqbbbbbqnaaĖ^^^I^^aĀqbbbbbbbbbbbŃ^^^^^^^^aanbnnęÊÊÊęnnnĉÊÊęęęeeeeaa..........',
  '.ĀaaęęęęęęęęęęęęęęęęęęęęęęęęęČ3444dddd4āĀaaaĤĤÃįĥĮĀaaPbbľĵČeÍbbbbĂĂĂbbbbbbbbbbbbnńbbbbnnqAÌÌÌÌÌŀ!!!ÌÌÌÌÌÌÌÌÌą$ÇÇÇÇÇŅŅġ$Ņ$dą!!!ŀgPbbbĲĜeęĀaaĨĮĮaaĲ^I#^^^^uĀaaaaaaĀaaĲ^^^IÀ^^ĴĀĀbbbbbbbbbbbbb^^^^^^^ķaabnnnnnnnnnnnnnnęęeeeeaĀĐĮ........',
  '.aauĸĸĸĸęęęęęęęęęęęęeeeeeęęęęeĖ4444dd4aaĀĀÃĤĤĮĥĮĥĔaaĀqbbÍĻņņĵĵbbĂĂĘbbbbb{bbbbbbbbbbbqbŁ{bbŀÌÌÌ!ÌÌÌÌÌPÌÌÌÌÌÌÌÌŅęŅnbęęŅeĭČŅēÌÌÌÌŀŀbbbbĲĜeeaaamĮĮaaĮ^IIĎ^^^ĴaÈēÌÌĞŀĀĀa^^^^KK^^ĴĀĀbbbbbbbbbbbbbę^^^^^^MaabnnnnnnnnnnnnnnęęeeeeaaĮĮ........',
  'aaaamm3ĸĸ3ĸĸÁęęęęęęęęęęeęęęęee34444ĂĀĀaaĤÃÃÃĮĮĥĮĀaaĀqqbb}ĹĹŇĹbOHĂbbbbbbĻĿ{bbÍbbbbbbbbÍeĵbbbbbÌ!ÌÌÌÌÌÌÌÌÌÌÌÌÌÌŅnŅnŅÁeŅeÇČŅĞÌÌÌÌÌÌbbbđĔeeĨaaĲĔĮĮĨa^^IIĎ^^^^Âbbbbbb^^^^^^KKKI^ÂĖabbbbbbbbbbbbbbbÃ^^^^^%aĀnnnnnnnnnnnnnneeeeeeaaĮĮĮĮ......',
  'aaaaaaaaaaaĀuuu3ėėeęęęęęęęęęee34dvaaaĨÃĤÃÃĮĮĮĮĮĮaaaÈbqbbĉĵňĂĵbHmŉbbbbbńĿKĵqĵŁŊbbbbbbbŁČ{bbbbÌÌ!ÌÌÌÌÌÌÌÌÌÌÌÌ0uĕĕĸ443ĸm4ġŋ4TÌĞÌÌÌŉbbbcĔęęaaa%1Ċ1aa^^I^^^^^^^bbbbbb^^^^^ÂKKKIĎÂĖabbbbbbqĒibbbbbbbbb^^ęŌaĀnnnnnnnnnnnnnneeeeeeaa1ĮĮĮ&.....',
  'aĀįįÃkĄĖvčaĀaaaauu3ĸĸĸĸėĉeęęnÊ4saĀaaÃÃÃÃĮĮĮĮĮĮBĀaabbbbbbbbōĘqĂĂōqqbbnĻ}KKŊĻ}ÊqbbbbbbĕHŎńbbbbbbbbbbbbŉÌĀĀĀat00ĢĢĢĢ0ĢĢĢ00000TtĠnnbbběleęaaaaĊĮĊaaa^^^^^^^^^&bbbbbb^^^^^^^^^I#^ĔabbbbbaaaibbbbbbbbbbbbnaainnnnnnnnnnnneeeeeeeĀaļ11ĊĊ.....',
  'aĀįįÃįįįįįįįaaaaĀaaaaaa3ėĸĸĸĸĸHaaĀłĤÃÃĮĮĮĮĮĮĮĮaaĀĨqbbbbbbqRHĂHHĂāāāāāĵĵĵŋĹĻĵqqbbbbbĩÎqbbbn}bbbbbÁŉŉbbbqaĀĀTtttttttttttĒ000iiiĀTqbqŇleeaaaa1ĮĮaau^^^^^^^^^bbbbbbb^^^^^^^^^^^^ĊaăbbnĀaabbbbbbbbbbbbbbnaa>bnnnnnnnnnnneeee&aĀĀĀĔĔĔĊ1Ċ....',
  'aĀįeęęęęęęęeeęÁeeĄĄ?ĨĨaaaaaaaĀaa?ÃĤÃĮĮĮĮĮĮĮĮĮuaĀÌqbbbbqbbĘHĂĂHĕĂāāÎĚāāĵ:Ê:3āĂĂbnāāāāāāāĩÊ}ČŁbbbbbbbbbbbbnbmÇ$ėėŅÇÇŅŅÇėĸĸ333ĀĬăqbbqĲĝeeaaa11ĮuaĖ^^^^^^^^^ņbbbbbbbę^^^^^^^^^^^^ĜaĠnaabbbbbbbbbbbbbbbbbbĀaaęęęęęęęęęęeeeeĂĂaaĩĔĔĔĔ1ĊĮ....',
  'aaįČęęęęęęęeeeeeeełÃįÃÃĴĨĀĀaaaīKKÃĮĮĮĮĮĮĮĮĮĮĔaaaqbbbbbqbĂĕĕHDbqqbbbbqb{:ÊĹĉqqĞāāRqbbbbbbŁĻ:ÍbbbbbbbbnbbbbbbÇęęęęnnęŅÇłKłłėÇ!ŀĞbbbnĔoęeaaa1ĥ1Ĩaz^^^^^^^^^nbbbbbbbę^^^^^^^^^^^^ĔaĀÁĀabbbbbbbbbbbbbbbbbbaaaÁęÁÁÁęęęęÁeÁĀĀĀĀaaĄĔĔĔĔĔĮĮ....',
  'aaŃČęęęęęęęęęęęęęęęęęęę&KĤĤKĤĤĤĤĮĮĮĮĮĮĮĮĮĮĮĥĀĀabbbbbbqHHHHĕbbbbbbbbbbbŁĵbŏbbqbbbāābbbbbbqĵŁbbbbbbbÌĳĳĳă!!ŀēÇęÇnŅŅŅnÇłłł$łĮÇ!ŀbbbbĲcęnaaaļļ1aaa^^^^^^^^ębbbbbbbbbbb^^^^^^^^^^^^^aaĀqbbbbbbbbbbbbbbbbbbĀaaaaaaaaaaaaaaaaaaĔĔļļĔĊĮĮĮĮ....',
  'aaŃįęęęęęęęęęęęęęęęęęęęęęKĤĤKKĤĮĮĮĮĮĮĮĮĮĮĮĩaĀĨĀbbbqqbĂĕĕHHbqbbbbbbbbbbbbbbbbbbbbqĘāTbqbbbbbbbbq!ÌbĳďďĳĳËăFėÇęÇęÇŅŅnÇłÃł$ĉÇÇ!!bbbbloęnaaaļļ1aaaÃÂÂ^^^^nbbbbbbbbbbbbb^^^^^^^^^^^^aaaqbbbbbbbbbbbbbbbbbnuaaaaaaaaaaaaĀaaalĊĊļĮĮĮĮĮĮĮĮ....',
  'aaįŃęęęeeeeeeeęęęęęęęęęęęęęęęęęĮĮĮĮĮĮĮĮĮĥaaaaqqqbbbqqqbbqqbbbbbbbbbbbbbbbbbbbbbbbbōnl}ĻbbbbqqĳĳĳďďĳďËĠĠSSSÈrąĄĄąĄĄ%ėėąÎXXÄŐĢqqbbĲleeaaĀĨ1ļaaabbbnęnbbbbbbbbbbbbbbbbbnę^^^^^^enbĚaŉbbbbbbbbbbbbbbbbbbKąaaĔĊĮĊĊĊ111ĊĊ1ĮĮ11ĮĮĮĮĮĮĮĮĮ.....',
  'ĀĀuĉęeeęęęęęęeeeeeęęęęęęęęęęęęęĮĮĮĮĮĮĮĮĮĨaaaaqqqbbbbqqbbbqbbbbbbbbbbbbbbbbqbbbbbbbbbĻeĻŁbbbďĳĳËďďďËďËĳSĢĢÎÎÎÎÎÎÎRÎÎĚĬĚÎÎxxxÄbqqqlleeaaaĔļĔaaabbbbbbbbbbbbbbbbbbbbbbbbbe&&&ČbnnbÎĀnbbbbbbbbbbbbbbbbbbĤąaaĔĊĊ11111ĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮ.....',
  'ĀĀĀaaaaīōweęęęęęęęęęęeeeeeeęęęęĮĮĮĮĮĮğaaaaaĀqbbbbbbbbbqbbbbbbbbqbbqbbbqqqbbbbbbbbbbq}}ĵbēËĳĳĳĳĳĳďgĳőőSÎōōÎÎÎÎxĚÎÎÎÈÎÎÎŒÎŒŒŒÁbbqĔĔęÁħaaaĔļĔaĀqbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbĀĬbbbbbbbbbbbbbbbbÃÃŃĴaaĮ1ĊĊĮĮĮĮĮĮĮĮĊĊĊĊĊĊĊĮĊĊĊĊ......',
  '.aaaaaaaaaěKÁÁęęęęęęęęęeeeeeeeeĮĮĮĮĊāaaaaaapbnnbbbbbnbbbbbbbbbbbbbbbbbbbbbqqqbbbbbbbnĿbbbbqqqbqbbqbbŉēōŒŒÎĚÄÄÎŒŒŒÎÎÎŒŒŒŒŒŒŒbbbbĲĔęęaaaa11Įaabbbbqbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnęa2bbbbbbbbbbbbbbbbÃÆŃ?aĀĊ11ĊĊĊĊĊĊ111ĊĊĊĊĊĊĊĊĊ1ĊĊ......',
  '.ĀĨauĀĀĨaĀĀaaaaaa>ÁÁęęęęęęęęęęęĮĮĮJaaaaĖHaapĔĔĊĊĔĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĊĔĔĊbbbbbbbbeębbbbbbbbbbbbbbbbbqqbbbbbbbbbÌŒŒŒōŒŒŒgbqbclęęĀaaaĊĔ1ĔaanbbqaqbbbTbbbbbbÌPbbbbbĆqbbbbbbbbbeKaaĎbbbbbbbbbbb&Ń^^^^ŃķaaĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĮĮĮĮ.......',
  '.bĮĮĮĮĮĊŌaĀaaaaaaaaaaaaÎ&ÁęÁÁęęĮĮaaĀaa1ļuaaeęęoo&ČeeeeeeeeęęęęęęęęęęęęęęęęĔĊĊĔobbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqbbbbbqbbbqğleeĀaaaļļļļaabbbqaTbnTabbbbbbÌanbbbaaqbbbbbbbbnoĨaaubbbnbbbbbncĮ^^^^^^ķaaĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĮğ.......',
  '....ĮĮĮĮĮĮĐĐĐĐĮĮHaaaaaaĀaaaaaaaaaaa?ğĮĮĨaaĀeęęęęęęęęęęnnnnnnnęęęnęęęęęęęęęęęooĔĔbbbęebJĔĔĔĔĔĔĊĔĔĊĊĊcĝobbbbbbbbbbbbbbbbbbbqbbboĔęę*aaaHĊĮĮĮĄagqqbnĀaaaŀbbÊębbbĬaaĀĀĀŉbqnnaaaaaaaaaaĀĀaaĀĀaaaaaz^^^^^^~ĀaĀĊĔĊĊĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮ........',
  '....ĐĐĮĮĐĐĐĮĮĮĮĮĮJğJJŌąĀaaaaaaaaaāąĮĮĮĮaaaĀoęę&&&&ęęęnnnnnnnnnnnnęęęęęęęęęęeeeĔĊĊğbeoĔĔĔęęęęĔĔĔĔĔĊĊĊğĊĊĊĊĊğ**ÁnbbbbqbbbbbbbbběĔęę*aaaĮĮĮĮĮHaĀÄbnnbggŉbńĐÊÊnbbŉaaĀĀnnbAaaaaĀaaTiĒ22ĬĬ2ĨĨĨħħĨĶ^^^^^^^^vaĀ1111ĊĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮ........',
  '......ĮĮĐĐĐĐĮĮĮĮĮĐĐĐĐĮĮīvvĩĩĩĩĩvvĮĮĮĮĐĮaaĀaoo@*&&&ooĝĝĝĝĝĝĝĝĝĝĝĝĝįįįįįĝcĝcÁeeeęęĊĔĔĔĲlęęęęęęęęęęęęęęęęeĊĊğğĊĊĊĊĊĊĊĊĊĊĔnbbbbbbĔoęÁaaaĔĊĮĮĮĲaĀĀaoĹKbbbbbbbbęĹbbbbbqq:À%ĀĀiPnbbbbbbbbbbbbb^^^^^^^^^^^^ĥaaĲ11ĊĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮğ...........',
  '......ĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĮĮĮĐĮĐĐĮĮĐĮaaTaĀĀaĀaaĀaaaaaaĀaaaĀaaaaaaaaaaaĀaaaaČęęeČĔĔğeeę*ÁÁÁęęęęęęęęęęęęęęęęęęeęęęe&oğĊĊĊĊĊĔĔĊ&ęēaaaĔ1ĊĮĮaanbaa:ĺbbbbbbbbbbbbbbbbb:Ĺaaubbbbbbbbbbbbbbbb^^^^^^^^^^^^aaaĲ11ĊĮĊĊĮĮĮĮĮĮĮĮĮĮĮĐĐc...........',
  '.........qĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĮĮĐĐĐĐĐĐĐĐĮuaaaaĀaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaĀĀĀeeeÁęeeČ&ĀĀĀĀĀauāĒ2ÈÈĚŒŒōōÁęęęęęęęęęęeęęęeecĊĔĔeeaaaaļĊĊĮĮaabbnĀawbbbbbbbbbbbbbbbbbbĀaĒbbbbbbbbbbbbbbbbbn^^^^^^^^^^aaa1Ċ1ĮĮĮĮĮĮĮĮĮĮĮĮĮq................',
  '..........įĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĐĮĐĐĐĐĐĐĐĐĐğĀĀĀĀĨaaaaaaaĨaaĀĨĨĨĨaaaaaaaĀĀĀaaaaĀĀĀaaaaaĨaaĀĀaaaaĀaaaaaaaaaaaaaaaħaĀĩsÁÁÁeÁÁęęeeęęęKęeaaauĊĮĮĮĮaagnnbĬannbbbbbbbbbbbbbbbbĀabbbbbbbbbbbbbbbbbbbÂ^^^^^^^aaaaĔĔ11ĮĮĮĮĮĮĐĐĮĐĐĮĐ.................',
  '......................ĐĐĐĐĮĮĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĮĮĮĮĐĐĐĐĐĐĮĐĐĐĐĮĮĮĮĮĊĊĊĊĊĊĊĊĊ1ĊaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaĀĀaaaĀĨĄīŌīwĘwōÎaaa%ļĐĐĮĮĮĩaaŉbbqPĀĀo&bbbbbbbbbbbnKKaabbbbbbbbbbbbbbbbbbÃ^^ÂÂĎĎaaaaau1ĮĮĮĮĮĮĮĮ*........................',
  '......................ĐĐĐĮĮĮĮĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĊĮĊĮĮĮĮĊĊĊĊĊaaaĀaaaaaaĀaaĮĮĮĮĊĊ111ĔĔĔuĀĀaĀaaaaaaaaaaĀĀaaaaaaaaaaa%ļĮĮĮĮĮĮaaaaĀĀaaaaaaaaaaaaaaaaaĀĀaaaqnbbbbbbbbbbbbbÁę^^Ĩaaaaaaaħ1ĮĐĮĮĮĮĮĮĮĮĞ........................',
  '.......................eĐĐĐĐĮĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĮĮĐĐĐĐĐĐĐĐĐĮĐĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĐĮĮĮĮĮĮĮĐğĀaaaaaaaaaaĨĐĮĮĮĮĮĮĮĮğaĀĀĀaaaaaaaaaaaaaaaaaaaaaĀaÈnnbbbgōīīHvaaaaaaaaaaaauĮĮĮĐĐĐĐĮĐĐĮĮ..........................',
  '.......................ęĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĮĮĐĮĮĮĐĐĐĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĮĮĮĮĮĮĮĮĐĐĮĮĮĮĮĮĮĮĐĐĮĐĮĮĮĮĮĮĮĮĮĮĐįĐĮĮĮaaaaaaaaaaaaaaaaaĊaaaaaĀaaaaaaaaaaaaaaaąĄĔĊĐĐĮĮĮĮĐĐĐĮĮĐĐĮ..........................',
  '..................................................qĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĮĮĮĮĮĮĐĮĐĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĐĐĐĮĮĮĮĮĮĮĐĐĮĮĮĮĮĮĮĮĮĮĐĮĮĐĮĮĮĮĮĮĮĮĮĐĐĐĮĮĮĮĮĮĐĐĐĐĐĐĐĐĐĐĐĮĐĮĐĮħaaaaaaaaaaaaĨĨaĀaĀĮĮĮĮĮĐĐĐĐĮĮĐĐ*...............................',
  '..................................................qĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĮĐĮĮĮĮĮĮĐĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĮĐĐĮĐĐĮĮĮĮĮĮĮĮĐĮĮĮĮĮĮĮĮĮĮĐĐĐĮĮĮĮĮĮĮĮĮĮĐĐĮĮĮĐĮĮĮĐĐĐĐĐĐĐĐĐĐĐĮĮĮĐĮĐĐĐĐĐĐĐĐĐĐĐĮĐĐĐĮĐĮĮĐĮĮĮĐĐĮĐĐĮĮĐĐ*...............................',
  '...................................................ěĝĝĝěěĝěĝĝĝĝěěěĝĝĝěěĝěěěěěĝĝĝĝĝĝĝĝĝĝĝĝĝĝěěěěěěěěěěěĝĝĝĝĝĝĝĝĝĝĝĝĝĝĝĝĝĝcccccccccccccccĐĮĮĮĮĮĮĮĮĐĐĐĮĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĮĐĐĐĮĐ.........................................',
  '........................................................................................................................................ĐĮĮĮĐĮĮĐĮĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĮĐĐĐĐĐĐĐĐĐĐĐĐĮ.........................................',
];

// eye areas (dark iris + cream shine), traced from the 2× grid; hair begins just outside them
const DRAW_EYES = [{ x0: 96, x1: 110, y0: 81, y1: 95, lid: 90 }, { x0: 124, x1: 141, y0: 79, y1: 93, lid: 88 }];

// closed eyes for the drawing pose: paint the eye areas with her skin, then draw a soft curved lid
function drawingBlink(g) {
  const skin = g[85][116];
  for (const b of DRAW_EYES) {
    for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) set(g, x, y, skin);
    for (let x = b.x0 + 1; x <= b.x1 - 1; x++) {
      const edge = x < b.x0 + 3 || x > b.x1 - 3;
      rect(g, x, b.lid - (edge ? 1 : 0), 1, 2, 'a');
    }
  }
}
const DRAW_SPARKLES = [{ x0: 46, x1: 67, y0: 30, y1: 53 }, { x0: 36, x1: 53, y0: 48, y1: 67 }, { x0: 188, x1: 216, y0: 86, y1: 108 }];
const DRAW_STEAM = { x0: 24, x1: 39, y0: 110, y1: 133, light: true };
const DRAW_PEN = { x0: 64, x1: 89, y0: 110, y1: 145 };

// the pen hand bobs a pixel, like she's mid-stroke
function penStroke(g, box, f, step = 2) {
  if (f % 2 === 0) return;
  for (let y = box.y1; y >= box.y0 + step; y--) for (let x = box.x0; x <= box.x1; x++) g[y][x] = g[y - step][x];
}

function drawingFrame(f, blink) {
  const g = DRAWING.map((r) => [...r]);
  if (blink) drawingBlink(g);
  penStroke(g, DRAW_PEN, f);
  riseSteam(g, DRAW_STEAM, f, 2);
  twinkle(g, DRAW_SPARKLES, f);
  g.viewBox = '-0.02 -0.76 229.68 200.78';
  return g;
}

// ---------- reading pose: its own exact sprite (from Sanskriti's reading reference) ----------

// read cell by cell from the reference (about 11.4 screen px per art pixel), 93×86
const READING = [
  '.............................................................................................',
  '.............................................................................................',
  '.............................................................................................',
  '...............................................aaaaaaaaa.....................................',
  '..............................................Oaaaaaaaaa.....................................',
  '......................................AAaaaaaaaiiiiiiiitaaj..................................',
  '...................................gggaaaiiiittttiTtTiiiitaX.................................',
  '..................................aaaaiiiitttttttttaaaTittTa.................................',
  '................................aaaaippittttttttttttaaattttaa................................',
  '...............................aaatprittttttttaaaatttaaattTaaaaa.............................',
  '..............................aaapppitttttttttaaaaaTtaaattaaaaaaaa...........................',
  '.............................aaapppittttaaaaaaaaaaaataaaaaautiiiaaa..........................',
  '............................aatpppttttaaaaaaaaaaaaaaaaaaaatttttiiaaa.........................',
  '.................G.........aaippptttTaaatttttaaaaaaaaaaattttttttiitaa........................',
  '.................G........aaappptttaaaTtttttttaaaaaaTttttttttttttiiaaa.......................',
  '................oGC.......aapppptttaatittttttttaaaatttttttttttttttiiaa.......................',
  '..............qqB.Cbq....aaHppppitaatttttttttttTaattttttaaatttttttiiiaa......................',
  '..............owB.BDD....aappprpptatiittttaaaatTattttttttaaatttttttiHuaa.....................',
  '................OC......XappptttttiiitttTaaaaaaTtttttttttttaaatittppppiaF....................',
  '.................G.....OaTppptttttiittttaaaaaaaTttttttttttttaatirHppppraa....................',
  '.................G.....aappptttttpiptiiaaaaaaaataaattttttttttaatpppppppaaT...................',
  '.......................aapptttatppppHitaaIKeeeeJaaaattttttttttaatppttpptaa...................',
  '.......................aiptttTatpppppraaIeeeeeeekaaautttttttttaaatttttiiaa...................',
  '..........G...........aaiitttatpppttppaaIeeeeeeeeIaapttttttttttaattttttiaa...................',
  '..........Gb..........aaitttaatrptttppaIeeeeeeeeeKaapptttittttttaatttttiaa...................',
  '.........GnMG......aaaaitttaaairtttaiiaIeeeeeeeeeeaappptprttttttaaattttiiaa..................',
  '..........G......jaaaatittaaatittttattaIeeeeeeeeeeBatppppptaTttttaaaTtttiuaa.................',
  '................Taa.Tatttaaattttttaattaeeeeeeeeeeeeaaippttiaatttttaaaattttaaag...............',
  '...............aaa..aattaaaattttttaattaeeeeeeeeRaaaaatiptttaaattttaaaaatttaaaaX..............',
  '...............aaa..attaaaattttttaaattaeeeeeeeTaaTTuaaiitttTaaattttuaaaatta.aaa..............',
  '...............aaa..ataaaatttttitaaataaaeeeeeeeeeeeeaatiitttaaaatttttaaaaaa..TaS.............',
  '...............aaaagaaaattttttiiaaaITaeeeeeeeeeeeeeekaatittttaaaatttttTaaaaa..aat............',
  '................aaaaaTtttttttiiaaaITaIeeeeeeeeeeeeeeeIaaiittttaaaattttttaaaaa.aaT............',
  '.................aatrpittttiiiaaaIuaveeeeeeeeeeeaaaaaaaaaiittttaaaatttttttaaa.aaT............',
  '...............aaapppiiiiiiiiaaaaIaaaaaeeeeeeeewaaaaaaaaaaiiiitttttttttttttaa.aaT............',
  '..............aarpppiiiiiiiaaaaaaaaaaaaaeeeeeeeRaaanbnaaaaaaiiiiiiiiiittaaTtaaaaT............',
  '.............aappppiiiaaaaaaaaaaaannnaaaeeeeeeeeaaatbbqaaaaaaaiiiiiiiiiiiTaaaaax.............',
  '.............atppptaaaaaaaaataauaanbbaaaaeeeeeeeaaaabbbbaKIaaaaaaaaaaiiiiiaaaaa..............',
  '.............arppaaaaaaaaattTaaaIaqbbaaaaeeeeeeeaaaabbbbaaaaaTaammmaaaaiiiiaaaa..............',
  '............aarHaaaaaaaattttaaaaaabbbaaaaeeeeeeeuaaaqbbeeKeaaTaIIIIaaaaaiiiiaa...............',
  '............atiaaaaaTaattttaaaaaaKaqbbaaaeeeeeeeeaaabnkkkKeeaaaIleIaaaaaatiiaa......G........',
  '............aTtaaaataattttaaaaaaaeKknbuuueeeeeeeeeeeekkkkkeeaaeIeKaaaaaaaatitaa.....G........',
  '............aTaa.aaTaatttaaaaaaaaekkkkeeeeeeeeeeeeeeekkkkkeeaKeeeaaaaataaatitaa....G.G.......',
  '............aaaa.aataitttaaaaaaaaekkkkeeeeeeeeeeeeeeekkkkeeaaaaaaaaaaataaattiaa..GG...Gz.....',
  '.............aTa.aaTiittaaaaTtaaaKkkkkeeee4eeee3eeeeeeeeeekaaaaaaaaaatttaatttaa....GqG.......',
  '.............aaa.0aTiitTaaaattaaaaeeeeeeeee4434eeeeeeeeeeIaaaaataaaaatttaattaaS.....G........',
  '..............aaaaaTiitTaaatttaaaaa1eeeeeeeeeeeeeeeeeeeIaaaaaatttaaattttaattaa......G........',
  '................aaaTaittaaattttaaaaaaHeeeeeeeeeeeeeeevaaaaaaattttaattttaattaa...0............',
  '.................taaaaitaaaatttaaaaaaaaa1keeeeeeeI1aaaaaaaaTttttaaattttataaa....aa...........',
  '.................taataaiTaaaattTaaaTaaaaaaaaaaaaaaHJIIaaaatttttaaaatttaaaaaa.....aa..........',
  '...........ga....aattTaaaaaaaattaaattaaaaaaaaaaaIIIIIIaaaittttaaaaatttaaatTaa....aa..........',
  '..........aa....aatitaaaaaaaaattaaattaaaaaccaaaaIIIkKeaairritaaaaaattttaatttaaaaaaa..........',
  '.........Sa...AaaiHtagnnnb22aaTaattttaaaaaaa2222sIeeeDatrrttavnnbgaatttTaaTttttttaF..........',
  '.........Saa.TaaHHaa2CoCoonnnnaaatttaaaaannnnnoCeaaeeaaittTaabnneoaaattiitaaauTaax...........',
  '.........SaaaaaHHiaannnnnoCcbnnaattaaaabnnCCConnnnaaIaaittaaobbccnnaaaTtiiiaaaaaj............',
  '.........SaTtaurttamvmnnnbnnCcbbaataanbnoknnnbnnvvmaaaatttaabncBbnbaaaaatiintTaaaaa..........',
  '..........aaTaiittaa444vvvbnnnConaaannCCnnnbmvmm444aaaatttaannBbbbbnaaaaaaanniiiuaaa.........',
  '...........Faaitttaa44mmmmvmvbnnonabCobnevmvm4m4444aa4atttaanBcnbbbbbaaTaaaHnaiiiiaaa........',
  '............aitttaaaammmmmmm4ssbnoonnnmv44m4mm44m444amaatttaaBbbbbbbnaattaannaaiiiiaaa.......',
  '...........xaittaaaaammmmmmmmmmsnbnnsm4mm444m443Bm44aa4aattaabbbbcccbaaaTTnnaaaniiiiaaj......',
  '...........aittaaaaaaummmmmmmmmmsvvssm444m4mmmlB1m44mam4attaanbccccccnaaaTbaaaabaiiiiaaT.....',
  '..........aatttaaaaaaammmmmmmmmmu4444s444mBB4mBB4m44maamataannccnbbbboaaaTnaabnaaaiiiaaT.....',
  '..........aatttaaaaaaaammmmmmmmms4444s4444BBBm1lm444maaataaKncBnbbbbbbnaaatnanaTaaaiiaaT.....',
  '....aaaaaaaaaaaaaaaaaaamaaammmmmss444sm444mBB44mBBm44maaaaeKlBbnnbbbbbbaaaanaqaTaaaiiaaT.....',
  '...aa55666666666777777aaeeea4mmmms4444s44mmmm1411mmmaaaaaaellBBBcobbbbbaaaaaaaaaaaaiiaaT.....',
  '..aT5795777776582KKKKoaeee4aammmms4444sm4mBBBm1BB4aaeeeeeaalnnnnbccnbbaannnnnnnnaaaiia0......',
  '..aU579777777688eeeeea1eeIeeuammmms444s4m44BB1B44maeeeeeeeaxCcbbbnccnbabb344444wnaaaaag......',
  '..aT579777777688ekoooaeeeeeeKammmms444ss444m1B144sa31eeeee4abncbbbnccnabbbbbbbbbbcbnaa.......',
  '..aa579777777688onnnKaKeeeek1ammmmss444sm44m4mBlma2eeeeeee4annbcbbbbcbabbbbbbbbbbaanbaa......',
  '...aaaaaaaaaaaaaaaaaaaaeeeeeeasmmmms444sm44mmmmmmareeeeeee4abbncbbbbnnabbbddbd3bnaaunaa......',
  '...aa111111111111l1Haea3eeeeaammmmms444smm4mmmmmmmakeeeeee4anbncbbbbbnabbndddddbnaganaa......',
  '..aannnnnnnnnnnnC11zaeoaHkIuaauvmmmss444s4mmmm4mmmaaeeeeeIannnncbbbbnoabbbndddnbnaannaa......',
  '..aannbbbbbbbnbne111aKKKaaaaccaaaumms444smmmmmaaaaaaauuuuaannncnbbbnooabbbbodbbbncnnna.......',
  '..aaeoooooooeooee111aaKeKKKcccCcaaams444ssmmaaaaaaaaaaaaaanbnCCbnoooooanbbbbbbbbecnnaa.......',
  '..aannnnnnnnnnnn111MaaauKKKcCCccaaaaam44maaaaaaaaaaavaaaoonncCnnoooooaaebbbbbbbbeaaaaaaaaa...',
  'Xalaummmmmmm43333muaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaobbbbbbKaa1zz111zza..',
  'Xa111111111111111z111111zzzz11111111111111111111111111111111111111111zB1aaaaaaaaa1z11111z1a..',
  'l1111111111111111111111111111111111111111111111111111111111111111111111111111111z111111111...',
  '...1111111111111111z11111111111111111111111111111111111111111111111111z11111111z1111111......',
  '.........111111111111111111111111111111111111111111111111111111111111111111111111............',
  '.............................................................................................',
  '.............................................................................................',
  '.............................................................................................',
  '.............................................................................................',
  '.............................................................................................',
  '.............................................................................................',
];

const READ_EYES = [{ x0: 34, x1: 40, y0: 33, y1: 41 }, { x0: 48, x1: 56, y0: 33, y1: 41 }];
const READ_SPARKLES = [{ x0: 14, x1: 21, y0: 13, y1: 20, c: [17, 16] }, { x0: 9, x1: 12, y0: 23, y1: 26, c: [10, 25] }, { x0: 81, x1: 87, y0: 40, y1: 46, c: [84, 43] }];

function readingBlink(g) {
  for (const b of READ_EYES) {
    for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) if ('anbqtuvTwIKk'.includes(get(g, x, y))) set(g, x, y, 'e');
    rect(g, b.x0 + 1, 39, b.x1 - b.x0 - 1, 1, 'a');
    pts(g, [[b.x0, 38], [b.x1, 38]], 'a');
  }
}


// a page lifts from the right, arcs over the spine, and settles on the left
const FLIP_TIPS = [null, [48, 51], [45, 46], [38, 44], [31, 46], [27, 51]];
function pageFlip(g, step) {
  const tip = FLIP_TIPS[step];
  if (!tip) return;
  const [sx, sy] = [37, 55];
  const [cx, cy] = [(sx + tip[0]) / 2, Math.min(sy, tip[1]) - 3]; // curve control point
  const page = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, u = 1 - t;
    const x = Math.round(u * u * sx + 2 * u * t * cx + t * t * tip[0]);
    const y = Math.round(u * u * sy + 2 * u * t * cy + t * t * tip[1]);
    for (let k = 0; k < 4; k++) page.push([x, y + k]);
  }
  const key = (x, y) => x + ',' + y;
  const onPage = new Set(page.map(([x, y]) => key(x, y)));
  page.forEach(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (!onPage.has(key(x + dx, y + dy))) set(g, x + dx, y + dy, 'a'); }));
  page.forEach(([x, y]) => set(g, x, y, 'b'));
  // a faint line of text on the page
  for (let i = 6; i <= 18; i += 2) {
    const t = i / 24, u = 1 - t;
    set(g, Math.round(u * u * sx + 2 * u * t * cx + t * t * tip[0]), Math.round(u * u * sy + 2 * u * t * cy + t * t * tip[1]) + 2, 'D');
  }
}

function readingFrame(f, blink) {
  const g = READING.map((r) => [...r]);
  if (blink) readingBlink(g);
  pageFlip(g, f % 12 < 6 ? f % 12 : 0);
  twinkle(g, READ_SPARKLES, f);
  g.viewBox = '-6.69 -0.82 106.21 88.89';
  return g;
}

// ---------- frames ----------

export const ACTIVITIES = {
  coffee: { label: 'sipping coffee', frames: 8, speed: 360 },
  reading: { label: 'reading', frames: 12, speed: 260 },
  ramen: { label: 'eating ramen', frames: 8, speed: 280 },
  drawing: { label: 'drawing', frames: 12, speed: 300 },
};

export function buildFrame(activity = 'coffee', f = 0, { blink = false } = {}) {
  if (activity === 'reading') return readingFrame(f, blink);
  if (activity === 'ramen') return ramenFrame(f, blink);
  if (activity === 'drawing') return drawingFrame(f, blink);
  const g = BASE.map((r) => [...r]);
  g.viewBox = '-7.96 -0.36 76.9 65.82';
  const lift = false;
  const sip = activity === 'coffee' && f % 8 === 5;

  if (activity === 'coffee') driftSteam(g, f);
  else removeSteam(g);

  const eyeMode = blink ? 'blink' : (lift || sip) ? 'happy' : 'open';
  eyes(g, eyeMode);


  sparkles(g, f);
  return g;
}

// Every pose is shown in the same frame (source px x 20–1235, y 140–1180 of the original 1254px artwork),
// so switching poses never jumps. `height` is the rendered height in px.
export const ASPECT = 1215 / 1040;

export function toSVG(grid, height = 320) {
  const H = grid.length, W = grid[0].length;
  let rects = '';
  for (let y = 0; y < H; y++) {
    let x = 0;
    while (x < W) {
      const c = grid[y][x];
      if (c === '.') { x++; continue; }
      let run = 1;
      while (x + run < W && grid[y][x + run] === c) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETTE[c] || '#f0f'}"/>`;
      x += run;
    }
  }
  const vb = grid.viewBox || `0 0 ${W} ${H}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="none" width="${Math.round(height * ASPECT)}" height="${height}" shape-rendering="crispEdges" role="img" aria-label="Pixel-art Sanskriti">${rects}</svg>`;
}
