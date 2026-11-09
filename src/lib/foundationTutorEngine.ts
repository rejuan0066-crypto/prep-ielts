import { PracticeExercise } from './foundationCurriculumRegistry';

export interface FoundationTutorResponse {
  reply: string;
  isCheatingAttempt: boolean;
  suggestedPrompt?: string;
}

export function processFoundationTutorQuery(
  rawQuery: string,
  lessonTitle: string,
  exercises: PracticeExercise[]
): FoundationTutorResponse {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // 1. ANTI-CHEAT DETECTION: Check if student is seeking direct answers to quiz questions
  const cheatKeywords = [
    'উত্তর কি', 'উত্তর কী', 'উত্তর বল', 'উত্তর দাও', 'সঠিক কোনটা', 'সঠিক অপশন',
    'answer of', 'what is the answer', 'give me the answer', 'solve question',
    'which option is correct', 'answer for question', 'solve quiz', 'tell me the answer',
    'answer 1', 'answer 2', 'answer 3', 'question 1', 'question 2', 'question 3',
    '১ এর উত্তর', '২ এর উত্তর', '৩ এর উত্তর', '১ নম্বর', '২ নম্বর', '৩ নম্বর'
  ];

  const isAskingDirectAnswer = cheatKeywords.some(kw => lower.includes(kw));

  if (isAskingDirectAnswer) {
    // Determine which exercise they might be asking about
    let targetEx: PracticeExercise | undefined;
    if (lower.includes('1') || lower.includes('১')) {
      targetEx = exercises.find(e => e.id === 1);
    } else if (lower.includes('2') || lower.includes('২')) {
      targetEx = exercises.find(e => e.id === 2);
    } else if (lower.includes('3') || lower.includes('৩')) {
      targetEx = exercises.find(e => e.id === 3);
    } else {
      targetEx = exercises[0];
    }

    const hintText = targetEx ? targetEx.hint : 'লেসনের মূল সূত্র ও উদাহরণের দিকে লক্ষ্য করুন।';

    return {
      isCheatingAttempt: true,
      reply: `🚫 **সরাসরি উত্তর প্রদান নীতিবিরুদ্ধ!**

একজন দায়িত্বশীল মেন্টর হিসেবে আপনার শেখার স্বার্থেই সরাসরি পরীক্ষার উত্তর দেওয়া নিষেধ। তবে আমি আপনাকে সঠিক উত্তরে পৌঁছানোর জন্য একটি গুরুত্বপূর্ণ **ক্লু (Guided Hint)** দিচ্ছি:

💡 **চিন্তার ক্লু:**
"${hintText}"

🎯 **আপনার করণীয়:**
উপরের ক্লুটি মাথায় রেখে নিজে ভেবে অপশন সিলেক্ট করুন বা কিবোর্ডে উত্তর টাইপ করে **"উত্তর যাচাই করুন"** বাটনে ক্লিক করুন। 

সাবমিট করার সাথে সাথেই আপনি **সঠিক/ভুল স্ট্যাটাস** এবং **পূর্ণাঙ্গ বাংলা সমাধান** স্ক্রিনে দেখতে পাবেন!`
    };
  }

  // 2. CONCEPTUAL ASSISTANCE: Student asking for explanations, examples, or rules
  if (lower.includes('stative') || lower.includes('স্টেটিভ')) {
    return {
      isCheatingAttempt: false,
      reply: `**Stative Verbs (অবস্থাবাচক ক্রিয়া) সহজ ভাষায়:**

Stative Verb হলো এমন কিছু ক্রিয়াপদ যা কোনো শারীরিক কাজ (Action) বোঝায় না, বরং মানুষের অনুভূতি, চিন্তা, মালিকানা বা অবস্থা প্রকাশ করে।

যেমন: *know, believe, understand, love, hate, want, belong, contain, seem, realize*।

⚠️ **সবচেয়ে বড় গোল্ডেন রুল:**
এদের সাথে সাধারণত Continuous Tense (-ing) হয় না!
• ❌ ভুল: "I am knowing the answer."
•  সঠিক: "I know the answer."
• ❌ ভুল: "He is wanting a car."
•  সঠিক: "He wants a car."`
    };
  }

  if (lower.includes('transitive') || lower.includes('intransitive') || lower.includes('ট্রানজিটিভ')) {
    return {
      isCheatingAttempt: false,
      reply: `**Transitive বনাম Intransitive Verb-এর মূল রহস্য:**

১. **Transitive Verb (সকর্মক):** যার একটি সরাসরি অবজেক্ট (Object) থাকে। অর্থাৎ "কাকে" বা "কী" প্রশ্ন করলে উত্তর পাওয়া যায়।
• উদাহরণ: "She raised (কী তুলল?) her hand." এখানে 'her hand' হলো Object।

২. **Intransitive Verb (অকর্মক):** যার কোনো অবজেক্ট থাকে না।
• উদাহরণ: "The sun rises." (সূর্য ওঠে—এখানে কোনো Object নেই)।
• আরও উদাহরণ: *sleep, die, arrive, happen, occur*।

🔥 **পরীক্ষার টিপ:** Intransitive Verb-এর কখনো Passive Voice হয় না! তাই "The accident was happened" লেখা সম্পূর্ণ ভুল; বলতে হবে "The accident happened"।`
    };
  }

  if (lower.includes('causative') || lower.includes('পজিটিভ') || lower.includes('কজেটিভ')) {
    return {
      isCheatingAttempt: false,
      reply: `**Causative Verbs (অন্যকে দিয়ে কাজ করানো):**

যখন আপনি নিজে কাজ না করে অন্য কাউকে দিয়ে কাজটি করান, তখন Causative Verbs ব্যবহৃত হয়:

১. **Make (বাধ্য করা):** Subject + make + person + Base Verb (to বসে না)।
• e.g. "The teacher made the students rewrite the essay."

২. **Have (দায়িত্ব দিয়ে করানো):** Subject + have + person + Base Verb।
• e.g. "I had the mechanic inspect my car."

৩. **Get (কাউকে রাজি করিয়ে করানো):** Subject + get + person + to + Verb।
• e.g. "She got her brother to help her."

৪. **Passive Causative (সবচেয়ে জরুরি):** Subject + have/get + object + V3।
• e.g. "I had my hair cut" (অন্যকে দিয়ে চুল কাটিয়েছি)।`
    };
  }

  if (lower.includes('past simple') || lower.includes('present perfect') || lower.includes('করলাম') || lower.includes('করেছি')) {
    return {
      isCheatingAttempt: false,
      reply: `**Past Simple বনাম Present Perfect এর পার্থক্য:**

১. **Past Simple (নির্দিষ্ট অতীত সময়):** কাজটি অতীতে শেষ হয়ে গেছে এবং সময়টি উল্লেখ আছে (যেমন: in 2020, yesterday, last year)।
• সূত্র: Subject + V2 (Past Form)।
• উদাহরণ: "The company launched the app in 2022."

২. **Present Perfect (অতীতের কাজের বর্তমান প্রভাব):** কাজটি হয়েছে কিন্তু নির্দিষ্ট অতীত সালের উল্লেখ নেই, অথবা কাজের ফল এখনো বর্তমান।
• সূত্র: Subject + have/has + V3।
• উদাহরণ: "Technological automation has transformed industries recently."

💡 **মনে রাখুন:** বাক্যে যদি "in 2019" বা "yesterday" থাকে, তবে কখনোই Have/Has বসবে না!`
    };
  }

  if (lower.includes('inversion') || lower.includes('ইনভার্সন')) {
    return {
      isCheatingAttempt: false,
      reply: `**Negative Inversion (ব্যান্ড ৮.০+ কৌশল):**

বাক্যের শুরুতে যখন কোনো নেগেটিভ বা সীমাবদ্ধকারী শব্দ (Rarely, Seldom, Not only, Under no circumstances) দিয়ে জোর দেওয়া হয়, তখন অক্সিলারি ভার্বটি সাবজেক্টের আগে চলে আসে।

• সাধারণ বাক্য: "Scientists rarely observe such anomalies."
• ইনভার্সন বাক্য: "Rarely **do scientists observe** such anomalies."

সূত্র: **Negative Word + Auxiliary Verb + Subject + Main Verb**।`
    };
  }

  // General helpful response for any other topic query
  return {
    isCheatingAttempt: false,
    reply: `আপনার লেসন: **${lessonTitle}**

আপনার প্রশ্নটি অত্যন্ত সময়োপযোগী! এই লেসনের মূল বিষয় হলো নিয়মগুলোর বাস্তব প্রয়োগ ও কমন ভুলগুলো পরিহার করা।

আপনি যদি কোনো নির্দিষ্ট বাক্য, ব্যাকরণ সূত্র বা উদাহরণ সম্পর্কে জানতে চান, তাহলে নির্দিষ্টভাবে প্রশ্ন করতে পারেন। আমি শিক্ষক হিসেবে আপনাকে সম্পূর্ণ সহজ করে বুঝিয়ে দেব।

*(মনে রাখবেন: সেলফ-টেস্টিং কুইজে আপনাকে নিজে ভেবে সঠিক উত্তর দিতে হবে; উত্তর সাবমিট করার সাথে সাথে পুরো বাংলা সমাধান আনলক হয়ে যাবে!)*`
  };
}
