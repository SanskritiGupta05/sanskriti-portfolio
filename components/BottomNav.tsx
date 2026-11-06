"use client";

import { useEffect, useState } from "react";
import { EMAIL } from "@/lib/content";
import { useCopy, useTheme } from "@/lib/hooks";

const LINKS = [
  { k: "作", label: "work", href: "#work", meaning: "tsukuru — to make" },
  { k: "遊", label: "play", href: "#play", meaning: "asobi — to play" },
  { k: "私", label: "about", href: "#why", meaning: "watashi — me" },
  { k: "趣", label: "life", href: "#life", meaning: "shumi — hobbies" },
];

/** Sticky bottom pill nav. Shrinks to kanji when scrolling down, expands on scroll up. */
export default function BottomNav() {
  const { theme, toggle } = useTheme();
  const { done, copy } = useCopy(EMAIL);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");
  const [sound, setSound] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) setCompact(y > last && y > 400);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // watch every section so the pill clears when you're in one that isn't in the nav
    const ids = ["top", "craft", "stations", "work", "built", "more", "play", "why", "life"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`bnav ${compact ? "is-compact" : ""}`} aria-label="Main">
      <a className="bnav-home brush" href="#top" aria-label="Back to top">
        サ
      </a>
      <ul>
        {LINKS.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={active === l.href.slice(1) ? "is-active" : ""}>
              <span className="brush">{l.k}</span>
              <span className="bnav-label">{l.label}</span>
              <span className="bnav-tip" role="tooltip">
                <b className="brush">{l.k}</b> {l.meaning}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <span className="bnav-div" />
      <button className={`bnav-icon brush ${sound ? "is-on" : ""}`} aria-pressed={sound} aria-label="Sound" onClick={() => setSound((s) => !s)}>
        音
      </button>
      <button className="bnav-icon" aria-label={theme === "night" ? "Switch to day" : "Switch to night"} aria-pressed={theme === "night"} onClick={toggle}>
        <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden>
          <path d="M8 0 V3" stroke="currentColor" />
          <rect x="4" y="3" width="8" height="2" fill="currentColor" />
          <path d="M4.5 5 C1 6.5 1 13.5 4.5 15 H11.5 C15 13.5 15 6.5 11.5 5 Z" className="bnav-lamp" />
          <rect x="4" y="15" width="8" height="2" fill="currentColor" />
          <path d="M8 17 V20" stroke="#C3352B" strokeWidth="1.6" />
        </svg>
      </button>
      <button className="bnav-cta" onClick={copy}>
        <span className="bnav-label">{done ? "copied!" : "Email me"}</span>
        <span aria-hidden>{done ? <span className="brush">済</span> : "→"}</span>
      </button>
    </nav>
  );
}
