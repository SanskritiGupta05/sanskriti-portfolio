"use client";

import { useEffect, useState } from "react";

const fmt = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).toLowerCase();

// Sanskriti's local time in India, updated every 15 seconds (empty until the page is in the browser).
export function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const first = window.setTimeout(() => setTime(fmt()), 0);
    const id = window.setInterval(() => setTime(fmt()), 15000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}
