import { db } from "~/server/db";

export async function GET() {
  try {
    const posts = await db.post
      .findMany({
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          images: true,
        },
      })
      .then((res) =>
        res.map((post) => ({
          media: post.images,
          author: post.author,
          post: {
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            authorId: post.authorId,
          },
        })),
      );

    return Response.json(posts);
  } catch (error) {
    throw new Error("Cannot fetch posts");
  }
}
