export default {
  port: Number(process.env.PORT),
  enviroment: String(process.env.ENVIROMENT),
  databaseUrl: String(process.env.DATABASE_URL),
  dbHost: String(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),
  dbUser: String(process.env.DB_USER),
  dbPassword: String(process.env.DB_PASSWORD),
  dbName: String(process.env.DB_NAME),
  jwtSecret: String(process.env.JWT_SECRET),
  jwtExpiresIn: String(process.env.JWT_EXPIRES_IN),
  refreshTokenExpiresInDays: String(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS),
  nodeEnv: String(process.env.NODE_ENV),
};
