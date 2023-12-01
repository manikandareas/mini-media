"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import PreviewImage from "./preview-image";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useUploadThing } from "~/app/lib/uploadthing";
import { useGrowingTextarea } from "~/app/_hooks/useGrowingTextarea";
import RibbonMenu from "./ribbon-menu";
import { defaultImage } from "~/app/lib/data";
import { setMediaFiles, setStatus } from "~/state/post/postSlice";
import { useAppDispatch } from "~/state/store";
import { useInputMedia } from "~/app/_hooks/useInputMedia";

function FormCreatePost() {
  const { textAreaRef, statusValue } = useGrowingTextarea();
  const { handlerInputMediaChange, handlerRemoveMedia, mediaFiles, mediaURLs } =
    useInputMedia();

  const { data } = useSession();

  const dispatch = useAppDispatch();

  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading } = api.post.create.useMutation({
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

  const { startUpload, isUploading: isImageUploading } =
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
              disabled={!statusValue || isImageUploading || isLoading}
              onClick={handlerSubmit}
            >
              {isLoading || isImageUploading ? (
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
