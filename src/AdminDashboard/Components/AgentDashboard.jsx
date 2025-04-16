import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl.jsx";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Trash2,
  Edit,
  Search,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  LogOut,
  ChevronDown,
  Filter,
  ShieldAlert,
  User,
  UserCog
} from "lucide-react";
import Swal from "sweetalert2";

const AgentDashboard = () => {
  // Debug API base URL
  // console.log("AgentDashboard: API_BASE_URL =", API_BASE_URL);

  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showEditAgentModal, setShowEditAgentModal] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [activeAgents, setActiveAgents] = useState(0);
  const [busyAgents, setBusyAgents] = useState(0);
  const [offlineAgents, setOfflineAgents] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin"
  });
  const [showAdminSection, setShowAdminSection] = useState(false);
  const navigate = useNavigate();

 // Form state for add/edit
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  username: "",
  fullName: "",
  agentName: "",
  status: "offline"
});
  // Check if user is a super admin
  useEffect(() => {
    try {
      console.log("AgentDashboard: Checking admin status from localStorage");
      // Get admin info from localStorage 
      const storedAdminInfo = localStorage.getItem("adminInfo");
      if (storedAdminInfo) {
        const admin = JSON.parse(storedAdminInfo);
        console.log("AgentDashboard: Admin info retrieved:", {
          id: admin.id,
          username: admin.username,
          role: admin.role || admin.is_superadmin ? 'superadmin' : 'admin'
        });
        setAdminInfo(admin);
        // Check if the admin has super admin role
        const isSuperAdminUser = admin.role === "superadmin" || admin.is_superadmin === true;
        console.log("AgentDashboard: Is superadmin:", isSuperAdminUser);
        setIsSuperAdmin(isSuperAdminUser);
      } else {
        console.log("AgentDashboard: No admin info in localStorage, redirecting to login");
        setIsSuperAdmin(false);
        navigate("/admin/agent-admin/login");
      }
    } catch (err) {
      console.error("AgentDashboard: Error checking admin status:", err);
      setIsSuperAdmin(false);
      navigate("/admin/agent-admin/login");
    }
  }, [navigate]);

  // Check if user is super admin and load admin section - allow any admin to view sections
  useEffect(() => {
    // Only fetch admins if authentication is established
    if (adminInfo) {
      console.log("AgentDashboard: Loading initial view, fetching admins data");
      fetchAdmins();
    }
    
    // Default to agent management view
    setShowAdminSection(false);
  }, [adminInfo, navigate]);

 /// Fetch agents data with enhanced logging
