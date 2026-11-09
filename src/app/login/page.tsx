'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_CREDENTIALS, STUDENT_CREDENTIALS } from '@/context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  UserCheck, 
  KeyRound,
  BookOpen,
  Zap,
  Globe
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, authLoaded, loginWithGoogle, loginWithCredentials } = useAuth();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (authLoaded && user) {
      if (user.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, authLoaded, router]);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setLoading(false);
      try {
        const saved = localStorage.getItem('prep_ielts_user');
        const parsed = saved ? JSON.parse(saved) : null;
        if (!parsed?.diagnostic?.completed) {
          router.push('/diagnostic');
          return;
        }
      } catch (e) {}
      router.push('/dashboard');
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = loginWithCredentials(email, password);
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
    }, 600);
  };

  const handleAutofill = (type: 'student' | 'admin') => {
    if (type === 'admin') {
      setEmail(ADMIN_CREDENTIALS.email);
      setPassword(ADMIN_CREDENTIALS.password);
      setActiveTab('admin');
    } else {
      setEmail(STUDENT_CREDENTIALS.email);
      setPassword(STUDENT_CREDENTIALS.password);
      setActiveTab('student');
    }
    setErrorMsg(null);
  };

  const handleContinueAsGuest = () => {
    loginWithCredentials(STUDENT_CREDENTIALS.email, STUDENT_CREDENTIALS.password);
    try {
      const saved = localStorage.getItem('prep_ielts_user');
      const parsed = saved ? JSON.parse(saved) : null;
      if (!parsed?.diagnostic?.completed) {
        router.push('/diagnostic');
        return;
      }
    } catch (e) {}
    router.push('/dashboard');
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
            ব্যান্ড ৭.০–৯.০ অর্জনের জন্য ইন্টেলিজেন্ট এআই লার্নিং প্ল্যাটফর্মে আপনাকে স্বাগতম
          </p>
        </div>

        {/* 1-Click Google Sign-in */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google দিয়ে ১-ক্লিকে লগইন করুন</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">অথবা ইমেইল দিয়ে</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Portal Type Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>শিক্ষার্থী পোর্টাল</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>অ্যাডমিন পোর্টাল</span>
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>ইমেইল অ্যাড্রেস:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'admin' ? 'admin@prep-ielts.com' : 'student@prep-ielts.com'}
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
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-xs sm:text-sm font-black rounded-xl text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-purple-600 hover:bg-purple-500'
                : 'bg-[#E11D48] hover:bg-[#BE123C]'
            }`}
          >
            <span>{loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="text-[11px] text-slate-400 font-bold text-center">
            টেস্টিংয়ের জন্য দ্রুত ১-ক্লিক অটোফিল:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAutofill('student')}
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>শিক্ষার্থী অটোফিল</span>
            </button>
            <button
              type="button"
              onClick={() => handleAutofill('admin')}
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span>অ্যাডমিন অটোফিল</span>
            </button>
          </div>
        </div>

        {/* Continue as Guest */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="text-xs text-slate-400 hover:text-white underline font-semibold transition-colors cursor-pointer"
          >
            সরাসরি ডেমো শিক্ষার্থী হিসেবে প্রবেশ করুন ➔
          </button>
        </div>

      </div>

    </div>
  );
}
