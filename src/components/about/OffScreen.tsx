import catCroc from "../../../public/assets/about/acrylic-cat-croc.jpg";
import beach from "../../../public/assets/about/beach.jpg";
import cafe from "../../../public/assets/about/cafe.jpg";
import clay from "../../../public/assets/about/clay-koi-sunflowers.jpg";
import magnets from "../../../public/assets/about/clay-magnets.jpg";
import rangoli from "../../../public/assets/about/diwali-rangoli.jpg";
import nails from "../../../public/assets/about/nail-art.jpg";
import rose from "../../../public/assets/about/painting-rose.jpg";
import pixelArt from "../../../public/assets/about/pixel-art.jpg";
import ramenCat from "../../../public/assets/about/sketch-ramen-cat.jpg";
import wallArt from "../../../public/assets/about/wall-art.jpg";
import { Bookshelf } from "./Bookshelf";
import { Hi, PinnedPhoto } from "./paper";
import { Pixel } from "./pixel";

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
        src: magnets,
        alt: "Tiny painted clay magnets in Sanskriti's palm: a cat, an onigiri, egg toast, a camera and a dotted red square",
        tilt: "rotate-[2deg]",
        caption: "clay magnets",
    },
    {
        src: pixelArt,
        alt: "Pixel-art Pikachu, a flower and a butterfly coloured with markers on grid notebooks",
        tilt: "-rotate-[3deg]",
        caption: "pixel art, by hand",
    },
    {
        src: nails,
        alt: "Spider-Man themed nail art on Sanskriti's hand",
        tilt: "rotate-[3deg]",
        caption: "spidey nails",
    },
    {
        src: catCroc,
        alt: "Two small acrylic canvases: a cat in a lion mane and a crocodile hugging a Diet Coke",
        tilt: "-rotate-[2deg]",
        caption: "acrylics",
    },
    {
        src: ramenCat,
        alt: "A coloured-pencil sketch of a sleepy cat in a ramen bowl with chopsticks",
        tilt: "rotate-[2deg]",
        caption: "ramen, obviously",
    },
    {
        src: rangoli,
        alt: "Two people in festive clothes beside a flower rangoli ringed with diyas for Diwali",
        tilt: "-rotate-[2deg]",
        caption: "diwali rangoli",
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
                <p className="label flex items-center justify-center gap-2">
                    <Pixel name="heart" className="size-5" /> Off the screen{" "}
                    <Pixel name="heart" className="size-5" />
                </p>
                <h2 id="off-screen" className="font-serif text-h2m text-head md:text-h2">
                    I still love making things <span className="font-worn">by hand</span>
                </h2>
                <p className="printed text-base leading-8 text-ink">
                    I <Hi c="pink">paint</Hi> <Pixel name="palette" />, <Hi c="yellow">sketch</Hi>{" "}
                    <Pixel name="pencil" />, make <Hi c="orange">clay pieces</Hi>{" "}
                    <Pixel name="clay" /> and <Hi c="green">rangoli</Hi> <Pixel name="flower" />,
                    watch <Hi c="lilac">anime</Hi> <Pixel name="sparkle" /> and{" "}
                    <Hi c="blue">movies</Hi> <Pixel name="clapper" />, <Hi c="yellow">read</Hi>{" "}
                    <Pixel name="book" />, and go <Hi c="orange">cafe hopping</Hi>{" "}
                    <Pixel name="coffee" />. And I never say no to <Hi c="pink">ramen</Hi>{" "}
                    <Pixel name="ramen" className="size-[2em] align-[-0.55em]" />
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
            <Bookshelf />
        </section>
    );
}
