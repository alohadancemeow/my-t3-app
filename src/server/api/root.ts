import { router } from "./trpc";
// import { exampleRouter } from "./routers/example";
import { notesRouter } from "./routers/mynotes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = router({
  // example: exampleRouter,
  mynotes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
