import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure } from "../router";

export const dynastyRouter = router({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      return db.dynasty.create({
        data: {
          name: input.name,
          members: { create: { userId: ctx.session!.user!.id, role: "OWNER" } }
        }
      });
    }),
  list: protectedProcedure.query(({ ctx }) =>
    db.dynasty.findMany({
      where: { members: { some: { userId: ctx.session!.user!.id } } }
    })
  ),
  join: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .mutation(({ ctx, input }) =>
      db.dynastyMember.create({
        data: { dynastyId: input.dynastyId, userId: ctx.session!.user!.id }
      })
    ),
  invite: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid(), email: z.string().email() }))
    .mutation(() => ({ ok: true })),
  updateSeason: protectedProcedure
    .input(z.object({ dynastyId: z.string().cuid(), season: z.number().int().min(1) }))
    .mutation(({ input }) =>
      db.dynasty.update({ where: { id: input.dynastyId }, data: { season: input.season } })
    ),
});
