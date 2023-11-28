"use client";
import React, { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Cat, ImageIcon, Loader2, ScanSearch } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "~/app/lib/utils";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import PreviewImage from "./preview-image";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useUploadThing } from "~/app/lib/uploadthing";

function CreatePost() {
  const [val, setVal] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [inputMedia, setInputMedia] = useState<(Blob | MediaSource)[]>([]);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);

  const { data } = useSession();

  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading } = api.post.create.useMutation({
    onSuccess: async () => {
      toast.success("Successfully created post!", {
        position: "bottom-right",
        duration: 5000,
      });

      await apiCtx.post.getAll.invalidate();

      setInputMedia([]);
      setVal("");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });

  const { startUpload, isUploading: isImageUploading } =
    useUploadThing("imageUploader");

  const handlerSubmit = async () => {
    try {
      const media = inputMedia
        ? await startUpload(inputMedia as File[]).then((res) => {
            const formattedMedia = res?.map((image) => ({
              id: image.name,
              url: image.url,
            }));
            return formattedMedia ?? [];
          })
        : [];

      await mutateAsync({
        status: val,
        media,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerInputMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file === null) {
      setInputMedia([]);
    } else {
      setInputMedia((prevState) => [...prevState, ...file] as Blob[]);
    }
  };

  const handlerRemoveMedia = (idx: number) => {
    const newInputMedia = inputMedia.filter((_, id, __) => id !== idx);
    setInputMedia(newInputMedia);
  };

  useEffect(() => {
    if (inputMedia.length > 0) {
      const newMediaURLs: string[] = [];
      inputMedia.forEach((media) =>
        newMediaURLs.push(URL.createObjectURL(media)),
      );
      setMediaURLs(newMediaURLs);
    }

    return () => {
      setMediaURLs([]);
    };
  }, [inputMedia, setInputMedia]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [val]);
  return (
    <section className="hidden h-auto -translate-y-44 gap-4 border p-4 opacity-0 transition-all ease-in-out md:flex md:translate-y-0 md:opacity-100">
      <div className="w-fit">
        <Avatar
          className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10"
          title={data?.user.name ?? "CN"}
        >
          <AvatarImage src={data?.user.image ?? "https://robohash.org/alien"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="">
          <Textarea
            ref={textAreaRef}
            onChange={(e) => setVal(e.target.value)}
            className="w-full resize-none overflow-hidden border-none text-lg  focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent active:border-none active:outline-none"
            rows={1}
            value={val}
            placeholder="What's on your mind?"
          />
        </div>
        {mediaURLs.length > 0 ? (
          <PreviewImage
            previewSource={mediaURLs}
            deleteAction={handlerRemoveMedia}
          />
        ) : null}
        <Separator className="h-[2px] w-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              title="Media"
              className="group cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
            >
              <Label
                htmlFor="picture"
                className="group-hover:cursor-pointer"
                aria-disabled={inputMedia.length === 4}
              >
                <ImageIcon
                  size={18}
                  className={cn({
                    "text-slate-500": inputMedia.length === 4,
                  })}
                />
              </Label>
              <Input
                id="picture"
                type="file"
                multiple
                className="sr-only"
                accept="image/*"
                onChange={handlerInputMediaChange}
                disabled={inputMedia.length === 4}
              />
            </div>
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
                { "text-slate-500": inputMedia.length > 0 },
              )}
            >
              <Cat size={18} />
            </div>
          </div>
          <div>
            <Button
              className="flex h-fit items-center justify-center rounded-full font-semibold"
              variant={"default"}
              disabled={!val || isImageUploading || isLoading}
              onClick={handlerSubmit}
            >
              {isLoading || isImageUploading ? (
                <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePost;
