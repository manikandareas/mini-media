"use client";
import { api } from "~/trpc/react";
import Post from "~/app/_components/feed/post";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {data ? (
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
