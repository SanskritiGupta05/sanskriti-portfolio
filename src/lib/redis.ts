import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

export function getRedis() {
    if (globalForRedis.redis) return globalForRedis.redis;
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL is not set");
    const client = new Redis(url, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        connectTimeout: 5000,
    });
    client.on("error", () => {});
    globalForRedis.redis = client;
    return client;
}
