import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination: "uploads/tmp",

  filename: (req, file, cb) => {
    const extention = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${extention}`;

    cb(null, filename);
  },
});

export default storage;
