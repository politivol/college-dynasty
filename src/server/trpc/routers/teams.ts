import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";

export const teamsRouter = router({
  create: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid(), name: z.string(), abbrev: z.string().optional() }))
    .mutation(({ input }) =>
      db.team.create({ data: { dynastyId: input.dynastyId, name: input.name, abbrev: input.abbrev } })
    ),
  listByDynasty: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) =>
      db.team.findMany({ where: { dynastyId: input.dynastyId }, include: { coach: true } })
    ),
  get: publicProcedure
    .input(z.object({ teamId: z.string().cuid() }))
    .query(({ input }) =>
      db.team.findUnique({ where: { id: input.teamId }, include: { players: true, coach: true } })
    ),
  update: protectedProcedure
    .input(z.object({ teamId: z.string().cuid(), name: z.string().optional(), mascot: z.string().optional() }))
    .mutation(({ input }) =>
      db.team.update({ where: { id: input.teamId }, data: { name: input.name, mascot: input.mascot } })
    ),
  setCoach: protectedProcedure
    .input(z.object({ teamId: z.string().cuid(), name: z.string() }))
    .mutation(({ input }) =>
      db.coach.upsert({
        where: { teamId: input.teamId },
        update: { name: input.name },
        create: { teamId: input.teamId, name: input.name }
      })
    ),
});
