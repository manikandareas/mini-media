import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { getRelativeSize } from "~/app/helpers/getRelativeSize";

type Props = {
  previewSource: string[];
  deleteAction: (idx: number) => void;
};

export default function PreviewImage({ previewSource, deleteAction }: Props) {
  return (
    <figure className="flex flex-wrap gap-1">
      {previewSource.length === 3
        ? previewSource.map((src, idx) => {
            if (idx === 2) {
              return (
                <div key={idx} className="relative">
                  <i
                    className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/50 p-1"
                    onClick={() => deleteAction(idx)}
                  >
                    <X size={18} />
                  </i>
                  <Image
                    src={src}
                    alt="Preview Image"
                    className="rounded-lg object-cover"
                    width={getRelativeSize(1)}
                    height={getRelativeSize(1)}
                  />
                </div>
              );
            }
            return (
              <div key={idx} className="relative">
                <i
                  className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/50 p-1"
                  onClick={() => deleteAction(idx)}
                >
                  <X size={18} />
                </i>
                <Image
                  src={src}
                  alt="Preview Image"
                  className="rounded-lg object-cover"
                  width={getRelativeSize(2)}
                  height={getRelativeSize(2)}
                />
              </div>
            );
          })
        : previewSource.map((src, idx) => (
            <div key={idx} className="relative">
              <i
                className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/50 p-1"
                onClick={() => deleteAction(idx)}
              >
                <X size={18} />
              </i>
              <Image
                src={src}
                alt="Preview Image"
                className="rounded-lg object-cover"
                width={getRelativeSize(previewSource.length)}
                height={getRelativeSize(previewSource.length)}
              />
            </div>
          ))}
    </figure>
  );
}
