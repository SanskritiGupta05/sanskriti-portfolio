// Little pixel-art icons for the About page, drawn as crisp SVG squares (no image files),
// in the same chunky 16-bit spirit as her pixel mascot. Some have a tiny loop: ramen steam,
// a blinking bot, a snapping clapper, a twinkling sparkle.

const PAL: Record<string, string> = {
  k: "#2b2a28", // ink
  w: "#f4efe6", // paper
  g: "#a9a39a", // grey
  s: "#7ec8e3", // screen blue
  b: "#4f7cc9", // blue
  r: "#c8553b", // terracotta
  p: "#f08aa0", // pink
  y: "#f2c14e", // yellow
  o: "#e98b3a", // orange
  e: "#6dbb6a", // green
  n: "#8a5a2b", // wood brown
  c: "#d9d2c7", // steam
  l: "#b99ae6", // lilac
};

type Sprite = { rows: string[]; anim?: { rows: number[]; cls: string } };

// 12×12 grids; "." is empty
const SPRITES = {
  computer: {
    rows: [
      "............",
      ".kkkkkkkkkk.",
      ".kwwwwwwwwk.",
      ".kwsssssswk.",
      ".kwswsssswk.",
      ".kwsssssswk.",
      ".kwwwwwwwwk.",
      ".kkkkkkkkkk.",
      "....kggk....",
      "..kkkkkkkk..",
      ".kwgwgwgwgk.",
      ".kkkkkkkkkk.",
    ],
  },
  ramen: {
    rows: [
      "...c...c....",
      "....c...c...",
      "...c...c....",
      ".........n..",
      "........n...",
      ".yyyywyynyy.",
      "kkkkkkkkkkkk",
      "krrrrrrrrrrk",
      ".krrwwrrwrk.",
      "..krrrrrrk..",
      "...kkkkkk...",
      "....kkkk....",
    ],
    anim: { rows: [0, 1, 2], cls: "px-steam" },
  },
  clapper: {
    rows: [
      "............",
      "kwwkkwwkkwwk",
      "kwwkkwwkkwwk",
      "............",
      "kkkkkkkkkkkk",
      "kwwkkwwkkwwk",
      "kkkkkkkkkkkk",
      "kkwwwwkkkkkk",
      "kkkkkkkkkkkk",
      "kkwwwwwwkkkk",
      "kkkkkkkkkkkk",
      "............",
    ],
    anim: { rows: [1, 2], cls: "px-clap" },
  },
  bot: {
    rows: [
      ".....r......",
      ".....k......",
      "..kkkkkkkk..",
      ".kwwwwwwwwk.",
      "kkwkkwwkkwkk",
      "kkwkkwwkkwkk",
      ".kwwwwwwwwk.",
      ".kwwrrrrwwk.",
      ".kwwwwwwwwk.",
      "..kkkkkkkk..",
      "...k....k...",
      "..kk....kk..",
    ],
    anim: { rows: [4, 5], cls: "px-blink" },
  },
  palette: {
    rows: [
      "............",
      "...kkkkkk...",
      "..kwwwwwwk..",
      ".kwrwwwbwwk.",
      ".kwwwwwwwwk.",
      "kwywwkkwwewk",
      "kwwwk..kwwk.",
      "kwpwwkkwwwk.",
      ".kwwwwwlwk..",
      "..kkwwwwk...",
      "....kkkk....",
      "............",
    ],
  },
  pencil: {
    rows: [
      ".........kk.",
      "........kppk",
      ".......kyykk",
      "......kyyyk.",
      ".....kyyyk..",
      "....kyyyk...",
      "...kyyyk....",
      "..kyyyk.....",
      ".kwwyk......",
      ".kwwk.......",
      "kkkk........",
      "k...........",
    ],
  },
  code: {
    rows: [
      "............",
      "............",
      "...k....k...",
      "..k....k.k..",
      ".k....k...k.",
      "k.....k....k",
      ".k...k....k.",
      "..k..k...k..",
      "...k.k..k...",
      ".....k......",
      "............",
      "............",
    ],
  },
  mic: {
    rows: [
      "....kkkk....",
      "...kggggk...",
      "...kgkgkk...",
      "...kggggk...",
      "...kgkgkk...",
      "...kggggk...",
      ".k.kkkkkk.k.",
      ".k..kkkk..k.",
      "..k......k..",
      "...kkkkkk...",
      ".....kk.....",
      "...kkkkkk...",
    ],
  },
  book: {
    rows: [
      "............",
      ".kkkkkkkkk..",
      ".kbbbbbbbkk.",
      ".kbwwwwwbkwk",
      ".kbbbbbbbkwk",
      ".kbwwwbbbkwk",
      ".kbbbbbbbkwk",
      ".kbbbbbbbkwk",
      ".kbbbbbbbkwk",
      ".kkkkkkkkkwk",
      "..kwwwwwwwwk",
      "...kkkkkkkkk",
    ],
  },
  coffee: {
    rows: [
      "....c..c....",
      ".....c..c...",
      "....c..c....",
      "............",
      ".kkkkkkkk...",
      ".kwwwwwwkkk.",
      ".kwrrwwwk.k.",
      ".kwwwwwwk.k.",
      ".kwwwwwwkkk.",
      "..kwwwwk....",
      "kkkkkkkkkkk.",
      ".kkkkkkkkk..",
    ],
    anim: { rows: [0, 1, 2], cls: "px-steam" },
  },
  clay: {
    rows: [
      "....e..e....",
      "...eye.ey...",
      "....e.ye....",
      "....kkkk....",
      "...konnok...",
      "..knnnnnnk..",
      ".knonnnnonk.",
      ".knnnnnnnnk.",
      ".knnonnnonk.",
      "..knnnnnnk..",
      "...kkkkkk...",
      "............",
    ],
  },
  flower: {
    rows: [
      "............",
      ".....pp.....",
      "....pyyp....",
      "..pp.pp.pp..",
      ".pyyp..pyyp.",
      "..pp.oo.pp..",
      ".....oo.....",
      "..pp.pp.pp..",
      ".pyyp..pyyp.",
      "..pp.pp.pp..",
      "....pyyp....",
      ".....pp.....",
    ],
  },
  sparkle: {
    rows: [
      ".....y......",
      ".....y......",
      "....yyy.....",
      "..yyywyyy...",
      "....yyy.....",
      ".....y......",
      ".....y...y..",
      "........yyy.",
      ".........y..",
      "............",
      "............",
      "............",
    ],
    anim: { rows: [0, 1, 2, 3, 4, 5, 6, 7, 8], cls: "px-twinkle" },
  },
  heart: {
    rows: [
      "............",
      "..rr...rr...",
      ".rrrr.rrrr..",
      "rrwrrrrrrrr.",
      "rrrrrrrrrrr.",
      "rrrrrrrrrrr.",
      ".rrrrrrrrr..",
      "..rrrrrrr...",
      "...rrrrr....",
      "....rrr.....",
      ".....r......",
      "............",
    ],
  },
} satisfies Record<string, Sprite>;

