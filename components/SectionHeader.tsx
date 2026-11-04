"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/lib/hooks";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン作遊和趣";

/** Big brush kanji + romaji kicker + a title that scrambles from katakana into English. */
export default function SectionHeader({ kanji, kicker, title, dark }: { kanji: string; kicker: string; title: string; dark?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.6);
  const [text, setText] = useState(title);

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let frame = 0;
    const total = title.length * 2 + 6;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.max(0, frame * 0.5 - 3);
      setText(
        title
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : GLYPHS[(i * 7 + frame * 3) % GLYPHS.length]))
          .join(""),
      );
      if (frame > total) {
        setText(title);
        window.clearInterval(id);
      }
    }, 30);
    return () => window.clearInterval(id);
  }, [seen, title]);

  return (
    <div ref={ref} className={`shead ${seen ? "is-in" : ""} ${dark ? "is-dark" : ""}`}>
      <span className="shead-kanji brush" aria-hidden>
        {kanji}
      </span>
      <div>
        <p className="shead-kicker mono">{kicker}</p>
        <h2 className="shead-title min" aria-label={title}>
          <span aria-hidden>{text}</span>
        </h2>
      </div>
    </div>
  );
}
