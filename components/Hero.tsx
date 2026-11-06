"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ENSO, ENSO_BRUSH, UNDERLINE_BRUSH } from "@/lib/draw";
import Hanko from "./Hanko";
import { K } from "./Icons";
import PixelMe from "./PixelMe";
import Seigaiha from "./Seigaiha";
import Tilt from "./Tilt";

const THOUGHTS: [string, string][] = [
  ["考え中…", "thinking (always)"],
  ["勉強中…", "learning something new"],
  ["ラーメン?", "ramen? ramen."],
  ["ひらめき!", "idea incoming"],
];

const FACES = ["serif", "sans", "mono"] as const;

export default function Hero() {
  const [t, setT] = useState(0);
  const [face, setFace] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setT((v) => (v + 1) % THOUGHTS.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="hero col" id="top">
      <div className="hero-stage">
        <Tilt className="shikishi-tilt" max={12} rotate={-2} baseX={4} baseY={-9} perspective={900} shadowClassName="shikishi-shadow">
          <div className="shikishi">
            <svg className="enso" viewBox="0 0 224 224" aria-hidden>
              <defs>
                <mask id="enso-draw">
                  <path d={ENSO.centre} stroke="#fff" strokeWidth="44" fill="none" pathLength={1} className="enso-mask" />
                </mask>
              </defs>
              <g mask="url(#enso-draw)" style={{ filter: "url(#ink-bleed)" }}>
                <ellipse cx={ENSO_BRUSH.pool.x + 3} cy={ENSO_BRUSH.pool.y + 6} rx="7" ry="10" fill="#141414" fillOpacity="0.55" transform={`rotate(20 ${ENSO_BRUSH.pool.x} ${ENSO_BRUSH.pool.y})`} />
                {ENSO_BRUSH.strands.map((s, i) => (
                  <path key={i} d={s.d} stroke="#141414" strokeOpacity={s.op} strokeWidth={s.sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ))}
                {ENSO_BRUSH.splat.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#141414" fillOpacity="0.8" />
                ))}
              </g>
            </svg>
            <div className="pixel-wrap">
              <PixelMe />
            </div>
            <span className="shikishi-sign brush" aria-hidden>
              さ
            </span>
            <Hanko char="サ" size={22} seed={7} className="shikishi-seal" />
          </div>
        </Tilt>
        <div className="bubble" aria-live="polite">
          <svg width="200" height="104" viewBox="0 0 200 104" aria-hidden>
            <defs>
              <pattern id="tone" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <circle cx="2" cy="2" r="0.9" fill="#141414" />
              </pattern>
            </defs>
            <path d="M22 4 H168 Q186 4 186 22 V52 Q186 70 168 70 H58 L30 92 L38 70 H22 Q4 70 4 52 V22 Q4 4 22 4 Z" fill="url(#tone)" transform="translate(6 6)" opacity="0.55" />
            <path d="M22 4 H168 Q186 4 186 22 V52 Q186 70 168 70 H58 L30 92 L38 70 H22 Q4 70 4 52 V22 Q4 4 22 4 Z" fill="#FFFFFF" stroke="#141414" strokeWidth="2" style={{ filter: "url(#ink-rough)" }} />
            <path d="M150 12 l6 -6 M160 14 l8 -4 M166 22 l9 -1" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="bubble-text"
              key={t}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.16 } }}
            >
              <span className="brush">{THOUGHTS[t][0]}</span>
              <span className="hand">{THOUGHTS[t][1]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="greet">
        <span className="greet-line" />
        <span className="min">こんにちは</span>
        <span className="mono">— hello, I’m</span>
      </p>

      <div className="name-block">
        <h1
          className={`name face-${FACES[face]}`}
          onClick={() => setFace((f) => (f + 1) % FACES.length)}
          title="sans-serif, literally."
        >
          <span className="name-sans">
            <span className="as-serif">Sans</span>
            <span className="as-sans" aria-hidden>
              Sans
            </span>
          </span>
          kriti
          <span className="name-tip mono" aria-hidden>
            sans-serif, literally.
          </span>
        </h1>
        <Hanko char="考" size={58} seed={4} className="seal-stamp name-seal" />
        <svg className="underline" width="400" height="30" viewBox="0 0 400 30" aria-hidden>
          {UNDERLINE_BRUSH.map((s, i) => (
            <path key={i} d={s.d} className="s-ink" strokeOpacity={s.op} strokeWidth={s.sw * 0.9} fill="none" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      <p className="dict">
        <span className="min">san·skri·ti</span>
        <span className="mono">(n.) culture. also: sans + kriti (creation) — creation without the serifs.</span>
      </p>

      <p className="bio glow-line">
        Product designer working across{" "}
        <K icon="product" glow="#3A4F8C" after=",">
          product
        </K>{" "}
        <K icon="visual" glow="#D9472B">
          visual
        </K>{" "}
        and{" "}
        <K icon="ux" glow="#6A8D3A">
          UX thinking
        </K>{" "}
        — and lately I{" "}
        <K icon="code" glow="#D9A21B">
          vibe-code
        </K>{" "}
        it all into being.
      </p>
      <p className="bio-2">
        If I don’t know something yet, I <mark className="marker">go learn it</mark> — and I’m always open to new, slightly odd creative ideas.
      </p>

      <blockquote className="quote hand">
        My mind never stops thinking.
        <br />
        It’s a boon and a pain, both.
      </blockquote>

      <div className="meta">
        <span className="status mono">
          <i /> Open to new work
        </span>
        {["Product", "Visual", "UX", "Vibe coding"].map((c) => (
          <span key={c} className="chip mono">
            {c}
          </span>
        ))}
      </div>

      <Seigaiha />
    </header>
  );
}
