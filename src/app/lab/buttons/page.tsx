import type { Metadata } from "next";
import { SakuraButtonLink, type Finish } from "@/components/ui/sakura-button";

export const metadata: Metadata = { title: "Button finishes", robots: { index: false } };

// A scratch page for comparing button finishes. Not linked from the site.
const OPTIONS: { finish: Finish; name: string; note: string }[] = [
  { finish: "flat", name: "Now", note: "The current buttons, with the See work border changed from dark red to its own cream." },
  { finish: "gloss", name: "A · Soft lacquer", note: "A glossy highlight across the top, a gentle bevel and a soft shadow, like lacquerware." },
  { finish: "stitched", name: "B · Stitched patch", note: "A raised rim with a dashed stitch line just inside, and a pressed-in label, like an embroidered patch." },
  { finish: "raised", name: "C · Physical key", note: "The button has thickness underneath, in a darker shade of its own colour, and sinks into it when clicked." },
];

export default function ButtonLab() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 pt-24 pb-32">
      <span className="label">Lab · hero buttons</span>
      <h1 className="mt-3 font-serif text-h2 text-head">Button finishes</h1>
      <p className="printed mt-4">Hover and click each pair. Pull the lantern to see them at night.</p>
      <div className="mt-12 grid gap-14">
        {OPTIONS.map((o) => (
          <section key={o.finish} className="grid justify-items-center gap-5 border-t border-line pt-10 text-center">
            <span className="label">{o.name}</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <SakuraButtonLink href="#resume" finish={o.finish}>Résumé</SakuraButtonLink>
              <SakuraButtonLink href="#work" tone="paper" arrow="down" finish={o.finish}>See work</SakuraButtonLink>
            </div>
            <p className="printed max-w-[48ch] text-sm">{o.note}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
