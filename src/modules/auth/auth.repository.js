import { execute, prisma } from "../../database/prisma.js";

export const authRepository = {
  async createRefreshToken(data) {
    return execute(() => prisma.refreshToken.create({ data }));
  },
};
