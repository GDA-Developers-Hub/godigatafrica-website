const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Handle file uploads
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Generate a URL for the uploaded file (this is a simple demo URL)
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
