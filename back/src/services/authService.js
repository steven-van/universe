const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async ({ name, email, password }) => {
  const saltRounds = 10; // Arbitrary choice
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ name, email, password: hashedPassword });
  return newUser;
};

exports.login = async ({ name, password }) => {
  // Check if user exists
  const user = await User.findOne({ where: { name } });
  if (!user) {
    throw new Error("User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
