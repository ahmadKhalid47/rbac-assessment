const express = require("express");
const router = express.Router();
const { login, logout, createUser } = require("../controllers/userController");

router.post("/createUser", createUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
