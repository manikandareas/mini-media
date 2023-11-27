import { Suspense } from "react";
import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";

export default function Home() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Feed />
      </Suspense>
      <FeedAside />
    </>
  );
}
