import React, { useState, useEffect } from "react";
import { UserStats, TokenProject } from "./types";
import Dashboard from "./components/Dashboard";
import LearningJourney from "./components/LearningJourney";
import TokenDesigner from "./components/TokenDesigner";
import TokenomicsLab from "./components/TokenomicsLab";
import BrandingStudio from "./components/BrandingStudio";
import WhitepaperBuilder from "./components/WhitepaperBuilder";
import GovernanceSimulator from "./components/GovernanceSimulator";
import CommunityBuilder from "./components/CommunityBuilder";
import RoadmapBuilder from "./components/RoadmapBuilder";
import SecurityAcademy from "./components/SecurityAcademy";
import GlossaryView from "./components/GlossaryView";
import AIMentor from "./components/AIMentor";

import {
  Coins,
  BookOpen,
  LayoutDashboard,
  Compass,
  Palette,
  FileText,
  Users,
  MessageSquare,
  Milestone,
  ShieldCheck,
  BookMarked,
  Sparkles,
  Award,
  Flame,
  Plus,
  HelpCircle
} from "lucide-react";

const INITIAL_PROJECT: TokenProject = {
  id: "proj_default",
  name: "EcoChain",
  ticker: "ECO",
  mission: "To incentivize global carbon offset actions by distributing reward tokens for verified tree plantation and recycling.",
  industry: "Environmental Conservation",
  theme: "Green Ecology",
  primaryColor: "#10b981",
  secondaryColor: "#064e3b",
  logoEmoji: "🌱",
  mascot: "EcoBeaver",
  communityGoals: "Build a community of 10,000 active recycling advocates",
  maxSupply: 1000000000,
  circulatingSupply: 500000000,
  allocationCommunity: 40,
  allocationDevelopment: 25,
  allocationTreasury: 20,
  allocationEcosystem: 15,
  brandingGuidelines: "Use Space Grotesk for Display Headings and Inter for body copy. Primary color is Emerald, secondary is deep forest.",
  whitepaperIntro: "This whitepaper describes the architectural specs for EcoChain.",
  whitepaperProblem: "Carbon offsetting is currently highly centralized and non-auditable for average contributors.",
  whitepaperSolution: "EcoChain utilizes decentralized ledgers to distribute utility incentives to verified contributors.",
  whitepaperTokenomics: "Our token utility relies on staking to unlock governance voting multipliers.",
  whitepaperGovernance: "Community proposals require a 15% quorum to pass formal treasury distribution.",
  whitepaperRisks: "Systemic risk includes fluctuations in global green grant funding availability.",
  governanceVotingRules: {
    quorum: 15,
    duration: 3,
    minProposalPower: 5000,
  },
  roadmapPhases: [],
  communityChannels: [],
};

