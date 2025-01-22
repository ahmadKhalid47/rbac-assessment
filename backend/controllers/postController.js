const postModel = require("../models/post.model");

// getting posts
const getPosts = async (req, res) => {
  const { page = 1, search = "", userId, isAdmin } = req.query;
  const limit = 6;
  const skip = (page - 1) * limit;

  try {
    // condition to show all posts to admin and show only his posts to user
    if (JSON.parse(isAdmin)) {
      // empty object will find all posts
      var query = search ? { title: { $regex: search, $options: "i" } } : {};
    } else {
      // getting posts with user id
      var query = search
        ? { title: { $regex: search, $options: "i" } }
        : { author: userId };
    }

    // populating user (author) data with the posts
    const posts = await postModel
      .find(query)
      .populate("author", "name")
      .skip(skip)
      .limit(limit);

    const totalPosts = await postModel.countDocuments(query);

    res.json({ posts, totalPosts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

const createPosts = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !req?.file?.path || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // got req?.file?.path from cloudinary after uploading image
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
};

module.exports = { getPosts, createPosts };
