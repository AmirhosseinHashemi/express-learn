import { sendSuccessResponse } from "../../utils/response.js";
import { userService } from "./user.service.js";

export const userController = {
  async getAllUser(req, res) {
    const users = await userService.getAllUser();
    sendSuccessResponse(res, { message: "All users", data: users });
  },

  async getUserById(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    sendSuccessResponse(res, { message: `User ${id}`, data: user });
  },

  async createUser(req, res) {
    const userData = req.body;
    const user = await userService.createUser(userData);
    sendSuccessResponse(res, {
      message: "new user created successfuly.",
      data: user,
    });
  },
};
