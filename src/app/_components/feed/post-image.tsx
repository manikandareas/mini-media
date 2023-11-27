import type { Images } from "@prisma/client";
import Image from "next/image";

type Props = {
  images: Images[];
};

export default function PostImage({ images }: Props) {
  return (
    <figure className="flex flex-wrap">
      {images.length === 1
        ? images.map((img) => (
            <Image
              key={img.id}
              src={img.url}
              alt="image"
              className="max-h-[32rem] grow overflow-hidden rounded-lg object-cover"
              quality={100}
              width={512}
              height={512}
              priority
            />
          ))
        : images.length === 2
          ? images.map((img) => (
              <Image
                key={img.id}
                src={img.url}
                alt="image"
                className="max-w-[calc(100%/2)] grow rounded-lg object-cover"
                quality={100}
                width={256}
                height={256}
                priority
              />
            ))
          : images.length === 3
            ? images.map((img, idx) => {
                if (idx === 0) {
                  return (
                    <Image
                      key={img.id}
                      src={img.url}
                      alt="image"
                      className="max-h-[32rem] grow rounded-lg object-cover"
                      quality={100}
                      width={512}
                      height={512}
                      priority
                    />
                  );
                }
                return (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt="image"
                    className="max-w-[calc(100%/2)]  grow rounded-lg object-cover"
                    quality={100}
                    width={256}
                    height={256}
                    priority
                  />
                );
              })
            : images.map((img, idx) => {
                if (idx === 0) {
                  return (
                    <Image
                      key={img.id}
                      src={img.url}
                      alt="image"
                      className=" grow rounded-lg object-cover"
                      quality={100}
                      width={512}
                      height={512}
                      priority
                    />
                  );
                }
                return (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt="image"
                    className=" max-w-[calc(100%/3)] grow rounded-lg object-cover"
                    quality={100}
                    width={200}
                    height={200}
                    priority
                  />
                );
              })}
    </figure>
  );
}
