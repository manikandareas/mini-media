import { cn } from "~/app/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFeedActionColor } from "~/app/helpers/getFeedActionColor";
import { postFooterAction } from "~/app/lib/data";
import { MoreHorizontal } from "lucide-react";

// type Props = {};

export default function Post() {
  return (
    <article className="flex h-fit flex-col gap-4  border p-4">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="leading-5">
            <h1>Simon Fairhurst</h1>
            <small className="text-muted-foreground">@simonfairhurst</small>
          </div>
        </div>
        <i className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-primary-foreground">
          <MoreHorizontal />
        </i>
      </header>
      <main>
        <p className="text-lg text-primary">
          Figma, Webflow, or Framer. Which one will take the lead in 2023 and be
          the goto for digital design?
        </p>
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
