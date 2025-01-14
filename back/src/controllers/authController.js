const authService = require("../services/authService");
const io = require('../socket.io');

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, birthday, phone } = req.body;
  try {
    const newUser = await authService.signup({ firstname, lastname, email, password, birthday, phone });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login({ email, password });
    
    // Socket creation for this user
    io.emit('login', email);

    return res.status(200).json({ token });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    } else if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
