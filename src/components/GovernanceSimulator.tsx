import React, { useState, useEffect } from "react";
import { TokenProject } from "../types";
import { Users, Vote, AlertTriangle, Sparkles, Plus, Loader2, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";

interface GovernanceSimulatorProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "pending" | "voting" | "passed" | "rejected";
  votesFor: number;
  votesAgainst: number;
}

const DEFAULT_PROPOSALS: Proposal[] = [
  {
    id: "prop_1",
    title: "Sponsor Local High School Web3 Hackathon with 25,000 Tokens",
    description: "Provide learning micro-grants and host a safe coding tournament using our educational coin simulation sandbox to inspire responsible innovation.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
  },
  {
    id: "prop_2",
    title: "Change Fictional Community Mascot to 'CyberOwl'",
    description: "Incorporate a wise, nocturnal companion into our branding guidelines to represent continuous, reliable peer security auditing standards.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
  },
  {
    id: "prop_3",
    title: "Airdrop 5% of Treasury Reserves to Eco-clean Contributors",
    description: "Distribute rewards to students who verified planting trees, modeling fair incentive alignment across our targeted conservation industry.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
  }
];

const SIMULATED_COMMENT_POOL = [
  { user: "@Web3Scholar", text: "Education is our best tool. Fully support this proposal!", agree: true },
  { user: "@TreasuryGuard", text: "Are we unlocking too many tokens at once? High inflation warning!", agree: false },
  { user: "@EcoStaker", text: "This aligns perfectly with our initial mission profile. Voting YES.", agree: true },
  { user: "@ConsensusDev", text: "The coding spec looks verified. Staking my full vote weight.", agree: true },
  { user: "@AuditSentinel", text: "Wait, does this contract require a fresh third party audit first?", agree: false },
];

