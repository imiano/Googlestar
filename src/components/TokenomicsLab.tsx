import React, { useState, useEffect } from "react";
import { TokenProject } from "../types";
import { HelpCircle, Sparkles, Check, AlertTriangle, ShieldCheck } from "lucide-react";

interface TokenomicsLabProps {
  currentProject: TokenProject;
  onUpdateProject: (project: TokenProject) => void;
  onAddXP: (amount: number) => void;
}

export default function TokenomicsLab({ currentProject, onUpdateProject, onAddXP }: TokenomicsLabProps) {
  const [maxSupply, setMaxSupply] = useState(currentProject.maxSupply || 1000000000);
  const [circulatingPct, setCirculatingPct] = useState(50); // initial circulating %

  // Allocations (should ideally sum to 100)
  const [comm, setComm] = useState(currentProject.allocationCommunity || 40);
  const [dev, setDev] = useState(currentProject.allocationDevelopment || 25);
  const [treasury, setTreasury] = useState(currentProject.allocationTreasury || 20);
  const [eco, setEco] = useState(currentProject.allocationEcosystem || 15);

  const sumAllocations = comm + dev + treasury + eco;

  useEffect(() => {
    // If props update, set local states
    if (currentProject) {
      setMaxSupply(currentProject.maxSupply || 1000000000);
      setComm(currentProject.allocationCommunity || 40);
      setDev(currentProject.allocationDevelopment || 25);
      setTreasury(currentProject.allocationTreasury || 20);
      setEco(currentProject.allocationEcosystem || 15);
    }
  }, [currentProject]);

  const handleSaveTokenomics = () => {
    if (sumAllocations !== 100) return;
    
    const updated = {
      ...currentProject,
      maxSupply,
      circulatingSupply: Math.floor(maxSupply * (circulatingPct / 100)),
      allocationCommunity: comm,
      allocationDevelopment: dev,
      allocationTreasury: treasury,
      allocationEcosystem: eco,
    };
    onUpdateProject(updated);
    onAddXP(40);
    alert("Tokenomics Lab Specs synchronized with current token! +40 XP");
  };

  // Safe rebalancing helper to auto-fit 100% when one slider changes
  const adjustAllocations = (changed: "comm" | "dev" | "treasury" | "eco", newVal: number) => {
    if (changed === "comm") {
      setComm(newVal);
    } else if (changed === "dev") {
      setDev(newVal);
    } else if (changed === "treasury") {
      setTreasury(newVal);
    } else if (changed === "eco") {
      setEco(newVal);
    }
  };

  // Helper to calculate SVG pie chart paths
  const getPieSlices = () => {
    const values = [comm, dev, treasury, eco];
    const colors = ["#8b5cf6", "#fbbf24", "#06b6d4", "#10b981"]; // Purple, Gold, Cyan, Green
    const names = ["Community", "Development", "Treasury", "Ecosystem"];
    
    let cumulativePercent = 0;
    
    return values.map((val, idx) => {
      if (val <= 0) return null;
      const startPercent = cumulativePercent;
      cumulativePercent += val / 100;
      const endPercent = cumulativePercent;

      // Coordinate helper
      const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
      };

      const [startX, startY] = getCoordinatesForPercent(startPercent);
      const [endX, endY] = getCoordinatesForPercent(endPercent);

      const largeArcFlag = val > 50 ? 1 : 0;

      // Draw path
      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
      ].join(" ");

      return {
        pathData,
        color: colors[idx],
        name: names[idx],
        value: val
      };
    }).filter(Boolean);
  };

  const slices = getPieSlices();

  // Audit alerts based on allocation
  const getAudits = () => {
    const list = [];
    if (dev > 30) {
      list.push({
        type: "danger",
        text: `High Centralization Risk: Founders/Advisors allocate ${dev}%. Over 30% creates systemic 'dumping' panic and low decentralization scores.`,
      });
    } else if (dev <= 15) {
      list.push({
        type: "success",
        text: `Optimized Developer Stake: ${dev}% is healthy for multi-year operations incentives.`,
      });
    }

    if (comm < 35) {
      list.push({
        type: "warning",
        text: `Low Community Float: ${comm}% is too low to distribute governance or sustain standard engagement rewards.`,
      });
    } else if (comm >= 45) {
      list.push({
        type: "success",
        text: `Fair Play Float: Generous ${comm}% allocated to community ensures active decentralization prospects!`,
      });
    }

    if (maxSupply > 50000000000) {
      list.push({
        type: "info",
        text: `Micro-Pricing Structure: With ${maxSupply.toLocaleString()} Max Supply, single token valuations will likely be pennies. This appeals psychologically to retail but adds storage computation weight.`,
      });
    } else if (maxSupply < 10000000) {
      list.push({
        type: "info",
        text: `Extreme Scarcity Spec: With under 10M supply, individual token prices will seem high. Good for store of value simulations, low speed velocity.`,
      });
    }

    return list;
  };

  const audits = getAudits();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="tokenomics_lab_root">
      {/* Allocation Sliders */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[650px] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-800 text-sm">Dynamic Allocation Sliders</h3>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-lg ${
              sumAllocations === 100
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700 font-bold"
            }`}>
              Total: {sumAllocations}% {sumAllocations === 100 ? "✓" : "⚠️ Must sum to 100%"}
            </span>
          </div>

          <p className="text-slate-500 text-xs">
            Distribute your fictional token's treasury. Sliders should sum up to exactly 100% to represent a valid tokenomics model.
          </p>

          {/* Community */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-brand-purple rounded-full"></span>
                Community Rewards & Airdrops
              </span>
              <span className="font-mono">{comm}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={comm}
              onChange={(e) => adjustAllocations("comm", parseInt(e.target.value))}
              className="w-full accent-brand-purple"
            />
          </div>

          {/* Dev */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-brand-gold rounded-full"></span>
                Developer & Founder Stake
              </span>
              <span className="font-mono">{dev}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={dev}
              onChange={(e) => adjustAllocations("dev", parseInt(e.target.value))}
              className="w-full accent-brand-gold"
            />
          </div>

          {/* Treasury */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></span>
                Project Treasury Reserve
              </span>
              <span className="font-mono">{treasury}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={treasury}
              onChange={(e) => adjustAllocations("treasury", parseInt(e.target.value))}
              className="w-full accent-brand-cyan"
            />
          </div>

          {/* Ecosystem */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                Ecosystem Grants & Partners
              </span>
              <span className="font-mono">{eco}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={eco}
              onChange={(e) => adjustAllocations("eco", parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Supply Parameters</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1 font-sans">Max Cap Supply</label>
                <select
                  value={maxSupply}
                  onChange={(e) => setMaxSupply(parseInt(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 font-mono"
                >
                  <option value={1000000}>1,000,000 (Bitcoin Cap)</option>
                  <option value={100000000}>100,000,000</option>
                  <option value={1000000000}>1,000,000,000 (1 Billion)</option>
                  <option value={10000000000}>10,000,000,000</option>
                  <option value={100000000000}>100,000,000,000 (MEME Supply)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1 font-sans">Initial Circulating Float ({circulatingPct}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={circulatingPct}
                  onChange={(e) => setCirculatingPct(parseInt(e.target.value))}
                  className="w-full accent-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveTokenomics}
          disabled={sumAllocations !== 100}
          className="w-full mt-4 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium py-2.5 rounded-xl text-sm transition-all cursor-pointer"
        >
          {sumAllocations === 100 ? "Sync Tokenomics Specs" : "Fix Allocations Sum to Sync"}
        </button>
      </div>

      {/* Visualizer & Audit Column */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[650px] overflow-y-auto">
        <div className="space-y-6">
          <h3 className="font-display font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">Real-time Visualization</h3>

          {/* SVG Pie Chart */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            {sumAllocations > 0 ? (
              <svg className="w-36 h-36 transform -rotate-90 rounded-full" viewBox="-1 -1 2 2">
                {slices.map((slice: any, idx) => (
                  <path
                    key={idx}
                    d={slice.pathData}
                    fill={slice.color}
                    className="transition-all hover:scale-105 duration-200"
                  />
                ))}
              </svg>
            ) : (
              <div className="w-36 h-36 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xs">
                No slices
              </div>
            )}

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {slices.map((slice: any, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }}></span>
                  <span className="text-slate-600 font-medium">{slice.name}:</span>
                  <span className="font-mono font-bold text-slate-800">{slice.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Metrics */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Automated Tokenomics Audit</h4>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {audits.map((aud, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex gap-2.5 text-xs ${
                    aud.type === "danger"
                      ? "bg-red-50 border-red-100 text-red-800"
                      : aud.type === "warning"
                      ? "bg-amber-50 border-amber-100 text-amber-800"
                      : aud.type === "success"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                      : "bg-blue-50 border-blue-100 text-blue-800"
                  }`}
                >
                  {aud.type === "danger" || aud.type === "warning" ? (
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                  )}
                  <span>{aud.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Fully Diluted Value (FDV) Cap: Simulated</span>
          <span>Coin Dev Tokenomics Lab</span>
        </div>
      </div>
    </div>
  );
}
