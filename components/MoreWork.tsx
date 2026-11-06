"use client";

import { useState } from "react";
import { MORE_WORK } from "@/lib/content";
import { MiniPoster } from "./Covers";
import SectionHeader from "./SectionHeader";

/**
 * Smaller projects as ema — wooden votive plaques hanging from a rail on red cords.
 * Hover (or tap) a plaque: it swings and turns over to show the note on the back.
 */
export default function MoreWork() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="col section" id="more">
      <SectionHeader kanji="録" kicker="05 · roku — the record" title="More work" />
      <p className="intro-line">Smaller projects, hung up like ema at a shrine. Turn one over to read what it was about.</p>
      <div className="ema-rack">
        <span className="ema-rail" aria-hidden />
        {MORE_WORK.map((w, i) => (
          <div
            key={w.title}
            className={`ema ${flipped === i ? "is-flipped" : ""}`}
            style={{ ["--d" as string]: `${i * 0.35}s`, ["--tilt" as string]: `${[-2, 1.5, -1, 2][i % 4]}deg` }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(null)}
          >
            <div className="ema-swing">
            <svg className="ema-cord" viewBox="0 0 60 46" aria-hidden>
              <path d="M10 0 C12 18 22 30 26 44 M50 0 C48 18 38 30 34 44" stroke="#C3352B" strokeWidth="2.4" fill="none" />
              <path d="M10 0 C12 18 22 30 26 44 M50 0 C48 18 38 30 34 44" stroke="#6E140F" strokeWidth="2.4" strokeDasharray="1.2 2" fill="none" strokeOpacity="0.5" />
            </svg>
            <button className="ema-card" onClick={() => setFlipped((f) => (f === i ? null : i))} aria-pressed={flipped === i} aria-label={`${w.title}, ${w.year}. ${w.desc}`}>
              <span className="ema-face ema-front">
                <span className="ema-holes" aria-hidden />
                <span className="ema-paint">
                  <MiniPoster i={i} />
                </span>
                <span className="ema-k brush">{w.k}</span>
                <b className="min ema-title">{w.title}</b>
                <small className="mono ema-year">{w.year}</small>
              </span>
              <span className="ema-face ema-back">
                <span className="ema-holes" aria-hidden />
                <span className="hand ema-note">{w.desc}.</span>
                <span className="mono ema-meta">
                  {w.year} · open <span aria-hidden>→</span>
                </span>
                <span className="ema-stamp brush" aria-hidden>
                  奉納
                </span>
              </span>
            </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
