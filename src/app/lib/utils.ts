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
