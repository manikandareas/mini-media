import { cn } from "~/app/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFeedActionColor } from "~/app/helpers/getFeedActionColor";
import { postFooterAction } from "~/app/lib/data";
import { MoreHorizontal } from "lucide-react";
import type { Images, Post, User } from "@prisma/client";
import PostImage from "./post-image";

type Props = {
  user: User;
  post: Post;
  images: Images[];
};

export default function Post({ images, post, user }: Props) {
  return (
    <article className="flex h-fit flex-col gap-4  border p-4">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10">
            <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
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
        <p className="text-lg text-primary">{post.content}</p>
        {images ? <PostImage images={images} /> : null}
      </main>
      <footer>
        <ul className="flex w-full items-center gap-4">
          {postFooterAction.map((item, index) => {
            return (
              <li
                key={index}
                className="group flex cursor-pointer items-center "
              >
                <i
                  className={cn(
                    "rounded-full p-1",
                    getFeedActionColor(item.color)?.icon,
                  )}
                >
                  <item.icon size={21} />
                </i>
                {item.value ? (
                  <small className={cn(getFeedActionColor(item.color)?.text)}>
                    {item.value}
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
