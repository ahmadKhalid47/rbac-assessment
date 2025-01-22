const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// verify token middleware to verify every api  

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {      
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

      req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyTokenMiddleware;
