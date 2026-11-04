const R = 22;
const CIRCLES: { x: number; y: number }[] = [];
for (let row = 0; row < 6; row++) for (let col = -1; col < 17; col++) CIRCLES.push({ x: col * R * 2 + (row % 2 ? R : 0), y: row * R * 0.5 + R });

/** Seigaiha (blue-sea-wave) divider. Rows ripple on hover via CSS. */
export default function Seigaiha() {
  return (
    <div className="seigaiha" aria-hidden>
      <svg width="740" height="110" viewBox="0 0 740 110">
        {CIRCLES.map((c, i) => (
          <g key={i} className="wave-cell" style={{ ["--d" as string]: `${(c.x / 740) * 0.6}s` }}>
            <circle cx={c.x} cy={c.y} r={R} className="f-paper s-ink" strokeOpacity="0.55" />
            <circle cx={c.x} cy={c.y} r={R * 0.68} fill="none" className="s-ink" strokeOpacity="0.4" />
            <circle cx={c.x} cy={c.y} r={R * 0.36} fill="none" className="s-ink" strokeOpacity="0.3" />
          </g>
        ))}
      </svg>
    </div>
  );
}
