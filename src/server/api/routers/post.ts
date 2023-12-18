import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { extractTagsFromStatus } from "~/common/lib/utils";
import { imageSchema } from "~/common/lib/validators";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.post
        .findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            author: true,
            images: true,
            Likes: {
              select: {
                userId: true,
              },
            },
          },
        })
        .then((res) =>
          res.map((post) => ({
            media: post.images,
            author: post.author,
            likes: post.Likes,
            post: {
              id: post.id,
              status: post.status,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
              authorId: post.authorId,
            },
          })),
        );

      return posts;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong with the server",
      });
    }
  }),

  create: privateProcedure
    .input(
      z.object({
        status: z
          .string()
          .min(2, {
            message: "Status must be at least 2 characters.",
          })
          .max(280, {
            message: "Status must not be longer than 280 characters.",
          }),
        media: z.array(imageSchema).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdPost = await ctx.db.post.create({
        data: {
          status: input.status,
          authorId: ctx.session.user.id,
        },
      });

      const extractedTags = extractTagsFromStatus(input.status);
      if (extractedTags) {
        await ctx.db.tags.createMany({
          data: extractedTags.map((tag) => ({
            tag,
            postId: createdPost.id,
          })),
        });
      }

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

  toggleLike: privateProcedure
    .input(
      z.object({
        postId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.db.like.findFirst({
        where: {
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });

      if (!like) {
        await ctx.db.like.create({
          data: {
            userId: ctx.session.user.id,
            postId: input.postId,
          },
        });

        return {
          action: "like",
        };
      }

      await ctx.db.like.delete({
        where: {
          id: like?.id,
        },
      });

      return {
        action: "unlike",
      };
    }),
});
