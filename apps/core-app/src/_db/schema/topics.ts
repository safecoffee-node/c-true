import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { quotes } from "./quotes.ts";
import { seriesTopics } from "./series.ts";
import { createId } from "./utils.ts";

export const topics = t.sqliteTable("topics", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => createId("tp_")),
  name: t.text("name").unique().notNull(),
});

export const TopicsRelations = relations(topics, ({ many }) => ({
  series: many(seriesTopics),
  quotes: many(quotes),
}));
