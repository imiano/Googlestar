import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION_MENTOR = `You are "Coin Dev Mentor", an encouraging, wise, and highly informative blockchain educator. 
Your goal is to explain complex cryptocurrency and token design concepts in simple, beginner-friendly terms.
Always maintain an educational and safe tone. 
Explicitly reiterate that this is a safe design simulator, no real blockchain deployment or real financial risks are involved. 
Use clear explanations, brief real-world analogies, and occasionally bullet points or short examples. 
Support formatting with markdown.`;

// 1. AI Mentor endpoint
app.post("/api/mentor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Format history for Gemini chat if present
    // Let's use simple prompt construction or the chat API
    const chatHistory = (history && Array.isArray(history)) 
      ? history.map((item: any) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }]
        }))
      : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_MENTOR,
        temperature: 0.7,
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Mentor error:", error);
    res.status(500).json({ error: error?.message || "An error occurred with the AI Mentor." });
  }
});

// 2. AI Whitepaper section generator endpoint
app.post("/api/whitepaper/generate-section", async (req, res) => {
  try {
    const { sectionName, tokenData } = req.body;
    if (!sectionName || !tokenData) {
      return res.status(400).json({ error: "sectionName and tokenData are required." });
    }

    const prompt = `You are an expert Web3 copywriter and tokenomics consultant. Write a professional, detailed, and highly authentic section for the official Educational Whitepaper of a fictional crypto project.
    
    PROJECT DETAILS:
    - Token Name: ${tokenData.name || "Unnamed"}
    - Ticker Symbol: ${tokenData.ticker || "TKN"}
    - Mission Statement: ${tokenData.mission || "No mission defined yet."}
    - Target Industry: ${tokenData.industry || "General Web3"}
    - Theme/Aesthetic: ${tokenData.theme || "Modern Tech"}
    - Community Goals: ${tokenData.communityGoals || "Expand the network ecosystem"}
    - Tokenomics Model:
       * Max Supply: ${tokenData.maxSupply || "1,000,000,000"} tokens
       * Circulating Supply: ${tokenData.circulatingSupply || "500,000,000"} tokens
       * Allocation: Community (${tokenData.allocationCommunity || 40}%), Development (${tokenData.allocationDevelopment || 25}%), Treasury (${tokenData.allocationTreasury || 20}%), Ecosystem Incentives (${tokenData.allocationEcosystem || 15}%)

    Please write the section: "${sectionName}".
    
    Guidelines:
    1. Structure the response with clear headings and paragraphs.
    2. Write in a formal, technical, and visionary whitepaper style (like Ethereum or Bitcoin's whitepapers).
    3. Use the fictional token ticker (${tokenData.ticker || "TKN"}) and token name throughout.
    4. Keep it strictly educational and realistic, but theoretical.
    5. Ensure you append a small, elegant disclaimer at the very end: "*Note: This whitepaper section is for simulated educational purposes only as part of the Coin Dev simulator. No actual tokens exist.*"
    6. Provide highly specific, solid paragraphs of content (at least 2-3 paragraphs with detailed reasoning).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Whitepaper generator error:", error);
    res.status(500).json({ error: error?.message || "An error occurred generating the whitepaper section." });
  }
});

// Setup Vite Dev server or static files
async function init() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

init();
