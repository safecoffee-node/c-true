import { db } from "@/db/db.ts";
import { quotes, topics } from "@/db/schema.ts";
import { z } from "astro/zod";
import { defineAction, type ActionAPIContext } from "astro:actions";
import { count, eq } from "drizzle-orm";
import type { SQLiteSelect } from "drizzle-orm/sqlite-core";

function withPagination<T extends SQLiteSelect>(
  q: T,
  page: number,
  pageSize: number = 10,
) {
  return q.limit(pageSize).offset(page * pageSize);
}

function builder<TInput, TOutput>(
  handler: (
    d: typeof db,
    input: TInput,
    ctx: ActionAPIContext,
  ) => Promise<TOutput>,
) {
  return (input: TInput, ctx: ActionAPIContext) => handler(db, input, ctx);
}

export const quotesAction = {
  paginate: defineAction({
    input: z.object({
      page: z.number(),
      pageSize: z.number().optional(),
    }),
    handler: builder(async (d, input: { page: number; pageSize?: number }) => {
      const { page = 0, pageSize = 10 } = input;
      const data = await d.query.quotes.findMany({
        with: {
          topics: true,
        },
        limit: pageSize,
        offset: page * pageSize,
      });
      const [{ total }] = await d.select({ total: count() }).from(quotes);

      return {
        data,
        meta: {
          total,
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          hasNext: page < Math.ceil(total / pageSize) - 1,
          hasPrev: page > 0,
        },
      };

      // const dynamicQuery = query.
    }),
  }),
};
