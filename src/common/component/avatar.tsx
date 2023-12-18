import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarShadcn,
} from "~/app/_components/ui/avatar";
import { cn } from "../lib";

type AvatarProps = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
  size: "sm" | "lg" | "xl";
  fetchPriority?: "high" | "low";
};

const avatarSize = {
  sm: "h-8 w-8 md:h-10 md:w-10",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

export const Avatar: React.FC<AvatarProps> = ({
  alt,
  size,
  src,
  fallback,
  className,
  fetchPriority,
}) => {
  return (
    <AvatarShadcn className={cn(avatarSize[size])} title={alt}>
      <AvatarImage
        src={src}
        alt={alt}
        className={cn(avatarSize[size], className)}
        fetchPriority={fetchPriority}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarShadcn>
  );
};
