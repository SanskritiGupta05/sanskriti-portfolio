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

// --- limbs and twigs: tapering shapes drawn along hand-placed waypoints --------------------
type Pt = [number, number];
// Catmull-Rom through the waypoints, sampled densely
function spline(pts: Pt[], per = 10): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)) as Pt);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
// a tapering, slightly knobbly limb along the waypoints, from width w0 down to w1
function limb(pts: Pt[], w0: number, w1: number, seed: number) {
  const c = spline(pts);
  const left: string[] = [];
  const right: string[] = [];
  c.forEach(([x, y], i) => {
    const t = i / (c.length - 1);
    const [ax, ay] = c[Math.max(0, i - 1)];
    const [bx, by] = c[Math.min(c.length - 1, i + 1)];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const nx = -(by - ay) / len, ny = (bx - ax) / len;
    const w = (w1 + (w0 - w1) * Math.pow(1 - t, 1.15)) / 2 * (1 + (rnd(seed + Math.floor(t * 9)) - 0.5) * 0.22);
    left.push(`${r2(x + nx * w)} ${r2(y + ny * w)}`);
    right.unshift(`${r2(x - nx * w)} ${r2(y - ny * w)}`);
  });
  return `M${left.join(" L")} L${right.join(" L")}Z`;
}

// the main limb: reaches in from the corner, then droops gently towards its tip
const MAIN: Pt[] = [[-16, 2], [14, 16], [44, 28], [78, 33], [112, 37], [144, 35], [176, 40], [206, 49], [234, 60], [256, 72], [270, 82]];
const LIMB = limb(MAIN, 15, 1.4, 1);

// twigs, each with its own sway: base point, waypoints, widths, sway (degrees) and pace (seconds)
type Twig = { id: string; base: Pt; pts: Pt[]; w: [number, number]; sway: number; dur: number };
const TWIGS: Twig[] = [
  { id: "corner", base: [14, 16], pts: [[14, 16], [12, 7], [6, -2], [-2, -8]], w: [3.4, 0.9], sway: 2.4, dur: 6.2 },
  { id: "rise", base: [44, 28], pts: [[44, 28], [52, 17], [62, 9], [78, 3]], w: [3.8, 0.9], sway: 3, dur: 5.4 },
  { id: "droop", base: [82, 34], pts: [[82, 34], [86, 45], [92, 55], [100, 63]], w: [3, 0.8], sway: 4, dur: 4.8 },
  { id: "mid", base: [174, 40], pts: [[174, 40], [182, 30], [194, 21], [210, 14]], w: [2.8, 0.8], sway: 3.4, dur: 5.9 },
  { id: "hang", base: [208, 50], pts: [[208, 50], [210, 60], [215, 70], [222, 78]], w: [2.4, 0.7], sway: 4.6, dur: 4.4 },
];
const twigPath = (t: Twig, i: number) => limb(t.pts, t.w[0], t.w[1], 40 + i * 7);

function Flower({ x, y, r: r0, rot = 0, tilt = 1, seed }: { x: number; y: number; r: number; rot?: number; tilt?: number; seed: number }) {
  const r = r0 * 1.3; // drawn a little fuller than the layout numbers
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${tilt})`}>
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = i * 72 + (rnd(seed + i) - 0.5) * 14;
          const s = 0.92 + rnd(seed + i + 9) * 0.16;
          return <path key={i} d={petal(r * s)} transform={`rotate(${r2(a)})`} fill="url(#wc-petal)" stroke="#e78ea6" strokeOpacity={0.35} strokeWidth={0.45} />;
        })}
      </g>
      {/* stamens fanning out from a deep pink eye: all the filaments as one path and all the
          anthers as one path (2 shapes instead of 22, so the swaying twigs stay cheap to redraw) */}
      {(() => {
        let lines = "";
        let dots = "";
        for (let i = 0; i < 11; i++) {
          const a = (i / 11) * Math.PI * 2 + rnd(seed + i + 20) * 0.3;
          const l = r * (0.36 + rnd(seed + i + 30) * 0.16);
          const ex = r2(Math.cos(a) * l);
          const ey = r2(Math.sin(a) * l);
          lines += `M0 0L${ex} ${ey}`;
          dots += `M${r2(ex - 0.75)} ${ey}a0.75 0.75 0 1 0 1.5 0a0.75 0.75 0 1 0 -1.5 0`;
        }
        return (
          <>
            <path d={lines} stroke="#df7f9a" strokeWidth={0.45} strokeOpacity={0.9} fill="none" />
            <path d={dots} fill="#f0bf55" />
          </>
        );
      })()}
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
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0C-4.2-1.5-5-8.5 0.4-13.5C5-8.6 4.4-1.8 0 0Z" fill="url(#wc-bud)" />
      <path d="M-1.5-3C-0.6-7 0.8-9.5 1.4-12" stroke="#ffffff" strokeOpacity={0.5} strokeWidth={0.7} fill="none" strokeLinecap="round" />
      <path d="M-3.4 0.6 L-2.2-3.6 L-0.8-0.9 L0.4-4.2 L1.4-0.8 L3-3.4 L3.2 0.8 Q0 2.2-3.4 0.6Z" fill="#a24636" />
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0C5-3 13-3 19 0C13 3.5 5 3.5 0 0Z" fill="url(#wc-leaf)" />
      <path d="M1 0H17" stroke="#5f8445" strokeWidth={0.5} strokeOpacity={0.7} />
    </g>
  );
}

// the branch reaches in from the corner; the lantern's cord ties on at (HANG_X, HANG_Y - 4)
export const HANG_X = 118;
export const HANG_Y = 44;

// a twig sways from where it joins the limb, each at its own pace
function Sway({ t, still, children }: { t: Twig; still: boolean | null; children: React.ReactNode }) {
  const at = `${t.base[0]} ${t.base[1]}`;
  return (
    <g>
      {!still && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`0 ${at};${t.sway} ${at};0 ${at};${-t.sway * 0.6} ${at};0 ${at}`}
          dur={`${t.dur}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      )}
      {children}
    </g>
  );
}

