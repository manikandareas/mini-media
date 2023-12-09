import { Label } from "../ui/label";
import { cn } from "~/lib";
import { Cat, ImageIcon, ScanSearch } from "lucide-react";
import { Input } from "../ui/input";
import { useInputMedia } from "~/app/_hooks/useInputMedia";

export default function RibbonMenu() {
  const { handlerInputMediaChange, mediaFiles } = useInputMedia();
  return (
    <div className="flex items-center gap-2">
      <Label
        htmlFor="picture"
        title="Media"
        aria-disabled={mediaFiles.length === 4}
        className="group cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
      >
        <ImageIcon
          size={18}
          className={cn({
            "text-slate-500": mediaFiles.length === 4,
          })}
        />

        <Input
          id="picture"
          type="file"
          multiple
          className="sr-only"
          accept="image/*"
          onChange={handlerInputMediaChange}
          disabled={mediaFiles.length === 4}
        />
      </Label>
      <div
        title="Unsplash"
        className="cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
      >
        <ScanSearch size={18} />
      </div>
      <div
        title="Gif"
        className={cn(
          "cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10",
          { "text-slate-500": mediaFiles.length > 0 },
        )}
      >
        <Cat size={18} />
      </div>
    </div>
  );
}
