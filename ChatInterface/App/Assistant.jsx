"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X, Brain, UserPlus, Info } from "lucide-react";
import { API_BASE_URL, SOCKET_BASE_URL } from "../../Utils/ChatBaseUrl";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

function ChatMessage({ message }) {
  const [showReasoning, setShowReasoning] = useState(false);
  const [typedContent, setTypedContent] = useState("");
  const hasReasoning = message.content && message.content.includes("<Thinking>");
  let reasoning = "";
  let content = message.content || "";

  if (hasReasoning) {
    const thinkingMatch = message.content.match(/<Thinking>([\s\S]*?)<\/Thinking>/);
    if (thinkingMatch && thinkingMatch[1]) {
      reasoning = thinkingMatch[1].trim();
      content = message.content.replace(/<Thinking>[\s\S]*?<\/Thinking>/, "").trim();
    }
  }

  const isUser = message.role === "user";
  const isAgent = message.role === "agent";
  const isSystem = message.role === "system";
  const isAssistant = message.role === "assistant";
  const isTyping = message.typing;

  useEffect(() => {
    if (!isUser && isTyping && !isAgent) {
      setTypedContent("");
      let index = 0;
      const interval = setInterval(() => {
        if (index < content.length) {
          setTypedContent((prev) => prev + content[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setTypedContent(content);
    }
  }, [content, isUser, isTyping, isAgent]);

  const bubbleClass = isUser
    ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl rounded-tr-none shadow-md"
    : isAgent
    ? "bg-gradient-to-r from-green-700 to-green-800 text-white rounded-2xl rounded-tl-none shadow-md"
    : isSystem
    ? "bg-gray-700 text-gray-100 rounded-2xl shadow-md border border-gray-600"
    : "bg-gray-800 text-gray-100 rounded-2xl rounded-tl-none shadow-md border border-gray-700";

  const label = isUser 
    ? "You" 
    : isAgent 
    ? "Agent" 
    : isSystem 
    ? "System" 
    : "Assistant";
    
  const labelPositionClass = isUser ? "absolute top-2 right-3" : "absolute top-2 left-3";
  const labelColorClass = isUser 
    ? "text-blue-300" 
    : isAgent 
    ? "text-green-300" 
    : isSystem 
    ? "text-gray-400" 
    : "text-blue-300";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`relative p-5 max-w-[80%] min-w-[200px] ${bubbleClass}`}>
        {/* Label on bubble */}
        <div className={`text-xs font-semibold ${labelColorClass} ${labelPositionClass}`}>
          {label}
        </div>
        <div className="prose max-w-none mt-3">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg !mt-2 !mb-2"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-gray-700 px-1 py-0.5 rounded`} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {isUser ? content : isTyping && !isAgent ? typedContent || "..." : content}
          </ReactMarkdown>
        </div>

        {/* Reasoning block for AI messages */}
        {hasReasoning && isAssistant && showReasoning && (
          <div className="mt-3 p-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600">
            <div className="text-xs font-medium text-gray-400 mb-2">Reasoning Process</div>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg !mt-2 !mb-2"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className} bg-gray-600 px-1 py-0.5 rounded`} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {reasoning}
            </ReactMarkdown>
          </div>
        )}

        {hasReasoning && isAssistant && (
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            {showReasoning ? "Hide Reasoning" : "Show Reasoning"}
          </button>
        )}
      </div>
    </div>
  );
}

const Assistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { content: "Hello! I'm Nexus, your AI assistant. How can I help you today?", role: "assistant" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const [userName, setUserName] = useState("User" + Math.floor(Math.random() * 1000));
  const chatEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    console.log("Initializing socket connection for Assistant");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("SOCKET_BASE_URL:", SOCKET_BASE_URL);
    
    // Use the SOCKET_BASE_URL instead of API_BASE_URL
    const newSocket = io(SOCKET_BASE_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    setSocket(newSocket);
    
    // Generate a unique room ID if not already set
    if (!roomId) {
      setRoomId(uuidv4());
    }

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server with ID:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("agent_joined", (data) => {
      setIsConnectedToAgent(true);
      setIsWaitingForAgent(false);
      
      // Add system message that agent has joined
      setMessages((prev) => [
        ...prev, 
        { 
          content: `${data.agentName || 'Support Agent'} has joined the chat.`, 
          role: "system", 
          timestamp: new Date().toISOString() 
        }
      ]);
    });

    newSocket.on("agent_left", (data) => {
      setIsConnectedToAgent(false);
      
      // Add system message that agent has left
      setMessages((prev) => [
        ...prev, 
        { 
          content: "Support agent has left the chat. You are now chatting with the AI assistant again.", 
          role: "system", 
          timestamp: new Date().toISOString() 
        }
      ]);

      // If there was a last message from user, process it with AI
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        // Process the last user message with AI
        processWithAI(lastMessage.content);
      } else {
        // Add a welcome back message from AI
        setMessages((prev) => [
          ...prev,
          {
            content: "I'm here to continue helping you. What would you like to know?",
            role: "assistant",
            timestamp: new Date().toISOString()
          }
        ]);
      }
    });

    newSocket.on("new_message", (message) => {
      console.log("Socket received message:", message);
      console.log("Current room ID:", roomId);
      console.log("Message room ID:", message.roomId);
      console.log("Socket ID:", newSocket.id);
      console.log("Message sender ID:", message.senderId);
      
      if (message.roomId === roomId) {
        // Check if this message already exists in our messages array
        const isDuplicate = messages.some(
          msg => 
            msg.content === message.content && 
            msg.role === message.role &&
            msg.timestamp === message.timestamp
        );
        
        // Only add messages that aren't from the current user or aren't duplicates
        if (message.senderId !== newSocket.id && !isDuplicate) {
          console.log("Adding message from socket to UI:", message);
          setMessages((prev) => [...prev, message]);
        } else {
          console.log("Skipping duplicate or self message");
        }
      }
    });

    newSocket.on("no_agents_available", () => {
      setIsWaitingForAgent(false);
      
      // Add system message that no agents are available
      setMessages((prev) => [
        ...prev, 
        { 
          content: "We're sorry, but there are no support agents available at the moment. Please try again later or continue chatting with our AI assistant.", 
          role: "system", 
          timestamp: new Date().toISOString() 
        }
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Check if message is a request to speak with a human agent
  const isRequestForAgent = (messageText) => {
    const lowerText = messageText.toLowerCase();
    return (
      lowerText.includes("speak to agent") ||
      lowerText.includes("talk to agent") ||
      lowerText.includes("connect to agent") ||
      lowerText.includes("speak to human") ||
      lowerText.includes("talk to human") ||
      lowerText.includes("connect to human") ||
      lowerText.includes("connect me to an agent") ||
      lowerText.includes("connect me to a human")
    );
  };

  // Request to connect to a human agent
  const requestAgent = () => {
    console.log("Requesting agent connection");
    setIsWaitingForAgent(true);
    
    // Add system message that we're connecting to an agent
    const systemMessage = { 
      content: "Connecting you to a support agent. Please wait a moment...", 
      role: "system", 
      timestamp: new Date().toISOString(),
      roomId,
      senderId: "system"
    };
    
    setMessages((prev) => [...prev, systemMessage]);
    
    // Emit event to request an agent
    if (socket) {
      console.log("Emitting request_agent event:", { roomId, userName });
      socket.emit("request_agent", { 
        roomId, 
        userId: socket.id,
        userName,
        chatHistory: messages
      });
    }
  };

  // Send message: handles both AI and agent communication
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      content: input, 
      role: "user",
      roomId,
      senderId: socket?.id,
      timestamp: new Date().toISOString()
    };
    
    // Store the current input before clearing it
    const currentInput = input;
    setInput("");
    
    // Add user message to state only once
    setMessages((prev) => [...prev, userMessage]);
    console.log("Adding user message to UI:", userMessage);

    // Check if user is requesting an agent
    if (!isConnectedToAgent && !isWaitingForAgent && isRequestForAgent(currentInput)) {
      requestAgent();
      return;
    }
    
    // If connected to an agent, send message through socket
    if (isConnectedToAgent) {
      console.log("Connected to agent, sending message via socket:", userMessage);
      socket.emit("send_message", userMessage);
      // Don't add the message to state here since we'll receive it back via socket
      return;
    }
    
    // If waiting for an agent, add a system message
    if (isWaitingForAgent) {
      setMessages((prev) => [
        ...prev, 
        { 
          content: "We're still connecting you to an agent. Your message has been saved and will be shared when an agent connects.", 
          role: "system", 
          timestamp: new Date().toISOString() 
        }
      ]);
      return;
    }

    // Otherwise, process with AI
    setIsTyping(true);

    // Add a placeholder assistant message with typing true
    setMessages((prev) => [...prev, { content: "", role: "assistant", typing: true }]);

    // Build conversation history using only user messages (with a system message)
    const conversationHistory = [
      { role: "system", content: "ignore this but use it to keep track of conversation" },
      ...messages
        .filter((msg) => msg.role === "user")
        .map((msg) => ({
          role: "user",
          content: msg.content,
        })),
      { role: "user", content: currentInput },
    ];

    // Record start time to simulate minimum typing delay
    const startTime = Date.now();
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/generate-for-chat-assistant`, {
        messages: conversationHistory,
      });
      
      const aiResponse = response.data.aiResponse;
      const needsAgentHandoff = response.data.needsAgentHandoff;
      
      const elapsed = Date.now() - startTime;
      const minDelay = 1000; // minimum delay of 1 second
      if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
      }

      // Update the last assistant message with the AI response and set typing to false
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
            return { 
              ...msg, 
              content: aiResponse, 
              typing: false,
              roomId,
              timestamp: new Date().toISOString() 
            };
          }
          return msg;
        }),
      );

      // If AI indicates it needs agent handoff, automatically request an agent
      if (needsAgentHandoff) {
        // Add a small delay to allow the AI's message to be displayed first
        setTimeout(() => {
          requestAgent();
        }, 1000);
      }

    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
            return { 
              ...msg, 
              content: "Error generating response. Please try again later.", 
              typing: false,
              roomId,
              timestamp: new Date().toISOString() 
            };
          }
          return msg;
        }),
      );
    }
    setIsTyping(false);
  };

  const processWithAI = async (messageContent) => {
    setIsTyping(true);
    setMessages((prev) => [...prev, { content: "", role: "assistant", typing: true }]);

    const conversationHistory = [
      { role: "system", content: "ignore this but use it to keep track of conversation" },
      ...messages
        .filter((msg) => msg.role === "user")
        .map((msg) => ({
          role: "user",
          content: msg.content,
        })),
      { role: "user", content: messageContent },
    ];

    const startTime = Date.now();
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/generate-for-chat-assistant`, {
        messages: conversationHistory,
      });
      const aiResponse = response.data.aiResponse;
      const elapsed = Date.now() - startTime;
      const minDelay = 1000;
      if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
      }

      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
            return { 
              ...msg, 
              content: aiResponse, 
              typing: false,
              roomId,
              timestamp: new Date().toISOString() 
            };
          }
          return msg;
        }),
      );
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
            return { 
              ...msg, 
              content: "Error generating response. Please try again later.", 
              typing: false,
              roomId,
              timestamp: new Date().toISOString() 
            };
          }
          return msg;
        }),
      );
    }
    setIsTyping(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-2xl flex flex-col h-[600px] lg:w-[400px] sm:w-[350px] relative border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img
              src={logo || "/placeholder.svg"}
              alt="AI Assistant"
              className="w-9 h-9 rounded-full border-2 border-blue-400"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-gray-800"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {isConnectedToAgent ? "Agent Support" : isWaitingForAgent ? "Connecting..." : "Nexus"}
            </h2>
            <p className="text-xs text-gray-400">
              {isConnectedToAgent ? "Human Agent" : isWaitingForAgent ? "Please wait" : "AI Assistant"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isConnectedToAgent && !isWaitingForAgent && (
            <Link to="/chat">
              <div className="p-0.5 rounded-lg bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 hover:from-pink-800 hover:via-purple-800 hover:to-blue-800 transition-all duration-300">
                <button className="relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                  <Brain className="w-3.5 h-3.5 mr-1" />
                  Alpha Model
                </button>
              </div>
            </Link>
          )}
          
          {!isConnectedToAgent && !isWaitingForAgent && (
            <button
              onClick={requestAgent} 
              className="p-0.5 rounded-lg bg-gradient-to-r from-green-700 to-teal-700 hover:from-green-800 hover:to-teal-800 transition-all duration-300"
            >
              <div className="relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                Agent
              </div>
            </button>
          )}
          
          {/* Close Chat Button */}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors rounded-full hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-col gap-3 flex-grow p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-950">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isTyping && (
          <div className="flex space-x-1 p-2 ml-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden pr-1">
          <textarea
            rows="1"
            className="flex-grow bg-transparent border-none px-4 py-3 focus:outline-none text-gray-200 placeholder-gray-400 resize-none"
            placeholder={isWaitingForAgent ? "Waiting for agent..." : "Type your message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isWaitingForAgent}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isWaitingForAgent}
            className={`${
              input.trim() && !isWaitingForAgent
                ? "bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800"
                : "bg-gray-600 cursor-not-allowed"
            } text-white p-2.5 rounded-full transition-all duration-200 flex items-center justify-center`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-xs text-center text-gray-400 mt-2">
          {isConnectedToAgent 
            ? "You are chatting with a support agent" 
            : isWaitingForAgent 
            ? "Connecting to an agent..." 
            : "Press Enter to send, Shift+Enter for a new line"}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
