'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_CREDENTIALS } from '@/context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, authLoaded, loginWithCredentials, registerUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
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

      if (activeTab === 'student' && authMode === 'register') {
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

        {/* Portal Switcher (Student vs Admin) */}
        <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>অ্যাডমিন পোর্টাল</span>
          </button>
        </div>

        {/* Auth Mode Toggle for Students: Sign In vs Create Account */}
        {activeTab === 'student' && (
          <div className="flex items-center justify-center gap-4 text-xs font-bold border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
              className={`pb-1 transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'text-white border-b-2 border-[#E11D48]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              লগইন করুন
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
              className={`pb-1 transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'text-white border-b-2 border-[#E11D48]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              নতুন অ্যাকাউন্ট তৈরি
            </button>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name input for registration */}
          {activeTab === 'student' && authMode === 'register' && (
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
              placeholder={activeTab === 'admin' ? 'admin@prep-ielts.com' : 'yourname@example.com'}
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
            className={`w-full py-3 text-xs sm:text-sm font-black rounded-xl text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-purple-600 hover:bg-purple-500'
                : 'bg-[#E11D48] hover:bg-[#BE123C]'
            }`}
          >
            <span>
              {loading 
                ? 'প্রক্রিয়াধীন...' 
                : activeTab === 'student' && authMode === 'register' 
                  ? 'আমার নিজস্ব অ্যাকাউন্ট তৈরি করুন' 
                  : 'লগইন করুন'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-white/10 text-[11px] text-slate-400">
          {activeTab === 'student' && authMode === 'login' ? (
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
          ) : activeTab === 'student' ? (
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
          ) : (
            <span>অ্যাডমিনিস্ট্রেটর পোর্টাল সিকিউর এক্সেস</span>
          )}
        </div>

      </div>

    </div>
  );
}
