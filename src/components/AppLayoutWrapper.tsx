'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { IeltslySidebar } from './IeltslySidebar';
import { GraduationCap, LogOut } from 'lucide-react';

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, authLoaded, logout } = useAuth();

  const isFullExamMode = pathname.startsWith('/practice/reading') || pathname.startsWith('/practice/listening');
  const isDiagnostic = pathname === '/diagnostic';
  const isAdminPortal = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/';
  const isPricing = pathname === '/pricing';

  const isEnrolled = !user || user.role !== 'student' || user.paymentStatus === 'approved' || user.plan === 'Pro' || user.plan === 'VIP';
  const isPending = user?.role === 'student' && user?.paymentStatus === 'pending';

  // ROUTE PROTECTION FOR STUDENTS:
  // If student hasn't taken diagnostic test -> force to /diagnostic
  // If student has taken diagnostic but not enrolled/verified -> force to /pricing (or show pending status on /dashboard)
  useEffect(() => {
    if (!authLoaded || !user || user.role !== 'student') return;

    // 1. If diagnostic not completed, block all course routes
    if (!user.diagnostic?.completed) {
      if (pathname !== '/diagnostic' && pathname !== '/login') {
        router.replace('/diagnostic');
      }
      return;
    }

    // 2. If diagnostic completed, but unpaid & unverified, block course routes
    if (!isEnrolled) {
      // Allowed paths: /pricing (to buy or see status), /dashboard (where pending/payment gate is rendered), /diagnostic
      const allowedPaths = ['/pricing', '/dashboard', '/diagnostic', '/login'];
      if (!allowedPaths.includes(pathname)) {
        router.replace('/pricing');
      }
    }
  }, [authLoaded, user, isEnrolled, pathname, router]);

  // FULL SCREEN ROUTES:
  // 1. Full exam modes, diagnostic test, admin portal, login page, or pricing page
  // 2. ANY route when student is NOT ENROLLED/VERIFIED (Sidebar must NEVER show!)
  if (isFullExamMode || isDiagnostic || isAdminPortal || isAuthPage || isPricing || (!isEnrolled && user?.role === 'student')) {
    return (
      <div className="min-h-screen w-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden">
        
        {/* Clean top navigation header for unverified students on protected pages */}
        {!isEnrolled && user?.role === 'student' && !isAuthPage && !isAdminPortal && !isDiagnostic && (
          <header className="w-full bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E11D48] to-rose-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                  <span>PrepIELTS</span>
                  <span className="text-[#E11D48]">.ai</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200 ml-1">
                    কোর্স অ্যাক্টিভেশন বাকি
                  </span>
                </h1>
                <p className="text-[11px] text-slate-500">
                  {user.name} ({user.email})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => logout()}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span>লগআউট</span>
              </button>
            </div>
          </header>
        )}

        <div className="flex-1 w-full">{children}</div>
      </div>
    );
  }

  // ALL OTHER ROUTES FOR VERIFIED STUDENTS & ADMINS:
  // Show Unified Left Sidebar
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* Exact IELTSly Left Navigation Sidebar */}
      <IeltslySidebar />

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto h-screen bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
};
