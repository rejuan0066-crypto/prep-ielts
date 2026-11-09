'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'admin' | 'moderator' | 'evaluator';

export interface DiagnosticResult {
  completed: boolean;
  testDate: string;
  assessedBand: number;
  targetBand: number;
  examTimeline: string;
  weakestModule: string;
  dailyHours: string;
  readingAccuracy: number;
  writingWordCount: number;
  cefrLevel: 'A2' | 'B1' | 'B2' | 'C1';
  readingScore: number;
  writingScore: number;
  feedback: {
    reading: string;
    writing: string;
    speaking: string;
  };
}

export interface PendingPaymentInfo {
  trxId: string;
  method: string;
  senderNumber: string;
  planName: string;
  amount: string;
  submittedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  plan: 'Free' | 'Pro' | 'VIP';
  targetBand: number;
  currentBand: number;
  studyReminderTime: string;
  emailReminderEnabled: boolean;
  streakDays: number;
  testsCompleted: number;
  joinedDate: string;
  diagnostic?: DiagnosticResult;
  paymentStatus?: 'unpaid' | 'pending' | 'approved';
  pendingPayment?: PendingPaymentInfo;
}

interface AuthContextType {
  user: UserProfile | null;
  authLoaded: boolean;
  previewAsStudent: boolean;
  toggleStudentPreview: () => void;
  loginWithCredentials: (email: string, password: string) => { success: boolean; message?: string };
  registerUser: (name: string, email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  saveDiagnostic: (result: DiagnosticResult) => void;
  refreshUser: () => void;
  switchRole: (role: UserRole) => void;
  upgradePlan: (plan: 'Free' | 'Pro' | 'VIP') => void;
}

export const ADMIN_CREDENTIALS = {
  email: 'admin@prep-ielts.com',
  password: 'Admin@2026'
};

export const MODERATOR_CREDENTIALS = {
  email: 'mod@prep-ielts.com',
  password: 'Mod@2026'
};

export const STUDENT_CREDENTIALS = {
  email: 'student@prep-ielts.com',
  password: 'Student@123'
};

const defaultAdmin: UserProfile = {
  id: 'admin_root',
  name: 'সুপার অ্যাডমিন',
  email: 'admin@prep-ielts.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  plan: 'VIP',
  targetBand: 9.0,
  currentBand: 9.0,
  studyReminderTime: '18:00',
  emailReminderEnabled: true,
  streakDays: 30,
  testsCompleted: 50,
  joinedDate: 'সুপার অ্যাডমিন'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const [previewAsStudent, setPreviewAsStudent] = useState<boolean>(false);

  const refreshUser = () => {
    try {
      const saved = localStorage.getItem('prep_ielts_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        const db = getUsersDb();
        if (parsed.email && db[parsed.email.toLowerCase()]) {
          setUser(db[parsed.email.toLowerCase()].profile);
          localStorage.setItem('prep_ielts_user', JSON.stringify(db[parsed.email.toLowerCase()].profile));
          return;
        }
        setUser(parsed);
      }
    } catch (e) {}
  };

  useEffect(() => {
    refreshUser();
    setAuthLoaded(true);

    const handleStorageChange = () => {
      refreshUser();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('prep_ielts_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('prep_ielts_user');
    }
  };

  const toggleStudentPreview = () => {
    setPreviewAsStudent(prev => !prev);
  };

  const getUsersDb = (): Record<string, { password?: string; profile: UserProfile }> => {
    try {
      const stored = localStorage.getItem('prep_ielts_users_db');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  };

  const saveToUsersDb = (email: string, password: string, profile: UserProfile) => {
    try {
      const db = getUsersDb();
      db[email.trim().toLowerCase()] = { password, profile };
      localStorage.setItem('prep_ielts_users_db', JSON.stringify(db));
    } catch (e) {}
  };

  const registerUser = (name: string, email: string, password: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: 'আপনার সঠিক পূর্ণ নাম লিখুন।' };
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' };
    }

    const db = getUsersDb();
    if (db[cleanEmail]) {
      return { success: false, message: 'এই ইমেইল দিয়ে ইতিপূর্বেই একটি অ্যাকাউন্ট তৈরি করা হয়েছে। অনুগ্রহ করে লগইন করুন।' };
    }

    const newProfile: UserProfile = {
      id: 'usr_' + Date.now().toString().slice(-6),
      name: cleanName,
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      plan: 'Free',
      targetBand: 7.5,
      currentBand: 0,
      studyReminderTime: '21:00',
      emailReminderEnabled: true,
      streakDays: 0,
      testsCompleted: 0,
      joinedDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }),
      diagnostic: undefined
    };

    saveToUsersDb(cleanEmail, password, newProfile);
    saveUser(newProfile);
    setPreviewAsStudent(false);
    return { success: true };
  };

