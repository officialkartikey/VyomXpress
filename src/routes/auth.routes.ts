import express from "express";

import {
  signup,
  login,
} from "../controllers/auth.controller";

import validate from "../middleware/validate.middleware";

import {
  signupSchema,
  loginSchema,
} from "../validations/auth.validation";

const router =
  express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

export default router;