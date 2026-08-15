import { MulterError } from "multer";
import BadRequestError from "../errors/BadRequestError.js";

export default function mapMulterError(error) {
  if (!(error instanceof MulterError)) return null;

  switch (error.code) {
    case "LIMIT_FILE_SIZE":
      return new BadRequestError("File size is too large", error.code);

    case "LIMIT_UNEXPECTED_FILE":
      return new BadRequestError("Unexpected file", error.code);

    default:
      return new BadRequestError("Invalid file upload", error.code);
  }
}