export default function GovernanceSimulator({
  currentProject,
  onUpdateProject,
  onAddXP,
  onUnlockBadge,
}: GovernanceSimulatorProps) {
  const [quorum, setQuorum] = useState(currentProject.governanceVotingRules?.quorum || 15);
  const [minBalance, setMinBalance] = useState(currentProject.governanceVotingRules?.minProposalPower || 5000);
  
  // Custom list of proposals stored locally in component state
  const [proposals, setProposals] = useState<Proposal[]>(DEFAULT_PROPOSALS);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Voting Simulation State
  const [activePropId, setActivePropId] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simVotesFor, setSimVotesFor] = useState(0);
  const [simVotesAgainst, setSimVotesAgainst] = useState(0);
  const [simComments, setSimComments] = useState<{ user: string; text: string }[]>([]);
  const [simStep, setSimStep] = useState(0);

  const handleSaveRules = () => {
    onUpdateProject({
      ...currentProject,
      governanceVotingRules: {
        quorum,
        duration: 3,
        minProposalPower: minBalance,
      }
    });
    onAddXP(20);
    alert("DAO governance rules saved to current token! +20 XP");
  };

  const handleAddProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const prop: Proposal = {
      id: `prop_custom_${Date.now()}`,
      title: newTitle,
      description: newDesc,
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
    };

    setProposals((prev) => [...prev, prop]);
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(false);
    onAddXP(25);
  };

  // Simulated live governance vote
  const startSimulation = (propId: string) => {
    if (simulating) return;
    setActivePropId(propId);
    setSimulating(true);
    setSimVotesFor(0);
    setSimVotesAgainst(0);
    setSimComments([]);
    setSimStep(1);

    // Update proposal status in list
    setProposals((prev) => prev.map((p) => p.id === propId ? { ...p, status: "voting" } : p));
  };

  useEffect(() => {
    if (!simulating || simStep === 0) return;

    if (simStep <= 5) {
      const timer = setTimeout(() => {
        // Increment votes
        const additionalFor = Math.floor(Math.random() * 40) + 15;
        const additionalAgainst = Math.floor(Math.random() * 20) + 5;
        
        setSimVotesFor((prev) => prev + additionalFor);
        setSimVotesAgainst((prev) => prev + additionalAgainst);

        // Append forum comment
        const comment = SIMULATED_COMMENT_POOL[simStep - 1] || SIMULATED_COMMENT_POOL[0];
        setSimComments((prev) => [...prev, comment]);

        setSimStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // End simulation, compute results
      setSimulating(false);
      const totalVoted = simVotesFor + simVotesAgainst;
      const targetQuorumVal = (currentProject.maxSupply || 1000000000) * (quorum / 100);
      
      // Since it's a simulation, let's say community turns out relative to a base of 1000 simulated members
      const passed = simVotesFor > simVotesAgainst && totalVoted >= quorum * 5;

      setProposals((prev) => prev.map((p) => {
        if (p.id === activePropId) {
          return {
            ...p,
            status: passed ? "passed" : "rejected",
            votesFor: simVotesFor,
            votesAgainst: simVotesAgainst,
          };
        }
        return p;
      }));

      onAddXP(50);
      if (passed) {
        onUnlockBadge("governance_statesman");
      }
    }
  }, [simulating, simStep]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8" id="governance_simulator_root">
      
      {/* 1. DAO Voting Rules configuration */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[600px]">
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-indigo-500" />
            <h3 className="font-display font-bold text-slate-800">DAO Charter Settings</h3>
          </div>

          <p className="text-slate-500 text-xs">
            A Decentralized Autonomous Organization (DAO) is governed by rules codified on chain. Set your voting guidelines below to configure your custom charter.
          </p>

          {/* Quorum Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Required Quorum Turnout</span>
              <span className="font-mono">{quorum}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={quorum}
              onChange={(e) => setQuorum(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              Minimum percentage of total supply required to vote for a proposal to be considered legally valid.
            </p>
          </div>

          {/* Min Balance Input */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Min Proposal Power</label>
            <input
              type="number"
              value={minBalance}
              onChange={(e) => setMinBalance(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
            />
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              Minimum token stake balance required for a single community address to submit a formal proposal draft.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[10px] text-amber-800 flex gap-2 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Governance Balance:</strong> Extremely high quorums make passing proposals impossible, while low quorums expose the DAO treasury to malicious hostile takeovers.
            </span>
          </div>

          <button
            onClick={handleSaveRules}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Apply Charter Charter Rules
          </button>
        </div>
      </div>

      {/* 2. Proposals List and form */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[600px] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-display font-bold text-slate-800 text-sm">Community Proposals</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Draft New</span>
            </button>
          </div>

          {showAddForm ? (
            /* Proposal Form */
            <form onSubmit={handleAddProposal} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold text-slate-700">Submit Proposal Draft</h4>
              
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Host verified local tree plantation campaign"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain utility benefits, budget requirements, and verification protocols..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="w-1/2 border border-slate-200 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Publish
                </button>
              </div>
            </form>
          ) : (
            /* Proposals list */
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {proposals.map((prop) => (
                <div key={prop.id} className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                      prop.status === "passed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : prop.status === "rejected"
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : prop.status === "voting"
                        ? "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>
                      {prop.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {prop.id.slice(0, 8)}</span>
                  </div>

                  <h4 className="font-display font-semibold text-xs text-slate-800 leading-snug">{prop.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans line-clamp-3">{prop.description}</p>

                  {prop.status === "pending" && (
                    <button
                      onClick={() => startSimulation(prop.id)}
                      disabled={simulating}
                      className="w-full mt-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Vote className="w-3.5 h-3.5" />
                      Trigger Vote Simulation
                    </button>
                  )}

                  {(prop.status === "passed" || prop.status === "rejected") && (
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-50 pt-2">
                      <span>Yes: {prop.votesFor}</span>
                      <span>No: {prop.votesAgainst}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400">
          Governance Charter: Activated
        </div>
      </div>

      {/* 3. Simulated Live Stream */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between h-[600px] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Vote className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-slate-800">Simulated Voting Forum</h3>
          </div>

          {activePropId && simulating ? (
            /* Simulated active stream */
            <div className="space-y-5">
              <div className="text-center bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-indigo-700">Synchronizing Ledger Votes...</p>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="bg-white p-2 rounded-lg border border-slate-150">
                    <p className="text-[9px] uppercase font-mono text-slate-400">YES weight</p>
                    <p className="text-sm font-mono font-bold text-emerald-600">{simVotesFor} K</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-150">
                    <p className="text-[9px] uppercase font-mono text-slate-400">NO weight</p>
                    <p className="text-sm font-mono font-bold text-rose-600">{simVotesAgainst} K</p>
                  </div>
                </div>
              </div>

              {/* Comments Feed */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
                  Live Voter Feedback
                </h5>
                {simComments.map((com, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 text-[11px] leading-relaxed">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-slate-700">{com.user}</span>
                      <span className={`text-[8px] font-bold px-1.5 rounded ${
                        com.agree ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        {com.agree ? "VOTING YES" : "VOTING NO"}
                      </span>
                    </div>
                    <p className="text-slate-500 font-sans">{com.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Standby view */
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center space-y-3">
              <Vote className="w-12 h-12 text-slate-200 animate-bounce" />
              <div>
                <h4 className="font-display font-semibold text-slate-700 text-xs">Simulated Ledgers Idle</h4>
                <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-normal font-sans">
                  Choose a community proposal from the list and click 'Trigger Vote Simulation' to view real-time voter metrics.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Fictional Ledger Consensus Engine</span>
        </div>
      </div>
    </div>
  );
}
