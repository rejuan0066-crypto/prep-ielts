'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { IELTS_VOCABULARY_DATABASE, VOCABULARY_CATEGORIES, VOCABULARY_BAND_LEVELS } from '@/lib/ieltsVocabularyDatabase';
import { generateUnlimitedWords, analyzeCustomWord, EXTENDED_VOCAB_VAULT } from '@/lib/unlimitedVocabEngine';
import { DICTIONARY_DATABASE } from '@/lib/mockData';
import { WordDefinition } from '@/lib/types';
import { 
  BookA, 
  Search, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Star, 
  BookMarked,
  Tag,
  Layers,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Bookmark,
  RefreshCw,
  PlusCircle,
  Zap,
  Check,
  UserCheck,
  Clock
} from 'lucide-react';

export default function VocabularyPage() {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [customWords, setCustomWords] = useState<Record<string, WordDefinition>>({});
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Last Read tracking state mapped to user's account & database
  const [lastReadWordInfo, setLastReadWordInfo] = useState<{
    word: string;
    index: number;
    timestamp?: number;
  } | null>(null);

  // Merge databases: Default Mock + Structured IELTS DB + Student Custom Unlimited Words
  const allWordsRecord: Record<string, WordDefinition> = {
    ...DICTIONARY_DATABASE,
    ...IELTS_VOCABULARY_DATABASE,
    ...customWords
  };

  const [selectedWord, setSelectedWord] = useState<WordDefinition>(
    allWordsRecord['mitigate'] || Object.values(allWordsRecord)[0]
  );
  const [savedWords, setSavedWords] = useState<string[]>(['deterioration', 'mitigate', 'ubiquitous']);

  const userKey = user?.id || user?.email || 'default_student';

  // Load saved words & custom words from localStorage on mount
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem(`pre_ielts_saved_vocab_${userKey}`);
      if (storedSaved) {
        setSavedWords(JSON.parse(storedSaved));
      }
      const storedCustom = localStorage.getItem('pre_ielts_unlimited_custom_words');
      if (storedCustom) {
        setCustomWords(JSON.parse(storedCustom));
      }
    } catch (e) {}
  }, [userKey]);

  // Load "Last Read" from User Account Database & Cache on mount/user change
  useEffect(() => {
    // 1. Immediate retrieval from user-specific cache
    try {
      const cached = localStorage.getItem(`pre_ielts_vocab_last_read_${userKey}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        setLastReadWordInfo(parsed);
        if (parsed.word && allWordsRecord[parsed.word.toLowerCase()]) {
          setSelectedWord(allWordsRecord[parsed.word.toLowerCase()]);
        }
      }
    } catch (e) {}

    // 2. Fetch official progress from Database API
    fetch(`/api/user/progress?userId=${encodeURIComponent(userKey)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.progress?.vocabulary?.lastReadWord) {
          const savedWordName = data.progress.vocabulary.lastReadWord;
          const targetObj = allWordsRecord[savedWordName.toLowerCase()];
          if (targetObj) {
            setSelectedWord(targetObj);
            setLastReadWordInfo({
              word: savedWordName,
              index: data.progress.vocabulary.index || 1,
              timestamp: data.progress.vocabulary.timestamp
            });
          }
        }
      })
      .catch(() => {});
  }, [userKey]);

  const wordsList = Object.values(allWordsRecord);

  // Filter words by search, category, band level, and saved status
  const filteredWords = wordsList.filter(w => {
    const matchesSearch = 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.banglaMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.synonyms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      (w.category && w.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesBand = 
      selectedBand === 'All' || 
      (w.bandLevel && w.bandLevel.toLowerCase().includes(selectedBand.toLowerCase().replace('+', '')));

    const matchesSaved = !showSavedOnly || savedWords.includes(w.word);

    return matchesSearch && matchesCategory && matchesBand && matchesSaved;
  });

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const toggleSaveWord = (word: string) => {
    let updated: string[];
    if (savedWords.includes(word)) {
      updated = savedWords.filter(w => w !== word);
    } else {
      updated = [...savedWords, word];
    }
    setSavedWords(updated);
    try {
      localStorage.setItem(`pre_ielts_saved_vocab_${userKey}`, JSON.stringify(updated));
    } catch (e) {}
  };

  // Select Word and SAVE as "Last Read" into User's Account Database
  const handleSelectWord = (wordItem: WordDefinition, wordIndex: number) => {
    setSelectedWord(wordItem);

    const info = {
      word: wordItem.word,
      index: wordIndex,
      timestamp: Date.now()
    };
    setLastReadWordInfo(info);

    // 1. Save to user-specific cache
    try {
      localStorage.setItem(`pre_ielts_vocab_last_read_${userKey}`, JSON.stringify(info));
    } catch (e) {}

    // 2. Save directly to User Progress Database on server
    try {
      fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || userKey,
          userEmail: user?.email || '',
          lastReadWord: wordItem.word,
          index: wordIndex,
          category: wordItem.category || 'All'
        })
      }).catch(err => console.error('Progress sync error:', err));
    } catch (e) {}
  };

  // Generate more words dynamically (Unlimited AI Mode)
  const handleGenerateMoreWords = () => {
    const existingKeys = Object.keys(allWordsRecord);
    const newBatch = generateUnlimitedWords(selectedCategory, 6, existingKeys);
    
    if (newBatch.length === 0) {
      setGenerationFeedback('সব প্রিসেট শব্দ যুক্ত হয়েছে! আপনি নিচের বক্সে যেকোনো ইংরেজি শব্দ লিখে লাইভ এআই দিয়ে বিশ্লেষণ করতে পারেন।');
      setTimeout(() => setGenerationFeedback(null), 4000);
      return;
    }

    const updated = { ...customWords };
    newBatch.forEach(w => {
      updated[w.word.toLowerCase()] = w;
    });
    setCustomWords(updated);
    try {
      localStorage.setItem('pre_ielts_unlimited_custom_words', JSON.stringify(updated));
    } catch (e) {}

    handleSelectWord(newBatch[0], filteredWords.length + 1);
    setGenerationFeedback(`✨ ${newBatch.length}টি নতুন একাডেমিক শব্দ সফলভাবে যুক্ত হয়েছে!`);
    setTimeout(() => setGenerationFeedback(null), 3500);
  };

  // Analyze any custom searched word on-the-fly with AI
  const handleAnalyzeAndAddSearchedWord = (query: string) => {
    if (!query.trim()) return;
    const analyzed = analyzeCustomWord(query);
    const updated = { ...customWords, [analyzed.word.toLowerCase()]: analyzed };
    setCustomWords(updated);
    try {
      localStorage.setItem('pre_ielts_unlimited_custom_words', JSON.stringify(updated));
    } catch (e) {}

    handleSelectWord(analyzed, filteredWords.length + 1);
    setSearchTerm('');
    setGenerationFeedback(`✨ "${analyzed.word}" শব্দটি এআই দিয়ে বিশ্লেষণ করে স্থায়ীভাবে অ্যাকাউন্টে যুক্ত করা হয়েছে!`);
    setTimeout(() => setGenerationFeedback(null), 3500);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
        
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <BookA className="w-7 h-7 text-[#E11D48]" />
              <span>IELTS Academic Vocabulary Lab</span>
            </h1>
            <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
              আনলিমিটেড এআই মোড সক্রিয়
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ব্যান্ড ৭.০–৯.০ অর্জনের জন্য প্রয়োজনীয় অসীম একাডেমিক শব্দভাণ্ডার, উচ্চারণ, কলোকেশন ও ডাটাবেজ ট্র্যাকার
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleGenerateMoreWords}
            className="flex items-center gap-2 text-xs font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer transform hover:scale-105"
            title="নতুন শব্দ জেনারেট করুন"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>+ নতুন শব্দ জেনারেট করুন</span>
          </button>

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border ${
              showSavedOnly
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-white' : 'text-amber-500'}`} />
            <span>সেভ করা ({savedWords.length})</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-2.5 rounded-xl">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>মোট: {wordsList.length} টি</span>
          </div>
        </div>
      </div>

      {/* Account Progress & Last Read Status Banner */}
      {lastReadWordInfo && (
        <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl flex items-center justify-between flex-wrap gap-3 shadow-xs animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="text-xs text-emerald-950 font-bold flex items-center gap-1.5 flex-wrap">
              <span>📌 সর্বশেষ পড়া শব্দ (Last Read):</span>
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold rounded-lg font-mono text-xs capitalize">
                {lastReadWordInfo.word} (#{lastReadWordInfo.index})
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{user?.name || user?.email || 'অ্যাকাউন্টে'} ডাটাবেজে সংরক্ষিত</span>
            </span>
          </div>

          {selectedWord.word.toLowerCase() !== lastReadWordInfo.word.toLowerCase() && (
            <button
              onClick={() => {
                const target = allWordsRecord[lastReadWordInfo.word.toLowerCase()];
                if (target) {
                  setSelectedWord(target);
                }
              }}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer transform hover:scale-105"
            >
              <span>যেখানে পড়া থামিয়েছিলেন সেখানে যান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Generation Feedback Banner */}
      {generationFeedback && (
        <div className="p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-300 shadow-xs">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span>{generationFeedback}</span>
        </div>
      )}

      {/* Category Tabs & Band Filters */}
      <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Tag className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>বিষয়ভিত্তিক ক্যাটাগরি (Topic Categories):</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">ব্যান্ড লেভেল:</span>
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
            >
              {VOCABULARY_BAND_LEVELS.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories scrollable pill list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {VOCABULARY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'সকল বিষয় (All)' : cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar with Live AI Analyzer */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="যেকোনো ইংরেজি শব্দ, বাংলা অর্থ লিখুন — তালিকায় না থাকলে এআই সাথে সাথে বিশ্লেষণ করে দেবে..."
            className="w-full pl-10 pr-28 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all"
          />
          {searchTerm.trim().length > 1 && (
            <button
              onClick={() => handleAnalyzeAndAddSearchedWord(searchTerm)}
              className="absolute right-2 top-3.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="এআই বিশ্লেষণ"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>এআই বিশ্লেষণ</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Word Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Words List Panel */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-2xs p-3 space-y-2 max-h-[620px] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 border-b border-slate-100">
            <span>শব্দের তালিকা ({filteredWords.length} টি)</span>
            <button
              onClick={handleGenerateMoreWords}
              className="text-[#E11D48] hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3 h-3" />
              আরও যোগ করুন
            </button>
          </div>

          {filteredWords.length === 0 ? (
            <div className="p-6 text-center space-y-3">
              <BookA className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                &ldquo;{searchTerm}&rdquo; শব্দটি এখনও এই তালিকায় নেই।
              </p>
              {searchTerm.trim() && (
                <button
                  onClick={() => handleAnalyzeAndAddSearchedWord(searchTerm)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>এআই দিয়ে এখনই বিশ্লেষণ ও যুক্ত করুন</span>
                </button>
              )}
            </div>
          ) : (
            filteredWords.map((item, index) => {
              const isSelected = selectedWord.word.toLowerCase() === item.word.toLowerCase();
              const isSaved = savedWords.includes(item.word);
              const isLastRead = lastReadWordInfo && lastReadWordInfo.word.toLowerCase() === item.word.toLowerCase();

              return (
                <div
                  key={item.word}
                  onClick={() => handleSelectWord(item, index + 1)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#E11D48] bg-[#FFF1F2] shadow-2xs'
                      : isLastRead
                        ? 'border-emerald-300 bg-emerald-50/50 hover:border-emerald-400'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`w-5 h-5 rounded-md font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border ${
                        isSelected 
                          ? 'bg-[#E11D48] text-white border-[#E11D48]' 
                          : isLastRead
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900 capitalize">
                        {item.word}
                      </span>
                      {isLastRead && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          সর্বশেষ পড়া
                        </span>
                      )}
                      {item.bandLevel && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {item.bandLevel}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[190px] pl-7">
                      {item.banglaMeaning}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.partOfSpeech}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation(item.word);
                      }}
                      className="p-1.5 text-slate-400 hover:text-[#E11D48] hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isSaved && (
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Word Detail Card Studio */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold shadow-xs">
                  শব্দ #{filteredWords.findIndex(w => w.word.toLowerCase() === selectedWord.word.toLowerCase()) !== -1 
                    ? filteredWords.findIndex(w => w.word.toLowerCase() === selectedWord.word.toLowerCase()) + 1 
                    : 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 capitalize">
                  {selectedWord.word}
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-mono text-slate-700 font-bold border border-slate-200">
                  {selectedWord.partOfSpeech}
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {selectedWord.phonetic}
                </span>
                {selectedWord.bandLevel && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E11D48] font-bold border border-rose-200">
                    {selectedWord.bandLevel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                {selectedWord.category && (
                  <span className="text-[11px] font-semibold text-slate-400">
                    টপিক ক্যাটাগরি: <strong className="text-slate-600">{selectedWord.category}</strong>
                  </span>
                )}
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>অ্যাকাউন্ট ডাটাবেজে ট্র্যাকড (Last Read Synced)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => playPronunciation(selectedWord.word)}
                className="p-2.5 bg-rose-50 hover:bg-rose-100 text-[#E11D48] rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>উচ্চারণ শুনুন</span>
              </button>

              <button
                onClick={() => toggleSaveWord(selectedWord.word)}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  savedWords.includes(selectedWord.word)
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Star className={`w-4 h-4 ${savedWords.includes(selectedWord.word) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                <span>{savedWords.includes(selectedWord.word) ? 'সংরক্ষিত' : 'সেভ করুন'}</span>
              </button>
            </div>
          </div>

          {/* Bangla Meaning Box */}
          <div className="p-4 bg-[#FFF1F2] border border-rose-100 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              বাংলা অর্থ ও প্রায়োগিক অর্থ:
            </span>
            <p className="text-base font-bold text-slate-900">
              {selectedWord.banglaMeaning}
            </p>
          </div>

          {/* English Definition */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              English Academic Definition:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed font-serif">
              {selectedWord.englishDefinition}
            </p>
          </div>

          {/* IELTS Band 8+ Synonyms */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              IELTS Band 8+ Synonyms (সমার্থক শব্দ):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedWord.synonyms.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Collocations */}
          {selectedWord.collocations && selectedWord.collocations.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                Frequent Academic Collocations (একত্রে ব্যবহৃত জোড় শব্দ):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedWord.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl text-xs font-bold border border-indigo-200/80"
                  >
                    ✦ {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Antonyms */}
          {selectedWord.antonyms && selectedWord.antonyms.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Antonyms (বিপরীতার্থক শব্দ):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedWord.antonyms.map((ant, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-rose-50 text-rose-800 rounded-xl text-xs font-medium border border-rose-200/60"
                  >
                    ≠ {ant}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cambridge Real Exam Example Sentence */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
              Cambridge Exam Real Sentence Context:
            </span>
            <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
              &ldquo;{selectedWord.exampleSentence}&rdquo;
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
