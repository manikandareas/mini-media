"use client";
import Post from "~/app/_components/post/post";
import { api } from "~/trpc/react";
import FeedLoading from "./feed-loading";
import FormCreatePost from "../form/form-create-post";
import { PopupCreatePost } from "../form/popup-create-post";
import { Banana } from "lucide-react";
import { Button } from "../ui/button";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (!data || isLoading) {
    return <FeedLoading />;
  }

  return (
    <section className=" relative flex min-h-screen w-full max-w-[37.5rem] flex-col">
      <FormCreatePost />
      <PopupCreatePost>
        <Button
          size={"icon"}
          className="fixed bottom-4 right-4 z-50 rounded-full md:hidden"
        >
          <Banana />
        </Button>
      </PopupCreatePost>
      {data.length > 0 ? (
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
    </section>
  );
}
