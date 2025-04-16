import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl";

// Create context
const AgentAuthContext = createContext();

// Provider component
export const AgentAuthProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create axios instance with auth header
  const authAxios = axios.create({
    baseURL: API_BASE_URL
  });

  // Add auth token to all requests
  authAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("agentToken");
      if (token) {
        // Use the correct token header name expected by the backend
        config.headers["x-auth-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // On mount, check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log("AgentAuthContext: Checking login status");
      try {
        const token = localStorage.getItem("agentToken");
        console.log("AgentAuthContext: Token found:", !!token);
        
        if (!token) {
          console.log("AgentAuthContext: No token found");
          setLoading(false);
          return;
        }

        // Try to get cached agent info first for immediate UI feedback
        const cachedAgentInfo = localStorage.getItem("agentInfo");
        if (cachedAgentInfo) {
          try {
            const parsedInfo = JSON.parse(cachedAgentInfo);
            console.log("AgentAuthContext: Using cached agent info:", parsedInfo);
            setAgent(parsedInfo);
          } catch (e) {
            console.error("AgentAuthContext: Error parsing cached agent info", e);
          }
        }

        // Verify token and get agent data
        console.log("AgentAuthContext: Verifying token with server");
        
        // Make direct call with token header to verify - use the exact header name expected by backend
        const res = await axios.get(`${API_BASE_URL}/agent-auth/profile`, {
          headers: {
            'x-auth-token': token // This must match the backend's expected header name
          }
        });
        
        if (res.data.success) {
          console.log("AgentAuthContext: Token verified, agent data:", res.data.agent);
          
          // Update agent state with the agent data from the response
          setAgent(res.data.agent);
          
          // Update cached info with the latest data
          localStorage.setItem("agentInfo", JSON.stringify(res.data.agent));
        } else {
          // Invalid token
          console.log("AgentAuthContext: Invalid token response");
          localStorage.removeItem("agentToken");
          localStorage.removeItem("agentInfo");
          setAgent(null);
        }
      } catch (err) {
        console.error("AgentAuthContext: Error verifying auth token:", err);
        // Clear storage on error
        localStorage.removeItem("agentToken");
        localStorage.removeItem("agentInfo");
        setAgent(null);
        setError("Authentication failed. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login with:", email);
      const res = await axios.post(`${API_BASE_URL}/agent-auth/login`, {
        email,
        password
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        // Store token
        localStorage.setItem("agentToken", res.data.token);
        
        // The agent-auth/login endpoint returns user data with agentId and agentName 
        // according to backend implementation
        const userData = res.data.user;
        localStorage.setItem("agentInfo", JSON.stringify(userData));
        
        // Set agent state
        setAgent(userData);
        
        console.log("Login successful, agent info stored:", userData);
        return { success: true };
      } else {
        console.log("Login failed:", res.data.message);
        setError(res.data.message || "Login failed. Please check your credentials.");
        return { 
          success: false, 
          error: res.data.message || "Login failed" 
        };
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      console.log("Error message:", errorMessage);
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("agentToken");
      
      if (token) {
        console.log("Sending logout request");
        
        // Use direct axios call with proper authentication header
        await axios.post(
          `${API_BASE_URL}/agent-auth/logout`, 
          {},
          {
            headers: {
              'x-auth-token': token
            }
          }
        );
        
        console.log("Logout successful");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      // Clear local storage and state
      localStorage.removeItem("agentToken");
      localStorage.removeItem("agentInfo");
      setAgent(null);
      setLoading(false);
    }
  };

  // Update agent status
  const updateStatus = async (status) => {
    console.log(`Updating agent status to: ${status}`);
    
    try {
      const token = localStorage.getItem("agentToken");
      
      if (!token) {
        console.error("No auth token found for status update");
        return { success: false, error: "Not authenticated" };
      }

      console.log(`Sending status update request to /agent/status`);
      
      // Use the correct endpoint with proper authentication
      const res = await axios.put(
        `${API_BASE_URL}/agent/status`, 
        { status },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      console.log("Status update response:", res.data);
      
      if (res.data.success) {
        // Update local state
        setAgent(prev => {
          const updated = { ...prev, status };
          console.log("Updated agent state:", updated);
          return updated;
        });
        return { success: true };
      } else {
        console.error("Status update failed:", res.data.message);
        return { success: false, error: res.data.message || "Failed to update status" };
      }
    } catch (err) {
      console.error("Error updating agent status:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to update status" 
      };
    }
  };

  return (
    <AgentAuthContext.Provider
      value={{
        agent,
        loading,
        error,
        login,
        logout,
        updateStatus,
        isAuthenticated: !!agent
      }}
    >
      {children}
    </AgentAuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAgentAuth = () => {
  const context = useContext(AgentAuthContext);
  if (!context) {
    throw new Error("useAgentAuth must be used within an AgentAuthProvider");
  }
  return context;
};

export default AgentAuthContext; 