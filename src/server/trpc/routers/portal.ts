import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";

export const portalRouter = router({
  listPortal: publicProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) => db.recruitTarget.findMany({ where: { dynastyId: input.dynastyId, portal: true } })),
  addToPortal: protectedProcedure
    .input(z.object({ targetId: z.string().cuid() }))
    .mutation(({ input }) => db.recruitTarget.update({ where: { id: input.targetId }, data: { portal: true } })),
  transferCommit: protectedProcedure
    .input(z.object({ targetId: z.string().cuid(), teamId: z.string().cuid() }))
    .mutation(({ input }) =>
      db.recruitTarget.update({ where: { id: input.targetId }, data: { commitTeamId: input.teamId, portal: false, status: "COMMITTED" } })
    ),
});
