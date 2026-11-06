import { VIBE } from "@/lib/content";
import { VibePoster } from "./Covers";
import { K, ToolChip } from "./Icons";
import PixelEdge from "./PixelEdge";
import SectionHeader from "./SectionHeader";


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
          {VIBE.map((v, i) => (
            <article key={v.title} className={`shoji-cell ${v.wide ? "is-wide" : ""}`} tabIndex={0}>
              <div className="shoji-behind">
                <VibePoster i={i} />
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
