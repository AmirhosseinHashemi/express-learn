import sharp from "sharp";
import BadRequestError from "../errors/BadRequestError.js";
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "../config/constant.js";

const imageProcessor = {
  async processAvatar(inputPath, outputPath) {
    await sharp(inputPath)
      .resize(400, 400, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);
  },

  async validate(filePath) {
    let metadata;

    try {
      metadata = await sharp(filePath).metadata();
    } catch {
      throw new BadRequestError("Invalid image file");
    }

    if (!metadata.format || !ALLOWED_IMAGE_FORMATS.has(metadata.format))
      throw new BadRequestError("Unsupported image format");

    if (metadata.width > MAX_IMAGE_WIDTH || metadata.height > MAX_IMAGE_HEIGHT)
      throw new BadRequestError("Image dimension are too high");
  },
};

export default imageProcessor;
