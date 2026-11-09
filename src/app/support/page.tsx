'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSupport } from '@/context/SupportContext';
import { SupportTicket } from '@/lib/supportTypes';
import { 
  HelpCircle, 
  Plus, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  User, 
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function SupportDeskPage() {
  const { user } = useAuth();
  const { tickets, createTicket, replyToTicket, getStudentTickets } = useSupport();

  const [activeFilter, setActiveFilter] = useState<'all' | 'অপেক্ষারত' | 'সমাধানকৃত'>('all');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // New Ticket Form State
  const [category, setCategory] = useState<SupportTicket['category']>('স্পিকিং ও রাইটিং AI');
  const [priority, setPriority] = useState<SupportTicket['priority']>('সাধারণ');
  const [subject, setSubject] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  // Reply State inside Conversation
  const [replyText, setReplyText] = useState('');

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          হেল্প ডেস্কে প্রবেশ করতে লগইন করুন
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          রেজিস্ট্রেশনকৃত শিক্ষার্থী ও প্যাকেজ গ্রাহকদের জন্য ২৪/৭ মেন্টর ও অ্যাডমিন সাপোর্ট হেল্প ডেস্ক উন্মুক্ত।
        </p>
      </div>
    );
  }

  const myTickets = getStudentTickets(user.email);
  const filteredTickets = myTickets.filter(t => {
    if (activeFilter === 'all') return true;
    return t.status === activeFilter;
  });

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !initialMessage.trim()) return;

    const newTkt = createTicket(
      user.id,
      user.name,
      user.email,
      user.plan,
      category,
      priority,
      subject,
      initialMessage
    );

    setSubject('');
    setInitialMessage('');
    setIsCreatingTicket(false);
    setSelectedTicket(newTkt);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    replyToTicket(
      selectedTicket.id,
      user.id,
      user.name,
      'student',
      replyText
    );

    setReplyText('');
    // refresh selected ticket
    const updated = tickets.find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dedicated IELTS Help Desk & Mentor Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            স্টুডেন্ট হেল্প ডেস্ক ও প্রশ্ন সমাধান 💬
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            আইএলটিএস প্রস্তুতি, এআই স্কোরিং, পড়া বুঝতে অসুবিধা বা প্যাকেজ সংক্রান্ত যেকোনো প্রশ্ন করুন। অ্যাডমিন ও সার্টিফাইড মডারেটর সরাসরি উত্তর দেবেন।
          </p>
        </div>

        <button
          onClick={() => setIsCreatingTicket(true)}
          className="self-start md:self-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন প্রশ্ন বা সমস্যা জানান</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: My Tickets List */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                আমার প্রশ্ন ও টিকিটসমূহ ({myTickets.length})
              </h2>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
              {(['all', 'অপেক্ষারত', 'সমাধানকৃত'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeFilter === tab
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'সব' : tab}
                </button>
              ))}
            </div>

            {/* Ticket Cards */}
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filteredTickets.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  কোনো টিকিট পাওয়া যায়নি।
                </div>
              ) : (
                filteredTickets.map((tkt) => {
                  const isSelected = selectedTicket?.id === tkt.id;
                  const hasAdminReply = tkt.messages.some(m => m.senderRole !== 'student');

                  return (
                    <div
                      key={tkt.id}
                      onClick={() => setSelectedTicket(tkt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {tkt.ticketNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.status === 'সমাধানকৃত'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tkt.status === 'প্রক্রিয়াধীন'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tkt.status}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {tkt.subject}
                      </h3>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t pt-2 border-slate-100">
                        <span>{tkt.category}</span>
                        {hasAdminReply ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>উত্তর এসেছে</span>
                          </span>
                        ) : (
                          <span className="text-amber-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>উত্তরের অপেক্ষায়</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Active Ticket Conversation Thread or Create Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {isCreatingTicket ? (
            /* Create Ticket Form */
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    নতুন প্রশ্ন বা সমস্যা পাঠান
                  </h2>
                  <p className="text-xs text-slate-500">
                    আপনার যেকোনো প্রশ্ন বিস্তারিত লিখুন, আমাদের টিম দ্রুত সমাধান দেবে।
                  </p>
                </div>
                <button
                  onClick={() => setIsCreatingTicket(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕ বাতিল
                </button>
              </div>

              <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      ক্যাটেগরি:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="স্পিকিং ও রাইটিং AI">স্পিকিং ও রাইটিং AI</option>
                      <option value="রিডিং ও লিসেনিং টেস্ট">রিডিং ও লিসেনিং টেস্ট</option>
                      <option value="স্টাডি রুটিন ও মেন্টর">স্টাডি রুটিন ও মেন্টর</option>
                      <option value="পেমেন্ট ও প্যাকেজ">পেমেন্ট ও প্যাকেজ</option>
                      <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      অগ্রাধিকার (Priority):
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="সাধারণ">সাধারণ</option>
                      <option value="জরুরি">জরুরি</option>
                      <option value="উচ্চ অগ্রাধিকার">উচ্চ অগ্রাধিকার</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    বিষয়ের শিরোনাম (Subject):
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="যেমন: রাইটিং টাস্ক ২-এর Coherence নিয়ে প্রশ্ন..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন:
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    placeholder="কোথায় বুঝতে সমস্যা হচ্ছে বা কী সহায়তা প্রয়োজন তা স্পষ্ট করে লিখুন..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>প্রশ্ন সাবমিট করুন</span>
                  </button>
                </div>
              </form>
            </div>
          ) : selectedTicket ? (
            /* Selected Ticket Conversation View */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              
              {/* Ticket Top Info */}
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
                      {selectedTicket.ticketNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {selectedTicket.category}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedTicket.subject}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedTicket.status === 'সমাধানকৃত'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="p-6 space-y-6 max-h-[420px] overflow-y-auto">
                {selectedTicket.messages.map((msg) => {
                  const isStaff = msg.senderRole !== 'student';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3.5 ${isStaff ? 'bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100' : ''}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0 overflow-hidden mt-0.5">
                        {msg.avatar ? (
                          <img src={msg.avatar} alt={msg.senderName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                            {msg.senderName.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {msg.senderName}
                            </span>
                            {isStaff && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                                {msg.senderRole === 'moderator' ? 'IELTS মডারেটর' : 'অফিশিয়াল অ্যাডমিন'}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {msg.createdAt}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="আপনার মন্তব্য বা ফলো-আপ প্রশ্ন লিখুন..."
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>পাঠান</span>
                  </button>
                </form>
              </div>

            </div>
          ) : (
            /* No ticket selected placeholder */
            <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">
                যেকোনো টিকিট নির্বাচন করে উত্তর দেখুন
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                বাম পাশের তালিকা থেকে আপনার পূর্বে করা যেকোনো প্রশ্ন সিলেক্ট করুন অথবা &ldquo;নতুন প্রশ্ন বা সমস্যা জানান&rdquo; বোতামে ক্লিক করুন।
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
