import { userRepository } from "./users.repository.js";

export const userService = {
  async getAllUser() {
    return await userRepository.getAllUsers();
  },
};
