import sharp from "sharp";

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
};

export default imageProcessor;
