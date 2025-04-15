const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Try to get token from Authorization header
  const authHeader = req.headers.authorization;
  // Also check for x-auth-token header (common in React apps)
  const xAuthToken = req.headers["x-auth-token"];

  let token;

  // Check for token in Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } 
  // Check for token in x-auth-token header
  else if (xAuthToken) {
    token = xAuthToken;
  }

  // If no token found in either location
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "No authentication token provided" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};

module.exports = authenticateUser;
