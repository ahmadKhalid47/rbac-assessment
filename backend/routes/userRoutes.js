const express = require("express");
const router = express.Router();

// Your user-related routes
router.get("/", (req, res) => {
  const userData = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  };
  res.json(userData);
});

// Add more routes for user management
// router.post("/register", ...);

module.exports = router;
