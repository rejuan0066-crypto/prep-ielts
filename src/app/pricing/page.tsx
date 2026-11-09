'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  getGlobalDiscount, 
  validateCoupon, 
  getTransactions, 
  saveTransactions,
  PaymentTransaction,
  CouponValidationResult
} from '@/lib/paymentAndCouponStore';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Crown, 
  ArrowRight,
  CreditCard,
  Flame,
  Check,
  Tag,
  Clock,
  Smartphone,
  Building,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

export type BillingCycle = '1_month' | '3_months' | '6_months' | 'lifetime';

export default function PricingPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('3_months');
  const [globalDiscount, setGlobalDiscount] = useState(getGlobalDiscount());

  // Coupon State
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidationResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Checkout State
  const [selectedPlan, setSelectedPlan] = useState<{
    key: 'Pro' | 'VIP';
    name: string;
    basePrice: number;
    durationLabel: string;
  } | null>(null);

  const [checkoutTab, setCheckoutTab] = useState<'online' | 'manual'>('online');
  const [onlineGateway, setOnlineGateway] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [manualMethod, setManualMethod] = useState<'bKash' | 'Nagad' | 'Bank'>('bKash');

  // Manual payment form inputs
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  
  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [successType, setSuccessType] = useState<'online' | 'manual' | null>(null);

  useEffect(() => {
    setGlobalDiscount(getGlobalDiscount());
  }, []);

  const getBasePlanPrice = (planKey: 'Pro' | 'VIP', cycle: BillingCycle): number => {
    if (planKey === 'Pro') {
      switch (cycle) {
        case '1_month': return 1990;
        case '3_months': return 4500;
        case '6_months': return 6900;
        case 'lifetime': return 9990;
      }
    } else {
      switch (cycle) {
        case '1_month': return 3990;
        case '3_months': return 8900;
        case '6_months': return 13900;
        case 'lifetime': return 14900;
      }
    }
  };

  const getDurationName = () => {
    switch (billingCycle) {
      case '1_month': return '১ মাসের এক্সেস (1 Month)';
      case '3_months': return '৩ মাসের রিকমেন্ডেড এক্সেস (3 Months)';
      case '6_months': return '৬ মাসের পূর্ণাঙ্গ প্রস্তুতি (6 Months)';
      case 'lifetime': return 'লাইফটাইম ভিআইপি মেম্বারশিপ (Lifetime)';
    }
  };

  const calculateFinalPrice = (basePrice: number) => {
    let final = basePrice;
    let globalDiscountAmount = 0;

    if (globalDiscount.isEnabled && globalDiscount.percentage > 0) {
      globalDiscountAmount = Math.round((basePrice * globalDiscount.percentage) / 100);
      final -= globalDiscountAmount;
    }

    let couponDiscountAmount = 0;
    if (appliedCoupon && appliedCoupon.isValid) {
      couponDiscountAmount = appliedCoupon.discountAmount;
      final = Math.max(0, final - couponDiscountAmount);
    }

    return {
      originalPrice: basePrice,
      globalDiscountAmount,
      couponDiscountAmount,
      totalDiscount: globalDiscountAmount + couponDiscountAmount,
      finalPrice: final
    };
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);

    if (!couponCodeInput.trim()) {
      setCouponError('কুপন কোড লিখুন');
      return;
    }

    const currentBasePrice = selectedPlan 
      ? selectedPlan.basePrice 
      : getBasePlanPrice('Pro', billingCycle);

    const studentEmail = user?.email || '';
    const res = validateCoupon(couponCodeInput, studentEmail, currentBasePrice);

    if (res.isValid) {
      setAppliedCoupon(res);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError(res.message);
    }
  };

  const handleOpenCheckout = (planKey: 'Pro' | 'VIP', planName: string) => {
    const base = getBasePlanPrice(planKey, billingCycle);
    setSelectedPlan({
      key: planKey,
      name: planName,
      basePrice: base,
      durationLabel: getDurationName()
    });
    setSuccessType(null);
    setTrxId('');
    setSenderNumber('');
  };

  // 1. ONLINE INSTANT AUTO-VERIFY PAYMENT
  const handleOnlineAutoPayment = () => {
    if (!selectedPlan || !user) return;
    setIsProcessing(true);

    const priceCalc = calculateFinalPrice(selectedPlan.basePrice);

    setTimeout(() => {
      const generatedTrxId = 'AUTO_' + onlineGateway.toUpperCase() + '_' + Math.random().toString(36).substring(2, 9).toUpperCase();

      const newTx: PaymentTransaction = {
        id: 'trx_' + Date.now(),
        studentName: user.name,
        studentEmail: user.email,
        planName: selectedPlan.name,
        duration: selectedPlan.durationLabel,
        originalAmount: priceCalc.originalPrice,
        discountAmount: priceCalc.totalDiscount,
        finalAmount: priceCalc.finalPrice,
        method: onlineGateway === 'bkash' ? 'bKash (Online)' : onlineGateway === 'nagad' ? 'Nagad (Online)' : 'Card',
        trxId: generatedTrxId,
        couponUsed: appliedCoupon?.coupon?.code,
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        status: 'approved',
        verifiedBy: 'System Auto-Gateway'
      };

      const existingTxs = getTransactions();
      saveTransactions([newTx, ...existingTxs]);

      // Update student profile directly to approved
      updateUser({
        plan: selectedPlan.key,
        paymentStatus: 'approved',
        pendingPayment: undefined
      });

      setIsProcessing(false);
      setSuccessType('online');
    }, 1200);
  };

  // 2. MANUAL SEND MONEY & TrxID SUBMISSION
  const handleManualPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !user) return;

    if (!senderNumber.trim() || !trxId.trim()) {
      alert('অনুগ্রহ করে প্রেরক নম্বর এবং TrxID পূরণ করুন!');
      return;
    }

    setIsProcessing(true);
    const priceCalc = calculateFinalPrice(selectedPlan.basePrice);

    setTimeout(() => {
      const cleanTrxId = trxId.trim().toUpperCase();

      const newTx: PaymentTransaction = {
        id: 'trx_' + Date.now(),
        studentName: user.name,
        studentEmail: user.email,
        planName: selectedPlan.name,
        duration: selectedPlan.durationLabel,
        originalAmount: priceCalc.originalPrice,
        discountAmount: priceCalc.totalDiscount,
        finalAmount: priceCalc.finalPrice,
        method: manualMethod === 'bKash' ? 'bKash (Manual)' : manualMethod === 'Nagad' ? 'Nagad (Manual)' : 'Bank Transfer',
        senderNumber: senderNumber.trim(),
        trxId: cleanTrxId,
        couponUsed: appliedCoupon?.coupon?.code,
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        status: 'pending'
      };

      const existingTxs = getTransactions();
      saveTransactions([newTx, ...existingTxs]);

      // Update student profile to pending
      updateUser({
        paymentStatus: 'pending',
        pendingPayment: {
          trxId: cleanTrxId,
          method: manualMethod,
          senderNumber: senderNumber.trim(),
          planName: selectedPlan.name,
          amount: '৳ ' + priceCalc.finalPrice.toLocaleString('bn-BD'),
          submittedAt: newTx.date
        }
      });

      setIsProcessing(false);
      setSuccessType('manual');
    }, 1000);
  };

  const proPricing = calculateFinalPrice(getBasePlanPrice('Pro', billingCycle));
  const vipPricing = calculateFinalPrice(getBasePlanPrice('VIP', billingCycle));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* 1. Global Admin Flash Sale / Discount Ribbon */}
      {globalDiscount.isEnabled && globalDiscount.percentage > 0 && (
        <div className="bg-gradient-to-r from-purple-700 via-rose-600 to-indigo-700 rounded-3xl p-4 sm:p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-rose-400/30">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                অ্যাডমিন স্পেশাল ডিসকাউন্ট
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                {globalDiscount.title} • {globalDiscount.percentage}% ফ্ল্যাট ছাড় চলছে!
              </h2>
            </div>
          </div>
          <div className="text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-xl shadow-md shrink-0">
            নিচের সকল কোর্সে মূল্য স্বয়ংক্রিয়ভাবে ছাড় হয়েছে
          </div>
        </div>
      )}

      {/* 2. Page Header & Diagnostic Status */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>IELTS Preparation Plans & Packages</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          আপনার লক্ষ্য অনুযায়ী কোর্স প্যাকেজ নির্বাচন করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {user?.diagnostic?.completed ? (
            <span>
              আপনার টেস্ট অনুযায়ী বর্তমান লেভেল: <strong className="text-slate-900">Band {user.diagnostic.assessedBand}</strong> ➔ টার্গেট লক্ষ্য: <strong className="text-[#E11D48]">Band {user.diagnostic.targetBand}</strong>। আপনার জন্য উপযুক্ত প্ল্যানটি অ্যাক্টিভ করুন।
            </span>
          ) : (
            'কেমব্রিজ ম্যাটেরিয়ালস, এআই স্পিকিং পার্টনার ও রাইটিং স্কোরিংয়ের পূর্ণাঙ্গ সুবিধা পান।'
          )}
        </p>

        {/* Billing Cycle Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold pt-1">
          <button
            onClick={() => setBillingCycle('1_month')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === '1_month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ১ মাস
          </button>
          <button
            onClick={() => setBillingCycle('3_months')}
            className={`px-4 py-2 rounded-xl transition-all relative ${
              billingCycle === '3_months' ? 'bg-[#E11D48] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>৩ মাস</span>
            <span className="absolute -top-2 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">POPULAR</span>
          </button>
          <button
            onClick={() => setBillingCycle('6_months')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === '6_months' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ৬ মাস
          </button>
          <button
            onClick={() => setBillingCycle('lifetime')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === 'lifetime' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            লাইফটাইম
          </button>
        </div>
      </div>

      {/* 3. Coupon Code Input Bar */}
      <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-2">
        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={couponCodeInput}
              onChange={(e) => setCouponCodeInput(e.target.value)}
              placeholder="কুপন কোড লিখুন (যেমন: SPECIAL20, IELTS1000)"
              className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
          >
            প্রয়োগ করুন
          </button>
        </form>

        {appliedCoupon && appliedCoupon.isValid && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{appliedCoupon.message}</span>
            </div>
            <button
              onClick={() => { setAppliedCoupon(null); setCouponCodeInput(''); }}
              className="text-emerald-700 hover:text-emerald-900 text-xs underline cursor-pointer"
            >
              মুছে ফেলুন
            </button>
          </div>
        )}

        {couponError && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{couponError}</span>
          </div>
        )}
      </div>

      {/* 4. Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Pro Plan */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-rose-500 shadow-xl relative flex flex-col justify-between space-y-6">
          <div className="absolute -top-3.5 right-6 bg-[#E11D48] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
            সর্বাধিক জনপ্রিয় প্যাকেজ
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">
                Full Academy Plan
              </div>
              <h3 className="text-2xl font-black text-slate-900">PrepIELTS Pro</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ব্যান্ড ৭.০–৮.৫ অর্জনের জন্য স্বয়ংসম্পূর্ণ এআই প্রিপারেশন টুলকিট।
              </p>
            </div>

            {/* Price display with discounts */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ৳ {proPricing.finalPrice.toLocaleString('bn-BD')}
                </span>
                {proPricing.totalDiscount > 0 && (
                  <span className="text-sm font-bold text-slate-400 line-through">
                    ৳ {proPricing.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {getDurationName()}
                {proPricing.totalDiscount > 0 && (
                  <span className="text-emerald-600 font-bold ml-1.5">
                    (৳ {proPricing.totalDiscount.toLocaleString('bn-BD')} সাশ্রয়)
                  </span>
                )}
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>৬০ দিনের পারসোনালাইজড ড্যাশবোর্ড ও ডেইলি ক্লাস</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আনলিমিটেড এআই স্পিকিং পার্টনার ড্রিল ও প্রোনাউন্সিয়েশন</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>কেমব্রিজ ৭–২১ সম্পূর্ণ CD-IELTS রিডিং ও লিসেনিং মক</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>রাইটিং টাস্ক ১ ও ২-এর অফিসিয়াল ৪ ক্রাইটেরিয়া ব্যান্ড স্কোরিং</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>একাডেমিক ভোকাবুলারি ও গ্রামার ল্যাব আনলিমিটেড এক্সেস</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => handleOpenCheckout('Pro', 'PrepIELTS Pro')}
              className="w-full py-3.5 bg-gradient-to-r from-[#E11D48] to-rose-600 hover:from-[#BE123C] hover:to-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>এখনই এনরোল করুন (Enroll in Pro)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* VIP Plan */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-purple-200 shadow-xl relative flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>British Council Expert Mentorship</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">VIP 8.5 Mentorship</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                প্রো ফিচারের সাথে ব্রিটিশ কাউন্সিল সার্টিফাইড এক্সপার্টের সরাসরি সহায়তা।
              </p>
            </div>

            {/* Price display with discounts */}
            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ৳ {vipPricing.finalPrice.toLocaleString('bn-BD')}
                </span>
                {vipPricing.totalDiscount > 0 && (
                  <span className="text-sm font-bold text-slate-400 line-through">
                    ৳ {vipPricing.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {getDurationName()}
                {vipPricing.totalDiscount > 0 && (
                  <span className="text-emerald-600 font-bold ml-1.5">
                    (৳ {vipPricing.totalDiscount.toLocaleString('bn-BD')} সাশ্রয়)
                  </span>
                )}
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>PrepIELTS Pro-এর সবগুলো ফিচার আনলিমিটেড</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>সাপ্তাহিক লাইভ জুম স্পিকিং মক টেস্ট (Senior Examiner)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>হিউম্যান এক্সপার্ট দিয়ে খাতা মূল্যায়ন ও মার্কআপ ফিডব্যাক</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>ওয়ান-অন-ওয়ান পারসোনাল ব্যান্ড ৮.৫ রোডম্যাপ কাউন্সেলিং</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>২৪/৭ ডেডিকেটেড ভিআইপি প্রাইভেট সাপোর্ট গ্রুপ</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => handleOpenCheckout('VIP', 'VIP 8.5 Mentorship')}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>ভিআইপি এনরোল করুন (Activate VIP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. CHECKOUT & ENROLLMENT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">কোর্স ফি পরিশোধ: {selectedPlan.name}</h3>
                <p className="text-xs text-slate-500">{selectedPlan.durationLabel}</p>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SUCCESS STATE A: Online Instant Verified */}
            {successType === 'online' && (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">পেমেন্ট সফল ও স্বয়ংক্রিয়ভাবে অনুমোদিত!</h4>
                  <p className="text-xs text-slate-600">
                    অভিনন্দন! আপনার অ্যাকাউন্টটি সফলভাবে <strong>{selectedPlan.name}</strong>-এ উন্নীত হয়েছে এবং ড্যাশবোর্ড সম্পূর্ণ আনলক করা হয়েছে।
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => { setSelectedPlan(null); router.push('/dashboard'); }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>আমার ড্যাশবোর্ডে প্রবেশ করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS STATE B: Manual TrxID Submitted */}
            {successType === 'manual' && (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                  <Clock className="w-10 h-10 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">পেমেন্ট তথ্য সফলভাবে জমা হয়েছে!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    আপনার TrxID (<strong>{trxId.toUpperCase()}</strong>) অ্যাডমিনের নিকট ভেরিফিকেশনের জন্য পাঠানো হয়েছে। অ্যাডমিন TrxID যাচাই করার সাথে সাথেই আপনার ড্যাশবোর্ড সক্রিয় হয়ে যাবে।
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => { setSelectedPlan(null); router.push('/dashboard'); }}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ভেরিফিকেশন স্ট্যাটাস দেখুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CHECKOUT FORM (When not in success state) */}
            {!successType && (
              <>
                {/* Price Summary Breakdown */}
                {(() => {
                  const pCalc = calculateFinalPrice(selectedPlan.basePrice);
                  return (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>কোর্স প্যাকেজ মূল্য:</span>
                        <span>৳ {pCalc.originalPrice.toLocaleString('bn-BD')}</span>
                      </div>
                      {pCalc.globalDiscountAmount > 0 && (
                        <div className="flex justify-between text-purple-700 font-semibold">
                          <span>অ্যাডমিন ডিসকাউন্ট ({globalDiscount.percentage}%):</span>
                          <span>- ৳ {pCalc.globalDiscountAmount.toLocaleString('bn-BD')}</span>
                        </div>
                      )}
                      {pCalc.couponDiscountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>কুপন ছাড় ({appliedCoupon?.coupon?.code}):</span>
                          <span>- ৳ {pCalc.couponDiscountAmount.toLocaleString('bn-BD')}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                        <span>সর্বমোট প্রদেয় টাকা:</span>
                        <span className="text-xl text-[#E11D48]">
                          ৳ {pCalc.finalPrice.toLocaleString('bn-BD')}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Checkout Method Tabs: Online Instant vs Manual TrxID */}
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setCheckoutTab('online')}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      checkoutTab === 'online' ? 'bg-[#E11D48] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>অনলাইন অটো ভেরিফাই</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutTab('manual')}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      checkoutTab === 'manual' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>ম্যানুয়াল পেমেন্ট (TrxID)</span>
                  </button>
                </div>

                {/* TAB A: Online Instant Gateway */}
                {checkoutTab === 'online' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">গেটওয়ে নির্বাচন করুন:</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setOnlineGateway('bkash')}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            onlineGateway === 'bkash'
                              ? 'border-[#D12053] bg-pink-50/50 text-[#D12053] font-black'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="text-xs font-black">bKash</div>
                          <div className="text-[10px]">Instant Auto</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlineGateway('nagad')}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            onlineGateway === 'nagad'
                              ? 'border-[#F7931E] bg-orange-50/50 text-[#F7931E] font-black'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="text-xs font-black">Nagad</div>
                          <div className="text-[10px]">Instant Auto</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlineGateway('card')}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            onlineGateway === 'card'
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-black'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="text-xs font-black">Cards</div>
                          <div className="text-[10px]">Visa / Master</div>
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>ইনস্ট্যান্ট অটোমেশন সক্রিয়</span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        অনলাইন পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই সিস্টেম অটো-ভেরিফাই করে তৎক্ষণাৎ আপনার ড্যাশবোর্ড চালু করে দেবে।
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOnlineAutoPayment}
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>অনলাইন পেমেন্ট ভেরিফাই করা হচ্ছে...</span>
                        </>
                      ) : (
                        <span>অনলাইনে পে করুন ও ইনস্ট্যান্ট আনলক করুন ➔</span>
                      )}
                    </button>
                  </div>
                )}

                {/* TAB B: Manual Send Money & TrxID Submission */}
                {checkoutTab === 'manual' && (
                  <form onSubmit={handleManualPaymentSubmit} className="space-y-4 animate-in fade-in">
                    
                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-2">
                      {(['bKash', 'Nagad', 'Bank'] as const).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setManualMethod(m)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            manualMethod === m 
                              ? 'border-slate-900 bg-slate-900 text-white' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    {/* Instructions Box */}
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-900">
                      <div className="font-bold flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>{manualMethod} একাউন্ট ও নির্দেশনা:</span>
                      </div>
                      <div className="text-[11px] space-y-1">
                        {manualMethod === 'bKash' && (
                          <div>
                            নম্বর: <strong className="font-mono text-sm text-[#D12053]">01711-223344</strong> (মার্চেন্ট - Make Payment অথবা Send Money)
                          </div>
                        )}
                        {manualMethod === 'Nagad' && (
                          <div>
                            নম্বর: <strong className="font-mono text-sm text-[#F7931E]">01822-334455</strong> (পার্সোনাল - Send Money)
                          </div>
                        )}
                        {manualMethod === 'Bank' && (
                          <div>
                            ব্যাংক: <strong>City Bank (Dhanmondi Branch)</strong>, A/C: <strong className="font-mono">1502-849201-001</strong> (PrepIELTS BD)
                          </div>
                        )}
                        <p className="text-slate-600 text-[10px]">
                          টাকা পাঠানোর পর নিচের ফর্মে আপনার প্রেরক নম্বর ও TrxID লিখে সাবমিট করুন। অ্যাডমিন দ্রুত ভেরিফাই করে অনুমোদন দেবে।
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          আপনার প্রেরক মোবাইল নম্বর:
                        </label>
                        <input
                          type="text"
                          required
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          placeholder="017xxxxxxxx"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono outline-none focus:ring-2 focus:ring-[#E11D48]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ট্রানজেকশন আইডি (TrxID):
                        </label>
                        <input
                          type="text"
                          required
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="যেমন: BK782910 বা NG910245"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase outline-none focus:ring-2 focus:ring-[#E11D48]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>তথ্য সাবমিট করা হচ্ছে...</span>
                      ) : (
                        <span>পেমেন্ট তথ্য সাবমিট করুন (Submit for Approval) ➔</span>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
