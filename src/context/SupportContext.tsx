'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportTicket, TicketMessage } from '@/lib/supportTypes';

interface SupportContextType {
  tickets: SupportTicket[];
  createTicket: (
    studentId: string,
    studentName: string,
    studentEmail: string,
    studentPlan: 'Free' | 'Pro' | 'VIP',
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    subject: string,
    initialMessage: string
  ) => SupportTicket;
  replyToTicket: (
    ticketId: string,
    senderId: string,
    senderName: string,
    senderRole: 'student' | 'admin' | 'moderator',
    message: string
  ) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  getStudentTickets: (email: string) => SupportTicket[];
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    ticketNumber: 'TKT-1042',
    studentId: 'usr_101',
    studentName: 'রেজওয়ান আহমেদ',
    studentEmail: 'rejuan.ielts@gmail.com',
    studentPlan: 'Pro',
    category: 'স্পিকিং ও রাইটিং AI',
    priority: 'জরুরি',
    subject: 'স্পিকিং কিউ কার্ডে ২ মিনিটের বেশি কথা বললে কি পেনাল্টি হবে?',
    status: 'সমাধানকৃত',
    createdAt: '০৩ নভে ২০২৬, রাত ৯:১৫',
    lastUpdated: '০৩ নভে ২০২৬, রাত ১০:২০',
    messages: [
      {
        id: 'msg_1',
        senderId: 'usr_101',
        senderName: 'রেজওয়ান আহমেদ',
        senderRole: 'student',
        message: 'হ্যালো মেন্টর, আমি প্র্যাকটিস করার সময় দেখলাম পার্ট ২-তে আমি প্রায় ২ মিনিট ২০ সেকেন্ড কথা বলে ফেলেছি। আসল পরীক্ষায় কি এক্সামিনার থামিয়ে দিলে ব্যান্ড স্কোর কমে যাবে?',
        createdAt: '০৩ নভে ২০২৬, রাত ৯:১৫'
      },
      {
        id: 'msg_2',
        senderId: 'adm_01',
        senderName: 'ড. ফারহানা (আইএলটিএস মডারেটর)',
        senderRole: 'moderator',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        message: 'প্রিয় রেজওয়ান, একদমই না! আসল পরীক্ষায় এক্সামিনার ঠিক ২ মিনিট পর হাসিমুখে "Thank you" বলে আপনাকে থামিয়ে দেবেন। এতে কোনো ব্যান্ড কাটবে না, বরং আপনি ২ মিনিট একটানা বলতে পারাটা ভালো ফ্লুয়েন্সির প্রমাণ। নির্ভয়ে প্র্যাকটিস চালিয়ে যান!',
        createdAt: '০৩ নভে ২০২৬, রাত ১০:২০'
      }
    ]
  },
  {
    id: 'tkt_02',
    ticketNumber: 'TKT-1048',
    studentId: 'usr_101',
    studentName: 'রেজওয়ান আহমেদ',
    studentEmail: 'rejuan.ielts@gmail.com',
    studentPlan: 'Pro',
    category: 'স্টাডি রুটিন ও মেন্টর',
    priority: 'সাধারণ',
    subject: 'আমার রিডিং ট্রু/ফলস এ বেশি ভুল হচ্ছে, কীভাবে দ্রুত উন্নতি করব?',
    status: 'প্রক্রিয়াধীন',
    createdAt: '০৪ নভে ২০২৬, বিকাল ৪:০০',
    lastUpdated: '০৪ নভে ২০২৬, বিকাল ৪:৫০',
    messages: [
      {
        id: 'msg_3',
        senderId: 'usr_101',
        senderName: 'রেজওয়ান আহমেদ',
        senderRole: 'student',
        message: 'রিডিং মক টেস্ট দিলে দেখা যায় False এবং Not Given এর মধ্যে প্রায়ই গুলিয়ে ফেলি। এর জন্য বিশেষ কোনো টেকনিক আছে কি?',
        createdAt: '০৪ নভে ২০২৬, বিকাল ৪:০০'
      },
      {
        id: 'msg_4',
        senderId: 'adm_02',
        senderName: 'হাসান মাহমুদ (সিনিয়র অ্যাডমিন)',
        senderRole: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        message: 'স্বাগতম রেজওয়ান। সহজ নিয়মটি মনে রাখবেন: যদি প্যাসেজের তথ্যের সাথে সরাসরি বিপরীত বা বিরোধ থাকে তবে FALSE। আর যদি প্যাসেজে ওই নির্দিষ্ট দাবিটি সত্য বা মিথ্যা প্রমাণের মতো কোনো তথ্যই না থাকে, তবে NOT GIVEN। আপনার ড্যাশবোর্ডে Day 2-এর টেকনিক ক্লাসে এটি ভিডিওসহ দেখানো হয়েছে, একবার দেখে নিন।',
        createdAt: '০৪ নভে ২০২৬, বিকাল ৪:৫০'
      }
    ]
  },
  {
    id: 'tkt_03',
    ticketNumber: 'TKT-1055',
    studentId: 'usr_102',
    studentName: 'তানজিলা হক',
    studentEmail: 'tanjila.hq@gmail.com',
    studentPlan: 'VIP',
    category: 'পেমেন্ট ও প্যাকেজ',
    priority: 'উচ্চ অগ্রাধিকার',
    subject: 'বিকাশ পেমেন্ট কনফার্মেশন ও ইনভয়েস ডাউনলোড',
    status: 'সমাধানকৃত',
    createdAt: '০২ নভে ২০২৬, দুপুর ২:৩০',
    lastUpdated: '০২ নভে ২০২৬, দুপুর ৩:১০',
    messages: [
      {
        id: 'msg_5',
        senderId: 'usr_102',
        senderName: 'তানজিলা হক',
        senderRole: 'student',
        message: 'আমি ভিআইপি প্যাকেজ কিনেছি, ট্রানজেকশন আইডি BK782910। ইনভয়েস কোথায় পাব?',
        createdAt: '০২ নভে ২০২৬, দুপুর ২:৩০'
      },
      {
        id: 'msg_6',
        senderId: 'adm_01',
        senderName: 'এডমিন সাপোর্ট',
        senderRole: 'admin',
        message: 'আপনার পেমেন্ট ভেরিফাই হয়েছে এবং আপনার ইমেইলে অফিসিয়াল ইনভয়েস পাঠানো হয়েছে। ধন্যবাদ!',
        createdAt: '০২ নভে ২০২৬, দুপুর ৩:১০'
      }
    ]
  }
];

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  useEffect(() => {
    const saved = localStorage.getItem('prep_ielts_support_tickets');
    if (saved) {
      try {
        setTickets(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated);
    localStorage.setItem('prep_ielts_support_tickets', JSON.stringify(updated));
  };

  const createTicket = (
    studentId: string,
    studentName: string,
    studentEmail: string,
    studentPlan: 'Free' | 'Pro' | 'VIP',
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    subject: string,
    initialMessage: string
  ): SupportTicket => {
    const newTicket: SupportTicket = {
      id: 'tkt_' + Date.now(),
      ticketNumber: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      studentId,
      studentName,
      studentEmail,
      studentPlan,
      category,
      priority,
      subject,
      status: 'অপেক্ষারত',
      createdAt: 'আজকে, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastUpdated: 'এখনই',
      messages: [
        {
          id: 'msg_' + Date.now(),
          senderId: studentId,
          senderName: studentName,
          senderRole: 'student',
          message: initialMessage,
          createdAt: 'আজকে, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    const updated = [newTicket, ...tickets];
    saveTickets(updated);
    return newTicket;
  };

  const replyToTicket = (
    ticketId: string,
    senderId: string,
    senderName: string,
    senderRole: 'student' | 'admin' | 'moderator',
    message: string
  ) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const newMsg: TicketMessage = {
          id: 'msg_' + Date.now(),
          senderId,
          senderName,
          senderRole,
          avatar: senderRole !== 'student' 
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' 
            : undefined,
          message,
          createdAt: 'আজকে, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const nextStatus: SupportTicket['status'] = senderRole === 'student' ? 'অপেক্ষারত' : 'সমাধানকৃত';

        return {
          ...t,
          status: nextStatus,
          lastUpdated: 'এখনই',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    });

    saveTickets(updated);
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    const updated = tickets.map(t => t.id === ticketId ? { ...t, status } : t);
    saveTickets(updated);
  };

  const getStudentTickets = (email: string) => {
    return tickets.filter(t => t.studentEmail.toLowerCase() === email.toLowerCase());
  };

  return (
    <SupportContext.Provider value={{ tickets, createTicket, replyToTicket, updateTicketStatus, getStudentTickets }}>
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const ctx = useContext(SupportContext);
  if (!ctx) throw new Error('useSupport must be used inside SupportProvider');
  return ctx;
};
