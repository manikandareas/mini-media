import { useEffect, useRef } from "react";
import postSelector from "~/state/post/postSelector";
import { useAppSelector } from "~/state/store";

const useGrowingTextarea = () => {
  const statusValue = useAppSelector(postSelector.Status);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.minHeight = "2.75rem";
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [statusValue]);

  return {
    statusValue,
    textAreaRef,
  };
};

export { useGrowingTextarea };
