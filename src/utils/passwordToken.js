import crypto from "node:crypto";
import { RESET_PASSWORD_TOKEN_EXPIRES_IN } from "../config/constant.js";

export function generateResetPasswordToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashResetPasswordToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getResetPasswordExpiration() {
  return new Date(Date.now() + RESET_PASSWORD_TOKEN_EXPIRES_IN);
}
