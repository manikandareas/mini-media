import { type ChangeEvent, useEffect } from "react";
import postSelector from "~/state/post/postSelector";
import { setMediaFiles, setMediaURLs } from "~/state/post/postSlice";
import { useAppDispatch, useAppSelector } from "~/state/store";

const useInputMedia = () => {
  const { mediaFiles, mediaURLs } = useAppSelector(postSelector);

  const dispatch = useAppDispatch();

  const handlerInputMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files === null) {
      dispatch(setMediaFiles([]));
    } else {
      dispatch(setMediaFiles([...mediaFiles, ...files] as Blob[]));
    }
  };

  const handlerRemoveMedia = (idx: number) => {
    const newInputMedia = mediaFiles.filter((_, id, __) => id !== idx);
    dispatch(setMediaFiles(newInputMedia));
  };

  useEffect(() => {
    if (mediaFiles.length > 0) {
      const newMediaURLs: string[] = [];
      mediaFiles.forEach((media) =>
        newMediaURLs.push(URL.createObjectURL(media)),
      );
      dispatch(setMediaURLs(newMediaURLs));
    }

    return () => {
      dispatch(setMediaURLs([]));
    };
  }, [mediaFiles]);

  return {
    mediaFiles,
    mediaURLs,
    handlerInputMediaChange,
    handlerRemoveMedia,
  };
};

export { useInputMedia };
