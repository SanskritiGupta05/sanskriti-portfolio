import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, ChartPie, Megaphone, MonitorPlay, Newspaper, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ticket } from "@/components/casestudy/pieces";
import { Mark } from "@/components/casestudy/Mark";
import { CaseStudyFrame, Note, P, Quote, Section, type TocItem } from "@/components/casestudy/Margin";

export const metadata: Metadata = {
  title: "GeeksforGeeks · Sanskriti",
  description: "Graphic design internship at GeeksforGeeks: article banners, YouTube thumbnails, Google ads and more.",
};

// GeeksforGeeks (early career), in the clipped-sheet case study layout.
// Copy and visuals are Sanskriti's own, from her GFG portfolio boards in the Portfolio Figma file
// (section 1554:1948) and her Framer site; nothing added. Images in public/assets/cases/gfg/.
const g = (name: string, w: number, h: number) => ({ src: `/assets/cases/gfg/${name}.webp`, w, h });

const TOC: TocItem[] = [
  { id: "working", label: "Working at GFG" },
  { id: "portfolio", label: "What I contributed" },
  { id: "ads", label: "Google ads" },
  { id: "banners", label: "Article banners" },
  { id: "banners-other", label: "More article banners" },
  { id: "thumbnails", label: "YouTube thumbnails" },
  { id: "highlight", label: "The highlight" },
];

// each card gets its own soft colour and a matching icon (her ask: colourful)
const CARD_STYLE: Record<string, { icon: LucideIcon; tint: string; ink: string }> = {
  "Article banners": { icon: Newspaper, tint: "#E9F6EC", ink: "#2F8D46" },
  "YouTube thumbnails": { icon: MonitorPlay, tint: "#FDECEC", ink: "#D93A3A" },
  "Google advertisements": { icon: Megaphone, tint: "#EAF1FD", ink: "#2F6FE0" },
  "Monthly event creatives": { icon: CalendarDays, tint: "#FFF3DE", ink: "#D9871A" },
  "Infographics & more": { icon: ChartPie, tint: "#F1ECFB", ink: "#7A4FD6" },
};

const CONTRIBUTIONS: [string, string][] = [
  ["Article banners", "Designed eye-catching visuals for the newly introduced UX/UI and graphic design categories, making them stand out for readers."],
  ["YouTube thumbnails", "Created engaging thumbnails to enhance video click-through rates."],
  ["Google advertisements", "Developed ad creatives that aligned with the brand's vision and boosted campaign effectiveness."],
  ["Monthly event creatives", "Delivered designs for events, ensuring consistent branding and engagement."],
  ["Infographics & more", "Produced detailed infographics and diverse creatives to support content strategies."],
];

const OFFICE = [
  { src: "/assets/cases/gfg/office-logo-wall.webp", w: 900, h: 1200, alt: "The GeeksforGeeks logo wall at the office" },
  { src: "/assets/cases/gfg/office-selfie.webp", w: 675, h: 1200, alt: "A mirror selfie at the GeeksforGeeks office" },
  { src: "/assets/cases/gfg/office-desk.webp", w: 1200, h: 900, alt: "My desk, with a plant and two figurines" },
  { src: "/assets/cases/gfg/office-floor.webp", w: 900, h: 1200, alt: "The office floor with rows of desks" },
  { src: "/assets/cases/gfg/office-desk-view.webp", w: 675, h: 1200, alt: "The view from my desk" },
];

const ADS = [
  { ...g("ad-react", 250, 250), alt: "React course ad" },
  { ...g("ad-dsa", 250, 250), alt: "DSA with JavaScript course ad" },
  { ...g("ad-cpp", 250, 250), alt: "Master C++ Programming ad" },
  { ...g("ad-premium", 300, 250), alt: "GeeksforGeeks Premium ad: Master coding with us" },
];

const THUMBS = [
  { ...g("yt-technical-interviews", 1116, 628), alt: "Thumbnail: Trends in technical interviews you should know" },
  { ...g("yt-maxima-minima", 1920, 1080), alt: "Thumbnail: Maxima & minima" },
  { ...g("yt-vector-spaces", 1920, 1080), alt: "Thumbnail: Vector spaces" },
  { ...g("yt-geometric-distribution", 1920, 1080), alt: "Thumbnail: Geometric distribution" },
  { ...g("yt-definite-integral", 1920, 1080), alt: "Thumbnail: Definite integral" },
];

