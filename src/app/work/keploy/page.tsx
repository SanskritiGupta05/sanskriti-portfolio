import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ticket } from "@/components/casestudy/pieces";
import Image from "next/image";
import { CaseStudyFrame, P, Quote, Section, type TocItem } from "@/components/casestudy/Margin";

export const metadata: Metadata = {
  title: "Keploy · Sanskriti",
  description: "Product and visual design for Keploy, an open-source test case generation platform for developers.",
};

// Keploy (early career), in the clipped-sheet case study layout.
// Copy and visuals are Sanskriti's own, from her Keploy boards in the Portfolio Figma file
// (section 1554:1985); Neha Gupta's words are from her Framer site. Nothing added.
// Images in public/assets/cases/keploy/.
type Img = { src: string; w: number; h: number; alt: string };
const k = (name: string, w: number, h: number, alt: string): Img => ({ src: `/assets/cases/keploy/${name}.webp`, w, h, alt });

const TOC: TocItem[] = [
  { id: "about", label: "Working for Keploy" },
  { id: "worked-on", label: "What I worked on" },
  { id: "product", label: "Product design" },
  { id: "illustrations", label: "Custom illustrations" },
  { id: "website", label: "Website illustrations" },
  { id: "email", label: "E-mail graphics" },
  { id: "marketing", label: "Marketing graphics" },
  { id: "social", label: "Social media assets" },
  { id: "vectors", label: "Other vector illustrations" },
  { id: "words", label: "Kind words" },
];

const WORKED_ON: [string, string[]][] = [
  ["Product Design", ["Revamped the VS Code extension UI.", "Improved Sign-up flow for a smoother onboarding.", "Worked on Navbar Assets."]],
  ["Marketing & Growth", ["Created custom illustrations for website and documentation.", "Designed email campaigns and event graphics.", "Contributed to pitch decks & flyers for clients and investors."]],
  ["Social Media Assets", ["Built visuals showcasing community milestones.", "Designed graphics for LinkedIn growth campaigns."]],
  ["Brand & Community", ["Maintained visual consistency across platforms.", "Built design templates to streamline future assets."]],
];

// her notes beside the first sketches, word for word
const SKETCH_NOTES: [string, string][] = [
  ["API Testing", "circuit-like visual connected blocks, with some blocks highlighted to represent “issues caught.”"],
  ["API Testing", "we can use code graphics then API test generation"],
  ["Unit Testing", "Puzzle blocks or simple blocks a speedometer type visual to represent full coverage a button in the middle with a hand clicking on it to represent one click testing."],
  ["Integration Testing", "glowing mock/test icon in the center. Arrows looping inwards and outwards from a central node, symbolizing interaction and replication. mock tests representation"],
];

// Her work shown as-is: no rounded frame, outline or backing (they boxed in artwork that has its own
// rounded corners), served unoptimized so Next doesn't re-compress it.
function Shot({ src, w, h, alt, caption }: { src: string; w: number; h: number; alt: string; caption?: string }) {
  return (
    <figure className="grid gap-2">
      <Image src={src} alt={alt} width={w} height={h} unoptimized className="block h-auto w-full" />
      {caption && <figcaption className="label">{caption}</figcaption>}
    </figure>
  );
}

