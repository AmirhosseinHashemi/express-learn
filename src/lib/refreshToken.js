import bcrypt from "bcrypt";
import crypto from "node:crypto";
import {
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../config/constant.js";

export function generateRefreshToken() {
  const tokenId = crypto.randomBytes(16).toString("hex");
  const secret = crypto.randomBytes(64).toString("hex");

  const refreshToken = `${tokenId}.${secret}`;

  return {
    tokenId,
    refreshToken,
  };
}

export async function hashRefreshToken(token) {
  return bcrypt.hash(token, BCRYPT_SALT_ROUNDS);
}

export function getRefreshTokenExpiration() {
  return new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN);
}
