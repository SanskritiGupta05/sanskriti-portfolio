"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { getVisitCount, registerVisit } from "@/app/actions/visits";

let request: Promise<number | null> | null = null;
function load() {
    if (request) return request;
    let seen = false;
    try {
        seen = localStorage.getItem("visited") === "1";
    } catch {}
    request = (seen ? getVisitCount() : registerVisit())
        .then((count) => {
            if (!seen && count !== null)
                try {
                    localStorage.setItem("visited", "1");
                } catch {}
            return count;
        })
        .catch(() => null);
    return request;
}

export function VisitorCount() {
    const [count, setCount] = useState<number | null>(null);
    useEffect(() => {
        load().then(setCount);
    }, []);

    return (
        <span className="label inline-flex items-center gap-1.5 !text-ink" title="Visitors so far">
            <Eye aria-hidden="true" className="size-4" strokeWidth={1.6} />
            <span className="tabular-nums">
                {count === null ? "…" : count.toLocaleString("en-IN")}
            </span>
            <span className="sr-only">visitors</span>
        </span>
    );
}
