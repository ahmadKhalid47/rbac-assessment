const express = require("express");
const router = express.Router();
const { getPosts, createPosts } = require("../controllers/postController");
const uploadImage = require("../middlewares/CloudinaryUpload");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

router.post("/createPost", verifyTokenMiddleware, uploadImage, createPosts);
router.get("/getPosts", verifyTokenMiddleware, getPosts);

module.exports = router;
