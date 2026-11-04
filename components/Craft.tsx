import SectionHeader from "./SectionHeader";

type Fabric = { base: string; panel: string; text: string; pattern: string };
const FABRICS: Fabric[] = [
  { base: "#161616", panel: "#232227", text: "#F5F2EC", pattern: "#F5F2EC" },
  { base: "#B8322A", panel: "#C8443A", text: "#FBF4E8", pattern: "#FBF4E8" },
  { base: "#EFE7D8", panel: "#FBF9F5", text: "#161616", pattern: "#161616" },
];

const CHARMS = [
  { k: "形", t: "Product", d: "Flows, systems and the unglamorous hard parts — fuzzy problem → shipped thing.", rot: -3 },
  { k: "絵", t: "Visual", d: "Illustration, type and brand. Interfaces that feel drawn, not assembled.", rot: 2 },
  { k: "考", t: "UX thinking", d: "Research, structure, and asking “why” one more time than is comfortable.", rot: -1.5 },
];

const BODY = "M18 78 Q18 52 100 40 Q182 52 182 78 V286 Q182 298 170 298 H30 Q18 298 18 286 Z";

/** Silk omamori: brocade (hishi diamonds), stitched panel, red knot. */
function Charm({ k, t, i }: { k: string; t: string; i: number }) {
  const f = FABRICS[i];
  return (
    <svg className="charm-svg" width="200" height="320" viewBox="0 -20 200 320" aria-hidden>
      <defs>
        <clipPath id={`cb${i}`}>
          <path d={BODY} />
        </clipPath>
        <pattern id={`hishi${i}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke={f.pattern} strokeOpacity="0.18" strokeWidth="0.8" />
          <circle cx="6" cy="6" r="0.9" fill={f.pattern} fillOpacity="0.25" />
        </pattern>
        <linearGradient id={`sheen${i}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      {/* red silk cord + decorative knot */}
      <g style={{ filter: "url(#ink-rough)" }}>
        <path d="M100 -20 C92 0 86 20 88 42 M100 -20 C108 0 114 20 112 42" stroke="#C8372D" strokeWidth="2.4" fill="none" />
        <ellipse cx="92" cy="22" rx="9" ry="6" transform="rotate(-30 92 22)" fill="none" stroke="#C8372D" strokeWidth="2.4" />
        <ellipse cx="108" cy="22" rx="9" ry="6" transform="rotate(30 108 22)" fill="none" stroke="#C8372D" strokeWidth="2.4" />
        <circle cx="100" cy="27" r="3.5" fill="#8E1F18" />
      </g>
      <path d={BODY} fill={f.base} />
      <g clipPath={`url(#cb${i})`}>
        <rect x="0" y="30" width="200" height="280" fill={`url(#hishi${i})`} />
        <rect x="0" y="232" width="200" height="70" fill={f.pattern} fillOpacity="0.08" />
        <path d="M0 232 H200 M0 238 H200" stroke={f.pattern} strokeOpacity="0.35" />
        <rect x="0" y="30" width="200" height="280" fill={`url(#sheen${i})`} />
      </g>
      <path d={BODY} fill="none" stroke="#161616" strokeWidth="1.6" style={{ filter: "url(#ink-rough)" }} />
      <rect x="44" y="70" width="112" height="150" rx="6" fill={f.panel} />
      <rect x="49" y="75" width="102" height="140" rx="4" fill="none" stroke="#C8372D" strokeOpacity="0.9" strokeDasharray="3 3" />
      <text x="100" y="158" textAnchor="middle" className="charm-k" fill={f.text} style={{ filter: "url(#ink-bleed)" }}>
        {k}
      </text>
      <text x="100" y="200" textAnchor="middle" className="charm-t" fill={f.text}>
        {t}
      </text>
      <text x="100" y="270" textAnchor="middle" className="charm-sub" fill={f.text} fillOpacity="0.55">
        御守
      </text>
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
            <div className="charm-swing">
              <Charm k={c.k} t={c.t} i={i} />
            </div>
            <figcaption>{c.d}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
