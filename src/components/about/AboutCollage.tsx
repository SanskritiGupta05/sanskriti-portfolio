import Image, { type StaticImageData } from "next/image";
import { hand, Hi, PinnedPhoto, printPhoto } from "./paper";
import { Pixel } from "./pixel";
import portraitNow from "../../../public/assets/about/portrait-now.jpg";
import kidSchool from "../../../public/assets/about/kid-school.jpg";
import kidPhone from "../../../public/assets/about/kid-phone.jpg";
import kidPhone2 from "../../../public/assets/about/kid-phone-2.jpg";
import wisteria from "../../../public/assets/about/painting-wisteria.jpg";
import swans from "../../../public/assets/about/pastel-swans.jpg";

// The opening of the About page, after a magazine collage Sanskriti picked: her portrait in a white
// frame, with old photos and her artwork pinned around it. Photos are greyscale until hovered.
// Positions are percentages of the collage box, so the whole thing scales down on phones.
const pins: {
  src: StaticImageData;
  alt: string;
  box: string; // position + width (phone, then desktop)
  tilt: string;
}[] = [
  {
    src: kidSchool,
    alt: "Sanskriti as a little kid, ready for school with a backpack",
    box: "absolute left-[0%] top-[20%] w-[25%] md:left-[5%] md:top-[22%] md:w-[15%]",
    tilt: "-rotate-[4deg]",
  },
  {
    src: kidPhone,
    alt: "Sanskriti as a toddler pretending to talk on a phone",
    box: "absolute left-[-2%] top-[62%] w-[31%] md:left-[1%] md:top-[60%] md:w-[22%]",
    tilt: "rotate-[5deg]",
  },
  {
    src: wisteria,
    alt: "Sanskriti's painting of an anime character under wisteria at night",
    box: "absolute right-[-3%] top-[14%] w-[36%] md:right-[0%] md:top-[17%] md:w-[24%]",
    tilt: "rotate-[6deg]",
  },
  {
    src: kidPhone2,
    alt: "Sanskriti as a toddler looking at a phone",
    box: "absolute right-[0%] top-[44%] w-[27%] md:right-[4%] md:top-[47%] md:w-[19%]",
    tilt: "-rotate-[5deg]",
  },
  {
    src: swans,
    alt: "Sanskriti's oil-pastel sketch of two swans at sunset",
    box: "absolute right-[10%] top-[72%] w-[25%] md:right-[14%] md:top-[73%] md:w-[17%]",
    tilt: "rotate-[3deg]",
  },
];

export function AboutCollage() {
  return (
    <section className="relative pt-6 pb-16 md:pb-20">
      <div className="relative md:mt-12">
        {/* the handwritten title, overlapping the frame's top edge */}
        <h1
          className={`${hand.className} relative z-10 mb-1 text-center text-balance text-h2m leading-none text-head md:absolute md:top-0 md:right-0 md:left-0 md:mb-0 md:text-h2`}
        >
          still the kid who loves to draw
        </h1>

        {/* the collage box */}
        <div className="relative mx-auto aspect-[760/640] w-full max-w-[760px]">
          {/* the main frame */}
          <figure className="absolute top-[4%] left-[20%] w-[60%] md:top-[9%] bg-white p-[1.6%] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_18px_36px_-18px_rgba(40,30,20,0.45)] md:left-[25%] md:w-[50%]">
            <div className="group relative overflow-hidden">
              <Image
                src={portraitNow}
                alt="Sanskriti smiling, taking a mirror selfie with a red checked phone case"
                sizes="(min-width: 768px) 380px, 56vw"
                placeholder="blur"
                loading="eager"
                className={`block h-auto w-full ${printPhoto}`}
              />
              <figcaption
                className={`${hand.className} pointer-events-none absolute right-0 bottom-[6%] left-0 px-[17%] text-center text-base leading-tight md:px-3 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] md:text-lg`}
              >
                my mind never stops thinking
              </figcaption>
            </div>
          </figure>

          {/* her motto, as a sticky note taped into the collage's empty top-left corner */}
          <p
            className={`${hand.className} absolute top-[-2%] left-[-1%] z-10 w-[30%] -rotate-[5deg] bg-[#fff3c4] px-[3%] pt-[3.2%] pb-[2.4%] text-[15px] leading-[1.15] text-head shadow-[0_12px_20px_-12px_rgba(60,40,20,0.5)] md:top-[7%] md:left-[0%] md:w-[18%] md:text-[19px] dark:bg-[#3a3424]`}
          >
            <span
              aria-hidden="true"
              className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[4deg] bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            />
            If I don&apos;t know something, <span className="text-[#c8553b]">I learn it.</span>
          </p>

          {/* pinned photos */}
          {pins.map((p) => (
            <PinnedPhoto
              key={p.alt}
              {...p}
              sizes="(min-width: 768px) 190px, 36vw"
            />
          ))}
        </div>
      </div>

      {/* masthead line + the typed paragraph */}
      <div className="mt-10 grid gap-6 md:mt-6 md:grid-cols-[1fr_minmax(0,25rem)] md:items-end">
        <p className="order-2 flex flex-wrap items-center gap-2.5 md:order-1">
          <span className="label !text-ink">About</span>
          <span className="skeu-chip inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[13px] text-ink">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 text-[#c8553b]">
              <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11Z" fill="currentColor" />
              <circle cx="12" cy="10" r="2.4" fill="#fff" />
            </svg>
            Delhi NCR, India
          </span>
        </p>
        <p className="printed order-1 text-base text-ink md:order-2 md:text-justify md:[hyphens:auto]">
          A <Hi c="pink">designer</Hi> by role, a <Hi c="yellow">builder</Hi> by
          instinct and an <Hi c="blue">engineer</Hi> by degree. From product
          thinking and design systems to prototyping, AI <Pixel name="bot" />{" "}
          and code, I like working across the gaps between disciplines. These
          days that&apos;s as a product designer at{" "}
          <Hi c="orange">AppX (YC&apos;21)</Hi>.
        </p>
      </div>
    </section>
  );
}
