const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();

exports.signup = async ({ firstname, lastname, email, password, birthday, phone }) => {
  const saltRounds = 10; // Arbitrary choice
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ firstname, lastname, email, password: hashedPassword, birthday, phone });
  return newUser;
};

exports.login = async ({ email, password }) => {
  // Check if user exists
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
