"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "day" | "night";

const THEME_EVENT = "kyo:theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "day";
  return document.documentElement.dataset.theme === "night" ? "night" : "day";
}

/** Shared day/night state. The lantern and the nav both toggle it. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    setTheme(readTheme());
    const on = () => setTheme(readTheme());
    window.addEventListener(THEME_EVENT, on);
    return () => window.removeEventListener(THEME_EVENT, on);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "night" ? "day" : "night";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("kyo-theme", next);
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { theme, toggle };
}

/** Adds `true` once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Copy to clipboard and flip a short-lived “done” flag (for the hanko stamp). */
export function useCopy(text: string) {
  const [done, setDone] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setDone(true);
    window.setTimeout(() => setDone(false), 2000);
  }, [text]);
  return { done, copy };
}
