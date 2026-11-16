import type { Metadata } from "next";
import { WorkArc } from "@/components/work/WorkArc";
import { WorkCascade } from "@/components/work/WorkCascade";
import { WorkLayers } from "@/components/work/WorkLayers";
import { WorkFan } from "@/components/WorkFan";

export const metadata: Metadata = { title: "Work visuals", robots: { index: false } };

// A scratch page for comparing ways to show the work visuals under the hero. Not linked from the site.
const OPTIONS = [
  { name: "Now", note: "The current fan: mixed sizes and tilts, overlapping freely.", el: <WorkFan /> },
  { name: "A · Hand of cards", note: "Six cards of one size fanned evenly: the same step, a symmetric tilt and a gentle arc. Hover raises a card.", el: <WorkArc /> },
  { name: "B · Cascade", note: "Six cards of one size in a straight staircase, each stepping right and down over the last. No tilt.", el: <WorkCascade /> },
  { name: "C · Two layers", note: "Four cards in a straight back row, two larger cards in front centred over the gaps. Everything square to the page.", el: <WorkLayers /> },
];

export default function WorkLab() {
  return (
    <main className="mx-auto w-full max-w-[874px] px-6 pt-24 pb-32">
      <span className="label">Lab · work visuals</span>
      <h1 className="mt-3 font-serif text-h2 text-head">Overlapping, but clean</h1>
      <p className="printed mt-4">Every version uses one card size and one white frame, so the six images read as a set. Hover the cards.</p>
      <div className="mt-12 grid gap-16">
        {OPTIONS.map((o) => (
          <section key={o.name} className="grid gap-5 border-t border-line pt-10">
            <div className="grid justify-items-center gap-2 text-center">
              <span className="label">{o.name}</span>
              <p className="printed max-w-[56ch] text-sm">{o.note}</p>
            </div>
            {o.el}
          </section>
        ))}
      </div>
    </main>
  );
}
