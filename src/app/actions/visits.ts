"use server";

import { getRedis } from "@/lib/redis";

const KEY = "portfolio:visits";

export async function getVisitCount(): Promise<number | null> {
    try {
        return Number((await getRedis().get(KEY)) ?? 0);
    } catch {
        return null;
    }
}

export async function registerVisit(): Promise<number | null> {
    try {
        return await getRedis().incr(KEY);
    } catch {
        return null;
    }
}
