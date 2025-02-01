const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.signup = async (user) => {
  try {
    const { firstname, lastname, email, password, birthday, phone } = user;
    const saltRounds = 10; // Arbitrary choice
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthday,
      phone,
    });
    return newUser;
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw new Error("Error during signup process");
  }
};

exports.login = async ({ email, password }) => {
  try {
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
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error("Error during login process");
  }
};
