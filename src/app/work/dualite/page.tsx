import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ticket } from "@/components/casestudy/pieces";
import { CaseStudyFrame, P, Section, type TocItem } from "@/components/casestudy/Margin";

export const metadata: Metadata = {
  title: "Dualite · Sanskriti",
  description: "Illustrations and marketing creatives for Dualite, an AI-powered full-stack development tool.",
};

// Dualite (early career), in the clipped-sheet case study layout, like GFG and Keploy.
// Copy and frames are Sanskriti's own, from her Framer page /work/dualite (the frames she placed there);
// that page's leftover Bounce template text ("Making it real", 60+ components, riders) is left out.
// Section names describe what each frame shows. Images in public/assets/cases/dualite/ (2400px wide).
const d = (name: string, w: number, h: number, alt: string) => ({ src: `/assets/cases/dualite/${name}.webp`, w, h, alt });

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "builder-fridays", label: "Builder Fridays" },
  { id: "podcast", label: "Design to Dev podcast" },
  { id: "demos", label: "Product demos" },
  { id: "posts", label: "Social posts" },
  { id: "thumbnails", label: "Video thumbnails" },
  { id: "campus", label: "Campus collab" },
];

// her work shown as-is: no frame or outline, full width, not re-compressed
function Shot({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  return <Image src={src} alt={alt} width={w} height={h} unoptimized className="block h-auto w-full" />;
}

export default function Dualite() {
  return (
    // contents in Redaction and ticker-style section labels, like the GFG and Keploy pages; Dualite's monochrome as the accent
    <div className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px] [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]">
      <div className="mx-auto max-w-[826px] px-6">
        <Nav />
      </div>

      <CaseStudyFrame
        layout="sheet"
        accent="#3A3A3A"
        toc={TOC}
        header={
          <header>
            <Link href="/work#early" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <span className="label mt-8 block">Early career · Freelance</span>
            <h1 className="mt-3 font-serif text-h2 text-head">Dualite</h1>
            <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">Illustrations for the marketing team of an AI full-stack tool.</p>
            <div className="mt-8">
              <Ticket
                kicker="Freelance designer"
                text="Dualite is an AI-powered full-stack development tool that turns plain-English prompts or design files into fully functional web and mobile applications."
                meta={[
                  { k: "My role", v: "Freelance Designer" },
                  { k: "Duration", v: "3 months" },
                  { k: "Scope", v: "Marketing illustrations" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Shot {...d("alpha-launch", 2400, 2516, "Dualite Alpha is now launched: the launch creative with the app")} />
            </div>
          </header>
        }
      >
        <Section id="overview" label="Overview">
          {/* her line from the Framer page, word for word apart from the capital I */}
          <P>All of the illustration that I made for marketing team of Dualite.</P>
        </Section>

        <Section id="builder-fridays" label="Builder Fridays" title="Episode creatives, in every size.">
          <Shot {...d("builder-fridays", 2400, 1124, "Builder Fridays, Episode 3: story, banner and post")} />
        </Section>

        <Section id="podcast" label="Design to Dev: The Podcast" title="Podcast covers.">
          <Shot {...d("podcast", 2400, 1466, "Design to Dev: The Podcast, episode 3 covers")} />
        </Section>

        <Section id="demos" label="Product demos" title="Built with alpha.">
          <Shot {...d("demo-thumbnails", 2400, 2125, "Demo video thumbnails: FinTech app, Figma import, marketplace, multiple APIs, finance dashboard, no-code builder")} />
        </Section>

        <Section id="posts" label="Social posts" title="Concept to launch, Figma to code.">
          <Shot {...d("social-posts", 2400, 1642, "Social posts: Move from concept to launch, and the Figma to Code masterclass")} />
        </Section>

        <Section id="thumbnails" label="Video thumbnails" title="Prompting, generative UI and more.">
          <Shot {...d("video-thumbnails", 2400, 1561, "Video thumbnails: how to prompt well, Figma to React, generative UI, comparisons")} />
        </Section>

        <Section id="campus" label="Campus collab" title="A birthday gift for BITSians.">
          <Shot {...d("bits-collab", 2400, 1310, "Dualite x BITS: Rohan's gift to all the BITSians")} />
          <Link href="/work#early" className="label mt-6 w-fit !text-ink underline-offset-4 hover:underline">
            ← Back to all work
          </Link>
        </Section>
      </CaseStudyFrame>

      <div className="mx-auto max-w-[826px]">
        <Footer />
      </div>
    </div>
  );
}
