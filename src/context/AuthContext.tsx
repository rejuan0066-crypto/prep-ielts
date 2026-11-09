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
}

interface AuthContextType {
  user: UserProfile | null;
  authLoaded: boolean;
  previewAsStudent: boolean;
  toggleStudentPreview: () => void;
  loginWithGoogle: () => void;
  loginWithCredentials: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  saveDiagnostic: (result: DiagnosticResult) => void;
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem('prep_ielts_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {}
    setAuthLoaded(true);
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

  const loginWithGoogle = () => {
    let savedDiag: DiagnosticResult | undefined;
    try {
      const stored = localStorage.getItem('prep_ielts_diagnostic_google');
      if (stored) savedDiag = JSON.parse(stored);
    } catch (e) {}

    const googleUser: UserProfile = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: 'রেজওয়ান আহমেদ (Google)',
      email: 'user.google@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      plan: 'Pro',
      targetBand: savedDiag ? savedDiag.targetBand : 7.5,
      currentBand: savedDiag ? savedDiag.assessedBand : 0,
      studyReminderTime: '21:00',
      emailReminderEnabled: true,
      streakDays: savedDiag ? 1 : 0,
      testsCompleted: savedDiag ? 1 : 0,
      joinedDate: 'আজকে',
      diagnostic: savedDiag
    };
    saveUser(googleUser);
    setPreviewAsStudent(false);
  };

  const loginWithCredentials = (email: string, password: string): { success: boolean; message?: string } => {
    // 1. Super Admin
    if (email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()) {
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
    if (email.trim().toLowerCase() === MODERATOR_CREDENTIALS.email.toLowerCase()) {
      if (password === MODERATOR_CREDENTIALS.password) {
        const modUser: UserProfile = {
          id: 'mod_farhana',
          name: 'ড. ফারহানা (IELTS মডারেটর)',
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

    // 3. Student Demo
    if (email.trim().toLowerCase() === STUDENT_CREDENTIALS.email.toLowerCase()) {
      if (password === STUDENT_CREDENTIALS.password) {
        let savedDiag: DiagnosticResult | undefined;
        try {
          const stored = localStorage.getItem('prep_ielts_diagnostic_usr_demo');
          if (stored) savedDiag = JSON.parse(stored);
        } catch (e) {}

        const studentUser: UserProfile = {
          id: 'usr_demo',
          name: 'রেজওয়ান শিক্ষার্থী',
          email: STUDENT_CREDENTIALS.email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'student',
          plan: 'Pro',
          targetBand: savedDiag ? savedDiag.targetBand : 7.5,
          currentBand: savedDiag ? savedDiag.assessedBand : 0,
          studyReminderTime: '20:30',
          emailReminderEnabled: true,
          streakDays: savedDiag ? 1 : 0,
          testsCompleted: savedDiag ? 1 : 0,
          joinedDate: 'আজকে',
          diagnostic: savedDiag
        };
        saveUser(studentUser);
        setPreviewAsStudent(false);
        return { success: true };
      } else {
        return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
      }
    }

    // 4. Fallback student signup
    if (email.includes('@') && password.length >= 6) {
      const studentId = 'usr_' + Date.now().toString().slice(-4);
      let savedDiag: DiagnosticResult | undefined;
      try {
        const stored = localStorage.getItem('prep_ielts_diagnostic_' + email.trim().toLowerCase());
        if (stored) savedDiag = JSON.parse(stored);
      } catch (e) {}

      const newUser: UserProfile = {
        id: studentId,
        name: email.split('@')[0],
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'student',
        plan: 'Free',
        targetBand: savedDiag ? savedDiag.targetBand : 7.0,
        currentBand: savedDiag ? savedDiag.assessedBand : 0,
        studyReminderTime: '21:00',
        emailReminderEnabled: true,
        streakDays: savedDiag ? 1 : 0,
        testsCompleted: savedDiag ? 1 : 0,
        joinedDate: 'আজকে',
        diagnostic: savedDiag
      };
      saveUser(newUser);
      setPreviewAsStudent(false);
      return { success: true };
    }

    return { success: false, message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' };
  };

  const logout = () => {
    saveUser(null);
    setPreviewAsStudent(false);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
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
    try {
      if (user.id) localStorage.setItem('prep_ielts_diagnostic_' + user.id, JSON.stringify(result));
      if (user.email) localStorage.setItem('prep_ielts_diagnostic_' + user.email.toLowerCase(), JSON.stringify(result));
    } catch (e) {}
    saveUser(updated);
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
      loginWithGoogle, 
      loginWithCredentials, 
      logout, 
      updateUser, 
      saveDiagnostic,
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
