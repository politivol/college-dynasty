import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure } from "../router";
import { CreateImportBatchSchema, CommitRosterSchema, CommitRecruitingSchema } from "../../../lib/validation";

export const importsRouter = router({
  createBatch: protectedProcedure
    .input(CreateImportBatchSchema)
    .mutation(({ ctx, input }) =>
      db.importBatch.create({ data: { ...input, createdById: ctx.session!.user!.id } })
    ),
  startOCR: protectedProcedure
    .input(z.object({ batchId: z.string().cuid() }))
    .mutation(() => ({ ok: true })),
  getBatch: protectedProcedure
    .input(z.object({ batchId: z.string().cuid() }))
    .query(({ input }) => db.importBatch.findUnique({ where: { id: input.batchId }, include: { rosterRows: true, recruitRows: true } })),
  listBatches: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) => db.importBatch.findMany({ where: { dynastyId: input.dynastyId }, orderBy: { createdAt: "desc" } })),
  commitRoster: protectedProcedure
    .input(CommitRosterSchema)
    .mutation(({ input }) =>
      db.importBatch.update({ where: { id: input.batchId }, data: { status: "COMMITTED" } })
    ),
  commitRecruiting: protectedProcedure
    .input(CommitRecruitingSchema)
    .mutation(({ input }) =>
      db.importBatch.update({ where: { id: input.batchId }, data: { status: "COMMITTED" } })
    ),
});
