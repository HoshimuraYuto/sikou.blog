import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = String(req.query.url);
  const rawComments = await redis.lrange(`comment:${url}`, 0, -1);

  res.status(200).json(rawComments);
}
