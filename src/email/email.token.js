import crypto from "node:crypto";

export function generateEmailVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashEmailVerificationToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getEmailVerificationExpiration() {
  return new Date(Date.now() + 30 * 60 * 1000) // 30 minutes;
}
