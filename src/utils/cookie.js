import { REFRESH_TOKEN_EXPIRES_IN } from "../config/constant.js";
import config from "../config/index.js";

export function setRefreshTokenCookie(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function clearRefreshTokenCookie(res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    path: "/auth/refresh",
  });
}
