"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };

/**
 * Light isometric tilt: the element leans toward the cursor on a spring (momentum, no CSS-variable
 * recalcs). `rotate`/`baseX`/`baseY` are its resting pose; an optional shadow slides opposite the lean.
 */
export default function Tilt({
  children,
  max = 10,
  className = "",
  rotate = 0,
  baseX = 0,
  baseY = 0,
  perspective = 800,
  shadowClassName,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  rotate?: number;
  baseX?: number;
  baseY?: number;
  perspective?: number;
  shadowClassName?: string;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(baseX);
  const ry = useMotionValue(baseY);
  const sx = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);
  const shadowX = useSpring(sx, SPRING);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(baseY + x * max);
    rx.set(baseX - y * max * 0.7);
    sx.set(-x * 14);
  };
  const reset = () => {
    rx.set(baseX);
    ry.set(baseY);
    sx.set(0);
  };

  return (
    <motion.div className={`tilt ${className}`} style={{ rotate, rotateX, rotateY, transformPerspective: perspective }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
      {shadowClassName && <motion.span className={shadowClassName} style={{ x: shadowX }} aria-hidden />}
    </motion.div>
  );
}
