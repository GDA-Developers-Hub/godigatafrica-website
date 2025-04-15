const adminAuthMiddleware = require("./adminAuthMiddleware");

// Middleware to check for super admin privileges
module.exports = async function(req, res, next) {
  // First run the admin auth middleware
  adminAuthMiddleware(req, res, () => {
    // Check if admin has super admin role
    if (req.admin && req.admin.role === 'superadmin') {
      next();
    } else {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied: Super Admin privileges required" 
      });
    }
  });
}; 