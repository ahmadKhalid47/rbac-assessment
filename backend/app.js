require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const userModel = require("./models/user.model")

dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  require("cors")({
    origin: "http://127.0.0.1:3000", // Frontend URL
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies
// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/api/auth/token", (req, res) => {
  const token = req.cookies?.token; // Use cookie-parser to parse cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.json({ token });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
console.log(email);

  try {
    // Find user in the database
    const user2 = await userModel.find();
console.log(user2);

      let user = await userModel.findOne({ email: email });
console.log(user);
      
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

      
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid pass" });
    }

    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
