const express = require("express");
const router = express.Router();
const { getPosts, createPosts } = require("../controllers/postController");
const uploadImage = require("../middlewares/CloudinaryUpload");

router.post("/createPost", uploadImage, createPosts);
router.get("/getPosts", getPosts);

module.exports = router;
