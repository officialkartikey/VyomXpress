const bcrypt = require("bcrypt");
const db = require("../models");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const signup = async ({
  username,
  email,
  password,
}) => {
  const existingUser = await db.User.findOne({
    where: { username },
  });

  if (existingUser) {
    logger.warn(
      `Duplicate username attempt: ${username}`
    );

    throw new ApiError(
      409,
      "Username already exists"
    );
  }

  const existingEmail = await db.User.findOne({
    where: { email },
  });

  if (existingEmail) {
    logger.warn(
      `Duplicate email attempt: ${email}`
    );

    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await db.User.create({
    username,
    email,
    password: hashedPassword,
  });

  logger.info(
    `User created successfully: ${username}`
  );

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
};

const login = async ({
  email,
  password,
}) => {
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    logger.warn(
      `Login failed: ${email}`
    );

    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    logger.warn(
      `Wrong password attempt: ${email}`
    );

    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  logger.info(
    `User logged in: ${email}`
  );

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