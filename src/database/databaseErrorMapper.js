import DatabaseDuplicateError from "../errors/DatabaseDuplicateError.js";
import AppError from "../errors/AppError.js";

export default function mapDatabaseError(err) {
  if (err.code === "23505" && err.constraint === "users_email_key") {
    return new AppError({
      message: "duplicate email",
      statusCode: 409,
      errorCode: "DATABASE_DUPLICATE_ERROR",
    });
  }

  return err;
}
