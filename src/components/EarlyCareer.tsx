// Tier 3 of the /work page (not on the home page), early career: where she started, before the case studies.
// One soft skeu card per role. Company, role, length and the line under it come from her
// Framer site ("Other case studies"); the heading and intro are her Framer copy too.
// Thumbnails are her Framer "Project Card" images for each (downloaded 2026-11-24,
// public/assets/cases/early-*.webp), shown 4:3 at the top of each card.
import Image from "next/image";
import Link from "next/link";

const ROLES: {
  company: string;
  role: string;
  img: string;
  length: string;
  line: string;
  href?: string;
}[] = [
  {
    company: "GeeksforGeeks",
    role: "Graphic design intern",
    img: "/assets/cases/early-gfg.webp",
    href: "/work/geeksforgeeks",
    length: "6 months",
    line: "Article banners, YouTube thumbnails, Google ads, event creatives, infographics and a landing page redesign.",
  },
  {
    company: "Dualite",
    role: "Visual designer",
    img: "/assets/cases/early-dualite.webp",
    href: "/work/dualite",
    length: "3 months",
    line: "Illustrations for the marketing team of an AI full-stack tool that turns prompts or design files into working apps.",
  },
  {
    company: "Keploy",
    role: "Product and visual designer",
    img: "/assets/cases/early-keploy.webp",
    href: "/work/keploy",
    length: "3 months",
    line: "Open-source test-case generation for developers: the VS Code extension UI, the sign-up flow, illustrations, social and event graphics.",
  },
];

export function EarlyCareer() {
  return (
    <section aria-labelledby="early-title" className="pt-20">
      <span className="label">Early career</span>
      <h2
        id="early-title"
        className="mt-3 font-serif text-h2m text-head md:text-h2"
      >
        Different products. Different challenges.
      </h2>
      <p className="printed mt-4 text-pretty">
        A closer look at the work that pushed my thinking beyond the pixels.
      </p>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {ROLES.map((r, i) => (
          <li key={r.company} className="flex">
            <Card href={r.href}>
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src={r.img}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </span>
              <span className="label px-3 pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex items-start justify-between gap-3 px-3 font-serif text-h1m leading-tight md:text-h1">
                {r.company}
                {r.href && (
                  <span
                    aria-hidden="true"
                    className="mt-1 text-base text-[#c8553b] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                )}
              </span>
              <span className="printed px-3 text-sm leading-relaxed">
                {r.line}
              </span>
              <span className="mt-auto flex flex-wrap gap-2 px-3 pt-1">
                <span className="skeu-chip rounded-full bg-bg px-3 py-1 text-sm text-ink">
                  {r.role}
                </span>
                <span className="skeu-chip rounded-full bg-bg px-3 py-1 text-sm text-ink">
                  {r.length}
                </span>
              </span>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

// a card that links to the role's case study when there is one
function Card({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const cls =
    "skeu group flex w-full flex-col gap-3 rounded-[20px] p-2 pb-5 text-head";
  return href ? (
    <Link href={href} className={`${cls} hover:-translate-y-1`}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}
