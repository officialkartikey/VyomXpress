require("./discord/index");
const app = require("./app");
const env = require("./config/env");
const { connectDB } = require("./config/db");
const db = require("./models");

const startServer = async () => {
  try {
    await connectDB();

    await db.sequelize.sync({ alter: true });

    console.log(" Models Synced");

    app.listen(env.PORT, () => {
      console.log(` Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();