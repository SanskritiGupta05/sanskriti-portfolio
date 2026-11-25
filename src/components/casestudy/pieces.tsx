"use client";

import { useState } from "react";

export function Ticket({
    kicker,
    text,
    meta,
}: {
    kicker: string;
    text: string;
    meta: { k: string; v: string }[];
}) {
    return (
        <div className="grid rounded-2xl border border-line bg-bg shadow-[0_14px_30px_-24px_rgba(60,40,20,0.45)] sm:grid-cols-[1fr_auto]">
            <div className="grid content-start gap-3 p-5">
                <span className="label">{kicker}</span>
                <p className="printed text-sm leading-relaxed">{text}</p>
            </div>
            <div className="relative grid content-center gap-3 border-t border-dashed border-line p-5 sm:border-t-0 sm:border-l">
                <span
                    aria-hidden="true"
                    className="absolute -top-2.5 -left-2.5 hidden size-5 rounded-full border border-line bg-bg [clip-path:inset(50%_0_0_0)] sm:block"
                />
                <span
                    aria-hidden="true"
                    className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full border border-line bg-bg [clip-path:inset(0_0_50%_0)] sm:block"
                />
                {meta.map((m) => (
                    <div key={m.k} className="flex justify-between gap-8">
                        <span className="label">{m.k}</span>
                        <span className="text-sm text-head">{m.v}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const TAB_COLOURS = ["#fde3dc", "#fdf0d2", "#e3f0dc", "#dcebf5", "#ece2f5", "#f5e0ea", "#e6e2da"];
export function StageTabs({ stages }: { stages: { stage: string; q: string }[] }) {
    const [tab, setTab] = useState(0);
    return (
        <div>
            <div
                role="tablist"
                aria-label="Rider lifecycle stages"
                className="flex flex-wrap gap-1"
            >
                {stages.map((l, i) => (
                    <button
                        key={l.stage}
                        type="button"
                        role="tab"
                        aria-selected={tab === i}
                        onClick={() => setTab(i)}
                        className={`rounded-t-lg border border-b-0 border-line px-3 pt-2 pb-1.5 text-sm transition ${tab === i ? "-translate-y-1 text-head" : "text-muted-foreground hover:-translate-y-0.5"}`}
                        style={{ background: TAB_COLOURS[i % TAB_COLOURS.length] }}
                    >
                        {l.stage}
                    </button>
                ))}
            </div>
            <div
                role="tabpanel"
                className="-mt-px rounded-b-xl rounded-tr-xl border border-line p-5 transition-colors"
                style={{ background: TAB_COLOURS[tab % TAB_COLOURS.length] }}
            >
                <span className="label">
                    Stage {tab + 1} of {stages.length}
                </span>
                <p className="mt-2 font-serif text-h1 text-head">{stages[tab].q}</p>
            </div>
        </div>
    );
}
