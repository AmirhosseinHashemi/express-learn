import db from "../../database/database.js";

export const userRepository = {
  async getAllUsers() {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
  },
};
