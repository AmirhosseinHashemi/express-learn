import UserNotFoundError from "./errors/UserNotFoundError.js";
import { userRepository } from "./users.repository.js";

export const userService = {
  async getAllUser() {
    return await userRepository.getAllUsers();
  },

  async getSingleUser(id) {
    const user = await userRepository.getSingleUser(id);
    if (!user) throw new UserNotFoundError(id);

    return user;
  },
};
