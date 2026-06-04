import express, {
  Request,
  Response,
} from "express";

import cors from "cors";
import helmet from "helmet";

import errorMiddleware
  from "./middleware/error.middleware";

import rateLimiter
  from "./middleware/rateLimiter";

import routes
  from "./routes";

const app = express();

app.use(helmet());

app.use(rateLimiter);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(
  "/api/v1",
  routes
);

app.get(
  "/",
  (
    req: Request,
    res: Response
  ) => {

    res.status(200).json({
      success: true,
      message:
        "VyomXpress Backend Running",
    });
  }
);

app.use(
  errorMiddleware
);

export default app;