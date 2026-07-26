import db from "../../database/database.js";
import query from "../../database/query.js";

export const userRepository = {
  async findAll() {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
  },

  async findById(id) {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },

  async create({ name, email }) {
    const res = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );

    return res.rows[0];
  },
};
