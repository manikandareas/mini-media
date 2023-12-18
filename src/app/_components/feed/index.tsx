"use client";
import Post from "~/app/_components/post";
import { api } from "~/trpc/react";
import FormCreatePost from "../form-create-post";
import { Banana } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import FeedLoading from "./FeedLoading";
import { FormCreatePostPopup } from "../form-create-post/FormPopup";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();
  const { status: statusAuthorizationUser } = useSession();

  if (!data || isLoading) {
    return <FeedLoading />;
  }

  return (
    <section className=" relative flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {statusAuthorizationUser === "authenticated" ? (
        <>
          <FormCreatePost />
          <FormCreatePostPopup>
            <Button
              size={"icon"}
              className="fixed bottom-4 right-4 z-50 rounded-full md:hidden"
            >
              <Banana />
            </Button>
          </FormCreatePostPopup>
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