export type PixelName = keyof typeof SPRITES;

// the loops, scoped to these icons
const CSS = `
.px-steam{animation:px-steam 2.4s ease-in-out infinite}
@keyframes px-steam{0%,100%{opacity:.25;transform:translateY(1px)}50%{opacity:1;transform:translateY(-1px)}}
.px-blink{transform-box:fill-box;transform-origin:center;animation:px-blink 3.6s infinite}
@keyframes px-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
.px-clap{transform-box:fill-box;transform-origin:0% 100%;animation:px-clap 2.2s infinite}
@keyframes px-clap{0%,60%,100%{transform:rotate(0)}70%,85%{transform:rotate(-14deg)}}
.px-twinkle{transform-box:fill-box;transform-origin:center;animation:px-twinkle 1.8s ease-in-out infinite}
@keyframes px-twinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
@media (prefers-reduced-motion:reduce){.px-steam,.px-blink,.px-clap,.px-twinkle{animation:none}}
`;

function rects(rows: string[], only?: number[]) {
  const out: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    if (only && !only.includes(y)) return;
    [...row].forEach((ch, x) => {
      if (ch !== "." && PAL[ch])
        out.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1.02}
            height={1.02}
            fill={PAL[ch]}
          />,
        );
    });
  });
  return out;
}

// an inline pixel icon, about the height of a capital letter (or `className` to size it)
export function Pixel({
  name,
  className = "size-[1.35em]",
  label,
}: {
  name: PixelName;
  className?: string;
  label?: string;
}) {
  const s: Sprite = SPRITES[name];
  const still = s.anim
    ? s.rows.map((r, y) =>
        s.anim!.rows.includes(y) ? ".".repeat(r.length) : r,
      )
    : s.rows;
  return (
    <svg
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 align-[-0.25em] [filter:none] ${className}`}
    >
      <style>{CSS}</style>
      {rects(still)}
      {s.anim && <g className={s.anim.cls}>{rects(s.rows, s.anim.rows)}</g>}
    </svg>
  );
}
