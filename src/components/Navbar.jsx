import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Navbar({ selectedBudgetId, onBack }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-pink-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-white shadow-md shadow-pink-200">
            🌸
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              BububFinance
            </h1>
            <p className="text-xs text-pink-400 font-medium">catatan keuangan gemas ✨</p>
          </div>
        </div>

        {selectedBudgetId && (
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 text-pink-600 text-xs font-semibold hover:bg-pink-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        )}
      </div>
    </header>
  );
}