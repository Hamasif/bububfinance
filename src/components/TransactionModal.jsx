import React, { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';

export default function TransactionModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('makanan');
  const [loading, setLoading] = useState(false); // ✨ Tambah state loading

  if (!isOpen) return null;

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  // ✨ Diubah menjadi async untuk menangani save Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || loading) return;

    try {
      setLoading(true);
      await onSave({
        id: Date.now().toString(),
        type,
        title: title.trim(),
        amount: Number(amount),
        date,
        category
      });

      // Reset Form & Close Modal setelah berhasil simpan
      setTitle('');
      setAmount('');
      onClose();
    } catch (err) {
      console.error("Gagal simpan transaksi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0].id : INCOME_CATEGORIES[0].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md border-2 border-pink-100 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Catat Keuangan Baru ✨</h3>
        <p className="text-xs text-slate-400 mb-4">Pilih tipe transaksi lalu lengkapi detailnya.</p>

        {/* Tab Toggle Type */}
        <div className="flex bg-pink-50 p-1 rounded-2xl mb-4 border border-pink-100">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              type === 'expense' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            💸 Pengeluaran
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            💰 Pemasukan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Keterangan Transaksi</label>
            <input
              type="text"
              placeholder={type === 'expense' ? "Beli Milk Tea 🧋" : "Gaji Freelance 💻"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nominal (Rp)</label>
            <input
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs bg-white"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all disabled:opacity-50 ${
                type === 'expense' 
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 shadow-pink-200' 
                  : 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-emerald-200'
              }`}
            >
              {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}