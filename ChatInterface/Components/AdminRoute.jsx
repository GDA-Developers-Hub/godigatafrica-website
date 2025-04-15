import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../Utils/ChatBaseUrl';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);
  
  const checkAdminAuth = async () => {
    try {
      // Check if we have a token
      const token = localStorage.getItem('chatAdminToken');
      
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      // Configure headers
      const config = {
        headers: {
          'x-chat-admin-token': token
        }
      };
      
      // Verify token with backend
      const response = await axios.get(`${API_BASE_URL}/admin-auth/profile`, config);
      
      if (response.data.success) {
        setIsAdmin(true);
        
        // Update admin info in localStorage
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
      } else {
        // Try to refresh the token
        await refreshToken();
      }
    } catch (error) {
      console.error("Error checking admin authentication:", error);
      
      // If the error is unauthorized, try to refresh the token
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await refreshToken();
      } else {
        setIsAdmin(false);
        localStorage.removeItem('chatAdminToken');
        localStorage.removeItem('chatAdminRefreshToken');
        localStorage.removeItem('adminInfo');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('chatAdminRefreshToken');
      
      if (!refreshToken) {
        throw new Error("No refresh token");
      }
      
      const response = await axios.post(`${API_BASE_URL}/admin-auth/refresh-token`, {
        refreshToken
      });
      
      if (response.data.success) {
        // Store new tokens
        localStorage.setItem('chatAdminToken', response.data.chatAdminToken);
        localStorage.setItem('chatAdminRefreshToken', response.data.chatAdminRefreshToken);
        
        // Fetch admin profile with new token
        const profileResponse = await axios.get(`${API_BASE_URL}/admin-auth/profile`, {
          headers: {
            'x-chat-admin-token': response.data.chatAdminToken
          }
        });
        
        if (profileResponse.data.success) {
          localStorage.setItem('adminInfo', JSON.stringify(profileResponse.data.admin));
          setIsAdmin(true);
        } else {
          throw new Error("Failed to get admin profile");
        }
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAdmin(false);
      localStorage.removeItem('chatAdminToken');
      localStorage.removeItem('chatAdminRefreshToken');
      localStorage.removeItem('adminInfo');
    }
  };

  if (loading) {
    // Loading state - you could show a spinner here
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated as admin, redirect to login
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  // If authenticated as admin, render the protected content
  return children;
};

export default AdminRoute; 