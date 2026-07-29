import { execute, prisma } from "../../database/prisma.js";

export const userRepository = {
  async findAll({ search }, sort, page, limit) {
    const fields = ["name", "email"];
    const SORT_FIELDS = ["id", "name", "email"];

    const where = {};
    let orderBy;

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

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

    const [items, count] = await execute(() =>
      prisma.$transaction([
        prisma.user.findMany({
          where,
          orderBy,
          skip,
          take: pageSize,
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
