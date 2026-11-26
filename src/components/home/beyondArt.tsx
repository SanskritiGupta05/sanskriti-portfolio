import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LINE = "#6b4a30";
const LW = 2.4;

type Pal = Record<string, string>;
function Pix({
    rows,
    pal,
    x = 0,
    y = 0,
    s = 1,
}: {
    rows: string[];
    pal: Pal;
    x?: number;
    y?: number;
    s?: number;
}) {
    const rects: React.ReactNode[] = [];
    rows.forEach((row, ry) => {
        const cells = [...row];
        for (let rx = 0; rx < cells.length;) {
            const c = cells[rx];
            if (c === "." || !pal[c]) {
                rx++;
                continue;
            }
            let run = 1;
            while (rx + run < cells.length && cells[rx + run] === c) run++;
            rects.push(
                <rect
                    key={`${rx}-${ry}`}
                    x={x + rx * s}
                    y={y + ry * s}
                    width={run * s + 0.02}
                    height={s + 0.02}
                    fill={pal[c]}
                />,
            );
            rx += run;
        }
    });
    return <g shapeRendering="crispEdges">{rects}</g>;
}

const CAT_FACE = [
    "...oo.........oo...",
    "..oPPo.......oPPo..",
    "..oPFPooooooooFPo..",
    "..oFFFFFFFFFFFFFo..",
    ".oFFFFFFFFFFFFFFFo.",
    "woFFFkFFFFFFFkFFFow",
    ".oFFFkFFFFFFFkFFFo.",
    "woFccFFFFnFFFFccFow",
    ".oFccFFFoFoFFFccFo.",
    "..oFFFFFFFFFFFFFo..",
    "...ooooooooooooo...",
];

const sparkle = (cx: number, cy: number, r: number) =>
    `M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r}Z`;

