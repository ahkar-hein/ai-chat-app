const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const authenticateToken = require("../middleware/auth");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is in your .env
});

// POST /chat - Protected route
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message) return res.status(400).json({ message: "Message is required" });

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    // Extract AI response
    const aiResponse = response.choices[0].message.content;

    res.json({ aiResponse });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
