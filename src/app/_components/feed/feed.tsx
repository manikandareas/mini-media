import { api } from "~/trpc/server";
import Post from "~/app/_components/feed/post";

export default async function Feed() {
  const data = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {data.length > 0 ? (
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
