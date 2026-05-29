const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

    password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    is: {
      args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      msg: "Password must contain uppercase, lowercase, number and special character",
    },
  },
},
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};