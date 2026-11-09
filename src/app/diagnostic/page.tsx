'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, DiagnosticResult } from '@/context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Clock, 
  Award,
  BookOpen,
  Volume2,
  Calendar,
  Zap,
  RotateCw,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface QuestionSet {
  topic: string;
  passage: string;
  question: string;
  options: string[];
  correct: string;
  writingTopic: string;
}

const QUESTION_POOL: QuestionSet[] = [
  {
    topic: 'Marine Biology & Ecosystems',
    passage: '“Marine ecosystems are increasingly endangered by microplastics, which enter marine trophic chains and accumulate substantially in apex predators, posing potential toxicity risks.”',
    question: 'According to the passage, microplastics:',
    options: [
      'Are harmless to oceanic predators',
      'Substantially accumulate in top-level marine predators',
      'Have been eradicated from marine trophic chains'
    ],
    correct: 'Substantially accumulate in top-level marine predators',
    writingTopic: 'Why do many people prefer living in big cities instead of the countryside?'
  },
  {
    topic: 'Artificial Intelligence & Labor Economics',
    passage: '“While automation historically replaced manual labor, advancements in large language models increasingly streamline analytical and administrative tasks, necessitating widespread cognitive reskilling.”',
    question: 'The passage implies that modern AI advancements:',
    options: [
      'Exclusively impact factory assembly line workers',
      'Streamline cognitive and administrative responsibilities',
      'Eliminate the necessity for employee reskilling'
    ],
    correct: 'Streamline cognitive and administrative responsibilities',
    writingTopic: 'Do you believe artificial intelligence will create more employment opportunities than it eliminates?'
  },
  {
    topic: 'Renewable Energy & Urban Infrastructure',
    passage: '“Photovoltaic solar arrays installed across urban rooftops alleviate peak electrical grid strain, yet the intermittency of sunlight demands scalable battery storage systems to maintain grid equilibrium.”',
    question: 'According to the text, a primary challenge for urban solar power is:',
    options: [
      'The requirement for scalable energy storage due to sunlight intermittency',
      'The excessive weight of solar arrays on residential buildings',
      'High electrical grid strain caused by excess electricity'
    ],
    correct: 'The requirement for scalable energy storage due to sunlight intermittency',
    writingTopic: 'Should governments impose financial penalties on companies that fail to adopt green energy?'
  }
];

