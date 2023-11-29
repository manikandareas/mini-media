import { useEffect, useRef } from "react";
import { useAppSelector } from "~/state/store";

const useGrowingTextarea = () => {
  const statusValue = useAppSelector((state) => state.post.status);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
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
