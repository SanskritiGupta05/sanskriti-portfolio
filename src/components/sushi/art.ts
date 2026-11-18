// Hand-drawn SVG art for the sushi conveyor footer, kept as strings and shown as images.
// Each plate is drawn on a 120×80 canvas, with the plate centred at (60, 62).

const RICE = "#fbf8f1";
const RICE_SHADE = "#e9e0cf";
const NORI = "#27302b";

type Plate = { rim: string; inner: string; base: string; dots?: string; ring?: string };
// every plate on the belt is a different one
const PLATES: Record<string, Plate> = {
  blue: { rim: "#3f5f9e", inner: "#f7f3ea", base: "#2f477a", dots: RICE }, // indigo with white dots
  pink: { rim: "#e8877f", inner: "#fbe6de", base: "#c9675f" }, // sakura pink
  cream: { rim: "#e3cfa6", inner: "#fdf6e6", base: "#c8b085" }, // plain stoneware
  red: { rim: "#d4513f", inner: "#fcefe7", base: "#a93a2b" }, // vermilion
  matcha: { rim: "#86a874", inner: "#f4f6ec", base: "#5f8150", ring: "#f4f6ec" }, // matcha green with a white ring
  lacquer: { rim: "#2f2a28", inner: "#f7efe2", base: "#1b1716", dots: "#d9b25a" }, // black lacquer with gold dots
};

function plate(kind: keyof typeof PLATES) {
  const p = PLATES[kind];
  const dashes = p.dots
    ? Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const x = 60 + Math.cos(a) * 49;
        const y = 62 + Math.sin(a) * 13.5;
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.2" ry="1" fill="${p.dots}"/>`;
      }).join("")
    : "";
  return `
    <ellipse cx="60" cy="71" rx="50" ry="7" fill="rgba(60,30,20,0.25)"/>
    <ellipse cx="60" cy="65" rx="53" ry="15" fill="${p.base}"/>
    <ellipse cx="60" cy="62" rx="53" ry="15" fill="${p.rim}"/>
    ${dashes}
    ${p.ring ? `<ellipse cx="60" cy="62" rx="48" ry="13.4" fill="none" stroke="${p.ring}" stroke-width="1.4"/>` : ""}
    <ellipse cx="60" cy="61" rx="43" ry="11" fill="${p.inner}"/>
    <ellipse cx="60" cy="63" rx="30" ry="6.5" fill="${p.rim}" opacity="0.18"/>`;
}

const riceBed = `
  <ellipse cx="60" cy="58" rx="30" ry="6" fill="${RICE_SHADE}"/>
  <path d="M31 56 Q31 41 60 41 Q89 41 89 56 Q60 62 31 56Z" fill="${RICE}"/>
  <path d="M38 49 Q40 45 44 44" stroke="${RICE_SHADE}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;

function nigiri(fish: string, stripe: string, shade: string) {
  return `${riceBed}
    <path d="M25 47 Q33 30 62 30 Q91 30 95 47 Q91 53 60 51 Q31 53 25 47Z" fill="${fish}"/>
    <path d="M27 48 Q32 52 60 51 Q90 53 94 48 Q90 55 60 54 Q32 55 27 48Z" fill="${shade}"/>
    <path d="M40 34 Q45 42 41 50 M52 31 Q57 40 53 51 M64 31 Q69 40 65 51 M76 32 Q81 40 77 50" stroke="${stripe}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M38 35 Q50 31 66 31" stroke="#ffffff" stroke-opacity="0.45" stroke-width="2" fill="none" stroke-linecap="round"/>`;
}

const SUSHI: Record<string, string> = {
  salmon: nigiri("#f3864a", "#ffd6bb", "#d9693a"),
  tamago: `${riceBed}
    <rect x="27" y="31" width="66" height="19" rx="4" fill="#f2c24f"/>
    <rect x="27" y="31" width="66" height="7" rx="3" fill="#fbe08f"/>
    <path d="M33 44 H87" stroke="#e3a93a" stroke-width="1.4"/>
    <rect x="53" y="28" width="14" height="25" rx="2.5" fill="${NORI}"/>
    <rect x="55" y="29" width="3" height="22" rx="1.5" fill="#3b4740"/>`,
  ebi: `${riceBed}
    <path d="M22 47 Q34 29 64 31 Q86 32 92 43 Q72 51 40 51 Q27 51 22 47Z" fill="#fde6d4"/>
    <path d="M34 36 Q39 43 35 50 M46 32 Q51 41 47 51 M58 31 Q63 40 59 51 M70 32 Q75 40 71 50 M81 35 Q85 41 82 47" stroke="#f27b3f" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M89 41 L104 31 L101 43 L106 51 L90 47Z" fill="#e3472d"/>
    <path d="M92 43 L101 37" stroke="#f58a62" stroke-width="1.4" stroke-linecap="round"/>`,
  inari: `
    <ellipse cx="60" cy="58" rx="30" ry="6" fill="#c98a3c" opacity="0.35"/>
    <path d="M28 52 Q25 36 40 32 Q60 25 80 32 Q95 36 92 52 Q60 60 28 52Z" fill="#d99a48"/>
    <path d="M30 50 Q60 58 90 50 Q90 55 60 58 Q30 55 30 50Z" fill="#bf7f33"/>
    <ellipse cx="60" cy="33" rx="22" ry="5.5" fill="${RICE}"/>
    <ellipse cx="60" cy="34.5" rx="22" ry="3" fill="${RICE_SHADE}" opacity="0.6"/>
    <path d="M38 40 Q42 46 40 51 M52 38 Q55 45 53 52 M68 38 Q65 45 67 52 M82 40 Q78 46 80 51" stroke="#b97830" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M36 37 Q46 33 56 33" stroke="#f3c47e" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${[[52, 32], [58, 34], [64, 31], [69, 34], [55, 35]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="0.6" fill="#3b2b20"/>`).join("")}`,
  ikura: `
    <ellipse cx="60" cy="58" rx="28" ry="6" fill="${RICE_SHADE}"/>
    <rect x="33" y="31" width="54" height="27" rx="7" fill="${NORI}"/>
    <rect x="37" y="34" width="4" height="21" rx="2" fill="#3b4740"/>
    <ellipse cx="60" cy="32" rx="27" ry="7" fill="${RICE}"/>
    ${[
      [44, 30], [51, 27], [58, 25], [66, 26], [73, 28], [79, 31], [48, 33], [55, 31], [62, 30], [69, 31], [42, 34], [76, 34], [59, 34], [66, 34], [52, 35],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#f0561f"/><circle cx="${x - 1}" cy="${y - 1.2}" r="1.1" fill="#ffd2b8"/>`)
      .join("")}`,
  maki: [36, 60, 84]
    .map(
      (x, i) => `
    <rect x="${x - 11}" y="35" width="22" height="22" rx="3" fill="${NORI}"/>
    <ellipse cx="${x}" cy="35" rx="11" ry="5" fill="${NORI}"/>
    <ellipse cx="${x}" cy="35" rx="9" ry="3.8" fill="${RICE}"/>
    <ellipse cx="${x}" cy="35" rx="3.8" ry="1.8" fill="${["#f3864a", "#6aaa4b", "#f3864a"][i]}"/>
    <rect x="${x - 8}" y="40" width="3" height="14" rx="1.5" fill="#3b4740"/>`,
    )
    .join(""),
};

export const MENU: { id: string; name: string; plate: keyof typeof PLATES; svg: string }[] = [
  { id: "salmon", name: "Salmon nigiri", plate: "blue", svg: "" },
  { id: "tamago", name: "Tamago", plate: "red", svg: "" },
  { id: "maki", name: "Maki", plate: "cream", svg: "" },
  { id: "ikura", name: "Ikura gunkan", plate: "pink", svg: "" },
  { id: "ebi", name: "Ebi nigiri", plate: "lacquer", svg: "" },
  { id: "inari", name: "Inari", plate: "matcha", svg: "" },
].map((m) => ({
  ...m,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">${plate(m.plate)}${SUSHI[m.id]}</svg>`,
}));

