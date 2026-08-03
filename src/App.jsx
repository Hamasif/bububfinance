import React, { useState } from 'react';
import { Plus, Trash2, Calendar, TrendingDown } from 'lucide-react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import MonthModal from './components/MonthModal';
import TransactionModal from './components/TransactionModal';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from './constants/categories';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [monthlyBudgets, setMonthlyBudgets] = useLocalStorage('bubub_budgets', [
    {
      id: '1',
      month: 'Agustus 2026',
      transactions: [
        { id: 't1', type: 'income', title: 'Gaji Bulanan 💸', amount: 4500000, date: '2026-08-01', category: 'gaji' },
        { id: 't2', type: 'expense', title: 'Beli Matcha Latte 🍵', amount: 35000, date: '2026-08-01', category: 'makanan' },
        { id: 't3', type: 'expense', title: 'Skincare Cushion 💖', amount: 185000, date: '2026-08-02', category: 'belanja' }
      ]
    }
  ]);

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [showAddMonthModal, setShowAddMonthModal] = useState(false);
  const [showAddTxModal, setShowAddTxModal] = useState(false);

  const selectedBudget = monthlyBudgets.find(b => b.id === selectedBudgetId);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const calculateTotals = (transactions = []) => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { totalIncome, totalExpense };
  };

  const handleAddMonth = (monthName) => {
    const newEntry = {
      id: Date.now().toString(),
      month: monthName,
      transactions: []
    };
    setMonthlyBudgets([newEntry, ...monthlyBudgets]);
  };

  const handleDeleteMonth = (id, e) => {
    e.stopPropagation();
    if (confirm('Yakin mau hapus catatan bulan ini, Bub? 🥺')) {
      setMonthlyBudgets(monthlyBudgets.filter(b => b.id !== id));
      if (selectedBudgetId === id) setSelectedBudgetId(null);
    }
  };

  const handleAddTransaction = (newTx) => {
    setMonthlyBudgets(prev => prev.map(budget => {
      if (budget.id === selectedBudgetId) {
        return {
          ...budget,
          transactions: [newTx, ...budget.transactions]
        };
      }
      return budget;
    }));
  };

  const handleDeleteTransaction = (txId) => {
    setMonthlyBudgets(prev => prev.map(budget => {
      if (budget.id === selectedBudgetId) {
        return {
          ...budget,
          transactions: budget.transactions.filter(t => t.id !== txId)
        };
      }
      return budget;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50/30 to-pink-100/40 text-slate-700 pb-12">
      <Navbar selectedBudgetId={selectedBudgetId} onBack={() => setSelectedBudgetId(null)} />

      <main className="max-w-3xl mx-auto px-4 pt-6">
        {!selectedBudget ? (
          /* ================= VIEW 1: LIST PERIODE BULAN ================= */
          <div>
            <div className="p-6 rounded-3xl bg-white border-2 border-pink-100 shadow-xl shadow-pink-100/50 mb-8 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 pointer-events-none">🎀</div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Halo, Bubub! 👋</h2>
              <p className="text-sm text-slate-500 mb-4">
                Yuk catat pemasukan dan pengeluaranmu agar tabungan tetap seimbang!
              </p>
              
              <button
                onClick={() => setShowAddMonthModal(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold text-sm shadow-lg shadow-pink-300/50 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Buat Periode Bulan Baru
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" /> Daftar Catatan Keuangan
              </h3>
            </div>

            {monthlyBudgets.length === 0 ? (
              <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-pink-200 p-6">
                <p className="text-4xl mb-2">🍧</p>
                <p className="text-slate-500 text-sm">Belum ada catatan bulan nih.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {monthlyBudgets.map((b) => {
                  const { totalIncome, totalExpense } = calculateTotals(b.transactions);
                  const balance = totalIncome - totalExpense;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBudgetId(b.id)}
                      className="group bg-white p-5 rounded-3xl border-2 border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-pink-100 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                          {b.month}
                        </span>
                        <button
                          onClick={(e) => handleDeleteMonth(b.id, e)}
                          className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1 my-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Masuk:</span>
                          <span className="font-semibold text-emerald-600">+{formatRupiah(totalIncome)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Keluar:</span>
                          <span className="font-semibold text-rose-500">-{formatRupiah(totalExpense)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-pink-50 flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-medium">Sisa Saldo</span>
                        <span className={`text-sm font-bold ${balance < 0 ? 'text-rose-500' : 'text-slate-700'}`}>
                          {formatRupiah(balance)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ================= VIEW 2: DETAIL PERIODE TERPILIH ================= */
          <div>
            <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-xl shadow-pink-100/50 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Laporan Keuangan</span>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedBudget.month}</h2>
                </div>
                <button
                  onClick={() => setShowAddTxModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Catat Transaksi
                </button>
              </div>

              {/* Ringkasan Cards Komponen */}
              <SummaryCards 
                {...calculateTotals(selectedBudget.transactions)} 
                formatRupiah={formatRupiah} 
              />
            </div>

            {/* List Transaksi */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 text-base flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-pink-400" /> Riwayat Transaksi
              </h3>
              <span className="text-xs text-slate-400">
                {selectedBudget.transactions.length} catatan
              </span>
            </div>

            {selectedBudget.transactions.length === 0 ? (
              <div className="text-center py-10 bg-white/50 rounded-3xl border border-dashed border-pink-200 p-6">
                <p className="text-3xl mb-2">🎀</p>
                <p className="text-slate-500 text-sm">Belum ada transaksi di bulan ini.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedBudget.transactions.map((tx) => {
                  const allCats = tx.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
                  const cat = allCats.find(c => c.id === tx.category) || allCats[0];
                  const Icon = cat.icon;

                  return (
                    <div
                      key={tx.id}
                      className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex items-center justify-between hover:border-pink-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-700 text-sm">{tx.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-400">{tx.date}</span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                              {cat.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
                        </span>
                        <button
                          onClick={() => handleDeleteTransaction(tx.id)}
                          className="text-slate-300 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <MonthModal 
        isOpen={showAddMonthModal} 
        onClose={() => setShowAddMonthModal(false)} 
        onSave={handleAddMonth} 
      />
      
      <TransactionModal 
        isOpen={showAddTxModal} 
        onClose={() => setShowAddTxModal(false)} 
        onSave={handleAddTransaction} 
      />
    </div>
  );
}