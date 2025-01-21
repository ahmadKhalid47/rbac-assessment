const postModel = require("../models/post.model");

const getPosts = async (req, res) => {
  const { page = 1, search = "", userId, isAdmin } = req.query; 
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    if (JSON.parse(isAdmin)) {
      var query = search ? { title: { $regex: search, $options: "i" } } : {};
    } else {
      var query = search
        ? { title: { $regex: search, $options: "i" } }
        : { author: userId };
    }
    const posts = await postModel
      .find(query)
      .populate("author", "name")
      .skip(skip)
      .limit(limit);

    console.log(posts);

    const totalPosts = await postModel.countDocuments(query);

    res.json({ posts, totalPosts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

const createPosts = async (req, res) => {
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
};  
  
module.exports = { getPosts, createPosts };
