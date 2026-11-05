"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/lib/hooks";

const TOP = 170;
const BOTTOM = 330;
const CX = 85;
const hw = (y: number) => 27 + 47 * Math.sin(Math.PI * Math.min(1, Math.max(0, (y - TOP) / (BOTTOM - TOP))));
const RIBS = Array.from({ length: 13 }, (_, i) => TOP + ((BOTTOM - TOP) * i) / 12);
const bow = (y: number) => 3 + 4 * Math.sin(Math.PI * ((y - TOP) / (BOTTOM - TOP))); // perspective curve of each rib

/** One puffed washi band between two bamboo ribs. */
function band(y0: number, y1: number) {
  const a = hw(y0);
  const b = hw(y1);
  return `M${CX - a} ${y0} Q${CX} ${y0 + bow(y0) * 2} ${CX + a} ${y0} C${CX + a + 2} ${(y0 + y1) / 2} ${CX + b + 2} ${(y0 + y1) / 2} ${CX + b} ${y1} Q${CX} ${y1 + bow(y1) * 2} ${CX - b} ${y1} C${CX - b - 2} ${(y0 + y1) / 2} ${CX - a - 2} ${(y0 + y1) / 2} ${CX - a} ${y0} Z`;
}

const FRINGE = Array.from({ length: 15 }, (_, i) => i);

/**
 * Paper chōchin hanging from the top of the page.
 * Click the lantern, or drag the wooden bead on its pull-cord down and let go, to switch day ↔ night.
 */
