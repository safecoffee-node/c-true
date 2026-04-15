import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { createId } from "./utils.ts";
import { topics } from "./topics.ts";

export const series = t.sqliteTable("series", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => createId("sr_")),
  name: t.text("name").unique().notNull(),
  userId: t.text("userId").notNull(),
});

export const seriesTopics = t.sqliteTable(
  "series_topics",
  {
    topicId: t
      .text("topic_id")
      .notNull()
      .references(() => topics.id),
    serieId: t
      .text("series_id")
      .notNull()
      .references(() => series.id),
  },
  (table) => [t.primaryKey({ columns: [table.serieId, table.topicId] })],
);

export const seriesTopicsRelations = relations(seriesTopics, ({ one }) => ({
  series: one(series, {
    fields: [seriesTopics.serieId],
    references: [series.id],
  }),
  topic: one(topics, {
    fields: [seriesTopics.topicId],
    references: [topics.id],
  }),
}));

export const serieRelations = relations(series, ({ many }) => ({
  topics: many(seriesTopics),
}));
