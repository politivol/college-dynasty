import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";

export const playersRouter = router({
  listByTeam: publicProcedure
    .input(z.object({ teamId: z.string().cuid() }))
    .query(({ input }) => db.player.findMany({ where: { teamId: input.teamId } })),
  get: publicProcedure
    .input(z.object({ playerId: z.string().cuid() }))
    .query(({ input }) => db.player.findUnique({ where: { id: input.playerId } })),
  create: protectedProcedure
    .input(z.object({ teamId: z.string().cuid(), name: z.string(), position: z.string(), year: z.string().optional(), ovr: z.number().int().optional() }))
    .mutation(({ input }) =>
      db.player.create({ data: input })
    ),
  update: protectedProcedure
    .input(z.object({ playerId: z.string().cuid(), name: z.string().optional(), position: z.string().optional(), year: z.string().optional(), ovr: z.number().int().optional() }))
    .mutation(({ input }) =>
      db.player.update({ where: { id: input.playerId }, data: { name: input.name, position: input.position, year: input.year, ovr: input.ovr } })
    ),
  transfer: protectedProcedure
    .input(z.object({ playerId: z.string().cuid(), teamId: z.string().cuid().nullable() }))
    .mutation(({ input }) =>
      db.player.update({ where: { id: input.playerId }, data: { teamId: input.teamId } })
    ),
});
