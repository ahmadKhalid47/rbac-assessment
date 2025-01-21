const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  createUser,
  getUsers,
} = require("../controllers/userController");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

router.post("/createUser", verifyTokenMiddleware, createUser);
router.get("/getUsers", verifyTokenMiddleware, getUsers);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
