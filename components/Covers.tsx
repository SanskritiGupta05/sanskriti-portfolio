// Designed artwork that stands in for real screenshots: Japanese-poster style covers,
// shoji previews and interest vignettes. Swap for real images whenever they exist.
import { brushPath, seeded } from "@/lib/draw";

const CHECK = (() => {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    const x = t < 0.35 ? 40 + t * 120 : 82 + (t - 0.35) * 260;
    const y = t < 0.35 ? 160 + t * 110 : 198 - (t - 0.35) * 230;
    const w = t < 0.35 ? 6 + t * 40 : Math.max(2, 20 - (t - 0.35) * 26);
    pts.push([x, y, w]);
  }
  return brushPath(pts);
})();

const STROKE = (() => {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    pts.push([30 + t * 240, 250 - Math.sin(t * Math.PI) * 18 + t * 6, t < 0.15 ? 2 + t * 70 : Math.max(1.5, 12 - t * 10)]);
  }
  return brushPath(pts);
})();

const GRAIN = { filter: "url(#print)" } as const;

export function ProjectPoster({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg className="poster" viewBox="0 0 300 332" role="img" aria-label="Keploy cover">
        <g style={GRAIN}>
          <rect width="300" height="332" fill="#141414" />
          {Array.from({ length: 14 }, (_, r) => (
            <text key={r} x="18" y={34 + r * 15} fill="#F5F2EC" fillOpacity={0.09 + (r % 4) * 0.03} fontSize="9" fontFamily="var(--f-mono)">
              {["GET /api/orders   200", "POST /api/cart    201", "mock: db.find()   ok", "assert status     ✓", "replay #4821      ✓"][r % 5]}
            </text>
          ))}
          <circle cx="214" cy="92" r="58" fill="#C8372D" />
          <path d={CHECK} fill="#F5F2EC" transform="translate(30 -20)" style={{ filter: "url(#ink-bleed)" }} />
          <text x="22" y="292" fill="#F5F2EC" fontSize="38" fontFamily="var(--f-min)" letterSpacing="-1.5">
            Keploy
          </text>
          <text x="24" y="312" fill="#F5F2EC" fillOpacity="0.55" fontSize="9" fontFamily="var(--f-mono)" letterSpacing="1.5">
            TEST, DON’T GUESS · 2025
          </text>
          <text x="276" y="300" fill="#C8372D" fontSize="22" fontFamily="var(--f-brush)" textAnchor="middle">
            壱
          </text>
        </g>
      </svg>
    );
  if (i === 1)
    return (
      <svg className="poster" viewBox="0 0 300 332" role="img" aria-label="GeeksforGeeks cover">
        <g style={GRAIN}>
          <rect width="300" height="332" fill="#EDE5D6" />
          <text x="22" y="190" fill="#161616" fontSize="168" fontFamily="var(--f-brush)" style={{ filter: "url(#ink-bleed)" }}>
            学
          </text>
          {[0, 1, 2, 3, 4].map((s) => (
            <rect key={s} x={176 + s * 22} y={238 - s * 26} width="22" height={30 + s * 26} fill={s === 4 ? "#C8372D" : "#161616"} />
          ))}
          <path d="M150 54 H284" stroke="#161616" strokeWidth="1" />
          <text x="150" y="44" fill="#161616" fontSize="9" fontFamily="var(--f-mono)" letterSpacing="1.5">
            LEARN → PRACTISE → FINISH
          </text>
          <text x="22" y="292" fill="#161616" fontSize="30" fontFamily="var(--f-min)" letterSpacing="-1">
            GeeksforGeeks
          </text>
          <text x="24" y="312" fill="#161616" fillOpacity="0.55" fontSize="9" fontFamily="var(--f-mono)" letterSpacing="1.5">
            MILLIONS OF LEARNERS · 2024
          </text>
        </g>
      </svg>
    );
  const rnd = seeded(31);
  return (
    <svg className="poster" viewBox="0 0 300 332" role="img" aria-label="Mosaic AI cover">
      <g style={GRAIN}>
        <rect width="300" height="332" fill="#B8322A" />
        {Array.from({ length: 36 }, (_, k) => {
          const x = 30 + (k % 6) * 40;
          const y = 26 + Math.floor(k / 6) * 34;
          const v = rnd();
          const fill = v < 0.45 ? "#F5F2EC" : v < 0.7 ? "#161616" : "#8E1F18";
          return <rect key={k} x={x} y={y} width={v < 0.85 ? 32 : 16} height="26" fill={fill} fillOpacity={v < 0.45 ? 0.9 : 1} />;
        })}
        <circle cx="190" cy="94" r="9" fill="#F2C27A" />
        <path d="M190 74 V114 M170 94 H210" stroke="#F2C27A" strokeWidth="2" />
        <text x="22" y="276" fill="#F5F2EC" fontSize="40" fontFamily="var(--f-min)" letterSpacing="-1.5">
          Mosaic AI
        </text>
        <text x="24" y="300" fill="#F5F2EC" fillOpacity="0.7" fontSize="9" fontFamily="var(--f-mono)" letterSpacing="1.5">
          AN INTERFACE PEOPLE TRUST · 2024
        </text>
      </g>
    </svg>
  );
}

