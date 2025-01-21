const postModel = require("../models/post.model");

const getPosts = async (req, res) => {
  const { page = 1, search = "", userId, isAdmin } = req.query; // Add userId and isAdmin from the query
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
      .populate("author", "name") // Assuming "User" has a "name" field
      .skip(skip)
      .limit(limit);

    console.log(posts);

    const totalPosts = await postModel.countDocuments(query);

    res.json({ posts, totalPosts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

module.exports = { getPosts };
