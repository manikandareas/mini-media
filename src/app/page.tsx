import { api } from "~/trpc/server";
import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";
import { Suspense } from "react";
import FeedLoading from "./_components/feed/feed-loading";

export default async function Home() {
  const data = await api.post.getAll.query();

  return (
    <main className="relative mx-auto flex max-w-6xl justify-center ">
      <Suspense fallback={<FeedLoading />}>
        <Feed data={data} />
      </Suspense>
      <FeedAside />
    </main>
  );
}
