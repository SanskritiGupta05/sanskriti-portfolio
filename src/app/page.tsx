import { Nav } from "@/components/Nav";
import { Mascot } from "@/components/Mascot";
import { Footer } from "@/components/Footer";
import { SakuraButtonLink } from "@/components/ui/sakura-button";
import { NameSwap } from "@/components/NameSwap";

// One narrow centred column with wide empty margins on both sides (like Sam's and Mythili's sites).
// The lantern hangs outside it, from the page's top-right corner.
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-6">
      <Nav />

      <main>
        {/* Hero: the pixel mascot, then the intro */}
        <section className="pt-4 pb-32 text-center">
          <Mascot start="coffee" className="mx-auto w-[210px]" />
          <div className="mt-3 grid justify-items-center gap-6">
            {/* hero copy taken from Sanskriti's Framer portfolio ("New folio 2026") */}
            <h1 className="font-serif text-h1m text-balance text-head md:-mx-16 md:text-h1">
              <span className="block">Hey, i&apos;m <NameSwap /></span>
              a designer by craft, an engineer by education. <span className="font-worn">a builder by curiosity.</span>
            </h1>
            <p className="printed text-base">Turning complex ideas into simple, scalable digital experiences.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <SakuraButtonLink href="#resume" finish="raised">Résumé</SakuraButtonLink>
              <SakuraButtonLink href="#work" tone="paper" finish="raised">See work</SakuraButtonLink>
            </div>
            <span className="label pt-2">Delhi NCR, India · Open to work · Trusted by 20+ startups</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
