const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const pool = require("./db");
const http = require("http");
const socketIo = require("socket.io");

const chatRoute = require("./routes/chat");
const uploadRoute = require("./routes/upload");
const authRoute = require("./routes/auth");
const globalApiKeyRoutes = require("./routes/api-key");
const agentRoute = require("./routes/agent");
const agentAuthRoute = require("./routes/agent-auth");
const adminAuthRoute = require("./routes/admin-auth");
const adminRoute = require("./routes/admin");
const adminAgentRoute = require("./routes/admin-agent");

const app = express();
const PORT = process.env.PORT || 5000;

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-auth-token"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end(); 
    return;
  }

  return await fn(req, res);
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/chat", chatRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoute);
app.use("/api/delete", authRoute);
app.use("/api/global-openai-key", globalApiKeyRoutes);
app.use("/api/agent", agentRoute);
app.use("/api/agent-auth", agentAuthRoute);
app.use("/api/admin-auth", adminAuthRoute);
app.use("/api/admin", adminRoute);
app.use("/api/admin-agent", adminAgentRoute);

app.use("/uploads", express.static("uploads"));

// Create HTTP server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket connection storage
const activeAgents = new Map(); // Map of agent socket IDs to agent info
const chatRooms = new Map(); // Map of room IDs to room info
const userSockets = new Map(); // Map of user socket IDs to user info

// Constants
const RECENT_CONVERSATION_LIMIT = 10 * 60 * 1000; // 10 minutes in milliseconds

// Helper function to notify all agents about an updated room
const notifyRoomUpdate = (room) => {
  console.log(`[DEBUG] Notifying all agents about updated room: ${room.id}`);
  console.log(`[DEBUG] Room data: ${JSON.stringify(room)}`);
  let notifiedCount = 0;
  
  for (const [agentSocketId, _] of activeAgents.entries()) {
    console.log(`[DEBUG] Sending room_updated to agent: ${agentSocketId}`);
    io.to(agentSocketId).emit("room_updated", {
      id: room.id,
      userName: room.userName,
      lastMessage: room.lastMessage,
      active: room.active,
      lastActivityTimestamp: room.lastActivityTimestamp,
      unread: room.unread,
      assignedAgentId: room.assignedAgentId
    });
    notifiedCount++;
  }
  
  console.log(`[DEBUG] Notified ${notifiedCount} agents about room update`);
};

// Load existing rooms from database
async function loadExistingRooms() {
  try {
    const [rooms] = await pool.query(`
      SELECT cr.*, a.agent_name, 
        (SELECT content FROM chat_messages 
         WHERE room_id = cr.id 
         ORDER BY created_at DESC LIMIT 1) as last_message,
        (SELECT created_at FROM chat_messages 
         WHERE room_id = cr.id 
         ORDER BY created_at DESC LIMIT 1) as last_activity_timestamp
      FROM chat_rooms cr
      LEFT JOIN agents a ON cr.assigned_agent_id = a.id
      WHERE cr.status != 'closed'
    `);
    
    rooms.forEach(room => {
      const lastActivityTime = room.last_activity_timestamp || room.created_at;
      const isActive = (Date.now() - new Date(lastActivityTime).getTime()) < RECENT_CONVERSATION_LIMIT;
      
      chatRooms.set(room.id, {
        id: room.id,
        userSocketId: null, // Will be updated when user connects
        userName: room.user_name,
        createdAt: room.created_at,
        assignedAgentId: room.assigned_agent_id,
        status: room.status,
        lastMessage: room.last_message,
        lastActivityTimestamp: lastActivityTime,
        active: isActive, // Add active flag
        messages: [], // Will load messages when needed
        unread: false // Default false for unassigned rooms
      });
    });
    
    console.log(`Loaded ${rooms.length} rooms from database`);
  } catch (error) {
    console.error("Error loading existing rooms:", error);
  }
}

