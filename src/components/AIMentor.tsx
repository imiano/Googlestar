import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Send, HelpCircle, Loader2, Sparkles, MessageSquare, AlertTriangle } from "lucide-react";

interface AIMentorProps {
  onAddXP: (amount: number) => void;
  inlineMode?: boolean; // If true, render as card. If false, full layout
}

const CHIPS = [
  "What's the difference between a coin and a token?",
  "What is token inflation and how can we prevent it?",
  "Why do blockchain projects publish whitepapers?",
  "What is a Gas Fee?",
  "How does Proof of Stake keep a network secure?",
];

export default function AIMentor({ onAddXP, inlineMode = false }: AIMentorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I'm your Coin Dev AI Mentor. Ask me any question about blockchain technology, consensus protocols, token distribution, governance design, or cryptocurrency security. Let's design something amazing and safe together!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Reconstruct simple history for backend
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not connect to Gemini server.");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text || "I was unable to formulate an answer. Let's try another topic!" }]);
      
      // Award XP for asking educational questions!
      onAddXP(15);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `⚠️ Educational Simulator Notice: I encountered an offline connection issue. Let me explain offline conceptually: blockchain networks require continuous internet peer consensus, just like this simulator does to connect to its AI mentor node. Please ensure the dev server is active!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm ${inlineMode ? "h-[380px]" : "h-[550px]"}`} id="ai_mentor_card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200 rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-50 p-2 rounded-xl text-amber-500 border border-amber-100">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm">AI Coin Mentor</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
              Powered by Gemini 3.5
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          Sandbox Mentor
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                msg.role === "user"
                  ? "bg-slate-800 text-white rounded-br-none"
                  : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2 shadow-xs text-slate-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span>Analyzing blockchain concepts...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips - only shown if not crowded */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-2 scrollbar-none">
        {CHIPS.map((chip, idx) => (
          <button
            key={idx}
            disabled={loading}
            onClick={() => handleSend(chip)}
            className="shrink-0 text-xs text-slate-600 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 border border-transparent px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-1.5 bg-amber-50/50 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-amber-700">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500 mt-0.5" />
        <span>
          <strong>Disclaimer:</strong> This is a closed educational sandbox. Coin Dev does not deploy live wallets, real tokens, or trade real value. Learn safely!
        </span>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-white border-t border-slate-200 rounded-b-2xl flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about tokenomics, gas, audits, DAO mechanics..."
          disabled={loading}
          className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 text-slate-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-400 text-slate-900 font-medium px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
}
