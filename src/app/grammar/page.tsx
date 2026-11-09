'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Award,
  Zap
} from 'lucide-react';

interface GrammarRule {
  id: string;
  category: string;
  title: string;
  bandTarget: string;
  explanation: string;
  simpleExample: string;
  band8Example: string;
  ruleFormula: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const GRAMMAR_TOPICS: GrammarRule[] = [
  {
    id: 'inversion',
    category: 'Advanced Syntax',
    title: 'Negative Inversions (Rare / Emphatic)',
    bandTarget: 'Band 8.0 - 9.0',
    ruleFormula: 'Negative Adverb (Not only / Seldom / Rarely) + Auxiliary Verb + Subject + Main Verb',
    explanation: 'Placing negative adverbs at the sentence head triggers inversion of the auxiliary verb and subject. Examiners award top marks for this in IELTS Writing Task 2 and Speaking Part 3.',
    simpleExample: 'Governments rarely take strict measures against heavy plastic pollution.',
    band8Example: 'Rarely do governmental authorities enact stringent regulatory measures against unabated synthetic contamination.',
    quiz: {
      question: 'Choose the grammatically accurate inverted sentence for IELTS Task 2:',
      options: [
        'Not only students benefit from digital tools, but they also improve focus.',
        'Not only do students benefit from digital tools, but they also cultivate technological acumen.',
        'Not only students do benefit from digital tools, but they also learn faster.'
      ],
      correctIndex: 1,
      explanation: 'Correct! "Not only" at the beginning requires auxiliary verb inversion ("do students benefit").'
    }
  },
  {
    id: 'conditionals',
    category: 'Conditionals',
    title: 'Mixed Conditionals (Past Unreal to Present Result)',
    bandTarget: 'Band 7.5 - 8.5',
    ruleFormula: 'If + Past Perfect (had done), Subject + would / could + Base Verb',
    explanation: 'Used to hypothesize how an unfulfilled past action causes a real current outcome. Essential for problem-solution and opinion essay argumentation.',
    simpleExample: 'If the city built a subway system before, traffic would not be congested now.',
    band8Example: 'Had municipal administrators prioritized metropolitan transit infrastructure decades ago, urban thoroughfares would not be paralyzed by vehicular congestion today.',
    quiz: {
      question: 'Identify the proper mixed conditional construction:',
      options: [
        'If renewable subsidies had been implemented earlier, clean energy would be dominant today.',
        'If renewable subsidies were implemented earlier, clean energy will be dominant today.',
        'If renewable subsidies had been implemented earlier, clean energy would have been dominant today.'
      ],
      correctIndex: 0,
      explanation: 'Accurate! Past cause ("had been implemented") paired with present consequence ("would be dominant today").'
    }
  },
  {
    id: 'participle-clauses',
    category: 'Syntactic Compression',
    title: 'Participle Clauses (Present & Past)',
    bandTarget: 'Band 8.0 - 8.5',
    ruleFormula: 'Present Participle (-ing) / Past Participle (-ed) + Dependent Clause',
    explanation: 'Eliminates repetitive pronouns and conjunctions like "because" or "when", producing seamless academic tone for Task 1 and Task 2.',
    simpleExample: 'Because international airlines reduced ticket prices, more people travel abroad.',
    band8Example: 'Spurred by substantial fare reductions across international carriers, millions of budget-conscious commuters routinely partake in cross-border tourism.',
    quiz: {
      question: 'Which sentence correctly executes a participle clause?',
      options: [
        'Recognizing the imminent threat of global warming, nations ratified the carbon accords.',
        'Recognize the threat of global warming, nations ratified the carbon accords.',
        'Having recognize the threat, nations ratified the carbon accords.'
      ],
      correctIndex: 0,
      explanation: 'Correct! "Recognizing the imminent threat..." operates as a participial adverbial modifier of the subject "nations".'
    }
  }
];

export default function IeltslyGrammarPage() {
  const [selectedTopic, setSelectedTopic] = useState<GrammarRule>(GRAMMAR_TOPICS[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (idx: number) => {
    setSelectedOption(idx);
    setShowAnswer(true);
  };

  const handleNextTopic = (topic: GrammarRule) => {
    setSelectedTopic(topic);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Pre-IELTS Foundation CTA Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/20 text-white rounded text-[10px] font-black uppercase tracking-wider">
              NEW • জিরো থেকে শুরু
            </span>
            <span className="text-xs font-bold text-amber-100">বেসিক থেকে অ্যাডভান্সড পূর্ণাঙ্গ একাডেমি</span>
          </div>
          <p className="text-xs font-medium text-white/90">
            আইএলটিএস শুরু করার আগে ১২টি টেন্স, ভয়েস, ক্লজ ও প্রিপজিশন শিখতে <strong>Pre-IELTS Foundation Academy</strong> ওপেন করুন।
          </p>
        </div>
        <Link
          href="/foundation"
          className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-100 text-xs font-black rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
        >
          <span>একাডেমি ওপেন করুন</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E11D48]" />
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Grammar Masterclass
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold font-mono">
              BAND 8.0+
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Master the complex sentence structures that IELTS examiners look for in Grammatical Range & Accuracy
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
          <span>⚡ 3/12 Lessons Completed</span>
        </div>
      </div>

      {/* Topics Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {GRAMMAR_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleNextTopic(topic)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTopic.id === topic.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>{topic.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-[#E11D48]">
              {topic.bandTarget}
            </span>
          </button>
        ))}
      </div>

      {/* Main Lesson Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Lesson Info (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {selectedTopic.category}
            </span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-extrabold border border-emerald-200">
              Target: {selectedTopic.bandTarget}
            </span>
          </div>

          <h2 className="text-xl font-black text-slate-900">
            {selectedTopic.title}
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedTopic.explanation}
          </p>

          {/* Formula Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider font-bold">
              Syntactic Rule Formula:
            </div>
            <div className="text-xs font-mono font-semibold text-slate-100">
              {selectedTopic.ruleFormula}
            </div>
          </div>

          {/* Comparison: Band 6 vs Band 8+ */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Before & After Examiner Transformation:
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Standard Band 6.0 Construction:</div>
              <div className="text-xs text-slate-500 line-through">"{selectedTopic.simpleExample}"</div>
            </div>

            <div className="p-3.5 bg-rose-50/50 border border-rose-200/80 rounded-xl space-y-1">
              <div className="text-[10px] font-bold text-[#E11D48] uppercase">Band 8.5+ Complex Academic Construction:</div>
              <div className="text-xs font-bold text-slate-900">⭐ "{selectedTopic.band8Example}"</div>
            </div>
          </div>
        </div>

        {/* Right Interactive Quiz (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            <HelpCircle className="w-4 h-4 text-[#E11D48]" />
            <span>Examiner Concept Check</span>
          </div>

          <p className="text-xs text-slate-800 font-bold leading-relaxed">
            {selectedTopic.quiz.question}
          </p>

          <div className="space-y-2">
            {selectedTopic.quiz.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === selectedTopic.quiz.correctIndex;
              let btnClass = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';

              if (showAnswer) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={showAnswer}
                  className={`w-full p-3 rounded-xl border text-left text-xs leading-relaxed transition-all flex items-start gap-2.5 ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 animate-fadeIn">
              <div className="font-bold text-slate-900">
                {selectedOption === selectedTopic.quiz.correctIndex ? '✅ Excellent! Correct answer.' : '❌ Incorrect.'}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {selectedTopic.quiz.explanation}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
