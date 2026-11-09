'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Target, 
  Trophy, 
  Flame, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  ArrowRight, 
  Sparkles,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function OverviewPage() {
  const modules = [
    { title: 'Reading Academic', band: '6.5', progress: '75%', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: BookOpen, url: '/practice/reading', tests: '8 Tests Done' },
    { title: 'Listening Lab', band: '7.0', progress: '80%', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: Headphones, url: '/practice/reading', tests: '12 Tests Done' },
    { title: 'AI Writing Evaluator', band: '6.0', progress: '60%', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: PenTool, url: '/practice/writing', tests: '5 Essays Checked' },
    { title: 'AI Speaking Partner', band: '6.5', progress: '70%', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: Mic, url: '/practice/speaking', tests: '9 Mock Sessions' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5 fill-amber-300" />
              <span>PrepIELTS Pro Member</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              IELTS Preparation Command Hub 🚀
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              আপনার টার্গেট ব্যান্ড ৮.০ অর্জনের জন্য চার মডিউলের লাইভ প্রোগ্রেস ট্র্যাকিং ও সুপারিশকৃত অনুশীলন।
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">বর্তমান ব্যান্ড</div>
              <div className="text-2xl font-black text-amber-300">Band 5.5</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">টার্গেট ব্যান্ড</div>
              <div className="text-2xl font-black text-emerald-400">Band 8.0</div>
            </div>
          </div>
        </div>

        {/* 4 Modules Status Grid */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            চারটি মডিউলের পারফরম্যান্স সামারি:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${m.bg} ${m.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800">
                        {m.band}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{m.tests}</p>
                    </div>
                  </div>

                  <Link
                    href={m.url}
                    className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#E11D48] hover:text-rose-700 transition-colors"
                  >
                    <span>অনুশীলন করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Launch Shortcuts */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
            <span>আজকের প্রস্তাবিত এআই ড্রিলস</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Link
              href="/dashboard"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 block">ক্যালেন্ডার স্টাডি প্ল্যান</span>
                <span className="text-[11px] text-slate-400">আজকের Day 30 টাস্ক দেখুন</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/practice/speaking"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 block">AI Speaking Partner</span>
                <span className="text-[11px] text-slate-400">Part 2 কিউ-কার্ড সিমুলেশন</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/typing-test"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 block">টাইপিং স্পিড টেস্ট</span>
                <span className="text-[11px] text-slate-400">WPM স্পিড পরিমাপ করুন</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

          </div>
        </div>

    </div>
  );
}
