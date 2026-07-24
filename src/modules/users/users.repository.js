import db from "../../database/database.js";

export const userRepository = {
  async getAllUsers() {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
  },

  async getSingleUser(id) {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },
};
