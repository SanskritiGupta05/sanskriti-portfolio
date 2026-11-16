"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Frame, ProgressiveBlur, WORK } from "./shared";

// Version B · Arc: six cards of one size, fanned evenly like a hand of cards
// (same step, symmetric tilt, a gentle arc). Hovering a card raises it out of the hand,
// straightens it and reshapes it to the image's own proportions, so the whole visual shows.
const W = 260;
const H = 200;
const STEP = 112;
const STAGE_W = W + STEP * (WORK.length - 1) + 40;
const STAGE_H = 330;
const MAT = 12; // the frame's white mat, both sides together
// card width at the same height that shows the image uncropped
const fullWidth = (w: { w: number; h: number }) => Math.round(((H - MAT) * w.w) / w.h + MAT);

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
          const fw = fullWidth(w);
          const left = 20 + i * STEP;
          // widen around the card's centre, but never past the stage's edges
          const fullLeft = Math.min(Math.max(left - (fw - W) / 2, 0), STAGE_W - fw);
          return (
            <motion.div
              key={w.src}
              className="absolute"
              style={{ width: W, height: H, left, top: 0, zIndex: 10 - Math.round(Math.abs(d) * 2) }}
              initial={still ? { y, rotate } : { opacity: 0, y: y + 60, rotate: 0 }}
              whileInView={{ opacity: 1, y, rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 17, delay: still ? 0 : Math.abs(d) * 0.08 }}
              whileHover={{ y: y - 30, rotate: 0, width: fw, x: fullLeft - left, zIndex: 20, transition: still ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 26 } }}
            >
              <Frame work={w} sizes={`${Math.max(W, fw)}px`} fill className="h-full" />
            </motion.div>
          );
        })}
      </div>
      <ProgressiveBlur edge="bottom" className="inset-x-0 bottom-0 h-2/5" />
    </div>
  );
}
