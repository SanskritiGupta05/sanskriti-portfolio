const NORI = "#1f2723";

const rnd = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};
const f = (n: number) => Math.round(n * 10) / 10;

const DEFS = `
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="softer" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0.8"/></filter>
  <radialGradient id="rice" cx="0.45" cy="0.35" r="0.75"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f8f2e6"/><stop offset="1" stop-color="#e4d8c2"/></radialGradient>
  <linearGradient id="nori" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2e3a33"/><stop offset="0.25" stop-color="#3d4a42"/><stop offset="0.5" stop-color="${NORI}"/><stop offset="1" stop-color="#151b18"/></linearGradient>`;

function grains(cx: number, cy: number, rx: number, ry: number, n: number, seed: number) {
    let out = "";
    for (let i = 0; i < n; i++) {
        const a = rnd(seed + i) * Math.PI * 2;
        const d = Math.sqrt(rnd(seed + i + 50));
        const x = cx + Math.cos(a) * rx * d;
        const y = cy + Math.sin(a) * ry * d;
        const rot = Math.round(rnd(seed + i + 99) * 180);
        out += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="1.9" ry="1" transform="rotate(${rot} ${f(x)} ${f(y)})" fill="#fffdf8" stroke="#ddd0b8" stroke-width="0.35"/>`;
    }
    return out;
}

type Plate = {
    rim: string;
    rimHi: string;
    inner: string;
    base: string;
    dots?: string;
    ring?: string;
};
const PLATES: Record<string, Plate> = {
    blue: { rim: "#3f5f9e", rimHi: "#5d7fbf", inner: "#f7f3ea", base: "#2a4070", dots: "#fbf8f1" },
    pink: { rim: "#e8877f", rimHi: "#f4aaa2", inner: "#fdeae3", base: "#c4625a" },
    cream: { rim: "#e3cfa6", rimHi: "#f1e3c4", inner: "#fdf7ea", base: "#c2a87c" },
    red: { rim: "#d4513f", rimHi: "#e77561", inner: "#fdf1ea", base: "#a33626" },
    matcha: {
        rim: "#86a874",
        rimHi: "#a4c393",
        inner: "#f5f7ee",
        base: "#5a7b4b",
        ring: "#f5f7ee",
    },
    lacquer: {
        rim: "#2f2a28",
        rimHi: "#4a4340",
        inner: "#f8f0e3",
        base: "#141110",
        dots: "#d9b25a",
    },
};

function plate(kind: keyof typeof PLATES) {
    const p = PLATES[kind];
    const dots = p.dots
        ? Array.from({ length: 16 }, (_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return `<ellipse cx="${f(60 + Math.cos(a) * 48.5)}" cy="${f(62 + Math.sin(a) * 13.3)}" rx="2" ry="0.95" fill="${p.dots}"/>`;
          }).join("")
        : "";
    return `
    <defs>
      <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.rimHi}"/><stop offset="0.55" stop-color="${p.rim}"/><stop offset="1" stop-color="${p.base}"/></linearGradient>
      <radialGradient id="well" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="${p.inner}"/><stop offset="1" stop-color="${p.rim}" stop-opacity="0.35"/></radialGradient>
    </defs>
    <ellipse cx="60" cy="71" rx="50" ry="6.5" fill="rgba(50,25,15,0.28)" filter="url(#soft)"/>
    <ellipse cx="60" cy="65.5" rx="53" ry="14.5" fill="${p.base}"/>
    <ellipse cx="60" cy="62" rx="53" ry="15" fill="url(#rim)"/>
    ${dots}
    ${p.ring ? `<ellipse cx="60" cy="62" rx="48" ry="13.3" fill="none" stroke="${p.ring}" stroke-width="1.3"/>` : ""}
    <ellipse cx="60" cy="61" rx="43" ry="11" fill="url(#well)"/>
    <ellipse cx="60" cy="61" rx="43" ry="11" fill="none" stroke="${p.base}" stroke-opacity="0.25" stroke-width="0.8"/>
    <path d="M14 58 Q30 48.5 60 47.5" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.6" fill="none" stroke-linecap="round" filter="url(#softer)"/>`;
}

const riceBed = `
  <ellipse cx="60" cy="58.5" rx="33" ry="6" fill="rgba(60,35,20,0.28)" filter="url(#soft)"/>
  <clipPath id="riceClip"><path d="M30 56 Q30 40 60 40 Q90 40 90 56 Q60 62.5 30 56Z"/></clipPath>
  <path d="M30 56 Q30 40 60 40 Q90 40 90 56 Q60 62.5 30 56Z" fill="url(#rice)"/>
  <g clip-path="url(#riceClip)">${grains(60, 52, 30, 8, 46, 7)}</g>`;

function nigiri(id: string, hi: string, mid: string, lo: string, stripe: string) {
    return `
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="0.55" stop-color="${mid}"/><stop offset="1" stop-color="${lo}"/></linearGradient></defs>
    ${riceBed}
    <ellipse cx="60" cy="50" rx="32" ry="4" fill="rgba(60,25,10,0.25)" filter="url(#soft)"/>
    <path d="M24 47 Q31 29 62 29 Q92 29 96 46 Q92 53 60 51 Q30 53 24 47Z" fill="url(#${id})"/>
    <path d="M38 33 Q44 41 40 50 M50 30.5 Q56 40 52 51 M62 30 Q68 40 64 51 M74 30.5 Q80 40 76 50.5 M86 34 Q90 40 87 47" stroke="${stripe}" stroke-width="2.4" stroke-opacity="0.85" fill="none" stroke-linecap="round"/>
    <path d="M41 33.5 Q46 41 42.5 49 M53 31 Q58.5 40 54.5 50.5 M65 30.5 Q70.5 40 66.5 50.5 M77 31 Q82.5 40 78.5 50" stroke="${lo}" stroke-width="0.7" stroke-opacity="0.35" fill="none" stroke-linecap="round"/>
    <path d="M34 34 Q48 29.5 68 30.5" stroke="#ffffff" stroke-opacity="0.75" stroke-width="2.4" fill="none" stroke-linecap="round" filter="url(#softer)"/>
    <ellipse cx="45" cy="35" rx="5" ry="1.4" fill="#ffffff" opacity="0.6" filter="url(#softer)"/>`;
}

const SUSHI: Record<string, string> = {
    salmon: nigiri("salmon", "#ffab78", "#f5844a", "#d8602e", "#fff0e2"),

    tamago: `
    <defs>
      <linearGradient id="egg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe48e"/><stop offset="0.5" stop-color="#f6c94f"/><stop offset="1" stop-color="#e2a632"/></linearGradient>
    </defs>
    ${riceBed}
    <ellipse cx="60" cy="50.5" rx="34" ry="3.5" fill="rgba(60,35,10,0.25)" filter="url(#soft)"/>
    <rect x="26" y="30" width="68" height="20" rx="4.5" fill="url(#egg)"/>
    <rect x="26" y="30" width="68" height="6" rx="3" fill="#fff0b8" opacity="0.8"/>
    <path d="M30 40 Q60 41.5 90 40 M30 44.5 Q60 46 90 44.5" stroke="#d99b2c" stroke-width="0.9" stroke-opacity="0.6" fill="none"/>
    ${[
        [34, 33],
        [44, 32],
        [78, 33.5],
        [86, 32.5],
        [70, 32],
    ]
        .map(
            ([x, y]) =>
                `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="0.9" fill="#e6a53a" opacity="0.45"/>`,
        )
        .join("")}
    <ellipse cx="44" cy="32.5" rx="9" ry="1.3" fill="#ffffff" opacity="0.55" filter="url(#softer)"/>
    <rect x="52.5" y="27" width="15" height="27" rx="2.5" fill="url(#nori)"/>
    <path d="M55 29 V52 M58.5 29 V52 M63 29 V52" stroke="#4d5a52" stroke-width="0.5" stroke-opacity="0.6"/>`,

    ebi: `
    <defs>
      <linearGradient id="prawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4ea"/><stop offset="1" stop-color="#f7d2bd"/></linearGradient>
      <linearGradient id="band" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a5c"/><stop offset="1" stop-color="#e2582b"/></linearGradient>
      <linearGradient id="tail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a4a"/><stop offset="1" stop-color="#c8341f"/></linearGradient>
    </defs>
    ${riceBed}
    <ellipse cx="58" cy="50" rx="32" ry="3.6" fill="rgba(60,25,10,0.22)" filter="url(#soft)"/>
    <path d="M21 47 Q33 28 64 30 Q87 31 93 42 Q73 51 40 51 Q26 51 21 47Z" fill="url(#prawn)"/>
    <path d="M33 35.5 Q38.5 43 34.5 50 M45 31.5 Q51 41 47 51 M57 30.5 Q63 40 59 51 M69 31 Q75 40 71 50.5 M80.5 34 Q85.5 40.5 82 47.5" stroke="url(#band)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M89.5 40.5 L103 29.5 Q106 36 101.5 42.5 Q107 47 104.5 53 L90.5 47Z" fill="url(#tail)"/>
    <path d="M92 43 L102 35 M92 44.5 L102.5 49" stroke="#ffb08a" stroke-width="1" stroke-opacity="0.8" stroke-linecap="round"/>
    <path d="M30 37 Q46 30.5 66 31.5" stroke="#ffffff" stroke-opacity="0.8" stroke-width="2.2" fill="none" stroke-linecap="round" filter="url(#softer)"/>`,

    inari: `
    <defs>
      <linearGradient id="tofu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2be6c"/><stop offset="0.55" stop-color="#dc9a46"/><stop offset="1" stop-color="#b8772d"/></linearGradient>
    </defs>
    <ellipse cx="60" cy="58" rx="33" ry="5.5" fill="rgba(60,30,10,0.3)" filter="url(#soft)"/>
    <path d="M27 52 Q24 35 40 31 Q60 24 80 31 Q96 35 93 52 Q60 61 27 52Z" fill="url(#tofu)"/>
    ${Array.from({ length: 40 }, (_, i) => {
        const x = 31 + rnd(i + 300) * 58;
        const y = 36 + rnd(i + 400) * 17;
        return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.4 + rnd(i + 500) * 0.5)}" fill="#a8681f" opacity="0.45"/>`;
    }).join("")}
    <path d="M37 39 Q42 46 39.5 52 M51 37 Q55 45 52.5 53 M69 37 Q65 45 67.5 53 M83 39 Q78 46 80.5 52" stroke="#a96b25" stroke-width="1.4" stroke-opacity="0.75" fill="none" stroke-linecap="round"/>
    <clipPath id="topClip"><ellipse cx="60" cy="32.5" rx="22.5" ry="5.6"/></clipPath>
    <ellipse cx="60" cy="32.5" rx="22.5" ry="5.6" fill="url(#rice)"/>
    <g clip-path="url(#topClip)">${grains(60, 33, 22, 5, 26, 21)}</g>
    <ellipse cx="60" cy="32.5" rx="22.5" ry="5.6" fill="none" stroke="#c98a3c" stroke-width="1.2"/>
    ${[
        [50, 31.5],
        [57, 33.5],
        [63, 30.5],
        [69, 33],
        [54, 34.5],
        [66, 34.8],
    ]
        .map(
            ([x, y]) =>
                `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="0.6" fill="${x % 2 ? "#3b2b20" : "#f3e7c9"}" stroke="#8a6a45" stroke-width="0.2"/>`,
        )
        .join("")}
    <path d="M33 38 Q44 33 56 33" stroke="#ffe0a8" stroke-width="2.4" stroke-opacity="0.8" fill="none" stroke-linecap="round" filter="url(#softer)"/>`,

    ikura: `
    <defs>
      <radialGradient id="roe" cx="0.4" cy="0.35" r="0.65"><stop offset="0" stop-color="#ffb070"/><stop offset="0.5" stop-color="#f4651f"/><stop offset="1" stop-color="#c63a10"/></radialGradient>
    </defs>
    <ellipse cx="60" cy="58.5" rx="31" ry="5.5" fill="rgba(40,30,20,0.3)" filter="url(#soft)"/>
    <rect x="33" y="31" width="54" height="27" rx="7" fill="url(#nori)"/>
    <path d="M40 34 V55 M47 33 V56 M70 33 V56 M80 34 V55" stroke="#4a574f" stroke-width="0.6" stroke-opacity="0.55"/>
    <rect x="36.5" y="34" width="3" height="21" rx="1.5" fill="#ffffff" opacity="0.18"/>
    <ellipse cx="60" cy="32" rx="27" ry="7" fill="url(#rice)"/>
    <path d="M78 30 Q84 27 87 31 Q83 34 78 30Z" fill="#7fb35c"/><path d="M79 30.2 Q83 28.5 86 31" stroke="#c9e6b0" stroke-width="0.6" fill="none"/>
    ${[
        [46, 31.5],
        [52, 28.5],
        [59, 26.5],
        [66, 27.5],
        [72, 30],
        [43, 34],
        [49, 33],
        [56, 31],
        [63, 30.8],
        [69, 32.5],
        [75, 33.8],
        [53, 35],
        [60, 34.6],
        [66, 35.2],
        [58, 29],
        [47, 36],
    ]
        .map(
            ([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="3.5" fill="url(#roe)"/><circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="#a52e0b" stroke-width="0.35" stroke-opacity="0.6"/><circle cx="${f(x - 1.1)}" cy="${f(y - 1.2)}" r="0.9" fill="#ffffff" opacity="0.9"/><circle cx="${f(x + 0.6)}" cy="${f(y + 0.9)}" r="1.2" fill="#ffd4a8" opacity="0.4"/>`,
        )
        .join("")}`,

    maki: [
        [36, "#f58a52", "#ffc39c"],
        [60, "#6aaa4b", "#b6dd8f"],
        [84, "#f5c84f", "#fff0b0"],
    ]
        .map(
            ([x, fill, fillHi], i) => `
    <ellipse cx="${x}" cy="56.5" rx="12.5" ry="3.4" fill="rgba(40,30,20,0.3)" filter="url(#soft)"/>
    <rect x="${(x as number) - 11.5}" y="35" width="23" height="21" rx="3.5" fill="url(#nori)"/>
    <path d="M${(x as number) - 6} 38 V54 M${(x as number) + 5} 38 V54" stroke="#4a574f" stroke-width="0.5" stroke-opacity="0.5"/>
    <ellipse cx="${x}" cy="35" rx="11.5" ry="5.2" fill="#2b3530"/>
    <ellipse cx="${x}" cy="35" rx="9.6" ry="4" fill="url(#rice)"/>
    <clipPath id="mk${i}"><ellipse cx="${x}" cy="35" rx="9.6" ry="4"/></clipPath>
    <g clip-path="url(#mk${i})">${grains(x as number, 35, 9.6, 4, 14, 60 + i * 20)}</g>
    <ellipse cx="${x}" cy="35" rx="4" ry="1.9" fill="${fill}"/>
    <ellipse cx="${(x as number) - 1}" cy="34.4" rx="2" ry="0.8" fill="${fillHi}" opacity="0.8"/>
    <rect x="${(x as number) - 9}" y="39" width="2.4" height="14" rx="1.2" fill="#ffffff" opacity="0.15"/>`,
        )
        .join(""),
};

export const MENU: {
    id: string;
    name: string;
    plate: keyof typeof PLATES;
    plateSvg: string;
    sushiSvg: string;
}[] = (
    [
        { id: "salmon", name: "Salmon nigiri", plate: "blue" },
        { id: "tamago", name: "Tamago", plate: "red" },
        { id: "maki", name: "Maki", plate: "cream" },
        { id: "ikura", name: "Ikura gunkan", plate: "pink" },
        { id: "ebi", name: "Ebi nigiri", plate: "lacquer" },
        { id: "inari", name: "Inari", plate: "matcha" },
    ] as const
).map((m) => ({
    ...m,
    plateSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="360" height="240"><defs>${DEFS}</defs>${plate(m.plate)}</svg>`,
    sushiSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="360" height="240"><defs>${DEFS}</defs>${SUSHI[m.id]}</svg>`,
}));

export const NOREN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 76" width="220" height="76">
  ${[22, 81, 140]
      .map(
          (
              x,
          ) => `<path d="M${x} 8 H${x + 58} V66 Q${x + 44} 70 ${x + 29} 66 Q${x + 14} 70 ${x} 66Z" fill="#c8432e"/>
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

export const BELT_H = 112;
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