export function Branch({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  const [corner, rise, droop, mid, hang] = TWIGS;
  return (
    <motion.svg
      viewBox="0 0 270 150"
      aria-hidden="true"
      className={`overflow-visible will-change-transform ${className}`}
      style={{ originX: 0, originY: 0 }}
      animate={still ? undefined : { rotate: [0, 0.6, 0, -0.4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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

      {/* the corner twig sits behind the limb */}
      <Sway still={still} t={corner}>
        <path d={twigPath(corner, 0)} fill="url(#wc-bark)" />
        <Flower x={-2} y={-6} r={10} rot={30} tilt={0.88} seed={3} />
      <Flower x={6} y={-14} r={7.5} rot={-40} tilt={0.85} seed={41} />
      <Bud x={-6} y={-12} rot={-30} s={0.7} />
        <Flower x={10} y={4} r={8.5} rot={-20} tilt={0.8} seed={16} />
      </Sway>

      {/* the main limb, with a soft highlight along its top and a few bark marks */}
      <g>
        <path d={LIMB} fill="url(#wc-bark)" />
        <path d="M-10 4C14 15 40 27 78 31C104 34 124 35 150 33" stroke="#c4a28c" strokeWidth={1.1} strokeOpacity={0.45} fill="none" strokeLinecap="round" />
        <path d="M22 20l3 1.2M60 31l3 0.6M98 35l3 0.2M160 37l2.4 0.4M222 54l2 0.8" stroke="#4e3329" strokeWidth={1} strokeOpacity={0.5} strokeLinecap="round" />
      </g>
      {/* the lantern's cord ties on here */}
      <circle cx={HANG_X} cy={HANG_Y - 4} r={2.2} fill="#5f4033" />

      {/* blossoms crowding the corner, thinning out along the limb */}
      <Flower x={18} y={30} r={13} rot={-10} seed={1} />
      <Flower x={36} y={42} r={10.5} rot={12} tilt={0.78} seed={5} />
      <Flower x={0} y={22} r={10} rot={40} tilt={0.9} seed={2} />
      <Flower x={28} y={6} r={9} rot={-24} tilt={0.84} seed={21} />
      <Flower x={6} y={44} r={8.5} rot={16} tilt={0.78} seed={22} />
      <Flower x={52} y={24} r={8} rot={50} tilt={0.86} seed={23} />
      <Flower x={64} y={44} r={8.5} rot={-34} tilt={0.74} seed={24} />
      <Flower x={92} y={30} r={8} rot={10} tilt={0.88} seed={25} />
      <Bud x={46} y={50} rot={190} s={0.75} />
      <Bud x={20} y={48} rot={200} s={0.7} />
      <Bud x={70} y={26} rot={20} s={0.65} />
      <Leaf x={28} y={22} rot={-50} s={0.7} />
      <Flower x={136} y={25} r={8.5} rot={-4} tilt={0.9} seed={15} />
      <Flower x={164} y={30} r={8} rot={30} tilt={0.86} seed={26} />
      <Flower x={128} y={46} r={7.5} rot={-18} tilt={0.74} seed={27} />
      <Flower x={226} y={48} r={7.5} rot={14} tilt={0.8} seed={28} />
      <Flower x={256} y={66} r={6.5} rot={-20} tilt={0.78} seed={29} />
      <Bud x={142} y={50} rot={186} s={0.7} />
      <Bud x={168} y={50} rot={176} s={0.65} />
      <Bud x={110} y={29} rot={-14} s={0.75} />
      <Stalk d="M150 36 C151 42 152 47 153 51" />
      <Flower x={153} y={53} r={8.5} rot={-12} tilt={0.72} seed={8} />
      <Leaf x={186} y={41} rot={22} s={0.75} />
      <Flower x={240} y={60} r={7.5} rot={-30} tilt={0.8} seed={10} />
      <Bud x={262} y={76} rot={150} s={0.65} />
      <Bud x={271} y={84} rot={170} s={0.55} />

      {/* a twig rising from the limb */}
      <Sway still={still} t={rise}>
        <path d={twigPath(rise, 1)} fill="url(#wc-bark)" />
        <Leaf x={52} y={18} rot={-80} s={0.65} />
        <Flower x={58} y={12} r={9} rot={14} tilt={0.86} seed={4} />
        <Flower x={77} y={3} r={9.5} rot={-18} tilt={0.84} seed={12} />
        <Flower x={68} y={-6} r={7.5} rot={36} tilt={0.86} seed={30} />
        <Flower x={46} y={14} r={7} rot={-50} tilt={0.84} seed={31} />
        <Bud x={86} y={0} rot={70} s={0.7} />
      </Sway>

      {/* a twig drooping under its flowers */}
      <Sway still={still} t={droop}>
        <path d={twigPath(droop, 2)} fill="url(#wc-bark)" />
        <Stalk d="M87 47 C84 51 83 55 83 59" />
        <Flower x={83} y={61} r={9} rot={-8} tilt={0.72} seed={6} />
        <Flower x={101} y={65} r={9.5} rot={20} tilt={0.76} seed={11} />
        <Flower x={92} y={72} r={7} rot={-30} tilt={0.72} seed={32} />
        <Bud x={95} y={60} rot={176} s={0.8} />
      </Sway>

      {/* a twig reaching up past the lantern */}
      <Sway still={still} t={mid}>
        <path d={twigPath(mid, 3)} fill="url(#wc-bark)" />
        <Flower x={185} y={27} r={8.5} rot={8} tilt={0.88} seed={7} />
        <Flower x={208} y={14} r={9} rot={-14} tilt={0.85} seed={9} />
        <Flower x={196} y={4} r={7.5} rot={28} tilt={0.86} seed={33} />
        <Flower x={174} y={22} r={7} rot={-40} tilt={0.84} seed={34} />
        <Leaf x={196} y={20} rot={-36} s={0.65} />
        <Bud x={220} y={9} rot={64} s={0.7} />
      </Sway>

      {/* and one more hanging near the tip */}
      <Sway still={still} t={hang}>
        <path d={twigPath(hang, 4)} fill="url(#wc-bark)" />
        <Flower x={214} y={70} r={8} rot={22} tilt={0.74} seed={14} />
        <Flower x={206} y={62} r={6.5} rot={-26} tilt={0.76} seed={35} />
        <Bud x={223} y={80} rot={168} s={0.7} />
      </Sway>
    </motion.svg>
  );
}

// Petals drifting down from the branches: each one flutters (turning over as it falls),
// sways side to side, drifts with a light breeze and fades out before the counter.
const PETALS = Array.from({ length: 28 }, (_, i) => {
  const right = i % 2 === 1;
  const start = right ? 0.66 + rnd(i + 200) * 0.3 : 0.04 + rnd(i + 200) * 0.3; // across the branch, as a share of the width
  return {
    left: `${r2(start * 100)}%`,
    top: r2(190 + rnd(i + 210) * 50),
    size: r2(8 + rnd(i + 220) * 6),
    fall: 230 + rnd(i + 230) * 120,
    drift: (right ? -1 : 1) * (30 + rnd(i + 240) * 70) + (rnd(i + 245) - 0.5) * 30,
    sway: 10 + rnd(i + 250) * 16,
    spin: (rnd(i + 260) > 0.5 ? 1 : -1) * (160 + rnd(i + 270) * 260),
    duration: 9 + rnd(i + 280) * 6,
    delay: i * 0.55 + rnd(i + 290) * 1.2,
    tone: rnd(i + 300),
  };
});

export function FallingPetals({ className = "", active = true }: { className?: string; active?: boolean }) {
  const still = useReducedMotion();
  if (still || !active) return null; // no petals while off screen
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

// a paper chōchin lantern, lit from inside: a rounded barrel of warm paper with curved ribs,
// shading on its sides and a soft glow around it, wooden caps and a red tassel.
// It sways gently from its cord.
// rib width across the barrel at height y (follows the body's curve)
const barrel = (y: number) => 12 + 14 * Math.sin(((y - 37) / 66) * Math.PI);
export function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const still = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 128"
      aria-hidden="true"
      className={`overflow-visible will-change-transform ${className}`}
      style={{ originX: 0.5, originY: 0 }}
      animate={still ? undefined : { rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <defs>
        <filter id="ln-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="ln-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        {/* paper: warm and shaded at the sides, bright in the middle, lit from within */}
        <linearGradient id="ln-paper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f9cf9c" />
          <stop offset="0.2" stopColor="#ffe3bc" />
          <stop offset="0.42" stopColor="#fff8e6" />
          <stop offset="0.6" stopColor="#fff4dc" />
          <stop offset="0.85" stopColor="#ffdcb0" />
          <stop offset="1" stopColor="#f5c38e" />
        </linearGradient>
        <radialGradient id="ln-light" cx="0.48" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbe8" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#fff2c8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ln-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a2616" />
          <stop offset="0.45" stopColor="#9a5e36" />
          <stop offset="1" stopColor="#4a2616" />
        </linearGradient>
        <radialGradient id="ln-sakura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe3ea" />
          <stop offset="0.6" stopColor="#ff9fb7" />
          <stop offset="1" stopColor="#f2728f" />
        </radialGradient>
        <clipPath id="ln-body"><path d="M20 37C5 45 3 92 20 103H44C61 92 59 45 44 37Z" /></clipPath>
      </defs>

      {/* warm glow around the lantern */}
      <ellipse cx="32" cy="70" rx="30" ry="40" fill="#ffd89a" opacity="0.35" filter="url(#ln-blur)" />

      {/* cord */}
      <line x1="32" y1="0" x2="32" y2="28" stroke="#5b3a2a" strokeWidth="1.6" />

      {/* the paper barrel */}
      <path d="M20 37C5 45 3 92 20 103H44C61 92 59 45 44 37Z" fill="url(#ln-paper)" />
      <g clipPath="url(#ln-body)">
        <ellipse cx="31" cy="70" rx="24" ry="30" fill="url(#ln-light)" />
        {/* bamboo ribs, curving round the barrel */}
        {[43, 50, 57, 64, 71, 78, 85, 92, 98].map((y) => {
          const w = barrel(y);
          return <path key={y} d={`M${(32 - w).toFixed(1)} ${y}Q32 ${y + 3.6} ${(32 + w).toFixed(1)} ${y}`} stroke="#e0a466" strokeOpacity="0.35" strokeWidth="0.75" fill="none" />;
        })}
        {/* soft shine down the left side */}
        <ellipse cx="19" cy="68" rx="3.4" ry="20" fill="#ffffff" opacity="0.6" filter="url(#ln-soft)" />
      </g>
      <path d="M20 37C5 45 3 92 20 103H44C61 92 59 45 44 37Z" fill="none" stroke="#e8b47a" strokeOpacity="0.45" strokeWidth="0.7" />

      {/* a sakura on the front, wrapping slightly with the curve */}
      <g transform="translate(32 70) scale(0.92 1)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d={petal(11.5)} transform={`rotate(${a})`} fill="url(#ln-sakura)" stroke="#e05a7c" strokeOpacity={0.45} strokeWidth={0.6} />
        ))}
        <circle r={3} fill="#e0436a" />
        <circle r={1.1} fill="#ffd36b" />
      </g>

      {/* wooden caps: little cylinders with a lit rim */}
      <rect x="18" y="29" width="28" height="9" rx="2" fill="url(#ln-wood)" />
      <ellipse cx="32" cy="29.5" rx="14" ry="2.4" fill="#b67a4e" />
      <rect x="18" y="102" width="28" height="9" rx="2" fill="url(#ln-wood)" />
      <ellipse cx="32" cy="102.5" rx="14" ry="2.2" fill="#ffd9a0" opacity="0.7" />

      {/* tassel */}
      <path d="M32 111V116" stroke="#c8302a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="117" r="2.2" fill="#d63b30" />
      <path d="M30 118.5L29 127M31.3 119L31 127.5M32.7 119L33 127.5M34 118.5L35 127" stroke="#d63b30" strokeWidth="1" strokeLinecap="round" />
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
