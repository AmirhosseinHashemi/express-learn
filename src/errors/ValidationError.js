import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  constructor(errors) {
    super({
      message: "validation failed",
      errorCode: "VALIDATION_ERROR",
      statusCode: 422,
      details: errors,
    });
  }
}
