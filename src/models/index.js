const { sequelize } = require("../config/db");

const User = require("./User")(sequelize);
const Service = require("./Service")(sequelize);

const db = {
  sequelize,
  User,
  Service,
};

module.exports = db;