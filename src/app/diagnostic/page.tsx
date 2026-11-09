'use client';

import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  Layers,
  GraduationCap,
  ShieldCheck,
  Check
} from 'lucide-react';

interface DiagnosticQuestion {
  id: number;
  level: 'Basic (A2)' | 'Intermediate (B1)' | 'Upper-Intermediate (B2)' | 'Advanced (C1)';
  bandTarget: string;
  category: 'Grammar' | 'Vocabulary' | 'Reading Comprehension' | 'Sentence Structure' | 'Inference';
  passage?: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const PROGRESSIVE_QUESTIONS: DiagnosticQuestion[] = [
  // 1. Basic (A2 / Band 4.0 - 4.5) - Grammar Foundation
  {
    id: 1,
    level: 'Basic (A2)',
    bandTarget: 'Band 4.0–4.5',
    category: 'Grammar',
    question: 'Choose the correct form of the verb: "Neither the professor nor his students _____ present at the international seminar yesterday."',
    options: ['was', 'were', 'is', 'are'],
    correct: 'were',
    explanation: 'When subjects are connected by "neither... nor", the verb agrees with the closer subject ("students" = plural, past tense "were").'
  },
  // 2. Basic (A2 / Band 4.5 - 5.0) - Preposition & Collocation
  {
    id: 2,
    level: 'Basic (A2)',
    bandTarget: 'Band 4.5–5.0',
    category: 'Vocabulary',
    question: 'Select the appropriate preposition: "The university researcher is known _____ his ground-breaking publications on renewable energy."',
    options: ['for', 'with', 'about', 'in'],
    correct: 'for',
    explanation: 'The standard academic collocation is "known for" something (renowned for an accomplishment).'
  },
  // 3. Intermediate (B1 / Band 5.0 - 5.5) - Vocabulary in Context
  {
    id: 3,
    level: 'Intermediate (B1)',
    bandTarget: 'Band 5.0–5.5',
    category: 'Vocabulary',
    passage: '“Urban municipalities are implementing strict policies to mitigate the detrimental impact of vehicular emissions on public respiratory health.”',
    question: 'In the sentence above, the word "mitigate" is closest in meaning to:',
    options: ['intensify', 'alleviate or reduce', 'overlook', 'prohibit entirely'],
    correct: 'alleviate or reduce',
    explanation: '"Mitigate" is an Academic Word List (AWL) verb meaning to make something less severe or harmful.'
  },
  // 4. Intermediate (B1 / Band 5.5 - 6.0) - Reading True / False / Not Given
  {
    id: 4,
    level: 'Intermediate (B1)',
    bandTarget: 'Band 5.5–6.0',
    category: 'Reading Comprehension',
    passage: '“Although early agricultural practices emerged independently in multiple global river valleys around 10,000 BCE, archaeological excavations in the Fertile Crescent remain the most comprehensively documented to date.”',
    question: 'Statement: "Agricultural practices developed in only one single geographic region before spreading globally." Is this statement:',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correct: 'FALSE',
    explanation: 'The passage explicitly states that early practices "emerged independently in multiple global river valleys", directly contradicting the statement.'
  },
  // 5. Upper-Intermediate (B2 / Band 6.0 - 6.5) - Reading Inference & Paraphrase
  {
    id: 5,
    level: 'Upper-Intermediate (B2)',
    bandTarget: 'Band 6.0–6.5',
    category: 'Inference',
    passage: '“Cognitive psychologists emphasize that passive revision—such as re-reading highlighted notes—creates an illusion of competence, whereas effortful retrieval drills solidify neural pathways required for long-term retention.”',
    question: 'According to the passage, why is passive re-reading often counter-productive for examinees?',
    options: [
      'It physically exhausts neural pathways in the brain',
      'It produces a false impression of mastery without reinforcing durable recall',
      'It requires significantly more time than active retrieval testing',
      'It prevents students from highlighting key information'
    ],
    correct: 'It produces a false impression of mastery without reinforcing durable recall',
    explanation: '"Illusion of competence" paraphrases as producing a false impression of mastery without durable recall.'
  },
  // 6. Upper-Intermediate (B2 / Band 6.5 - 7.0) - Complex Sentence Synthesis
  {
    id: 6,
    level: 'Upper-Intermediate (B2)',
    bandTarget: 'Band 6.5–7.0',
    category: 'Sentence Structure',
    question: 'Which of the following sentences correctly synthesizes contrast using Band 7+ grammatical complexity?',
    options: [
      'Renewable energy is clean, but it is expensive so governments do not buy it.',
      'In spite of the substantial initial capital expenditure, photovoltaic arrays significantly diminish municipal carbon footprints over time.',
      'Although renewable energy is expensive, but it diminishes municipal carbon footprints.',
      'Because of renewable energy is clean, therefore governments invest heavily in solar arrays.'
    ],
    correct: 'In spite of the substantial initial capital expenditure, photovoltaic arrays significantly diminish municipal carbon footprints over time.',
    explanation: '"In spite of + noun phrase" followed by an independent clause represents advanced grammatical cohesion without redundant conjunctions (like "although... but").'
  },
  // 7. Advanced (C1 / Band 7.0 - 7.5) - Inversion & Academic Structure
  {
    id: 7,
    level: 'Advanced (C1)',
    bandTarget: 'Band 7.0–7.5',
    category: 'Grammar',
    question: 'Complete the inverted sentence correctly: "Rarely _____ such unprecedented technological disruption within such a condensed chronological timeframe."',
    options: [
      'human civilization has witnessed',
      'has human civilization witnessed',
      'human civilization witnessed',
      'did human civilization witnessed'
    ],
    correct: 'has human civilization witnessed',
    explanation: 'Negative/restrictive adverbs like "Rarely" at the beginning of a clause trigger subject-auxiliary inversion ("has + subject + past participle").'
  },
  // 8. Advanced (C1-C2 / Band 7.5 - 8.5) - High-Level Academic Reading Synthesis
  {
    id: 8,
    level: 'Advanced (C1)',
    bandTarget: 'Band 7.5–8.5',
    category: 'Inference',
    passage: '“The prevailing consensus that economic growth inevitably precipitates ecological degradation is increasingly contested by decoupling theories, which posit that technological efficiency can divorce resource depletion from gross domestic product expansion.”',
    question: 'What is the core premise of the "decoupling theories" cited in the text?',
    options: [
      'Economic growth and environmental degradation are permanently correlated.',
      'Technological efficiency allows an economy to expand without a proportional increase in resource consumption.',
      'Gross domestic product expansion should be halted to ensure ecological conservation.',
      'Ecological degradation is primarily driven by theories of economic decoupling.'
    ],
    correct: 'Technological efficiency allows an economy to expand without a proportional increase in resource consumption.',
    explanation: '"Divorce resource depletion from gross domestic product expansion" precisely means economic growth occurs without proportional resource consumption.'
  }
];

export default function DiagnosticPage() {
  const { user, saveDiagnostic } = useAuth();
  const router = useRouter();

  // Test Navigation Step: 1 = Goal Setting | 2 = Progressive Exam | 3 = Mini Writing | 4 = AI Result & Dynamic Course Map
  const [step, setStep] = useState<number>(1);

  // UNSELECTED BY DEFAULT: User must explicitly choose target band & timeline
  const [selectedTargetBand, setSelectedTargetBand] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Progressive Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [activeSelectedOption, setActiveSelectedOption] = useState<string>('');

  // 15-Minute Countdown Timer State (15 minutes = 900 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(900);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Mini Writing State
  const [writingSample, setWritingSample] = useState<string>('');
  const [writingPrompt] = useState<string>(
    'Some people argue that technological development has made life more complex and stressful, while others believe it has simplified daily living. Discuss your opinion with reasons. (Write between 35 and 80 words).'
  );

  // Generation & Results State
  const [isGeneratingResult, setIsGeneratingResult] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Timer countdown hook
  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerActive) {
      // Auto-submit if time runs out
      setTimerActive(false);
      handleFinishExam();
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1 Validation & Proceed
  const handleStartExam = () => {
    if (!selectedTargetBand) {
      setValidationError('অনুগ্রহ করে আপনার কাঙ্ক্ষিত টার্গেট ব্যান্ড নির্বাচন করুন।');
      return;
    }
    if (!selectedTimeline) {
      setValidationError('অনুগ্রহ করে আপনার পরীক্ষা দেওয়ার সম্ভাব্য সময় নির্বাচন করুন।');
      return;
    }

    setValidationError(null);
    setStep(2);
    setTimerActive(true);
    setCurrentQuestionIndex(0);
    setActiveSelectedOption(userAnswers[PROGRESSIVE_QUESTIONS[0].id] || '');
  };

  // Handle Option Selection in progressive test
  const handleSelectOption = (option: string) => {
    const qId = PROGRESSIVE_QUESTIONS[currentQuestionIndex].id;
    setActiveSelectedOption(option);
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < PROGRESSIVE_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setActiveSelectedOption(userAnswers[PROGRESSIVE_QUESTIONS[nextIdx].id] || '');
    } else {
      // Move to Mini Writing stage
      setStep(3);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setActiveSelectedOption(userAnswers[PROGRESSIVE_QUESTIONS[prevIdx].id] || '');
    }
  };

