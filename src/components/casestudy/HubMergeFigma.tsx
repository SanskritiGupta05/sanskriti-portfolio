"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { C, NoteCard, Pin, Spotlight } from "./figmaStage";

// Design decision #2 as a live Figma-style storyboard (HTML/CSS, not a video: sharp at any size and replayable).
// Five steps, each with a caption, so a first-time viewer can follow it:
//   0 Before        the old app: a list of hub names (1), then a second screen for one hub's details (2)
//   1 On the list   Map, Hub name and Scooters light up in blue, one by one
//   2 On the detail Hub photo, Address and Available bike light up in orange
//   3 Merge         all six pieces fly, staggered, to their exact spots on the new single screen
//   4 After         the pieces settle, then four comment pins explain what else got better
// Plays when scrolled into view; Replay runs it again. Piece positions come from the Figma frames
// (old screens 440×979, new screen 440×956). Screens: public/assets/cases/bounce/v5/hq (3×).

const W = 860;
const H = 628;
const SRC = "/assets/cases/bounce/v5/hq";
const UI = {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};
const BLUE = "#0d99ff";
const ORANGE = "#ff7a29";

// where the phones sit on the stage
// layout: Before (two old phones) and After (new phone + notes) are two sections on one grid, same height.
// both sections share one grid: tag at +14, frame names at +48, phones at +68, 24px under the tallest content
const SEC = { y: 72, h: 448 };
const BEFORE = { x: 24, w: 360 };
const AFTER = { x: 436, w: 400 };
const OLD = {
    w: 150,
    h: 334,
    y: SEC.y + 68,
    listX: BEFORE.x + 18,
    detailX: BEFORE.x + 18 + 150 + 24,
};
const NEW = { w: 160, h: 348, x: AFTER.x + 18, y: SEC.y + 68 };
const NOTES_X = NEW.x + NEW.w + 16;
const so = OLD.w / 440;
const sn = NEW.w / 440;

type Rect = [number, number, number, number];
const PIECES: {
    label: string;
    color: string;
    from: "list" | "detail";
    a: Rect;
    b: Rect;
    tagBelow?: boolean;
}[] = [
    {
        label: "Map",
        color: BLUE,
        from: "list",
        a: [0, 108, 430, 260],
        b: [0, 62, 440, 470],
    },
    {
        label: "Hub name",
        color: BLUE,
        from: "list",
        a: [121, 504, 140, 24],
        b: [195, 562, 150, 26],
    },
    {
        label: "Scooters",
        color: BLUE,
        from: "list",
        a: [121, 532, 110, 22],
        b: [60, 668, 110, 29],
        tagBelow: true,
    },
    {
        label: "Hub photo",
        color: ORANGE,
        from: "detail",
        a: [140, 110, 160, 160],
        b: [60, 563, 123, 93],
    },
    {
        label: "Address",
        color: ORANGE,
        from: "detail",
        a: [17, 364, 370, 70],
        b: [195, 612, 190, 24],
        tagBelow: true,
    },
    {
        label: "Available bike",
        color: ORANGE,
        from: "detail",
        a: [16, 509, 399, 94],
        b: [180, 668, 140, 29],
        tagBelow: true,
    },
];
const onOld = (from: "list" | "detail", r: Rect) => {
    const x0 = from === "list" ? OLD.listX : OLD.detailX;
    return {
        left: x0 + r[0] * so,
        top: OLD.y + r[1] * so,
        width: r[2] * so,
        height: r[3] * so,
    };
};
const onNew = (r: Rect) => ({
    left: NEW.x + r[0] * sn,
    top: NEW.y + r[1] * sn,
    width: r[2] * sn,
    height: r[3] * sn,
});

const CAPTIONS = [
    "Before: to pick a hub, riders read a list of names, then opened a second screen for one hub's details.",
    "On the list: the map, the hub's name and its scooter count.",
    "On the detail screen: the hub photo, its address and the available bike.",
    "The redesign brings every piece onto one screen.",
    "After: one screen. The map opens on the nearest hub, with its details on the card.",
    "What else got better, one note at a time.",
    "One screen, map first: riders find the closest scooter without reading a list.",
];
const TABS = ["Before", "Spot the parts", "Merge", "After"];
const tabOf = (phase: number) => (phase === 0 ? 0 : phase <= 2 ? 1 : phase === 3 ? 2 : 3); // phases 4–6 are all "After"

