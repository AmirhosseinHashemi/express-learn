import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  password: z.string().min(4),
});