export function VibePoster({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg className="shoji-preview" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g style={GRAIN}>
          <rect width="360" height="300" fill="#111111" />
          <circle cx="250" cy="90" r="34" fill="#EDEAE4" />
          <path d="M40 260 L150 150 Q170 136 190 150 L320 260 Z" fill="#3A3A3A" style={{ filter: "url(#sumi-wash)" }} />
          <path d="M150 150 Q170 136 190 150 L202 162 L190 168 L180 158 L170 170 L160 158 L150 168 L140 162 Z" fill="#CFCBC4" />
          <path d="M90 0 V58" stroke="#EDEAE4" />
          <circle cx="90" cy="100" r="46" fill="#F2C27A" fillOpacity="0.25" />
          <path d="M80 60 C64 66 64 104 80 110 H100 C116 104 116 66 100 60 Z" fill="#F2C27A" stroke="#161616" />
          <text x="90" y="92" textAnchor="middle" fontSize="18" fontFamily="var(--f-brush)" fill="#7A3A10">
            灯
          </text>
          <rect y="262" width="360" height="38" fill="#050505" />
          {[30, 70, 130, 200, 260, 310].map((x) => (
            <rect key={x} x={x} y="272" width="8" height="10" fill="#F2C27A" />
          ))}
        </g>
      </svg>
    );
  if (i === 1)
    return (
      <svg className="shoji-preview" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g style={GRAIN}>
          <rect width="360" height="300" fill="#EDE5D6" />
          <text x="34" y="190" fontSize="130" fontFamily="var(--f-brush)" fill="#161616" style={{ filter: "url(#ink-bleed)" }}>
            道具
          </text>
          <rect x="34" y="214" width="150" height="34" rx="17" fill="#161616" />
          <text x="109" y="236" textAnchor="middle" fontSize="11" fontFamily="var(--f-mono)" fill="#F5F2EC">
            ship it →
          </text>
          <path d="M226 230 L246 250 L238 251 L243 262 L238 264 L233 253 L225 259 Z" fill="#C8372D" />
          <text x="34" y="56" fontSize="9" fontFamily="var(--f-mono)" fill="#161616" letterSpacing="1.5">
            DŌGU — A TOOL, BUILT IN A WEEKEND
          </text>
        </g>
      </svg>
    );
  return (
    <svg className="shoji-preview" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g style={GRAIN}>
        <rect width="360" height="300" fill="#161616" />
        <path d="M30 250 H330 M30 250 V40" stroke="#F5F2EC" strokeOpacity="0.2" />
        <path d={STROKE} fill="#F5F2EC" transform="matrix(1 0 0 -1 0 330)" style={{ filter: "url(#ink-bleed)" }} />
        {[0.08, 0.2, 0.42, 0.66, 0.86, 0.96].map((t, k) => (
          <circle key={k} cx={40 + k * 48} cy={250 - t * 190} r="5" fill="#C8372D" />
        ))}
        <text x="30" y="30" fontSize="9" fontFamily="var(--f-mono)" fill="#F5F2EC" fillOpacity="0.6" letterSpacing="1.5">
          CUBIC-BEZIER(.3, 1.3, .5, 1)
        </text>
      </g>
    </svg>
  );
}

