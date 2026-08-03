import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Heart } from 'lucide-react';

export default function AuthModal({ isOpen }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, loginWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
    } catch (err) {
      setError('Gagal login dengan Google.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md border-2 border-pink-100 shadow-2xl relative overflow-hidden">
        {/* Hiasan background */}
        <div className="absolute -top-6 -right-6 text-7xl opacity-10 pointer-events-none">🌸</div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 mx-auto flex items-center justify-center text-white text-2xl shadow-md shadow-pink-200 mb-2">
            🎀
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
            {isRegister ? 'Buat Akun Bubub' : 'Masuk ke BububFinance'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? 'Yuk daftar untuk mulai mencatat keuanganmu!' : 'Selamat datang kembali, Bubub! ✨'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Form Login / Register */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="bubub@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Sabar ya, Bub...' : isRegister ? 'Daftar Akun Baru ✨' : 'Masuk Sekarang 💖'}
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-pink-100"></div></div>
          <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">atau</span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/50 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          Masuk dengan Google
        </button>

        {/* Switch Login / Register */}
        <p className="text-center text-xs text-slate-500 mt-6">
          {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-pink-500 font-bold hover:underline"
          >
            {isRegister ? 'Masuk di sini' : 'Daftar sekarang'}
          </button>
        </p>
      </div>
    </div>
  );
}