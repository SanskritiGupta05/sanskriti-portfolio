"use client";

import { TOOLS } from "@/components/Keyword";
import { PixelPencil } from "@/components/PixelPencil";

// "Tools I use day to day" + "Tech I know" (her list). Same app-icon tiles as the hero's skill fans
// (Keyword.tsx); the extra marks are official outlines from Simple Icons (OpenAI, Notion, Vercel, HTML5, CSS3, Swift),
// JavaScript is its yellow "JS" square, and pen & paper is a small drawn notebook and pencil.
const TILE =
  "grid size-10 place-items-center rounded-[10px] shadow-[0_8px_18px_-8px_rgba(40,20,10,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)]";

const EXTRA = {
  claudeCode: { name: "Claude Code", icon: TOOLS.claude.icon },
  chatgpt: {
    name: "ChatGPT",
    icon: (
      <span className={TILE} style={{ background: "#0d0d0d" }}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            fill="#fff"
            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
          />
        </svg>
      </span>
    ),
  },
  notion: {
    name: "Notion",
    icon: (
      <span className={`${TILE} bg-white`}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            fill="#0d0d0d"
            d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
          />
        </svg>
      </span>
    ),
  },
  // drawn: a ruled notebook page with a pencil across it
  penPaper: {
    name: "Pen & paper",
    icon: (
      <span className={TILE} style={{ background: "#fffaf2" }}>
        <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
          <rect x="8" y="6" width="20" height="27" rx="2" fill="#fff" stroke="#d8c7ab" strokeWidth="1.2" />
          <g stroke="#9cc3e6" strokeWidth="1" strokeLinecap="round">
            <path d="M11.5 13h13M11.5 17.5h13M11.5 22h9" />
          </g>
          <path d="M12 9.5v20" stroke="#f0a8a0" strokeWidth=".9" />
          <g transform="rotate(40 26 24)">
            <rect x="23.5" y="10" width="5" height="17" rx="1" fill="#f5c542" />
            <rect x="23.5" y="10" width="5" height="3" fill="#e58b8b" />
            <rect x="23.5" y="12.6" width="5" height="1.4" fill="#c9c2b6" />
            <path d="M23.5 27h5l-2.5 5z" fill="#f2dcb8" />
            <path d="M25.3 30.6 26 32l.7-1.4z" fill="#2b2b2b" />
          </g>
        </svg>
      </span>
    ),
  },
  html: {
    name: "HTML",
    icon: (
      <span className={TILE} style={{ background: "#E34F26" }}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            fill="#fff"
            d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
          />
        </svg>
      </span>
    ),
  },
  css: {
    name: "CSS",
    icon: (
      <span className={TILE} style={{ background: "#1572B6" }}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            fill="#fff"
            d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
          />
        </svg>
      </span>
    ),
  },
  javascript: {
    name: "JavaScript",
    icon: (
      <span className={`${TILE} relative`} style={{ background: "#F7DF1E" }}>
        <span className="absolute right-1.5 bottom-1 font-[system-ui] text-[15px] leading-none font-bold tracking-tight text-[#1c1b19]">JS</span>
      </span>
    ),
  },
  vercel: {
    name: "Vercel",
    icon: (
      <span className={TILE} style={{ background: "#000" }}>
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path fill="#fff" d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      </span>
    ),
  },
  // Swift's own mark is already an app-icon square with the bird cut out
  swift: {
    name: "Swift",
    icon: (
      <span className={`${TILE} overflow-hidden bg-white`}>
        <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true">
          <path
            fill="#F05138"
            d="M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.003-.263.009-.395.015A9.154 9.154 0 0 0 4.348.15 5.492 5.492 0 0 0 2.85.645 5.04 5.04 0 0 0 .645 2.848c-.245.48-.4.972-.495 1.5-.093.52-.122 1.05-.136 1.576a35.2 35.2 0 0 0-.012.724C0 6.935 0 7.221 0 7.508v8.984c0 .287 0 .575.002.862.002.24.005.481.012.722.014.526.043 1.057.136 1.576.095.528.25 1.02.495 1.5a5.03 5.03 0 0 0 2.205 2.203c.48.244.97.4 1.498.495.52.093 1.05.124 1.576.138.241.007.483.009.724.01.287.002.573.002.86.002h8.984c.287 0 .573 0 .86-.002.241-.001.483-.003.724-.01a10.523 10.523 0 0 0 1.578-.138 5.322 5.322 0 0 0 1.498-.495 5.035 5.035 0 0 0 2.203-2.203c.245-.48.4-.972.495-1.5.093-.52.124-1.05.138-1.576.007-.241.009-.481.01-.722.002-.287.002-.575.002-.862V7.508c0-.287 0-.573-.002-.86a33.662 33.662 0 0 0-.01-.724 10.5 10.5 0 0 0-.138-1.576 5.328 5.328 0 0 0-.495-1.5A5.039 5.039 0 0 0 21.152.645 5.32 5.32 0 0 0 19.654.15a10.493 10.493 0 0 0-1.578-.138 34.98 34.98 0 0 0-.722-.01C17.067 0 16.779 0 16.492 0H7.508zm6.035 3.41c4.114 2.47 6.545 7.162 5.549 11.131-.024.093-.05.181-.076.272l.002.001c2.062 2.538 1.5 5.258 1.236 4.745-1.072-2.086-3.066-1.568-4.088-1.043a6.803 6.803 0 0 1-.281.158l-.02.012-.002.002c-2.115 1.123-4.957 1.205-7.812-.022a12.568 12.568 0 0 1-5.64-4.838c.649.48 1.35.902 2.097 1.252 3.019 1.414 6.051 1.311 8.197-.002C9.651 12.730 7.101 9.67 5.146 7.191a10.628 10.628 0 0 1-1.005-1.384c2.34 2.142 6.038 4.830 7.365 5.576C8.69 8.408 6.208 4.743 6.324 4.86c4.436 4.47 8.528 6.996 8.528 6.996.154.085.27.154.36.213.085-.215.16-.437.224-.668.708-2.588-.09-5.548-1.893-7.992z"
          />
        </svg>
      </span>
    ),
  },
};

