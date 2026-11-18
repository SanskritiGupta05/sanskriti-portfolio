import { Nav } from "@/components/Nav";
import { Mascot } from "@/components/Mascot";
import { Footer } from "@/components/Footer";
import { SakuraButtonLink } from "@/components/ui/sakura-button";
import { NameSwap } from "@/components/NameSwap";
import { Keyword } from "@/components/Keyword";
import { WorkArc } from "@/components/work/WorkArc";
import { PaperStack } from "@/components/PaperStack";
import { CaseStudies } from "@/components/CaseStudies";

// One narrow centred column with wide empty margins on both sides (like Sam's and Mythili's sites).
// The lantern hangs outside it, from the page's top-right corner.
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      {/* the hero pins in place, then the work section slides up over it like a clipped sheet of paper */}
      <PaperStack
        hero={
          <>
            <Nav />

            <main>
              {/* Hero: the pixel mascot, then the intro */}
              <section className="pt-4 pb-2 text-center">
                {/* the mascot with a speech bubble at her upper left (on phones it sits above her);
              her name drifts into katakana and back */}
                <div className="relative mx-auto w-fit">
                  <div className="relative mx-auto mb-3 w-fit rounded-2xl border border-line bg-bg px-4 py-2 text-sm leading-5 text-ink shadow-[0_6px_14px_-9px_rgba(60,40,20,0.35)] md:absolute md:top-0 md:right-full md:mr-[-6px] md:mb-0">
                    Hey, i&apos;m
                    <br />
                    <NameSwap />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[5px] left-1/2 size-2.5 -translate-x-1/2 rotate-45 border-r border-b border-line bg-bg md:right-6 md:left-auto md:translate-x-0"
                    />
                  </div>
                  <Mascot start="coffee" className="mx-auto w-[168px]" />
                </div>
                <div className="mt-3 grid justify-items-center gap-4">
                  {/* hero copy taken from Sanskriti's Framer portfolio ("New folio 2026") */}
                  <h1 className="font-serif text-h1m text-balance text-head md:-mx-16 md:text-h1">
                    Product Design is my craft. <br />
                    Engineering is my foundation.{" "}
                    <span className="font-worn">Curiosity is my compass.</span>
                  </h1>
                  <p className="printed max-w-[62ch] text-base text-pretty">
                    Currently a product designer at{" "}
                    <strong className="font-normal whitespace-nowrap [-webkit-text-stroke:0.4px_currentColor] text-black dark:text-head">
                      AppX (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="mr-1 inline-block size-[0.95em] -translate-y-[0.08em] rounded-[2px] align-middle"
                      >
                        <path
                          fill="#F26522"
                          d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"
                        />
                      </svg>
                      YC&apos;21)
                    </strong>
                    . I work across{" "}
                    <Keyword tools={["figma", "photoshop", "illustrator"]}>
                      visual design
                    </Keyword>
                    , <Keyword tools={["figjam", "cursor", "flow"]}>UX</Keyword>{" "}
                    and{" "}
                    <Keyword tools={["jitter", "figmaMotion", "claude"]}>
                      motion
                    </Keyword>
                    , helping startups take ideas from 0 to 1. With a background
                    in computer science, I&apos;m also exploring{" "}
                    <Keyword
                      tools={[
                        "claude",
                        "cursorAI",
                        "github",
                        "xcode",
                        "vscode",
                      ]}
                    >
                      AI-assisted development
                    </Keyword>{" "}
                    and building things beyond the design canvas.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <SakuraButtonLink href="#resume" finish="raised">
                      Résumé
                    </SakuraButtonLink>
                    <SakuraButtonLink href="#work" tone="paper" finish="raised">
                      See work
                    </SakuraButtonLink>
                  </div>
                </div>
              </section>

              {/* work visuals fanned out under the hero */}
              <WorkArc />
            </main>
          </>
        }
      >
        <div className="mx-auto w-full max-w-[874px] px-6">
          {/* primary case studies */}
          <CaseStudies />
          <Footer />
        </div>
      </PaperStack>
    </div>
  );
}
