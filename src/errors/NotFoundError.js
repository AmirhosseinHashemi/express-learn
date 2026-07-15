import AppError from "./AppError.js";

export default class NotFoundError extends AppError {
  constructor() {
    super({
      message: "Route not found!",
      statusCode: 404,
      errorCode: "ROUTE_NOT_FOUND",
    });
  }
}
