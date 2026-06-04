import "./discord";

import app from "./app";

import env from "./config/env";

import {
  connectDB,
} from "./config/db";

import db from "./models";

const startServer =
  async (): Promise<void> => {

    try {

      await connectDB();

      await db.sequelize.sync({
        alter: true,
      });

      console.log(
        "✅ Models Synced"
      );

      app.listen(
        Number(env.PORT),
        () => {

          console.log(
            `🚀 Server running on port ${env.PORT}`
          );
        }
      );

    } catch (error) {

      console.error(
        "❌ Server Startup Failed"
      );

      console.error(error);
    }
  };

startServer();