export default class AppError extends Error {
  constructor({
    message,
    statusCode = 500,
    errorCode = "INTERNAL_SERVER_ERROR",
    details = null,
  }) {
    super(message);

    this.name = this.constructor.name;

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
