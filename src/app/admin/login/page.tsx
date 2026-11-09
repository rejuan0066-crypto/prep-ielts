'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_CREDENTIALS } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  KeyRound
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithCredentials, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginWithCredentials(email, password);
      setIsLoading(false);

      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.message || 'ভুল ইমেইল বা পাসওয়ার্ড!');
      }
    }, 600);
  };

  const fillAdminCredentials = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-900 selection:bg-purple-500 selection:text-white">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 text-white">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            অ্যাডমিন পোর্টাল লগইন
          </h1>
          <p className="text-xs text-slate-400">
            PrepIELTS.ai প্ল্যাটফর্ম অ্যাডমিন ও মডারেটর সিকিউর গেটওয়ে
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-4 bg-purple-950/40 border border-purple-800/60 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between text-purple-300 font-bold">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              অফিশিয়াল অ্যাডমিন তথ্য:
            </span>
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="text-[11px] bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1 rounded-lg font-bold transition-all"
            >
              ⚡ অটো ফিল করুন
            </button>
          </div>
          <div className="font-mono text-slate-300 text-[11px] space-y-0.5">
            <div>ইমেইল: <strong className="text-white">{ADMIN_CREDENTIALS.email}</strong></div>
            <div>পাসওয়ার্ড: <strong className="text-white">{ADMIN_CREDENTIALS.password}</strong></div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অ্যাডমিন ইমেইল:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prep-ielts.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অ্যাডমিন পাসওয়ার্ড:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>{isLoading ? 'যাচাই করা হচ্ছে...' : 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
