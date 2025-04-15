const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../authMiddleware");

// Get all agents with their status - Django auth will handle permissions
router.get("/agents", async (req, res) => {
  console.log("Agent route: GET /agents - Fetching all agents");
  
  try {
    console.log("Agent route: Executing query to fetch all agents");
    const [agents] = await pool.query(`
      SELECT a.id, a.agent_name, a.status, u.email, a.created_at, a.updated_at
      FROM agents a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.status ASC, a.agent_name ASC
    `);
    
    console.log(`Agent route: Found ${agents.length} agents`);
    
    // Log agent statuses for debugging
    const statusCounts = agents.reduce((acc, agent) => {
      acc[agent.status] = (acc[agent.status] || 0) + 1;
      return acc;
    }, {});
    console.log("Agent route: Agent status counts:", statusCounts);
    
    res.json({ success: true, agents });
  } catch (error) {
    console.error("Agent route: Error fetching agents:", error);
    res.status(500).json({ success: false, message: "Failed to fetch agents" });
  }
});

// Register current user as an agent or update agent info
router.post("/register", authMiddleware, async (req, res) => {
  const { agentName } = req.body;
  const userId = req.user.id;
  
  if (!agentName) {
    return res.status(400).json({ success: false, message: "Agent name is required" });
  }
  
  try {
    // Check if user is already an agent
    const [existingAgent] = await pool.query(
      "SELECT * FROM agents WHERE user_id = ?",
      [userId]
    );
    
    if (existingAgent.length > 0) {
      // Update existing agent
      await pool.query(
        "UPDATE agents SET agent_name = ? WHERE user_id = ?",
        [agentName, userId]
      );
      
      res.json({ 
        success: true, 
        message: "Agent information updated",
        agentId: existingAgent[0].id
      });
    } else {
      // Create new agent
      const [result] = await pool.query(
        "INSERT INTO agents (user_id, agent_name, status) VALUES (?, ?, 'offline')",
        [userId, agentName]
      );
      
      res.json({ 
        success: true, 
        message: "Successfully registered as an agent",
        agentId: result.insertId
      });
    }
  } catch (error) {
    console.error("Error registering agent:", error);
    res.status(500).json({ success: false, message: "Failed to register as an agent" });
  }
});

// Update agent status
router.put("/status", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const userId = req.user.id;
  
  if (!status || !['online', 'offline', 'busy'].includes(status)) {
    return res.status(400).json({ success: false, message: "Valid status is required" });
  }
  
  try {
    // Check if user is an agent
    const [existingAgent] = await pool.query(
      "SELECT * FROM agents WHERE user_id = ?",
      [userId]
    );
    
    if (existingAgent.length === 0) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    // Update agent status
    await pool.query(
      "UPDATE agents SET status = ? WHERE user_id = ?",
      [status, userId]
    );
    
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    console.error("Error updating agent status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

// Get active chat rooms (for agents)
router.get("/rooms", authMiddleware, async (req, res) => {
  const { status } = req.query;
  
  try {
    let query = `
      SELECT 
        cr.id, cr.user_name, cr.status, cr.created_at,
        a.agent_name,
        (SELECT content FROM chat_messages 
         WHERE room_id = cr.id 
         ORDER BY created_at DESC LIMIT 1) as last_message,
        (SELECT COUNT(*) FROM chat_messages
         WHERE room_id = cr.id) as message_count
      FROM chat_rooms cr
      LEFT JOIN agents a ON cr.assigned_agent_id = a.id
    `;
    
    const params = [];
    
    if (status) {
      query += " WHERE cr.status = ?";
      params.push(status);
    }
    
    query += " ORDER BY cr.created_at DESC";
    
    const [rooms] = await pool.query(query, params);
    
    // Add wait time calculation for display
    const roomsWithWaitTime = rooms.map(room => {
      const created = new Date(room.created_at);
      const now = new Date();
      const diffMs = now - created;
      const diffMins = Math.floor(diffMs / 60000);
      
      let waitTime = "Just now";
      if (diffMins === 1) {
        waitTime = "1 min";
      } else if (diffMins > 1) {
        waitTime = `${diffMins} mins`;
      }
      
      return {
        ...room,
        waitTime
      };
    });
    
    res.json({ success: true, rooms: roomsWithWaitTime });
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chat rooms" });
  }
});

// Get chat history for a specific room
router.get("/history/:roomId", authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  
  try {
    // First check if the room exists
    const [room] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ?",
      [roomId]
    );
    
    if (room.length === 0) {
      return res.status(404).json({ success: false, message: "Chat room not found" });
    }
    
    // Get messages for the room
    const [messages] = await pool.query(
      `SELECT 
        id, room_id, sender_id, sender_name, content, role, created_at as timestamp 
      FROM chat_messages 
      WHERE room_id = ? 
      ORDER BY created_at ASC`,
      [roomId]
    );
    
    res.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chat history" });
  }
});

// Close a chat room (mark as closed)
router.put("/close-room/:roomId", authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  
  try {
    await pool.query(
      "UPDATE chat_rooms SET status = 'closed', assigned_agent_id = NULL WHERE id = ?",
      [roomId]
    );
    
    // Add system message about room closure
    await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, 'system', 'System', 'This chat has been closed.', 'system')`,
      [roomId]
    );
    
    res.json({ success: true, message: "Chat room closed" });
  } catch (error) {
    console.error("Error closing chat room:", error);
    res.status(500).json({ success: false, message: "Failed to close chat room" });
  }
});

// Assign an agent to a room
router.put("/assign/:roomId", authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;
  
  try {
    // Get the agent ID for this user
    const [agent] = await pool.query(
      "SELECT id, agent_name FROM agents WHERE user_id = ?",
      [userId]
    );
    
    if (agent.length === 0) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    const agentId = agent[0].id;
    const agentName = agent[0].agent_name;
    
    // Check if room exists and is not assigned
    const [room] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ?",
      [roomId]
    );
    
    if (room.length === 0) {
      return res.status(404).json({ success: false, message: "Chat room not found" });
    }
    
    if (room[0].assigned_agent_id !== null && room[0].assigned_agent_id !== agentId) {
      return res.status(400).json({ 
        success: false, 
        message: "This room is already assigned to another agent" 
      });
    }
    
    // Update the room status and assign the agent
    await pool.query(
      "UPDATE chat_rooms SET status = 'active', assigned_agent_id = ? WHERE id = ?",
      [agentId, roomId]
    );
    
    // Add system message about agent joining
    await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, ?, ?, ?, 'system')`,
      [roomId, `agent-${agentId}`, 'System', `${agentName} has joined the chat.`]
    );
    
    // Set the agent status to busy
    await pool.query(
      "UPDATE agents SET status = 'busy' WHERE id = ?",
      [agentId]
    );
    
    res.json({ success: true, message: "Successfully assigned to chat room" });
  } catch (error) {
    console.error("Error assigning agent to room:", error);
    res.status(500).json({ success: false, message: "Failed to assign agent to room" });
  }
});

