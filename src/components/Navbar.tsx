'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSupport } from '@/context/SupportContext';
import { LoginModal } from '@/components/LoginModal';
import { StudyReminderModal } from '@/components/StudyReminderModal';
import { 
  Flame, 
  Target, 
  BookOpen, 
  PenTool, 
  Mic, 
  LayoutDashboard, 
  Sparkles,
  GraduationCap,
  Shield,
  CreditCard,
  Bell,
  LogOut,
  User,
  ChevronDown,
  HelpCircle,
  Eye,
  EyeOff,
  Activity,
  Users,
  MessageSquare
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout, previewAsStudent, toggleStudentPreview } = useAuth();
  const { tickets, getStudentTickets } = useSupport();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isStaff = user && (user.role === 'admin' || user.role === 'moderator' || user.role === 'evaluator');
  const isStaffView = isStaff && !previewAsStudent;

  const pendingTicketsCount = tickets.filter(t => t.status === 'অপেক্ষারত').length;

  // HIDE TOP NAVBAR ON APP DASHBOARD & ADMIN (IELTSly has only the left sidebar inside the app)
  const isAppWorkspace = pathname === '/dashboard' || 
                         pathname === '/overview' || 
                         pathname === '/vocabulary' || 
                         pathname === '/typing-test' || 
                         pathname === '/leaderboard' || 
                         pathname.startsWith('/admin');

  if (isAppWorkspace) {
    return null;
  }

  const studentNavItems = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard', icon: LayoutDashboard },
    { label: 'রিডিং মক', href: '/practice/reading', icon: BookOpen },
    { label: 'রাইটিং এআই', href: '/practice/writing', icon: PenTool },
    { label: 'স্পিকিং টিউটর', href: '/practice/speaking', icon: Mic },
    { label: 'প্যাকেজ', href: '/pricing', icon: CreditCard },
  ];

  return (
    <>
      {/* PREVIEW BANNER IF STAFF IS VIEWING AS STUDENT */}
      {isStaff && previewAsStudent && (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-100 px-4 py-1.5 text-xs flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span><strong>স্টাফ প্রিভিউ মোড:</strong> আপনি বর্তমানে একজন সাধারণ শিক্ষার্থীর দৃষ্টিতে সাইটটি দেখছেন।</span>
          </div>
          <button
            onClick={toggleStudentPreview}
            className="px-2.5 py-0.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold text-[11px] transition-colors"
          >
            অ্যাডমিন মোডে ফিরুন ➔
          </button>
        </div>
      )}

      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
        isStaffView 
          ? 'bg-slate-950/95 border-slate-800 text-white' 
          : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* BRAND */}
          <div className="flex items-center gap-6">
            <Link href={isStaffView ? "/admin" : "/"} className="flex items-center gap-2.5 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
                isStaffView 
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-purple-600/30' 
                  : 'bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-indigo-500/20'
              }`}>
                {isStaffView ? <Shield className="w-5 h-5" /> : <GraduationCap className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-extrabold text-xl tracking-tight ${isStaffView ? 'text-white' : 'text-slate-900'}`}>
                    Prep<span className="text-indigo-500">IELTS</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isStaffView ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {isStaffView ? (user?.role === 'moderator' ? 'MODERATOR' : 'ADMIN') : 'AI'}
                  </span>
                </div>
                <p className={`text-[10px] font-medium hidden sm:block ${isStaffView ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isStaffView ? 'ম্যানেজমেন্ট ও মডারেশন স্যুইট' : 'স্মার্ট আইএলটিএস লার্নিং প্ল্যাটফর্ম'}
                </p>
              </div>
            </Link>

            {/* NAVIGATION LINKS */}
            {isStaffView ? (
              /* ================= STAFF / ADMIN NAVIGATION ================= */
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    pathname === '/admin'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  <span>কমান্ড সেন্টার</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>হেল্প ডেস্ক টিকিট</span>
                  {pendingTicketsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                      {pendingTicketsCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                >
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>ছাত্র তালিকা</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>টিম ও রোলস</span>
                </Link>
              </nav>
            ) : (
              /* ================= STUDENT NAVIGATION ================= */
              <nav className="hidden md:flex items-center gap-1">
                {studentNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/support"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === '/support'
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>হেল্প ডেস্ক</span>
                </Link>
              </nav>
            )}

          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {isStaffView ? (
              /* ================= STAFF CONTROLS (NO STREAKS / NO BAND TARGET) ================= */
              <>
                {/* Platform Health */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Live 99.9%</span>
                </div>

                {/* Switch to Student Preview Button */}
                <button
                  onClick={toggleStudentPreview}
                  title="ছাত্ররা সাইটটি কেমন দেখছে তা প্রিভিউ করুন"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline">শিক্ষার্থী ভিউ</span>
                </button>
              </>
            ) : (
              /* ================= STUDENT CONTROLS ================= */
              <>
                {/* Study Time Email Reminder Bell */}
                {user && (
                  <button
                    onClick={() => setIsReminderModalOpen(true)}
                    title={`স্টাডি রিমাইন্ডার টাইম: ${user.studyReminderTime}`}
                    className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {user.emailReminderEnabled && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}
                  </button>
                )}

                {/* Daily Streak */}
                {user && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-200 text-xs text-amber-700 font-semibold">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                    <span>{user.streakDays} দিন স্ট্রিক</span>
                  </div>
                )}

                {/* Plan Badge */}
                {user && (
                  <Link
                    href="/pricing"
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-[11px] font-bold text-indigo-700"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{user.plan} Plan</span>
                  </Link>
                )}
              </>
            )}

            {/* USER PROFILE DROPDOWN */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 p-1.5 rounded-2xl transition-colors ${
                    isStaffView ? 'hover:bg-slate-900' : 'hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/40"
                  />
                  <div className="text-left hidden md:block">
                    <span className={`text-xs font-bold block truncate max-w-[120px] ${isStaffView ? 'text-white' : 'text-slate-800'}`}>
                      {user.name}
                    </span>
                    {isStaff && (
                      <span className="text-[10px] text-purple-400 font-mono block leading-none">
                        {user.role === 'admin' ? 'Super Admin' : 'Moderator'}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 text-slate-900">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      {isStaff && (
                        <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          {user.role === 'admin' ? 'সুপার অ্যাডমিন' : 'আইএলটিএস মডারেটর'}
                        </span>
                      )}
                    </div>

                    <div className="p-1 space-y-0.5">
                      {isStaff && (
                        <>
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5 text-purple-600" />
                            <span>অ্যাডমিন কমান্ড সেন্টার</span>
                          </Link>

                          <button
                            onClick={() => {
                              toggleStudentPreview();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{previewAsStudent ? 'অ্যাডমিন মোডে ফিরুন' : 'শিক্ষার্থী ভিউ প্রিভিউ করুন'}</span>
                          </button>
                        </>
                      )}

                      <Link
                        href="/support"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>সাপোর্ট টিকিট ইনবক্স</span>
                      </Link>

                      <button
                        onClick={() => {
                          setIsReminderModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Bell className="w-3.5 h-3.5 text-indigo-600" />
                        <span>স্টাডি টাইম ও নোটিফিকেশন</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 p-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>লগআউট করুন</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Google দিয়ে সাইন ইন</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Google Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Study Reminder & Email Settings Modal */}
      <StudyReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </>
  );
};
