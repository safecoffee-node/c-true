import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema.ts";

export const db = drizzle(env.quote_app_core_db, {
  schema,
});
