import SectionHeader from "./SectionHeader";
import Tilt from "./Tilt";

type Fabric = { name: string; hi: string; base: string; lo: string; weave: string };
const FABRICS: Fabric[] = [
  { name: "kon", hi: "#3A3B47", base: "#1D1E26", lo: "#0B0B10", weave: "#C9A24A" },
  { name: "aka", hi: "#E0574A", base: "#B32D24", lo: "#6E140F", weave: "#F1D9A0" },
  { name: "shiro", hi: "#FFFFFF", base: "#EDEDEF", lo: "#BEBEC4", weave: "#C9A24A" },
];

const CHARMS = [
  { k: "形", t: "Product", d: "Flows, systems and the unglamorous hard parts — fuzzy problem → shipped thing.", rot: -3 },
  { k: "絵", t: "Visual", d: "Illustration, type and brand. Interfaces that feel drawn, not assembled.", rot: 2 },
  { k: "考", t: "UX thinking", d: "Research, structure, and asking “why” one more time than is comfortable.", rot: -1.5 },
];

// Pouch silhouette: gathered neck at the top, soft shoulders, rounded bottom corners.
const BODY = "M70 66 C64 76 30 82 26 106 V290 Q26 306 42 306 H158 Q174 306 174 290 V106 C170 82 136 76 130 66 Z";

/** A realistic silk omamori: shaded folds, woven brocade, gold embroidery and a twisted cord knot. */
function Charm({ k, t, i }: { k: string; t: string; i: number }) {
  const f = FABRICS[i];
  const id = `om${i}`;
  return (
    <svg className="charm-svg" viewBox="0 0 200 330" aria-hidden>
      <defs>
        <linearGradient id={`${id}-fold`} x1="0" x2="1">
          <stop offset="0" stopColor={f.lo} />
          <stop offset="0.1" stopColor={f.base} />
          <stop offset="0.22" stopColor={f.hi} />
          <stop offset="0.4" stopColor={f.base} />
          <stop offset="0.62" stopColor={f.base} />
          <stop offset="0.74" stopColor={f.hi} stopOpacity="0.85" />
          <stop offset="0.9" stopColor={f.base} />
          <stop offset="1" stopColor={f.lo} />
        </linearGradient>
        <linearGradient id={`${id}-vshade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.18" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <pattern id={`${id}-weave`} width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M4.5 0 L9 4.5 L4.5 9 L0 4.5 Z" fill="none" stroke={f.weave} strokeOpacity="0.22" strokeWidth="0.6" />
          <circle cx="4.5" cy="4.5" r="0.8" fill={f.weave} fillOpacity="0.35" />
        </pattern>
        <pattern id={`${id}-band`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="5" fill="none" stroke={f.weave} strokeOpacity="0.55" strokeWidth="0.8" />
          <circle cx="7" cy="7" r="2" fill={f.weave} fillOpacity="0.5" />
        </pattern>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBEBB5" />
          <stop offset="0.45" stopColor="#D8AE52" />
          <stop offset="1" stopColor="#8C6A1C" />
        </linearGradient>
        <linearGradient id={`${id}-cord`} x1="0" x2="1">
          <stop offset="0" stopColor="#8E1F18" />
          <stop offset="0.5" stopColor="#E0574A" />
          <stop offset="1" stopColor="#8E1F18" />
        </linearGradient>
        <filter id={`${id}-emb`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.4" floodColor="#000" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-0.6" stdDeviation="0.2" floodColor="#fff" floodOpacity="0.35" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* pouch */}
      <path d={BODY} fill={`url(#${id}-fold)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="60" width="200" height="260" fill={`url(#${id}-weave)`} />
        <rect x="20" y="246" width="160" height="44" fill={`url(#${id}-band)`} />
        <path d="M20 246 H180 M20 290 H180" stroke={f.weave} strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="0" y="60" width="200" height="260" fill={`url(#${id}-vshade)`} />
        {/* gathered pleats at the neck */}
        <path d="M80 68 Q86 92 84 118 M92 66 Q96 90 96 112 M108 66 Q104 90 104 112 M120 68 Q114 92 116 118" stroke="#000" strokeOpacity="0.22" fill="none" />
        <path d="M82 68 Q88 92 86 118 M110 66 Q106 90 106 112" stroke="#fff" strokeOpacity="0.12" fill="none" />
      </g>
      <path d={BODY} fill="none" stroke="#000" strokeOpacity="0.35" />
      {/* stitched seam */}
      <path d="M34 112 V288 Q34 298 44 298 H156 Q166 298 166 288 V112" fill="none" stroke={f.weave} strokeOpacity="0.55" strokeDasharray="2.4 2.6" />

      {/* gold embroidery */}
      <g fill={`url(#${id}-gold)`} filter={`url(#${id}-emb)`}>
        <text x="100" y="146" textAnchor="middle" className="charm-mamori">
          御守
        </text>
        <text x="100" y="214" textAnchor="middle" className="charm-k">
          {k}
        </text>
        <text x="100" y="238" textAnchor="middle" className="charm-t">
          {t}
        </text>
      </g>

      {/* twisted cord + agemaki-style knot, tails hanging over the pouch */}
      <g className="cord-knot">
        <path d="M100 0 C92 22 86 44 88 70 M100 0 C108 22 114 44 112 70" stroke={`url(#${id}-cord)`} strokeWidth="3.2" fill="none" />
        <path d="M100 0 C92 22 86 44 88 70 M100 0 C108 22 114 44 112 70" stroke="#5E120D" strokeWidth="3.2" strokeDasharray="1.4 2.2" fill="none" strokeOpacity="0.6" />
        <ellipse cx="86" cy="70" rx="13" ry="8" transform="rotate(-25 86 70)" fill="none" stroke={`url(#${id}-cord)`} strokeWidth="3.4" />
        <ellipse cx="114" cy="70" rx="13" ry="8" transform="rotate(25 114 70)" fill="none" stroke={`url(#${id}-cord)`} strokeWidth="3.4" />
        <ellipse cx="100" cy="60" rx="7" ry="9" fill="none" stroke={`url(#${id}-cord)`} strokeWidth="3.4" />
        <rect x="93" y="70" width="14" height="10" rx="4" fill="#A82A22" />
        <path d="M95 80 C90 110 86 140 80 168 M105 80 C110 110 114 140 120 168" stroke={`url(#${id}-cord)`} strokeWidth="3" fill="none" />
        <path d="M95 80 C90 110 86 140 80 168 M105 80 C110 110 114 140 120 168" stroke="#5E120D" strokeWidth="3" strokeDasharray="1.4 2.2" fill="none" strokeOpacity="0.55" />
      </g>
    </svg>
  );
}

export default function Craft() {
  return (
    <section className="col section" id="craft">
      <SectionHeader kanji="仕" kicker="01 · shigoto — work" title="What I do" />
      <div className="charms">
        <svg className="charm-string" viewBox="0 0 680 30" preserveAspectRatio="none" aria-hidden>
          <path d="M0 6 Q340 26 680 6" className="s-ink" strokeWidth="1.4" fill="none" />
        </svg>
        {CHARMS.map((c, i) => (
          <figure key={c.t} className="charm" style={{ ["--rot" as string]: `${c.rot}deg` }}>
            <Tilt className="charm-swing" max={16} rotate={c.rot} perspective={700}>
              <Charm k={c.k} t={c.t} i={i} />
            </Tilt>
            <figcaption>{c.d}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
