"use client";

import { useState } from "react";

import { LayoutChapters } from "@/components/casestudy/LayoutChapters";
import { LayoutMargin } from "@/components/casestudy/LayoutMargin";
import { LayoutSheets } from "@/components/casestudy/LayoutSheets";

const OPTIONS = [
    {
        key: "A",
        name: "Margin notes",
        note: "Editorial and calm: sticky contents with a dot, reading line, pull quote, before/after switch, taped notes.",
        el: <LayoutMargin />,
    },
    {
        key: "B",
        name: "Chapters",
        note: "Japanese and quiet: kanji chapter numerals, an ink-line lifecycle, a drag-to-compare slider, hanko seals.",
        el: <LayoutChapters />,
    },
    {
        key: "C",
        name: "Clipped sheets",
        note: "Playful, like the homepage: paperclipped sheets, a perforated ticket, index-card tabs, taped polaroids, stamps.",
        el: <LayoutSheets />,
    },
];

export default function CaseStudyLab() {
    const [pick, setPick] = useState(0);
    const o = OPTIONS[pick];
    return (
        <main className="mx-auto w-full max-w-[874px] px-6 pt-16 pb-40">
            <span className="label">Lab · case study pages</span>
            <div className="mt-4 flex flex-wrap gap-2">
                {OPTIONS.map((x, i) => (
                    <button
                        key={x.key}
                        type="button"
                        onClick={() => setPick(i)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition ${i === pick ? "border-head bg-head text-bg" : "border-line text-ink hover:border-ink"}`}
                    >
                        {x.key} · {x.name}
                    </button>
                ))}
            </div>
            <p className="printed mt-3 text-sm">{o.note}</p>
            <div className="mt-6 border-t border-line" key={o.key}>
                {o.el}
            </div>
        </main>
    );
}
