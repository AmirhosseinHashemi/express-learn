import crypto from "node:crypto";
import bcrypt from "bcrypt";
import config from "../config/index.js";
import { BCRYPT_SALT_ROUNDS } from "../config/constant.js";

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export async function hashRefreshToken(token) {
  return bcrypt.hash(token, BCRYPT_SALT_ROUNDS);
}

export function getRefreshTokenExpiration() {
  return new Date(
    Date.now() + config.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
  );
}
