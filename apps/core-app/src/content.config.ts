import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

const citationSchema = z.object({
  citation: z.string(),
  citation_originale: z.string(),
  auteur: z.string(),
  nationalite: z.string(),
  source_originale: z.string(),
  source: z.string(),
  source_originale: z.string().optional(),
  publishAt: z.array(z.string()),
  statut: z.enum(["verified", "attributed"]),
});

const themeSchema = z.object({
  titre: z.string(),
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
    }),

    themes: z.record(z.string(), themeSchema),
  }),
});

export const collections = { blog, quotes };
