const userService = require("../services/user.service");

const createUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await userService.createUser(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (
  req,
  res,
  next
) => {
  try {
    await userService.changePassword(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  changePassword,
};