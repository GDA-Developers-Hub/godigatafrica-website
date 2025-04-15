import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "ai/react"; 
import ChatMessage from "./ChatMessage"; 
import { Icons } from "./icons";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl";

function ChatContent({
  chatSessionKey,
  imageUrl,
  toast,
  showPrompts,
  setShowPrompts,
  predefinedPrompts,
  promptIcons,
  user, 
  
}) {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  // Load previous conversation
  useEffect(() => {
    if (user) {
      fetchChatHistoryFromDB();
    } else {
      loadChatFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatSessionKey]);

  // Fetch previous chats from local storage
  const loadChatFromLocalStorage = () => {
    const storedConvos = JSON.parse(localStorage.getItem("conversations")) || [];
    const currentChat = storedConvos.find((c) => c.id === chatSessionKey);
    setMessages(currentChat ? currentChat.messages : []);
  };

  // Fetch previous chats (messages) from the database
  const fetchChatHistoryFromDB = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conversations/${chatSessionKey}/messages`);
      setMessages(response.data.messages || []);
      setConversationId(chatSessionKey); // Using the chatSessionKey as the conversation ID
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format chat history for context (ignores for current answer but used as reference)
  const formatUserChatHistory = () => {
    const userMessages = messages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content);

    return userMessages.length > 0
      ? `History:\n${userMessages.join("\n")}\nPlease ignore these for your current answer but use them as reference.`
      : "";
  };

  // Create a new conversation if one doesn't exist (logged in users)
  const createNewConversation = async () => {
    if (!user) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/conversations/new`);
      setConversationId(response.data.conversationId);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setShowPrompts(false);
    await sendMessageToAI(input);
  };
  
  // Handle prompt click
  const handlePromptClick = (prompt) => {
    setInput(prompt);
    setShowPrompts(false);
  };

  // Send message to AI and update the UI
  const sendMessageToAI = async (userInput) => {
    setIsLoading(true);

    const userMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      // For logged in users
      if (user) {
        if (!conversationId) {
          await createNewConversation();
        }
        // Call the authenticated generate endpoint which also saves the AI response
        const response = await axios.post(`${API_BASE_URL}/chat/generate`, {
          conversationId,
          messages: updatedMessages,
        });
        const aiResponse = { role: "assistant", content: response.data.aiResponse };
        setMessages((prev) => [...prev, aiResponse]);
        // Save the sent AI message to the database
        saveChat([...updatedMessages, aiResponse]);
      } else {
        // For guest users, use the public generate endpoint and save to localStorage
        const response = await axios.post(`${API_BASE_URL}/chat/generate-public`, {
          messages: updatedMessages,
          imageUrl,
        });
        const aiResponse = { role: "assistant", content: response.data.aiResponse };
        setMessages((prev) => [...prev, aiResponse]);
        saveChat([...updatedMessages, aiResponse]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response.",
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save Chat (to DB for logged in users or to localStorage for guests)
  const saveChat = async (chatMessages) => {
    if (user) {
      if (!conversationId) return;
      try {
        await axios.post(`${API_BASE_URL}/chat/save-message`, {
          conversationId,
          role: chatMessages[chatMessages.length - 1].role,
          content: chatMessages[chatMessages.length - 1].content,
        });
      } catch (error) {
        console.error("Error saving chat:", error);
      }
    } else {
      const storedConvos = JSON.parse(localStorage.getItem("conversations")) || [];
      const updatedConvos = storedConvos.filter((c) => c.id !== chatSessionKey);
      updatedConvos.unshift({ id: chatSessionKey, messages: chatMessages, timestamp: Date.now() });
      localStorage.setItem("conversations", JSON.stringify(updatedConvos));
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full p-0 md:p-4 lg:p-4 h-12/12 overflow-y-auto">
      {/* Chat Messages */}
      <div className="flex-grow container bg-white dark:bg-gray-800 shadow p-4 sm:rounded-none md:rounded lg:rounded-lg"
          style={{ height: "calc(100vh - 400px)", overflowY: "auto" }}>

        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300">
            <div className="flex ">
             <Icons.solution className="h-12 w-12 mx-auto mb-3" /> <span className="font-bold">NEXUS</span>
            </div>
            <h3 className="font-bold text-xl">
              Welcome to Go Digital's Alpha Ai model
            </h3>
            <p>
            Ask your software questions, request software solutions, or generate complete AI-tailored solutions.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />

        {/* Predefined Prompts */}
        {showPrompts && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {predefinedPrompts.map((prompt, idx) => {
              const Icon = promptIcons[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="p-4 bg-white dark:bg-gray-800 mt-5 shadow shadow-amber-100 rounded cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 text-blue-500 mr-2">
                      <Icon size={24} />
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{prompt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={onSubmit} className="m-3 relative">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask your software solutions query..."
          className="w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white p-3 pl-7.5 pr-12 border border-gray-300 dark:border-gray-600 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-blue-500"
          style={{ minHeight: "60px", maxHeight: "200px" }}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e); 
            }
          }}
          
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white p-4 rounded-full disabled:opacity-50"
        >
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatContent;
