import React, { useState } from "react";
import { UserStats, TokenProject } from "../types";
import { BADGES, DAILY_FACTS, INSPIRATIONAL_QUOTES, CASE_STUDIES } from "../data";
import { Award, Compass, Coins, Users, BookOpen, ChevronRight, Sparkles, RefreshCw, Star, ArrowRight, ShieldCheck } from "lucide-react";

interface DashboardProps {
  userStats: UserStats;
  savedProjects: TokenProject[];
  currentProject: TokenProject;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ userStats, savedProjects, currentProject, onNavigate }: DashboardProps) {
  const [factIdx, setFactIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const cycleFact = () => {
    setFactIdx((prev) => (prev + 1) % DAILY_FACTS.length);
  };

  const currentQuote = INSPIRATIONAL_QUOTES[quoteIdx] || INSPIRATIONAL_QUOTES[0];

  // Calculate percentage progress to next level (every 100 XP is a level)
  const currentXPInLevel = userStats.xp % 100;
  const progressPercent = Math.min(currentXPInLevel, 100);

  return (
    <div className="space-y-8" id="dashboard_root">
      
      {/* 1. Hero / Branding Welcome Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
          <Coins className="w-64 h-64 text-amber-400 rotate-12" />
        </div>
        
        <div className="max-w-xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase rounded-full tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Sandbox Simulator Active
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight tracking-tight">
            Learn How Crypto Projects Are Built
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Design your own token concepts, explore dynamic tokenomics allocations, draft whitepapers, and simulate governance voting workflows in a safe, fully guided sandbox environment.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate("learning")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              Start Learning
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("designer")}
              className="bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Design a Token
            </button>
          </div>
        </div>
      </div>

      {/* 2. Level Tracker, Achievements, Fact widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile / Stats */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[230px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Progress Profile</span>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-100">
                Level {userStats.level}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-display font-bold text-slate-800">{userStats.xp}</span>
              <span className="text-xs text-slate-400">Total XP</span>
            </div>

            {/* Progress bar */}
            <div className="mt-3.5 space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold uppercase">
                <span>XP Progress</span>
                <span>{currentXPInLevel} / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 border-t border-slate-50 pt-3">
            <div>🔥 {userStats.streak} Day Streak</div>
            <div>🏆 {userStats.unlockedBadges.length} Badges</div>
            <div>📂 {savedProjects.length} Saved Specs</div>
          </div>
        </div>

        {/* Dynamic Fact widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[230px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blockchain Fact of the Day</span>
              <button onClick={cycleFact} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-sans font-medium">
              "{DAILY_FACTS[factIdx]}"
            </p>
          </div>

          <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-300">Fact Index {factIdx + 1} of {DAILY_FACTS.length}</span>
        </div>

        {/* Inspirational quote and disclaimers */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 flex flex-col justify-between h-[230px]">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Coin Dev Inspiration</span>
            <p className="text-amber-900 text-xs mt-3.5 italic leading-relaxed font-sans">
              "{currentQuote}"
            </p>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 border-t border-amber-200/40 pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulated Ledger Playground: Active</span>
          </div>
        </div>
      </div>

      {/* 3. Preloaded Case studies */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="font-display font-bold text-slate-800 text-lg">Featured Token Blueprints</h3>
          <p className="text-xs text-slate-500 mt-1">Examine successfully balanced case study models to guide your custom specifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 font-mono bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">
                    {cs.ticker} Blueprint
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{cs.theme}</span>
                </div>

                <h4 className="font-display font-bold text-slate-800 text-base">{cs.name}</h4>
                <p className="text-slate-500 text-xs font-sans leading-relaxed">{cs.mission}</p>
                
                <div className="border-t border-slate-50 pt-2 text-[10px] space-y-1 text-slate-500">
                  <p><strong>Max Supply:</strong> {cs.maxSupply} tokens</p>
                  <p><strong>Ideal Target Market:</strong> {cs.industry}</p>
                  <p><strong>Standard Distribution:</strong> {cs.distribution}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center gap-2 text-xs leading-relaxed text-slate-500 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                <Star className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Design Strengths:</strong> {cs.strength}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Badges unlocked list */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="font-display font-bold text-slate-800 text-lg">Your Unlockable Achievements</h3>
          <p className="text-xs text-slate-500 mt-1">Complete courses, design tokenomics models, and pass audits to secure badges.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {BADGES.map((b) => {
            const isUnlocked = userStats.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border text-center space-y-3.5 transition-all ${
                  isUnlocked
                    ? "bg-white border-amber-300 shadow-sm"
                    : "bg-slate-50 border-slate-200 opacity-50"
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto border ${
                  isUnlocked
                    ? "bg-amber-100 border-amber-300 text-amber-600"
                    : "bg-slate-100 border-slate-200 text-slate-300"
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-800 leading-tight">{b.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal font-sans">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
