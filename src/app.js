const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorMiddleware =require("./middleware/error.middleware");
const rateLimiter =require("./middleware/rateLimiter");
const routes = require("./routes");



const app = express();

app.use(helmet());
app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VyomXpress Backend Running",
  });
});

app.use(errorMiddleware);

module.exports = app;