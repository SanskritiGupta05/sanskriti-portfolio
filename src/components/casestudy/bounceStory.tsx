import Image from "next/image";
import type { ReactNode } from "react";

// Pieces for the Bounce Daily story (v4): soft #F8F8F8 canvases, phones with warm shadows,
// tactile Before / After pills, the journey flip, where KYC could sit, and the PM's words.
// Screens live in public/assets/cases/bounce/v4 (revamped, Android status bars) and v2/old (old app).

const SIZES: Record<string, [number, number]> = {
  "v4/city-unavailable": [450, 966],
  "v4/dues": [440, 956],
  "v4/home-active": [448, 1220],
  "v4/home-collect": [448, 1258],
  "v4/home-ended": [448, 1157],
  "v4/home-ending": [448, 1220],
  "v4/home-km-low": [448, 1220],
  "v4/home-ready": [448, 1209],
  "v4/hub-map": [440, 956],
  "v4/hub-sold-out": [450, 966],
  "v4/intro-1": [401, 860],
  "v4/intro-2": [401, 860],
  "v4/intro-3": [401, 860],
  "v4/kyc-approved": [448, 1159],
  "v4/kyc-rejected": [448, 1260],
  "v4/kyc-review": [448, 1157],
  "v4/location": [440, 956],
  "v4/loyalty": [328, 1400],
  "v4/pay-fails": [440, 956],
  "v4/pay-success": [440, 956],
  "v4/pay": [440, 956],
  "v4/plan": [449, 978],
  "v4/scooter": [449, 965],
  "v4/switch-sheet": [449, 978],
};

export type Shot = { k: string; alt: string; label?: string };

// one phone: the screen with a soft rounded edge and a warm shadow; old screens sit a little faded
export function Device({ k, alt, label, width = 200 }: Shot & { width?: number }) {
  const old = k.startsWith("old/");
  const [w, h] = SIZES[k] ?? [585, 1301];
  const src = old ? `/assets/cases/bounce/v2/${k}.webp` : `/assets/cases/bounce/${k}.webp`;
  // tall home screens are cropped to a phone's height so every phone in a row lines up
  return (
    <figure className="grid shrink-0 content-start gap-2.5" style={{ width }}>
      <div
        className={`aspect-[440/956] overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.06] ${
          old
            ? "grayscale-[30%] shadow-[0_1px_2px_rgba(60,40,20,0.08),0_14px_26px_-18px_rgba(60,40,20,0.45)]"
            : "shadow-[0_1px_2px_rgba(60,40,20,0.08),0_24px_40px_-22px_rgba(60,40,20,0.5)]"
        }`}
      >
        <Image src={src} alt={alt} width={w} height={h} sizes={`${width * 2}px`} className="block h-full w-full object-cover object-top" />
      </div>
      {label && <figcaption className="text-center text-[13px] leading-snug text-muted-foreground">{label}</figcaption>}
    </figure>
  );
}

export function Pill({ kind, children }: { kind: "before" | "after" | "plain"; children: ReactNode }) {
  const cls =
    kind === "before"
      ? "skeu-sunk text-muted-foreground"
      : kind === "after"
        ? "skeu-red text-[#a8432d] dark:text-[#f0a08c]"
        : "skeu text-ink";
  return <span className={`${cls} inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase`}>{children}</span>;
}

