"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X, UserPlus, Users, LogOut, ToggleLeft, ToggleRight, Settings, Volume2, Volume1, VolumeX, Bell } from "lucide-react";
import { API_BASE_URL, SOCKET_BASE_URL } from "../../Utils/ChatBaseUrl";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import io from "socket.io-client";
import { useAgentAuth } from "../Auth/AgentAuthContext.jsx";
import Swal from "sweetalert2";

// Import sound files
import notificationSound from '../../assets/sounds/chime.mp3';
import chimeSound from '../../assets/sounds/chime.mp3';
import bellSound from '../../assets/sounds/chime.mp3';

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isAgent = message.role === "agent";
  const isSystem = message.role === "system";

  const bubbleClass = isUser
    ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl rounded-tr-none shadow-md"
    : isAgent
    ? "bg-gradient-to-r from-green-700 to-green-800 text-white rounded-2xl rounded-tl-none shadow-md"
    : "bg-gray-800 text-gray-100 rounded-2xl shadow-md border border-gray-700";

  const label = isUser ? "Customer" : isAgent ? "Agent" : "System";
  const labelPositionClass = isUser ? "absolute top-2 right-3" : "absolute top-2 left-3";
  const labelColorClass = isUser 
    ? "text-blue-300" 
    : isAgent 
    ? "text-green-300" 
    : "text-gray-400";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`relative p-5 max-w-[80%] min-w-[200px] ${bubbleClass}`}>
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
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const Agent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationSound, setNotificationSound] = useState(localStorage.getItem('notificationSound') || 'default');
  const [notificationsEnabled, setNotificationsEnabled] = useState(localStorage.getItem('notificationsEnabled') !== 'false');
  const [notificationVolume, setNotificationVolume] = useState(parseInt(localStorage.getItem('notificationVolume') || '80'));
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [showAllConversations, setShowAllConversations] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const chatEndRef = useRef(null);
  const notificationAudioRef = useRef(null);
  const navigate = useNavigate();
  const { agent, logout, updateStatus } = useAgentAuth();

  // Constants
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
  const RECENT_CONVERSATION_LIMIT = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Function to filter and sort active conversations
  const filterActiveRooms = (rooms) => {
    return rooms
      .filter(room => room.active)
      .sort((a, b) => {
        // Sort by most recent activity
        const aTime = a.lastActivityTimestamp ? new Date(a.lastActivityTimestamp).getTime() : 0;
        const bTime = b.lastActivityTimestamp ? new Date(b.lastActivityTimestamp).getTime() : 0;
        return bTime - aTime; // Newest first
      });
  };

  // Function to sort all conversations by activity timestamp
  const sortByActivityTime = (rooms) => {
    return [...rooms].sort((a, b) => {
      const aTime = a.lastActivityTimestamp ? new Date(a.lastActivityTimestamp).getTime() : 0;
      const bTime = b.lastActivityTimestamp ? new Date(b.lastActivityTimestamp).getTime() : 0;
      return bTime - aTime; // Newest first
    });
  };

  // Function to handle chat inactivity timeout
  const setupInactivityTimer = () => {
    console.log("Agent: Setting up inactivity timer for 10 minutes");
    // Clear any existing timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      if (activeRoom) {
        const inactiveTime = (Date.now() - lastActivity) / 1000 / 60;
        console.log(`Agent: Chat inactive for ${inactiveTime.toFixed(2)} minutes, auto-closing`);
        
        // Show notification
        Swal.fire({
          title: 'Chat Auto-Closed',
          text: `The chat with ${activeRoom.userName || 'Customer'} was automatically closed due to 10 minutes of inactivity.`,
          icon: 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        
        // Leave the room
        leaveRoom('inactivity_timeout');
      }
    }, INACTIVITY_TIMEOUT);
    
    setInactivityTimer(timer);
  };
  
  // Update activity timestamp on relevant actions
  const updateActivity = () => {
    setLastActivity(Date.now());
    setupInactivityTimer();
  };
  
  // Set up inactivity timer when joining a room
  useEffect(() => {
    if (activeRoom) {
      console.log(`Agent: Joined room ${activeRoom.id}, setting up inactivity timer`);
      updateActivity();
    } else {
      // Clear timer when leaving a room
      if (inactivityTimer) {
        console.log("Agent: Left room, clearing inactivity timer");
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
    }
    
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [activeRoom]);
  
  // Update activity when sending or receiving messages
  useEffect(() => {
    if (messages.length > 0 && activeRoom) {
      updateActivity();
    }
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    console.log("Agent data from context:", agent);
    
    let agentName = "Unknown Agent";
    let shouldConnect = false;
    
    if (agent) {
      agentName = agent.agentName;
      shouldConnect = true;
    } else {
      // Fallback: check if we have agent info in localStorage
      try {
        const agentInfo = localStorage.getItem("agentInfo");
        if (agentInfo) {
          const parsedAgentInfo = JSON.parse(agentInfo);
          agentName = parsedAgentInfo.agentName || "Agent from localStorage";
          shouldConnect = true;
          console.log("Using agent data from localStorage:", parsedAgentInfo);
        } else {
          console.log("No agent data available in localStorage");
        }
      } catch (err) {
        console.error("Error parsing agent info from localStorage:", err);
      }
    }
    
    if (!shouldConnect) {
      console.log("No agent data available, socket connection not initialized");
      return;
    }

    console.log("Initializing socket connection with agent:", agentName);
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("SOCKET_BASE_URL:", SOCKET_BASE_URL);
    
    // Use the SOCKET_BASE_URL instead of API_BASE_URL
    const newSocket = io(SOCKET_BASE_URL, {
      transports: ['websocket', 'polling'], // Try websocket first, then polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server with ID:", newSocket.id);
      setIsConnected(true);
      
      // Register as agent with agent name
      newSocket.emit("register_agent", { 
        agentId: newSocket.id, 
        agentName: agentName 
      });
    });

    // Listen for room update events
    newSocket.on("room_updated", (updatedRoom) => {
      debugLog("Room updated event:", updatedRoom);
      
      if (!updatedRoom || !updatedRoom.id) {
        debugLog("ERROR: Invalid room update format");
        return;
      }
      
      // Check if this is an active room update
      const isForActiveRoom = activeRoom?.id === updatedRoom.id;
      debugLog(`Update is for active room: ${isForActiveRoom}`);
      
      // Update in all rooms list first
      setAllRooms(prev => {
        const roomExists = prev.some(room => room.id === updatedRoom.id);
        debugLog(`Room ${updatedRoom.id} exists in allRooms: ${roomExists}`);
        
        let updated;
        if (roomExists) {
          updated = prev.map(room => 
            room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
          );
        } else {
          updated = [...prev, updatedRoom];
        }
        
        return sortByActivityTime(updated);
      });
      
      // Update in available rooms
      setAvailableRooms(prev => {
        const roomExists = prev.some(room => room.id === updatedRoom.id);
        debugLog(`Room ${updatedRoom.id} exists in availableRooms: ${roomExists}`);
        
        // Only keep active rooms in this list
        let updated;
        if (roomExists) {
          updated = prev.map(room => 
            room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
          );
        } else if (updatedRoom.active) {
          updated = [...prev, updatedRoom];
        } else {
          updated = prev;
        }
        
        return filterActiveRooms(updated);
      });
      
      // If this update is for active room, update it
      if (isForActiveRoom) {
        debugLog("Updating active room state");
        setActiveRoom(prev => ({ ...prev, ...updatedRoom, unread: false }));
      }
      
      // Check if we need to play a notification
      const isUnread = updatedRoom.unread === true;
      const hasNewMessage = activeRoom?.lastMessage !== updatedRoom.lastMessage;
      
      if ((isUnread || (hasNewMessage && !isForActiveRoom))) {
        debugLog("Playing notification for room update");
        playNotificationSound();
      }
    });

    // Listen for room leave confirmations
    newSocket.on("room_left", (data) => {
      console.log("Agent: Room left confirmation:", data);
      
      // Room has been left on the server side
      if (data.success) {
        // Update available rooms list if provided
        if (data.availableRooms) {
          setAllRooms(sortByActivityTime(data.availableRooms));
          setAvailableRooms(filterActiveRooms(data.availableRooms));
        }
      } else {
        console.error("Agent: Error leaving room:", data.error);
        // Show error notification
        Swal.fire({
          title: 'Error',
          text: data.error || 'Failed to leave room',
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });

    // Listen for agent notifications
    newSocket.on("agent_notification", (notification) => {
      console.log("Received notification:", notification);
      
      // Play notification sound for all notifications
      playNotificationSound();
      
      // Could also show browser notifications if desired
      if (Notification.permission === "granted" && notificationsEnabled) {
        new Notification("Agent Dashboard", {
          body: notification.message,
          icon: logo
        });
      }
    });

    // Listen for status update confirmations
    newSocket.on("status_updated", (response) => {
      console.log("Status update response:", response);
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      
      if (response.success) {
        Toast.fire({
          icon: 'success',
          title: `Status updated to ${response.status}!`,
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: response.error || 'Failed to update status on server',
        });
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      setIsConnected(false);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      setIsConnected(false);
    });

    newSocket.on("available_rooms", (rooms) => {
      console.log("Received available rooms:", rooms);
      
      // Store all rooms and sort them by activity time
      const sortedRooms = sortByActivityTime(rooms);
      setAllRooms(sortedRooms);
      
      // Filter active rooms for the main view
      const activeRooms = filterActiveRooms(rooms);
      
      // Play notification if there are new active rooms
      if (activeRooms.length > availableRooms.length) {
        playNotificationSound();
      }
      
      setAvailableRooms(activeRooms);
    });

    newSocket.on("new_message", (message) => {
      console.log("🔔 RECEIVED NEW MESSAGE EVENT:", message);
      debugLog("RECEIVED NEW MESSAGE:", message);
      
      if (!message || !message.roomId) {
        console.error("❌ ERROR: Invalid message format, missing roomId", message);
        debugLog("ERROR: Invalid message format, missing roomId", message);
        return;
      }
      
      // Ensure the message has a valid role
      if (!message.role) {
        message.role = message.senderId === newSocket.id ? "agent" : "user";
        console.log(`🔄 Assigned role: ${message.role} for message`);
        debugLog("Assigned role:", message.role);
      }
      
      // Log comparison of roomIds for debugging
      console.log(`🔍 Message roomId: ${message.roomId}, Active room: ${activeRoom?.id}, Match: ${message.roomId === activeRoom?.id}`);
      debugLog(`Message roomId: ${message.roomId}, Active room: ${activeRoom?.id}`);
      
      // Add message to chat if this is for our active room
      if (activeRoom && message.roomId === activeRoom.id) {
        console.log("📝 Adding message to active chat");
        debugLog("Adding message to active chat");
        
        // Check for duplicates before adding
        setMessages(prev => {
          const duplicate = prev.some(m => 
            (m.id && m.id === message.id) || 
            (m.content === message.content && m.senderId === message.senderId)
          );
          
          if (duplicate) {
            console.log("⚠️ Skipping duplicate message");
            debugLog("Skipping duplicate message");
            return prev;
          }
          
          console.log("✅ Added message to messages state");
          debugLog("Added message to messages state");
          return [...prev, message];
        });
        
        // Make sure chat scrolls to bottom
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        // Reset inactivity timer
        updateActivity();
      }
      
      // Important: ALWAYS update the sidebar regardless of active room
      console.log("🔄 Updating sidebar for message:", message.content?.substring(0, 20));
      debugLog("Updating room in sidebar for message:", message.content?.substring(0, 20));
      
      const msgRoomId = message.roomId;
      const now = new Date().toISOString();
      
      // First update allRooms to ensure we have the room
      setAllRooms(prev => {
        // Check if room exists in our list
        const roomExists = prev.some(room => room.id === msgRoomId);
        debugLog(`Room ${msgRoomId} exists in allRooms: ${roomExists}`);
        console.log(`🔍 Room ${msgRoomId} exists in allRooms: ${roomExists}`);
        
        let updated;
        if (roomExists) {
          updated = prev.map(room => {
            if (room.id === msgRoomId) {
              const newState = {
                ...room,
                lastMessage: message.content,
                active: true,
                lastActivityTimestamp: message.timestamp || now,
                unread: activeRoom?.id !== msgRoomId
              };
              debugLog("Updated room in allRooms:", room.id);
              console.log("✅ Updated room in allRooms:", room.id);
              return newState;
            }
            return room;
          });
        } else {
          // Room doesn't exist yet, create a placeholder until we get full room data
          debugLog("Room not found in allRooms, creating placeholder");
          console.log("🆕 Room not found in allRooms, creating placeholder");
          const newRoom = {
            id: msgRoomId,
            userName: message.senderName || "User",
            lastMessage: message.content,
            active: true,
            lastActivityTimestamp: message.timestamp || now,
            unread: true
          };
          updated = [...prev, newRoom];
        }
        
        return sortByActivityTime(updated);
      });
      
      // Then update availableRooms (which is filtered allRooms)
      setAvailableRooms(prev => {
        // Check if the room exists
        const roomExists = prev.some(room => room.id === msgRoomId);
        debugLog(`Room ${msgRoomId} exists in availableRooms: ${roomExists}`);
        console.log(`🔍 Room ${msgRoomId} exists in availableRooms: ${roomExists}`);
        
        let updated;
        if (roomExists) {
          updated = prev.map(room => {
            if (room.id === msgRoomId) {
              const newState = {
                ...room,
                lastMessage: message.content,
                active: true,
                lastActivityTimestamp: message.timestamp || now,
                unread: activeRoom?.id !== msgRoomId
              };
              debugLog("Updated room in availableRooms:", room.id);
              console.log("✅ Updated room in availableRooms:", room.id);
              return newState;
            }
            return room;
          });
        } else {
          // Check if we should add this to available rooms
          const isActiveRoom = activeRoom?.id === msgRoomId;
          if (!isActiveRoom) {
            debugLog("Room not found in availableRooms, creating placeholder");
            console.log("🆕 Room not found in availableRooms, creating placeholder");
            const newRoom = {
              id: msgRoomId,
              userName: message.senderName || "User",
              lastMessage: message.content,
              active: true,
              lastActivityTimestamp: message.timestamp || now,
              unread: true
            };
            updated = [...prev, newRoom];
          } else {
            updated = prev;
          }
        }
        
        return filterActiveRooms(updated);
      });
      
      // Always play notification for incoming user messages
      if (message.role === 'user' && message.senderId !== newSocket.id) {
        console.log("🔊 Playing notification sound for user message");
        debugLog("Playing notification for message from:", message.senderId);
        
        // Play sound for all messages not from current user
        if (notificationSound) {
          try {
            notificationSound.play().catch(err => {
              console.warn("Failed to play notification sound:", err);
            });
          } catch (err) {
            console.warn("Error playing notification sound:", err);
          }
        }
        
        // Show browser notification if we have permission and window is not focused
        if (Notification.permission === "granted" && !document.hasFocus()) {
          try {
            const notification = new Notification("New Message", {
              body: `${message.senderName || 'User'}: ${message.content?.substring(0, 60)}...`,
              icon: "/favicon.ico",
            });
            
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
            
            debugLog("Browser notification shown for message");
            console.log("🔔 Browser notification shown");
          } catch (err) {
            console.warn("Failed to show notification:", err);
          }
        }
      }
    });

    newSocket.on("chat_history", (history) => {
      console.log(`Agent: Received chat history for room, count: ${history?.length || 0}`);
      
      // Ensure all messages have proper roles
      const processedHistory = history?.map(msg => {
        if (!msg.role) {
          // Determine role based on sender info
          if (msg.senderId === 'system') {
            msg.role = 'system';
          } else if (msg.senderId === socket.id || msg.senderName === agent?.agentName) {
            msg.role = 'agent';
          } else {
            msg.role = 'user';
          }
          console.log(`Agent: Set role '${msg.role}' for message:`, msg.content.substring(0, 20) + '...');
        }
        return msg;
      }) || [];
      
      setMessages(processedHistory);
      
      // Reset inactivity timer after loading history
      if (history?.length > 0) {
        updateActivity();
      }
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Agent: Disconnected from socket server");
      
      // Clear any active inactivity timers
      if (inactivityTimer) {
        console.log("Agent: Clearing inactivity timer due to socket disconnect");
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
    });

    newSocket.on("request_agent", (data) => {
      console.log("Playing notification for new room request");
      playNotificationSound();
      // ... rest of request handling
    });

    return () => {
      if (inactivityTimer) {
        console.log("Agent: Clearing inactivity timer due to component unmount");
        clearTimeout(inactivityTimer);
      }
      newSocket.disconnect();
    };
  }, [agent]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !activeRoom) return;

    console.log(`Agent: Sending message to room ${activeRoom.id}`);

    const message = {
      content: input,
      role: "agent",
      timestamp: new Date().toISOString(),
      roomId: activeRoom.id,
      senderId: socket.id,
      senderName: agent?.agentName || "Support Agent"
    };

    // Add to local messages first for immediate display
    setMessages(prev => [...prev, message]);
    
    // Then emit to socket
    socket.emit("send_message", message);
    setInput("");
    
    // Update activity timestamp on sending message
    updateActivity();
  };

  const joinRoom = (room) => {
    if (socket) {
      console.log(`Agent: Joining room ${room.id}`);
      
      // Immediately mark room as active in local state
      setAllRooms(prev => {
        return prev.map(r => {
          if (r.id === room.id) {
            return { ...r, active: true };
          }
          return r;
        });
      });
      
      setAvailableRooms(prev => {
        const updated = prev.map(r => {
          if (r.id === room.id) {
            return { ...r, active: true };
          }
          return r;
        });
        return filterActiveRooms(updated);
      });
      
      // Tell server to join the room
      socket.emit("join_room", { 
        roomId: room.id, 
        agentId: socket.id,
        markActive: true // Tell server to mark this room as active
      });
      
      // Update the active room locally
      setActiveRoom({
        ...room,
        active: true,
        lastActivityTimestamp: new Date().toISOString()
      });
      
      // Request chat history for this room
      socket.emit("get_chat_history", { roomId: room.id });
    }
  };

  const leaveRoom = (reason = 'manual_exit') => {
    if (socket && activeRoom) {
      console.log(`Agent: Leaving room ${activeRoom.id}, reason: ${reason}`);
      
      // First update local state
      setActiveRoom(null);
      setMessages([]);
      
      // Mark room as inactive in our local state
      setAllRooms(prev => {
        return prev.map(room => {
          if (room.id === activeRoom.id) {
            return { 
              ...room, 
              active: false,
              lastActivityTimestamp: new Date().toISOString() 
            };
          }
          return room;
        });
      });
      
      // Update available rooms - filter out this now inactive room
      setAvailableRooms(prev => {
        const updated = prev.map(room => {
          if (room.id === activeRoom.id) {
            return { 
              ...room, 
              active: false,
              lastActivityTimestamp: new Date().toISOString() 
            };
          }
          return room;
        });
        return filterActiveRooms(updated);
      });
      
      // Then notify server to close or mark inactive
      if (reason === 'manual_exit' || reason === 'inactivity_timeout' || reason === 'agent_logout') {
        // Close the conversation completely
        socket.emit("close_room", { 
          roomId: activeRoom.id, 
          agentId: socket.id,
          reason: reason,
          agentName: agent?.agentName || "Support Agent"
        });
      } else {
        // Just mark as inactive and leave
        socket.emit("leave_room", { 
          roomId: activeRoom.id, 
          agentId: socket.id,
          reason: reason,
          agentName: agent?.agentName || "Support Agent"
        });
      }

      // Show notification
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: 'info',
        title: `Left chat with ${activeRoom.userName || 'Customer'}`,
      });
      
      // Clear any active inactivity timers
      if (inactivityTimer) {
        console.log("Agent: Clearing inactivity timer due to leaving room");
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
    }
  };

  const toggleAvailability = async () => {
    // Determine new status based on current status
    const newStatus = isAvailable ? 'busy' : 'online';
    
    // Show loading toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    
    Toast.fire({
      icon: 'info',
      title: `Updating status to ${newStatus}...`,
    });
    
    try {
      // Call the updateStatus function from AgentAuthContext
      const result = await updateStatus(newStatus);
      
      if (result.success) {
        // Update local state
        setIsAvailable(!isAvailable);
        
        // Show success toast
        Toast.fire({
          icon: 'success',
          title: `Status set to ${newStatus}!`,
        });
        
        // Notify socket server about status change if connected
        if (socket && socket.connected) {
          socket.emit("update_agent_status", { 
            agentId: socket.id, 
            status: newStatus 
          });
        }
      } else {
        // Show error toast
        Toast.fire({
          icon: 'error',
          title: result.error || `Failed to update status. Please try again.`,
        });
      }
    } catch (error) {
      console.error("Error updating agent status:", error);
      
      // Show error toast
      Toast.fire({
        icon: 'error',
        title: 'An error occurred while updating status',
      });
    }
  };

  const handleLogout = async () => {
    console.log("Agent: Logging out");
    
    // Leave any active rooms
    if (socket && activeRoom) {
      console.log(`Agent: Leaving active room ${activeRoom.id} due to logout`);
      socket.emit("leave_room", { 
        roomId: activeRoom.id, 
        agentId: socket.id,
        reason: 'agent_logout'
      });
    }
    
    // Clear any active inactivity timers
    if (inactivityTimer) {
      console.log("Agent: Clearing inactivity timer due to logout");
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
    
    // Disconnect socket
    if (socket) {
      console.log("Agent: Disconnecting socket");
      socket.disconnect();
    }
    
    // Logout the agent (updates DB status to offline)
    console.log("Agent: Calling logout API");
    try {
    await logout();
      console.log("Agent: Logout successful");
    } catch (error) {
      console.error("Agent: Error during logout:", error);
    }
    
    // Redirect to login page
    console.log("Agent: Redirecting to login page");
    navigate("/agent-login");
  };

  // Play notification sound based on settings
  const playNotificationSound = () => {
    if (!notificationsEnabled) {
      debugLog("Notifications disabled, not playing sound");
      return;
    }
    
    debugLog("Playing notification sound");
    let soundToPlay;
    
    // Set the source based on selected sound
    switch (notificationSound) {
      case 'notification':
        soundToPlay = notificationSound;
        break;
      case 'chime':
        soundToPlay = chimeSound;
        break;
      case 'bell':
        soundToPlay = bellSound;
        break;
      default:
        soundToPlay = notificationSound;
    }
    
    const audio = new Audio(soundToPlay);
    audio.volume = notificationVolume / 100;
    
    audio.play().catch(error => {
      debugLog("Error playing notification sound:", error);
    });
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    localStorage.setItem('notificationSound', notificationSound);
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
    localStorage.setItem('notificationVolume', notificationVolume.toString());
    
    // Test sound after saving
    if (notificationsEnabled) {
      playNotificationSound();
    }
    
    setShowSettingsModal(false);
  };

  // Request browser notification permissions
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        await Notification.requestPermission();
      }
    }
  };

  // Request notification permission when component mounts
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Toggle between showing active conversations and all conversations
  const toggleConversationView = () => {
    setShowAllConversations(!showAllConversations);
  };

  // Add this debug function near the top of the component
  const debugLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`, data || '');
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Settings className="mr-2 h-5 w-5 text-blue-500" />
                Notification Settings
              </h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Enable/Disable Notifications */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-200 font-medium">
                    Notification Sounds
                  </label>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`rounded-full p-1 ${notificationsEnabled ? 'bg-green-800 text-green-400' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {notificationsEnabled ? <Bell className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  {notificationsEnabled ? 'Notification sounds are enabled' : 'Notification sounds are disabled'}
                </p>
              </div>

              {/* Volume Control */}
              <div className={`${!notificationsEnabled ? 'opacity-50' : ''}`}>
                <label className="block text-gray-200 font-medium mb-2">
                  Volume
                </label>
                <div className="flex items-center gap-3">
                  <VolumeX className="h-4 w-4 text-gray-400" />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={notificationVolume} 
                    onChange={(e) => setNotificationVolume(parseInt(e.target.value))}
                    disabled={!notificationsEnabled}
                    className="w-full h-2 rounded-lg bg-gray-700 appearance-none cursor-pointer"
                  />
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">{notificationVolume}%</p>
              </div>

              {/* Notification Sound Selection */}
              <div className={`${!notificationsEnabled ? 'opacity-50' : ''}`}>
                <label className="block text-gray-200 font-medium mb-2">
                  Sound
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => notificationsEnabled && setNotificationSound('default')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                      notificationSound === 'default' 
                        ? 'bg-blue-700 border border-blue-500' 
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    disabled={!notificationsEnabled}
                  >
                    <Volume1 className={`h-5 w-5 mb-1 ${notificationSound === 'default' ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`text-xs ${notificationSound === 'default' ? 'text-white' : 'text-gray-400'}`}>Default</span>
                  </button>
                  <button
                    onClick={() => notificationsEnabled && setNotificationSound('chime')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                      notificationSound === 'chime' 
                        ? 'bg-blue-700 border border-blue-500' 
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    disabled={!notificationsEnabled}
                  >
                    <Volume1 className={`h-5 w-5 mb-1 ${notificationSound === 'chime' ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`text-xs ${notificationSound === 'chime' ? 'text-white' : 'text-gray-400'}`}>Chime</span>
                  </button>
                  <button
                    onClick={() => notificationsEnabled && setNotificationSound('bell')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                      notificationSound === 'bell' 
                        ? 'bg-blue-700 border border-blue-500' 
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    disabled={!notificationsEnabled}
                  >
                    <Volume1 className={`h-5 w-5 mb-1 ${notificationSound === 'bell' ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`text-xs ${notificationSound === 'bell' ? 'text-white' : 'text-gray-400'}`}>Bell</span>
                  </button>
                </div>
              </div>

              {/* Test Sound Button */}
              <div>
                <button
                  onClick={playNotificationSound}
                  disabled={!notificationsEnabled}
                  className={`w-full py-2 rounded-lg ${
                    notificationsEnabled 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Test Sound
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveNotificationSettings}
                className="flex-1 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for available rooms */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-green-500" /> 
              Agent Console
            </h2>
            <button 
              onClick={handleLogout}
              className="p-1.5 bg-gray-700 text-red-400 rounded-lg hover:bg-gray-600 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {isConnected ? "Online" : "Offline"}
          </p>
        </div>

        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div>
              <div className="text-sm font-medium text-white">{agent?.agentName || "Agent"}</div>
              <div className="text-xs text-gray-400">ID: {agent?.id || "..."}</div>
            </div>
            <button 
              onClick={toggleAvailability}
              className={`flex items-center gap-1 px-2 py-1 rounded ${
                isAvailable 
                  ? 'bg-green-800/50 text-green-400 hover:bg-green-800' 
                  : 'bg-gray-600/50 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {isAvailable ? (
                <>
                  <ToggleRight className="h-4 w-4" /> 
                  <span className="text-xs">Available</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-4 w-4" /> 
                  <span className="text-xs">Busy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-400">
              {showAllConversations ? "ALL CONVERSATIONS" : "ACTIVE CONVERSATIONS"}
            </h3>
            <button 
              onClick={toggleConversationView}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-blue-300"
            >
              {showAllConversations ? "Show Active" : "View All"}
            </button>
          </div>
          
          {(showAllConversations ? allRooms : availableRooms).length > 0 ? (
            <div className="space-y-2">
              {(showAllConversations ? allRooms : availableRooms).map((room) => (
                <button
                  key={room.id}
                  onClick={() => joinRoom(room)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeRoom && activeRoom.id === room.id
                      ? "bg-blue-900 border border-blue-700"
                      : "bg-gray-700 hover:bg-gray-650 border border-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-200">{room.userName || "Customer"}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      room.active 
                        ? "bg-green-800 text-green-200" 
                        : "bg-gray-600 text-gray-300"
                    }`}>
                      {room.active ? (room.waitTime || "Active") : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {room.lastMessage || "Waiting for assistance..."}
                  </p>
                  {room.lastActivityTimestamp && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(room.lastActivityTimestamp).toLocaleTimeString()}
                    </p>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No {showAllConversations ? "" : "active"} support requests</p>
            </div>
          )}
        </div>

        {/* Add Settings Footer to Sidebar */}
        <div className="p-3 border-t border-gray-700 mt-auto">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="w-full flex items-center justify-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition duration-200"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Notification Settings</span>
            {notificationsEnabled 
              ? <Bell className="h-4 w-4 text-green-500" /> 
              : <VolumeX className="h-4 w-4 text-gray-500" />
            }
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {activeRoom ? (
          <>
            {/* Chat header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">{activeRoom.userName || "Customer"}</h2>
                <p className="text-sm text-gray-400">Room ID: {activeRoom.id.slice(0, 8)}...</p>
              </div>
              <button 
                onClick={leaveRoom}
                className="p-2 bg-gray-700 text-red-400 rounded-lg hover:bg-gray-600 transition flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" /> Leave Chat
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg">You've joined the chat room</p>
                    <p className="text-sm">Start the conversation with the customer</p>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden pr-1">
                <textarea
                  rows="1"
                  className="flex-grow bg-transparent border-none px-4 py-3 focus:outline-none text-gray-200 placeholder-gray-400 resize-none"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`${
                    input.trim()
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      : "bg-gray-600 cursor-not-allowed"
                  } text-white p-2.5 rounded-full transition-all duration-200 flex items-center justify-center`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center max-w-md mx-auto p-6">
              <UserPlus className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-gray-200 mb-2">No Active Chat</h3>
              <p className="mb-6">Select a support request from the sidebar to start assisting customers.</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <div className="font-medium text-gray-200 mb-1">Active Chats</div>
                  <div className="text-2xl font-bold text-white">{availableRooms.length}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <div className="font-medium text-gray-200 mb-1">Status</div>
                  <div className={`font-medium flex items-center ${isAvailable ? 'text-green-500' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 ${isAvailable ? 'bg-green-500' : 'bg-gray-500'} rounded-full mr-1`}></div>
                    {isAvailable ? 'Available' : 'Busy'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent; 