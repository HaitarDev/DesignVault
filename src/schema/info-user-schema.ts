import { z } from "zod";

export const userInfoSchema = z.object({
  username: z.string().min(4),
  description: z.string(),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;
