const postModel = require("../models/post.model");

const getPosts = async (req, res) => {
  const { page = 1, search = "" } = req.query;
  console.log("req.query____________________", req.query);

  const limit = 2;
  const skip = (page - 1) * limit;

  try {
    // Query the database with search and pagination
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const posts = await postModel
      .find(query)
      .populate("author", "name") // Assuming "User" has a "name" field
      .skip(skip)
      .limit(limit);

    console.log("posts____________________", posts);
    const totalPosts = await postModel.countDocuments(query);

    res.json({ posts, totalPosts });
  } catch (err) {
      console.log(err);
      
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

module.exports = { getPosts };
