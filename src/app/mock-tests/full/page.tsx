'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Clock, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  Layers,
  HelpCircle,
  Target,
  CheckCircle,
  Library
} from 'lucide-react';
import { OFFICIAL_MOCK_TEST_SETS, generateDynamicMockTest, FullMockTestBundle } from '@/lib/dynamicMockExamRegistry';

export default function FullMockExamHubPage() {
  const [selectedSetId, setSelectedSetId] = useState<number>(1);
  const [dynamicSeed, setDynamicSeed] = useState<number>(101);
  const [dynamicMock, setDynamicMock] = useState<FullMockTestBundle | null>(null);

  // Active mock bundle
  const activeBundle: FullMockTestBundle = selectedSetId === 0 && dynamicMock
    ? dynamicMock
    : (OFFICIAL_MOCK_TEST_SETS.find(s => s.setId === selectedSetId) || OFFICIAL_MOCK_TEST_SETS[0]);

  const handleGenerateFreshMock = () => {
    const newSeed = Math.floor(Math.random() * 90000) + 1000;
    setDynamicSeed(newSeed);
    const fresh = generateDynamicMockTest(newSeed);
    setDynamicMock(fresh);
    setSelectedSetId(0);
  };

  const examModules = [
    {
      id: 'listening',
      name: 'Listening Module',
      title: activeBundle.listeningExam.title,
      duration: '30 Minutes (+2 mins review)',
      questions: '4 Sections • 40 Questions',
      icon: Headphones,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      status: 'Ready',
      route: `/practice/listening?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}${activeBundle.setId === 0 ? `&seed=${dynamicSeed}` : ''}`,
      description: 'অফিসিয়াল কেমব্রিজ অডিও, পার্ট ১ ও পার্ট ৪-এ টাইপিং গ্যাপ ফিলিং (কোনো অপশন ছাড়া), পার্ট ২ ও ৩-এ মাল্টিপল চয়েস।',
      cambridgeRule: 'ক্যামব্রিজের সর্বশেষ নিয়মানুযায়ী কিবোর্ড টাইপিং ও স্পেলিং এক্যুরেসি মার্কিং'
    },
    {
      id: 'reading',
      name: 'Academic Reading Module',
      title: activeBundle.readingExam.title,
      duration: '60 Minutes (Strict Exam Timer)',
      questions: '3 Long Passages • 40 Questions',
      icon: BookOpen,
      color: 'bg-rose-50 text-[#E11D48] border-rose-200',
      status: 'Ready',
      route: `/practice/reading?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}${activeBundle.setId === 0 ? `&seed=${dynamicSeed}` : ''}`,
      description: 'প্যাসেজ ১ (১-১৩), প্যাসেজ ২ (১৪-২৬), প্যাসেজ ৩ (২৭-৪০) সহ True/False/Not Given, সামারি টাইপিং ও মাল্টিপল চয়েস।',
      cambridgeRule: 'ক্লিক বা ডাবল-ক্লিকে বাংলা অর্থ ও ব্যাকরণ বিশ্লেষণ সুবিধা অন্তর্ভুক্ত'
    },
    {
      id: 'writing',
      name: 'Academic Writing Module',
      title: 'Writing Task 1 & Task 2 Official Rig',
      duration: '60 Minutes (Task 1: 20m + Task 2: 40m)',
      questions: 'Task 1 (150w) & Task 2 (250w)',
      icon: PenTool,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      status: 'Ready',
      route: `/practice/writing?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}`,
      description: `${activeBundle.writingExam.task1.chartType} এবং ${activeBundle.writingExam.task2.essayType}।`,
      cambridgeRule: 'AI Band 9.0 Examiner কর্তৃক TR, CC, LR ও GRA ৪টি ক্রাইটেরিয়া ভিত্তিক মূল্যায়ন'
    },
    {
      id: 'speaking',
      name: 'Interactive Speaking Interview',
      title: '1-on-1 AI Face-to-Face Speaking Mock',
      duration: '11–14 Minutes',
      questions: 'Part 1, Part 2 Cue Card & Part 3',
      icon: Mic,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      status: 'Ready',
      route: `/practice/speaking?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}`,
      description: `টপিক: ${activeBundle.speakingExam.part1Topic}। কিউ কার্ড ও ফলো-আপ বিশ্লেষণ।`,
      cambridgeRule: 'লাইভ ভয়েস রিকগনিশন ও ফ্লুয়েন্সি, উচ্চারণ এবং গ্রামার ফিডব্যাক'
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 select-none">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              IELTS Dynamic Full Mock Exam Hub
            </span>
            <span className="px-3 py-1 bg-rose-50 text-[#E11D48] border border-rose-200 rounded-full text-xs font-black">
              Latest Cambridge 18 & 19 Standards
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-mono font-bold">
              {activeBundle.difficulty}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            অফিসিয়াল আইএলটিএস ফুল মক টেস্ট হাব
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            কেমব্রিজের সর্বশেষ নিয়মানুযায়ী নিজেকে পূর্ণাঙ্গ যাচাই করুন। প্রতিটি মক টেস্টে পরিবর্তনশীল প্রশ্ন, প্যাসেজ ও আসল অডিও থাকবে — কোনো একটি ফরম্যাট বা প্রশ্ন ফিক্সড থাকবে না।
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/library"
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-[#E11D48] border border-rose-200 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            title="ক্যামব্রিজ বই ১ থেকে ১৯ এর সব টেস্ট দেখুন"
          >
            <Library className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>ক্যামব্রিজ ১-১৯ লাইব্রেরি (সকল টেস্ট)</span>
          </Link>

          <button
            onClick={handleGenerateFreshMock}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 transform hover:scale-105 cursor-pointer"
            title="নতুন আনকমন প্রশ্ন ও প্যাসেজ তৈরি করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>নতুন ডায়নামিক টেস্ট তৈরি করুন</span>
          </button>
        </div>
      </div>

      {/* Notice & Quick Switch between Full Mock Sets and Cambridge 1-19 */}
      <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span>ক্যামব্রিজ ১ থেকে ১৯ নম্বর বইয়ের সকল টেস্ট ও মডিউল খুঁজছেন?</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-200/60 text-[#E11D48] text-[10px] font-black uppercase">
                Books 1 - 19
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              এখানে রয়েছে অফিসিয়াল ফুল মক টেস্ট সেট। আপনি যদি ক্যামব্রিজ বই ১৬, ১৭, ১৮ বা ১৯ এর নির্দিষ্ট কোনো টেস্ট (Test 1, 2, 3, 4) বা আলাদা মডিউল (লিসেনিং, রিডিং, রাইটিং, স্পিকিং) প্র্যাকটিস করতে চান, তবে সরাসরি আমাদের <strong>ক্যামব্রিজ বুকস লাইব্রেরি</strong>-তে প্রবেশ করুন।
            </p>
          </div>
        </div>
        <Link
          href="/library"
          className="px-4 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 transition-all self-end md:self-center"
        >
          <span>ক্যামব্রিজ লাইব্রেরিতে যান</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mock Test Sets Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#E11D48]" />
            <span>উপলব্ধ মক টেস্ট সেটসমূহ (Select Mock Exam Set):</span>
          </span>
          <span className="text-slate-400">প্রতিটি টেস্টে ৪০টি করে প্রশ্ন ও সম্পূর্ণ ভিন্ন ভিন্ন টপিক</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {OFFICIAL_MOCK_TEST_SETS.map((mSet) => (
            <button
              key={mSet.setId}
              onClick={() => setSelectedSetId(mSet.setId)}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                selectedSetId === mSet.setId
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-rose-500/30'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  selectedSetId === mSet.setId ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  Set {mSet.setId}
                </span>
                <span className="text-[10px] opacity-75 font-mono">40 Qs</span>
              </div>
              <div className="font-bold text-xs line-clamp-1">{mSet.title.split('(')[0]}</div>
              <div className={`text-[11px] mt-1 line-clamp-1 ${selectedSetId === mSet.setId ? 'text-slate-400' : 'text-slate-400'}`}>
                {mSet.difficulty}
              </div>
            </button>
          ))}

          {/* Dynamic Randomized Test Card */}
          <button
            onClick={handleGenerateFreshMock}
            className={`p-4 rounded-2xl border text-left transition-all relative border-dashed ${
              selectedSetId === 0
                ? 'bg-amber-950 text-white border-amber-600 shadow-lg ring-2 ring-amber-400/40'
                : 'bg-amber-50/50 text-slate-900 border-amber-300/80 hover:bg-amber-50 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/30 text-amber-800">
                Randomized
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            </div>
            <div className="font-bold text-xs">🎲 পরিবর্তনশীল ডায়নামিক টেস্ট</div>
            <div className="text-[11px] text-amber-700/80 mt-1">
              {dynamicMock ? `Generated #${dynamicMock.setId}` : 'ক্লিক করলেই নতুন টেস্ট'}
            </div>
          </button>
        </div>
      </div>

      {/* Active Exam Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
            <span>Currently Active: {activeBundle.edition}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {activeBundle.title}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {activeBundle.subtitle}। এতে আসল পরীক্ষার মতো কঠোর টাইমিং, অফিসিয়াল স্পেলিং ও কিবোর্ড টাইপিং মার্কিং সিস্টেম সক্রিয় রয়েছে।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/practice/listening?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}${activeBundle.setId === 0 ? `&seed=${dynamicSeed}` : ''}`}
              className="px-5 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black rounded-xl shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Headphones className="w-4 h-4" />
              <span>লিসেনিং মক শুরু করুন (৪০ প্রশ্ন • ৩০ মিনিট)</span>
            </Link>

            <Link
              href={`/practice/reading?mode=mock&setId=${activeBundle.setId === 0 ? 0 : activeBundle.setId}${activeBundle.setId === 0 ? `&seed=${dynamicSeed}` : ''}`}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-rose-300" />
              <span>রিডিং মক শুরু করুন (৩ প্যাসেজ • ৬০ মিনিট)</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-700/60 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Recommended Audience</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{activeBundle.recommendedFor}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Full Listening Rig</div>
            <div className="text-sm font-black text-rose-400 mt-0.5">Typing Only (Part 1 & 4)</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Official Scoring</div>
            <div className="text-sm font-black text-emerald-400 mt-0.5">Exact 9.0 Band Scale</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Exam Environment</div>
            <div className="text-sm font-black text-amber-400 mt-0.5">British Council CD-IELTS</div>
          </div>
        </div>
      </div>

      {/* 4 Test Modules Section Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#E11D48]" />
            <span>মক পরীক্ষার ৪টি মডিউল (Individual Test Launchers)</span>
          </h3>
          <span className="text-xs text-slate-500 font-bold">সিলেক্টেড সেট: {activeBundle.title.split('(')[0]}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {examModules.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${sec.color} shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {sec.name}
                        </span>
                        <h4 className="text-base font-black text-slate-900 group-hover:text-[#E11D48] transition-colors">
                          {sec.title}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black border border-emerald-200/80">
                      {sec.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sec.duration}</span>
                      </span>
                      <span className="font-bold text-slate-700">{sec.questions}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium truncate pt-1 border-t border-slate-200/50">
                      {sec.cambridgeRule}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    Official CD-IELTS
                  </span>

                  <Link
                    href={sec.route}
                    className="px-4 py-2 bg-slate-900 group-hover:bg-[#E11D48] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>মক পরীক্ষা দিন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Self-Assessment Band Score Reference Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h4 className="font-black text-slate-900 text-sm">
              অফিসিয়াল আইএলটিএস স্কোরিং স্কেল ও ব্যান্ড গাইড (Band Score Reference)
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">৪০টি প্রশ্নের সঠিক উত্তর ও ব্যান্ড স্কোর</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { score: '39–40', band: '9.0', desc: 'Expert' },
            { score: '37–38', band: '8.5', desc: 'Very Good' },
            { score: '35–36', band: '8.0', desc: 'Very Good' },
            { score: '32–34', band: '7.5', desc: 'Good' },
            { score: '30–31', band: '7.0', desc: 'Good' },
            { score: '26–29', band: '6.5', desc: 'Competent' },
            { score: '23–25', band: '6.0', desc: 'Competent' },
            { score: '18–22', band: '5.5', desc: 'Modest' }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] font-mono text-slate-500">{item.score} Correct</div>
              <div className="text-base font-black text-slate-900 mt-0.5">Band {item.band}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
