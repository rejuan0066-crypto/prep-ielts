'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CAMBRIDGE_BOOKS_REGISTRY, CambridgeBookCollection } from '@/lib/cambridgeBooksRegistry';
import { 
  Headphones,
  BookOpen, 
  PenTool, 
  Mic, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CambridgeMasterLibraryPage() {
  const [selectedModule, setSelectedModule] = useState<'listening' | 'reading' | 'writing' | 'speaking'>('listening');
  const [selectedTrack, setSelectedTrack] = useState<'Academic' | 'General Training'>('Academic');
  const [selectedBookNum, setSelectedBookNum] = useState<number>(18);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Cambridge Book
  const activeBook = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === selectedBookNum) || CAMBRIDGE_BOOKS_REGISTRY[0];

  // Filtered books
  const filteredBooks = CAMBRIDGE_BOOKS_REGISTRY.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.bookNumber.toString().includes(searchQuery)
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 select-none">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-rose-50 text-[#E11D48] border border-rose-200 rounded-full text-xs font-black tracking-wide uppercase">
              Official Cambridge Series (Books 1 to 19)
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-black tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Full 4 Modules: Listening, Reading, Writing, Speaking
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            ক্যামব্রিজ অফিসিয়াল প্র্যাকটিস লাইব্রেরি (Books 1–19)
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            ক্যামব্রিজ ১ থেকে ১৯ নম্বর বই পর্যন্ত সকল লিসেনিং, রিডিং (একাডেমিক ও জেনারেল), রাইটিং এবং স্পিকিং টেস্ট সরাসরি ওপেন করুন।
          </p>
        </div>

        {/* Module Switcher Tabs: Strictly the 4 Core IELTS Modules */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex-wrap sm:flex-nowrap">
          
          {/* 1. Listening */}
          <button
            onClick={() => setSelectedModule('listening')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              selectedModule === 'listening'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>লিসেনিং (Listening)</span>
          </button>

          {/* 2. Reading */}
          <button
            onClick={() => setSelectedModule('reading')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              selectedModule === 'reading'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>রিডিং (Reading)</span>
          </button>

          {/* 3. Writing */}
          <button
            onClick={() => setSelectedModule('writing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              selectedModule === 'writing'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>রাইটিং (Writing)</span>
          </button>

          {/* 4. Speaking */}
          <button
            onClick={() => setSelectedModule('speaking')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              selectedModule === 'speaking'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>স্পিকিং (Speaking)</span>
          </button>

        </div>
      </div>

      {/* 2. Track Switcher (Academic vs General Training) & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Track selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedTrack('Academic')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
              selectedTrack === 'Academic'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Track (উচ্চশিক্ষা)</span>
          </button>

          <button
            onClick={() => setSelectedTrack('General Training')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
              selectedTrack === 'General Training'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>General Training (ইমিগ্রেশন ও জব)</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="বই খুঁজুন (যেমন: Cambridge 18)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all"
          />
        </div>
      </div>

      {/* 3. Horizontal Book Selector Cards (Cambridge 19 down to Cambridge 1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>ক্যামব্রিজ বই নির্বাচন করুন (BOOKS 1 TO 19): <strong className="text-slate-900 font-black">বর্তমানে নির্বাচিত: {activeBook.title.toUpperCase()}</strong></span>
          <span>মোট ১৯টি অফিশিয়াল ভলিউম</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {filteredBooks.map((book) => {
            const isSelected = activeBook.bookNumber === book.bookNumber;
            return (
              <button
                key={book.bookNumber}
                onClick={() => setSelectedBookNum(book.bookNumber)}
                className={`shrink-0 px-4 py-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isSelected ? 'bg-[#E11D48] text-white' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {book.bookNumber}
                  </span>
                  <span className="text-xs font-black whitespace-nowrap">
                    Book {book.bookNumber}
                  </span>
                </div>
                <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                  {book.year} Ed.
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Selected Book Header & 4 Tests Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Header info of the selected book */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E11D48] to-rose-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {activeBook.bookNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeBook.title} ({selectedTrack})
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  4 Full Tests Available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                অফিসিয়াল টেস্ট ১, ২, ৩ এবং ৪। ক্লিক করে সরাসরি টেস্ট শুরু করুন।
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              মডিউল মোড
            </span>
            <span className="text-sm font-black text-[#E11D48] uppercase">
              {selectedModule} • {selectedModule === 'listening' ? 'Official Audio Rig' : selectedTrack}
            </span>
          </div>
        </div>

        {/* MODULE 1: LISTENING VIEW (4 Full 40-Question Audio Tests) */}
        {selectedModule === 'listening' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBook.listeningTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-50 hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between group hover:border-[#E11D48] hover:shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>Listening Test {test.testNumber}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>30 Mins (+10m transfer)</span>
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 group-hover:text-[#E11D48] transition-colors">
                      {test.title}
                    </h4>

                    {/* 4 Sections Breakdown */}
                    <div className="space-y-1.5 pt-1 text-xs">
                      {test.sections.map((sec) => (
                        <div key={sec.sectionNumber} className="flex items-center justify-between text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-800 truncate mr-2">
                            {sec.sectionTitle}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {sec.questionRange}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      ৪০টি প্রশ্ন • অডিও সিমুলেশন
                    </span>

                    <Link
                      href={`/practice/listening?book=${activeBook.bookNumber}&test=${test.testNumber}`}
                      className="px-4 py-2 bg-slate-900 group-hover:bg-[#E11D48] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <span>ওপেন করুন (Start Listening)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 2: READING VIEW (4 Full 40-Question Tests) */}
        {selectedModule === 'reading' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(selectedTrack === 'Academic' ? activeBook.academicReadingTests : activeBook.generalReadingTests).map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-50 hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between group hover:border-[#E11D48] hover:shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>Reading Test {test.testNumber}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>60 Minutes</span>
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 group-hover:text-[#E11D48] transition-colors">
                      {test.title}
                    </h4>

                    {/* 3 Passages Details */}
                    <div className="space-y-1.5 pt-1 text-xs">
                      {test.passages.map((p) => (
                        <div key={p.passageNumber} className="flex items-center justify-between text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-800 truncate mr-2">
                            P{p.passageNumber}: {p.passageTitle}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {p.questionRange}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      ৪০টি পূর্ণাঙ্গ প্রশ্ন (১–৪০)
                    </span>

                    <Link
                      href={`/practice/reading?book=${activeBook.bookNumber}&test=${test.testNumber}&track=${selectedTrack.toLowerCase()}`}
                      className="px-4 py-2 bg-slate-900 group-hover:bg-[#E11D48] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <span>ওপেন করুন (Start Test)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 3: WRITING VIEW (4 Tests • Task 1 & 2) */}
        {selectedModule === 'writing' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBook.writingPrompts
                .filter(w => w.type === selectedTrack)
                .map((wTest) => (
                  <div
                    key={wTest.testNumber}
                    className="bg-slate-50 hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between group hover:border-[#E11D48] hover:shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5">
                          <PenTool className="w-3.5 h-3.5 text-[#E11D48]" />
                          <span>Writing Test {wTest.testNumber}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>60 Minutes</span>
                        </span>
                      </div>

                      {/* Task 1 preview */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {wTest.task1.title}
                          </span>
                          {'chartType' in wTest.task1 && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">
                              {wTest.task1.chartType}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {wTest.task1.prompt}
                        </p>
                      </div>

                      {/* Task 2 preview */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {wTest.task2.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-[#E11D48] font-bold">
                            {wTest.task2.essayType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {wTest.task2.prompt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">
                        Task 1 (150w) & Task 2 (250w)
                      </span>

                      <Link
                        href={`/practice/writing?book=${activeBook.bookNumber}&test=${wTest.testNumber}&track=${selectedTrack.toLowerCase()}`}
                        className="px-4 py-2 bg-slate-900 group-hover:bg-[#E11D48] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <span>লিখা শুরু করুন (Start Writing)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* MODULE 4: SPEAKING VIEW (4 Tests • Part 1, 2, 3) */}
        {selectedModule === 'speaking' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBook.speakingTests.map((spk) => (
                <div
                  key={spk.testNumber}
                  className="bg-slate-50 hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between group hover:border-[#E11D48] hover:shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>Speaking Mock {spk.testNumber}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>11–14 Minutes</span>
                      </span>
                    </div>

                    {/* Part 1 Topic */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                      <div className="text-xs font-bold text-slate-800">
                        Part 1: Interview & Introduction
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {spk.part1.topic}
                      </p>
                    </div>

                    {/* Part 2 Cue card */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                      <div className="text-xs font-bold text-slate-800">
                        Part 2: Long Turn (Cue Card)
                      </div>
                      <p className="text-xs text-slate-600 font-medium line-clamp-2">
                        {spk.part2.cueCard}
                      </p>
                    </div>

                    {/* Part 3 Discussion */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                      <div className="text-xs font-bold text-slate-800">
                        Part 3: Two-way Analytical Discussion
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {spk.part3.topic}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      লাইভ AI ভয়েস এক্সামিনার
                    </span>

                    <Link
                      href={`/practice/speaking?book=${activeBook.bookNumber}&test=${spk.testNumber}`}
                      className="px-4 py-2 bg-slate-900 group-hover:bg-[#E11D48] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <span>ইন্টারভিউ শুরু করুন (Speak)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
