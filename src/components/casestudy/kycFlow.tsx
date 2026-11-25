import Image from "next/image";

// Design decision #3, under the KYC placement figure: the new flow as real screens, in order, each tagged
// with its step, so the chips above ("Find a hub → … → Pick up") can be seen as the app itself.
// Same Figma-style language as the figures: a green "After" section, frame names, thin arrows.

const HQ = "/assets/cases/bounce/v5/hq";
const V2 = "/assets/cases/bounce/v2/new";

const STEPS: { src: string; w: number; h: number; name: string; sub: string; tag?: "KYC here" | "New" }[] = [
  { src: `${HQ}/hub-new-map.webp`, w: 1320, h: 2868, name: "Find a hub", sub: "map, nearest first" },
  { src: `${HQ}/scooter-plan.webp`, w: 1341, h: 2929, name: "Choose scooter + plan", sub: "price per day" },
  { src: `${V2}/verify-ready.webp`, w: 660, h: 1434, name: "① KYC submit", sub: "about 2 min", tag: "KYC here" },
  { src: `${HQ}/pay-confirm.webp`, w: 1320, h: 2868, name: "② Pay", sub: "every charge listed" },
  { src: `${HQ}/pay-success.webp`, w: 1320, h: 2868, name: "Verified in background", sub: "no waiting", tag: "New" },
  { src: `${V2}/home-ready-collect.webp`, w: 660, h: 1875, name: "Pick up", sub: "hub staff check it" },
];

function Arrow() {
  return (
    <svg aria-hidden="true" width="20" height="12" viewBox="0 0 20 12" className="mt-[140px] shrink-0 text-[#0d99ff]">
      <path d="M1 6h16M13 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KycFlowScreens() {
  return (
    <figure
      className="m-0 mt-3 overflow-x-auto rounded-[10px] border border-[#bfe7c9] bg-[#f3fbf5] px-5 pt-4 pb-5 [scrollbar-width:thin]"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      <span className="inline-block rounded bg-[#14ae5c] px-2 py-[3px] text-[11px] font-medium text-white">
        After · the flow, screen by screen
      </span>
      <ol className="mt-4 flex min-w-[640px] items-start gap-1.5">
        {STEPS.map((s, i) => (
          <li key={s.name} className="contents">
            <div className="grid min-w-0 flex-1 basis-0 content-start gap-2">
              <div className="grid h-[50px] content-start gap-0.5">
                <span className="flex items-center gap-1 text-[11px] leading-tight font-semibold text-[#1e1e1e]">
                  {s.name}
                </span>
                <span className="flex items-center gap-1 text-[10px] leading-tight text-[#8c8c8c]">
                  {s.sub}
                  {s.tag && (
                    <span className="rounded-[3px] bg-[#14ae5c] px-1 py-px text-[9px] font-semibold text-white">{s.tag}</span>
                  )}
                </span>
              </div>
              <div
                className={`overflow-hidden rounded-[12px] bg-white ${s.tag ? "ring-[1.5px] ring-[#14ae5c]" : "ring-1 ring-black/[0.09]"}`}
                style={{ aspectRatio: "440 / 956" }}
              >
                <Image
                  src={s.src}
                  alt={`${s.name}: ${s.sub}`}
                  width={s.w}
                  height={s.h}
                  unoptimized
                  className="block h-full w-full object-cover object-top"
                />
              </div>
            </div>
            {i < STEPS.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-[11px] text-[#5c5c5c]">
        KYC sits right before paying, and is checked while the rider gets on with their day.
      </figcaption>
    </figure>
  );
}
