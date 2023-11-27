import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";

export default function Home() {
  return (
    <main className="relative mx-auto flex max-w-6xl justify-center ">
      <Feed />
      <FeedAside />
    </main>
  );
}