const BANNERS = [
  { ...g("banner-interactive-design", 1000, 470), alt: "Banner: What is interactive design" },
  { ...g("banner-visual-design", 1000, 470), alt: "Banner: Visual design" },
  { ...g("banner-figma-tutorial", 1000, 470), alt: "Banner: Figma tutorial" },
  { ...g("banner-prototypes", 1000, 470), alt: "Banner: Prototypes in Figma" },
  { ...g("banner-accessibility", 1000, 470), alt: "Banner: Accessibility in web design" },
  { ...g("banner-color-theory", 1000, 470), alt: "Banner: Color theory" },
  { ...g("banner-color-trends", 1000, 470), alt: "Banner: Top color trends for 2024" },
  { ...g("banner-canva-background", 1000, 470), alt: "Banner: How to add a custom background in Canva" },
  { ...g("banner-canva-shapes", 1000, 470), alt: "Banner: How to insert shapes in Canva" },
];

const BANNERS_OTHER = [
  { ...g("banner-netflix", 1000, 470), alt: "Banner: How does Netflix make money?" },
  { ...g("banner-data-science", 1000, 470), alt: "Banner: Data science applications" },
  { ...g("banner-embed", 1000, 470), alt: "Banner: How to embed almost anything in your website" },
  { ...g("banner-discord", 1000, 470), alt: "Banner: Top Discord servers for developers" },
];

// Her work shown as-is: square corners and no outline (rounded corners clipped the artwork, and an outline boxed in artwork that has its own rounded corners),
// served unoptimized so Next doesn't re-compress the lossless files.
function Shot({ src, w, h, alt, caption, native = false }: { src: string; w: number; h: number; alt: string; caption?: string; native?: boolean }) {
  return (
    <figure className="grid gap-2">
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        unoptimized
        className={`block h-auto ${native ? "w-full max-w-[250px]" : "w-full"}`}
      />
      {caption && <figcaption className="label">{caption}</figcaption>}
    </figure>
  );
}

function CardIcon({ name }: { name: string }) {
  const st = CARD_STYLE[name];
  if (!st) return null;
  const Icon = st.icon;
  return (
    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]" style={{ color: st.ink }}>
      <Icon size={18} strokeWidth={1.8} />
    </span>
  );
}

// the tools she used day to day, with their official logos (public/assets/tools/, from Wikimedia Commons)
const TOOLS = [
  { name: "Adobe Photoshop", logo: "/assets/tools/photoshop.svg", w: 240, h: 234 },
  { name: "Adobe Illustrator", logo: "/assets/tools/illustrator.svg", w: 240, h: 234 },
  { name: "Figma", logo: "/assets/tools/figma.svg", w: 200, h: 300 },
];

