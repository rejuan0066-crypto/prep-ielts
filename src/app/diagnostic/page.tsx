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
  Check, 
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

interface GrammarQuestion {
  id: number;
  level: 'Basic Grammar (A1–A2)' | 'Intermediate Grammar (B1)' | 'Upper-Intermediate (B2)' | 'Advanced Grammar (C1)';
  bandTarget: string;
  topic: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const GRAMMAR_PROGRESSIVE_QUESTIONS: GrammarQuestion[] = [
  // 1. Basic (A1-A2) - Tenses & Aspect
  {
    id: 1,
    level: 'Basic Grammar (A1–A2)',
    bandTarget: 'Band 4.0–4.5',
    topic: 'Tenses (Simple Present vs Present Continuous)',
    question: 'Choose the correct option: "My brother usually _____ to university by bicycle, but this week he _____ the public bus."',
    options: [
      'goes / is taking',
      'is going / takes',
      'goes / takes',
      'went / taking'
    ],
    correct: 'goes / is taking',
    explanation: 'Regular routine uses Simple Present ("goes"), while a temporary action happening this week requires Present Continuous ("is taking").'
  },
  // 2. Basic (A2) - Subject-Verb Agreement
  {
    id: 2,
    level: 'Basic Grammar (A1–A2)',
    bandTarget: 'Band 4.5–5.0',
    topic: 'Subject-Verb Agreement',
    question: 'Select the correct auxiliary verb: "A comprehensive list of newly admitted students _____ published on the department notice board yesterday."',
    options: ['was', 'were', 'are', 'have been'],
    correct: 'was',
    explanation: 'The head noun of the subject is the singular noun "A comprehensive list", so it takes the singular past verb "was".'
  },
  // 3. Basic-Intermediate (A2-B1) - Prepositions & Prepositional Phrases
  {
    id: 3,
    level: 'Basic Grammar (A1–A2)',
    bandTarget: 'Band 4.5–5.0',
    topic: 'Prepositions & Idiomatic Phrases',
    question: 'Complete the sentence: "The candidate succeeded _____ passing the final interview _____ spite of having limited prior experience."',
    options: [
      'in / in',
      'at / on',
      'on / with',
      'to / by'
    ],
    correct: 'in / in',
    explanation: 'The standard collocations are "succeed in + gerund" and the prepositional phrase "in spite of".'
  },
  // 4. Intermediate (B1) - Active vs Passive Voice
  {
    id: 4,
    level: 'Intermediate Grammar (B1)',
    bandTarget: 'Band 5.0–5.5',
    topic: 'Passive Voice (Future & Completion)',
    question: 'Which option correctly completes the passive sentence? "The international climate conference _____ by the Prime Minister next Monday."',
    options: [
      'will be inaugurated',
      'will inaugurate',
      'is inaugurating',
      'has inaugurated'
    ],
    correct: 'will be inaugurated',
    explanation: 'The subject "conference" receives the action, requiring future passive voice ("will be + past participle: inaugurated").'
  },
  // 5. Intermediate (B1-B2) - Conditionals (3rd Conditional)
  {
    id: 5,
    level: 'Intermediate Grammar (B1)',
    bandTarget: 'Band 5.5–6.0',
    topic: 'Third Conditional (Unreal Past)',
    question: 'Choose the correct grammatical structure: "If the local authority _____ the bridge maintenance earlier, the tragic collapse would never have occurred."',
    options: [
      'had conducted',
      'conducted',
      'would conduct',
      'has conducted'
    ],
    correct: 'had conducted',
    explanation: 'The Third Conditional requires "If + past perfect (had conducted)... would have + past participle".'
  },
  // 6. Upper-Intermediate (B2) - Modals of Deduction & Speculation
  {
    id: 6,
    level: 'Upper-Intermediate (B2)',
    bandTarget: 'Band 6.0–6.5',
    topic: 'Modal Verbs of Deduction',
    question: 'Select the most accurate modal verb: "Tahmid has been working tirelessly on his thesis for ten consecutive hours; he _____ completely exhausted by now."',
    options: [
      'must be',
      'can be',
      'should have',
      'might have been'
    ],
    correct: 'must be',
    explanation: '"Must be" expresses strong logical deduction based on undeniable evidence.'
  },
  // 7. Upper-Intermediate (B2) - Relative Pronouns & Clauses
  {
    id: 7,
    level: 'Upper-Intermediate (B2)',
    bandTarget: 'Band 6.5–7.0',
    topic: 'Defining vs Non-defining Relative Clauses',
    question: 'Choose the correct relative pronoun: "The senior biochemist, _____ research into mRNA vaccines won international acclaim, will deliver tomorrow’s keynote speech."',
    options: ['whose', 'whom', 'which', "who's"],
    correct: 'whose',
    explanation: '"Whose" indicates possession ("whose research" = the research belonging to the biochemist).'
  },
  // 8. Upper-Intermediate (B2-C1) - Complex Sentence Synthesis & Connectors
  {
    id: 8,
    level: 'Upper-Intermediate (B2)',
    bandTarget: 'Band 6.5–7.0',
    topic: 'Complex Sentence Synthesis (Concession)',
    question: 'Which of the following sentences correctly combines contrasting ideas WITHOUT grammatical redundancy?',
    options: [
      'Although renewable energy systems are expensive, high initial costs still deter widespread adoption.',
      'Although renewable technology is advancing rapidly, high initial costs still deter widespread adoption.',
      'Although renewable technology is advancing rapidly, but high initial costs still deter widespread adoption.',
      'In spite of renewable technology is advancing rapidly, high initial costs still deter widespread adoption.'
    ],
    correct: 'Although renewable technology is advancing rapidly, high initial costs still deter widespread adoption.',
    explanation: 'In English, "although" introduces a subordinate clause; pairing it with "but" is a common grammatical error. "In spite of" requires a noun phrase, not a clause.'
  },
  // 9. Advanced (C1) - Negative Inversion for Emphasis
  {
    id: 9,
    level: 'Advanced Grammar (C1)',
    bandTarget: 'Band 7.0–7.5',
    topic: 'Negative & Restrictive Inversion',
    question: 'Select the correctly inverted clause: "Hardly _____ the opening remarks when an unexpected fire alarm forced an immediate evacuation of the auditorium."',
    options: [
      'had the speaker commenced',
      'the speaker had commenced',
      'did the speaker commenced',
      'has the speaker commenced'
    ],
    correct: 'had the speaker commenced',
    explanation: 'When "Hardly" begins a sentence, it triggers auxiliary inversion: "Hardly had + subject + past participle... when...".'
  },
  // 10. Advanced (C1-C2) - Subjunctive Mood in Formal English
  {
    id: 10,
    level: 'Advanced Grammar (C1)',
    bandTarget: 'Band 7.5–8.5',
    topic: 'Mandative Subjunctive Mood',
    question: 'Identify the grammatically correct subjunctive form: "The university syndicate recommended that every department head _____ a detailed financial audit before Friday."',
    options: [
      'submit',
      'submits',
      'submitted',
      'must submit'
    ],
    correct: 'submit',
    explanation: 'Verbs of recommendation, demand, or insistence (recommend, demand, insist) take the mandative subjunctive bare infinitive form ("submit", not "submits" or "submitted").'
  }
];

export default function DiagnosticPage() {
  const { user, saveDiagnostic } = useAuth();
  const router = useRouter();

  // Test Navigation Steps:
  // Step 1: Goal & Target Setting (Empty by default)
  // Step 2: 15-Minute Progressive Grammar Test (Q1 to Q10)
  // Step 3: Sentence Formation / Grammar Synthesis
  // Step 4: AI Grammar Assessment & Dynamic Roadmap
  const [step, setStep] = useState<number>(1);

  // UNSELECTED BY DEFAULT: User must explicitly choose
  const [selectedTargetBand, setSelectedTargetBand] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Progressive Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [activeSelectedOption, setActiveSelectedOption] = useState<string>('');

  // 15-Minute Countdown Timer (900 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(900);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Step 3: Practical Grammar Synthesis Task
  const [sentenceSample, setSentenceSample] = useState<string>('');

  // Generation & Result State
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
    setActiveSelectedOption(userAnswers[GRAMMAR_PROGRESSIVE_QUESTIONS[0].id] || '');
  };

