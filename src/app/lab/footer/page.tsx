import type { Metadata } from "next";
import { SushiBelt } from "@/components/sushi/SushiBelt";

export const metadata: Metadata = { title: "Sushi footer", robots: { index: false } };

// A scratch page for the sushi conveyor footer, smooth and pixel versions. Not linked from the site.
export default function FooterLab() {
  return (
    <main className="mx-auto w-full max-w-[874px] px-6 pt-24 pb-32">
      <span className="label">Lab · footer</span>
      <h1 className="mt-3 font-serif text-h2 text-head">Sushi conveyor</h1>
      <p className="printed mt-4">The same drawings, shown smooth and as clean pixels. Hover the belt to stop it; hover a plate to lift it.</p>
      <section className="mt-12 border-t border-line pt-10">
        <span className="label">A · Smooth</span>
        <SushiBelt look="smooth" />
      </section>
      <section className="mt-12 border-t border-line pt-10">
        <span className="label">B · Pixel</span>
        <SushiBelt look="pixel" />
      </section>
    </main>
  );
}
