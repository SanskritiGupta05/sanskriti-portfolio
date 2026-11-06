"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** One spring for the whole site; respects the visitor's reduced-motion setting. */
export const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={SPRING}>
      {children}
    </MotionConfig>
  );
}
