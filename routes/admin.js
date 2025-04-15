const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");
const adminAuthMiddleware = require("../adminAuthMiddleware");
const superAdminMiddleware = require("../superAdminMiddleware");

// Get all admins (admin access required)
router.get("/", adminAuthMiddleware, async (req, res) => {
  try {
    console.log("Admin route: GET /admin - Fetching all admins");
    console.log("Admin route: Request from admin ID:", req.admin.id);
    
    let query = `
      SELECT a.id, a.username, a.email, a.role, a.created_at, a.updated_at, 
      c.username as created_by_username 
      FROM admins a 
      LEFT JOIN admins c ON a.created_by = c.id
    `;

    // All admins can see all other admins - removed the role-based filtering
    console.log("Admin route: Executing query to fetch all admins");
    const [admins] = await pool.query(query);
    console.log(`Admin route: Found ${admins.length} admins`);
    
    res.json({ success: true, admins });
  } catch (error) {
    console.error("Admin route: Error fetching admins:", error);
    res.status(500).json({ success: false, message: "Failed to fetch admins" });
  }
});

// Get admin by ID (admin access required)
router.get("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const adminId = req.params.id;

    // Non-super admins can only see themselves
    if (req.admin.role !== "superadmin" && req.admin.id !== parseInt(adminId)) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own profile"
      });
    }

    const [admins] = await pool.query(
      `SELECT a.id, a.username, a.email, a.role, a.created_at, a.updated_at, 
      c.username as created_by_username 
      FROM admins a 
      LEFT JOIN admins c ON a.created_by = c.id 
      WHERE a.id = ?`,
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.json({ success: true, admin: admins[0] });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ success: false, message: "Failed to fetch admin" });
  }
});

// Update admin (super admin can update any admin, regular admins can only update themselves)
router.put("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, email, password, role } = req.body;

    // Check if admin exists
    const [existingAdmins] = await pool.query(
      "SELECT * FROM admins WHERE id = ?",
      [adminId]
    );

    if (existingAdmins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Permission check
    if (req.admin.role !== "superadmin" && req.admin.id !== parseInt(adminId)) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile"
      });
    }

    // Prevent regular admins from modifying roles
    if (req.admin.role !== "superadmin" && role) {
      return res.status(403).json({
        success: false,
        message: "Only super admins can modify roles"
      });
    }

    // Prevent the last super admin from being demoted or deleted
    if (
      req.admin.role === "superadmin" && 
      existingAdmins[0].role === "superadmin" && 
      role === "admin"
    ) {
      // Check if this is the last super admin
      const [superAdminCount] = await pool.query(
        "SELECT COUNT(*) as count FROM admins WHERE role = 'superadmin'"
      );
      
      if (superAdminCount[0].count <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot demote the last super admin"
        });
      }
    }

    // Build the update query
    let updateQuery = "UPDATE admins SET ";
    const updateParams = [];
    const updates = [];

    if (username) {
      updates.push("username = ?");
      updateParams.push(username);
    }

    if (email) {
      updates.push("email = ?");
      updateParams.push(email);
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.push("password = ?");
      updateParams.push(hashedPassword);
    }

    if (role && req.admin.role === "superadmin") {
      updates.push("role = ?");
      updateParams.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No updates provided"
      });
    }

    updateQuery += updates.join(", ") + " WHERE id = ?";
    updateParams.push(adminId);

    // Execute the update
    await pool.query(updateQuery, updateParams);

    res.json({
      success: true,
      message: "Admin updated successfully"
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ success: false, message: "Failed to update admin" });
  }
});

// Delete admin (super admin only)
router.delete("/:id", superAdminMiddleware, async (req, res) => {
  try {
    const adminId = req.params.id;

    // Check if admin exists
    const [existingAdmins] = await pool.query(
      "SELECT * FROM admins WHERE id = ?",
      [adminId]
    );

    if (existingAdmins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Prevent deleting the last super admin
    if (existingAdmins[0].role === "superadmin") {
      const [superAdminCount] = await pool.query(
        "SELECT COUNT(*) as count FROM admins WHERE role = 'superadmin'"
      );
      
      if (superAdminCount[0].count <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the last super admin"
        });
      }
    }

    // Prevent self-deletion
    if (req.admin.id === parseInt(adminId)) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account"
      });
    }

    // Delete the admin
    await pool.query("DELETE FROM admins WHERE id = ?", [adminId]);

    res.json({
      success: true,
      message: "Admin deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ success: false, message: "Failed to delete admin" });
  }
});

module.exports = router; 