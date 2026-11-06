"use client";

import { AnimatePresence, motion } from "motion/react";
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
  const [tip, setTip] = useState<string | null>(null);

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

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.15, delay: 0.05 } }, exit: { opacity: 0, transition: { duration: 0.1 } } };

  return (
    <div className="bnav-dock">
      <motion.nav layout className={`bnav ${compact ? "is-compact" : ""}`} style={{ borderRadius: 999 }} aria-label="Main">
        <motion.a layout="position" className="bnav-home brush" href="#top" aria-label="Back to top">
          サ
        </motion.a>
        <ul>
          {LINKS.map((l) => (
            <motion.li layout="position" key={l.label}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? "is-active" : ""}
                aria-label={l.label}
                onPointerEnter={() => setTip(l.label)}
                onPointerLeave={() => setTip(null)}
                onFocus={() => setTip(l.label)}
                onBlur={() => setTip(null)}
              >
                {active === l.href.slice(1) && <motion.span layoutId="nav-pill" className="bnav-pill" aria-hidden />}
                <span className="brush">{l.k}</span>
                <AnimatePresence initial={false}>
                  {!compact && (
                    <motion.span className="bnav-label" {...fade}>
                      {l.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {tip === l.label && (
                    <motion.span
                      className="bnav-tip"
                      role="tooltip"
                      style={{ transformOrigin: "50% 100%" }}
                      initial={{ opacity: 0, y: 6, scale: 0.96, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%", transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
                      exit={{ opacity: 0, y: 3, scale: 0.98, x: "-50%", transition: { duration: 0.1 } }}
                    >
                      <b className="brush">{l.k}</b> {l.meaning}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.span layout="position" className="bnav-div" />
        <motion.button layout="position" className={`bnav-icon brush ${sound ? "is-on" : ""}`} aria-pressed={sound} aria-label="Sound" onClick={() => setSound((s) => !s)}>
          音
        </motion.button>
        <motion.button layout="position" className="bnav-icon" aria-label={theme === "night" ? "Switch to day" : "Switch to night"} aria-pressed={theme === "night"} onClick={toggle}>
          <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden>
            <path d="M8 0 V3" stroke="currentColor" />
            <rect x="4" y="3" width="8" height="2" fill="currentColor" />
            <path d="M4.5 5 C1 6.5 1 13.5 4.5 15 H11.5 C15 13.5 15 6.5 11.5 5 Z" className="bnav-lamp" />
            <rect x="4" y="15" width="8" height="2" fill="currentColor" />
            <path d="M8 17 V20" stroke="#C3352B" strokeWidth="1.6" />
          </svg>
        </motion.button>
        <motion.button layout="position" className="bnav-cta" onClick={copy} aria-label={done ? "Email copied" : "Email me"}>
          <AnimatePresence initial={false}>
            {!compact && (
              <motion.span className="bnav-label" {...fade}>
                {done ? "copied!" : "Email me"}
              </motion.span>
            )}
          </AnimatePresence>
          <span aria-hidden>{done ? <span className="brush">済</span> : "→"}</span>
        </motion.button>
      </motion.nav>
    </div>
  );
}
