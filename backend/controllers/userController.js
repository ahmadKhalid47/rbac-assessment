const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// Login 
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid pass" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout 
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// creating users, admins 
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
// role will contain "User" "Admin"
  try {
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

// getting users including searching and pagination
const getUsers = async (req, res) => {
  const { page = 1, search = "", viewAdmins } = req.query;
  const limit = 6;
  const skip = (page - 1) * limit;

  try {

    // condition to find both admins (for superadmin) and users 
    if (JSON.parse(viewAdmins)) {
      var query = search
        ? { name: { $regex: search, $options: "i" } }
        : { role: "Admin" };
    } else {
      var query = search
        ? { name: { $regex: search, $options: "i" } }
        : { role: "User" };
    }
    const users = await userModel
      .find(query)
      .skip(skip)
      .limit(limit);

    const totalUsers = await userModel.countDocuments(query);
    console.log(users);

    res.json({ users, totalUsers });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

module.exports = {
  login,
  logout,
  createUser,
  getUsers,
};