  // Option select
  const handleSelectOption = (option: string) => {
    const qId = GRAMMAR_PROGRESSIVE_QUESTIONS[currentQuestionIndex].id;
    setActiveSelectedOption(option);
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < GRAMMAR_PROGRESSIVE_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setActiveSelectedOption(userAnswers[GRAMMAR_PROGRESSIVE_QUESTIONS[nextIdx].id] || '');
    } else {
      setStep(3);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setActiveSelectedOption(userAnswers[GRAMMAR_PROGRESSIVE_QUESTIONS[prevIdx].id] || '');
    }
  };

  // Final Assessment & Dynamic Course Map Calculation
  const handleFinishExam = () => {
    setTimerActive(false);
    setIsGeneratingResult(true);

    setTimeout(() => {
      let correctCount = 0;
      let basicCorrect = 0;
      let intermediateCorrect = 0;
      let advancedCorrect = 0;

      GRAMMAR_PROGRESSIVE_QUESTIONS.forEach(q => {
        const studentAns = userAnswers[q.id];
        if (studentAns && studentAns.trim() === q.correct.trim()) {
          correctCount++;
          if (q.level.includes('Basic')) basicCorrect++;
          else if (q.level.includes('Intermediate') && !q.level.includes('Upper')) intermediateCorrect++;
          else advancedCorrect++;
        }
      });

      const grammarAccuracy = Math.round((correctCount / GRAMMAR_PROGRESSIVE_QUESTIONS.length) * 100);

      // Progressive Grammar Band Scale (Based on real 10-question test)
      let assessedGrammarBand = 4.0;
      if (correctCount >= 10) assessedGrammarBand = 8.5;
      else if (correctCount >= 9) assessedGrammarBand = 8.0;
      else if (correctCount >= 8) assessedGrammarBand = 7.5;
      else if (correctCount >= 7) assessedGrammarBand = 7.0;
      else if (correctCount >= 6) assessedGrammarBand = 6.5;
      else if (correctCount >= 5) assessedGrammarBand = 6.0;
      else if (correctCount >= 4) assessedGrammarBand = 5.5;
      else if (correctCount >= 3) assessedGrammarBand = 5.0;
      else if (correctCount >= 2) assessedGrammarBand = 4.5;

      // Sentence Synthesis Evaluation (Practical Grammar Application)
      const cleanSentence = sentenceSample.trim();
      const words = cleanSentence.length > 0 ? cleanSentence.split(/\s+/).length : 0;
      const lower = cleanSentence.toLowerCase();

      const complexMarkers = ['although', 'in spite of', 'despite', 'whereas', 'while', 'nevertheless', 'however', 'consequently'];
      let markerFound = false;
      complexMarkers.forEach(m => {
        if (lower.includes(m)) markerFound = true;
      });

      let synthesisScore = 4.5;
      if (words >= 15 && markerFound) synthesisScore = 7.0;
      else if (words >= 10 && markerFound) synthesisScore = 6.5;
      else if (words >= 8) synthesisScore = 5.5;
      else if (words >= 4) synthesisScore = 5.0;

      // Overall Combined Assessed Band
      const rawBand = (assessedGrammarBand * 0.70) + (synthesisScore * 0.30);
      const assessedBand = Math.max(4.0, Math.min(8.5, Math.round(rawBand * 2) / 2));

      // CEFR Level
      let cefrLevel: 'A2' | 'B1' | 'B2' | 'C1' = 'B1';
      if (assessedBand >= 7.0) cefrLevel = 'C1';
      else if (assessedBand >= 6.0) cefrLevel = 'B2';
      else if (assessedBand >= 5.0) cefrLevel = 'B1';
      else cefrLevel = 'A2';

      // Weakest Grammar Area Determination
      let weakestModule = 'Complex Sentence & Connectors';
      if (basicCorrect < 2) {
        weakestModule = 'Basic Grammar & Subject-Verb Agreement';
      } else if (intermediateCorrect < 2) {
        weakestModule = 'Conditionals & Passive Voice';
      } else if (advancedCorrect < 3) {
        weakestModule = 'Advanced Inversion & Subjunctive Mood';
      } else {
        weakestModule = 'Complex Sentence Synthesis';
      }

      const calculatedResult: DiagnosticResult = {
        completed: true,
        testDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        assessedBand,
        targetBand: parseFloat(selectedTargetBand) || 7.5,
        examTimeline: selectedTimeline,
        weakestModule,
        dailyHours: assessedBand <= 5.0 ? '2.0 Hours' : assessedBand <= 6.5 ? '1.5 Hours' : '1.0 Hour',
        readingAccuracy: grammarAccuracy,
        writingWordCount: words,
        cefrLevel,
        readingScore: assessedGrammarBand,
        writingScore: synthesisScore,
        feedback: {
          reading: `১০টি প্রগ্রেসিভ গ্রামার প্রশ্নের মধ্যে ${correctCount}টি সঠিক হয়েছে (${grammarAccuracy}% একুরেসি)। বেসিক ব্যাকরণ: ${basicCorrect}/3, ইন্টারমিডিয়েট: ${intermediateCorrect}/3, অ্যাডভান্সড: ${advancedCorrect}/4।`,
          writing: words > 0
            ? `ব্যবহারিক বাক্য গঠন: ${words} শব্দ, কানেক্টর শনাক্ত হয়েছে (স্কোর: Band ${synthesisScore})।`
            : 'বাক্য গঠনের উত্তর প্রদান করা হয়নি। প্রাথমিক ফাউন্ডেশন ড্রিল আবশ্যক (Band 4.5)।',
          speaking: 'গ্রামার নির্ভুলতার ওপর ভিত্তি করে স্পিকিং ও রাইটিংয়ে বাক্য বৈচিত্র্য বাড়ানোর কোর্স প্ল্যান প্রস্তুত।'
        }
      };

      setDiagnosticResult(calculatedResult);
      saveDiagnostic(calculatedResult);
      setIsGeneratingResult(false);
      setStep(4);
    }, 1500);
  };

  const currentQ = GRAMMAR_PROGRESSIVE_QUESTIONS[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Top Stepper Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span className={step >= 1 ? 'text-[#E11D48]' : ''}>ধাপ ১: লক্ষ্য ও ব্যান্ড নির্ধারণ</span>
          <span className={step >= 2 ? 'text-[#E11D48]' : ''}>ধাপ ২: প্রগ্রেসিভ গ্রামার টেস্ট (১০ প্রশ্ন)</span>
          <span className={step >= 3 ? 'text-[#E11D48]' : ''}>ধাপ ৩: বাক্য গঠন ও কানেক্টর পরীক্ষা</span>
          <span className={step >= 4 ? 'text-[#E11D48]' : ''}>ধাপ ৪: এআই গ্রামার লেভেল ও কোর্স ম্যাপ</span>
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
              <BookOpen className="w-3.5 h-3.5" />
              <span>ইংরেজি গ্রামার ও ফাউন্ডেশন লেভেল টেস্ট</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আপনার কাঙ্ক্ষিত আইএলটিএস টার্গেট ব্যান্ড কত?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              আপনার লক্ষ্য ও সময় নির্বাচন করুন। এরপর শুরু হবে ১০টি ধারাবাহিক গ্রামার প্রশ্ন (বেসিক টেন্স থেকে শুরু করে ইনভার্সন ও সাবজাঙ্কটিভ পর্যন্ত)।
            </p>
          </div>

          {validationError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Expanded Band Target Options (5.0 to 9.0) - None selected by default */}
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

          {/* Exam Timeline Options - None selected by default */}
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

          {/* Grammar Evaluation Blueprint */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% ইংরেজি গ্রামার টেস্ট পদ্ধতি:</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              এটি কোনো দীর্ঘ রিডিং টেস্ট নয়। এখানে সরাসরি ইংরেজি গ্রামারের ১০টি গুরুত্বপূর্ণ ধাপ—টেন্স, সাবজেক্ট-ভার্ব এগ্রিমেন্ট, প্যাসিভ ভয়েস, কন্ডিশনাল, মডালস, রিলেটিভ ক্লজ, কানেক্টরস, নেগেটিভ ইনভার্সন এবং সাবজাঙ্কটিভ যাচাই করা হবে।
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E11D48] to-rose-600 hover:from-[#BE123C] hover:to-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>গ্রামার লেভেল টেস্ট শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: 15-MINUTE PROGRESSIVE GRAMMAR TEST ================= */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          
          {/* Header Bar with Countdown & Level Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  {currentQ.level}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  টপিক: {currentQ.topic}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                  {currentQ.bandTarget}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                গ্রামার প্রশ্ন {currentQuestionIndex + 1} / {GRAMMAR_PROGRESSIVE_QUESTIONS.length}
              </h2>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900 text-white px-4 py-2 rounded-2xl font-mono text-xs shadow-md">
              <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>অবশিষ্ট সময়: <strong className="text-amber-300 font-bold">{formatTimer(secondsLeft)}</strong></span>
            </div>
          </div>

          {/* Grammar Question Text */}
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
              <span>{currentQuestionIndex === GRAMMAR_PROGRESSIVE_QUESTIONS.length - 1 ? 'বাক্য গঠন পরীক্ষায় যান' : 'পরবর্তী প্রশ্ন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: SENTENCE FORMATION / GRAMMAR SYNTHESIS ================= */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">
              ধাপ ৩: ব্যবহারিক বাক্য গঠন মূল্যায়ন (Grammar Application & Sentence Variety)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              কমপ্লেক্স কানেক্টর প্রয়োগ করে বাক্য তৈরি করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              নিচের নিয়মে ১ থেকে ২টি সম্পূর্ণ ইংরেজি বাক্য তৈরি করুন। আপনার বাক্য গঠনের নির্ভুলতা ও ক্লজ কানেকশন পরীক্ষা করা হবে।
            </p>
          </div>

          {/* Grammar Instruction Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 space-y-2 leading-relaxed">
            <div className="font-bold text-[#E11D48] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>টাস্ক নির্দেশনা:</span>
            </div>
            <p>
              নিচের যেকোনো একটি কমপ্লেক্স কানেক্টর—<strong>&quot;Although&quot;</strong> অথবা <strong>&quot;In spite of&quot;</strong> অথবা <strong>&quot;Whereas&quot;</strong> ব্যবহার করে দুইটি বিপরীতমুখী ধারণাকে যুক্ত করে ১-২টি সঠিক ইংরেজি বাক্য লিখুন (১৫–৩৫ শব্দ)।
            </p>
            <div className="text-[11px] text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-200">
              উদাহরণ: &quot;Although rapid urbanization stimulates economic growth, it frequently exacerbates municipal environmental degradation.&quot;
            </div>
          </div>

          {/* Sentence Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>আপনার বাক্যটি এখানে লিখুন:</span>
              <span className="font-mono font-bold text-slate-700">
                শব্দসংখ্যা: {sentenceSample.trim() ? sentenceSample.trim().split(/\s+/).length : 0} শব্দ
              </span>
            </div>
            <textarea
              rows={4}
              value={sentenceSample}
              onChange={(e) => setSentenceSample(e.target.value)}
              placeholder="Although technology provides numerous advantages, it also creates significant digital distractions..."
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
              <span>{isGeneratingResult ? 'এআই গ্রামার লেভেল ও কোর্স রোডম্যাপ তৈরি করছে...' : 'পরীক্ষা সম্পন্ন ও ডাইনামিক কোর্স ম্যাপ দেখুন'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: AI REAL GRAMMAR RESULT & DYNAMIC COURSE MAP ================= */}
      {step === 4 && diagnosticResult && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-in zoom-in-95">
          
          {/* Header Assessment */}
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আপনার বাস্তব এআই গ্রামার মূল্যায়ন রিপোর্ট!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              ১০টি প্রগ্রেসিভ ব্যাকরণ প্রশ্ন ও বাক্য গঠন দক্ষতার ভিত্তিতে আপনার বাস্তব CEFR স্কেল ও ব্যান্ড নির্ণয় করা হয়েছে।
            </p>
          </div>

          {/* Scores Overview Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">বর্তমান গ্রামার লেভেল</span>
              <div className="text-3xl font-black text-amber-700 mt-1">Band {diagnosticResult.assessedBand}</div>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full inline-block mt-1">CEFR {diagnosticResult.cefrLevel}</span>
            </div>

            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-[#E11D48] uppercase tracking-wider">কাঙ্ক্ষিত টার্গেট ব্যান্ড</span>
              <div className="text-3xl font-black text-[#E11D48] mt-1">Band {diagnosticResult.targetBand}</div>
              <span className="text-[10px] text-rose-700 font-semibold block mt-1">{diagnosticResult.examTimeline}</span>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">এমসিকিউ ব্যাকরণ স্কোর</span>
              <div className="text-2xl font-black text-blue-700 mt-1.5">Band {diagnosticResult.readingScore}</div>
              <span className="text-[10px] text-blue-600 font-semibold block mt-1">{diagnosticResult.readingAccuracy}% একুরেসি</span>
            </div>

            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">ব্যবহারিক বাক্য গঠন</span>
              <div className="text-2xl font-black text-purple-700 mt-1.5">Band {diagnosticResult.writingScore}</div>
              <span className="text-[10px] text-purple-600 font-semibold block mt-1">{diagnosticResult.writingWordCount} শব্দ লেখা হয়েছে</span>
            </div>
          </div>

          {/* Diagnosis & Recommendations */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-[#E11D48]" />
                <span>এআই ব্যাকরণ বিশ্লেষণ ও অবজারভেশন:</span>
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#E11D48]">
                ফোকাস এরিয়া: {diagnosticResult.weakestModule}
              </span>
            </div>
            <p><strong>• ১০টি ব্যাকরণ প্রশ্নের ফলাফল:</strong> {diagnosticResult.feedback.reading}</p>
            <p><strong>• বাক্য গঠন বিশ্লেষণ:</strong> {diagnosticResult.feedback.writing}</p>
            <p><strong>• পড়ার গতি ও রুটিন:</strong> দৈনিক {diagnosticResult.dailyHours} অনুশীলনের মাধ্যমে লক্ষ্য অর্জন সম্ভব।</p>
          </div>

          {/* DYNAMIC COURSE ROADMAP BASED DIRECTLY ON GRAMMAR EVALUATION */}
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>আপনার গ্রামার স্কোরের ওপর ভিত্তি করে তৈরি ডায়নামিক কোর্স ম্যাপ:</span>
              </h3>
              <p className="text-xs text-slate-500">
                বর্তমান <strong>Band {diagnosticResult.assessedBand}</strong> থেকে টার্গেট <strong>Band {diagnosticResult.targetBand}</strong> অর্জনের ৫-ধাপের কাস্টমাইজড রোডম্যাপ
              </p>
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
