import type { AuthType_SVCAUTH } from "@r/types/index.ts";
import type { MiddlewareHandler } from "astro";
import { env } from "cloudflare:workers";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  if (ctx.url.pathname.startsWith("/admin")) {
    const res = await env.SVC_AUTH.fetch(
      new Request("http://svc-auth/api/auth/get-session", {
        headers: { cookie: ctx.request.headers.get("cookie") ?? "" },
      }),
    );
    const d = (await res.json()) as {
      user: AuthType_SVCAUTH.User | null;
    } | null;

    if (!d || !d.user) {
      return ctx.redirect("/login");
    }

    ctx.locals.user = d.user;
  }

  return next();
};
