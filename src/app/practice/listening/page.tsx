'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CAMBRIDGE_BOOKS_REGISTRY } from '@/lib/cambridgeBooksRegistry';
import { OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM } from '@/lib/cambridge18ListeningOfficial';
import { OFFICIAL_MOCK_TEST_SETS, generateDynamicMockTest } from '@/lib/dynamicMockExamRegistry';
import { WordDefinition, FullListeningExam, ListeningSection } from '@/lib/types';
import { DictionaryPopup } from '@/components/DictionaryPopup';
import { DICTIONARY_DATABASE } from '@/lib/mockData';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Library, 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Radio, 
  Award, 
  Eye, 
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';

// Web Audio API Chime Generator for CD-IELTS Test Tones
function playExamTone() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // First chime (D5 - 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.2, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.4);

    // Second chime (A5 - 880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
    gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.2);
    osc2.stop(ctx.currentTime + 0.7);
  } catch (e) {
    // Ignore audio context errors if blocked
  }
}

function ListeningMockExamContent() {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get('book');
  const testParam = searchParams.get('test');
  const modeParam = searchParams.get('mode');
  const setIdParam = searchParams.get('setId');
  const seedParam = searchParams.get('seed');

  // Exam Mode: 'cambridge' (Books 1-19) or 'mock' (Dynamic Mock Sets)
  const [examMode, setExamMode] = useState<'cambridge' | 'mock'>(modeParam === 'mock' ? 'mock' : 'cambridge');
  const [selectedMockSetId, setSelectedMockSetId] = useState<number>(setIdParam ? parseInt(setIdParam, 10) : 1);
  const [dynamicSeed, setDynamicSeed] = useState<number>(seedParam ? parseInt(seedParam, 10) : 101);

  const [selectedBookNum, setSelectedBookNum] = useState<number>(bookParam ? parseInt(bookParam, 10) : 18);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(testParam ? parseInt(testParam, 10) : 1);

  // Retrieve active listening exam
  const getInitialExam = (): FullListeningExam => {
    if (modeParam === 'mock') {
      const sId = setIdParam ? parseInt(setIdParam, 10) : 1;
      const initialSeed = seedParam ? parseInt(seedParam, 10) : 101;
      if (sId === 0) return generateDynamicMockTest(initialSeed).listeningExam;
      const f = OFFICIAL_MOCK_TEST_SETS.find(s => s.setId === sId) || OFFICIAL_MOCK_TEST_SETS[0];
      return f.listeningExam;
    }
    const bNum = bookParam ? parseInt(bookParam, 10) : 18;
    const tNum = testParam ? parseInt(testParam, 10) : 1;
    const bookCollection = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === bNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
    return (bNum === 18 && tNum === 1)
      ? OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM
      : (bookCollection.listeningTests.find(t => t.testNumber === tNum) || bookCollection.listeningTests[0]);
  };

  const [exam, setExam] = useState<FullListeningExam>(getInitialExam());

  // Active Section: 0 | 1 | 2 | 3 (Section 1, 2, 3, 4)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const currentSection = exam.sections[activeSectionIndex] || exam.sections[0];

  // Active Question being viewed
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);

  // Student Answers (Key: question id 1 to 40, Value: selected answer)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // 30-Minute Countdown Timer
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Real Audible Audio Engine State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSeconds, setAudioSeconds] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(420);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // HTML5 Audio Reference for authentic Cambridge MP3s
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Exam Mode vs Practice Mode (Transcript toggle)
  const [practiceModeShowTranscript, setPracticeModeShowTranscript] = useState<boolean>(false);
  const [soundCheckTested, setSoundCheckTested] = useState<boolean>(false);

  // Dictionary Popup State
  const [popupWord, setPopupWord] = useState<WordDefinition | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);

  // SpeechSynthesis reference for fallback
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Synchronize volume and speed to native audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = audioSpeed;
    }
  }, [volume, isMuted, audioSpeed]);

  // Play authentic MP3 audio or fallback to SpeechSynthesis
  const startAudioPlayback = () => {
    if (currentSection.audioUrl && audioRef.current) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      playExamTone();
      audioRef.current.playbackRate = audioSpeed;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch((err) => {
          console.warn('Native HTML5 audio playback restricted, falling back to synthesis:', err);
          speakSectionAudio();
        });
    } else {
      speakSectionAudio();
    }
  };

  // Play real spoken audio through browser speakers / headphones fallback
  const speakSectionAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    playExamTone();

    const cleanTranscript = currentSection.audioTranscript
      .replace(/\[.*?\]/g, '')
      .replace(/OFFICIAL ANNOUNCER:/g, 'Official Announcer:')
      .replace(/MAN:/g, '')
      .replace(/SADIE:/g, '')
      .replace(/SPEAKER:/g, '')
      .replace(/HUGO:/g, '')
      .replace(/CHANTAL:/g, '')
      .replace(/CALLER:/g, '')
      .replace(/AGENT:/g, '')
      .replace(/DIRECTOR:/g, '')
      .replace(/DR. COLLINS:/g, 'Doctor Collins:')
      .replace(/EMMA:/g, '')
      .replace(/JACK:/g, '')
      .replace(/PROFESSOR:/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanTranscript);
    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en_GB')) || 
                    voices.find(v => v.lang.includes('en'));
    if (ukVoice) utterance.voice = ukVoice;

    utterance.rate = audioSpeed;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudioPlayback();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = pct * (audioDuration || 420);
    setAudioSeconds(Math.floor(targetSeconds));
    if (audioRef.current) {
      audioRef.current.currentTime = targetSeconds;
    }
  };

  // Sound check test button
  const testHeadphoneAudio = () => {
    playExamTone();
    if (audioRef.current && currentSection.audioUrl) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        setSoundCheckTested(true);
        setTimeout(() => {
          if (audioRef.current && !isPlayingAudio) {
            audioRef.current.pause();
          }
        }, 5000);
      }).catch(() => {
        // Fallback to speech
        fallbackSoundCheck();
      });
    } else {
      fallbackSoundCheck();
    }
  };

  const fallbackSoundCheck = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const testUtterance = new SpeechSynthesisUtterance(
        "This is an official Cambridge Listening sound check. If you can hear this audio clearly in your headphones, your setup is working properly."
      );
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en_GB')) || voices.find(v => v.lang.includes('en'));
      if (ukVoice) testUtterance.voice = ukVoice;
      testUtterance.volume = isMuted ? 0 : volume;
      testUtterance.onstart = () => setIsPlayingAudio(true);
      testUtterance.onend = () => {
        setIsPlayingAudio(false);
        setSoundCheckTested(true);
      };
      window.speechSynthesis.speak(testUtterance);
    }
  };

  // When section or test changes, stop audio, reset and reload audio
  useEffect(() => {
    stopAudio();
    setAudioSeconds(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [activeSectionIndex, selectedBookNum, selectedTestNum]);

  // Audio duration initialization from section
  useEffect(() => {
    if (currentSection.audioDurationSeconds) {
      setAudioDuration(currentSection.audioDurationSeconds);
    }
  }, [currentSection]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When exam mode, book/test, or mock set changes
  useEffect(() => {
    stopAudio();
    if (examMode === 'mock') {
      let mExam: FullListeningExam;
      if (selectedMockSetId === 0) {
        mExam = generateDynamicMockTest(dynamicSeed).listeningExam;
      } else {
        const found = OFFICIAL_MOCK_TEST_SETS.find(s => s.setId === selectedMockSetId) || OFFICIAL_MOCK_TEST_SETS[0];
        mExam = found.listeningExam;
      }
      setExam(mExam);
    } else {
      const bColl = CAMBRIDGE_BOOKS_REGISTRY.find(b => b.bookNumber === selectedBookNum) || CAMBRIDGE_BOOKS_REGISTRY[1];
      const nExam = (selectedBookNum === 18 && selectedTestNum === 1)
        ? OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM
        : (bColl.listeningTests.find(t => t.testNumber === selectedTestNum) || bColl.listeningTests[0]);
      setExam(nExam);
    }
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(30 * 60);
    setIsSubmitted(false);
    setActiveSectionIndex(0);
    setActiveQuestionId(1);
    setAudioSeconds(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [examMode, selectedMockSetId, dynamicSeed, selectedBookNum, selectedTestNum]);

  // Audio progress ticker
  useEffect(() => {
    if (!isPlayingAudio || isSubmitted) return;
    const interval = setInterval(() => {
      setAudioSeconds(prev => (prev < 1800 ? prev + 1 : prev));
    }, 1000 / audioSpeed);
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioSpeed, isSubmitted]);

  // 30-Minute Exam Countdown Timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) {
      if (timeLeft <= 0 && !isSubmitted) {
        setIsSubmitted(true);
        stopAudio();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSelectAnswer = (qId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const jumpToQuestion = (qId: number) => {
    setActiveQuestionId(qId);
    if (qId <= 10) setActiveSectionIndex(0);
    else if (qId <= 20) setActiveSectionIndex(1);
    else if (qId <= 30) setActiveSectionIndex(2);
    else setActiveSectionIndex(3);

    if (typeof document !== 'undefined') {
      const el = document.getElementById(`listening-q-${qId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Double-click word dictionary
  const handleTranscriptDoubleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const rawWord = selection.toString().trim().toLowerCase().replace(/[^a-zA-Z]/g, '');
    if (!rawWord) return;

    const matchedDef = DICTIONARY_DATABASE[rawWord];
    if (matchedDef) {
      setPopupWord(matchedDef);
      setPopupPos({
        top: e.clientY + 15,
        left: Math.min(e.clientX, window.innerWidth - 340),
      });
    }
  };

  // Intelligent Answer Matching for CD-IELTS evaluation
  const normalizeAnswer = (ans?: string) => {
    if (!ans) return '';
    return ans.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/\s+/g, ' ');
  };

  const isQuestionCorrect = (userAns?: string, correctAns?: string) => {
    if (!userAns || !correctAns) return false;
    const cleanUser = normalizeAnswer(userAns);
    const cleanCorrect = normalizeAnswer(correctAns);
    if (cleanUser === cleanCorrect) return true;

    // Support slash-separated variants, e.g. "dw30 7yz / 7yz"
    if (correctAns.includes('/')) {
      const parts = correctAns.split('/').map(normalizeAnswer);
      if (parts.includes(cleanUser)) return true;
    }

    // Special allowance for Postcodes: '7yz' vs 'dw30 7yz'
    if (cleanCorrect === '7yz' && cleanUser === 'dw30 7yz') return true;
    if (cleanCorrect === 'dw30 7yz' && cleanUser === '7yz') return true;

    // For multiple choice where user selects option text starting with the key
    if (cleanCorrect.startsWith(cleanUser + ' ') || cleanCorrect.startsWith(cleanUser + '.')) return true;

    return false;
  };

  // Calculate official Listening Band Score out of 40
  const calculateTotalCorrect = () => {
    let count = 0;
    exam.sections.forEach(s => {
      s.questions.forEach(q => {
        if (isQuestionCorrect(userAnswers[q.id], q.correctAnswer)) count++;
      });
    });
    return count;
  };

  const calculateBandScore = (score: number) => {
    if (score >= 39) return '9.0';
    if (score >= 37) return '8.5';
    if (score >= 35) return '8.0';
    if (score >= 32) return '7.5';
    if (score >= 30) return '7.0';
    if (score >= 26) return '6.5';
    if (score >= 23) return '6.0';
    if (score >= 18) return '5.5';
    if (score >= 16) return '5.0';
    if (score >= 13) return '4.5';
    return '4.0';
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalCorrect = calculateTotalCorrect();
  const overallBand = calculateBandScore(totalCorrect);

  const resetExam = () => {
    stopAudio();
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(30 * 60);
    setIsSubmitted(false);
    setActiveSectionIndex(0);
    setActiveQuestionId(1);
    setAudioSeconds(0);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] overflow-hidden select-none">
      
      {/* 1. TOP CONTROLS & BOOK SELECTOR */}
      <div className="bg-slate-950 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs shrink-0 z-30">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/dashboard"
            onClick={stopAudio}
            className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg font-bold border border-rose-500/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>এক্সিট (Exit Exam)</span>
          </Link>

          <Link
            href="/library"
            onClick={stopAudio}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold border border-slate-700 transition-colors"
          >
            <Library className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>লাইব্রেরি (Books 1–19)</span>
          </Link>

          {/* Mode Switcher: Cambridge Series vs Full Mock Test */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setExamMode('cambridge')}
              className={`px-2.5 py-1 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                examMode === 'cambridge'
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Library className="w-3 h-3" />
              <span>কেমব্রিজ সিরিজ</span>
            </button>
            <button
              onClick={() => setExamMode('mock')}
              className={`px-2.5 py-1 rounded-md text-xs font-black transition-all flex items-center gap-1.5 ${
                examMode === 'mock'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>ফুল মক টেস্ট</span>
            </button>
          </div>

          {examMode === 'cambridge' ? (
            <>
              {/* Book Dropdown (1 to 19) */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
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

              {/* Test Number (1 to 4) */}
              <div className="flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded-lg border border-slate-700">
                {[1, 2, 3, 4].map(tNum => (
                  <button
                    key={tNum}
                    onClick={() => setSelectedTestNum(tNum)}
                    className={`px-2.5 py-1 rounded-md text-xs font-black transition-all ${
                      selectedTestNum === tNum
                        ? 'bg-[#E11D48] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Test {tNum}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Mock Test Sets & Dynamic Shuffler */
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-[10px] text-amber-400 font-bold uppercase">মক সেট:</span>
                <select
                  value={selectedMockSetId}
                  onChange={(e) => setSelectedMockSetId(parseInt(e.target.value, 10))}
                  className="bg-transparent text-white font-black text-xs cursor-pointer focus:outline-none"
                >
                  <option value={1} className="bg-slate-900 text-white">Mock Set 1 (BC Standard 2025/2026)</option>
                  <option value={2} className="bg-slate-900 text-white">Mock Set 2 (IDP High-Yield Band 7.5+)</option>
                  <option value={3} className="bg-slate-900 text-white">Mock Set 3 (Cambridge 19 Pattern)</option>
                  <option value={4} className="bg-slate-900 text-white">Mock Set 4 (Speed & Accuracy Diagnostic)</option>
                  <option value={0} className="bg-slate-900 text-amber-400 font-bold">🎲 পরিবর্তনশীল ডায়নামিক টেস্ট (Randomized)</option>
                </select>
              </div>

              {/* Dynamic Shuffle / New Exam Generator Button */}
              <button
                onClick={() => {
                  setSelectedMockSetId(0);
                  setDynamicSeed(Date.now());
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-black border border-amber-500/40 transition-all flex items-center gap-1.5 shadow-xs"
                title="ক্লিক করলেই সম্পূর্ণ নতুন প্রশ্ন ও অডিও সহ মক টেস্ট তৈরি হবে"
              >
                <RotateCcw className="w-3 h-3" />
                <span>নতুন টেস্ট তৈরি করুন (Shuffle)</span>
              </button>
            </div>
          )}

          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-black border border-blue-500/30 flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5" />
            <span>{examMode === 'mock' ? 'MOCK EXAM RIG' : 'CD-IELTS LISTENING'}</span>
          </span>
        </div>

        {/* Right Info & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Sound Test Button */}
          <button
            onClick={testHeadphoneAudio}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 font-bold transition-all"
            title="হেডফোনে সাউন্ড ঠিক আছে কিনা টেস্ট করুন"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{soundCheckTested ? 'সাউন্ড চেক সম্পন্ন ✓' : 'হেডফোন সাউন্ড টেস্ট (Test Sound)'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'ফুলস্ক্রিন বন্ধ' : 'ফুলস্ক্রিন'}</span>
          </button>
        </div>
      </div>

      {/* 2. OFFICIAL CD-IELTS HEADER WITH AUDIO PLAYER BAR */}
      <header className="bg-slate-900 text-white px-5 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 shadow-md z-20">
        
        {/* Left: Test Details & Section Tabs */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E11D48] to-rose-600 flex items-center justify-center font-black text-sm shadow-sm">
            {selectedBookNum}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-100">
                {exam.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                British Council Official Audio Stream
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              30 Minutes Listening Test • 4 Sections • 40 Questions
            </div>
          </div>
        </div>

        {/* Center: 4 Sections Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          {exam.sections.map((sec, idx) => (
            <button
              key={sec.sectionNumber}
              onClick={() => {
                setActiveSectionIndex(idx);
                setActiveQuestionId(sec.questions[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSectionIndex === idx
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Section {sec.sectionNumber}</span>
              <span className="text-[10px] opacity-80 font-mono">({sec.questionRange})</span>
            </button>
          ))}
        </div>

        {/* Right: Timer & Submit Button */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-inner ${
            timeLeft < 300 
              ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
              : 'bg-slate-800 text-amber-300 border border-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={() => {
                if (answeredCount < 40) {
                  const conf = confirm(`You have answered ${answeredCount} of 40 questions. Are you sure you want to finish and submit the Listening exam?`);
                  if (!conf) return;
                }
                stopAudio();
                setIsSubmitted(true);
              }}
              className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Listening</span>
            </button>
          ) : (
            <button
              onClick={resetExam}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake 40 Qs</span>
            </button>
          )}
        </div>

      </header>

      {/* 3. DEDICATED REAL AUDIBLE AUDIO CONTROLLER STRIP */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 px-5 py-3 flex flex-wrap items-center justify-between gap-4 text-xs text-white shrink-0 shadow-inner">
        
        {/* Hidden Native HTML5 Audio for Official Cambridge MP3 Recordings */}
        <audio
          ref={audioRef}
          src={currentSection.audioUrl}
          preload="auto"
          onPlay={() => setIsPlayingAudio(true)}
          onPause={() => setIsPlayingAudio(false)}
          onEnded={() => {
            setIsPlayingAudio(false);
            setAudioSeconds(0);
          }}
          onError={(e) => {
            console.warn("Audio file streaming warning, fallback active:", e);
            if (isPlayingAudio) {
              speakSectionAudio();
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setAudioSeconds(Math.floor(audioRef.current.currentTime));
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current && audioRef.current.duration) {
              setAudioDuration(Math.floor(audioRef.current.duration));
            }
          }}
        />

        {/* Play/Pause & Real British Spoken Audio Engine */}
        <div className="flex items-center gap-3 flex-1 min-w-[320px]">
          <button
            onClick={toggleAudio}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-md transform hover:scale-105 ${
              isPlayingAudio 
                ? 'bg-[#E11D48] text-white shadow-rose-500/30 animate-pulse' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/30'
            }`}
            title={isPlayingAudio ? 'Pause Section Audio' : 'Play Official Cambridge Audio'}
          >
            {isPlayingAudio ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlayingAudio ? 'bg-[#E11D48] animate-ping' : 'bg-slate-500'}`} />
                <span className={isPlayingAudio ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                  {isPlayingAudio 
                    ? `অফিসিয়াল কেমব্রিজ লিসেনিং অডিও চলছে (Section ${currentSection.sectionNumber})` 
                    : `Section ${currentSection.sectionNumber} অরিজিনাল অডিও শুনতে প্লে করুন`}
                </span>
              </span>
              <span className="text-slate-400 font-mono">
                {formatTimer(audioSeconds)} / {formatTimer(audioDuration || 420)}
              </span>
            </div>

            {/* Clickable Progress Bar & Audio Equalizer Bars */}
            <div className="flex items-center gap-3">
              <div 
                onClick={handleSeek}
                title="ক্লিক করে অডিওর যেকোনো অংশে এগিয়ে যান"
                className="flex-1 bg-slate-700 hover:bg-slate-600 h-2.5 rounded-full overflow-hidden relative cursor-pointer group transition-colors"
              >
                <div 
                  className="bg-gradient-to-r from-[#E11D48] via-rose-500 to-amber-400 h-full transition-all duration-150"
                  style={{ width: `${Math.min(100, Math.max(1, (audioSeconds / (audioDuration || 420)) * 100))}%` }}
                />
              </div>

              {/* Animated Audio Equalizer Bars */}
              {isPlayingAudio && (
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-[#E11D48] h-3 animate-bounce rounded-full" />
                  <span className="w-1 bg-rose-400 h-4 animate-pulse rounded-full" />
                  <span className="w-1 bg-amber-400 h-2 animate-bounce rounded-full" />
                  <span className="w-1 bg-[#E11D48] h-3.5 animate-pulse rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Speed, Volume & Script Toggle */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-16 accent-[#E11D48] cursor-pointer"
              title="Volume"
            />
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-700 font-mono text-xs">
            {[0.8, 1.0, 1.2].map(spd => (
              <button
                key={spd}
                onClick={() => setAudioSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  audioSpeed === spd ? 'bg-[#E11D48] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Transcript / Practice Mode Switch */}
          <button
            onClick={() => setPracticeModeShowTranscript(!practiceModeShowTranscript)}
            className={`px-3 py-1.5 rounded-xl font-bold border transition-colors flex items-center gap-1.5 ${
              practiceModeShowTranscript
                ? 'bg-rose-500/20 text-[#E11D48] border-rose-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="প্র্যাকটিস মোডে অডিও স্ক্রিপ্ট দেখার অপশন"
          >
            {practiceModeShowTranscript ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{practiceModeShowTranscript ? 'Transcript লুকান' : 'Transcript দেখুন (Practice)'}</span>
          </button>
        </div>

      </div>

      {/* 4. MAIN SPLIT SCREEN: Section Scenario Briefing on Left, Official Questions on Right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Side: Listening Context Briefing & Audio Transcript (Hidden during strict exam, revealed in practice mode) */}
        <div 
          onDoubleClick={handleTranscriptDoubleClick}
          className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white border-r border-slate-200 select-text selection:bg-rose-100 space-y-6"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#E11D48] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                SECTION {currentSection.sectionNumber}
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">
                {currentSection.questionRange}
              </span>
            </div>

            <span className="text-xs text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">
              {currentSection.contextType}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentSection.sectionTitle}
          </h2>

          {/* Official Instructions Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-800">
            <div className="flex items-center gap-2 font-black text-slate-900">
              <Headphones className="w-4 h-4 text-[#E11D48]" />
              <span>Official British Council CD-IELTS Instructions:</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Listen to the recording carefully. In the official test, you will hear each section <strong>ONCE only</strong>.
              Answer Questions {currentSection.questionRange} on the right-hand panel while listening.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleAudio}
                className="px-4 py-2 bg-slate-900 hover:bg-[#E11D48] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'অডিও থামান (Pause)' : `Section ${currentSection.sectionNumber} অডিও শুনুন`}</span>
              </button>

              <button
                onClick={testHeadphoneAudio}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>হেডফোন টেস্ট</span>
              </button>
            </div>
          </div>

          {/* Audio Transcript: Revealed if practice mode or after test submitted */}
          {(practiceModeShowTranscript || isSubmitted) ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Official Audio Transcript (British Accent Dialogue)</span>
                </span>
                <span className="text-[11px] text-slate-400">শব্দে ডাবল ক্লিক করে বাংলা অর্থ দেখুন</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
                {currentSection.audioTranscript.split('\n').map((line, idx) => (
                  <p key={idx} className="cursor-text">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            /* Strict Exam Placeholder Box */
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3 text-xs text-slate-500 bg-slate-50/50">
              <Radio className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">
                অফিসিয়াল এক্সাম মোড সক্রিয়
              </div>
              <p className="max-w-md mx-auto leading-relaxed">
                আসল আইএলটিএস লিসেনিং পরীক্ষায় স্ক্রিপ্ট দেখা যায় না। উপরের প্লে বাটনে চাপ দিয়ে হেডফোনে মনোযোগ দিয়ে শুনে ডান পাশের প্রশ্নগুলোর উত্তর দিন।
              </p>
              <button
                onClick={() => setPracticeModeShowTranscript(true)}
                className="text-xs text-[#E11D48] font-bold hover:underline inline-flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>প্র্যাকটিস করতে চাইলে এখানে ক্লিক করে Transcript দেখুন</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Section Questions (10 Questions per section) */}
        <div className="w-full md:w-[500px] lg:w-[560px] p-6 overflow-y-auto bg-[#F8FAFC] shrink-0 space-y-6">
          
          {/* Exam Result Banner (Visible after submission) */}
          {isSubmitted && (
            <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Cambridge Listening Result
                  </span>
                  <div className="text-2xl font-black mt-0.5">
                    Score: {totalCorrect} / 40 Correct
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Band Score
                  </span>
                  <div className="text-3xl font-black text-emerald-400">
                    Band {overallBand}
                  </div>
                </div>
              </div>

              {/* 4 Sections Breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {exam.sections.map(s => {
                  let sScore = 0;
                  s.questions.forEach(q => {
                    if (isQuestionCorrect(userAnswers[q.id], q.correctAnswer)) sScore++;
                  });
                  return (
                    <div key={s.sectionNumber} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                      <div className="text-[10px] text-slate-400 font-bold">Sec {s.sectionNumber}</div>
                      <div className="text-sm font-black text-slate-100 mt-0.5">{sScore}/10</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Question Header */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
            <div className="font-bold text-slate-800">
              <span>Section {currentSection.sectionNumber} Questions: {currentSection.questionRange}</span>
            </div>
            <div className="text-slate-500 font-mono">
              {currentSection.questions.filter(q => !!userAnswers[q.id]).length} of 10 Answered
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {currentSection.questions.map((q) => {
              const isCurrentQuestion = activeQuestionId === q.id;
              const isAnswered = !!userAnswers[q.id];
              const isFlagged = flaggedQuestions.has(q.id);
              const isCorrect = isQuestionCorrect(userAnswers[q.id], q.correctAnswer);

              return (
                <div
                  key={q.id}
                  id={`listening-q-${q.id}`}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all ${
                    isCurrentQuestion
                      ? 'border-[#E11D48] shadow-md ring-2 ring-rose-50'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {q.id}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase tracking-wider font-mono">
                        {q.type === 'fill-blanks' ? 'Form / Note Completion (Type)' : q.type}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlag(q.id);
                      }}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                        isFlagged ? 'bg-amber-100 text-amber-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Flag for review"
                    >
                      <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span className="text-[10px]">{isFlagged ? 'Review' : 'Flag'}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Answer Input: Text input for fill-in-the-blanks, or options list */}
                  {q.type === 'fill-blanks' ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={userAnswers[q.id] || ''}
                          onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                          placeholder="কিবোর্ড দিয়ে শুনে শুনে টাইপ করুন (e.g. ONE WORD AND/OR A NUMBER)..."
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-mono font-bold transition-all focus:outline-none focus:ring-2 ${
                            isSubmitted
                              ? (isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                                  : 'bg-rose-50 border-rose-400 text-rose-900')
                              : (userAnswers[q.id]
                                  ? 'bg-white border-[#E11D48] text-[#E11D48] ring-2 ring-rose-50'
                                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#E11D48]')
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                        <span>আইএলটিএস নিয়ম: কোনো অপশন থাকবে না, অডিও শুনে টাইপ করতে হবে</span>
                        {userAnswers[q.id] && !isSubmitted && (
                          <span className="text-emerald-600 font-bold font-mono">লিখেছেন: {userAnswers[q.id]}</span>
                        )}
                      </div>

                      {/* Submitted feedback for fill-in-blanks */}
                      {isSubmitted && (
                        <div className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between ${
                          isCorrect ? 'bg-emerald-100/70 text-emerald-800' : 'bg-rose-100/70 text-rose-800'
                        }`}>
                          <span>{isCorrect ? '✓ আপনার উত্তর সঠিক হয়েছে!' : '✗ ভুল হয়েছে'}</span>
                          <span className="text-[11px]">সঠিক উত্তর: <strong className="underline">{q.correctAnswer}</strong></span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Multiple Choice & Matching Options */
                    <div className="space-y-2">
                      {q.options?.map((opt, optIdx) => {
                        const isOptionChosen = userAnswers[q.id] === opt;
                        let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300';

                        if (isSubmitted) {
                          if (opt === q.correctAnswer) {
                            optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                          } else if (isOptionChosen && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                          }
                        } else if (isOptionChosen) {
                          optionStyle = 'bg-rose-50/70 border-[#E11D48] text-[#E11D48] font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span className="leading-snug">{opt}</span>
                            {isSubmitted && opt === q.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {isSubmitted && isOptionChosen && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Post-Submit Review & Citation */}
                  {isSubmitted && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-in fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <HelpCircle className="w-4 h-4 text-[#E11D48]" />
                        <span>Cambridge Audio Key & Explanation:</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {q.explanation}
                      </p>
                      {q.passageQuote && (
                        <div className="p-2.5 bg-blue-50/60 border-l-2 border-blue-500 text-blue-900 text-[11px] italic font-mono">
                          "{q.passageQuote}"
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 5. OFFICIAL CD-IELTS BOTTOM 1–40 QUESTION GRID FOOTER */}
      <footer className="bg-white border-t border-slate-200 px-5 py-3 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg z-20">
        
        {/* Prev / Next Question controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeQuestionId > 1) {
                jumpToQuestion(activeQuestionId - 1);
              }
            }}
            disabled={activeQuestionId <= 1}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              if (activeQuestionId < 40) {
                jumpToQuestion(activeQuestionId + 1);
              }
            }}
            disabled={activeQuestionId >= 40}
            className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-slate-700 ml-1">
            Question {activeQuestionId} of 40
          </span>
        </div>

        {/* Full 1–40 Question Navigation Palette */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-2xl py-1 px-2 scrollbar-none">
          {Array.from({ length: 40 }).map((_, idx) => {
            const qNum = idx + 1;
            const isAnswered = !!userAnswers[qNum];
            const isSelected = activeQuestionId === qNum;
            const isFlagged = flaggedQuestions.has(qNum);

            let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

            if (isSubmitted) {
              const allQuestions = exam.sections.flatMap(s => s.questions);
              const targetQ = allQuestions.find(q => q.id === qNum);
              const isCorrect = userAnswers[qNum] === targetQ?.correctAnswer;
              btnClass = isCorrect ? 'bg-emerald-600 text-white font-bold' : 'bg-[#E11D48] text-white font-bold';
            } else if (isAnswered) {
              btnClass = 'bg-slate-900 text-white font-bold';
            }

            return (
              <button
                key={qNum}
                onClick={() => jumpToQuestion(qNum)}
                className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 border transition-all relative ${btnClass} ${
                  isSelected ? 'ring-2 ring-[#E11D48] ring-offset-1 scale-110 z-10' : ''
                }`}
                title={`Question ${qNum} ${isAnswered ? '(Answered)' : '(Unanswered)'}`}
              >
                <span>{qNum}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answered Progress stats & Flag button */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="font-extrabold text-slate-900">{answeredCount} of 40</span>
            <span className="text-slate-400 text-[11px]"> answered</span>
          </div>

          <button
            onClick={() => toggleFlag(activeQuestionId)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              flaggedQuestions.has(activeQuestionId)
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.has(activeQuestionId) ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>Review</span>
          </button>
        </div>

      </footer>

      {/* Dictionary Popup Modal on Double Click */}
      {popupWord && popupPos && (
        <DictionaryPopup
          wordInfo={popupWord}
          position={popupPos}
          onClose={() => setPopupWord(null)}
          onSaveToBank={() => {}}
        />
      )}

    </div>
  );
}

export default function FullCambridgeListeningMockPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <div className="w-6 h-6 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
          <span>ক্যামব্রিজ লিসেনিং টেস্ট লোড হচ্ছে...</span>
        </div>
      </div>
    }>
      <ListeningMockExamContent />
    </Suspense>
  );
}
