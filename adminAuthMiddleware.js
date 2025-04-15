const jwt = require("jsonwebtoken");
const pool = require("./db");

module.exports = async function(req, res, next) {
  console.log(`AdminAuth: Checking authentication for ${req.method} ${req.path}`);
  
  // Get token from header
  const token = req.header("x-chat-admin-token");
  console.log(`AdminAuth: Token present: ${!!token}`);
  
  // Check if no token
  if (!token) {
    console.log("AdminAuth: No token provided, authorization denied");
    return res.status(401).json({ 
      success: false, 
      message: "No admin token, authorization denied" 
    });
  }

  try {
    // Verify token
    console.log("AdminAuth: Verifying token");
    console.log(`AdminAuth: JWT Admin Secret present: ${!!process.env.JWT_ADMIN_SECRET}`);
    console.log(`AdminAuth: JWT Admin Secret length: ${process.env.JWT_ADMIN_SECRET?.length || 0}`);
    console.log(`AdminAuth: Token first 20 chars: ${token.substring(0, 20)}...`);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
      console.log(`AdminAuth: Token verified for admin ID: ${decoded.id}`);
      console.log("AdminAuth: Token payload:", decoded);
      
      // Get admin info from database
      console.log("AdminAuth: Querying database for admin details");
      const [admins] = await pool.query(
        "SELECT id, username, email, role FROM admins WHERE id = ?",
        [decoded.id]
      );

      console.log(`AdminAuth: Database query returned ${admins.length} results`);
      
      if (admins.length === 0) {
        console.log(`AdminAuth: No admin found with ID ${decoded.id}`);
        return res.status(401).json({ 
          success: false, 
          message: "Invalid admin token" 
        });
      }

      // Add admin to request
      req.admin = {
        id: admins[0].id,
        username: admins[0].username,
        email: admins[0].email,
        role: admins[0].role
      };
      
      console.log(`AdminAuth: Successfully authenticated admin ${req.admin.username} (${req.admin.role})`);
      next();
    } catch (jwtError) {
      console.error("AdminAuth: JWT verification failed with error:", jwtError);
      throw jwtError;
    }
  } catch (error) {
    console.error("AdminAuth: Authentication error:", error);
    
    // Add detailed error info for common JWT errors
    if (error.name === 'TokenExpiredError') {
      console.log("AdminAuth: Token has expired");
      return res.status(401).json({ 
        success: false, 
        message: "Token has expired" 
      });
    } else if (error.name === 'JsonWebTokenError') {
      console.log(`AdminAuth: JWT Error: ${error.message}`);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token format or signature" 
      });
    }
    
    res.status(401).json({ success: false, message: "Invalid admin token" });
  }
}; 