  const loginWithCredentials = (email: string, password: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Super Admin
    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase()) {
      if (password === ADMIN_CREDENTIALS.password) {
        const adminUser: UserProfile = {
          id: 'admin_root',
          name: 'সুপার অ্যাডমিন',
          email: ADMIN_CREDENTIALS.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          role: 'admin',
          plan: 'VIP',
          targetBand: 9.0,
          currentBand: 9.0,
          studyReminderTime: '18:00',
          emailReminderEnabled: true,
          streakDays: 30,
          testsCompleted: 50,
          joinedDate: 'সুপার অ্যাডমিন'
        };
        saveUser(adminUser);
        setPreviewAsStudent(false);
        return { success: true };
      } else {
        return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
      }
    }

    // 2. Moderator Login
    if (cleanEmail === MODERATOR_CREDENTIALS.email.toLowerCase()) {
      if (password === MODERATOR_CREDENTIALS.password) {
        const modUser: UserProfile = {
          id: 'mod_farhana',
          name: 'ড. ফারহানা (মডারেটর)',
          email: MODERATOR_CREDENTIALS.email,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          role: 'moderator',
          plan: 'VIP',
          targetBand: 8.5,
          currentBand: 8.5,
          studyReminderTime: '20:00',
          emailReminderEnabled: true,
          streakDays: 15,
          testsCompleted: 20,
          joinedDate: 'অফিশিয়াল মডারেটর'
        };
        saveUser(modUser);
        setPreviewAsStudent(false);
        return { success: true };
      } else {
        return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
      }
    }

    // 3. User Database lookup (Real isolated user accounts)
    const db = getUsersDb();
    const existing = db[cleanEmail];
    if (existing) {
      if (existing.password === password) {
        saveUser(existing.profile);
        setPreviewAsStudent(false);
        return { success: true };
      } else {
        return { success: false, message: 'পাসওয়ার্ড ভুল হয়েছে! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
      }
    }

    // 4. Direct registration if user is logging in with valid email & password
    if (cleanEmail.includes('@') && password.length >= 6) {
      const studentName = cleanEmail.split('@')[0];
      const newProfile: UserProfile = {
        id: 'usr_' + Date.now().toString().slice(-6),
        name: studentName,
        email: cleanEmail,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'student',
        plan: 'Free',
        targetBand: 7.5,
        currentBand: 0,
        studyReminderTime: '21:00',
        emailReminderEnabled: true,
        streakDays: 0,
        testsCompleted: 0,
        joinedDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }),
        diagnostic: undefined
      };
      saveToUsersDb(cleanEmail, password, newProfile);
      saveUser(newProfile);
      setPreviewAsStudent(false);
      return { success: true };
    }

    return { success: false, message: 'সঠিক ইমেইল ও পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) দিন।' };
  };

  const logout = () => {
    saveUser(null);
    setPreviewAsStudent(false);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
    try {
      const db = getUsersDb();
      if (user.email && db[user.email.toLowerCase()]) {
        db[user.email.toLowerCase()].profile = updated;
        localStorage.setItem('prep_ielts_users_db', JSON.stringify(db));
      }
    } catch (e) {}
  };

  const saveDiagnostic = (result: DiagnosticResult) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      currentBand: result.assessedBand,
      targetBand: result.targetBand,
      testsCompleted: (user.testsCompleted || 0) + 1,
      diagnostic: result
    };
    saveUser(updated);

    try {
      const db = getUsersDb();
      if (user.email && db[user.email.toLowerCase()]) {
        db[user.email.toLowerCase()].profile = updated;
        localStorage.setItem('prep_ielts_users_db', JSON.stringify(db));
      }
    } catch (e) {}
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    saveUser({ ...user, role });
  };

  const upgradePlan = (plan: 'Free' | 'Pro' | 'VIP') => {
    if (!user) return;
    saveUser({ ...user, plan });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      authLoaded,
      previewAsStudent,
      toggleStudentPreview,
      loginWithCredentials, 
      registerUser,
      logout, 
      updateUser, 
      saveDiagnostic,
      refreshUser,
      switchRole, 
      upgradePlan 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
