import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const result =
      await authService.signup(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token: result.token,
      user: {
  id: (result.user as any).id,
  username: (result.user as any).username,
  email: (result.user as any).email,
},
    });

  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const result =
      await authService.login(
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
    user: {
  id: (result.user as any).id,
  username: (result.user as any).username,
  email: (result.user as any).email,
},
    });

  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
};