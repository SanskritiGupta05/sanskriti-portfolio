"use client";

import { useCallback, useRef, useState } from "react";
import { FEATURED } from "@/lib/content";
import { ProjectPoster } from "./Covers";
import { K } from "./Icons";
import SectionHeader from "./SectionHeader";

/** Red mizuhiki cord from the page edge to the card's eyelet, with knot and tassels. */
function Cord() {
  const tassel = (dx: number, len: number) => {
    const x0 = 334 + dx;
    return (
      <g key={dx} className="tassel" style={{ ["--len" as string]: len }}>
        <path d={`M334 120 C${334 + dx} 140 ${x0} 144 ${x0} 154`} stroke="#C8372D" strokeWidth="2.6" fill="none" />
        <rect x={x0 - 4} y="152" width="8" height="8" rx="2" fill="#8E1F18" />
        <path d={`M${x0 - 6} 160 H${x0 + 6} L${x0 + 8} ${160 + len} H${x0 - 8} Z`} fill="#C8372D" />
        {[-6, -4, -2, 0, 2, 4, 6].map((k) => (
          <path key={k} d={`M${x0 + k * 0.9} 162 L${x0 + k * 1.25} ${158 + len}`} stroke="#7E1A14" strokeWidth="0.6" />
        ))}
      </g>
    );
  };
  const cord = "M0 0 C150 80 270 110 334 120 C380 128 410 122 443 120";
  return (
    <svg className="cord" width="450" height="280" viewBox="0 0 450 280" aria-hidden>
      <path d={cord} stroke="#8E1F18" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d={cord} stroke="#C8372D" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={cord} stroke="#F08A7E" strokeWidth="1" strokeDasharray="2 4" fill="none" strokeOpacity="0.7" />
      <g className="knot">
        <ellipse cx="318" cy="106" rx="16" ry="10" transform="rotate(-35 318 106)" fill="none" stroke="#C8372D" strokeWidth="3.2" />
        <ellipse cx="350" cy="106" rx="16" ry="10" transform="rotate(35 350 106)" fill="none" stroke="#C8372D" strokeWidth="3.2" />
        <ellipse cx="334" cy="94" rx="9" ry="13" fill="none" stroke="#C8372D" strokeWidth="3.2" />
        <circle cx="334" cy="120" r="6" fill="#A82A22" />
      </g>
      {tassel(-6, 70)}
      {tassel(6, 86)}
    </svg>
  );
}

export default function CardDeck() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [flying, setFlying] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  const next = useCallback((dir = 1) => {
    setFlying(true);
    window.setTimeout(() => {
      setOrder((o) => (dir > 0 ? [...o.slice(1), o[0]] : [o[2], o[0], o[1]]));
      setFlying(false);
      setDrag({ x: 0, y: 0, active: false });
    }, 380);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  };
  const onUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > 120) next(1);
    else setDrag({ x: 0, y: 0, active: false });
  };

  const front = FEATURED[order[0]];
  const frontStyle: React.CSSProperties = flying
    ? { transform: `translate(${drag.x >= 0 ? 760 : -760}px, ${drag.y - 40}px) rotate(${drag.x >= 0 ? 18 : -18}deg)`, opacity: 0 }
    : { transform: `rotateX(${drag.active ? 0 : 8}deg) rotateY(${drag.active ? 0 : -6}deg) translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${drag.x * 0.03}deg)` };

  return (
    <section className="col section" id="work">
      <SectionHeader kanji="作" kicker="03 · tsukuru — to make" title="Selected work" />
      <p className="intro-line">
        Three stories, one deck.{" "}
        <K icon="hand" glow="var(--seal)">
          Drag
        </K>{" "}
        the front card away, or press{" "}
        <K icon="key" logo glow="var(--seal)" after=",">
          next
        </K>{" "}
        to shuffle to the next.
      </p>
      <div
        className="deck"
        tabIndex={0}
        aria-roledescription="card deck"
        aria-label={`${front.title} — card ${order[0] + 1} of 3. Use arrow keys to shuffle.`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next(1);
          if (e.key === "ArrowLeft") next(-1);
        }}
      >
        <Cord />
        {[2, 1].map((pos) => {
          const p = FEATURED[order[pos]];
          return (
            <div key={p.title} className={`deck-card back back-${pos}`} aria-hidden>
              <span className="brush deck-back-num">{p.num}</span>
            </div>
          );
        })}
        <article
          key={front.title}
          className={`deck-card front ${drag.active ? "is-dragging" : ""}`}
          style={frontStyle}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <span className="eyelet" aria-hidden />
          <div className="deck-thumb-wrap">
            <ProjectPoster i={order[0]} />
          </div>
          <span className="deck-fold" aria-hidden />
          <div className="deck-text">
            <p className="deck-top">
              <span className="min red">
                {front.num} / 参
              </span>
              <span className="mono">EST. {front.year}</span>
            </p>
            <h3 className="min" style={front.title.length > 9 ? { fontSize: 27 } : undefined}>
              {front.title}
            </h3>
            <p className="deck-desc">{front.description}</p>
            <dl className="deck-meta mono">
              {front.meta.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
            <a href={front.href} className="deck-read mono">
              read the story <span>→</span>
            </a>
          </div>
          <p className="tategaki brush" aria-hidden>
            {front.katakana}
          </p>
          <span className="seal deck-seal brush" aria-hidden>
            {front.num}
          </span>
        </article>
      </div>
      <div className="pager">
        {FEATURED.map((p, i) => (
          <button
            key={p.num}
            className={`pager-dot brush ${order[0] === i ? "is-on" : ""}`}
            aria-label={`Show ${p.title}`}
            onClick={() => {
              if (order[0] === i) return;
              const idx = order.indexOf(i);
              setOrder([...order.slice(idx), ...order.slice(0, idx)]);
            }}
          >
            {p.num}
          </button>
        ))}
        <span className="mono pager-hint">drag the card · ← →</span>
      </div>
    </section>
  );
}
