import { Utensils, ShoppingBag, Wallet, Heart, Sparkles, PiggyBank, Briefcase, Gift } from 'lucide-react';

export const EXPENSE_CATEGORIES = [
  { id: 'makanan', name: 'Makanan & Jajan', icon: Utensils, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'belanja', name: 'Belanja & Self Care', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'kebutuhan', name: 'Kebutuhan Rutin', icon: Wallet, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'hiburan', name: 'Hiburan & Main', icon: Heart, color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { id: 'lainnya', name: 'Lain-lain', icon: Sparkles, color: 'bg-blue-100 text-blue-600 border-blue-200' },
];

export const INCOME_CATEGORIES = [
  { id: 'gaji', name: 'Gaji Bulanan', icon: Briefcase, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { id: 'tabungan', name: 'Uang Saku / Transfer', icon: PiggyBank, color: 'bg-teal-100 text-teal-600 border-teal-200' },
  { id: 'bonus', name: 'Bonus / Hadiah', icon: Gift, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { id: 'lainnya_in', name: 'Pemasukan Lainnya', icon: Sparkles, color: 'bg-sky-100 text-sky-600 border-sky-200' },
];