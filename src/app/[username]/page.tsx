import React from "react";
import FeedAside from "../_components/feed/feed-aside";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <>
      <h1>{params.username}</h1>
      <FeedAside />
    </>
  );
}
