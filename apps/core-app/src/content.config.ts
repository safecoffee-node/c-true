import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

const citationSchema = z.object({
  citation: z.string(),
  auteur: z.string(),
  nationalite: z.string(),
  source: z.string(),
  statut: z.enum(["verified", "attributed"]),
});

const themeSchema = z.object({
  titre: z.string(),
  emoji: z.string(),
  citations: z.array(citationSchema),
});

const quotes = defineCollection({
  loader: glob({ base: "./src/content/quotes", pattern: "**/*.json" }),
  schema: z.object({
    meta: z.object({
      total: z.number(),
      themes: z.number(),
      version: z.string(),
      description: z.string(),
      methode: z.string(),
      statuts: z.record(z.string(), z.string()),
      citations_retirees: z.array(
        z.object({
          citation: z.string(),
          attribuee_a: z.string(),
          raison: z.string(),
        }),
      ),
    }),
    themes: z.record(z.string(), themeSchema),
  }),
});

export const collections = { blog, quotes };
