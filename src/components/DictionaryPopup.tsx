'use client';

import React from 'react';
import { Volume2, BookMarked, X, Sparkles } from 'lucide-react';
import { WordDefinition } from '@/lib/types';

interface DictionaryPopupProps {
  wordInfo: WordDefinition | null;
  position: { top: number; left: number } | null;
  onClose: () => void;
  onSaveToBank?: (word: string) => void;
}

export const DictionaryPopup: React.FC<DictionaryPopupProps> = ({
  wordInfo,
  position,
  onClose,
  onSaveToBank
}) => {
  if (!wordInfo || !position) return null;

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordInfo.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      style={{
        top: `${Math.max(10, position.top)}px`,
        left: `${Math.min(window.innerWidth - 340, Math.max(10, position.left))}px`,
      }}
      className="fixed z-50 w-80 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-xl shadow-2xl p-4 transition-all duration-200 animate-in fade-in zoom-in-95 text-slate-900 dark:text-slate-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {wordInfo.word}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 italic font-mono">
            {wordInfo.partOfSpeech}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={playAudio}
            title="Listen pronunciation"
            className="p-1.5 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Phonetic */}
      <div className="text-xs text-slate-500 font-mono mt-1">
        {wordInfo.phonetic}
      </div>

      {/* Bangla Meaning (Highlighted) */}
      <div className="mt-2.5 p-2 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900">
        <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          বাংলা অর্থ:
        </div>
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
          {wordInfo.banglaMeaning}
        </div>
      </div>

      {/* English Definition */}
      <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Definition: </span>
        {wordInfo.englishDefinition}
      </div>

      {/* Synonyms */}
      {wordInfo.synonyms && wordInfo.synonyms.length > 0 && (
        <div className="mt-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">IELTS Synonyms:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {wordInfo.synonyms.map((s, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
        <button
          onClick={() => onSaveToBank && onSaveToBank(wordInfo.word)}
          className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium py-1 px-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
        >
          <BookMarked className="w-3.5 h-3.5" />
          ভোকাবুলারি ব্যাংকে সেভ করুন
        </button>
      </div>
    </div>
  );
};
