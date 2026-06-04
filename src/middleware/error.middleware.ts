import {
  Request,
  Response,
  NextFunction,
} from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  console.error(err);

  res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};

export default errorMiddleware;