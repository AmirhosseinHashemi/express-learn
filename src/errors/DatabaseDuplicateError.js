import AppError from "./AppError.js";

export default class DatabaseDuplicateError extends AppError {
  constructor(message) {
    super({ message, statusCode: 409, errorCode: "DATABASE_DUPLICATE_ERROR" });
  }
}
