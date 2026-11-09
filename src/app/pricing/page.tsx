'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
  Coins
} from 'lucide-react';

export type BillingCycle = '1_month' | '3_months' | '6_months' | 'lifetime';

export default function PricingPage() {
  const { user, upgradePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('3_months');
  
  const [selectedPlan, setSelectedPlan] = useState<{
    key: 'Free' | 'Pro' | 'VIP';
    name: string;
    price: string;
    usdPrice: string;
    durationLabel: string;
  } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getPlanPricing = (planKey: 'Free' | 'Pro' | 'VIP') => {
    if (planKey === 'Free') {
      return { price: '৳ 0', usd: '$0', period: 'Free Trial', originalPrice: null, savings: null, coins: '50 Coins' };
    }

    if (planKey === 'Pro') {
      switch (billingCycle) {
        case '1_month':
          return { price: '৳ ১,৯৯০', usd: '$19 / mo', period: 'Billed monthly', originalPrice: null, savings: null, coins: '600 Gold Coins' };
        case '3_months':
          return { price: '৳ ৪,৫০০', usd: '$45 / 3 mo', period: 'Billed every 3 months', originalPrice: '৳ ৫,৯৭০', savings: 'Save 21%', coins: '1,800 Gold Coins' };
        case '6_months':
          return { price: '৳ ৬,৯০০', usd: '$69 / 6 mo', period: 'Billed every 6 months', originalPrice: '৳ ১১,৯৪০', savings: 'Save 42%', coins: '3,600 Gold Coins' };
        case 'lifetime':
          return { price: '৳ ৯,৯৯০', usd: '$99 one-time', period: 'Lifetime Unlimited Access', originalPrice: '৳ ২৩,৮৮০', savings: 'Best Value Deal 🔥', coins: 'Unlimited Coins' };
      }
    }

    if (planKey === 'VIP') {
      switch (billingCycle) {
        case '1_month':
          return { price: '৳ ৩,৯৯০', usd: '$39 / mo', period: 'Billed monthly', originalPrice: null, savings: null, coins: '1,500 Gold Coins' };
        case '3_months':
          return { price: '৳ ৮,৯০০', usd: '$89 / 3 mo', period: 'Billed every 3 months', originalPrice: '৳ ১১,৯৭০', savings: 'Save 25%', coins: '4,500 Gold Coins' };
        case '6_months':
          return { price: '৳ ১৩,৯০০', usd: '$139 / 6 mo', period: 'Billed every 6 months', originalPrice: '৳ ২৩,৯৪০', savings: 'Save 45%', coins: '9,000 Gold Coins' };
        case 'lifetime':
          return { price: '৳ ১৪,৯০০', usd: '$149 one-time', period: 'VIP Lifetime Mentorship', originalPrice: '৳ ২৯,৯৮০', savings: 'Ultimate VIP Deal 👑', coins: 'Unlimited VIP' };
      }
    }

    return { price: '৳ 0', usd: '$0', period: '', originalPrice: null, savings: null, coins: '0 Coins' };
  };

  const getDurationName = () => {
    switch (billingCycle) {
      case '1_month': return '1 Month Access';
      case '3_months': return '3 Months Access (Recommended)';
      case '6_months': return '6 Months Runway';
      case 'lifetime': return 'Lifetime VIP';
    }
  };

  const plans = [
    {
      name: 'Free Trial',
      tag: 'Basic Access',
      planKey: 'Free' as const,
      description: 'Test the platform features with diagnostic and basic sample mock exercises.',
      features: [
        '15-Minute Adaptive AI Diagnostic Test',
        '1 Cambridge CD-IELTS Reading Passage',
        '3 Essay AI Band 7 Evaluations',
        'Standard Bilingual Dictionary Popups',
        'Basic Progress Dashboard'
      ],
      current: user?.plan === 'Free',
      popular: false
    },
    {
      name: 'PrepIELTS Pro',
      tag: 'Most Popular',
      planKey: 'Pro' as const,
      description: 'Full toolkit for serious candidates aiming for Band 7.5 to 8.5.',
      features: [
        'Unlimited AI Writing Feedback & Examiner Scoring',
        'AI Speaking Partner with Cambridge Cue Cards',
        'Real-time Speech Recognition & Waveform Articulation',
        'All Cambridge 7–21 CD-IELTS Reading & Listening Mocks',
        'AI Rewriter with Band 8.5 Expression Upgrades',
        'Mihu AI IELTS Tutor 24/7 Chatbot',
        'Personalized Study Plan Calendar & Daily Streak Tracker',
        'Complete Academic Vocabulary & Grammar Masterclasses'
      ],
      current: user?.plan === 'Pro',
      popular: true
    },
    {
      name: 'VIP 8.5 Mentorship',
      tag: 'British Council Expert',
      planKey: 'VIP' as const,
      description: 'Everything in Pro plus live 1-on-1 human expert mock reviews.',
      features: [
        'Everything in PrepIELTS Pro Unlimited',
        'Weekly 1-on-1 Live Zoom Speaking with Senior Examiner',
        'Human Examiner Detailed Line-by-Line Writing Review',
        'Dedicated WhatsApp Support & Study Room',
        'University Admission SOP & Visa SOP Review',
        'Official British Council Exam Booking Assistance'
      ],
      current: user?.plan === 'VIP',
      popular: false
    }
  ];

  const handleCheckoutClick = (planKey: 'Free' | 'Pro' | 'VIP') => {
    if (planKey === 'Free') {
      upgradePlan('Free');
      alert('You are currently on the Free Trial.');
      return;
    }

    const pricing = getPlanPricing(planKey);
    setSelectedPlan({
      key: planKey,
      name: planKey === 'Pro' ? 'PrepIELTS Pro' : 'VIP 8.5 Mentorship',
      price: pricing.price,
      usdPrice: pricing.usd,
      durationLabel: getDurationName()
    });
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      if (selectedPlan) {
        upgradePlan(selectedPlan.key);
      }
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedPlan(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FLEXIBLE PRO DURATION PLANS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Accelerate Your Score to Band 8.0+
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Select your preparation runway. Instant automated activation via bKash, Nagad, or Cards.
        </p>

        {/* Duration Tabs */}
        <div className="pt-3 flex justify-center">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs flex-wrap justify-center gap-1">
            <button
              onClick={() => setBillingCycle('1_month')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingCycle === '1_month'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1 Month ($19)
            </button>

            <button
              onClick={() => setBillingCycle('3_months')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all relative ${
                billingCycle === '3_months'
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 Months ($45)
              <span className="ml-1.5 px-1.5 py-0.2 bg-white text-[#E11D48] text-[9px] rounded-full font-black uppercase">
                Save 21%
              </span>
            </button>

            <button
              onClick={() => setBillingCycle('6_months')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingCycle === '6_months'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6 Months ($69)
            </button>

            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'lifetime'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lifetime VIP 🔥
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => {
          const pricing = getPlanPricing(p.planKey);
          return (
            <div
              key={p.name}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                p.popular
                  ? 'border-2 border-[#E11D48] shadow-lg ring-4 ring-rose-50'
                  : 'border border-slate-200/80 shadow-xs hover:border-slate-300'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#E11D48] text-white rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{p.name}</h2>
                    <p className="text-xs text-slate-500 mt-1">{p.description}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono ${
                    p.popular ? 'bg-rose-50 text-[#E11D48] border border-rose-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.tag}
                  </span>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {pricing.price}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      ({pricing.usd})
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                    <span>{pricing.period}</span>
                    {pricing.savings && (
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                        {pricing.savings}
                      </span>
                    )}
                  </div>

                  {p.planKey !== 'Free' && (
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs font-bold text-amber-900">
                      <span>🪙</span>
                      <span>{pricing.coins} for AI Speaking Partner</span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Included Capabilities:
                  </div>
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => handleCheckoutClick(p.planKey)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    p.current
                      ? 'bg-slate-100 text-slate-500 cursor-default'
                      : p.popular
                      ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-md shadow-rose-500/20 transform hover:-translate-y-0.5'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {p.current ? (
                    <span>Current Active Plan</span>
                  ) : (
                    <>
                      <span>Activate {p.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Checkout: {selectedPlan.name}</h3>
                <p className="text-xs text-slate-500">{selectedPlan.durationLabel}</p>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Payment Successful!</h4>
                <p className="text-xs text-slate-500">Your account has been upgraded to {selectedPlan.name}.</p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <span className="text-xs font-semibold text-slate-600">Total Payable Amount</span>
                  <span className="text-xl font-black text-slate-900">{selectedPlan.price}</span>
                </div>

                {/* Gateway Options */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Select Instant Payment Gateway:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'bkash'
                          ? 'border-[#D12053] bg-pink-50/50 text-[#D12053] font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-black">bKash</div>
                      <div className="text-[10px]">Instant Auto</div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'nagad'
                          ? 'border-[#F7931E] bg-orange-50/50 text-[#F7931E] font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-black">Nagad</div>
                      <div className="text-[10px]">Instant Auto</div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-black">Visa / Master</div>
                      <div className="text-[10px]">Cards</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700">Account Mobile Number</label>
                  <input
                    type="text"
                    defaultValue="01700000000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono outline-none focus:border-[#E11D48]"
                  />
                </div>

                <button
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying with Edumate Gateway...</span>
                    </>
                  ) : (
                    <span>Confirm & Pay {selectedPlan.price}</span>
                  )}
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
