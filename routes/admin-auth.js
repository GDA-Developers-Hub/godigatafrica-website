const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const adminAuthMiddleware = require("../adminAuthMiddleware");
const superAdminMiddleware = require("../superAdminMiddleware");

// Generate tokens for admin
const generateTokens = (admin) => {
  // Access token (short-lived)
  const accessToken = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_ADMIN_SECRET,
    { expiresIn: "1h" }
  );

  // Refresh token (long-lived)
  const refreshToken = jwt.sign(
    { id: admin.id },
    process.env.JWT_ADMIN_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Admin login
router.post("/login", async (req, res) => {
  try {
    console.log("Admin-auth route: POST /login - Admin login attempt");
    console.log("Admin-auth route: Login data:", { email: req.body.email, passwordProvided: !!req.body.password });
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log("Admin-auth route: Missing required fields for login");
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find admin by email
    console.log("Admin-auth route: Querying database for admin with email:", email);
    const [admins] = await pool.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    console.log("Admin-auth route: Admins found:", admins.length > 0 ? "Yes" : "No");
    
    if (admins.length === 0) {
      console.log("Admin-auth route: No admin found with email:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const admin = admins[0];
    console.log("Admin-auth route: Admin found:", admin.username);
    console.log("Admin-auth route: Comparing passwords");

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Admin-auth route: Password match:", isMatch ? "Yes" : "No");

    if (!isMatch) {
      console.log("Admin-auth route: Invalid password for admin:", admin.username);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate tokens
    console.log("Admin-auth route: Generating tokens for admin:", admin.username);
    const { accessToken, refreshToken } = generateTokens(admin);

    // Store refresh token in database
    console.log("Admin-auth route: Storing refresh token in database");
    await pool.query(
      "UPDATE admins SET refresh_token = ? WHERE id = ?",
      [refreshToken, admin.id]
    );

    console.log("Admin-auth route: Login successful for admin:", admin.username);
    // Send tokens in response
    res.json({
      success: true,
      chatAdminToken: accessToken,
      chatAdminRefreshToken: refreshToken,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin-auth route: Login error:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
});

// Register a new admin (super admin only)
router.post("/register", superAdminMiddleware, async (req, res) => {
  try {
    console.log("Admin-auth route: POST /register - Registering new admin");
    console.log("Admin-auth route: Register data:", {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role || "admin"
    });
    
    const { username, email, password, role = "admin" } = req.body;

    // Validate input
    if (!username || !email || !password) {
      console.log("Admin-auth route: Missing required fields for registration");
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required"
      });
    }

    // Check if admin exists
    console.log("Admin-auth route: Checking if admin exists with email:", email);
    const [existingAdmins] = await pool.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (existingAdmins.length > 0) {
      console.log("Admin-auth route: Admin already exists with email:", email);
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists"
      });
    }

    // Hash password
    console.log("Admin-auth route: Hashing password");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    console.log("Admin-auth route: Creating new admin");
    const [result] = await pool.query(
      "INSERT INTO admins (username, email, password, role, created_by) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, role, req.admin.id]
    );

    console.log("Admin-auth route: Admin registered successfully");
    res.json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: result.insertId,
        username,
        email,
        role
      }
    });
  } catch (error) {
    console.error("Admin-auth route: Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
});

// Refresh access token
router.post("/refresh-token", async (req, res) => {
  try {
    console.log("Admin-auth route: POST /refresh-token - Refreshing admin token");
    const { refreshToken } = req.body;

    if (!refreshToken) {
      console.log("Admin-auth route: No refresh token provided");
      return res.status(400).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    try {
      // Verify refresh token
      console.log("Admin-auth route: Verifying refresh token");
      console.log(`Admin-auth route: JWT Admin Refresh Secret present: ${!!process.env.JWT_ADMIN_REFRESH_SECRET}`);
      const decoded = jwt.verify(refreshToken, process.env.JWT_ADMIN_REFRESH_SECRET);
      console.log("Admin-auth route: Refresh token verified for admin ID:", decoded.id);

      // Check if refresh token exists in database
      console.log("Admin-auth route: Checking refresh token in database");
      const [admins] = await pool.query(
        "SELECT * FROM admins WHERE id = ? AND refresh_token = ?",
        [decoded.id, refreshToken]
      );

      if (admins.length === 0) {
        console.log("Admin-auth route: Refresh token not found in database");
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token"
        });
      }

      const admin = admins[0];
      console.log("Admin-auth route: Refresh token valid for admin:", admin.username);

      // Generate new tokens
      console.log("Admin-auth route: Generating new tokens");
      const tokens = generateTokens(admin);

      // Update refresh token in database
      console.log("Admin-auth route: Updating refresh token in database");
      await pool.query(
        "UPDATE admins SET refresh_token = ? WHERE id = ?",
        [tokens.refreshToken, admin.id]
      );

      console.log("Admin-auth route: Token refresh successful");
      res.json({
        success: true,
        chatAdminToken: tokens.accessToken,
        chatAdminRefreshToken: tokens.refreshToken
      });
    } catch (error) {
      console.error("Admin-auth route: Refresh token verification error:", error);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token"
      });
    }
  } catch (error) {
    console.error("Admin-auth route: Token refresh error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during token refresh"
    });
  }
});

// Get admin profile
router.get("/profile", adminAuthMiddleware, async (req, res) => {
  try {
    console.log("Admin-auth route: GET /profile - Fetching admin profile");
    console.log("Admin-auth route: Profile request for admin ID:", req.admin.id);
    
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    console.error("Admin-auth route: Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error retrieving profile"
    });
  }
});

// Logout
router.post("/logout", adminAuthMiddleware, async (req, res) => {
  try {
    console.log("Admin-auth route: POST /logout - Admin logout");
    console.log("Admin-auth route: Logout request for admin ID:", req.admin.id);
    
    // Clear refresh token in database
    console.log("Admin-auth route: Clearing refresh token in database");
    await pool.query(
      "UPDATE admins SET refresh_token = NULL WHERE id = ?",
      [req.admin.id]
    );

    console.log("Admin-auth route: Logout successful");
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Admin-auth route: Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout"
    });
  }
});

module.exports = router; 