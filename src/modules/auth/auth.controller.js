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
};
