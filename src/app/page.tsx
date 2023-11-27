import { api } from "~/trpc/server";
import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";
import Post from "./_components/feed/post";
import type { RouterOutputs } from "~/trpc/shared";

type PostsResponse = RouterOutputs["post"]["getAll"];

export default async function Home() {
  const data: PostsResponse = await api.post.getAll.query();

  return (
    <>
      <Feed>
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
      </Feed>
      <FeedAside />
    </>
  );
}
