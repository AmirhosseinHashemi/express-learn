import AppError from "./AppError.js";

export default class ForbiddenError extends AppError {
  constructor() {
    super({
      message: "You do not have access to this operation",
      statusCode: 403,
      errorCode: "PERMISSION_ERROR",
    });
  }
}
