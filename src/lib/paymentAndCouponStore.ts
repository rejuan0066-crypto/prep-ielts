'use client';

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed'; // percentage (e.g. 20%) or fixed (e.g. 500 TK)
  discountValue: number;
  targetStudentEmail?: string; // empty means for all students, otherwise specific student email
  minOrderAmount?: number;
  isActive: boolean;
  description: string;
  createdAt: string;
}

export interface GlobalDiscount {
  isEnabled: boolean;
  title: string;
  percentage: number;
}

export interface PaymentTransaction {
  id: string;
  studentName: string;
  studentEmail: string;
  planName: string;
  duration: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  method: 'bKash (Online)' | 'Nagad (Online)' | 'bKash (Manual)' | 'Nagad (Manual)' | 'Bank Transfer' | 'Card';
  senderNumber?: string;
  trxId: string;
  couponUsed?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  verifiedBy?: string;
  verificationDate?: string;
}

const DEFAULT_GLOBAL_DISCOUNT: GlobalDiscount = {
  isEnabled: true,
  title: 'প্রাক-রেজিস্ট্রেশন স্পেশাল অফার',
  percentage: 15
};

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'cpn_01',
    code: 'SPECIAL20',
    discountType: 'percentage',
    discountValue: 20,
    isActive: true,
    description: 'সকল শিক্ষার্থীর জন্য ২০% ফ্ল্যাট ডিসকাউন্ট',
    createdAt: '০১ নভে ২০২৬'
  },
  {
    id: 'cpn_02',
    code: 'IELTS1000',
    discountType: 'fixed',
    discountValue: 1000,
    isActive: true,
    description: '১,০০০ টাকা ক্যাশ ছাড়',
    createdAt: '০৩ নভে ২০২৬'
  },
  {
    id: 'cpn_03',
    code: 'VIP50',
    discountType: 'percentage',
    discountValue: 50,
    targetStudentEmail: 'student@prep-ielts.com',
    isActive: true,
    description: 'নির্দিষ্ট মেধাবী ছাত্রের জন্য ৫০% স্কলারশিপ কোড',
    createdAt: '০৫ নভে ২০২৬'
  }
];

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'trx_101',
    studentName: 'তানজিলা হক',
    studentEmail: 'tanjila.hq@gmail.com',
    planName: 'PrepIELTS Pro',
    duration: '3 Months Access',
    originalAmount: 4500,
    discountAmount: 900,
    finalAmount: 3600,
    method: 'bKash (Manual)',
    senderNumber: '01711223344',
    trxId: 'BK782910',
    date: '০৮ নভে ২০২৬, রাত ৮:৪৫',
    status: 'approved',
    verifiedBy: 'Super Admin'
  },
  {
    id: 'trx_102',
    studentName: 'মাহমুদুল হাসান',
    studentEmail: 'mahmud.h@outlook.com',
    planName: 'PrepIELTS Pro',
    duration: '1 Month Access',
    originalAmount: 1990,
    discountAmount: 0,
    finalAmount: 1990,
    method: 'Nagad (Manual)',
    senderNumber: '01822334455',
    trxId: 'NG910245',
    date: '০৯ নভে ২০২৬, দুপুর ২:১৫',
    status: 'pending'
  }
];

// 1. Coupon Store Helpers
export const getCoupons = (): Coupon[] => {
  if (typeof window === 'undefined') return DEFAULT_COUPONS;
  try {
    const stored = localStorage.getItem('prep_ielts_coupons');
    return stored ? JSON.parse(stored) : DEFAULT_COUPONS;
  } catch (e) {
    return DEFAULT_COUPONS;
  }
};

export const saveCoupons = (coupons: Coupon[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('prep_ielts_coupons', JSON.stringify(coupons));
  } catch (e) {}
};

// 2. Global Discount Store Helpers
export const getGlobalDiscount = (): GlobalDiscount => {
  if (typeof window === 'undefined') return DEFAULT_GLOBAL_DISCOUNT;
  try {
    const stored = localStorage.getItem('prep_ielts_global_discount');
    return stored ? JSON.parse(stored) : DEFAULT_GLOBAL_DISCOUNT;
  } catch (e) {
    return DEFAULT_GLOBAL_DISCOUNT;
  }
};

export const saveGlobalDiscount = (discount: GlobalDiscount): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('prep_ielts_global_discount', JSON.stringify(discount));
  } catch (e) {}
};

// 3. Coupon Validation Helper
export interface CouponValidationResult {
  isValid: boolean;
  message: string;
  coupon?: Coupon;
  discountAmount: number;
}

