'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  LayoutGrid,
  Calendar, 
  FileText, 
  Layers, 
  Mic, 
  PenTool, 
  Bot, 
  BookOpen, 
  BookA, 
  Keyboard, 
  Library, 
  BarChart3, 
  Flame, 
  Trophy, 
  CreditCard, 
  HelpCircle, 
  Moon, 
  Sun, 
  ChevronDown, 
  Zap, 
  PanelLeftClose, 
  PanelLeftOpen,
  Sparkles,
  Award,
  Globe,
  GraduationCap,
  LogOut
} from 'lucide-react';

export const IeltslySidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mockTestsOpen, setMockTestsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Exact IELTSly Sidebar Group Hierarchy
  const menuGroups = [
    {
      title: 'YOUR PREPARATION',
      items: [
        { label: 'Overview', href: '/overview', icon: LayoutGrid },
        { label: 'Study Plan', href: '/dashboard', icon: Calendar },
        { 
          label: 'Mock Tests', 
          href: '/mock-tests/full', 
          icon: FileText, 
          hasSub: true,
          isOpen: mockTestsOpen,
          onToggle: () => setMockTestsOpen(!mockTestsOpen),
          subItems: [
            { label: 'Cambridge Books', href: '/library' },
            { label: 'Full Mock Test', href: '/mock-tests/full' },
            { label: 'CD-IELTS Listening', href: '/practice/listening' },
            { label: 'CD-IELTS Reading', href: '/practice/reading' },
            { label: 'Writing Mock', href: '/practice/writing' },
            { label: 'Speaking Mock', href: '/practice/speaking' },
          ]
        },
        { label: 'Part Practice', href: '/practice/reading', icon: Layers },
      ]
    },
    {
      title: 'PRACTICE & LEARN',
      items: [
        { label: 'Pre-IELTS Foundation', href: '/foundation', icon: GraduationCap },
        { label: 'AI Speaking Partner', href: '/practice/speaking', icon: Mic },
        { label: 'AI Rewriter', href: '/ai-rewriter', icon: Sparkles },
        { label: 'IELTS AI Chatbot', href: '/ai-chatbot', icon: Bot },
        { label: 'Vocabulary', href: '/vocabulary', icon: BookA },
        { label: 'Grammar', href: '/foundation', icon: BookOpen },
        { label: 'Typing Speed', href: '/typing-test', icon: Keyboard },
        { label: 'Cambridge Books Library', href: '/library', icon: Library },
      ]
    },
    {
      title: 'YOUR PROGRESS',
      items: [
        { label: 'My Reports', href: '/reports', icon: BarChart3 },
        { label: 'Streaks', href: '/streaks', icon: Flame },
        { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
      ]
    },
    {
      title: 'EXPLORE',
      items: [
        { label: 'Subscriptions', href: '/pricing', icon: CreditCard },
        { label: 'How to use PrepIELTS', href: '/support', icon: HelpCircle },
      ]
    }
  ];

  return (
    <aside className={`bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 transition-all duration-300 z-30 select-none shadow-xs h-screen overflow-hidden ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      
      {/* 1. TOP BRAND LOGO HEADER - Exact IELTSly Typography */}
      <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
        {!isCollapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-extrabold text-[22px] tracking-tight text-slate-900 flex items-center">
              Prep<span className="text-[#E11D48]">IELTS</span>
            </span>
            <span className="text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200/90 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-mono">
              PRO
            </span>
          </Link>
        ) : (
          <Link href="/dashboard" className="mx-auto w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-black text-base shadow-sm">
            P
          </Link>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. SCROLLABLE MIDDLE NAVIGATION - Exact IELTSly Styling */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 text-xs font-medium text-slate-600 scrollbar-thin">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-0.5">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5 mt-2">
                {group.title}
              </div>
            )}

            {group.items.map((item, iIdx) => {
              const Icon = item.icon;
              const isDirectActive = pathname === item.href;
              const isSubActive = item.subItems && item.subItems.some(sub => pathname === sub.href);
              const isActive = isDirectActive || isSubActive;

              if (item.hasSub) {
                return (
                  <div key={iIdx} className="space-y-0.5">
                    <button
                      onClick={item.onToggle}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                        isActive
                          ? 'bg-[#FFF0F2] text-[#E11D48] font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#E11D48]' : 'text-slate-400'}`} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown className={`w-3.5 h-3.5 ${isActive ? 'text-[#E11D48]' : 'text-slate-400'} transition-transform ${item.isOpen ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    {item.isOpen && !isCollapsed && item.subItems && (
                      <div className="pl-9 pr-2 space-y-0.5 pt-0.5">
                        {item.subItems.map((sub, sIdx) => {
                          const isCurrent = pathname === sub.href;
                          return (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              className={`block px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                isCurrent
                                  ? 'text-[#E11D48] font-bold bg-rose-50/60'
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={iIdx}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] transition-all ${
                    isDirectActive
                      ? 'bg-[#FFF0F2] text-[#E11D48] font-bold'
                      : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isDirectActive ? 'text-[#E11D48]' : 'text-slate-400'}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* 3. DOCKED BOTTOM PROFILE & LANGUAGE BAR - Exact IELTSly Layout */}
      <div className="p-3 border-t border-slate-100 space-y-2.5 shrink-0 bg-white">
        
        {/* Language & Theme Row */}
        {!isCollapsed && (
          <div className="flex items-center justify-between px-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 font-medium text-xs">
              <span className="font-bold text-slate-800">GB</span>
              <span className="text-slate-600">English</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
              title="Toggle theme"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Profile Card with XP Flash Points & Logout */}
        <div className={`p-2 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between gap-2 ${
          isCollapsed ? 'justify-center p-2' : ''
        }`}>
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-indigo-900 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-slate-200">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'G'}
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'অতিথি (Guest)'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.role ? `${user.role.toUpperCase()} • ${user.plan || 'Free'}` : 'লগইন করা নেই'}
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  title="লগআউট করুন"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-1 rounded-lg"
                >
                  লগইন
                </Link>
              )}
            </div>
          )}
        </div>

      </div>

    </aside>
  );
};
