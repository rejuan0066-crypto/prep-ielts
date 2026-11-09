/**
 * Mihu AI Tutor Engine
 * Provides intelligent, contextual, bilingual (Bengali & English) responses for IELTS candidates.
 */

export interface MihuResponse {
  reply: string;
  suggestions: string[];
}

export function generateMihuResponse(rawInput: string): MihuResponse {
  const query = rawInput.trim();
  const lower = query.toLowerCase();

  // Check if input is predominantly in Bengali
  const hasBengali = /[\u0980-\u09FF]/.test(query);

  // 1. BASIC / BEGINNER START / বেসিক থেকে শুরু
  if (
    lower.includes('বেসিক') ||
    lower.includes('basic') ||
    lower.includes('beginner') ||
    lower.includes('দুর্বল') ||
    lower.includes('জিরো') ||
    lower.includes('weak') ||
    (lower.includes('শুরু') && lower.includes('বেসিক'))
  ) {
    if (hasBengali) {
      return {
        reply: `একদম বেসিক বা শূন্য থেকে আইএলটিএস শুরু করার পারফেক্ট রোডম্যাপ:

আপনি যদি মনে করেন আপনার বেসিক ইংরেজি ও গ্রামার দুর্বল, তবে সরাসরি কঠিন মক টেস্টে না গিয়ে নিচের ৪টি ধাপে বেসিক স্ট্রং করে নিন:

১. **আমাদের 'Pre-IELTS Foundation' একাডেমি সম্পন্ন করুন (সাইডবারে রয়েছে):**
আমাদের প্ল্যাটফর্মে একদম শুরু থেকে শেখার জন্য **Pre-IELTS Foundation** একাডেমি তৈরি করা হয়েছে (লেভেল ১ থেকে লেভেল ৬)। এতে রয়েছে:
• Parts of Speech, Pronouns ও Articles
• Active vs Passive Voice (পরীক্ষায় ও রিয়েল লাইফে ব্যবহার)
• All 12 Tenses, Modal Verbs ও Causative Verbs
• Complex Sentences, Relative Clauses ও Conditionals
• প্রতি লেসনে বাস্তব জীবনের গল্প, অডিও উচ্চারণ, কুইজ এবং না বুঝলে সাথে সাথে প্রশ্ন করার জন্য ইন-লেসন এআই টিউটর!
• প্রথম লেসন শেষ করলেই কেবল পরের লেসন স্বয়ংক্রিয়ভাবে আনলক হবে।

২. **প্রতিদিনের সাধারণ ভোকাবুলারি ব্যাংক:**
প্রতিদিন অন্তত ১৫-২০টি প্রয়োজনীয় ইংরেজি শব্দ অর্থসহ শিখুন এবং সেগুলো দিয়ে নিজে নিজে বাক্য তৈরি করুন। আমাদের সাইটের **Vocabulary** সেকশন দেখতে পারেন।

৩. **কান তৈরি করা (Listening Ear Conditioning):**
প্রতিদিন ১৫-২০ মিনিট সহজ ইংরেজি অডিও শুনুন (যেমন: BBC 6 Minute English বা TED-Ed অ্যানিমেশন ভিডিও)। প্রথমে সাবটাইটেল দেখে শুনবেন, পরে সাবটাইটেল ছাড়া।

৪. **ক্যামব্রিজ অফিসিয়াল প্র্যাকটিস লাইব্রেরি (Books 1 to 19):**
ফাউন্ডেশন মজবুত হলে সাইডবারের **Cambridge Books Library** থেকে বই ১৬-১৯ দিয়ে লিসেনিং পার্ট ১ ও রিডিং প্যাসেজ ১ প্র্যাকটিস শুরু করুন এবং এরপর **Full Mock Test** দিন।

আপনি কি ব্যাকরণ বা কোনো নির্দিষ্ট গ্রামার টপিক নিয়ে জানতে চান? আমাকে খুলে বলুন!`,
        suggestions: [
          'বেসিক গ্রামারের কোন কোন বিষয় পড়া জরুরি?',
          'লিসেনিং এ ভালো করার উপায় কি?',
          'প্রতিদিন কত ঘণ্টা পড়লে ভালো হবে?',
          'ক্যামব্রিজ কোন বইগুলো দিয়ে শুরু করব?'
        ]
      };
    } else {
      return {
        reply: `How to build a rock-solid foundation from scratch (Beginner Roadmap):

If you feel your fundamental English proficiency is currently below intermediate level, follow this 4-week ramp-up strategy:

1. **Core Grammar Mastery (Weeks 1-2):**
• Perfect usage of standard tenses (Past Simple vs Present Perfect).
• Subject-Verb agreement and correct prepositions.
• Transitioning from simple sentences to compound-complex structures using subordinating conjunctions ('Although', 'Whereas', 'Despite').

2. **Daily Active Vocabulary Acquisition:**
Learn 15–20 high-frequency collocations daily and apply them in written sentences.

3. **Ear Conditioning for Listening:**
Spend 20 minutes daily listening to accessible native English broadcasts (e.g. BBC 6-Minute English or TED talks) to acclimate your ear to British and Australian accents.

4. **Gradual Reading Comprehension:**
Start with Reading Passage 1 from Cambridge past papers. Underline every unknown word, identify their synonyms, and build reading stamina.

5. **Transitioning to IELTS Specific Drills:**
Once foundational comprehension feels comfortable, start practicing with Cambridge Books 16 through 19 in our library.

Which area feels like your biggest hurdle right now?`,
        suggestions: [
          'Key grammar topics to review first',
          'How to improve listening from basic level',
          'Band 7 target study plan for beginners'
        ]
      };
    }
  }

  // 2. HOW TO START JOURNEY / প্রস্তুতি কিভাবে শুরু করব
  if (
    lower.includes('শুরু') ||
    lower.includes('জার্নি') ||
    lower.includes('প্রস্তুতি') ||
    lower.includes('start') ||
    lower.includes('begin') ||
    lower.includes('guideline') ||
    lower.includes('roadmap') ||
    lower.includes('কোর্স') ||
    lower.includes('কখন')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস প্রস্তুতি শুরুর চমৎকার একটি প্রশ্ন! সফলভাবে প্রস্তুতি নিতে নিচের ৫টি ধাপ মেনে চলুন:

১. **বর্তমান লেভেল যাচাই (Diagnostic Test):**
সবার আগে একটি ফুল মক টেস্ট বা ডায়াগনস্টিক টেস্ট দিন। এতে বুঝতে পারবেন আপনার বর্তমান ব্যান্ড স্কোর কত (যেমন: 5.0, 5.5 নাকি 6.0) এবং কোন মডিউলে দুর্বলতা বেশি।

২. **লক্ষ্য ও মডিউলের ফরম্যাট নির্ধারণ:**
একাডেমিক নাকি জেনারেল ট্রেনিং দিচ্ছেন তা ঠিক করুন। এরপর ৪টি মডিউলের (লিসেনিং ৩০ মি., রিডিং ৬০ মি., রাইটিং ৬০ মি., স্পিকিং ১১-১৪ মি.) নিয়মাবলী জেনে নিন।

৩. **ক্যামব্রিজ অফিসিয়াল বই দিয়ে শুরু (Books 14–19):**
মার্কেটের অপ্রয়োজনীয় বইয়ের চেয়ে কেমব্রিজের অফিসিয়াল বইগুলো সবচেয়ে নির্ভরযোগ্য। আমাদের সাইটের **Cambridge Books** ট্যাব থেকে ১৬ থেকে ১৯ নম্বর বই দিয়ে নিয়মিত পার্ট-বাই-পার্ট প্র্যাকটিস শুরু করুন।

৪. **প্রতিদিনের ভুল বিশ্লেষণ (Mistake Log):**
প্রতিদিন টেস্ট দেওয়ার পর কেন ভুল হলো তা ভালো করে দেখুন—স্পেলিং মিস্টেক, সিনোনিম বুঝতে না পারা, নাকি সময়ের অভাব? একটি আলাদা খাতায় প্রতিদিনের নতুন ভোকাবুলারি লিখে রাখুন।

৫. **টাইমিং ও ফুল মক টেস্ট:**
প্রতি সপ্তাহে অন্তত একটি **Full Mock Test** দিন। আসল পরীক্ষার মতো কঠোর টাইমিং মেনে টেস্ট দিলে পরীক্ষার হলের ভয় দূর হবে।

আপনি কি বিশেষ কোনো মডিউলে (যেমন লিসেনিং বা রিডিং) দুর্বল বোধ করছেন? আমাকে জানাতে পারেন!`,
        suggestions: [
          'লিসেনিং এ ভালো করার উপায় কি?',
          'রিডিং এ সময় বাঁঁচানোর কৌশল',
          'রাইটিং টাস্ক ২ কিভাবে লিখব?',
          'ক্যামব্রিজ কোন বইগুলো আগে পড়ব?'
        ]
      };
    } else {
      return {
        reply: `Here is a proven 5-step roadmap to start your IELTS journey from scratch:

1. **Take a Baseline Diagnostic Test:**
Before purchasing materials, sit for a full-length mock exam to determine your current baseline (e.g., Band 5.5 vs Band 6.5).

2. **Understand the Official Test Format:**
Familiarize yourself with the 4 modules:
• Listening: 40 questions, 30 minutes (+2 mins review).
• Reading: 3 long academic texts, 40 questions, 60 minutes.
• Writing: Task 1 report (150 words) + Task 2 essay (250 words), 60 minutes.
• Speaking: 3-part interactive interview, 11–14 minutes.

3. **Begin with Official Cambridge Books (Books 14 to 19):**
Always practice with authentic Cambridge past papers. Start with Books 16, 17, 18, and 19 for the most modern question patterns.

4. **Maintain a Rigorous Mistake Journal:**
Review every incorrect answer: Was it a spelling error, misheard syllable, or a paraphrased synonym you did not recognize?

5. **Schedule Weekly Full Mock Exams:**
Test under strict exam conditions in our "Full Mock Test" hub to build endurance and time management.

Which module would you like to prioritize first?`,
        suggestions: [
          'How to improve Listening score?',
          'Time management tips for Reading',
          'Band 8 structure for Task 2 Essay',
          'Speaking Part 2 Cue Card strategy'
        ]
      };
    }
  }

  // 2. LISTENING TIPS / লিসেনিং
  if (
    lower.includes('লিসেনিং') ||
    lower.includes('listening') ||
    lower.includes('অডিও') ||
    lower.includes('audio') ||
    lower.includes('স্পেলিং') ||
    lower.includes('spelling')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস লিসেনিং-এ ৮.০+ ব্যান্ড পাওয়ার প্রধান কৌশলগুলো:

১. **প্রশ্ন আগে পড়ার অভ্যাস (Pre-reading):**
অডিও প্লে হওয়ার আগে ২০-৩০ সেকেন্ড সময় পাওয়া যায়। এই সময়ে প্রশ্নগুলো দ্রুত পড়ে **Key Words** ও শূন্যস্থানে কী ধরনের শব্দ বসতে পারে (নাম, সংখ্যা, স্থান, তারিখ) তা প্রেডিক্ট করুন।

২. **স্পেলিং ও প্লুরাল (s/es) এর ব্যাপারে সতর্ক থাকুন:**
লিসেনিংয়ে ৮০% ভুল হয় স্পেলিং ও একবচন/বহুবচনের কারণে। যেমন: 'students' এর জায়গায় 'student' লিখলে মার্ক কাটা যাবে।

৩. **সিনোনিম ও ডিস্ট্র্যাক্টর (Distractor) খেয়াল করুন:**
অডিওতে বক্তা প্রথমে একটি ভুল তথ্য বলে পরে তা সংশোধন করতে পারেন (যেমন: "We can meet at 4 PM... oh wait, let's make it 5 PM")। তাই শেষ বাক্য পর্যন্ত কান খোলা রাখুন।

৪. **পার্ট ১ ও পার্ট ৪-এ টাইপিং এক্যুরেসি:**
এই দুই পার্টে কোনো অপশন থাকে না, শুনে শুনে টাইপ করতে হয়। আমাদের সাইটের লিসেনিং টেস্টে সরাসরি কিবোর্ড টাইপ করে প্র্যাকটিস করুন।`,
        suggestions: [
          'লিসেনিং এর আসল অডিও কোথায় পাব?',
          'স্পেলিং মিসটেক কমানোর উপায়',
          'একটি সম্পূর্ণ লিসেনিং মক টেস্ট শুরু করুন'
        ]
      };
    } else {
      return {
        reply: `Top strategies to secure Band 8.0+ in IELTS Listening:

1. **Active Pre-Reading (Prediction):**
Use the 30-second silence before each section to identify word types needed (e.g., a surname, postcode, measurement, or plural noun).

2. **Beware of Distractors:**
Speakers frequently correct themselves: *"I'll reserve the Friday flight... actually, Saturday morning is much cheaper."* Always wait for the final confirmation.

3. **Spelling & Grammatical Accuracy:**
Common deductions come from missing plural endings ('s'/'es') and British vs American spelling. In Part 1 & Part 4 note completion, typing precision is mandatory.

4. **Multitasking Ear & Eye:**
Keep your eyes on the next 2 questions simultaneously so you do not get lost if you miss one answer.`,
        suggestions: [
          'Start Cambridge 18 Listening Test',
          'How are Band scores calculated in Listening?',
          'Practice Section 1 Note Completion'
        ]
      };
    }
  }

  // 3. READING TIPS / রিডিং
  if (
    lower.includes('রিডিং') ||
    lower.includes('reading') ||
    lower.includes('প্যাসেজ') ||
    lower.includes('passage') ||
    lower.includes('true/false') ||
    lower.includes('true false') ||
    lower.includes('not given') ||
    lower.includes('heading') ||
    lower.includes('সময়') ||
    lower.includes('time')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস রিডিংয়ে সময় ম্যানেজমেন্ট ও বেশি নম্বর পাওয়ার গোল্ডেন রুলস:

১. **পুরো প্যাসেজ লাইন ধরে পড়বেন না:**
প্যাসেজ না পড়ে প্রথমে প্রশ্নগুলো পড়ুন। প্রশ্নে থাকা Unique Keywords (সাল, নাম, বড় হাতের অক্ষর, বৈজ্ঞানিক টার্ম) দিয়ে প্যাসেজে স্ক্যান (Scan) করুন।

২. **True / False / Not Given-এর মূল রহস্য:**
• **TRUE:** প্রশ্নের বক্তব্যের সাথে প্যাসেজের অর্থ হুবহু মিলে (প্যারাফ্রেজড হলেও)।
• **FALSE:** প্যাসেজে সরাসরি বিপরীত তথ্য দেওয়া থাকে।
• **NOT GIVEN:** বিষয়টি প্যাসেজে কিছুটা ছুয়ে গেলেও সুনির্দিষ্ট দাবিটি নিশ্চিত বা অস্বীকার করা হয়নি। যদি আপনার বাস্তব জীবনের জ্ঞান দিয়ে আন্দাজ করতে হয়, তবে সেটা নিশ্চিত NOT GIVEN!

৩. **২০-২০-২০ টাইমিং রুল:**
প্যাসেজ ১-এ সর্বোচ্চ ১৭-১৮ মিনিট, প্যাসেজ ২-এ ২০ মিনিট এবং প্যাসেজ ৩-এ ২২-২৫ মিনিট দিন। কোনো কঠিন প্রশ্নে ১ মিনিটের বেশি আটকে থাকবেন না; ফ্ল্যাগ করে সামনে এগিয়ে যান।`,
        suggestions: [
          'True/False vs Yes/No এর পার্থক্য কি?',
          'Matching Headings দ্রুত করার উপায়',
          'রিডিং মক টেস্ট ওপেন করুন'
        ]
      };
    } else {
      return {
        reply: `Essential principles to master IELTS Reading:

1. **Question-First Technique:**
Never read the whole passage first. Skim the questions, underline anchor keywords (dates, proper nouns, technical terms), and scan the passage for their synonymous equivalents.

2. **True / False / Not Given Framework:**
• **TRUE:** The fact is directly corroborated by the text.
• **FALSE:** The text explicitly contradicts or negates the question claim.
• **NOT GIVEN:** The topic is mentioned, but the exact comparison or relationship is never verified.

3. **Strict Time Allocation:**
Spend max 17 mins on Passage 1, 20 mins on Passage 2, and 23 mins on Passage 3. Never spend more than 75 seconds on a single question.`,
        suggestions: [
          'Practice Cambridge Academic Reading Test 1',
          'How to score Band 8 in Reading?',
          'Explain Matching Information strategy'
        ]
      };
    }
  }

  // 4. WRITING TIPS / রাইটিং
  if (
    lower.includes('রাইটিং') ||
    lower.includes('writing') ||
    lower.includes('task 1') ||
    lower.includes('task 2') ||
    lower.includes('essay') ||
    lower.includes('গ্রাফ') ||
    lower.includes('structure') ||
    lower.includes('এসসে')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস রাইটিং-এ ৭.৫+ ব্যান্ডের জন্য নির্দিষ্ট ৪টি ক্রাইটেরিয়া মেনে চলতে হয়:

১. **Task 2 (৪-প্যারাগ্রাফ আর্কিটেকচার - ২৫০+ শব্দ):**
• **প্যারাগ্রাফ ১ (Introduction, ৪০-৪৫ শব্দ):** প্রম্পটের বক্তব্য প্যারাফ্রেজ করুন + আপনার সুস্পষ্ট মতামত বা থিসিস দিন।
• **প্যারাগ্রাফ ২ (Body 1, ৯০-১০০ শব্দ):** প্রথম যুক্তি -> ব্যাখ্যা -> বাস্তব উদাহরণ বা প্রমাণ।
• **প্যারাগ্রাফ ৩ (Body 2, ৯০-১০০ শব্দ):** দ্বিতীয় যুক্তি বা কাউন্টার ভিউ -> বিশদ ব্যাখ্যা -> ফলাফল।
• **প্যারাগ্রাফ ৪ (Conclusion, ৩৫-৪০ শব্দ):** নতুন কোনো যুক্তি ছাড়া নিজের মতামতকে ভিন্ন শব্দে পুনরুল্লেখ করুন।

২. **Task 1 (গ্রাফ/চার্ট/ম্যাপ - ১৫০+ শব্দ):**
সবচেয়ে জরুরি হলো একটি চমৎকার **Overview** প্যারাগ্রাফ লেখা। এতে সামগ্রিক ট্রেন্ড (Highest, Lowest, Overall Increase/Decrease) তুলে ধরতে হবে, কোনো ব্যক্তিগত মতামত দেওয়া যাবে না।

৩. **লেক্সিক্যাল রিসোর্স ও লিঙ্কিং ওয়ার্ডস:**
'However', 'Furthermore', 'Consequently', 'In stark contrast' এর মতো ফর্মাল কানেক্টর ব্যবহার করুন।`,
        suggestions: [
          'Task 2 এর জন্য Band 8 ভোকাবুলারি দিন',
          'Task 1 এর Overview লেখার নিয়ম কি?',
          'AI Rewriter টুল দিয়ে লেখা চেক করুন'
        ]
      };
    } else {
      return {
        reply: `Proven blueprint to score Band 7.5+ in IELTS Writing:

1. **Task 2 (4-Paragraph Framework • 250+ Words):**
• **Paragraph 1 (Intro):** Paraphrase prompt + explicit thesis statement stating your position clearly.
• **Paragraph 2 (Body 1):** Main point 1 -> In-depth reasoning -> Concrete example -> Impact/implication.
• **Paragraph 3 (Body 2):** Main point 2 or counter-perspective -> Elaboration -> Evidence.
• **Paragraph 4 (Conclusion):** Re-affirm thesis with fresh lexical collocations.

2. **Task 1 Report (150+ Words):**
The overview is crucial! Summarize 2–3 overarching macro-trends without listing every single data number.

3. **The 4 Band Descriptors:**
• Task Achievement / Response (25%)
• Coherence & Cohesion (25%)
• Lexical Resource (25%)
• Grammatical Range & Accuracy (25%)`,
        suggestions: [
          'Give me Band 8.5 linking transitions',
          'How to write a complex sentence?',
          'Open AI Writing Evaluator'
        ]
      };
    }
  }

  // 5. SPEAKING TIPS / স্পিকিং
  if (
    lower.includes('স্পিকিং') ||
    lower.includes('speaking') ||
    lower.includes('cue card') ||
    lower.includes('কিউ কার্ড') ||
    lower.includes('নার্ভাস') ||
    lower.includes('fluency') ||
    lower.includes('ফ্লুয়েন্সি')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস স্পিকিং টেস্টে আত্মবিশ্বাস ও ফ্লুয়েন্সি ধরে রাখার উপায়:

১. **Part 1 (Introduction & Interview):**
পরিচিত টপিক নিয়ে প্রশ্ন করা হয় (বাড়ি, পড়াশোনা, শখ)। উত্তর খুব ছোট (এক শব্দে) দিবেন না, আবার অনেক বড় করবেন না। ২-৩ বাক্যে স্বাভাবিকভাবে উত্তর শেষ করুন।

২. **Part 2 (Cue Card - ২ মিনিট একটানা কথা বলা):**
১ মিনিট নোট নেওয়ার সময় পাবেন। সেখানে পুরো বাক্য না লিখে বুলেট পয়েন্টে কী-ওয়ার্ড লিখুন (Who, When, Where, Why)। ২ মিনিট শেষ না হওয়া পর্যন্ত এক্সামিনার না থামালে কথা বলতে থাকুন।

৩. **Part 3 (Analytical Discussion):**
এখানে বিমূর্ত (Abstract) ও সামাজিক প্রশ্ন করা হয়। 'I think' এর বদলে 'From my perspective', 'It is widely acknowledged that' জাতীয় এক্সপ্রেশন ব্যবহার করুন এবং কারণ ব্যাখ্যা করুন।

৪. **ভুল হলে নার্ভাস হবেন না:**
গ্রামারে ভুল হলে নিজেকে শান্ত রেখে সংশোধন করে স্বাভাবিক গতিতে কথা চালিয়ে যান। ফ্লুয়েন্সি ও স্পষ্ট উচ্চারণ সবচেয়ে বেশি গুরুত্ব পায়।`,
        suggestions: [
          'Part 2 Cue Card এর ১ মিনিট নোট নেওয়ার কৌশল',
          'Speaking এ ব্যান্ডের মাপকাঠি কি?',
          'AI Speaking Partner চালু করুন'
        ]
      };
    } else {
      return {
        reply: `Proven methods to score high in IELTS Speaking:

1. **Part 1 (Direct & Natural):**
Aim for 2 to 3 sentences per response. Answer directly, supply a brief rationale or example, then conclude naturally without over-talking.

2. **Part 2 (The 2-Minute Monologue):**
During your 1-minute prep, write down trigger keywords across 4 aspects: Who, What, When, and Why it was significant. Keep speaking until the examiner stops you.

3. **Part 3 (Abstract Exploration):**
Shift from personal anecdotes to societal perspectives. Employ formal framing devices like: *"From a broader societal standpoint...", "One prevailing school of thought suggests..."*

4. **Fluency Over Perfection:**
Do not pause unnaturally to search for obscure vocabulary. Natural flow, accurate intonation, and self-correction carry substantial weight.`,
        suggestions: [
          'Practice with AI Speaking Partner',
          'Common Cue Card topics for 2026',
          'How to avoid "umm" and filler sounds'
        ]
      };
    }
  }

  // 6. SCORE CALCULATION / ব্যান্ড স্কোর
  if (
    lower.includes('স্কোর') ||
    lower.includes('score') ||
    lower.includes('band') ||
    lower.includes('ব্যান্ড') ||
    lower.includes('হিসাব') ||
    lower.includes('মার্ক') ||
    lower.includes('মার্reset')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস লিসেনিং ও রিডিং-এ ৪০ নম্বরের ব্যান্ড স্কোর স্কেল:

• **Band 9.0:** ৩৯–৪০ সঠিক উত্তর
• **Band 8.5:** ৩৭–৩৮ সঠিক উত্তর
• **Band 8.0:** ৩৫–৩৬ সঠিক উত্তর
• **Band 7.5:** ৩৩–৩৪ সঠিক উত্তর
• **Band 7.0:** ৩০–৩২ সঠিক উত্তর (অধিকাংশ বিশ্ববিদ্যালয়ের রিকোয়ারমেন্ট)
• **Band 6.5:** ২৬–২৯ সঠিক উত্তর
• **Band 6.0:** ২৩–২৫ সঠিক উত্তর
• **Band 5.5:** ১৮–২২ সঠিক উত্তর

সামগ্রিক ওভারঅল ব্যান্ড স্কোর (Overall Band) হলো ৪টি মডিউলের স্কোরের গড় (Average), যা নিকটস্থ ০.৫ বা ১.০ তে রাউন্ড করা হয়।`,
        suggestions: [
          'ক্যামব্রিজ মক টেস্ট দিয়ে নিজের স্কোর জানুন',
          'Band 7.0 পেতে প্রতিদিন কত ঘণ্টা পড়ব?'
        ]
      };
    } else {
      return {
        reply: `Official Cambridge Band Score Conversion Scale (out of 40 raw marks):

• **Band 9.0:** 39–40 correct
• **Band 8.5:** 37–38 correct
• **Band 8.0:** 35–36 correct
• **Band 7.5:** 33–34 correct
• **Band 7.0:** 30–32 correct
• **Band 6.5:** 26–29 correct
• **Band 6.0:** 23–25 correct
• **Band 5.5:** 18–22 correct

Your Overall Band Score is the arithmetic average of all 4 components, rounded to the nearest half or whole band.`,
        suggestions: [
          'Calculate my target score',
          'Take a full diagnostic mock test'
        ]
      };
    }
  }

  // 7. CAMBRIDGE BOOKS / ক্যামব্রিজ বই
  if (
    lower.includes('ক্যামব্রিজ') ||
    lower.includes('কেমব্রিজ') ||
    lower.includes('cambridge') ||
    lower.includes('বই') ||
    lower.includes('book')
  ) {
    if (hasBengali) {
      return {
        reply: `ক্যামব্রিজ আইএলটিএস বই (১ থেকে ১৯) সম্পর্কে দরকারি তথ্য:

• **লেটেস্ট বইগুলো আগে পড়ুন:**
ক্যামব্রিজ ১৬, ১৭, ১৮ এবং ১৯ নম্বর বইগুলোতে সবচেয়ে আধুনিক প্রশ্নপদ্ধতি এবং রিয়েল পরীক্ষার প্যাটার্ন দেওয়া আছে। প্রস্তুতি শুরুর জন্য এগুলো সেরা।

• **আমাদের অ্যাপ্লিকেশনে সুবিধা:**
আমাদের **Cambridge Books** পেজে (বুক ১-১৯) প্রতিটি টেস্টের অফিসিয়াল ব্রিটিশ ও অস্ট্রেলিয়ান অ্যাকসেন্টের অডিও এবং রিডিং প্যাসেজ সংযুক্ত করা আছে।

• **মক টেস্টের জন্য আলাদা হাব:**
ক্যামব্রিজের পাশাপাশি পরিবর্তনশীল আনকমন টেস্ট দেওয়ার জন্য সাইডবারের **Full Mock Test** হাব ব্যবহার করতে পারেন।`,
        suggestions: [
          'ক্যামব্রিজ বইয়ের লাইব্রেরি ওপেন করুন',
          'বুক ১৮ লিসেনিং টেস্ট ১ দিন'
        ]
      };
    } else {
      return {
        reply: `Guide to Official Cambridge IELTS Practice Books (1 to 19):

• **Prioritize Books 16, 17, 18, and 19:**
These recent editions reflect the contemporary Computer-Delivered format, modern note-completion parameters, and current passage difficulty.

• **Available in PrepIELTS:**
Navigate to the **Cambridge Books** tab to access Books 1 through 19 with native British/Australian audio tracks and interactive timing tools.`,
        suggestions: [
          'Open Cambridge Books Library',
          'Start Cambridge 18 Practice Test'
        ]
      };
    }
  }

  // 8. VOCABULARY & GRAMMAR / ভোকাবুলারি ও গ্রামার
  if (
    lower.includes('ভোকাব') ||
    lower.includes('vocab') ||
    lower.includes('synonym') ||
    lower.includes('গ্রামার') ||
    lower.includes('grammar') ||
    lower.includes('শব্দ') ||
    lower.includes('word')
  ) {
    if (hasBengali) {
      return {
        reply: `আইএলটিএস পরীক্ষায় উচ্চ ব্যান্ড অর্জনে উপযোগী কিছু চমৎকার অ্যাকাডেমিক অল্টারনেটিভ:

• "Important" না বলে লিখুন: **pivotal, paramount, crucial, imperative**
• "Problem" না বলে লিখুন: **predicament, dilemma, impediment, challenge**
• "Increase" না বলে লিখুন: **escalate, surge, proliferate, soar**
• "Decrease" না বলে লিখুন: **plummet, dwindle, diminish, decline**
• "Because of" না বলে লিখুন: **owing to, attributable to, on account of**

গ্রামারের জন্য **Complex & Compound Sentences** (Although, Despite, Whereas, Furthermore) বেশি ব্যবহার করুন।`,
        suggestions: [
          'Academic Vocabulary লিস্ট দেখুন',
          'AI Rewriter টুল ব্যবহার করুন'
        ]
      };
    } else {
      return {
        reply: `High-impact Band 8.5 Academic Collocations and Replacements:

• Instead of "Important": **pivotal, paramount, of significant consequence, imperative**
• Instead of "Problem / Difficulty": **predicament, pressing dilemma, structural impediment**
• Instead of "Increase rapidly": **witness an exponential surge, proliferate markedly**
• Instead of "Decrease": **experience a sharp decline, plummet, dwindle**
• Instead of "Because of": **attributable to, owing to, stems predominantly from**

Integrate these lexical assets inside Task 2 body paragraphs for elevated Lexical Resource scores!`,
        suggestions: [
          'Explore Vocabulary Builder',
          'Sentence Rewriter with AI'
        ]
      };
    }
  }

  // 9. DYNAMIC CONTEXTUAL FALLBACK (Handles any other custom question without canned templates)
  if (hasBengali) {
    return {
      reply: `আপনার প্রশ্ন: "${query}"

আইএলটিএস মেন্টর হিসেবে আপনার এই বিষয়টি অত্যন্ত সময়োপযোগী। আপনি যদি কোনো নির্দিষ্ট টেস্ট, ক্যামব্রিজের কোনো প্রশ্ন বা স্পিকিং/রাইটিংয়ের কোনো বিষয় নিয়ে জানতে চান, দয়া করে আরও বিস্তারিত লিখুন।

সাধারণভাবে আইএলটিএস-এ ভালো করতে হলে:
১. প্রতিদিন অন্তত ১ ঘণ্টা ক্যামব্রিজের আসল অডিও শুনে শুনে টাইপ করার অভ্যাস করুন।
২. রিডিং প্যাসেজ পড়ার সময় কি-ওয়ার্ডের সিনোনিম খাতায় নোট রাখুন।
৩. রাইটিং ও স্পিকিংয়ে কমন শব্দের বদলে অ্যাকাডেমিক কলোকেশন ব্যবহার করুন।

আপনি কি এই বিষয়ে কোনো নির্দিষ্ট মক টেস্ট বা স্টাডি প্ল্যান দেখতে চান?`,
      suggestions: [
        'আমি কিভাবে শুরু করব জার্নি',
        'লিসেনিং এ ভালো করার উপায় কি?',
        'রিডিং এ সময় বাঁঁচানোর কৌশল',
        'একটি ফুল মক টেস্ট শুরু করুন'
      ]
    };
  } else {
    return {
      reply: `Regarding your query: "${query}"

As your IELTS AI Mentor, I am dedicated to addressing your preparation needs. Whether you need an explanation of a tricky Cambridge Reading passage, scoring rubric clarification, or advice on overcoming test anxiety, feel free to give me more specifics!

In the meantime, consider these two instant actionable steps:
1. Practice real Computer-Delivered note typing in our **CD-IELTS Listening** module.
2. Complete a timed section in the **Full Mock Test Hub** to gauge your current performance.

What specific area would you like to explore next?`,
      suggestions: [
        'How should I structure my preparation?',
        'Tips for IELTS Listening Section 1',
        'Academic Reading Passage 3 strategies',
        'Band 8 Task 2 essay templates'
      ]
    };
  }
}
