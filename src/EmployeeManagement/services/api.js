import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, ENDPOINTS } from '../config/api';

// GLOBAL REQUEST CONTROLLER
// This will ensure only one request can be made at a time across the entire app
const GlobalRequestController = {
  isRequestInProgress: false,
  queue: [],
  lastRequestTime: 0,
  MIN_REQUEST_INTERVAL: 10000, // 10 seconds between requests
  processingQueue: false,
  
  // Add a request to the queue
  enqueue(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  },
  
  // Process the next request in queue
  async processQueue() {
    if (this.processingQueue || this.queue.length === 0) return;
    
    this.processingQueue = true;
    
    // Wait if needed
    const now = Date.now();
    const timeToWait = Math.max(0, this.lastRequestTime + this.MIN_REQUEST_INTERVAL - now);
    
    if (timeToWait > 0) {
      console.log(`Waiting ${timeToWait}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    
    // Process next request
    const { requestFn, resolve, reject } = this.queue.shift();
    
    try {
      this.isRequestInProgress = true;
      this.lastRequestTime = Date.now();
      
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.isRequestInProgress = false;
      this.processingQueue = false;
      
      // Wait additional time before processing next request
      setTimeout(() => this.processQueue(), 1000);
    }
  }
};

// Cache implementation with longer lifetime
const cache = {
  data: {},
  timestamp: {},
  CACHE_LIFETIME: 300000 // 5 minutes
};

// Basic axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor to ensure full URL is HTTPS
api.interceptors.request.use(config => {
  // Force HTTPS
  if (config.url.includes('http://')) {
    config.url = config.url.replace('http://', 'https://');
  }
  
  // Add AdminToken from localStorage as bearer token if available
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    config.headers['Authorization'] = `Bearer ${adminToken}`;
  }
  
  return config;
});

// Function to get data with global queue, caching and throttling
const getWithCache = async (endpoint, errorMessage = 'Request failed') => {
  // Check cache first
  const cacheKey = endpoint;
  const now = Date.now();
  
  if (cache.data[cacheKey] && 
      (now - cache.timestamp[cacheKey] < cache.CACHE_LIFETIME)) {
    console.log(`Using cached data for ${endpoint}`);
    return cache.data[cacheKey];
  }
  
  // Add to global queue
  return GlobalRequestController.enqueue(async () => {
    console.log(`Making API request to ${endpoint}`);
    
    try {
      // Double check cache again before making actual request
      if (cache.data[cacheKey] && 
          (Date.now() - cache.timestamp[cacheKey] < cache.CACHE_LIFETIME)) {
        return cache.data[cacheKey];
      }
      
      // Use proper headers to avoid caching issues
      const response = await api.get(endpoint, {
        headers: {
          'Cache-Control': 'no-cache, no-store',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      // Cache successful response
      cache.data[cacheKey] = response.data;
      cache.timestamp[cacheKey] = Date.now();
      
      return response.data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error.message);
      
      if (error.response?.status === 429) {
        // For 429 errors, show notification and wait longer
        Swal.fire({
          icon: 'warning',
          title: 'Server Busy',
          text: 'The server is busy. Please try again in a few minutes.',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        
        // Slow down future requests
        GlobalRequestController.MIN_REQUEST_INTERVAL = 
          Math.min(60000, GlobalRequestController.MIN_REQUEST_INTERVAL * 1.5);
      } else if (!error.response) {
        console.error("Network error:", error.message);
      }
      
      // If we have previously cached data, return it as a last resort
      if (cache.data[cacheKey]) {
        console.log('Returning stale cached data due to error');
        return cache.data[cacheKey];
      }
      
      throw error;
    }
  });
};

// API functions
export const fetchTeamMembers = async () => {
  try {
    console.log("fetchTeamMembers called");
    const data = await getWithCache(ENDPOINTS.TEAM, 'Failed to fetch team members');
    return data.team || [];
  } catch (error) {
    // Try one last time with a direct request but with a longer delay
    console.error('All team data fetch attempts failed:', error);
    return [];
  }
};

export const createTeamMember = async (data) => {
  return GlobalRequestController.enqueue(async () => {
    try {
      const response = await api.post(ENDPOINTS.TEAM, data);
      
      // Clear the cache
      delete cache.data[ENDPOINTS.TEAM];
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Team member added successfully',
      });
      
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 'Failed to add team member',
      });
      throw error;
    }
  });
};

export const updateTeamMember = async (id, data) => {
  return GlobalRequestController.enqueue(async () => {
    try {
      const response = await api.put(`${ENDPOINTS.TEAM}${id}/`, data);
      
      // Clear the cache
      delete cache.data[ENDPOINTS.TEAM];
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Team member updated successfully',
      });
      
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 'Failed to update team member',
      });
      throw error;
    }
  });
};

export const deleteTeamMember = async (id) => {
  return GlobalRequestController.enqueue(async () => {
    try {
      await api.delete(`${ENDPOINTS.TEAM}${id}/`);
      
      // Clear the cache
      delete cache.data[ENDPOINTS.TEAM];
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Team member deleted successfully',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 'Failed to delete team member',
      });
      throw error;
    }
  });
}; 