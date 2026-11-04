"use client";

import { useState } from "react";
import { MORE_WORK } from "@/lib/content";
import { MiniPoster } from "./Covers";
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
        <MiniPoster i={hover ?? 0} />
      </div>
    </section>
  );
}
