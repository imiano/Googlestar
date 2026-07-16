import React, { useState } from "react";
import { GLOSSARY } from "../data";
import { Search, Book, HelpCircle, Tag, RefreshCw } from "lucide-react";

const CATEGORIES = ["All", "Basics", "Tokenomics", "Consensus", "Security", "Governance"];

export default function GlossaryView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTerm, setActiveTerm] = useState<typeof GLOSSARY[0] | null>(GLOSSARY[0] || null);

  const filteredGlossary = GLOSSARY.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="glossary_container">
      {/* Search & List */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col h-[520px]">
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Glossary</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 5,000+ simulated terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 text-slate-700"
            />
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="mb-4 overflow-x-auto flex gap-1.5 pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Term List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTerm(item)}
                className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center justify-between border ${
                  activeTerm?.term === item.term
                    ? "bg-slate-850 border-slate-900 text-white shadow-xs"
                    : "bg-white hover:bg-slate-50 border-transparent text-slate-700"
                }`}
              >
                <div>
                  <div className="font-display font-medium text-sm">{item.term}</div>
                  <div className={`text-[10px] mt-0.5 inline-block px-1.5 py-0.5 rounded ${
                    activeTerm?.term === item.term
                      ? "bg-slate-800 text-slate-300"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {item.category}
                  </div>
                </div>
                <Book className={`w-3.5 h-3.5 ${activeTerm?.term === item.term ? "text-amber-400" : "text-slate-300"}`} />
              </button>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              No definitions match your search filters.
            </div>
          )}
        </div>
      </div>

      {/* Detail Display */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between h-[520px]">
        {activeTerm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                  {activeTerm.category} Category
                </span>
                <h2 className="font-display font-bold text-2xl text-slate-800 mt-2 tracking-tight">
                  {activeTerm.term}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Simulated Index</p>
                <p className="text-sm font-mono text-slate-600">CD-GL-{activeTerm.term.slice(0,3).toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Simulated Sandbox Definition</h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-slate-700 text-sm leading-relaxed font-sans">
                  {activeTerm.definition}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Why it matters in Token Design</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Designing a token requires solid planning. For instance, understanding <strong>{activeTerm.term}</strong> prevents fatal design failures like high user inflation, broken voting structures, or exposing your custom smart contracts to dangerous exploits.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex gap-3">
                <div className="w-1.5 h-auto bg-amber-500 rounded-full"></div>
                <div>
                  <p className="text-xs font-medium text-slate-800">Coin Dev Pro Tip</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Before publishing an educational whitepaper draft, search the Glossary to ensure your descriptions perfectly align with global Web3 terminologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Book className="w-12 h-12 text-slate-300 mb-2 animate-bounce" />
            <p className="text-sm">Select any term from the list to read its description.</p>
          </div>
        )}

        {/* Footnote stating that database is loaded */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-slate-300" />
            Synchronized with 5,000+ sandbox glossaries.
          </span>
          <span>Coin Dev Simulator</span>
        </div>
      </div>
    </div>
  );
}
