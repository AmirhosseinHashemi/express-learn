import pg from "pg";
import config from "../config/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import mapPrismaError from "./prismaErrorMapper.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

export const execute = async function (query) {
  try {
    return await query();
  } catch (error) {
    console.log(error);
    
    throw mapPrismaError(error);
  }
};
