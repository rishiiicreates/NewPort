import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertChatMessageSchema } from "@shared/schema";
import OpenAI from "openai";
import { randomUUID } from "crypto";

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using Zod schema
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Store the message in the database
      const message = await storage.createMessage(validatedData);
      
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(400).json({ success: false, message: "Failed to send message", error: error.message });
    }
  });

  // API route for chatbot interactions
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId = randomUUID() } = req.body;
      
      if (!message) {
        return res.status(400).json({ success: false, message: "Message is required" });
      }

      // Save the user message
      const userMessage = await storage.createChatMessage({
        role: "user",
        content: message,
        sessionId,
      });

      // Get previous chat messages for context (optional)
      const previousMessages = await storage.getChatMessagesBySessionId(sessionId);
      
      // Format messages for OpenAI
      const formattedMessages = previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add system message for context
      formattedMessages.unshift({
        role: "system",
        content: "You are an AI assistant for Hrishikesh Yadav, an AI/ML and UI/UX developer. Answer questions about his skills, projects, and background. Be friendly, professional, and knowledgeable. If you don't know something specific about Hrishikesh, base your answer on what a talented AI/ML and UI/UX developer might do or know."
      });

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: formattedMessages,
      });

      const aiResponse = completion.choices[0].message.content;

      // Save the AI response
      const assistantMessage = await storage.createChatMessage({
        role: "assistant",
        content: aiResponse,
        sessionId,
      });

      res.status(200).json({ 
        success: true, 
        message: aiResponse, 
        sessionId 
      });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ success: false, message: "Failed to process chat message", error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