export default function Lantern() {
  const { theme, toggle } = useTheme();
  const [pulling, setPulling] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);

  const pull = () => {
    setPulling(true);
    window.setTimeout(() => setPulling(false), 1000);
    window.setTimeout(toggle, 160);
  };

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    start.current = e.clientY;
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(Math.max(0, Math.min(70, e.clientY - start.current)));
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    if (drag > 26) pull();
    setDrag(0);
  };

  return (
    <div className="lantern-wrap">
      <div className={`lantern-sway ${pulling ? "is-pulling" : ""}`}>
        <span className="lantern-glow" aria-hidden />
        <button className="lantern" onClick={pull} aria-label={theme === "night" ? "Switch to day" : "Switch to night"} aria-pressed={theme === "night"}>
          <svg width="170" height="372" viewBox="0 0 170 372" aria-hidden>
            <defs>
              <linearGradient id="lb" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: "var(--l1)" }} />
                <stop offset="0.28" style={{ stopColor: "var(--l2)" }} />
                <stop offset="0.5" style={{ stopColor: "var(--l3)" }} />
                <stop offset="0.78" style={{ stopColor: "var(--l4)" }} />
                <stop offset="1" style={{ stopColor: "var(--l5)" }} />
              </linearGradient>
              <linearGradient id="puff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#000" stopOpacity="0.16" />
                <stop offset="0.35" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="0.65" stopColor="#fff" stopOpacity="0.05" />
                <stop offset="1" stopColor="#000" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="lacquer" x1="0" x2="1">
                <stop offset="0" stopColor="#050505" />
                <stop offset="0.3" stopColor="#3C3C3C" />
                <stop offset="0.42" stopColor="#8A8A8A" />
                <stop offset="0.5" stopColor="#2A2A2A" />
                <stop offset="1" stopColor="#050505" />
              </linearGradient>
              <linearGradient id="brass" x1="0" x2="1">
                <stop offset="0" stopColor="#7A5A1E" />
                <stop offset="0.45" stopColor="#F2D58A" />
                <stop offset="1" stopColor="#8C6A26" />
              </linearGradient>
              <linearGradient id="tassel" x1="0" x2="1">
                <stop offset="0" stopColor="#7E1A14" />
                <stop offset="0.45" stopColor="#D8463B" />
                <stop offset="1" stopColor="#7E1A14" />
              </linearGradient>
              <radialGradient id="flame" cx="0.5" cy="0.62" r="0.6">
                <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.95" />
                <stop offset="0.45" stopColor="#FFCB6B" stopOpacity="0.45" />
                <stop offset="1" stopColor="#FFB347" stopOpacity="0" />
              </radialGradient>
              <clipPath id="lbody">
                {RIBS.slice(0, -1).map((y, i) => (
                  <path key={i} d={band(y, RIBS[i + 1])} />
                ))}
              </clipPath>
            </defs>

            {/* brass hook + cord */}
            <circle cx={CX} cy="9" r="6" fill="none" stroke="url(#brass)" strokeWidth="2.6" />
            <path d={`M${CX} 15 C${CX - 2} 60 ${CX + 2} 110 ${CX} 146`} className="lantern-cord" strokeWidth="1.6" fill="none" />
            <path d={`M${CX - 5} 146 h10 l-2 8 h-6 Z`} fill="url(#brass)" />

            {/* top lacquer cap */}
            <rect x={CX - 32} y="154" width="64" height="18" rx="3" fill="url(#lacquer)" />
            <ellipse cx={CX} cy="154" rx="32" ry="5" fill="#2E2E2E" />
            <ellipse cx={CX} cy="154" rx="24" ry="3" fill="#111" />
            <path d={`M${CX - 32} 168 H${CX + 32}`} stroke="url(#brass)" strokeWidth="1.4" />

            {/* washi segments */}
            {RIBS.slice(0, -1).map((y, i) => (
              <g key={i}>
                <path d={band(y, RIBS[i + 1])} fill="url(#lb)" />
                <path d={band(y, RIBS[i + 1])} fill="url(#puff)" />
              </g>
            ))}
            {/* candle light inside (night) */}
            <g clipPath="url(#lbody)">
              <ellipse cx={CX} cy="262" rx="74" ry="86" fill="url(#flame)" className="lantern-flame" />
              {/* paper fibres */}
              {Array.from({ length: 22 }, (_, i) => (
                <path key={i} d={`M${12 + i * 7} 170 Q${14 + i * 7 + (i % 3)} 250 ${11 + i * 7} 330`} stroke="#777" strokeOpacity="0.07" strokeWidth="0.6" fill="none" />
              ))}
            </g>
            {/* painted kanji */}
            <text x={CX} y="270" textAnchor="middle" className="lantern-kanji" style={{ filter: "url(#ink-bleed)" }}>
              灯
            </text>
            {/* bamboo ribs */}
            {RIBS.map((y, i) => {
              const h = hw(y);
              return (
                <g key={i}>
                  <path d={`M${CX - h} ${y} Q${CX} ${y + bow(y) * 2} ${CX + h} ${y}`} className="lantern-rib" strokeWidth="1.1" fill="none" />
                  <path d={`M${CX - h + 3} ${y + 1.4} Q${CX} ${y + bow(y) * 2 + 1.4} ${CX + h - 3} ${y + 1.4}`} stroke="#fff" strokeOpacity="0.28" strokeWidth="0.7" fill="none" />
                </g>
              );
            })}
            {/* specular highlight */}
            <path d={`M${CX - 40} 196 Q${CX - 52} 250 ${CX - 40} 306`} stroke="#fff" strokeOpacity="0.32" strokeWidth="9" strokeLinecap="round" fill="none" />

            {/* bottom cap */}
            <rect x={CX - 32} y="328" width="64" height="16" rx="3" fill="url(#lacquer)" />
            <path d={`M${CX - 32} 331 H${CX + 32}`} stroke="url(#brass)" strokeWidth="1.4" />
            <ellipse cx={CX} cy="344" rx="32" ry="4.5" fill="#080808" />

            {/* tassel */}
            <g className="lantern-tassel">
              <path d={`M${CX} 348 V356`} stroke="#8E1F18" strokeWidth="2" />
              <circle cx={CX} cy="359" r="4" fill="#B32D24" />
              <rect x={CX - 6} y="362" width="12" height="5" rx="1.5" fill="url(#brass)" />
              <path d={`M${CX - 7} 367 H${CX + 7} L${CX + 10} 372 L${CX + 9} 372 H${CX - 9} Z`} fill="url(#tassel)" />
            </g>
          </svg>
          <svg className="tassel-fringe" width="40" height="44" viewBox="0 0 40 44" aria-hidden>
            {FRINGE.map((k) => (
              <path key={k} d={`M${13 + k * 1} 0 Q${13 + k + (k - 7) * 0.3} 22 ${12 + k * 1.15 - (k - 7) * 0.2} 40`} stroke={k % 3 ? "#C8372D" : "#8E1F18"} strokeWidth="1.2" fill="none" />
            ))}
          </svg>
        </button>

        {/* pull-cord with a wooden bead */}
        <div className="pullcord" style={{ ["--drag" as string]: `${drag}px` }}>
          <svg width="40" height="160" viewBox="0 0 40 160" aria-hidden>
            <defs>
              <radialGradient id="bead" cx="0.35" cy="0.3" r="0.75">
                <stop offset="0" stopColor="#E6B987" />
                <stop offset="0.55" stopColor="#A4693A" />
                <stop offset="1" stopColor="#5A3518" />
              </radialGradient>
            </defs>
            <path d={`M20 0 C19 30 21 60 20 ${84 + drag}`} stroke="#4A4A4A" strokeWidth="1.2" fill="none" />
          </svg>
          <button
            className="bead"
            style={{ transform: `translateY(${drag}px)`, transition: drag ? "none" : undefined }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pull()}
            aria-label="Pull the cord to switch day and night"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              <circle cx="11" cy="11" r="9.5" fill="url(#bead)" />
              <path d="M5 8 Q11 6 17 9 M4.5 12 Q11 10 17.5 13" stroke="#5A3518" strokeOpacity="0.4" strokeWidth="0.7" fill="none" />
              <ellipse cx="8" cy="7" rx="3" ry="1.8" fill="#fff" fillOpacity="0.45" />
            </svg>
          </button>
          <span className="hand pull-hint" aria-hidden>
            pull ↓
          </span>
        </div>
      </div>
      <p className="lantern-hint hand" aria-hidden>
        {theme === "night" ? "pull again\nfor morning" : "psst — pull the cord\nfor night"}
      </p>
    </div>
  );
}
