require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const uploadImage = require("./middlewares/CloudinaryUpload");
const { getPosts } = require("./controllers/postController");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/users", userRoutes);



app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid pass" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/verify-token", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await userModel.findOne({ email: decoded.email });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

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
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/api/posts", getPosts);

module.exports = app;
