import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  password: z.string().min(4),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(4),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});
