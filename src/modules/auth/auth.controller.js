import { sendSuccessResponse } from "../../utils/response.js";
import { authService } from "./auth.service.js";
import config from "../../config/index.js";
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookie.js";

export const authController = {
  async me(req, res) {
    sendSuccessResponse(res, {
      data: {
        userId: req.user.id,
      },
    });
  },

  async registerUser(req, res) {
    const createdUser = await authService.registerUser(req.body);
    const newUser = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
    sendSuccessResponse(res, {
      message: "new user created successfully.",
      data: newUser,
    });
  },

  async loginUser(req, res) {
    const result = await authService.loginUser(req.body);

    setRefreshTokenCookie(res, result.refreshToken);
    sendSuccessResponse(res, {
      message: "Successfully logedin",
      data: { accessToken: result.accessToken },
    });
  },

  async refreshToken(req, res) {
    const result = await authService.refreshToken(req.cookies?.refreshToken);

    setRefreshTokenCookie(res, result.refreshToken);
    sendSuccessResponse(res, {
      message: "New token generated successfully",
      data: { accessToken: result.accessToken },
    });
  },

  async logout(req, res) {
    await authService.logout(req.cookies?.refreshToken);
    clearRefreshTokenCookie(res);
    sendSuccessResponse(res, { message: "logout successfully" });
  },

  async logoutAll(req, res) {
    await authService.logoutAll(req?.user?.id);

    sendSuccessResponse(res, {
      message: "Logged out from all sessions successfully",
    });
  },

  async verifyToken(req, res) {
    const { token } = req.query;
    await authService.verifyToken(token);

    sendSuccessResponse(res, { message: "Email verified successfully" });
  },

  async resenVerification(req, res) {
    const { email } = req.body;
    await authService.resendVerification(email);

    sendSuccessResponse(res, {
      message: "If the email exists, a vrification email has been sent",
    });
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    await authService.forgotPassword(email);

    sendSuccessResponse(res, {
      message: "If the email exists, a reset link has been sent",
    });
  },

  async validateResetPassword(req, res) {
    const { token } = req.query;
    await authService.validateResetPassword(token);

    res.redirect(`/reset-password?token=${token}`);
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);

    sendSuccessResponse(res, { message: "Password changed successfully" });
  },
};
