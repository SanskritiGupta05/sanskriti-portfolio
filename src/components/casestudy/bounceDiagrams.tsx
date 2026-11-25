const RED = "#c8553b";
const BLUE = "#2F5BD3";
const GREEN = "#2f8a5b";
const serif = { fontFamily: "var(--font-hanken), system-ui, sans-serif", fontWeight: 600 };
const mono = { fontFamily: "var(--font-hanken), system-ui, sans-serif" };

function Svg({
    w,
    h,
    label,
    children,
}: {
    w: number;
    h: number;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            role="img"
            aria-label={label}
            className="mx-auto block h-auto w-full"
            style={{ maxWidth: w }}
        >
            {children}
        </svg>
    );
}

export function TensionVenn() {
    return (
        <Svg
            w={640}
            h={300}
            label="Venn diagram: everything visible, and nothing overwhelming, overlap in information you can take in at a glance"
        >
            <circle
                cx={240}
                cy={150}
                r={140}
                fill={RED}
                fillOpacity={0.1}
                stroke={RED}
                strokeOpacity={0.5}
            />
            <circle
                cx={400}
                cy={150}
                r={140}
                fill={BLUE}
                fillOpacity={0.08}
                stroke={BLUE}
                strokeOpacity={0.45}
            />
            <text
                x={170}
                y={140}
                textAnchor="middle"
                fontSize={19}
                fill="var(--head)"
                style={serif}
            >
                Everything
            </text>
            <text
                x={170}
                y={163}
                textAnchor="middle"
                fontSize={19}
                fill="var(--head)"
                style={serif}
            >
                visible
            </text>
            <text
                x={170}
                y={190}
                textAnchor="middle"
                fontSize={12}
                fill="var(--muted-ink)"
                style={mono}
            >
                riders want every detail
            </text>
            <text
                x={470}
                y={140}
                textAnchor="middle"
                fontSize={19}
                fill="var(--head)"
                style={serif}
            >
                Nothing
            </text>
            <text
                x={470}
                y={163}
                textAnchor="middle"
                fontSize={19}
                fill="var(--head)"
                style={serif}
            >
                overwhelming
            </text>
            <text
                x={470}
                y={190}
                textAnchor="middle"
                fontSize={12}
                fill="var(--muted-ink)"
                style={mono}
            >
                but won&apos;t read for it
            </text>
            <text x={320} y={128} textAnchor="middle" fontSize={17} fill={RED} style={serif}>
                At a
            </text>
            <text x={320} y={149} textAnchor="middle" fontSize={17} fill={RED} style={serif}>
                glance
            </text>
            {["maps", "pictures", "chips", "numbers"].map((t, i) => (
                <text
                    key={t}
                    x={320}
                    y={174 + i * 15}
                    textAnchor="middle"
                    fontSize={11.5}
                    fill="var(--ink)"
                    style={mono}
                >
                    {t}
                </text>
            ))}
        </Svg>
    );
}

const CONCERNS = [
    "Riders read little",
    "Drop-off at plans",
    "KYC before a first look",
    "Where KYC belongs",
];
const FIXES = [
    "Look before you commit",
    "Map-first hubs",
    "Scooter type first",
    "Plans you can compare",
    "KYC right before paying",
    "A price that explains itself",
    "A home that remembers",
];
const LINKS: [number, number][] = [
    [0, 0],
    [0, 1],
    [0, 6],
    [1, 2],
    [1, 3],
    [1, 5],
    [2, 0],
    [2, 4],
    [3, 4],
];

