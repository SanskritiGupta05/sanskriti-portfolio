import type { Metadata } from "next";

import { CasesContents } from "@/components/cases/CasesContents";
import { CasesStamps } from "@/components/cases/CasesStamps";

export const metadata: Metadata = { title: "Case study layouts", robots: { index: false } };

const OPTIONS = [
    {
        name: "A · Contents page + bento",
        note: "Primary projects read like a Japanese book's contents page. Hover a row: the others dim, a hanko presses in, two screens fan out. Vibe-coded projects sit in a bento box; hover a compartment to peek inside.",
        el: <CasesContents />,
    },
    {
        name: "C · Stamp album",
        note: "Primary projects are large perforated postage stamps with a postmark. Vibe-coded projects are small stamps overprinted with a red 'vibe coded' hanko. Hover lifts and tilts a stamp.",
        el: <CasesStamps />,
    },
];

export default function CasesLab() {
    return (
        <main className="mx-auto w-full max-w-[874px] px-6 pt-24 pb-32">
            <span className="label">Lab · case studies</span>
            <h1 className="mt-3 font-serif text-h2 text-head">Two ways to show the work</h1>
            <p className="printed mt-4">
                Screens are stand-ins from the hero and the lines are dummy copy, until the real
                ones arrive.
            </p>
            <div className="mt-12 grid gap-20">
                {OPTIONS.map((o) => (
                    <section key={o.name} className="grid gap-8 border-t border-line pt-10">
                        <div className="grid justify-items-center gap-2 text-center">
                            <span className="label">{o.name}</span>
                            <p className="printed max-w-[60ch] text-sm">{o.note}</p>
                        </div>
                        {o.el}
                    </section>
                ))}
            </div>
        </main>
    );
}