const fuzz = (cx: number, cy: number, r: number, n = 34) =>
    Array.from({ length: n * 2 }, (_, i) => {
        const a = (i / (n * 2)) * Math.PI * 2;
        const rr = i % 2 ? r : r + 3.2;
        return `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
    }).join(" ") + "Z";

function useIdle() {
    const reduce = useReducedMotion();
    return (keys: Record<string, number[]>, duration: number, delay = 0, times?: number[]) =>
        reduce
            ? {}
            : {
                  animate: keys,
                  transition: {
                      duration,
                      delay,
                      times,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                  },
              };
}
function useBlink() {
    const reduce = useReducedMotion();
    const [shut, setShut] = useState(false);
    useEffect(() => {
        if (reduce) return;
        let t: ReturnType<typeof setTimeout>;
        const loop = () => {
            t = setTimeout(
                () => {
                    setShut(true);
                    t = setTimeout(() => {
                        setShut(false);
                        loop();
                    }, 150);
                },
                2600 + Math.random() * 1800,
            );
        };
        loop();
        return () => clearTimeout(t);
    }, [reduce]);
    return shut;
}
const CAT_BLINK = CAT_FACE.map((r, i) => (i === 5 ? r.replace(/k/g, "F") : r));

export function ConsoleArt() {
    const u = useId().replace(/:/g, "");
    const id = (n: string) => `bc-${n}-${u}`;
    const idle = useIdle();
    const shut = useBlink();
    return (
        <svg
            viewBox="0 0 260 260"
            className="block h-auto w-full overflow-visible"
            aria-hidden="true"
        >
            <defs>
                <filter id={id("sh")} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow
                        dx="2"
                        dy="7"
                        stdDeviation="6"
                        floodColor="#6a4424"
                        floodOpacity=".18"
                    />
                </filter>
                <pattern id={id("dots")} width="7" height="7" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.9" fill="#e9a58f" opacity=".55" />
                </pattern>
                <linearGradient id={id("red")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ec5a4b" />
                    <stop offset="1" stopColor="#d23a2e" />
                </linearGradient>
            </defs>
            <g transform="rotate(14 178 170)" filter={`url(#${id("sh")})`}>
                <rect
                    x="126"
                    y="104"
                    width="104"
                    height="132"
                    rx="10"
                    fill="#f4e6d4"
                    stroke="#c9a988"
                    strokeWidth="2"
                    transform="translate(4 5)"
                />
                <rect
                    x="126"
                    y="104"
                    width="104"
                    height="132"
                    rx="10"
                    fill="#fdf8f1"
                    stroke="#c9a988"
                    strokeWidth="2"
                />
                <rect
                    x="126"
                    y="104"
                    width="104"
                    height="132"
                    rx="10"
                    fill={`url(#${id("dots")})`}
                />
            </g>
            <motion.g {...idle({ y: [0, -4, 0] }, 2.8)}>
                <g transform="rotate(12 186 72)" filter={`url(#${id("sh")})`}>
                    <rect
                        x="156"
                        y="44"
                        width="62"
                        height="62"
                        rx="13"
                        fill="#a8261d"
                        stroke={LINE}
                        strokeWidth="2"
                        transform="translate(0 6)"
                    />
                    <rect
                        x="156"
                        y="44"
                        width="62"
                        height="62"
                        rx="13"
                        fill={`url(#${id("red")})`}
                        stroke={LINE}
                        strokeWidth="2"
                    />
                    <path
                        d="M164 52 Q187 47 210 52"
                        stroke="#fff"
                        strokeOpacity=".35"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M178 61 Q177 57 181 59 L203 72 Q206 75 203 77 L181 90 Q177 92 178 88 Z"
                        fill="#fff"
                    />
                </g>
            </motion.g>
            <g transform="rotate(-24 118 140)" filter={`url(#${id("sh")})`}>
                <rect
                    x="56"
                    y="48"
                    width="128"
                    height="178"
                    rx="22"
                    fill="#dcc3a0"
                    stroke={LINE}
                    strokeWidth={LW}
                    transform="translate(5 9)"
                />
                <rect
                    x="56"
                    y="48"
                    width="128"
                    height="178"
                    rx="22"
                    fill="#fbf2e4"
                    stroke={LINE}
                    strokeWidth={LW}
                />
                <path
                    d="M74 54 H164"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity=".9"
                />
                <rect
                    x="70"
                    y="64"
                    width="100"
                    height="84"
                    rx="10"
                    fill="#4a4a40"
                    stroke={LINE}
                    strokeWidth="1.6"
                />
                <rect x="78" y="72" width="84" height="68" rx="5" fill="#86a06a" />
                <Pix
                    rows={shut ? CAT_BLINK : CAT_FACE}
                    pal={{
                        o: "#6b4630",
                        P: "#f2a99b",
                        F: "#fbe6c8",
                        k: "#2b2420",
                        c: "#f3a08f",
                        n: "#d9735f",
                        w: "#6b4630",
                    }}
                    x={82.5}
                    y={84}
                    s={4}
                />
                <path d="M82 76 L96 76 L82 90 Z" fill="#fff" opacity=".14" />
                <path
                    d="M83 166 h10 v-10 h12 v10 h10 v12 h-10 v10 h-12 v-10 h-10 z"
                    fill="#e0453a"
                    stroke={LINE}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M95 158 h8"
                    stroke="#fff"
                    strokeOpacity=".45"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                {[
                    [148, 166],
                    [164, 156],
                ].map(([cx, cy]) => (
                    <g key={cx}>
                        <circle
                            cx={cx}
                            cy={cy}
                            r="8.5"
                            fill="#e0453a"
                            stroke={LINE}
                            strokeWidth="1.8"
                        />
                        <circle cx={cx - 2.6} cy={cy - 2.8} r="2.3" fill="#fff" opacity=".5" />
                    </g>
                ))}
                <rect
                    x="100"
                    y="202"
                    width="14"
                    height="5"
                    rx="2.5"
                    fill="#8f7a60"
                    transform="rotate(-25 107 204)"
                />
                <rect
                    x="119"
                    y="198"
                    width="14"
                    height="5"
                    rx="2.5"
                    fill="#8f7a60"
                    transform="rotate(-25 126 200)"
                />
                {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                        <circle
                            key={`${r}${c}`}
                            cx={152 + c * 6}
                            cy={190 + r * 6}
                            r="1.4"
                            fill="#b39a7a"
                        />
                    )),
                )}
                <circle cx="62" cy="92" r="3" fill="#fbf2e4" stroke={LINE} strokeWidth="1.4" />
            </g>
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path
                    d="M66 112 C 44 118, 34 140, 38 166 C 40 180, 46 190, 52 196"
                    stroke={LINE}
                    strokeWidth="6"
                />
                <path
                    d="M66 112 C 44 118, 34 140, 38 166 C 40 180, 46 190, 52 196"
                    stroke="#e8782c"
                    strokeWidth="3.6"
                />
                <path
                    d="M66 112 C 44 118, 34 140, 38 166 C 40 180, 46 190, 52 196"
                    stroke="#f6b06a"
                    strokeWidth="1.2"
                    strokeDasharray="3 4"
                />
                <path
                    d="M66 112 C 58 126, 52 150, 54 172 C 55 182, 54 190, 52 196"
                    stroke={LINE}
                    strokeWidth="5"
                />
                <path
                    d="M66 112 C 58 126, 52 150, 54 172 C 55 182, 54 190, 52 196"
                    stroke="#d9602a"
                    strokeWidth="2.8"
                />
            </g>
            <rect
                x="46"
                y="194"
                width="12"
                height="9"
                rx="3"
                fill="#e2b04a"
                stroke={LINE}
                strokeWidth="1.6"
            />
            <motion.g
                style={{ transformOrigin: "52px 224px", transformBox: "view-box" }}
                {...idle({ scale: [1, 1.07, 1] }, 1.8)}
            >
                <motion.path
                    d={fuzz(52, 224, 19)}
                    fill="#231d1b"
                    stroke="#231d1b"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    style={{ transformOrigin: "52px 224px", transformBox: "view-box" }}
                    {...idle({ rotate: [0, 8, 0] }, 1.8)}
                />
                <motion.g
                    style={{ transformOrigin: "52px 222px", transformBox: "view-box" }}
                    {...idle({ scaleY: [1, 1, 0.1, 1, 1] }, 4, 0, [0, 0.9, 0.94, 0.98, 1])}
                >
                    <circle cx="44.5" cy="222" r="5.2" fill="#fff" />
                    <circle cx="59.5" cy="222" r="5.2" fill="#fff" />
                    <motion.g {...idle({ x: [0, -2, -2, 2, 2, 0], y: [0, 0, 1, 1, 0, 0] }, 5)}>
                        <circle cx="45.5" cy="223" r="2.4" fill="#231d1b" />
                        <circle cx="58.5" cy="223" r="2.4" fill="#231d1b" />
                    </motion.g>
                </motion.g>
            </motion.g>
            <motion.path
                d={sparkle(232, 196, 13)}
                fill="#f4c04e"
                stroke="#c9862c"
                strokeWidth="1.6"
                strokeLinejoin="round"
                style={{ transformOrigin: "232px 196px", transformBox: "view-box" }}
                {...idle(
                    { scale: [1, 1.28, 0.9, 1], rotate: [0, 20, 0, 0], opacity: [1, 1, 0.75, 1] },
                    2.2,
                )}
            />
        </svg>
    );
}

