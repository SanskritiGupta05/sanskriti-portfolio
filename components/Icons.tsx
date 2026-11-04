import type { ReactNode } from "react";

export type IconKind =
  | "product" | "visual" | "ux" | "code"
  | "figma" | "claude" | "cursor" | "vercel" | "framer" | "v0"
  | "hand" | "key" | "stamp" | "poke" | "handle" | "badge" | "bowl" | "pencil" | "book" | "pot" | "steam"
  | "tangle" | "enso" | "house" | "sparkle" | "eye";

// Ink icons use currentColor so they follow the theme and the keyword-glow colour.
const PATHS: Record<IconKind, ReactNode> = {
  product: (
    <>
      <path d="M3.5 2.5 L12 8.6 L7.9 9.4 L10.1 13.8 L8.4 14.6 L6.2 10.3 L3.5 12.8 Z" fill="currentColor" />
      <path className="ic-spark" d="M13 1.6 L14.2 0.6 M14.8 4.4 L16 4.1 M11.2 0.4 V-0.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  visual: (
    <>
      <path d="M14.5 1.5 L15.9 2.9 L8.6 10.2 L7.2 8.8 Z" fill="currentColor" />
      <path d="M7.1 8.9 C3.9 8.7 3.1 11.5 2.5 14.5 C5.5 13.9 8.1 13.2 8.3 10 Z" fill="currentColor" />
    </>
  ),
  ux: (
    <>
      <path d="M13.6 4.6 A6 6 0 1 0 14 10.4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" fill="none" />
      <circle cx="8.4" cy="8" r="1.6" fill="currentColor" />
    </>
  ),
  code: (
    <>
      <path d="M5.4 4 L1.6 8 L5.4 12 M10.6 4 L14.4 8 L10.6 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.3 2.6 L6.7 13.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  figma: (
    <>
      <path d="M5.3 0.5 H8 V5.5 H5.3 A2.5 2.5 0 0 1 5.3 0.5Z" fill="#F24E1E" />
      <path d="M8 0.5 H10.7 A2.5 2.5 0 0 1 10.7 5.5 H8Z" fill="#FF7262" />
      <path d="M5.3 5.5 H8 V10.5 H5.3 A2.5 2.5 0 0 1 5.3 5.5Z" fill="#A259FF" />
      <circle cx="10.7" cy="8" r="2.5" fill="#1ABCFE" />
      <path d="M5.3 10.5 H8 V13 A2.5 2.5 0 1 1 5.3 10.5Z" fill="#0ACF83" />
    </>
  ),
  claude: (
    <>
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
        <rect key={a} x="7.1" y="1" width="1.8" height="14" rx="0.9" fill="#D97757" transform={`rotate(${a} 8 8)`} />
      ))}
    </>
  ),
  cursor: (
    <>
      <path d="M8 1 L14.5 4.75 V11.25 L8 15 L1.5 11.25 V4.75 Z" fill="currentColor" />
      <path d="M8 1 L14.5 4.75 L8 8.5 L1.5 4.75 Z" fill="currentColor" opacity="0.55" />
    </>
  ),
  vercel: <path d="M8 2 L15 14 H1 Z" fill="currentColor" />,
  framer: (
    <>
      <path d="M3 1 H13 V5.5 H8 Z" fill="#0055FF" />
      <path d="M3 5.5 H8 L13 10 H8 V14.5 L3 10 Z" fill="#0055FF" />
    </>
  ),
  v0: (
    <>
      <path d="M1.5 4 L5 12 L8.5 4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <rect x="9.5" y="4" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  hand: (
    <path d="M5 8 V3.5 a1.2 1.2 0 0 1 2.4 0 V7 V2.5 a1.2 1.2 0 0 1 2.4 0 V7 V3.5 a1.2 1.2 0 0 1 2.4 0 V9 c0 3.5 -2 6 -5 6 c-2.2 0 -3.4 -1.2 -4.6 -3 L1.4 9.6 a1.1 1.1 0 0 1 1.8 -1.2 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  ),
  key: (
    <>
      <rect x="1" y="2" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 8 H11 M8.5 5.5 L11 8 L8.5 10.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </>
  ),
  stamp: (
    <>
      <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="1.6 1.4" />
      <rect x="5" y="5" width="6" height="6" fill="var(--seal)" />
    </>
  ),
  poke: (
    <>
      <path d="M3 13 L9 7 M9 7 L7.5 6.6 M9 7 L9.4 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle className="ic-ripple" cx="11.5" cy="4.5" r="1.4" fill="none" stroke="currentColor" />
    </>
  ),
  handle: (
    <>
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2.5" y="6.8" width="11" height="2.4" rx="1.2" fill="var(--seal)" transform="rotate(-30 8 8)" />
    </>
  ),
  badge: (
    <>
      <path d="M5 1 L8 5 L11 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="3" y="5" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 9 H10.5 M5.5 11.5 H9" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  bowl: (
    <>
      <path d="M1.5 8 H14.5 C14.5 12 11.5 14.5 8 14.5 C4.5 14.5 1.5 12 1.5 8 Z" fill="currentColor" />
      <path d="M6 6 L12 1 M8.5 6.5 L14 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  pencil: (
    <>
      <path d="M11.5 1.5 L14.5 4.5 L5.5 13.5 L1.5 14.5 L2.5 10.5 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 3 L13 6" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  book: (
    <path d="M8 3.5 C6 2 3.5 2 1.5 2.5 V13 C3.5 12.5 6 12.5 8 14 C10 12.5 12.5 12.5 14.5 13 V2.5 C12.5 2 10 2 8 3.5 Z M8 3.5 V14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  ),
  pot: (
    <>
      <ellipse cx="8" cy="4" rx="4.5" ry="1.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 4 Q2.5 9 4.5 13.5 Q8 15 11.5 13.5 Q13.5 9 12.5 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  steam: <path d="M5 14 q-2 -3 0 -6 q2 -3 0 -6 M10.5 14 q-2 -3 0 -6 q2 -3 0 -6" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />,
  tangle: <path d="M2 8 C4 2 7 14 9 6 S13 3 14 9 C11 13 6 12 4 9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  enso: <path d="M13.4 4.6 A6 6 0 1 0 13.8 10.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />,
  house: (
    <>
      <path d="M1.5 7.5 L8 2 L14.5 7.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <rect x="3.5" y="7" width="9" height="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7 V14 M3.5 10.5 H12.5" stroke="currentColor" strokeWidth="0.9" />
    </>
  ),
  sparkle: (
    <>
      <path d="M8 1 L9.4 6.6 L15 8 L9.4 9.4 L8 15 L6.6 9.4 L1 8 L6.6 6.6 Z" fill="currentColor" />
      <circle cx="13.5" cy="2.5" r="1.1" fill="currentColor" />
    </>
  ),
  eye: (
    <>
      <path d="M1 8 Q8 1.5 15 8 Q8 14.5 1 8 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2.3" fill="currentColor" />
    </>
  ),
};

export function Icon({ kind, size = 16, className }: { kind: IconKind; size?: number; className?: string }) {
  return (
    <svg className={`ic ic-${kind} ${className ?? ""}`} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      {PATHS[kind]}
    </svg>
  );
}

/**
 * Bold keyword with an inline icon. `logo` puts the icon before the word (tool logos),
 * otherwise after it. `glow` is the traditional colour it lights up to on hover.
 */
export function K({
  icon,
  children,
  logo,
  glow,
  after,
}: {
  icon: IconKind;
  children: ReactNode;
  logo?: boolean;
  glow?: string;
  after?: string;
}) {
  return (
    <span className={`kw kw-${icon}`} style={glow ? ({ ["--glow" as string]: glow } as React.CSSProperties) : undefined}>
      <span className="kw-inner">
        {logo && <Icon kind={icon} />}
        <b>{children}</b>
        {!logo && <Icon kind={icon} />}
      </span>
      {after}
    </span>
  );
}

const TOOL_STYLE: Record<string, { bg: string; fg: string; icon: IconKind }> = {
  "Claude Code": { bg: "#F7E6DC", fg: "#8A3A1C", icon: "claude" },
  Cursor: { bg: "#E8E8E8", fg: "#111111", icon: "cursor" },
  Figma: { bg: "#F1ECFF", fg: "#4A2C8F", icon: "figma" },
  Framer: { bg: "#E3EDFF", fg: "#0040C0", icon: "framer" },
  v0: { bg: "#161616", fg: "#FFFFFF", icon: "v0" },
  Vercel: { bg: "#EDEDED", fg: "#111111", icon: "vercel" },
};

export function ToolChip({ name }: { name: string }) {
  const t = TOOL_STYLE[name];
  return (
    <span className="tool" style={{ background: t.bg, color: t.fg }}>
      <Icon kind={t.icon} size={14} />
      {name}
    </span>
  );
}
