// All copy lives here so it's easy to swap placeholders for real content.

export const EMAIL = "hello@yourdomain.com"; // TODO: your real email

export type Project = {
  num: string;
  title: string;
  katakana: string;
  year: string;
  description: string;
  meta: [string, string][];
  href: string;
};

export const FEATURED: Project[] = [
  {
    num: "壱",
    title: "Keploy",
    katakana: "ケプロイ",
    year: "2025",
    description: "Making API testing feel approachable — onboarding and test-generation flows for developers who hate writing tests.",
    meta: [
      ["role", "Product designer"],
      ["scope", "Web app · 0 to 1"],
      ["impact", "+38% activation*"],
    ],
    href: "#",
  },
  {
    num: "弐",
    title: "GeeksforGeeks",
    katakana: "ギークス",
    year: "2024",
    description: "Helping millions of learners find, practise and actually finish what they start.",
    meta: [
      ["role", "Product designer"],
      ["scope", "Web + mobile"],
      ["impact", "placeholder*"],
    ],
    href: "#",
  },
  {
    num: "参",
    title: "Mosaic AI",
    katakana: "モザイク",
    year: "2024",
    description: "Shaping an AI product from first sketch to an interface people trust.",
    meta: [
      ["role", "Product + visual"],
      ["scope", "AI · 0 to 1"],
      ["impact", "placeholder*"],
    ],
    href: "#",
  },
];

export const STATIONS = [
  { n: "01", company: "Company name", role: "Product Designer", years: "2025 — now", current: true },
  { n: "02", company: "Company name", role: "Product Designer", years: "2023 — 25" },
  { n: "03", company: "Company name", role: "Design Intern", years: "2022" },
  { n: "04", company: "Where it began", role: "Freelance · Visual", years: "2021" },
];

export const VIBE = [
  {
    title: "This portfolio",
    description: "Lantern day/night, the scroll intro and the Fuji footer — designed in Figma, built with Claude Code.",
    tools: ["Claude Code", "Figma", "Vercel"],
    wide: true,
  },
  {
    title: "Project two",
    description: "A small tool I wished existed — first prompt to deployed link in a weekend.",
    tools: ["Cursor", "v0"],
  },
  {
    title: "Project three",
    description: "An experiment in motion: what it took to make easing feel hand-made.",
    tools: ["Claude Code", "Framer"],
  },
];

export const MORE_WORK = [
  { k: "一", title: "weebInTech", desc: "Community brand + site for anime-loving techies", year: "2024" },
  { k: "二", title: "Peerlist UI challenge", desc: "30 days of interaction studies", year: "2024" },
  { k: "三", title: "Bounce daily", desc: "Habit app concept", year: "2023" },
  { k: "四", title: "Misc projects", desc: "Posters, illustration, odds and ends", year: "—" },
];

export const INTERESTS = [
  {
    k: "会",
    name: "Design meetups",
    color: "#161616",
    text: "Front row at local design meetups — I go for the talks and stay for the people (and the chai).",
  },
  {
    k: "麺",
    name: "Ramen",
    color: "#B8322A",
    text: "47 bowls this year and counting. Current favourite: tonkotsu, extra negi, soft egg.",
  },
  {
    k: "描",
    name: "Sketching & drawing",
    color: "#A39E96",
    text: "A pocket sketchbook, always. Six filled so far — mostly shopfronts, cats and bad ideas that became good ones.",
  },
  {
    k: "読",
    name: "Reading",
    color: "#E4DDCF",
    text: "Currently reading: Book title — Author. Ask me for recommendations at your own risk.",
  },
  {
    k: "土",
    name: "Clay art",
    color: "#B8322A",
    text: "Hand-built pots and tiny ramen bowls — slightly wonky, fully loved. Clay taught me patience Figma never did.",
  },
];

export const SECTIONS = [
  { id: "craft", k: "仕", label: "what I do" },
  { id: "stations", k: "駅", label: "worked" },
  { id: "work", k: "作", label: "work" },
  { id: "built", k: "造", label: "built" },
  { id: "more", k: "録", label: "more" },
  { id: "play", k: "遊", label: "play" },
  { id: "why", k: "和", label: "why Japan" },
  { id: "life", k: "趣", label: "life" },
];
