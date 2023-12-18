import Link from "next/link";
import DropdownAvatar from "./DropdownAvatar";
import { buttonVariants } from "./ui/button";
import { cn } from "../../common/lib/utils";
import { auth } from "~/server/auth";
import LogoHeader from "./HeaderLogo";

export default async function Header() {
  const data = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent p-2">
      <nav className="border-1  mx-auto flex w-full items-center rounded-full border bg-white/20 px-3 py-1.5 backdrop-blur-sm dark:bg-black/20 md:max-w-6xl md:rounded-lg md:px-4">
        <div className="flex flex-1 items-center gap-x-2">
          <LogoHeader />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            {data?.user ? (
              <DropdownAvatar />
            ) : (
              <Link
                href={"/api/auth/signin"}
                className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
