import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";
import { CreatePollSchema } from "../../../lib/validation";

export const pollsRouter = router({
  createPoll: protectedProcedure
    .input(CreatePollSchema)
    .mutation(({ ctx, input }) =>
      db.poll.create({
        data: {
          dynastyId: input.dynastyId,
          authorId: ctx.session!.user!.id,
          question: input.question,
          closesAt: input.closesAt,
          options: { create: input.options.map((text) => ({ text })) }
        }
      })
    ),
  vote: protectedProcedure
    .input(z.object({ pollId: z.string().cuid(), optionId: z.string().cuid() }))
    .mutation(({ ctx, input }) =>
      db.pollVote.create({ data: { pollId: input.pollId, optionId: input.optionId, userId: ctx.session!.user!.id } })
    ),
  closePoll: protectedProcedure
    .input(z.object({ pollId: z.string().cuid() }))
    .mutation(({ input }) => db.poll.update({ where: { id: input.pollId }, data: { isClosed: true } })),
  listByDynasty: publicProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) =>
      db.poll.findMany({ where: { dynastyId: input.dynastyId }, include: { options: { include: { votes: true } } } })
    ),
});
