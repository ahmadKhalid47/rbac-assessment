const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log("token_________________________", token);

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
};

module.exports = {
  verifyToken,
};
