import multer from "multer";
import ValidationError from "../errors/ValidationError.js";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ValidationError());
  }
};

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export default upload;