useEffect(() => {
  const fetchAgents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[Frontend] Starting fetchAgents...");

      // Verify API_BASE_URL is available
      if (!API_BASE_URL) {
        console.error("[Frontend] API_BASE_URL is undefined or empty");
        setError("API configuration error. Please contact support.");
        return;
      }

      // Get admin token and log its presence (but not the full token for security)
      const token = localStorage.getItem("chatAdminToken");
      if (!token) {
        console.warn("[Frontend] No chatAdminToken found in localStorage.");
        setError("Authentication token missing. Please login again.");
        navigate("/admin/agent-admin/login");
        return;
      } else {
        console.log("[Frontend] Admin token found. Token length:", token.length);
      }

      // Configure headers with the token
      const config = {
        headers: {
          'x-chat-admin-token': token
        }
      };

      // Log the API endpoint before making the call
      const endpoint = `${API_BASE_URL}/admin-agent/agents`;
      console.log("[Frontend] Sending GET request to:", endpoint, "API_BASE_URL:", API_BASE_URL);

      // Make the API request
      const response = await axios.get(endpoint, config);
      console.log("[Frontend] Received response with status:", response.status);
      console.log("[Frontend] Response data:", response.data);

      if (response.data.success) {
        console.log("[Frontend] Agents fetched successfully. Count:", response.data.agents.length);
        setAgents(response.data.agents);
        setFilteredAgents(response.data.agents);

        // Count agent statuses for logging/debugging
        const activeCount = response.data.agents.filter(a => a.status === 'online').length;
        const busyCount = response.data.agents.filter(a => a.status === 'busy').length;
        const offlineCount = response.data.agents.filter(a => a.status === 'offline').length;
        console.log("[Frontend] Agent status counts:", { online: activeCount, busy: busyCount, offline: offlineCount });

        setActiveAgents(activeCount);
        setBusyAgents(busyCount);
        setOfflineAgents(offlineCount);
      } else {
        console.error("[Frontend] API responded with success false:", response.data.message);
        setError(response.data.message || "Failed to fetch agents");
      }
    } catch (err) {
      console.error("[Frontend] Error fetching agents:", err);
      console.error("[Frontend] Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message
      });
      
      if (err.response?.status === 401) {
        console.warn("[Frontend] Authentication error detected. Redirecting to login.");
        localStorage.removeItem("chatAdminToken");
        localStorage.removeItem("chatAdminRefreshToken");
        localStorage.removeItem("adminInfo");
        navigate("/admin/agent-admin/login");
        return;
      }
      
      setError(err.response?.data?.message || "Failed to fetch agents. " + (err.message || ""));
    } finally {
      setIsLoading(false);
      console.log("[Frontend] fetchAgents completed.");
    }
  };

  if (adminInfo) {
    fetchAgents();
  }
}, [refreshTrigger, adminInfo, navigate, API_BASE_URL]);

  // Filter agents based on search term and status filter
  useEffect(() => {
    if (!agents.length) return;

    let filtered = [...agents];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        agent => 
          agent.agent_name.toLowerCase().includes(term) || 
          agent.email.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(agent => agent.status === statusFilter);
    }
    
    setFilteredAgents(filtered);
  }, [searchTerm, statusFilter, agents]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add new agent with superadmin check
  const handleAddAgent = async (e) => {
    e.preventDefault();
    
    // Check if user is super admin
    if (!isSuperAdmin) {
      console.log("AgentDashboard: Add agent attempt by non-superadmin");
      Swal.fire({
        title: 'Permission Denied',
        text: "Only Super Admins can add agents",
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }
    
    try {
      console.log("AgentDashboard: Adding new agent with data:", {
        email: formData.email,
        username: formData.username,
        fullName: formData.fullName,
        agentName: formData.agentName,
        status: formData.status,
        passwordLength: formData.password?.length || 0
      });
      
      const token = localStorage.getItem("chatAdminToken");
      console.log("AgentDashboard: Admin token present:", !!token);
      
      // Create agent data matching the database schema and API expectations
      const agentData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        fullName: formData.fullName,
        agentName: formData.agentName,
        status: formData.status
      };
      
      // Use the correct endpoint for admin registering an agent
      console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin-agent/register-agent`);
      const response = await axios.post(
        `${API_BASE_URL}/admin-agent/register-agent`,  
        agentData,
        {
          headers: {
            'x-chat-admin-token': token
          }
        }
      );
      
      console.log("AgentDashboard: Agent registration response:", {
        status: response.status,
        success: response.data.success,
        message: response.data.message
      });
      
      if (response.data.success) {
        console.log("AgentDashboard: Agent added successfully");
        Swal.fire({
          title: 'Success!',
          text: 'Agent has been added successfully.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff'
        });
        
        setShowAddAgentModal(false);
        setFormData({
          email: "",
          password: "",
          username: "",
          fullName: "",
          agentName: "",
          status: "offline"
        });
        
        // Refresh agents list
        setRefreshTrigger(prev => prev + 1);
      } else {
        console.error("AgentDashboard: Failed to add agent:", response.data.message);
        Swal.fire({
          title: 'Error!',
          text: response.data.message || 'Failed to add agent',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    } catch (err) {
      console.error("AgentDashboard: Error adding agent:", err);
      console.error("AgentDashboard: Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message
      });
      
      // If permission denied from server, show appropriate message
      if (err.response?.status === 403) {
        Swal.fire({
          title: 'Permission Denied',
          text: "You don't have permission to add new agents",
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Failed to add agent',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  // Edit agent with superadmin check
  const handleEditAgent = async (e) => {
    e.preventDefault();
    
    // Check if user is super admin - safety check even though button is hidden
    if (!isSuperAdmin) {
      console.log("AgentDashboard: Edit agent attempt by non-superadmin");
      Swal.fire({
        title: 'Permission Denied',
        text: "Only Super Admins can update agents",
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }
    
    try {
      console.log("AgentDashboard: Editing agent with ID:", currentAgent.id);
      console.log("AgentDashboard: Edit data:", {
        agentName: formData.agentName,
        status: formData.status
      });
      
      const token = localStorage.getItem("chatAdminToken");
      console.log("AgentDashboard: Admin token present:", !!token);
      
      // Configure headers
      const config = {
        headers: {
          'x-chat-admin-token': token
        }
      };
      
      // Update with only the agent_name and status fields to match schema
      const updateData = {
        agent_name: formData.agentName,
        status: formData.status
      };
      
      // Use the correct admin-agent endpoint
      console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin-agent/agent/${currentAgent.id}`);
      const response = await axios.put( 
        `${API_BASE_URL}/admin-agent/agent/${currentAgent.id}`,  
        updateData,
        config
      );
      
      console.log("AgentDashboard: Edit agent response:", {
        status: response.status,
        success: response.data.success,
        message: response.data.message
      });
      
      if (response.data.success) {
        console.log("AgentDashboard: Agent updated successfully");
        Swal.fire({
          title: 'Success!',
          text: 'Agent has been updated successfully.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff'
        });
        
        setShowEditAgentModal(false);
        setCurrentAgent(null);
        
        // Refresh agents list
        setRefreshTrigger(prev => prev + 1);
      } else {
        console.error("AgentDashboard: Failed to update agent:", response.data.message);
        Swal.fire({
          title: 'Error!',
          text: response.data.message || 'Failed to update agent',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    } catch (err) {
      console.error("AgentDashboard: Error updating agent:", err);
      console.error("AgentDashboard: Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message
      });
      
      // If permission denied from server, show appropriate message
      if (err.response?.status === 403) {
        Swal.fire({
          title: 'Permission Denied',
          text: "You don't have permission to update agents",
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Failed to update agent',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  // Open edit modal
  const openEditModal = (agent) => {
    console.log("AgentDashboard: Opening edit modal for agent:", {
      id: agent.id,
      name: agent.agent_name,
      status: agent.status
    });
    
    setCurrentAgent(agent);
    setFormData({
      agentName: agent.agent_name,
      status: agent.status
    });
    setShowEditAgentModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'online':
        return (
          <span className="flex items-center gap-1 text-green-500 bg-green-900/30 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Online
          </span>
        );
      case 'busy':
        return (
          <span className="flex items-center gap-1 text-yellow-500 bg-yellow-900/30 px-2 py-1 rounded-full text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            Busy
          </span>
        );
      case 'offline':
      default:
        return (
          <span className="flex items-center gap-1 text-gray-400 bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="h-3 w-3" />
            Offline
          </span>
        );
    }
  };

  // Handle admin logout with API call
  const handleAdminLogout = async () => {
    console.log("AgentDashboard: Showing logout confirmation");
    Swal.fire({
      title: 'Logout Confirmation',
      text: "Are you sure you want to log out?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      background: '#1f2937',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("AgentDashboard: Logout confirmed");
        try {
          // Get token
          const token = localStorage.getItem("chatAdminToken");
          console.log("AgentDashboard: Admin token present:", !!token);
          
          if (token) {
            // Configure headers
            const config = {
              headers: {
                'x-chat-admin-token': token
              }
            };
            
            console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin-auth/logout`);
            // Call logout endpoint
            const response = await axios.post(`${API_BASE_URL}/admin-auth/logout`, {}, config);
            console.log("AgentDashboard: Logout response:", {
              status: response.status,
              success: response.data.success
            });
          }
        } catch (error) {
          console.error("AgentDashboard: Logout error:", error);
          console.error("AgentDashboard: Error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.response?.data?.message
          });
        } finally {
          console.log("AgentDashboard: Clearing local storage and redirecting to login");
          // Clear local storage
          localStorage.removeItem("chatAdminToken");
          localStorage.removeItem("chatAdminRefreshToken");
          localStorage.removeItem("adminInfo");
          
          // Redirect to login
          navigate("/admin/agent-admin/login");
        }
      } else {
        console.log("AgentDashboard: Logout cancelled by user");
      }
    });
  };
  
  // Fetch admins (super admin only)
  const fetchAdmins = async () => {
    try {
      console.log("AgentDashboard: Fetching admins list");
      // Check API base URL 
      if (!API_BASE_URL) {
        console.error("AgentDashboard: API_BASE_URL is undefined or empty");
        return;
      }
      console.log("AgentDashboard: API_BASE_URL:", API_BASE_URL);
      
      // Get token
      const token = localStorage.getItem("chatAdminToken");
      if (!token) {
        console.warn("AgentDashboard: No chatAdminToken found in localStorage.");
        return;
      }
      
      console.log("AgentDashboard: Admin token present:", !!token);
      
      // Configure headers
      const config = {
        headers: {
          'x-chat-admin-token': token
        }
      };
      
      const endpoint = `${API_BASE_URL}/admin`;
      console.log("AgentDashboard: Making API request to:", endpoint);
      // Fetch admins
      const response = await axios.get(endpoint, config);
      
      console.log("AgentDashboard: Admins fetch response:", {
        status: response.status,
        success: response.data.success,
        count: response.data.admins?.length || 0
      });
      
      if (response.data.success) {
        console.log("AgentDashboard: Admins fetched successfully");
        setAdmins(response.data.admins);
      } else {
        console.error("AgentDashboard: Failed to fetch admins:", response.data.message);
      }
    } catch (error) {
      console.error("AgentDashboard: Error fetching admins:", error);
      console.error("AgentDashboard: Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message
      });
      
      // If forbidden, hide admin section
      if (error.response && error.response.status === 403) {
        console.log("AgentDashboard: Access forbidden, hiding admin section");
        setShowAdminSection(false);
      }
      
      // Check for auth errors and redirect if necessary
      if (error.response?.status === 401) {
        console.warn("AgentDashboard: Auth error in fetchAdmins. Redirecting to login.");
        localStorage.removeItem("chatAdminToken");
        localStorage.removeItem("chatAdminRefreshToken");
        localStorage.removeItem("adminInfo");
        navigate("/admin/agent-admin/login");
      }
    }
  };
  
  // Handle admin registration
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check for superadmin status even though button is hidden for non-superadmins
    if (!isSuperAdmin) {
      console.log("AgentDashboard: Register admin attempt by non-superadmin");
      Swal.fire({
        title: 'Permission Denied',
        text: "Only Super Admins can register new admins",
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }
    
    try {
      console.log("AgentDashboard: Registering new admin with data:", {
        username: adminFormData.username,
        email: adminFormData.email,
        role: adminFormData.role,
        passwordLength: adminFormData.password?.length || 0
      });
      
      // Get token
      const token = localStorage.getItem("chatAdminToken");
      console.log("AgentDashboard: Admin token present:", !!token);
      
      // Configure headers
      const config = {
        headers: {
          'x-chat-admin-token': token
        }
      };
      
      console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin-auth/register`);
      // Register admin
      const response = await axios.post(
        `${API_BASE_URL}/admin-auth/register`,
        adminFormData,
        config
      );
      
      console.log("AgentDashboard: Admin registration response:", {
        status: response.status,
        success: response.data.success,
        message: response.data.message
      });
      
      if (response.data.success) {
        console.log("AgentDashboard: Admin registered successfully");
        Swal.fire({
          title: 'Success!',
          text: 'Admin registered successfully.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff'
        });
        
        // Reset form and close modal
        setAdminFormData({
          username: "",
          email: "",
          password: "",
          role: "admin"
        });
        setShowAdminModal(false);
        
        // Refresh admins list
        fetchAdmins();
      }
    } catch (error) {
      console.error("AgentDashboard: Error registering admin:", error);
      console.error("AgentDashboard: Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message
      });
      
      // If permission denied from server, show appropriate message
      if (error.response?.status === 403) {
        Swal.fire({
          title: 'Permission Denied',
          text: "You don't have permission to register new admins",
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to register admin',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };
  
  // Handle admin form input changes
  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Delete admin
  const handleDeleteAdmin = async (adminId) => {
    // Safety check for superadmin status even though button is hidden for non-superadmins
    if (!isSuperAdmin) {
      console.log("AgentDashboard: Delete admin attempt by non-superadmin");
      Swal.fire({
        title: 'Permission Denied',
        text: "Only Super Admins can delete admins",
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }

    console.log("AgentDashboard: Showing delete confirmation for admin ID:", adminId);
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete admin!',
      background: '#1f2937',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("AgentDashboard: Deleting admin with ID:", adminId);
          // Get token
          const token = localStorage.getItem("chatAdminToken");
          console.log("AgentDashboard: Admin token present:", !!token);
          
          // Configure headers
          const config = {
            headers: {
              'x-chat-admin-token': token
            }
          };
          
          console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin/${adminId}`);
          // Delete admin
          const response = await axios.delete(`${API_BASE_URL}/admin/${adminId}`, config);
          
          console.log("AgentDashboard: Delete admin response:", {
            status: response.status,
            success: response.data.success,
            message: response.data.message
          });
          
          if (response.data.success) {
            console.log("AgentDashboard: Admin deleted successfully");
            Swal.fire({
              title: 'Deleted!',
              text: 'Admin has been deleted.',
              icon: 'success',
              background: '#1f2937',
              color: '#fff'
            });
            
            // Refresh admins list
            fetchAdmins();
          }
        } catch (error) {
          console.error("AgentDashboard: Error deleting admin:", error);
          console.error("AgentDashboard: Error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.response?.data?.message
          });
          
          // If permission denied from server, show appropriate message
          if (error.response?.status === 403) {
            Swal.fire({
              title: 'Permission Denied',
              text: "You don't have permission to delete admins",
              icon: 'error',
              background: '#1f2937',
              color: '#fff'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: error.response?.data?.message || 'Failed to delete admin',
              icon: 'error',
              background: '#1f2937',
              color: '#fff'
            });
          }
        }
      } else {
        console.log("AgentDashboard: Delete admin cancelled by user");
      }
    });
  };

  // Delete agent function with proper authentication
  const handleDeleteAgent = async (agentId) => {
    // Check if user is super admin - this is a safety check even though the button is hidden
    if (!isSuperAdmin) {
      console.log("AgentDashboard: Delete agent attempt by non-superadmin");
      Swal.fire({
        title: 'Permission Denied',
        text: "Only Super Admins can delete agents",
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }
    
    console.log("AgentDashboard: Showing delete confirmation for agent ID:", agentId);
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete agent!',
      background: '#1f2937',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("AgentDashboard: Deleting agent with ID:", agentId);
          // Get token
          const token = localStorage.getItem("chatAdminToken");
          console.log("AgentDashboard: Admin token present:", !!token);
          
          // Configure headers with admin token
          const config = {
            headers: {
              'x-chat-admin-token': token
            }
          };
          
          // Use the correct admin-agent endpoint
          console.log("AgentDashboard: Making API request to:", `${API_BASE_URL}/admin-agent/agent/${agentId}`);
          // Delete agent - make sure this matches your backend endpoint
          const response = await axios.delete(`${API_BASE_URL}/admin-agent/agent/${agentId}`, config);
          
          console.log("AgentDashboard: Delete agent response:", {
            status: response.status,
            success: response.data.success,
            message: response.data.message
          });
          
          if (response.data.success) {
            console.log("AgentDashboard: Agent deleted successfully");
            Swal.fire({
              title: 'Deleted!',
              text: 'Agent has been deleted.',
              icon: 'success',
              background: '#1f2937',
              color: '#fff'
            });
            
            // Refresh agents list
            setRefreshTrigger(prev => prev + 1);
          } else {
            console.error("AgentDashboard: Failed to delete agent:", response.data.message);
            Swal.fire({
              title: 'Error!',
              text: response.data.message || 'Failed to delete agent',
              icon: 'error',
              background: '#1f2937',
              color: '#fff'
            });
          }
        } catch (err) {
          console.error("AgentDashboard: Error deleting agent:", err);
          console.error("AgentDashboard: Error details:", {
            status: err.response?.status,
            statusText: err.response?.statusText,
            message: err.response?.data?.message
          });
          
          // If permission denied from server, show appropriate message
          if (err.response?.status === 403) {
            Swal.fire({
              title: 'Permission Denied',
              text: "You don't have permission to delete agents",
              icon: 'error',
              background: '#1f2937',
              color: '#fff'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: err.response?.data?.message || 'Failed to delete agent',
              icon: 'error',
              background: '#1f2937',
              color: '#fff'
            });
          }
        }
      } else {
        console.log("AgentDashboard: Delete agent cancelled by user");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold flex items-center">
              {/* Current section icon */}
              {showAdminSection ? (
                <UserCog className="mr-2 h-6 w-6 text-blue-500" />
              ) : (
                <Users className="mr-2 h-6 w-6 text-blue-500" />
              )}
              
              {/* Section title */}
              {showAdminSection ? 'Admin Management' : 'Agent Management'}
              
              {/* Super admin badge */}
              {isSuperAdmin && (
                <span className="ml-3 flex items-center text-sm font-medium text-green-500 bg-green-900/30 px-2 py-1 rounded-full">
                  <ShieldAlert className="h-4 w-4 mr-1" />
                  Super Admin
                </span>
              )}
            </h1>
            
            {/* Section toggle button - available to all admins */}
            <button
              onClick={() => setShowAdminSection(!showAdminSection)}
              className="ml-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg flex items-center text-sm"
            >
              {showAdminSection ? (
                <>
                  <Users className="h-4 w-4 mr-1" />
                  Switch to Agent Management
                </>
              ) : (
                <>
                  <UserCog className="h-4 w-4 mr-1" />
                  Switch to Admin Management
                </>
              )}
            </button>
          </div>
          
          {/* User info and logout */}
          <div className="flex space-x-3">
            <span className="text-gray-400 self-center mr-2">
              {adminInfo?.username || "Admin"}
              {isSuperAdmin ? " (Super Admin)" : " (Admin)"}
            </span>
            <button
              onClick={handleAdminLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {showAdminSection ? (
          // Admin management section
          <div className="p-6">
            {/* Admin stats */}
            <div className="mb-6">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Admins</p>
                    <h3 className="text-2xl font-bold">{admins.length}</h3>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <UserCog className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Admin controls */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Admin Users</h2>
              {isSuperAdmin && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
                  onClick={() => setShowAdminModal(true)}
                >
                  <UserPlus className="h-5 w-5 mr-1" />
                  Add New Admin
                </button>
              )}
            </div>
            
            {/* Admin table */}
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Created By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Created At
                      </th>
                      {isSuperAdmin && (
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{admin.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{admin.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`
                            flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                            ${admin.role === 'superadmin' 
                              ? 'text-purple-500 bg-purple-900/30' 
                              : 'text-blue-500 bg-blue-900/30'
                            }
                          `}>
                            <ShieldAlert className="h-3 w-3" />
                            {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{admin.created_by_username || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{formatDate(admin.created_at)}</div>
                        </td>
                        {isSuperAdmin && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* Don't allow deleting your own account or the last super admin */}
                            {admin.id !== adminInfo?.id && (
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                className="text-red-500 hover:text-red-400 bg-red-900/20 p-2 rounded-lg"
                                title="Delete Admin"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // Agent management section
          <>
            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Total agents card */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Agents</p>
                    <h3 className="text-2xl font-bold">{agents.length}</h3>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Online agents card */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Online Agents</p>
                    <h3 className="text-2xl font-bold text-green-500">{activeAgents}</h3>
                  </div>
                  <div className="p-3 bg-green-900/30 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Busy agents card */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Busy Agents</p>
                    <h3 className="text-2xl font-bold text-yellow-500">{busyAgents}</h3>
                  </div>
                  <div className="p-3 bg-yellow-900/30 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Offline agents card */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Offline Agents</p>
                    <h3 className="text-2xl font-bold text-gray-400">{offlineAgents}</h3>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <XCircle className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search bar */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Search agents by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status filter */}
              <div className="md:w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              {/* Add agent button - only for super admins */}
              {isSuperAdmin && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg flex items-center justify-center"
                  onClick={() => setShowAddAgentModal(true)}
                >
                  <UserPlus className="h-5 w-5 mr-1" />
                  Add New Agent
                </button>
              )}

              {/* Refresh button - for all users */}
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center"
                onClick={() => setRefreshTrigger(prev => prev + 1)}
              >
                <RefreshCw className="h-5 w-5 mr-1" />
                Refresh
              </button>
            </div>

            {/* Agents table */}
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                  <p>{error}</p>
                </div>
              ) : filteredAgents.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-gray-400">
                  <p>No agents found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Agent Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created At
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Last Active
                        </th>
                        {isSuperAdmin && (
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{agent.agent_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{agent.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(agent.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{formatDate(agent.created_at)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{formatDate(agent.updated_at)}</div>
                          </td>
                          {isSuperAdmin && (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => openEditModal(agent)}
                                  className="text-blue-500 hover:text-blue-400 bg-blue-900/20 p-2 rounded-lg"
                                  title="Edit Agent"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAgent(agent.id)}
                                  className="text-red-500 hover:text-red-400 bg-red-900/20 p-2 rounded-lg"
                                  title="Delete Agent"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

     {/* Add Agent Modal */}
     {showAddAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-blue-500" />
                Add New Agent
              </h2>
              <button
                onClick={() => setShowAddAgentModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddAgent}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Agent Name (Display Name)
                  </label>
                  <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddAgentModal(false)}
                  className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {showEditAgentModal && currentAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Edit className="mr-2 h-5 w-5 text-blue-500" />
                Edit Agent
              </h2>
              <button
                onClick={() => setShowEditAgentModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditAgent}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Agent Name (Display Name)
                  </label>
                  <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditAgentModal(false)}
                  className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Registration Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-blue-500" />
                Add New Admin
              </h2>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdminSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={adminFormData.username}
                    onChange={handleAdminInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={adminFormData.email}
                    onChange={handleAdminInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={adminFormData.password}
                    onChange={handleAdminInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={adminFormData.role}
                    onChange={handleAdminInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Regular Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Register Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard; 