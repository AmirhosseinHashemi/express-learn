import { execute, prisma } from "../../database/prisma.js";

export const authRepository = {
  async createRefreshToken(data) {
    return execute(() => prisma.refreshToken.create({ data }));
  },

  async findRefreshTokenByTokenId(tokenId) {
    return execute(() =>
      prisma.refreshToken.findUnique({ where: { tokenId } }),
    );
  },
};
