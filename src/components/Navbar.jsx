import React from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ selectedBudgetId, onBack }) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-pink-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
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

        <div className="flex items-center gap-2">
          {selectedBudgetId && (
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 text-pink-600 text-xs font-semibold hover:bg-pink-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          )}

          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-pink-100">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                  {currentUser.displayName || currentUser.email.split('@')[0]}
                </p>
                <p className="text-[9px] text-pink-400">Online 💖</p>
              </div>
              <button
                onClick={logout}
                title="Keluar Akun"
                className="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all text-xs font-semibold flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}