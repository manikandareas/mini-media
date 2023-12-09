import type { Like } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const manualDialogClose = () => {
  document.getElementById("closeDialog")?.click();
};

export const manualSheetClose = () => {
  document.getElementById("sheetClose")?.click();
};

export const getFeedActionColor = (color: string) => {
  const textColorMap = {
    cyan: "group-hover:text-cyan-500",
    blue: "group-hover:text-blue-500",
    green: "group-hover:text-green-500",
    rose: "group-hover:text-rose-500",
    sky: "group-hover:text-sky-500",
  };
  const iconColorMap = {
    cyan: "group-hover:bg-cyan-500/10 group-hover:text-cyan-500",
    blue: "group-hover:bg-blue-500/10 group-hover:text-blue-500",
    green: "group-hover:bg-green-500/10 group-hover:text-green-500",
    rose: "group-hover:bg-rose-500/10 group-hover:text-rose-500",
    sky: "group-hover:bg-sky-500/10 group-hover:text-sky-500",
  };
  switch (color) {
    case "cyan":
      return {
        text: textColorMap.cyan,
        icon: iconColorMap.cyan,
      };
    case "blue":
      return {
        text: textColorMap.blue,
        icon: iconColorMap.blue,
      };
    case "green":
      return {
        text: textColorMap.green,
        icon: iconColorMap.green,
      };
    case "rose":
      return {
        text: textColorMap.rose,
        icon: iconColorMap.rose,
      };
    case "sky":
      return {
        text: textColorMap.sky,
        icon: iconColorMap.sky,
      };
  }
};

export const getRelativeSize = (indexLength: number) => {
  switch (indexLength) {
    case 1:
      return 510 - 4;
    case 2:
      return 510 / 2 - 4;
    case 3:
      return 510 / 3 - 4;
    case 4:
      return 510 / 2 - 4;
  }
};

export const extractTagsFromStatus = (status: string) => {
  return status.match(/#\S+/g);
};

export const alreadyLikeChecker = (
  likes: Pick<Like, "userId">[],
  userId: string,
) => {
  return likes.some((like) => like.userId === userId);
};
