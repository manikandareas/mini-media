"use client";
import Post from "~/app/_components/post/post";
import { api } from "~/trpc/react";
import FeedLoading from "./feed-loading";
import FormCreatePost from "../form/form-create-post";
import { Banana } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();

  const { status: isUserSignedIn } = useSession();

  if (!data || isLoading) {
    return <FeedLoading />;
  }

  return (
    <section className=" relative flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {isUserSignedIn === "authenticated" ? (
        <>
          <FormCreatePost />
          <FormCreatePost.Popup>
            <Button
              size={"icon"}
              className="fixed bottom-4 right-4 z-50 rounded-full md:hidden"
            >
              <Banana />
            </Button>
          </FormCreatePost.Popup>
        </>
      ) : null}
      {data.length > 0 ? (
        data.map((post) => (
          <Post
            key={post.post.id}
            images={post.media}
            post={post.post}
            user={post.author}
            likes={post.likes}
          />
        ))
      ) : (
        <h1>No data</h1>
      )}
    </section>
  );
}
