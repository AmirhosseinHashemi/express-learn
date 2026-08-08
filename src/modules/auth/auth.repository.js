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

  async rotateRefreshToken(oldTokenDbId, newTokenData) {
    const [_, refreshToken] = await execute(() =>
      prisma.$transaction([
        prisma.refreshToken.update({
          where: { id: oldTokenDbId },
          data: { revokedAt: new Date() },
        }),
        prisma.refreshToken.create({ data: newTokenData }),
      ]),
    );

    return refreshToken;
  },

  async revokeAllUserRefreshTokens(userId) {
    return execute(() =>
      prisma.refreshToken.updateMany({
        where: {
          userId: userId,
          revokedAt: null,
        },
        data: { revokedAt: new Date() },
      }),
    );
  },
};
