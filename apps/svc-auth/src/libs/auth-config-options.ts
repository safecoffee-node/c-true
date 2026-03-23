import { BetterAuthOptions } from "better-auth";

export const authConfigOptions = (
  vars: CloudflareBindings,
): BetterAuthOptions => ({
  emailAndPassword: {
    enabled: true,
  },
  appName: "svc-auth",
  baseURL: vars.APP_ENV === "dev" ? "http://svc-auth" : vars.AUTH_BASE_URL,
  trustedOrigins: () => {
    if (vars.APP_ENV === "dev") {
      return ["http://localhost:4321"];
    }
    return [vars.BETTER_AUTH_URL];
  },
});
