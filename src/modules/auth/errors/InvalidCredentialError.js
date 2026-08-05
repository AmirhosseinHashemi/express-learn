import AppError from "../../../errors/AppError.js";

export default class InvalidCredentialError extends AppError {
  constructor() {
    super({
      message: "Invalid email or password",
      statusCode: 401,
      errorCode: "INVALID_CREDENTIAL",
    });
  }
}
