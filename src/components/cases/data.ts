// Case studies for the work sheet. Screens and lines are stand-ins until Sanskriti sends the real ones.
export type Shot = { src: string; w: number; h: number };
export type Project = { name: string; line: string; role: string; year: string; shots: Shot[]; live?: string };

const S = {
  keploy: { src: "/assets/work/keploy.webp", w: 1264, h: 945 },
  concertpal: { src: "/assets/work/concertpal.webp", w: 1400, h: 1140 },
  context: { src: "/assets/work/context-window.webp", w: 1044, h: 798 },
  figma: { src: "/assets/work/figma-to-react.webp", w: 1400, h: 670 },
  mosaic: { src: "/assets/work/mosaic.webp", w: 1400, h: 1510 },
  espresso: { src: "/assets/work/espresso.webp", w: 1400, h: 1400 },
};

export const PRIMARY: Project[] = [
  { name: "AppX", line: "One line on the problem and what changed.", role: "Product design", year: "2024–now", shots: [S.keploy, S.context] },
  { name: "DreamLaunch × Bounce", line: "One line on the problem and what changed.", role: "Product design", year: "2024", shots: [S.concertpal, S.espresso] },
  { name: "eight.money", line: "One line on the problem and what changed.", role: "UX & visual design", year: "2023", shots: [S.context, S.figma] },
];

export const VIBE: Project[] = [
  { name: "Uxie", line: "A short line about it.", role: "Vibe coded", year: "2025", shots: [S.figma], live: "#" },
  { name: "Spiderman cards", line: "A short line about it.", role: "Vibe coded", year: "2025", shots: [S.mosaic], live: "#" },
  { name: "Little lights", line: "A Diwali album.", role: "Vibe coded", year: "2025", shots: [S.espresso], live: "#" },
];

export const KANJI = ["一", "二", "三", "四", "五", "六"];
