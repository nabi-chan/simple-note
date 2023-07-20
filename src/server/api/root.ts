import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { tabRouter } from "./routers/tabs";
import { articleRouter } from "./routers/article";
import { printerRouter } from "./routers/printer";
import { shareRouter } from "./routers/share";
import { logRouter } from "./routers/logs";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  tab: tabRouter,
  article: articleRouter,
  printer: printerRouter,
  share: shareRouter,
  log: logRouter,
});

export type AppRouter = typeof appRouter;
