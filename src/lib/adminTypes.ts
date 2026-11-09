export type StaffRole = 'super_admin' | 'admin' | 'moderator' | 'evaluator';

export interface StaffPermission {
  id: string;
  name: string;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: StaffRole;
  status: 'active' | 'inactive';
  permissions: string[];
  lastActive: string;
  assignedTicketsCount?: number;
}

export const ROLE_DEFINITIONS: Record<StaffRole, { title: string; badgeColor: string; description: string }> = {
  super_admin: {
    title: 'সুপার অ্যাডমিন (Super Admin)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'প্ল্যাটফর্মের সকল সেটিংস, আর্থিক হিসাব ও টিম মেম্বারদের ফুল অ্যাক্সেস।'
  },
  admin: {
    title: 'অ্যাডমিন (Admin)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'ছাত্র তালিকা নিয়ন্ত্রণ, প্যাকেজ পরিবর্তন ও ইমেইল ব্রডকাস্টের অনুমতি।'
  },
  moderator: {
    title: 'মডারেটর (Moderator)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'হেল্প ডেস্কে ছাত্রদের প্রশ্নের উত্তর ও টিকিট সমাধান করার অনুমতি।'
  },
  evaluator: {
    title: 'আইএলটিএস পরীক্ষক (Examiner)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'রাইটিং ও স্পিকিং মক টেস্টের ম্যানুয়াল স্কোরিং ও ফিডব্যাক রিভিউ।'
  }
};
