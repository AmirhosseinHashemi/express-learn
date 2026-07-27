export const createUserSchema = {
  name: {
    required: true,
    type: "string",
  },
};

export const patchUserSchema = {
  name: {
    type: "string",
  },

  email: {
    type: "string",
  },
};
