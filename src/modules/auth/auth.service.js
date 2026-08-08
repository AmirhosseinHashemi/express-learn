import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../../config/constant.js";
import AppError from "../../errors/AppError.js";
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

    const hashedPass = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
    const userToCreate = { ...userData, password: hashedPass };
    return await userRepository.create(userToCreate);
  },

  async loginUser(loginData) {
    const user = await userRepository.findByEmail(loginData.email);

    if (!user) throw new InvalidCredentialError();

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) throw new InvalidCredentialError();

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiration();

    const toCreateRefreshToken = {
      tokenHash: refreshTokenHash,
      userId: user.id,
      expiresAt,
    };
    await authRepository.createRefreshToken(toCreateRefreshToken);

    return { accessToken, refreshToken };
  },
};
