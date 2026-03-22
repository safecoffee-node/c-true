import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";
import { drizzle } from "drizzle-orm/d1";
import { authConfigOptions } from "./auth-config-options.js";

export const handleAuth = (vars: CloudflareBindings) => {
  return betterAuth({
    database: drizzleAdapter(drizzle(vars.quote_app_svc_auth), {
      provider: "sqlite",
      schema,
    }),
    ...authConfigOptions(vars),
  });
};
