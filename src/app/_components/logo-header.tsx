"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import MadiaLogo from "~/assets/icon/madia-logo";
import MadiaMonochromeIcon from "~/assets/icon/madia-monocrome";

export default function LogoHeader() {
  const { theme } = useTheme();

  return (
    <Link href={"/"}>
      {theme === "light" ? (
        <MadiaMonochromeIcon color="#000" size={28} />
      ) : (
        <MadiaLogo size={28} />
      )}
    </Link>
  );
}
