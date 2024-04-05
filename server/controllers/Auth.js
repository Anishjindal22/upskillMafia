const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword)
      return res.status(422).json({ error: "please fill all the fields" });

    if (password.length < 8) {
      return res.status(422).json({
        success: false,
        message: "password must be at least 8 characters",
        error: "password must be at least 8 characters",
      });
    }

    if (password.length > 20) {
      return res.status(422).json({
        success: false,
        message: "password must be less than 20 characters",
        error: "password must be less than 20 characters",
      });
    }

    if (password.search(/[a-z]/i) < 0) {
      return res.status(422).json({
        success: false,
        message: "password must contain at least one letter",
        error: "password must contain at least one letter",
      });
    }
    if (password.search(/[0-9]/) < 0) {
      return res.status(422).json({
        success: false,
        message: "password must contain at least one number",
        error: "password must contain at least one number",
      });
    }
    if (password.search(/[!@#$%^&*]/) < 0) {
      return res.status(422).json({
        success: false,
        message: "password must contain at least one special character",
        error: "password must contain at least one special character",
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "password and confirm password are not matching",
        error: "password and confirm password are not matching",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(422).json({ error: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${name}`,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Error while creating user ",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({ error: "please fill all the fields" });

    const existingUser = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!existingUser || !isPasswordValid) {
      return res
        .status(422)
        .json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const options = {
      maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    };
    return res.cookie("jwt", token, options).status(200).json({
      success: true,
      message: "user logged in successfully",
      token,
      existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Error while logging user ",
    });
  }
};
