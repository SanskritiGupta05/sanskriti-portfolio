import { Nav } from "@/components/Nav";
import { Mascot } from "@/components/Mascot";
import { Footer } from "@/components/Footer";
import { SakuraButtonLink } from "@/components/ui/sakura-button";

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
            <span className="label">Product designer · builds in code</span>
            <h1 className="font-serif text-h1m text-head md:text-h1">
              Hi, I&apos;m <span className="font-worn">Sanskriti</span>.
            </h1>
            <p className="printed text-lgm md:text-lg">
              I&apos;m a product designer at AppX, a YC-backed startup, and I build what I design. Before this: Keploy, Dualite
              and GeeksforGeeks. If I don&apos;t know something, I <span className="font-worn">learn it</span>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