export function ConcernMap() {
    const cy = (i: number) => 46 + i * 92;
    const dy = (j: number) => 26 + j * 54;
    return (
        <Svg
            w={880}
            h={392}
            label="Map of Aum's four concerns to the seven decisions that answer them"
        >
            {LINKS.map(([i, j]) => (
                <path
                    key={`${i}-${j}`}
                    d={`M300 ${cy(i)} C 430 ${cy(i)}, 430 ${dy(j)}, 560 ${dy(j)}`}
                    fill="none"
                    stroke={RED}
                    strokeOpacity={0.45}
                    strokeWidth={1.6}
                />
            ))}
            {CONCERNS.map((c, i) => (
                <g key={c}>
                    <rect
                        x={0}
                        y={cy(i) - 26}
                        width={300}
                        height={52}
                        rx={14}
                        fill="var(--bg)"
                        stroke="var(--line)"
                    />
                    <text x={18} y={cy(i) + 5} fontSize={13} fill={RED} style={mono}>
                        {String(i + 1).padStart(2, "0")}
                    </text>
                    <text x={48} y={cy(i) + 5} fontSize={16} fill="var(--head)" style={serif}>
                        {c}
                    </text>
                    <circle cx={300} cy={cy(i)} r={4} fill={RED} />
                </g>
            ))}
            {FIXES.map((f, j) => (
                <g key={f}>
                    <rect
                        x={560}
                        y={dy(j) - 20}
                        width={320}
                        height={40}
                        rx={20}
                        fill={RED}
                        fillOpacity={0.07}
                        stroke={RED}
                        strokeOpacity={0.35}
                    />
                    <text x={580} y={dy(j) + 5} fontSize={12} fill={RED} style={mono}>
                        D{j + 1}
                    </text>
                    <text x={612} y={dy(j) + 5} fontSize={15} fill="var(--head)" style={serif}>
                        {f}
                    </text>
                    <circle cx={560} cy={dy(j)} r={4} fill={RED} />
                </g>
            ))}
        </Svg>
    );
}