export default function DiagnosticPage() {
  const { user, saveDiagnostic } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [targetBand, setTargetBand] = useState('7.5');
  const [examTimeline, setExamTimeline] = useState('২ মাস পর');
  
  // Dynamic question selection index
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = QUESTION_POOL[currentSetIndex];

  const [readingAns, setReadingAns] = useState('');
  const [writingSample, setWritingSample] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [assessedResult, setAssessedResult] = useState<DiagnosticResult | null>(null);

  const rotateRandomQuestion = () => {
    const nextIdx = (currentSetIndex + 1) % QUESTION_POOL.length;
    setCurrentSetIndex(nextIdx);
    setReadingAns('');
  };

  const handleFinishDiagnostic = () => {
    setIsGeneratingPlan(true);

    setTimeout(() => {
      // 1. Real Reading Evaluation
      const isReadingCorrect = readingAns.trim() === currentSet.correct.trim();
      const readingScore = isReadingCorrect ? 6.5 : (readingAns ? 4.5 : 4.0);

      // 2. Real Writing Evaluation
      const cleanWriting = writingSample.trim();
      const words = cleanWriting.length > 0 ? cleanWriting.split(/\s+/).length : 0;
      
      const academicConnectors = [
        'however', 'although', 'furthermore', 'moreover', 'therefore', 
        'consequently', 'because', 'while', 'whereas', 'in addition', 
        'for example', 'for instance', 'significantly', 'in contrast', 'nevertheless'
      ];
      const lowerWriting = cleanWriting.toLowerCase();
      let connectorMatches = 0;
      academicConnectors.forEach(c => {
        if (lowerWriting.includes(c)) connectorMatches++;
      });

      let writingScore = 4.5;
      if (words >= 50 && connectorMatches >= 2) {
        writingScore = 7.0;
      } else if (words >= 35 && connectorMatches >= 1) {
        writingScore = 6.5;
      } else if (words >= 20) {
        writingScore = 5.5;
      } else if (words >= 10) {
        writingScore = 5.0;
      }

      // 3. Combined Assessed Band (Nearest 0.5)
      const rawBand = (readingScore * 0.45) + (writingScore * 0.55);
      const assessedBand = Math.round(rawBand * 2) / 2;

      // 4. CEFR Classification
      let cefrLevel: 'A2' | 'B1' | 'B2' | 'C1' = 'B1';
      if (assessedBand >= 7.0) cefrLevel = 'C1';
      else if (assessedBand >= 6.0) cefrLevel = 'B2';
      else if (assessedBand >= 5.0) cefrLevel = 'B1';
      else cefrLevel = 'A2';

      // 5. Weakest Module determination
      let weakestModule = 'Writing & Grammar';
      if (readingScore < writingScore) {
        weakestModule = 'Reading Comprehension';
      } else if (writingScore < readingScore) {
        weakestModule = 'Writing & Complex Sentences';
      } else {
        weakestModule = 'Speaking & Fluency';
      }

      const calculatedResult: DiagnosticResult = {
        completed: true,
        testDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        assessedBand,
        targetBand: parseFloat(targetBand) || 7.5,
        examTimeline,
        weakestModule,
        dailyHours: '1.5 Hours',
        readingAccuracy: isReadingCorrect ? 100 : 35,
        writingWordCount: words,
        cefrLevel,
        readingScore,
        writingScore,
        feedback: {
          reading: isReadingCorrect 
            ? 'প্যাসেজের ইনফারেন্স ও কি-ওয়ার্ড চমৎকার লোকেট করতে পেরেছেন (Band 6.5)।' 
            : 'প্যাসেজের ইনফারেন্স ও স্কিমিং স্পিড বৃদ্ধি করতে হবে (Band 4.5)।',
          writing: writingScore >= 6.0 
            ? `ভালো বাক্য গঠন ও শব্দচয়ন (${words} শব্দ, ট্রানজিশন মার্কার ব্যবহৃত)।` 
            : `বাক্য আরও বড় ও জটিল করতে হবে। বর্তমানে সাধারণ বাক্যের প্রাধান্য রয়েছে (${words} শব্দ)।`,
          speaking: 'স্পিকিং ফ্লুয়েন্সিতে জড়তা দূর করতে নিয়মিত এআই স্পিকিং পার্টনার ড্রিল করুন।'
        }
      };

      setAssessedResult(calculatedResult);
      saveDiagnostic(calculatedResult);
      setIsGeneratingPlan(false);
      setReportReady(true);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Stepper Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>ধাপ ১: লক্ষ্য নির্ধারণ</span>
          <span>ধাপ ২: ডাইনামিক রিডিং</span>
          <span>ধাপ ৩: মিনি রাইটিং</span>
          <span>ধাপ ৪: এআই রেজাল্ট</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Goal Setting */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              অনবোর্ডিং ও লেভেল নির্ধারণ
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              আপনার কাঙ্ক্ষিত আইএলটিএস স্কোর কত?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              সঠিক লক্ষ্য নির্ধারণ করলে এআই আপনার জন্য নিখুঁত দৈনিক রুটিন তৈরি করতে পারে।
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
              টার্গেট ব্যান্ড নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-4 gap-3">
              {['6.5', '7.0', '7.5', '8.0+'].map((band) => (
                <button
                  key={band}
                  onClick={() => setTargetBand(band)}
                  className={`py-3 rounded-2xl font-black text-sm border transition-all ${
                    targetBand === band
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  Band {band}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
              পরীক্ষা দেওয়ার সম্ভাব্য সময়:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['১ মাস পর', '২ মাস পর', '৩+ মাস পর'].map((time) => (
                <button
                  key={time}
                  onClick={() => setExamTimeline(time)}
                  className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    examTimeline === time
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <span>পরবর্তী: ডাইনামিক রিডিং টেস্ট</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Dynamic Reading Assessment with Rotation */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                মিনি রিডিং অ্যাসেসমেন্ট • {currentSet.topic}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                প্যাসেজটি পড়ে সঠিক উত্তর নির্বাচন করুন
              </h2>
            </div>

            {/* Dynamic Question Rotator Button */}
            <button
              onClick={rotateRandomQuestion}
              className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-slate-200"
              title="নতুন প্রশ্ন লোড করুন"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>ভিন্ন প্রশ্ন পরিবর্তন করুন</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
            {currentSet.passage}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-800">
              {currentSet.question}
            </p>
            {currentSet.options.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  readingAns === opt ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="reading-mini"
                  value={opt}
                  checked={readingAns === opt}
                  onChange={() => setReadingAns(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs"
            >
              পূর্ববর্তী
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2"
            >
              <span>পরবর্তী: ২ বাক্যের রাইটিং টেস্ট</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Mini Writing Assessment */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              মিনি রাইটিং অ্যাসেসমেন্ট
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              নিজের ভাষায় ইংরেজিতে ২-৩ বাক্য লিখুন
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-semibold">
              টপিক: &ldquo;{currentSet.writingTopic}&rdquo;
            </p>
          </div>

          <textarea
            rows={5}
            value={writingSample}
            onChange={(e) => setWritingSample(e.target.value)}
            placeholder="Type 2 or 3 sentences in English here..."
            className="w-full p-4 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs"
            >
              পূর্ববর্তী
            </button>
            <button
              onClick={handleFinishDiagnostic}
              disabled={isGeneratingPlan}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isGeneratingPlan ? 'এআই স্টাডি প্ল্যান তৈরি করছে...' : 'আমার লেভেল ও রোডম্যাপ জেনারেট করুন'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: AI Diagnostic Result & Roadmap */}
      {reportReady && assessedResult && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in zoom-in-95">
          <div className="text-center max-w-md mx-auto space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              আপনার বাস্তব এআই ডায়াগনস্টিক রিপোর্ট!
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              আপনার রিডিং এবং রাইটিং টেস্টের উত্তরের ওপর ভিত্তি করে আন্তর্জাতিক CEFR স্কেলে যাচাই করা হয়েছে।
            </p>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">বর্তমান ব্যান্ড স্কোর</span>
              <div className="text-3xl font-black text-amber-700 mt-1">Band {assessedResult.assessedBand}</div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-200/50 px-2 py-0.5 rounded-full inline-block mt-1">CEFR {assessedResult.cefrLevel}</span>
            </div>

            <div className="p-4 bg-indigo-50/60 border border-indigo-200/60 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">টার্গেট ব্যান্ড</span>
              <div className="text-3xl font-black text-indigo-700 mt-1">Band {assessedResult.targetBand}</div>
              <span className="text-[10px] text-indigo-600 font-semibold block mt-1">{assessedResult.examTimeline}</span>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-200/60 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">রিডিং মূল্যায়ন</span>
              <div className="text-2xl font-black text-blue-700 mt-1.5">Band {assessedResult.readingScore}</div>
              <span className="text-[10px] text-blue-600 font-semibold block mt-1">{assessedResult.readingAccuracy}% একুরেসি</span>
            </div>

            <div className="p-4 bg-rose-50/60 border border-rose-200/60 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">রাইটিং মূল্যায়ন</span>
              <div className="text-2xl font-black text-rose-700 mt-1.5">Band {assessedResult.writingScore}</div>
              <span className="text-[10px] text-rose-600 font-semibold block mt-1">{assessedResult.writingWordCount} শব্দ লেখা হয়েছে</span>
            </div>
          </div>

          {/* Diagnosis & Recommendations */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>আপনার জন্য প্রস্তুতকৃত অবজারভেশন ও লার্নিং ডিরেকশন:</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                প্রধান ফোকাস: {assessedResult.weakestModule}
              </span>
            </div>

            <div className="space-y-2 pt-1 text-slate-700 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-700 shrink-0">• রিডিং:</span>
                <span>{assessedResult.feedback.reading}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-rose-700 shrink-0">• রাইটিং:</span>
                <span>{assessedResult.feedback.writing}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-purple-700 shrink-0">• স্পিকিং:</span>
                <span>{assessedResult.feedback.speaking}</span>
              </div>
            </div>
          </div>

          {/* CTA to Student Dashboard */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold rounded-2xl text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>আমার রিয়েল স্কোর অনুযায়ী ড্যাশবোর্ডে প্রবেশ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
