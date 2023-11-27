"use client";
import Post from "~/app/_components/feed/post";
import { api } from "~/trpc/react";
import FeedLoading from "~/app/_components/feed/feed-loading";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (!data || isLoading) {
    return <FeedLoading />;
  }

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
