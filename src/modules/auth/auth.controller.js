import { sendSuccessResponse } from "../../utils/response.js";
import { authService } from "./auth.service.js";

export const authController = {
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
    const user = await authService.loginUser(req.body);
    const logedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    sendSuccessResponse(res, {
      message: "Successfully logedin",
      data: logedInUser,
    });
  },
};
