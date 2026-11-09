export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'admin' | 'moderator';
  avatar?: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TKT-1042
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPlan: 'Free' | 'Pro' | 'VIP';
  category: 'পেমেন্ট ও প্যাকেজ' | 'স্পিকিং ও রাইটিং AI' | 'রিডিং ও লিসেনিং টেস্ট' | 'স্টাডি রুটিন ও মেন্টর' | 'অন্যান্য';
  priority: 'সাধারণ' | 'জরুরি' | 'উচ্চ অগ্রাধিকার';
  subject: string;
  status: 'অপেক্ষারত' | 'প্রক্রিয়াধীন' | 'সমাধানকৃত';
  messages: TicketMessage[];
  createdAt: string;
  lastUpdated: string;
}
