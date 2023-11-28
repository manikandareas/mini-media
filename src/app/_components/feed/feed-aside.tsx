import { MoreHorizontal } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  children?: React.ReactNode;
};

export default function FeedAside({}: Props) {
  return (
    <aside className="hidden max-h-[1600px] max-w-[22rem] flex-col gap-y-4 px-4 md:grow lg:flex">
      <div className="group flex items-center justify-center">
        <Input
          type="search"
          className="w-80 rounded-full bg-secondary "
          placeholder="Search"
          id="search"
        />
      </div>

      <div className="rounded-xl bg-primary-foreground text-primary ">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Trends for you</h1>
        </div>

        <div className="flex flex-col ">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <div
                className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-secondary"
                key={idx}
              >
                <div className="flex flex-col">
                  <small className="text-muted-foreground">
                    Trending in Indonesia
                  </small>
                  <strong className="text-sm">#GISELLE</strong>
                  <small className="text-muted-foreground">37.7k posts</small>
                </div>

                <div className=" text-xs text-muted-foreground">
                  <MoreHorizontal />
                </div>
              </div>
            ))}
        </div>

        <div className="px-4 py-4">
          <p className="text-sm text-blue-500">Show more</p>
        </div>
      </div>
    </aside>
  );
}
