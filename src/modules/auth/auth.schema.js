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

export const validateTokenSchema = z.object({
  token: z.string().min(1),
});

export const resendVerificationSchema = z.object({
  email: z.string().trim().email(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