const CAT_DOODLE = [
    "..o........o....",
    ".oPo......oPo...",
    ".o.oooooooo.o...",
    ".o..........o...",
    ".o..k....k..o...",
    "oo..k....k..oo..",
    ".occ..nn..cco...",
    "oo..........oo..",
    "..o........o....",
    ".o..........o...",
    ".o..........o...",
    ".o..o....o..o...",
    ".o..o....o..o.oo",
    "..oo.oooo.ooooo.",
];
const BLOOM_DOODLE = [".p.p.", "ppypp", ".ppp.", "..p.."];

const PHOTO_PAL: Pal = {
    a: "#7f7cc2",
    b: "#9a8ccf",
    c: "#bb9ed6",
    d: "#dcb0d4",
    e: "#f1c1cf",
    p: "#f7cbd3",
    q: "#e39aab",
    w: "#ffffff",
    v: "#d9def2",
    m: "#6b79b5",
    n: "#4f5d97",
    s: "#3f4b80",
    h: "#79ad62",
    g: "#55904f",
    t: "#3e7445",
    o: "#3a2a2b",
    r: "#d6402f",
    R: "#a8301f",
    y: "#f3c66b",
};
const PHOTO: string[] = (() => {
    const W = 57,
        H = 52;
    const g: string[][] = Array.from({ length: H }, (_, y) =>
        Array.from({ length: W }, (_, x) => {
            const bands = ["a", "b", "c", "d", "e"];
            const t = y / 9;
            const i = Math.min(4, Math.floor(t));
            const nearNext = t - i > 0.78 && i < 4 && (x + y) % 2 === 0;
            return bands[nearNext ? i + 1 : i];
        }),
    );
    const blob = (cx: number, cy: number, rx: number, ry: number) => {
        for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
            for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
                if (x < 0 || y < 0 || x >= W || y >= H) continue;
                const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
                if (d <= 1) g[y][x] = y > cy + ry * 0.4 ? "q" : "p";
            }
    };
    blob(10, 12, 7, 2.6);
    blob(15, 10.5, 4, 2.2);
    blob(44, 9, 6, 2.4);
    blob(48, 7.8, 3.5, 2);
    for (let y = 14; y < 46; y++) {
        const half = 1.5 + (y - 14) * 1.3;
        for (let x = Math.ceil(24 - half); x <= 24 + half; x++) {
            if (x < 0 || x >= W) continue;
            const snowline = 22 + ((x * 5) % 4) - (Math.abs(x - 24) < 3 ? 0 : 1);
            if (y < snowline) g[y][x] = x > 24 + (y - 14) * 0.35 ? "v" : "w";
            else g[y][x] = x > 24 + half * 0.45 ? "n" : "m";
        }
    }
    blob(18, 40, 11, 2.6);
    blob(26, 38.6, 5, 2);
    for (let x = 0; x < W; x++) {
        const top = 43 + Math.round(Math.sin(x * 0.35) * 1.2);
        for (let y = top; y < H; y++) g[y][x] = y < top + 2 ? "h" : "g";
    }
    for (let cx = 2; cx < 42; cx += 5)
        for (let y = 44; y < H; y++)
            for (let x = cx - 3; x <= cx + 3; x++) {
                const cy = 47 + (cx % 2);
                if (x >= 0 && x < W && (x - cx) ** 2 + (y - cy) ** 2 <= 9)
                    g[y][x] = y < cy ? "g" : "t";
            }
    const px = 47;
    for (let y = 3; y < 11; y++) g[y][px] = "o";
    const tiers: [number, number][] = [
        [11, 5],
        [19, 6],
        [27, 7],
        [35, 8],
    ];
    for (const [ty, hw] of tiers) {
        for (let x = px - hw - 2; x <= px + hw + 2; x++) if (x < W) g[ty][x] = "o";
        for (let x = px - hw - 3; x <= px + hw + 3; x += 2 * hw + 6)
            if (x >= 0 && x < W) g[ty - 1][x] = "o";
        for (let x = px - hw; x <= px + hw; x++) if (x < W) g[ty + 1][x] = "o";
        for (let y = ty + 2; y < ty + 8; y++)
            for (let x = px - hw + 1; x <= px + hw - 1; x++) {
                if (x >= W) continue;
                const win = y === ty + 4 && (x - px) % 3 === 0;
                g[y][x] = win ? "y" : x > px + 1 ? "R" : "r";
            }
    }
    for (let y = 43; y < H; y++)
        for (let x = px - 8; x <= px + 8; x++)
            if (x < W) g[y][x] = y > 46 && Math.abs(x - px) < 2 ? "o" : x > px + 2 ? "R" : "r";
    for (let x = px - 10; x <= px + 10; x++) if (x < W) g[43][x] = "o";
    return g.map((r) => r.join(""));
})();

