"use client";
import { type PropsWithChildren } from "react";
import { Button } from "~/app/_components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { useUploadThing } from "~/app/lib/uploadthing";
import { api } from "~/trpc/react";
import PreviewImage from "./preview-image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import RibbonMenu from "./ribbon-menu";
import { useInputMedia } from "~/app/_hooks/useInputMedia";
import { useGrowingTextarea } from "~/app/_hooks/useGrowingTextarea";
import { manualSheetClose } from "~/app/lib/utils";
import { defaultImage } from "~/app/lib/data";
import { useAppDispatch } from "~/state/store";
import { setMediaFiles, setStatus } from "~/state/post/postSlice";

export function PopupCreatePost({ children }: PropsWithChildren) {
  const { textAreaRef, statusValue } = useGrowingTextarea();

  const { handlerInputMediaChange, handlerRemoveMedia, mediaFiles, mediaURLs } =
    useInputMedia();

  const dispatch = useAppDispatch();
  const { data } = useSession();

  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading: submitPostIsLoading } =
    api.post.create.useMutation({
      onSuccess: async () => {
        toast.success("Successfully created post!", {
          position: "bottom-right",
          duration: 5000,
        });
        await apiCtx.post.getAll.invalidate();
        dispatch(setMediaFiles([]));
        dispatch(setStatus(""));
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
      <SheetContent className="h-auto">
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
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="">
              <Textarea
                ref={textAreaRef}
                onChange={(e) => dispatch(setStatus(e.target.value))}
                className="w-full resize-none overflow-hidden border-none text-lg focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent active:border-none active:outline-none"
                rows={3}
                value={statusValue}
                placeholder="What's on your mind?"
              />
            </div>
            {/* TODO: FIX THIS PREVIEW */}
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
            <Button variant={"outline"} onClick={manualSheetClose}>
              Post
            </Button>
          </div>
          <SheetClose id="sheetClose" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
