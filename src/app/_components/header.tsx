"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import MadiaLogo from "~/assets/icon/madia-logo";
import MadiaMonochromeIcon from "~/assets/icon/madia-monocrome";
import DropdownAvatar from "./dropdown-avatar";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

export default function Header() {
  const { theme } = useTheme();
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent p-2">
      <nav className="border-1  mx-auto flex w-full  items-center rounded-full border bg-white/20 px-3 py-1.5 backdrop-blur-sm dark:bg-black/20 md:max-w-6xl md:rounded-lg md:px-4">
        <div className="flex flex-1 items-center gap-x-2">
          <Link href={"/"}>
            {theme === "light" ? (
              <MadiaMonochromeIcon color="#000" size={28} />
            ) : (
              <MadiaLogo size={28} />
            )}
          </Link>
          {/* <Input type="search" className="hidden w-64 md:block" /> */}
        </div>
        <div>
          {status === "authenticated" ? (
            <div className="flex items-center gap-x-2">
              <Button className="rounded-full" variant={"outline"} size={"sm"}>
                Create
              </Button>
              <DropdownAvatar />
            </div>
          ) : (
            <Link
              href={"/api/auth/signin"}
              className={cn(buttonVariants({ size: "sm", variant: "default" }))}
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
