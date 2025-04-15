import axios from 'axios';
import { API_BASE_URL } from '../../Utils/ChatBaseUrl';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    // Determine which token to use based on the endpoint
    if (config.url.includes('/admin') || config.url.includes('/admin-auth')) {
      const adminToken = localStorage.getItem('chatAdminToken');
      if (adminToken) {
        config.headers['x-chat-admin-token'] = adminToken;
      }
    } else if (config.url.includes('/agent') || config.url.includes('/agent-auth')) {
      const agentToken = localStorage.getItem('agentToken');
      if (agentToken) {
        config.headers['x-auth-token'] = agentToken;
      }
    } else {
      // For regular user endpoints
      const userToken = localStorage.getItem('userId');
      if (userToken) {
        config.headers['x-auth-token'] = userToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error cases
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle admin token refresh
    if (error.response?.status === 401 && 
        (originalRequest.url.includes('/admin') || originalRequest.url.includes('/admin-auth')) && 
        !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('chatAdminRefreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/admin-auth/refresh-token`, { 
            refreshToken 
          });
          
          if (response.data.success) {
            localStorage.setItem('chatAdminToken', response.data.chatAdminToken);
            localStorage.setItem('chatAdminRefreshToken', response.data.chatAdminRefreshToken);
            
            // Update the authorization header
            originalRequest.headers['x-chat-admin-token'] = response.data.chatAdminToken;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Error refreshing admin token:', refreshError);
        // Clear tokens on refresh failure
        localStorage.removeItem('chatAdminToken');
        localStorage.removeItem('chatAdminRefreshToken');
        localStorage.removeItem('adminInfo');
        
        // Redirect to login
        window.location.href = '/admin/agent-admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 
