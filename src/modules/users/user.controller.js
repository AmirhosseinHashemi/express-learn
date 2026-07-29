import { sendSuccessResponse } from "../../utils/response.js";
import { userService } from "./user.service.js";

export const userController = {
  async getAllUser(req, res) {
    const { search, sort } = req.query;
    const users = await userService.getAllUser({ search }, sort);
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

  async updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    const updatedUser = await userService.updateUser(userId, userData);
    sendSuccessResponse(res, {
      message: `user with id ${userId} updated successfully`,
      data: updatedUser,
    });
  },

  async deleteUser(req, res) {
    const userId = req.params.id;
    await userService.deleteUser(userId);

    sendSuccessResponse(res, {
      message: `user with ${userId} deleted successfully.`,
    });
  },
};
