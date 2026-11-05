import { seeded } from "@/lib/draw";

/**
 * A carved seal impression (白文 style: white character cut out of red).
 * Uneven ink, speckles where the paper didn't take ink, and a rough edge.
 */
export default function Hanko({ char, size = 52, seed = 3, className = "" }: { char: string; size?: number; seed?: number; className?: string }) {
  const rnd = seeded(seed);
  const specks = Array.from({ length: 46 }, () => ({ x: 2 + rnd() * 56, y: 2 + rnd() * 56, r: 0.3 + rnd() * 1.1, o: 0.35 + rnd() * 0.6 }));
  const id = `hk${seed}`;
  return (
    <svg className={`hanko ${className}`} width={size} height={size} viewBox="0 0 60 60" aria-hidden>
      <defs>
        <radialGradient id={`${id}-ink`} cx={0.3 + (seed % 3) * 0.15} cy={0.35} r="0.9">
          <stop offset="0" stopColor="#D4473B" />
          <stop offset="0.6" stopColor="#C3352B" />
          <stop offset="1" stopColor="#A82A21" />
        </radialGradient>
      </defs>
      <g style={{ filter: "url(#ink-rough)" }}>
        <rect x="1.5" y="1.5" width="57" height="57" rx="4" fill={`url(#${id}-ink)`} />
        <rect x="5.5" y="5.5" width="49" height="49" rx="2" fill="none" stroke="#FDFDFB" strokeWidth="1.3" strokeOpacity="0.9" />
        <text x="30" y="41" textAnchor="middle" fontSize="33" fontFamily="var(--f-brush)" fill="#FDFDFB">
          {char}
        </text>
      </g>
      {specks.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FDFDFB" fillOpacity={s.o} />
      ))}
    </svg>
  );
}
