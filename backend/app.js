require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadImage = require("./middlewares/CloudinaryUpload");
const { getPosts, createPosts } = require("./controllers/postController");
const userRoutes = require("./routes/user.routes");
const { verifyToken } = require("./controllers/authController");
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

app.get("/api/verify-token", verifyToken);

// routes related users
app.use("/api/user", userRoutes);

// routes related posts
app.post("/api/createPost", uploadImage, createPosts);
app.get("/api/posts", getPosts);

module.exports = app;
