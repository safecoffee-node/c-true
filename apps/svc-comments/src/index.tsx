import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.html(`
    <div id="comments"></div>
    <script type="module" src="http://localhost:5173/src/client.tsx" defer></script>
    
  `);
});

export default app;
