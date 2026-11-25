"use client";

import { useEffect, useState } from "react";

import { ACTIVITIES, buildFrame, toSVG } from "../../assets/mascot/mascot.js";

type Activity = keyof typeof ACTIVITIES;
const ORDER = Object.keys(ACTIVITIES) as Activity[];
const HOLD_MS = 7000;

export function Mascot({
    start = "coffee",
    className = "",
}: {
    start?: Activity;
    className?: string;
}) {
    const [state, setState] = useState({ act: start, frame: 0, blink: false });

    useEffect(() => {
        let act = state.act,
            frame = 0,
            elapsed = 0,
            nextBlink = Date.now() + 2000,
            blinkUntil = 0,
            timer = 0;
        const tick = () => {
            frame = (frame + 1) % ACTIVITIES[act].frames;
            elapsed += ACTIVITIES[act].speed;
            if (Date.now() > nextBlink) {
                blinkUntil = Date.now() + 160;
                nextBlink = Date.now() + 2500 + Math.random() * 2500;
            }
            if (elapsed > HOLD_MS) {
                act = ORDER[(ORDER.indexOf(act) + 1) % ORDER.length];
                frame = 0;
                elapsed = 0;
            }
            setState({ act, frame, blink: Date.now() < blinkUntil });
            timer = window.setTimeout(tick, ACTIVITIES[act].speed);
        };
        timer = window.setTimeout(tick, 300);
        return () => window.clearTimeout(timer);
    }, [state.act]);

    const next = () =>
        setState((s) => ({
            act: ORDER[(ORDER.indexOf(s.act) + 1) % ORDER.length],
            frame: 0,
            blink: false,
        }));

    return (
        <button
            type="button"
            onClick={next}
            aria-label={`Pixel Sanskriti, ${ACTIVITIES[state.act].label}. Click to change what she's doing.`}
            title={ACTIVITIES[state.act].label}
            className={`block cursor-pointer [&_svg]:block [&_svg]:h-auto [&_svg]:w-full ${className}`}
            dangerouslySetInnerHTML={{
                __html: toSVG(buildFrame(state.act, state.frame, { blink: state.blink }), 300),
            }}
        />
    );
}
