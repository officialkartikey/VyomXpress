import {
  sequelize,
} from "../config/db";

import UserFactory
  from "./User";

import ServiceFactory
  from "./Service";

const User =
  UserFactory(sequelize);

const Service =
  ServiceFactory(sequelize);

const db = {
  sequelize,
  User,
  Service,
};

export default db;