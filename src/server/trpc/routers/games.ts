import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";
import { ReportResultSchema } from "../../../lib/validation";

export const gamesRouter = router({
  schedule: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid(), season: z.number().int(), week: z.number().int(), homeTeam: z.string(), awayTeam: z.string() }))
    .mutation(({ input }) =>
      db.game.create({ data: { ...input } })
    ),
  reportResult: protectedProcedure
    .input(ReportResultSchema)
    .mutation(({ input }) =>
      db.game.update({
        where: { id: input.gameId },
        data: { homeScore: input.homeScore, awayScore: input.awayScore, notes: input.notes, playedAt: new Date() }
      })
    ),
  listBySeasonWeek: publicProcedure
    .input(z.object({ dynastyId: z.string().cuid(), season: z.number().int(), week: z.number().int().optional() }))
    .query(({ input }) =>
      db.game.findMany({ where: { dynastyId: input.dynastyId, season: input.season, week: input.week } })
    ),
  get: publicProcedure
    .input(z.object({ gameId: z.string().cuid() }))
    .query(({ input }) => db.game.findUnique({ where: { id: input.gameId } })),
});
