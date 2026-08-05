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
};
