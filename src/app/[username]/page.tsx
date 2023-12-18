import Counter from "../_components/Counter";
import FeedAside from "../_components/feed/FeedAside";

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
