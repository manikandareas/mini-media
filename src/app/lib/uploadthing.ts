import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();
