import { z } from "zod";
import {
  DEAFULT_USERS_SORT_COLUMN,
  USER_DEFAULT_PAGE_SIZE,
  USER_MAX_PAGE_SIZE,
  USER_SORT_ENUM,
} from "./user.constants.js";

export const getUsersQuerySchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().optional(),
  
  search: z.string().trim().optional(),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(USER_MAX_PAGE_SIZE)
    .default(USER_DEFAULT_PAGE_SIZE),

  orderBy: z
    .enum(USER_SORT_ENUM)
    .default(DEAFULT_USERS_SORT_COLUMN)
    .transform((sort) => {
      if (!sort) return undefined;

      return {
        [sort.replace("-", "")]: sort.startsWith("-") ? "desc" : "asc",
      };
    }),
});

export const createUserSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  password: z.string().min(4),
});

export const getUserParamsSchema = z.object({
  id: z.coerce.number().int().min(1),
});
