import bcrypt from "bcrypt";
import { userRepository } from "../users/users.repository.js";
import { BCRYPT_SALT_ROUNDS } from "../../config/constant.js";
import AppError from "../../errors/AppError.js";

export const authService = {
  async registerUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser)
      throw new AppError({
        message: "Email already exists",
        statusCode: 409,
        errorCode: "DATABASE_DUPLICATE_ERROR",
      });

    const hashedPass = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
    const userToCreate = { ...userData, password: hashedPass };
    return await userRepository.create(userToCreate);
  },
};
