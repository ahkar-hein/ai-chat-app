// routes/chat.js
import express from "express";
import authenticateToken from "../middleware/auth.js";
import OpenAI from "openai";

const router = express.Router();

export default function createChatRouter(apiKey) {
  const openai = new OpenAI({ apiKey });

  router.post("/", authenticateToken, async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ message: "Message is required" });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      res.json({ aiResponse: response.choices[0].message.content });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  return router;
}
