"use client";

import { motion, useReducedMotion } from "motion/react";

import { Frame, ProgressiveBlur, useFit, WORK } from "./shared";

const W = 300;
const H = 225;
const STEP_X = 104;
const STEP_Y = 16;
const STAGE_W = W + STEP_X * (WORK.length - 1);
const STAGE_H = H + STEP_Y * (WORK.length - 1) + 40;

export function WorkCascade() {
    const [ref, scale] = useFit(STAGE_W);
    const still = useReducedMotion();
    return (
        <div
            ref={ref}
            className="relative [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
            style={{ height: STAGE_H * scale }}
        >
            <div
                className="absolute top-0 left-1/2 origin-top"
                style={{
                    width: STAGE_W,
                    height: STAGE_H,
                    transform: `translateX(-50%) scale(${scale})`,
                }}
            >
                {WORK.map((w, i) => (
                    <motion.div
                        key={w.src}
                        className="absolute"
                        style={{
                            width: W,
                            height: H,
                            left: i * STEP_X,
                            top: 20 + i * STEP_Y,
                            zIndex: i,
                        }}
                        initial={still ? false : { opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                        whileHover={
                            still
                                ? undefined
                                : {
                                      y: -22,
                                      zIndex: 20,
                                      transition: { type: "spring", stiffness: 300, damping: 24 },
                                  }
                        }
                    >
                        <Frame work={w} sizes={`${W}px`} fill className="h-full" />
                    </motion.div>
                ))}
            </div>
            <ProgressiveBlur edge="bottom" className="inset-x-0 bottom-0 h-2/5" />
        </div>
    );
}
