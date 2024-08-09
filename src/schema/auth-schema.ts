import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("your email schema are incorrect"),
  password: z.string().min(6),
});
export type LoginSchema = z.infer<typeof loginSchema>;

// --------------
export const registerSchema = z.object({
  username: z.string().min(4, "Username should be more that 4 characters"),
  email: z.string().email("your email schema are incorrect"),
  password: z.string().min(6),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

// --------------
