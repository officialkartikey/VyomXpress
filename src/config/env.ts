import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || "5000",

  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: process.env.DB_PORT || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",

  JWT_SECRET: process.env.JWT_SECRET || "",

  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
  CLIENT_ID: process.env.CLIENT_ID || "",
  GUILD_ID: process.env.GUILD_ID || "",

  ADMIN_DISCORD_ID:
    process.env.ADMIN_DISCORD_ID || "",
};

export default env;