import { z } from "zod";
import { imageSchema } from "~/app/lib/validators";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        images: true,
      },
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(2, {
            message: "Content must be at least 2 characters.",
          })
          .max(160, {
            message: "Text must not be longer than 30 characters.",
          }),
        media: z.array(imageSchema).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdPost = await ctx.db.post.create({
        data: {
          content: input.content,
          authorId: ctx.session.user.id,
        },
      });

      if (!input.media) {
        return {
          post: createdPost,
          media: null,
        };
      }

      const formattedMedia = input.media.map((media) => {
        return {
          url: media.url,
          postId: createdPost.id,
        };
      });

      const uploadedMedia = await ctx.db.images.createMany({
        data: formattedMedia,
      });

      return {
        post: createdPost,
        media: uploadedMedia,
      };
    }),
});
