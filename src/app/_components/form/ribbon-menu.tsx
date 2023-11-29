import { type ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Cat, ImageIcon, ScanSearch } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

type Props = {
  mediaFiles: (Blob | MediaSource | File)[];
  handlerInputMediaChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RibbonMenu({
  mediaFiles,
  handlerInputMediaChange,
}: Props) {
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
