import { Redis } from "@upstash/redis/cloudflare";
import type { Env } from "~/type/env";

const redisClient = (env: Env) => Redis.fromEnv(env);

export const getPissStream = async (env: Env) => {
  const redis = redisClient(env);
  const key = "pISSStream";
  const value = await redis.get(key);
  return (value ?? 0) as number;
};
