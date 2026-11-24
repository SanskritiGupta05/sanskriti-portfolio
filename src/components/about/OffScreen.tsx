import { PinnedPhoto } from "./paper";
import clay from "../../../public/assets/about/clay-koi-sunflowers.jpg";
import rose from "../../../public/assets/about/painting-rose.jpg";
import wallArt from "../../../public/assets/about/wall-art.jpg";
import cafe from "../../../public/assets/about/cafe.jpg";
import beach from "../../../public/assets/about/beach.jpg";

// Life off the screen: the things she makes and the places she goes. Interests are from her own notes.
const prints = [
  {
    src: clay,
    alt: "Sanskriti holding her clay koi pond with lily pads, next to a clay pot of sunflowers",
    tilt: "-rotate-[3deg]",
    caption: "clay: a koi pond + sunflowers",
  },
  {
    src: rose,
    alt: "Sanskriti painting a bleeding red rose under a crying eye, brush in hand",
    tilt: "rotate-[2deg]",
    caption: "even the roses bleed sometimes",
  },
  {
    src: cafe,
    alt: "Sanskriti smiling in a cafe booth under woven lamps, sunlight through the windows",
    tilt: "rotate-[3deg]",
    caption: "cafe hopping",
  },
  {
    src: wallArt,
    alt: "Sanskriti's pink Starry Night canvas above three painted mandala panels on her wall",
    tilt: "-rotate-[2deg]",
    caption: "my wall, my paintings",
  },
  {
    src: beach,
    alt: "Sanskriti from behind on a beach, looking at the sea and the setting sun",
    tilt: "rotate-[2deg]",
  },
];

export function OffScreen() {
  return (
    <section aria-labelledby="off-screen" className="grid gap-10 pb-24">
      <header className="mx-auto grid max-w-[36rem] gap-3 text-center">
        <p className="label">Off the screen</p>
        <h2 id="off-screen" className="font-serif text-h2m text-head md:text-h2">
          Still making things <span className="font-worn">by hand</span>
        </h2>
        <p className="printed text-base text-ink">
          I paint, sketch, make clay pieces and rangoli, watch anime and movies, read, and go cafe hopping.
          And I never say no to ramen.
        </p>
      </header>
      <div className="columns-2 gap-5 md:columns-3 md:gap-8 [&>figure]:mb-7">
        {prints.map((p) => (
          <PinnedPhoto
            key={p.alt}
            {...p}
            box="relative mt-3 inline-block w-full"
            sizes="(min-width: 768px) 260px, 45vw"
          />
        ))}
      </div>
    </section>
  );
}
