"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import { defaultImage } from "../../common/lib/data";
import { Avatar } from "~/common/component/avatar";
import LogOutButton from "./LogOutButton";

export default function DropdownAvatar() {
  const { data } = useSession();
  const handlerSignout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border-none outline-none ">
          <Avatar
            src={data?.user.image ?? defaultImage(data?.user.name)}
            alt={data?.user.name ?? ""}
            fallback={data?.user.name ?? ""}
            size="sm"
            fetchPriority="high"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex w-full items-center justify-between">
            <span className="w-36">{data?.user.name ?? "My Account"}</span>
            <ModeToggle />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogOutButton onClick={handlerSignout} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
