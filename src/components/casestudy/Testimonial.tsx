import Image from "next/image";
import type { ReactNode } from "react";

// A client testimonial card (first made for Keploy, then shared): a soft skeu card with a large faint
// quote mark in the project's colour, a pull line in Redaction, the full words in Courier, then a dashed
// divider with the person's photo, name, role and the company logo. Words and photos are her clients'
// own, from her Framer testimonial cards.
export function Testimonial({
  pull,
  children,
  name,
  role,
  photo,
  logo,
  quoteColor = "#c8553b",
}: {
  pull: ReactNode;
  children: ReactNode;
  name: string;
  role: string;
  photo: string;
  logo?: { src: string; w: number; h: number; alt: string; className?: string };
  quoteColor?: string;
}) {
  return (
    <figure className="skeu relative overflow-hidden rounded-3xl px-6 pt-10 pb-6 sm:px-10 sm:pt-12">
      <span
        aria-hidden="true"
        className="absolute top-2 left-5 font-serif text-[96px] leading-none opacity-35 sm:left-8"
        style={{ color: quoteColor }}
      >
        &ldquo;
      </span>
      <blockquote className="relative grid gap-5">
        <p className="max-w-[30ch] font-serif text-h1 text-balance text-head sm:text-[28px] sm:leading-snug">{pull}</p>
        <p className="printed max-w-[64ch] text-sm leading-relaxed">{children}</p>
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-line pt-5">
        <span className="flex items-center gap-3">
          <Image
            src={photo}
            alt={name}
            width={320}
            height={320}
            unoptimized
            className="size-12 rounded-full object-cover ring-2 ring-white shadow-[0_4px_10px_-4px_rgba(60,40,20,0.4)]"
          />
          <span className="grid">
            <span className="font-serif text-lg leading-tight text-head">{name}</span>
            <span className="text-sm text-muted-foreground">{role}</span>
          </span>
        </span>
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            unoptimized
            className={logo.className ?? "h-6 w-auto mix-blend-multiply"}
          />
        )}
      </figcaption>
    </figure>
  );
}
