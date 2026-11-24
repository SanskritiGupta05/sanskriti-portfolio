import Image, { type StaticImageData } from "next/image";
import { hand } from "./paper";
import c_ikigai from "../../../public/assets/about/books/ikigai.jpg";
import c_think_straight from "../../../public/assets/about/books/think-straight.jpg";
import c_days_morisaki from "../../../public/assets/about/books/days-morisaki.jpg";
import c_hundred_startup from "../../../public/assets/about/books/100-startup.jpg";
import c_courage_disliked from "../../../public/assets/about/books/courage-disliked.jpg";
import c_steal_like_an_artist from "../../../public/assets/about/books/steal-like-an-artist.jpg";
import c_hooked from "../../../public/assets/about/books/hooked.jpg";
import c_atomic_habits from "../../../public/assets/about/books/atomic-habits.jpg";
// The books on her desk stack (read off her photo), as spines on a little wooden shelf.
// Each book's height comes from its cover's real proportions, so the cover never gets cropped.
const BOOKS: {
  title: string;
  spine: string;
  author: string;
  bg: string;
  fg: string;
  ar?: number; // height ÷ width, for books without a cover image
  cover?: StaticImageData; // the real cover (from Open Library); typeset when missing
  font?: "serif" | "sans" | "hand"; // spine lettering, matched to the cover
}[] = [
  {
    title: "Ikigai",
    cover: c_ikigai,
    spine: "IKIGAI",
    author: "Héctor García & Francesc Miralles",
    bg: "#9dd0e1",
    fg: "#1d2b36",
    font: "serif",
  },
  {
    title: "Your Name.",
    ar: 1.45,
    spine: "your name.",
    author: "Makoto Shinkai",
    bg: "#26324a",
    fg: "#f4efe6",
  },
  {
    title:
      "How to Develop Self-Confidence & Influence People by Public Speaking",
    ar: 1.55,
    spine: "SELF-CONFIDENCE",
    author: "Dale Carnegie",
    bg: "#f2c94c",
    fg: "#3a2c10",
  },
  {
    title: "Think Straight",
    cover: c_think_straight,
    spine: "THINK STRAIGHT",
    author: "Darius Foroux",
    bg: "#ff6900",
    fg: "#141414",
    font: "sans",
  },
  {
    title: "More Days at the Morisaki Bookshop",
    ar: 1.5,
    spine: "MORE DAYS·MORISAKI",
    author: "Satoshi Yagisawa",
    bg: "#efe3c4",
    fg: "#5a3d2b",
  },
  {
    title: "Days at the Morisaki Bookshop",
    cover: c_days_morisaki,
    spine: "Days at the Morisaki",
    author: "Satoshi Yagisawa",
    bg: "#2f3d33",
    fg: "#f3ead2",
    font: "serif",
  },
  {
    title: "The $100 Startup",
    cover: c_hundred_startup,
    spine: "THE $100 STARTUP",
    author: "Chris Guillebeau",
    bg: "#fffdea",
    fg: "#c8392c",
    font: "sans",
  },
  {
    title: "The Courage to Be Disliked",
    cover: c_courage_disliked,
    spine: "Courage to Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    bg: "#e6ded3",
    fg: "#2b2a28",
    font: "serif",
  },
  {
    title: "Steal Like an Artist",
    cover: c_steal_like_an_artist,
    spine: "steal like an artist",
    author: "Austin Kleon",
    bg: "#000000",
    fg: "#ffffff",
    font: "hand",
  },
  {
    title: "Hooked",
    cover: c_hooked,
    spine: "HOOKED",
    author: "Nir Eyal",
    bg: "#e5e434",
    fg: "#141414",
    font: "sans",
  },
  {
    title: "Atomic Habits",
    cover: c_atomic_habits,
    spine: "Atomic Habits",
    author: "James Clear",
    bg: "#eee7e1",
    fg: "#9b7b45",
    font: "sans",
  },
];

