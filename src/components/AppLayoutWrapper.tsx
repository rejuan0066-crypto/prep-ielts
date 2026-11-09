'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { IeltslySidebar } from './IeltslySidebar';

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Full-Screen Exam Modes, Login Page, Diagnostic Test, and Admin Portal
  const isFullExamMode = pathname.startsWith('/practice/reading') || pathname.startsWith('/practice/listening');
  const isDiagnostic = pathname === '/diagnostic';
  const isAdminPortal = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/';

  // If on login page, CD-IELTS reading exam, admin portal, or diagnostic test, render 100% full screen
  if (isFullExamMode || isDiagnostic || isAdminPortal || isAuthPage) {
    return (
      <div className="min-h-screen w-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden">
        <div className="flex-1 w-full">{children}</div>
      </div>
    );
  }

  // ALL OTHER ROUTES: Unified IELTSly Pro Student App Layout with Left Sidebar
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