// the noren curtain over the counter: a wooden rod and three red panels, a steaming bowl on the middle one
export const NOREN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 76" width="220" height="76">
  ${[22, 81, 140]
    .map(
      (x) => `<path d="M${x} 8 H${x + 58} V66 Q${x + 44} 70 ${x + 29} 66 Q${x + 14} 70 ${x} 66Z" fill="#c8432e"/>
      <rect x="${x}" y="8" width="58" height="5" fill="#a83623"/>
      <rect x="${x + 3}" y="14" width="3" height="48" fill="#d9614a" opacity="0.6"/>`,
    )
    .join("")}
  <path d="M93 40 H127 Q126 53 110 53 Q94 53 93 40Z" fill="none" stroke="#fdf3ea" stroke-width="3" stroke-linejoin="round"/>
  <path d="M101 34 q-3 -4 0 -8 t0 -8 M110 34 q-3 -4 0 -8 t0 -8 M119 34 q-3 -4 0 -8 t0 -8" fill="none" stroke="#fdf3ea" stroke-width="2.6" stroke-linecap="round"/>
  <rect x="4" y="3" width="212" height="6" rx="3" fill="#a8703f"/>
  <rect x="2" y="2" width="8" height="8" rx="2" fill="#8a5730"/>
  <rect x="210" y="2" width="8" height="8" rx="2" fill="#8a5730"/>
</svg>`;

// The belt, drawn as a loop seen from the front: every layer is a full pill sharing one end
// radius, so the rails curve round both ends instead of stopping. The moving slats and the
// turning ends are drawn on top by the component.
export const BELT_H = 112;
// where the dark running surface sits inside the drawing
export const SURFACE = { inset: 10, top: 26, h: 52 };
export function beltSvg(w: number) {
  const W = Math.max(200, Math.round(w));
  const { inset: i, top: t, h } = SURFACE;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${BELT_H}" width="${W}" height="${BELT_H}">
    <rect x="8" y="100" width="${W - 16}" height="10" rx="5" fill="rgba(60,30,20,0.16)"/>
    <rect x="0" y="24" width="${W}" height="82" rx="41" fill="#94351f"/>
    <rect x="0" y="16" width="${W}" height="82" rx="41" fill="#c4513a"/>
    <rect x="3" y="18" width="${W - 6}" height="40" rx="20" fill="#d06048" opacity="0.6"/>
    <rect x="${i - 3}" y="${t - 3}" width="${W - 2 * (i - 3)}" height="${h + 6}" rx="${(h + 6) / 2}" fill="#7a2c1d"/>
    <rect x="${i}" y="${t}" width="${W - 2 * i}" height="${h}" rx="${h / 2}" fill="#5b3f35"/>
    <rect x="${i + 16}" y="${t + 2}" width="${W - 2 * i - 32}" height="5" rx="2.5" fill="#48302a"/>
    <path d="M${41} ${16 + 82 - 9} H${W - 41}" stroke="#e07a5b" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>
  </svg>`;
}
