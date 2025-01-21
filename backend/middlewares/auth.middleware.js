const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware to verify authentication
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to verify user roles
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  verifySuperAdmin: [verifyToken, verifyRole(["Super Admin"])],
  verifyAdmin: [verifyToken, verifyRole(["Admin"])],
  verifySuperAdminOrAdmin: [verifyToken, verifyRole(["Super Admin", "Admin"])],
  verifyUser: [verifyToken, verifyRole(["User"])],
  verifyAdminOrSuperAdmin: [verifyToken, verifyRole(["Admin", "Super Admin"])],
};
