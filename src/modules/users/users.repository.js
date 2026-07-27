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

  async updateUser(id, { name, email }) {
    const fields = [];
    const values = [];

    if (name !== undefined && name !== null) {
      values.push(name);
      fields.push(`name = $${values.length}`);
    }

    if (email !== undefined && email !== null) {
      values.push(email);
      fields.push(`email = $${values.length}`);
    }

    values.push(id);

    const result = await query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values,
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await query("DELETE FROM users WHERE id = $1", [id]);

    // if (user exist it returns 1 else 0)
    return result.rowCount;
  },
};
