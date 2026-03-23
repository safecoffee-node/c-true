import { handleAuth } from "./libs/auth.js";

export type AuthInstance = ReturnType<typeof handleAuth>;
export type User = AuthInstance["$Infer"]["Session"]["user"];
export type Session = AuthInstance["$Infer"]["Session"];
