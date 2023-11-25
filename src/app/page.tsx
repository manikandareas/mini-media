import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";
import Post from "./_components/feed/post";

export default function Home() {
  return (
    <>
      <Feed>
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <Post key={idx} />
          ))}
      </Feed>
      <FeedAside />
    </>
  );
}
