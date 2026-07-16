import React, { useState } from "react";
import { TokenProject } from "../types";
import { MessageSquare, Users, ShieldAlert, Plus, HelpCircle, ArrowRight, Share2, Compass } from "lucide-react";

interface CommunityBuilderProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
}

const DEFAULT_CHANNELS = [
  { name: "welcome-and-rules", desc: "Intro rules, links to official watermarked docs, and warning disclaimers.", role: "Public / Everyone" },
  { name: "announcements", desc: "Official developer status logs, audit publication dates, and voting updates.", role: "Moderator Read-Only" },
  { name: "scam-alerts-and-safety", desc: "Warning messages detailing active phishers or fake support accounts.", role: "Public" },
  { name: "governance-discussion", desc: "Brainstorming and debating formal proposal specs before voting begins.", role: "Voters (Stakers)" },
  { name: "developer-audit-log", desc: "Technical updates concerning smart contract vulnerabilities and sandbox bug fixes.", role: "Developers" },
];

export default function CommunityBuilder({ currentProject, onUpdateProject, onAddXP }: CommunityBuilderProps) {
  const [channels, setChannels] = useState(currentProject.communityChannels?.length ? currentProject.communityChannels : DEFAULT_CHANNELS);
  const [newChanName, setNewChanName] = useState("");
  const [newChanDesc, setNewChanDesc] = useState("");
  const [newChanRole, setNewChanRole] = useState("Public");
  const [showAddForm, setShowAddForm] = useState(false);

  // Marketing states
  const [campType, setCampType] = useState<"education" | "speculation">("education");

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChanName.trim() || !newChanDesc.trim()) return;

    const formattedName = newChanName.toLowerCase().replace(/\s+/g, "-");
    const updated = [...channels, { name: formattedName, description: newChanDesc.trim(), roleRequired: newChanRole }];
    
    setChannels(updated);
    onUpdateProject({ ...currentProject, communityChannels: updated });
    setNewChanName("");
    setNewChanDesc("");
    setShowAddForm(false);
    onAddXP(15);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="community_builder_root">
      {/* Discord wireframe mock */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[580px] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <h3 className="font-display font-bold text-slate-800">Discord Community Wireframe</h3>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Channel
            </button>
          </div>

          <p className="text-slate-500 text-xs">
            Build a secure, scannable Discord server structure. Separating discussions helps isolate spam and verify official resources safely.
          </p>

          {showAddForm ? (
            <form onSubmit={handleAddChannel} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold text-slate-700">Configure Text Channel</h4>
              
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Channel Name (Lowercase, no spaces)</label>
                <input
                  type="text"
                  required
                  value={newChanName}
                  onChange={(e) => setNewChanName(e.target.value)}
                  placeholder="e.g. scam-bounty-log"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Purpose Description</label>
                <input
                  type="text"
                  required
                  value={newChanDesc}
                  onChange={(e) => setNewChanDesc(e.target.value)}
                  placeholder="Explain channel permissions and focus areas..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Access Role Required</label>
                <select
                  value={newChanRole}
                  onChange={(e) => setNewChanRole(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 font-mono"
                >
                  <option value="Public">Public / Everyone</option>
                  <option value="Voters">Voters / Stakers</option>
                  <option value="Moderators">Moderators / Team</option>
                </select>
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
                  Create Channel
                </button>
              </div>
            </form>
          ) : (
            /* Discord channel list UI */
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {channels.map((chan, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-slate-400 font-mono text-lg shrink-0 mt-0.5">#</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-mono text-xs font-bold text-slate-700">{chan.name}</h4>
                      <span className="text-[9px] font-semibold bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-mono uppercase">
                        {chan.roleRequired || "Public"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans leading-normal">{chan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center gap-1">
          <span>Discord Blueprint Integration</span>
        </div>
      </div>

      {/* Web3 Marketing guidelines */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[580px] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Compass className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-slate-800">Responsible Marketing Planner</h3>
          </div>

          <p className="text-slate-500 text-xs">
            A cryptocurrency's growth depends on how it is marketed. Speculative marketing leads to retail losses and legal audits. Responsible marketing builds security and organic product adoption.
          </p>

          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setCampType("education")}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                campType === "education"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Educational Strategy
            </button>
            <button
              onClick={() => {
                setCampType("speculation");
                alert("⚠️ Simulated Auditing Flag: Hype/Speculative campaigns trigger alert rules on smart networks!");
              }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                campType === "speculation"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Hype / Speculation
            </button>
          </div>

          {campType === "education" ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 text-emerald-800 space-y-2">
                <h5 className="font-display font-bold text-xs flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  Responsible Campaign Template
                </h5>
                <p className="text-[11px] font-sans leading-relaxed">
                  Focus on outlining <strong>real smart contract audits</strong>, seed safety awareness, and detailed descriptions of your token utility.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <p className="font-bold text-slate-700">Recommended Marketing Deliverables:</p>
                <div className="space-y-1.5 font-sans text-slate-600">
                  <div className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Write detailed medium articles explaining token allocation locks.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Host quiz challenges rewarding users for acing security questions.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Partner with white-hat dev security groups to audit the core spec.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-150 rounded-xl p-4 text-red-800 space-y-2">
                <h5 className="font-display font-bold text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  Speculation/Hype Danger Warning
                </h5>
                <p className="text-[11px] font-sans leading-relaxed">
                  Promising 1,000x yields, advertising 'Up Only' prices, or partnering with paid influencers who don't understand the token specifications constitutes fraudulent practice in global regulatory domains.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <p className="font-bold text-red-700">Dangers of Unrealistic Hype:</p>
                <div className="space-y-1.5 font-sans text-slate-500">
                  <div className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Massive capital loss for retail participants during inevitable correction dumps.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Permanent loss of developer integrity and builder brand equity.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Immediate SEC / regulator lawsuits for conducting unvetted securities offerings.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-300" />
          <span>Fictional Community Safety: Calibrated</span>
        </div>
      </div>
    </div>
  );
}
