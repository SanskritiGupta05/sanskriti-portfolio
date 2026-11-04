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
  { name: "Ink toggle", desc: "A switch that bleeds like sumi", value: "¥84", rot: -2, el: <InkToggle /> },
  { name: "Brush slider", desc: "Range input drawn as a stroke", value: "¥63", rot: 1.5, el: <BrushSlider /> },
  { name: "Cursor petals", desc: "Trail that falls like sakura", value: "¥120", rot: 1, el: <Petals /> },
  { name: "Hanko button", desc: "Click → stamp confirmation", value: "¥94", rot: -1.5, el: <HankoButton /> },
];

/** Live UI experiments, collected like postage stamps. */
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
      <div className="stamps">
        {STAMPS.map((s) => (
          <figure key={s.name} className="stamp" style={{ ["--rot" as string]: `${s.rot}deg` }}>
            <div className="stamp-art">
              <span className="min stamp-value">{s.value}</span>
              {s.el}
            </div>
            <figcaption>
              <span className="min">{s.name}</span>
              <small>{s.desc}</small>
              <span className="brush stamp-jp">遊</span>
            </figcaption>
          </figure>
        ))}
        <svg className="postmark" width="150" height="90" viewBox="0 0 150 90" aria-hidden>
          <circle cx="45" cy="45" r="36" fill="none" className="s-ink" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="45" cy="45" r="28" fill="none" className="s-ink" strokeOpacity="0.3" />
          <text x="45" y="49" textAnchor="middle" className="f-ink" fillOpacity="0.5" fontSize="10" fontFamily="var(--f-mono)">
            2026 · 遊
          </text>
          <path d="M84 28 q8 -6 16 0 t16 0 t16 0 t16 0 M84 45 q8 -6 16 0 t16 0 t16 0 t16 0 M84 62 q8 -6 16 0 t16 0 t16 0 t16 0" className="s-ink" strokeOpacity="0.5" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <a href="#" className="pill-btn">
        <span className="mono">See all 24 stamps</span>
        <span className="pill-seal">→</span>
      </a>
    </section>
  );
}
