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
const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const uploadImage = require("./middlewares/fileUpload");
const { getPosts } = require("./controllers/postController");

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
// app.use("/api/posts", postRoutes);

app.get("/api/auth/token", (req, res) => {
  const token = req.cookies?.token; // Use cookie-parser to parse cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.json({ token });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database

    let user = await userModel.findOne({ email: email });

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

// Express example

app.get("/verify-token", async (req, res) => {
  const token = req.cookies.token; // Assuming the cookie is named "token"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    let user = await userModel.findOne({ email: decoded.email });

    res.status(200).json(user); // Return the user's role or other data
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email, password, role } = req.body;
  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  try {
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/posts/create", uploadImage, async (req, res) => {

  try {
    const { title, content, thumbnail, author } = req.body;

    if (!title || !content || !req?.file?.path || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = new postModel({
      title,
      content,
      thumbnail: req?.file?.path,
      author,
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Use true in production with HTTPS
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});


app.get("/api/posts", getPosts);

module.exports = app;
