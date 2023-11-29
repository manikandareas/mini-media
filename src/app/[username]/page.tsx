import Counter from "../_components/counter";
import FeedAside from "../_components/feed/feed-aside";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <>
      <Counter />
      <h1>{params.username}</h1>
      <FeedAside />
    </>
  );
}
