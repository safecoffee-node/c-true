import { db } from "@/db/db.ts";
import { quotes } from "@/db/schema.ts";
import { defineAction, type ActionAPIContext } from "astro:actions";

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
  getAllQuotes: defineAction({
    handler: builder((d) =>
      d.query.quotes.findMany({
        with: {
          topics: true,
        },
      }),
    ),
  }),
};
