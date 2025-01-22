const express = require("express");
const {
  verifyToken,
  registerSuperAdmin,
} = require("../controllers/superAdminController");

const router = express.Router();

router.post("/verify-token", verifyToken);
router.post("/registerSuperAdmin", registerSuperAdmin);

module.exports = router;
