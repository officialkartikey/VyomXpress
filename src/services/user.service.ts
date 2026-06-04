import bcrypt from "bcrypt";

import db from "../models";

import ApiError from "../utils/ApiError";

interface CreateUserData {
  username: string;
  email: string;
  password: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

const createUser = async ({
  username,
  email,
  password,
}: CreateUserData) => {

  const existingUser =
    await db.User.findOne({
      where: { username },
    });

  if (existingUser) {
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
    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user =
    await db.User.create({
      username,
      email,
      password:
        hashedPassword,
      role: "user",
    });

  return user;
};

const changePassword = async (
  userId: number,
  {
    oldPassword,
    newPassword,
  }: ChangePasswordData
): Promise<void> => {

  const user =
    await db.User.findByPk(
      userId
    ) as any;

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      oldPassword,
      user.password
    );

  if (!isMatch) {
    throw new ApiError(
      400,
      "Old password is incorrect"
    );
  }

  user.password =
    await bcrypt.hash(
      newPassword,
      10
    );

  await user.save();
};

export default {
  createUser,
  changePassword,
};