import {
  Request,
  Response,
  NextFunction,
} from "express";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const user = (req as any).user;

  if (
    !user ||
    user.role !== "admin"
  ) {
    res.status(403).json({
      success: false,
      message:
        "Admin access required",
    });

    return;
  }

  next();
};

export default adminMiddleware;