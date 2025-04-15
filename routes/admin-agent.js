const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");
const adminAuthMiddleware = require("../adminAuthMiddleware");
const superAdminMiddleware = require("../superAdminMiddleware");

// Get all agents (admin auth required)
router.get("/agents", adminAuthMiddleware, async (req, res) => {
  console.log("Admin-agent route: GET /agents - Fetching all agents");
  console.log("Admin-agent route: Request from admin ID:", req.admin.id);
  
  try {
    console.log("Admin-agent route: Executing query to fetch all agents");
    const [agents] = await pool.query(`
      SELECT a.id, a.agent_name, a.status, u.email, a.created_at, a.updated_at
      FROM agents a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.status ASC, a.agent_name ASC
    `);
    
    console.log(`Admin-agent route: Found ${agents.length} agents`);
    
    // Log agent statuses for debugging
    const statusCounts = agents.reduce((acc, agent) => {
      acc[agent.status] = (acc[agent.status] || 0) + 1;
      return acc;
    }, {});
    console.log("Admin-agent route: Agent status counts:", statusCounts);
    
    res.json({ success: true, agents });
  } catch (error) {
    console.error("Admin-agent route: Error fetching agents:", error);
    res.status(500).json({ success: false, message: "Failed to fetch agents" });
  }
});

// Get agent by ID (admin auth required)
router.get("/agent/:id", adminAuthMiddleware, async (req, res) => {
  const agentId = req.params.id;
  console.log(`Admin-agent route: GET /agent/${agentId} - Fetching agent details`);
  
  try {
    // Get agent details including user info
    const [agents] = await pool.query(`
      SELECT a.id, a.agent_name, a.status, u.email, u.username as full_name, 
             a.created_at, a.updated_at, 
             (SELECT COUNT(*) FROM chat_rooms WHERE assigned_agent_id = a.id AND status = 'active') as active_chats
      FROM agents a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ?
    `, [agentId]);
    
    if (agents.length === 0) {
      console.log(`Admin-agent route: Agent with ID ${agentId} not found`);
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    console.log(`Admin-agent route: Found agent: ${agents[0].agent_name}`);
    res.json({ success: true, agent: agents[0] });
  } catch (error) {
    console.error(`Admin-agent route: Error fetching agent ${agentId}:`, error);
    res.status(500).json({ success: false, message: "Failed to fetch agent details" });
  }
});

// Delete agent by ID (super admin only)
router.delete("/agent/:id", superAdminMiddleware, async (req, res) => {
  const agentId = req.params.id;
  console.log(`Admin-agent route: DELETE /agent/${agentId} - Deleting agent`);
  
  try {
    // Check if agent exists
    const [existingAgent] = await pool.query(
      "SELECT * FROM agents WHERE id = ?",
      [agentId]
    );
    
    if (existingAgent.length === 0) {
      console.log(`Admin-agent route: Agent with ID ${agentId} not found`);
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    // Get the user ID associated with this agent
    const userId = existingAgent[0].user_id;
    
    // Start transaction
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // First, remove the agent from any assigned chat rooms
      await connection.query(
        "UPDATE chat_rooms SET assigned_agent_id = NULL, status = 'waiting' WHERE assigned_agent_id = ?",
        [agentId]
      );
      
      // Delete agent record
      await connection.query(
        "DELETE FROM agents WHERE id = ?",
        [agentId]
      );
      
      // Delete the user account associated with this agent
      await connection.query(
        "DELETE FROM users WHERE id = ?",
        [userId]
      );
      
      await connection.commit();
      
      console.log(`Admin-agent route: Successfully deleted agent with ID ${agentId}`);
      res.json({ 
        success: true, 
        message: "Agent deleted successfully" 
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`Admin-agent route: Error deleting agent ${agentId}:`, error);
    res.status(500).json({ success: false, message: "Failed to delete agent" });
  }
});

// Update agent (super admin only)
router.put("/agent/:id", superAdminMiddleware, async (req, res) => {
  const agentId = req.params.id;
  const { agent_name, status } = req.body;
  
  console.log(`Admin-agent route: PUT /agent/${agentId} - Updating agent`);
  console.log("Admin-agent route: Update data:", req.body);
  
  if (!agent_name) {
    return res.status(400).json({ success: false, message: "Agent name is required" });
  }
  
  if (status && !['online', 'offline', 'busy'].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }
  
  try {
    // Check if agent exists
    const [existingAgent] = await pool.query(
      "SELECT * FROM agents WHERE id = ?",
      [agentId]
    );
    
    if (existingAgent.length === 0) {
      console.log(`Admin-agent route: Agent with ID ${agentId} not found`);
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    // Update agent information
    let query = "UPDATE agents SET agent_name = ?";
    let params = [agent_name];
    
    if (status) {
      query += ", status = ?";
      params.push(status);
    }
    
    query += " WHERE id = ?";
    params.push(agentId);
    
    await pool.query(query, params);
    
    console.log(`Admin-agent route: Successfully updated agent with ID ${agentId}`);
    res.json({ 
      success: true, 
      message: "Agent updated successfully" 
    });
  } catch (error) {
    console.error(`Admin-agent route: Error updating agent ${agentId}:`, error);
    res.status(500).json({ success: false, message: "Failed to update agent" });
  }
});

// Register a new agent (admin auth required)
router.post("/register-agent", adminAuthMiddleware, async (req, res) => {
  const { email, password, username, fullName, agentName, status = 'offline' } = req.body;
  
  console.log("Admin-agent route: POST /register-agent - Registering new agent");
  console.log("Admin-agent route: Request data:", { 
    email, 
    username, 
    fullName, 
    agentName, 
    status, 
    hasPassword: !!password 
  });
  
  try {
    // Validate input
    if (!email || !password || !username || !agentName) {
      console.log("Admin-agent route: Missing required fields for agent registration");
      return res.status(400).json({ 
        success: false, 
        message: "Email, password, username, and agent name are required" 
      });
    }
    
    // Check if user with this email already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (existingUsers.length > 0) {
      console.log(`Admin-agent route: User with email ${email} already exists`);
      return res.status(400).json({ 
        success: false, 
        message: "User with this email already exists" 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Begin transaction
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Create user record
      const [userResult] = await connection.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      
      const userId = userResult.insertId;
      
      // Create agent record
      const [agentResult] = await connection.query(
        "INSERT INTO agents (user_id, agent_name, status) VALUES (?, ?, ?)",
        [userId, agentName, status]
      );
      
      await connection.commit();
      
      console.log("Admin-agent route: Agent registered successfully");
      res.json({
        success: true,
        message: "Agent registered successfully",
        agent: {
          userId,
          agentId: agentResult.insertId,
          email,
          username,
          agentName,
          status
        }
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Admin-agent route: Error registering agent:", error);
    res.status(500).json({ success: false, message: "Failed to register agent" });
  }
});

// Test endpoint (no auth required)
router.get("/test", async (req, res) => {
  console.log("Admin-agent route: GET /test - Route is working");
  res.json({ 
    success: true, 
    message: "Admin agent route is working!"
  });
});

module.exports = router; 