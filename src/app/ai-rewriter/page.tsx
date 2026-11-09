'use client';

import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function IeltslyAiRewriterPage() {
  const [inputText, setInputText] = useState(
    'In recent years, many people think that technology has bad effects on student study habits because they play phone all day.'
  );
  const [targetBand, setTargetBand] = useState<'Band 7.5' | 'Band 8.0' | 'Band 8.5'>('Band 8.5');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<any | null>({
    rewrittenText:
      'In recent years, a growing consensus contends that pervasive technological immersion exerts a detrimental influence on tertiary academic discipline, primarily attributable to ubiquitous smartphone addiction.',
    vocabularyEnhancements: [
      { original: 'many people think', upgraded: 'a growing consensus contends', type: 'Academic Collocation' },
      { original: 'bad effects', upgraded: 'detrimental influence', type: 'Band 8+ Lexical Resource' },
      { original: 'student study habits', upgraded: 'tertiary academic discipline', type: 'Formal Register' },
      { original: 'they play phone all day', upgraded: 'ubiquitous smartphone addiction', type: 'Syntactic Compression' }
    ],
    grammaticalNotes:
      'Transformed informal coordinating syntax into an authoritative complex declarative sentence utilizing a nominalized prepositional clause ("primarily attributable to...").'
  });

  const handleRewrite = () => {
    if (!inputText.trim()) return;
    setIsRewriting(true);

    setTimeout(() => {
      setIsRewriting(false);
      setResult({
        rewrittenText:
          'Contemporary scholars frequently postulate that digital device saturation significantly impedes scholarly productivity, largely because excessive screen consumption displaces dedicated cognitive focus.',
        vocabularyEnhancements: [
          { original: 'In recent years', upgraded: 'Contemporary scholars frequently postulate', type: 'Academic Framing' },
          { original: 'bad effects', upgraded: 'significantly impedes', type: 'Precision Verb' },
          { original: 'play phone', upgraded: 'excessive screen consumption', type: 'Lexical Range' }
        ],
        grammaticalNotes:
          'Substituted basic subject-verb constructions with sophisticated academic causative structures appropriate for IELTS Academic Task 2 essays.'
      });
    }, 1200);
  };

  const handleCopy = () => {
    if (result?.rewrittenText) {
      navigator.clipboard.writeText(result.rewrittenText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Rewriter
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold font-mono">
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upgrade raw sentences and essay paragraphs into native Band 8.0+ academic prose with one click
          </p>
        </div>

        {/* Target Band Selector */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          {(['Band 7.5', 'Band 8.0', 'Band 8.5'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setTargetBand(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                targetBand === b
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rewriter Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Box: Original Input */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>ORIGINAL DRAFT / SENTENCE</span>
              <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your Task 1 overview or Task 2 body paragraph here..."
              rows={8}
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#E11D48] focus:ring-2 focus:ring-rose-500/10 outline-none text-slate-800 text-sm leading-relaxed resize-none transition-all placeholder:text-slate-400 font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setInputText('')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Clear input
            </button>

            <button
              onClick={handleRewrite}
              disabled={isRewriting || !inputText.trim()}
              className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-slate-300 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-2"
            >
              {isRewriting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Rewriting to {targetBand}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Upgrade to {targetBand}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Box: AI Band 8.5 Output */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#E11D48]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>EXAMINER-REWRITTEN VERSION ({targetBand})</span>
              </span>
              <button
                onClick={handleCopy}
                disabled={!result}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 min-h-[190px] text-slate-900 text-sm font-medium leading-relaxed font-sans">
              {result ? (
                result.rewrittenText
              ) : (
                <div className="text-slate-400 text-xs italic flex items-center justify-center h-full">
                  Click "Upgrade" to generate an authoritative examiner rewrite.
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Grammar & Register Analysis:
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {result.grammaticalNotes}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Vocabulary Transformation Breakdown Table */}
      {result && result.vocabularyEnhancements && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E11D48]" />
            <span>Lexical Upgrades & Idiomatic Collocations Used</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.vocabularyEnhancements.map((v: any, idx: number) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 line-through mr-2">{v.original}</span>
                  <span className="font-extrabold text-slate-900">{v.upgraded}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-50 text-[#E11D48] text-[10px] font-bold border border-rose-100">
                  {v.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
