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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.content);
    toast.success("Successfully toasted!", {
      position: "bottom-right",
    });

    form.resetField("content");
    form.setValue("content", "");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="rounded-full">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`&apos;`re
            done.
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
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-2">
              <Button variant="outline" type="submit">
                Archive
              </Button>
              <Button type="submit">Publish</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
