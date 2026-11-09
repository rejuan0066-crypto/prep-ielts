'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, authLoaded } = useAuth();

  useEffect(() => {
    if (!authLoaded) return;

    if (user) {
      if (user.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    } else {
      router.replace('/login');
    }
  }, [user, authLoaded, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <div className="w-10 h-10 rounded-2xl bg-[#E11D48] flex items-center justify-center text-white font-black text-lg">
          P
        </div>
        <span className="text-xs font-bold text-slate-400 font-mono">
          PrepIELTS.ai সিকিউর গেটওয়ে লোড হচ্ছে...
        </span>
      </div>
    </div>
  );
}
