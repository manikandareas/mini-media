import { useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { useGrowingTextarea } from "~/app/_hooks/useGrowingTextarea";
import { useInputMedia } from "~/app/_hooks/useInputMedia";
import { defaultImage, manualSheetClose, useUploadThing } from "~/common/lib";
import { setMediaFiles, setStatus } from "~/state/post/postSlice";
import { useAppDispatch } from "~/state/store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import PreviewImage from "./FormPreviewImage";
import RibbonMenu from "./FormRibbonMenu";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { ZodError } from "zod";

type FormCreatePostPopupProps = PropsWithChildren;
export function FormCreatePostPopup({ children }: FormCreatePostPopupProps) {
  const { textAreaRef, statusValue } = useGrowingTextarea();

  const { handlerRemoveMedia, mediaFiles, mediaURLs } = useInputMedia();

  const dispatch = useAppDispatch();

  const user = useSession().data?.user;
  const apiCtx = api.useUtils();
  const { mutateAsync, isLoading: submittingPostIsLoading } =
    api.post.create.useMutation({
      onSettled: () => {
        dispatch(setMediaFiles([]));
        dispatch(setStatus(""));
        manualSheetClose();
      },

      onSuccess: async () => {
        toast.success("Successfully created post!", {
          position: "bottom-center",
          duration: 5000,
        });

        await apiCtx.post.getAll.invalidate();
      },
      onError: (error) => {
        if (error instanceof ZodError) {
          toast.error(error.message, {
            position: "bottom-right",
            duration: 5000,
          });
        } else {
          toast.error("Oops weird thing happened, try again later", {
            position: "bottom-right",
            duration: 5000,
          });
        }
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
              title={user?.name ?? "CN"}
            >
              <AvatarImage src={user?.image ?? defaultImage(user?.name)} />
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
            <RibbonMenu />
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
