import { Hono } from "hono";
import { handleAuth } from "./libs/auth.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ doc: "Hello Hono!" });
});

app.on(["GET", "POST"], "/api/*", (c) => {
  const bindings = c.env as CloudflareBindings;
  return handleAuth(bindings).handler(c.req.raw);
});

export default app;
