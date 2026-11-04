"use client";

import { useEffect, useState } from "react";
import PixelMe from "./PixelMe";

/** Scroll-unroll intro. Plays once per session; any key / click skips. */
export default function Intro() {
  const [state, setState] = useState<"hidden" | "open" | "closing">("hidden");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kyo-intro") === "1";
      sessionStorage.setItem("kyo-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("open");
    const close = () => setState((s) => (s === "open" ? "closing" : s));
    const t = window.setTimeout(close, 2300);
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", close);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, []);

  useEffect(() => {
    if (state !== "closing") return;
    const t = window.setTimeout(() => setState("hidden"), 600);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "hidden") return null;
  return (
    <div className={`intro ${state === "closing" ? "is-closing" : ""}`} aria-hidden>
      <div className="scroll">
        <span className="roller roller-l" />
        <div className="scroll-paper">
          <div className="scroll-inner">
            <PixelMe size={96} />
            <p className="brush scroll-hi">ようこそ</p>
            <p className="min scroll-sub">welcome to my little corner of the internet</p>
            <span className="scroll-bar">
              <i />
            </span>
            <span className="scroll-seal" />
          </div>
        </div>
        <span className="roller roller-r" />
      </div>
      <p className="mono intro-skip">press any key to skip</p>
    </div>
  );
}
