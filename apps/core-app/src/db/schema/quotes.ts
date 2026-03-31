import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { topics } from "./topics.ts";
import { createId } from "./utils.ts";

export const quotes = t.sqliteTable("quotes", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => createId("qt_")),
  body: t.text(),
  statut: t
    .text({
      enum: [
        "verified",
        "misattributed_warning",
        "attributed",
        "rejected",
        "banned",
      ],
    })
    .default("attributed"),
  publishAt: t
    .text("publishAt", { mode: "json" })
    .$type<string[]>()
    .default([]),
  source: t.text("source").notNull(),
  author: t.text("author").notNull(),
  nationalite: t.text().notNull(),
  topicId: t
    .text("topic_id")
    .notNull()
    .references(() => topics.id),
});

export const quotesRelations = relations(quotes, ({ one }) => ({
  topics: one(topics, {
    fields: [quotes.topicId],
    references: [topics.id],
  }),
}));
