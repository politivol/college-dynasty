import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";

export const recruitingRouter = router({
  listTargets: publicProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) => db.recruitTarget.findMany({ where: { dynastyId: input.dynastyId } })),
  createTarget: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid(), name: z.string(), position: z.string(), stars: z.number().int() }))
    .mutation(({ input }) => db.recruitTarget.create({ data: { ...input, interest: {} } })),
  updateInterest: protectedProcedure
    .input(z.object({ targetId: z.string().cuid(), teamId: z.string().cuid(), points: z.number().int() }))
    .mutation(async ({ input }) => {
      const target = await db.recruitTarget.findUnique({ where: { id: input.targetId } });
      const interest = (target?.interest as any) || {};
      interest[input.teamId] = input.points;
      return db.recruitTarget.update({ where: { id: input.targetId }, data: { interest } });
    }),
  commit: protectedProcedure
    .input(z.object({ targetId: z.string().cuid(), teamId: z.string().cuid() }))
    .mutation(({ input }) =>
      db.recruitTarget.update({ where: { id: input.targetId }, data: { commitTeamId: input.teamId, status: "COMMITTED" } })
    ),
  sign: protectedProcedure
    .input(z.object({ targetId: z.string().cuid() }))
    .mutation(({ input }) =>
      db.recruitTarget.update({ where: { id: input.targetId }, data: { status: "SIGNED" } })
    ),
});