function Blossom({ x, y, r = 11, rot = 0 }: { x: number; y: number; r?: number; rot?: number }) {
    const petal = `M0 0 C ${-r * 0.55} ${-r * 0.35}, ${-r * 0.55} ${-r * 0.95}, ${-r * 0.12} ${-r} L0 ${-r * 0.82} L${r * 0.12} ${-r} C ${r * 0.55} ${-r * 0.95}, ${r * 0.55} ${-r * 0.35}, 0 0 Z`;
    return (
        <g transform={`translate(${x} ${y}) rotate(${rot})`}>
            {[0, 72, 144, 216, 288].map((a) => (
                <path
                    key={a}
                    d={petal}
                    transform={`rotate(${a})`}
                    fill="#f6aebb"
                    stroke="#d2566c"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                />
            ))}
            <circle r={r * 0.22} fill="#f2c14e" />
            {[0, 72, 144, 216, 288].map((a) => (
                <circle
                    key={a}
                    cx={+(Math.sin((a * Math.PI) / 180) * r * 0.34).toFixed(2)}
                    cy={+(-Math.cos((a * Math.PI) / 180) * r * 0.34).toFixed(2)}
                    r="1"
                    fill="#e0453a"
                />
            ))}
        </g>
    );
}
function Bud({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${rot})`}>
            <path
                d="M0 0 C -5 -4, -4 -12, 0 -14 C 4 -12, 5 -4, 0 0 Z"
                fill="#f39aac"
                stroke="#d2566c"
                strokeWidth="1.3"
            />
        </g>
    );
}
const PETAL = "M0 0 C -6 -3, -6 -11, 0 -13 L2 -10 L4 -13 C 9 -10, 7 -3, 0 0 Z";

export function PolaroidArt() {
    const u = useId().replace(/:/g, "");
    const id = (n: string) => `bp-${n}-${u}`;
    const idle = useIdle();
    return (
        <svg
            viewBox="0 0 260 260"
            className="block h-auto w-full overflow-visible"
            aria-hidden="true"
        >
            <defs>
                <filter id={id("sh")} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow
                        dx="2"
                        dy="7"
                        stdDeviation="6"
                        floodColor="#6a4424"
                        floodOpacity=".18"
                    />
                </filter>
                <linearGradient id={id("wood")} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f3d3a4" />
                    <stop offset="1" stopColor="#e2b57c" />
                </linearGradient>
                <clipPath id={id("photo")}>
                    <rect x="104" y="70" width="114" height="104" rx="2" />
                </clipPath>
            </defs>
            <g transform="rotate(-8 74 196)" filter={`url(#${id("sh")})`}>
                <rect
                    x="30"
                    y="138"
                    width="98"
                    height="114"
                    rx="8"
                    fill="#e7d7c1"
                    stroke="#b89a78"
                    strokeWidth="1.8"
                    transform="translate(3 5)"
                />
                <rect
                    x="30"
                    y="138"
                    width="98"
                    height="114"
                    rx="8"
                    fill="#fbf6ee"
                    stroke="#b89a78"
                    strokeWidth="1.8"
                />
                <Pix
                    rows={BLOOM_DOODLE}
                    pal={{ p: "#f2a0b2", y: "#e8a04a" }}
                    x={42}
                    y={150}
                    s={3}
                />
                <Pix
                    rows={CAT_DOODLE}
                    pal={{ o: "#8d7e6c", P: "#f2b3b3", k: "#3d3532", c: "#f3a8a8", n: "#e48f8f" }}
                    x={46}
                    y={168}
                    s={4}
                />
            </g>
            <g transform="rotate(-6 160 136)" filter={`url(#${id("sh")})`}>
                <rect
                    x="94"
                    y="60"
                    width="134"
                    height="152"
                    rx="6"
                    fill="#e9dcc8"
                    stroke={LINE}
                    strokeWidth="2"
                    transform="translate(4 6)"
                />
                <rect
                    x="94"
                    y="60"
                    width="134"
                    height="152"
                    rx="6"
                    fill="#fdf8ef"
                    stroke={LINE}
                    strokeWidth="2"
                />
                <g clipPath={`url(#${id("photo")})`}>
                    <Pix rows={PHOTO} pal={PHOTO_PAL} x={104} y={70} s={2} />
                </g>
                <rect
                    x="104"
                    y="70"
                    width="114"
                    height="104"
                    rx="2"
                    fill="none"
                    stroke="#c7b59c"
                    strokeWidth="1"
                />
                <g transform="rotate(-3 207 192)">
                    <rect
                        x="193"
                        y="178"
                        width="28"
                        height="28"
                        rx="3"
                        fill="#fff6f2"
                        stroke="#d23c2c"
                        strokeWidth="2.2"
                    />
                    <text
                        x="207"
                        y="198.5"
                        textAnchor="middle"
                        fontSize="19"
                        fill="#d23c2c"
                        fontFamily="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
                    >
                        旅
                    </text>
                </g>
            </g>
            <g transform="translate(12 22) rotate(-18 206 216)" filter={`url(#${id("sh")})`}>
                <path
                    d="M164 214 C 164 190, 200 180, 228 188 C 254 196, 258 222, 240 236 C 226 246, 196 250, 176 240 C 168 236, 164 226, 164 214 Z"
                    fill="#c4925a"
                    stroke={LINE}
                    strokeWidth="2"
                    transform="translate(3 6)"
                />
                <path
                    d="M164 214 C 164 190, 200 180, 228 188 C 254 196, 258 222, 240 236 C 226 246, 196 250, 176 240 C 168 236, 164 226, 164 214 Z"
                    fill={`url(#${id("wood")})`}
                    stroke={LINE}
                    strokeWidth="2"
                />
                <ellipse
                    cx="186"
                    cy="226"
                    rx="6"
                    ry="4.5"
                    fill="#fdf8ef"
                    stroke={LINE}
                    strokeWidth="1.6"
                />
                {(
                    [
                        ["#e0453a", 182, 206],
                        ["#f2a23a", 202, 198],
                        ["#6fae52", 224, 200],
                        ["#f4cf47", 236, 216],
                        ["#4f74c8", 210, 230],
                    ] as const
                ).map(([c, x, y]) => (
                    <g key={c}>
                        <circle cx={x} cy={y} r="7" fill={c} stroke="#00000022" />
                        <circle cx={x - 2} cy={y - 2.2} r="1.8" fill="#fff" opacity=".45" />
                    </g>
                ))}
            </g>
            <motion.g
                style={{ transformOrigin: "18px 190px", transformBox: "view-box" }}
                {...idle({ rotate: [0, 1.6, -0.6, 0] }, 4.6)}
            >
                <g fill="none" stroke="#6b4026" strokeLinecap="round">
                    <path
                        d="M18 190 C 40 150, 70 118, 104 96 C 140 72, 176 52, 220 26"
                        strokeWidth="4"
                    />
                    <path d="M70 120 C 56 118, 44 122, 34 128" strokeWidth="2.6" />
                    <path d="M134 78 C 140 66, 150 58, 160 56" strokeWidth="2.4" />
                    <path d="M190 42 C 200 40, 210 44, 222 50" strokeWidth="2.2" />
                    <path d="M96 102 C 86 92, 76 88, 64 88" strokeWidth="2.2" />
                </g>
                <Blossom x={34} y={128} r={11} rot={10} />
                <Blossom x={64} y={88} r={10} rot={-20} />
                <Blossom x={104} y={96} r={12} rot={15} />
                <Blossom x={160} y={56} r={12} rot={-10} />
                <Blossom x={136} y={44} r={10} rot={30} />
                <Blossom x={198} y={52} r={10} rot={5} />
                <Bud x={222} y={26} rot={40} />
                <Bud x={230} y={50} rot={70} />
                <Bud x={84} y={70} rot={-30} />
                <Bud x={18} y={100} rot={-60} />
            </motion.g>
            {(
                [
                    [246, 96, 30, 1, 0],
                    [248, 142, -20, 0.85, 1.4],
                    [210, 20, 60, 0.8, 2.6],
                ] as const
            ).map(([x, y, r, sc, d]) => (
                <motion.g
                    key={x}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    {...idle(
                        { x: [0, 10, 18], y: [0, 14, 30], rotate: [0, 40, 90], opacity: [0, 1, 0] },
                        4.2,
                        d,
                    )}
                >
                    <path
                        d={PETAL}
                        transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`}
                        fill="#f6aebb"
                        stroke="#d2566c"
                        strokeWidth="1.2"
                    />
                </motion.g>
            ))}
        </svg>
    );
}
