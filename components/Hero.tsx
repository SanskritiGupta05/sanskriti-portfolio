"use client";

import { useEffect, useState } from "react";
import { ENSO, UNDERLINE } from "@/lib/draw";
import { K } from "./Icons";
import Seigaiha from "./Seigaiha";

const MAP = [
  "......HHHH......",
  "....HHHHHHHH....",
  "...HHHHHHHHHHR..",
  "..HHHHHHHHHHHRR.",
  "..HHHHHHHHHHHH..",
  "..HHSHHSSHHSHH..",
  "..HSSSSSSSSSSH..",
  "..HSEESSSSEESH..",
  "..HSEWSSSSEWSH..",
  "..HSBSSSSSSBSH..",
  "..HHSSSSPSSSHH..",
  "..HH.SSSSSS.HH..",
  "..HH..SSSS..HH..",
  "..H..CCCCCC..H..",
  "....CCCWWCCC....",
  "...CCCCCCCCCC...",
];
const PAL: Record<string, string> = { H: "#222222", S: "#F3EEE6", E: "#222222", W: "#FFFFFF", B: "#D9CFC4", R: "#B8322A", P: "#8A6F66", C: "#3A3A3A" };

export function PixelMe({ size = 128 }: { size?: number }) {
  return (
    <svg className="pixel-me" width={size} height={size} viewBox="0 0 128 128" shapeRendering="crispEdges" role="img" aria-label="Pixel-art me">
      {MAP.flatMap((row, y) =>
        [...row].map((ch, x) =>
          PAL[ch] ? <rect key={`${x}-${y}`} x={x * 8} y={y * 8} width="8" height="8" fill={PAL[ch]} className={ch === "E" || ch === "W" ? "px-eye" : undefined} /> : null,
        ),
      )}
      {/* eyelids for the blink */}
      <rect className="px-lid" x="32" y="56" width="16" height="16" fill="#F3EEE6" />
      <rect className="px-lid" x="80" y="56" width="16" height="16" fill="#F3EEE6" />
    </svg>
  );
}

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
        <div className="enso-wrap">
          <svg className="enso" width="224" height="224" viewBox="0 0 224 224" aria-hidden>
            <defs>
              <mask id="enso-draw">
                <path d={ENSO.centre} stroke="#fff" strokeWidth="30" fill="none" pathLength={1} className="enso-mask" />
              </mask>
            </defs>
            <g mask="url(#enso-draw)">
              <path d={ENSO.body} className="f-ink" />
              {ENSO.dry.map((d, i) => (
                <path key={i} d={d} className="s-paper" strokeWidth="1.1" fill="none" />
              ))}
            </g>
          </svg>
          <div className="pixel-wrap">
            <PixelMe />
          </div>
        </div>
        <div className="bubble" aria-live="polite">
          <svg width="190" height="96" viewBox="0 0 190 96" aria-hidden>
            <path d="M22 4 H168 Q186 4 186 22 V52 Q186 70 168 70 H58 L30 92 L38 70 H22 Q4 70 4 52 V22 Q4 4 22 4 Z" className="f-paper2 s-ink" strokeWidth="1.6" />
          </svg>
          <div className="bubble-text" key={t}>
            <span className="brush">{THOUGHTS[t][0]}</span>
            <span className="hand">{THOUGHTS[t][1]}</span>
          </div>
        </div>
        <p className="hand side-note" aria-hidden>
          ↙ this is me, in 16×16
        </p>
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
        <span className="seal seal-stamp brush" aria-hidden>
          考
        </span>
        <svg className="underline" width="340" height="24" viewBox="0 0 340 24" aria-hidden>
          <path d={UNDERLINE} className="f-ink" />
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
