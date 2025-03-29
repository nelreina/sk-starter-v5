import { RedisClient } from "@nelreina/redis-client";
import "dotenv/config";

const REDIS_HOST = process.env["REDIS_HOST"];
const REDIS_PORT = process.env["REDIS_PORT"] || 6379;
const REDIS_USER = process.env["REDIS_USER"];
const REDIS_PW = process.env["REDIS_PW"];
const SERVICE = process.env["SERVICE_NAME"] || "unknown";
export const client = new RedisClient({
  redisHost: REDIS_HOST,
  redisPort: REDIS_PORT,
  redisUser: REDIS_USER,
  redisPw: REDIS_PW,
  serviceName: SERVICE,
});
