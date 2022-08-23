const express = require("express");
const User = require("../models/user");
const router = express.Router();

//register
const register = async (req, res) => {};

//login
const login = async (req, res) => {};

router.post("/login", login);
router.post("/register", register);
