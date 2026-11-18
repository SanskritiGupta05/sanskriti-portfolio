"use client";

import { motion, useReducedMotion } from "motion/react";

// Scenery around the sushi counter: a cherry branch in each top corner with a paper lantern
// hanging from it, and a shoji window down each side. Smooth vector, matching the belt.

const PINK = { edge: "#ffe6ea", mid: "#f9bfca", base: "#ef8ea0", line: "#d8687c", eye: "#d2465f" };
const BRANCH = "#8e5a43";
const BRANCH_D = "#6e4232";

// a sakura petal: full and round, with a soft notch at the tip (same shape as the buttons' sprigs)
const petal = (r: number) =>
  `M0 0C${-r * 1.03} ${-r * 0.12} ${-r * 1.18} ${-r * 0.9} ${-r * 0.24} ${-r * 1.04}Q${-r * 0.08} ${-r} 0 ${-r * 0.88}Q${r * 0.08} ${-r} ${r * 0.24} ${-r * 1.04}C${r * 1.18} ${-r * 0.9} ${r * 1.03} ${-r * 0.12} 0 0Z`;

function Flower({ x, y, r, rot = 0 }: { x: number; y: number; r: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={petal(r)} transform={`rotate(${a})`} fill="url(#sk-petal)" stroke={PINK.line} strokeOpacity={0.3} strokeWidth={0.5} />
      ))}
      <circle r={r * 0.24} fill={PINK.eye} opacity={0.85} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={Math.round(Math.cos((a * Math.PI) / 180) * r * 0.42 * 100) / 100} cy={Math.round(Math.sin((a * Math.PI) / 180) * r * 0.42 * 100) / 100} r={0.8} fill="#f4c04f" />
      ))}
    </g>
  );
}

function Bud({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M0-3C-3-4-3.6-9 0.6-12.4C3.2-9 2.8-4.4 0-3Z" fill="#f2a0b0" />
      <path d="M-2-3.4Q-1-6 0-4.4Q1-6 2-3.4Q0-2.2-2-3.4Z" fill="#8a3d30" />
    </g>
  );
}

// the branch reaches in from the corner; the lantern hangs at (HANG_X, HANG_Y)
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
        <radialGradient id="sk-petal" cx="0.5" cy="1" r="1" fx="0.5" fy="1">
          <stop offset="0" stopColor={PINK.base} />
          <stop offset="0.45" stopColor={PINK.mid} />
          <stop offset="1" stopColor={PINK.edge} />
        </radialGradient>
      </defs>
      {/* the limb: thick at the corner, tapering as it reaches in */}
      {[
        ["M-6 4C20 14 40 30 70 34", 9],
        ["M70 34C98 38 118 40 146 36", 6],
        ["M146 36C176 32 200 26 226 30", 4],
        ["M226 30C240 32 252 38 262 46", 2.4],
      ].map(([d, w]) => (
        <path key={d as string} d={d as string} stroke={BRANCH} strokeWidth={w as number} fill="none" strokeLinecap="round" />
      ))}
      <path d="M-6 7C20 17 40 33 70 37C98 41 118 43 146 39" stroke={BRANCH_D} strokeWidth={1.4} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
      {/* twigs */}
      <path
        d="M40 25C46 14 52 8 60 4M96 39C102 50 104 58 102 68M170 31C176 20 184 14 194 12M200 27C206 36 214 42 224 44M18 12C14 26 14 38 20 48"
        stroke={BRANCH}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      {/* the lantern's cord ties on here */}
      <circle cx={HANG_X} cy={HANG_Y - 4} r={2.4} fill={BRANCH_D} />
      {/* blossoms and buds */}
      <Flower x={6} y={18} r={14} rot={-12} />
      <Flower x={40} y={8} r={11} rot={30} />
      <Flower x={30} y={62} r={10} rot={4} />
      <Flower x={70} y={52} r={9} rot={50} />
      <Flower x={134} y={50} r={9} rot={18} />
      <Flower x={204} y={8} r={8} rot={-6} />
      <Flower x={28} y={20} r={13} rot={8} />
      <Flower x={54} y={38} r={11} rot={-20} />
      <Flower x={14} y={44} r={10} rot={30} />
      <Flower x={84} y={26} r={10} rot={14} />
      <Flower x={102} y={60} r={8.5} rot={-8} />
      <Flower x={160} y={22} r={10} rot={24} />
      <Flower x={186} y={40} r={8} rot={-30} />
      <Flower x={226} y={22} r={9} rot={6} />
      <Flower x={250} y={44} r={6.5} rot={40} />
      <Bud x={60} y={4} rot={40} />
      <Bud x={194} y={12} rot={70} />
      <Bud x={224} y={44} rot={120} />
      <Bud x={264} y={48} rot={100} />
      <Bud x={130} y={30} rot={-10} />
    </motion.svg>
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
