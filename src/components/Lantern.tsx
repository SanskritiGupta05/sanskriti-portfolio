"use client";

import { useEffect, useRef } from "react";
import { mountLantern } from "../../assets/lantern/lantern.js";
import { useTheme } from "./ThemeProvider";

// The paper lantern hanging from the page's top-right corner. Pulling the tassel (or clicking it) switches day ↔ night.
export function Lantern() {
  const host = useRef<HTMLDivElement>(null);
  const { setNight } = useTheme();
  useEffect(() => {
    if (!host.current) return;
    const lantern = mountLantern(host.current, { onToggle: (lit: boolean) => setNight(lit) });
    return () => lantern.destroy();
  }, [setNight]);
  return <div ref={host} className="absolute top-0 right-0 z-20 w-[clamp(80px,8.8vw,128px)] text-ink" />;
}
