import React, { useState, useRef, useEffect } from "react";
import ChatContent from "./ChatContent"; 
import ChatSidebar from "./ChatSidebar";
import Settings from "./Settings";
import { Icons } from "./icons";
import { useToast } from "../Hooks/use-toast";
import ApiKeyForm from "./ApiKeyForm";
import { Menu, X, Upload } from "lucide-react";
import ImageUploader from "./ImageUploader";
import ModuleDownloader from "./ModuleDownloader";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl"; 

export function ChatInterface() {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");

  // Sidebar toggles
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Refs for outside click detection
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

  // Predefined prompts (for context suggestions)
  const predefinedPrompts = [
    "How can I improve my website's SEO to rank higher on Google?",
    "What are the best practices for redesigning a corporate website?",
    "How can paid social advertising help grow my business online?",
    "What strategies boost website speed and overall user experience?",
    "How do I secure my website and protect it from cyber threats?",
    "What’s the best way to integrate social media marketing into my digital strategy?"
  ];
  
  const promptIcons = [
    Icons.trendingUp,
    Icons.smartphone,
    Icons.megaphone,
    Icons.rocket,
    Icons.shield,
    Icons.share2
  ];
  const [showPrompts, setShowPrompts] = useState(true);

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    // For guests, load conversations from localStorage
    const stored = localStorage.getItem("conversations");
    if (stored) {
      setConversations(JSON.parse(stored));
    } else {
      setConversations([]);
    }
  }, []);


  // Force new chat session by updating a key (to clear messages in ChatContent)
  const [chatSessionKey, setChatSessionKey] = useState(Date.now());

  // Settings modal state
  const [showSettings, setShowSettings] = useState(false);

  // Document click handler to close sidebars when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".sidebar-toggle")) return;
      if (leftSidebarRef.current && leftSidebarRef.current.contains(e.target)) return;
      if (rightSidebarRef.current && rightSidebarRef.current.contains(e.target)) return;
      setShowLeftSidebar(false);
      setShowRightSidebar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle sidebars
  const toggleLeftSidebar = (e) => {
    e.stopPropagation();
    setShowLeftSidebar((prev) => {
      if (!prev) setShowRightSidebar(false);
      return !prev;
    });
  };
  const toggleRightSidebar = (e) => {
    e.stopPropagation();
    setShowRightSidebar((prev) => {
      if (!prev) setShowLeftSidebar(false);
      return !prev;
    });
  };

  const handleNewChat = () => {
    setChatSessionKey(Date.now()); 
    setShowPrompts(true);
    setImageUrl(null);
  };

  // Delete conversation: call backend if logged in; otherwise remove from localStorage.
  const deleteConversation = async (conversationId) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await axios.delete(`${API_BASE_URL}/chat/conversations/${conversationId}`);
        // Remove conversation from local state
        const updatedConvos = conversations.filter((conv) => conv.id !== conversationId);
        setConversations(updatedConvos);
        toast({
          title: "Conversation Deleted",
          description: "Your conversation has been deleted.",
        });
      } catch (error) {
        console.error("Delete conversation error:", error);
        toast({
          title: "Deletion Failed",
          description: "Failed to delete conversation. Please try again.",
        });
      }
    } else {
      // For guest, update localStorage
      const updatedConvos = conversations.filter((conv) => conv.id !== conversationId);
      localStorage.setItem("conversations", JSON.stringify(updatedConvos));
      setConversations(updatedConvos);
      toast({
        title: "Conversation Deleted",
        description: "Your conversation has been deleted locally.",
      });
    }
  };


  const handleDeleteChats = () => {
    if (localStorage.getItem("userId")) {
      axios.delete(`${API_BASE_URL}/chat/conversations?userId=${localStorage.getItem("userId")}`)
        .then(() => {
          setConversations([]);
          toast({
            title: "Chats Deleted",
            description: "All chats have been deleted.",
          });
        })
        .catch((error) => {
          console.error("Error deleting chats:", error);
          toast({
            title: "Error",
            description: "Failed to delete chats.",
          });
        });
    } else {
      localStorage.removeItem("conversations");
      setConversations([]);
      toast({
        title: "Chats Deleted",
        description: "All chats have been deleted locally since you haven't logged in.",
      });
    }
    setShowSettings(false);
  };
  const handleThemeToggle = () => {
   alert("theme uses you devices defaut theme");
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Mobile Toggle Buttons */}
      <button
        onClick={toggleLeftSidebar}
        className="sidebar-toggle absolute top-2 left-2 z-50 md:hidden p-2 bg-gray-100 dark:bg-blue-600 rounded-full shadow"
      >
        {showLeftSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <button
        onClick={toggleRightSidebar}
        className="sidebar-toggle absolute top-2 right-2 z-50 md:hidden p-2 bg-gray-100 dark:bg-blue-600 rounded-full shadow"
      >
        {showRightSidebar ? <X className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
      </button>

      <div className="flex flex-grow h-full">
        {/* Left Sidebar */}
        <div ref={leftSidebarRef}>
          <ChatSidebar
            conversations={conversations}
            showSidebar={showLeftSidebar}
            onClose={() => setShowLeftSidebar(false)}
            onNewChat={handleNewChat}
            onOpenSettings={() => setShowSettings(true)}
            onDeleteConversation={deleteConversation}
            onSelectConversation={(convId) => {
              
              console.log("Selected conversation:", convId);
            }}
          />
        </div>

        {/* Main Chat Area, keyed by chatSessionKey */}
        <div key={chatSessionKey} className="flex-grow">
          <ChatContent
            chatSessionKey={chatSessionKey}
            imageUrl={imageUrl}
            toast={toast}
            showPrompts={showPrompts}
            setShowPrompts={setShowPrompts}
            predefinedPrompts={predefinedPrompts}
            promptIcons={promptIcons}
          />
        </div>

        {/* Right Sidebar */}
        <div
          ref={rightSidebarRef}
          className={`
            ${showRightSidebar ? "block" : "hidden"} 
            md:block fixed md:relative top-0 right-0 
            h-full w-[300px] p-4 
            bg-gray-50 dark:bg-gray-900 
            border-l border-gray-200 dark:border-gray-700 
            z-50
          `}
        >
          {/* Close button for mobile */}
          <div className="flex md:hidden justify-end mb-4">
            <button onClick={() => setShowRightSidebar(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mb-4">
            <div className="flex border-b border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 p-2 text-center ${
                  activeTab === "chat"
                    ? "border-b-2 border-blue-500 font-semibold"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                Tools
              </button>
              <button
                onClick={() => setActiveTab("module")}
                className={`flex-1 p-2 text-center ${
                  activeTab === "module"
                    ? "border-b-2 border-blue-500 font-semibold"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                Module
              </button>
            </div>
          </div>
          {activeTab === "chat" && <ImageUploader onUpload={(url) => setImageUrl(url)} />}
          {activeTab === "module" && <ModuleDownloader messages={[]} />}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onDeleteChats={handleDeleteChats}
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default ChatInterface;
