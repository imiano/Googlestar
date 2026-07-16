import React, { useState } from "react";
import { SCENARIO_CHALLENGES } from "../data";
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, RefreshCw, Key, ShieldCheck } from "lucide-react";

interface SecurityAcademyProps {
  onAddXP: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

const SEED_PHRASE_WORDS = [
  "solar", "orbit", "quantum", "gravity", "nebula", "matrix",
  "proton", "galaxy", "stellar", "magnet", "voyager", "pioneer"
];

export default function SecurityAcademy({ onAddXP, onUnlockBadge }: SecurityAcademyProps) {
  // Scenarios State
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Seed Phrase Drill State
  const [drillStep, setDrillStep] = useState<"show" | "test" | "success" | "fail">("show");
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedDrillWords, setSelectedDrillWords] = useState<string[]>([]);

  const activeScenario = SCENARIO_CHALLENGES[activeScenarioIdx];

  const handleScenarioSubmit = (optionIdx: number) => {
    if (answered) return;
    setSelectedOption(optionIdx);
    setAnswered(true);

    const isCorrect = activeScenario.options[optionIdx].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      onAddXP(activeScenario.options[optionIdx].XP);
      // If completed all scenarios, award the Sentinel badge!
      if (activeScenarioIdx === SCENARIO_CHALLENGES.length - 1) {
        onUnlockBadge("security_sentinel");
      }
    }
  };

  const nextScenario = () => {
    setSelectedOption(null);
    setAnswered(false);
    setActiveScenarioIdx((prev) => (prev + 1) % SCENARIO_CHALLENGES.length);
  };

  const startSeedDrill = () => {
    setShuffledWords([...SEED_PHRASE_WORDS].sort(() => Math.random() - 0.5));
    setSelectedDrillWords([]);
    setDrillStep("test");
  };

  const selectDrillWord = (word: string) => {
    if (selectedDrillWords.includes(word)) {
      setSelectedDrillWords((prev) => prev.filter((w) => w !== word));
    } else {
      setSelectedDrillWords((prev) => [...prev, word]);
    }
  };

  const verifySeedPhrase = () => {
    const isCorrect = selectedDrillWords.every((w, i) => w === SEED_PHRASE_WORDS[i]) && 
                      selectedDrillWords.length === SEED_PHRASE_WORDS.length;
    if (isCorrect) {
      setDrillStep("success");
      onAddXP(50);
    } else {
      setDrillStep("fail");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="security_academy_root">
      {/* Scenario Game Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[550px]">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="font-display font-bold text-slate-800">Scam Detection Scenarios</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-700 rounded-lg">
              Scenario {activeScenarioIdx + 1} of {SCENARIO_CHALLENGES.length}
            </span>
          </div>

          <h4 className="font-display font-semibold text-lg text-slate-800 mb-3">
            {activeScenario.title}
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-sans">
            {activeScenario.situation}
          </p>

          <div className="space-y-3">
            {activeScenario.options.map((opt, i) => (
              <button
                key={i}
                disabled={answered}
                onClick={() => handleScenarioSubmit(i)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  answered
                    ? opt.correct
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : selectedOption === i
                      ? "bg-red-50 border-red-300 text-red-800"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-mono font-bold text-xs ${
                  answered
                    ? opt.correct
                      ? "bg-emerald-500 text-white"
                      : selectedOption === i
                      ? "bg-red-500 text-white"
                      : "bg-slate-200 text-slate-400"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          {answered && (
            <div className={`mt-5 p-3.5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
              activeScenario.options[selectedOption!].correct
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}>
              {activeScenario.options[selectedOption!].correct ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
              )}
              <div>
                <p className="font-semibold">Mentor Verdict</p>
                <p className="mt-0.5">{activeScenario.options[selectedOption!].feedback}</p>
                {activeScenario.options[selectedOption!].correct && (
                  <p className="font-bold text-emerald-600 mt-1">+30 XP Awarded!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {answered && (
          <button
            onClick={nextScenario}
            className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm transition-all cursor-pointer"
          >
            Next Challenge
          </button>
        )}
      </div>

      {/* Seed Phrase Recovery Drill Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[550px]">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-500" />
              <h3 className="font-display font-bold text-slate-800">Seed Phrase Recovery Drill</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
              Practical Exercise
            </span>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            A private key seed phrase is the master key to your crypto assets. It is never stored on servers, and cannot be reset. This drill teaches you how to record and verify a seed phrase.
          </p>

          {drillStep === "show" && (
            <div className="space-y-4">
              <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider text-center">Your Simulated 12-Word Seed Phrase</p>
                <div className="grid grid-cols-3 gap-2">
                  {SEED_PHRASE_WORDS.map((word, idx) => (
                    <div key={idx} className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-mono flex items-center gap-1.5">
                      <span className="text-slate-500 w-3 text-right">{idx + 1}.</span>
                      <span className="font-semibold text-slate-200">{word}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                <span>
                  <strong>Important:</strong> In the real world, you should write this down on physical paper and store it in a secure fireproof vault. Never screenshot or copy-paste it!
                </span>
              </div>
              <button
                onClick={startSeedDrill}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                I have Written It Down
              </button>
            </div>
          )}

          {drillStep === "test" && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Reassemble Your Seed Phrase in EXACT Chronological Order:</p>
                <div className="min-h-[70px] bg-white border border-slate-200 rounded-lg p-2 flex flex-wrap gap-1.5">
                  {selectedDrillWords.map((word, idx) => (
                    <span
                      key={idx}
                      onClick={() => selectDrillWord(word)}
                      className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-2 py-1 rounded font-mono font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                      {word}
                    </span>
                  ))}
                  {selectedDrillWords.length === 0 && (
                    <span className="text-xs text-slate-400 italic">Click words below in order...</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Shuffled Words</p>
                <div className="flex flex-wrap gap-1.5">
                  {shuffledWords.map((word, idx) => {
                    const isSelected = selectedDrillWords.includes(word);
                    return (
                      <button
                        key={idx}
                        disabled={isSelected}
                        onClick={() => selectDrillWord(word)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-100 border-slate-200 text-slate-300"
                            : "bg-white border-slate-200 hover:border-slate-400 text-slate-700"
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDrillStep("show")}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={verifySeedPhrase}
                  disabled={selectedDrillWords.length !== SEED_PHRASE_WORDS.length}
                  className="w-2/3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Verify Key Order
                </button>
              </div>
            </div>
          )}

          {drillStep === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-slate-800">Seed Phrase Verified Successfully!</h4>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                  Excellent memory and planning skills. You understand how cryptographic seed words represent the private mathematical key to decentralized ledgers.
                </p>
                <p className="text-xs font-bold text-emerald-600 mt-2">+50 XP Awarded!</p>
              </div>
              <button
                onClick={() => setDrillStep("show")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Run Drill Again
              </button>
            </div>
          )}

          {drillStep === "fail" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-slate-800">Mismatched Word Sequencing!</h4>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                  If this was a live wallet recovery, access to all related blockchain tokens would be permanently lost! Try again to build perfect backup precision.
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setDrillStep("show")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  View Correct Sequence
                </button>
                <button
                  onClick={startSeedDrill}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Retry Test
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footnote about Auditing & Smart Contracts */}
        <div className="border-t border-slate-100 pt-4 flex gap-2 items-start text-[10px] text-slate-400 leading-normal mt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Audit Rule:</strong> Responsible project designers write clear specifications, hold rigorous audits, and never encourage retail users to speculate on unaudiated contracts.
          </span>
        </div>
      </div>
    </div>
  );
}
