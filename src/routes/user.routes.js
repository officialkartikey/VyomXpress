const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  userController.createUser
);

router.patch(
  "/change-password",
  authMiddleware,
  userController.changePassword
);

module.exports = router;