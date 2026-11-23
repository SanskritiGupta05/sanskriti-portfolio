import Image, { type StaticImageData } from "next/image";
import { Nothing_You_Could_Do } from "next/font/google";
import deskNow from "../../../public/assets/about/desk-now.jpg";
import kidSchool from "../../../public/assets/about/kid-school.jpg";
import kidPhone from "../../../public/assets/about/kid-phone.jpg";
import kidPhone2 from "../../../public/assets/about/kid-phone-2.jpg";
import wisteria from "../../../public/assets/about/painting-wisteria.jpg";
import swans from "../../../public/assets/about/pastel-swans.jpg";

// handwriting for the scribbled lines on the collage (only used on the About page)
const hand = Nothing_You_Could_Do({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// The opening of the About page, after a magazine collage Sanskriti picked: one "now" photo in a white
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
    box: "left-[0%] top-[20%] w-[25%] md:left-[5%] md:top-[22%] md:w-[15%]",
    tilt: "-rotate-[4deg]",
  },
  {
    src: kidPhone,
    alt: "Sanskriti as a toddler pretending to talk on a phone",
    box: "left-[-2%] top-[62%] w-[31%] md:left-[1%] md:top-[60%] md:w-[22%]",
    tilt: "rotate-[5deg]",
  },
  {
    src: wisteria,
    alt: "Sanskriti's painting of an anime character under wisteria at night",
    box: "right-[-3%] top-[14%] w-[36%] md:right-[0%] md:top-[17%] md:w-[24%]",
    tilt: "rotate-[6deg]",
  },
  {
    src: kidPhone2,
    alt: "Sanskriti as a toddler looking at a phone",
    box: "right-[0%] top-[44%] w-[27%] md:right-[4%] md:top-[47%] md:w-[19%]",
    tilt: "-rotate-[5deg]",
  },
  {
    src: swans,
    alt: "Sanskriti's oil-pastel sketch of two swans at sunset",
    box: "right-[10%] top-[72%] w-[25%] md:right-[14%] md:top-[73%] md:w-[17%]",
    tilt: "rotate-[3deg]",
  },
];

// a red push pin
function Pin() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1.5 left-1/2 z-10 size-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f08a72,#c8553b_55%,#8f3524)] shadow-[0_2px_3px_rgba(60,20,10,0.45)]"
    />
  );
}

const photo =
  "transition duration-500 ease-out grayscale contrast-[1.05] group-hover:grayscale-0";

export function AboutCollage() {
  return (
    <section className="relative pt-6 pb-16 md:pb-20">
      {/* corner note, like a slip of paper taped to the page */}
      <p className="skeu-sunk printed mb-8 ml-auto w-fit max-w-[15rem] rotate-[1.5deg] rounded-sm px-5 py-4 text-sm text-[#c8553b] md:absolute md:top-0 md:right-0 md:mb-0">
        If I don&apos;t know
        <br />
        something,
        <br />I learn it.
      </p>

      <div className="relative md:mt-24">
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
                src={deskNow}
                alt="Sanskriti's desk at night: a laptop running Claude, a monitor, yellow headphones and a stack of books"
                sizes="(min-width: 768px) 380px, 56vw"
                placeholder="blur"
                loading="eager"
                className={`block h-auto w-full ${photo}`}
              />
              <figcaption
                className={`${hand.className} pointer-events-none absolute right-0 bottom-[6%] left-0 px-[17%] text-center text-base leading-tight md:px-3 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] md:text-lg`}
              >
                my mind never stops thinking
              </figcaption>
            </div>
          </figure>

          {/* pinned photos */}
          {pins.map((p) => (
            <figure
              key={p.alt}
              className={`group absolute ${p.box} ${p.tilt} z-[5] bg-white p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_10px_18px_-10px_rgba(40,30,20,0.5)] transition duration-500 ease-out hover:z-20 hover:rotate-0 hover:scale-[1.12] md:p-[5px]`}
            >
              <Pin />
              <Image
                src={p.src}
                alt={p.alt}
                sizes="(min-width: 768px) 190px, 36vw"
                placeholder="blur"
                className={`block h-auto w-full ${photo}`}
              />
            </figure>
          ))}
        </div>
      </div>

      {/* masthead line + the typed paragraph */}
      <div className="mt-10 grid gap-6 md:mt-6 md:grid-cols-[1fr_minmax(0,25rem)] md:items-end">
        <p className="label order-2 !text-ink md:order-1">
          About · Delhi NCR, India
        </p>
        <p className="printed order-1 text-base text-ink md:order-2 md:text-justify md:[hyphens:auto]">
          My dad was the first in our family to bring home a computer. I started
          in MS Paint and Photoshop, and was always the kid teachers sent to
          drawing competitions. Curiosity about how tech works took me to
          Twitter, tech meetups and 100 Days of Code, then to GeeksforGeeks,
          where I picked up design. After freelancing with Bangalore startups,
          I&apos;m now a product designer at AppX. I still paint and sketch by
          hand.
        </p>
      </div>
    </section>
  );
}
