const express = require("express");
const router = express.Router();
const authenticateUser = require("./authMiddleware");

router.delete("/conversations/:id", authenticateUser, async (req, res) => {
  const conversationId = req.params.id;
  const userId = req.user.userId; 

  try {
    const [rows] = await pool.query(
      "SELECT * FROM conversations WHERE id = ? AND user_id = ?",
      [conversationId, userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Conversation not found or unauthorized" });
    }
    await pool.query("DELETE FROM conversations WHERE id = ?", [conversationId]);
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Delete conversation error:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});
module.exports = router;
