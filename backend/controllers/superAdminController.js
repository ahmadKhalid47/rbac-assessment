const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifyToken = async (req, res) => {
  
  // verifying token attached with super admin registration page

  const { token } = req.body;
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


// register superadmin after verifying token  
const registerSuperAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ role: "SuperAdmin" });
  
  if (existingUser) {
    return res.status(400).json({ message: "SuperAdmin already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "SuperAdmin",
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = {
  verifyToken,
  registerSuperAdmin,
};
