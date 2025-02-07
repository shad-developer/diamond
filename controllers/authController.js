const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// signup new user
module.exports.Signup = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const formatName = username.toLowerCase();
    const formatEmail = email.toLowerCase();

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email: formatEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "Email already exists" });
    }

    //   hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: formatName,
      email: formatEmail,
      password:hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      error: false,
      message: "signup successful",
    });
  } catch (error) {s
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});


module.exports.AddNewLogin = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const formatName = username.toLowerCase();
    const formatEmail = email.toLowerCase();

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email: formatEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "Email already exists" });
    }

    //   hashed password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: formatName,
      email: formatEmail,
      password,
    });

    await newUser.save();

    res.status(200).json({
      error: false,
      message: "New Login Created",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// login
module.exports.Login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res
    //     .status(401)
    //     .json({ error: true, message: "Incorrect password" });
    // }

    if (user.status === 'blocked') {
      return res.status(403).json({
        error: true,
        message: "Unable to login, contact admin for access",
      });
    }

    generateToken(user, res);

    user.lastLogin = new Date();
    await user.save();

    return res.json({
      error: false,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// logout the user
module.exports.Logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res
      .status(200)
      .json({ error: false, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// get login user details
module.exports.getUser = asyncHandler(async (req, res) => {
  try {
    const isUser = await User.findById(req.user._id);
    if (!isUser) {
      return res.status(404).send({ error: true, message: "User not found" });
    }
    res.json({ error: false, user: isUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// get all users
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }
  res.status(200).json({ users });
});

// get user by id
module.exports.getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: true, message: "user not found" });
    }
    res.json({ error: false, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch user" });
  }
});

// update user
module.exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, status } = req.body;

    const formatName = username.toLowerCase();
    const formatEmail = email.toLowerCase();

    if (!username || !email || !password || !status) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }
    
    // Hash the new password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: formatName,
        email: formatEmail,
        password, 
        status,
      },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.json({ error: false, message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// delete user
module.exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.json({ error: false, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to delete user" });
  }
});