/** Small cover used by the More-work cursor preview. */
export function MiniPoster({ i }: { i: number }) {
  const bg = ["#161616", "#B8322A", "#EDE5D6", "#3A3A3A"][i % 4];
  const fg = i % 4 === 2 ? "#161616" : "#F5F2EC";
  const k = ["週", "三十", "跳", "雑"][i % 4];
  return (
    <svg viewBox="0 0 190 124" aria-hidden>
      <g style={GRAIN}>
        <rect width="190" height="124" fill={bg} />
        <circle cx="150" cy="34" r="20" fill={i % 4 === 1 ? "#F5F2EC" : "#C8372D"} />
        <text x="14" y="96" fontSize="58" fontFamily="var(--f-brush)" fill={fg}>
          {k}
        </text>
        <text x="16" y="114" fontSize="7" fontFamily="var(--f-mono)" fill={fg} fillOpacity="0.6" letterSpacing="1">
          {["WEEB IN TECH", "30 DAYS OF UI", "BOUNCE DAILY", "ODDS & ENDS"][i % 4]}
        </text>
      </g>
    </svg>
  );
}

/** Illustrated vignettes for the gachapon result card. */
export function InterestArt({ i }: { i: number }) {
  const common = { className: "interest-art", viewBox: "0 0 284 160", "aria-hidden": true } as const;
  if (i === 0)
    return (
      <svg {...common}>
        <rect width="284" height="160" className="f-surface" />
        <path d="M110 0 L142 46 L174 0" className="s-ink" strokeWidth="2" fill="none" />
        <g transform="rotate(-4 142 96)" style={{ filter: "url(#ink-rough)" }}>
          <rect x="82" y="44" width="120" height="96" rx="8" fill="#C8372D" className="s-ink" strokeWidth="2" />
          <text x="142" y="64" textAnchor="middle" fontSize="9" fontFamily="var(--f-mono)" fill="#F5F2EC" letterSpacing="1.5">
            HELLO, MY NAME IS
          </text>
          <rect x="92" y="72" width="100" height="56" rx="3" fill="#FBF9F5" />
          <text x="142" y="108" textAnchor="middle" fontSize="22" fontFamily="var(--f-hand)" fill="#161616">
            Sanskriti
          </text>
        </g>
        <text x="236" y="58" fontSize="30" fontFamily="var(--f-brush)" className="f-ink" fillOpacity="0.25">
          会
        </text>
      </svg>
    );
  if (i === 1)
    return (
      <svg {...common}>
        <rect width="284" height="160" className="f-surface" />
        <g className="art-steam">
          <path d="M120 54 q-8 -12 0 -24 q8 -12 0 -24 M142 50 q-8 -12 0 -24 q8 -12 0 -24 M164 54 q-8 -12 0 -24 q8 -12 0 -24" className="s-ink" strokeOpacity="0.4" strokeWidth="2" fill="none" />
        </g>
        <g style={{ filter: "url(#ink-rough)" }}>
          <ellipse cx="142" cy="78" rx="78" ry="14" fill="#E8D9B5" className="s-ink" strokeWidth="2" />
          <ellipse cx="118" cy="76" rx="16" ry="7" fill="#FBF9F5" />
          <ellipse cx="118" cy="76" rx="7" ry="4" fill="#E9A23B" />
          <circle cx="160" cy="76" r="9" fill="#FBF9F5" className="s-ink" />
          <path d="M155 76 q5 -5 10 0" stroke="#C8372D" strokeWidth="2" fill="none" />
          <rect x="176" y="70" width="18" height="10" fill="#6A8D3A" />
          <path d="M64 78 H220 C220 116 186 144 142 144 C98 144 64 116 64 78 Z" fill="#161616" />
          <path d="M80 100 H204" stroke="#C8372D" strokeWidth="3" strokeDasharray="10 6" />
          <path d="M196 30 L120 86 M210 34 L132 90" stroke="#8A6A3E" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    );
  if (i === 2)
    return (
      <svg {...common}>
        <rect width="284" height="160" className="f-surface" />
        <g transform="rotate(-6 142 80)" style={{ filter: "url(#ink-rough)" }}>
          <rect x="60" y="22" width="164" height="118" rx="4" fill="#FBF9F5" className="s-ink" strokeWidth="2" />
          {[34, 50, 66, 82, 98, 114, 130].map((y) => (
            <circle key={y} cx="60" cy={y} r="3" fill="none" className="s-ink" />
          ))}
          <path d="M90 110 L104 70 L120 92 L134 58 L150 110 Z M150 110 L164 84 L178 110" fill="none" stroke="#161616" strokeWidth="1.6" />
          <circle cx="186" cy="54" r="12" fill="#C8372D" />
          <path d="M84 112 Q140 104 200 114" stroke="#161616" strokeWidth="1.2" fill="none" />
        </g>
        <g transform="rotate(32 210 110)">
          <rect x="186" y="104" width="70" height="10" fill="#D9A21B" className="s-ink" />
          <path d="M256 104 L268 109 L256 114 Z" fill="#F3E2C2" className="s-ink" />
          <rect x="178" y="104" width="8" height="10" fill="#E9A9A0" className="s-ink" />
        </g>
      </svg>
    );
  if (i === 3)
    return (
      <svg {...common}>
        <rect width="284" height="160" className="f-surface" />
        <g style={{ filter: "url(#ink-rough)" }}>
          <rect x="70" y="118" width="150" height="20" fill="#161616" />
          <rect x="80" y="98" width="132" height="20" fill="#C8372D" />
          <rect x="74" y="78" width="140" height="20" fill="#EDE5D6" className="s-ink" />
          <rect x="88" y="60" width="118" height="18" fill="#3A3A3A" />
          <path d="M150 60 L170 20 L190 60 Z" fill="#FBF9F5" className="s-ink" strokeWidth="1.5" />
          <path d="M170 20 V60" className="s-ink" />
          <text x="146" y="113" fontSize="9" fontFamily="var(--f-mono)" fill="#F5F2EC" letterSpacing="1" textAnchor="middle">
            BOOK TITLE
          </text>
        </g>
        <text x="30" y="60" fontSize="30" fontFamily="var(--f-brush)" className="f-ink" fillOpacity="0.25">
          読
        </text>
      </svg>
    );
  return (
    <svg {...common}>
      <rect width="284" height="160" className="f-surface" />
      <ellipse cx="142" cy="140" rx="90" ry="10" className="f-ink" fillOpacity="0.12" />
      <g style={{ filter: "url(#ink-rough)" }}>
        <ellipse cx="142" cy="128" rx="66" ry="10" fill="#6E6A64" />
        <path d="M108 50 Q96 92 112 124 Q142 138 172 124 Q188 92 176 50 Z" fill="#B9A58C" className="s-ink" strokeWidth="2" />
        <ellipse cx="142" cy="50" rx="34" ry="8" fill="#8F7C65" className="s-ink" strokeWidth="2" />
        <path d="M110 84 Q142 94 174 84 M112 100 Q142 110 172 100" className="s-ink" strokeOpacity="0.35" fill="none" />
        <circle cx="160" cy="88" r="4" fill="#C8372D" />
      </g>
      <path d="M60 60 q10 -6 20 0 M210 50 q10 -6 20 0" className="s-ink" strokeOpacity="0.35" fill="none" />
    </svg>
  );
}
