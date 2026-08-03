import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function SummaryCards({ totalIncome, totalExpense, formatRupiah }) {
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
      {/* Pemasukan */}
      <div className="bg-emerald-50/70 p-3 sm:p-4 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mb-1">
          <TrendingUp className="w-3.5 h-3.5" /> Pemasukan
        </div>
        <p className="text-xs sm:text-sm font-bold text-emerald-700 truncate">
          {formatRupiah(totalIncome)}
        </p>
      </div>

      {/* Pengeluaran */}
      <div className="bg-rose-50/70 p-3 sm:p-4 rounded-2xl border border-rose-100 shadow-sm">
        <div className="flex items-center gap-1 text-rose-500 text-xs font-semibold mb-1">
          <TrendingDown className="w-3.5 h-3.5" /> Pengeluaran
        </div>
        <p className="text-xs sm:text-sm font-bold text-rose-600 truncate">
          {formatRupiah(totalExpense)}
        </p>
      </div>

      {/* Sisa Saldo */}
      <div className="bg-pink-50/70 p-3 sm:p-4 rounded-2xl border border-pink-100 shadow-sm">
        <div className="flex items-center gap-1 text-pink-600 text-xs font-semibold mb-1">
          <Wallet className="w-3.5 h-3.5" /> Sisa Saldo
        </div>
        <p className={`text-xs sm:text-sm font-bold truncate ${balance < 0 ? 'text-rose-500' : 'text-slate-700'}`}>
          {formatRupiah(balance)}
        </p>
      </div>
    </div>
  );
}