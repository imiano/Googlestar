import React, { useState } from "react";
import { TokenProject } from "../types";
import { Palette, Smartphone, AlertCircle, FileText, Send, HelpCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface BrandingStudioProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
}

const BRAND_PALETTES = [
  { name: "Emerald Ecology", primary: "#10b981", secondary: "#064e3b" },
  { name: "Cyber Sunset", primary: "#ec4899", secondary: "#f43f5e" },
  { name: "Hyper Solana", primary: "#a855f7", secondary: "#14b8a6" },
  { name: "Standard Bitcoin", primary: "#f59e0b", secondary: "#78350f" },
  { name: "Clinical Health", primary: "#06b6d4", secondary: "#0f172a" },
];

const MASCOTS = [
  { name: "EcoBeaver", desc: "Constructive environmental companion." },
  { name: "CyberHawk", desc: "Sharp, high speed scanner mascot." },
  { name: "GigaGriffin", desc: "Legendary protector of decentralized vaults." },
  { name: "AstroSloth", desc: "Calm, slow, highly resilient consensus companion." },
];

export default function BrandingStudio({ currentProject, onUpdateProject, onAddXP }: BrandingStudioProps) {
  const [primaryColor, setPrimaryColor] = useState(currentProject.primaryColor || "#fbbf24");
  const [secondaryColor, setSecondaryColor] = useState(currentProject.secondaryColor || "#1e293b");
  const [mascot, setMascot] = useState(currentProject.mascot || "EcoBeaver");
  const [mockBalance, setMockBalance] = useState(25000);
  const [txHistory, setTxHistory] = useState([
    { type: "received", amount: 1200, from: "Simulated Community Airdrop" },
    { type: "staked", amount: -500, from: "Governance Staking Pool" },
  ]);

  const handleApplyPalette = (palette: typeof BRAND_PALETTES[0]) => {
    setPrimaryColor(palette.primary);
    setSecondaryColor(palette.secondary);
    onAddXP(10);
  };

  const handleSaveBranding = () => {
    onUpdateProject({
      ...currentProject,
      primaryColor,
      secondaryColor,
      mascot,
    });
    onAddXP(30);
    alert("Branding guidelines saved to project portfolio! +30 XP");
  };

  const simulateTx = () => {
    const isReceive = Math.random() > 0.5;
    const amount = Math.floor(Math.random() * 450) + 50;
    const desc = isReceive ? "Fictional Miner Incentive" : "Simulated Governance Vote cost";
    
    setTxHistory((prev) => [
      { type: isReceive ? "received" : "sent", amount: isReceive ? amount : -amount, from: desc },
      ...prev.slice(0, 3)
    ]);
    setMockBalance((prev) => (isReceive ? prev + amount : prev - amount));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="branding_studio_root">
      {/* Branding Tools Column */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[600px] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Palette className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-slate-800">Visual Guidelines Builder</h3>
          </div>

          {/* Color pickers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Colors</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono">Primary Accent Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 px-2.5 border border-slate-200 rounded-lg text-xs font-mono uppercase text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono">Secondary Theme Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1 px-2.5 border border-slate-200 rounded-lg text-xs font-mono uppercase text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preset Palettes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fictional Theme Palettes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BRAND_PALETTES.map((pal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPalette(pal)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{pal.name}</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.primary }}></span>
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.secondary }}></span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mascots selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Mascot Profile</h4>
            <div className="grid grid-cols-2 gap-2">
              {MASCOTS.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setMascot(m.name)}
                  className={`p-3 border rounded-xl text-left transition-all cursor-pointer ${
                    mascot === m.name
                      ? "bg-amber-50 border-amber-300 shadow-xs"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <h5 className="font-display font-semibold text-xs text-slate-800">{m.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveBranding}
          className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm transition-all cursor-pointer"
        >
          Save Visual Assets & Guideline
        </button>
      </div>

      {/* Interactive Mobile Mockup Column */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center h-[600px]">
        {/* Smartphone Wrapper */}
        <div className="w-[280px] h-[500px] bg-slate-900 rounded-[36px] p-3 border-4 border-slate-800 shadow-2xl relative flex flex-col justify-between">
          
          {/* Ear Speaker Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center">
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>

          {/* Mobile Screen Contents */}
          <div className="flex-1 bg-slate-50 rounded-[28px] p-4 flex flex-col justify-between overflow-y-auto pt-6 text-slate-800">
            
            {/* Mock Header */}
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono">
              <span>9:41 AM</span>
              <div className="flex gap-1.5">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div
              className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden my-3 transition-colors duration-300"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] uppercase font-mono tracking-widest text-white/70">Wallet Account</p>
                  <h4 className="font-display font-bold text-sm tracking-tight">{currentProject.name || "My Token"}</h4>
                </div>
                <span className="text-xl bg-white/20 p-1.5 rounded-lg">{currentProject.logoEmoji || "🪙"}</span>
              </div>

              <div className="mt-6">
                <p className="text-[9px] text-white/60 font-mono">Total Stake Balance</p>
                <p className="text-xl font-bold font-mono tracking-tight mt-0.5">
                  {mockBalance.toLocaleString()} <span className="text-xs font-semibold">{currentProject.ticker || "TKN"}</span>
                </p>
              </div>
            </div>

            {/* Simulated actions */}
            <div className="grid grid-cols-2 gap-2 my-2">
              <button
                onClick={simulateTx}
                className="bg-white hover:bg-slate-100 border border-slate-200 rounded-xl py-1.5 text-[10px] font-semibold text-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowDownLeft className="w-3 h-3 text-emerald-500" />
                Simulate Recv
              </button>
              <button
                onClick={simulateTx}
                className="bg-white hover:bg-slate-100 border border-slate-200 rounded-xl py-1.5 text-[10px] font-semibold text-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowUpRight className="w-3 h-3 text-rose-500" />
                Simulate Send
              </button>
            </div>

            {/* Transaction History Mock */}
            <div className="flex-1 mt-1 text-left">
              <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Simulated Ledger Entries</h5>
              <div className="space-y-1.5">
                {txHistory.map((tx, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-2 rounded-xl flex items-center justify-between text-[10px]">
                    <div className="truncate pr-2">
                      <p className="font-semibold text-slate-700 leading-none truncate">{tx.from}</p>
                      <p className="text-[8px] text-slate-400 mt-0.5 leading-none">{tx.type === "received" ? "Ledger Block: Verified" : "Voting Lock: Active"}</p>
                    </div>
                    <span className={`font-mono font-bold whitespace-nowrap ${tx.amount > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smartphone Home Bar */}
          <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mb-1"></div>
        </div>
      </div>
    </div>
  );
}
