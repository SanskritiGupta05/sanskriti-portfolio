import { CalendarDays, User, Users } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { SCREENS } from "./bounceScreens";

const RED = "#c8553b";

export function Concerns({ items }: { items: { t: string; d: ReactNode }[] }) {
    return (
        <ol className="grid gap-4 sm:grid-cols-2">
            {items.map((c, i) => (
                <li
                    key={c.t}
                    className="grid content-start gap-2 rounded-2xl border border-line bg-bg p-5"
                >
                    <span className="font-worn text-h1 leading-none" style={{ color: RED }}>
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-lg text-head">{c.t}</p>
                    <p className="printed text-sm leading-relaxed">{c.d}</p>
                </li>
            ))}
        </ol>
    );
}

export function DecisionHead({ n, solves, stage }: { n: number; solves: string; stage: string }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1 text-sm text-white" style={{ background: RED }}>
                Decision {String(n).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink">
                Solves: {solves}
            </span>
            <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink">
                Journey: {stage}
            </span>
        </div>
    );
}

export function Beat({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="grid gap-1.5 border-l-2 pl-4" style={{ borderColor: `${RED}55` }}>
            <span className="label">{label}</span>
            <div className="printed max-w-[64ch] text-pretty">{children}</div>
        </div>
    );
}

