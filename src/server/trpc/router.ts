import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";
import { dynastyRouter } from "./routers/dynasty";
import { teamsRouter } from "./routers/teams";
import { coachesRouter } from "./routers/coaches";
import { playersRouter } from "./routers/players";
import { gamesRouter } from "./routers/games";
import { recruitingRouter } from "./routers/recruiting";
import { portalRouter } from "./routers/portal";
import { feedRouter } from "./routers/feed";
import { importsRouter } from "./routers/imports";
import { pollsRouter } from "./routers/polls";

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next();
});

export const appRouter = router({
  dynasty: dynastyRouter,
  teams: teamsRouter,
  coaches: coachesRouter,
  players: playersRouter,
  games: gamesRouter,
  recruiting: recruitingRouter,
  portal: portalRouter,
  feed: feedRouter,
  imports: importsRouter,
  polls: pollsRouter,
});

export type AppRouter = typeof appRouter;
