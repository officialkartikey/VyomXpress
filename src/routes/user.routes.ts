import express from "express";

import {
  createUser,
  changePassword,
} from "../controllers/user.controller";

import authMiddleware
  from "../middleware/auth.middleware";

import adminMiddleware
  from "../middleware/admin.middleware";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUser
);

router.patch(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;