// what else got better, each pointing at an area of the new screen (440-wide design space)
const NOTES: { area: Rect; title: string; sub: string }[] = [
    {
        area: [0, 62, 440, 470],
        title: "Map first",
        sub: "Hubs around the rider, instead of a list of names to read.",
    },
    {
        area: [190, 566, 240, 46],
        title: "Nearest hub first",
        sub: "Distance and a Nearest tag, up front.",
    },
    {
        area: [56, 672, 280, 30],
        title: "Scooters + batteries as chips",
        sub: "Both counts read at a glance, side by side.",
    },
    {
        area: [24, 868, 392, 48],
        title: "The CTA confirms your hub",
        sub: "“Pick scooter at RR Nagar” names the hub and invites the rider on.",
    },
];

// timeline: when each step starts (ms)
const T_LIST = 2000;
const T_DETAIL = 4000;
const T_MERGE = 6200;
const T_AFTER = 8600;
const T_PINS = 9400;
const STEP = 1600;
const T_DONE = T_PINS + NOTES.length * STEP + 300;

function PhoneImg({
    src,
    w,
    h,
    alt,
    dim,
}: {
    src: string;
    w: number;
    h: number;
    alt: string;
    dim?: boolean;
}) {
    return (
        <div
            className={`h-full w-full overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.09] transition-all duration-700 ${dim ? "opacity-30 grayscale" : ""}`}
            style={{ width: w, height: h }}
        >
            <Image
                src={`${SRC}/${src}.webp`}
                alt={alt}
                width={1320}
                height={Math.round((1320 * h) / w)}
                unoptimized
                className="block h-full w-full object-cover object-top"
            />
        </div>
    );
}

