"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Loader2, Cat, ImageIcon, ScanSearch } from "lucide-react";

import { useSession } from "next-auth/react";
import PreviewImage from "./preview-image";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useUploadThing } from "~/app/lib/uploadthing";
import { useGrowingTextarea } from "~/app/_hooks/useGrowingTextarea";
import { defaultImage } from "~/app/lib/data";
import { setMediaFiles, setStatus } from "~/state/post/postSlice";
import { useAppDispatch } from "~/state/store";
import { useInputMedia } from "~/app/_hooks/useInputMedia";
import type { PropsWithChildren, ChangeEvent } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import { manualSheetClose } from "~/app/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

/*
 * Form create post
 */

function FormCreatePost() {
  const { textAreaRef, statusValue } = useGrowingTextarea();
  const { handlerInputMediaChange, handlerRemoveMedia, mediaFiles, mediaURLs } =
    useInputMedia();

  const { data } = useSession();

  const dispatch = useAppDispatch();

  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading: submittingPostIsLoading } =
    api.post.create.useMutation({
      onSuccess: async () => {
        toast.success("Successfully created post!", {
          position: "bottom-right",
          duration: 5000,
        });

        dispatch(setStatus(""));
        dispatch(setMediaFiles([]));
        await apiCtx.post.getAll.invalidate();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 5000,
        });
      },
    });

  const { startUpload, isUploading: uploadingImageIsLoading } =
    useUploadThing("imageUploader");

  const handlerSubmit = async () => {
    try {
      const media = mediaFiles
        ? await startUpload(mediaFiles as File[]).then((res) => {
            const formattedMedia = res?.map((image) => ({
              id: image.name,
              url: image.url,
            }));
            return formattedMedia ?? [];
          })
        : [];

      await mutateAsync({
        status: statusValue,
        media,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="hidden h-auto -translate-y-44 gap-4 border p-4 opacity-0 transition-all ease-in-out md:flex md:translate-y-0 md:opacity-100">
      <div className="w-fit">
        <Avatar
          className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10"
          title={data?.user.name ?? "CN"}
        >
          <AvatarImage
            src={data?.user.image ?? defaultImage(data?.user.name)}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="">
          <Textarea
            ref={textAreaRef}
            onChange={(e) => dispatch(setStatus(e.target.value))}
            className="w-full resize-none overflow-hidden border-none text-lg  focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent active:border-none active:outline-none"
            rows={1}
            value={statusValue}
            placeholder="What's on your mind?"
            maxLength={280}
          />
        </div>
        {mediaURLs.length > 0 ? (
          <PreviewImage
            previewSource={mediaURLs}
            removeAction={handlerRemoveMedia}
          />
        ) : null}
        <Separator className="h-[2px] w-full" />
        <div className="flex items-center justify-between">
          <RibbonMenu
            handlerInputMediaChange={handlerInputMediaChange}
            mediaFiles={mediaFiles}
          />
          <div>
            <Button
              className="flex items-center justify-center rounded-full"
              variant={"default"}
              disabled={
                !statusValue ||
                uploadingImageIsLoading ||
                submittingPostIsLoading
              }
              onClick={handlerSubmit}
            >
              {submittingPostIsLoading || uploadingImageIsLoading ? (
                <>
                  <span>Loading&nbsp;</span>
                  <Loader2 className=" h-4 w-4 animate-spin" />
                </>
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
export default FormCreatePost;

/*
 * Popup create post
 */

type PopupCreatePostProps = PropsWithChildren;
export function PopupCreatePost({ children }: PopupCreatePostProps) {
  const { textAreaRef, statusValue } = useGrowingTextarea();

  const { handlerInputMediaChange, handlerRemoveMedia, mediaFiles, mediaURLs } =
    useInputMedia();

  const dispatch = useAppDispatch();
  const { data } = useSession();

  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading: submittingPostIsLoading } =
    api.post.create.useMutation({
      onSuccess: async () => {
        toast.success("Successfully created post!", {
          position: "bottom-center",
          duration: 5000,
        });
        dispatch(setMediaFiles([]));
        dispatch(setStatus(""));
        await apiCtx.post.getAll.invalidate();
        manualSheetClose();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "bottom-right",
          duration: 5000,
        });
      },
    });

  const { startUpload, isUploading: uploadingImageIsLoading } =
    useUploadThing("imageUploader");

  const handlerSubmit = async () => {
    try {
      const media = mediaFiles
        ? await startUpload(mediaFiles as File[]).then((res) => {
            const formattedMedia = res?.map((image) => ({
              id: image.name,
              url: image.url,
            }));
            return formattedMedia ?? [];
          })
        : [];

      await mutateAsync({
        status: statusValue,
        media,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="h-auto overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
        </SheetHeader>

        <section className="flex h-auto gap-4 py-8">
          <div className="w-fit">
            <Avatar
              className="h-11 w-11 hover:cursor-pointer "
              title={data?.user.name ?? "CN"}
            >
              <AvatarImage
                src={data?.user.image ?? defaultImage(data?.user.name)}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex grow flex-col">
            <Textarea
              ref={textAreaRef}
              onChange={(e) => dispatch(setStatus(e.target.value))}
              className="w-full resize-none overflow-hidden border-none text-lg focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent active:border-none active:outline-none"
              rows={3}
              value={statusValue}
              placeholder="What's on your mind?"
              maxLength={280}
            />
          </div>
        </section>
        {mediaURLs.length > 0 ? (
          <>
            <PreviewImage
              previewSource={mediaURLs}
              removeAction={handlerRemoveMedia}
            />
          </>
        ) : null}
        <SheetFooter>
          <div className="flex items-center justify-between border-t py-1">
            <RibbonMenu
              handlerInputMediaChange={handlerInputMediaChange}
              mediaFiles={mediaFiles}
            />
            <Button
              variant={"outline"}
              onClick={handlerSubmit}
              disabled={uploadingImageIsLoading || submittingPostIsLoading}
            >
              {submittingPostIsLoading || uploadingImageIsLoading ? (
                <>
                  <span>Loading&nbsp;</span>
                  <Loader2 className=" h-4 w-4 animate-spin" />
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
          <SheetClose id="sheetClose" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

FormCreatePost.Popup = PopupCreatePost;

/*
 * Ribbon Menu
 */

type RibbonMenuProps = {
  mediaFiles: (Blob | MediaSource | File)[];
  handlerInputMediaChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RibbonMenu = ({
  mediaFiles,
  handlerInputMediaChange,
}: RibbonMenuProps) => {
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
};
