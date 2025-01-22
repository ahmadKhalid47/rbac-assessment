require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const superAdminRoutes = require("./routes/superAdmin.routes");
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

// routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/superAdmin", superAdminRoutes);

module.exports = app;
