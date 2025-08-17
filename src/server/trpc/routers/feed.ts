import { z } from "zod";
import { db } from "../../db";
import { router, protectedProcedure, publicProcedure } from "../router";
import { CreatePostSchema } from "../../../lib/validation";

export const feedRouter = router({
  list: publicProcedure
    .input(z.object({ dynastyId: z.string().cuid() }))
    .query(({ input }) =>
      db.post.findMany({
        where: { dynastyId: input.dynastyId },
        include: { author: true, likes: true, comments: true },
        orderBy: { createdAt: "desc" }
      })
    ),
  createPost: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) =>
      db.post.create({ data: { ...input, authorId: ctx.session!.user!.id } })
    ),
  like: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(({ ctx, input }) =>
      db.like.create({ data: { postId: input.postId, userId: ctx.session!.user!.id } })
    ),
  unlike: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(({ ctx, input }) =>
      db.like.delete({ where: { postId_userId: { postId: input.postId, userId: ctx.session!.user!.id } } })
    ),
  comment: protectedProcedure
    .input(z.object({ postId: z.string().cuid(), body: z.string() }))
    .mutation(({ ctx, input }) =>
      db.comment.create({ data: { postId: input.postId, body: input.body, authorId: ctx.session!.user!.id } })
    ),
});
