import Image, { type StaticImageData } from "next/image";
import { Nothing_You_Could_Do } from "next/font/google";

// Shared bits for the About page's pinned-paper look.

// handwriting for scribbled lines (About page only)
export const hand = Nothing_You_Could_Do({ weight: "400", subsets: ["latin"], display: "swap" });

// greyscale until hovered, like old prints
export const printPhoto = "transition duration-500 ease-out grayscale contrast-[1.05] group-hover:grayscale-0";

// a red push pin
export function Pin() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1.5 left-1/2 z-10 size-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f08a72,#c8553b_55%,#8f3524)] shadow-[0_2px_3px_rgba(60,20,10,0.45)]"
    />
  );
}

// a white-bordered print pinned to the page. `box` positions it (usually absolute, % of its board);
// on hover it straightens, lifts and turns to colour.
export function PinnedPhoto({
  src,
  alt,
  box,
  tilt,
  caption,
  sizes = "(min-width: 768px) 220px, 40vw",
  keepColor = false,
}: {
  src: StaticImageData;
  alt: string;
  box: string;
  tilt: string;
  caption?: string;
  sizes?: string;
  keepColor?: boolean; // skip the greyscale, when the colour is the point
}) {
  return (
    <figure
      className={`group ${box} ${tilt} z-[5] bg-white p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_10px_18px_-10px_rgba(40,30,20,0.5)] transition duration-500 ease-out hover:z-20 hover:scale-[1.1] hover:rotate-0 md:p-[5px]`}
    >
      <Pin />
      <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className={`block h-auto w-full ${keepColor ? "" : printPhoto}`} />
      {caption && (
        <figcaption className={`${hand.className} px-1 pt-1 text-center text-sm leading-tight text-[#2B2A28] md:text-base`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
