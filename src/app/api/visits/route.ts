import { promises as fs } from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), ".data", "visits.json");

async function file(add: number) {
    let count = 0;
    try {
        count = JSON.parse(await fs.readFile(FILE, "utf8")).count ?? 0;
    } catch {}
    if (add) {
        count += add;
        await fs.mkdir(path.dirname(FILE), { recursive: true });
        await fs.writeFile(FILE, JSON.stringify({ count }));
    }
    return count;
}

export async function GET() {
    try {
        return Response.json({ count: await file(0) });
    } catch {
        return Response.json({ count: null }, { status: 503 });
    }
}

export async function POST() {
    try {
        return Response.json({ count: await file(1) });
    } catch {
        return Response.json({ count: null }, { status: 503 });
    }
}
