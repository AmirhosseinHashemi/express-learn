import DatabaseDuplicateError from "../errors/DatabaseDuplicateError.js";

export default function mapDatabaseError(err) {
  if (err.code === "23505" && err.constraint === "users_email_key") {
    return new DatabaseDuplicateError("Email already exists");
  }
}
