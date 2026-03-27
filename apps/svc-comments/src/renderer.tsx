import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
      <div className="app"></div>
      <script type="module" src="/src/client.tsx"></script>
    </html>
  );
});
