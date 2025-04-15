// src/Utils/ChatCleanup.jsx
export function cleanupOldConversations() {
  const stored = JSON.parse(localStorage.getItem("conversations")) || [];
  const now = Date.now();
  const threshold = 1 * 24 * 60 * 60 * 1000; 

  const freshConvos = stored.filter((conv) => now - conv.timestamp < threshold);
  localStorage.setItem("conversations", JSON.stringify(freshConvos));
}