export const validateCoupon = (
  code: string,
  studentEmail: string,
  orderAmount: number
): CouponValidationResult => {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return { isValid: false, message: 'কুপন কোড লিখুন', discountAmount: 0 };
  }

  const coupons = getCoupons();
  const found = coupons.find(c => c.code.toUpperCase() === cleanCode);

  if (!found) {
    return { isValid: false, message: 'অবৈধ কুপন কোড! অনুগ্রহ করে সঠিক কোড দিন।', discountAmount: 0 };
  }

  if (!found.isActive) {
    return { isValid: false, message: 'এই কুপন কোডটির মেয়াদ শেষ হয়েছে বা নিষ্ক্রিয় রয়েছে।', discountAmount: 0 };
  }

  // Check target student restriction
  if (found.targetStudentEmail && found.targetStudentEmail.trim().toLowerCase() !== studentEmail.trim().toLowerCase()) {
    return { 
      isValid: false, 
      message: `এই বিশেষ কুপন কোডটি শুধুমাত্র নির্দিষ্ট শিক্ষার্থীর জন্য প্রযোজ্য।`, 
      discountAmount: 0 
    };
  }

  let discountAmount = 0;
  if (found.discountType === 'percentage') {
    discountAmount = Math.round((orderAmount * found.discountValue) / 100);
  } else {
    discountAmount = Math.min(found.discountValue, orderAmount);
  }

  return {
    isValid: true,
    message: `কুপন '${found.code}' সফলভাবে প্রযুক্ত হয়েছে! আপনি ৳ ${discountAmount.toLocaleString('bn-BD')} ছাড় পেয়েছেন।`,
    coupon: found,
    discountAmount
  };
};

// 4. Transactions Store Helpers
export const getTransactions = (): PaymentTransaction[] => {
  if (typeof window === 'undefined') return INITIAL_TRANSACTIONS;
  try {
    const stored = localStorage.getItem('prep_ielts_transactions');
    return stored ? JSON.parse(stored) : INITIAL_TRANSACTIONS;
  } catch (e) {
    return INITIAL_TRANSACTIONS;
  }
};

export const saveTransactions = (txs: PaymentTransaction[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('prep_ielts_transactions', JSON.stringify(txs));
  } catch (e) {}
};

// Helper to approve payment and update student DB
export const approvePaymentTransaction = (trxId: string, verifiedBy: string = 'Super Admin'): boolean => {
  const txs = getTransactions();
  const tx = txs.find(t => t.id === trxId || t.trxId.toLowerCase() === trxId.toLowerCase());
  if (!tx) return false;

  tx.status = 'approved';
  tx.verifiedBy = verifiedBy;
  tx.verificationDate = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
  saveTransactions([...txs]);

  // Update in Users DB
  try {
    const storedDb = localStorage.getItem('prep_ielts_users_db');
    if (storedDb) {
      const db = JSON.parse(storedDb);
      const studentEmail = tx.studentEmail.toLowerCase();
      if (db[studentEmail]) {
        db[studentEmail].profile.paymentStatus = 'approved';
        db[studentEmail].profile.plan = 'Pro';
        localStorage.setItem('prep_ielts_users_db', JSON.stringify(db));
      }
    }

    // Also update active session if current user matches
    const activeUser = localStorage.getItem('prep_ielts_user');
    if (activeUser) {
      const parsed = JSON.parse(activeUser);
      if (parsed.email && parsed.email.toLowerCase() === tx.studentEmail.toLowerCase()) {
        parsed.paymentStatus = 'approved';
        parsed.plan = 'Pro';
        localStorage.setItem('prep_ielts_user', JSON.stringify(parsed));
      }
    }
  } catch (e) {}

  return true;
};

// Helper to reject payment transaction
export const rejectPaymentTransaction = (trxId: string): boolean => {
  const txs = getTransactions();
  const tx = txs.find(t => t.id === trxId || t.trxId.toLowerCase() === trxId.toLowerCase());
  if (!tx) return false;

  tx.status = 'rejected';
  saveTransactions([...txs]);

  try {
    const storedDb = localStorage.getItem('prep_ielts_users_db');
    if (storedDb) {
      const db = JSON.parse(storedDb);
      const studentEmail = tx.studentEmail.toLowerCase();
      if (db[studentEmail]) {
        db[studentEmail].profile.paymentStatus = 'unpaid';
        localStorage.setItem('prep_ielts_users_db', JSON.stringify(db));
      }
    }

    const activeUser = localStorage.getItem('prep_ielts_user');
    if (activeUser) {
      const parsed = JSON.parse(activeUser);
      if (parsed.email && parsed.email.toLowerCase() === tx.studentEmail.toLowerCase()) {
        parsed.paymentStatus = 'unpaid';
        localStorage.setItem('prep_ielts_user', JSON.stringify(parsed));
      }
    }
  } catch (e) {}

  return true;
};
