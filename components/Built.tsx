import { VIBE } from "@/lib/content";
import { K, ToolChip } from "./Icons";
import PixelEdge from "./PixelEdge";
import SectionHeader from "./SectionHeader";

function Preview({ wide }: { wide?: boolean }) {
  return (
    <svg className="shoji-preview" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="360" height="300" fill="#161616" />
      <rect x="24" y="30" width="310" height="230" rx="8" fill="#F5F2EC" />
      <rect x="24" y="30" width="310" height="22" rx="8" fill="#ECE8E0" />
      {[38, 48, 58].map((x) => (
        <circle key={x} cx={x} cy="41" r="3" fill="#A39E96" />
      ))}
      {wide ? (
        <>
          <path d="M270 52 V90" stroke="#161616" />
          <path d="M258 92 C246 98 246 132 258 138 H282 C294 132 294 98 282 92 Z" fill="#F2C27A" stroke="#161616" />
          <path d="M24 220 L110 170 L180 205 L250 160 L334 210 V252 Q334 260 326 260 H32 Q24 260 24 252 Z" fill="#A39E96" />
        </>
      ) : (
        <>
          <rect x="48" y="150" width="120" height="80" rx="6" fill="#ECE8E0" />
          <circle cx="250" cy="190" r="36" fill="#B8322A" fillOpacity="0.85" />
        </>
      )}
      <rect x="48" y="100" width="120" height="16" rx="3" fill="#161616" />
      <rect x="48" y="124" width="170" height="6" rx="3" fill="#161616" fillOpacity="0.2" />
    </svg>
  );
}

/** Vibe-coded projects behind sliding shoji panels on a dark band. */
export default function Built() {
  return (
    <section className="band band-dark" id="built">
      <PixelEdge seed={5} side="top" />
      <div className="col section">
        <SectionHeader kanji="造" kicker="04 · tsukuru — to build" title="Things I built with AI" dark />
        <p className="intro-line on-dark">
          Designs that didn’t stay in{" "}
          <K icon="figma" logo after=" —">
            Figma
          </K>{" "}
          prompted in{" "}
          <K icon="claude" logo after=",">
            Claude
          </K>{" "}
          polished in{" "}
          <K icon="cursor" logo>
            Cursor
          </K>{" "}
          and shipped on{" "}
          <K icon="vercel" logo after=".">
            Vercel
          </K>{" "}
          Hover a panel to slide it open.
        </p>
        <div className="shoji">
          {VIBE.map((v) => (
            <article key={v.title} className={`shoji-cell ${v.wide ? "is-wide" : ""}`} tabIndex={0}>
              <div className="shoji-behind">
                <Preview wide={v.wide} />
                <span className="live mono">● live</span>
              </div>
              <div className="shoji-panel">
                <div className="plate">
                  <h3 className="min">{v.title}</h3>
                  <p>{v.description}</p>
                  <div className="tools">
                    {v.tools.map((t) => (
                      <ToolChip key={t} name={t} />
                    ))}
                  </div>
                  <p className="plate-links mono">
                    <a href="#">live →</a>
                    <a href="#">code →</a>
                  </p>
                </div>
                <span className="hikite" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
      <PixelEdge seed={9} side="bottom" />
    </section>
  );
}
