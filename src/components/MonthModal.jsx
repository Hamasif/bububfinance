import React, { useState } from 'react';

export default function MonthModal({ isOpen, onClose, onSave }) {
  const [monthName, setMonthName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!monthName.trim() || loading) return;

    try {
      setLoading(true);
      await onSave(monthName.trim());
      setMonthName('');
      onClose();
    } catch (err) {
      console.error("Gagal menyimpan periode bulan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md border-2 border-pink-100 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Tambah Periode Bulan 🌸</h3>
        <p className="text-xs text-slate-400 mb-4">Buat dompet baru untuk mencatat bulan ini, Bub!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Bulan & Tahun</label>
            <input
              type="text"
              placeholder="Contoh: September 2026"
              value={monthName}
              onChange={(e) => setMonthName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              required
            />
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
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Periode'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}