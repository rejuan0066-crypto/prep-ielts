'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_CREDENTIALS } from '@/context/AuthContext';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  AlertCircle
} from 'lucide-react';
import { GoogleVerifyModal } from '@/components/GoogleVerifyModal';

export default function LoginPage() {
  const router = useRouter();
  const { user, authLoaded, loginWithCredentials, registerUser } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect directly to dashboard or admin
  useEffect(() => {
    if (authLoaded && user) {
      if (user.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, authLoaded, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      let res: { success: boolean; message?: string };

      if (authMode === 'register') {
        res = registerUser(fullName, email, password);
      } else {
        res = loginWithCredentials(email, password);
      }

      setLoading(false);

      if (res.success) {
        if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()) {
          router.push('/admin');
        } else {
          try {
            const saved = localStorage.getItem('prep_ielts_user');
            const parsed = saved ? JSON.parse(saved) : null;
            if (!parsed?.diagnostic?.completed) {
              router.push('/diagnostic');
              return;
            }
          } catch (e) {}
          router.push('/dashboard');
        }
      } else {
        setErrorMsg(res.message || 'ভুল ইমেইল বা পাসওয়ার্ড!');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E11D48]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white/10 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E11D48] to-rose-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-950/40">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            PrepIELTS<span className="text-[#E11D48]">.ai</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            ব্যান্ড ৭.০–৯.০ অর্জনের জন্য ইন্টেলিজেন্ট এআই লার্নিং প্ল্যাটফর্ম
          </p>
        </div>

        {/* Auth Mode Toggle: Sign In vs Create Account */}
        <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>লগইন করুন</span>
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'register'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>নতুন অ্যাকাউন্ট তৈরি</span>
          </button>
        </div>

        {/* Google Account Verification Option */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-black/25 active:scale-[0.99] cursor-pointer group"
          >
            <div className="w-5 h-5 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <span>
              {authMode === 'register' 
                ? 'গুগল ভেরিফাই দিয়ে অ্যাকাউন্ট তৈরি করুন' 
                : 'গুগল ভেরিফাই দিয়ে লগইন করুন'}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-extrabold ml-1">
              Google Verified
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center pt-1">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900/90 px-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold shrink-0">
              অথবা সাধারণ ইমেইল দিয়ে
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name input for registration */}
          {authMode === 'register' && (
            <div className="space-y-1.5 animate-in fade-in">
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>আপনার পূর্ণ নাম:</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                required
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>ইমেইল অ্যাড্রেস:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              required
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>পাসওয়ার্ড:</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                required
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold animate-in fade-in flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs sm:text-sm font-black rounded-xl text-white shadow-lg bg-[#E11D48] hover:bg-[#BE123C] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {loading 
                ? 'প্রক্রিয়াধীন...' 
                : authMode === 'register' 
                  ? 'আমার নিজস্ব অ্যাকাউন্ট তৈরি করুন' 
                  : 'লগইন করুন'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-white/10 text-[11px] text-slate-400">
          {authMode === 'login' ? (
            <span>
              অ্যাকাউন্ট নেই?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
                className="text-[#E11D48] hover:underline font-bold cursor-pointer"
              >
                এখানে ক্লিক করে নতুন অ্যাকাউন্ট খুলুন
              </button>
            </span>
          ) : (
            <span>
              ইতিমধ্যেই অ্যাকাউন্ট আছে?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
                className="text-[#E11D48] hover:underline font-bold cursor-pointer"
              >
                লগইন করুন
              </button>
            </span>
          )}
        </div>

      </div>

      {/* Google Verification Modal */}
      <GoogleVerifyModal 
        isOpen={isGoogleModalOpen} 
        onClose={() => setIsGoogleModalOpen(false)} 
        mode={authMode} 
      />

    </div>
  );
}