// Load existing rooms on startup
loadExistingRooms();

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Function to check and mark inactive rooms
  const checkInactiveRooms = () => {
    const now = Date.now();
    const INACTIVE_THRESHOLD = 10 * 60 * 1000; // 10 minutes
    
    for (const [roomId, room] of chatRooms.entries()) {
      if (room.lastActivityTimestamp) {
        const lastActivity = new Date(room.lastActivityTimestamp).getTime();
        if (now - lastActivity > INACTIVE_THRESHOLD && room.active) {
          console.log(`Room ${roomId} marked inactive due to 10+ minutes of inactivity`);
          room.active = false;
          
          // Update database
          pool.query(
            "UPDATE chat_rooms SET status = 'inactive' WHERE id = ?",
            [roomId]
          ).catch(err => console.error("Error updating room status:", err));
          
          // Notify all agents about this change
          notifyRoomUpdate(room);
        }
      }
    }
  };
  
  // Run inactive check periodically
  const inactivityInterval = setInterval(checkInactiveRooms, 60000); // Check every minute
  
  // Clean up interval on disconnect
  socket.on("disconnect", () => {
    clearInterval(inactivityInterval);
  });

  // Register as agent
  socket.on("register_agent", async (data) => {
    const { agentId, agentName } = data;
    
    // Check if this agent exists in database and update status
    try {
      const [agent] = await pool.query(
        "SELECT * FROM agents WHERE agent_name = ?",
        [agentName]
      );
      
      let agentId = null;
      let agentStatus = 'online';
      
      if (agent.length > 0) {
        // Get current status from database
        agentStatus = agent[0].status || 'online';
        agentId = agent[0].id;
        
        // Update agent status to online in database
        await pool.query(
          "UPDATE agents SET status = 'online', last_active = CURRENT_TIMESTAMP WHERE id = ?",
          [agent[0].id]
        );
        
        console.log(`Agent ${agentName} status set to online in database`);
      }
      
      // Store in memory
      activeAgents.set(socket.id, { 
        id: socket.id, 
        dbId: agentId,
        name: agentName || "Support Agent",
        status: 'online', // Always start with online status in memory
        rooms: [] // Rooms this agent is currently in
      });
      
      console.log(`Agent registered: ${agentName} (${socket.id})`);
      
      // Send the agent their current status
      socket.emit("agent_status", 'online');
      
      // Get available rooms - ensure we use the activity flag consistently
      const allRooms = Array.from(chatRooms.values());
      
      // Set a room's active status based on activity time
      allRooms.forEach(room => {
        if (!room.lastActivityTimestamp) return;
        
        const lastActivity = new Date(room.lastActivityTimestamp).getTime();
        const now = Date.now();
        
        // Mark as active if activity in last 10 minutes
        if (now - lastActivity < RECENT_CONVERSATION_LIMIT) {
          room.active = true;
        } else if (room.active) {
          room.active = false;
          
          // Update in database too
          pool.query(
            "UPDATE chat_rooms SET status = 'inactive' WHERE id = ?",
            [room.id]
          ).catch(err => console.error("Error updating room status:", err));
        }
      });
      
      // Include rooms that are either unassigned OR assigned to this agent
      const availableRoomsList = allRooms
        .filter(room => room.active && (!room.assignedAgentId || room.assignedAgentId === socket.id))
        .map(room => ({
          id: room.id,
          userName: room.userName,
          lastMessage: room.lastMessage,
          waitTime: getWaitTime(room.createdAt),
          active: true,
          lastActivityTimestamp: room.lastActivityTimestamp,
          assignedAgentId: room.assignedAgentId
        }));
      
      socket.emit("available_rooms", availableRoomsList);
    } catch (error) {
      console.error("Error registering agent:", error);
    }
  });

  // Get agent status
  socket.on("get_agent_status", async (data) => {
    const { agentId } = data;
    const agent = activeAgents.get(socket.id);
    
    if (!agent || !agent.dbId) {
      return socket.emit("agent_status", "online"); // Default to online
    }
    
    try {
      const [dbAgent] = await pool.query(
        "SELECT status FROM agents WHERE id = ?",
        [agent.dbId]
      );
      
      if (dbAgent.length > 0) {
        socket.emit("agent_status", dbAgent[0].status);
      }
    } catch (error) {
      console.error("Error getting agent status:", error);
      socket.emit("agent_status", "online"); // Default to online on error
    }
  });

  // Request agent (when a user requests a support agent)
  socket.on("request_agent", async (data) => {
    const { roomId, userId, userName, chatHistory } = data;
    const now = new Date();
    
    // Store the room info in memory - always mark new requests as active
    const room = chatRooms.get(roomId) || {
      id: roomId,
      userSocketId: socket.id,
      userName: userName || "User",
      createdAt: now,
      messages: chatHistory || [],
      assignedAgentId: null,
      lastMessage: chatHistory && chatHistory.length > 0 ? 
        chatHistory[chatHistory.length - 1].content : "Requested agent support",
      lastActivityTimestamp: now.toISOString(),
      active: true // New room is always active
    };
    
    // Update or add room to the map
    chatRooms.set(roomId, room);
    
    // Add user to userSockets map
    userSockets.set(socket.id, { 
      id: socket.id,
      roomId: roomId,
      userName: userName || "User"
    });
    
    // Create or update room in database
    try {
      // Check if room exists
      const [existingRoom] = await pool.query(
        "SELECT * FROM chat_rooms WHERE id = ?",
        [roomId]
      );
      
      if (existingRoom.length === 0) {
        // Create new room - explicitly mark as active
        await pool.query(
          "INSERT INTO chat_rooms (id, user_socket_id, user_name, status, last_activity) VALUES (?, ?, ?, 'active', CURRENT_TIMESTAMP)",
          [roomId, socket.id, userName || "User"]
        );
        
        // Add welcome message
        await pool.query(
          `INSERT INTO chat_messages 
          (room_id, sender_id, sender_name, content, role) 
          VALUES (?, 'system', 'System', 'Welcome to the chat. How can we help you today?', 'system')`,
          [roomId]
        );
      } else {
        // Update existing room - explicitly mark as active
        await pool.query(
          "UPDATE chat_rooms SET user_socket_id = ?, status = 'active', last_activity = CURRENT_TIMESTAMP WHERE id = ?",
          [socket.id, roomId]
        );
      }
      
      // Add system message about requesting an agent
      await pool.query(
        `INSERT INTO chat_messages 
        (room_id, sender_id, sender_name, content, role) 
        VALUES (?, 'system', 'System', 'Connecting you to a support agent. Please wait a moment...', 'system')`,
        [roomId]
      );
      
      console.log(`Agent requested for room: ${roomId} by user: ${userName}`);
      
      // Get online agents from database
      const [onlineAgents] = await pool.query(
        "SELECT COUNT(*) as count FROM agents WHERE status = 'online'"
      );
      
      const agentsAvailable = onlineAgents[0].count > 0;
      
      // Create room object with proper 'active' field for all agents
      const newRoomData = {
        id: roomId,
        userName: userName || "User",
        lastMessage: "Waiting for assistance...",
        active: true,
        status: 'active',
        waitTime: "Just now",
        lastActivityTimestamp: new Date().toISOString(),
        assignedAgentId: null // Not assigned to any agent yet
      };
      
      // Add to in-memory map for realtime access
      chatRooms.set(roomId, newRoomData);
      
      if (agentsAvailable) {
        console.log("Notifying all agents about new support request room:", roomId);
        
        // Notify all active agents about the new room using room_updated event
        for (const [agentSocketId, agentInfo] of activeAgents.entries()) {
          console.log(`Sending room_updated to agent: ${agentSocketId}`);
          io.to(agentSocketId).emit("room_updated", newRoomData);
        }
        
        // Also update full available rooms list for all agents
        updateAvailableRoomsForAllAgents();
      } else {
        // No agents available, notify the user
        io.to(socket.id).emit("no_agents_available");
        
        // Add system message that no agents are available
        await pool.query(
          `INSERT INTO chat_messages 
          (room_id, sender_id, sender_name, content, role) 
          VALUES (?, 'system', 'System', 'We\'re sorry, but there are no support agents available at the moment. Please try again later or continue chatting with our AI assistant.', 'system')`,
          [roomId]
        );
      }
    } catch (error) {
      console.error("Error processing agent request:", error);
    }

    // Notify all agents about the new support request
    notifyAllAgents('agent_notification', {
      type: 'new_room',
      message: `New support request from ${userName || "User"}`,
      timestamp: new Date().toISOString()
    });
  });

  // Update room
  socket.on("update_room", async (data) => {
    const { roomId, updates } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) {
      console.log(`Room not found for update: ${roomId}`);
      return;
    }
    
    console.log(`Updating room ${roomId}:`, updates);
    
    // Update room in memory
    Object.assign(room, updates);
    
    try {
      // Update in database
      let query = "UPDATE chat_rooms SET ";
      const params = [];
      
      // Build query based on provided updates
      if (updates.active !== undefined) {
        query += "status = ?, ";
        params.push(updates.active ? 'active' : 'inactive');
      }
      
      if (updates.lastActivityTimestamp) {
        query += "updated_at = ?, ";
        params.push(new Date(updates.lastActivityTimestamp));
      }
      
      // Remove trailing comma and space
      query = query.slice(0, -2);
      
      // Add WHERE clause
      query += " WHERE id = ?";
      params.push(roomId);
      
      // Execute query if we have parameters
      if (params.length > 1) { // At least one update + roomId
        await pool.query(query, params);
      }
      
      // Update available rooms list for all agents
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  });

  // Close room completely
  socket.on("close_room", async (data) => {
    const { roomId, agentId, reason, agentName } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) {
      console.log(`Room not found for closing: ${roomId}`);
      return;
    }
    
    try {
      console.log(`Closing room ${roomId}, reason: ${reason}`);
      
      // Update room in database to closed status
      await pool.query(
        "UPDATE chat_rooms SET status = 'closed', closed_at = CURRENT_TIMESTAMP, closed_reason = ? WHERE id = ?",
        [reason || 'agent_closed', roomId]
      );
      
      // Add system message about room closure
      await pool.query(
        `INSERT INTO chat_messages 
         (room_id, sender_id, sender_name, content, role) 
         VALUES (?, 'system', 'System', ?, 'system')`,
        [roomId, `This conversation has been closed by ${agentName || 'the agent'}.`]
      );
      
      // Notify the user if they're still connected
      if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
        io.to(room.userSocketId).emit("chat_closed", { 
          reason: reason || 'agent_closed',
          message: `The conversation has been closed by ${agentName || 'the agent'}.`
        });
      }
      
      // Remove the room from memory
      chatRooms.delete(roomId);
      
      // Update available rooms list for all agents
      updateAvailableRoomsForAllAgents();
      
      // Confirm closure to the agent
      socket.emit("room_left", { 
        success: true,
        roomId,
        availableRooms: await getAvailableRooms()
      });
    } catch (error) {
      console.error("Error closing room:", error);
      socket.emit("room_left", { 
        success: false,
        error: "Failed to close room",
        roomId
      });
    }
  });

  // Agent joins a room
  socket.on("join_room", async (data) => {
    const { roomId, agentId } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) {
      console.log(`Room not found: ${roomId}`);
      return;
    }
    
    const agent = activeAgents.get(socket.id);
    if (!agent) {
      console.log(`Agent not found: ${socket.id}`);
      return;
    }
    
    // Mark agent as assigned to this room
    room.assignedAgentId = socket.id; // Store socket ID for real-time access
    
    // Update room activity status and timestamp
    room.active = true;
    room.lastActivityTimestamp = new Date().toISOString();
    room.unread = false; // Clear unread flag when agent joins
    
    // Add room to agent's list of rooms
    agent.rooms.push(roomId);
    
    // Join socket room
    socket.join(roomId);
    
    console.log(`Agent ${agent.name} joined room: ${roomId}`);
    
    try {
      // Update room in database with agent's database ID
      await pool.query(
        "UPDATE chat_rooms SET assigned_agent_id = ?, status = 'active', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [agent.dbId, roomId]
      );
      
      // Add system message about agent joining
      await pool.query(
        `INSERT INTO chat_messages 
         (room_id, sender_id, sender_name, content, role) 
         VALUES (?, ?, 'System', ?, 'system')`,
        [roomId, `agent-${agent.dbId}`, `${agent.name} has joined the chat.`]
      );
      
      // Update agent status to busy
      if (agent.dbId) {
        await pool.query(
          "UPDATE agents SET status = 'busy' WHERE id = ?",
          [agent.dbId]
        );
        agent.status = 'busy';
      }
      
      // Notify the user that an agent has joined
      if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
        io.to(room.userSocketId).emit("agent_joined", { 
          agentId: agent.id, 
          agentName: agent.name 
        });
        
        // Add user to the room
        io.sockets.sockets.get(room.userSocketId).join(roomId);
      }
      
      // Load chat history from database
      const [messages] = await pool.query(
        `SELECT 
          id, room_id, sender_id, sender_name, content, role, created_at as timestamp
        FROM chat_messages 
        WHERE room_id = ? 
        ORDER BY created_at ASC`,
        [roomId]
      );
      
      // Send chat history to the agent
      socket.emit("chat_history", messages);
      
      // Notify all agents about the updated room status
      notifyRoomUpdate(room);
      
      // Update available rooms for all agents
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("Error when agent joining room:", error);
    }
  });

  // Agent leaves a room
  socket.on("leave_room", async (data) => {
    const { roomId, agentId, reason } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) {
      socket.emit("room_left", { 
        success: false,
        error: "Room not found",
        roomId
      });
      return;
    }
    
    const agent = activeAgents.get(socket.id);
    if (!agent) {
      socket.emit("room_left", { 
        success: false,
        error: "Agent not found",
        roomId
      });
      return;
    }
    
    // Mark agent as no longer assigned to this room
    room.assignedAgentId = null;
    
    // Update room activity status
    room.active = false;
    room.lastActivityTimestamp = new Date().toISOString();
    
    // Remove room from agent's list of rooms
    agent.rooms = agent.rooms.filter(r => r !== roomId);
    
    // Leave socket room
    socket.leave(roomId);
    
    console.log(`Agent ${agent.name} left room: ${roomId}, reason: ${reason || 'manual_exit'}`);
    
    try {
      // Update room in database
      await pool.query(
        "UPDATE chat_rooms SET assigned_agent_id = NULL, status = 'inactive', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [roomId]
      );
      
      // Add system message about agent leaving
      await pool.query(
        `INSERT INTO chat_messages 
         (room_id, sender_id, sender_name, content, role) 
         VALUES (?, ?, 'System', ?, 'system')`,
        [roomId, `agent-${agent.dbId}`, `${agent.name} has left the chat.`]
      );
      
      // Update agent status based on context
      if (agent.dbId && agent.rooms.length === 0) {
        const status = agent.status || 'online';
        
        await pool.query(
          "UPDATE agents SET status = ? WHERE id = ?",
          [status, agent.dbId]
        );
      }
      
      // Notify the user that the agent has left
      if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
        io.to(room.userSocketId).emit("agent_left");
      }
      
      // Get available rooms and send to agent
      const availableRooms = await getAvailableRooms(socket.id);
      
      socket.emit("room_left", { 
        success: true,
        roomId,
        availableRooms
      });
      
      // Update available rooms for all agents
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("Error when agent leaving room:", error);
      socket.emit("room_left", { 
        success: false,
        error: "Failed to process room exit",
        roomId
      });
    }
  });

  // Send message
  socket.on("send_message", async (message) => {
    const { roomId, role, content, senderId, senderName } = message;
    
    console.log(`[DEBUG] Message received: ${JSON.stringify(message)}`);
    
    if (!roomId || !content) {
      console.log("[DEBUG] Missing roomId or content, ignoring message");
      return;
    }
    
    const room = chatRooms.get(roomId);
    if (!room) {
      console.log(`[DEBUG] Room ${roomId} not found in chatRooms Map`);
      return;
    }
    
    try {
      // Always mark room as active when a message is sent
      room.active = true;
      room.lastActivityTimestamp = new Date().toISOString();
      room.lastMessage = content;
      
      // Set unread flag if the message is from a user and sent to a room with an agent
      if (role === 'user' && room.assignedAgentId) {
        room.unread = true;
        console.log(`[DEBUG] Marking room ${roomId} as unread for agent`);
      }
      
      // Add message to database
      const [result] = await pool.query(
        `INSERT INTO chat_messages 
         (room_id, sender_id, sender_name, content, role) 
         VALUES (?, ?, ?, ?, ?)`,
        [roomId, senderId || 'unknown', senderName || role, content, role]
      );
      
      // Add message ID to the message object
      message.id = result.insertId;
      message.timestamp = new Date().toISOString();
      
      // Add message to room history
      room.messages = room.messages || [];
      room.messages.push(message);
      
      // Update last message and activity in database - ensure active status
      await pool.query(
        "UPDATE chat_rooms SET updated_at = CURRENT_TIMESTAMP, status = 'active', last_message = ? WHERE id = ?",
        [content.substring(0, 255), roomId] // Limit message length to avoid DB issues
      );
      
      console.log(`[DEBUG] Sending message to room ${roomId}: ${content.substring(0, 30)}...`);
      
      // First broadcast directly to the room
      console.log(`[DEBUG] Broadcasting to room: ${roomId}`);
      io.to(roomId).emit("new_message", message);
      
      // Then explicitly send to agent if one is assigned
      if (room.assignedAgentId) {
        console.log(`[DEBUG] Explicitly sending message to agent: ${room.assignedAgentId}`);
        io.to(room.assignedAgentId).emit("new_message", message);
      }
      
      // Also send to the user if not from the user
      if (role !== 'user' && room.userSocketId) {
        console.log(`[DEBUG] Explicitly sending message to user: ${room.userSocketId}`);
        io.to(room.userSocketId).emit("new_message", message);
      }
      
      console.log(`[DEBUG] Message sent in room ${roomId} by ${role}: ${content.substring(0, 30)}...`);

      // Notify all agents about the updated room for sidebar updates
      const roomData = {
        id: room.id,
        userName: room.userName,
        lastMessage: content,
        active: true,
        lastActivityTimestamp: new Date().toISOString(),
        unread: role === 'user', // Mark as unread if from user
        assignedAgentId: room.assignedAgentId // Include agent assignment info
      };
      
      // Send room_updated to all agents
      console.log(`[DEBUG] Sending room_updated to all agents (count: ${activeAgents.size})`);
      let notifiedCount = 0;
      for (const [agentSocketId, _] of activeAgents.entries()) {
        console.log(`[DEBUG] Sending room update to agent: ${agentSocketId}`);
        io.to(agentSocketId).emit("room_updated", roomData);
        notifiedCount++;
      }
      console.log(`[DEBUG] Sent room_updated to ${notifiedCount} agents`);
      
      // If it's a user message and sent to a room with an agent, send notification
      if (role === 'user' && room.assignedAgentId) {
        console.log(`[DEBUG] Sending agent_notification to agent: ${room.assignedAgentId}`);
        io.to(room.assignedAgentId).emit("agent_notification", {
          type: 'new_message',
          message: `New message from ${senderName || "User"} in room ${roomId.slice(0, 8)}...`,
          timestamp: new Date().toISOString(),
          roomId: roomId
        });
      }
      
      // Also update available rooms for all agents to ensure sidebar reflects changes
      console.log(`[DEBUG] Updating available rooms for all agents`);
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("[DEBUG] Error sending message:", error);
    }
  });

  // Get chat history
  socket.on("get_chat_history", async (data) => {
    const { roomId } = data;
    
    try {
      // Load messages from database
      const [messages] = await pool.query(
        `SELECT 
          id, room_id, sender_id, sender_name, content, role, created_at as timestamp
        FROM chat_messages 
        WHERE room_id = ? 
        ORDER BY created_at ASC`,
        [roomId]
      );
      
      socket.emit("chat_history", messages);
    } catch (error) {
      console.error("Error getting chat history:", error);
      socket.emit("chat_history", []);
    }
  });

  // Handle disconnections
  socket.on("disconnect", async () => {
    console.log(`Disconnected: ${socket.id}`);
    
    try {
      // Check if this was an agent
      if (activeAgents.has(socket.id)) {
        const agent = activeAgents.get(socket.id);
        
        // Notify users in all rooms the agent was in
        for (const roomId of agent.rooms) {
          const room = chatRooms.get(roomId);
          if (room && room.assignedAgentId === socket.id) {
            room.assignedAgentId = null;
            
            // Update room in database
            await pool.query(
              "UPDATE chat_rooms SET assigned_agent_id = NULL, status = 'inactive' WHERE id = ?",
              [roomId]
            );
            
            // Add system message about agent disconnecting
            await pool.query(
              `INSERT INTO chat_messages 
               (room_id, sender_id, sender_name, content, role) 
               VALUES (?, 'system', 'System', 'The support agent has disconnected.', 'system')`,
              [roomId]
            );
            
            // Notify the user that the agent has left
            if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
              io.to(room.userSocketId).emit("agent_left");
            }
          }
        }
        
        // Update agent status to offline in database
        if (agent.dbId) {
          await pool.query(
            "UPDATE agents SET status = 'offline', last_active = CURRENT_TIMESTAMP WHERE id = ?",
            [agent.dbId]
          );
          console.log(`Agent ${agent.name} status set to offline in database due to disconnect`);
        }
        
        activeAgents.delete(socket.id);
        updateAvailableRoomsForAllAgents();
      }
      
      // Check if this was a user
      if (userSockets.has(socket.id)) {
        const user = userSockets.get(socket.id);
        
        // If the user had a chat room, update it
        if (user.roomId && chatRooms.has(user.roomId)) {
          const room = chatRooms.get(user.roomId);
          
          // Update user socket ID to null
          await pool.query(
            "UPDATE chat_rooms SET user_socket_id = NULL WHERE id = ?",
            [user.roomId]
          );
          
          // If an agent is assigned, notify them of user disconnection
          if (room.assignedAgentId) {
            // Add system message about user disconnecting
            await pool.query(
              `INSERT INTO chat_messages 
               (room_id, sender_id, sender_name, content, role) 
               VALUES (?, 'system', 'System', 'The user has disconnected.', 'system')`,
              [user.roomId]
            );
            
            // Notify the agent
            if (io.sockets.sockets.get(room.assignedAgentId)) {
              io.to(room.assignedAgentId).emit("user_disconnected", { 
                roomId: user.roomId, 
                userName: user.userName 
              });
            }
          } else {
            // No agent assigned, mark room as closed after a delay
            setTimeout(async () => {
              // Check if user reconnected
              const [currentRoom] = await pool.query(
                "SELECT * FROM chat_rooms WHERE id = ?",
                [user.roomId]
              );
              
              if (currentRoom.length > 0 && !currentRoom[0].user_socket_id) {
                // User did not reconnect, close the room
                await pool.query(
                  "UPDATE chat_rooms SET status = 'closed' WHERE id = ?",
                  [user.roomId]
                );
                
                chatRooms.delete(user.roomId);
              }
            }, 5 * 60 * 1000); // 5 minutes delay
          }
        }
        
        userSockets.delete(socket.id);
      }
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });

  // Handle agent status update
  socket.on("update_agent_status", async (data) => {
    const { agentId, status } = data;
    
    if (!activeAgents.has(socket.id)) {
      console.log(`Agent not found for status update: ${socket.id}`);
      socket.emit("status_updated", { 
        success: false,
        error: "Agent not found"
      });
      return;
    }
    
    const agent = activeAgents.get(socket.id);
    console.log(`Updating status for agent ${agent.name} from ${agent.status} to ${status}`);
    
    try {
      // Update agent status in memory
      agent.status = status;
      
      // Update agent status in database
      if (agent.dbId) {
        await pool.query(
          "UPDATE agents SET status = ?, last_active = CURRENT_TIMESTAMP WHERE id = ?",
          [status, agent.dbId]
        );
        
        console.log(`Agent ${agent.name} status updated to: ${status} in database`);
        
        // Handle status-specific logic
        if (status === 'busy') {
          // Mark agent as busy
          // Remove this agent's rooms from available rooms
          for (const roomId of agent.rooms) {
            const room = chatRooms.get(roomId);
            if (room) {
              room.assignedAgentId = socket.id; // Ensure assigned
            }
          }
        } else if (status === 'online') {
          // The agent is available, update available rooms for all agents
          updateAvailableRoomsForAllAgents();
        } else if (status === 'offline') {
          // Handle agent going offline
          // Leave all rooms assigned to this agent
          for (const roomId of [...agent.rooms]) { // Create a copy to avoid mutation during iteration
            const room = chatRooms.get(roomId);
            if (room) {
              // Mark room as no longer assigned to this agent
              room.assignedAgentId = null;
              room.active = false;
              
              // Update room in database
              await pool.query(
                "UPDATE chat_rooms SET assigned_agent_id = NULL, status = 'inactive' WHERE id = ?",
                [roomId]
              );
              
              // Add system message about agent going offline
              await pool.query(
                `INSERT INTO chat_messages 
                (room_id, sender_id, sender_name, content, role) 
                VALUES (?, 'system', 'System', ?, 'system')`,
                [roomId, `${agent.name} has gone offline.`]
              );
              
              // Notify user if connected
              if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
                io.to(room.userSocketId).emit("agent_left");
              }
              
              // Leave socket room
              socket.leave(roomId);
            }
          }
          
          // Clear agent's rooms
          agent.rooms = [];
        }
        
        // Send confirmation back to the agent
        socket.emit("status_updated", { 
          success: true, 
          status 
        });
      }
    } catch (error) {
      console.error("Error updating agent status:", error);
      socket.emit("status_updated", { 
        success: false, 
        error: "Failed to update status"
      });
    }
  });

  // Agent requests available rooms list
  socket.on("get_available_rooms", async () => {
    console.log(`Agent ${socket.id} explicitly requested available rooms`);
    
    try {
      // Get personalized list of available rooms for this agent
      const availableRooms = await getAvailableRooms(socket.id);
      console.log(`Sending ${availableRooms.length} available rooms to agent ${socket.id}`);
      
      // Send debug info about rooms
      availableRooms.forEach(room => {
        console.log(`Room ${room.id.substring(0, 8)}: active=${room.active}, assigned=${room.assignedAgentId ? 'yes' : 'no'}`);
      });
      
      // Send to requesting agent
      socket.emit("available_rooms", availableRooms);
    } catch (error) {
      console.error(`Error getting available rooms for agent ${socket.id}:`, error);
    }
  });
});

