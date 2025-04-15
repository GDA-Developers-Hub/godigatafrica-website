"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X, Brain, UserPlus, Info } from "lucide-react";
import { API_BASE_URL, SOCKET_BASE_URL, FALLBACK_MODE, RECONNECTION_CONFIG } from "../../Utils/ChatBaseUrl";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import mockData from "../data/ai-mock-responses.json";

function ChatMessage({ message }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);

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
    if (isUser) {
      setDisplayedContent(content);
      setIndex(0);
      return;
    }

    if (!isUser && index === 0) {
      setDisplayedContent(""); 
    }

    if (!isUser && index < content.length) {
      const typingInterval = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(typingInterval);
    }
  }, [isUser, index, content]);

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
            {isUser ? content : isTyping ? displayedContent || "..." : content}
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

// Helper function to check if a message contains any of the given keywords
const containsAny = (message, keywords) => {
  return keywords.some((keyword) => message.includes(keyword));
};

// Helper function to check if a message is about specific topics
const messageContainsTopics = (message, topics) => {
  // Check for direct mentions
  if (containsAny(message, topics)) {
    return true;
  }

  // Check for question forms about topics
  const questionPatterns = topics.flatMap((topic) => {
    return [
      `what is your ${topic}`,
      `tell me about your ${topic}`,
      `can you explain your ${topic}`,
      `information about ${topic}`,
      `details on ${topic}`,
      `${topic}?`,
    ];
  });

  return containsAny(message, questionPatterns);
};

