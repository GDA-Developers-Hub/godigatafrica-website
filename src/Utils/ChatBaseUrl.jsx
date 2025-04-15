
export const FALLBACK_MODE = false; 

// const ONLINE_API_BASE_URL = "https://ai-chat-interface-production.up.railway.app/api"; 
// const ONLINE_SOCKET_BASE_URL = "https://ai-chat-interface-production.up.railway.app";

// local testing 
const ONLINE_API_BASE_URL = "https://server-628309.hostingwithgda.com:3010/api";
const ONLINE_SOCKET_BASE_URL = "https://server-628309.hostingwithgda.com:3010";


const FALLBACK_API_BASE_URL = "https://ai-chat-interface-production.up.railway.app/api"; 
const FALLBACK_SOCKET_BASE_URL = "https://ai-chat-interface-production.up.railway.app";


export const RECONNECTION_CONFIG = {
  enabled: true,
  maxAttempts: 5,
  initialDelay: 1000, 
  maxDelay: 30000, 
  factor: 2, 
  silentRetryDelay: 5000, 
  showUIIndicators: false,
};

export const API_BASE_URL = FALLBACK_MODE ? FALLBACK_API_BASE_URL : ONLINE_API_BASE_URL;
export const SOCKET_BASE_URL = FALLBACK_MODE ? FALLBACK_SOCKET_BASE_URL : ONLINE_SOCKET_BASE_URL;


