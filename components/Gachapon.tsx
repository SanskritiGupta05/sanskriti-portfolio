"use client";

import { useState } from "react";
import { INTERESTS } from "@/lib/content";
import { K } from "./Icons";
import SectionHeader from "./SectionHeader";

const CAPS: [number, number, string][] = [
  [70, 80, "#B8322A"], [110, 60, "#161616"], [150, 82, "#E4DDCF"], [92, 112, "#A39E96"], [132, 118, "#B8322A"], [170, 110, "#161616"],
  [60, 125, "#E4DDCF"], [118, 88, "#E4DDCF"], [156, 140, "#A39E96"], [86, 146, "#161616"], [126, 150, "#E4DDCF"], [180, 140, "#B8322A"],
];

function Capsule({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
      <path d="M1 10 A9 9 0 0 1 19 10 Z" fill={color} />
      <path d="M1 10 A9 9 0 0 0 19 10 Z" fill="#FFFFFF" />
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}

/** Turn the handle → a capsule drops, pops, and reveals one of my interests. */
export default function Gachapon() {
  const [idx, setIdx] = useState(4);
  const [turns, setTurns] = useState(0);
  const [phase, setPhase] = useState<"idle" | "turning" | "open">("open");
  const [seen, setSeen] = useState<Set<number>>(() => new Set([4]));

  const reveal = (i: number) => {
    setIdx(i);
    setSeen((s) => new Set(s).add(i));
  };

  const turn = () => {
    if (phase === "turning") return;
    setPhase("turning");
    setTurns((t) => t + 1);
    window.setTimeout(() => {
      const unseen = INTERESTS.map((_, i) => i).filter((i) => !seen.has(i) && i !== idx);
      const pool = unseen.length ? unseen : INTERESTS.map((_, i) => i).filter((i) => i !== idx);
      reveal(pool[Math.floor(Math.random() * pool.length)]);
      setPhase("open");
    }, 900);
  };

  const it = INTERESTS[idx];
  const all = seen.size === INTERESTS.length;

  return (
    <section className="col section" id="life">
      <SectionHeader kanji="趣" kicker="07 · shumi — the things I love" title="Off the clock" />
      <p className="intro-line">
        Turn the{" "}
        <K icon="handle" glow="var(--seal)">
          handle
        </K>{" "}
        and out pops something I do when I’m not designing —{" "}
        <K icon="badge" glow="#3A4F8C" after=",">
          design meetups
        </K>{" "}
        <K icon="bowl" glow="#D9472B" after=",">
          ramen
        </K>{" "}
        <K icon="pencil" glow="#6A8D3A" after=",">
          sketching
        </K>{" "}
        <K icon="book" glow="#D9A21B">
          reading
        </K>{" "}
        or{" "}
        <K icon="pot" glow="#D9472B" after=".">
          clay
        </K>
      </p>

      <div className={`gacha ${phase === "turning" ? "is-turning" : ""}`}>
        <div className="gacha-machine">
          <svg viewBox="0 0 250 420" aria-hidden>
            <defs>
              <radialGradient id="glass" cx="0.35" cy="0.3" r="0.8">
                <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.15" />
                <stop offset="1" stopColor="#161616" stopOpacity="0.12" />
              </radialGradient>
              <linearGradient id="body" x1="0" x2="1">
                <stop offset="0" stopColor="#0A0A0A" />
                <stop offset="0.45" stopColor="#2E2E2E" />
                <stop offset="1" stopColor="#0A0A0A" />
              </linearGradient>
            </defs>
            <rect x="105" y="0" width="40" height="14" rx="4" fill="#161616" />
            <circle cx="125" cy="108" r="98" className="f-paper" stroke="#161616" strokeWidth="3" />
            <g className="gacha-caps">
              {CAPS.map(([x, y, c], i) => (
                <g key={i} transform={`rotate(${((x * 7) % 60) - 30} ${x} ${y})`}>
                  <path d={`M${x - 15} ${y} A15 15 0 0 1 ${x + 15} ${y} Z`} fill={c} />
                  <path d={`M${x - 15} ${y} A15 15 0 0 0 ${x + 15} ${y} Z`} fill="#fff" fillOpacity="0.9" />
                  <circle cx={x} cy={y} r="15" fill="none" stroke="#161616" strokeOpacity="0.5" />
                </g>
              ))}
            </g>
            <circle cx="125" cy="108" r="98" fill="url(#glass)" />
            <path d="M60 52 Q80 30 112 24" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" strokeOpacity="0.8" />
            <rect x="30" y="196" width="190" height="16" rx="4" fill="#161616" />
            <path d="M36 212 H214 L222 400 Q222 412 210 412 H40 Q28 412 28 400 Z" fill="url(#body)" />
            <rect x="56" y="228" width="138" height="44" rx="4" fill="#F5F2EC" />
            <text x="125" y="252" textAnchor="middle" className="gacha-label">
              ガチャ
            </text>
            <text x="125" y="266" textAnchor="middle" fill="#6E6A64" fontSize="9" fontFamily="var(--f-mono)">
              趣味 · ¥100
            </text>
            <rect x="80" y="300" width="22" height="34" rx="3" fill="#0A0A0A" stroke="#4A4A4A" />
            <rect x="88" y="306" width="6" height="22" rx="2" fill="#4A4A4A" />
            <path d="M90 360 H160 Q170 360 170 370 V396 H80 V370 Q80 360 90 360 Z" fill="#050505" stroke="#4A4A4A" />
          </svg>
          <button className="gacha-handle" onClick={turn} aria-label={`Turn the handle (turned ${turns} times)`} style={{ ["--turns" as string]: turns }}>
            <svg viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r="26" fill="#F5F2EC" stroke="#4A4A4A" strokeWidth="2" />
              <rect x="2" y="23" width="52" height="10" rx="5" fill="#B8322A" />
              <circle cx="28" cy="28" r="5" fill="#161616" />
            </svg>
          </button>
          <span className="hand gacha-hint">↻ turn me</span>
          <span className="gacha-drop" aria-hidden>
            <Capsule color={it.color} size={30} />
          </span>
        </div>

        <div className="gacha-result" aria-live="polite">
          <div className={`gacha-card ${phase === "open" ? "is-open" : ""}`} key={`${idx}-${turns}`}>
            <div className="gacha-photo">
              <span className="brush">{it.k}</span>
              <small className="mono">drop a photo here</small>
            </div>
            <h3>
              <span className="brush red">{it.k}</span> <span className="min">{it.name}</span>
            </h3>
            <p>{it.text}</p>
            <p className="mono gacha-count">
              capsule {seen.size} of {INTERESTS.length} · {all ? "secret unlocked → my sketchbook" : "collect all → secret"}
            </p>
          </div>
          <span className="shell shell-a" aria-hidden />
          <span className="shell shell-b" aria-hidden />
        </div>
      </div>

      <div className="tray" role="group" aria-label="Pick an interest">
        {INTERESTS.map((x, i) => (
          <button key={x.name} className={`capsule-chip ${i === idx ? "is-on" : ""}`} onClick={() => reveal(i)}>
            <Capsule color={x.color} />
            <span className="min">{x.k}</span>
            {x.name}
          </button>
        ))}
      </div>

      <dl className="facts">
        {[
          ["047", "bowls this year"],
          ["6", "sketchbooks filled"],
          ["30+", "meetups attended"],
          ["Book title", "reading now"],
        ].map(([a, b]) => (
          <div key={b}>
            <dt className="min">{a}</dt>
            <dd className="mono">{b}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
