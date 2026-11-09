'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM } from '@/lib/cambridgeFullExam';
import { CAMBRIDGE_BOOKS_REGISTRY } from '@/lib/cambridgeBooksRegistry';
import { OFFICIAL_MOCK_TEST_SETS, generateDynamicMockTest } from '@/lib/dynamicMockExamRegistry';
import { DICTIONARY_DATABASE } from '@/lib/mockData';
import { WordDefinition, FullReadingExam } from '@/lib/types';
import { DictionaryPopup } from '@/components/DictionaryPopup';
import { SentenceAnalysisModal } from '@/components/SentenceAnalysisModal';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw,
  Send,
  Languages,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Flag,
  Library,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Layers,
  FileText
} from 'lucide-react';

function ReadingMockExamContent() {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get('book');
  const testParam = searchParams.get('test');
  const trackParam = searchParams.get('track');
  const modeParam = searchParams.get('mode');
  const setIdParam = searchParams.get('setId');
  const seedParam = searchParams.get('seed');

  // Exam Mode: 'cambridge' (Books 1-19) or 'mock' (Dynamic Mock Sets)
  const [examMode, setExamMode] = useState<'cambridge' | 'mock'>(modeParam === 'mock' ? 'mock' : 'cambridge');
  const [selectedMockSetId, setSelectedMockSetId] = useState<number>(setIdParam ? parseInt(setIdParam, 10) : 1);
  const [dynamicSeed, setDynamicSeed] = useState<number>(seedParam ? parseInt(seedParam, 10) : 101);

  // Active book number & test number & track
  const [selectedBookNum, setSelectedBookNum] = useState<number>(bookParam ? parseInt(bookParam, 10) : 18);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(testParam ? parseInt(testParam, 10) : 1);
  const [selectedTrack, setSelectedTrack] = useState<'Academic' | 'General Training'>(
    trackParam === 'general training' || trackParam === 'general' ? 'General Training' : 'Academic'
  );

  // View modes
  const [viewAllPassages, setViewAllPassages] = useState<boolean>(false);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Retrieve initial matching exam
  const getInitialExam = (): FullReadingExam => {
    if (modeParam === 'mock') {
      const sId = setIdParam ? parseInt(setIdParam, 10) : 1;
      const initialSeed = seedParam ? parseInt(seedParam, 10) : 101;
      if (sId === 0) return generateDynamicMockTest(initialSeed).readingExam;
      const f = OFFICIAL_MOCK_TEST_SETS.find(s => s.setId === sId) || OFFICIAL_MOCK_TEST_SETS[0];
      return f.readingExam;
    }
    const bNum = bookParam ? parseInt(bookParam, 10) : 18;
    const tNum = testParam ? parseInt(testParam, 10) : 1;
    const track = (trackParam === 'general training' || trackParam === 'general') ? 'General Training' : 'Academic';
    const bookCollection = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === bNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
    const testList = track === 'Academic' ? bookCollection.academicReadingTests : bookCollection.generalReadingTests;
    return (bNum === 18 && tNum === 1 && track === 'Academic')
      ? OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM
      : (testList.find(t => t.testNumber === tNum) || testList[0] || OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM);
  };

  const [exam, setExam] = useState<FullReadingExam>(getInitialExam());

  // When exam mode, book/test/track, or mock set changes
  useEffect(() => {
    if (examMode === 'mock') {
      let mExam: FullReadingExam;
      if (selectedMockSetId === 0) {
        mExam = generateDynamicMockTest(dynamicSeed).readingExam;
      } else {
        const found = OFFICIAL_MOCK_TEST_SETS.find(s => s.setId === selectedMockSetId) || OFFICIAL_MOCK_TEST_SETS[0];
        mExam = found.readingExam;
      }
      setExam(mExam);
      setTimeLeft(mExam.timeLimitMinutes * 60);
    } else {
      const bColl = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === selectedBookNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
      const tList = selectedTrack === 'Academic' ? bColl.academicReadingTests : bColl.generalReadingTests;
      const nExam = (selectedBookNum === 18 && selectedTestNum === 1 && selectedTrack === 'Academic')
        ? OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM
        : (tList.find(t => t.testNumber === selectedTestNum) || tList[0] || OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM);

      setExam(nExam);
      setTimeLeft(nExam.timeLimitMinutes * 60);
    }

    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setIsSubmitted(false);
    setActivePassageIndex(0);
    setActiveQuestionId(1);
  }, [examMode, selectedMockSetId, dynamicSeed, selectedBookNum, selectedTestNum, selectedTrack]);

  // Active Passage: 0 | 1 | 2 (Passage 1, 2, 3)
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);
  const currentPassage = exam.passages[activePassageIndex] || exam.passages[0];

  // Active Question being viewed
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);

  // Student Answers (Key: question id 1 to 40, Value: selected answer)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  // Flagged for Review set
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer: 60 minutes = 3600 seconds
  const [timeLeft, setTimeLeft] = useState<number>(exam.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isTimePaused, setIsTimePaused] = useState<boolean>(false);

  // Text Size scaling (normal | large | xlarge)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Dictionary Popup & Sentence Analysis State
  const [popupWord, setPopupWord] = useState<WordDefinition | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [analyzingSentence, setAnalyzingSentence] = useState<string | null>(null);
  const [floatingSentenceBtn, setFloatingSentenceBtn] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // 60-Minute Countdown Timer
  useEffect(() => {
    if (isSubmitted || isTimePaused || timeLeft <= 0) {
      if (timeLeft <= 0 && !isSubmitted) {
        setIsSubmitted(true);
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, isTimePaused, timeLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Flag toggle
  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Select answer
  const handleSelectAnswer = (qId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  // Jump to specific question and automatically switch to its passage
  const jumpToQuestion = (qId: number) => {
    setActiveQuestionId(qId);
    if (qId <= 13) setActivePassageIndex(0);
    else if (qId <= 26) setActivePassageIndex(1);
    else setActivePassageIndex(2);

    // Scroll question into view if in all-questions mode
    if (typeof document !== 'undefined') {
      const el = document.getElementById(`question-${qId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Double-click word dictionary
  const handlePassageDoubleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const rawWord = selection.toString().trim().toLowerCase().replace(/[^a-zA-Z]/g, '');
    if (!rawWord) return;

    const matchedDef = DICTIONARY_DATABASE[rawWord];
    if (matchedDef) {
      setPopupWord(matchedDef);
      setPopupPos({
        top: e.clientY + 15,
        left: Math.min(e.clientX, window.innerWidth - 340),
      });
      setFloatingSentenceBtn(null);
    }
  };

  // Mouse up sentence selector
  const handlePassageMouseUp = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString().trim();
    if (selectedText.split(/\s+/).length >= 4) {
      setFloatingSentenceBtn({
        text: selectedText,
        top: e.clientY - 45,
        left: Math.min(e.clientX, window.innerWidth - 200),
      });
    } else {
      setFloatingSentenceBtn(null);
    }
  };

  // Official Cambridge 40-Score Calculation
  const calculateTotalCorrect = () => {
    let count = 0;
    exam.passages.forEach(p => {
      p.questions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
          count++;
        }
      });
    });
    return count;
  };

  const calculateBandScore = (score: number) => {
    if (score >= 39) return '9.0';
    if (score >= 37) return '8.5';
    if (score >= 35) return '8.0';
    if (score >= 33) return '7.5';
    if (score >= 30) return '7.0';
    if (score >= 27) return '6.5';
    if (score >= 23) return '6.0';
    if (score >= 19) return '5.5';
    if (score >= 15) return '5.0';
    if (score >= 12) return '4.5';
    return '4.0';
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalCorrect = calculateTotalCorrect();
  const overallBand = calculateBandScore(totalCorrect);

  const resetExam = () => {
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(exam.timeLimitMinutes * 60);
    setIsSubmitted(false);
    setActivePassageIndex(0);
    setActiveQuestionId(1);
  };

  // Active questions list based on toggle
  const displayedQuestions = showAllQuestions 
    ? exam.passages.flatMap(p => p.questions)
    : currentPassage.questions;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] overflow-hidden select-none">
      
      {/* 1. CAMBRIDGE BOOK SELECTOR TOP STRIP (Book 1 to 19 + Academic / General) */}
      <div className="bg-slate-950 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs shrink-0 z-30">
        
        {/* Left: Back / Exit Button & Book Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg font-bold border border-rose-500/40 transition-colors"
            title="ড্যাশবোর্ডে ফিরে যান"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>এক্সিট (Dashboard)</span>
          </Link>

          <Link
            href="/library"
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold border border-slate-700 transition-colors"
          >
            <Library className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>সব বই (Books 1–19)</span>
          </Link>

          {/* Mode Switcher: Cambridge Series vs Full Mock Test */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setExamMode('cambridge')}
              className={`px-2.5 py-1 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                examMode === 'cambridge'
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Library className="w-3 h-3" />
              <span>কেমব্রিজ সিরিজ</span>
            </button>
            <button
              onClick={() => setExamMode('mock')}
              className={`px-2.5 py-1 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                examMode === 'mock'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>ফুল মক টেস্ট</span>
            </button>
          </div>

          {examMode === 'cambridge' ? (
            <>
              {/* Book Dropdown (1 to 19) */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold uppercase">বই:</span>
                <select
                  value={selectedBookNum}
                  onChange={(e) => setSelectedBookNum(parseInt(e.target.value, 10))}
                  className="bg-transparent text-white font-black text-xs cursor-pointer focus:outline-none"
                >
                  {CAMBRIDGE_BOOKS_REGISTRY.map(b => (
                    <option key={b.bookNumber} value={b.bookNumber} className="bg-slate-900 text-white">
                      Cambridge {b.bookNumber} ({b.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Number (1 to 4) */}
              <div className="flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded-lg border border-slate-700">
                {[1, 2, 3, 4].map(tNum => (
                  <button
                    key={tNum}
                    onClick={() => setSelectedTestNum(tNum)}
                    className={`px-2.5 py-1 rounded-md text-xs font-black transition-all ${
                      selectedTestNum === tNum
                        ? 'bg-[#E11D48] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Test {tNum}
                  </button>
                ))}
              </div>

              {/* Track Switcher (Academic vs General) */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setSelectedTrack('Academic')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black flex items-center gap-1 transition-all ${
                    selectedTrack === 'Academic'
                      ? 'bg-rose-500/20 text-[#E11D48] border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3 h-3" />
                  <span>Academic</span>
                </button>
                <button
                  onClick={() => setSelectedTrack('General Training')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black flex items-center gap-1 transition-all ${
                    selectedTrack === 'General Training'
                      ? 'bg-rose-500/20 text-[#E11D48] border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>General</span>
                </button>
              </div>
            </>
          ) : (
            /* Mock Test Sets & Dynamic Shuffler */
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-[10px] text-amber-400 font-bold uppercase">মক সেট:</span>
                <select
                  value={selectedMockSetId}
                  onChange={(e) => setSelectedMockSetId(parseInt(e.target.value, 10))}
                  className="bg-transparent text-white font-black text-xs cursor-pointer focus:outline-none"
                >
                  <option value={1} className="bg-slate-900 text-white">Mock Set 1 (BC Standard 2025/2026)</option>
                  <option value={2} className="bg-slate-900 text-white">Mock Set 2 (IDP High-Yield Band 7.5+)</option>
                  <option value={3} className="bg-slate-900 text-white">Mock Set 3 (Cambridge 19 Pattern)</option>
                  <option value={4} className="bg-slate-900 text-white">Mock Set 4 (Diagnostic Assessment)</option>
                  <option value={0} className="bg-slate-900 text-amber-400 font-bold">🎲 পরিবর্তনশীল ডায়নামিক টেস্ট (Randomized)</option>
                </select>
              </div>

              {/* Dynamic Shuffle Button */}
              <button
                onClick={() => {
                  setSelectedMockSetId(0);
                  setDynamicSeed(Date.now());
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-black border border-amber-500/40 transition-all flex items-center gap-1.5 shadow-xs"
                title="ক্লিক করলেই নতুন ৩টি প্যাসেজ ও ৪০টি প্রশ্ন তৈরি হবে"
              >
                <RotateCcw className="w-3 h-3" />
                <span>নতুন প্যাসেজ ও টেস্ট (Shuffle)</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Info Badge & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'ফুলস্ক্রিন বন্ধ' : 'ফুলস্ক্রিন (Full Screen)'}</span>
          </button>

          <span className="hidden lg:inline text-[11px] text-slate-400">
            {exam.title}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            FULL 40 QUESTIONS
          </span>
        </div>

      </div>

      {/* 2. OFFICIAL CD-IELTS TOP HEADER BAR */}
      <header className="bg-slate-900 text-white px-5 py-2.5 flex items-center justify-between shrink-0 shadow-md z-20">
        
        {/* Left: Test Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E11D48] to-rose-600 flex items-center justify-center font-black text-xs shadow-sm">
            {selectedBookNum}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-100 tracking-tight">
                {exam.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-[#E11D48] text-[10px] font-bold border border-rose-500/30 font-mono">
                {selectedTrack}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Official British Council 3-Passage Simulation • 60 Minutes • 40 Questions
            </div>
          </div>
        </div>

        {/* Center: Passage 1, 2, 3 Tabs + All 3 Passages Toggle */}
        <div className="hidden md:flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          {exam.passages.map((p, idx) => (
            <button
              key={p.passageNumber}
              onClick={() => {
                setViewAllPassages(false);
                setActivePassageIndex(idx);
                setActiveQuestionId(p.questions[0].id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                !viewAllPassages && activePassageIndex === idx
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Passage {p.passageNumber}</span>
              <span className="text-[10px] opacity-80 font-mono">({p.questionRange})</span>
            </button>
          ))}

          {/* View All Passages Button */}
          <button
            onClick={() => setViewAllPassages(!viewAllPassages)}
            className={`ml-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewAllPassages
                ? 'bg-rose-600 text-white shadow-xs ring-1 ring-white/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="সবগুলো প্যাসেজ একসাথে দেখুন"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>সব ৩টি প্যাসেজ (All 3 Passages)</span>
          </button>
        </div>

        {/* Right: Timer, Font Control & Submit Button */}
        <div className="flex items-center gap-3">
          
          {/* Zoom font control */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs text-slate-300">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSize === 'normal' ? 'bg-slate-700 text-white' : ''}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded text-[12px] font-bold ${fontSize === 'large' ? 'bg-slate-700 text-white' : ''}`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* 60-Minute Countdown Clock */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-inner ${
            timeLeft < 300 
              ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
              : timeLeft < 600
              ? 'bg-amber-950 text-amber-300 border border-amber-800'
              : 'bg-slate-800 text-amber-300 border border-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={() => {
                if (answeredCount < 40) {
                  const conf = confirm(`You have answered ${answeredCount} of 40 questions. Are you sure you want to finish and submit the full exam?`);
                  if (!conf) return;
                }
                setIsSubmitted(true);
              }}
              className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          ) : (
            <button
              onClick={resetExam}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake 40 Qs</span>
            </button>
          )}
        </div>

      </header>

      {/* Mobile Passage Tabs */}
      <div className="flex md:hidden bg-slate-800 p-1.5 border-b border-slate-700 justify-around text-xs">
        {exam.passages.map((p, idx) => (
          <button
            key={p.passageNumber}
            onClick={() => {
              setViewAllPassages(false);
              setActivePassageIndex(idx);
              setActiveQuestionId(p.questions[0].id);
            }}
            className={`px-3 py-1 rounded-lg font-bold ${
              !viewAllPassages && activePassageIndex === idx ? 'bg-[#E11D48] text-white' : 'text-slate-400'
            }`}
          >
            Passage {p.passageNumber}
          </button>
        ))}
        <button
          onClick={() => setViewAllPassages(!viewAllPassages)}
          className={`px-3 py-1 rounded-lg font-bold ${
            viewAllPassages ? 'bg-rose-600 text-white' : 'text-slate-400'
          }`}
        >
          All 3 Passages
        </button>
      </div>

      {/* 3. MAIN 50/50 SPLIT SCREEN: Passage on Left, Questions on Right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Side: Cambridge Reading Passage(s) */}
        <div 
          onDoubleClick={handlePassageDoubleClick}
          onMouseUp={handlePassageMouseUp}
          className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white border-r border-slate-200 select-text selection:bg-rose-100 space-y-8"
        >
          {/* SINGLE PASSAGE MODE */}
          {!viewAllPassages ? (
            <div>
              {/* Passage Header & Tools */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#E11D48] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                    READING PASSAGE {currentPassage.passageNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    {currentPassage.questionRange}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                    • Paragraphs A to G (~850 Words)
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Double-click words for Bangla definition</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 tracking-tight">
                {currentPassage.passageTitle}
              </h2>

              {/* Passage Text with Dynamic Font Scaling */}
              <div className={`text-slate-800 leading-relaxed sm:leading-loose space-y-5 font-serif ${
                fontSize === 'normal' ? 'text-sm sm:text-base' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                {currentPassage.passageText.split('\n\n').map((para, idx) => {
                  const isParagraphHeader = para.startsWith('Paragraph ');
                  return (
                    <div key={idx} className="cursor-text">
                      {isParagraphHeader ? (
                        <div className="font-sans font-black text-xs text-[#E11D48] tracking-wider uppercase mb-1 bg-rose-50/50 inline-block px-2 py-0.5 rounded border border-rose-100">
                          {para.slice(0, 11)}
                        </div>
                      ) : null}
                      <p className={isParagraphHeader ? 'mt-1' : ''}>
                        {isParagraphHeader ? para.slice(12) : para}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ALL 3 PASSAGES CONTINUOUS VIEW */
            <div className="space-y-12">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-[#E11D48] font-bold">
                <span>সম্পূর্ণ ৩টি প্যাসেজ মোড (All 3 Passages Full Scroll Active)</span>
                <span className="text-slate-500 font-normal">নিচে স্ক্রোল করে প্রতিটি প্যাসেজ পড়ুন</span>
              </div>

              {exam.passages.map((p) => (
                <div key={p.passageNumber} id={`passage-${p.passageNumber}`} className="pt-4 border-t-2 border-slate-100 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-white bg-slate-900 px-3 py-1 rounded-md">
                      PASSAGE {p.passageNumber}
                    </span>
                    <span className="text-xs text-[#E11D48] font-bold">
                      {p.questionRange}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-4">
                    {p.passageTitle}
                  </h3>

                  <div className={`text-slate-800 leading-relaxed sm:leading-loose space-y-5 font-serif ${
                    fontSize === 'normal' ? 'text-sm sm:text-base' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                  }`}>
                    {p.passageText.split('\n\n').map((para, idx) => {
                      const isParagraphHeader = para.startsWith('Paragraph ');
                      return (
                        <div key={idx} className="cursor-text">
                          {isParagraphHeader ? (
                            <div className="font-sans font-black text-xs text-[#E11D48] tracking-wider uppercase mb-1 bg-rose-50/50 inline-block px-2 py-0.5 rounded border border-rose-100">
                              {para.slice(0, 11)}
                            </div>
                          ) : null}
                          <p className={isParagraphHeader ? 'mt-1' : ''}>
                            {isParagraphHeader ? para.slice(12) : para}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Questions */}
        <div className="w-full md:w-[500px] lg:w-[560px] p-6 overflow-y-auto bg-[#F8FAFC] shrink-0 space-y-6">
          
          {/* Exam Result Banner (Visible after submission) */}
          {isSubmitted && (
            <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Cambridge Reading Result
                  </span>
                  <div className="text-2xl font-black mt-0.5">
                    Score: {totalCorrect} / 40 Correct
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Band Score
                  </span>
                  <div className="text-3xl font-black text-emerald-400">
                    Band {overallBand}
                  </div>
                </div>
              </div>

              {/* Passage Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {exam.passages.map(p => {
                  let pScore = 0;
                  p.questions.forEach(q => {
                    if (userAnswers[q.id] === q.correctAnswer) pScore++;
                  });
                  return (
                    <div key={p.passageNumber} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                      <div className="text-[10px] text-slate-400 font-bold">Passage {p.passageNumber}</div>
                      <div className="text-sm font-black text-slate-100 mt-0.5">{pScore} / {p.questions.length}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Question Filter Header */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <FileText className="w-4 h-4 text-[#E11D48]" />
              <span>
                {showAllQuestions ? 'সম্পূর্ণ ৪০টি প্রশ্ন (Questions 1–40)' : `Passage ${currentPassage.passageNumber} (${currentPassage.questionRange})`}
              </span>
            </div>

            <button
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
            >
              {showAllQuestions ? 'প্যাসেজভিত্তিক প্রশ্ন দেখুন' : 'সব ৪০টি প্রশ্ন একসাথে দেখুন'}
            </button>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {displayedQuestions.map((q) => {
              const isCurrentQuestion = activeQuestionId === q.id;
              const isAnswered = !!userAnswers[q.id];
              const isFlagged = flaggedQuestions.has(q.id);
              const isCorrect = userAnswers[q.id] === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  id={`question-${q.id}`}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all ${
                    isCurrentQuestion
                      ? 'border-[#E11D48] shadow-md ring-2 ring-rose-50'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Question Top Row: Number, Type, and Flag Button */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {q.id}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider font-mono">
                        {q.type}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlag(q.id);
                      }}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                        isFlagged
                          ? 'bg-amber-100 text-amber-800'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Flag for review"
                    >
                      <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span className="text-[10px]">{isFlagged ? 'Review' : 'Flag'}</span>
                    </button>
                  </div>

                  {/* Question Text */}
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mb-4 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options?.map((opt, optIdx) => {
                      const isOptionChosen = userAnswers[q.id] === opt;
                      let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300';

                      if (isSubmitted) {
                        if (opt === q.correctAnswer) {
                          optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isOptionChosen && !isCorrect) {
                          optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                        }
                      } else if (isOptionChosen) {
                        optionStyle = 'bg-rose-50/70 border-[#E11D48] text-[#E11D48] font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectAnswer(q.id, opt)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span className="leading-snug">{opt}</span>
                          {isSubmitted && opt === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                          {isSubmitted && isOptionChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Review Explanation Mode after Submit */}
                  {isSubmitted && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-in fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <HelpCircle className="w-4 h-4 text-[#E11D48]" />
                        <span>Cambridge Examiner Key & Explanation:</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {q.explanation}
                      </p>
                      {q.passageQuote && (
                        <div className="p-2.5 bg-rose-50/60 border-l-2 border-[#E11D48] text-[#E11D48] text-[11px] italic font-serif">
                          "{q.passageQuote}"
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 4. OFFICIAL CD-IELTS BOTTOM 1–40 QUESTION GRID FOOTER */}
      <footer className="bg-white border-t border-slate-200 px-5 py-3 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg z-20">
        
        {/* Left: Prev / Next Question controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeQuestionId > 1) {
                jumpToQuestion(activeQuestionId - 1);
              }
            }}
            disabled={activeQuestionId <= 1}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
            title="Previous question"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              if (activeQuestionId < 40) {
                jumpToQuestion(activeQuestionId + 1);
              }
            }}
            disabled={activeQuestionId >= 40}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
            title="Next question"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-slate-700 ml-1">
            Question {activeQuestionId} of 40
          </span>
        </div>

        {/* Center: Full 1–40 Question Navigation Palette */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-2xl py-1 px-2 scrollbar-none">
          {Array.from({ length: 40 }).map((_, idx) => {
            const qNum = idx + 1;
            const isAnswered = !!userAnswers[qNum];
            const isSelected = activeQuestionId === qNum;
            const isFlagged = flaggedQuestions.has(qNum);

            let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

            if (isSubmitted) {
              const allQuestions = exam.passages.flatMap(p => p.questions);
              const targetQ = allQuestions.find(q => q.id === qNum);
              const isCorrect = userAnswers[qNum] === targetQ?.correctAnswer;
              btnClass = isCorrect ? 'bg-emerald-600 text-white font-bold' : 'bg-[#E11D48] text-white font-bold';
            } else if (isAnswered) {
              btnClass = 'bg-slate-900 text-white font-bold';
            }

            return (
              <button
                key={qNum}
                onClick={() => jumpToQuestion(qNum)}
                className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 border transition-all relative ${btnClass} ${
                  isSelected ? 'ring-2 ring-[#E11D48] ring-offset-1 scale-110 z-10' : ''
                }`}
                title={`Question ${qNum} ${isAnswered ? '(Answered)' : '(Unanswered)'}`}
              >
                <span>{qNum}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Answered Progress stats */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="font-extrabold text-slate-900">{answeredCount} of 40</span>
            <span className="text-slate-400 text-[11px]"> answered</span>
          </div>

          <button
            onClick={() => toggleFlag(activeQuestionId)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              flaggedQuestions.has(activeQuestionId)
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.has(activeQuestionId) ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>Review</span>
          </button>
        </div>

      </footer>

      {/* Dictionary Popup Modal on Double Click */}
      {popupWord && popupPos && (
        <DictionaryPopup
          wordInfo={popupWord}
          position={popupPos}
          onClose={() => setPopupWord(null)}
          onSaveToBank={() => {}}
        />
      )}

      {/* Floating Sentence Analysis Button on mouse select */}
      {floatingSentenceBtn && (
        <button
          onClick={() => {
            setAnalyzingSentence(floatingSentenceBtn.text);
            setFloatingSentenceBtn(null);
          }}
          style={{ top: `${floatingSentenceBtn.top}px`, left: `${floatingSentenceBtn.left}px` }}
          className="fixed z-50 px-3.5 py-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs font-bold shadow-xl flex items-center gap-1.5 transition-transform animate-in fade-in"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Translate Sentence</span>
        </button>
      )}

      {/* Sentence Analysis Modal */}
      {analyzingSentence && (
        <SentenceAnalysisModal
          sentence={analyzingSentence}
          onClose={() => setAnalyzingSentence(null)}
        />
      )}

    </div>
  );
}

export default function FullCambridgeReadingMockPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <div className="w-6 h-6 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
          <span>ক্যামব্রিজ টেস্ট লোড হচ্ছে...</span>
        </div>
      </div>
    }>
      <ReadingMockExamContent />
    </Suspense>
  );
}
