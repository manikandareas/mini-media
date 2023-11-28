import { type RouterOutputs, getBaseUrl } from "~/trpc/shared";
import Feed from "./_components/feed/feed";
import FeedAside from "./_components/feed/feed-aside";
import { unstable_cache } from "next/cache";

import axios from "axios";

export type PostsResponse = RouterOutputs["post"]["getAll"];

const fetchPost = async () => {
  const response = await axios.get(`${getBaseUrl()}/api/post`);

  return response.data as PostsResponse;
};

const getListPosts = unstable_cache(async () => fetchPost(), ["posts"]);

export default async function Home() {
  const data = await getListPosts();
  console.log(data);
  return (
    <>
      <Feed data={data} />
      <FeedAside />
    </>
  );
}
