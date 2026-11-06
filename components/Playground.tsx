"use client";

import { useRef, useState } from "react";
import { K } from "./Icons";
import SectionHeader from "./SectionHeader";

function InkToggle() {
  const [on, setOn] = useState(false);
  return (
    <button className={`ink-toggle ${on ? "is-on" : ""}`} role="switch" aria-checked={on} aria-label="Ink toggle" onClick={() => setOn((v) => !v)}>
      <span className="ink-bleed" />
      <span className="ink-knob" />
    </button>
  );
}

function BrushSlider() {
  const [v, setV] = useState(60);
  return (
    <label className="brush-slider" style={{ ["--v" as string]: `${v}%` }}>
      <span className="sr-only">Brush slider</span>
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} />
      <span className="brush-fill" />
      <span className="mono brush-val">{v}</span>
    </label>
  );
}

function Petals() {
  const [petals, setPetals] = useState<{ id: number; x: number; y: number; r: number }[]>([]);
  const n = useRef(0);
  const last = useRef(0);
  return (
    <div
      className="petal-field"
      onPointerMove={(e) => {
        const now = performance.now();
        if (now - last.current < 45) return;
        last.current = now;
        const rect = e.currentTarget.getBoundingClientRect();
        const id = n.current++;
        setPetals((p) => [...p.slice(-14), { id, x: e.clientX - rect.left, y: e.clientY - rect.top, r: Math.round(Math.random() * 360) }]);
      }}
    >
      <span className="mono petal-hint">move here</span>
      {petals.map((p) => (
        <i key={p.id} className="petal" style={{ left: p.x, top: p.y, ["--r" as string]: `${p.r}deg` }} />
      ))}
    </div>
  );
}

function HankoButton() {
  const [stamped, setStamped] = useState(0);
  return (
    <button className="hanko-btn" onClick={() => setStamped((s) => s + 1)}>
      <span className="mono">confirm</span>
      {stamped > 0 && (
        <span key={stamped} className="hanko-mark brush" aria-hidden>
          済
        </span>
      )}
    </button>
  );
}

const STAMPS = [
  { name: "Ink toggle", jp: "墨", desc: "A switch that bleeds like sumi", value: "84", tint: "#DCE3F0", accent: "#2F4A86", cancel: true, el: <InkToggle /> },
  { name: "Brush slider", jp: "筆", desc: "Range input drawn as a stroke", value: "63", tint: "#F4DCD5", accent: "#B23A2E", cancel: false, el: <BrushSlider /> },
  { name: "Cursor petals", jp: "桜", desc: "A trail that falls like sakura", value: "120", tint: "#F6E3E6", accent: "#B24A62", cancel: false, el: <Petals /> },
  { name: "Hanko button", jp: "判", desc: "Click → stamp confirmation", value: "94", tint: "#E1E8D2", accent: "#4F6B2C", cancel: true, el: <HankoButton /> },
];

function Postmark() {
  return (
    <svg className="cancel" viewBox="0 0 220 120" aria-hidden>
      <g style={{ filter: "url(#ink-bleed)" }}>
        <circle cx="60" cy="60" r="44" fill="none" stroke="#1D1D24" strokeWidth="2.4" />
        <circle cx="60" cy="60" r="33" fill="none" stroke="#1D1D24" strokeWidth="1.2" />
        <text x="60" y="48" textAnchor="middle" fontSize="11" fontFamily="var(--f-min)" fill="#1D1D24">
          遊便局
        </text>
        <text x="60" y="66" textAnchor="middle" fontSize="12" fontFamily="var(--f-mono)" fill="#1D1D24">
          26.11.05
        </text>
        <text x="60" y="82" textAnchor="middle" fontSize="8" fontFamily="var(--f-mono)" fill="#1D1D24">
          PLAYGROUND
        </text>
        <path d="M108 38 q11 -8 22 0 t22 0 t22 0 t22 0 M108 60 q11 -8 22 0 t22 0 t22 0 t22 0 M108 82 q11 -8 22 0 t22 0 t22 0 t22 0" stroke="#1D1D24" strokeWidth="2.4" fill="none" />
      </g>
    </svg>
  );
}

/** Live UI experiments, kept like postage stamps in a stock-book album. */
export default function Playground() {
  return (
    <section className="col section" id="play">
      <SectionHeader kanji="遊" kicker="06 · asobi — play" title="Playground" />
      <p className="intro-line">
        Micro-interactions and UI experiments, collected like{" "}
        <K icon="stamp" glow="var(--seal)" after=".">
          stamps
        </K>{" "}
        Each one is live — go{" "}
        <K icon="poke" glow="var(--seal)">
          poke
        </K>{" "}
        it.
      </p>
      <div className="album">
        <p className="album-label mono">切手帳 · STOCK BOOK Nº 01</p>
        {[0, 1].map((row) => (
          <div className="album-row" key={row}>
            {STAMPS.slice(row * 2, row * 2 + 2).map((s, k) => (
              <figure key={s.name} className="stamp2" style={{ ["--tint" as string]: s.tint, ["--accent" as string]: s.accent, ["--rot" as string]: `${(row + k) % 2 ? 1.2 : -1.4}deg` }}>
                <div className="stamp2-paper">
                  <div className="stamp2-frame">
                    <span className="stamp2-value">
                      <b className="min">{s.value}</b>
                      <small className="min">円</small>
                    </span>
                    <span className="stamp2-jp brush">{s.jp}</span>
                    <div className="stamp2-demo">{s.el}</div>
                    <span className="stamp2-post mono">遊便 · ASOBI POST</span>
                    <span className="stamp2-name">
                      <b className="min">{s.name}</b>
                      <small>{s.desc}</small>
                    </span>
                  </div>
                </div>
                {s.cancel && <Postmark />}
              </figure>
            ))}
            <span className="album-strip" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  );
}
