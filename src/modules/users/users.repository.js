import { execute, prisma } from "../../database/prisma.js";
import { USER_SEARCH_FIELDS, USER_SORT_FIELDS } from "./user.constants.js";

export const userRepository = {
  async findAll({ search, orderBy, page, limit }) {
    const where = {};
    const skip = (page - 1) * limit;

    if (search) {
      where.OR = USER_SEARCH_FIELDS.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    const [items, count] = await execute(() =>
      prisma.$transaction([
        prisma.user.findMany({
          where,
          orderBy,
          skip,
          take: limit,
        }),

        prisma.user.count({
          where,
        }),
      ]),
    );

    return {
      items,
      total: count,
    };
  },

  async findById(id) {
    return execute(() => prisma.user.findUnique({ where: { id: id } }));
  },

  async findByEmail(email) {
    return execute(() => prisma.user.findUnique({ where: { email } }));
  },

  async create({ name, email, password }) {
    return execute(() =>
      prisma.user.create({
        data: {
          name,
          email,
          password,
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
