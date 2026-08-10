import { sendSuccessResponse } from "../../utils/response.js";
import { authService } from "./auth.service.js";

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

    sendSuccessResponse(res, {
      message: "Successfully logedin",
      data: result,
    });
  },

  async refreshToken(req, res) {
    const result = await authService.refreshToken(req.body?.refreshToken);

    sendSuccessResponse(res, {
      message: "New token generated successfully",
      data: result,
    });
  },

  async logout(req, res) {
    await authService.logout(req.body?.refreshToken);

    sendSuccessResponse(res, { message: "logout successfully" });
  },

  async logoutAll(req, res) {
    await authService.logoutAll(req?.user?.id);

    sendSuccessResponse(res, {
      message: "Logged out from all sessions successfully",
    });
  },
};