const INITIAL_STATS: UserStats = {
  xp: 15, // starts with minor base
  level: 1,
  streak: 3, // mock streak
  unlockedModules: [1], // starts with module 1 unlocked
  completedQuizzes: [],
  unlockedBadges: [],
};

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [savedProjects, setSavedProjects] = useState<TokenProject[]>([INITIAL_PROJECT]);
  const [currentProject, setCurrentProject] = useState<TokenProject>(INITIAL_PROJECT);
  const [showFloatingMentor, setShowFloatingMentor] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const statsStr = localStorage.getItem("coindev_stats");
    const projStr = localStorage.getItem("coindev_projects");
    const activeStr = localStorage.getItem("coindev_active_id");

    if (statsStr) {
      setUserStats(JSON.parse(statsStr));
    }
    if (projStr) {
      const parsedProjs = JSON.parse(projStr);
      setSavedProjects(parsedProjs);
      if (activeStr) {
        const found = parsedProjs.find((p: TokenProject) => p.id === activeStr);
        if (found) setCurrentProject(found);
      } else if (parsedProjs.length > 0) {
        setCurrentProject(parsedProjs[0]);
      }
    } else {
      // Seed first launch
      localStorage.setItem("coindev_stats", JSON.stringify(INITIAL_STATS));
      localStorage.setItem("coindev_projects", JSON.stringify([INITIAL_PROJECT]));
      localStorage.setItem("coindev_active_id", INITIAL_PROJECT.id);
    }
  }, []);

  // Sync helpers
  const saveAllToLocalStorage = (stats: UserStats, projs: TokenProject[], activeId: string) => {
    localStorage.setItem("coindev_stats", JSON.stringify(stats));
    localStorage.setItem("coindev_projects", JSON.stringify(projs));
    localStorage.setItem("coindev_active_id", activeId);
  };

  const handleAddXP = (amount: number) => {
    setUserStats((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        // Simple elegant notification
        alert(`🎉 LEVEL UP! You reached Level ${newLevel}! Keep designing responsibly.`);
      }

      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
      };

      saveAllToLocalStorage(updated, savedProjects, currentProject.id);
      return updated;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (userStats.unlockedBadges.includes(badgeId)) return;

    setUserStats((prev) => {
      const updated = {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
      
      // Award XP for getting a badge!
      updated.xp += 50;
      const newLevel = Math.floor(updated.xp / 100) + 1;
      if (newLevel > prev.level) {
        updated.level = newLevel;
        alert(`🎉 LEVEL UP & BADGE UNLOCKED! Level ${newLevel}! Badge: ${badgeId}`);
      } else {
        alert(`🏆 Achievement Unlocked: ${badgeId.replace("_", " ").toUpperCase()}! +50 XP`);
      }

      saveAllToLocalStorage(updated, savedProjects, currentProject.id);
      return updated;
    });
  };

  const handleUpdateProject = (updated: TokenProject) => {
    setCurrentProject(updated);
    setSavedProjects((prev) => {
      const newList = prev.map((p) => (p.id === updated.id ? updated : p));
      saveAllToLocalStorage(userStats, newList, updated.id);
      return newList;
    });
  };

  const handleCreateNewProject = () => {
    const newId = `proj_${Date.now()}`;
    const newProj: TokenProject = {
      ...INITIAL_PROJECT,
      id: newId,
      name: "New Sandbox Token",
      ticker: "NST",
      mission: "Explain your token's strategic mission goals here...",
      logoEmoji: "🪙",
    };

    const newList = [...savedProjects, newProj];
    setSavedProjects(newList);
    setCurrentProject(newProj);
    handleAddXP(20);
    saveAllToLocalStorage(userStats, newList, newId);
    setActiveTab("designer");
  };

  const handleLoadProject = (proj: TokenProject) => {
    setCurrentProject(proj);
    saveAllToLocalStorage(userStats, savedProjects, proj.id);
  };

  const handleDeleteProject = (id: string) => {
    if (savedProjects.length <= 1) return;
    const newList = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(newList);
    
    // Fallback to remaining
    const fallback = newList[0];
    setCurrentProject(fallback);
    saveAllToLocalStorage(userStats, newList, fallback.id);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "learning", label: "Blockchain Basics", icon: Compass },
    { id: "designer", label: "Token Designer", icon: Coins },
    { id: "tokenomics", label: "Tokenomics Lab", icon: Sparkles },
    { id: "branding", label: "Branding Studio", icon: Palette },
    { id: "whitepaper", label: "Whitepaper Builder", icon: FileText },
    { id: "governance", label: "Governance Simulator", icon: Users },
    { id: "community", label: "Community Planner", icon: MessageSquare },
    { id: "roadmap", label: "Roadmap Builder", icon: Milestone },
    { id: "security", label: "Security Academy", icon: ShieldCheck },
    { id: "glossary", label: "Interactive Glossary", icon: BookMarked },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* 1. Global Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900 text-amber-400 p-2 rounded-xl flex items-center justify-center">
            <Coins className="w-5 h-5 animate-spin-slow" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-base text-slate-900 leading-tight">Coin Dev</h1>
            <p className="text-[10px] text-slate-500 font-mono">Tokenomics Learning Sandbox</p>
          </div>
        </div>

        {/* Global Progress Header Stats */}
        <div className="flex items-center gap-4">
          
          {/* Active Token Pill */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs">
            <span className="text-sm">{currentProject.logoEmoji || "🪙"}</span>
            <div>
              <p className="text-[9px] text-slate-400 font-mono leading-none">Active Sandbox spec</p>
              <p className="font-display font-semibold text-slate-800 leading-tight mt-0.5">{currentProject.name || "My Token"} ({currentProject.ticker || "TKN"})</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Streak */}
            <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{userStats.streak} Day Streak</span>
            </div>

            {/* Level / XP */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {userStats.level}
              </div>
              <div className="hidden sm:block text-left leading-none">
                <p className="text-[9px] text-slate-400 font-mono">Total score</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{userStats.xp} XP</p>
              </div>
            </div>

            {/* New Project trigger */}
            <button
              onClick={handleCreateNewProject}
              className="bg-slate-900 hover:bg-slate-800 text-white p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">New Blueprint</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Layout (Sidebar + Center Content) */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-250 md:sticky md:top-16 shrink-0 md:h-[calc(100vh-65px)] flex flex-col justify-between p-4 z-30">
          <div className="space-y-1 overflow-y-auto pr-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-amber-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 hidden md:block">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 text-[10px] text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                <strong>Simulated State:</strong> Safe educational ledger. No real currency is deployed.
              </span>
            </div>
          </div>
        </aside>

        {/* Central Workspace */}
        <main className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full transition-all duration-300" id="main_workspace">
          {activeTab === "dashboard" && (
            <Dashboard
              userStats={userStats}
              savedProjects={savedProjects}
              currentProject={currentProject}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "learning" && (
            <LearningJourney
              userStats={userStats}
              onUpdateStats={(newStats) => {
                setUserStats(newStats);
                saveAllToLocalStorage(newStats, savedProjects, currentProject.id);
              }}
              onAddXP={handleAddXP}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === "designer" && (
            <TokenDesigner
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
              savedProjects={savedProjects}
              onLoadProject={handleLoadProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === "tokenomics" && (
            <TokenomicsLab
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
            />
          )}

          {activeTab === "branding" && (
            <BrandingStudio
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
            />
          )}

          {activeTab === "whitepaper" && (
            <WhitepaperBuilder
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
            />
          )}

          {activeTab === "governance" && (
            <GovernanceSimulator
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === "community" && (
            <CommunityBuilder
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
            />
          )}

          {activeTab === "roadmap" && (
            <RoadmapBuilder
              currentProject={currentProject}
              onUpdateProject={handleUpdateProject}
              onAddXP={handleAddXP}
            />
          )}

          {activeTab === "security" && (
            <SecurityAcademy
              onAddXP={handleAddXP}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === "glossary" && <GlossaryView />}
        </main>
      </div>

      {/* 3. Floating toggleable AI Mentor Chatbot overlay */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {showFloatingMentor && (
          <div className="w-[320px] sm:w-[360px] shadow-2xl mb-3 animate-float-in">
            <AIMentor onAddXP={handleAddXP} inlineMode={true} />
          </div>
        )}
        
        <button
          onClick={() => setShowFloatingMentor(!showFloatingMentor)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 p-3.5 rounded-full shadow-2xl flex items-center justify-center gap-1.5 hover:scale-105 transition-all z-50 cursor-pointer"
          id="floating_mentor_btn"
        >
          {showFloatingMentor ? (
            <span className="text-xs font-bold px-1">Close Mentor</span>
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">Ask AI Mentor</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
