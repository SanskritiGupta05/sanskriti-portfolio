// 32×32 pixel-anime me, drawn with code so it's easy to tweak (swap colours, hair length…).
const N = 32;
type Cell = string | null;

const PAL: Record<string, string> = {
  K: "#1B1A1F", // outline
  H: "#2B2A33", // hair
  h: "#596170", // hair highlight
  S: "#F6E3D3", // skin
  s: "#E6C3AE", // skin shade
  W: "#FFFFFF",
  E: "#1B1A1F", // pupil
  I: "#3B4250", // iris
  B: "#F2A7A0", // blush
  M: "#B5483A", // mouth
  R: "#C8372D", // ribbon
  r: "#8E1F18",
  C: "#26252B", // uniform
  c: "#F7F7F7", // collar
  T: "#C8372D", // tie
};

const SPRITE = (() => {
  const g: Cell[][] = Array.from({ length: N }, () => Array(N).fill(null));
  const set = (x: number, y: number, v: string) => {
    if (x >= 0 && y >= 0 && x < N && y < N) g[y][x] = v;
  };
  const ellipse = (cx: number, cy: number, rx: number, ry: number, v: string, yMin = 0, yMax = N) => {
    for (let y = yMin; y < yMax; y++) for (let x = 0; x < N; x++) if (((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1) set(x, y, v);
  };

  // uniform + shoulders
  for (let y = 26; y < 32; y++) for (let x = 16 - (y - 22) * 1.6; x < 16 + (y - 22) * 1.6; x++) set(Math.round(x), y, "C");
  // long hair behind
  ellipse(16, 13.5, 11.2, 11.5, "H");
  for (let y = 12; y < 28; y++) {
    for (let x = 5; x <= 8; x++) set(x, y, "H");
    for (let x = 23; x <= 26; x++) set(x, y, "H");
  }
  // neck
  for (let y = 22; y < 27; y++) for (let x = 14; x <= 17; x++) set(x, y, y === 22 ? "s" : "S");
  // collar V + tie
  [[13, 26], [14, 27], [15, 28], [18, 26], [17, 27], [16, 28]].forEach(([x, y]) => set(x, y, "c"));
  [[12, 26], [19, 26]].forEach(([x, y]) => set(x, y, "c"));
  for (let y = 27; y < 31; y++) set(15, y, "T"), set(16, y, "T");
  // face
  ellipse(16, 16.2, 8.2, 8, "S", 9, 25);
  for (let x = 9; x <= 22; x++) if (g[23]?.[x] === "S" && (x < 12 || x > 19)) g[23][x] = null; // pointier chin
  // bangs with jagged tips
  const tips = [12, 13, 11, 12, 14, 12, 11, 13, 12, 11, 12, 14, 12, 11, 13, 12];
  for (let x = 8; x < 24; x++) for (let y = 6; y < tips[x - 8]; y++) set(x, y, "H");
  // side locks over the face edge
  for (let y = 12; y < 22; y++) {
    set(7, y, "H");
    set(8, y, "H");
    set(23, y, "H");
    set(24, y, "H");
  }
  // hair shine
  [[11, 5], [12, 5], [13, 4], [14, 4], [10, 6], [11, 6], [20, 7], [21, 8]].forEach(([x, y]) => set(x, y, "h"));
  // brows
  [[10, 14], [11, 14], [12, 14], [19, 14], [20, 14], [21, 14]].forEach(([x, y]) => set(x, y, "H"));
  // eyes (big anime eyes with highlights)
  for (const ex of [10, 19]) {
    for (let x = ex - 1; x <= ex + 3; x++) set(x, 15, "K"); // lash line
    for (let y = 16; y <= 19; y++) for (let x = ex; x <= ex + 2; x++) set(x, y, y === 19 ? "I" : "E");
    set(ex + 1, 18, "I");
    set(ex, 16, "W"); // big highlight
    set(ex + 2, 18, "W"); // small highlight
    set(ex + 3, 16, "K"); // outer lash flick
  }
  // nose, blush, mouth, cheek shade
  set(16, 19, "s");
  [[9, 20], [10, 20], [21, 20], [22, 20]].forEach(([x, y]) => set(x, y, "B"));
  set(15, 21, "M");
  set(16, 21, "M");
  // ribbon
  [[25, 3], [26, 3], [24, 4], [25, 4], [26, 4], [27, 4], [28, 4], [25, 5], [26, 5], [27, 5], [26, 6], [27, 6], [28, 5]].forEach(([x, y]) => set(x, y, "R"));
  set(26, 4, "r");
  set(27, 5, "r");

  // auto outline: any empty cell touching a filled one becomes ink
  const out = g.map((row) => [...row]);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (g[y][x]) continue;
      const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => g[y + dy]?.[x + dx]);
      if (near && y < 31) out[y][x] = "K";
    }
  return out;
})();

export default function PixelMe({ size = 128 }: { size?: number }) {
  return (
    <svg className="pixel-me" width={size} height={size} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" role="img" aria-label="Pixel-art me">
      {SPRITE.flatMap((row, y) => row.map((c, x) => (c ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={PAL[c]} /> : null)))}
      {/* eyelids for the blink */}
      <rect className="px-lid" x="9" y="15" width="5" height="5" fill={PAL.S} />
      <rect className="px-lid" x="18" y="15" width="5" height="5" fill={PAL.S} />
      <rect className="px-lid" x="9" y="18" width="5" height="1" fill={PAL.K} />
      <rect className="px-lid" x="18" y="18" width="5" height="1" fill={PAL.K} />
    </svg>
  );
}
