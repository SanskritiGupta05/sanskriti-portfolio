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
          {/* the mascot with a speech bubble at her upper left (on phones it sits above her);
              her name drifts into katakana and back */}
          <div className="relative mx-auto w-fit">
            <div className="relative mx-auto mb-3 w-fit rounded-2xl border border-line bg-bg px-4 py-2 text-sm leading-5 text-ink shadow-[0_6px_14px_-9px_rgba(60,40,20,0.35)] md:absolute md:top-0 md:right-full md:mr-[-6px] md:mb-0">
              Hey, i&apos;m
              <br />
              <NameSwap />
              <span aria-hidden="true" className="absolute -bottom-[5px] left-1/2 size-2.5 -translate-x-1/2 rotate-45 border-r border-b border-line bg-bg md:right-6 md:left-auto md:translate-x-0" />
            </div>
            <Mascot start="coffee" className="mx-auto w-[168px]" />
          </div>
          <div className="mt-3 grid justify-items-center gap-4">
            {/* hero copy taken from Sanskriti's Framer portfolio ("New folio 2026") */}
            <h1 className="font-serif text-h1m text-balance text-head md:-mx-16 md:text-h1">
              product design is my craft. <br />
              engineering is my foundation.{" "}
              <span className="font-worn">curiosity is my compass.</span>
            </h1>
            <p className="printed max-w-[62ch] text-base text-pretty">
              A product designer at AppX (YC&apos;21). I work across <Keyword tools={["figma", "photoshop", "illustrator"]}>visual design</Keyword>,{" "}
              <Keyword tools={["figjam", "cursor", "flow"]}>UX</Keyword> and <Keyword tools={["jitter", "figmaMotion", "claude"]}>motion</Keyword>, helping startups take ideas from 0 to 1. With a background in
              computer science, I&apos;m also exploring <Keyword tools={["claude", "cursorAI", "github", "xcode", "vscode"]}>AI-assisted development</Keyword> and building things beyond the
              design canvas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <SakuraButtonLink href="#resume" finish="raised">Résumé</SakuraButtonLink>
              <SakuraButtonLink href="#work" tone="paper" finish="raised">See work</SakuraButtonLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
