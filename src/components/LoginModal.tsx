'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_CREDENTIALS } from '@/context/AuthContext';
import { 
  X, 
  Mail, 
  Lock,
  GraduationCap, 
  ArrowRight
} from 'lucide-react';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = loginWithCredentials(email, password);
      setLoading(false);

      if (res.success) {
        onClose();
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

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#E11D48] flex items-center justify-center text-white font-bold shadow-md shadow-rose-950/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  লগইন বা রেজিস্টার করুন
                </h3>
                <p className="text-xs text-slate-500">PrepIELTS.ai AI Learning Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Official Google OAuth Sign In */}
          <div className="pt-1">
            <GoogleSignInButton mode="login" onSuccess={onClose} />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] text-slate-400 uppercase tracking-wider font-bold shrink-0">
              অথবা ইমেইল দিয়ে
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                ইমেইল:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                পাসওয়ার্ড:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-500">
            নতুন শিক্ষার্থী?{' '}
            <button
              type="button"
              onClick={() => { onClose(); router.push('/login'); }}
              className="text-[#E11D48] font-bold hover:underline cursor-pointer"
            >
              নতুন অ্যাকাউন্ট খুলুন
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
