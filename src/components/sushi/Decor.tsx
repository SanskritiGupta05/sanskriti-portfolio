"use client";

import { motion, useReducedMotion } from "motion/react";

// Scenery around the sushi counter: a cherry branch in each top corner with a paper lantern
// hanging from it, petals drifting down, and a shoji window down each side.
// The branches are drawn like soft watercolour: a tapering limb, open flowers with stamens,
// some tilted or hanging on thin stalks, buds with red calyxes and a few young leaves.

const r2 = (n: number) => Math.round(n * 100) / 100;
// a stable pseudo-random number in 0…1 (same on server and browser)
const rnd = (n: number) => {
  const x = Math.sin(n * 91.7 + 47.3) * 43758.5453;
  return x - Math.floor(x);
};

// a sakura petal pointing up from its base at (0,0): rounded, with the little notch at the tip
const petal = (r: number) =>
  `M0 0C${r2(-r * 0.95)} ${r2(-r * 0.2)} ${r2(-r * 1.02)} ${r2(-r * 0.92)} ${r2(-r * 0.3)} ${r2(-r * 1.03)}Q${r2(-r * 0.1)} ${r2(-r * 1.02)} 0 ${r2(-r * 0.86)}Q${r2(r * 0.1)} ${r2(-r * 1.02)} ${r2(r * 0.3)} ${r2(-r * 1.03)}C${r2(r * 1.02)} ${r2(-r * 0.92)} ${r2(r * 0.95)} ${r2(-r * 0.2)} 0 0Z`;

// --- the limb: a tapering shape built along a gentle curve ---------------------------------
const P = [
  [-12, 6],
  [50, 40],
  [150, 34],
  [268, 58],
];
const bez = (t: number) => {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((j) => k.reduce((acc, c, i) => acc + c * P[i][j], 0));
};
function limbPath() {
  const left: string[] = [];
  const right: string[] = [];
  const N = 36;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const [x, y] = bez(t);
    const [x2, y2] = bez(Math.min(1, t + 0.01));
    const [x1, y1] = bez(Math.max(0, t - 0.01));
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    const w = (13 * Math.pow(1 - t, 1.25) + 1.3) / 2 + Math.sin(t * 23) * 0.35; // a slightly knobbly taper
    left.push(`${r2(x + nx * w)} ${r2(y + ny * w)}`);
    right.unshift(`${r2(x - nx * w)} ${r2(y - ny * w)}`);
  }
  return `M${left.join(" L")} L${right.join(" L")}Z`;
}
const LIMB = limbPath();
// thin side twigs: [path, width]
const TWIGS: [string, number][] = [
  ["M30 22 C40 14 50 8 62 6", 2.6],
  ["M178 37 C192 30 206 22 222 15", 2],
  ["M238 48 C246 54 252 60 258 66", 1.4],
  ["M8 12 C4 6 2 2 -2 -2", 2],
];

