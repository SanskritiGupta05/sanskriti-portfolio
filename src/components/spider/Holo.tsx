"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// The project's own trick, borrowed for the case study: a card (or phone) that tilts toward
// your cursor with a holographic sheen that follows it. Max tilt 12°, like the real app.
export function HoloTilt({ children, className = "", max = 12, rounded = "rounded-[18px]" }: { children: ReactNode; className?: string; max?: number; rounded?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18 };
  const rotateY = useSpring(useTransform(nx, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(ny, [0, 1], [max, -max]), spring);
  const sheen = useTransform(
    [nx, ny],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 45%), linear-gradient(${110 + x * 60}deg, rgba(255,0,140,0.18), rgba(0,200,255,0.18) 40%, rgba(255,230,0,0.16) 70%, rgba(170,0,255,0.18))`,
  );
  const glow = useTransform(nx, (x) => (x === 0.5 ? 0 : 1));

  return (
    <div
      ref={ref}
      className={`[perspective:900px] ${className}`}
      onPointerMove={(e) => {
        if (still) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        nx.set((e.clientX - r.left) / r.width);
        ny.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        nx.set(0.5);
        ny.set(0.5);
      }}
    >
      <motion.div className={`relative overflow-hidden ${rounded}`} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ backgroundImage: sheen, opacity: glow }} />
      </motion.div>
    </div>
  );
}
