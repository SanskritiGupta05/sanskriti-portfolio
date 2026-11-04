"use client";

import { useRef, type ReactNode } from "react";

/** Light isometric tilt: the child leans toward the cursor and its shadow shifts. */
export default function Tilt({ children, max = 10, className = "", style }: { children: ReactNode; max?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * max * 0.7).toFixed(2)}deg`);
    el.style.setProperty("--sx", `${(-x * 14).toFixed(1)}px`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--sx", "0px");
  };
  return (
    <div ref={ref} className={`tilt ${className}`} style={style} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}