function Flower({ x, y, r: r0, rot = 0, tilt = 1, seed }: { x: number; y: number; r: number; rot?: number; tilt?: number; seed: number }) {
  const r = r0 * 1.3; // drawn a little fuller than the layout numbers
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${tilt})`}>
      <g filter="url(#wc)">
        {[0, 1, 2, 3, 4].map((i) => {
          const a = i * 72 + (rnd(seed + i) - 0.5) * 14;
          const s = 0.92 + rnd(seed + i + 9) * 0.16;
          return <path key={i} d={petal(r * s)} transform={`rotate(${r2(a)})`} fill="url(#wc-petal)" stroke="#e78ea6" strokeOpacity={0.35} strokeWidth={0.45} />;
        })}
      </g>
      {/* stamens fanning out from a deep pink eye */}
      {Array.from({ length: 11 }, (_, i) => {
        const a = (i / 11) * Math.PI * 2 + rnd(seed + i + 20) * 0.3;
        const l = r * (0.36 + rnd(seed + i + 30) * 0.16);
        const ex = r2(Math.cos(a) * l);
        const ey = r2(Math.sin(a) * l);
        return (
          <g key={i}>
            <line x2={ex} y2={ey} stroke="#df7f9a" strokeWidth={0.45} strokeOpacity={0.9} />
            <circle cx={ex} cy={ey} r={0.75} fill="#f0bf55" />
          </g>
        );
      })}
      <circle r={r * 0.15} fill="#c94f73" opacity={0.85} />
    </g>
  );
}

// a flower or bud hanging on a thin stalk from the branch
function Stalk({ d }: { d: string }) {
  return <path d={d} stroke="#9a6b4f" strokeWidth={0.9} fill="none" strokeLinecap="round" />;
}

function Bud({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} filter="url(#wc)">
      <path d="M0 0C-4.2-1.5-5-8.5 0.4-13.5C5-8.6 4.4-1.8 0 0Z" fill="url(#wc-bud)" />
      <path d="M-1.5-3C-0.6-7 0.8-9.5 1.4-12" stroke="#ffffff" strokeOpacity={0.5} strokeWidth={0.7} fill="none" strokeLinecap="round" />
      <path d="M-3.4 0.6 L-2.2-3.6 L-0.8-0.9 L0.4-4.2 L1.4-0.8 L3-3.4 L3.2 0.8 Q0 2.2-3.4 0.6Z" fill="#a24636" />
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} filter="url(#wc)">
      <path d="M0 0C5-3 13-3 19 0C13 3.5 5 3.5 0 0Z" fill="url(#wc-leaf)" />
      <path d="M1 0H17" stroke="#5f8445" strokeWidth={0.5} strokeOpacity={0.7} />
    </g>
  );
}

// the branch reaches in from the corner; the lantern's cord ties on at (HANG_X, HANG_Y - 4)
export const HANG_X = 118;
export const HANG_Y = 44;

export function Branch({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 270 150"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
      style={{ originX: 0, originY: 0 }}
      animate={still ? undefined : { rotate: [0, 0.8, 0, -0.5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        {/* watercolour: a slightly ragged, soft edge */}
        <filter id="wc" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={1.3} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation={0.25} />
        </filter>
        <radialGradient id="wc-petal" cx="0.5" cy="1" r="1.05" fx="0.5" fy="1">
          <stop offset="0" stopColor="#f19bb1" />
          <stop offset="0.35" stopColor="#f8c4d1" />
          <stop offset="0.75" stopColor="#fde4ea" />
          <stop offset="1" stopColor="#f9cfd9" />
        </radialGradient>
        <linearGradient id="wc-bud" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e9839c" />
          <stop offset="1" stopColor="#fbd3dc" />
        </linearGradient>
        <linearGradient id="wc-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7fa55f" />
          <stop offset="1" stopColor="#b5cf8f" />
        </linearGradient>
        <linearGradient id="wc-bark" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#5f4033" />
          <stop offset="0.5" stopColor="#7d5a48" />
          <stop offset="1" stopColor="#a5826c" />
        </linearGradient>
      </defs>

      {/* limb and twigs */}
      <g filter="url(#wc)">
        <path d={LIMB} fill="url(#wc-bark)" />
        {TWIGS.map(([d, w]) => (
          <path key={d} d={d} stroke="#7d5a48" strokeWidth={w} fill="none" strokeLinecap="round" />
        ))}
        <path d="M-6 6C40 30 90 39 150 33" stroke="#c4a28c" strokeWidth={1.1} strokeOpacity={0.45} fill="none" strokeLinecap="round" />
        <path d="M22 22l3 1M64 34l3 0.6M100 37l3 0M140 34l2.4-0.3" stroke="#4e3329" strokeWidth={1} strokeOpacity={0.5} strokeLinecap="round" />
      </g>

      {/* the lantern's cord ties on here */}
      <circle cx={HANG_X} cy={HANG_Y - 4} r={2.2} fill="#5f4033" />

      {/* leaves */}
      <Leaf x={92} y={39} rot={28} s={0.9} />
      <Leaf x={196} y={33} rot={-28} s={0.8} />
      <Leaf x={40} y={16} rot={-60} s={0.7} />

      {/* stalks for the hanging flowers and buds */}
      <Stalk d="M74 37 C75 44 77 50 79 55" />
      <Stalk d="M90 39 C92 46 95 52 98 58" />
      <Stalk d="M170 37 C172 43 175 48 178 52" />
      <Stalk d="M196 30 C199 38 201 46 202 54" />
      <Stalk d="M246 50 C248 54 249 58 250 62" />

      {/* blossoms: a full cluster at the corner, thinning out towards the tip */}
      <Flower x={16} y={30} r={13} rot={-10} seed={1} />
      <Flower x={38} y={14} r={11} rot={24} tilt={0.82} seed={2} />
      <Flower x={4} y={8} r={9} rot={40} tilt={0.9} seed={3} />
      <Flower x={62} y={7} r={9.5} rot={-14} tilt={0.85} seed={4} />
      <Flower x={46} y={42} r={10.5} rot={12} tilt={0.78} seed={5} />
      <Flower x={80} y={58} r={10} rot={-6} tilt={0.72} seed={6} />
      <Flower x={152} y={24} r={10.5} rot={18} tilt={0.88} seed={7} />
      <Flower x={179} y={55} r={9} rot={-20} tilt={0.7} seed={8} />
      <Flower x={224} y={14} r={8.5} rot={10} tilt={0.85} seed={9} />
      <Flower x={232} y={42} r={7.5} rot={-30} tilt={0.8} seed={10} />
      <Flower x={26} y={46} r={10} rot={30} tilt={0.8} seed={11} />
      <Flower x={98} y={24} r={9} rot={-20} tilt={0.86} seed={12} />
      <Flower x={166} y={13} r={8.5} rot={8} tilt={0.9} seed={13} />
      <Flower x={210} y={38} r={8} rot={22} tilt={0.75} seed={14} />
      <Flower x={136} y={22} r={8} rot={-4} tilt={0.9} seed={15} />

      {/* buds */}
      <Bud x={98} y={58} rot={170} s={0.9} />
      <Bud x={202} y={54} rot={176} s={0.85} />
      <Bud x={250} y={62} rot={184} s={0.7} />
      <Bud x={262} y={60} rot={120} s={0.6} />
      <Bud x={236} y={12} rot={60} s={0.7} />
      <Bud x={110} y={26} rot={-12} s={0.75} />
      <Bud x={74} y={20} rot={30} s={0.8} />
      <Bud x={188} y={20} rot={-40} s={0.7} />
    </motion.svg>
  );
}

// Petals drifting down from the branches: each one flutters (turning over as it falls),
// sways side to side, drifts with a light breeze and fades out before the counter.
const PETALS = Array.from({ length: 14 }, (_, i) => {
  const right = i % 2 === 1;
  const start = right ? 0.66 + rnd(i + 200) * 0.3 : 0.04 + rnd(i + 200) * 0.3; // across the branch, as a share of the width
  return {
    left: `${r2(start * 100)}%`,
    top: r2(40 + rnd(i + 210) * 50),
    size: r2(8 + rnd(i + 220) * 6),
    fall: 230 + rnd(i + 230) * 120,
    drift: (right ? -1 : 1) * (30 + rnd(i + 240) * 70) + (rnd(i + 245) - 0.5) * 30,
    sway: 10 + rnd(i + 250) * 16,
    spin: (rnd(i + 260) > 0.5 ? 1 : -1) * (160 + rnd(i + 270) * 260),
    duration: 9 + rnd(i + 280) * 6,
    delay: i * 1.05 + rnd(i + 290) * 1.5,
    tone: rnd(i + 300),
  };
});

export function FallingPetals({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  if (still) return null;
  return (
    <div aria-hidden="true" className={`pointer-events-none [perspective:400px] ${className}`}>
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.left, top: p.top, width: p.size, height: r2(p.size * 1.15) }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, p.fall * 0.3, p.fall * 0.62, p.fall],
            x: [0, p.drift * 0.3 + p.sway, p.drift * 0.65 - p.sway, p.drift],
            rotate: [0, p.spin * 0.35, p.spin * 0.7, p.spin],
            rotateX: [0, 160, 320, 480],
            opacity: [0, 0.95, 0.9, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear", times: [0, 0.3, 0.65, 1] }}
        >
          <svg viewBox="-7 -14 14 15" className="size-full overflow-visible">
            <path d={petal(13)} fill={p.tone > 0.5 ? "#f8c6d2" : "#fbd9e1"} stroke="#ec9ab0" strokeOpacity={0.5} strokeWidth={0.5} />
            <path d="M0-1 Q-0.5-6 0-10" stroke="#f3a7ba" strokeWidth={0.6} strokeOpacity={0.6} fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// a paper chōchin lantern with a sakura on it; it sways gently from its cord
export function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const still = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 128"
      aria-hidden="true"
      className={className}
      style={{ originX: 0.5, originY: 0 }}
      animate={still ? undefined : { rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <defs>
        <radialGradient id="lantern-glow" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#fff8ec" />
          <stop offset="1" stopColor="#f6dfc0" />
        </radialGradient>
      </defs>
      <line x1="32" y1="0" x2="32" y2="30" stroke="#5b3a2a" strokeWidth="1.6" />
      <rect x="20" y="28" width="24" height="8" rx="2" fill="#6a3a24" />
      <rect x="22" y="29" width="20" height="2" rx="1" fill="#8b5536" />
      <path d="M12 44C10 34 20 35 32 35C44 35 54 34 52 44V96C54 106 44 105 32 105C20 105 10 106 12 96Z" fill="url(#lantern-glow)" stroke="#e2c49e" strokeWidth="1" />
      {[46, 56, 66, 76, 86, 96].map((y) => (
        <path key={y} d={`M12.5 ${y}Q32 ${y + 3} 51.5 ${y}`} stroke="#e8cfac" strokeWidth="1" fill="none" />
      ))}
      <g transform="translate(32 70)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d={petal(11)} transform={`rotate(${a})`} fill="#f4a9b6" stroke="#d8687c" strokeOpacity={0.35} strokeWidth={0.6} />
        ))}
        <circle r={2.8} fill="#d2465f" />
      </g>
      <rect x="20" y="104" width="24" height="8" rx="2" fill="#6a3a24" />
      <rect x="22" y="109" width="20" height="2" rx="1" fill="#8b5536" />
      <path d="M32 112V124" stroke="#c8432e" strokeWidth="2" strokeLinecap="round" />
      <path d="M29 118H35" stroke="#c8432e" strokeWidth="1.4" strokeLinecap="round" />
    </motion.svg>
  );
}

// a shoji window: a wooden frame with paper panes and a fine lattice
export function Shoji({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 78 210" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="78" height="210" rx="2" fill="#b98055" />
      <rect x="6" y="6" width="66" height="178" fill="#fbf2e3" />
      {/* lattice */}
      {[28, 50].map((x) => (
        <rect key={x} x={x} y="6" width="3" height="178" fill="#c79268" />
      ))}
      {[40, 76, 112, 148].map((y) => (
        <rect key={y} x="6" y={y} width="66" height="3" fill="#c79268" />
      ))}
      <rect x="6" y="6" width="66" height="10" fill="#e8d6bc" opacity="0.5" />
      {/* sill */}
      <rect x="-4" y="184" width="86" height="10" rx="2" fill="#9e6843" />
      <rect x="0" y="194" width="78" height="16" fill="#c6926a" />
      <rect x="2" y="2" width="4" height="182" fill="#a5714b" />
    </svg>
  );
}

// three little red strokes: "something tasty here!"
export function Ticks({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const still = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 30 22"
      aria-hidden="true"
      className={className}
      animate={still ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.92, 1, 0.92] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M3 14L9 18M10 4L13 12M22 2L19 10" stroke="#d9573f" strokeWidth="2.6" strokeLinecap="round" />
    </motion.svg>
  );
}
