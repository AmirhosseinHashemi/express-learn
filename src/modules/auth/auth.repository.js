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
          userId,
          revokedAt: null,
        },
        data: { revokedAt: new Date() },
      }),
    );
  },

  async revokeRefreshToken(id) {
    return execute(() =>
      prisma.refreshToken.update({
        where: {
          id,
        },
        data: { revokedAt: new Date() },
      }),
    );
  },

  async createEmailVerificationToken(data) {
    return execute(() =>
      prisma.emailVerificationToken.create({
        data: {
          tokenHash: data.tokenHash,
          userId: data.userId,
          expiresAt: data.expiresAt,
        },
      }),
    );
  },

  async findEmailVerificationToken(tokenHash) {
    return execute(() =>
      prisma.emailVerificationToken.findUnique({ where: { tokenHash } }),
    );
  },

  async updateUserAsVerified(userId, tokenHash) {
    return execute(() =>
      prisma.$transaction([
        prisma.emailVerificationToken.update({
          where: {
            tokenHash,
          },
          data: {
            usedAt: new Date(),
          },
        }),

        prisma.user.update({
          where: { id: userId },
          data: {
            emailVerifiedAt: new Date(),
          },
        }),
      ]),
    );
  },

  async rotateEmailVerificationToken(tokenData) {
    return execute(() =>
      prisma.$transaction([
        prisma.emailVerificationToken.updateMany({
          where: {
            userId: tokenData.userId,
            revokedAt: null,
            usedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        }),
        prisma.emailVerificationToken.create({
          data: {
            tokenHash: tokenData.tokenHash,
            userId: tokenData.userId,
            expiresAt: tokenData.expiresAt,
          },
        }),
      ]),
    );
  },

  async rotateResetPasswordTokens(tokenData) {
    return execute(() =>
      prisma.$transaction([
        prisma.passwordResetToken.updateMany({
          where: {
            userId: tokenData.userId,
            revokedAt: null,
            usedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        }),
        prisma.passwordResetToken.create({
          data: {
            expiresAt: tokenData.expiresAt,
            tokenHash: tokenData.tokenHash,
            userId: tokenData.userId,
          },
        }),
      ]),
    );
  },

  // async createResetPasswordToken({ tokenHash, expiresAt, userId }) {
  //   return execute(() =>
  //     prisma.passwordResetToken.create({
  //       data: {
  //         tokenHash,
  //         expiresAt,
  //         userId,
  //       },
  //     }),
  //   );
  // },

  async findResetPasswordToken(tokenHash) {
    return execute(() =>
      prisma.passwordResetToken.findUnique({ where: { tokenHash } }),
    );
  },

  async resetUserPassword(userId, newPassword, resetPassToken) {
    return execute(() =>
      prisma.$transaction([
        prisma.refreshToken.updateMany({
          where: {
            userId,
            revokedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        }),
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newPassword,
          },
        }),
        prisma.passwordResetToken.update({
          where: { tokenHash: resetPassToken },
          data: {
            usedAt: new Date(),
          },
        }),
      ]),
    );
  },
};
