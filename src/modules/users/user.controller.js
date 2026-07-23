import { sendSuccessResponse } from "../../utils/response.js";
import { userService } from "./user.service.js";

export const userController = {
  async getAllUser(req, res) {
    const users = await userService.getAllUser();
    sendSuccessResponse(res, { message: "All users", data: users });
  },
};
