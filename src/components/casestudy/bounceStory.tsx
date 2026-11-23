import Image from "next/image";
import type { ReactNode } from "react";

// Pieces for the Bounce Daily story page. They follow her Figma v4 frame (file eJ4fYjVQ…, page
// "Case study · web page", frame 1312:9945) one to one: a serif section name, an italic lead line
// on a red rule, mono body text, her composed figures (exported 2× to public/assets/cases/bounce/v4/figures)
// with a small mono caption, numbered journey steps, the tl;dr cards and the product manager's words.

// a section: serif name, then the italic lead line on a thin red rule
export function Chapter({ id, name, lead, children }: { id: string; name: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="grid min-w-0 scroll-mt-16 gap-5">
      <h2 className="font-serif text-[30px] leading-[1.14] text-head md:text-[36px]">{name}</h2>
      {lead && <p className="border-l-2 border-[#c8553b] pl-[18px] font-serif text-[21px] leading-snug text-head italic md:text-[24px]">{lead}</p>}
      {children}
    </section>
  );
}

// one step of the journey: "1. Onboarding", then its own serif line
export function Step({ id, label, title, children }: { id: string; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="grid min-w-0 scroll-mt-16 gap-4">
      <span className="label tracking-[0.14em]">{label}</span>
      <h3 className="-mt-1 font-serif text-[24px] leading-[1.2] text-balance text-head md:text-[28px]">{title}</h3>
      {children}
    </section>
  );
}

// one of her figures, as composed in Figma, with its caption
export function Fig({ name, h, alt, caption, href }: { name: string; h: number; alt: string; caption?: string; href?: string }) {
  const img = (
    <Image
      src={`/assets/cases/bounce/v4/figures/${name}.webp`}
      alt={alt}
      width={1792}
      height={h}
      sizes="(min-width: 1100px) 900px, 100vw"
      className="block h-auto w-full rounded-[20px]"
    />
  );
  return (
    <figure className="grid min-w-0 gap-3">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {img}
        </a>
      ) : (
        img
      )}
      {caption && <figcaption className="printed text-[13px] leading-[20px] text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

// tl;dr: four white cards in two columns
export function Tldr({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="grid gap-3">
      <span className="label normal-case tracking-normal">tl;dr</span>
      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.k} className="grid content-start gap-2.5 skeu rounded-2xl px-5 py-5">
            <dt className="label tracking-[0.14em]">{i.k}</dt>
            <dd className="printed text-[15px] leading-[24px] text-ink">{i.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// the product manager's words, on a soft grey card
export function Testimonial({ children, by }: { children: ReactNode; by: string }) {
  return (
    <figure className="grid gap-4 rounded-[20px] bg-[#F8F8F8] px-6 py-6 shadow-[0_10px_24px_-16px_rgba(60,40,20,0.35)] sm:px-7 dark:bg-surface">
      <blockquote className="font-serif text-[19px] leading-[1.5] text-pretty text-head italic sm:text-[21px]">“{children}”</blockquote>
      <figcaption className="label tracking-[0.14em]">{by}</figcaption>
    </figure>
  );
}
