import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verfyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret);
}
