const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_TOKEN_KEY);
};

//register
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "This email is already registered",
      });
    }
    user = await User.create(req.body);

    const token = newToken(user);
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

//login
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Email is not registered",
      });
    }
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide valid email and password",
      });
    }
    //we will create token
    const token = newToken(user);
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
};

router.post("/login", login);
router.post("/register", register);
module.exports = router;
