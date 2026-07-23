export default {
  port: Number(process.env.PORT),
  dbHost: String(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),
  dbUser: String(process.env.DB_USER),
  dbPassword: String(process.env.DB_PASSWORD),
  dbName: String(process.env.DB_NAME),
};
