import React, { useState, useEffect } from "react";
import { TokenProject } from "../types";
import { Info, Sparkles, Save, Trash2, ShieldCheck, AlertCircle } from "lucide-react";

interface TokenDesignerProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
  savedProjects: TokenProject[];
  onLoadProject: (project: TokenProject) => void;
  onDeleteProject: (id: string) => void;
}

const INDUSTRIES = ["Gaming & Esports", "Environmental Conservation", "DeFi / Finance", "Real Estate", "Healthcare Data", "Social Media", "Supply Chain", "Art & NFTs"];
const THEMES = ["Modern Tech", "Retro Arcade", "Green Ecology", "Clinical Blue", "Luxury Gold", "Cosmic Slate"];
const EMOJIS = ["🪙", "🌱", "🎮", "🛡️", "🧬", "🌌", "⚖️", "🚀", "🎨", "🌍", "🐱", "🦁"];

export default function TokenDesigner({
  currentProject,
  onUpdateProject,
  onAddXP,
  savedProjects,
  onLoadProject,
  onDeleteProject,
}: TokenDesignerProps) {
  const [formData, setFormData] = useState<TokenProject>(currentProject);
  const [activeExplainField, setActiveExplainField] = useState<string>("name");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData(currentProject);
  }, [currentProject]);

  const handleChange = (field: keyof TokenProject, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProject(formData);
    onAddXP(50);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const fieldExplanations: Record<string, { title: string; text: string; example: string }> = {
    name: {
      title: "Token Name",
      text: "The main name of your project. In the real blockchain landscape, names are selected to reflect the primary utility, industry, or vibe of the ecosystem. It should be unique, professional, and memorable.",
      example: "Example: 'Solana', 'Bitcoin', 'EcoChain'"
    },
    ticker: {
      title: "Ticker Symbol",
      text: "A 3-5 character abbreviation representing your token. It is used in wallet addresses, exchange order books, and transaction records. Keep it uppercase, simple, and punchy.",
      example: "Example: 'BTC', 'ETH', 'SOL', 'ECO'"
    },
    mission: {
      title: "Mission Statement",
      text: "Why does this token need to exist? A token is an economic coordinating mechanism. If it doesn't solve a real problem or unite community actions, the design fails. Never raise funds or create a token without a clear problem-solving mission.",
      example: "Example: 'To incentivize verified local recycling in schools using simulated micro-grants.'"
    },
    industry: {
      title: "Target Industry",
      text: "The regulatory and practical vertical of your project. Different sectors have vastly different user behaviors, compliance considerations (e.g. healthcare privacy, gaming asset rules), and design paradigms.",
      example: "Example: Environmental conservation tokens emphasize public auditability."
    },
    theme: {
      title: "Visual Theme",
      text: "Branding drives adoption. Establishing a core color tone and aesthetic helps your target audience immediately recognize your whitepapers, marketing campaigns, and community forums.",
      example: "Example: 'Green Ecology' conveys safety, trust, and sustainability."
    },
    mascot: {
      title: "Project Mascot",
      text: "Mascots build character and viral engagement. They represent the human (or animal!) face of your decentralized community.",
      example: "Example: A friendly owl (wise education) or dynamic cheetah (high speeds)."
    },
    communityGoals: {
      title: "Community Goals",
      text: "Decentralization relies on active members. Defining goals (e.g. governance participation, education) governs how your community treasury gets allocated over time.",
      example: "Example: 'To plant 10,000 real-world trees through certified NGO receipts.'"
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8" id="token_designer_container">
      {/* Portfolio Selector Column */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[620px]">
        <div>
          <h3 className="font-display font-bold text-slate-800 text-sm mb-4">Your Fictional Portfolios</h3>
          
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {savedProjects.map((p) => (
              <div
                key={p.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  p.id === currentProject.id
                    ? "bg-slate-50 border-slate-900 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onLoadProject(p)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.logoEmoji || "🪙"}</span>
                    <div>
                      <h4 className="font-display font-semibold text-xs text-slate-800">{p.name || "Untitled Token"}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{p.ticker || "TKN"} • {p.industry}</p>
                    </div>
                  </div>
                </div>
                {savedProjects.length > 1 && (
                  <button
                    onClick={() => onDeleteProject(p.id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
            <span>
              <strong>Regulatory Sandbox:</strong> Building project prototypes teaches token coordination models safely without incurring smart contract gas fees or regulatory compliance exposure.
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Column */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[620px]">
        <div className="space-y-4 overflow-y-auto pr-1 max-h-[500px]">
          <h3 className="font-display font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Configure Token Specs</h3>

          {/* Name & Ticker */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Token Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onFocus={() => setActiveExplainField("name")}
                placeholder="EcoChain"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Ticker</label>
              <input
                type="text"
                value={formData.ticker}
                maxLength={5}
                onChange={(e) => handleChange("ticker", e.target.value.toUpperCase())}
                onFocus={() => setActiveExplainField("ticker")}
                placeholder="ECO"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Mission */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Mission Statement</label>
            <textarea
              rows={3}
              value={formData.mission}
              onChange={(e) => handleChange("mission", e.target.value)}
              onFocus={() => setActiveExplainField("mission")}
              placeholder="Explain what physical or coordinating problem this token is designed to solve..."
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 text-slate-800"
            />
          </div>

          {/* Logo Emoji Selector */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mascot Logo Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleChange("logoEmoji", emoji)}
                  className={`text-lg p-1.5 rounded-lg border transition-all cursor-pointer ${
                    formData.logoEmoji === emoji
                      ? "bg-amber-100 border-amber-400 scale-105"
                      : "bg-white border-slate-200 hover:border-slate-350"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              onFocus={() => setActiveExplainField("industry")}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 bg-white text-slate-800"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Visual Theme */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Aesthetic Theme</label>
            <select
              value={formData.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              onFocus={() => setActiveExplainField("theme")}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 bg-white text-slate-800"
            >
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>

          {/* Mascot */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Project Mascot Name</label>
            <input
              type="text"
              value={formData.mascot}
              onChange={(e) => handleChange("mascot", e.target.value)}
              onFocus={() => setActiveExplainField("mascot")}
              placeholder="e.g. GreenBeaver, CyberHawk"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 text-slate-800"
            />
          </div>

          {/* Community Goals */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Community Goals</label>
            <input
              type="text"
              value={formData.communityGoals}
              onChange={(e) => handleChange("communityGoals", e.target.value)}
              onFocus={() => setActiveExplainField("communityGoals")}
              placeholder="e.g. Build an open educational knowledge base"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 text-slate-800"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-slate-100 pt-3">
          <button
            onClick={handleSave}
            className={`w-full py-2 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all text-slate-900 cursor-pointer ${
              saveSuccess
                ? "bg-emerald-400 hover:bg-emerald-500"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {saveSuccess ? (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-900" />
                <span>Saved Successfully! +50 XP</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Specs & Save to Portfolio</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Explanations Column */}
      <div className="xl:col-span-1 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[620px]">
        {activeExplainField && fieldExplanations[activeExplainField] ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              <Info className="w-4 h-4 shrink-0" />
              <h4 className="font-display font-bold text-slate-800 text-xs">Educational Explanation</h4>
            </div>

            <h3 className="font-display font-semibold text-base text-slate-800">
              {fieldExplanations[activeExplainField].title}
            </h3>

            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              {fieldExplanations[activeExplainField].text}
            </p>

            <div className="bg-white border border-slate-200 rounded-xl p-3">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Example Blueprint</p>
              <p className="text-xs text-slate-700 italic mt-1 font-sans">
                {fieldExplanations[activeExplainField].example}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
            <Info className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs">Select any form input to read its educational context and blueprint examples.</p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex gap-2 text-[10px] text-amber-800 leading-normal">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            Design choices govern the user trust, technical boundaries, and future utility architectures of standard token networks. Always design thoughtfully!
          </span>
        </div>
      </div>
    </div>
  );
}
