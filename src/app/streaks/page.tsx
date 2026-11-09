'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Award, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function IeltslyStreaksPage() {
  const currentStreak = 14;
  const longestStreak = 28;

  const streakMilestones = [
    { days: 7, title: '7-Day Warrior', xp: '+250 XP', unlocked: true },
    { days: 14, title: 'Fortnight Champion', xp: '+500 XP', unlocked: true },
    { days: 30, title: 'Monthly Legend', xp: '+1,200 XP', unlocked: false },
    { days: 60, title: 'IELTS Band 8 Master', xp: '+3,000 XP', unlocked: false },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Study Streaks
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
              🔥 ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consistent daily practice is the fastest proven pathway to an IELTS Band 8.0+
          </p>
        </div>

        <Link
          href="/dashboard"
          className="px-4 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#BE123C] transition-colors"
        >
          Do Today's Task (Day 30)
        </Link>
      </div>

      {/* Hero Streak Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner">
              🔥
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-amber-100">Current Day Streak</div>
              <div className="text-5xl font-black tracking-tight">{currentStreak} Days</div>
              <div className="text-xs text-amber-100 mt-1">Longest recorded streak: {longestStreak} days</div>
            </div>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs space-y-1">
            <div className="font-bold">Streak Freeze Active</div>
            <div className="text-amber-100 text-[11px]">You have 1 active streak shield in reserve.</div>
          </div>
        </div>

        {/* 7 Days of Current Week */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
            const isDone = idx < 5;
            const isToday = idx === 5;
            return (
              <div
                key={day}
                className={`p-3 rounded-2xl text-center backdrop-blur-md border ${
                  isDone
                    ? 'bg-white/25 border-white/30 text-white font-black'
                    : isToday
                    ? 'bg-white text-slate-900 border-white font-black ring-2 ring-white/50'
                    : 'bg-white/10 border-white/10 text-amber-100'
                }`}
              >
                <div className="text-[10px] uppercase font-bold">{day}</div>
                <div className="text-sm mt-1">{isDone ? '✓' : isToday ? '🔥' : '·'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Milestones */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#E11D48]" />
          <span>Streak Milestones & XP Rewards</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {streakMilestones.map((m) => (
            <div
              key={m.days}
              className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                m.unlocked
                  ? 'bg-rose-50/40 border-rose-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{m.unlocked ? '🏆' : '🔒'}</span>
                <div>
                  <div className="font-bold">{m.title} ({m.days} Days)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.unlocked ? 'Claimed' : 'Keep practicing daily to unlock'}</div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                m.unlocked ? 'bg-[#E11D48] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {m.xp}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