export function HubMergeFigma() {
    const wrap = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [t, setT] = useState(0); // elapsed ms on a coarse clock
    const [hover, setHover] = useState<number | null>(null);
    const raf = useRef<number | undefined>(undefined);
    const start = useRef(0);

    const play = () => {
        if (raf.current) cancelAnimationFrame(raf.current);
        start.current = performance.now();
        setT(0);
        const tick = (now: number) => {
            const e = now - start.current;
            setT((prev) => (Math.floor(e / 100) * 100 !== prev ? Math.floor(e / 100) * 100 : prev));
            if (e < T_DONE + 200) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
        ro.observe(el);
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        // plays when it scrolls into view; once finished, scrolling away resets it to the
        // start, so coming back plays it again from the beginning
        let armed = true;
        const io = new IntersectionObserver(
            ([e]) => {
                if (reduce) {
                    if (e.isIntersecting) setT(T_DONE + 1);
                    return;
                }
                if (e.isIntersecting) {
                    if (!armed) return;
                    armed = false;
                    play();
                } else if (performance.now() - start.current >= T_DONE) {
                    if (raf.current) cancelAnimationFrame(raf.current);
                    setT(0);
                    setHover(null);
                    armed = true;
                }
            },
            { threshold: 0.45 },
        );
        io.observe(el);
        return () => {
            ro.disconnect();
            io.disconnect();
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

    const phase =
        t < T_LIST
            ? 0
            : t < T_DETAIL
              ? 1
              : t < T_MERGE
                ? 2
                : t < T_AFTER
                  ? 3
                  : t < T_PINS
                    ? 4
                    : t < T_DONE
                      ? 5
                      : 6;
    const merged = t >= T_MERGE;
    const showAfter = t >= T_MERGE - 200;
    const piecesGone = t >= T_AFTER;
    const done = t >= T_DONE;
    const focus =
        t >= T_PINS && t < T_PINS + NOTES.length * STEP ? Math.floor((t - T_PINS) / STEP) : -1;
    const lit = (i: number) => focus === i || (done && hover === i);
    const newPhone = { x: NEW.x, y: NEW.y, w: NEW.w, h: NEW.h };
    const noteArea = (r: Rect) => ({
        x: NEW.x + r[0] * sn,
        y: NEW.y + r[1] * sn,
        w: r[2] * sn,
        h: r[3] * sn,
    });
    const ease = "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

    return (
        <div ref={wrap} className="relative w-full overflow-hidden" style={{ height: H * scale }}>
            <div
                className="absolute top-0 left-0 origin-top-left"
                style={{ width: W, height: H, transform: `scale(${scale})`, ...UI }}
            >
                {/* step tabs, like a Figma page switcher */}
                <div className="absolute top-5 left-6 flex items-center gap-1 rounded-lg border border-[#e2e2e2] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    {TABS.map((label, i) => {
                        const on = tabOf(phase) === i;
                        return (
                            <span
                                key={label}
                                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-300 ${on ? "bg-[#1e1e1e] text-white" : "text-[#8c8c8c]"}`}
                            >
                                <span
                                    className={`grid size-4 place-items-center rounded-full text-[10px] ${on ? "bg-white text-[#1e1e1e]" : "bg-[#efefef] text-[#8c8c8c]"}`}
                                >
                                    {i + 1}
                                </span>
                                {label}
                            </span>
                        );
                    })}
                </div>

                {/* Before section */}
                <div
                    className="absolute rounded-md border border-[#e2e2e2] bg-[#f5f5f5]"
                    style={{ left: BEFORE.x, top: SEC.y, width: BEFORE.w, height: SEC.h }}
                />
                <span
                    className="absolute rounded bg-[#e6e6e6] px-2 py-[3px] text-[11px] font-medium text-[#1e1e1e]"
                    style={{ left: BEFORE.x + 18, top: SEC.y + 14 }}
                >
                    Before · 2 screens
                </span>
                <span
                    className="absolute text-[11px] text-[#8c8c8c]"
                    style={{ left: OLD.listX, top: OLD.y - 20 }}
                >
                    1 · Hub list
                </span>
                <span
                    className="absolute text-[11px] text-[#8c8c8c]"
                    style={{ left: OLD.detailX, top: OLD.y - 20 }}
                >
                    2 · Hub detail
                </span>
                <div className="absolute" style={{ left: OLD.listX, top: OLD.y }}>
                    <PhoneImg
                        src="hub-old-list"
                        w={OLD.w}
                        h={OLD.h}
                        alt="Old app: list of hubs by name"
                        dim={merged}
                    />
                </div>
                <svg
                    aria-hidden="true"
                    className="absolute text-[#b3b3b3]"
                    style={{ left: OLD.listX + OLD.w + 3, top: OLD.y + OLD.h / 2 - 6 }}
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                >
                    <path
                        d="M1 6h14M11 2l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="absolute" style={{ left: OLD.detailX, top: OLD.y }}>
                    <PhoneImg
                        src="hub-old-detail"
                        w={OLD.w}
                        h={OLD.h}
                        alt="Old app: one hub's details on a second screen"
                        dim={merged}
                    />
                </div>

                {/* connector */}
                <div
                    className={`absolute grid justify-items-center gap-1.5 ${ease} ${showAfter ? "opacity-100" : "opacity-0"}`}
                    style={{
                        left: BEFORE.x + BEFORE.w + 4,
                        width: AFTER.x - BEFORE.x - BEFORE.w - 8,
                        top: NEW.y + NEW.h / 2 - 16,
                    }}
                >
                    <svg width="40" height="16" viewBox="0 0 40 16" aria-hidden="true">
                        <path
                            d="M2 8 H36 M30 2 L36 8 L30 14"
                            fill="none"
                            stroke={BLUE}
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="70"
                            strokeDashoffset={showAfter ? 0 : 70}
                            style={{ transition: "stroke-dashoffset 700ms ease" }}
                        />
                    </svg>
                    <span className="text-[10px] font-medium text-[#0d99ff]">merged</span>
                </div>

                {/* After section */}
                <div
                    className={`absolute ${ease} ${showAfter ? "opacity-100" : "translate-y-3 opacity-0"}`}
                    style={{ left: AFTER.x, top: SEC.y, width: AFTER.w, height: SEC.h }}
                >
                    <div className="absolute inset-0 rounded-md border border-[#bfe7c9] bg-[#f3fbf5]" />
                    <span
                        className="absolute rounded bg-[#14ae5c] px-2 py-[3px] text-[11px] font-medium text-white"
                        style={{ left: 18, top: 14 }}
                    >
                        After · 1 screen
                    </span>
                    <span
                        className="absolute text-[11px] text-[#8c8c8c]"
                        style={{ left: 18, top: NEW.y - SEC.y - 20 }}
                    >
                        Pick a hub · Map
                    </span>
                    <div className="absolute" style={{ left: NEW.x - AFTER.x, top: NEW.y - SEC.y }}>
                        <PhoneImg
                            src="hub-new-map"
                            w={NEW.w}
                            h={NEW.h}
                            alt="New app: the hub map opening on the nearest hub"
                        />
                    </div>
                </div>

                {/* the six pieces: light up on their old screen, then fly to their spot on the new one */}
                {PIECES.map((p, i) => {
                    const local = p.from === "list" ? i : i - 3;
                    const lit = t >= (p.from === "list" ? T_LIST : T_DETAIL) + local * 450;
                    const pos = merged ? onNew(p.b) : onOld(p.from, p.a);
                    return (
                        <span
                            key={p.label}
                            aria-hidden="true"
                            className="pointer-events-none absolute rounded-[5px] border-2 border-dashed"
                            style={{
                                ...pos,
                                borderColor: p.color,
                                background: `${p.color}1a`,
                                opacity: lit && !piecesGone ? 1 : 0,
                                transform: lit ? "scale(1)" : "scale(0.9)",
                                transition: `left 900ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, top 900ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, width 900ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, height 900ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, opacity 350ms ease, transform 350ms ease`,
                            }}
                        >
                            <span
                                className="absolute left-0 rounded px-1.5 py-[2px] text-[10px] font-semibold whitespace-nowrap text-white shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                                style={{
                                    background: p.color,
                                    [p.tagBelow ? "top" : "bottom"]: "calc(100% + 3px)",
                                }}
                            >
                                {p.label}
                            </span>
                        </span>
                    );
                })}

                {/* what else got better: one spotlight at a time, its pin in the margin, its card lit */}
                {NOTES.map((n, i) => {
                    const b = noteArea(n.area);
                    return (
                        <span key={n.title}>
                            <Spotlight phone={newPhone} area={b} color={C.purple} show={lit(i)} />
                            <Pin
                                x={NEW.x - 13}
                                y={Math.min(b.y + b.h / 2, b.y + 40) - 12}
                                n={i + 1}
                                show={lit(i)}
                                color={C.purple}
                            />
                        </span>
                    );
                })}
                <span
                    className={`absolute top-[26px] right-6 text-[11px] text-[#8c8c8c] transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
                >
                    Hover a note to find it on the screen
                </span>
                <div
                    className="absolute grid gap-2"
                    style={{
                        left: NOTES_X,
                        width: AFTER.x + AFTER.w - 18 - NOTES_X,
                        top: NEW.y - 20,
                    }}
                >
                    {NOTES.map((n, i) => (
                        <NoteCard
                            key={n.title}
                            n={i + 1}
                            title={n.title}
                            sub={n.sub}
                            color={C.purple}
                            state={
                                t < T_PINS + i * STEP
                                    ? "hidden"
                                    : lit(i)
                                      ? "active"
                                      : done
                                        ? "rest"
                                        : "read"
                            }
                            {...(done
                                ? { onFocus: () => setHover(i), onBlur: () => setHover(null) }
                                : {})}
                        />
                    ))}
                </div>

                {/* caption, like a note pinned to the canvas */}
                <div className="absolute right-6 bottom-5 left-6 flex items-center gap-3 rounded-lg border border-[#e2e2e2] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <span
                        className="grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white transition-colors duration-300"
                        style={{ background: focus >= 0 ? C.purple : "#1e1e1e" }}
                    >
                        {focus >= 0 ? focus + 1 : tabOf(phase) + 1}
                    </span>
                    <span
                        key={phase}
                        className="animate-[hmfade_400ms_ease] text-[13px] leading-[18px] text-[#1e1e1e]"
                    >
                        {CAPTIONS[phase]}
                    </span>
                    <button
                        type="button"
                        onClick={play}
                        className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-md border border-[#e2e2e2] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1e1e1e] transition-opacity hover:bg-[#f5f5f5] ${done ? "opacity-100" : "pointer-events-none opacity-0"}`}
                    >
                        <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                            <path
                                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Replay
                    </button>
                </div>
            </div>
            <style>{`@keyframes hmfade { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }`}</style>
        </div>
    );
}
