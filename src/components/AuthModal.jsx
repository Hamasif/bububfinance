import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, Lock } from 'lucide-react';

export default function AuthModal({ isOpen }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  // Email & Password Hardcoded
  const DEFAULT_EMAIL = "bubub@gmail.com";
  const DEFAULT_PASS = "bubub123";

  const handleQuickLogin = async () => {
    setError('');
    setLoading(true);

    try {
      // Coba login dulu
      await login(DEFAULT_EMAIL, DEFAULT_PASS);
    } catch (err) {
      // Jika akun belum pernah terbuat di Firebase, otomatis buatkan dulu
      try {
        await register(DEFAULT_EMAIL, DEFAULT_PASS);
      } catch (regErr) {
        setError('Gagal masuk. Pastikan fitur Email/Password sudah diaktifkan di Firebase Console.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md border-2 border-pink-100 shadow-2xl relative text-center">
        
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 mx-auto flex items-center justify-center text-white text-3xl shadow-md shadow-pink-200 mb-3">
          🌸
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent mb-1">
          BububFinance
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Klik tombol di bawah untuk masuk ke akun kamu ✨
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 mb-6 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Email:</span>
            <span className="font-bold text-slate-700">{DEFAULT_EMAIL}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Password:</span>
            <span className="font-bold text-slate-700">••••••••</span>
          </div>
        </div>

        <button
          onClick={handleQuickLogin}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm font-bold shadow-lg shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Heart className="w-4 h-4 fill-white" />
          {loading ? 'Menghubungkan...' : 'Masuk sebagai Bubub ✨'}
        </button>

      </div>
    </div>
  );
}