// Leave a chat room (unassign)
router.put("/leave/:roomId", authMiddleware, async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;
  
  try {
    // Get the agent ID for this user
    const [agent] = await pool.query(
      "SELECT id, agent_name FROM agents WHERE user_id = ?",
      [userId]
    );
    
    if (agent.length === 0) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    const agentId = agent[0].id;
    const agentName = agent[0].agent_name;
    
    // Check if room exists and is assigned to this agent
    const [room] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ? AND assigned_agent_id = ?",
      [roomId, agentId]
    );
    
    if (room.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Chat room not found or not assigned to you" 
      });
    }
    
    // Update the room status and unassign the agent
    await pool.query(
      "UPDATE chat_rooms SET assigned_agent_id = NULL WHERE id = ?",
      [roomId]
    );
    
    // Add system message about agent leaving
    await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, ?, ?, ?, 'system')`,
      [roomId, `agent-${agentId}`, 'System', `${agentName} has left the chat.`]
    );
    
    // Set the agent status back to online
    await pool.query(
      "UPDATE agents SET status = 'online' WHERE id = ?",
      [agentId]
    );
    
    res.json({ success: true, message: "Successfully left the chat room" });
  } catch (error) {
    console.error("Error leaving chat room:", error);
    res.status(500).json({ success: false, message: "Failed to leave chat room" });
  }
});

// Send a message (store in database)
router.post("/message", authMiddleware, async (req, res) => {
  const { roomId, content, role = 'agent' } = req.body;
  const userId = req.user.id;
  
  if (!roomId || !content) {
    return res.status(400).json({ success: false, message: "Room ID and content are required" });
  }
  
  try {
    // Get the agent info
    const [agent] = await pool.query(
      "SELECT id, agent_name FROM agents WHERE user_id = ?",
      [userId]
    );
    
    if (agent.length === 0) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    const agentId = agent[0].id;
    const agentName = agent[0].agent_name;
    
    // Insert the message
    const [result] = await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [roomId, `agent-${agentId}`, agentName, content, role]
    );
    
    res.json({ 
      success: true, 
      message: "Message sent successfully",
      messageId: result.insertId
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Delete an agent - Django auth will handle super admin permissions
router.delete("/:id", async (req, res) => {
  const agentId = req.params.id;
  
  try {
    // Check if agent exists
    const [existingAgent] = await pool.query(
      "SELECT * FROM agents WHERE id = ?",
      [agentId]
    );
    
    if (existingAgent.length === 0) {
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
      
      // Optionally, delete the user account associated with this agent
      await connection.query(
        "DELETE FROM users WHERE id = ?",
        [userId]
      );
      
      await connection.commit();
      
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
    console.error("Error deleting agent:", error);
    res.status(500).json({ success: false, message: "Failed to delete agent" });
  }
});

// Update agent information - Django auth will handle super admin permissions
router.put("/:id", async (req, res) => {
  const agentId = req.params.id;
  const { agentName, status } = req.body;
  
  if (!agentName) {
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
      return res.status(404).json({ success: false, message: "Agent not found" });
    }
    
    // Update agent information
    let query = "UPDATE agents SET agent_name = ?";
    let params = [agentName];
    
    if (status) {
      query += ", status = ?";
      params.push(status);
    }
    
    query += " WHERE id = ?";
    params.push(agentId);
    
    await pool.query(query, params);
    
    res.json({ 
      success: true, 
      message: "Agent updated successfully" 
    });
  } catch (error) {
    console.error("Error updating agent:", error);
    res.status(500).json({ success: false, message: "Failed to update agent" });
  }
});

module.exports = router; 