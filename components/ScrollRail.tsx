"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/content";

/** Sticky kanji rail on the left; each kanji inks in as its section passes. */
export default function ScrollRail() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(SECTIONS.findIndex((s) => s.id === e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    // hide at the very top (hero) and once the footer scene takes over
    const onTop = () => {
      const nearEnd = window.scrollY + window.innerHeight > document.body.scrollHeight - 650;
      if (window.scrollY < 500 || nearEnd) setActive(-1);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <aside className={`rail ${active >= 0 ? "is-visible" : ""}`} aria-label="Sections">
      {SECTIONS.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className={`rail-stop ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}>
          <span className="brush">{s.k}</span>
          <span className="rail-label mono">{s.label}</span>
        </a>
      ))}
    </aside>
  );
}
