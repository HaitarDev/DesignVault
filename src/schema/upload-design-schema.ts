import { z } from "zod";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const designSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(4),
  // tags: z.array(z.string()).max(5, "You have max 5 tags"),
});

export type DesignSchema = z.infer<typeof designSchema>;
