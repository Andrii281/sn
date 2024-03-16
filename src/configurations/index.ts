export const configurations = () => ({
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_name: process.env.DB_NAME,
  db_password: process.env.DB_PASSWORD,
  secret_jwt: process.env.SECRET,
  expired_jwt: process.env.EXPIRE_JWT,
});