type Step = { t: string; kind: "effort" | "value" };
export function EffortValue({ rows }: { rows: { label: string; steps: Step[] }[] }) {
    const tone = {
        effort: { bg: `${RED}14`, border: `${RED}66`, color: RED },
        value: { bg: `${GREEN}14`, border: `${GREEN}66`, color: GREEN },
    };
    return (
        <div className="grid gap-6">
            {rows.map((r) => (
                <div key={r.label} className="grid gap-2">
                    <span className="label">{r.label}</span>
                    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                        {r.steps.map((s, i) => (
                            <li key={s.t} className="flex items-center gap-1.5">
                                <span
                                    className="rounded-lg border px-3 py-1.5 text-sm"
                                    style={{
                                        background: tone[s.kind].bg,
                                        borderColor: tone[s.kind].border,
                                        color: tone[s.kind].color,
                                    }}
                                >
                                    {s.t}
                                </span>
                                {i < r.steps.length - 1 && (
                                    <span aria-hidden="true" className="text-muted-foreground">
                                        →
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
            <div className="flex flex-wrap gap-5">
                {(["value", "effort"] as const).map((k) => (
                    <span key={k} className="label flex items-center gap-2">
                        <i
                            aria-hidden="true"
                            className="inline-block size-3 rounded-[4px] border"
                            style={{ background: tone[k].bg, borderColor: tone[k].border }}
                        />
                        {k === "value" ? "Gives the rider something" : "Asks the rider for effort"}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function ScreenCount({ rows }: { rows: { label: string; n: number; old?: boolean }[] }) {
    return (
        <div className="grid gap-6">
            {rows.map((r) => (
                <div key={r.label} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                    <span className="label">{r.label}</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {Array.from({ length: r.n }, (_, i) => (
                            <span
                                key={i}
                                aria-hidden="true"
                                className="inline-block h-[38px] w-[21px] rounded-[5px] border-[1.5px]"
                                style={
                                    r.old
                                        ? { borderColor: "#a3a3a3", background: "#ececec" }
                                        : { borderColor: RED, background: `${RED}1f` }
                                }
                            />
                        ))}
                        <span
                            className="ml-3 font-serif text-h1 leading-none"
                            style={{ color: r.old ? "var(--ink)" : RED }}
                        >
                            {r.n}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

const KYC_SPOTS = [
    { x: 120, up: true, t: ["During sign-up"], v: ["The old app: documents", "before any value"] },
    {
        x: 200,
        up: false,
        t: ["Before choosing a hub"],
        v: ["Still no idea what", "they'd be getting"],
    },
    {
        x: 470,
        up: true,
        t: ["Approved before paying"],
        v: ["Hours of waiting; the", "hub can sell out"],
    },
    {
        x: 520,
        up: false,
        t: ["Submitted right before", "paying"],
        v: ["About 2 minutes,", "no waiting"],
        chosen: true,
    },
    { x: 690, up: true, t: ["After paying"], v: ["Refunds, and riders", "turned away at pick-up"] },
];
const KYC_STAGES = ["Sign up", "Find a hub", "Choose a plan", "Pay", "Pick up"];

export function KycTrack() {
    const barY = 150;
    return (
        <Svg
            w={880}
            h={300}
            label="Where KYC could go along the journey. Submitted right before paying was chosen."
        >
            {KYC_STAGES.map((s, i) => (
                <g key={s}>
                    <rect
                        x={40 + i * 160}
                        y={barY - 14}
                        width={156}
                        height={28}
                        rx={14}
                        fill={i === 3 ? `${RED}1a` : "var(--bg)"}
                        stroke="var(--line)"
                    />
                    <text
                        x={40 + i * 160 + 78}
                        y={barY + 4}
                        textAnchor="middle"
                        fontSize={12}
                        fill="var(--ink)"
                        style={mono}
                    >
                        {s}
                    </text>
                </g>
            ))}
            {KYC_SPOTS.map((s) => {
                const dot = s.up ? barY - 40 : barY + 40;
                const lines = [
                    ...s.t.map((l) => ({ l, title: true })),
                    ...s.v.map((l) => ({ l, title: false })),
                ];
                const h = (k: number) => (lines[k].title ? 18 : 15);
                const total = lines.reduce((acc, _, k) => acc + h(k), 0);
                let y = s.up ? dot - 18 - total + 12 : dot + 30;
                return (
                    <g key={s.t.join(" ")}>
                        <line
                            x1={s.x}
                            x2={s.x}
                            y1={s.up ? barY - 14 : barY + 14}
                            y2={dot}
                            stroke={s.chosen ? RED : "var(--muted-ink)"}
                            strokeDasharray={s.chosen ? undefined : "3 3"}
                        />
                        <circle
                            cx={s.x}
                            cy={dot}
                            r={11}
                            fill={s.chosen ? RED : "var(--bg)"}
                            stroke={s.chosen ? RED : "var(--muted-ink)"}
                        />
                        <text
                            x={s.x}
                            y={dot + 4}
                            textAnchor="middle"
                            fontSize={12}
                            fill={s.chosen ? "#fff" : "var(--muted-ink)"}
                        >
                            {s.chosen ? "✓" : "×"}
                        </text>
                        {lines.map((ln, k) => {
                            const ty = y;
                            y += h(k);
                            return (
                                <text
                                    key={ln.l}
                                    x={s.x}
                                    y={ty}
                                    textAnchor="middle"
                                    fontSize={ln.title ? 15 : 12}
                                    fill={
                                        ln.title
                                            ? s.chosen
                                                ? RED
                                                : "var(--head)"
                                            : "var(--muted-ink)"
                                    }
                                    style={ln.title ? serif : mono}
                                >
                                    {ln.l}
                                </text>
                            );
                        })}
                    </g>
                );
            })}
        </Svg>
    );
}

const HOME_STATES = [
    "KYC in review",
    "Ready to collect",
    "Riding",
    "Plan ending soon",
    "Plan ended",
];
export function HomeCycle() {
    const x = (i: number) => 8 + i * 174;
    return (
        <Svg
            w={880}
            h={180}
            label="The home booking card moves through five states, and renewing loops back to riding"
        >
            <defs>
                <marker
                    id="hc-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                >
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--muted-ink)" />
                </marker>
                <marker
                    id="hc-arrow-red"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                >
                    <path d="M0 0 L10 5 L0 10 z" fill={RED} />
                </marker>
            </defs>
            {HOME_STATES.map((s, i) => (
                <g key={s}>
                    <rect
                        x={x(i)}
                        y={40}
                        width={150}
                        height={50}
                        rx={14}
                        fill={i === 2 ? `${GREEN}14` : "var(--bg)"}
                        stroke={i === 2 ? `${GREEN}66` : "var(--line)"}
                    />
                    <text
                        x={x(i) + 75}
                        y={70}
                        textAnchor="middle"
                        fontSize={15}
                        fill="var(--head)"
                        style={serif}
                    >
                        {s}
                    </text>
                    {i < HOME_STATES.length - 1 && (
                        <line
                            x1={x(i) + 152}
                            x2={x(i) + 172}
                            y1={65}
                            y2={65}
                            stroke="var(--muted-ink)"
                            markerEnd="url(#hc-arrow)"
                        />
                    )}
                </g>
            ))}
            <path
                d={`M ${x(4) + 75} 92 C ${x(4) + 75} 160, ${x(2) + 75} 160, ${x(2) + 75} 94`}
                fill="none"
                stroke={RED}
                strokeWidth={1.6}
                markerEnd="url(#hc-arrow-red)"
            />
            <text
                x={(x(4) + x(2)) / 2 + 75}
                y={168}
                textAnchor="middle"
                fontSize={13}
                fill={RED}
                style={mono}
            >
                Renew plan
            </text>
            <text x={x(0)} y={20} fontSize={12} fill="var(--muted-ink)" style={mono}>
                ONE CARD ON HOME · ONE NEXT STEP IN EVERY STATE
            </text>
        </Svg>
    );
}

type FlowStep = { t: string; n: string; mark?: "removed" | "new" | "moved" };
const FLOW_TONE = {
    removed: { bg: "#fdecea", border: "#f3b8b0", color: "#b8382a", note: "removed" },
    new: { bg: "#e9f6ee", border: "#b7e0c6", color: "#237a4a", note: "new step" },
    moved: { bg: "#fdf3e1", border: "#f0d59f", color: "#9a6412", note: "moved here" },
};
export function JourneyFlow({ rows }: { rows: { title: string; steps: FlowStep[] }[] }) {
    return (
        <div className="grid gap-8">
            {rows.map((r) => (
                <div key={r.title} className="grid gap-3">
                    <span className="text-[15px] font-semibold text-head">{r.title}</span>
                    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
                        {r.steps.map((s, i) => {
                            const tone = s.mark ? FLOW_TONE[s.mark] : null;
                            return (
                                <li key={s.t} className="flex items-center gap-1.5">
                                    <span
                                        className="skeu-chip grid gap-0.5 rounded-lg border px-2.5 py-1.5"
                                        style={
                                            tone
                                                ? { background: tone.bg, borderColor: tone.border }
                                                : { background: "#fff", borderColor: "#e6e6e6" }
                                        }
                                    >
                                        <span className="text-[13px] leading-tight font-semibold text-head">
                                            {s.t}
                                        </span>
                                        <span
                                            className="text-[11px] leading-tight"
                                            style={{
                                                color: tone
                                                    ? tone.color
                                                    : "var(--muted-foreground)",
                                            }}
                                        >
                                            {s.n}
                                            {tone && ` · ${tone.note}`}
                                        </span>
                                    </span>
                                    {i < r.steps.length - 1 && (
                                        <span aria-hidden="true" className="text-muted-foreground">
                                            →
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            ))}
            <div className="flex flex-wrap gap-4">
                {(["removed", "new", "moved"] as const).map((k) => (
                    <span
                        key={k}
                        className="flex items-center gap-2 text-[12px] text-muted-foreground"
                    >
                        <i
                            aria-hidden="true"
                            className="inline-block size-3 rounded-[4px] border"
                            style={{
                                background: FLOW_TONE[k].bg,
                                borderColor: FLOW_TONE[k].border,
                            }}
                        />
                        {k === "removed" ? "Removed" : k === "new" ? "New step" : "Moved"}
                    </span>
                ))}
            </div>
        </div>
    );
}
