'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ShieldCheck, 
  Clock, 
  DollarSign,
  QrCode,
  Building,
  RefreshCw
} from 'lucide-react';

interface GatewayConfig {
  provider: 'bkash' | 'nagad' | 'sslcommerz' | 'stripe';
  name: string;
  isEnabled: boolean;
  isSandbox: boolean; // Test vs Live
  apiKey: string;
  apiSecret: string;
  merchantId: string;
  callbackUrl: string;
}

interface ManualMethod {
  id: string;
  type: 'bkash' | 'nagad' | 'rocket' | 'bank';
  name: string;
  accountNumber: string;
  accountType: 'Personal' | 'Merchant' | 'Agent';
  instructions: string;
  isActive: boolean;
}

interface PaymentTransaction {
  id: string;
  studentName: string;
  studentEmail: string;
  planName: string;
  duration: string;
  amount: string;
  method: 'bKash' | 'Nagad' | 'Card' | 'Bank';
  trxId: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const DEFAULT_GATEWAYS: Record<string, GatewayConfig> = {
  bkash: {
    provider: 'bkash',
    name: 'bKash Checkout (Direct API)',
    isEnabled: true,
    isSandbox: true,
    apiKey: 'bkash_live_app_key_84920',
    apiSecret: '••••••••••••••••••••••••••••••••',
    merchantId: '01700000000',
    callbackUrl: 'https://prep-ielts.com/api/payment/bkash/callback'
  },
  nagad: {
    provider: 'nagad',
    name: 'Nagad Payment Gateway',
    isEnabled: true,
    isSandbox: true,
    apiKey: 'nagad_live_key_91024',
    apiSecret: '••••••••••••••••••••••••••••••••',
    merchantId: '01800000000',
    callbackUrl: 'https://prep-ielts.com/api/payment/nagad/callback'
  },
  sslcommerz: {
    provider: 'sslcommerz',
    name: 'SSLCommerz (All BD Cards & MFS)',
    isEnabled: true,
    isSandbox: false,
    apiKey: 'prep_ielts_live_store',
    apiSecret: '••••••••••••••••••••••••••••••••',
    merchantId: 'PREP_IELTS_MERCHANT',
    callbackUrl: 'https://prep-ielts.com/api/payment/sslcommerz/ipn'
  },
  stripe: {
    provider: 'stripe',
    name: 'Stripe (International Visa / Mastercard)',
    isEnabled: false,
    isSandbox: true,
    apiKey: 'pk_test_51Mzxxxxxxxxxxxxxxxxxxx',
    apiSecret: '••••••••••••••••••••••••••••••••',
    merchantId: 'acct_1Mxxxxxxxxxxxxxx',
    callbackUrl: 'https://prep-ielts.com/api/payment/stripe/webhook'
  }
};

const DEFAULT_MANUAL_METHODS: ManualMethod[] = [
  {
    id: 'man_01',
    type: 'bkash',
    name: 'bKash Merchant (বিকাশ মার্চেন্ট)',
    accountNumber: '01711-223344',
    accountType: 'Merchant',
    instructions: 'বিকাশ অ্যাপের "Make Payment" অপশন ব্যবহার করুন এবং কাউন্টার নম্বর ১ দিন। পেমেন্ট শেষে ট্রানজেকশন আইডি (TrxID) দিন।',
    isActive: true
  },
  {
    id: 'man_02',
    type: 'nagad',
    name: 'Nagad Personal (নগদ পার্সোনাল)',
    accountNumber: '01822-334455',
    accountType: 'Personal',
    instructions: 'নগদ অ্যাপ থেকে "Send Money" করুন এবং ট্রানজেকশন আইডি সাবমিট করুন।',
    isActive: true
  },
  {
    id: 'man_03',
    type: 'bank',
    name: 'City Bank / BRAC Bank Transfer',
    accountNumber: '1502-849201-001',
    accountType: 'Merchant',
    instructions: 'অ্যাকাউন্ট নাম: PrepIELTS Education BD, ব্র্যাঞ্চ: ধানমন্ডি শাখা, ঢাকা। ডিপোজিট স্লিপ বা ট্রানজেকশন রেফারেন্স দিন।',
    isActive: true
  }
];

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'trx_101',
    studentName: 'রেজওয়ান আহমেদ',
    studentEmail: 'rejuan.ielts@gmail.com',
    planName: 'Pro Booster',
    duration: '৩ মাসের প্যাকেজ (১৫% ছাড়)',
    amount: '৳ ২,৪৯৯',
    method: 'bKash',
    trxId: 'BK782910',
    date: '০৪ নভে ২০২৬, রাত ৮:৪৫',
    status: 'approved'
  },
  {
    id: 'trx_102',
    studentName: 'তানজিলা হক',
    studentEmail: 'tanjila.hq@gmail.com',
    planName: 'VIP 8.5 Mentorship',
    duration: 'লাইফটাইম এক্সেস (Lifetime)',
    amount: '৳ ১৪,৯৯৯',
    method: 'bKash',
    trxId: 'BK910245',
    date: 'আজকে, সকাল ১০:২০',
    status: 'pending'
  },
  {
    id: 'trx_103',
    studentName: 'মাহমুদুল হাসান',
    studentEmail: 'mahmud.h@outlook.com',
    planName: 'Pro Booster',
    duration: '১ মাসের প্যাকেজ',
    amount: '৳ ৯৯৯',
    method: 'Nagad',
    trxId: 'NG554109',
    date: 'গতকাল, দুপুর ৩:১৫',
    status: 'pending'
  }
];

