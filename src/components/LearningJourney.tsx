import React, { useState } from "react";
import { LessonModule, UserStats } from "../types";
import { LESSON_MODULES } from "../data";
import { BookOpen, Compass, ChevronRight, CheckCircle, Award, Play, ShieldAlert, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

interface LearningJourneyProps {
  userStats: UserStats;
  onUpdateStats: (stats: UserStats) => void;
  onAddXP: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export default function LearningJourney({ userStats, onUpdateStats, onAddXP, onUnlockBadge }: LearningJourneyProps) {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Module 1 Sim State
  const [blockData1, setBlockData1] = useState("Satoshi sends 5 BTC to Hal Finney");
  const [blockHash1, setBlockHash1] = useState("0000a3f8b92d8f9923b7e8823793e79");
  const [isBlockTampered, setIsBlockTampered] = useState(false);

  // Module 3 Sim State
  const [trilemmaChain, setTrilemmaChain] = useState<"btc" | "eth" | "sol">("btc");

  // Module 4 Sim State
  const [consensusMode, setConsensusMode] = useState<"pow" | "pos">("pow");
  const [isConsensusRunning, setIsConsensusRunning] = useState(false);
  const [consensusProgress, setConsensusProgress] = useState(0);

  const activeModule = LESSON_MODULES[activeModuleIdx];
  const isUnlocked = userStats.unlockedModules.includes(activeModule.id);

  const handleTamperM1 = (txt: string) => {
    setBlockData1(txt);
    if (txt !== "Satoshi sends 5 BTC to Hal Finney") {
      setIsBlockTampered(true);
      // Simulate hash break
      setBlockHash1("e829bf8a29b3f3e82b3a9e223f1c99a (TAMPERED - LINK BROKEN!)");
    } else {
      setIsBlockTampered(false);
      setBlockHash1("0000a3f8b92d8f9923b7e8823793e79");
    }
  };

  const runConsensusSimulation = () => {
    if (isConsensusRunning) return;
    setIsConsensusRunning(true);
    setConsensusProgress(0);

    const interval = setInterval(() => {
      setConsensusProgress((prev) => {
        const step = consensusMode === "pos" ? 25 : 8;
        if (prev + step >= 100) {
          clearInterval(interval);
          setIsConsensusRunning(false);
          onAddXP(10);
          return 100;
        }
        return prev + step;
      });
    }, 150);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let allCorrect = true;
    activeModule.quiz.forEach((q) => {
      if (quizAnswers[q.id] !== q.correctIndex) {
        allCorrect = false;
      }
    });

    setQuizSubmitted(true);
    setQuizPassed(allCorrect);

    if (allCorrect) {
      onAddXP(40);
      
      // Unlock badge for Module 1
      if (activeModule.id === 1) {
        onUnlockBadge("blockchain_pioneer");
      }

      // Unlock next module in stats
      const nextId = activeModule.id + 1;
      if (nextId <= LESSON_MODULES.length && !userStats.unlockedModules.includes(nextId)) {
        onUpdateStats({
          ...userStats,
          unlockedModules: [...userStats.unlockedModules, nextId],
          completedQuizzes: [...userStats.completedQuizzes, activeModule.id.toString()],
        });
      }
    }
  };

  const handleNextModule = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setActiveModuleIdx((prev) => Math.min(prev + 1, LESSON_MODULES.length - 1));
  };

  const trilemmaData = {
    btc: { dec: 95, sec: 98, sca: 10, note: "Maximum decentralization and absolute ledger security, but low transactional throughput capacity." },
    eth: { dec: 80, sec: 90, sca: 45, note: "Strong decentralization and smart contract execution base; handles scaling via off-chain Layer 2 rollups." },
    sol: { dec: 40, sec: 75, sca: 95, note: "Optimized for extreme scalability and cheap gas costs, with more centralized validator cluster constraints." }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8" id="learning_journey_root">
      {/* Module curriculum navigation */}
      <div className="xl:col-span-1 space-y-4 h-[620px] overflow-y-auto pr-1">
        <h3 className="font-display font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-500" />
          Interactive Curriculum
        </h3>

        {LESSON_MODULES.map((mod, idx) => {
          const unlocked = userStats.unlockedModules.includes(mod.id);
          const active = activeModuleIdx === idx;
          const completed = userStats.completedQuizzes.includes(mod.id.toString()) || (mod.id === 1 && userStats.unlockedModules.includes(2));

          return (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModuleIdx(idx);
                setQuizAnswers({});
                setQuizSubmitted(false);
                setQuizPassed(false);
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 relative cursor-pointer ${
                active
                  ? "bg-slate-850 border-slate-900 text-white shadow-md scale-[1.02]"
                  : unlocked
                  ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                  : "bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed"
              }`}
            >
              <span className="text-2xl mt-0.5">{mod.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider">Module {mod.id}</h4>
                  {completed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                </div>
                <h3 className="font-display font-bold text-sm mt-0.5 leading-snug">{mod.title}</h3>
                <p className={`text-[11px] mt-1.5 leading-normal font-sans ${active ? "text-slate-300" : "text-slate-500"}`}>
                  {mod.shortDesc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Module View Workspace */}
      <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[620px] overflow-y-auto">
        {isUnlocked ? (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                Active Study Module
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-800 mt-2 tracking-tight">
                {activeModule.title}
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                {activeModule.fullDesc}
              </p>
            </div>

            {/* Render studied sections */}
            <div className="space-y-4 font-sans text-sm text-slate-600 leading-relaxed">
              {activeModule.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <h4 className="font-display font-semibold text-slate-800 text-sm">{sec.title}</h4>
                  <p>{sec.content}</p>
                </div>
              ))}
            </div>

            {/* MODULE SPECIFIC INTERACTIVE MINI-SIMULATORS */}
            <div className="border-t border-slate-100 pt-5 space-y-3.5">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Lesson Sandbox Simulator
              </h4>

              {/* Module 1: Cryptographic block chain visualizer */}
              {activeModule.id === 1 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 space-y-3">
                  <p className="text-[11px] text-slate-500 font-sans">
                    <strong>Interactive Challenge:</strong> Below is Block #1. Type in the transactions box to modify data, and observe how the cryptographic signature breaks.
                  </p>

                  <div className={`p-3.5 rounded-xl border transition-colors ${isBlockTampered ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`}>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-2">
                      <span className="text-slate-400">Block Index: 01</span>
                      <span className="text-right col-span-2 truncate">Prev Hash: 0000000000000000</span>
                    </div>

                    <label className="block text-[10px] text-slate-400 mb-1">Ledger Transaction Record</label>
                    <input
                      type="text"
                      value={blockData1}
                      onChange={(e) => handleTamperM1(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800"
                    />

                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">Block Signature (Hash):</span>
                      <span className={`font-mono font-bold truncate pr-1 ${isBlockTampered ? "text-red-600" : "text-emerald-600"}`}>
                        {blockHash1}
                      </span>
                    </div>
                  </div>

                  {isBlockTampered && (
                    <div className="bg-red-100 text-red-800 p-2.5 rounded-lg text-[10px] flex gap-1.5 leading-normal">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span>
                        <strong>Ledger Audit Error:</strong> Altering block transactions invalidated the block's cryptographic seal. Nodes on other networks will instantly reject this ledger!
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Module 2: Coins vs Tokens matrix */}
              {activeModule.id === 2 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 text-center">
                    <span className="text-2xl">🪙</span>
                    <h5 className="font-display font-semibold text-slate-800 text-xs">Fictional Gas Coin (SOL)</h5>
                    <p className="text-[10px] text-slate-400 font-sans">Required to pay base network compute fees. Operates directly on the layer 1 protocol ledger.</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 text-center">
                    <span className="text-2xl">🧩</span>
                    <h5 className="font-display font-semibold text-slate-800 text-xs">Fictional Custom Token (USDC)</h5>
                    <p className="text-[10px] text-slate-400 font-sans">Created via custom smart contracts hosted on Ethereum/Solana to track application asset ownership.</p>
                  </div>
                </div>
              )}

              {/* Module 3: Blockchain Trilemma visualizer */}
              {activeModule.id === 3 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 space-y-3">
                  <div className="flex gap-1 bg-white border border-slate-250 p-1 rounded-lg">
                    {["btc", "eth", "sol"].map((chain) => (
                      <button
                        key={chain}
                        onClick={() => setTrilemmaChain(chain as any)}
                        className={`flex-1 text-[10px] py-1 font-semibold rounded-md transition-all cursor-pointer ${
                          trilemmaChain === chain
                            ? "bg-slate-800 text-white"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {chain.toUpperCase()} Engine
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Security Shield Weight:</span>
                      <span className="font-mono font-bold text-indigo-600">{trilemmaData[trilemmaChain].sec}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Decentralization Ratio:</span>
                      <span className="font-mono font-bold text-indigo-600">{trilemmaData[trilemmaChain].dec}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Scalability (Tx Speed):</span>
                      <span className="font-mono font-bold text-indigo-600">{trilemmaData[trilemmaChain].sca}%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic mt-2 leading-relaxed font-sans">{trilemmaData[trilemmaChain].note}</p>
                  </div>
                </div>
              )}

              {/* Module 4: Consensus simulation progress */}
              {activeModule.id === 4 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <button
                      onClick={() => setConsensusMode("pow")}
                      className={`flex-1 py-1.5 rounded-l-lg border border-r-0 transition-colors cursor-pointer ${
                        consensusMode === "pow" ? "bg-slate-800 text-white border-slate-900" : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      Proof of Work Mining
                    </button>
                    <button
                      onClick={() => setConsensusMode("pos")}
                      className={`flex-1 py-1.5 rounded-r-lg border transition-colors cursor-pointer ${
                        consensusMode === "pos" ? "bg-slate-800 text-white border-slate-900" : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      Proof of Stake Validation
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-150 space-y-2.5">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Validator energy footprint:</span>
                      <span className="font-bold">{consensusMode === "pow" ? "100% High" : "0.01% Ultra-low"}</span>
                    </div>

                    <button
                      onClick={runConsensusSimulation}
                      disabled={isConsensusRunning}
                      className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Trigger Simulated consensus
                    </button>

                    {isConsensusRunning && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-indigo-600 font-mono">
                          <span>Mined / Validating blocks...</span>
                          <span>{consensusProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: `${consensusProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MULTIPLE CHOICE QUIZ AT THE END OF STUDY */}
            <div className="border-t border-slate-250 pt-6 space-y-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-display font-bold text-slate-800 text-sm">Review Quiz Center</h3>
              </div>

              <div className="space-y-4">
                {activeModule.quiz.map((q) => (
                  <div key={q.id} className="space-y-2 text-xs">
                    <p className="font-semibold text-slate-800 font-sans">{q.question}</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                              quizSubmitted
                                ? q.correctIndex === oIdx
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                  : isSelected
                                  ? "bg-red-50 border-red-300 text-red-800"
                                  : "bg-slate-50 border-slate-150 text-slate-400"
                                : isSelected
                                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && isUnlocked && (
                      <p className="text-[11px] text-slate-500 font-sans bg-slate-50 border border-slate-150 p-2.5 rounded-lg leading-normal mt-1.5">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length !== activeModule.quiz.length}
                  className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <div className="text-center space-y-3">
                  {quizPassed ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-xs">
                      <p className="font-semibold">🌟 Study Module Passed! +40 XP</p>
                      {activeModuleIdx < LESSON_MODULES.length - 1 ? (
                        <button
                          onClick={handleNextModule}
                          className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Unlock Next Module
                        </button>
                      ) : (
                        <p className="mt-1">Congratulations! You have unlocked all modules. Build and design safely!</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-xs">
                      <p className="font-semibold">⚠️ Mismatched Answers detected.</p>
                      <button
                        onClick={() => {
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                          setQuizPassed(false);
                        }}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Retry Quiz Challenge
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center space-y-3">
            <ShieldAlert className="w-12 h-12 text-slate-200" />
            <div>
              <h4 className="font-display font-semibold text-slate-700">Module Locked</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-normal font-sans">
                You must complete previous study modules and pass quizzes successfully to unlock this course chapter!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
