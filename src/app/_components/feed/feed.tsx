import { api } from "~/trpc/server";
import Post from "~/app/_components/feed/post";
import type { RouterOutputs } from "~/trpc/shared";

type PostsResponse = RouterOutputs["post"]["getAll"];

export default async function Feed() {
  const data: PostsResponse = await api.post.getAll.query();

  if (!data) {
    return <h1>Data not found</h1>;
  }

  return (
    <main className="flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {data.length !== 0 ? (
        data.map((post) => (
          <Post
            key={post.post.id}
            images={post.media}
            post={post.post}
            user={post.author}
          />
        ))
      ) : (
        <h1>No data</h1>
      )}
    </main>
  );
}
