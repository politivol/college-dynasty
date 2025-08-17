import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";

export const coachesRouter = router({
  get: publicProcedure
    .input(z.object({ coachId: z.string().cuid() }))
    .query(({ input }) => db.coach.findUnique({ where: { id: input.coachId } })),
  updateRecord: protectedProcedure
    .input(z.object({ coachId: z.string().cuid(), recordW: z.number().int(), recordL: z.number().int() }))
    .mutation(({ input }) =>
      db.coach.update({ where: { id: input.coachId }, data: { recordW: input.recordW, recordL: input.recordL } })
    ),
  updateScheme: protectedProcedure
    .input(z.object({ coachId: z.string().cuid(), scheme: z.string().optional() }))
    .mutation(({ input }) =>
      db.coach.update({ where: { id: input.coachId }, data: { scheme: input.scheme } })
    ),
});
