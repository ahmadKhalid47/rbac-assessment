const Post = require("../models/post.model");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, thumbnail } = req.body;

    const newPost = new Post({
      title,
      content,
      thumbnail,
      author: req.user.id, // Assuming the user ID is attached to req.user
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts by a user
const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

module.exports = { createPost, getPostsByUser };
