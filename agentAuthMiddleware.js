const jwt = require("jsonwebtoken");
const pool = require("./db");

module.exports = async function (req, res, next) {
  console.log("==== AGENT AUTH MIDDLEWARE ====");
  console.log("Path:", req.path);
  console.log("Method:", req.method);
  
  // Log all headers for debugging (without sensitive info)
  const headers = { ...req.headers };
  if (headers.authorization) headers.authorization = 'REDACTED';
  if (headers['x-auth-token']) headers['x-auth-token'] = 'PRESENT';
  console.log("Headers:", JSON.stringify(headers));
  
  // Get token from header
  const token = req.header("x-auth-token");
  console.log("Token present:", !!token);
  
  // Check if no token
  if (!token) {
    console.log("Authorization denied: No token provided");
    return res.status(401).json({ 
      success: false, 
      message: "No token, authorization denied" 
    });
  }

  try {
    // Verify token
    console.log("Verifying JWT token...");
    console.log("JWT Secret present:", !!process.env.JWT_SECRET);
    console.log("JWT Secret length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully");
    console.log("Decoded token data:", JSON.stringify({
      id: decoded.id,
      email: decoded.email,
      isAgent: decoded.isAgent,
      agentId: decoded.agentId
    }));
    
    // Check if token belongs to an agent
    if (!decoded.isAgent) {
      console.log("Authorization denied: Token belongs to a non-agent user");
      return res.status(401).json({ 
        success: false, 
        message: "Not authorized as an agent" 
      });
    }

    // Check if agent exists and is active
    console.log(`Checking if agent exists with ID: ${decoded.agentId}`);
    const [agents] = await pool.query(
      "SELECT * FROM agents WHERE id = ?",
      [decoded.agentId]
    );

    console.log(`Agent query result count: ${agents.length}`);
    
    if (agents.length === 0) {
      console.log(`No agent found with ID: ${decoded.agentId}`);
      return res.status(401).json({ 
        success: false, 
        message: "Agent not found or account deactivated" 
      });
    }

    const agent = agents[0];
    console.log(`Found agent: ID=${agent.id}, Status=${agent.status}`);

    // Add user and agent info to request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    req.agent = {
      id: decoded.agentId,
      name: decoded.agentName
    };

    console.log("Authentication successful, proceeding to route handler");
    next();
  } catch (error) {
    console.error("Agent authentication error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      console.log("Token expired");
      return res.status(401).json({ 
        success: false, 
        message: "Token has expired" 
      });
    } else if (error.name === 'JsonWebTokenError') {
      console.log("Invalid token format or signature");
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token format or signature" 
      });
    }
    
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
}; 