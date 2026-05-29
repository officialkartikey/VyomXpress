const bcrypt = require("bcrypt");
const db = require("../models");
const generateToken = require("../utils/generateToken");

const signup = async ({ username, email, password }) => {
  const existingUser = await db.User.findOne({
    where: { username },
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const existingEmail = await db.User.findOne({
    where: { email },
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
};

module.exports = {
  signup,
  login,
};