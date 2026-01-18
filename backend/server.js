import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/test.js";
import createChatRouter from "./routes/chat.js"; // <- notice default export is a function

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api", authRoutes);
app.use("/test", testRoutes);
app.use("/chat", createChatRouter(process.env.OPENAI_API_KEY));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
