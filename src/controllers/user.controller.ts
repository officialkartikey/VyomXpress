import {
  Request,
  Response,
  NextFunction,
} from "express";

import userService from "../services/user.service";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    await userService.changePassword(
      (req as any).user.id,
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

export {
  createUser,
  changePassword,
};