// Helper: Get available rooms
async function getAvailableRooms(agentSocketId = null) {
  try {
    // Get all active rooms from database that are either:
    // 1. Not assigned to any agent (waiting for pickup) OR
    // 2. Assigned to the requesting agent (if agentSocketId is provided)
    let query = `
      SELECT 
        cr.id, cr.user_name, cr.status, cr.created_at, cr.updated_at, cr.last_message,
        cr.assigned_agent_id,
        (SELECT MAX(created_at) FROM chat_messages 
         WHERE room_id = cr.id) as last_activity_time
      FROM chat_rooms cr
      WHERE cr.status != 'closed' AND (cr.assigned_agent_id IS NULL`;
    
    // If we have an agent socket ID, also include rooms assigned to this agent
    const params = [];
    if (agentSocketId) {
      // Get the agent ID from the agents table
      const agent = activeAgents.get(agentSocketId);
      if (agent && agent.dbId) {
        query += ` OR cr.assigned_agent_id = ?`;
        params.push(agent.dbId);
      }
    }
    
    query += `)
      ORDER BY 
        CASE WHEN cr.status = 'active' THEN 0 ELSE 1 END,
        COALESCE(last_activity_time, cr.updated_at, cr.created_at) DESC
    `;
    
    const [availableRooms] = await pool.query(query, params);
    
    return availableRooms.map(room => {
      const lastActivityTime = room.last_activity_time || room.updated_at || room.created_at;
      const isActive = (Date.now() - new Date(lastActivityTime).getTime()) < RECENT_CONVERSATION_LIMIT;
      
      // Mark rooms as active if they have recent activity or status is 'active'
      const active = room.status === 'active' || isActive;

      // Convert database agent ID to socket ID if assigned
      const dbAgentId = room.assigned_agent_id;
      let assignedAgentId = null;
      
      // Find the socket ID for this agent ID
      if (dbAgentId) {
        for (const [socketId, agent] of activeAgents.entries()) {
          if (agent.dbId === dbAgentId) {
            assignedAgentId = socketId;
            break;
          }
        }
      }
      
      return {
        id: room.id,
        userName: room.user_name,
        lastMessage: room.last_message,
        waitTime: getWaitTime(new Date(room.created_at)),
        active: active,
        lastActivityTimestamp: lastActivityTime,
        unread: false, // Default false for unassigned rooms
        assignedAgentId: assignedAgentId
      };
    });
  } catch (error) {
    console.error("Error getting available rooms:", error);
    return [];
  }
}

// Helper: Update available rooms for all agents
async function updateAvailableRoomsForAllAgents() {
  try {
    // Update each agent with their personalized list of available rooms
    for (const [agentSocketId, _] of activeAgents.entries()) {
      const availableRoomsList = await getAvailableRooms(agentSocketId);
      io.to(agentSocketId).emit("available_rooms", availableRoomsList);
    }
  } catch (error) {
    console.error("Error updating available rooms:", error);
  }
}

// Helper: Get wait time string
function getWaitTime(createdAt) {
  const now = new Date();
  const diffMs = now - new Date(createdAt);
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins === 1) return "1 min";
  return `${diffMins} mins`;
}

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = allowCors((req, res) => {
  server.emit("request", req, res);
});
