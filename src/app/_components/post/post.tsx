"use client";
import { MoreHorizontal } from "lucide-react";
import { cn, getFeedActionColor } from "~/lib/utils";
import { defaultImage, postFooterAction } from "~/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Images, Like, Post, User } from "@prisma/client";
import PostImage from "~/app/_components/post/post-image";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

type Props = {
  user: User;
  post: Post;
  likes: Pick<Like, "userId">[];
  images: Images[];
};

export default function Post({ images, post, user, likes }: Props) {
  const { mutate } = api.post.toggleLike.useMutation({
    onSuccess: async () => {
      await apiCtx.post.getAll.invalidate();
    },
  });

  const [postLikes, setPostLikes] = useState<number>(likes.length);
  const [isAlreadyLike, setIsAlreadyLike] = useState<boolean>(false);

  const apiCtx = api.useUtils();

  const handleToggleLike = () => {
    if (isAlreadyLike) {
      setPostLikes(postLikes - 1);
      setIsAlreadyLike(false);
    } else {
      setIsAlreadyLike(true);
      setPostLikes(postLikes + 1);
    }

    mutate({ postId: post.id });
  };

  useEffect(() => {
    setIsAlreadyLike(likes.some((like) => like.userId === user.id));
  }, []);

  return (
    <article className="flex h-fit flex-col gap-4  border p-4">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10">
            <AvatarImage src={user.image ?? defaultImage(user.name)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

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
                onClick={index === 3 ? handleToggleLike : () => null}
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
                      "text-rose-500": index === 3 && isAlreadyLike,
                    })}
                  />
                </i>
                {item.value ? (
                  <small className={cn(getFeedActionColor(item.color)?.text)}>
                    {index === 3 ? postLikes + 1000 : item.value}
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
