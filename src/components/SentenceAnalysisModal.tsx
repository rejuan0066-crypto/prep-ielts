'use client';

import React from 'react';
import { X, Sparkles, BookOpen, Layers } from 'lucide-react';

interface SentenceAnalysisModalProps {
  sentence: string;
  onClose: () => void;
}

export const SentenceAnalysisModal: React.FC<SentenceAnalysisModalProps> = ({
  sentence,
  onClose,
}) => {
  if (!sentence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">AI বাক্য বিশ্লেষণ ও বাংলা অনুবাদ</h3>
              <p className="text-xs text-slate-500">IELTS Sentence Structure & Translation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Sentence */}
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            নির্বাচিত বাক্য:
          </div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
            &ldquo;{sentence}&rdquo;
          </p>
        </div>

        {/* Bangla Translation */}
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
            <BookOpen className="w-4 h-4" />
            সহজ বাংলা অনুবাদ:
          </div>
          <p className="text-sm font-medium text-emerald-950 dark:text-emerald-100 leading-relaxed">
            &ldquo;শহরের জনসংখ্যা যেমন দ্রুত বাড়ছে, তেমনি নাগরিকদের সার্বিক সুস্থতা ও মানসিক ভারসাম্য রক্ষায় নগর পরিকল্পনাবিদদের উল্লেখযোগ্য প্রতিকূলতার মুখোমুখি হতে হচ্ছে।&rdquo;
          </p>
        </div>

        {/* Structural Breakdown */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            ব্যাকরণগত গঠন বিশ্লেষণ (Grammar Breakdown):
          </div>

          <div className="text-xs p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">১. Dependent Clause: </span>
              &quot;As world populations continue to concentrate in metropolitan areas...&quot; (কারণ বা সময় নির্দেশক অংশ)
            </div>
            <div>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">২. Main Clause: </span>
              &quot;urban planners face substantial challenges...&quot; (প্রধান বাক্য যাতে মূল বক্তব্য উপস্থাপন করা হয়েছে)
            </div>
            <div>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">৩. IELTS Band 8 Tip: </span>
              এখানে সাধারণ &quot;big problems&quot; না লিখে উচ্চমানের একাডেমিক শব্দ <strong>&quot;substantial challenges&quot;</strong> ব্যবহার করা হয়েছে।
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-medium transition-colors shadow-md shadow-indigo-500/20"
          >
            বুঝেছি, ধন্যবাদ
          </button>
        </div>
      </div>
    </div>
  );
};
