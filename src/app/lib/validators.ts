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
    .max(280, {
      message: "Bio must not be longer than 280 characters.",
    }),
});
