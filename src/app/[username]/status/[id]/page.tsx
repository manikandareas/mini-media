import React from "react";
import FeedAside from "~/app/_components/feed/feed-aside";

export default function DetailsPostPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <h1>{params.id}</h1>
      <FeedAside />
    </>
  );
}
