'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  FOUNDATION_CURRICULUM, 
  FoundationLesson, 
  PracticeExercise 
} from '@/lib/foundationCurriculumRegistry';
import { generateUnlimitedLessonQuiz } from '@/lib/foundationQuestionGenerator';
import { processFoundationTutorQuery } from '@/lib/foundationTutorEngine';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  Bot, 
  Volume2, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight, 
  Layers, 
  Flame, 
  ShieldAlert, 
  Award, 
  RefreshCw,
  Lightbulb,
  Check,
  Zap,
  Info,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Eye,
  GraduationCap,
  Timer,
  AlertTriangle
} from 'lucide-react';

interface TutorMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  isAlert?: boolean;
}

export default function PreIeltsFoundationPage() {
  const { user } = useAuth();
  const userKey = user?.id || user?.email || 'default_student';

  // Navigation View: 'list' (All Lessons Roadmap) | 'lesson' (Single Lesson & Practice Lab)
  const [viewMode, setViewMode] = useState<'list' | 'lesson'>('list');

  // Completed Lessons State (Stored in localStorage)
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string>(FOUNDATION_CURRICULUM[0].id);

  // Active Lesson Object
  const activeLessonIndex = FOUNDATION_CURRICULUM.findIndex(l => l.id === activeLessonId);
  const activeLesson: FoundationLesson = 
    FOUNDATION_CURRICULUM[activeLessonIndex !== -1 ? activeLessonIndex : 0];
  const nextLesson: FoundationLesson | undefined = 
    FOUNDATION_CURRICULUM[activeLessonIndex + 1];

  // Unlimited Question Engine State (attempt tracking & dynamic questions)
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [activeExercises, setActiveExercises] = useState<PracticeExercise[]>([]);

  // Practice Lab State: user answers mapped by exercise id
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  // 80% Passing Threshold & 1-Hour Lockout State
  const [isBatchSubmitted, setIsBatchSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<{ passed: boolean; score: number; total: number; percent: number } | null>(null);
  const [lockExpiresAt, setLockExpiresAt] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Right Side Panel Tab in Lesson View: 'quiz' | 'tutor'
  const [activeTab, setActiveTab] = useState<'quiz' | 'tutor'>('quiz');

  // In-Lesson Tutor Chat State
  const [chatMessages, setChatMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `স্বাগতম! আমি আপনার ইন-লেসন এআই টিউটর। এই লেসনের কোনো নিয়ম, ব্যাকরণ সূত্র বা উদাহরণ বুঝতে সমস্যা হলে আমাকে সরাসরি জিজ্ঞাসা করুন।\n\n*(সতর্কবার্তা: সেলফ-টেস্টিং কুইজে আপনাকে নিজে ভেবে উত্তর দিতে হবে—পরীক্ষার সরাসরি উত্তর ফাঁস করা নিষেধ, তবে কোনো প্রশ্নে আটকে গেলে আমি আপনাকে ক্লু বা Hint দিতে পারব!)*`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTutorTyping, setIsTutorTyping] = useState(false);

  // A-to-Z Grammar Search, Level Filtering and Teacher Preview mode
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [isTeacherPreview, setIsTeacherPreview] = useState(false);

  // Initialize & Load Lesson Exercises with Unlimited AI Engine
  useEffect(() => {
    let currentAttempt = 1;
    try {
      const storedAttempt = localStorage.getItem(`pre_ielts_quiz_attempt_${activeLesson.id}`);
      if (storedAttempt) {
        currentAttempt = parseInt(storedAttempt, 10) || 1;
      }
    } catch (e) {}
    setAttemptCount(currentAttempt);
    setActiveExercises(generateUnlimitedLessonQuiz(activeLesson, currentAttempt));
  }, [activeLesson.id]);

  // Check 10-minute lockout for active lesson on change/mount
  useEffect(() => {
    try {
      const lockKey = `pre_ielts_quiz_lock_${activeLesson.id}`;
      const savedLock = localStorage.getItem(lockKey);
      if (savedLock) {
        const expiry = parseInt(savedLock, 10);
        if (expiry > Date.now()) {
          setLockExpiresAt(expiry);
          setTimeRemaining(Math.ceil((expiry - Date.now()) / 1000));
        } else {
          localStorage.removeItem(lockKey);
          setLockExpiresAt(null);
          setTimeRemaining(0);
        }
      } else {
        setLockExpiresAt(null);
        setTimeRemaining(0);
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeLesson.id]);

  // Cooldown countdown tick every second
  useEffect(() => {
    if (!lockExpiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockExpiresAt - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockExpiresAt(null);
        setTimeRemaining(0);
        setIsBatchSubmitted(false);
        setQuizResult(null);
        setUserAnswers({});
        try {
          localStorage.removeItem(`pre_ielts_quiz_lock_${activeLesson.id}`);
        } catch (e) {}
        // Refresh with fresh unlimited questions on retake!
        setActiveExercises(generateUnlimitedLessonQuiz(activeLesson, attemptCount));
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockExpiresAt, activeLesson.id, attemptCount]);

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} মিনিট ${s < 10 ? '0' : ''}${s} সেকেন্ড`;
  };

  // Load completed lessons & Last Read Lesson from User Account Database on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pre_ielts_completed_lessons');
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
      const cachedLast = localStorage.getItem(`pre_ielts_foundation_last_read_${userKey}`);
      if (cachedLast && FOUNDATION_CURRICULUM.some(l => l.id === cachedLast)) {
        setActiveLessonId(cachedLast);
      }
    } catch (e) {
      console.error('Failed to load completed lessons', e);
    }

    // Fetch Last Read Lesson from Database API
    fetch(`/api/user/progress?userId=${encodeURIComponent(userKey)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.progress?.foundation?.lastLessonId) {
          const savedId = data.progress.foundation.lastLessonId;
          if (FOUNDATION_CURRICULUM.some(l => l.id === savedId)) {
            setActiveLessonId(savedId);
          }
        }
      })
      .catch(() => {});
  }, [userKey]);

  // Save Last Read Lesson to User Account Database on change
  useEffect(() => {
    if (!activeLessonId) return;
    try {
      localStorage.setItem(`pre_ielts_foundation_last_read_${userKey}`, activeLessonId);
      fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || userKey,
          userEmail: user?.email || '',
          foundation: {
            lastLessonId: activeLessonId,
            lastLessonTitle: activeLesson.title
          }
        })
      }).catch(() => {});
    } catch (e) {}
  }, [activeLessonId, userKey, activeLesson.title, user?.id, user?.email]);

  // Save completed lessons to localStorage
  const markLessonCompleted = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      const updated = [...prev, lessonId];
      try {
        localStorage.setItem('pre_ielts_completed_lessons', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save completed lessons', e);
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    if (confirm('আপনি কি সত্যিই সম্পূর্ণ অগ্রগতি রিসেট করে আবার লেসন ১ থেকে শুরু করতে চান?')) {
      setCompletedLessons([]);
      try {
        localStorage.removeItem('pre_ielts_completed_lessons');
      } catch (e) {
        console.error(e);
      }
      setActiveLessonId(FOUNDATION_CURRICULUM[0].id);
      setViewMode('list');
    }
  };

  // Helper: check if a lesson at a given index is unlocked
  const isLessonUnlocked = (idx: number): boolean => {
    if (isTeacherPreview) return true; // Teacher / Full Review mode unlocks all lessons
    if (idx === 0) return true; // Lesson 1 is always unlocked
    const prevLesson = FOUNDATION_CURRICULUM[idx - 1];
    return completedLessons.includes(prevLesson.id);
  };

  // Audio Speech playback for examples
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Quiz Submissions
  const handleSelectOption = (exId: number, val: string) => {
    if (isBatchSubmitted || (lockExpiresAt && timeRemaining > 0)) return;
    setUserAnswers(prev => ({ ...prev, [exId]: val }));
  };

  // Submit all answers at once & verify if score >= 80%
  const handleSubmitAllAnswers = () => {
    if (lockExpiresAt && timeRemaining > 0) return;

    let correct = 0;
    activeExercises.forEach(ex => {
      const userAns = (userAnswers[ex.id] || '').trim();
      const isCorrect = userAns.toLowerCase() === ex.correctAnswer.toLowerCase() ||
        (ex.type === 'mcq' && userAns.startsWith(ex.correctAnswer.substring(0, 2)));
      if (isCorrect) correct++;
    });

    const total = activeExercises.length;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= 80;

    setIsBatchSubmitted(true);
    setQuizResult({ passed, score: correct, total, percent });

    if (passed) {
      // 80% or higher: Unlock next lesson!
      markLessonCompleted(activeLesson.id);
      try {
        localStorage.removeItem(`pre_ielts_quiz_lock_${activeLesson.id}`);
      } catch (e) {}
      setLockExpiresAt(null);
      setTimeRemaining(0);
    } else {
      // Under 80%: Lock out answers for 10 minutes and increment attempt for next fresh question set!
      const tenMinutesExpiry = Date.now() + 10 * 60 * 1000;
      setLockExpiresAt(tenMinutesExpiry);
      setTimeRemaining(600);
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      try {
        localStorage.setItem(`pre_ielts_quiz_lock_${activeLesson.id}`, tenMinutesExpiry.toString());
        localStorage.setItem(`pre_ielts_quiz_attempt_${activeLesson.id}`, nextAttempt.toString());
      } catch (e) {}
    }
  };

  // Reset quiz attempt (when not locked)
  const handleResetQuizForLesson = () => {
    setUserAnswers({});
    setIsBatchSubmitted(false);
    setQuizResult(null);
  };

  // Generate completely new, fresh dynamic questions anytime (Unlimited AI Mode)
  const handleGenerateNewQuestions = () => {
    if (lockExpiresAt && timeRemaining > 0) return;
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    try {
      localStorage.setItem(`pre_ielts_quiz_attempt_${activeLesson.id}`, nextAttempt.toString());
    } catch (e) {}
    setActiveExercises(generateUnlimitedLessonQuiz(activeLesson, nextAttempt));
    setUserAnswers({});
    setIsBatchSubmitted(false);
    setQuizResult(null);
  };

  // Developer / Teacher Bypass Cooldown Lock
  const handleBypassCooldown = () => {
    try {
      localStorage.removeItem(`pre_ielts_quiz_lock_${activeLesson.id}`);
    } catch (e) {}
    setLockExpiresAt(null);
    setTimeRemaining(0);
    setIsBatchSubmitted(false);
    setQuizResult(null);
    setUserAnswers({});
    // Generate fresh questions for the retake
    setActiveExercises(generateUnlimitedLessonQuiz(activeLesson, attemptCount));
  };

  // Transition to next lesson after >= 80% completion
  const handleUnlockAndGoNext = (nextId: string) => {
    markLessonCompleted(activeLesson.id);
    setActiveLessonId(nextId);
    setUserAnswers({});
    setIsBatchSubmitted(false);
    setQuizResult(null);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Tutor Chat Query with Anti-Cheat Socratic Protection
  const handleSendTutorMessage = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    const studentMsg: TutorMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: userText
    };

    setChatMessages(prev => [...prev, studentMsg]);
    setChatInput('');
    setIsTutorTyping(true);

    setTimeout(() => {
      const res = processFoundationTutorQuery(userText, activeLesson.title, activeExercises);
      setIsTutorTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: res.reply,
          isAlert: res.isCheatingAttempt
        }
      ]);
    }, 600);
  };

  // Check if all exercises in the active lesson are completed with >= 80% score
  const allExercisesCompleted = Boolean(isBatchSubmitted && quizResult?.passed);

  // Overall Course Progress Percentage
  const progressPercent = Math.round((completedLessons.length / FOUNDATION_CURRICULUM.length) * 100);

  // Group lessons by level for the list view
  const levels = [
    { num: 1, title: 'Level 1: Sentence Foundations & Word Grammar', desc: 'Parts of Speech, Nouns, Pronouns, Adjectives & Degrees, Adverbs & Modals' },
    { num: 2, title: 'Level 2: Complete Tense Mastery & Timelines', desc: 'Present, Past, Future & Dual Timelines' },
    { num: 3, title: 'Level 3: Verb Mechanics, Voice & Narration', desc: 'Active & Passive Voice, Stative Verbs, Causatives & Direct/Indirect Narration' },
    { num: 4, title: 'Level 4: Sentence Architecture & Clauses', desc: 'Simple/Compound/Complex, Relative Clauses, Gerunds & Infinitives' },
    { num: 5, title: 'Level 5: Precision, Agreement & Inquiry', desc: 'Subject-Verb Agreement, Prepositions, Question Formation & Tags' },
    { num: 6, title: 'Level 6: Advanced Band 8.5+ Academic Arsenal', desc: 'Conditionals, Participle Clauses, Inversion & Nominalization' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 select-none">
      
      {/* =========================================================================
          VIEW MODE 1: ALL LESSONS LIST (SEQUENTIAL ROADMAP)
          ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-8">
          
          {/* Header Banner & Roadmap Summary */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  Pre-IELTS Complete Foundation
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-black">
                  ধাপে ধাপে আনলক সিস্টেম
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                বেসিক থেকে অ্যাডভান্সড ইংরেজি ও গ্রামার একাডেমি
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                এখানে সকল লেসন ধাপে ধাপে ক্রমান্বয়ে সাজানো রয়েছে। প্রথম লেসনটি উন্মুক্ত রয়েছে; প্রতিটি লেসনের নিয়ম পড়ে এবং সেলফ-টেস্টিং কুইজ সম্পন্ন করলেই স্বয়ংক্রিয়ভাবে পরবর্তী লেসনটি আনলক হবে।
              </p>

              {/* Course Progress Bar */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>কোর্সের অগ্রগতি: {completedLessons.length} / {FOUNDATION_CURRICULUM.length} সম্পন্ন</span>
                  </span>
                  <span className="text-rose-400 font-mono">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-3 bg-slate-700/80 rounded-full overflow-hidden p-0.5 border border-slate-600">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-rose-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  onClick={() => {
                    // Find first incomplete unlocked lesson or lesson 0
                    const firstIncompleteIdx = FOUNDATION_CURRICULUM.findIndex((l, idx) => isLessonUnlocked(idx) && !completedLessons.includes(l.id));
                    const targetIdx = firstIncompleteIdx !== -1 ? firstIncompleteIdx : 0;
                    setActiveLessonId(FOUNDATION_CURRICULUM[targetIdx].id);
                    setUserAnswers({});
                    setIsBatchSubmitted(false);
                    setQuizResult(null);
                    setViewMode('lesson');
                  }}
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black rounded-xl shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>পড়াশোনা চালিয়ে যান</span>
                </button>

                <button
                  onClick={() => setIsTeacherPreview(!isTeacherPreview)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isTeacherPreview
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/20'
                  }`}
                  title="পর্যবেক্ষণের জন্য সব লেসন এক ক্লিকে আনলক করুন"
                >
                  {isTeacherPreview ? <Unlock className="w-3.5 h-3.5 text-slate-950" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isTeacherPreview ? 'সব লেসন আনলকড (রিভিউ মোড সক্রিয়)' : 'সকল লেসন প্রিভিউ করুন (Unlock All)'}</span>
                </button>

                {completedLessons.length > 0 && (
                  <button
                    onClick={handleResetProgress}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>অগ্রগতি রিসেট করুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* A to Z Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেকোনো গ্রামার টপিক খুঁজুন (যেমন: Passive, Tense, Narration...)"
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-[#E11D48]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Level Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedLevelFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLevelFilter === 'all'
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                A to Z সব ({FOUNDATION_CURRICULUM.length})
              </button>
              {[1, 2, 3, 4, 5, 6].map((lvlNum) => (
                <button
                  key={lvlNum}
                  onClick={() => setSelectedLevelFilter(lvlNum)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedLevelFilter === lvlNum
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Level {lvlNum}
                </button>
              ))}
            </div>
          </div>

          {/* All Lessons Grouped by Level */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E11D48]" />
                <span>A to Z সম্পূর্ণ ব্যাকরণ ও ফাউন্ডেশন রোডম্যাপ</span>
              </h2>
              <span className="text-xs text-slate-500 font-bold">
                {selectedLevelFilter === 'all' ? `মোট ${FOUNDATION_CURRICULUM.length}টি লেসন` : `লেভেল ${selectedLevelFilter}-এর লেসনসমূহ`}
              </span>
            </div>

            <div className="space-y-8">
              {levels.map(lvl => {
                if (selectedLevelFilter !== 'all' && lvl.num !== selectedLevelFilter) return null;

                const levelLessons = FOUNDATION_CURRICULUM.filter(l => {
                  if (l.level !== lvl.num) return false;
                  if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase();
                    return (
                      l.title.toLowerCase().includes(q) ||
                      l.bengaliTitle.toLowerCase().includes(q) ||
                      l.badge.toLowerCase().includes(q) ||
                      l.conceptBreakdown.some(c => c.toLowerCase().includes(q))
                    );
                  }
                  return true;
                });

                if (levelLessons.length === 0) return null;

                return (
                  <div key={lvl.num} className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        {lvl.num}
                      </span>
                      <h3 className="text-sm font-black text-slate-900">
                        {lvl.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        — {lvl.desc}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {levelLessons.map(lesson => {
                        const globalIndex = FOUNDATION_CURRICULUM.findIndex(l => l.id === lesson.id);
                        const isUnlocked = isLessonUnlocked(globalIndex);
                        const isCompleted = completedLessons.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                              isCompleted
                                ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                                : isUnlocked
                                  ? 'bg-white border-slate-300 hover:border-[#E11D48] shadow-sm hover:shadow-md'
                                  : 'bg-slate-100/70 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                  isCompleted
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isUnlocked
                                      ? 'bg-rose-50 text-[#E11D48] border border-rose-200'
                                      : 'bg-slate-200 text-slate-500'
                                }`}>
                                  লেসন #{globalIndex + 1}
                                </span>

                                {isCompleted ? (
                                  <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>সম্পন্ন হয়েছে</span>
                                  </span>
                                ) : isUnlocked ? (
                                  <span className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                    <Unlock className="w-3.5 h-3.5" />
                                    <span>উন্মুক্ত</span>
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-xs font-black text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>লক করা</span>
                                  </span>
                                )}
                              </div>

                              <div>
                                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                                  {lesson.bengaliTitle}
                                </h4>
                                <div className="text-xs text-slate-500 font-medium mt-0.5">
                                  {lesson.title}
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                {lesson.contextStory}
                              </p>
                            </div>

                            <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                              <span className="text-[11px] text-slate-400 font-mono">
                                ⏱ {lesson.estimatedMinutes} মিনিট • {lesson.exercises.length}টি কুইজ
                              </span>

                              {isUnlocked ? (
                                <button
                                  onClick={() => {
                                    setActiveLessonId(lesson.id);
                                    setUserAnswers({});
                                    setIsBatchSubmitted(false);
                                    setQuizResult(null);
                                    setActiveTab('quiz');
                                    setViewMode('lesson');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                                    isCompleted
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                      : 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-xs'
                                  }`}
                                >
                                  <span>{isCompleted ? 'রিভিউ করুন' : 'শুরু করুন'}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  <span>আগের লেসন শেষ করুন</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: ACTIVE LESSON STUDY & INTERACTIVE PRACTICE LAB
          ========================================================================= */}
      {viewMode === 'lesson' && (
        <div className="space-y-6">
          
          {/* Top Navigation & Back Button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <button
              onClick={() => {
                setViewMode('list');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>লেসন তালিকায় ফিরে যান</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold hidden sm:inline">
                লেসন {activeLessonIndex + 1} of {FOUNDATION_CURRICULUM.length}
              </span>
              {completedLessons.includes(activeLesson.id) && (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>সম্পন্ন</span>
                </span>
              )}
            </div>
          </div>

          {/* Main Lesson Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (7 Cols): Lesson Classroom Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-rose-50 text-[#E11D48] text-xs font-black rounded-full border border-rose-200/80 uppercase">
                    {activeLesson.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-bold">
                    ⏱ আনুমানিক সময়: {activeLesson.estimatedMinutes} মিনিট
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {activeLesson.bengaliTitle}
                  </h2>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">
                    {activeLesson.title} • {activeLesson.levelTitle}
                  </div>
                </div>

                {/* Real-life Context Story */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800 uppercase tracking-wider text-[11px]">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>বাস্তব জীবনের প্রেক্ষাপট ও উদাহরণ:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    {activeLesson.contextStory}
                  </p>
                </div>

                {/* Concept Breakdown */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>মূল নিয়মের বিশদ ব্যাখ্যা:</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {activeLesson.conceptBreakdown.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Easy Formula Banner */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                    সহজে মনে রাখার মাস্টার ফর্মুলা (Formula Box)
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-amber-300">
                    {activeLesson.formula}
                  </div>
                </div>

                {/* Real English Sentence Examples with British Voice */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>বাস্তব একাডেমিক বাক্য ও প্রয়োগ:</span>
                  </h3>

                  <div className="space-y-2.5">
                    {activeLesson.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {ex.en}
                          </div>
                          <button
                            onClick={() => speakText(ex.en)}
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
                            title="ব্রিটিশ উচ্চারণে শুনুন"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed font-medium">
                          {ex.bn}
                        </div>
                        {ex.context && (
                          <div className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-slate-200/50">
                            💡 {ex.context}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes vs Correct */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>আমরা সচরাচর কী ভুল করি বনাম সঠিক নিয়ম:</span>
                  </h3>

                  <div className="space-y-3">
                    {activeLesson.commonMistakes.map((mis, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-2xl border border-slate-200 space-y-2 bg-white shadow-xs">
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-black shrink-0">
                            ভুল
                          </span>
                          <span className="line-through text-rose-900 font-medium">{mis.wrong}</span>
                        </div>

                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black shrink-0">
                            সঠিক
                          </span>
                          <span className="text-emerald-900 font-bold">{mis.correct}</span>
                        </div>

                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <strong>কেন ভুল:</strong> {mis.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column (5 Cols): Self-Testing Quiz Lab & Anti-Cheat Socratic AI Tutor */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Tab Selector: Interactive Practice Lab vs In-Lesson Tutor */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'quiz'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>সেলফ-টেস্টিং ({activeExercises.length}টি প্রশ্ন)</span>
                </button>

                <button
                  onClick={() => setActiveTab('tutor')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'tutor'
                      ? 'bg-white text-[#E11D48] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Bot className="w-4 h-4 text-[#E11D48]" />
                  <span>এআই টিউটর চ্যাট (লাইভ সাহায্য)</span>
                </button>
              </div>

              {/* TAB 1: INTERACTIVE PRACTICE LAB */}
              {activeTab === 'quiz' && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-sm font-black text-slate-900">
                        সেলফ-ভেরিফিকেশন কুইজ ল্যাব
                      </h3>
                      <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        আনলিমিটেড এআই মোড (চেষ্টা #{attemptCount})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleGenerateNewQuestions}
                        disabled={Boolean(lockExpiresAt && timeRemaining > 0)}
                        className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                        title="নতুন আনকোরা প্রশ্ন সেট জেনারেট করুন"
                      >
                        <RefreshCw className="w-3 h-3 text-indigo-500" />
                        <span>নতুন প্রশ্ন সেট</span>
                      </button>
                      <span className="text-[11px] font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        পাসিং: ৮০%
                      </span>
                    </div>
                  </div>

                  {/* 10-Minute Failure Lockout Notice Banner */}
                  {lockExpiresAt && timeRemaining > 0 && (
                    <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-rose-700 font-black text-xs sm:text-sm">
                        <Timer className="w-4 h-4 text-rose-600 animate-pulse" />
                        <span>১০ মিনিটের লক সক্রিয় — উত্তর দেওয়া সাময়িকভাবে বন্ধ</span>
                      </div>
                      <p className="text-xs text-rose-900 leading-relaxed font-medium">
                        পূর্ববর্তী টেস্টে আপনার স্কোর ৮০% এর কম ছিল। নিয়ম অনুযায়ী পরবর্তী সেশন আনলক হয়নি। আগামী ১০ মিনিট উত্তর দেওয়া বন্ধ থাকবে। এই সময়ে লেসনের নিয়ম ও ব্যাখ্যাগুলো পুনরায় পড়ার জন্য নির্দেশ দেওয়া হয়েছে।
                      </p>
                      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                        <span className="text-xs font-bold text-rose-800 font-mono bg-rose-100/90 px-2.5 py-1 rounded-lg border border-rose-200">
                          ⏳ পুনরায় কুইজ দেওয়ার সময় বাকি: {formatCountdown(timeRemaining)}
                        </span>
                        <button
                          onClick={handleBypassCooldown}
                          className="text-[11px] text-rose-600 hover:text-rose-800 underline font-bold"
                          title="শিক্ষক/পর্যবেক্ষক মোডে ১০ মিনিটের লক রিসেট করুন"
                        >
                          লক রিসেট করুন (শিক্ষক মোড)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Exercises List */}
                  <div className="space-y-5">
                    {activeExercises.map((ex, exIndex) => {
                      const userAnswer = (userAnswers[ex.id] || '').trim();
                      const isCorrect = userAnswer.toLowerCase() === ex.correctAnswer.toLowerCase() ||
                        (ex.type === 'mcq' && userAnswer.startsWith(ex.correctAnswer.substring(0, 2)));
                      const isLocked = Boolean(lockExpiresAt && timeRemaining > 0);

                      return (
                        <div
                          key={ex.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isBatchSubmitted
                              ? (isCorrect ? 'bg-emerald-50/60 border-emerald-300' : 'bg-rose-50/60 border-rose-300')
                              : 'bg-slate-50/70 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold font-mono">
                              প্রশ্ন #{exIndex + 1}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {ex.type === 'mcq' ? 'মাল্টিপল চয়েস' : ex.type === 'fill-typing' ? 'কিবোর্ড টাইপিং' : 'ভুল চিহ্নিতকরণ'}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-slate-500 mb-1.5">
                            {ex.instruction}
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-slate-900 mb-3 leading-snug">
                            {ex.question}
                          </div>

                          {/* MCQ Options */}
                          {ex.type === 'mcq' && ex.options && (
                            <div className="space-y-1.5 mb-3">
                              {ex.options.map((opt, optIdx) => {
                                const isChosen = userAnswers[ex.id] === opt;
                                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';

                                if (isBatchSubmitted) {
                                  if (opt === ex.correctAnswer) {
                                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                  } else if (isChosen && !isCorrect) {
                                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                                  }
                                } else if (isChosen) {
                                  btnStyle = 'bg-rose-50 border-[#E11D48] text-[#E11D48] font-bold';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={isBatchSubmitted || isLocked}
                                    onClick={() => handleSelectOption(ex.id, opt)}
                                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer disabled:cursor-not-allowed ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {isBatchSubmitted && opt === ex.correctAnswer && (
                                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Fill-in Typing Input */}
                          {ex.type === 'fill-typing' && (
                            <div className="space-y-2 mb-3">
                              <input
                                type="text"
                                disabled={isBatchSubmitted || isLocked}
                                value={userAnswers[ex.id] || ''}
                                onChange={(e) => handleSelectOption(ex.id, e.target.value)}
                                placeholder="কিবোর্ড দিয়ে সঠিক শব্দটি টাইপ করুন..."
                                className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-mono font-bold transition-all outline-none disabled:bg-slate-100 disabled:cursor-not-allowed ${
                                  isBatchSubmitted
                                    ? (isCorrect ? 'bg-white border-emerald-400 text-emerald-900' : 'bg-white border-rose-400 text-rose-900')
                                    : 'bg-white border-slate-300 focus:border-[#E11D48]'
                                }`}
                              />
                            </div>
                          )}

                          {/* Error Fix Clickable Words */}
                          {ex.type === 'error-fix' && ex.options && (
                            <div className="grid grid-cols-2 gap-1.5 mb-3">
                              {ex.options.map((wrd, wIdx) => {
                                const isChosen = userAnswers[ex.id] === wrd;
                                return (
                                  <button
                                    key={wIdx}
                                    disabled={isBatchSubmitted || isLocked}
                                    onClick={() => handleSelectOption(ex.id, wrd)}
                                    className={`p-2 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer disabled:cursor-not-allowed ${
                                      isChosen
                                        ? 'bg-[#E11D48] text-white border-[#E11D48]'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    {wrd}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Post-submission full answer and explanation */}
                          {isBatchSubmitted && (
                            <div className="space-y-2 pt-2 border-t border-slate-200/60 animate-in fade-in duration-200">
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-black flex items-center gap-1 ${
                                  isCorrect ? 'text-emerald-700' : 'text-rose-700'
                                }`}>
                                  {isCorrect ? '✓ আপনার উত্তর সঠিক হয়েছে!' : '✗ ভুল হয়েছে'}
                                </span>
                              </div>

                              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  সঠিক সমাধান ও বাংলা ব্যাখ্যা:
                                </div>
                                <div className="font-bold text-slate-900">
                                  সঠিক উত্তর: <span className="underline text-emerald-700">{ex.correctAnswer}</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-600">
                                  {ex.explanation}
                                </p>
                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  {/* Submission Action Button (Active when not submitted and not locked) */}
                  {!isBatchSubmitted && !(lockExpiresAt && timeRemaining > 0) && (
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>
                          উত্তর দেওয়া হয়েছে: {Object.keys(userAnswers).filter(k => (userAnswers[Number(k)] || '').trim()).length} / {activeExercises.length}
                        </span>
                        <span className="text-[#E11D48] font-bold">
                          শর্ত: ৮০% সঠিক উত্তর দিতে হবে
                        </span>
                      </div>

                      <button
                        disabled={Object.keys(userAnswers).filter(k => (userAnswers[Number(k)] || '').trim()).length < activeExercises.length}
                        onClick={handleSubmitAllAnswers}
                        className="w-full py-3.5 bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>সব প্রশ্নের উত্তর দিয়ে ফলাফল যাচাই করুন</span>
                      </button>
                    </div>
                  )}

                  {/* PASSED Result Banner (Score >= 80%) */}
                  {isBatchSubmitted && quizResult && quizResult.passed && (
                    <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl shadow-lg space-y-3 animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-amber-300 animate-bounce" />
                        <span className="font-black text-sm sm:text-base">
                          অভিনন্দন! আপনি {quizResult.percent}% স্কোর পেয়ে উত্তীর্ণ হয়েছেন!
                        </span>
                      </div>
                      <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                        আপনার প্রাপ্ত নম্বর: {quizResult.score} / {quizResult.total} ({quizResult.percent}%)। আপনি ৮০% বা ততোধিক সঠিক উত্তর দেওয়ায় পরবর্তী সেশন সফলভাবে আনলক করা হয়েছে।
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {nextLesson ? (
                          <button
                            onClick={() => handleUnlockAndGoNext(nextLesson.id)}
                            className="px-5 py-3 bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer transform hover:scale-105"
                          >
                            <span>নেক্সট সেশনে যান ({nextLesson.bengaliTitle.split('(')[0]})</span>
                            <ArrowRight className="w-4 h-4 text-emerald-600" />
                          </button>
                        ) : (
                          <div className="text-xs font-black text-amber-200">
                            🎉 আপনি এই একাডেমির সকল লেসন সফলভাবে সম্পন্ন করেছেন!
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setViewMode('list');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-4 py-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl border border-white/20 transition-all cursor-pointer"
                        >
                          লেসন তালিকায় ফিরে যান
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FAILED Result Banner (Score < 80%) */}
                  {isBatchSubmitted && quizResult && !quizResult.passed && (
                    <div className="p-5 bg-gradient-to-r from-rose-600 to-red-700 text-white rounded-3xl shadow-lg space-y-3 animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-amber-300" />
                        <span className="font-black text-sm sm:text-base">
                          স্কোর ৮০% এর কম ({quizResult.percent}%) — পরবর্তী সেশন আনলক হয়নি
                        </span>
                      </div>
                      <p className="text-xs text-rose-100 leading-relaxed font-medium">
                        আপনার প্রাপ্ত স্কোর: {quizResult.score} / {quizResult.total} ({quizResult.percent}%)। পরবর্তী সেশন আনলক করতে ন্যূনতম ৮০% প্রয়োজন। নিয়ম অনুযায়ী আগামী ১০ মিনিটের জন্য পরীক্ষা বন্ধ থাকবে।
                      </p>

                      <div className="p-3 bg-rose-900/60 rounded-xl border border-rose-500/40 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-200">
                          <BookOpen className="w-4 h-4" />
                          <span>এই লেসনটি আবার পড়ার নির্দেশ (আনলিমিটেড নতুন প্রশ্ন সেট):</span>
                        </div>
                        <p className="text-[11px] text-rose-100 leading-relaxed">
                          বামপাশের ক্লাসরুমে গিয়ে এই লেসনের নিয়ম ও ব্যাখ্যাগুলো আবার শুরু থেকে মনোযোগ দিয়ে পড়ুন। ১০ মিনিট পর পুনরায় পরীক্ষা দিলে আনলিমিটেড এআই ইঞ্জিন থেকে আপনার জন্য <strong>সম্পূর্ণ নতুন ও ভিন্ন প্রশ্ন সেট (Attempt #{attemptCount})</strong> স্বয়ংক্রিয়ভাবে উপস্থাপিত হবে।
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                        <span className="text-xs font-mono font-bold text-amber-200 bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-500/50">
                          ⏳ পুনরায় কুইজ দেওয়ার সময় বাকি: {formatCountdown(timeRemaining)}
                        </span>

                        <button
                          onClick={handleBypassCooldown}
                          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold rounded-lg border border-white/30 transition-all cursor-pointer"
                          title="শিক্ষক মোডে ১০ মিনিটের লক রিসেট করুন"
                        >
                          লক রিসেট করুন (শিক্ষক মোড)
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: IN-LESSON SOCRATIC AI TUTOR (WITH ANTI-CHEAT INTEGRITY) */}
              {activeTab === 'tutor' && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col h-[580px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#E11D48]">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-slate-900">ইন-লেসন টিউটর চ্যাট</h3>
                        <p className="text-[10px] text-slate-400">অ্যান্টি-চিট গার্ডরেল সক্রিয়</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                      Online
                    </span>
                  </div>

                  {/* Chat Messages Log */}
                  <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
                    {chatMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                            msg.sender === 'student'
                              ? 'bg-[#E11D48] text-white rounded-tr-none'
                              : msg.isAlert
                                ? 'bg-amber-50 border border-amber-300 text-amber-950 rounded-tl-none font-sans'
                                : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none font-sans'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTutorTyping && (
                      <div className="flex justify-start">
                        <div className="p-2.5 bg-slate-50 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Prompt Suggestions */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 shrink-0 pb-2">
                    {[
                      'Stative Verb ki?',
                      'Transitive vs Intransitive?',
                      'Causative Verbs er udahoron?',
                      '১ নম্বর প্রশ্নের উত্তর কি?'
                    ].map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setChatInput(sug);
                        }}
                        className="px-2 py-1 bg-slate-100 hover:bg-rose-50 text-[10px] font-bold text-slate-600 hover:text-[#E11D48] rounded-lg transition-colors text-left"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 shrink-0">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendTutorMessage()}
                      placeholder="নিয়ম না বুঝলে প্রশ্ন করুন..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-[#E11D48]"
                    />
                    <button
                      onClick={handleSendTutorMessage}
                      disabled={!chatInput.trim()}
                      className="p-2 bg-[#E11D48] disabled:bg-slate-200 text-white rounded-xl transition-colors shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
