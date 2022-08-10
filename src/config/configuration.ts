export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE_URL: process.env.DATABASE_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
