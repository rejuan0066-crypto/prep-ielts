'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Bell, 
  Clock, 
  Mail, 
  CheckCircle2, 
  X, 
  Send, 
  Flame, 
  Sparkles,
  Smartphone
} from 'lucide-react';

interface StudyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyReminderModal: React.FC<StudyReminderModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  
  const [reminderTime, setReminderTime] = useState(user?.studyReminderTime || '20:30');
  const [enabled, setEnabled] = useState(user?.emailReminderEnabled ?? true);
  const [testSent, setTestSent] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    updateUser({
      studyReminderTime: reminderTime,
      emailReminderEnabled: enabled,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleSendTestEmail = () => {
    setTestSent(true);
    setTimeout(() => {
      setTestSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                স্টাডি টাইম ও ইমেইল নোটিফিকেশন
              </h3>
              <p className="text-xs text-slate-500">
                প্রতিদিন নির্ধারিত সময়ে স্বয়ংক্রিয় রিমাইন্ডার পাবেন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Email Info */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>নোটিফিকেশন পাঠানো হবে:</span>
          </div>
          <span className="font-bold text-slate-900">{user.email}</span>
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            দৈনিক পড়ার সময় নির্ধারণ করুন:
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-3 rounded-2xl">
              {parseInt(reminderTime.split(':')[0]) >= 12 ? 'রাত / বিকাল' : 'সকাল'}
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
          <div>
            <div className="text-sm font-bold text-slate-800">
              দৈনিক ইমেইল রিমাইন্ডার ও টাস্ক লিস্ট
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              নির্দিষ্ট সময়ে আপনার আজকের টু-ডু মিশন ও স্ট্রিক স্ট্যাটাস সহ ইমেইল যাবে।
            </p>
          </div>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        {/* Live Email Preview Box */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ইমেইল প্রিভিউ: [PrepIELTS.ai Reminder]</span>
            </div>
            <button
              onClick={handleSendTestEmail}
              disabled={testSent}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <Send className="w-3 h-3" />
              <span>{testSent ? 'ইমেইল পাঠানো হয়েছে! ✅' : 'টেস্ট ইমেইল পাঠান'}</span>
            </button>
          </div>

          <div className="space-y-1 text-slate-300 pt-1 text-[11px] leading-relaxed">
            <p className="font-semibold text-white">প্রিয় {user.name},</p>
            <p>আপনার আজকের আইএলটিএস পড়ার সময় হয়েছে (ঘড়িতে বাজে {reminderTime})! ⏰</p>
            <p className="text-amber-300 font-medium">🔥 আপনার বর্তমান স্ট্রিক: {user.streakDays} দিন! আজ না পড়লে স্ট্রিক ভেঙে যাবে।</p>
            <p className="text-slate-400">আজকের মিশন: ৫টি নতুন শব্দ + True/False রিডিং টেকনিক ক্লাস।</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
          >
            বাতিল
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedSuccess ? 'সংরক্ষিত হয়েছে!' : 'সেটিংস সংরক্ষণ করুন'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
