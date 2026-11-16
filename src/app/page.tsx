import { Nav } from "@/components/Nav";
import { Mascot } from "@/components/Mascot";
import { Footer } from "@/components/Footer";
import { SakuraButtonLink } from "@/components/ui/sakura-button";
import { NameSwap } from "@/components/NameSwap";
import { Keyword } from "@/components/Keyword";

// One narrow centred column with wide empty margins on both sides (like Sam's and Mythili's sites).
// The lantern hangs outside it, from the page's top-right corner.
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <Nav />

      <main>
        {/* Hero: the pixel mascot, then the intro */}
        <section className="pt-4 pb-32 text-center">
          {/* a speech bubble from the mascot; her name drifts into katakana and back */}
          <div className="relative mx-auto mb-1 w-fit rounded-2xl border border-line bg-bg px-4 py-1.5 text-base text-ink shadow-[0_6px_16px_-10px_rgba(60,40,20,0.35)]">
            Hey, i&apos;m <NameSwap />
            <span aria-hidden="true" className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b border-line bg-bg" />
          </div>
          <Mascot start="coffee" className="mx-auto w-[168px]" />
          <div className="mt-3 grid justify-items-center gap-6">
            {/* hero copy taken from Sanskriti's Framer portfolio ("New folio 2026") */}
            <h1 className="font-serif text-h1m text-balance text-head md:-mx-16 md:text-h1">
              a designer by craft, an engineer by education. <br className="hidden md:block" />
              <span className="font-worn">a builder by curiosity.</span>
            </h1>
            <p className="printed max-w-[62ch] text-base text-pretty">
              A product designer at AppX (YC&apos;21). I work across <Keyword tools={["figma", "photoshop", "illustrator"]}>visual design</Keyword>,{" "}
              <Keyword>UX</Keyword> and <Keyword>motion</Keyword>, helping startups take ideas from 0 to 1. With a background in
              computer science, I&apos;m also exploring <Keyword>AI-assisted development</Keyword> and building things beyond the
              design canvas.
            </p>
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
