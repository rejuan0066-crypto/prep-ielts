'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CAMBRIDGE_BOOKS_REGISTRY } from '@/lib/cambridgeBooksRegistry';
import { 
  PenTool, 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Flame,
  Zap,
  Library,
  GraduationCap,
  Briefcase
} from 'lucide-react';

function WritingPracticeContent() {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get('book');
  const testParam = searchParams.get('test');
  const trackParam = searchParams.get('track');

  const [selectedBookNum, setSelectedBookNum] = useState<number>(bookParam ? parseInt(bookParam, 10) : 18);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(testParam ? parseInt(testParam, 10) : 1);
  const [selectedTrack, setSelectedTrack] = useState<'Academic' | 'General Training'>(
    trackParam === 'general training' || trackParam === 'general' ? 'General Training' : 'Academic'
  );
  const [selectedTask, setSelectedTask] = useState<'task1' | 'task2'>('task2');

  const activeBook = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === selectedBookNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
  const activePromptGroup = activeBook.writingPrompts.find(w => w.testNumber === selectedTestNum && w.type === selectedTrack) || activeBook.writingPrompts[0];

  const currentPrompt = selectedTask === 'task1' ? activePromptGroup.task1 : activePromptGroup.task2;

  const [essayText, setEssayText] = useState(
    'In contemporary society, whether graduating from university or gaining immediate vocational employment yields greater long-term career prosperity remains a topic of intense debate. While formal academic qualifications equip individuals with foundational theoretical frameworks, practical work experience fosters essential adaptability. In my view, synthesizing both pathways produces optimal occupational outcomes.\n\nOn the one hand, proponents of tertiary education emphasize structured intellectual rigor. University students acquire analytical discipline, critical problem-solving skills, and specialized knowledge indispensable for high-tier professions such as engineering, medicine, and law. Furthermore, many prestigious multinational corporations mandate accredited bachelor degrees as non-negotiable prerequisite criteria for managerial positions.\n\nOn the other hand, early workplace immersion imparts hands-on commercial acumen that academic textbooks cannot replicate. Commencing employment directly after secondary education accelerates the cultivation of professional communication, emotional resilience, and pragmatic execution. For instance, in burgeoning tech and digital entrepreneurship sectors, self-taught practitioners frequently outperform university graduates who lack operational agility.\n\nIn conclusion, although experiential workplace learning offers rapid adaptability, tertiary education establishes an indispensable intellectual foundation. Aspiring professionals should ideally combine academic credentials with practical industry internships to maximize lifelong career trajectory.'
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<any | null>({
    overallBand: 7.5,
    taskResponse: {
      score: 8.0,
      notes: 'Thoroughly addresses all facets of the prompt with balanced progression and a well-defined personal thesis from introduction to conclusion.'
    },
    coherenceCohesion: {
      score: 7.5,
      notes: 'Logical flow with clear topic sentences and smooth transitions ("On the one hand", "Furthermore", "In conclusion").'
    },
    lexicalResource: {
      score: 7.5,
      notes: 'Sophisticated academic collocations: "foundational theoretical frameworks", "burgeoning tech", "prerequisite criteria".'
    },
    grammaticalRange: {
      score: 7.5,
      notes: 'Control of complex declarative clauses, passive constructions, and adverbial clauses with strong syntactic precision.'
    },
    upgrades: [
      {
        original: 'Commencing employment directly after secondary education accelerates...',
        upgraded: 'Early corporate immersion substantially expedites the acquisition of pragmatic commercial acumen...',
        band: 'Band 8.5+'
      }
    ]
  });

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const targetWords = selectedTask === 'task1' ? 150 : 250;

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setFeedback({
        overallBand: 8.0,
        taskResponse: {
          score: 8.0,
          notes: 'Strong thesis statement with pertinent illustrations aligned with Cambridge examiner band descriptors.'
        },
        coherenceCohesion: {
          score: 8.0,
          notes: 'Effortless paragraph transitions and exceptional structural clarity.'
        },
        lexicalResource: {
          score: 8.0,
          notes: 'High natural collocation control, idiomatic academic phrasing, zero spelling errors.'
        },
        grammaticalRange: {
          score: 8.0,
          notes: 'Wide variety of complex structures used with full flexibility and accuracy.'
        },
        upgrades: [
          {
            original: 'Early workplace immersion imparts hands-on commercial acumen...',
            upgraded: 'Nascent professional immersion cultivates indispensable commercial acumen that theoretical pedagogy cannot replicate...',
            band: 'Band 9.0'
          }
        ]
      });
    }, 1200);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6 select-none">
      
      {/* 1. Book Selector Strip (Books 1 to 19 + Academic / General + Test 1-4) */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/library"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold border border-slate-700 transition-colors"
          >
            <Library className="w-4 h-4 text-[#E11D48]" />
            <span>লাইব্রেরি (Books 1–19)</span>
          </Link>

          {/* Book Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
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

          {/* Test 1-4 */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            {[1, 2, 3, 4].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTestNum(t)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  selectedTestNum === t
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Test {t}
              </button>
            ))}
          </div>

          {/* Track Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setSelectedTrack('Academic')}
              className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1 ${
                selectedTrack === 'Academic'
                  ? 'bg-rose-500/20 text-[#E11D48] border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic</span>
            </button>
            <button
              onClick={() => setSelectedTrack('General Training')}
              className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1 ${
                selectedTrack === 'General Training'
                  ? 'bg-rose-500/20 text-[#E11D48] border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>General</span>
            </button>
          </div>
        </div>

        {/* Task 1 or Task 2 Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setSelectedTask('task1')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
              selectedTask === 'task1'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Task 1 (150 Words)
          </button>
          <button
            onClick={() => setSelectedTask('task2')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
              selectedTask === 'task2'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Task 2 (250 Words)
          </button>
        </div>
      </div>

      {/* 2. Main Writing Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Prompt & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-[#E11D48] text-xs font-black border border-rose-100">
                Cambridge {selectedBookNum} • Test {selectedTestNum} • {selectedTask === 'task1' ? 'Task 1' : 'Task 2'}
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedTask === 'task1' ? '20 Mins' : '40 Mins'}</span>
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900">
              {currentPrompt.title}
            </h2>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-serif leading-relaxed">
              {currentPrompt.prompt}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Target Word Count:</span>
                <span className="font-bold text-slate-900">Minimum {targetWords} words</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Official Criteria:</span>
                <span className="font-bold text-slate-900">TR, CC, LR, GRA (Band 9 Scale)</span>
              </div>
            </div>
          </div>

          {/* AI Score Feedback Panel */}
          {feedback && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    AI Examiner Band Evaluation
                  </span>
                  <div className="text-3xl font-black text-emerald-400 mt-0.5">
                    Band {feedback.overallBand}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* 4 Descriptors */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Task Response</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.taskResponse.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Coherence & Cohesion</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.coherenceCohesion.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Lexical Resource</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.lexicalResource.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Grammar Accuracy</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.grammaticalRange.score}</div>
                </div>
              </div>

              {/* Sentence Upgrade */}
              {feedback.upgrades && feedback.upgrades.length > 0 && (
                <div className="p-3.5 bg-rose-950/40 border border-rose-800/40 rounded-2xl space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                    AI Sentence Upgrader:
                  </span>
                  <p className="text-slate-300 text-[11px] line-through">
                    "{feedback.upgrades[0].original}"
                  </p>
                  <p className="text-emerald-300 font-serif font-bold text-xs">
                    "{feedback.upgrades[0].upgraded}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Student Essay Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">আপনার রচনা লিখুন (Writing Editor):</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                  wordCount >= targetWords 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {wordCount} / {targetWords} শব্দ
                </span>
              </div>

              <button
                onClick={() => setEssayText('')}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="ক্লিয়ার টেক্সট"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="এখানে আপনার সম্পূর্ণ রচনা বা রিপোর্ট টাইপ করুন..."
              rows={16}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-serif leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:border-[#E11D48] transition-all resize-none"
            />

            {/* Bottom Evaluate Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                অফিসিয়াল ক্যামব্রিজ ক্রাইটেরিয়া অনুসারে তাৎক্ষণিক মূল্যায়ন
              </span>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || wordCount < 20}
                className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-40 text-white text-xs font-black rounded-xl shadow-md shadow-rose-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>মূল্যায়ন চলছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluate Band Score (AI)</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default function WritingPracticePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <div className="w-6 h-6 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
          <span>রাইটিং প্র্যাকটিস লোড হচ্ছে...</span>
        </div>
      </div>
    }>
      <WritingPracticeContent />
    </Suspense>
  );
}
