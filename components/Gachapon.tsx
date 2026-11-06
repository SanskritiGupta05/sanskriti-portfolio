"use client";

import { useEffect, useRef, useState } from "react";
import { INTERESTS } from "@/lib/content";
import { seeded } from "@/lib/draw";
import { InterestArt } from "./Covers";
import { K } from "./Icons";
import SectionHeader from "./SectionHeader";

// Capsule plastic colours (top shell). Bottom shell is always clear.
const SHELL: Record<string, [string, string, string]> = {
  red: ["#F07A70", "#D23A2F", "#8E1F18"],
  ink: ["#6A6A70", "#26262B", "#0C0C0E"],
  white: ["#FFFFFF", "#ECECEC", "#BDBDBD"],
  grey: ["#D9D9DC", "#A3A3A8", "#6C6C72"],
  gold: ["#F7DD8C", "#D9A21B", "#9A6E0C"],
};
const INTEREST_SHELL = ["ink", "red", "grey", "white", "gold"];

/** A glossy two-tone capsule: coloured top shell, clear bottom shell, seam and highlights. */
function Capsule({ tone, r = 17, id }: { tone: string; r?: number; id: string }) {
  const [hi, mid, lo] = SHELL[tone];
  return (
    <g>
      <defs>
        <radialGradient id={`cap-${id}`} cx="0.35" cy="0.25" r="0.85">
          <stop offset="0" stopColor={hi} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={lo} />
        </radialGradient>
        <radialGradient id={`clr-${id}`} cx="0.4" cy="0.75" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#C9CED6" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <circle r={r} fill={`url(#clr-${id})`} />
      <ellipse cy={r * 0.35} rx={r * 0.45} ry={r * 0.3} fill={mid} fillOpacity="0.35" />
      <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`} fill={`url(#cap-${id})`} />
      <path d={`M${-r} 0 H${r}`} stroke="#000" strokeOpacity="0.28" strokeWidth="1.2" />
      <path d={`M${-r} 1.4 H${r}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" />
      <ellipse cx={-r * 0.38} cy={-r * 0.48} rx={r * 0.28} ry={r * 0.16} fill="#fff" fillOpacity="0.75" transform={`rotate(-30 ${-r * 0.38} ${-r * 0.48})`} />
      <circle r={r} fill="none" stroke="#000" strokeOpacity="0.18" />
    </g>
  );
}

// Capsules resting inside the dome (piled by gravity)
const PILE = (() => {
  const rnd = seeded(41);
  const tones = Object.keys(SHELL);
  const out: { x: number; y: number; rot: number; tone: string }[] = [];
  const rows = [
    { y: 196, xs: [86, 120, 154, 188] },
    { y: 172, xs: [70, 103, 137, 171, 205] },
    { y: 146, xs: [82, 116, 150, 184, 214] },
    { y: 120, xs: [98, 132, 166, 196] },
    { y: 96, xs: [118, 152] },
  ];
  rows.forEach((row) => row.xs.forEach((x) => out.push({ x: x + (rnd() - 0.5) * 6, y: row.y + (rnd() - 0.5) * 5, rot: Math.round((rnd() - 0.5) * 140), tone: tones[Math.floor(rnd() * tones.length)] })));
  return out;
})();

function Machine({ shaking }: { shaking: boolean }) {
  return (
    <svg className={`gm ${shaking ? "is-shaking" : ""}`} viewBox="0 0 300 480" role="img" aria-label="Gachapon capsule machine">
      <defs>
        <radialGradient id="glass" cx="0.32" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="1" stopColor="#8D9AA8" stopOpacity="0.28" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#7E8B98" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="chrome" x1="0" x2="1">
          <stop offset="0" stopColor="#7C7C7C" />
          <stop offset="0.25" stopColor="#EDEDED" />
          <stop offset="0.45" stopColor="#ABABAB" />
          <stop offset="0.62" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#6E6E6E" />
        </linearGradient>
        <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9463C" />
          <stop offset="1" stopColor="#B02B22" />
        </linearGradient>
        <linearGradient id="side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#97221A" />
          <stop offset="1" stopColor="#6C1611" />
        </linearGradient>
        <linearGradient id="capTop" x1="0" x2="1">
          <stop offset="0" stopColor="#A8261F" />
          <stop offset="0.4" stopColor="#E35A50" />
          <stop offset="1" stopColor="#8E1F18" />
        </linearGradient>
        <linearGradient id="chute" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050505" />
          <stop offset="1" stopColor="#2A2A2A" />
        </linearGradient>
        <clipPath id="domeClip">
          <circle cx="144" cy="122" r="97" />
        </clipPath>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* contact shadow on the counter */}
      <ellipse cx="156" cy="466" rx="118" ry="11" fill="#000" fillOpacity="0.22" filter="url(#soft)" />

      {/* body — light isometric: top, side and front faces */}
      <path d="M48 236 L70 222 H254 L232 236 Z" fill="#E86C62" />
      <path d="M232 236 L254 222 V440 Q254 448 246 452 L232 460 Z" fill="url(#side)" />
      <rect x="48" y="236" width="184" height="224" rx="8" fill="url(#front)" />
      <rect x="48" y="236" width="184" height="224" rx="8" fill="none" stroke="#000" strokeOpacity="0.12" />
      <path d="M56 240 H224" stroke="#fff" strokeOpacity="0.35" />

      {/* printed label */}
      <rect x="66" y="252" width="148" height="70" rx="4" fill="#FAFAFA" />
      <rect x="70" y="256" width="140" height="62" rx="2" fill="none" stroke="#C3352B" strokeWidth="1.2" />
      <text x="140" y="282" textAnchor="middle" className="gm-title">
        ガチャガチャ
      </text>
      <text x="140" y="298" textAnchor="middle" className="gm-small">
        趣味カプセル · 1回 100円
      </text>
      {["red", "ink", "white", "gold"].map((t, i) => (
        <g key={t} transform={`translate(${112 + i * 19} 309) scale(0.32)`}>
          <Capsule tone={t} id={`lbl${i}`} />
        </g>
      ))}

      {/* coin slot */}
      <rect x="78" y="336" width="34" height="58" rx="6" fill="url(#chrome)" />
      <rect x="90" y="344" width="10" height="42" rx="3" fill="#111" />
      <text x="95" y="404" textAnchor="middle" className="gm-small" fill="#fff">
        100円
      </text>
      {/* coin plate (handle sits on top as a button) */}
      <circle cx="176" cy="364" r="38" fill="url(#chrome)" />
      <circle cx="176" cy="364" r="31" fill="#D9D9D9" stroke="#8E8E8E" />

      {/* chute with translucent flap */}
      <rect x="92" y="412" width="104" height="38" rx="9" fill="url(#chute)" />
      <path d="M96 416 H192 V430 Q144 424 96 430 Z" fill="#fff" fillOpacity="0.22" />
      <rect x="92" y="412" width="104" height="38" rx="9" fill="none" stroke="#000" strokeOpacity="0.5" />

      {/* chrome collar */}
      <rect x="54" y="208" width="180" height="30" rx="6" fill="url(#chrome)" />
      <ellipse cx="144" cy="209" rx="90" ry="9" fill="#F2F2F2" />
      <ellipse cx="144" cy="209" rx="80" ry="6" fill="#BDBDBD" />

      {/* dome + capsules */}
      <g clipPath="url(#domeClip)">
        <rect x="40" y="20" width="210" height="210" fill="#E9EEF3" fillOpacity="0.35" />
        {PILE.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`} className="gm-cap">
            <Capsule tone={c.tone} id={`p${i}`} />
          </g>
        ))}
      </g>
      <circle cx="144" cy="122" r="97" fill="url(#glass)" />
      <circle cx="144" cy="122" r="97" fill="none" stroke="url(#rim)" strokeWidth="3" />
      <path d="M78 70 Q100 38 140 30" stroke="#fff" strokeOpacity="0.85" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M66 98 Q68 88 72 82" stroke="#fff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="206" cy="176" rx="10" ry="5" fill="#fff" fillOpacity="0.4" transform="rotate(-40 206 176)" />

      {/* top cap */}
      <ellipse cx="144" cy="27" rx="30" ry="7" fill="url(#capTop)" />
      <rect x="118" y="12" width="52" height="16" rx="7" fill="url(#capTop)" />
      <ellipse cx="144" cy="12" rx="26" ry="5" fill="#E86C62" />
    </svg>
  );
}

