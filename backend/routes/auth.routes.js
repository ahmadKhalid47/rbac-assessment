const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

router.get("/verify-token", verifyToken);

module.exports = router;
