import { promises as fs } from "node:fs";
import path from "node:path";

// Visitor counter for the nav's eye icon.
// GET  → { count }       the current number
// POST → { count }       counts one more visitor (the browser only POSTs on its first visit)
//
// Where the number lives:
//  - deployed: Upstash Redis, if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set (free tier is plenty)
//  - local dev: a small file at .data/visits.json (gitignored), so it works with no setup
const KEY = "portfolio:visits";
const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const FILE = path.join(process.cwd(), ".data", "visits.json");

async function redis(cmd: "get" | "incr") {
  const res = await fetch(`${URL}/${cmd}/${KEY}`, { headers: { Authorization: `Bearer ${TOKEN}` }, cache: "no-store" });
  const { result } = (await res.json()) as { result: string | number | null };
  return Number(result ?? 0);
}

async function file(add: number) {
  let count = 0;
  try { count = JSON.parse(await fs.readFile(FILE, "utf8")).count ?? 0; } catch {}
  if (add) {
    count += add;
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify({ count }));
  }
  return count;
}

const read = () => (URL && TOKEN ? redis("get") : file(0));
const bump = () => (URL && TOKEN ? redis("incr") : file(1));

export async function GET() {
  try { return Response.json({ count: await read() }); } catch { return Response.json({ count: null }, { status: 503 }); }
}

export async function POST() {
  try { return Response.json({ count: await bump() }); } catch { return Response.json({ count: null }, { status: 503 }); }
}
