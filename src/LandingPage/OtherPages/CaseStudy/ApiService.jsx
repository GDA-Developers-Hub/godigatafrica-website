import { BASE_URL } from "../../../Utils/BaseUrl";

const cache = new Map();
const pendingRequests = new Map();

const config = {
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
  useCache: true,
  maxRetries: 3,
  initialBackoff: 1000, // 1 second
};

/**
 * Handles API requests with advanced rate limiting handling
 * @param {string} endpoint - 
 * @param {Object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    useCache = config.useCache,
    skipCache = false,
  } = options;

  const cacheKey = `${method}:${endpoint}:${body ? JSON.stringify(body) : ""}`;
  
  // Return cached response if available and not expired
  if (method === "GET" && useCache && !skipCache) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const fetchData = async (retryCount = 0, backoff = config.initialBackoff) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();

      if (response.ok) {
        if (method === "GET" && useCache) {
          cache.set(cacheKey, {
            data,
            expiry: Date.now() + config.cacheExpiry,
          });
        }
        return data;
      }

      // Handle rate limiting
      if (response.status === 429) {
        let retryAfter = 30; 
        
        if (data && data.detail && typeof data.detail === "string") {
          const match = data.detail.match(/Expected available in (\d+) seconds/);
          if (match && match[1]) {
            retryAfter = parseInt(match[1], 10);
          }
        }
        
        // Use response headers if available
        if (response.headers.get("Retry-After")) {
          retryAfter = parseInt(response.headers.get("Retry-After"), 10);
        }

        // Calculate delay with exponential backoff
        const delayMs = Math.max(retryAfter * 1000, backoff);
        
        if (retryCount < config.maxRetries) {
          // Wait and retry
          await new Promise(resolve => setTimeout(resolve, delayMs));
          
          // Retry with increased backoff
          return fetchData(
            retryCount + 1, 
            Math.min(backoff * 2, 60000) // Cap at 1 minute
          );
        }
      }

      // If we reach here, it's an error we can't handle
      throw new Error(data.detail || `Request failed with status ${response.status}`);
    } catch (error) {
      if (retryCount < config.maxRetries && !error.message.includes("Failed with status")) {
        // For network errors, retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchData(
          retryCount + 1, 
          Math.min(backoff * 2, 60000)
        );
      }
      throw error;
    }
  };

  // Create the promise and store it for deduplication
  const requestPromise = fetchData();
  pendingRequests.set(cacheKey, requestPromise);
  
  try {
    // Execute the request
    const result = await requestPromise;
    pendingRequests.delete(cacheKey);
    return result;
  } catch (error) {
    pendingRequests.delete(cacheKey);
    throw error;
  }
};

/**
 * Get case studies with better error handling
 */
export const getCaseStudies = () => {
  return apiRequest("/case-studies");
};

/**
 * Get case study by ID with better error handling
 */
export const getCaseStudyById = (id) => {
  return apiRequest(`/case-studies/${id}/`);
};

/**
 * Clear cached data
 */
export const clearCache = () => {
  cache.clear();
};

/**
 * Configure API client settings
 */
export const configureApi = (newConfig) => {
  Object.assign(config, newConfig);
};