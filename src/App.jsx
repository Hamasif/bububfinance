import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Calendar, 
  Wallet, 
  ShoppingBag, 
  Utensils, 
  Heart, 
  Sparkles, 
  TrendingDown,
  PieChart
} from 'lucide-react';

// Kategori default dengan icon & warna lucu
const CATEGORIES = [
  { id: 'makanan', name: 'Makanan & Jajan', icon: Utensils, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'belanja', name: 'Belanja / Self Care', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'kebutuhan', name: 'Kebutuhan Rutin', icon: Wallet, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'hiburan', name: 'Hiburan & Main', icon: Heart, color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { id: 'lainnya', name: 'Lain-lain', icon: Sparkles, color: 'bg-blue-100 text-blue-600 border-blue-200' },
];

export default function App() {
  // State Utama Simpan di LocalStorage
  const [monthlyBudgets, setMonthlyBudgets] = useState(() => {
    const saved = localStorage.getItem('bubub_budgets');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        month: 'Agustus 2026',
        targetBudget: 3500000,
        transactions: [
          { id: 't1', title: 'Beli Matcha Latte 🍵', amount: 35000, date: '2026-08-01', category: 'makanan' },
          { id: 't2', title: 'Skincare Cushion 💖', amount: 185000, date: '2026-08-02', category: 'belanja' }
        ]
      }
    ];
  });

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  // Modal State
  const [showAddMonthModal, setShowAddMonthModal] = useState(false);
  const [showAddTxModal, setShowAddTxModal] = useState(false);

  // Form State - Tambah Bulan
  const [newMonthName, setNewMonthName] = useState('');
  const [newMonthBudget, setNewMonthBudget] = useState('');

  // Form State - Tambah Transaksi
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0]);
  const [txCategory, setTxCategory] = useState('makanan');

  // Sync LocalStorage
  useEffect(() => {
    localStorage.setItem('bubub_budgets', JSON.stringify(monthlyBudgets));
  }, [monthlyBudgets]);

  // Selected Budget Data
  const selectedBudget = monthlyBudgets.find(b => b.id === selectedBudgetId);

  // Formatting Currency
  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Helper Total Pengeluaran
  const calculateTotalExpense = (transactions = []) => {
    return transactions.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  // Handlers
  const handleAddMonth = (e) => {
    e.preventDefault();
    if (!newMonthName || !newMonthBudget) return;

    const newEntry = {
      id: Date.now().toString(),
      month: newMonthName,
      targetBudget: Number(newMonthBudget),
      transactions: []
    };

    setMonthlyBudgets([newEntry, ...monthlyBudgets]);
    setNewMonthName('');
    setNewMonthBudget('');
    setShowAddMonthModal(false);
  };

  const handleDeleteMonth = (id, e) => {
    e.stopPropagation();
    if (confirm('Yakin mau hapus catatan bulan ini, Bub? 🥺')) {
      setMonthlyBudgets(monthlyBudgets.filter(b => b.id !== id));
      if (selectedBudgetId === id) setSelectedBudgetId(null);
    }
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!txTitle || !txAmount || !txDate) return;

    const newTx = {
      id: Date.now().toString(),
      title: txTitle,
      amount: Number(txAmount),
      date: txDate,
      category: txCategory
    };

    setMonthlyBudgets(prev => prev.map(budget => {
      if (budget.id === selectedBudgetId) {
        return {
          ...budget,
          transactions: [newTx, ...budget.transactions]
        };
      }
      return budget;
    }));

    setTxTitle('');
    setTxAmount('');
    setShowAddTxModal(false);
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50/30 to-pink-100/40 text-slate-700 pb-12 selection:bg-pink-200">
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-pink-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedBudgetId(null)}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-white shadow-md shadow-pink-200 animate-bounce-short">
              🌸
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                BububFinance
              </h1>
              <p className="text-xs text-pink-400 font-medium">catatan keuangan My Love ✨</p>
            </div>
          </div>

          {selectedBudgetId && (
            <button 
              onClick={() => setSelectedBudgetId(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 text-pink-600 text-xs font-semibold hover:bg-pink-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 pt-6">

        {/* ================= VIEW 1: DAFTAR PENGELUARAN BULANAN ================= */}
        {!selectedBudget ? (
          <div>
            {/* Banner / Hero */}
            <div className="p-6 rounded-3xl bg-white border-2 border-pink-100 shadow-xl shadow-pink-100/50 mb-8 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 pointer-events-none">🎀</div>
              <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                Halo, Bubub! 👋
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Yuk atur pengeluaran bulananmu agar tabungan tetap aman!
              </p>
              
              <button
                onClick={() => setShowAddMonthModal(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold text-sm shadow-lg shadow-pink-300/50 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Buat Bulan Pengeluaran Baru
              </button>
            </div>

            {/* List Kartu Bulan */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" /> Daftar Pengeluaran Bulanan
              </h3>
              <span className="text-xs bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full font-semibold">
                {monthlyBudgets.length} Bulan
              </span>
            </div>

            {monthlyBudgets.length === 0 ? (
              <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-pink-200 p-6">
                <p className="text-4xl mb-2">🍧</p>
                <p className="text-slate-500 text-sm font-medium">Belum ada catatan bulan nih.</p>
                <p className="text-xs text-pink-400 mt-1">Klik tombol di atas buat nambah ya!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {monthlyBudgets.map((b) => {
                  const totalSpent = calculateTotalExpense(b.transactions);
                  const isOverBudget = totalSpent > b.targetBudget;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBudgetId(b.id)}
                      className="group bg-white p-5 rounded-3xl border-2 border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-pink-100 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                            {b.month}
                          </span>
                          <button
                            onClick={(e) => handleDeleteMonth(b.id, e)}
                            className="text-slate-300 hover:text-rose-500 p-1 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-slate-400 mb-0.5">Budget Maksimal</p>
                          <p className="text-lg font-bold text-slate-700">{formatRupiah(b.targetBudget)}</p>
                        </div>
                      </div>

                      {/* Progress Bar & Info Transaksi */}
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                          <span className="text-slate-500">Terpakai:</span>
                          <span className={isOverBudget ? 'text-rose-500 font-bold' : 'text-pink-600 font-bold'}>
                            {formatRupiah(totalSpent)}
                          </span>
                        </div>

                        <div className="w-full h-2.5 bg-pink-50 rounded-full overflow-hidden p-0.5 border border-pink-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOverBudget ? 'bg-rose-400' : 'bg-gradient-to-r from-pink-300 to-rose-400'
                            }`}
                            style={{ width: `${Math.min((totalSpent / (b.targetBudget || 1)) * 100, 100)}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-right text-slate-400 mt-2 font-medium group-hover:text-pink-500 transition-colors">
                          {b.transactions.length} Transaksi записан →
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (

        /* ================= VIEW 2: DETAIL PENGELUARAN BULAN TERPILIH ================= */
          <div>
            {/* Header Ringkasan Bulan */}
            <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-xl shadow-pink-100/50 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Detail Pengeluaran</span>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedBudget.month}</h2>
                </div>
                <button
                  onClick={() => setShowAddTxModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Catat Transaksi
                </button>
              </div>

              {/* Cards Statistik */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-pink-50">
                <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100">
                  <p className="text-xs text-slate-400 mb-1">Target Budget</p>
                  <p className="text-base font-bold text-slate-700">{formatRupiah(selectedBudget.targetBudget)}</p>
                </div>
                <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-100">
                  <p className="text-xs text-slate-400 mb-1">Total Keluar</p>
                  <p className="text-base font-bold text-rose-500">
                    {formatRupiah(calculateTotalExpense(selectedBudget.transactions))}
                  </p>
                </div>
              </div>
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
                <p className="text-slate-500 text-sm">Belum ada pengeluaran yang dicatat bulan ini.</p>
                <button
                  onClick={() => setShowAddTxModal(true)}
                  className="mt-3 text-xs text-pink-500 font-semibold underline decoration-pink-300 hover:text-pink-600"
                >
                  + Tambah transaksi pertama
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedBudget.transactions.map((tx) => {
                  const cat = CATEGORIES.find(c => c.id === tx.category) || CATEGORIES[4];
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
                        <span className="font-bold text-slate-700 text-sm">
                          - {formatRupiah(tx.amount)}
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

      {/* ================= MODAL: TAMBAH BULAN ================= */}
      {showAddMonthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border-2 border-pink-100 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Tambah Pengeluaran Bulanan 🌸</h3>
            <p className="text-xs text-slate-400 mb-4">Buat wadah baru untuk mencatat budget bulanmu.</p>

            <form onSubmit={handleAddMonth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Bulan / Periode</label>
                <input
                  type="text"
                  placeholder="Contoh: September 2026"
                  value={newMonthName}
                  onChange={(e) => setNewMonthName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nominal Target Budget (Rp)</label>
                <input
                  type="number"
                  placeholder="3000000"
                  value={newMonthBudget}
                  onChange={(e) => setNewMonthBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMonthModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:opacity-90"
                >
                  Simpan Bulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TAMBAH TRANSAKSI ================= */}
      {showAddTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border-2 border-pink-100 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Catat Pengeluaran Baru ✨</h3>
            <p className="text-xs text-slate-400 mb-4">Pengeluaran apa yang baru saja dibuat, Bub?</p>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Detail Pengeluaran</label>
                <input
                  type="text"
                  placeholder="Contoh: Beli Boba Brown Sugar"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nominal (Rp)</label>
                <input
                  type="number"
                  placeholder="25000"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                  <select
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTxModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:opacity-90"
                >
                  Tambah Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}