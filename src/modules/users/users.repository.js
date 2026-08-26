import { execute, prisma } from "../../database/prisma.js";
import { USER_SEARCH_FIELDS } from "./user.constants.js";

export const userRepository = {
  async findAll({ search, orderBy, skip, limit }) {
    const where = {};

    if (search) {
      where.OR = USER_SEARCH_FIELDS.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return execute(() =>
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

  async getUserAvatar(id) {
    return execute(() =>
      prisma.user.findUnique({ where: { id }, select: { avatarPath: true } }),
    );
  },

  async updateUserAvatar(id, avatarPath) {
    return execute(() =>
      prisma.user.update({
        where: {
          id,
        },
        data: {
          avatarPath,
        },
        select: {
          id: true,
          avatarPath: true,
        },
      }),
    );
  },

  async updateUserPassword(id, newPassword) {
    return execute(() =>
      prisma.user.update({
        where: {
          id,
        },
        data: {
          password: newPassword,
        },
      }),
    );
  },
};
