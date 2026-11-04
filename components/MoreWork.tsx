"use client";

import { useState } from "react";
import { MORE_WORK } from "@/lib/content";
import SectionHeader from "./SectionHeader";

/** Ink fills the row on hover; a little preview follows the cursor. */
export default function MoreWork() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="col section" id="more">
      <SectionHeader kanji="録" kicker="05 · roku — the record" title="More work" />
      <ul className="more" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setHover(null)}>
        {MORE_WORK.map((w, i) => (
          <li key={w.title} onMouseEnter={() => setHover(i)}>
            <a href="#">
              <span className="brush more-k">{w.k}</span>
              <span className="min more-t">{w.title}</span>
              <span className="more-d">{w.desc}</span>
              <span className="mono more-y">{w.year}</span>
              <span className="more-arrow">→</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={`more-float ${hover !== null ? "is-on" : ""}`} style={{ transform: `translate(${pos.x + 24}px, ${pos.y - 70}px) rotate(-4deg)` }} aria-hidden>
        <svg viewBox="0 0 190 124">
          <rect width="190" height="124" rx="8" className="f-paper2" />
          <rect x="14" y="14" width="80" height="10" rx="3" className="f-ink" />
          <rect x="14" y="32" width="120" height="6" rx="3" className="f-ink" fillOpacity="0.2" />
          <circle cx="50" cy="80" r="22" className="f-ink" />
          <rect x="86" y="62" width="40" height="40" rx="8" fill="#B8322A" />
          <rect x="134" y="62" width="40" height="40" rx="20" fill="none" className="s-ink" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
