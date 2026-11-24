// The books on her desk stack (read off her photo), as spines on a little wooden shelf.
// Hover (or focus) a spine and it slides up off the shelf.
const BOOKS: {
  title: string;
  spine: string;
  author: string;
  bg: string;
  fg: string;
  h: string;
}[] = [
  {
    title: "Ikigai",
    spine: "IKIGAI",
    author: "Héctor García & Francesc Miralles",
    bg: "#f1ece1",
    fg: "#2b2a28",
    h: "h-[166px] md:h-[186px]",
  },
  {
    title: "Your Name.",
    spine: "your name.",
    author: "Makoto Shinkai",
    bg: "#26324a",
    fg: "#f4efe6",
    h: "h-[152px] md:h-[170px]",
  },
  {
    title:
      "How to Develop Self-Confidence & Influence People by Public Speaking",
    spine: "SELF-CONFIDENCE",
    author: "Dale Carnegie",
    bg: "#f2c94c",
    fg: "#3a2c10",
    h: "h-[174px] md:h-[198px]",
  },
  {
    title: "Think Straight",
    spine: "THINK STRAIGHT",
    author: "Darius Foroux",
    bg: "#e2583e",
    fg: "#fff4ea",
    h: "h-[158px] md:h-[178px]",
  },
  {
    title: "More Days at the Morisaki Bookshop",
    spine: "MORE DAYS·MORISAKI",
    author: "Satoshi Yagisawa",
    bg: "#efe3c4",
    fg: "#5a3d2b",
    h: "h-[176px] md:h-[202px]",
  },
  {
    title: "Days at the Morisaki Bookshop",
    spine: "DAYS AT MORISAKI",
    author: "Satoshi Yagisawa",
    bg: "#f3dc8a",
    fg: "#4a3520",
    h: "h-[172px] md:h-[196px]",
  },
  {
    title: "The $100 Startup",
    spine: "THE $100 STARTUP",
    author: "Chris Guillebeau",
    bg: "#fbf7ef",
    fg: "#c8392c",
    h: "h-[166px] md:h-[190px]",
  },
  {
    title: "The Courage to Be Disliked",
    spine: "COURAGE·DISLIKED",
    author: "Ichiro Kishimi & Fumitake Koga",
    bg: "#f7f3ea",
    fg: "#c0392b",
    h: "h-[178px] md:h-[204px]",
  },
  {
    title: "Steal Like an Artist",
    spine: "STEAL LIKE AN ARTIST",
    author: "Austin Kleon",
    bg: "#1f1e1c",
    fg: "#f4efe6",
    h: "h-[176px] md:h-[204px]",
  },
  {
    title: "Hooked",
    spine: "HOOKED",
    author: "Nir Eyal",
    bg: "#f5d33b",
    fg: "#1f1e1c",
    h: "h-[170px] md:h-[192px]",
  },
  {
    title: "Atomic Habits",
    spine: "ATOMIC HABITS",
    author: "James Clear",
    bg: "#efe9dc",
    fg: "#5c5850",
    h: "h-[176px] md:h-[200px]",
  },
];

// Each book is a little 3D box: the spine faces you; hover (or tap) and it lifts and turns
// a quarter to show its front cover. Covers are typeset in each book's colours.
const box =
  "relative block [--d:96px] [--w:25px] md:[--d:120px] md:[--w:34px] w-[var(--w)] [transform-style:preserve-3d] [transform:translateZ(calc(var(--d)/-2))] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] outline-none group-hover:[transform:translateY(-18px)_translateZ(18px)_rotateY(-90deg)] group-focus-within:[transform:translateY(-18px)_translateZ(18px)_rotateY(-90deg)] motion-reduce:transition-none";
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
              className={`${box} ${b.h}`}
            >
              {/* the spine */}
              <span
                className={`${face} inset-x-0 flex items-center justify-center rounded-t-[3px] rounded-b-[1px] shadow-[inset_2px_0_0_rgba(255,255,255,0.35),inset_-3px_0_0_rgba(0,0,0,0.12)] [transform:translateZ(calc(var(--d)/2))]`}
                style={{ background: b.bg, color: b.fg }}
              >
                <span className="max-h-[90%] rotate-180 overflow-hidden text-[13px] leading-none font-bold whitespace-nowrap [writing-mode:vertical-rl]">
                  {b.spine}
                </span>
              </span>
              {/* the front cover, on the box's right side */}
              <span
                aria-hidden="true"
                className={`${face} left-[calc((var(--w)-var(--d))/2)] flex w-[var(--d)] flex-col justify-between rounded-r-[4px] p-2.5 shadow-[inset_4px_0_6px_-3px_rgba(0,0,0,0.25)] [transform:rotateY(90deg)_translateZ(calc(var(--w)/2))] md:p-3`}
                style={{ background: b.bg, color: b.fg }}
              >
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
