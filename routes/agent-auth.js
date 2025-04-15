const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Agent login
router.post("/login", async (req, res) => {
  console.log("==== AGENT LOGIN ATTEMPT ====");
  console.log("Request body:", JSON.stringify(req.body));
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Login failed: Missing email or password");
    return res.status(400).json({ 
      success: false, 
      message: "Email and password are required" 
    });
  }

  try {
    console.log(`Looking up agent with email: ${email}`);
    
    // Get user with email
    const [users] = await pool.query(
      "SELECT u.*, a.id as agent_id, a.agent_name, a.status FROM users u JOIN agents a ON u.id = a.user_id WHERE u.email = ?",
      [email]
    );

    console.log(`Query result count: ${users.length}`);
    
    if (users.length === 0) {
      console.log(`No agent found with email: ${email}`);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials or not registered as an agent" 
      });
    }

    const user = users[0];
    console.log(`Found agent: ID=${user.id}, AgentID=${user.agent_id}, Name=${user.agent_name}`);
    console.log(`Stored password hash: ${user.password.substring(0, 10)}...`);

    // Verify password
    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${isMatch}`);
    
    if (!isMatch) {
      console.log("Password verification failed");
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Create and sign JWT token
    console.log("Creating JWT token...");
    const tokenPayload = { 
      id: user.id, 
      email: user.email, 
      isAgent: true,
      agentId: user.agent_id,
      agentName: user.agent_name
    };
    console.log("Token payload:", JSON.stringify(tokenPayload));
    
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    console.log(`Token created: ${token.substring(0, 20)}...`);

    // Update agent status to online
    console.log(`Updating agent status to 'online' for agent ID: ${user.agent_id}`);
    await pool.query(
      "UPDATE agents SET status = 'online' WHERE id = ?",
      [user.agent_id]
    );
    console.log("Agent status updated successfully");

    const responseData = {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        agentId: user.agent_id,
        agentName: user.agent_name
      }
    };
    
    console.log("Login successful - Response data:", JSON.stringify({
      ...responseData, 
      token: `${token.substring(0, 20)}...`
    }));
    
    res.json(responseData);
  } catch (error) {
    console.error("Error during agent login:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
});

// Get current agent profile
router.get("/profile", async (req, res) => {
  console.log("==== AGENT PROFILE REQUEST ====");
  console.log("Headers:", JSON.stringify(req.headers));
  
  try {
    // Verify token from header
    const token = req.header("x-auth-token");
    console.log(`Token present: ${!!token}`);
    
    if (token) {
      console.log(`Token prefix: ${token.substring(0, 20)}...`);
    }
    
    if (!token) {
      console.log("Profile request failed: No token provided");
      return res.status(401).json({ 
        success: false, 
        message: "No token, authorization denied" 
      });
    }

    try {
      // Verify token
      console.log("Verifying token...");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified. Decoded payload:", JSON.stringify(decoded));
      
      // Get agent details
      console.log(`Fetching agent details for agent ID: ${decoded.agentId}`);
      const [agents] = await pool.query(
        `SELECT a.*, u.email, u.username
         FROM agents a
         JOIN users u ON a.user_id = u.id
         WHERE a.id = ?`,
        [decoded.agentId]
      );

      console.log(`Query result count: ${agents.length}`);
      
      if (agents.length === 0) {
        console.log(`No agent found with ID: ${decoded.agentId}`);
        return res.status(404).json({ 
          success: false, 
          message: "Agent not found" 
        });
      }

      const agent = agents[0];
      console.log(`Found agent: ${agent.agent_name}, Status: ${agent.status}`);

      const responseData = {
        success: true,
        agent: {
          id: agent.id,
          userId: agent.user_id,
          agentName: agent.agent_name,
          email: agent.email,
          fullName: agent.username,
          status: agent.status,
          createdAt: agent.created_at
        }
      };
      
      console.log("Profile fetch successful. Response data:", JSON.stringify(responseData));
      res.json(responseData);
    } catch (error) {
      console.error("Token verification error:", error);
      console.error("Error details:", error.message);
      return res.status(401).json({ 
        success: false, 
        message: "Token is not valid" 
      });
    }
  } catch (error) {
    console.error("Error getting agent profile:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ success: false, message: "Failed to get agent profile" });
  }
});

// Logout agent (update status to offline)
router.post("/logout", async (req, res) => {
  console.log("==== AGENT LOGOUT REQUEST ====");
  console.log("Headers:", JSON.stringify(req.headers));
  
  try {
    // Verify token from header
    const token = req.header("x-auth-token");
    console.log(`Token present: ${!!token}`);
    
    if (token) {
      console.log(`Token prefix: ${token.substring(0, 20)}...`);
    }
    
    if (!token) {
      console.log("Logout failed: No token provided");
      return res.status(401).json({ 
        success: false, 
        message: "No token, authorization denied" 
      });
    }

    try {
      // Verify token
      console.log("Verifying token...");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified. Decoded payload:", JSON.stringify(decoded));
      
      // Update agent status to offline
      console.log(`Updating agent status to 'offline' for agent ID: ${decoded.agentId}`);
      await pool.query(
        "UPDATE agents SET status = 'offline' WHERE id = ?",
        [decoded.agentId]
      );
      console.log("Agent status updated to offline");

      console.log("Logout successful");
      res.json({
        success: true,
        message: "Logged out successfully"
      });
    } catch (error) {
      console.error("Token verification error:", error);
      console.error("Error details:", error.message);
      return res.status(401).json({ 
        success: false, 
        message: "Token is not valid" 
      });
    }
  } catch (error) {
    console.error("Error during agent logout:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
});

// Register a new agent - Admin access only
router.post("/register", async (req, res) => {
  console.log("==== AGENT REGISTRATION REQUEST ====");
  console.log("Request body:", JSON.stringify(req.body));
  
  try {
    const { fullName, email, password, agentName, username, status = "offline" } = req.body;
    
    // Check auth token
    const adminToken = req.header("x-chat-admin-token");
    console.log(`Admin token present: ${!!adminToken}`);
    
    // Validate input
    if (!fullName || !email || !password || !agentName) {
      console.log("Registration failed: Missing required fields");
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Check if email already exists
    console.log(`Checking if email already exists: ${email}`);
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      console.log(`Email already exists: ${email}`);
      return res.status(400).json({ 
        success: false, 
        message: "A user with this email already exists" 
      });
    }

    // Check if username exists if provided
    if (username) {
      console.log(`Checking if username exists: ${username}`);
      const [existingUsername] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (existingUsername.length > 0) {
        console.log(`Username already exists: ${username}`);
        return res.status(400).json({ 
          success: false, 
          message: "A user with this username already exists" 
        });
      }
    }

    // Hash the password
    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(`Password hashed: ${hashedPassword.substring(0, 10)}...`);

    // Start transaction
    console.log("Starting database transaction...");
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Create new user
      console.log(`Creating new user: ${username || fullName}`);
      const [userResult] = await connection.query(
        "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())",
        [username || fullName, email, hashedPassword]
      );

      const userId = userResult.insertId;
      console.log(`User created with ID: ${userId}`);

      // Create agent record linked to the user
      console.log(`Creating agent record for user ID: ${userId}`);
      await connection.query(
        "INSERT INTO agents (user_id, agent_name, status, created_at) VALUES (?, ?, ?, NOW())",
        [userId, agentName, status]
      );

      await connection.commit();
      console.log("Transaction committed successfully");

      console.log("Agent registration successful");
      res.json({
        success: true,
        message: "Agent registered successfully. Please login to continue."
      });
    } catch (error) {
      console.error("Error in transaction, rolling back:", error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
      console.log("Database connection released");
    }
  } catch (error) {
    console.error("Error during agent registration:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ success: false, message: "Failed to register agent" });
  }
});

module.exports = router; 