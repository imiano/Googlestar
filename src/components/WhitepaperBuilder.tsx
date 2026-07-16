import React, { useState } from "react";
import { TokenProject } from "../types";
import { BookOpen, Sparkles, AlertTriangle, Printer, Download, Copy, Loader2, HelpCircle } from "lucide-react";

interface WhitepaperBuilderProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
}

const SECTIONS = [
  { id: "intro", title: "1. Introduction & Problem Statement", field: "whitepaperIntro" as const },
  { id: "solution", title: "2. Proposed Solution & Architecture", field: "whitepaperSolution" as const },
  { id: "tokenomics", title: "3. Token Utility & Tokenomics", field: "whitepaperTokenomics" as const },
  { id: "governance", title: "4. Governance Model & Treasury Rules", field: "whitepaperGovernance" as const },
  { id: "risks", title: "5. Risk Factors & Disclaimers", field: "whitepaperRisks" as const },
];

export default function WhitepaperBuilder({ currentProject, onUpdateProject, onAddXP }: WhitepaperBuilderProps) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const activeSection = SECTIONS[activeSectionIdx];

  const handleTextChange = (text: string) => {
    onUpdateProject({
      ...currentProject,
      [activeSection.field]: text,
    });
  };

  const handleGenerateWithAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whitepaper/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionName: activeSection.title,
          tokenData: {
            name: currentProject.name,
            ticker: currentProject.ticker,
            mission: currentProject.mission,
            industry: currentProject.industry,
            theme: currentProject.theme,
            communityGoals: currentProject.communityGoals,
            maxSupply: currentProject.maxSupply,
            circulatingSupply: currentProject.circulatingSupply,
            allocationCommunity: currentProject.allocationCommunity,
            allocationDevelopment: currentProject.allocationDevelopment,
            allocationTreasury: currentProject.allocationTreasury,
            allocationEcosystem: currentProject.allocationEcosystem,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Could not connect to the whitepaper generator server.");
      }

      const data = await res.json();
      if (data.text) {
        handleTextChange(data.text);
        onAddXP(30);
      }
    } catch (err) {
      alert("⚠️ Network notice: Running in offline/sandboxed state. Fictional sample draft generated as replacement.");
      // Fallback draft based on project data
      const fallback = `### ${activeSection.title} for ${currentProject.name || "My Token"} (${currentProject.ticker || "TKN"})
      
      This document establishes the official educational specification for ${currentProject.name || "My Token"}. In the context of ${currentProject.industry || "General Web3"}, this project outlines a balanced decentralized tokenomic engine focused on long term governance models.
      
      #### Strategic Specifications:
      - **Ticker Abbreviation:** ${currentProject.ticker || "TKN"}
      - **Target Sector:** ${currentProject.industry || "Web3"}
      - **Initial Allocation Base:** Community Incentives (${currentProject.allocationCommunity || 40}%), Founders & Advisors (${currentProject.allocationDevelopment || 25}%), Reserved Treasury (${currentProject.allocationTreasury || 20}%).
      
      *Note: This whitepaper section is for simulated educational purposes only as part of the Coin Dev simulator. No actual tokens exist.*`;
      handleTextChange(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClipboard = () => {
    const fullText = SECTIONS.map((s) => `${s.title}\n\n${currentProject[s.field] || "No content drafted yet."}`).join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    onAddXP(10);
    alert("Full whitepaper copied to clipboard with educational watermarks appended! +10 XP");
  };

  return (
    <div className="space-y-6" id="whitepaper_builder_root">
      {/* Header controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="font-display font-bold text-slate-800 text-sm">Interactive Whitepaper Builder</h3>
            <p className="text-xs text-slate-500">Draft your project specifications and print or copy watermarked learning documents.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {previewMode ? "Edit Sections" : "Full Whitepaper Preview"}
          </button>
          <button
            onClick={handleCopyClipboard}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copy Document
          </button>
        </div>
      </div>

      {previewMode ? (
        /* Full Book-style Preview mode with watermarks */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 relative overflow-hidden watermark-overlay min-h-[450px]">
          {/* Watermark overlay text */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none rotate-12 opacity-10 font-sans font-bold text-slate-400 text-xl sm:text-2xl tracking-widest leading-none text-center">
            COIN DEV SIMULATOR • EDUCATIONAL ONLY • NOT FINANCIAL ADVICE • NO VALUE DEPLOYED
          </div>

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <div className="text-center border-b border-slate-100 pb-6">
              <span className="text-4xl">{currentProject.logoEmoji || "🪙"}</span>
              <h1 className="font-display font-bold text-3xl text-slate-900 mt-2">{currentProject.name || "Unnamed Project"} Whitepaper</h1>
              <p className="text-xs font-mono text-indigo-600 uppercase tracking-widest mt-1">Ticker: {currentProject.ticker || "TKN"} • Created in Coin Dev Sandbox</p>
              <p className="text-[10px] text-slate-400 italic mt-2">Published: Simulated Ledger Epoch 2026</p>
            </div>

            {SECTIONS.map((sec) => (
              <div key={sec.id} className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-800 border-b border-slate-50 pb-1">{sec.title}</h3>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {currentProject[sec.field] || <span className="text-slate-400 italic">No specifications drafted for this section yet. Click 'Edit Sections' and co-write with the AI Mentor!</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Section Editor Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 space-y-1.5 h-[480px]">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Whitepaper Sections</h4>
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionIdx(idx)}
                className={`w-full text-left px-3.5 py-3 rounded-xl transition-all border text-xs flex items-center justify-between cursor-pointer ${
                  activeSectionIdx === idx
                    ? "bg-slate-850 border-slate-900 text-white font-medium"
                    : "bg-white hover:bg-slate-50 border-transparent text-slate-600"
                }`}
              >
                <span>{sec.title}</span>
                <span className={`w-2 h-2 rounded-full ${currentProject[sec.field] ? "bg-emerald-500" : "bg-slate-200"}`}></span>
              </button>
            ))}

            <div className="bg-amber-50 rounded-xl p-3.5 text-[10px] text-amber-800 flex items-start gap-2.5 mt-8 border border-amber-200/60 leading-normal">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
              <span>
                <strong>Aesthetic Rule:</strong> Keep arguments grounded. In the real market, over-promising leads to high regulatory risks, civil lawsuits, and loss of public integrity.
              </span>
            </div>
          </div>

          {/* Section Editor Workspace */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[480px]">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 shrink-0">
                <h4 className="font-display font-bold text-sm text-slate-800">{activeSection.title}</h4>
                <button
                  onClick={handleGenerateWithAI}
                  disabled={loading}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Co-writing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate with AI Mentor</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={currentProject[activeSection.field] || ""}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Draft details explaining ${activeSection.title} or click the AI Mentor button to instantly co-create a professional educational layout...`}
                className="w-full flex-1 p-4 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-slate-700 resize-none font-sans leading-relaxed"
              />
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Coin Dev sandbox whitepapers automatically append simulated regulatory disclaimers.
              </span>
              <span>Draft mode</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
