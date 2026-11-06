"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue, type PanInfo } from "motion/react";
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

// resting place of each stack position (front, middle, back)
const POS = [
  { x: 0, y: 0, rotate: 0, z: 3 },
  { x: -8, y: -4, rotate: 2.5, z: 2 },
  { x: 26, y: -8, rotate: -4, z: 1 },
];

function Card({ i, pos, x, onDragEnd }: { i: number; pos: number; x: MotionValue<number>; onDragEnd: (e: unknown, info: PanInfo) => void }) {
  const p = FEATURED[i];
  const rotate = useTransform(x, [-420, 0, 420], [-14, 0, 14]);
  const front = pos === 0;
  const at = POS[pos];
  return (
    <motion.div
      className="deck-slot"
      initial={false}
      animate={{ x: at.x, y: at.y, rotate: at.rotate, rotateX: 8, rotateY: -6 }}
      style={{ zIndex: at.z }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.article
        className={`deck-card ${front ? "front" : `back back-${pos}`}`}
        style={{ x, rotate }}
        drag={front ? "x" : false}
        dragMomentum={false}
        dragElastic={0.9}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        aria-hidden={!front}
      >
        <span className="eyelet" aria-hidden />
        <div className="deck-face">
          <div className="deck-thumb-wrap">
            <ProjectPoster i={i} />
          </div>
          <span className="deck-fold" aria-hidden />
          <div className="deck-text">
            <p className="deck-top">
              <span className="min red">{p.num} / 参</span>
              <span className="mono">EST. {p.year}</span>
            </p>
            <h3 className="min" style={p.title.length > 9 ? { fontSize: 27 } : undefined}>
              {p.title}
            </h3>
            <p className="deck-desc">{p.description}</p>
            <dl className="deck-meta mono">
              {p.meta.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
            <a href={p.href} className="deck-read mono" tabIndex={front ? 0 : -1}>
              read the case study <span>→</span>
            </a>
          </div>
          <p className="tategaki brush" aria-hidden>
            {p.katakana}
          </p>
          <span className="seal deck-seal brush" aria-hidden>
            {p.num}
          </span>
        </div>
        <span className="brush deck-back-num" aria-hidden>
          {p.num}
        </span>
      </motion.article>
    </motion.div>
  );
}

export default function CardDeck() {
  const [order, setOrder] = useState([0, 1, 2]);
  const busy = useRef(false);
  const x0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const xs = [x0, x1, x2];

  /** Throw the front card off (dir ±1), then let it swoop back in behind the stack. */
  const toss = useCallback(
    (dir: number, velocity = 0) => {
      if (busy.current) return;
      busy.current = true;
      const mv = [x0, x1, x2][order[0]];
      animate(mv, dir * 900, { type: "spring", stiffness: 220, damping: 28, velocity }).then(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        animate(mv, 0, { type: "spring", stiffness: 260, damping: 30 }).then(() => {
          busy.current = false;
        });
      });
    },
    [order, x0, x1, x2],
  );

  const back = () => setOrder((o) => [o[2], o[0], o[1]]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 110) toss(Math.sign(info.offset.x || info.velocity.x), info.velocity.x);
    else animate([x0, x1, x2][order[0]], 0, { type: "spring", stiffness: 500, damping: 30 });
  };

  const front = FEATURED[order[0]];

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
          // keyboard: no throw animation, just reorder (the stack springs into place)
          if (e.key === "ArrowRight") setOrder((o) => [...o.slice(1), o[0]]);
          if (e.key === "ArrowLeft") back();
        }}
      >
        <Cord />
        {FEATURED.map((_, i) => (
          <Card key={i} i={i} pos={order.indexOf(i)} x={xs[i]} onDragEnd={onDragEnd} />
        ))}
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
            {order[0] === i && <motion.span layoutId="pager-on" className="pager-on" aria-hidden />}
            <span className="pager-k">{p.num}</span>
          </button>
        ))}
        <span className="mono pager-hint">drag the card · ← →</span>
      </div>
    </section>
  );
}