// the grey stage every visual sits on, with a quiet caption underneath
export function Canvas({ children, caption, className = "" }: { children: ReactNode; caption?: string; className?: string }) {
  return (
    <figure className="grid min-w-0 gap-3">
      <div className={`min-w-0 rounded-[28px] bg-[#F8F8F8] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(0,0,0,0.03)] sm:px-10 sm:py-12 dark:bg-surface ${className}`}>
        {children}
      </div>
      {caption && <figcaption className="max-w-[64ch] text-[13px] leading-snug text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

// a row of phones that scrolls sideways on small screens
export function Row({ items, width = 190 }: { items: Shot[]; width?: number }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pt-1 pb-4 [scrollbar-width:thin] sm:-mx-10 sm:px-10">
      <div className="mx-auto flex w-max items-start gap-5">
        {items.map((s) => (
          <Device key={s.k} {...s} width={width} />
        ))}
      </div>
    </div>
  );
}

// the old screen(s) beside the new ones, each side under its pill
export function BeforeAfter({ before, after, caption, width = 180 }: { before: Shot[]; after: Shot[]; caption?: string; width?: number }) {
  return (
    <Canvas caption={caption}>
      <div className="-mx-5 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:-mx-10 sm:px-10">
        <div className="mx-auto flex w-max items-start gap-8 sm:gap-12">
          <div className="grid justify-items-start gap-4">
            <Pill kind="before">Before</Pill>
            <div className="flex gap-4">
              {before.map((s) => (
                <Device key={s.k} {...s} width={width} />
              ))}
            </div>
          </div>
          <div className="grid justify-items-start gap-4">
            <Pill kind="after">After</Pill>
            <div className="flex gap-4">
              {after.map((s) => (
                <Device key={s.k} {...s} width={width} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

// a chapter: the plain section name, then the takeaway as a big serif line
export function Chapter({ id, name, takeaway, children }: { id: string; name: string; takeaway: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="grid min-w-0 scroll-mt-16 gap-6">
      <span className="label tracking-[0.18em]">{name}</span>
      <h2 className="-mt-2 max-w-[26ch] font-serif text-h2m leading-[1.15] text-balance text-head md:text-h2">{takeaway}</h2>
      {children}
    </section>
  );
}

// one step of the journey: number, step name, its own takeaway
export function Step({ id, n, name, takeaway, children }: { id: string; n: number; name: string; takeaway: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="grid min-w-0 scroll-mt-16 gap-5">
      <div className="flex items-center gap-3">
        <span className="skeu-red grid size-8 place-items-center rounded-full text-sm font-semibold text-[#a8432d] tabular-nums dark:text-[#f0a08c]">{n}</span>
        <span className="label tracking-[0.16em]">{name}</span>
      </div>
      <h3 className="max-w-[30ch] text-[24px] leading-[1.25] font-semibold tracking-[-0.01em] text-balance text-head md:text-[28px]">{takeaway}</h3>
      {children}
    </section>
  );
}

// old order vs new order, with each step tagged as asking effort or giving value
export function JourneyFlip() {
  const rows: { label: string; steps: [string, "effort" | "value"][]; old?: boolean }[] = [
    {
      label: "Old journey",
      old: true,
      steps: [
        ["Sign up", "effort"],
        ["Details and documents", "effort"],
        ["Wait", "effort"],
        ["Find a hub", "value"],
        ["Choose a plan", "value"],
        ["Pay", "effort"],
      ],
    },
    {
      label: "New journey",
      steps: [
        ["Discover", "value"],
        ["Choose", "value"],
        ["Verify", "effort"],
        ["Pay", "effort"],
        ["Ride", "value"],
        ["Manage", "value"],
        ["Renew", "value"],
      ],
    },
  ];
  return (
    <Canvas caption="The same app, reordered. Riders now see what they're getting before the app asks anything of them.">
      <div className="grid gap-8">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-3">
            <Pill kind={r.old ? "before" : "after"}>{r.label}</Pill>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
              {r.steps.map(([s, kind], i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3.5 py-1.5 text-sm ${
                      kind === "value" ? "skeu text-ink" : "skeu-sunk text-muted-foreground"
                    } ${r.old ? "opacity-80" : ""}`}
                  >
                    {kind === "value" && <span aria-hidden="true" className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-[#2e9e5b]" />}
                    {s}
                  </span>
                  {i < r.steps.length - 1 && (
                    <span aria-hidden="true" className="text-muted-foreground">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
        <div className="flex flex-wrap gap-5 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="skeu inline-block h-3.5 w-6 rounded-full" />
            Gives the rider something
          </span>
          <span className="flex items-center gap-2">
            <span className="skeu-sunk inline-block h-3.5 w-6 rounded-full" />
            Asks the rider for effort
          </span>
        </div>
      </div>
    </Canvas>
  );
}

// every place KYC could sit, and the one we chose
export function KycSpots() {
  const spots = [
    { at: "During sign-up", why: "The old app: documents before any value" },
    { at: "Before choosing a hub", why: "Still no idea what they'd be getting" },
    { at: "Approved before paying", why: "Hours of waiting; the hub can sell out" },
    { at: "Submitted right before paying", why: "About 2 minutes, no waiting", chosen: true },
    { at: "After paying", why: "Refunds, and riders turned away at pick-up" },
  ];
  return (
    <Canvas caption="Every place KYC could sit on the journey, and why each one was ruled in or out.">
      <ol className="grid gap-3 sm:grid-cols-5 sm:gap-3">
        {spots.map((s) => (
          <li key={s.at} className={`grid content-start gap-2 rounded-2xl p-4 ${s.chosen ? "skeu-red" : "skeu-sunk"}`}>
            <span
              aria-hidden="true"
              className={`grid size-6 place-items-center rounded-full text-xs font-bold ${s.chosen ? "bg-[#2e9e5b] text-white" : "bg-black/[0.06] text-muted-foreground dark:bg-white/10"}`}
            >
              {s.chosen ? "✓" : "×"}
            </span>
            <span className={`text-sm leading-snug font-semibold ${s.chosen ? "text-[#a8432d] dark:text-[#f0a08c]" : "text-ink"}`}>{s.at}</span>
            <span className="text-[13px] leading-snug text-muted-foreground">{s.why}</span>
          </li>
        ))}
      </ol>
    </Canvas>
  );
}

// the product manager's words, on a soft tactile card
export function Testimonial({ children, by }: { children: ReactNode; by: string }) {
  return (
    <figure className="skeu relative grid gap-4 rounded-[24px] px-6 pt-10 pb-6 sm:px-9">
      <span aria-hidden="true" className="absolute top-3 left-6 font-serif text-[64px] leading-none text-[#c8553b]/40 sm:left-8">
        “
      </span>
      <blockquote className="font-serif text-[19px] leading-[1.55] text-pretty text-head sm:text-[21px]">{children}</blockquote>
      <figcaption className="label tracking-[0.14em]">{by}</figcaption>
    </figure>
  );
}

// a wide image (flow map, illustration set) on the grey canvas, opening full size in a new tab
export function Wide({ src, w, h, alt, caption }: { src: string; w: number; h: number; alt: string; caption?: string }) {
  return (
    <Canvas caption={caption} className="!px-3 !py-3 sm:!px-4 sm:!py-4">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.05]">
        <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 1100px) 900px, 100vw" className="block h-auto w-full" />
      </a>
    </Canvas>
  );
}
