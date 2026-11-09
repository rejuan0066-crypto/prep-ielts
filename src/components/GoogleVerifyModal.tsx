'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lock,
  Mail,
  User,
  History,
  Sparkles,
  Database,
  Check
} from 'lucide-react';

interface VerifiedGoogleAccount {
  name: string;
  email: string;
  avatar: string;
  lastVerified: string;
}

interface GoogleVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'register' | 'login';
}

export const GoogleVerifyModal: React.FC<GoogleVerifyModalProps> = ({ 
  isOpen, 
  onClose,
  mode = 'register'
}) => {
  const router = useRouter();
  const { loginOrRegisterWithGoogle } = useAuth();

  const [verifiedAccounts, setVerifiedAccounts] = useState<VerifiedGoogleAccount[]>([]);
  const [showManualForm, setShowManualForm] = useState(false);

  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<'input' | 'verified'>('input');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isExistingInDb, setIsExistingInDb] = useState(false);

  // Load previously verified accounts on mount
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('prep_ielts_google_verified_accounts');
        if (stored) {
          const list: VerifiedGoogleAccount[] = JSON.parse(stored);
          setVerifiedAccounts(list);
          if (list.length > 0 && mode === 'login') {
            setShowManualForm(false);
          } else if (list.length === 0) {
            setShowManualForm(true);
          }
        } else {
          setShowManualForm(true);
        }
      } catch (e) {
        setShowManualForm(true);
      }
    }
  }, [isOpen, mode]);

  // Check if typed email already exists in users DB
  useEffect(() => {
    const cleanEmail = googleEmail.trim().toLowerCase();
    if (cleanEmail && cleanEmail.includes('@') && cleanEmail.includes('.')) {
      try {
        const storedDb = localStorage.getItem('prep_ielts_users_db');
        if (storedDb) {
          const db = JSON.parse(storedDb);
          if (db[cleanEmail]) {
            setIsExistingInDb(true);
            if (db[cleanEmail].profile?.name && !googleName) {
              setGoogleName(db[cleanEmail].profile.name);
            }
            return;
          }
        }
      } catch (e) {}
    }
    setIsExistingInDb(false);
  }, [googleEmail]);

  if (!isOpen) return null;

  const isGmailValid = googleEmail.trim().includes('@') && googleEmail.trim().includes('.');

  const performLogin = (nameClean: string, emailClean: string, avatarUrl?: string) => {
    setVerifying(true);
    setErrorMsg(null);

    setTimeout(() => {
      const avatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(nameClean)}&background=10B981&color=fff&bold=true`;
      
      const res = loginOrRegisterWithGoogle({
        name: nameClean,
        email: emailClean,
        avatar
      });

      setVerifying(false);

      if (res.success) {
        setStep('verified');
        setTimeout(() => {
          onClose();
          if (res.isNewUser) {
            router.push('/diagnostic');
          } else {
            try {
              const saved = localStorage.getItem('prep_ielts_user');
              const parsed = saved ? JSON.parse(saved) : null;
              if (!parsed?.diagnostic?.completed) {
                router.push('/diagnostic');
                return;
              }
            } catch (err) {}
            router.push('/dashboard');
          }
        }, 900);
      } else {
        setErrorMsg(res.message || 'গুগল ভেরিফিকেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    }, 600);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailClean = googleEmail.trim().toLowerCase();
    const nameClean = googleName.trim() || emailClean.split('@')[0];

    if (!emailClean.includes('@') || !emailClean.includes('.')) {
      setErrorMsg('অনুগ্রহ করে সঠিক গুগল জিমেইল (যেমন: yourname@gmail.com) লিখুন।');
      return;
    }

    performLogin(nameClean, emailClean);
  };

  const handleOneClickLogin = (account: VerifiedGoogleAccount) => {
    performLogin(account.name, account.email, account.avatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-md shadow-black/40 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-1.5">
              <span>গুগল অ্যাকাউন্ট সাইন ইন</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Verified
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              আপনার সংরক্ষিত পরীক্ষার ফলাফল, কোর্স ও ডাটা অক্ষুণ্ণ থাকবে
            </p>
          </div>
        </div>

        {step === 'verified' ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-white">গুগল অ্যাকাউন্ট ভেরিফাইড!</h4>
              <p className="text-xs text-slate-300">
                আপনার স্বতন্ত্র অ্যাকাউন্টে লগইন সম্পন্ন হয়েছে। সরাসরি পোর্টালে নিয়ে যাওয়া হচ্ছে...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">

            {/* PREVIOUSLY VERIFIED ACCOUNTS (ONE-CLICK SIGN IN) */}
            {verifiedAccounts.length > 0 && !showManualForm && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <History className="w-3.5 h-3.5" />
                    <span>পূর্বে ভেরিফাইড গুগল শিক্ষার্থী অ্যাকাউন্ট:</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {verifiedAccounts.map((acc) => (
                    <div 
                      key={acc.email}
                      className="p-3.5 bg-white/10 hover:bg-white/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={acc.avatar} 
                          alt={acc.name} 
                          className="w-10 h-10 rounded-full border border-white/20 shrink-0"
                        />
                        <div className="min-w-0 text-left">
                          <p className="font-bold text-xs sm:text-sm text-white truncate">
                            {acc.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {acc.email}
                          </p>
                          <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                            <Database className="w-3 h-3" />
                            <span>ডাটাবেসে পরীক্ষার রেকর্ড সংরক্ষিত</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={verifying}
                        onClick={() => handleOneClickLogin(acc)}
                        className="ml-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shrink-0 transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        {verifying ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>প্রবেশ করুন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowManualForm(true)}
                    className="text-xs text-slate-400 hover:text-white hover:underline cursor-pointer"
                  >
                    + অন্য কোনো গুগল অ্যাকাউন্ট ব্যবহার করতে চান?
                  </button>
                </div>
              </div>
            )}

            {/* MANUAL GOOGLE VERIFICATION FORM */}
            {(showManualForm || verifiedAccounts.length === 0) && (
              <form onSubmit={handleVerifySubmit} className="space-y-4 animate-in fade-in">
                
                {/* Back to saved accounts button if available */}
                {verifiedAccounts.length > 0 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowManualForm(false)}
                      className="text-[11px] text-emerald-400 hover:underline font-bold cursor-pointer"
                    >
                      ← সংরক্ষিত অ্যাকাউন্টে ফিরে যান
                    </button>
                  </div>
                )}

                {/* Google Profile Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>আপনার নাম (Google Name):</span>
                  </label>
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-white/15 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all"
                  />
                </div>

                {/* Google Email */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>আপনার গুগল ইমেইল (Gmail):</span>
                    </label>
                    {isExistingInDb ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>সংরক্ষিত অ্যাকাউন্ট পাওয়া গেছে</span>
                      </span>
                    ) : isGmailValid ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ভ্যালিড জিমেইল</span>
                      </span>
                    ) : null}
                  </div>
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                    className={`w-full px-3.5 py-2.5 bg-slate-800/90 border rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      isExistingInDb || isGmailValid
                        ? 'border-emerald-500/60 focus:ring-emerald-500' 
                        : 'border-white/15 focus:ring-[#E11D48]'
                    }`}
                  />
                  
                  {isExistingInDb ? (
                    <p className="text-[10px] text-emerald-400 font-medium leading-tight">
                      ✓ এই অ্যাকাউন্টে আপনার পূর্বে সম্পন্ন করা লেভেল টেস্টের রেজাল্ট ও প্যাকেজ রেকর্ড সক্রিয় আছে।
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 leading-tight">
                      একবার ভেরিফাই হয়ে গেলে এই অ্যাকাউন্টে আপনার সমস্ত টেস্ট স্কোর ও প্রোগ্রেস আজীবন সেভ থাকবে।
                    </p>
                  )}
                </div>

                {/* Persistent Data Security Box */}
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>অ্যাকাউন্ট অনুযায়ী ডাটা সংরক্ষণ নিশ্চয়তা:</span>
                  </div>
                  <ul className="space-y-1 text-slate-400 text-[10px] pl-6 list-disc">
                    <li>ডায়াগনস্টিক পরীক্ষার ব্যান্ড স্কোর আপনার জিমেইলে চিরস্থায়ী সংরক্ষিত</li>
                    <li>পরবর্তী যে কোনো সময় সরাসরি এই গুগল অ্যাকাউন্ট দিয়ে লগইন করা যাবে</li>
                    <li>কখনোই কোনো ডেমো বা অন্য শিক্ষার্থীর তথ্যের সাথে মিশবে না</li>
                  </ul>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold animate-in fade-in flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full py-3 text-xs sm:text-sm font-black rounded-xl text-white shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {verifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>গুগল অ্যাকাউন্ট যাচাই ও ডাটা লোড হচ্ছে...</span>
                    </>
                  ) : isExistingInDb ? (
                    <>
                      <span>সংরক্ষিত অ্যাকাউন্টে সরাসরি প্রবেশ করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>গুগল দিয়ে ভেরিফাই ও অ্যাকাউন্ট নিশ্চিত করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
