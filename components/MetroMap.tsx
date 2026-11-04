"use client";

import { useEffect, useRef, useState } from "react";
import { STATIONS } from "@/lib/content";
import SectionHeader from "./SectionHeader";

const ROUTE = "M60 90 H250 L330 170 H620";
const POS = [
  [60, 90, "below"],
  [250, 90, "above"],
  [330, 170, "below"],
  [620, 170, "above"],
] as const;

/** Tokyo-metro style career line. The little train rides it as you scroll. */
export default function MetroMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [train, setTrain] = useState({ x: 60, y: 90, a: 0, p: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = wrap.current;
      const pth = path.current;
      if (!el || !pth) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.7)));
      const L = pth.getTotalLength();
      const pt = pth.getPointAtLength(p * L);
      const pt2 = pth.getPointAtLength(Math.min(L, p * L + 1));
      setTrain({ x: pt.x, y: pt.y, a: (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI, p });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // station i is "reached" once the train passes its share of the route
  const reached = (i: number) => train.p >= [0, 0.32, 0.55, 0.98][i];

  return (
    <section className="col section" id="stations">
      <SectionHeader kanji="駅" kicker="02 · eki — stations" title="Where I’ve worked" />
      <div className="metro" ref={wrap}>
        <svg className="metro-svg" viewBox="0 0 680 300" aria-hidden>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0 V20 H0" fill="none" className="s-ink" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="680" height="300" fill="url(#grid)" />
          <path ref={path} d={ROUTE} className="s-ink" strokeWidth="10" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={ROUTE} className="s-paper" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          <g transform={`translate(${train.x} ${train.y}) rotate(${train.a}) translate(-32 -26)`} className="train">
            <path d="M2 6 Q2 2 8 2 H52 Q62 2 62 14 V22 H2 Z" className="f-paper2 s-ink" strokeWidth="1.6" />
            <rect x="8" y="7" width="9" height="7" rx="1.5" className="f-ink" />
            <rect x="21" y="7" width="9" height="7" rx="1.5" className="f-ink" />
            <rect x="34" y="7" width="9" height="7" rx="1.5" className="f-ink" />
            <path d="M48 7 H55 Q58 8 58 14 H48 Z" className="f-ink" />
            <rect x="2" y="16" width="60" height="2" fill="#B8322A" />
          </g>
        </svg>
        {STATIONS.map((s, i) => {
          const [x, y, pos] = POS[i];
          return (
            <div key={s.n} className="station" style={{ left: `${(x / 680) * 100}%`, top: `${(y / 300) * 100}%` }}>
              <span className={`badge ${reached(i) ? "is-reached" : ""}`}>
                <small className="mono">S</small>
                <b className="min">{s.n}</b>
              </span>
              {s.current && <span className="now mono">now</span>}
              <span className={`station-label ${pos} ${i === 3 ? "right" : ""}`}>
                <b className="min">{s.company}</b>
                <small className="mono">
                  {s.role} · {s.years}
                </small>
              </span>
            </div>
          );
        })}
        <p className="metro-legend min">Line S · サンスクリティ線</p>
      </div>
    </section>
  );
}
