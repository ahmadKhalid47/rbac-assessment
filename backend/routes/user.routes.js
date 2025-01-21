const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  getAllUsers,
  createAdminUser,
  createUser,
} = require("../controllers/user.controller");
const { verifyToken, verifyRole } = require("../middlewares/auth.middleware");

// User Registration Route (Accessible by Super Admin only)
router.post("/register", verifyToken, verifyRole("Super Admin"), register);

// User Login Route (Accessible by all roles)
router.post("/login", login);

// Protected Route to get User Profile (Accessible by all roles)
router.get("/profile", verifyToken, getUserProfile);

// Route to get all users (Accessible by Super Admin only)
router.get("/all", verifyToken, verifyRole("Super Admin"), getAllUsers);

// Route to create Admin (Accessible by Super Admin only)
router.post(
  "/create-admin",
  verifyToken,
  verifyRole("Super Admin"),
  createAdminUser
);

// Route to create User (Accessible by Admin and Super Admin)
router.post(
  "/create-user",
  verifyToken,
  verifyRole("Admin", "Super Admin"),
  createUser
);

module.exports = router;