// Helper function to get a random response from an array of possible responses
const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Utility function for generating mock responses in fallback mode
const getMockAIResponse = (userMessage) => {
  // Convert message to lowercase for easier matching
  const lowerMsg = userMessage.toLowerCase();

  // Handle greetings
  if (containsAny(lowerMsg, ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening","helloo","hiii","heyy"])) {
    return getRandomResponse(mockData.general.greeting);
  }

  // Handle thanks
  if (containsAny(lowerMsg, ["thank", "thanks", "appreciate", "grateful","thank you","bye"])) {
    return getRandomResponse(mockData.general.thanks);
  }

  // Handle offline mode questions
  if (containsAny(lowerMsg, ["offline", "mode", "connection", "online", "available"])) {
    return getRandomResponse(mockData.general.offline);
  }

  // Company information
  if (messageContainsTopics(lowerMsg, ["about", "company", "who are you", "tell me about", "what is", "go digital","africa"])) {
    return getRandomResponse(mockData.company.about);
  }

  if (messageContainsTopics(lowerMsg, ["mission", "purpose", "why exist"])) {
    return getRandomResponse(mockData.company.mission);
  }

  if (messageContainsTopics(lowerMsg, ["vision", "future", "goal"])) {
    return getRandomResponse(mockData.company.vision);
  }

  if (messageContainsTopics(lowerMsg, ["values", "principles", "ethics", "believe"])) {
    return getRandomResponse(mockData.company.values);
  }

  if (messageContainsTopics(lowerMsg, ["history", "founded", "started", "beginning", "origin"])) {
    return getRandomResponse(mockData.company.history);
  }

  // Leadership information
  if (messageContainsTopics(lowerMsg, ["ceo", "founder", "leader", "director", "chief"])) {
    return getRandomResponse(mockData.leadership.ceo);
  }

  if (messageContainsTopics(lowerMsg, ["team", "management", "leadership", "executives", "staff"])) {
    return getRandomResponse(mockData.leadership.team);
  }

  // Services
  if (messageContainsTopics(lowerMsg, ["services", "offerings", "solutions","ads", "provide", "offer","development","marketing","digital marketing","online marketing","promotion"])) {
    // Determine which specific service they're asking about
    if (containsAny(lowerMsg, ["web", "website", "development", "app"])) {
      return getRandomResponse(mockData.services.web_development);
    }

    if (containsAny(lowerMsg, ["mobile", "app", "android", "ios", "smartphone"])) {
      return getRandomResponse(mockData.services.mobile_development);
    }

    if (containsAny(lowerMsg, ["marketing", "digital marketing", "online marketing", "promotion"])) {
      return getRandomResponse(mockData.services.digital_marketing);
    }

    if (containsAny(lowerMsg, ["seo", "search engine", "ranking", "google"])) {
      return getRandomResponse(mockData.services.seo);
    }

    if (containsAny(lowerMsg, ["social", "facebook", "instagram", "twitter", "linkedin", "social media"])) {
      return getRandomResponse(mockData.services.social_media);
    }

    if (containsAny(lowerMsg, ["content", "blog", "article", "writing", "copy"])) {
      return getRandomResponse(mockData.services.content_marketing);
    }

    if (containsAny(lowerMsg, ["ecommerce", "e-commerce", "online store", "shop", "selling"])) {
      return getRandomResponse(mockData.services.ecommerce);
    }

    if (containsAny(lowerMsg, ["consulting", "advice", "strategy", "it consulting"])) {
      return getRandomResponse(mockData.services.it_consulting);
    }

    // If no specific service is mentioned, give a general overview
    return "Go Digital Africa offers a comprehensive range of digital services including web and mobile development, digital marketing (SEO, social media, content), e-commerce solutions, and IT consulting. Which specific service would you like to know more about?";
  }

  // Locations
  if (messageContainsTopics(lowerMsg, ["location", "office", "headquarters", "address", "where", "based"])) {
    if (containsAny(lowerMsg, ["headquarters", "main office", "head office", "hq"])) {
      return getRandomResponse(mockData.locations.headquarters);
    }

    if (containsAny(lowerMsg, ["branches", "other offices", "locations"])) {
      return getRandomResponse(mockData.locations.branches);
    }

    if (containsAny(lowerMsg, ["remote", "work from home", "distributed"])) {
      return getRandomResponse(mockData.locations.remote);
    }

    // If just asking about location generally
    return `${getRandomResponse(mockData.locations.headquarters)} ${getRandomResponse(mockData.locations.branches)}`;
  }

  // Contact information
  if (messageContainsTopics(lowerMsg, ["contact", "reach", "email", "phone", "call", "message"])) {
    if (containsAny(lowerMsg, ["email", "mail", "e-mail"])) {
      return getRandomResponse(mockData.contact.email);
    }

    if (containsAny(lowerMsg, ["phone", "call", "telephone", "number"])) {
      return getRandomResponse(mockData.contact.phone);
    }

    if (containsAny(lowerMsg, ["form", "website", "submit"])) {
      return getRandomResponse(mockData.contact.form);
    }

    if (containsAny(lowerMsg, ["social", "facebook", "twitter", "linkedin", "instagram"])) {
      return getRandomResponse(mockData.contact.social);
    }

    // If just asking about contact generally
    return `You can reach Go Digital Africa through multiple channels: ${getRandomResponse(mockData.contact.email)} Alternatively, ${getRandomResponse(mockData.contact.phone)} You can also ${getRandomResponse(mockData.contact.form).toLowerCase()}`;
  }

  // Pricing information
  if (messageContainsTopics(lowerMsg, ["price", "pricing", "cost", "rates", "fee", "package", "how much"])) {
    if (containsAny(lowerMsg, ["web", "website", "development"])) {
      return getRandomResponse(mockData.pricing.web_development);
    }

    if (containsAny(lowerMsg, ["mobile", "app", "application"])) {
      return getRandomResponse(mockData.pricing.mobile_apps);
    }

    if (containsAny(lowerMsg, ["marketing", "digital marketing"])) {
      return getRandomResponse(mockData.pricing.digital_marketing);
    }

    if (containsAny(lowerMsg, ["seo", "search engine"])) {
      return getRandomResponse(mockData.pricing.seo);
    }

    if (containsAny(lowerMsg, ["social", "social media"])) {
      return getRandomResponse(mockData.pricing.social_media);
    }

    // If just asking about pricing generally
    return `Our pricing varies based on your specific requirements and project scope. ${getRandomResponse(mockData.pricing.custom)} For reference, ${getRandomResponse(mockData.pricing.web_development).toLowerCase()} Similarly, ${getRandomResponse(mockData.pricing.digital_marketing).toLowerCase()}`;
  }

  // Process information
  if (messageContainsTopics(lowerMsg, ["process", "approach", "methodology", "how do you", "steps", "workflow"])) {
    if (containsAny(lowerMsg, ["web", "website", "development"])) {
      return getRandomResponse(mockData.process.web_development);
    }

    if (containsAny(lowerMsg, ["mobile", "app", "application"])) {
      return getRandomResponse(mockData.process.mobile_development);
    }

    if (containsAny(lowerMsg, ["marketing", "digital marketing"])) {
      return getRandomResponse(mockData.process.digital_marketing);
    }

    // If just asking about process generally
    return `At Go Digital Africa, we follow structured yet flexible processes tailored to each service area. ${getRandomResponse(mockData.process.web_development)} For digital marketing, ${getRandomResponse(mockData.process.digital_marketing).toLowerCase()}`;
  }

  // Technologies
  if (messageContainsTopics(lowerMsg, ["technology","marketing", "technologies", "tech stack", "tools", "platforms", "software","software development", "software development tools","website", "website development", "web development", "web development tools", "mobile", "mobile development", "mobile development tools", "app", "application", "application development", "application development tools","digital marketing", "digital marketing tools"])) {
    if (containsAny(lowerMsg, ["web", "website", "development","tools"])) {
      return getRandomResponse(mockData.technologies.web);
    }

    if (containsAny(lowerMsg, ["mobile", "app", "application"])) {
      return getRandomResponse(mockData.technologies.mobile);
    }

    if (containsAny(lowerMsg, ["marketing", "digital marketing"])) {
      return getRandomResponse(mockData.technologies.marketing);
    }

    // If just asking about technologies generally
    return `Go Digital Africa leverages modern technologies across all our service areas. ${getRandomResponse(mockData.technologies.web)} For mobile development, ${getRandomResponse(mockData.technologies.mobile).toLowerCase()} Our marketing team uses ${getRandomResponse(mockData.technologies.marketing).toLowerCase()}`;
  }

  // Portfolio and case studies
  if (messageContainsTopics(lowerMsg, ["portfolio", "work", "projects", "clients", "case studies", "examples"])) {
    if (containsAny(lowerMsg, ["web", "website", "development"])) {
      return getRandomResponse(mockData.portfolio.web);
    }

    if (containsAny(lowerMsg, ["mobile", "app", "application"])) {
      return getRandomResponse(mockData.portfolio.mobile);
    }

    if (containsAny(lowerMsg, ["marketing", "digital marketing"])) {
      return getRandomResponse(mockData.portfolio.marketing);
    }

    if (containsAny(lowerMsg, ["case studies", "case", "studies", "examples"])) {
      return getRandomResponse(mockData.portfolio.case_studies);
    }

    // If just asking about portfolio generally
    return `Go Digital Africa has a diverse portfolio of successful projects across various industries. ${getRandomResponse(mockData.portfolio.web)} In mobile development, ${getRandomResponse(mockData.portfolio.mobile).toLowerCase()} Our marketing portfolio includes ${getRandomResponse(mockData.portfolio.marketing).toLowerCase()}`;
  }

  // If no specific match is found, return a general response
  return getRandomResponse(mockData.general.fallback);
};

const Assistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { content: "Hello! I'm GDAi, your AI assistant. How can I help you today?", role: "assistant" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const [userName, setUserName] = useState("User" + Math.floor(Math.random() * 1000));
  const [inFallbackMode, setInFallbackMode] = useState(FALLBACK_MODE);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const chatEndRef = useRef(null);
  const isInitializing = useRef(false);
  const connectionAttemptsRef = useRef(0);
  const silentMode = useRef(RECONNECTION_CONFIG.showUIIndicators === false);

  // Function to toggle between online and offline modes
  const toggleFallbackMode = () => {
    const newMode = !inFallbackMode;
    setInFallbackMode(newMode);
    
    // Add a system message about the mode change
    setMessages(prev => [
      ...prev,
      {
        content: newMode 
          ? "Switching to offline mode. Some features will be limited." 
          : "Switching to online mode.You can now chat with the AI assistant...",
        role: "system",
        timestamp: new Date().toISOString()
      }
    ]);
    
    // If switching to online mode, reinitialize the connection
    if (!newMode) {
      // Reset any existing socket
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      
      // Force a new connection attempt - need to call the connectSocket function directly
      // but it's inside the useEffect and not accessible here, so we'll use a trick:
      isInitializing.current = false; // Make sure initialization flag is reset
      connectionAttemptsRef.current = 0; // Reset connection attempts
      
      // Generate a new room ID
      const newRoomId = uuidv4();
      setRoomId(newRoomId);
      setReconnectAttempt(0);
      setIsReconnecting(true);
      
      // Force a reconnection by manually calling functions defined in the useEffect
      // We need to create a helper function to do this
      setTimeout(() => {
        initializeSocketConnection();
      }, 100);
    }
  };
  
  // Helper function to initialize socket connection that can be called from anywhere
  const initializeSocketConnection = (silent = false) => {
    if (isInitializing.current || inFallbackMode) {
      return;
    }
    
    isInitializing.current = true;
    console.log("Manually initializing socket connection, silent mode:", silent);
    
    // Generate a room ID if needed
    const currentRoomId = roomId || uuidv4();
    if (!roomId) {
      setRoomId(currentRoomId);
    }
    
    // Create new socket connection
    const newSocket = io(SOCKET_BASE_URL, {
      transports: ['websocket', 'polling'],
      reconnection: false,
      timeout: 10000,
      forceNew: true,
      autoConnect: true
    });
    
    setSocket(newSocket);
    
    // Only update UI if not in silent mode
    if (!silent) {
      setIsReconnecting(true);
    }
    
    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server with ID:", newSocket.id);
      console.log("Using room ID:", currentRoomId);
      connectionAttemptsRef.current = 0;
      
      if (!silent) {
        setReconnectAttempt(0);
        setIsReconnecting(false);
        
        setMessages((prev) => [
          ...prev, 
          { 
            content: "Connection established successfully.", 
            role: "system", 
            timestamp: new Date().toISOString() 
          }
        ]);
      }
      
      isInitializing.current = false;
    });
    
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      handleReconnectError(newSocket, currentRoomId, silent);
    });
    
    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      handleReconnectError(newSocket, currentRoomId, silent);
    });
    
    // Setup socket event handlers directly instead of calling a separate function
    // Agent joined event
    newSocket.on("agent_joined", (data) => {
      setIsConnectedToAgent(true);
      setIsWaitingForAgent(false);
      
      // Clear any pending "no agents available" timeout
      if (window.noAgentsTimeoutId) {
        clearTimeout(window.noAgentsTimeoutId);
        window.noAgentsTimeoutId = null;
      }
      
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

    // Agent left event
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

    // New message event
    newSocket.on("new_message", (message) => {
      console.log("Socket received message:", message);
      console.log("Current room ID:", currentRoomId);
      console.log("Message room ID:", message.roomId);
      console.log("Socket ID:", newSocket.id);
      console.log("Message sender ID:", message.senderId);
      
      if (message.roomId === currentRoomId) {
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

    // No agents available event
    newSocket.on("no_agents_available", () => {
      // Add a slight delay before showing "no agents available" message
      // This gives time for a potential "agent_joined" event to arrive first
      const noAgentsTimeout = setTimeout(() => {
        // Only show this message if we're still waiting for an agent
        if (isWaitingForAgent) {
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
        }
      }, 1000); // 1 second delay
      
      // Store the timeout ID so we can clear it if an agent joins
      window.noAgentsTimeoutId = noAgentsTimeout;
    });
  };
  
  // Helper function to handle reconnection errors
  const handleReconnectError = (currentSocket, currentRoomId, silent = false) => {
    if (currentSocket) {
      currentSocket.disconnect();
    }
    
    connectionAttemptsRef.current++;
    console.log(`Reconnection attempt ${connectionAttemptsRef.current}/${RECONNECTION_CONFIG.maxAttempts} (silent: ${silent})`);
    
    // Only update UI if not in silent mode
    if (!silent) {
      setReconnectAttempt(connectionAttemptsRef.current);
    }
    
    if (connectionAttemptsRef.current > RECONNECTION_CONFIG.maxAttempts) {
      console.error(`Failed to connect after ${RECONNECTION_CONFIG.maxAttempts} attempts`);
      
      // Switch to fallback mode
      setInFallbackMode(true);
      if (!silent) {
        setIsReconnecting(false);
        
        // Only show the message if not in silent mode
        setMessages(prev => [
          ...prev, 
          { 
            content: "Unable to establish a connection. Switching to offline mode.", 
            role: "system",
            timestamp: new Date().toISOString()
          }
        ]);
      }
      
      isInitializing.current = false;
      return;
    }
    
    const delay = RECONNECTION_CONFIG.initialDelay * 
      Math.pow(RECONNECTION_CONFIG.factor, connectionAttemptsRef.current);
    const backoffDelay = Math.min(delay, RECONNECTION_CONFIG.maxDelay);
    
    // Only show message if not in silent mode
    if (!silent) {
      setMessages(prev => [
        ...prev, 
        { 
          content: `Connection lost. Reconnecting in ${backoffDelay/1000} seconds (attempt ${connectionAttemptsRef.current}/${RECONNECTION_CONFIG.maxAttempts})...`, 
          role: "system",
          timestamp: new Date().toISOString()
        }
      ]);
    }
    
    setTimeout(() => {
      // Use the provided roomId on reconnection
      if (!roomId && currentRoomId) {
        setRoomId(currentRoomId);
      }
      initializeSocketConnection(silent);
    }, backoffDelay);
  };

  // Initialize socket connection
  useEffect(() => {
    console.log("Component mounted - initializing in fallback mode:", FALLBACK_MODE);
    
    // Set initial state based on FALLBACK_MODE
    setInFallbackMode(FALLBACK_MODE);
    
    // If not in fallback mode, initialize the socket connection
    if (!FALLBACK_MODE) {
      // Try to connect silently based on configuration
      const silent = RECONNECTION_CONFIG.showUIIndicators === false;
      console.log("Initial connection attempt with silent mode:", silent);
      
      setTimeout(() => {
        initializeSocketConnection(silent);
        
        // Set up silent retry after specified delay if connection fails
        setTimeout(() => {
          // Only retry if we're not connected and not in fallback mode
          if (!socket?.connected && !inFallbackMode) {
            console.log("Performing silent retry after timeout");
            // Reset connection attempts for a fresh start
            connectionAttemptsRef.current = 0;
            initializeSocketConnection(true); // Force silent mode for retry
          }
        }, RECONNECTION_CONFIG.silentRetryDelay);
      }, 500);
    } else {
      console.log("Starting in fallback mode - no socket connection will be attempted");
      
      // Add the initial fallback mode message
      setMessages(prev => [
        ...prev, 
        { 
          content: "Currently operating in offline mode with limited functionality. Some features may not be available.", 
          role: "system",
          timestamp: new Date().toISOString()
        }
      ]);
    }
    
    // Clean up on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
      isInitializing.current = false;
    };
  }, []);

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
      lowerText.includes("connect me agent") ||
      lowerText.includes("connect me to a human") ||
      lowerText.includes("connect me to a human agent")
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

    // If in fallback mode, provide basic responses
    if (inFallbackMode) {
      // Add a typing indicator
      setIsTyping(true);
      setMessages((prev) => [...prev, { content: "", role: "assistant", typing: true }]);
      
      // Simulate a delayed response
      setTimeout(() => {
        // Remove the typing indicator
        setMessages((prev) => prev.filter(msg => !msg.typing));
        
        // Add the fallback response
        let responseContent;
        
        if (isRequestForAgent(currentInput)) {
          responseContent = "I'm sorry, but our live agent service is currently offline. I'll do my best to help you myself. What do you need assistance with?";
        } else {
          // Use the mock response utility for more context-aware responses
          responseContent = getMockAIResponse(currentInput);
        }
        
        const response = { 
          content: responseContent, 
          role: "assistant",
          timestamp: new Date().toISOString()
        };
        
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 1000);
      
      return;
    }

    // Check if user is requesting an agent
    if (!isConnectedToAgent && !isWaitingForAgent && isRequestForAgent(currentInput)) {
      requestAgent();
      return;
    }
    
    // If connected to an agent, send message through socket
    if (isConnectedToAgent) {
      console.log("Connected to agent, sending message via socket:", userMessage);
      if (socket && socket.connected) {
        socket.emit("send_message", userMessage);
        console.log("Message sent to agent:", userMessage);
      } else {
        console.error("Socket not connected. Cannot send message to agent.");
        // Add system message that connection is lost
        setMessages((prev) => [
          ...prev, 
          { 
            content: "Connection to agent lost. Trying to reconnect...", 
            role: "system",
            timestamp: new Date().toISOString()
          }
        ]);
        // Try to reconnect
        setIsConnectedToAgent(false);
        initializeSocketConnection(false);
      }
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
    processWithAI(currentInput);
  };

  // Helper function to process messages with AI
  const processMessageWithAI = async (messageContent) => {
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
      { role: "user", content: messageContent },
    ];

    // Record start time to simulate minimum typing delay
    const startTime = Date.now();
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/generate-for-chat-assistant`, {
        messages: conversationHistory,
      });
      const aiResponse = response.data.aiResponse;
      const elapsed = Date.now() - startTime;
      const minDelay = 1000; // minimum delay of 1 second
      if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
      }
      // Update the last assistant message with the AI response and set typing to false.
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
      
      // If API call fails, switch to fallback mode for future interactions
      setInFallbackMode(true);
      
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
            return { 
              ...msg, 
              content: "Error connecting to our servers. I'll switch to offline mode for now. Please try again later when our services are back online.", 
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
    if (inFallbackMode) {
      // In fallback mode, provide a simple response without making API calls
      setIsTyping(true);
      setMessages((prev) => [...prev, { content: "", role: "assistant", typing: true }]);
      
      // Simulate network delay
      setTimeout(() => {
        // Get a contextual response using the mock response utility
        const responseContent = getMockAIResponse(messageContent);
        
        setMessages((prev) =>
          prev.map((msg, index) => {
            if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
              return { 
                ...msg, 
                content: responseContent, 
                typing: false,
                roomId,
                timestamp: new Date().toISOString() 
              };
            }
            return msg;
          }),
        );
        setIsTyping(false);
      }, 1000);
    } else {
      // In online mode, use the standard message processing function
      setIsTyping(true);
      setMessages((prev) => [...prev, { content: "", role: "assistant", typing: true }]);

      try {
        const response = await axios.post(`${API_BASE_URL}/chat/generate-for-chat-assistant`, {
          messages: [
            { role: "system", content: "ignore this but use it to keep track of conversation" },
            ...messages
              .filter((msg) => msg.role === "user")
              .map((msg) => ({
                role: "user",
                content: msg.content,
              })),
            { role: "user", content: messageContent },
          ],
        });

        const aiResponse = response.data.aiResponse;
        
        // Update the last assistant message with the AI response
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
        
        // If API call fails, switch to fallback mode for future interactions
        setInFallbackMode(true);
        
        // Get a fallback response using the mock response utility
        const fallbackResponse = getMockAIResponse(messageContent);
        
        setMessages((prev) =>
          prev.map((msg, index) => {
            if (index === prev.length - 1 && msg.role === "assistant" && msg.typing) {
              return { 
                ...msg, 
                content: fallbackResponse, 
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
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-2xl flex flex-col h-[600px] lg:w-[400px] sm:w-[350px] relative border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
        {/* Left side - Logo and Status */}
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <img
              src={logo || "/placeholder.svg"}
              alt="AI Assistant"
              className="w-9 h-9 rounded-full border-2 border-blue-400"
            />
            {/* Connection indicator */}
            {RECONNECTION_CONFIG.showUIIndicators && (
              <div 
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 
                  ${isReconnecting ? 'bg-yellow-600 animate-pulse' : 'bg-green-700'}`}
              />
            )}
          </div>
          
          <div className="flex flex-col min-w-0">
            {/* Title and subtitle with no spacing between them */}
            <h2 className="text-lg font-bold text-white leading-tight">
              {isConnectedToAgent 
                ? "Agent Support" 
                : isWaitingForAgent 
                  ? "Connecting..." 
                  : (!RECONNECTION_CONFIG.showUIIndicators || !isReconnecting) 
                    ? "GDAi" 
                    : "Reconnecting..."}
            </h2>
            
            <p className="text-xs text-gray-400 -mt-1">
              {isConnectedToAgent 
                ? "Human Agent" 
                : isWaitingForAgent 
                  ? "Please wait" 
                  : (!RECONNECTION_CONFIG.showUIIndicators || !isReconnecting) 
                    ? (inFallbackMode ? "Offline Mode" : "AI Assistant") 
                    : `Attempt ${reconnectAttempt}/${RECONNECTION_CONFIG.maxAttempts}`}
            </p>
            
            {/* Status indicators as a separate row */}
            <div className="flex items-center gap-2 mt-0.5">
              {inFallbackMode && (
                <span className="text-xs text-amber-500 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Limited functionality
                </span>
              )}
              
              {RECONNECTION_CONFIG.showUIIndicators && isReconnecting && (
                <span className="text-xs text-yellow-500 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Attempting to reconnect
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mode Toggle Button */}
          <button
            onClick={toggleFallbackMode}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              inFallbackMode 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {inFallbackMode ? 'Go Online' : 'Go Offline'}
          </button>
          
          {/* Request Agent Button - only shown in certain states */}
          {!isConnectedToAgent && !isWaitingForAgent && !inFallbackMode && (
            <button
              onClick={requestAgent} 
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-white flex items-center"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1" />
              Agent
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
            placeholder={isWaitingForAgent ? "Waiting for agent..." : (!RECONNECTION_CONFIG.showUIIndicators || !isReconnecting) ? (inFallbackMode ? "Offline mode - limited responses" : "Type your message...") : "Reconnecting..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isWaitingForAgent || (RECONNECTION_CONFIG.showUIIndicators && isReconnecting)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isWaitingForAgent || (RECONNECTION_CONFIG.showUIIndicators && isReconnecting)}
            className={`${
              input.trim() && !isWaitingForAgent && !(RECONNECTION_CONFIG.showUIIndicators && isReconnecting)
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
            : (RECONNECTION_CONFIG.showUIIndicators && isReconnecting)
            ? "Reconnecting to server..."
            : inFallbackMode
            ? "Operating in offline mode - server connection unavailable"
            : "Press Enter to send, Shift+Enter for a new line"}
        </div>
      </div>
    </div>
  );
};

export default Assistant;