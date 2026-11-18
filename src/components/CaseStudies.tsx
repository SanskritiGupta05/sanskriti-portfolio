// Primary case studies on the work sheet: a short intro, then three cards side by side
// (after Sanskriti's reference): a dark card with the project's banner (from her Framer site),
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
    <section aria-labelledby="work-title" className="min-h-[70vh] pt-20">
      <span className="label">Primary case studies</span>

      {/* the heading with a little pixel lucky cat waving beside it
          (pinned to the heading, so it doesn't push the heading away from the label) */}
      <div className="relative mt-3 w-fit">
        <h2 id="work-title" className="font-serif text-h2m text-head md:text-h2">
          From problems to shipped products.
        </h2>
        <LuckyCat className="absolute bottom-1 left-full ml-4 hidden md:block" px={1.9} />
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <p className="printed max-w-[58ch] text-pretty">
          A collection of products I&apos;ve helped shape, from early ideas and messy problems to thoughtful, real-world experiences.
        </p>
        <span className="label shrink-0">Selected work, 2025 — 2026</span>
      </div>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              className="group flex h-full flex-col rounded-[20px] bg-[#211d1b] p-2 text-[#f6efe6] shadow-[0_24px_40px_-28px_rgba(40,20,10,0.6)] transition duration-300 hover:-translate-y-1.5"
            >
              <span className="relative block aspect-[2880/1546] overflow-hidden rounded-[14px]">
                <Image src={p.img} alt="" fill sizes="(min-width: 768px) 280px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
              </span>
              <span className="flex flex-1 flex-col gap-3 px-3 pt-4 pb-3">
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-h1m leading-tight md:text-h1">{p.name}</span>
                  <span aria-hidden="true" className="mt-1 text-base text-[#f2a08c] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
                <span className="text-sm leading-relaxed text-[#f6efe6]/75">{p.line}</span>
                <span className="mt-auto flex flex-wrap gap-2 pt-1">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[#f6efe6]/20 px-3 py-1 text-sm text-[#f6efe6]/85">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
