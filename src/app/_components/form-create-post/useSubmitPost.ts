import toast from "react-hot-toast";
import { ZodError } from "zod";
import { manualSheetClose } from "~/lib";
import { api } from "~/trpc/react";

export type SubmitPostProps = {
  resetStatusValue: (status: string) => void;
  resetMediaFilesValue: (files: File[]) => void;
};

export default function useSubmitPost({
  resetMediaFilesValue,
  resetStatusValue,
}: SubmitPostProps) {
  const apiCtx = api.useUtils();
  return api.post.create.useMutation({
    onSettled: () => {
      resetMediaFilesValue([]);
      resetStatusValue("");
    },
    onSuccess: async () => {
      toast.success("Congratulations your post has been published", {
        position: "bottom-right",
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
}

type SubmitPostPopupProps = {
  resetStatusValue: (status: string) => void;
  resetMediaFilesValue: (files: File[]) => void;
};
function useSubmitPostPopup({
  resetStatusValue,
  resetMediaFilesValue,
}: SubmitPostPopupProps) {
  const apiCtx = api.useUtils();
  return api.post.create.useMutation({
    onSettled: () => {
      resetMediaFilesValue([]);
      resetStatusValue("");
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
}

useSubmitPost.usePopup = useSubmitPostPopup;
