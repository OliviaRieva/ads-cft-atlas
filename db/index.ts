import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

// Raw prepared statements let each answer and its completion marker be committed
// in one D1 batch. Drizzle migrations remain the source of the database schema.
export function getQuizDb() {
  if (!env.DB) throw new Error("Persistent progress is temporarily unavailable. Please try again shortly.");
  return env.DB;
}
