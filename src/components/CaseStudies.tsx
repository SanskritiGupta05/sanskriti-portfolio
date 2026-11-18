// Primary case studies on the work sheet: a short intro, then AppX as a full-width lead card
// and the other two side by side below it
// (after Sanskriti's reference): a white card with the project's banner (from her Framer site),
// the name with an arrow, one line, and the tags as small chips. Hovering lifts a card.
import Image from "next/image";
import { LuckyCat } from "./LuckyCat";

const PROJECTS = [
  {
    name: "AppX (YC'21)",
    line: "Building and refining digital experiences across the AppX ecosystem, from product interfaces to design systems and brand experiences.",
    tags: ["Product Design", "2026"],
    img: "/assets/cases/appx.webp",
    href: "#",
  },
  {
    name: "Bounce Daily",
    line: "Rethinking the end-to-end scooter rental experience, making it easier for people to discover, book and get moving.",
    tags: ["Product Design", "2025"],
    img: "/assets/cases/bounce-daily.webp",
    href: "#",
  },
  {
    name: "eight.money",
    line: "Exploring the digital experience of a fintech product through thoughtful interfaces and product design.",
    tags: ["Product Design", "0 → 1"],
    img: "/assets/cases/eight-money.webp",
    href: "#",
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
          // AppX leads: full width, banner on the left and the story on the right
          const lead = i === 0;
          return (
            <li key={p.name} className={lead ? "md:col-span-2" : ""}>
              <a
                href={p.href}
                className={`group flex h-full flex-col rounded-[20px] ${lead ? "md:flex-row md:items-stretch" : ""} border border-line bg-bg p-2 text-head shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-26px_rgba(60,40,20,0.42)]`}
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
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span
                  className={`flex flex-1 flex-col gap-3 px-3 pt-4 pb-3 ${lead ? "md:px-6 md:pt-5" : ""}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-serif text-h1m leading-tight md:text-h1">
                      {p.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-base text-[#c8553b] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
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
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
