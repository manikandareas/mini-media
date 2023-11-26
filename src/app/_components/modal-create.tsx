"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Button } from "~/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { Textarea } from "./ui/textarea";

import { toast } from "react-hot-toast";
import { Cat, Image as ImageIcon, ScanSearch, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { api } from "~/trpc/react";

const FormSchema = z.object({
  content: z
    .string()
    .min(2, {
      message: "Content must be at least 2 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export function ModalCreate() {
  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      toast.success("Successfully create post!", {
        position: "bottom-right",
      });

      form.resetField("content");
      form.setValue("content", "");
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [inputMedia, setInputMedia] = useState<(Blob | MediaSource)[]>([]);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      content: data.content,
    });
  }

  const handlerInputMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file === null) {
      setInputMedia([]);
    } else {
      setInputMedia((prevState) => [...prevState, file[0]] as Blob[]);
    }
  };

  const handlerRemoveMedia = (idx: number) => {
    const newInputMedia = inputMedia.filter((_, id, __) => id !== idx);
    setInputMedia(newInputMedia);
  };

  useEffect(() => {
    if (inputMedia.length > 0) {
      const newMediaURLs: string[] = [];
      inputMedia.forEach((media) =>
        newMediaURLs.push(URL.createObjectURL(media)),
      );
      setMediaURLs(newMediaURLs);
    }

    return () => {
      setMediaURLs([]);
    };
  }, [inputMedia, setInputMedia]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="rounded-full">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-scroll sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is happening?!"
                      className="h-fit resize-none placeholder:text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mediaURLs.length > 0 ? (
              <figure className="flex flex-wrap">
                {mediaURLs.map((url, idx) => (
                  <div className="relative flex grow" key={idx}>
                    <button
                      type="button"
                      onClick={() => handlerRemoveMedia(idx)}
                      className="bg-black/50s rounded-full p-1 "
                    >
                      <X size={18} className="absolute right-1 top-1" />
                    </button>
                    <Image
                      src={url}
                      alt={url}
                      width={200}
                      height={200}
                      className="grow rounded-md"
                    />
                  </div>
                ))}
              </figure>
            ) : null}

            <div className="flex items-center gap-2">
              <div
                title="Media"
                className="group cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
              >
                <Label
                  htmlFor="picture"
                  className="group-hover:cursor-pointer"
                  aria-disabled={inputMedia.length === 4}
                >
                  <ImageIcon
                    size={18}
                    className={cn({
                      "text-slate-500": inputMedia.length === 4,
                    })}
                  />
                </Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  className="sr-only"
                  accept="image/*"
                  onChange={handlerInputMediaChange}
                  disabled={inputMedia.length === 4}
                />
              </div>
              <div
                title="Unsplash"
                className="cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
              >
                <ScanSearch size={18} />
              </div>
              <div
                title="Gif"
                className="cursor-pointer rounded-full p-1.5 text-blue-600 hover:bg-blue-600/10"
              >
                <Cat size={18} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <Button variant="ghost" type="submit">
                Archive
              </Button>
              <Button type="submit" disabled={isLoading}>
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
