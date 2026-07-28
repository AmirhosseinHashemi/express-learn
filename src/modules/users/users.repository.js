import { execute, prisma } from "../../database/prisma.js";

export const userRepository = {
  async findAll({ search }) {
    const fields = ["name", "email"];
    const where = {};

    if (search?.trim()) {
      where.OR = fields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return execute(() =>
      prisma.user.findMany({
        where,
        orderBy: {
        
        }
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
