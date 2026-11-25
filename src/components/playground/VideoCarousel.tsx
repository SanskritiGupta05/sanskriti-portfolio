"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { LazyVideo } from "./LazyVideo";

const A = "/assets/playground";
const CLIPS = [
    {
        name: "spider-verse-screen",
        w: 538,
        h: 1244,
        screen: true,
        alt: "A phone revealing a holographic Spider-Verse character card",
    },
    {
        name: "chat",
        w: 1458,
        h: 1414,
        alt: "A tutor chat interface with lively message animations",
    },
    {
        name: "pixel-buddy",
        w: 1920,
        h: 1150,
        alt: "A context-window meter with a tiny pixel buddy reacting while an agent works",
    },
    {
        name: "mood-screen",
        w: 662,
        h: 1436,
        screen: true,
        alt: "A mood check-in app: turning a weather dial changes how the cloud feels",
    },
    { name: "folder", w: 720, h: 720, alt: "A file drawer whose coloured folders lift on hover" },
];

const SPEED = 40;
const GAP = 20;

function Strip({ h, copy }: { h: number; copy?: boolean }) {
    return (
        <div
            className="flex shrink-0"
            style={{ gap: GAP, paddingRight: GAP }}
            aria-hidden={copy || undefined}
        >
            {CLIPS.map((c) => {
                const w = Math.round(((h - 12) * c.w) / c.h) + 12;
                const inner = "screen" in c ? Math.round((w - 12) * 0.14) : 13;
                return (
                    <div
                        key={c.name}
                        className="shrink-0 bg-bg p-1.5 shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)] ring-1 ring-line"
                        style={{ width: w, borderRadius: inner + 6 }}
                    >
                        <div className="overflow-hidden" style={{ borderRadius: inner }}>
                            <LazyVideo
                                src={`${A}/${c.name}.mp4`}
                                poster={`${A}/${c.name}-poster.jpg`}
                                width={c.w}
                                height={c.h}
                                label={copy ? "" : c.alt}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function VideoCarousel() {
    const [height, setHeight] = useState(340);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 719px)");
        const set = () => setHeight(mq.matches ? 250 : 340);
        set();
        mq.addEventListener("change", set);
        return () => mq.removeEventListener("change", set);
    }, []);
    const still = useReducedMotion();
    const x = useMotionValue(0);
    const track = useRef<HTMLDivElement>(null);
    const box = useRef<HTMLDivElement>(null);
    const drag = useRef<{ id: number; lastX: number; lastT: number } | null>(null);
    const boost = useRef(0);
    const [dragging, setDragging] = useState(false);

    const wrap = (v: number) => {
        const half = (track.current?.scrollWidth ?? 0) / 2;
        if (!half) return v;
        return (((v % half) + half) % half) - half;
    };

    useAnimationFrame((_, delta) => {
        if (still || !track.current || drag.current) return;
        boost.current *= Math.exp(-delta / 350);
        x.set(wrap(x.get() - (SPEED * delta) / 1000 + (boost.current * delta) / 1000));
    });

    useEffect(() => {
        const el = box.current;
        if (!el || still) return;
        const onWheel = (e: WheelEvent) => {
            const dx =
                Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
            if (!dx) return;
            e.preventDefault();
            x.set(wrap(x.get() - dx));
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [still, x]);

    const onPointerDown = (e: React.PointerEvent) => {
        if (still || (e.pointerType === "mouse" && e.button !== 0)) return;
        drag.current = { id: e.pointerId, lastX: e.clientX, lastT: e.timeStamp };
        boost.current = 0;
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        setDragging(true);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const dx = e.clientX - d.lastX;
        const dt = Math.max(1, e.timeStamp - d.lastT);
        x.set(wrap(x.get() + dx));
        boost.current = boost.current * 0.6 + ((dx / dt) * 1000 + SPEED) * 0.4;
        d.lastX = e.clientX;
        d.lastT = e.timeStamp;
    };
    const onPointerUp = (e: React.PointerEvent) => {
        if (!drag.current || drag.current.id !== e.pointerId) return;
        if (e.timeStamp - drag.current.lastT > 80) boost.current = 0;
        boost.current = Math.max(-2500, Math.min(2500, boost.current));
        drag.current = null;
        setDragging(false);
    };

    return (
        <div
            ref={box}
            role="region"
            aria-label="Interaction videos"
            className={`relative -mx-6 block pt-12 pb-24 select-none md:pt-16 md:pb-32 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:mx-[calc(50%-50vw)] ${still ? "overflow-x-auto" : `touch-pan-y overflow-hidden ${dragging ? "cursor-grabbing" : "cursor-grab"}`}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            <motion.div ref={track} className="flex w-max" style={{ x }}>
                <Strip h={height} />
                <Strip h={height} copy />
            </motion.div>
        </div>
    );
}
