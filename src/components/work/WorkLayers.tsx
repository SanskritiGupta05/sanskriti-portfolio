"use client";

import { motion, useReducedMotion } from "motion/react";

import { Frame, ProgressiveBlur, useFit, WORK } from "./shared";

const STAGE_W = 1000;
const STAGE_H = 470;
const by = (name: string) => WORK.find((w) => w.src.includes(name))!;

const BACK = {
    w: 250,
    h: 200,
    y: 20,
    xs: [0, 250, 500, 750],
    items: ["mosaic", "figma-to-react", "concertpal", "espresso"],
};
const FRONT = { w: 340, h: 255, y: 150, xs: [150, 510], items: ["context-window", "keploy"] };

export function WorkLayers() {
    const [ref, scale] = useFit(STAGE_W);
    const still = useReducedMotion();
    const cards = [
        ...BACK.items.map((n, i) => ({
            work: by(n),
            w: BACK.w - 12,
            h: BACK.h,
            x: BACK.xs[i] + 6,
            y: BACK.y,
            z: 1,
            delay: i * 0.06,
        })),
        ...FRONT.items.map((n, i) => ({
            work: by(n),
            w: FRONT.w,
            h: FRONT.h,
            x: FRONT.xs[i],
            y: FRONT.y,
            z: 2,
            delay: 0.3 + i * 0.08,
        })),
    ];
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
                {cards.map((c) => (
                    <motion.div
                        key={c.work.src}
                        className="absolute"
                        style={{ width: c.w, height: c.h, left: c.x, top: c.y, zIndex: c.z }}
                        initial={still ? false : { opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: c.delay }}
                        whileHover={
                            still
                                ? undefined
                                : {
                                      y: -14,
                                      zIndex: 20,
                                      transition: { type: "spring", stiffness: 300, damping: 24 },
                                  }
                        }
                    >
                        <Frame work={c.work} sizes={`${c.w}px`} fill className="h-full" />
                    </motion.div>
                ))}
            </div>
            <ProgressiveBlur edge="bottom" className="inset-x-0 bottom-0 h-2/5" />
        </div>
    );
}
