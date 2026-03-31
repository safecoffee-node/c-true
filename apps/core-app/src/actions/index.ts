import { auth } from "./auth.action.js";
import { quotesAction } from "./quotes.action.ts";

export const server = {
  auth,
  quotesAction,
};
