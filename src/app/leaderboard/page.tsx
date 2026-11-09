'use client';

import React from 'react';
import { 
  Trophy, 
  Zap, 
  Flame, 
  Medal, 
  Crown, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const LEADERBOARD_USERS = [
  { rank: 1, name: 'তানজিলা হক', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', xp: '12,450', streak: 18, band: 'Band 8.0', badge: '👑 টপ স্কোরার' },
  { rank: 2, name: 'SA Swopnil (You)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', xp: '7,420', streak: 12, band: 'Band 7.5', badge: '🥈 ২য় স্থান' },
  { rank: 3, name: 'রেজওয়ান আহমেদ', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', xp: '6,890', streak: 8, band: 'Band 7.0', badge: '🥉 ৩য় স্থান' },
  { rank: 4, name: 'ফারজানা আক্তার', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', xp: '5,120', streak: 5, band: 'Band 6.5', badge: 'রাইজিং স্টার' },
  { rank: 5, name: 'মাহমুদুল হাসান', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', xp: '3,840', streak: 4, band: 'Band 6.0', badge: 'একটিভ লার্নার' },
];

export default function LeaderboardPage() {
  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-amber-500" />
              <span>PrepIELTS Global Student Leaderboard</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              প্রতিদিনের মক টেস্ট, স্পিকিং অনুশীলন ও স্ট্রিক বজায় রেখে পয়েন্ট (XP ⚡) অর্জন করুন
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-800 text-xs font-black shadow-2xs">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>আপনার কয়েন: 7,420 XP</span>
          </div>
        </div>

        {/* Podium Top 3 Cards */}
        <div className="grid grid-cols-3 gap-4 pt-4 items-end">
          
          {/* Rank 2 */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 text-center space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">#2 🥈</span>
            <img src={LEADERBOARD_USERS[1].avatar} alt="" className="w-12 h-12 rounded-full mx-auto object-cover ring-2 ring-slate-200" />
            <div className="font-extrabold text-xs text-slate-900 truncate">{LEADERBOARD_USERS[1].name}</div>
            <div className="text-xs font-black text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 fill-amber-400" />
              <span>{LEADERBOARD_USERS[1].xp}</span>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-3xl border-2 border-amber-300 text-center space-y-2 shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Crown className="w-3 h-3" />
              <span>১ম স্থান</span>
            </div>
            <img src={LEADERBOARD_USERS[0].avatar} alt="" className="w-16 h-16 rounded-full mx-auto object-cover ring-4 ring-amber-400" />
            <div className="font-black text-sm text-slate-900 truncate mt-1">{LEADERBOARD_USERS[0].name}</div>
            <div className="text-sm font-black text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>{LEADERBOARD_USERS[0].xp} XP</span>
            </div>
            <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {LEADERBOARD_USERS[0].band}
            </span>
          </div>

          {/* Rank 3 */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 text-center space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-amber-700">#3 🥉</span>
            <img src={LEADERBOARD_USERS[2].avatar} alt="" className="w-12 h-12 rounded-full mx-auto object-cover ring-2 ring-amber-200" />
            <div className="font-extrabold text-xs text-slate-900 truncate">{LEADERBOARD_USERS[2].name}</div>
            <div className="text-xs font-black text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 fill-amber-400" />
              <span>{LEADERBOARD_USERS[2].xp}</span>
            </div>
          </div>

        </div>

        {/* Full Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wider">
            সাপ্তাহিক গ্লোবাল র‍্যাংকিং
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {LEADERBOARD_USERS.map((usr) => (
              <div
                key={usr.rank}
                className={`p-4 flex items-center justify-between transition-colors ${
                  usr.rank === 2 ? 'bg-rose-50/40 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center font-black ${usr.rank === 1 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {usr.rank}
                  </span>
                  <img src={usr.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="font-extrabold text-slate-900">{usr.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{usr.badge}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-1 text-slate-600">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{usr.streak} দিন স্ট্রিক</span>
                  </div>

                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl">
                    {usr.band}
                  </span>

                  <div className="flex items-center gap-1 font-black text-slate-900 font-mono text-sm w-24 justify-end">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{usr.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
}
