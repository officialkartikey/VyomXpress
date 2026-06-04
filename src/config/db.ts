import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ Database Connected");
  } catch (error) {

    console.error(
      "❌ Database Connection Failed"
    );

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export {
  sequelize,
  connectDB,
};