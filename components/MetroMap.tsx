"use client";

import { useEffect, useRef, useState } from "react";
import { STATIONS } from "@/lib/content";
import SectionHeader from "./SectionHeader";

const ROUTE = "M70 132 H250 Q262 132 270 140 L330 200 Q338 208 350 208 H610";
// position on the route (0–1) where each station sits, plus label placement
const STOPS = [
  { x: 70, y: 132, t: 0, jp: "今", romaji: "ima", side: "below" },
  { x: 250, y: 132, t: 0.3, jp: "成長", romaji: "seichō", side: "above" },
  { x: 350, y: 208, t: 0.55, jp: "学び", romaji: "manabi", side: "below" },
  { x: 610, y: 208, t: 1, jp: "始まり", romaji: "hajimari", side: "below" },
] as const;

function Train() {
  return (
    <g>
      <defs>
        <linearGradient id="tr-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#E3E5E8" />
          <stop offset="1" stopColor="#A9ADB3" />
        </linearGradient>
        <linearGradient id="tr-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B4A5A" />
          <stop offset="0.6" stopColor="#1A222B" />
          <stop offset="1" stopColor="#0B0F14" />
        </linearGradient>
      </defs>
      <ellipse cx="46" cy="40" rx="44" ry="3" fill="#000" fillOpacity="0.2" />
      {/* pantograph */}
      <path d="M30 6 L38 0 L46 6" stroke="#555" strokeWidth="1.2" fill="none" />
      <rect x="4" y="6" width="84" height="30" rx="7" fill="url(#tr-body)" stroke="#6E7279" strokeWidth="0.8" />
      {/* nose */}
      <path d="M80 6 Q92 8 92 22 V36 H84 Z" fill="url(#tr-body)" stroke="#6E7279" strokeWidth="0.8" />
      <path d="M84 10 Q90 12 90 22 H84 Z" fill="url(#tr-glass)" />
      {/* windows + doors */}
      {[10, 26, 50, 66].map((x) => (
        <rect key={x} x={x} y="11" width="12" height="9" rx="1.5" fill="url(#tr-glass)" />
      ))}
      {[38, 76].map((x) => (
        <g key={x}>
          <rect x={x - 1} y="10" width="10" height="24" rx="1" fill="#D3D6DA" stroke="#8A8E94" strokeWidth="0.6" />
          <rect x={x + 1} y="12" width="6" height="8" rx="1" fill="url(#tr-glass)" />
        </g>
      ))}
      <path d="M12 12 L16 12 L12 18 Z M28 12 L32 12 L28 18 Z" fill="#fff" fillOpacity="0.35" />
      {/* line colour band */}
      <rect x="4" y="23" width="88" height="4" fill="#C3352B" />
      <rect x="4" y="27" width="88" height="1" fill="#fff" fillOpacity="0.6" />
      {/* bogies */}
      {[18, 70].map((x) => (
        <g key={x}>
          <rect x={x - 10} y="36" width="20" height="3" rx="1" fill="#333" />
          <circle cx={x - 6} cy="39" r="2.4" fill="#222" />
          <circle cx={x + 6} cy="39" r="2.4" fill="#222" />
        </g>
      ))}
      <circle cx="88" cy="31" r="1.4" fill="#FFE7A6" />
    </g>
  );
}

/** Career history as a mounted Tokyo-metro style line sign. The train rides it as you scroll. */
export default function MetroMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [train, setTrain] = useState({ x: 70, y: 132, a: 0, p: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = wrap.current;
      const pth = path.current;
      if (!el || !pth) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.75)));
      const L = pth.getTotalLength();
      const pt = pth.getPointAtLength(p * L);
      const pt2 = pth.getPointAtLength(Math.min(L, p * L + 1));
      setTrain({ x: pt.x, y: pt.y, a: (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI, p });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="col section" id="stations">
      <SectionHeader kanji="駅" kicker="02 · eki — stations" title="Where I’ve worked" />
      <div className="sign-mount" ref={wrap}>
        <div className="sign">
          <span className="screw tl" />
          <span className="screw tr" />
          <span className="screw bl" />
          <span className="screw br" />
          <header className="sign-head">
            <span className="line-badge">
              <b>S</b>
            </span>
            <span className="sign-title">
              <b className="min">サンスクリティ線</b>
              <small>Sanskriti Line · career route</small>
            </span>
            <span className="sign-legend">
              <i /> <b className="min">現在地</b> you are here
            </span>
          </header>

          <svg className="sign-map" viewBox="0 0 680 290" role="img" aria-label="Career route map from 2021 to now">
            <defs>
              <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* faint river + park blocks like a real area map */}
            <path d="M0 250 C140 230 220 270 360 252 S600 236 680 258 V290 H0 Z" className="map-water" />
            {/* route */}
            <path d={ROUTE} stroke="#000" strokeOpacity="0.12" strokeWidth="16" fill="none" strokeLinejoin="round" transform="translate(0 2)" />
            <path ref={path} d={ROUTE} stroke="#C3352B" strokeWidth="12" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <path d={ROUTE} stroke="#fff" strokeOpacity="0.35" strokeWidth="2" fill="none" transform="translate(0 -3)" />

            {STOPS.map((s, i) => {
              const st = STATIONS[i];
              const reached = train.p >= s.t - 0.02;
              const ly = s.side === "above" ? s.y - 56 : s.y + 34;
              const anchor = i === 3 ? "end" : "start";
              const lx = i === 3 ? s.x + 22 : s.x - 22;
              return (
                <g key={st.n} className={`stop ${reached ? "is-reached" : ""}`}>
                  <circle cx={s.x} cy={s.y} r="10" fill="#fff" stroke="#1B1B1B" strokeWidth="3.5" />
                  {/* station number badge */}
                  <g transform={i === 0 ? `translate(${s.x + 40} ${s.y - 30})` : `translate(${s.x + (i === 3 ? -34 : 34)} ${s.y + (s.side === "above" ? 30 : -30)})`}>
                    <circle r="15" fill="#fff" stroke="#C3352B" strokeWidth="4" className="num-ring" />
                    <text y="-3" textAnchor="middle" className="num-s">
                      S
                    </text>
                    <text y="9" textAnchor="middle" className="num-n">
                      {st.n}
                    </text>
                  </g>
                  <text x={lx} y={ly} textAnchor={anchor} className="stn-jp">
                    {s.jp}
                    <tspan className="stn-romaji" dx="6">
                      {s.romaji}
                    </tspan>
                  </text>
                  <text x={lx} y={ly + 16} textAnchor={anchor} className="stn-en">
                    {st.company}
                  </text>
                  <text x={lx} y={ly + 30} textAnchor={anchor} className="stn-meta">
                    {st.role} · {st.years}
                  </text>
                </g>
              );
            })}

            {/* you-are-here pin at the current station */}
            <g transform="translate(70 132)" className="pin">
              <circle r="22" fill="#C3352B" fillOpacity="0.18" className="pin-pulse" />
              <path d="M0 -12 C-9 -12 -13 -5 -13 0 C-13 8 0 18 0 18 C0 18 13 8 13 0 C13 -5 9 -12 0 -12 Z" transform="translate(0 -26)" fill="#C3352B" filter="url(#pinGlow)" />
              <circle cy="-26" r="4.5" fill="#fff" />
            </g>

            <g transform={`translate(${train.x} ${train.y}) rotate(${train.a}) translate(-46 -38)`} className="train">
              <Train />
            </g>

            <text x="30" y="276" className="stn-meta">
              2021 → now · scroll to ride the line
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