function Handle() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden>
      <defs>
        <linearGradient id="grip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F07A70" />
          <stop offset="0.5" stopColor="#C3352B" />
          <stop offset="1" stopColor="#7E1A14" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="22" fill="#EFEFEF" stroke="#9A9A9A" />
      <rect x="6" y="31" width="68" height="18" rx="9" fill="url(#grip)" />
      <rect x="10" y="33" width="60" height="4" rx="2" fill="#fff" fillOpacity="0.4" />
      <circle cx="40" cy="40" r="7" fill="#BDBDBD" stroke="#777" />
      <circle cx="38" cy="38" r="2" fill="#fff" fillOpacity="0.8" />
    </svg>
  );
}

type Phase = "idle" | "turning" | "rolling" | "open";

/** Turn the handle → the machine rattles, a capsule rolls out and pops open. */
export default function Gachapon() {
  const [idx, setIdx] = useState(4);
  const [turns, setTurns] = useState(0);
  const [phase, setPhase] = useState<Phase>("open");
  const [seen, setSeen] = useState<Set<number>>(() => new Set([4]));
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const reveal = (i: number) => {
    setIdx(i);
    setSeen((s) => new Set(s).add(i));
  };

  const turn = () => {
    if (phase === "turning" || phase === "rolling") return;
    const unseen = INTERESTS.map((_, i) => i).filter((i) => !seen.has(i) && i !== idx);
    const pool = unseen.length ? unseen : INTERESTS.map((_, i) => i).filter((i) => i !== idx);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setPhase("turning");
    setTurns((t) => t + 1);
    later(() => {
      reveal(next);
      setPhase("rolling");
    }, 850);
    later(() => setPhase("open"), 1650);
  };

  const pick = (i: number) => {
    if (phase === "turning" || phase === "rolling") return;
    reveal(i);
    setPhase("rolling");
    later(() => setPhase("open"), 700);
  };

  const it = INTERESTS[idx];
  const tone = INTEREST_SHELL[idx];
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

      <div className={`gacha phase-${phase}`}>
        <div className="gacha-machine">
          <Machine shaking={phase === "turning"} />
          <button className="gacha-handle" onClick={turn} aria-label={`Turn the handle (turned ${turns} times)`} style={{ ["--turns" as string]: turns }}>
            <Handle />
          </button>
          <span className="hand gacha-hint">↻ turn me</span>
        </div>

        <div className="gacha-stage" aria-live="polite">
          {/* the capsule that rolls out and splits */}
          <div className="rolling-cap" key={`cap-${turns}-${idx}`} aria-hidden>
            <svg className="half half-top" viewBox="-40 -40 80 80">
              <defs>
                <clipPath id={`ct${turns}${idx}`}>
                  <rect x="-40" y="-40" width="80" height="40.5" />
                </clipPath>
              </defs>
              <g clipPath={`url(#ct${turns}${idx})`}>
                <Capsule tone={tone} r={26} id={`rt${turns}${idx}`} />
              </g>
            </svg>
            <svg className="half half-bottom" viewBox="-40 -40 80 80">
              <defs>
                <clipPath id={`cb${turns}${idx}`}>
                  <rect x="-40" y="0" width="80" height="40" />
                </clipPath>
              </defs>
              <g clipPath={`url(#cb${turns}${idx})`}>
                <Capsule tone={tone} r={26} id={`rb${turns}${idx}`} />
              </g>
            </svg>
          </div>
          <div className="gacha-slip" key={`slip-${idx}-${turns}`}>
            <div className="slip-art">
              <InterestArt i={idx} />
            </div>
            <div className="slip-body">
              <h3>
                <span className="brush red">{it.k}</span> <span className="min">{it.name}</span>
              </h3>
              <p>{it.text}</p>
              <p className="mono gacha-count">
                capsule {seen.size} / {INTERESTS.length} · {all ? "secret unlocked → my sketchbook" : "collect all → secret"}
              </p>
            </div>
            <span className="slip-stamp brush" aria-hidden>
              {it.k}
            </span>
          </div>
        </div>
      </div>

      <div className="tray" role="group" aria-label="Pick an interest">
        {INTERESTS.map((x, i) => (
          <button key={x.name} className={`capsule-chip ${i === idx ? "is-on" : ""}`} onClick={() => pick(i)}>
            <svg width="22" height="22" viewBox="-20 -20 40 40" aria-hidden>
              <Capsule tone={INTEREST_SHELL[i]} id={`chip${i}`} />
            </svg>
            <span className="min">{x.k}</span>
            {x.name}
          </button>
        ))}
      </div>

    </section>
  );
}
