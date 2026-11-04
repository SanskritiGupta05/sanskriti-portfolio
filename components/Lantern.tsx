"use client";

import { useState } from "react";
import { useTheme } from "@/lib/hooks";

const hw = (y: number) => 27 + 46 * Math.sin(Math.PI * Math.min(1, Math.max(0, (y - 176) / 146)));
const RIBS = [190, 204, 218, 232, 246, 260, 274, 288, 302, 314];

/** Paper chōchin hanging from the top of the page. Click / pull = day ↔ night. */
export default function Lantern() {
  const { theme, toggle } = useTheme();
  const [pulling, setPulling] = useState(false);

  const pull = () => {
    setPulling(true);
    window.setTimeout(() => setPulling(false), 900);
    window.setTimeout(toggle, 180);
  };

  return (
    <div className="lantern-wrap">
      <button
        className={`lantern ${pulling ? "is-pulling" : ""}`}
        onClick={pull}
        aria-label={theme === "night" ? "Switch to day" : "Switch to night"}
        aria-pressed={theme === "night"}
      >
        <span className="lantern-glow" aria-hidden />
        <svg width="150" height="390" viewBox="0 0 150 390" aria-hidden>
          <defs>
            <linearGradient id="lb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" style={{ stopColor: "var(--l1)" }} />
              <stop offset="0.3" style={{ stopColor: "var(--l2)" }} />
              <stop offset="0.55" style={{ stopColor: "var(--l3)" }} />
              <stop offset="0.8" style={{ stopColor: "var(--l4)" }} />
              <stop offset="1" style={{ stopColor: "var(--l5)" }} />
            </linearGradient>
            <linearGradient id="lc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#050505" />
              <stop offset="0.4" stopColor="#4A4A4A" />
              <stop offset="0.6" stopColor="#2A2A2A" />
              <stop offset="1" stopColor="#050505" />
            </linearGradient>
            <linearGradient id="lv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="0.18" />
              <stop offset="0.25" stopColor="#000" stopOpacity="0" />
              <stop offset="0.8" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.22" />
            </linearGradient>
            <radialGradient id="lglow" cx="0.5" cy="0.55" r="0.55">
              <stop offset="0" stopColor="#FFF1C9" stopOpacity="0.95" />
              <stop offset="0.6" stopColor="#FFD58A" stopOpacity="0.35" />
              <stop offset="1" stopColor="#FFD58A" stopOpacity="0" />
            </radialGradient>
            <pattern id="lfib" width="7" height="40" patternUnits="userSpaceOnUse">
              <path d="M2 0 Q3.5 20 2 40 M5.5 4 Q4.5 18 5.8 34" stroke="#6E6A64" strokeOpacity="0.16" strokeWidth="0.6" fill="none" />
            </pattern>
            <clipPath id="lbody">
              <path d="M48 177 C2 197 2 301 48 321 L102 321 C148 301 148 197 102 177 Z" />
            </clipPath>
            <linearGradient id="lt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7E1F18" />
              <stop offset="0.5" stopColor="#C8372D" />
              <stop offset="1" stopColor="#7E1F18" />
            </linearGradient>
          </defs>
          <path className="lantern-cord" d="M75 0 C73 50 77 100 75 150" fill="none" strokeWidth="1.6" />
          <ellipse cx="75" cy="142" rx="4" ry="5" className="f-ink" />
          <circle cx="75" cy="153" r="5" fill="none" className="s-ink" strokeWidth="1.6" />
          <ellipse cx="75" cy="162" rx="30" ry="5" fill="#3A3A3A" />
          <rect x="45" y="162" width="60" height="16" rx="2" fill="url(#lc)" />
          <path d="M48 177 C2 197 2 301 48 321 L102 321 C148 301 148 197 102 177 Z" fill="url(#lb)" />
          <g clipPath="url(#lbody)">
            <rect x="0" y="170" width="150" height="160" fill="url(#lfib)" />
            <ellipse cx="75" cy="255" rx="70" ry="80" fill="url(#lglow)" className="lantern-inner" />
          </g>
          <path d="M48 177 C2 197 2 301 48 321 L102 321 C148 301 148 197 102 177 Z" fill="url(#lv)" />
          {RIBS.map((y) => {
            const h = hw(y);
            return <path key={y} d={`M${75 - h} ${y} Q75 ${y + 6} ${75 + h} ${y}`} stroke="#5E574D" strokeOpacity="0.35" strokeWidth="0.9" fill="none" />;
          })}
          <path d="M58 179 Q44 249 58 319 M92 179 Q106 249 92 319" stroke="#5E574D" strokeOpacity="0.18" fill="none" />
          <ellipse cx="60" cy="230" rx="9" ry="40" fill="#fff" fillOpacity="0.4" />
          <path d="M45 166 H105 M45 172 H105 M45 324 H105 M45 330 H105" stroke="#fff" strokeOpacity="0.12" />
          <text x="75" y="266" textAnchor="middle" className="lantern-kanji" style={{ filter: "url(#ink-bleed)" }}>
            灯
          </text>
          <rect x="45" y="320" width="60" height="15" rx="2" fill="url(#lc)" />
          <ellipse cx="75" cy="335" rx="30" ry="4" fill="#0A0A0A" />
          <line x1="75" y1="339" x2="75" y2="350" stroke="#161616" strokeWidth="2" />
          <g className="lantern-tassel">
            <circle cx="75" cy="352" r="3.5" fill="#B8322A" />
            <path d="M68 355 H82 L85 388 H65 Z" fill="url(#lt)" />
            <path d="M70 358 L69 386 M74 358 L74 387 M78 358 L79 387 M81 358 L83 386" stroke="#5E1610" strokeWidth="0.6" />
          </g>
        </svg>
      </button>
      <p className="lantern-hint hand" aria-hidden>
        {theme === "night" ? "pull again\nfor morning" : "psst — pull me\nfor night"}
      </p>
    </div>
  );
}
