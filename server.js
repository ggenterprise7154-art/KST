import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "20kb" }));

const origins = (process.env.FRONTEND_ORIGIN || "https://kingdomspirittech.netlify.app").split(",").map(x => x.trim()).filter(Boolean);
app.use(cors({ 
  origin(origin, callback) { 
    if (!origin || origins.includes(origin)) return callback(null, true); 
    callback(new Error("Origin not allowed")); 
  }, 
  methods: ["GET","POST"], 
  allowedHeaders: ["Content-Type"] 
}));

const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  limit: 20, 
  standardHeaders: "draft-7", 
  legacyHeaders: false, 
  message: { error: "You've sent several messages. Please wait a little and try again." } 
});

const instructions = `You are the official website assistant for Kingdom Spirit Technology, the technology division of Kingdom Spirit Enterprise. Be warm, professional, concise, respectful, and helpful. Use plain English. The company helps businesses through digital products, AI, automation, integration, and cybersecurity. Website: https://kingdomspirittech.netlify.app. Never invent prices, phone numbers, or addresses. For prices, guide visitor to Request a Quote.`;

app.get("/", (_req,res) => res.json({service:"Kingdom Spirit Technology AI Assistant",status:"online"}));
app.get("/health", (_req,res) => res.json({status:"ok"}));

app.post("/api/chat", limiter, async (req,res) => {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({error:"The assistant is being configured. Please contact the team through the website."});
    const messages = req.body?.messages;
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 10) return res.status(400).json({error:"Please send a valid message."});
    const safe = messages.filter(m => m && ["user","assistant"].includes(m.role) && typeof m.content === "string")
      .map(m => ({role:m.role,content:m.content.trim().slice(0,1500)})).filter(m => m.content);
    if (!safe.length || safe[safe.length-1].role !== "user") return res.status(400).json({error:"Please enter a question first."});
    const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await ai.responses.create({model:process.env.OPENAI_MODEL || "gpt-4o-mini",instructions,input:safe,max_output_tokens:500});
    res.json({reply:result.output_text || "I'm sorry, I couldn't prepare an answer. Please try again."});
  } catch (err) {
    console.error("Chat request failed:", err?.status || err?.message || "Unknown error");
    res.status(500).json({error:"Sorry, I couldn't answer just now. Please try again shortly."});
  }
});

export default app;

