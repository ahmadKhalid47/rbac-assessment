const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");

router.get("/verify-token", verifyToken);

module.exports = router;
