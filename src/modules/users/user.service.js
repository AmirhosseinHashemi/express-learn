import BadRequestError from "../../errors/BadRequestError.js";
import localFileStorage from "../../storage/localFile.storage.js";
import UserNotFoundError from "./errors/UserNotFoundError.js";
import { userRepository } from "./users.repository.js";

export const userService = {
  async getAllUser({ search, orderBy, page, limit }) {
    return userRepository.findAll({ search, orderBy, page, limit });
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

  async uploadAvatar(userId, file) {
    if (!file) throw new BadRequestError("Avatar file is required", 400);

    const user = await userRepository.getUserAvatar(userId);

    const avatarPath = `avatars/${file.filename}`;
    const result = await userRepository.updateUserAvatar(userId, avatarPath);

    if (user?.avatarPath) localFileStorage.delete(user.avatarPath);

    return result;
  },
};
