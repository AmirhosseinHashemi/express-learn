import pg from "pg";
import config from "../config/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
