"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import MadiaLogo from "~/assets/icon/madia-logo";
import MadiaMonochromeIcon from "~/assets/icon/madia-monocrome";
import { Input } from "./ui/input";
import DropdownAvatar from "./dropdown-avatar";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 w-full p-2">
      <nav className="border-1 mx-auto flex w-full items-center justify-between rounded-full border bg-black/10 px-3 py-1.5 backdrop-blur-sm md:max-w-6xl md:rounded-lg md:px-4">
        <div className="flex items-center gap-x-2">
          <Link href={"/"}>
            {theme === "light" ? (
              <MadiaMonochromeIcon color="#000" size={28} />
            ) : (
              <MadiaLogo size={28} />
            )}
          </Link>
          <Input type="search" className="hidden w-64 md:block" />
        </div>
        <div>
          <DropdownAvatar />
        </div>
      </nav>
    </header>
  );
}
