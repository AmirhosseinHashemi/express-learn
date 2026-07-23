import pg from "pg";
import config from "../config/index.js";

const { Pool } = pg;

const db = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

export default db;
