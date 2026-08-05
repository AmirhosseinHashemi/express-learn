import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

export function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new UnauthorizedError();
  }
}
