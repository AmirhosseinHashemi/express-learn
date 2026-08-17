import fs from "node:fs/promises";
import path from "node:path";

const UPLOADS_DIR = path.resolve("uploads");

const localFileStorage = {
  getPath(filePath) {
    return path.join(UPLOADS_DIR, filePath);
  },

  async delete(filePath) {
    const fullPath = this.getPath(filePath);

    try {
      await fs.unlink(fullPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        return;
      }

      throw error;
    }
  },
};

export default localFileStorage;
