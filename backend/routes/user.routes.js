const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// User registration route (Super Admin or Admin only)
router.post(
  "/register",
  authMiddleware.verifySuperAdminOrAdmin,
  userController.registerUser
);

// Get all users (Admin only)
router.get("/", authMiddleware.verifyAdmin, userController.getAllUsers);

module.exports = router;
