export const config = {
  runtime: "edge",
};

import { Redis } from "@upstash/redis";
import type { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
} as RedisProps);

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const rawComments = await redis.lrange(`comment:${url}`, 0, -1);

  return new Response(JSON.stringify(rawComments));
}
