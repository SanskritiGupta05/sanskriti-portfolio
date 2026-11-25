// Primary case studies (home #work sheet, and tier 1 of the /work page): a short intro, then Bounce Daily as a full-width
// lead card and the other two side by side below it
// (after Sanskriti's reference): a white card with the project's banner (from her Framer site),
// the name with an arrow, one line, and the tags as small chips. Hovering lifts a card.
import Image from "next/image";
import { LuckyCat } from "./LuckyCat";

// Bounce Daily leads (full width); AppX and eight.money sit side by side below it.
// AppX has no case study page yet, so its card is "Coming soon" and doesn't link anywhere.
const PROJECTS: { name: string; line: string; tags: string[]; img: string; href?: string }[] = [
  {
    name: "Bounce Daily",
    line: "Rethinking the end-to-end scooter rental experience, making it easier for people to discover, book and get moving.",
    tags: ["Product Design", "2025"],
    img: "/assets/cases/bounce-daily.webp",
    href: "/work/bounce-daily",
  },
  {
    name: "AppX (YC'21)",
    line: "Building and refining digital experiences across the AppX ecosystem, from product interfaces to design systems and brand experiences.",
    tags: ["Product Design", "Coming soon"],
    img: "/assets/cases/appx.webp",
  },
  {
    name: "eight.money",
    line: "Exploring the digital experience of a fintech product through thoughtful interfaces and product design.",
    tags: ["Product Design", "0 → 1"],
    img: "/assets/cases/eight-money.webp",
    href: "/work/eight-money",
  },
];

export function CaseStudies() {
  return (
    <section aria-labelledby="work-title" className="pt-20">
      <span className="label">Primary case studies</span>

      {/* the heading with a little pixel lucky cat waving beside it
          (pinned to the heading, so it doesn't push the heading away from the label) */}
      <div className="relative mt-3 w-fit">
        <h2
          id="work-title"
          className="font-serif text-h2m text-head md:text-h2"
        >
          From problems to shipped products.
        </h2>
        <LuckyCat
          className="absolute bottom-1 left-full ml-4 hidden md:block"
          px={1.9}
        />
      </div>
      <p className="printed mt-4 text-pretty">
        A collection of products I&apos;ve helped shape, from early ideas and
        messy problems to thoughtful, real-world experiences.
      </p>

      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p, i) => {
          // Bounce Daily leads: full width, banner on the left and the story on the right
          const lead = i === 0;
          const Card = p.href ? "a" : "div";
          return (
            <li key={p.name} className={lead ? "md:col-span-2" : ""}>
              <Card
                {...(p.href ? { href: p.href } : {})}
                className={`group flex h-full flex-col rounded-[20px] ${lead ? "md:flex-row md:items-stretch" : ""} border border-line bg-bg p-2 text-head shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)] transition duration-300 ${p.href ? "hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-26px_rgba(60,40,20,0.42)]" : "cursor-default"}`}
              >
                <span
                  className={`relative block aspect-[2880/1546] shrink-0 overflow-hidden rounded-[14px] ${lead ? "md:w-[58%]" : ""}`}
                >
                  <Image
                    src={p.img}
                    alt=""
                    fill
                    sizes={
                      lead
                        ? "(min-width: 768px) 480px, 100vw"
                        : "(min-width: 768px) 410px, 100vw"
                    }
                    className={`object-cover transition duration-500 ${p.href ? "group-hover:scale-[1.04]" : ""}`}
                  />
                </span>
                <span
                  className={`flex flex-1 flex-col gap-3 px-3 pt-4 pb-3 ${lead ? "md:px-6 md:pt-5" : ""}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-serif text-h1m leading-tight md:text-h1">
                      {p.name.includes("YC") ? <WithYC name={p.name} /> : p.name}
                    </span>
                    {p.href && (
                      <span
                        aria-hidden="true"
                        className="mt-1 text-base text-[#c8553b] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    )}
                  </span>
                  <span className="printed text-sm leading-relaxed">
                    {p.line}
                  </span>
                  <span className="mt-auto flex flex-wrap gap-2 pt-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// "AppX (YC'21)" with the orange Y Combinator logo before "YC'21", like in the hero
function WithYC({ name }: { name: string }) {
  const [before, after] = name.split("YC");
  return (
    <span className="whitespace-nowrap">
      {before}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-1 inline-block size-[0.82em] -translate-y-[0.06em] rounded-[2px] align-middle">
        <path
          fill="#F26522"
          d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"
        />
      </svg>
      YC{after}
    </span>
  );
}
