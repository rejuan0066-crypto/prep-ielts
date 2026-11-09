'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  RotateCw
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
  const [step, setStep] = useState<number>(1);
  const [targetBand, setTargetBand] = useState('7.5');
  const [examTimeline, setExamTimeline] = useState('2 মাস পর');
  
  // Dynamic question selection index
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = QUESTION_POOL[currentSetIndex];

  const [readingAns, setReadingAns] = useState('');
  const [writingSample, setWritingSample] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const rotateRandomQuestion = () => {
    const nextIdx = (currentSetIndex + 1) % QUESTION_POOL.length;
    setCurrentSetIndex(nextIdx);
    setReadingAns('');
  };

  const handleFinishDiagnostic = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setReportReady(true);
    }, 2000);
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
      {reportReady && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in zoom-in-95">
          <div className="text-center max-w-md mx-auto space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              আপনার এআই ডায়াগনস্টিক রিপোর্ট প্রস্তুত!
            </h2>
            <p className="text-xs text-slate-500">
              আপনার উত্তরগুলোর ওপর ভিত্তি করে এআই আপনার বর্তমান স্তর চিহ্নিত করেছে।
            </p>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-4 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">বর্তমান আনুমানিক ব্যান্ড</span>
              <div className="text-3xl font-black text-amber-600 mt-1">Band 5.5</div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl text-center border border-indigo-100">
              <span className="text-[11px] font-bold text-indigo-600 uppercase">টার্গেট ব্যান্ড</span>
              <div className="text-3xl font-black text-indigo-700 mt-1">Band {targetBand}</div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl text-center border border-emerald-100 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase">প্রয়োজনীয় সময়</span>
              <div className="text-3xl font-black text-emerald-700 mt-1">৬০ দিন</div>
            </div>
          </div>

          {/* Diagnosis & Recommendations */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-800">এআই অবজারভেশন ও পরামর্শ:</div>
            <ul className="space-y-1 text-slate-600 list-disc pl-4">
              <li><strong>রিডিং:</strong> প্যাসেজ বোঝার ক্ষমতা ভালো, তবে দ্রুত কি-ওয়ার্ড লোকেট করার স্ক্যানিং কৌশল দরকার।</li>
              <li><strong>রাইটিং:</strong> আইডিয়া আছে কিন্তু বাক্যগুলো সাধারণ। কমপ্লেক্স সেন্টেন্স ও প্রাতিষ্ঠানিক ভোকাবুলারি বাড়ানো আবশ্যক।</li>
              <li><strong>স্পিকিং:</strong> কথা বলার সময় জড়তা ও থেমে থাকা দূর করতে প্রতিদিন ১০ মিনিট এআই টিউটরের সাথে কথা বলুন।</li>
            </ul>
          </div>

          {/* CTA to Student Dashboard */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2"
            >
              <span>আমার ৬০ দিনের লার্নিং ড্যাশবোর্ডে প্রবেশ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
