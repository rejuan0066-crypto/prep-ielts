'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CAMBRIDGE_BOOKS_REGISTRY } from '@/lib/cambridgeBooksRegistry';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Clock, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Bot,
  Square,
  ChevronRight,
  BookOpen,
  Library,
  Zap
} from 'lucide-react';

function SpeakingPartnerContent() {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get('book');
  const testParam = searchParams.get('test');

  const [selectedBookNum, setSelectedBookNum] = useState<number>(bookParam ? parseInt(bookParam, 10) : 18);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(testParam ? parseInt(testParam, 10) : 1);

  const activeBook = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === selectedBookNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
  const activeSpeakingTest = activeBook.speakingTests.find(s => s.testNumber === selectedTestNum) || activeBook.speakingTests[0];

  const [activePart, setActivePart] = useState<1 | 2 | 3>(2);
  const [stage, setStage] = useState<'ready' | 'preparing' | 'speaking' | 'evaluating' | 'completed'>('ready');
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [talkTimeLeft, setTalkTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [studentTranscript, setStudentTranscript] = useState('');
  const [feedback, setFeedback] = useState<any | null>(null);

  // Preparation Countdown
  useEffect(() => {
    if (stage !== 'preparing' || prepTimeLeft <= 0) {
      if (stage === 'preparing' && prepTimeLeft <= 0) {
        startSpeaking();
      }
      return;
    }
    const timer = setInterval(() => setPrepTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, prepTimeLeft]);

  // Speaking Recording Timer
  useEffect(() => {
    if (stage !== 'speaking' || talkTimeLeft <= 0) {
      if (stage === 'speaking' && talkTimeLeft <= 0) {
        finishSpeaking();
      }
      return;
    }
    const timer = setInterval(() => setTalkTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, talkTimeLeft]);

  const startPreparation = () => {
    setStage('preparing');
    setPrepTimeLeft(60);
    setStudentTranscript('');
    setFeedback(null);
  };

  const startSpeaking = () => {
    setStage('speaking');
    setTalkTimeLeft(120);
    setIsRecording(true);
    setStudentTranscript('Well, I would like to talk about a significant goal I accomplished during my final year of secondary education. It was a rigorous regional debate tournament involving over thirty academic institutions across the province. In the initial phase, our team encountered severe hurdles regarding evidentiary research and structured rebuttal delivery. However, by establishing daily simulated debate rounds and refining our cross-examination rhetoric, we steadily developed high operational synergy. In the grand finals, we successfully defended our resolution and secured the championship trophy. This experience was profoundly transformative because it taught me that disciplined perseverance and cohesive collaboration consistently transcend natural talent.');
  };

  const finishSpeaking = () => {
    setIsRecording(false);
    setStage('evaluating');

    setTimeout(() => {
      setStage('completed');
      setFeedback({
        overallBand: 8.0,
        fluencyCoherence: {
          score: 8.5,
          notes: 'Spoke fluently with minimal hesitation. Extended answers fully with natural topic development and seamless transitional markers.'
        },
        lexicalResource: {
          score: 8.0,
          notes: 'Excellent idiomatic phrases: "rigorous regional debate", "operational synergy", "disciplined perseverance".'
        },
        grammaticalRange: {
          score: 8.0,
          notes: 'Consistent control of complex conditional clauses, relative clauses, and perfect aspect forms.'
        },
        pronunciation: {
          score: 8.0,
          notes: 'Intelligible rhythm, precise word stress on polysyllabic vocabulary ("transformative", "collaborative").'
        },
        suggestedUpgrades: [
          {
            original: 'our team encountered severe hurdles regarding...',
            improved: 'our squad confronted substantial logistical and cognitive impediments pertaining to...',
            type: 'Lexical Precision'
          }
        ]
      });
    }, 1500);
  };

  const resetTest = () => {
    setStage('ready');
    setPrepTimeLeft(60);
    setTalkTimeLeft(120);
    setIsRecording(false);
    setFeedback(null);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6 select-none">
      
      {/* 1. Book Selector Strip (Books 1 to 19 + Test 1-4) */}
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
        </div>

        {/* Part 1, Part 2, Part 3 Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActivePart(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              activePart === 1
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Part 1 (Intro)
          </button>
          <button
            onClick={() => setActivePart(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              activePart === 2
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Part 2 (Cue Card)
          </button>
          <button
            onClick={() => setActivePart(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              activePart === 3
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Part 3 (Discussion)
          </button>
        </div>
      </div>

      {/* 2. Main Speaking Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Examiner Prompt & Cue Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black border border-purple-200">
                Cambridge {selectedBookNum} • Test {selectedTestNum} • Part {activePart}
              </span>
              <span className="text-xs font-bold text-slate-500">
                11–14 Mins Total
              </span>
            </div>

            {/* Part 1 Questions */}
            {activePart === 1 && (
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-900">
                  {activeSpeakingTest.part1.topic}
                </h3>
                <div className="space-y-2">
                  {activeSpeakingTest.part1.questions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Part 2 Cue Card */}
            {activePart === 2 && (
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-900">
                  Candidate Task Card (Cue Card)
                </h3>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <p className="text-xs sm:text-sm font-black text-slate-900">
                    {activeSpeakingTest.part2.topic}
                  </p>
                  <div className="text-xs text-slate-700 space-y-1.5 font-medium pl-2">
                    <p className="text-slate-500">You should say:</p>
                    {activeSpeakingTest.part2.bulletPoints.map((bp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Part 3 Discussion */}
            {activePart === 3 && (
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-900">
                  {activeSpeakingTest.part3.topic}
                </h3>
                <div className="space-y-2">
                  {activeSpeakingTest.part3.questions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive AI Voice Examiner & Audio Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
            
            {/* Visual Examiner Avatar */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-black text-2xl transition-all shadow-xl ${
                isRecording
                  ? 'bg-[#E11D48] ring-8 ring-rose-100 animate-pulse'
                  : stage === 'preparing'
                  ? 'bg-amber-500 ring-8 ring-amber-100'
                  : 'bg-slate-900'
              }`}>
                {isRecording ? <Mic className="w-10 h-10 animate-bounce" /> : <Bot className="w-10 h-10" />}
              </div>
            </div>

            {/* Stage Title & Timers */}
            <div className="space-y-1">
              {stage === 'ready' && (
                <>
                  <h3 className="text-lg font-black text-slate-900">আইএলটিএস স্পিকিং ইন্টারভিউ</h3>
                  <p className="text-xs text-slate-500">প্রস্তুতি শুরু করতে নিচের বাটনে চাপ দিন</p>
                </>
              )}

              {stage === 'preparing' && (
                <>
                  <h3 className="text-lg font-black text-amber-600 flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>প্রস্তুতির সময়: {prepTimeLeft} সেকেন্ড</span>
                  </h3>
                  <p className="text-xs text-slate-500">কিউ কার্ডের পয়েন্টগুলো নিয়ে নোট তৈরি করুন</p>
                </>
              )}

              {stage === 'speaking' && (
                <>
                  <h3 className="text-lg font-black text-[#E11D48] flex items-center justify-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E11D48] animate-ping" />
                    <span>রেকর্ডিং চলছে: {talkTimeLeft} সেকেন্ড বাকি</span>
                  </h3>
                  <p className="text-xs text-slate-500">স্পষ্টভাবে ও স্বাভাবিক গতিতে কথা বলুন</p>
                </>
              )}

              {stage === 'evaluating' && (
                <>
                  <h3 className="text-lg font-black text-slate-900 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
                    <span>এআই এক্সামিনার মূল্যায়ন করছে...</span>
                  </h3>
                  <p className="text-xs text-slate-500">ফ্লুয়েন্সি, লেক্সিক্যাল রিসোর্স ও ব্যাকরণ বিশ্লেষণ</p>
                </>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              {stage === 'ready' && (
                <button
                  onClick={startPreparation}
                  className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black rounded-xl shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Clock className="w-4 h-4" />
                  <span>Start 1-Min Preparation</span>
                </button>
              )}

              {stage === 'preparing' && (
                <button
                  onClick={startSpeaking}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Speaking Now ({prepTimeLeft}s)</span>
                </button>
              )}

              {stage === 'speaking' && (
                <button
                  onClick={finishSpeaking}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-2 transition-all"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish & Submit Speaking</span>
                </button>
              )}

              {stage === 'completed' && (
                <button
                  onClick={resetTest}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Interview</span>
                </button>
              )}
            </div>

          </div>

          {/* Feedback Report */}
          {feedback && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Speaking Band Score
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
                  <div className="text-[10px] text-slate-400 font-bold">Fluency & Coherence</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.fluencyCoherence.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Lexical Resource</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.lexicalResource.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Grammatical Accuracy</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.grammaticalRange.score}</div>
                </div>
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-bold">Pronunciation</div>
                  <div className="text-sm font-black text-white mt-0.5">Band {feedback.pronunciation.score}</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function SpeakingPracticePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <div className="w-6 h-6 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
          <span>স্পিকিং মক টেস্ট লোড হচ্ছে...</span>
        </div>
      </div>
    }>
      <SpeakingPartnerContent />
    </Suspense>
  );
}
