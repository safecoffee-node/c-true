/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals extends Runtime {
    user: import("@r/types").AuthType_SVCAUTH.User;
    session: import("@r/types").AuthType_SVCAUTH.Session;
  }
}
