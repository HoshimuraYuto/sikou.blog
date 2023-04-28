import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { name, text, url } = JSON.parse(req.body);
    const newComment = {
      id: nanoid(),
      created_at: Date.now(),
      name: name,
      text: text,
    };
    await redis.lpush(`comment:${url}`, JSON.stringify(newComment));
    res.status(200).json({ message: "Comment received!" });
  }
}
