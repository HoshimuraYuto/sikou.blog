export const config = {
  runtime: "edge",
};

import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import type { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
} as RedisProps);

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    const { name, text, url } = await req.json();
    const newComment = {
      id: nanoid(),
      created_at: Date.now(),
      name: name,
      text: text,
    };
    await redis.lpush(`comment:${url}`, JSON.stringify(newComment));
    return new Response(JSON.stringify({ message: "Comment received!" }));
  }
}
