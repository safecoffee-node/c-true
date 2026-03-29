import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";

export const auth = {
  login: defineAction({
    accept: "form",
    input: z.object({
      email: z.email(),
      password: z.string(),
    }),
    handler: async (input, ctx) => {
      const res = await env.SVC_AUTH.fetch(
        new Request("http://svc-auth/api/auth/sign-in/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
      );
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        // La valeur complète avec la signature
        const value = setCookie
          .split("better-auth.session_token=")[1]
          .split(";")[0];

        ctx.cookies.set(
          "better-auth.session_token",
          decodeURIComponent(value),
          {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge: 604800,
          },
        );
      }

      const data = await res.json();

      console.log(data);
      if (!data.user) throw new Error("Invalid credentials");
      return data;
    },
  }),
};