  // Final Assessment & Dynamic Course Map Calculation
  const handleFinishExam = () => {
    setTimerActive(false);
    setIsGeneratingResult(true);

    setTimeout(() => {
      // 1. Calculate Progressive Question Accuracy
      let correctCount = 0;
      let basicCorrect = 0;
      let intermediateCorrect = 0;
      let advancedCorrect = 0;

      PROGRESSIVE_QUESTIONS.forEach(q => {
        const studentAns = userAnswers[q.id];
        if (studentAns && studentAns.trim() === q.correct.trim()) {
          correctCount++;
          if (q.level.includes('Basic')) basicCorrect++;
          else if (q.level.includes('Intermediate')) intermediateCorrect++;
          else advancedCorrect++;
        }
      });

      const readingAccuracy = Math.round((correctCount / PROGRESSIVE_QUESTIONS.length) * 100);

      // Progressive Reading Band Calculation
      let calculatedReadingBand = 4.0;
      if (correctCount >= 8) calculatedReadingBand = 8.5;
      else if (correctCount >= 7) calculatedReadingBand = 7.5;
      else if (correctCount >= 6) calculatedReadingBand = 7.0;
      else if (correctCount >= 5) calculatedReadingBand = 6.5;
      else if (correctCount >= 4) calculatedReadingBand = 6.0;
      else if (correctCount >= 3) calculatedReadingBand = 5.5;
      else if (correctCount >= 2) calculatedReadingBand = 5.0;
      else if (correctCount >= 1) calculatedReadingBand = 4.5;

      // 2. Writing Evaluation
      const cleanWriting = writingSample.trim();
      const words = cleanWriting.length > 0 ? cleanWriting.split(/\s+/).length : 0;
      const lowerWriting = cleanWriting.toLowerCase();

      const academicConnectors = [
        'however', 'although', 'furthermore', 'moreover', 'therefore', 
        'consequently', 'in spite of', 'whereas', 'while', 'in addition', 
        'for instance', 'nevertheless', 'significantly', 'in contrast', 'ultimately'
      ];

      let connectorMatches = 0;
      academicConnectors.forEach(c => {
        if (lowerWriting.includes(c)) connectorMatches++;
      });

      let calculatedWritingBand = 4.5;
      if (words >= 45 && connectorMatches >= 3) {
        calculatedWritingBand = 7.5;
      } else if (words >= 40 && connectorMatches >= 2) {
        calculatedWritingBand = 7.0;
      } else if (words >= 30 && connectorMatches >= 1) {
        calculatedWritingBand = 6.5;
      } else if (words >= 20) {
        calculatedWritingBand = 5.5;
      } else if (words >= 10) {
        calculatedWritingBand = 5.0;
      }

      // 3. Overall Assessed Band Calculation (Weighted: 55% Progressive Exam + 45% Writing)
      const rawBand = (calculatedReadingBand * 0.55) + (calculatedWritingBand * 0.45);
      const assessedBand = Math.max(4.0, Math.min(8.5, Math.round(rawBand * 2) / 2));

      // 4. CEFR Level
      let cefrLevel: 'A2' | 'B1' | 'B2' | 'C1' = 'B1';
      if (assessedBand >= 7.0) cefrLevel = 'C1';
      else if (assessedBand >= 6.0) cefrLevel = 'B2';
      else if (assessedBand >= 5.0) cefrLevel = 'B1';
      else cefrLevel = 'A2';

      // 5. Weakest Module determination
      let weakestModule = 'Writing & Complex Sentences';
      if (calculatedReadingBand < calculatedWritingBand) {
        weakestModule = 'Reading Comprehension & Skimming';
      } else if (calculatedWritingBand < calculatedReadingBand) {
        weakestModule = 'Writing Cohesion & Grammar';
      } else {
        weakestModule = 'Speaking Fluency & Lexical Resource';
      }

      const calculatedResult: DiagnosticResult = {
        completed: true,
        testDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        assessedBand,
        targetBand: parseFloat(selectedTargetBand) || 7.5,
        examTimeline: selectedTimeline,
        weakestModule,
        dailyHours: assessedBand <= 5.0 ? '2.0 Hours' : assessedBand <= 6.5 ? '1.5 Hours' : '1.0 Hour',
        readingAccuracy,
        writingWordCount: words,
        cefrLevel,
        readingScore: calculatedReadingBand,
        writingScore: calculatedWritingBand,
        feedback: {
          reading: `৮টি ধারাবাহিক প্রশ্নের মধ্যে ${correctCount}টি সঠিক হয়েছে (${readingAccuracy}% একুরেসি)। বেসিক: ${basicCorrect}/2, ইন্টারমিডিয়েট: ${intermediateCorrect}/3, অ্যাডভান্সড: ${advancedCorrect}/3।`,
          writing: words > 0 
            ? `শব্দসংখ্যা: ${words} শব্দ, ট্রানজিশন মার্কার ও কানেক্টর: ${connectorMatches}টি শনাক্ত হয়েছে (Band ${calculatedWritingBand})।` 
            : 'রাইটিং স্যাম্পল খালি ছিল, সাধারণ বাক্য গঠনের প্রয়োজন (Band 4.5)।',
          speaking: 'স্পিকিং ফ্লুয়েন্সিতে জড়তা দূর করতে সিলেবাস অনুযায়ী এআই স্পিকিং টেস্ট ড্রিল অন্তর্ভুক্ত করা হয়েছে।'
        }
      };

      setDiagnosticResult(calculatedResult);
      saveDiagnostic(calculatedResult);
      setIsGeneratingResult(false);
      setStep(4);
    }, 1600);
  };

