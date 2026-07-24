import AppError from "../../../errors/AppError.js";

export default class UserNotFoundError extends AppError {
  constructor(id) {
    super({
      message: `user with id ${id} not found.`,
      statusCode: 404,
      errorCode: "USER_NOT_FOUND",
    });
  }
}
