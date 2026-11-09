'use client';

import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Award,
  TrendingUp
} from 'lucide-react';

const SAMPLE_TEXT = "In today's interconnected global economy, higher education plays a pivotal role in equipping candidates with the analytical competencies and specialized knowledge required to navigate competitive industries successfully.";

export default function TypingSpeedPage() {
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
    setUserInput(e.target.value);

    // If completed text
    if (e.target.value.length >= SAMPLE_TEXT.length) {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setTimer(60);
    setIsActive(false);
    setIsFinished(false);
  };

  // Calculations
  const wordsTyped = userInput.trim() ? userInput.trim().split(/\s+/).length : 0;
  const timeElapsed = 60 - timer;
  const wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;

  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === SAMPLE_TEXT[i]) correctChars++;
  }
  const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Keyboard className="w-7 h-7 text-[#E11D48]" />
              <span>CD-IELTS Typing Speed Trainer</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              কম্পিউটার ডেলিভার্ড আইএলটিএস রাইটিংয়ে নির্ধারিত সময়ে ২৫০+ শব্দ লেখার জন্য আপনার টাইপিং গতি বাড়ান
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিসেট করুন</span>
          </button>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">গতি (WPM)</span>
            <div className="text-3xl font-black text-[#E11D48] mt-1">{wpm}</div>
            <span className="text-[10px] text-slate-400">শব্দ প্রতি মিনিট</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">নির্ভুলতা (Accuracy)</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{accuracy}%</div>
            <span className="text-[10px] text-slate-400">বানান সঠিকতা</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">সময় বাকি</span>
            <div className="text-3xl font-black text-slate-900 mt-1 font-mono">00:{timer.toString().padStart(2, '0')}</div>
            <span className="text-[10px] text-slate-400">কাউন্টডাউন</span>
          </div>
        </div>

        {/* Text Prompt Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-serif text-sm sm:text-base leading-relaxed text-slate-600 select-none">
            {SAMPLE_TEXT}
          </div>

          {/* Typing Input */}
          <textarea
            rows={4}
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder="উপরের বাক্যটি দেখে এখানে হুবহু টাইপ করা শুরু করুন (টাইমার স্বয়ংক্রিয়ভাবে চালু হবে)..."
            className="w-full p-4 border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] font-mono leading-relaxed resize-none"
          ></textarea>
        </div>

        {/* Result Breakdown */}
        {isFinished && (
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl shadow-lg flex items-center justify-between animate-in fade-in">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-200">টাইপিং টেস্ট সম্পন্ন!</div>
              <div className="text-2xl font-black mt-0.5">আপনার স্কোর: {wpm} WPM • {accuracy}% Accuracy</div>
              <p className="text-xs text-emerald-100 mt-1">
                {wpm >= 35 
                  ? 'অসাধারণ! আপনার টাইপিং স্পিড আইএলটিএস রাইটিং টাস্ক ২-এর জন্য সম্পূর্ণ প্রস্তুত।' 
                  : 'আপনার গতি আরও একটু বাড়ানো প্রয়োজন। লক্ষ্য রাখুন ৩৫+ WPM।'
                }
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white text-emerald-800 rounded-xl font-bold text-xs shadow-sm hover:bg-slate-50 transition-colors"
            >
              আবার পরীক্ষা দিন
            </button>
          </div>
        )}

    </div>
  );
}
