const express = require("express");
const router = express.Router();
const pool = require("../db");
const axios = require("axios");

// Middleware for authentication (Assumes JWT-based authentication)
const authenticateUser = require("../authMiddleware");

// Create a new conversation
router.post("/new", authenticateUser, async (req, res) => {
  const { userId } = req.user;
  try {
    const [result] = await pool.query(
      "INSERT INTO conversations (user_id, title, created_at) VALUES (?, ?, NOW())",
      [userId, "New Conversation"]
    );
    res.json({ message: "Conversation created", conversationId: result.insertId });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// Save messages to conversation
router.post("/save-message", authenticateUser, async (req, res) => {
  const { conversationId, role, content } = req.body;
  const { userId } = req.user;

  if (!conversationId || !role || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pool.query(
      "INSERT INTO messages (conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, NOW())",
      [conversationId, userId, role, content]
    );
    res.json({ message: "Message saved" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Fetch user chat history (list of conversations)
router.get("/history", authenticateUser, async (req, res) => {
  const { userId } = req.user;

  try {
    const [conversations] = await pool.query(
      "SELECT id, title, created_at FROM conversations WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json({ conversations });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// Fetch conversation messages
router.get("/:conversationId/messages", authenticateUser, async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.user;

  try {
    const [messages] = await pool.query(
      "SELECT role, content, created_at FROM messages WHERE conversation_id = ? AND user_id = ? ORDER BY created_at ASC",
      [conversationId, userId]
    );
    res.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Delete a conversation
router.delete("/:conversationId", authenticateUser, async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.user;

  try {
    await pool.query("DELETE FROM messages WHERE conversation_id = ?", [conversationId]);
    await pool.query("DELETE FROM conversations WHERE id = ? AND user_id = ?", [conversationId, userId]);
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

// Generate response from OpenAI and store it (for authenticated users)
router.post("/generate", authenticateUser, async (req, res) => {
  const { conversationId, messages } = req.body;

  try {
    // Retrieve the global API key from the database
    const [rows] = await pool.query("SELECT api_key FROM open_ai_key WHERE id = 1");
    if (rows.length === 0) {
      return res.status(500).json({ error: "Global API key is not configured." });
    }
    const apiKey = rows[0].api_key;

    const systemPrompt = `
      You are an AI assistant specialized in providing software solutions.
      Your role is to help developers build robust, efficient, and scalable software.
      When answering questions:
      1. Follow industry best practices.
      2. Provide detailed explanations and code examples.
      3. Include your reasoning in a <Thinking>...</Thinking> block before your answer.
    `;

    const chatMessages = [{ role: "system", content: systemPrompt }, ...messages];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4",
        messages: chatMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    // Save AI response to DB
    await pool.query(
      "INSERT INTO messages (conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, NOW())",
      [conversationId, userId, "assistant", aiMessage]
    );

    res.json({ message: "Response generated", aiResponse: aiMessage });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Generate response from OpenAI for guest users (non-authenticated)
router.post("/generate-public", async (req, res) => {
  const { messages, imageUrl } = req.body;
  if (!messages) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  // Retrieve the global API key from the database
  const [rows] = await pool.query("SELECT api_key FROM open_ai_key WHERE id = 1");
  if (rows.length === 0) {
    return res.status(500).json({ error: "Global API key is not configured." });
  }
  const apiKey = rows[0].api_key;


  try {
    const systemPrompt = `
      You are an AI assistant specialized in providing software solutions.
      Your role is to help developers build robust, efficient, and scalable software.
      When answering questions:
      1. Follow industry best practices.
      2. Provide detailed explanations and code examples.
      3. Include your reasoning in a <Thinking>...</Thinking> block before your answer.
    `;

    const chatMessages = [{ role: "system", content: systemPrompt }, ...messages];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages: chatMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ message: "Response generated", aiResponse: aiMessage });
  } catch (error) {
    console.error("Error generating AI response for guest:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});


// Generate response from chatbot ai assistant 
router.post("/generate-for-chat-assistant", async (req, res) => {
  const { messages, imageUrl } = req.body;
  if (!messages) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  // Retrieve the global API key from the database
  const [rows] = await pool.query("SELECT api_key FROM open_ai_key WHERE id = 1");
  if (rows.length === 0) {
    return res.status(500).json({ error: "Global API key is not configured." });
  }
  const apiKey = rows[0].api_key;

  try {
    const systemPrompt = `
      You are an AI assistant specialized in providing software solutions, with expertise aligned with the 
      digital transformation and innovation services offered by Go Digital Africa (https://godigitalafrica.com/).
      Go Digital Africa focuses on digital marketing, custom software development, web and mobile solutions, 
      and IT consulting to empower businesses across Africa. Your role is answering questions from customers 
      who are visiting go digital website for the first time and are looking for inquiries or anyone asking for software
      solutions.

      Important Instructions:
      1. If you are uncertain about an answer or if the question requires:
         - Detailed pricing information
         - Project-specific timelines
         - Custom solution scoping
         - Contract negotiations
         - Technical requirements gathering
         - Or any other complex business discussions
         Respond with: "[AGENT_HANDOFF]I apologize, but for this type of inquiry, it would be best to connect you with one of our human agents who can provide more detailed and accurate information. Let me transfer you to a support agent who can help you better.[/AGENT_HANDOFF]"

      2. For questions you can answer:
         - Limit responses to 100 words for short answers
         - Limit responses to 200 words for detailed answers
         - Use simple language and avoid jargon
         - Use a friendly tone
         - Use bullet points and numbered lists for key information
         - Follow industry best practices
         - Provide relevant links to godigitalafrica.com
         - Source information from godigitalafrica.com and web searches about the company
         - Don't include reasoning or thinking blocks

      3. Always prioritize accuracy. If you're not at least 90% confident in your answer, trigger the agent handoff.
    `;

    const chatMessages = [{ role: "system", content: systemPrompt }, ...messages];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4",
        messages: chatMessages,
        temperature: 0.7, // Add temperature to control randomness
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    let aiMessage = response.data.choices[0].message.content;
    
    // Check if the response contains the agent handoff trigger
    const needsAgentHandoff = aiMessage.includes("[AGENT_HANDOFF]");
    if (needsAgentHandoff) {
      // Extract the handoff message
      const handoffMessage = aiMessage.match(/\[AGENT_HANDOFF\](.*?)\[\/AGENT_HANDOFF\]/s)[1];
      
      // Return special response indicating need for agent handoff
      return res.json({ 
        message: "Response generated", 
        aiResponse: handoffMessage,
        needsAgentHandoff: true 
      });
    }

    res.json({ message: "Response generated", aiResponse: aiMessage });
  } catch (error) {
    console.error("Error generating AI response for chat assistant:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Create a new chat room for user
router.post("/create-room", async (req, res) => {
  const { userName, roomId } = req.body;
  
  if (!roomId) {
    return res.status(400).json({ success: false, message: "Room ID is required" });
  }
  
  try {
    // Check if room already exists
    const [existingRoom] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ?",
      [roomId]
    );
    
    if (existingRoom.length > 0) {
      return res.json({ 
        success: true, 
        message: "Room already exists",
        roomId
      });
    }
    
    // Create new room
    await pool.query(
      "INSERT INTO chat_rooms (id, user_name, status) VALUES (?, ?, 'waiting')",
      [roomId, userName || "User"]
    );
    
    // Add welcome message
    await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, 'system', 'System', 'Welcome to the chat. How can we help you today?', 'system')`,
      [roomId]
    );
    
    res.json({ 
      success: true, 
      message: "Chat room created successfully",
      roomId
    });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ success: false, message: "Failed to create chat room" });
  }
});

// Get chat history for user
router.get("/history/:roomId", async (req, res) => {
  const { roomId } = req.params;
  
  try {
    // Check if room exists
    const [room] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ?",
      [roomId]
    );
    
    if (room.length === 0) {
      return res.status(404).json({ success: false, message: "Chat room not found" });
    }
    
    // Get messages
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

// Send message from user
router.post("/send-message", async (req, res) => {
  const { roomId, content, userName, role = 'user' } = req.body;
  
  if (!roomId || !content) {
    return res.status(400).json({ success: false, message: "Room ID and content are required" });
  }
  
  try {
    // Check if room exists
    const [room] = await pool.query(
      "SELECT * FROM chat_rooms WHERE id = ?",
      [roomId]
    );
    
    if (room.length === 0) {
      return res.status(404).json({ success: false, message: "Chat room not found" });
    }
    
    // Insert message
    const [result] = await pool.query(
      `INSERT INTO chat_messages 
       (room_id, sender_id, sender_name, content, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [roomId, 'user', userName || 'User', content, role]
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

// Check if any agents are available
router.get("/agents-available", async (req, res) => {
  try {
    const [agents] = await pool.query(
      "SELECT COUNT(*) as count FROM agents WHERE status = 'online'"
    );
    
    const available = agents[0].count > 0;
    
    res.json({ 
      success: true, 
      available,
      agentCount: agents[0].count
    });
  } catch (error) {
    console.error("Error checking agent availability:", error);
    res.status(500).json({ success: false, message: "Failed to check agent availability" });
  }
});

module.exports = router;
