"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// Eye icon + how many people have visited the portfolio.
// Each browser is counted once: the first visit adds one, later visits just read the number.
// one request per page load, even if React runs the effect twice (it does in development)
let request: Promise<number | null> | null = null;
function load() {
  if (request) return request;
  let seen = false;
  try { seen = localStorage.getItem("visited") === "1"; } catch {}
  request = fetch("/api/visits", { method: seen ? "GET" : "POST" })
    .then((r) => r.json())
    .then(({ count }: { count: number | null }) => {
      if (!seen && count !== null) try { localStorage.setItem("visited", "1"); } catch {}
      return count;
    })
    .catch(() => null);
  return request;
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => { load().then(setCount); }, []);

  return (
    <span className="label inline-flex items-center gap-1.5 !text-ink" title="Visitors so far">
      <Eye aria-hidden="true" className="size-4" strokeWidth={1.6} />
      <span className="tabular-nums">{count === null ? "—" : count.toLocaleString("en-IN")}</span>
      <span className="sr-only">visitors</span>
    </span>
  );
}