export function Options({
    head,
    rows,
}: {
    head: string[];
    rows: { cells: ReactNode[]; chosen?: boolean }[];
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                    <tr className="border-b border-line bg-surface/60">
                        {head.map((h) => (
                            <th key={h} className="label px-4 py-2.5 font-normal">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr
                            key={i}
                            className="border-b border-line last:border-b-0"
                            style={r.chosen ? { background: `${RED}12` } : undefined}
                        >
                            {r.cells.map((c, j) => (
                                <td
                                    key={j}
                                    className={`px-4 py-3 align-top leading-relaxed ${j === 0 ? "font-serif text-base text-head" : "printed"}`}
                                >
                                    {c}
                                    {j === 0 && r.chosen && (
                                        <span
                                            className="ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[11px] text-white"
                                            style={{ background: RED }}
                                        >
                                            chosen
                                        </span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function KycLine({
    spots,
}: {
    spots: { at: string; verdict: string; chosen?: boolean; old?: boolean }[];
}) {
    return (
        <ol className="relative grid gap-0">
            {spots.map((s, i) => (
                <li key={s.at} className="relative grid grid-cols-[28px_1fr] gap-3 pb-5 last:pb-0">
                    {i < spots.length - 1 && (
                        <span
                            aria-hidden="true"
                            className="absolute top-4 left-[13px] h-full w-px bg-line"
                        />
                    )}
                    <span
                        aria-hidden="true"
                        className="relative z-10 mt-1 grid size-[27px] place-items-center rounded-full border text-xs"
                        style={
                            s.chosen
                                ? { background: RED, borderColor: RED, color: "#fff" }
                                : {
                                      background: "var(--bg)",
                                      borderColor: "var(--line)",
                                      color: "var(--muted-foreground)",
                                  }
                        }
                    >
                        {s.chosen ? "✓" : "×"}
                    </span>
                    <div className="grid gap-0.5">
                        <p className={`font-serif text-lg ${s.chosen ? "text-head" : "text-ink"}`}>
                            KYC {s.at}
                            {s.old && <span className="label ml-2">the old app</span>}
                            {s.chosen && (
                                <span
                                    className="ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[11px] text-white"
                                    style={{ background: RED }}
                                >
                                    chosen
                                </span>
                            )}
                        </p>
                        <p className="printed text-sm leading-relaxed">{s.verdict}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

export function Journeys({
    rows,
}: {
    rows: { label: string; steps: string[]; mark?: number[] }[];
}) {
    return (
        <div className="grid gap-4 rounded-2xl border border-line bg-bg p-5">
            {rows.map((r) => (
                <div key={r.label} className="grid gap-2">
                    <span className="label">{r.label}</span>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                        {r.steps.map((s, i) => (
                            <li key={s} className="flex items-center gap-2">
                                <span
                                    className="rounded-full border px-3 py-1 text-sm"
                                    style={
                                        r.mark?.includes(i)
                                            ? {
                                                  borderColor: RED,
                                                  color: RED,
                                                  background: `${RED}10`,
                                              }
                                            : { borderColor: "var(--line)", color: "var(--ink)" }
                                    }
                                >
                                    {s}
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
        </div>
    );
}

type Screen = { k: string; label?: string };

function Phone({ k, label, width, device }: Screen & { width: number; device?: boolean }) {
    const [w, h] = SCREENS[k] ?? [660, 1434];
    const old = k.startsWith("old/");
    const shell = device
        ? "rounded-[30px] border-[5px] border-[#d9d6d1] bg-bg shadow-[0_0_0_1px_#bdb8b0,0_22px_40px_-22px_rgba(60,40,20,0.5)]"
        : `rounded-[18px] border bg-bg ${old ? "border-line opacity-95 grayscale-[35%]" : "border-line shadow-[0_10px_24px_-16px_rgba(60,40,20,0.45)]"}`;
    return (
        <figure className="grid shrink-0 content-start gap-2" style={{ width }}>
            <div className={`overflow-hidden ${shell}`}>
                <Image
                    src={`/assets/cases/bounce/v2/${k}.webp`}
                    alt={label ?? ""}
                    width={w}
                    height={h}
                    sizes={`${width * 2}px`}
                    className="block h-auto w-full"
                />
            </div>
            {label && <figcaption className="label leading-snug">{label}</figcaption>}
        </figure>
    );
}

export function Screens({
    items,
    width = 188,
    tag,
    device,
}: {
    items: Screen[];
    width?: number;
    tag?: "old" | "new";
    device?: boolean;
}) {
    return (
        <div className="grid gap-3">
            {tag && <Tag kind={tag} />}
            <div className="-mx-1 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
                <div className="mx-auto flex w-max gap-4">
                    {items.map((s) => (
                        <Phone key={s.k} {...s} width={width} device={device} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Tag({ kind }: { kind: "old" | "new" }) {
    return kind === "old" ? (
        <span className="skeu-chip w-fit rounded-full bg-[#ececec] px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-[#5E5A54] uppercase">
            Old UI
        </span>
    ) : (
        <span
            className="skeu-chip w-fit rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase"
            style={{ background: "linear-gradient(180deg, #e0464b, #c9262c)" }}
        >
            After revamp
        </span>
    );
}

export function Compare({
    old,
    next,
    width = 160,
    caption,
}: {
    old: Screen[];
    next: Screen[];
    width?: number;
    caption?: string;
}) {
    return (
        <Panel caption={caption}>
            <div className="grid gap-10">
                <Screens items={old} tag="old" width={width} />
                <Screens items={next} tag="new" width={width} />
            </div>
        </Panel>
    );
}

export function MetaBar({
    role,
    duration,
    partners,
}: {
    role: string;
    duration: string;
    partners: ReactNode;
}) {
    const cells = [
        { icon: User, k: "Role", v: role },
        { icon: CalendarDays, k: "Duration", v: duration },
        { icon: Users, k: "Worked with", v: partners },
    ];
    return (
        <dl className="skeu grid divide-line rounded-2xl sm:grid-cols-3 sm:divide-x max-sm:divide-y">
            {cells.map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-start gap-3 px-5 py-4">
                    <Icon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.8}
                    />
                    <div className="grid gap-0.5">
                        <dt className="label tracking-[0.16em]">{k}</dt>
                        <dd className="text-sm text-ink">{v}</dd>
                    </div>
                </div>
            ))}
        </dl>
    );
}

export function Squiggle({ children, marks = true }: { children: ReactNode; marks?: boolean }) {
    return (
        <span className="relative inline-block whitespace-nowrap">
            {children}
            <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full"
            >
                <path
                    d="M2 9 C 40 3, 80 12, 120 6 S 180 4, 198 8"
                    fill="none"
                    stroke="#D42B31"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
            </svg>
            {marks && (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="absolute -top-3 -right-6 size-5"
                >
                    <path
                        d="M5 14 L10 9 M9 18 L17 13 M8 5 L11 2"
                        stroke="#D42B31"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </span>
    );
}

export function Story({
    label = "Read the full story",
    children,
}: {
    label?: string;
    children: ReactNode;
}) {
    return (
        <details className="group skeu rounded-2xl px-5 py-4">
            <summary className="label flex cursor-pointer list-none items-center gap-2 !text-ink [&::-webkit-details-marker]:hidden">
                <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-open:rotate-90"
                >
                    ›
                </span>
                {label}
            </summary>
            <div className="mt-4 grid gap-4">{children}</div>
        </details>
    );
}

export function Panel({ children, caption }: { children: ReactNode; caption?: string }) {
    return (
        <figure className="grid gap-3">
            <div className="rounded-[24px] bg-[#F8F8F8] px-5 py-10 sm:px-10 dark:bg-surface">
                {children}
            </div>
            {caption && (
                <figcaption className="label normal-case tracking-normal">{caption}</figcaption>
            )}
        </figure>
    );
}

export function Shots({
    items,
    width = 180,
    tag,
    caption,
}: {
    items: Screen[];
    width?: number;
    tag?: "old" | "new";
    caption?: string;
}) {
    return (
        <Panel caption={caption}>
            <Screens items={items} width={width} tag={tag} />
        </Panel>
    );
}

export function Principle({ name, children }: { name: string; children: ReactNode }) {
    return (
        <aside className="skeu max-w-[64ch] rounded-xl px-5 py-4">
            <span className="label !text-[#a8432d]">{name}</span>
            <p className="mt-1 text-base leading-relaxed text-ink">{children}</p>
        </aside>
    );
}

export function Chapter({
    id,
    title,
    children,
}: {
    id: string;
    title: ReactNode;
    children: ReactNode;
}) {
    return (
        <section id={id} className="grid scroll-mt-16 gap-6">
            <h2 className="font-serif text-h2m text-head md:text-h2">{title}</h2>
            {children}
        </section>
    );
}

export function Decision({
    id,
    n,
    title,
    children,
}: {
    id: string;
    n: number;
    title: ReactNode;
    children: ReactNode;
}) {
    return (
        <section id={id} className="grid scroll-mt-16 gap-5">
            <span className="label tabular-nums" style={{ color: RED }}>
                {String(n).padStart(2, "0")}
            </span>
            <h3 className="-mt-3 max-w-[34ch] text-[24px] leading-[1.25] font-semibold tracking-[-0.01em] text-balance text-head md:text-[28px]">
                {title}
            </h3>
            {children}
        </section>
    );
}

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.bouncedaily.app";
export function PlayStoreButton({ className = "" }: { className?: string }) {
    return (
        <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-fit items-center gap-3 rounded-xl bg-[#1d1c1a] py-2 pr-5 pl-3.5 text-white shadow-[0_8px_18px_-10px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-black ${className}`}
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0">
                <path
                    d="M4.5 2.6 13.4 12l-8.9 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1Z"
                    fill="#00D7FE"
                />
                <path d="m16.4 9-3 3 3 3 3.4-1.9c1-.6 1-1.6 0-2.2L16.4 9Z" fill="#FFCE00" />
                <path d="M13.4 12 4.5 21.4c.3.2.8.2 1.2 0L16.4 15l-3-3Z" fill="#FF3A44" />
                <path d="M4.5 2.6c.4-.2.8-.2 1.2 0L16.4 9l-3 3-8.9-9.4Z" fill="#00F076" />
            </svg>
            <span className="grid leading-none">
                <span className="text-[10px] tracking-[0.08em] uppercase opacity-80">Live on</span>
                <span className="mt-1 text-[15px] font-bold">Google Play</span>
            </span>
        </a>
    );
}

function Mark({ kind }: { kind: "check" | "cross" | "dot" }) {
    const style =
        kind === "check"
            ? {
                  background: `linear-gradient(180deg, #d9674d, ${RED})`,
                  color: "#fff",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 2px rgba(150,50,30,0.35)",
              }
            : kind === "cross"
              ? { background: "#ececec", color: "#737373" }
              : { background: `${RED}1a`, color: RED };
    return (
        <span
            aria-hidden="true"
            className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full text-[10px] leading-none font-bold"
            style={style}
        >
            {kind === "check" ? "✓" : kind === "cross" ? "×" : "•"}
        </span>
    );
}

export function Points({
    items,
    kind = "dot",
}: {
    items: ReactNode[];
    kind?: "check" | "cross" | "dot";
}) {
    return (
        <ul className="grid max-w-[68ch] gap-3">
            {items.map((it, i) => (
                <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Mark kind={kind} />
                    <span>{it}</span>
                </li>
            ))}
        </ul>
    );
}

export function Pair({
    before,
    after,
    beforeLabel = "Before",
    afterLabel = "What I changed",
}: {
    before: ReactNode[];
    after: ReactNode[];
    beforeLabel?: string;
    afterLabel?: string;
}) {
    return (
        <div className="grid gap-3 md:grid-cols-2">
            <div className="skeu-sunk grid content-start gap-4 rounded-2xl p-5">
                <span className="label tracking-[0.14em]">{beforeLabel}</span>
                <Points items={before} kind="cross" />
            </div>
            <div className="skeu-red grid content-start gap-4 rounded-2xl p-5">
                <span className="label tracking-[0.14em] !text-[#a8432d]">{afterLabel}</span>
                <Points items={after} kind="check" />
            </div>
        </div>
    );
}

export function Stats({ items }: { items: { n: string; l: string }[] }) {
    return (
        <dl className="skeu grid overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s, i) => (
                <div
                    key={s.l}
                    className={`grid content-start gap-1.5 p-5 ${i > 0 ? "border-line max-sm:border-t sm:border-l" : ""} ${i === 2 ? "sm:max-lg:border-l-0 sm:max-lg:border-t" : ""} ${i === 3 ? "sm:max-lg:border-t" : ""}`}
                >
                    <dt className="font-serif text-[34px] leading-none" style={{ color: RED }}>
                        {s.n}
                    </dt>
                    <dd className="text-sm leading-snug text-ink">{s.l}</dd>
                </div>
            ))}
        </dl>
    );
}

export function Scenarios({ items }: { items: { when: string; then: string }[] }) {
    return (
        <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((s) => (
                <li
                    key={s.when}
                    className="skeu grid content-start gap-2 rounded-2xl p-5 hover:-translate-y-0.5"
                >
                    <span className="text-lg leading-snug font-semibold text-head">{s.when}</span>
                    <span className="flex gap-2 text-sm leading-relaxed text-ink">
                        <span aria-hidden="true" style={{ color: RED }}>
                            →
                        </span>
                        {s.then}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export function Subhead({ children }: { children: ReactNode }) {
    return <h3 className="mt-4 text-[20px] leading-snug font-semibold text-head">{children}</h3>;
}

const SOURCE = {
    pm: { label: "Product manager's concern", color: "#9a6412", bg: "#fbf0dc" },
    audit: { label: "Found in my walkthrough", color: "#2F5BD3", bg: "#e8eefc" },
};
export function Problems({
    items,
}: {
    items: {
        t: string;
        d: ReactNode;
        from: "pm" | "audit";
        stage: string;
        fix: { label: string; href: string };
    }[];
}) {
    return (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
                <li
                    key={p.t}
                    className="skeu grid content-start gap-3 rounded-2xl p-5 hover:-translate-y-0.5"
                >
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span
                            className="skeu-chip rounded-md px-2 py-0.5 text-[11px] font-semibold"
                            style={{ color: SOURCE[p.from].color, background: SOURCE[p.from].bg }}
                        >
                            {SOURCE[p.from].label}
                        </span>
                        <span className="skeu-chip rounded-md bg-[#f6f6f6] px-2 py-0.5 text-[11px] font-semibold text-muted-foreground dark:bg-surface">
                            {p.stage}
                        </span>
                    </div>
                    <p className="text-[17px] leading-snug font-semibold text-head">
                        <span className="mr-1.5 tabular-nums" style={{ color: RED }}>
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        {p.t}
                    </p>
                    <p className="text-sm leading-relaxed text-ink">{p.d}</p>
                    <a
                        href={p.fix.href}
                        className="mt-auto w-fit text-[13px] font-semibold underline-offset-4 hover:underline"
                        style={{ color: RED }}
                    >
                        Fixed in {p.fix.label} →
                    </a>
                </li>
            ))}
        </ol>
    );
}
