// The footer's "hire me" sign-off, three placements to compare (lab page /lab/footer-socials):
//   sign    – a heading in the open space over the noren, like the shop's name above its door
//   slip    – a sushi-bar order slip pinned beside the noren ("1 × product designer")
//   closing – a quiet last line under the belt, where the page ends
export type SignOffVariant = "sign" | "slip" | "closing";

const LINE = (
  <>
    Hire me, so I can fund my dream <span className="font-worn">Japan trip.</span>
  </>
);

export function SignOffSign() {
  return (
    <div className="relative z-10 mx-auto mt-[24px] grid max-w-[560px] justify-items-center gap-2 px-6 text-center">
      <span className="label">Before you go</span>
      <p className="font-serif text-h2m text-balance text-head md:text-h2">{LINE}</p>
    </div>
  );
}

export function SignOffSlip() {
  return (
    <div className="relative z-10 mb-5 w-[176px] rotate-[3deg] md:absolute md:bottom-[36px] md:left-[calc(50%+132px)] md:mb-0">
      {/* the pin holding it up */}
      <span aria-hidden="true" className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f08a73,#b4321f)] shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
      <div className="bg-[#fffdf6] px-3.5 pt-3 pb-3.5 text-[#3b2a1e] shadow-[0_1px_2px_rgba(60,40,20,0.15),0_14px_22px_-14px_rgba(60,40,20,0.55)] [mask-image:linear-gradient(#000,#000)]">
        <div className="flex items-baseline justify-between border-b border-dashed border-[#3b2a1e]/30 pb-1.5 text-[10px] tracking-[0.08em] uppercase">
          <span>Order</span>
          <span>No. 2026</span>
        </div>
        <p className="mt-2 text-[12px] leading-[1.45]">1 × product designer</p>
        <p className="mt-1 font-serif text-[15px] leading-[1.3] italic">so I can fund my dream Japan trip ✈</p>
        <span className="mt-2.5 inline-block -rotate-[6deg] rounded-[3px] border-[1.5px] border-[#c8432e] px-1.5 py-px text-[11px] tracking-[0.12em] text-[#c8432e] uppercase">
          Hire me
        </span>
      </div>
    </div>
  );
}

export function SignOffClosing() {
  return (
    <div className="relative mx-auto grid max-w-[560px] justify-items-center gap-1.5 px-6 pt-10 pb-12 text-center">
      <p className="font-serif text-lgm text-balance text-head md:text-lg">{LINE}</p>
      <span className="text-sm text-muted-foreground">Thanks for stopping by ♡</span>
    </div>
  );
}
