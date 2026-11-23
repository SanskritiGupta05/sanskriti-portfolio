// Tier 3 of the work section, early career: where she started, before the case studies.
// One soft skeu card per role. Company, role, length and the line under it come from her
// Framer site ("Other case studies"); the heading and intro are her Framer copy too.
// No screenshots yet (none given for GeeksforGeeks or Dualite), so the cards are text only.

const ROLES = [
  {
    company: "GeeksforGeeks",
    role: "Graphic design intern",
    length: "6 months",
    line: "Article banners, YouTube thumbnails, Google ads, event creatives, infographics and a landing page redesign.",
  },
  {
    company: "Dualite",
    role: "Visual designer",
    length: "3 months",
    line: "Illustrations for the marketing team of an AI full-stack tool that turns prompts or design files into working apps.",
  },
  {
    company: "Keploy",
    role: "Product and visual designer",
    length: "3 months",
    line: "Open-source test-case generation for developers: the VS Code extension UI, the sign-up flow, illustrations, social and event graphics.",
  },
];

export function EarlyCareer() {
  return (
    <section aria-labelledby="early-title" className="pt-20">
      <span className="label">Early career</span>
      <h2 id="early-title" className="mt-3 font-serif text-h2m text-head md:text-h2">
        Different products. Different challenges.
      </h2>
      <p className="printed mt-4 text-pretty">
        A closer look at the work that pushed my thinking beyond the pixels.
      </p>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {ROLES.map((r, i) => (
          <li key={r.company} className="skeu flex flex-col gap-3 rounded-[20px] p-5 text-head">
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-serif text-h1m leading-tight md:text-h1">{r.company}</span>
            <span className="printed text-sm leading-relaxed">{r.line}</span>
            <span className="mt-auto flex flex-wrap gap-2 pt-1">
              <span className="skeu-chip rounded-full bg-bg px-3 py-1 text-sm text-ink">{r.role}</span>
              <span className="skeu-chip rounded-full bg-bg px-3 py-1 text-sm text-ink">{r.length}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
