const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

// POST /signup - for email signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const newUserId = result.insertId;
    res.json({ message: "User created", user: { id: newUserId, username, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});
// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token for authentication (authToken)
    const authToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "72h" }
    );

    // Generate Reset Token for password resets
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.RESET_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ message: "Logged in", authToken, resetToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});


// GET /auth/google - Dummy endpoint for Google auth
router.get("/auth/google", (req, res) => {
  res.json({ message: "Redirecting to Google auth..." });
});

// POST /forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = rows[0];

    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.RESET_SECRET,
      { expiresIn: "15m" }
    );

    // In a real application, send an email containing the reset token/link.
    res.json({ message: "Password reset link sent", resetToken });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

module.exports = router;
