import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});

export const patchUserSchema = {
  name: {
    type: "string",
  },

  email: {
    type: "string",
  },
};
