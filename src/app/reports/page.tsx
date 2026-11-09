'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Target, 
  Award, 
  ChevronRight,
  BookOpen,
  Mic,
  PenTool,
  Headphones
} from 'lucide-react';

export default function IeltslyReportsPage() {
  const moduleScores = [
    { module: 'Listening', current: 8.0, target: 8.5, icon: Headphones, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { module: 'Reading', current: 7.5, target: 8.5, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { module: 'Writing', current: 6.5, target: 7.5, icon: PenTool, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { module: 'Speaking', current: 7.5, target: 8.0, icon: Mic, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  ];

  const recentMockTests = [
    { title: 'Cambridge IELTS 18 - Academic Reading Test 1', date: 'Yesterday', score: '33/40', band: 7.5, type: 'Reading' },
    { title: 'Task 2 Essay: Artificial Intelligence in Education', date: '3 days ago', score: 'Examiner Graded', band: 6.5, type: 'Writing' },
    { title: 'Part 2 Cue Card: Describe an Eco-Friendly Journey', date: '4 days ago', score: 'AI Evaluated', band: 7.5, type: 'Speaking' },
    { title: 'Cambridge IELTS 17 - Listening Section 1-4', date: 'Last week', score: '36/40', band: 8.0, type: 'Listening' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Performance Reports
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold font-mono">
              PROJECTED BAND 7.5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Detailed analytics across all 4 IELTS skill components and Cambridge mock test attempts
          </p>
        </div>

        <Link
          href="/dashboard"
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-300 shadow-xs"
        >
          View Study Plan Calendar
        </Link>
      </div>

      {/* 4 Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {moduleScores.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.module} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Target {m.target}
                </span>
              </div>

              <div>
                <div className="text-xs font-medium text-slate-500">{m.module} Band</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {m.current}
                </div>
              </div>

              {/* Progress mini bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E11D48] rounded-full" 
                  style={{ width: `${(m.current / 9.0) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Mock History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Recent Cambridge Mocks & AI Evaluations
        </h2>

        <div className="divide-y divide-slate-100">
          {recentMockTests.map((t, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">{t.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.date} • {t.type}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-rose-50 text-[#E11D48] rounded-lg text-xs font-black border border-rose-100">
                  Band {t.band}
                </span>
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                  {t.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