  const currentQ = PROGRESSIVE_QUESTIONS[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Top Stepper Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span className={step >= 1 ? 'text-[#E11D48]' : ''}>ধাপ ১: লক্ষ্য ও ব্যান্ড নির্ধারণ</span>
          <span className={step >= 2 ? 'text-[#E11D48]' : ''}>ধাপ ২: ১৫ মিনিটের প্রগ্রেসিভ টেস্ট</span>
          <span className={step >= 3 ? 'text-[#E11D48]' : ''}>ধাপ ৩: মিনি রাইটিং মূল্যায়ন</span>
          <span className={step >= 4 ? 'text-[#E11D48]' : ''}>ধাপ ৪: এআই লেভেল ও ডাইনামিক কোর্স ম্যাপ</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#E11D48] to-rose-600 h-full transition-all duration-400"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ================= STEP 1: GOAL & TIMELINE SETTING (NO DEFAULT PRE-SELECTION) ================= */}
      {step === 1 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-in fade-in">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#E11D48] text-xs font-bold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>আন্তর্জাতিক অনবোর্ডিং ও প্রাথমিক লক্ষ্য</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আপনার কাঙ্ক্ষিত আইএলটিএস টার্গেট ব্যান্ড কত?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              সঠিক লক্ষ্য ও সময় নির্বাচন করুন। এরপর শুরু হবে ১৫ মিনিটের অ্যাডাপ্টিভ ডায়াগনস্টিক টেস্ট (বেসিক থেকে অ্যাডভান্সড)।
            </p>
          </div>

          {validationError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Expanded Band Target Options (5.0 to 9.0) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                কাঙ্ক্ষিত টার্গেট ব্যান্ড স্কোর নির্বাচন করুন:
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {selectedTargetBand ? `নির্বাচিত: Band ${selectedTargetBand}` : 'কোনোটি এখনও নির্বাচিত হয়নি'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map((band) => {
                const isSelected = selectedTargetBand === band;
                return (
                  <button
                    key={band}
                    type="button"
                    onClick={() => {
                      setSelectedTargetBand(band);
                      setValidationError(null);
                    }}
                    className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm border transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'border-[#E11D48] bg-rose-50 text-[#E11D48] shadow-md ring-2 ring-rose-500/20 scale-[1.03]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>Band</div>
                    <div className="text-base sm:text-lg font-black">{band}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam Timeline Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                পরীক্ষা দেওয়ার সম্ভাব্য সময়সীমা:
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {selectedTimeline ? `নির্বাচিত: ${selectedTimeline}` : 'কোনোটি এখনও নির্বাচিত হয়নি'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {[
                '১ মাস পর',
                '২ মাস পর',
                '৩ মাস পর',
                '৬ মাস পর',
                'ফাউন্ডেশন বিল্ড-আপ (সময় অনির্ধারিত)'
              ].map((time) => {
                const isSelected = selectedTimeline === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSelectedTimeline(time);
                      setValidationError(null);
                    }}
                    className={`py-3 px-3 rounded-2xl font-bold text-xs border transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'border-[#E11D48] bg-rose-50 text-[#E11D48] shadow-md ring-2 ring-rose-500/20 scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১৫ মিনিটের আন্তর্জাতিক অ্যাডাপ্টিভ টেস্ট পদ্ধতি:</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              পরবর্তী ধাপে মোট ৮টি প্রগ্রেসিভ প্রশ্ন রয়েছে। প্রশ্নগুলো শুরু হবে বেসিক ইংরেজি গ্রামার থেকে, এবং ধাপে ধাপে ইন্টারমিডিয়েট ও হাই-লেভেল অ্যাকাডেমিক রিডিং ও ইনফারেন্সে উন্নীত হবে।
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E11D48] to-rose-600 hover:from-[#BE123C] hover:to-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>১৫ মিনিটের লেভেল টেস্ট শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: 15-MINUTE PROGRESSIVE ADAPTIVE TEST ================= */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          
          {/* Header Bar with Countdown & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  {currentQ.level}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  ক্যাটাগরি: {currentQ.category}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                  {currentQ.bandTarget}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                প্রশ্ন {currentQuestionIndex + 1} / {PROGRESSIVE_QUESTIONS.length}
              </h2>
            </div>

            {/* 15-Min Live Timer Countdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900 text-white px-4 py-2 rounded-2xl font-mono text-xs shadow-md">
              <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>অবশিষ্ট সময়: <strong className="text-amber-300 font-bold">{formatTimer(secondsLeft)}</strong></span>
            </div>
          </div>

          {/* Reading Passage (if question contains passage) */}
          {currentQ.passage && (
            <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm leading-relaxed font-serif">
              <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">
                Reading Excerpt:
              </span>
              {currentQ.passage}
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = activeSelectedOption === option;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#E11D48] bg-rose-50/80 text-rose-950 font-bold ring-2 ring-rose-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-[#E11D48] bg-[#E11D48] text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs disabled:opacity-30 cursor-pointer"
            >
              পূর্ববর্তী
            </button>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <span>{currentQuestionIndex === PROGRESSIVE_QUESTIONS.length - 1 ? 'মিনি রাইটিং টেস্টে যান' : 'পরবর্তী প্রশ্ন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: MINI WRITING ASSESSMENT ================= */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">
              ধাপ ৩: মিনি রাইটিং মূল্যায়ন (Sentence Structure & Lexical Resource)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              সংক্ষিপ্ত রাইটিং স্যাম্পল প্রদান করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              নিচের প্রশ্নে আপনার মতামত জানিয়ে ২-৪টি ইংরেজি বাক্য লিখুন (৩৫–৮০ শব্দ)। আপনার বাক্য গঠনের জটিলতা ও গ্রামার পরীক্ষা করা হবে।
            </p>
          </div>

          {/* Prompt Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            <strong>Prompt: </strong>{writingPrompt}
          </div>

          {/* Writing Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>আপনার উত্তর ইংরেজিতে লিখুন:</span>
              <span className="font-mono font-bold text-slate-700">
                শব্দসংখ্যা: {writingSample.trim() ? writingSample.trim().split(/\s+/).length : 0} শব্দ
              </span>
            </div>
            <textarea
              rows={5}
              value={writingSample}
              onChange={(e) => setWritingSample(e.target.value)}
              placeholder="In my opinion, although technological advancements have introduced certain complexities, they have fundamentally simplified communication and education..."
              className="w-full p-4 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
            />
          </div>

          {/* Finish Button */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
            >
              পূর্ববর্তী
            </button>

            <button
              type="button"
              onClick={handleFinishExam}
              disabled={isGeneratingResult}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isGeneratingResult ? 'এআই রিয়েল স্কোর ও রোডম্যাপ তৈরি করছে...' : 'পরীক্ষা সম্পন্ন ও ডাইনামিক কোর্স ম্যাপ দেখুন'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: AI REAL RESULT & DYNAMIC COURSE MAP ================= */}
      {step === 4 && diagnosticResult && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-in zoom-in-95">
          
          {/* Header Assessment */}
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আপনার বাস্তব আন্তর্জাতিক এআই লেভেল রিপোর্ট!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              বেসিক থেকে অ্যাডভান্সড ৮টি প্রশ্ন ও মিনি রাইটিং উত্তরের ভিত্তিতে আপনার আসল CEFR স্কেল ও ব্যান্ড নির্ণয় করা হয়েছে।
            </p>
          </div>

          {/* Scores Overview Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">যাচাইকৃত বর্তমান স্কোর</span>
              <div className="text-3xl font-black text-amber-700 mt-1">Band {diagnosticResult.assessedBand}</div>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full inline-block mt-1">CEFR {diagnosticResult.cefrLevel}</span>
            </div>

            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-[#E11D48] uppercase tracking-wider">কাঙ্ক্ষিত টার্গেট ব্যান্ড</span>
              <div className="text-3xl font-black text-[#E11D48] mt-1">Band {diagnosticResult.targetBand}</div>
              <span className="text-[10px] text-rose-700 font-semibold block mt-1">{diagnosticResult.examTimeline}</span>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">প্রগ্রেসিভ রিডিং ও গ্রামার</span>
              <div className="text-2xl font-black text-blue-700 mt-1.5">Band {diagnosticResult.readingScore}</div>
              <span className="text-[10px] text-blue-600 font-semibold block mt-1">{diagnosticResult.readingAccuracy}% একুরেসি</span>
            </div>

            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">রাইটিং ও সেন্টেন্স গঠন</span>
              <div className="text-2xl font-black text-purple-700 mt-1.5">Band {diagnosticResult.writingScore}</div>
              <span className="text-[10px] text-purple-600 font-semibold block mt-1">{diagnosticResult.writingWordCount} শব্দ লেখা হয়েছে</span>
            </div>
          </div>

          {/* Diagnosis & Recommendations */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-[#E11D48]" />
                <span>এআই পারফরম্যান্স অ্যানালাইসিস:</span>
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#E11D48]">
                প্রধান দুর্বলতা: {diagnosticResult.weakestModule}
              </span>
            </div>
            <p><strong>• রিডিং ও ব্যাকরণ:</strong> {diagnosticResult.feedback.reading}</p>
            <p><strong>• রাইটিং বিশ্লেষণ:</strong> {diagnosticResult.feedback.writing}</p>
            <p><strong>• স্পিকিং প্রস্তুতি:</strong> {diagnosticResult.feedback.speaking}</p>
          </div>

          {/* DYNAMIC COURSE ROADMAP MAP (CUSTOMIZED ACCORDING TO REAL ASSESSED BAND) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>আপনার বাস্তব স্কোরের ওপর ভিত্তি করে তৈরি ডায়নামিক কোর্স ম্যাপ:</span>
                </h3>
                <p className="text-xs text-slate-500">
                  বর্তমান <strong>Band {diagnosticResult.assessedBand}</strong> থেকে টার্গেট <strong>Band {diagnosticResult.targetBand}</strong> অর্জনের ৫-ধাপের কাস্টমাইজড রোডম্যাপ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {diagnosticResult.assessedBand <= 5.0 ? (
                // ROADMAP FOR BASIC STUDENTS (Band 4.0 - 5.0)
                <>
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-amber-800">ধাপ ১ (সপ্তাহ ১)</div>
                    <div className="font-bold text-xs text-slate-900">ইংরেজি বেসিক ও ফাউন্ডেশন</div>
                    <p className="text-[11px] text-slate-600">টেন্স, পার্টস অব স্পিচ ও সহজ বাক্য তৈরির নিয়ম রপ্ত করা।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-blue-800">ধাপ ২ (সপ্তাহ ২-৩)</div>
                    <div className="font-bold text-xs text-slate-900">ভোকাবুলারি ও রিডিং বেসিক</div>
                    <p className="text-[11px] text-slate-600">৫০০টি বহুল ব্যবহৃত শব্দ ও প্যারাগ্রাফ পড়ে অর্থ বোঝার অভ্যাস।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-indigo-800">ধাপ ৩ (সপ্তাহ ৪-৫)</div>
                    <div className="font-bold text-xs text-slate-900">আইএলটিএস প্রশ্ন কৌশল</div>
                    <p className="text-[11px] text-slate-600">True/False/Not Given এবং লিসেনিং কি-ওয়ার্ড ট্র্যাকিং টেকনিক।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-purple-800">ধাপ ৪ (সপ্তাহ ৬-৭)</div>
                    <div className="font-bold text-xs text-slate-900">রাইটিং এসে ও স্পিকিং</div>
                    <p className="text-[11px] text-slate-600">টাস্ক ২ এর ৪-প্যারাগ্রাফ এসে ফ্রেমওয়ার্ক ও এআই স্পিকিং ড্রিল।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-rose-800">ধাপ ৫ (সপ্তাহ ৮)</div>
                    <div className="font-bold text-xs text-slate-900">টার্গেট ফুল মক টেস্ট</div>
                    <p className="text-[11px] text-slate-600">কেমব্রিজ বই থেকে পূর্ণাঙ্গ পরীক্ষা ও ফাইনাল ব্যান্ড মূল্যায়ন।</p>
                  </div>
                </>
              ) : diagnosticResult.assessedBand <= 6.5 ? (
                // ROADMAP FOR INTERMEDIATE STUDENTS (Band 5.5 - 6.5)
                <>
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-indigo-800">ধাপ ১ (সপ্তাহ ১)</div>
                    <div className="font-bold text-xs text-slate-900">কমপ্লেক্স সেন্টেন্স সিন্থেসিস</div>
                    <p className="text-[11px] text-slate-600">Although, In spite of দিয়ে হাই-ব্যান্ড বাক্য গঠন ও ইনভার্সন।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-blue-800">ধাপ ২ (সপ্তাহ ২)</div>
                    <div className="font-bold text-xs text-slate-900">স্পিড রিডিং ও হেডিং ট্রিকস</div>
                    <p className="text-[11px] text-slate-600">ম্যাচিং হেডিংস ও মাল্টিপল চয়েসের ফাঁদ দ্রুত শনাক্ত করার উপায়।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-purple-800">ধাপ ৩ (সপ্তাহ ৩-৪)</div>
                    <div className="font-bold text-xs text-slate-900">রাইটিং টাস্ক ১ ও ২ মাস্টারক্লাস</div>
                    <p className="text-[11px] text-slate-600">গ্রাফ বিবরণী ও টাস্ক ২ তে ব্যান্ড ৭+ লেক্সিক্যাল রিসোর্স প্রয়োগ।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-emerald-800">ধাপ ৪ (সপ্তাহ ৫)</div>
                    <div className="font-bold text-xs text-slate-900">স্পিকিং কিউ-কার্ড মাস্টারমাইন্ড</div>
                    <p className="text-[11px] text-slate-600">১ মিনিটে মাইন্ড ম্যাপ করে ২ মিনিট বিরতিহীন সাবলীলভাবে বলা।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-rose-800">ধাপ ৫ (সপ্তাহ ৬)</div>
                    <div className="font-bold text-xs text-slate-900">৭.৫+ ব্যালান্সড মক ড্রিল</div>
                    <p className="text-[11px] text-slate-600">টাইম প্রেসারে পূর্ণাঙ্গ সিডি-আইএলটিএস পরীক্ষা ও ভুল শুধরানো।</p>
                  </div>
                </>
              ) : (
                // ROADMAP FOR ADVANCED STUDENTS (Band 7.0+)
                <>
                  <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-purple-800">ধাপ ১</div>
                    <div className="font-bold text-xs text-slate-900">অ্যাডভান্সড লেক্সিক্যাল রিসোর্স</div>
                    <p className="text-[11px] text-slate-600">ব্যান্ড ৮–৯ লেভেলের ইডিওম্যাটিক কলোকেশন ও কোহিশন।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-indigo-800">ধাপ ২</div>
                    <div className="font-bold text-xs text-slate-900">রাইটিং কোহিয়ারেন্স ও কোহিশন</div>
                    <p className="text-[11px] text-slate-600">এআই এক্সামিনারের ৮.৫ ক্রাইটেরিয়া পূরণ ও ন্যাচারাল ট্রানজিশন।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-blue-800">ধাপ ৩</div>
                    <div className="font-bold text-xs text-slate-900">লিসেনিং সেকশন ৪ স্পেশালাইজেশন</div>
                    <p className="text-[11px] text-slate-600">দ্রুত ব্রিটিশ ও অস্ট্রেলিয়ান অ্যাকসেন্ট ডিকোড করার ড্রিল।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-emerald-800">ধাপ ৪</div>
                    <div className="font-bold text-xs text-slate-900">স্পিকিং পার্ট ৩ গভীর বিতর্ক</div>
                    <p className="text-[11px] text-slate-600">জটিল বিমূর্ত প্রশ্নে দার্শনিক ও কাঠামোগত দীর্ঘ উত্তর প্রদান।</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-rose-800">ধাপ ৫</div>
                    <div className="font-bold text-xs text-slate-900">পারফেক্ট ৯.০ রেপ্লিকেশন মক</div>
                    <p className="text-[11px] text-slate-600">শূন্য ভুলের লক্ষ্য নিয়ে অফিশিয়াল কেমব্রিজ সিমুলেশন।</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA: Continue to Pricing / Package Enrollment Gate */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-slate-100">
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E11D48] to-rose-600 hover:from-[#BE123C] hover:to-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>কোর্স প্যাকেজ নির্বাচন ও ড্যাশবোর্ড সক্রিয় করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
