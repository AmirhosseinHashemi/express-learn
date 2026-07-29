import { execute, prisma } from "../../database/prisma.js";

export const userRepository = {
  async findAll({ search }, sort) {
    const fields = ["name", "email"];
    const SORT_FIELDS = ["id", "name", "email"];

    const where = {};
    let orderBy;

    if (search?.trim()) {
      where.OR = fields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    if (sort) {
      const direction = sort?.startsWith("-") ? "desc" : "asc";
      const field = sort.replace("-", "");

      if (SORT_FIELDS.includes(field)) {
        orderBy = {
          [field]: direction,
        };
      }
    }

    return execute(() =>
      prisma.user.findMany({
        where,
        orderBy,
      }),
    );
  },

  async findById(id) {
    return await execute(() =>
      prisma.user.findUnique({ where: { id: Number(id) } }),
    );
  },

  async create({ name, email }) {
    return await execute(() =>
      prisma.user.create({
        data: {
          name,
          email,
        },
      }),
    );
  },

  async updateUser(id, { name, email }) {
    const data = { name: undefined, email: undefined };

    if (name !== undefined && name !== null) data.name = name;
    if (email !== undefined && email !== null) data.email = email;

    return await execute(() =>
      prisma.user.update({ where: { id: Number(id) }, data }),
    );
  },

  async delete(id) {
    return await execute(() =>
      prisma.user.delete({ where: { id: Number(id) } }),
    );
  },
};
