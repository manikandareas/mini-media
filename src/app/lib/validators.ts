import { z } from "zod";

export const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export const FormUploadPostSchema = z.object({
  status: z
    .string()
    .min(2, {
      message: "Status must be at least 2 characters.",
    })
    .max(255, {
      message: "Bio must not be longer than 255 characters.",
    }),
});