export default function GeeksforGeeks() {
  return (
    // green highlights on this page (GFG brand green, lightened), with the same taller band as Keploy
    // section labels styled as tickers (her ask, like Bounce): a glowing dot in the page green, then bold mono caps
    <div className="w-full [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]" style={{ "--scribble": "#2F8D46", "--scribble-fill": "#BFE6C8", "--marker-height": "13px" } as React.CSSProperties}>
      <div className="mx-auto max-w-[826px] px-6">
        <Nav />
      </div>

      <CaseStudyFrame
        layout="sheet"
        accent="#2F8D46"
        toc={TOC}
        header={
          <header>
            <Link href="/work#early" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <span className="label mt-8 block">Early career · 2024</span>
            <h1 className="mt-3 font-serif text-h2 text-head">GeeksforGeeks</h1>
            <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">Designing for growth at GeeksforGeeks, a game-changer in ed-tech.</p>
            <div className="mt-8">
              <Ticket
                kicker="Graphic design intern"
                text="During my time at GeeksforGeeks, I worked on a diverse range of design projects that allowed me to explore my creativity and hone my skills."
                meta={[
                  { k: "My role", v: "Graphic design intern" },
                  { k: "Duration", v: "6 months" },
                  { k: "Scope", v: "Thumbnails, banners, ads" },
                ]}
              />
            </div>
            <div className="mt-8">
              <span className="label">Tools I used day to day</span>
              <ul className="mt-3 flex flex-wrap gap-3">
                {TOOLS.map((t) => (
                  <li key={t.name} className="skeu flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5">
                    <Image src={t.logo} alt="" width={t.w} height={t.h} unoptimized className="h-6 w-auto" />
                    <span className="text-sm text-head">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <Shot src="/assets/cases/gfg/cover.webp" w={2128} h={1598} alt="Designing for growth at GeeksforGeeks" />
            </div>
          </header>
        }
      >
        <Section id="working" label="Working at GeeksforGeeks" title="From tech to design.">
          <div className="grid gap-4">
              <P>
                Shifting from <span className="text-[#2F8D46]">&ldquo;Tech to Design&rdquo;</span> was no easy feat, but I&apos;m incredibly thankful for{" "}
                <Mark type="marker">the head start GFG provided</Mark>. It&apos;s been an amazing
                experience working on diverse creatives &amp; ideas.
              </P>
              <P>
                I&apos;ve gained so much knowledge from the team, <Mark type="marker">lessons I&apos;ll carry with me moving forward</Mark>. Grateful to have collaborated with such passionate and
                creative individuals there!
              </P>
          </div>
          {/* her office photos, each on its own (from the GFG page of her Figma file), uncropped */}
          <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
            {OFFICE.map((o) => (
              <Image key={o.src} src={o.src} alt={o.alt} width={o.w} height={o.h} unoptimized className="block h-auto w-full break-inside-avoid" />
            ))}
          </div>
        </Section>

        <Section id="portfolio" label="What's in my GFG portfolio?" title="A diverse range of design projects.">
          {/* her words (2026-11-24), lightly tidied */}
          <P>
            During my tenure at GeeksforGeeks, I was responsible, as an intern, for{" "}
            <Mark type="marker">all the visual design and the thinking behind it</Mark>: what each banner needed to communicate, and making sure it looked
            visually appealing too.
          </P>
          <P>Here&apos;s a summary of what I contributed:</P>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CONTRIBUTIONS.map(([k, v]) => (
              <li key={k} className="skeu rounded-2xl p-5" style={{ background: `linear-gradient(180deg, #ffffff -40%, ${CARD_STYLE[k].tint} 100%)` }}>
                <span className="flex items-center gap-3">
                  <CardIcon name={k} />
                  <span className="font-serif text-h1m text-head">{k}</span>
                </span>
                <p className="printed mt-2 text-sm leading-relaxed">{v}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="ads" label="Google advertisements" title="Promoting courses and premium offerings.">
          <P>
            These designs were <Mark type="marker">created from scratch in Photoshop</Mark> to promote GeeksforGeeks&apos; courses and premium offerings.
          </P>
          <div className="grid grid-cols-2 items-start justify-items-start gap-4 sm:grid-cols-4">
            {ADS.map((s) => (
              <Shot key={s.src} {...s} native />
            ))}
          </div>
        </Section>

        <Section id="banners" label="Article banners" title="Making complex concepts more approachable.">
          <P>
            Designing article banners was <Mark type="marker">one of my core responsibilities</Mark> at GeeksforGeeks. Each banner was crafted to visually complement the article&apos;s topic,
            <Mark type="marker" order={1}>
              making complex concepts more approachable and engaging
            </Mark>
            .
          </P>
          {BANNERS.map((b) => (
            <Shot key={b.src} {...b} />
          ))}
          <Note label="Fun fact">
            All these article banners are live on the website! Just search for the article title, and you&apos;ll see the banner featured directly on the page.
          </Note>
          <Shot {...g("live-on-site", 1899, 867)} alt="The What is Interactive Design? banner live on a GeeksforGeeks article" />
        </Section>

        <Section id="banners-other" label="Article banners" title="Beyond design and UX/UI.">
          <P>Article banners for topics other than the design and UX/UI domain.</P>
          {BANNERS_OTHER.map((b) => (
            <Shot key={b.src} {...b} />
          ))}
        </Section>

        <Section id="thumbnails" label="YouTube thumbnails" title="Grab attention, say what the video is about.">
          <P>
            YouTube thumbnails were designed to{" "}
            <Mark type="marker">grab attention &amp; communicate the video&apos;s content effectively</Mark>. Each thumbnail is tailored to the topic, featuring
            bold typography, vibrant colors, &amp; relevant visuals to ensure clarity and engagement.
          </P>
          <Shot {...THUMBS[0]} />
          {THUMBS.slice(1).map((t) => (
            <Shot key={t.src} {...t} />
          ))}
        </Section>

        <Section id="highlight" label="The highlight of my journey" title="The GFG Premium landing page re-design.">
          <P>
            This was a pivotal project where I <Mark type="marker">revamped the product&apos;s landing page for its launch</Mark>. The result?{" "}
            <Mark type="marker" order={1}>
              Positive feedback from my design team lead and project manager
            </Mark>
            , praising the fresh approach and usability of my designs.
          </P>
          {/* from the GFG page of her Figma file (286:35) */}
          <Shot src="/assets/cases/gfg/premium-landing-page.webp" w={1057} h={4096} alt="The GeeksforGeeks Premium landing page re-design" />
          <Quote>&ldquo;I&apos;m incredibly thankful for the head start GFG provided.&rdquo;</Quote>
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
