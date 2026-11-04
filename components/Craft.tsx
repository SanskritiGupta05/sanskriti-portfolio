import SectionHeader from "./SectionHeader";

const CHARMS = [
  { k: "形", t: "Product", d: "Flows, systems and the unglamorous hard parts — fuzzy problem → shipped thing.", dark: true, rot: -3 },
  { k: "絵", t: "Visual", d: "Illustration, type and brand. Interfaces that feel drawn, not assembled.", rot: 2 },
  { k: "考", t: "UX thinking", d: "Research, structure, and asking “why” one more time than is comfortable.", rot: -1.5 },
];

function Charm({ k, t, dark, i }: { k: string; t: string; dark?: boolean; i: number }) {
  const pat = Array.from({ length: 26 }, (_, n) => -40 + n * 10);
  return (
    <svg className="charm-svg" width="200" height="300" viewBox="0 0 200 300" aria-hidden>
      <defs>
        <clipPath id={`cp${i}`}>
          <path d="M18 78 Q18 52 100 40 Q182 52 182 78 V286 Q182 298 170 298 H30 Q18 298 18 286 Z" />
        </clipPath>
      </defs>
      <path d="M100 0 C90 14 84 26 86 42 M100 0 C110 14 116 26 114 42" className="s-ink" strokeWidth="1.6" fill="none" />
      <path d="M18 78 Q18 52 100 40 Q182 52 182 78 V286 Q182 298 170 298 H30 Q18 298 18 286 Z" className={`${dark ? "f-ink" : "f-paper2"} s-ink`} strokeWidth="1.6" />
      <g clipPath={`url(#cp${i})`}>
        {pat.map((x) => (
          <path key={x} d={`M${x} 300 L${x + 40} 240`} className={dark ? "s-paper" : "s-ink"} strokeOpacity="0.25" />
        ))}
        <rect x="0" y="236" width="200" height="2" className={dark ? "f-paper" : "f-ink"} fillOpacity="0.4" />
      </g>
      <path d="M30 82 Q30 64 100 54 Q170 64 170 82 V228 H30 Z" fill="none" className={dark ? "s-paper" : "s-ink"} strokeOpacity="0.45" strokeDasharray="3 3" />
      <path d="M86 44 Q100 52 114 44 L110 56 Q100 50 90 56 Z" fill="#B8322A" />
      <text x="100" y="160" textAnchor="middle" className={`charm-k ${dark ? "f-paper" : "f-ink"}`}>
        {k}
      </text>
      <text x="100" y="208" textAnchor="middle" className={`charm-t ${dark ? "f-paper" : "f-ink"}`}>
        {t}
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
              <Charm k={c.k} t={c.t} dark={c.dark} i={i} />
            </div>
            <figcaption>{c.d}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