const DAILY = [
  TOOLS.figma,
  TOOLS.figjam,
  TOOLS.photoshop,
  TOOLS.illustrator,
  TOOLS.jitter,
  EXTRA.claudeCode,
  EXTRA.chatgpt,
  EXTRA.notion,
  TOOLS.github,
  TOOLS.xcode,
  EXTRA.vercel,
  EXTRA.penPaper,
];
const TECH = [EXTRA.html, EXTRA.css, EXTRA.javascript, EXTRA.swift];

// one quiet row per group: a small label on the left, then small icons with their names, no card around them.
// The app tiles are drawn at 40px for the hero fans, so here they're scaled to 28px and lose their drop shadow.
function Row({ label, items }: { label: string; items: { name: string; icon: React.ReactNode }[] }) {
  return (
    <div className="grid gap-4 border-t border-dashed border-line py-6 md:grid-cols-[140px_1fr] md:gap-6">
      <span className="label pt-1.5">{label}</span>
      <ul className="flex flex-wrap gap-x-6 gap-y-4">
        {items.map((t) => (
          <li key={t.name} className="group flex items-center gap-2.5">
            <span className="relative size-7 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 [&>span]:absolute [&>span]:top-0 [&>span]:left-0 [&>span]:origin-top-left [&>span]:scale-70 [&>span]:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
              {t.icon}
            </span>
            <span className="text-sm text-muted-foreground transition-colors group-hover:text-head">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Toolkit() {
  return (
    <section aria-labelledby="toolkit-title" className="pt-20">
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="grid h-11 w-13 rotate-6 place-items-center overflow-hidden rounded-lg border border-[#cfe0ef] bg-[#eef5fb] shadow-[0_3px_0_#cfe0ef]">
          <PixelPencil />
        </span>
        <h2 id="toolkit-title" className="label rounded-sm bg-[#e8f1f9] px-2.5 py-1 !text-[#2b5f8c]">
          Toolkit
        </h2>
      </div>
      <Row label="Day to day" items={DAILY} />
      <Row label="Tech I know" items={TECH} />
    </section>
  );
}