// Each book is a little 3D box: the spine faces you; hover (or tap) and it lifts and turns
// a quarter to show its front cover: the real cover from Open Library where one was found,
// otherwise typeset in the book's colours.
const box =
  "relative block [--d:96px] [--w:25px] md:[--d:120px] md:[--w:34px] w-[var(--w)] [transform-style:preserve-3d] [transform:translateZ(calc(var(--d)/-2))] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] outline-none group-hover:[transform:translateY(-18px)_translateZ(18px)_rotateY(-90deg)] group-focus-within:[transform:translateY(-18px)_translateZ(18px)_rotateY(-90deg)] motion-reduce:transition-none";
const spineFont = {
  serif: "font-serif text-sm font-semibold tracking-wide",
  sans: "font-[system-ui] text-[13px] font-extrabold tracking-wide",
  hand: `${hand.className} text-sm`,
};
const face =
  "absolute top-0 h-full [backface-visibility:hidden] ring-1 ring-black/10";

export function Bookshelf() {
  return (
    <figure className="mx-auto w-full max-w-[38rem]">
      <ul
        className="flex items-end justify-center gap-[3px] px-2 md:gap-1"
        aria-label="Books on my shelf"
      >
        {BOOKS.map((b) => (
          <li
            key={b.title}
            className="group relative z-0 [perspective:900px] hover:z-20 focus-within:z-20"
          >
            <span
              tabIndex={0}
              aria-label={`${b.title} by ${b.author}`}
              className={`${box} h-[calc(var(--d)*var(--ar))]`}
              style={{
                ["--ar" as string]: b.cover
                  ? b.cover.height / b.cover.width
                  : (b.ar ?? 1.5),
              }}
            >
              {/* the spine */}
              <span
                className={`${face} inset-x-0 flex items-center justify-center rounded-t-[3px] rounded-b-[1px] shadow-[inset_2px_0_0_rgba(255,255,255,0.35),inset_-3px_0_0_rgba(0,0,0,0.12)] [transform:translateZ(calc(var(--d)/2))]`}
                style={{ background: b.bg, color: b.fg }}
              >
                <span
                  className={`max-h-[90%] rotate-180 overflow-hidden leading-none whitespace-nowrap [writing-mode:vertical-rl] ${b.font ? spineFont[b.font] : "text-[13px] font-bold"}`}
                >
                  {b.spine}
                </span>
              </span>
              {/* the front cover, on the box's right side */}
              <span
                aria-hidden="true"
                className={`${face} left-[calc((var(--w)-var(--d))/2)] flex w-[var(--d)] flex-col justify-between rounded-r-[4px] p-2.5 shadow-[inset_4px_0_6px_-3px_rgba(0,0,0,0.25)] [transform:rotateY(90deg)_translateZ(calc(var(--w)/2))] md:p-3`}
                style={{ background: b.bg, color: b.fg }}
              >
                {b.cover ? (
                  <Image
                    src={b.cover}
                    alt=""
                    fill
                    sizes="120px"
                    className="rounded-r-[4px] object-cover"
                  />
                ) : (
                  <>
                    <span className="font-serif text-base leading-tight font-semibold">
                      {b.title}
                    </span>
                    <span className="grid gap-1.5">
                      <span
                        className="h-px w-8 opacity-50"
                        style={{ background: b.fg }}
                      />
                      <span className="text-[13px] leading-snug opacity-80">
                        {b.author}
                      </span>
                    </span>
                  </>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
      {/* the shelf board */}
      <div className="h-3 rounded-[3px] bg-[linear-gradient(180deg,#b98a5e_0%,#9c6f45_60%,#7d5634_100%)] shadow-[0_10px_18px_-10px_rgba(60,35,15,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]" />
      <figcaption className="label mt-3 text-center">
        On my shelf · hover a book
      </figcaption>
    </figure>
  );
}
