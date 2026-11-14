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

function readingSparkles(g, f) {
  const off = f % 3; // one sparkle rests while the other two shine
  const b = READ_SPARKLES[off];
  for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) if (get(g, x, y) !== '.' && !HAIR_CHARS.includes(get(g, x, y))) set(g, x, y, '.');
  set(g, b.c[0], b.c[1], 'G');
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
  const g = READING.map((r) => r.split(''));
  if (blink) readingBlink(g);
  pageFlip(g, f % 12 < 6 ? f % 12 : 0);
  readingSparkles(g, f);
  g.viewBox = '0 -0.34 92.7 86.4';
  return g;
}

// ---------- frames ----------

export const ACTIVITIES = {
  coffee: { label: 'sipping coffee', frames: 8, speed: 360 },
  reading: { label: 'reading', frames: 12, speed: 260 },
  ramen: { label: 'eating ramen', frames: 8, speed: 260 },
  drawing: { label: 'drawing', frames: 24, speed: 200 },
};

export function buildFrame(activity = 'coffee', f = 0, { blink = false } = {}) {
  if (activity === 'reading') return readingFrame(f, blink);
  const g = BASE.map((r) => r.split(''));
  g.viewBox = '-3.11 0 67.12 64';
  const lift = activity === 'ramen' && (f % 4 === 1 || f % 4 === 2);
  const sip = activity === 'coffee' && f % 8 === 5;

  if (activity === 'coffee') driftSteam(g, f);
  else removeSteam(g);

  const eyeMode = blink ? 'blink' : (lift || sip) ? 'happy' : activity === 'drawing' ? 'down' : 'open';
  eyes(g, eyeMode);
  mouth(g, lift ? 'open' : activity === 'drawing' ? 'flat' : 'smile');

  if (activity === 'ramen') ramen(g, f);
  if (activity === 'drawing') drawing(g, f);

  sparkles(g, f);
  return g;
}

// Every pose is shown in the same frame (the same area of the original 1254px artwork),
// so switching poses never jumps. `height` is the rendered height in px.
export const ASPECT = 1060.5 / 1011;

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
