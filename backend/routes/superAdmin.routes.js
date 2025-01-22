const express = require("express");
const {
  verifyToken,
} = require("../controllers/superAdminController");

const router = express.Router();

// Generate token
router.post("/verify-token", verifyToken);

module.exports = router;
