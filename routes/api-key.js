const express = require("express");
const router = express.Router();
const pool = require("../db"); 

function verifyOtp(req, res, next) {
  const otp = req.body.otp || req.query.otp || req.headers["x-otp"];
  if (!otp || otp !== process.env.ADMIN_OTP) {
    return res.status(401).json({ error: "Unauthorized: invalid OTP" });
  }
  next();
}

router.post("/save-key", verifyOtp, async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey || !apiKey.startsWith("sk-")) {
    return res.status(400).json({ error: "Invalid API key format." });
  }

  try {
    // Check if a global key already exists (we expect only one row with id=1)
    const [rows] = await pool.query("SELECT * FROM open_ai_key WHERE id = 1");
    if (rows.length === 0) {
      await pool.query("INSERT INTO open_ai_key (id, api_key) VALUES (1, ?)", [apiKey]);
    } else {
      await pool.query("UPDATE open_ai_key SET api_key = ? WHERE id = 1", [apiKey]);
    }
    res.json({ message: "Global API key saved successfully." });
  } catch (error) {
    console.error("Error saving global API key:", error);
    res.status(500).json({ error: "Failed to save global API key." });
  }
});

// Fetch the global API key using OTP verification
router.get("/fetch-key", verifyOtp, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT api_key FROM open_ai_key WHERE id = 1");
    if (rows.length === 0) {
      return res.status(404).json({ error: "Global API key not found." });
    }
    res.json({ apiKey: rows[0].api_key });
  } catch (error) {
    console.error("Error fetching global API key:", error);
    res.status(500).json({ error: "Failed to fetch global API key." });
  }
});

module.exports = router;