function Grid({ items, cols = "sm:grid-cols-2" }: { items: Img[]; cols?: string }) {
  return (
    <div className={`grid items-start gap-4 ${cols}`}>
      {items.map((s) => (
        <Shot key={s.src} {...s} />
      ))}
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-4 font-serif text-h1m text-head">{children}</h3>;
}

export default function Keploy() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[826px] px-6">
        <Nav />
      </div>

      <CaseStudyFrame
        layout="sheet"
        toc={TOC}
        header={
          <header>
            <Link href="/work#early" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <span className="label mt-8 block">Early career · Freelance</span>
            <h1 className="mt-3 font-serif text-h2 text-head">Keploy</h1>
            <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">Open-source test case generation for developers.</p>
            <div className="mt-8">
              <Ticket
                kicker="Product and visual designer"
                text="Keploy is an open-source end-to-end test case generation platform that allows developers to generate tests straight from their API calls, without writing them manually."
                meta={[
                  { k: "My role", v: "Product and visual designer" },
                  { k: "Duration", v: "3 months" },
                  { k: "Scope", v: "Product, marketing, social, brand" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Shot src="/assets/cases/early-keploy.webp" w={1800} h={1324} alt="Keploy work at a glance" />
            </div>
          </header>
        }
      >
        <Section id="about" label="Working for Keploy" title="Built for speed, reliability, and a seamless developer experience.">
          <P>
            Keploy is an open-source end-to-end test case generation platform that allows developers to generate tests straight from their API calls, without writing
            them manually. It&apos;s built for speed, reliability, and making testing a seamless part of the developer experience.
          </P>
          <div className="skeu rounded-2xl p-6">
            <span className="label">Overall challenges</span>
            <p className="printed mt-3 text-sm leading-relaxed">
              Designing for developer-facing tools was no easy feat. It required a lot of brainstorming, constant iteration, and close collaboration with both
              developers &amp; stakeholders to ensure the designs genuinely communicated what Keploy is about.
            </p>
            <p className="printed mt-3 text-sm leading-relaxed">
              Understanding technical workflows and translating them into intuitive, visually engaging interfaces pushed me out of my comfort zone, but in the best way
              possible. This challenge turned out to be one of my biggest learning experiences, and I&apos;m grateful for it.
            </p>
          </div>
        </Section>

        <Section id="worked-on" label="What I worked on" title="Product, marketing, social and brand.">
          <ul className="grid gap-4 sm:grid-cols-2">
            {WORKED_ON.map(([head, items]) => (
              <li key={head} className="skeu rounded-2xl p-5">
                <span className="font-serif text-h1m text-head">{head}</span>
                <ul className="printed mt-3 grid gap-1.5 text-sm leading-relaxed">
                  {items.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#e8833a]">
                        ◆
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="product" label="Product design" title="VS Code extension, sign-up and dashboard.">
          <div className="max-w-[560px]">
            <Shot {...k("vscode-hero", 931, 931, "Welcome to Keploy in the VS Code extension: generate unit and integration tests")} />
          </div>
          <Sub>VS Code screens · dark mode + light mode</Sub>
          <Shot {...k("vscode-1", 1348, 708, "Keploy VS Code extension, dark mode")} />
          <Grid items={[k("vscode-2", 1337, 708, "Keploy VS Code extension, dark mode"), k("vscode-3", 1337, 708, "Keploy VS Code extension, light mode")]} />
          <Sub>Sign-up screen</Sub>
          <Shot {...k("signup", 1315, 750, "Welcome to Keploy Console sign-up screen")} />
          <Sub>Dashboard screen</Sub>
          <Shot {...k("dashboard", 1315, 935, "Keploy dashboard: generate tests")} />
        </Section>

        <Section id="illustrations" label="Custom illustrations" title="Technical accuracy, visual clarity.">
          <P>One of the most challenging yet rewarding tasks was crafting custom illustrations for the website.</P>
          <P>
            Designing for Keploy, a developer-focused tool, meant I had to strike the right balance between technical accuracy and visual clarity, all while ensuring
            the illustrations aligned with our brand aesthetics and tone.
          </P>
          <Sub>Card illustrations</Sub>
          <Shot {...k("card-illustrations", 1179, 837, "Card illustrations: Ease your testing journey")} />

          <Sub>Initial sketches</Sub>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {[k("sketch-1", 401, 161, "Sketch: API testing"), k("sketch-2", 401, 164, "Sketch: API testing"), k("sketch-3", 359, 204, "Sketch: Unit testing"), k("sketch-4", 339, 204, "Sketch: Integration testing")].map(
              (s, i) => (
                <figure key={s.src} className="grid gap-2">
                  <Shot {...s} />
                  <figcaption className="printed text-sm leading-relaxed">
                    <strong className="font-normal text-head">{SKETCH_NOTES[i][0]}:</strong> {SKETCH_NOTES[i][1]}
                  </figcaption>
                </figure>
              ),
            )}
          </div>

          <Sub>First ideation</Sub>
          <Grid cols="grid-cols-1 sm:grid-cols-3" items={[k("idea-a", 417, 311, "First ideation"), k("idea-b", 417, 311, "First ideation"), k("idea-c", 417, 311, "First ideation")]} />
          <Sub>Second ideation</Sub>
          <Grid
            cols="grid-cols-1 sm:grid-cols-3"
            items={[k("idea2-api", 422, 315, "Second ideation: API testing"), k("idea2-unit", 422, 315, "Second ideation: Unit testing"), k("idea2-integration", 422, 315, "Second ideation: Integration testing")]}
          />
          <Sub>Final ideations</Sub>
          <Grid
            cols="grid-cols-1 sm:grid-cols-3"
            items={[k("final-api", 1023, 1200, "Final: API testing"), k("final-unit", 1023, 1200, "Final: Unit testing"), k("final-integration", 1023, 1200, "Final: Integration testing")]}
          />
        </Section>

        <Section id="website" label="Other website illustrations" title="For bento sections and beyond.">
          <Sub>For bento sections</Sub>
          <Shot {...k("web-1", 1189, 966, "Bento section: trusted, secure, community-driven")} />
          <Shot {...k("web-2", 1190, 371, "Bento section: security and compliance badges")} />
          <Shot {...k("web-bento", 1191, 894, "Bento section: Keploy trending on GitHub")} />
          <Sub>For other sections</Sub>
          <Shot {...k("web-other", 1143, 571, "Programs and recognitions section")} />
          <Shot {...k("web-3", 1148, 604, "Confident, scalable, reliable testing section")} />
          <Sub>The graphics</Sub>
          <Grid items={[k("graphic-1", 1325, 939, "Dark product graphic"), k("graphic-2", 1324, 943, "Dark product graphic"), k("graphic-3", 1325, 899, "Dark product graphic")]} />
        </Section>

        <Section id="email" label="E-mail graphics" title="Banners and flyers.">
          <Sub>E-mail banners</Sub>
          <Shot {...k("email-banner-1", 1308, 347, "E-mail banner: Record & mock live traffic")} />
          <Shot {...k("email-banner-2", 1308, 347, "E-mail banner: Record & mock live traffic")} />
          <Sub>E-mail flyers</Sub>
          <Grid items={[k("email-flyer-1", 642, 1161, "E-mail flyer: You're out of credits"), k("email-flyer-2", 643, 681, "E-mail flyer: Credits added")]} />
        </Section>

        <Section id="marketing" label="Marketing graphics" title="Pitch decks and advertisements.">
          <Sub>Pitch deck for clients</Sub>
          <Shot {...k("pitch-deck", 1344, 866, "Pitch deck for clients (confidential, blurred)")} caption="Confidential 🔐" />
          <Sub>Website advertisements</Sub>
          <Shot {...k("web-ads", 1320, 1171, "Website advertisements: Get to 90% coverage fast")} />
          <Sub>LinkedIn advertisements</Sub>
          <Grid items={[k("linkedin-1", 1273, 1273, "LinkedIn ad: 100+ working API tests"), k("linkedin-2", 1271, 1271, "LinkedIn ad: Get to 90% coverage fast")]} />
        </Section>

        <Section id="social" label="Social media assets" title="Community milestones.">
          <Grid items={[k("social-1", 1263, 747, "VS Code extension crossed 255K+ installs"), k("social-2", 1267, 749, "VS Code extension crossed 255K+ installs, dark")]} />
          <Grid items={[k("social-3", 1267, 951, "Keploy is #1 on GitHub"), k("social-4", 1265, 807, "We have surpassed Rest Assured")]} />
          <Shot {...k("social-5", 1257, 707, "Keploy picked up G2 Spring 2025 badges")} />
        </Section>

        <Section id="vectors" label="Other vector illustrations">
          <Grid items={[k("vector-1", 999, 666, "Vector: auto-generate tests"), k("vector-2", 759, 629, "Vector: Keploy savings"), k("vector-3", 1123, 584, "Vector: approve or reject tests"), k("vector-4", 1000, 568, "Vector: test checklist")]} />
        </Section>

        <Section id="words" label="Kind words">
          <Quote>&ldquo;Her ownership, reliability, and attention to detail make her someone I&apos;d happily recommend to any product team.&rdquo;</Quote>
          <P>
            Sanskriti has been an absolute pleasure to work with. She consistently delivers high-quality work on time and brings a deep understanding of the developer
            tools ecosystem, which reflects in every design decision she makes. Beyond strong visual design skills, she approaches problems with a product mindset,
            collaborates seamlessly with engineering, and takes feedback exceptionally well.
          </P>
          <span className="label">Neha Gupta, Co-Founder @ Keploy</span>
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
