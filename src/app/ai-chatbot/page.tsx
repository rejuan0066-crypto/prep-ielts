'use client';

import React, { useState } from 'react';
import { generateMihuResponse } from '@/lib/mihuAiEngine';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  BookOpen, 
  HelpCircle, 
  FileCheck2, 
  Target,
  Flame,
  ChevronRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'mihu' | 'student';
  text: string;
  time: string;
  suggestions?: string[];
}

export default function IeltslyMihuChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'mihu',
      text: 'হ্যালো! আমি মিহু, আপনার পার্সোনাল IELTS AI টিউটর। আইএলটিএস নিয়ে যেকোনো প্রশ্ন আমাকে করতে পারেন—প্রস্তুতি শুরু করার গাইডলাইন, লিসেনিং/রিডিং ট্রিকস, রাইটিং টাস্ক ২ স্ট্রাকচার কিংবা স্পিকিং ফ্লুয়েন্সি বাড়ানোর কৌশল। আপনি বাংলা অথবা ইংরেজি যেকোনো ভাষায় জিজ্ঞাসা করতে পারেন!',
      time: '10:00 AM',
      suggestions: [
        'আমি কিভাবে শুরু করব জার্নি',
        'লিসেনিং এ ভালো করার উপায় কি?',
        'রিডিং এ সময় বাঁচানোর কৌশল',
        'How should I structure an IELTS Task 2 essay?',
        'What are the key differences between Band 7 and Band 8?'
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() })
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mihu',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: data.suggestions
        }
      ]);
    } catch {
      const response = generateMihuResponse(text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mihu',
          text: response.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: response.suggestions
        }
      ]);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#E11D48] shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Mihu AI Tutor
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Online 24/7
              </span>
            </div>
            <p className="text-xs text-slate-500">PrepIELTS Academic AI Mentor & Cambridge Test Strategist</p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          ⚡ Unlimited Chat with PrepIELTS Pro
        </div>
      </div>

      {/* Chat Messages Viewport */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'mihu' && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                M
              </div>
            )}

            <div className={`max-w-2xl rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
              m.sender === 'student'
                ? 'bg-[#E11D48] text-white rounded-tr-none'
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none space-y-3'
            }`}>
              <div className="whitespace-pre-line font-sans">{m.text}</div>

              {m.suggestions && m.suggestions.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-[#E11D48] border border-slate-200 hover:border-rose-200 rounded-lg text-xs font-semibold transition-colors text-left"
                    >
                      💡 {s}
                    </button>
                  ))}
                </div>
              )}

              <div className={`text-[10px] text-right mt-1 ${
                m.sender === 'student' ? 'text-rose-100' : 'text-slate-400'
              }`}>
                {m.time}
              </div>
            </div>

            {m.sender === 'student' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                SA
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-400">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              M
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="bg-white p-2 sm:p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="আইএলটিএস প্রস্তুতি, স্কোরিং, ট্রিকস কিংবা যেকোনো প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন..."
          className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className="p-2.5 sm:px-4 sm:py-2.5 bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-slate-200 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Mihu</span>
        </button>
      </div>

    </div>
  );
}
