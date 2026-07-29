import UserNotFoundError from "./errors/UserNotFoundError.js";
import { userRepository } from "./users.repository.js";

export const userService = {
  async getAllUser(search, sort, page, limit) {
    return userRepository.findAll(search, sort, page, limit);
  },

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new UserNotFoundError(id);

    return user;
  },

  async createUser(userData) {
    return userRepository.create(userData);
  },

  async updateUser(id, userData) {
    const updatedUser = await userRepository.updateUser(id, userData);

    if (!updatedUser) throw new UserNotFoundError(id);

    return updatedUser;
  },

  async deleteUser(id) {
    const result = await userRepository.delete(id);

    if (result === 0) throw new UserNotFoundError(id);
  },
};
