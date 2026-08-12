import config from "./index.js";

export const BCRYPT_SALT_ROUNDS = 10;
export const FRONT_END_ROUTE = "http://localhost:5173";
export const REFRESH_TOKEN_EXPIRES_IN =
  config.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000;
