// Primary case studies on the work sheet: a short intro, then one row per project.
// Hovering a row fades the others and slides in an arrow. (Screens come later.)
import { LuckyCat } from "./LuckyCat";

const PROJECTS = [
  {
    name: "AppX (YC'21)",
    line: "Building and refining digital experiences across the AppX ecosystem, from product interfaces to design systems and brand experiences.",
    meta: "Product Design · 2026",
    href: "#",
  },
  {
    name: "Bounce Daily",
    line: "Rethinking the end-to-end scooter rental experience, making it easier for people to discover, book and get moving.",
    meta: "Product Design · 2025",
    href: "#",
  },
  {
    name: "eight.money",
    line: "Exploring the digital experience of a fintech product through thoughtful interfaces and product design.",
    meta: "Product Design · 0 to 1",
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

      <ul className="group/list mt-12 border-t border-line">
        {PROJECTS.map((p) => (
          <li key={p.name} className="border-b border-line transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100!">
            <a href={p.href} className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[1fr_auto] md:items-baseline">
              <span className="grid gap-2">
                <span className="flex items-baseline gap-3 font-serif text-h1m text-head md:text-h1">
                  {p.name}
                  <span aria-hidden="true" className="-translate-x-2 text-lg opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    ↗
                  </span>
                </span>
                <span className="printed max-w-[60ch] text-pretty">{p.line}</span>
              </span>
              <span className="label md:text-right">{p.meta}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
