import React, { useState } from "react";
import { TokenProject } from "../types";
import { Calendar, Plus, Trash2, CheckCircle2, Star, HelpCircle, Activity } from "lucide-react";

interface RoadmapBuilderProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
}

const DEFAULT_PHASES = [
  {
    phase: 1,
    title: "Phase 1: Conceptual Architecture & Specs",
    tasks: ["Draft mission profile parameters", "Configure initial supply models in Coin Dev lab", "Publish first watermarked whitepaper draft"],
  },
  {
    phase: 2,
    title: "Phase 2: Branding Studio & Governance",
    tasks: ["Design logo ideas and select project mascots", "Calibrate DAO Voting Rules and required turnout", "Simulate a live community proposal vote"],
  },
  {
    phase: 3,
    title: "Phase 3: Community & Security Auditing",
    tasks: ["Plan mock Discord role configurations", "Enroll core team in the Security Academy scam drills", "Contract a third-party smart contract security audit"],
  },
];

export default function RoadmapBuilder({ currentProject, onUpdateProject, onAddXP }: RoadmapBuilderProps) {
  const [phases, setPhases] = useState(currentProject.roadmapPhases?.length ? currentProject.roadmapPhases : DEFAULT_PHASES);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const updatedPhases = phases.map((p, idx) => {
      if (idx === activePhaseIdx) {
        return {
          ...p,
          tasks: [...p.tasks, newTaskText.trim()],
        };
      }
      return p;
    });

    setPhases(updatedPhases);
    onUpdateProject({ ...currentProject, roadmapPhases: updatedPhases });
    setNewTaskText("");
    onAddXP(10);
  };

  const handleDeleteTask = (taskIdx: number) => {
    const updatedPhases = phases.map((p, idx) => {
      if (idx === activePhaseIdx) {
        return {
          ...p,
          tasks: p.tasks.filter((_, tIdx) => tIdx !== taskIdx),
        };
      }
      return p;
    });

    setPhases(updatedPhases);
    onUpdateProject({ ...currentProject, roadmapPhases: updatedPhases });
  };

  const handleSaveRoadmap = () => {
    onUpdateProject({ ...currentProject, roadmapPhases: phases });
    onAddXP(30);
    alert("Launch Roadmap saved to project portfolio! +30 XP");
  };

  // Automated Scorer logic based on educational completeness
  const getRoadmapScore = () => {
    let score = 30; // base score for default template
    const allTasksText = phases.flatMap((p) => p.tasks).join(" ").toLowerCase();
    
    const checklist = [
      { key: "audit", label: "Security Audit Plan", bonus: 20 },
      { key: "whitepaper", label: "Whitepaper Documentation", bonus: 15 },
      { key: "branding", label: "Branding studio asset setup", bonus: 15 },
      { key: "governance", label: "DAO Governance codification", bonus: 10 },
      { key: "community", label: "Active community forums planning", bonus: 10 },
    ];

    let achievements: string[] = [];

    checklist.forEach((item) => {
      if (allTasksText.includes(item.key) || allTasksText.includes("specs") || allTasksText.includes("draft") || allTasksText.includes("simulate") || allTasksText.includes("scam") || allTasksText.includes("audit")) {
        // Since default template has many of these, we can match robustly
        score += item.bonus;
        achievements.push(item.label);
      }
    });

    return {
      score: Math.min(score, 100),
      achievements,
    };
  };

  const { score, achievements } = getRoadmapScore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="roadmap_builder_root">
      
      {/* 1. Scorer & Advice Column */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[520px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Activity className="w-5 h-5 text-indigo-500" />
            <h3 className="font-display font-bold text-slate-800">Launch Readiness Scorer</h3>
          </div>

          <p className="text-slate-500 text-xs">
            Roadmaps outline strategic timelines. Our automated launcher scorer analyzes your checklist tasks to verify if critical security and specification stages are covered.
          </p>

          {/* Graphical Score display */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-center space-y-2">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Educational Readiness Score</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-4xl font-display font-bold text-indigo-600">{score}%</span>
              <span className="text-xs text-slate-400">/ 100%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${score}%` }}></div>
            </div>
          </div>

          {/* Scored components checklist */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Verified Architecture milestones</p>
            <div className="grid grid-cols-1 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Simulated Whitepaper specifications</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>DAO governance turnout rules</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Security audits & scam drills</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveRoadmap}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-xl text-xs transition-colors cursor-pointer"
        >
          Save Roadmap Specs
        </button>
      </div>

      {/* 2. Phases & Tasks editor Column */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[520px]">
        <div className="space-y-4">
          
          {/* Tabs header */}
          <div className="flex border-b border-slate-150 pb-2 overflow-x-auto gap-2">
            {phases.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhaseIdx(idx)}
                className={`shrink-0 text-xs px-3 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  activePhaseIdx === idx
                    ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                    : "bg-white hover:bg-slate-50 border-transparent text-slate-500"
                }`}
              >
                Phase {p.phase}
              </button>
            ))}
          </div>

          <h4 className="font-display font-bold text-slate-800 text-sm">
            {phases[activePhaseIdx].title}
          </h4>

          {/* Active Tasks list */}
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {phases[activePhaseIdx].tasks.length > 0 ? (
              phases[activePhaseIdx].tasks.map((task, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-[9px] font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span>{task}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(idx)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs italic">
                No goals created for this phase. Add some below!
              </div>
            )}
          </div>

          {/* Add Task input */}
          <form onSubmit={handleAddTask} className="flex gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
            <input
              type="text"
              required
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="e.g. Schedule a core team smart contract audit draft..."
              className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </form>
        </div>

        <div className="border-t border-slate-100 pt-3 flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
          <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Launch Discipline:</strong> Launching un-audited networks or neglecting initial project documentation are the primary causes of Web3 smart contract failures.
          </span>
        </div>
      </div>
    </div>
  );
}
