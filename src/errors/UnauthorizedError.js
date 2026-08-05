import AppError from "./AppError.js";

export default class UnauthorizedError extends AppError {
  constructor() {
    super({
      message: "Unauthorized",
      statusCode: 401,
      errorCode: "UNAUTHORIZED_ERROR",
    });
  }
}