export const PaymentSettingsManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'gateways' | 'manual' | 'transactions'>('gateways');
  
  // Gateways state
  const [gateways, setGateways] = useState<Record<string, GatewayConfig>>(DEFAULT_GATEWAYS);
  const [selectedProvider, setSelectedProvider] = useState<'bkash' | 'nagad' | 'sslcommerz' | 'stripe'>('bkash');
  const [showSecret, setShowSecret] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Manual methods state
  const [manualMethods, setManualMethods] = useState<ManualMethod[]>(DEFAULT_MANUAL_METHODS);
  const [isAddManualOpen, setIsAddManualOpen] = useState(false);
  const [newMethodType, setNewMethodType] = useState<ManualMethod['type']>('bkash');
  const [newMethodName, setNewMethodName] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountType, setNewAccountType] = useState<ManualMethod['accountType']>('Merchant');
  const [newInstructions, setNewInstructions] = useState('');

  // Transactions state
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);

  // Load from localStorage if present
  useEffect(() => {
    const savedGateways = localStorage.getItem('prep_ielts_gateways');
    if (savedGateways) {
      try { setGateways(JSON.parse(savedGateways)); } catch (e) {}
    }
    const savedManual = localStorage.getItem('prep_ielts_manual_methods');
    if (savedManual) {
      try { setManualMethods(JSON.parse(savedManual)); } catch (e) {}
    }
    const savedTrx = localStorage.getItem('prep_ielts_transactions');
    if (savedTrx) {
      try { setTransactions(JSON.parse(savedTrx)); } catch (e) {}
    }
  }, []);

  const saveGatewaysToStorage = (updated: Record<string, GatewayConfig>) => {
    setGateways(updated);
    localStorage.setItem('prep_ielts_gateways', JSON.stringify(updated));
    setSaveSuccessMsg('পেমেন্ট গেটওয়ে কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleUpdateCurrentGateway = (field: keyof GatewayConfig, val: any) => {
    const current = gateways[selectedProvider];
    const updated = {
      ...gateways,
      [selectedProvider]: {
        ...current,
        [field]: val
      }
    };
    setGateways(updated);
  };

  // Manual method handlers
  const handleToggleManualActive = (id: string) => {
    const updated = manualMethods.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m);
    setManualMethods(updated);
    localStorage.setItem('prep_ielts_manual_methods', JSON.stringify(updated));
  };

  const handleDeleteManual = (id: string) => {
    if (confirm('পেমেন্ট মেথডটি মুছে ফেলতে চান?')) {
      const updated = manualMethods.filter(m => m.id !== id);
      setManualMethods(updated);
      localStorage.setItem('prep_ielts_manual_methods', JSON.stringify(updated));
    }
  };

  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountNumber.trim()) return;

    const newMethod: ManualMethod = {
      id: 'man_' + Date.now(),
      type: newMethodType,
      name: newMethodName || (newMethodType === 'bkash' ? 'bKash' : newMethodType === 'nagad' ? 'Nagad' : 'Rocket'),
      accountNumber: newAccountNumber,
      accountType: newAccountType,
      instructions: newInstructions || 'পেমেন্ট সম্পন্ন করে ট্রানজেকশন আইডি দিন।',
      isActive: true
    };

    const updated = [...manualMethods, newMethod];
    setManualMethods(updated);
    localStorage.setItem('prep_ielts_manual_methods', JSON.stringify(updated));
    setIsAddManualOpen(false);
    setNewAccountNumber('');
    setNewInstructions('');
    setSaveSuccessMsg('নতুন পেমেন্ট মেথড যুক্ত হয়েছে!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Transaction verification handlers
  const handleApproveTransaction = (trxId: string) => {
    const updated = transactions.map(t => t.id === trxId ? { ...t, status: ('approved' as const) } : t);
    setTransactions(updated);
    localStorage.setItem('prep_ielts_transactions', JSON.stringify(updated));
    setSaveSuccessMsg('পেমেন্ট সফলভাবে অনুমোদিত হয়েছে ও ছাত্রের প্যাকেজ সচল হয়েছে! ✅');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleRejectTransaction = (trxId: string) => {
    const updated = transactions.map(t => t.id === trxId ? { ...t, status: ('rejected' as const) } : t);
    setTransactions(updated);
    localStorage.setItem('prep_ielts_transactions', JSON.stringify(updated));
    setSaveSuccessMsg('পেমেন্ট বাতিল করা হয়েছে। ❌');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const currentGw = gateways[selectedProvider];

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Title & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-400" />
            <span>পেমেন্ট গেটওয়ে ও ম্যানুয়াল মেথড সেটআপ (Edumate BD Style)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            বিকাশ, নগদ, SSLCommerz, এবং ম্যানুয়াল পেমেন্ট ভেরিফিকেশন ম্যানেজমেন্ট
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('gateways')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gateways'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            অটোমেটেড গেটওয়ে
          </button>

          <button
            onClick={() => setActiveSubTab('manual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'manual'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ম্যানুয়াল মেথড ({manualMethods.length})
          </button>

          <button
            onClick={() => setActiveSubTab('transactions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
              activeSubTab === 'transactions'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>পেমেন্ট রিকোয়েস্ট</span>
            {transactions.filter(t => t.status === 'pending').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {transactions.filter(t => t.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Save Success Toast */}
      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* TAB 1: AUTOMATED GATEWAY CONFIGURATION */}
      {activeSubTab === 'gateways' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Provider Selector Left Panel */}
          <div className="lg:col-span-1 bg-slate-800/80 rounded-3xl border border-slate-700 p-5 space-y-3">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              পেমেন্ট প্রোভাইডার নির্বাচন করুন:
            </span>

            <div className="space-y-2">
              {[
                { id: 'bkash', name: 'bKash (বিকাশ ডিরেক্ট API)', color: 'text-pink-400', badge: 'MFS' },
                { id: 'nagad', name: 'Nagad (নগদ পেমেন্ট গেটওয়ে)', color: 'text-orange-400', badge: 'MFS' },
                { id: 'sslcommerz', name: 'SSLCommerz (কার্ড ও নেট-ব্যাংকিং)', color: 'text-blue-400', badge: 'সব মাধ্যম' },
                { id: 'stripe', name: 'Stripe (আন্তর্জাতিক ভিসা/মাস্টারকার্ড)', color: 'text-purple-400', badge: 'International' },
              ].map((p) => {
                const gw = gateways[p.id as any];
                const isSelected = selectedProvider === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id as any)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/30 ring-2 ring-purple-500/20'
                        : 'border-slate-700 bg-slate-900/60 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-xs ${p.color}`}>{p.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{p.badge}</span>
                        <span>•</span>
                        <span className={gw.isEnabled ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {gw.isEnabled ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Disabled)'}
                        </span>
                      </div>
                    </div>

                    <div className={`w-2.5 h-2.5 rounded-full ${gw.isEnabled ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configuration Form Right Panel */}
          <div className="lg:col-span-2 bg-slate-800/80 rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700 gap-3">
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {currentGw.name} সেটিংস
                </h3>
                <p className="text-xs text-slate-400">
                  আপনার মার্চেন্ট অ্যাকাউন্ট থেকে পাওয়া এপিআই ক্রেডেনশিয়াল দিন
                </p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-4">
                {/* Live / Sandbox Toggle */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                  <span className="text-[11px] text-slate-400">মোড:</span>
                  <button
                    type="button"
                    onClick={() => handleUpdateCurrentGateway('isSandbox', !currentGw.isSandbox)}
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-colors ${
                      currentGw.isSandbox ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {currentGw.isSandbox ? 'Sandbox (টেস্ট)' : 'Live (আসল টাকা)'}
                  </button>
                </div>

                {/* Enable / Disable Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateCurrentGateway('isEnabled', !currentGw.isEnabled)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                      currentGw.isEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{currentGw.isEnabled ? 'সক্রিয়' : 'বন্ধ'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  API Key / Store ID / Client ID:
                </label>
                <input
                  type="text"
                  value={currentGw.apiKey}
                  onChange={(e) => handleUpdateCurrentGateway('apiKey', e.target.value)}
                  placeholder="আপনার এপিআই কি দিন"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  API Secret / Store Password / Secret Key:
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={currentGw.apiSecret}
                    onChange={(e) => handleUpdateCurrentGateway('apiSecret', e.target.value)}
                    placeholder="আপনার এপিআই সিক্রেট দিন"
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Merchant ID / Account Number:
                  </label>
                  <input
                    type="text"
                    value={currentGw.merchantId}
                    onChange={(e) => handleUpdateCurrentGateway('merchantId', e.target.value)}
                    placeholder="মার্চেন্ট আইডি"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Callback / Webhook / IPN URL:
                  </label>
                  <input
                    type="text"
                    value={currentGw.callbackUrl}
                    onChange={(e) => handleUpdateCurrentGateway('callbackUrl', e.target.value)}
                    placeholder="https://yourdomain.com/callback"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => saveGatewaysToStorage(gateways)}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/30 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>গেটওয়ে কনফিগারেশন সংরক্ষণ করুন</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: MANUAL PAYMENT METHODS MANAGER (Edumate BD Style) */}
      {activeSubTab === 'manual' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-white">
                ম্যানুয়াল পেমেন্ট মেথড ম্যানেজমেন্ট (বিকাশ / নগদ / রকেট / ব্যাংক)
              </h3>
              <p className="text-xs text-slate-400">
                শিক্ষার্থীরা বিকাশ/নগদে সেন্ড মানি বা পেমেন্ট করে ট্রানজেকশন আইডি (TrxID) দিলে তা যাচাই করে প্যাকেজ চালু করতে পারবেন।
              </p>
            </div>

            <button
              onClick={() => setIsAddManualOpen(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-purple-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ম্যানুয়াল মেথড যোগ করুন</span>
            </button>
          </div>

          {/* Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manualMethods.map((m) => (
              <div
                key={m.id}
                className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-4 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 uppercase">
                      {m.accountType}
                    </span>
                    <button
                      onClick={() => handleToggleManualActive(m.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {m.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </button>
                  </div>

                  <h4 className="font-extrabold text-white text-base">{m.name}</h4>
                  
                  <div className="mt-2 p-2.5 bg-slate-900 rounded-xl border border-slate-700/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">অ্যাকাউন্ট নম্বর:</span>
                    <span className="text-sm font-bold font-mono text-purple-300">{m.accountNumber}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {m.instructions}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => handleDeleteManual(m.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>মুছে ফেলুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT TRANSACTIONS & APPROVAL VERIFICATION */}
      {activeSubTab === 'transactions' && (
        <div className="bg-slate-800/80 rounded-3xl border border-slate-700 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>শিক্ষার্থীদের পেমেন্ট ট্রানজেকশন তালিকা ({transactions.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                বিকাশ/নগদ TrxID যাচাই করে ১-ক্লিকে অনুমোদন করুন (ছাত্রের প্যাকেজ সাথে সাথে সচল হবে)
              </p>
            </div>
            <span className="text-xs text-purple-300 font-mono">Live Verification Queue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/60 text-slate-400 uppercase font-bold text-[10px] border-y border-slate-700">
                <tr>
                  <th className="py-3 px-4">শিক্ষার্থী</th>
                  <th className="py-3 px-4">প্যাকেজ ও মেয়াদ</th>
                  <th className="py-3 px-4">পরিমাণ (BDT)</th>
                  <th className="py-3 px-4">পেমেন্ট মাধ্যম</th>
                  <th className="py-3 px-4">TrxID / রেফারেন্স</th>
                  <th className="py-3 px-4">তারিখ</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">যাচাই / অনুমোদন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-700/30 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{trx.studentName}</div>
                      <div className="text-slate-400 text-[11px] font-mono">{trx.studentEmail}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{trx.planName}</div>
                      <div className="text-[11px] text-purple-300">{trx.duration}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-sm font-black text-emerald-400 font-mono">{trx.amount}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 font-bold text-[10px] text-slate-300">
                        {trx.method}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-amber-300">
                      {trx.trxId}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {trx.date}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        trx.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : trx.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {trx.status === 'approved' ? 'অনুমোদিত ✅' : trx.status === 'rejected' ? 'বাতিল ❌' : 'অপেক্ষারত 🟡'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {trx.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApproveTransaction(trx.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            <span>অনুমোদন</span>
                          </button>
                          <button
                            onClick={() => handleRejectTransaction(trx.id)}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <X className="w-3 h-3" />
                            <span>বাতিল</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">সম্পন্ন</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD MANUAL METHOD MODAL */}
      {isAddManualOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-white">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-extrabold text-base text-white">
                নতুন পেমেন্ট মেথড তৈরি করুন
              </h4>
              <button
                onClick={() => setIsAddManualOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  মেথড টাইপ:
                </label>
                <select
                  value={newMethodType}
                  onChange={(e) => setNewMethodType(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="bkash">বিকাশ (bKash)</option>
                  <option value="nagad">নগদ (Nagad)</option>
                  <option value="rocket">রকেট (Rocket)</option>
                  <option value="bank">ব্যাংক একাউন্ট (Bank Transfer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  মেথডের নাম:
                </label>
                <input
                  type="text"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  placeholder="যেমন: bKash Merchant বা Nagad Personal"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    অ্যাকাউন্ট নম্বর:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAccountNumber}
                    onChange={(e) => setNewAccountNumber(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-medium text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    অ্যাকাউন্ট টাইপ:
                  </label>
                  <select
                    value={newAccountType}
                    onChange={(e) => setNewAccountType(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Merchant">Merchant (মার্চেন্ট)</option>
                    <option value="Personal">Personal (পার্সোনাল)</option>
                    <option value="Agent">Agent (এজেন্ট)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  নির্দেশনা (Instructions):
                </label>
                <textarea
                  rows={3}
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  placeholder="ছাত্রদের জন্য নির্দেশনা (যেমন: পেমেন্ট শেষে TrxID সাবমিট করুন)..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddManualOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
