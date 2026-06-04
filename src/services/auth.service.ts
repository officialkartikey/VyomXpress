import bcrypt from "bcrypt";

import db from "../models";

import generateToken from "../utils/generateToken";

import ApiError from "../utils/ApiError";

import logger from "../utils/logger";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const signup = async ({
  username,
  email,
  password,
}: SignupData) => {

  const existingUser =
    await db.User.findOne({
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

  const existingEmail =
    await db.User.findOne({
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

  const user =
    await db.User.create({
      username,
      email,
      password: hashedPassword,
    }) as any;

  logger.info(
    `User created successfully: ${username}`
  );

  const token =
    generateToken(
      user.id,
      user.role
    );

  return {
    user,
    token,
  };
};

const login = async ({
  email,
  password,
}: LoginData) => {

  const user =
    await db.User.findOne({
      where: { email },
    }) as any;

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

  const token =
    generateToken(
      user.id,
      user.role
    );

  return {
    user,
    token,
  };
};

export default {
  signup,
  login,
};