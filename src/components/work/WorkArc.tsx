"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Frame, ProgressiveBlur, WORK } from "./shared";

// Version B · Arc: six cards of one size, fanned evenly like a hand of cards
// (same step, symmetric tilt, a gentle arc). Hovering a card raises it out of the hand.
const W = 260;
const H = 200;
const STEP = 112;
const STAGE_W = W + STEP * (WORK.length - 1) + 40;
const STAGE_H = 330;

export function WorkArc() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const still = useReducedMotion();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mid = (WORK.length - 1) / 2;
  return (
    <div ref={box} className="relative [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" style={{ height: STAGE_H * scale }}>
      <div className="absolute top-0 left-1/2 origin-top" style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})` }}>
        {WORK.map((w, i) => {
          const d = i - mid; // −2.5 … 2.5
          const rotate = d * 5;
          const y = 40 + d * d * 7; // outer cards sit a little lower: an arc
          return (
            <motion.div
              key={w.src}
              className="absolute"
              style={{ width: W, height: H, left: 20 + i * STEP, top: 0, zIndex: 10 - Math.round(Math.abs(d) * 2) }}
              initial={still ? { y, rotate } : { opacity: 0, y: y + 60, rotate: 0 }}
              whileInView={{ opacity: 1, y, rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 17, delay: still ? 0 : Math.abs(d) * 0.08 }}
              whileHover={still ? undefined : { y: y - 26, rotate: rotate * 0.5, zIndex: 20, transition: { type: "spring", stiffness: 300, damping: 22 } }}
            >
              <Frame work={w} sizes={`${W}px`} fill className="h-full" />
            </motion.div>
          );
        })}
      </div>
      <ProgressiveBlur edge="bottom" className="inset-x-0 bottom-0 h-2/5" />
    </div>
  );
}
