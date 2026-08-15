import AppError from "./AppError.js";

export default class BadRequestError extends AppError {
  constructor(message = "Bad request", errorCode = "BAD_REQUEST") {
    super({ message, errorCode, statusCode: 400 });
  }
}
