import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../../config/constant.js";
import emailService from "../../email/email.service.js";
import {
  generateEmailVerificationToken,
  getEmailVerificationExpiration,
  hashEmailVerificationToken,
} from "../../email/email.token.js";
import { verificationTemplate } from "../../email/templates/verifications.template..js";
import AppError from "../../errors/AppError.js";
import UnauthorizedError from "../../errors/UnauthorizedError.js";
import { generateAccessToken } from "../../lib/jwt.js";
import {
  generateRefreshToken,
  getRefreshTokenExpiration,
  hashRefreshToken,
} from "../../lib/refreshToken.js";
import { userRepository } from "../users/users.repository.js";
import { authRepository } from "./auth.repository.js";
import InvalidCredentialError from "./errors/InvalidCredentialError.js";

export const authService = {
  async registerUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser)
      throw new AppError({
        message: "Email already exists",
        statusCode: 409,
        errorCode: "DATABASE_DUPLICATE_ERROR",
      });

    const emailToken = generateEmailVerificationToken();
    const hashedEmailToken = hashEmailVerificationToken(emailToken);
    const emailTokenExpiration = getEmailVerificationExpiration();

    const hashedPass = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
    const userToCreate = { ...userData, password: hashedPass };

    const user = await userRepository.create(userToCreate);

    const newEmailTokenData = {
      tokenHash: hashedEmailToken,
      userId: user.id,
      expiresAt: emailTokenExpiration,
    };
    await authRepository.createEmailVerificationToken(newEmailTokenData);

    const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${emailToken}`;
    const er = await emailService.send({
      to: user.email,
      subject: "Verify your email",

      text: `Verify your email: ${verificationUrl}`,
      html: verificationTemplate({
        name: user.name,
        verificationUrl,
      }),
    });

    return user;
  },

  async loginUser(loginData) {
    const user = await userRepository.findByEmail(loginData.email);

    if (!user) throw new InvalidCredentialError();

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) throw new InvalidCredentialError();

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const { refreshToken, tokenId } = generateRefreshToken();
    const refreshTokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiration();

    const toCreateRefreshToken = {
      tokenId,
      tokenHash: refreshTokenHash,
      userId: user.id,
      expiresAt,
    };
    await authRepository.createRefreshToken(toCreateRefreshToken);

    return { accessToken, refreshToken };
  },

  async refreshToken(token) {
    if (!token) throw new UnauthorizedError();

    const [tokenId] = token.split(".");
    const storedToken = await authRepository.findRefreshTokenByTokenId(tokenId);
    if (!storedToken) throw new UnauthorizedError();

    const isValid = await bcrypt.compare(token, storedToken.tokenHash);
    if (!isValid) throw new UnauthorizedError();

    if (storedToken.expiresAt < new Date()) throw new UnauthorizedError();
    if (storedToken.revokedAt) {
      await authRepository.revokeAllUserRefreshTokens(storedToken.userId);
      throw new UnauthorizedError();
    }

    const { refreshToken, tokenId: newTokenId } = generateRefreshToken();
    const refreshTokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiration();

    const refreshTokenToCreate = {
      tokenId: newTokenId,
      tokenHash: refreshTokenHash,
      userId: storedToken.userId,
      expiresAt,
    };
    await authRepository.rotateRefreshToken(
      storedToken.id,
      refreshTokenToCreate,
    );

    const accessToken = generateAccessToken({
      userId: storedToken.userId,
    });

    return { accessToken, refreshToken };
  },

  async logout(token) {
    if (!token) throw new UnauthorizedError();

    const [tokenId] = token.split(".");
    if (!tokenId) throw new UnauthorizedError();

    const tokenRaw = await authRepository.findRefreshTokenByTokenId(tokenId);
    if (!tokenRaw) throw new UnauthorizedError();

    const isValid = await bcrypt.compare(token, tokenRaw.tokenHash);
    if (!isValid) throw new UnauthorizedError();

    if (tokenRaw.revokedAt) throw new UnauthorizedError();

    await authRepository.revokeRefreshToken(tokenRaw.id);
  },

  async logoutAll(userId) {
    if (!userId) throw new UnauthorizedError();
    await authRepository.revokeAllUserRefreshTokens(userId);
  },

  async verifyToken(token) {
    const hashedToken = hashEmailVerificationToken(token);
    const storedToken =
      await authRepository.findEmailVerificationToken(hashedToken);

    if (!storedToken)
      throw new AppError({
        message: "Invalid verification token",
        errorCode: "INVALID_TOKEN",
        statusCode: 422,
      });

    if (storedToken.expiresAt < new Date())
      throw new AppError({
        message: "Verification token expired",
        errorCode: "EXPIRED_TOKEN",
        statusCode: 422,
      });

    if (storedToken.usedAt)
      throw new AppError({
        message: "Verification token already used",
        errorCode: "USED_TOKEN",
        statusCode: 422,
      });

    await authRepository.updateUserAsVerified(storedToken.userId, hashedToken);
  },
};
