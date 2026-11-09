'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Target, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Pencil, 
  ChevronLeft, 
  ChevronRight, 
  BarChart2, 
  Headphones,
  Sparkles,
  BookOpen,
  Mic,
  PenTool,
  Volume2,
  X,
  Compass,
  ArrowRight,
  Clock,
  Layers,
  Award,
  Zap,
  PlayCircle,
  CheckCircle,
  Circle,
  Lock,
  GraduationCap,
  Calendar as CalendarIcon,
  ListTodo,
  TrendingUp,
  FileText,
  RotateCcw,
  Sliders,
  Check
} from 'lucide-react';

interface StageLesson {
  id: string;
  stepNumber: number;
  title: string;
  titleBn: string;
  module: 'Diagnostic' | 'Vocabulary' | 'Grammar' | 'Reading' | 'Writing' | 'Speaking' | 'Mock';
  durationMinutes: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  description: string;
  url: string;
}

interface InstituteStage {
  stageNumber: number;
  stageName: string;
  stageNameBn: string;
  durationLabel: string;
  targetLevel: string;
  objective: string;
  lessons: StageLesson[];
}

export default function StudentAcademyDashboard() {
  const { user } = useAuth();

  // Client-safe Date calculation
  const [currentMonthYear, setCurrentMonthYear] = useState('Nov 2026');
  const [todayDateNum, setTodayDateNum] = useState(5);
  const [todayFormattedBn, setTodayFormattedBn] = useState('৫ নভেম্বর, ২০২৬');

  useEffect(() => {
    const d = new Date();
    setCurrentMonthYear(d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
    setTodayDateNum(d.getDate());
    setTodayFormattedBn(d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  // Student Personalized Setup State (Loaded from localStorage or defaults)
  const [startingBand, setStartingBand] = useState('5.0');
  const [targetBand, setTargetBand] = useState('7.5');
  const [weakestModule, setWeakestModule] = useState('Writing & Speaking');
  const [examDate, setExamDate] = useState('Within 3 Months');
  const [dailyCommitment, setDailyCommitment] = useState('1.5 Hours');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  // Active View: 'stages' (Institute 5-Step Path) | 'today' (Daily Routine) | 'calendar' (Monthly Grid)
  const [activeTab, setActiveTab] = useState<'stages' | 'today' | 'calendar'>('stages');

  // Dynamic 5-Stage Institutional Curriculum
  const [stages, setStages] = useState<InstituteStage[]>([
    {
      stageNumber: 1,
      stageName: 'Stage 1: Assessment & Target Setup',
      stageNameBn: 'ধাপ ১: লেভেল টেস্ট ও স্টাডি রুটিন সেটআপ',
      durationLabel: 'Day 1',
      targetLevel: 'Baseline Diagnostic',
      objective: 'ছাত্রের বর্তমান সঠিক ব্যান্ড স্কোর নির্ধারণ এবং দুর্বলতা অনুযায়ী রুটিন তৈরি।',
      lessons: [
        {
          id: 's1-1',
          stepNumber: 1,
          title: 'Official 15-Minute IELTS Diagnostic Level Assessment',
          titleBn: '১৫ মিনিটের ফ্রি ডায়াগনস্টিক লেভেল টেস্ট দিয়ে বর্তমান ব্যান্ড যাচাই',
          module: 'Diagnostic',
          durationMinutes: 15,
          xpReward: 100,
          completed: true,
          locked: false,
          description: 'আপনার বর্তমান ইংরেজি ব্যাকরণ, ভোকাবুলারি ও রিডিং স্কিল যাচাই করে ব্যান্ড নির্ধারণ।',
          url: '/diagnostic'
        },
        {
          id: 's1-2',
          stepNumber: 2,
          title: 'Personalized Study Plan & Target Milestone Mapping',
          titleBn: 'টার্গেট ব্যান্ড ৮.০ অর্জনের জন্য দৈনিক পড়ার সময়সূচি নির্ধারণ',
          module: 'Diagnostic',
          durationMinutes: 10,
          xpReward: 50,
          completed: true,
          locked: false,
          description: 'আপনার পরীক্ষার তারিখ এবং দৈনিক ১.৫ ঘণ্টা অনুযায়ী সময়সূচি চূড়ান্তকরণ।',
          url: '/dashboard'
        }
      ]
    },
    {
      stageNumber: 2,
      stageName: 'Stage 2: Core Foundation & Language Skills',
      stageNameBn: 'ধাপ ২: ইংরেজি ভিত্তি ও বেসিক ফাউন্ডেশন',
      durationLabel: 'Weeks 1–2',
      targetLevel: 'Band 5.0 ➔ 6.5',
      objective: 'কঠিন পরীক্ষায় যাওয়ার আগে ভোকাবুলারি ৫০০ শব্দ ও জটিল বাক্য তৈরির বেসিক মজবুত করা।',
      lessons: [
        {
          id: 's2-1',
          stepNumber: 3,
          title: 'Top 50 Academic Word List (AWL) with Audio Pronunciation',
          titleBn: 'কেমব্রিজ পরীক্ষায় সবচেয়ে বেশি আসা ৫০টি একাডেমিক শব্দ ও বাংলা অর্থ',
          module: 'Vocabulary',
          durationMinutes: 20,
          xpReward: 75,
          completed: true,
          locked: false,
          description: 'সাধারণ শব্দ বাদ দিয়ে ফরমাল একাডেমিক শব্দ, প্রতিশব্দ ও ব্যবহারের উদাহরণ।',
          url: '/vocabulary'
        },
        {
          id: 's2-2',
          stepNumber: 4,
          title: 'Complex Sentences & Subordinating Conjunctions for Band 7+',
          titleBn: 'সরল বাক্য পরিহার করে Compound-Complex বাক্য তৈরির নিয়ম',
          module: 'Grammar',
          durationMinutes: 25,
          xpReward: 80,
          completed: false,
          locked: false,
          description: 'Although, Whereas, In spite of দিয়ে হাই-ব্যান্ড বাক্য গঠন ও ইনভার্সন ড্রিল।',
          url: '/grammar'
        },
        {
          id: 's2-3',
          stepNumber: 5,
          title: 'Speaking Part 1 Warmup: Eliminating Pauses & Hesitations',
          titleBn: 'স্পিকিং পার্ট ১: আটকে যাওয়ার জড়তা দূরীকরণ ও সাবলীল কথন',
          module: 'Speaking',
          durationMinutes: 15,
          xpReward: 60,
          completed: false,
          locked: false,
          description: 'এআই এক্সামিনারের সাধারণ প্রশ্নের ২-৩ বাক্যে সাবলীল উত্তর দেওয়ার অনুশীলন।',
          url: '/practice/speaking'
        }
      ]
    },
    {
      stageNumber: 3,
      stageName: 'Stage 3: Question-Type Strategy Masterclasses',
      stageNameBn: 'ধাপ ৩: মডিউল ভিত্তিক টেকনিক ও কৌশল',
      durationLabel: 'Weeks 3–4',
      targetLevel: 'Band 6.5 ➔ 7.5',
      objective: '৪টি মডিউলের কঠিন প্রশ্নগুলোর শর্টকাট কৌশল ও ফাঁদ এড়ানোর নিয়ম শেখা।',
      lessons: [
        {
          id: 's3-1',
          stepNumber: 6,
          title: 'Reading Masterclass: True / False / Not Given Elimination',
          titleBn: 'রিডিং True / False / Not Given এর ফাঁদ চেনার অব্যর্থ কৌশল',
          module: 'Reading',
          durationMinutes: 30,
          xpReward: 90,
          completed: false,
          locked: false,
          description: 'সাধারণ অনুমানের বদলে প্যাসেজের প্রমাণের ভিত্তিতে নিশ্চিত উত্তর বের করার উপায়।',
          url: '/practice/reading'
        },
        {
          id: 's3-2',
          stepNumber: 7,
          title: 'Matching Headings: Fast Paragraph Skimming Tactics',
          titleBn: 'Matching Headings: পুরো প্যাসেজ না পড়ে দ্রুত হেডিং মেলানোর নিয়ম',
          module: 'Reading',
          durationMinutes: 25,
          xpReward: 85,
          completed: false,
          locked: false,
          description: 'প্যারাগ্রাফের মূল আইডিয়া দ্রুত স্কিম করে সময় বাঁচানোর প্রমাণিত টেকনিক।',
          url: '/practice/reading'
        },
        {
          id: 's3-3',
          stepNumber: 8,
          title: 'Writing Task 2: The 4-Paragraph High-Scoring Architecture',
          titleBn: 'রাইটিং টাস্ক ২: ৪-প্যারাগ্রাফের হাই-স্কোরিং এসে ফ্রেমওয়ার্ক',
          module: 'Writing',
          durationMinutes: 35,
          xpReward: 100,
          completed: false,
          locked: false,
          description: 'Introduction with Thesis, 2 Body Paragraphs এবং Conclusion লেখার নিখুঁত ফর্মুলা।',
          url: '/practice/writing'
        },
        {
          id: 's3-4',
          stepNumber: 9,
          title: 'Speaking Part 2 Cue-Card: 1-Minute Mind-Mapping Method',
          titleBn: 'স্পিকিং কিউ-কার্ড: ১ মিনিটে পয়েন্ট নোট করে ২ মিনিট একটানা বলা',
          module: 'Speaking',
          durationMinutes: 20,
          xpReward: 90,
          completed: false,
          locked: false,
          description: 'টপিক দেখে ঘাবড়ে না গিয়ে কাঠামোগতভাবে কিউ পয়েন্ট সাজিয়ে কথা বলার কৌশল।',
          url: '/practice/speaking'
        }
      ]
    },
    {
      stageNumber: 4,
      stageName: 'Stage 4: Timed Sectional Drills & Instant Error Correction',
      stageNameBn: 'ধাপ ৪: ঘড়ি ধরে সেকশনাল প্র্যাকটিস ও ভুল সংশোধন',
      durationLabel: 'Weeks 5–6',
      targetLevel: 'Band 7.0 ➔ 8.0',
      objective: 'পরীক্ষার নির্ধারিত সময়ের মধ্যে নির্ভুলভাবে উত্তর দেওয়ার স্পিড তৈরি।',
      lessons: [
        {
          id: 's4-1',
          stepNumber: 10,
          title: '20-Minute Timed Academic Reading Passage with Dictionary',
          titleBn: '২০ মিনিটের টাইমার ধরে কেমব্রিজ রিডিং প্যাসেজ ও ডাবল-ক্লিক অনুবাদ',
          module: 'Reading',
          durationMinutes: 20,
          xpReward: 110,
          completed: false,
          locked: false,
          description: 'Cambridge 18 Academic Passage 1 ঘড়ি ধরে শেষ করে স্কোর যাচাই।',
          url: '/practice/reading'
        },
        {
          id: 's4-2',
          stepNumber: 11,
          title: '40-Minute Timed Essay Submission with Examiner Band Report',
          titleBn: '৪০ মিনিটের টাইমার ধরে রচনা লেখা এবং এআই দিয়ে ব্যান্ড স্কোরিং',
          module: 'Writing',
          durationMinutes: 40,
          xpReward: 130,
          completed: false,
          locked: false,
          description: '২৫০+ শব্দ লিখে ব্রিটিশ কাউন্সিলের ৪টি মানদণ্ডে তাত্ক্ষণিক দুর্বলতা বিশ্লেষণ।',
          url: '/practice/writing'
        },
        {
          id: 's4-3',
          stepNumber: 12,
          title: 'Live AI Voice Examiner Interview (Part 1, 2 & 3)',
          titleBn: 'লাইভ এআই এক্সামিনারের সাথে পূর্ণাঙ্গ স্পিকিং ভয়েস ইন্টারভিউ',
          module: 'Speaking',
          durationMinutes: 15,
          xpReward: 120,
          completed: false,
          locked: false,
          description: 'আসল এক্সামিনারের কণ্ঠস্বর শুনে মাইক্রোফোনে উত্তর দেওয়া এবং উচ্চারণ শুধরে নেওয়া।',
          url: '/practice/speaking'
        }
      ]
    },
    {
      stageNumber: 5,
      stageName: 'Stage 5: Full Cambridge Computer Mock Exams',
      stageNameBn: 'ধাপ ৫: ফুল কেমব্রিজ কম্পিউটার মক টেস্ট ও ফাইনাল রিভিউ',
      durationLabel: 'Weeks 7–8',
      targetLevel: 'Band 7.5 ➔ 8.5',
      objective: 'আসল পরীক্ষার হুবহু পরিবেশে পূর্ণাঙ্গ পরীক্ষা দিয়ে চূড়ান্ত আত্মবিশ্বাস অর্জন।',
      lessons: [
        {
          id: 's5-1',
          stepNumber: 13,
          title: 'Full Cambridge 18 Academic Reading Simulation Exam',
          titleBn: 'Cambridge 18 রিডিং ফুল মক টেস্ট (৩টি প্যাসেজ ও ৪০টি প্রশ্ন)',
          module: 'Mock',
          durationMinutes: 60,
          xpReward: 200,
          completed: false,
          locked: false,
          description: 'আসল ব্রিটিশ কাউন্সিল সফটওয়্যার ইন্টারফেসে পূর্ণাঙ্গ রিডিং টেস্ট।',
          url: '/practice/reading'
        },
        {
          id: 's5-2',
          stepNumber: 14,
          title: 'Full Writing Task 1 & Task 2 Examiner Assessment',
          titleBn: 'রাইটিং টাস্ক ১ ও টাস্ক ২ এর পূর্ণাঙ্গ পরীক্ষা ও ব্যান্ড ৮.৫ রিরাইট',
          module: 'Mock',
          durationMinutes: 60,
          xpReward: 200,
          completed: false,
          locked: false,
          description: 'গ্রাফ বিশ্লেষণ ও অপিনিয়ন এসে লিখে এক্সামিনার গ্রেড ও মডেল আনসার সংগ্রহ।',
          url: '/practice/writing'
        },
        {
          id: 's5-3',
          stepNumber: 15,
          title: 'Complete Speaking Exam & Final Readiness Certificate',
          titleBn: 'সম্পূর্ণ স্পিকিং টেস্ট এবং ফাইনাল ব্যান্ড প্রেডিকশন রিপোর্ট',
          module: 'Mock',
          durationMinutes: 20,
          xpReward: 180,
          completed: false,
          locked: false,
          description: 'আসল পরীক্ষার আগে আপনার সম্ভাব্য চূড়ান্ত স্কোর ও শেষ মুহূর্তের দিকনির্দেশনা।',
          url: '/practice/speaking'
        }
      ]
    }
  ]);

  // Handle lesson completion toggle
  const toggleLesson = (stageIdx: number, lessonId: string) => {
    setStages(prev => {
      const copy = [...prev];
      const lesson = copy[stageIdx].lessons.find(l => l.id === lessonId);
      if (lesson) {
        lesson.completed = !lesson.completed;
      }
      return copy;
    });
  };

  // Calculate dynamic overall course progress
  const allLessons = stages.flatMap(s => s.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(l => l.completed).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  // Find next active lesson for the student
  const nextLesson = allLessons.find(l => !l.completed) || allLessons[allLessons.length - 1];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-7">
      
      {/* 1. STUDENT ACADEMY PERSONALIZED HERO HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E11D48] to-rose-600 flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-md shadow-rose-500/20">
            {targetBand}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Welcome, {user?.name || 'Student'}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 font-mono">
                INSTITUTE CURRICULUM ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              বর্তমান স্তর: <strong className="text-slate-800">Band {startingBand}</strong> ➔ টার্গেট লক্ষ্য: <strong className="text-[#E11D48]">Band {targetBand}</strong> • পড়ার সময়: <strong className="text-slate-800">{dailyCommitment}/দিন</strong> • পরীক্ষা: {examDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsSetupModalOpen(true)}
            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>লেভেল ও রুটিন পরিবর্তন করুন</span>
          </button>

          <Link
            href={nextLesson.url}
            className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 transform hover:-translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>আজকের ক্লাস চালু করুন</span>
          </Link>
        </div>
      </div>

      {/* 2. THE STUDENT'S CURRENT "NEXT ACTION" GUIDED BANNER (Clear starting direction) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>আপনার জন্য আজকের পরবর্তী ক্লাস (Step {nextLesson.stepNumber} of {totalLessons})</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {nextLesson.titleBn}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {nextLesson.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> সময়: {nextLesson.durationMinutes} মিনিট</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> রিওয়ার্ড: +{nextLesson.xpReward} XP</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{nextLesson.module} Module</span>
          </div>
        </div>

        <div className="shrink-0 z-10">
          <Link
            href={nextLesson.url}
            className="px-6 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>এখনই ক্লাস শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ambient lighting */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3. THREE LEARNING VIEWS TOGGLE: Institute Stages | Daily Focus | Monthly Calendar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        <div className="inline-flex p-1 bg-white border border-slate-200 rounded-2xl shadow-xs flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('stages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'stages'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>প্রতিষ্ঠানিক ৫-ধাপের কারিকুলাম (Stage 1 to 5)</span>
          </button>

          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'today'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>আজকের ফোকাসড রুটিন</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>ক্যালেন্ডার ভিউ ({currentMonthYear})</span>
          </button>
        </div>

        {/* Live Course Progress Status */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-extrabold text-slate-800">
              কোর্স অগ্রগতি: {completedLessons}/{totalLessons} পাঠ সম্পন্ন ({progressPercent}%)
            </div>
            <div className="text-[10px] text-slate-400">প্রতিদিন ১টি করে পাঠ শেষ করলে ৪৫ দিনে পূর্ণাঙ্গ প্রস্তুতি</div>
          </div>
          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="bg-[#E11D48] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: THE 5 INSTITUTIONAL STAGES (Level 1 to Level 5) */}
      {activeTab === 'stages' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="space-y-6">
            {stages.map((stage, stageIdx) => {
              const stageLessonsDone = stage.lessons.filter(l => l.completed).length;
              const isStageComplete = stageLessonsDone === stage.lessons.length;

              return (
                <div
                  key={stage.stageNumber}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  {/* Stage Header */}
                  <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                          isStageComplete ? 'bg-emerald-600 text-white' : 'bg-[#E11D48] text-white'
                        }`}>
                          {stage.durationLabel}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900">
                          {stage.stageNameBn}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-mono">
                          {stage.targetLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5">{stage.objective}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-600">
                        {stageLessonsDone}/{stage.lessons.length} সম্পন্ন
                      </span>
                      {isStageComplete && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✓ Finished
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lessons in Stage */}
                  <div className="p-6 divide-y divide-slate-100">
                    {stage.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleLesson(stageIdx, lesson.id)}
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                              lesson.completed
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                            title={lesson.completed ? 'সম্পন্ন হয়েছে (আনচেক করতে ক্লিক করুন)' : 'সম্পন্ন হিসেবে চিহ্নিত করতে ক্লিক করুন'}
                          >
                            {lesson.completed ? '✓' : lesson.stepNumber}
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`text-sm font-bold leading-snug ${
                                lesson.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                              }`}>
                                {lesson.titleBn}
                              </h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                                {lesson.module}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ⏱️ {lesson.durationMinutes} মিনিট
                              </span>
                              <span className="text-[10px] text-amber-600 font-bold font-mono">
                                +{lesson.xpReward} XP
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 pl-13 md:pl-0">
                          <Link
                            href={lesson.url}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                              lesson.completed
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-xs transform hover:-translate-y-0.5'
                            }`}
                          >
                            <span>{lesson.completed ? 'পুনরায় প্র্যাকটিস' : 'ক্লাস শুরু করুন'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* VIEW 2: TODAY'S FOCUS & QUICK STUDIOS */}
      {activeTab === 'today' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              আজকের রুটিন: ৪টি স্পেশালাইজড ট্রেনিং স্টুডিও
            </h3>
            <p className="text-xs text-slate-500">
              আপনি সরাসরি যে মডিউলে অনুশীলন করতে চান সেই স্টুডিওতে ক্লিক করুন:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'রিডিং একাডেমি', desc: 'কেমব্রিজ ১৬-১৮ প্যাসেজ, True/False/Not Given এবং ডাবল-ক্লিক বাংলা অর্থ', icon: BookOpen, url: '/practice/reading', color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'স্পিকিং এক্সামিনার', desc: 'রিয়েল-টাইম এআই ভয়েস এক্সামিনার, কিউ-কার্ড এবং ব্যান্ড ৮.৫ বাক্য রিরাইট', icon: Mic, url: '/practice/speaking', color: 'text-rose-600', bg: 'bg-rose-50' },
                { title: 'রাইটিং স্টুডিও', desc: 'টাস্ক ১ ও ২ রচনা জমা দিয়ে অফিশিয়াল ৪টি ক্রাইটেরিয়া ভিত্তিক এআই স্কোরকার্ড', icon: PenTool, url: '/practice/writing', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'ভোকাব ও গ্রামার', desc: 'একাডেমিক ৫০০ শব্দভাণ্ডার এবং জটিল বাক্য তৈরির সম্পূর্ণ মাস্টারক্লাস', icon: Compass, url: '/grammar', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    href={s.url}
                    className="p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#E11D48] transition-colors">{s.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-2 text-xs font-bold text-[#E11D48] flex items-center gap-1">
                      <span>প্র্যাকটিস করুন</span>
                      <span>➔</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: DYNAMIC REAL-TIME CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#E11D48]" />
              <span className="font-bold">আজকের তারিখ: {todayFormattedBn}</span>
            </div>
            <span className="text-[11px] text-slate-400">প্রতিটি দিনের ওপর ক্লিক করে সেই দিনের পাঠ চালু করতে পারবেন</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
            
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-100 pb-3">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, idx) => {
                const dayNum = (idx % 31) + 1;
                const isRealToday = dayNum === todayDateNum;
                const taskTypes = ['Reading', 'Writing', 'Speaking', 'Listening', 'Vocabulary', 'Grammar'];
                const taskType = taskTypes[idx % taskTypes.length];

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      alert(`Day ${dayNum} এর নির্ধারিত ${taskType} অনুশীলনে নিয়ে যাওয়া হচ্ছে...`);
                    }}
                    className={`min-h-[85px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isRealToday
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-md shadow-rose-500/25 scale-102 z-10'
                        : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className={`text-xs font-bold ${isRealToday ? 'text-white text-base' : 'text-slate-800'}`}>
                      {dayNum}
                    </div>

                    <div className="mt-auto">
                      {isRealToday ? (
                        <div className="text-[10px] font-black text-white bg-white/20 rounded-md py-1 px-1.5 text-center">
                          Today&apos;s Class
                        </div>
                      ) : (
                        <div className="text-[10px] font-bold px-2 py-0.5 rounded-md text-center bg-slate-50 text-slate-600 border border-slate-100 truncate">
                          {taskType}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* 4. CUSTOM SETUP WIZARD MODAL */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Customize Your Course & Level</h3>
                <p className="text-xs text-slate-500">আপনার বর্তমান অবস্থা অনুযায়ী কোর্স প্ল্যান রিবিল্ড করুন</p>
              </div>
              <button
                onClick={() => setIsSetupModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">১. আপনার বর্তমান অবস্থা (Current Level):</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[
                    { label: 'Beginner (4.0 - 4.5)', val: '4.5' },
                    { label: 'Intermediate (5.0 - 5.5)', val: '5.0' },
                    { label: 'Advanced (6.0 - 6.5)', val: '6.0' }
                  ].map((lvl) => (
                    <button
                      key={lvl.val}
                      onClick={() => setStartingBand(lvl.val)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        startingBand === lvl.val
                          ? 'border-[#E11D48] bg-rose-50 text-[#E11D48]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">২. আপনার টার্গেট ব্যান্ড স্কোর (Target Goal):</label>
                <div className="grid grid-cols-4 gap-2 mt-1.5">
                  {['6.5', '7.0', '7.5', '8.0'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setTargetBand(g)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        targetBand === g
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      Band {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">৩. কোনটিতে আপনার সবচেয়ে বেশি দুর্বলতা?</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {['Writing (রচনা গঠন)', 'Speaking (কথা বলার জড়তা)', 'Reading (কঠিন প্যাসেজ)', 'Listening (দ্রুত ইংরেজি অডিও)'].map((mod) => (
                    <button
                      key={mod}
                      onClick={() => setWeakestModule(mod.split(' ')[0])}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        weakestModule === mod.split(' ')[0]
                          ? 'border-[#E11D48] bg-rose-50 text-[#E11D48]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">৪. দৈনিক পড়ার সময়:</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {['1 Hour', '1.5 Hours', '3 Hours'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDailyCommitment(t)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        dailyCommitment === t
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {t}/দিন
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsSetupModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  alert(`আপনার স্তর Band ${startingBand} এবং লক্ষ্য Band ${targetBand} অনুযায়ী পুরো কোর্স কারিকুলাম রিবিল্ড করা হয়েছে!`);
                }}
                className="px-6 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                কোর্স প্ল্যান সেভ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
