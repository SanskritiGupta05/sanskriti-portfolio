"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// "Sanskriti" in katakana is サンスクリティ. Each sound swaps on its own, one after another.
const PARTS: [string, string][] = [["Sa", "サ"], ["n", "ン"], ["s", "ス"], ["kri", "クリ"], ["ti", "ティ"]];
const START_MS = 2500; // first swap, a few seconds after the page loads
const HOLD_MS = 3500; // how long each language stays before swapping back
const STEP_MS = 140; // gap between one sound and the next

// Her name, swapping between English and Japanese sound by sound, on a loop.
export function NameSwap({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [jp, setJp] = useState<boolean[]>(PARTS.map(() => false));

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    let to = true;
    const swap = () => {
      PARTS.forEach((_, i) =>
        timers.push(window.setTimeout(() => setJp((s) => s.map((v, j) => (j === i ? to : v))), i * STEP_MS)),
      );
      to = !to;
      timers.push(window.setTimeout(swap, PARTS.length * STEP_MS + HOLD_MS));
    };
    timers.push(window.setTimeout(swap, START_MS));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <span className={`inline-flex ${className}`} aria-label="Sanskriti" role="text">
      {PARTS.map(([en, ja], i) => (
        <motion.span key={i} layout transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }} className="inline-grid" aria-hidden="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={jp[i] ? "ja" : "en"}
              className={jp[i] ? "font-jp" : ""}
              initial={{ opacity: 0, y: "0.5em", filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.5em", filter: "blur(3px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {jp[i] ? ja : en}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      ))}
    </span>
  );
}
