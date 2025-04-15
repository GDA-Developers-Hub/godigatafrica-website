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

// Helper function to notify all active agents
const notifyAllAgents = (eventName, data) => {
  for (const [agentSocketId, _] of activeAgents.entries()) {
    io.to(agentSocketId).emit(eventName, data);
  }
};

// Load existing rooms from database
async function loadExistingRooms() {
  try {
    const [rooms] = await pool.query(`
      SELECT cr.*, a.agent_name, 
        (SELECT content FROM chat_messages 
         WHERE room_id = cr.id 
         ORDER BY created_at DESC LIMIT 1) as last_message
      FROM chat_rooms cr
      LEFT JOIN agents a ON cr.assigned_agent_id = a.id
      WHERE cr.status != 'closed'
    `);
    
    rooms.forEach(room => {
      chatRooms.set(room.id, {
        id: room.id,
        userSocketId: null, // Will be updated when user connects
        userName: room.user_name,
        createdAt: room.created_at,
        assignedAgentId: room.assigned_agent_id,
        status: room.status,
        lastMessage: room.last_message,
        messages: [] // Will load messages when needed
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
      
      if (agent.length > 0) {
        // Update agent status to online
        await pool.query(
          "UPDATE agents SET status = 'online' WHERE id = ?",
          [agent[0].id]
        );
        agentId = agent[0].id;
      }
      
      // Store in memory
      activeAgents.set(socket.id, { 
        id: socket.id, 
        dbId: agentId,
        name: agentName || "Support Agent",
        rooms: [] // Rooms this agent is currently in
      });
      
      console.log(`Agent registered: ${agentName} (${socket.id})`);
      
      // Get available rooms (not assigned to any agent)
      const availableRoomsList = Array.from(chatRooms.values())
        .filter(room => !room.assignedAgentId) // Only rooms without assigned agents
        .map(room => ({
          id: room.id,
          userName: room.userName,
          lastMessage: room.lastMessage,
          waitTime: getWaitTime(room.createdAt)
        }));
      
      socket.emit("available_rooms", availableRoomsList);
    } catch (error) {
      console.error("Error registering agent:", error);
    }
  });

  // Request agent
  socket.on("request_agent", async (data) => {
    const { roomId, userId, userName, chatHistory } = data;
    
    // Store the room info in memory
    const room = chatRooms.get(roomId) || {
      id: roomId,
      userSocketId: socket.id,
      userName: userName || "User",
      createdAt: new Date(),
      messages: chatHistory || [],
      assignedAgentId: null,
      lastMessage: chatHistory && chatHistory.length > 0 ? 
        chatHistory[chatHistory.length - 1].content : "Requested agent support"
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
        // Create new room
        await pool.query(
          "INSERT INTO chat_rooms (id, user_socket_id, user_name, status) VALUES (?, ?, ?, 'waiting')",
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
        // Update existing room
        await pool.query(
          "UPDATE chat_rooms SET user_socket_id = ?, status = 'waiting' WHERE id = ?",
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
      
      if (agentsAvailable) {
        // Notify all active agents about the new room
        const availableRoom = {
          id: roomId,
          userName: userName || "User",
          lastMessage: room.lastMessage,
          waitTime: getWaitTime(room.createdAt)
        };
        
        for (const [agentSocketId, agentInfo] of activeAgents.entries()) {
          io.to(agentSocketId).emit("available_rooms", [availableRoom]);
        }
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
    room.assignedAgentId = socket.id;
    
    // Add room to agent's list of rooms
    agent.rooms.push(roomId);
    
    // Join socket room
    socket.join(roomId);
    
    console.log(`Agent ${agent.name} joined room: ${roomId}`);
    
    try {
      // Update room in database
      await pool.query(
        "UPDATE chat_rooms SET assigned_agent_id = ?, status = 'active' WHERE id = ?",
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
      
      // Update available rooms for all agents
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("Error when agent joining room:", error);
    }
  });

  // Agent leaves a room
  socket.on("leave_room", async (data) => {
    const { roomId, agentId } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) {
      return;
    }
    
    const agent = activeAgents.get(socket.id);
    if (!agent) {
      return;
    }
    
    // Mark agent as no longer assigned to this room
    room.assignedAgentId = null;
    
    // Remove room from agent's list of rooms
    agent.rooms = agent.rooms.filter(r => r !== roomId);
    
    // Leave socket room
    socket.leave(roomId);
    
    console.log(`Agent ${agent.name} left room: ${roomId}`);
    
    try {
      // Update room in database
      await pool.query(
        "UPDATE chat_rooms SET assigned_agent_id = NULL WHERE id = ?",
        [roomId]
      );
      
      // Add system message about agent leaving
      await pool.query(
        `INSERT INTO chat_messages 
         (room_id, sender_id, sender_name, content, role) 
         VALUES (?, ?, 'System', ?, 'system')`,
        [roomId, `agent-${agent.dbId}`, `${agent.name} has left the chat.`]
      );
      
      // Update agent status back to online
      if (agent.dbId) {
        await pool.query(
          "UPDATE agents SET status = 'online' WHERE id = ?",
          [agent.dbId]
        );
      }
      
      // Notify the user that the agent has left
      if (room.userSocketId && io.sockets.sockets.get(room.userSocketId)) {
        io.to(room.userSocketId).emit("agent_left");
      }
      
      // Update available rooms for all agents
      updateAvailableRoomsForAllAgents();
    } catch (error) {
      console.error("Error when agent leaving room:", error);
    }
  });

  // Send message
  socket.on("send_message", async (message) => {
    const { roomId, role, content, senderId, senderName } = message;
    
    if (!roomId || !content) {
      return;
    }
    
    const room = chatRooms.get(roomId);
    if (!room) {
      return;
    }
    
    try {
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
      room.lastMessage = content;
      
      // Update last message in database
      await pool.query(
        "UPDATE chat_rooms SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [roomId]
      );
      
      // Broadcast message to everyone in the room
      io.to(roomId).emit("new_message", message);
      
      console.log(`Message sent in room ${roomId} by ${role}: ${content.substring(0, 30)}...`);

      // If it's a user message and sent to an agent chat room, notify all agents
      if (message.role === 'user' && room && room.assignedAgentId) {
        // Notify the assigned agent and all other agents
        notifyAllAgents('agent_notification', {
          type: 'new_message',
          message: `New message from ${message.senderName || "User"} in room ${roomId.slice(0, 8)}...`,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
              "UPDATE chat_rooms SET assigned_agent_id = NULL WHERE id = ?",
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
            "UPDATE agents SET status = 'offline' WHERE id = ?",
            [agent.dbId]
          );
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
      return;
    }
    
    const agent = activeAgents.get(socket.id);
    
    try {
      // Update agent status in database
      if (agent.dbId) {
        await pool.query(
          "UPDATE agents SET status = ? WHERE id = ?",
          [status, agent.dbId]
        );
        
        console.log(`Agent ${agent.name} status updated to: ${status}`);
        
        // If the agent is marked as 'busy', we shouldn't show their assigned rooms to other agents
        if (status === 'busy') {
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
});

// Helper: Update available rooms for all agents
async function updateAvailableRoomsForAllAgents() {
  try {
    // Get waiting rooms from database
    const [waitingRooms] = await pool.query(`
      SELECT 
        cr.id, cr.user_name, cr.status, cr.created_at,
        (SELECT content FROM chat_messages 
         WHERE room_id = cr.id 
         ORDER BY created_at DESC LIMIT 1) as last_message
      FROM chat_rooms cr
      WHERE cr.status = 'waiting' AND cr.assigned_agent_id IS NULL
    `);
    
    const availableRoomsList = waitingRooms.map(room => {
      return {
        id: room.id,
        userName: room.user_name,
        lastMessage: room.last_message,
        waitTime: getWaitTime(new Date(room.created_at))
      };
    });
    
    // Send updated list to all agents
    for (const [agentSocketId, _] of activeAgents.entries()) {
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
