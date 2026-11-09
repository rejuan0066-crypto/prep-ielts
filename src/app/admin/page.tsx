'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSupport } from '@/context/SupportContext';
import { StaffMember, StaffRole, ROLE_DEFINITIONS } from '@/lib/adminTypes';
import { SupportTicket } from '@/lib/supportTypes';
import { PaymentSettingsManager } from '@/components/admin/PaymentSettingsManager';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  Send, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Plus, 
  Sparkles,
  TrendingUp,
  Award,
  MessageSquare,
  Clock,
  UserCheck,
  Shield,
  UserPlus,
  Settings,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Layers,
  Check,
  X,
  Lock,
  Activity
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'VIP';
  currentBand: number;
  targetBand: number;
  studyReminderTime: string;
  testsCompleted: number;
  status: 'active' | 'suspended';
  joinedDate: string;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf_01',
    name: 'সুপার অ্যাডমিন (Root)',
    email: 'admin@prep-ielts.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    status: 'active',
    permissions: ['all_access', 'finance', 'staff_management', 'content', 'tickets'],
    lastActive: 'এখন সক্রিয়',
    assignedTicketsCount: 12
  },
  {
    id: 'stf_02',
    name: 'ড. ফারহানা চৌধুরী',
    email: 'farhana.mod@prep-ielts.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'moderator',
    status: 'active',
    permissions: ['tickets', 'student_view'],
    lastActive: '১০ মিনিট আগে',
    assignedTicketsCount: 8
  },
  {
    id: 'stf_03',
    name: 'তানভীর আহমেদ',
    email: 'tanvir.admin@prep-ielts.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    status: 'active',
    permissions: ['students', 'broadcast', 'content', 'tickets'],
    lastActive: '১ ঘণ্টা আগে',
    assignedTicketsCount: 5
  },
  {
    id: 'stf_04',
    name: 'সারাহ ইসলাম (IELTS 8.5)',
    email: 'sarah.eval@prep-ielts.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'evaluator',
    status: 'active',
    permissions: ['evaluation', 'tickets'],
    lastActive: 'গতকাল',
    assignedTicketsCount: 15
  }
];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const { tickets, replyToTicket, updateTicketStatus } = useSupport();

  // Navigation Sidebar State
  const [currentSection, setCurrentSection] = useState<'overview' | 'students' | 'tickets' | 'team' | 'broadcast' | 'payment_settings'>('overview');
  
  // Staff / Team Management State
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<StaffRole>('moderator');
  const [newStaffPassword, setNewStaffPassword] = useState('Staff@2026');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('all');
  const [notificationSentMessage, setNotificationSentMessage] = useState<string | null>(null);

  // Ticket active state
  const [adminActiveTicket, setAdminActiveTicket] = useState<SupportTicket | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Load saved staff from localStorage
  useEffect(() => {
    const savedStaff = localStorage.getItem('prep_ielts_staff_list');
    if (savedStaff) {
      try {
        setStaffList(JSON.parse(savedStaff));
      } catch (e) {}
    }
  }, []);

  const saveStaffList = (updated: StaffMember[]) => {
    setStaffList(updated);
    localStorage.setItem('prep_ielts_staff_list', JSON.stringify(updated));
  };

  // Mock Students Database
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: 'std_01',
      name: 'রেজওয়ান আহমেদ',
      email: 'rejuan.ielts@gmail.com',
      plan: 'Pro',
      currentBand: 5.5,
      targetBand: 7.5,
      studyReminderTime: '20:30',
      testsCompleted: 8,
      status: 'active',
      joinedDate: '০১ নভে ২০২৬'
    },
    {
      id: 'std_02',
      name: 'তানজিলা হক',
      email: 'tanjila.hq@gmail.com',
      plan: 'VIP',
      currentBand: 6.5,
      targetBand: 8.0,
      studyReminderTime: '21:00',
      testsCompleted: 14,
      status: 'active',
      joinedDate: '২৫ অক্টো ২০২৬'
    },
    {
      id: 'std_03',
      name: 'মাহমুদুল হাসান',
      email: 'mahmud.h@outlook.com',
      plan: 'Free',
      currentBand: 4.5,
      targetBand: 6.5,
      studyReminderTime: '19:00',
      testsCompleted: 2,
      status: 'active',
      joinedDate: '০৪ নভে ২০২৬'
    },
    {
      id: 'std_04',
      name: 'ফারজানা আক্তার',
      email: 'farzana.akt@gmail.com',
      plan: 'Pro',
      currentBand: 6.0,
      targetBand: 7.0,
      studyReminderTime: '22:00',
      testsCompleted: 9,
      status: 'active',
      joinedDate: '২৮ অক্টো ২০২৬'
    },
    {
      id: 'std_05',
      name: 'রাকিবুল ইসলাম',
      email: 'rakib.is@gmail.com',
      plan: 'Free',
      currentBand: 5.0,
      targetBand: 7.0,
      studyReminderTime: '20:00',
      testsCompleted: 1,
      status: 'active',
      joinedDate: '০৩ নভে ২০২৬'
    }
  ]);

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Route Protection: If not admin
  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          অ্যাডমিন এক্সেস সংরক্ষিত
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          এই পেজে প্রবেশ করতে অনুগ্রহ করে অফিশিয়াল অ্যাডমিন ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন।
        </p>
        <div className="pt-2">
          <a
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-purple-600/20 transition-all"
          >
            <span>অ্যাডমিন লগইন পেজে যান</span>
            <ShieldCheck className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Add New Staff Handler
  const handleAddNewStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim()) return;

    const newStaff: StaffMember = {
      id: 'stf_' + Date.now(),
      name: newStaffName,
      email: newStaffEmail,
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 1000000)}?w=150&auto=format&fit=crop&q=80`,
      role: newStaffRole,
      status: 'active',
      permissions: newStaffRole === 'super_admin' 
        ? ['all_access', 'finance', 'staff_management', 'content', 'tickets'] 
        : newStaffRole === 'admin' 
          ? ['students', 'broadcast', 'content', 'tickets'] 
          : ['tickets', 'student_view'],
      lastActive: 'নতুন যুক্ত',
      assignedTicketsCount: 0
    };

    const updated = [...staffList, newStaff];
    saveStaffList(updated);
    setIsAddStaffModalOpen(false);
    setNewStaffName('');
    setNewStaffEmail('');
    setNotificationSentMessage(`নতুন ${ROLE_DEFINITIONS[newStaffRole].title} সফলভাবে তৈরি হয়েছে!`);
    setTimeout(() => setNotificationSentMessage(null), 3000);
  };

  const handleUpdateStaffRole = (staffId: string, role: StaffRole) => {
    const updated = staffList.map(s => s.id === staffId ? { ...s, role } : s);
    saveStaffList(updated);
    setNotificationSentMessage('টিম মেম্বারের রোল আপডেট করা হয়েছে!');
    setTimeout(() => setNotificationSentMessage(null), 2500);
  };

  const handleToggleStaffStatus = (staffId: string) => {
    const updated = staffList.map(s => {
      if (s.id === staffId) {
        return { ...s, status: s.status === 'active' ? ('inactive' as const) : ('active' as const) };
      }
      return s;
    });
    saveStaffList(updated);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('আপনি কি এই অ্যাডমিন/মডারেটরের অ্যাক্সেস বাতিল করতে চান?')) {
      const updated = staffList.filter(s => s.id !== staffId);
      saveStaffList(updated);
      setNotificationSentMessage('স্টাফ মেম্বার মুছে ফেলা হয়েছে।');
      setTimeout(() => setNotificationSentMessage(null), 2500);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlanFilter === 'all' || s.plan === selectedPlanFilter;
    return matchesSearch && matchesPlan;
  });

  const handleSendReminderToStudent = (studentEmail: string) => {
    setNotificationSentMessage(`${studentEmail}-এ রিমাইন্ডার ইমেইল সফলভাবে পাঠানো হয়েছে!`);
    setTimeout(() => setNotificationSentMessage(null), 3000);
  };

  const handleTogglePlan = (studentId: string) => {
    setStudents(students.map(s => {
      if (s.id === studentId) {
        const nextPlan = s.plan === 'Free' ? 'Pro' : s.plan === 'Pro' ? 'VIP' : 'Free';
        return { ...s, plan: nextPlan };
      }
      return s;
    }));
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) return;
    setNotificationSentMessage(`সকল শিক্ষার্থীদের (${students.length} জন) কাছে ইমেইল পাঠানো হয়েছে!`);
    setBroadcastSubject('');
    setBroadcastMessage('');
    setTimeout(() => setNotificationSentMessage(null), 4000);
  };

  const handleAdminReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !adminActiveTicket) return;

    replyToTicket(
      adminActiveTicket.id,
      user?.id || 'adm_01',
      user?.name || 'অফিশিয়াল অ্যাডমিন',
      'moderator',
      adminReplyText
    );

    setAdminReplyText('');
    setNotificationSentMessage(`টিকিট ${adminActiveTicket.ticketNumber}-এ উত্তর সফলভাবে পোস্ট করা হয়েছে!`);
    setTimeout(() => setNotificationSentMessage(null), 3000);

    const updated = tickets.find(t => t.id === adminActiveTicket.id);
    if (updated) setAdminActiveTicket(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-purple-500 selection:text-white">
      
      {/* ENTERPRISE SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Admin Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>PrepIELTS</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>System Operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'overview'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ওভারভিউ ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setCurrentSection('team')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'team'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>অ্যাডমিন ও রোল টিম</span>
              </div>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded-md font-mono">
                {staffList.length}
              </span>
            </button>

            <button
              onClick={() => setCurrentSection('tickets')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'tickets'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>হেল্প ডেস্ক টিকিট</span>
              </div>
              {tickets.filter(t => t.status === 'অপেক্ষারত').length > 0 && (
                <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full font-bold">
                  {tickets.filter(t => t.status === 'অপেক্ষারত').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentSection('students')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'students'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>ছাত্র তালিকা ও অগ্রগতি</span>
            </button>

            <button
              onClick={() => setCurrentSection('payment_settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'payment_settings'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>পেমেন্ট গেটওয়ে সেটআপ</span>
            </button>

            <button
              onClick={() => setCurrentSection('broadcast')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSection === 'broadcast'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Mail className="w-4 h-4 text-pink-400" />
              <span>ইমেইল ব্রডকাস্টার</span>
            </button>
          </nav>

        </div>

        {/* Sidebar Footer User Info */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div className="truncate flex-1">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-purple-300 font-mono">Super Admin</div>
            </div>
          </div>

          <a
            href="/"
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-[11px] font-bold text-slate-300 flex items-center justify-center gap-2 transition-all"
          >
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto max-h-screen bg-slate-900">
        
        {/* Toast Alert */}
        {notificationSentMessage && (
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-bold shadow-xl flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notificationSentMessage}</span>
            </div>
            <button onClick={() => setNotificationSentMessage(null)}>✕</button>
          </div>
        )}

        {/* SECTION 1: OVERVIEW METRICS */}
        {currentSection === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  কমান্ড সেন্টার সার্বিক ওভারভিউ
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  প্ল্যাটফর্মের লাইভ পারফরম্যান্স, শিক্ষার্থী বৃদ্ধি ও রেভিনিউ মেট্রিক্স
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddStaffModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-2 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>নতুন অ্যাডমিন/মডারেটর যুক্ত করুন</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">মোট শিক্ষার্থী</span>
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">১,২৪০ জন</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+১২% এই মাসে বৃদ্ধি</span>
                </div>
              </div>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">পেইড Pro গ্রাহক</span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">৪২০ জন</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  মোট ছাত্রের ৩৪% পেইড কনভার্সন
                </div>
              </div>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">মাসিক আয় (MRR)</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">৳ ৩,৮৪,০০০</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+১৮% গত মাসের চেয়ে</span>
                </div>
              </div>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">অ্যাডমিন টিম মেম্বার</span>
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">{staffList.length} জন</div>
                <div className="text-[11px] text-purple-300 mt-1">
                  অ্যাডমিন, মডারেটর ও পরীক্ষক
                </div>
              </div>

            </div>

            {/* Quick Actions Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div 
                onClick={() => setCurrentSection('team')}
                className="p-6 bg-gradient-to-br from-purple-950/40 to-slate-800/80 border border-purple-800/40 rounded-3xl hover:border-purple-500/60 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-base text-white">টিম ও রোল ম্যানেজমেন্ট</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  একাধিক অ্যাডমিন ও মডারেটর নিয়োগ করুন, তাদের দায়িত্ব ও পারমিশন কন্ট্রোল করুন।
                </p>
              </div>

              <div 
                onClick={() => setCurrentSection('tickets')}
                className="p-6 bg-gradient-to-br from-indigo-950/40 to-slate-800/80 border border-indigo-800/40 rounded-3xl hover:border-indigo-500/60 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-base text-white">হেল্প ডেস্ক সমাধান</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ছাত্রদের করা প্রশ্নগুলোর পর্যালোচনা করুন ও মডারেটর হিসেবে দ্রুত সমাধান দিন।
                </p>
              </div>

              <div 
                onClick={() => setCurrentSection('students')}
                className="p-6 bg-gradient-to-br from-blue-950/40 to-slate-800/80 border border-blue-800/40 rounded-3xl hover:border-blue-500/60 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-base text-white">ছাত্রদের অগ্রগতি ও টেস্ট</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  কোন শিক্ষার্থী কতটি মক টেস্ট দিয়েছে এবং কার ব্যান্ড কত উন্নতি হচ্ছে তা ট্র্যাক করুন।
                </p>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 2: STAFF & ROLE-BASED ACCESS CONTROL (RBAC) */}
        {currentSection === 'team' && (
          <div className="space-y-6 animate-in fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  অ্যাডমিন ও মডারেটর টিম ম্যানেজমেন্ট (RBAC)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  নতুন টিম মেম্বার তৈরি করুন এবং ভূমিকা (Super Admin, Admin, Moderator, Evaluator) অনুযায়ী পারমিশন দিন।
                </p>
              </div>

              <button
                onClick={() => setIsAddStaffModalOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>নতুন অ্যাডমিন / মডারেটর তৈরি করুন</span>
              </button>
            </div>

            {/* Roles Legend Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(ROLE_DEFINITIONS) as StaffRole[]).map((r) => {
                const def = ROLE_DEFINITIONS[r];
                const count = staffList.filter(s => s.role === r).length;

                return (
                  <div key={r} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${def.badgeColor}`}>
                        {def.title.split(' ')[0]}
                      </span>
                      <span className="text-xs font-bold text-slate-300 font-mono">{count} জন</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1">{def.title}</div>
                    <p className="text-[11px] text-slate-400 leading-snug">{def.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Staff Members Table */}
            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>সক্রিয় অ্যাডমিন ও মডারেটর তালিকা ({staffList.length})</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Role-Based Control Active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-5">নাম ও ইমেইল</th>
                      <th className="py-3 px-4">পদবী / ভূমিকা (Role)</th>
                      <th className="py-3 px-4">অনুমতিসমূহ (Permissions)</th>
                      <th className="py-3 px-4">স্ট্যাটাস</th>
                      <th className="py-3 px-4">সর্বশেষ সক্রিয়</th>
                      <th className="py-3 px-5 text-right">রোল পরিবর্তন / অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {staffList.map((stf) => (
                      <tr key={stf.id} className="hover:bg-slate-700/30 transition-colors">
                        
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={stf.avatar}
                              alt={stf.name}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/30"
                            />
                            <div>
                              <div className="font-bold text-white text-xs">{stf.name}</div>
                              <div className="text-slate-400 text-[11px] font-mono">{stf.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${ROLE_DEFINITIONS[stf.role].badgeColor}`}>
                            {ROLE_DEFINITIONS[stf.role].title}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {stf.permissions.map((p, pIdx) => (
                              <span key={pIdx} className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStaffStatus(stf.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              stf.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stf.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                            <span>{stf.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>
                          </button>
                        </td>

                        <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                          {stf.lastActive}
                        </td>

                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Role Select Dropdown */}
                            <select
                              value={stf.role}
                              onChange={(e) => handleUpdateStaffRole(stf.id, e.target.value as StaffRole)}
                              disabled={stf.role === 'super_admin'}
                              className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-[11px] font-medium text-slate-200 focus:outline-none focus:border-purple-500 disabled:opacity-40"
                            >
                              <option value="super_admin">Super Admin</option>
                              <option value="admin">Admin</option>
                              <option value="moderator">Moderator</option>
                              <option value="evaluator">Examiner</option>
                            </select>

                            {stf.role !== 'super_admin' && (
                              <button
                                onClick={() => handleDeleteStaff(stf.id)}
                                title="অ্যাক্সেস বাতিল করুন"
                                className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 3: HELP DESK TICKETS */}
        {currentSection === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in fade-in">
            
            {/* Ticket List for Admins */}
            <div className="lg:col-span-1 bg-slate-800/80 p-5 rounded-3xl border border-slate-700 shadow-sm space-y-4">
              <h2 className="font-extrabold text-white text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                সকল ছাত্রের প্রশ্ন ও সমস্যা ({tickets.length})
              </h2>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {tickets.map((tkt) => {
                  const isSelected = adminActiveTicket?.id === tkt.id;

                  return (
                    <div
                      key={tkt.id}
                      onClick={() => setAdminActiveTicket(tkt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-950/30 ring-2 ring-purple-500/20 shadow-sm'
                          : 'border-slate-700/80 hover:border-slate-600 bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {tkt.ticketNumber} • {tkt.studentName}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.status === 'সমাধানকৃত'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {tkt.status}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                        {tkt.subject}
                      </h3>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t pt-2 border-slate-800">
                        <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-purple-300">
                          {tkt.studentPlan}
                        </span>
                        <span className="text-purple-400 font-semibold">
                          {tkt.messages.length} টি বার্তা
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Admin Reply & Conversation Pane */}
            <div className="lg:col-span-2">
              {adminActiveTicket ? (
                <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
                  
                  {/* Header */}
                  <div className="p-6 bg-slate-950/50 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                          {adminActiveTicket.ticketNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          ছাত্র: <strong>{adminActiveTicket.studentName}</strong> ({adminActiveTicket.studentEmail})
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {adminActiveTicket.studentPlan}
                        </span>
                      </div>
                      <h2 className="text-base font-black text-white">
                        {adminActiveTicket.subject}
                      </h2>
                    </div>

                    {/* Status Toggle by Admin */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const next = adminActiveTicket.status === 'সমাধানকৃত' ? 'অপেক্ষারত' : 'সমাধানকৃত';
                          updateTicketStatus(adminActiveTicket.id, next);
                          setAdminActiveTicket({ ...adminActiveTicket, status: next });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          adminActiveTicket.status === 'সমাধানকৃত'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                      >
                        স্ট্যাটাস: {adminActiveTicket.status} (টগল করুন)
                      </button>
                    </div>
                  </div>

                  {/* Messages Thread */}
                  <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto">
                    {adminActiveTicket.messages.map((msg) => {
                      const isStaff = msg.senderRole !== 'student';

                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3.5 ${isStaff ? 'bg-purple-950/20 p-4 rounded-2xl border border-purple-800/40' : ''}`}
                        >
                          <div className="w-9 h-9 rounded-full bg-slate-700 shrink-0 overflow-hidden mt-0.5">
                            {msg.avatar ? (
                              <img src={msg.avatar} alt={msg.senderName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                                {msg.senderName.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">
                                  {msg.senderName}
                                </span>
                                {isStaff && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                                    অফিশিয়াল মডারেটর
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {msg.createdAt}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Admin Reply Composer Form */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-700">
                    <form onSubmit={handleAdminReplySubmit} className="space-y-3">
                      <textarea
                        rows={3}
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        placeholder="অ্যাডমিন বা সার্টিফাইড মডারেটর হিসেবে উত্তর লিখুন (ছাত্র সরাসরি এটি তার পোর্টালে দেখতে পাবে)..."
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                      ></textarea>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-purple-600/30"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>ছাত্রকে রিপ্লাই পাঠান</span>
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="p-12 bg-slate-800/80 rounded-3xl border border-dashed border-slate-700 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-white text-base">
                    উত্তর দেওয়ার জন্য বাম পাশ থেকে একটি টিকিট সিলেক্ট করুন
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    শিক্ষার্থীদের যে কোনো প্রশ্ন, রিডিং-রাইটিং সমস্যা বা প্যাকেজ জিজ্ঞাসা পর্যালোচনা করে রিপ্লাই দিন।
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* SECTION 4: STUDENTS LIST */}
        {currentSection === 'students' && (
          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-sm overflow-hidden space-y-4 p-6 animate-in fade-in">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="নাম বা ইমেইল দিয়ে ছাত্র খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">প্যাকেজ:</span>
                {['all', 'Free', 'Pro', 'VIP'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlanFilter(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedPlanFilter === p
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {p === 'all' ? 'সব' : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/60 text-slate-400 uppercase font-bold text-[10px] border-y border-slate-700">
                  <tr>
                    <th className="py-3 px-4">শিক্ষার্থী</th>
                    <th className="py-3 px-4">প্যাকেজ</th>
                    <th className="py-3 px-4">বর্তমান / টার্গেট</th>
                    <th className="py-3 px-4">স্টাডি টাইম (রিমাইন্ডার)</th>
                    <th className="py-3 px-4">টেস্ট সংখ্যা</th>
                    <th className="py-3 px-4">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-700/30 transition-colors">
                      
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{std.name}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{std.email}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          std.plan === 'VIP'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : std.plan === 'Pro'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-slate-700 text-slate-300'
                        }`}>
                          {std.plan}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">
                          Band {std.currentBand} ➔ <span className="text-purple-400 font-bold">Band {std.targetBand}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-300 font-mono font-medium">
                          {std.studyReminderTime} (রাত)
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white font-mono">{std.testsCompleted} টি</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSendReminderToStudent(std.email)}
                            title="ইমেইল রিমাইন্ডার পাঠান"
                            className="px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span>রিমাইন্ডার</span>
                          </button>

                          <button
                            onClick={() => handleTogglePlan(std.id)}
                            className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            প্ল্যান পরিবর্তন
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* SECTION 5: EMAIL BROADCASTER */}
        {currentSection === 'broadcast' && (
          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl animate-in fade-in">
            <div>
              <h2 className="text-lg font-black text-white">
                সকল ছাত্রের কাছে সরাসরি ইমেইল নোটিফিকেশন পাঠান
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                নতুন মক টেস্ট, স্পেশাল অফার বা স্পিকিং টিপস সকল নিবন্ধিত শিক্ষার্থীর ইনবক্সে চলে যাবে।
              </p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  ইমেইল বিষয় (Subject):
                </label>
                <input
                  type="text"
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="যেমন: [PrepIELTS] নতুন কেমব্রিজ ১৯ রিডিং টেস্ট যুক্ত হয়েছে!"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  মেসেজ বা নোটিফিকেশন বডি:
                </label>
                <textarea
                  rows={6}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="প্রিয় শিক্ষার্থী, আপনার আজকের আইএলটিএস পড়ার প্রস্তুতি আরও সহজ করতে..."
                  className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>সকল ছাত্রকে ইমেইল সেন্ড করুন</span>
              </button>
            </form>
          </div>
        )}

        {/* SECTION 6: PAYMENT SETTINGS MANAGER (Edumate BD Style) */}
        {currentSection === 'payment_settings' && (
          <PaymentSettingsManager />
        )}

      </main>

      {/* CREATE NEW ADMIN / MODERATOR MODAL */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-white">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    নতুন টিম মেম্বার তৈরি করুন
                  </h3>
                  <p className="text-xs text-slate-400">অ্যাডমিন বা মডারেটরের দায়িত্ব নির্ধারণ করুন</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  নাম (Full Name):
                </label>
                <input
                  type="text"
                  required
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="যেমন: ড. ফারহানা চৌধুরী"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  অফিশিয়াল ইমেইল:
                </label>
                <input
                  type="email"
                  required
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  placeholder="farhana.mod@prep-ielts.com"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  ভূমিকা ও ক্ষমতা (Assign Role):
                </label>
                <select
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value as StaffRole)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="moderator">মডারেটর (Moderator - হেল্প ডেস্ক ও টিকিট রিপ্লাই)</option>
                  <option value="admin">অ্যাডমিন (Admin - ছাত্র ব্যবস্থাপনা ও ব্রডকাস্ট)</option>
                  <option value="evaluator">পরীক্ষক (Examiner - রাইটিং ও স্পিকিং রিভিউ)</option>
                  <option value="super_admin">সুপার অ্যাডমিন (Super Admin - সম্পূর্ণ ক্ষমতা)</option>
                </select>
                <p className="text-[11px] text-purple-300 mt-1">
                  {ROLE_DEFINITIONS[newStaffRole].description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  অ্যাক্সেস পাসওয়ার্ড:
                </label>
                <input
                  type="text"
                  required
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddStaffModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>টিম মেম্বার তৈরি করুন</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
