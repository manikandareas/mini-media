"use client";
import { Info, MoreHorizontal } from "lucide-react";
import {
  alreadyLikeChecker,
  cn,
  getFeedActionColor,
  defaultImage,
} from "~/common/lib";
import { postFooterAction } from "~/common/constant/post";
import type { Images, Like, Post, User } from "@prisma/client";
import PostImage from "~/app/_components/post/PostImage";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Avatar } from "~/common/component/avatar";

type PostProps = {
  user: User;
  post: Post;
  likes: Pick<Like, "userId">[];
  images: Images[];
};

export default function Post({ images, post, user, likes }: PostProps) {
  const { mutate } = api.post.toggleLike.useMutation({
    onSuccess: async () => {
      await apiCtx.post.getAll.invalidate();
    },
  });

  const { status } = useSession();

  const [postLikes, setPostLikes] = useState<number>(likes.length);
  const [isAlreadyLike, setIsAlreadyLike] = useState<boolean>(false);

  const apiCtx = api.useUtils();

  const handleToggleLike = () => {
    if (status === "authenticated") {
      if (isAlreadyLike) {
        setPostLikes(postLikes - 1);
        setIsAlreadyLike(false);
      } else {
        setIsAlreadyLike(true);
        setPostLikes(postLikes + 1);
      }

      mutate({ postId: post.id });
    } else {
      toast.error("Upps you need to login", {
        position: "bottom-right",
        duration: 5000,
        icon: <Info />,
      });
    }
  };

  useEffect(() => {
    setIsAlreadyLike(alreadyLikeChecker(likes, user.id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className="flex h-fit flex-col gap-4  border p-4">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            src={user.image ?? defaultImage(user.name)}
            alt={user.name ?? ""}
            size={"sm"}
            fallback={user.name ?? ""}
          />

          <div className="leading-5">
            <h1>{user.name}</h1>
            <small className="text-muted-foreground">@{user.name}</small>
          </div>
        </div>
        <i className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-primary-foreground">
          <MoreHorizontal />
        </i>
      </header>
      <main className="space-y-2">
        <p className="text-lg text-primary">{post.status}</p>
        {images ? <PostImage images={images} /> : null}
      </main>
      <footer>
        <ul className="flex w-full items-center gap-4">
          {postFooterAction.map((item, index) => {
            return (
              <li
                key={index}
                className="group flex cursor-pointer items-center "
                onClick={handleToggleLike}
              >
                <i
                  className={cn(
                    "rounded-full p-1",
                    getFeedActionColor(item.color)?.icon,
                  )}
                >
                  <item.icon
                    size={21}
                    className={cn({
                      "text-rose-500": isAlreadyLike,
                    })}
                  />
                </i>
                {item.value ? (
                  <small
                    className={cn(getFeedActionColor(item.color)?.text, {
                      "text-rose-500": isAlreadyLike,
                    })}
                  >
                    {postLikes + 1000}
                  </small>
                ) : null}
              </li>
            );
          })}
        </ul>
      </footer>
    </article>
  );
}
