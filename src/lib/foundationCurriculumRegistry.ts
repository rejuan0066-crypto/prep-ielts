export interface PracticeExercise {
  id: number;
  type: 'mcq' | 'fill-typing' | 'error-fix';
  instruction: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface FoundationLesson {
  id: string;
  level: number;
  levelTitle: string;
  levelSubtitle: string;
  title: string;
  bengaliTitle: string;
  badge: string;
  estimatedMinutes: number;
  contextStory: string;
  conceptBreakdown: string[];
  formula: string;
  examples: {
    en: string;
    bn: string;
    context?: string;
  }[];
  commonMistakes: {
    wrong: string;
    correct: string;
    reason: string;
  }[];
  exercises: PracticeExercise[];
}

export const FOUNDATION_CURRICULUM: FoundationLesson[] = [
  {
    "id": "l1-parts-of-speech",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Parts of Speech & Core Sentence Structure",
    "bengaliTitle": "শব্দশ্রেণী ও বেসিক বাক্য গঠন (Subject + Verb + Object)",
    "badge": "Foundation Essential",
    "estimatedMinutes": 20,
    "contextStory": "কল্পনা করুন আপনি একটি বাড়ি তৈরি করছেন। ইট, বালু, সিমেন্ট এবং রড ছাড়া যেমন বাড়ি হয় না, তেমনি একটি ইংরেজি বাক্য তৈরির জন্য Noun, Verb এবং Adjective হলো মূল উপাদান। বাংলায় আমরা কখনো কখনো Verb ছাড়া বাক্য বলি (যেমন: \"তিনি একজন ডাক্তার\"), কিন্তু ইংরেজিতে একটি পূর্ণাঙ্গ Verb ছাড়া বাক্য তৈরি করা অসম্ভব!",
    "conceptBreakdown": [
      "Noun (বিশেষ্য): ব্যক্তি, স্থান, বস্তু বা ধারণার নাম (e.g. Dhaka, teacher, oxygen, honesty)।",
      "Pronoun (সর্বনাম): Noun-এর পুনরাবৃত্তি এড়াতে ব্যবহৃত শব্দ (e.g. he, she, it, they, which)।",
      "Verb (ক্রিয়াপদ): বাক্যের ইঞ্জিন—যেকোনো কাজ বা অবস্থা নির্দেশ করে (e.g. analyze, construct, is, become)। ইংরেজি বাক্য Verb ছাড়া গঠিত হতে পারে না।",
      "Adjective (নাম-বিশেষণ): Noun বা Pronoun-এর গুণ, অবস্থা বা সংখ্যা প্রকাশ করে (e.g. significant, rapid, sustainable)।",
      "Adverb (ভাব-বিশেষণ): Verb, Adjective বা অন্য Adverb-কে বিশেষায়িত করে (e.g. rapidly, remarkably, very)।",
      "Preposition (পদান্বয়ী অব্যয়): Noun/Pronoun-এর পূর্বে বসে স্থান, সময় বা দিক নির্দেশ করে (e.g. in, on, at, through, under)।",
      "Conjunction (সংযোজক অব্যয়): শব্দ বা ক্লজকে সংযুক্ত করে (e.g. and, but, although, because, whereas)।",
      "বাক্যের মৌলিক গঠন (SVO): Subject (কে করে) + Verb (কী করে) + Object/Complement (কাকে বা কী করে)।"
    ],
    "formula": "Subject + Verb + Object/Complement (e.g. \"Scientists analyze statistical data.\")",
    "examples": [
      {
        "en": "Careful researchers frequently verify their statistical findings before publication.",
        "bn": "সতর্ক গবেষকেরা প্রকাশের আগে ঘন ঘন তাদের পরিসংখ্যানগত ফলাফল যাচাই করেন।",
        "context": "Adjective (Careful) + Noun (researchers) + Adverb (frequently) + Verb (verify)।"
      },
      {
        "en": "The development of clean energy requires substantial government investment.",
        "bn": "পরিচ্ছন্ন শক্তির বিকাশে সরকারের বিপুল বিনিয়োগ প্রয়োজন।",
        "context": "Noun (development) + Preposition (of) + Verb (requires) + Adjective (substantial)।"
      },
      {
        "en": "Technology improves healthcare, but access remains unequal across societies.",
        "bn": "প্রযুক্তি স্বাস্থ্যসেবাকে উন্নত করে, কিন্তু বিভিন্ন সমাজে এর প্রাপ্যতা অসমান থেকে যায়।",
        "context": "Conjunction (but) দ্বারা দুটি স্বাধীন ক্লজ সংযুক্ত হয়েছে।"
      },
      {
        "en": "She explained the complex methodology remarkably clearly to the audience.",
        "bn": "তিনি শ্রোতাদের কাছে জটিল পদ্ধতিটি আশ্চর্যজনকভাবে স্পষ্টভাবে ব্যাখ্যা করেছিলেন।",
        "context": "Adverb (remarkably) আরেকটি Adverb (clearly)-কে জোরদার করেছে।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "He is a very intelligence person.",
        "correct": "He is a very intelligent person.",
        "reason": "Person (Noun)-এর আগে Adjective (intelligent) বসবে, Noun (intelligence) নয়।"
      },
      {
        "wrong": "The climate changed extreme quickly.",
        "correct": "The climate changed extremely quickly.",
        "reason": "Quickly (Adverb)-কে বিশেষায়িত করতে Adverb (extremely) ব্যবহার করতে হবে।"
      },
      {
        "wrong": "She works hard and success in her career.",
        "correct": "She works hard and succeeds in her career.",
        "reason": "And-এর উভয় পাশে একই পার্টস অফ স্পিচ হবে; works (verb)-এর সাথে succeeds (verb) হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়মানুযায়ী বাক্যে বোল্ড করা শব্দটি কোন Parts of Speech?",
        "question": "Technological innovations have \"significantly\" transformed modern workplace efficiency.",
        "options": [
          "A. Adjective",
          "B. Adverb",
          "C. Noun",
          "D. Preposition"
        ],
        "correctAnswer": "B. Adverb",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: যে পদ Verb (transformed)-এর কাজ কীভাবে ঘটেছে তা ব্যাখ্যা করে, তা Adverb। \"Significantly\" এখানে Adverb।",
        "hint": "ক্রিয়া কীভাবে ঘটল তা Adverb নির্দেশ করে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের SVO নিয়ম অনুযায়ী শূন্যস্থানে \"accurate\" শব্দটির Adverb রূপ টাইপ করুন:",
        "question": "The laboratory technician calibrated the sensor [input] before commencing the test.",
        "correctAnswer": "accurately",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Calibrated (verb)-কে বিশেষায়িত করতে \"accurate\"-এর Adverb রূপ \"accurately\" আবশ্যক।",
        "hint": "Adjective-এর সাথে -ly যোগ করে Adverb গঠন করুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ ও ৪ অনুযায়ী সঠিক পদ নির্বাচন করুন:",
        "question": "Economic stability provides individuals with the _______ to pursue higher education.",
        "options": [
          "A. freely",
          "B. freedom",
          "C. free",
          "D. freeing"
        ],
        "correctAnswer": "B. freedom",
        "explanation": "লেসনের ব্যাখ্যা অনুযায়ী: \"The\"-এর পরে Noun (freedom) বসবে, যা ব্যক্তির অধিকার নির্দেশ করে।",
        "hint": "Article \"the\"-এর পর Noun রূপ বসে।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "Common Mistakes টেবিলের নিয়ম অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "Solar power is an \"extreme\" clean alternative to traditional fossil fuels.",
        "options": [
          "A. power",
          "B. extreme",
          "C. alternative",
          "D. traditional"
        ],
        "correctAnswer": "B. extreme",
        "explanation": "লেসনের সাধারণ ভুল টেবিল অনুযায়ী: Clean (Adjective)-এর আগে Adverb রূপ \"extremely\" বসবে, Adjective \"extreme\" নয়।",
        "hint": "Adjective-কে বিশেষায়িত করতে Adverb রূপ লাগে।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"rely\" শব্দটির সঠিক Noun রূপ টাইপ করুন:",
        "question": "The economy must reduce its (rely) [input] on non-renewable petroleum imports.",
        "correctAnswer": "reliance",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Possessive pronoun \"its\"-এর পরে Noun রূপ \"reliance\" বসবে।",
        "hint": "Rely-এর Noun রূপ হলো reliance।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের Preposition (পদান্বয়ী অব্যয়) সংক্রান্ত নিয়ম অনুযায়ী সঠিক শব্দটি চিহ্নিত করুন:",
        "question": "The university inaugurated a modern facility solely dedicated _______ renewable energy research.",
        "options": [
          "A. with",
          "B. to",
          "C. on",
          "D. for"
        ],
        "correctAnswer": "B. to",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Dedicated'-এর পরে সর্বদা Preposition 'to' বসে (dedicated to something)।",
        "hint": "Dedicated-এর নির্দিষ্ট Preposition হলো to।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের Conjunction নিয়ম অনুযায়ী শূন্যস্থানে উপযুক্ত বিপরীতমুখী সংযোজক অব্যয় টাইপ করুন:",
        "question": "The initial investment was substantial, [input] the long-term profits exceeded all expectations.",
        "correctAnswer": "but",
        "explanation": "লেসনের নিয়ম ৭ অনুযায়ী: দুটি বিপরীতমুখী ক্লজকে সংযুক্ত করতে Conjunction 'but' অথবা 'yet' ব্যবহৃত হয়।",
        "hint": "কিন্তু বা বিপরীত ভাব প্রকাশ করতে but লিখুন।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের SVO বাক্য গঠনের নিয়ম অনুযায়ী কোন বাক্যটি ব্যাকরণগতভাবে সঠিক?",
        "question": "Choose the sentence that preserves the accurate Subject + Verb + Object sequence:",
        "options": [
          "A. Published yesterday the professor his findings.",
          "B. The professor his findings published yesterday.",
          "C. The professor published his findings yesterday.",
          "D. Yesterday published the professor findings his."
        ],
        "correctAnswer": "C. The professor published his findings yesterday.",
        "explanation": "লেসনের মূল সূত্র অনুযায়ী: Subject (The professor) + Verb (published) + Object (his findings) + Adverb of time (yesterday)।",
        "hint": "Subject + Verb + Object ক্রম অনুসরণ করুন।"
      }
    ]
  },
  {
    "id": "l1-nouns-countability",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Countable vs Uncountable Nouns & Articles (a, an, the)",
    "bengaliTitle": "কাউন্টেবল ও আনকাউন্টেবল নাউন এবং আর্টিকেলের সঠিক ব্যবহার",
    "badge": "IELTS Accuracy Essential",
    "estimatedMinutes": 20,
    "contextStory": "আইএলটিএস পরীক্ষায় পরীক্ষার্থীরা সবচেয়ে বেশি যে ভুলটি করে তা হলো Noun-এর সংখ্যাগত রূপ। যেমন অনেকেই লেখেন: \"I need an advice\" বা \"Scientists conducted many researches।\" কিন্তু advice এবং research উভয়ই অগণনযোগ্য (Uncountable)। অগণনযোগ্য শব্দের পূর্বে কখনো a/an বসে না এবং এদের বহুবচন (-s/-es) হয় না!",
    "conceptBreakdown": [
      "Countable Nouns (গণনযোগ্য): যা একটি একটি করে গণনা করা যায় (e.g. a student, five students; a report, three reports)।",
      "Uncountable Nouns (অগণনযোগ্য): যা এককভাবে গণনা করা যায় না (e.g. information, advice, equipment, research, traffic, luggage, furniture, pollution)।",
      "অগণনযোগ্য নাউনের বিশেষ নিয়ম: এদের সাথে কখনো a/an বসে না এবং কখনো s/es যোগ করা যায় না। একক বোঝাতে \"a piece of advice\" বা \"a piece of equipment\" বলতে হয়।",
      "Quantifiers নিয়ম: Countable-এর সাথে many, few, fewer, several বসে। Uncountable-এর সাথে much, little, less, an amount of বসে।",
      "Articles (a, an, the): নির্দিষ্ট করে বোঝাতে \"the\" বসে। অনির্দিষ্ট একক গণনাযোগ্য হলে \"a/an\" বসে। সামগ্রিক অর্থে অগণনযোগ্য বা বহুবচন নাউনের আগে Article বসে না (Zero Article)।"
    ],
    "formula": "Countable: many/fewer + Plural Noun | Uncountable: much/less + Singular Uncountable Noun",
    "examples": [
      {
        "en": "The professor provided invaluable advice regarding academic research methods.",
        "bn": "অধ্যাপক অ্যাকাডেমিক গবেষণা পদ্ধতি সম্পর্কে অমূল্য পরামর্শ দিয়েছিলেন।",
        "context": "\"Advice\" এবং \"Research\" দুটোই uncountable, তাই কোনো s যোগ করা হয়নি।"
      },
      {
        "en": "Modern universities allocate substantial amounts of equipment to scientific labs.",
        "bn": "আধুনিক বিশ্ববিদ্যালয়গুলো বৈজ্ঞানিক গবেষণাগারে প্রচুর পরিমাণে যন্ত্রপাতি বরাদ্দ করে।",
        "context": "\"Equipment\" অগণনযোগ্য, তাই \"amounts of equipment\" সঠিক।"
      },
      {
        "en": "Fewer students chose engineering this year, resulting in less competition.",
        "bn": "এই বছর কম শিক্ষার্থী ইঞ্জিনিয়ারিং বেছে নিয়েছিল, যার ফলে কম প্রতিযোগিতা হয়েছিল।",
        "context": "Students (countable) এর সাথে \"fewer\", Competition (uncountable) এর সাথে \"less\"।"
      },
      {
        "en": "Clean water is an essential human right throughout the world.",
        "bn": "সারা বিশ্বে বিশুদ্ধ পানি একটি অপরিহার্য মানবাধিকার।",
        "context": "Water সাধারণ অর্থে uncountable হওয়ায় এর পূর্বে article বসেনি।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The scientists conducted many researches.",
        "correct": "The scientists conducted much research. (or: many research studies)",
        "reason": "Research অগণনযোগ্য; এর সাথে s বা many বসে না।"
      },
      {
        "wrong": "I received many useful advices.",
        "correct": "I received much useful advice. (or: many pieces of advice)",
        "reason": "Advice অগণনযোগ্য, বহুবচন করতে হলে pieces of advice বলতে হবে।"
      },
      {
        "wrong": "The city has less cars than before.",
        "correct": "The city has fewer cars than before.",
        "reason": "Cars গণনাযোগ্য, তাই \"less\"-এর জায়গায় \"fewer\" হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Quantifier নিয়ম অনুযায়ী সঠিক বিকল্পটি নির্বাচন করুন:",
        "question": "Urban areas generate _______ traffic congestion during morning peak hours.",
        "options": [
          "A. many",
          "B. much",
          "C. a few",
          "D. several"
        ],
        "correctAnswer": "B. much",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Traffic congestion অগণনযোগ্য (uncountable), তাই এর সাথে \"much\" বসে।",
        "hint": "Traffic একটি অগণনযোগ্য নাউন।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "Countable Plural \"vehicles\"-এর সাথে কম বোঝাতে (less/fewer) সঠিক শব্দটি টাইপ করুন:",
        "question": "There were [input] private vehicles on the highway after the transit fare reduction.",
        "correctAnswer": "fewer",
        "explanation": "লেসনের সূত্র অনুযায়ী: Vehicles গণনাযোগ্য বহুবচন, তাই কম বোঝাতে \"fewer\" ব্যবহৃত হয়।",
        "hint": "গণনাযোগ্য বহুবচনে less নয়, fewer বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ অনুযায়ী নিচের কোন বাক্যটি ব্যাকরণগতভাবে নির্ভুল?",
        "question": "Choose the grammatically accurate sentence regarding Uncountable Nouns:",
        "options": [
          "A. He gave me an important information about the exam.",
          "B. He gave me an important piece of information about the exam.",
          "C. He gave me many important informations about the exam.",
          "D. He gave me few information about the exam."
        ],
        "correctAnswer": "B. He gave me an important piece of information about the exam.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Information অগণনযোগ্য, তাই এর একক প্রকাশ করতে \"a piece of information\" ব্যবহার করতে হবে।",
        "hint": "Information-এর সাথে s হয় না এবং an information বলা যায় না।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "লেসনের Article নিয়ম অনুযায়ী সঠিক অপশন বাছাই করুন:",
        "question": "The committee agreed that _______ education plays a fundamental role in societal advancement.",
        "options": [
          "A. an",
          "B. the",
          "C. No Article (Zero Article)",
          "D. a"
        ],
        "correctAnswer": "C. No Article (Zero Article)",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: Education যখন সামগ্রিক ও সাধারণ ধারণায় ব্যবহৃত হয়, তখন এর আগে কোনো Article বসে না।",
        "hint": "সাধারণ ধারণায় অ্যাবস্ট্রাক্ট নাউনে Article বসে না।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "ভুল বাক্যটি সংশোধন করুন: \"The lab bought five new equipments.\" (সঠিক শব্দটি লিখুন):",
        "question": "The lab purchased five new pieces of [input].",
        "correctAnswer": "equipment",
        "explanation": "লেসনের নিয়ম ২ ও ৩ অনুযায়ী: Equipment অগণনযোগ্য, এর সাথে কখনো -s যোগ হয় না।",
        "hint": "Equipment শব্দে কোনো s যুক্ত হবে না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "লেসনের অনিয়মিত বহুবচন (Irregular Plural) নিয়ম অনুযায়ী 'phenomenon' শব্দটির বহুবচন রূপ লিখুন:",
        "question": "Scientists observed several unprecedented meteorological [input] during the winter storm.",
        "correctAnswer": "phenomena",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: 'Phenomenon' একটি গ্রিক উৎসের Noun, যার Plural রূপ 'phenomena'।",
        "hint": "-on পরিবর্তন হয়ে -a হয় (phenomena)।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের সর্বদা Plural Noun সংক্রান্ত নিয়ম অনুযায়ী সঠিক ভার্ব নির্বাচন করুন:",
        "question": "The laboratory scissors _______ sterilised prior to the microbiological experiment.",
        "options": [
          "A. was",
          "B. were",
          "C. is",
          "D. has been"
        ],
        "correctAnswer": "B. were",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Scissors, trousers, glasses সর্বদা Plural এবং Plural Verb (were) গ্রহণ করে।",
        "hint": "Scissors দুটি অংশের বস্তু, তাই বহুবচন ভার্ব হবে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "লেসনের Partitive পরিমাপক নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (একটি পরামর্শ):",
        "question": "The consultant provided a valuable piece of [input] regarding risk management.",
        "correctAnswer": "advice",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Advice হলো Uncountable Noun; একক বোঝাতে 'a piece of advice' ব্যবহৃত হয়।",
        "hint": "উপদেশ অর্থে advice শব্দটি লিখুন।"
      }
    ]
  },
  {
    "id": "l1-pronoun-accuracy",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Pronoun Accuracy & Academic Referencing",
    "bengaliTitle": "সর্বনামের সঠিক ব্যবহার ও একাডেমিক রেফারেন্সিং",
    "badge": "Cohesion & Precision",
    "estimatedMinutes": 20,
    "contextStory": "আইএলটিএস রাইটিংয়ে কোহিশন (Cohesion) অত্যন্ত গুরুত্বপূর্ণ। একই Noun বারবার ব্যবহার করলে লেখার সৌন্দর্য নষ্ট হয়। সর্বনাম দিয়ে পূর্ববর্তী কথাকে সংক্ষেপে সুন্দরভাবে প্রকাশ করাই হলো Referencing। কিন্তু সর্বনামের কেস (Subjective vs Objective) ও স্বত্বাধিকার (It's vs Its) গুলিয়ে ফেলা একটি সাধারণ সমস্যা।",
    "conceptBreakdown": [
      "Subjective Pronouns (I, you, he, she, it, we, they): ক্রিয়াপদের আগে বাক্যের কর্তা হিসেবে বসে।",
      "Objective Pronouns (me, you, him, her, it, us, them): ক্রিয়াপদ বা প্রেপোজিশনের পরে কর্ম হিসেবে বসে (e.g. between you and me)।",
      "Possessive Adjectives (my, your, his, her, its, our, their): এদের পরে অবশ্যই একটি Noun বসে (e.g. its economy)।",
      "It's বনাম Its এর পার্থক্য: It's = It is বা It has। আর Its = কোনো বস্তু বা প্রতিষ্ঠানের স্বত্বাধিকার/মালিকানা।",
      "Relative Pronouns: Who (ব্যক্তি কর্তা), Whom (ব্যক্তি কর্ম), Which (বস্তু), Whose (মালিকানা)।"
    ],
    "formula": "Subject Pronoun + Verb + Object Pronoun (e.g. \"They evaluated him carefully.\")",
    "examples": [
      {
        "en": "The organization expanded its humanitarian operations overseas.",
        "bn": "সংস্থাটি বিদেশে তার মানবিক কার্যক্রম প্রসারিত করেছিল।",
        "context": "Its (no apostrophe) মালিকানা নির্দেশ করছে।"
      },
      {
        "en": "Between you and me, the proposed budget lacks financial feasibility.",
        "bn": "আপনার এবং আমার মধ্যে বলতে গেলে, প্রস্তাবিত বাজেটে আর্থিক সম্ভাব্যতা নেই।",
        "context": "Preposition (between)-এর পর Objective Pronoun (me) সঠিক, \"I\" নয়।"
      },
      {
        "en": "Students who manage their study schedules systematically secure higher band scores.",
        "bn": "যে শিক্ষার্থীরা নিয়মতান্ত্রিকভাবে তাদের পড়ার রুটিন পরিচালনা করে তারা উচ্চ ব্যান্ড স্কোর অর্জন করে।",
        "context": "Who দিয়ে শিক্ষার্থীদের নির্দেশ করা হয়েছে।"
      },
      {
        "en": "Deforestation causes severe soil erosion; this issue requires prompt governmental action.",
        "bn": "বন উজাড় মারাত্মক ভূমিক্ষয় ঘটায়; এই বিষয়টি সরকারের দ্রুত পদক্ষেপ দাবি করে।",
        "context": "\"This issue\" দ্বারা পূর্ববর্তী ধারণাকে রেফার করা হয়েছে।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The committee submitted it's final recommendations.",
        "correct": "The committee submitted its final recommendations.",
        "reason": "It's মানে it is; মালিকানা বোঝাতে its ব্যবহৃত হয়।"
      },
      {
        "wrong": "Him and me conducted the laboratory experiments.",
        "correct": "He and I conducted the laboratory experiments.",
        "reason": "বাক্যের Subject হিসেবে Subjective Pronoun (He and I) বসবে।"
      },
      {
        "wrong": "Everyone must bring their own passport.",
        "correct": "Every candidate must bring his or her passport. (or: All candidates must bring their passports.)",
        "reason": "ফর্মাল একাডেমিক ইংরেজিতে Everyone একবচন, তাই বহুবচন দ্ব্যর্থতা এড়াতে All candidates ব্যবহার উত্তম।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের It's বনাম Its নিয়ম অনুযায়ী সঠিক বিকল্পটি নির্বাচন করুন:",
        "question": "The multinational enterprise relocated _______ headquarters to Singapore.",
        "options": [
          "A. it's",
          "B. its",
          "C. their",
          "D. theirs"
        ],
        "correctAnswer": "B. its",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Enterprise একবচন প্রতিষ্ঠান, তাই এর স্বত্বাধিকারী রূপ \"its\" (apostrophe ছাড়া)।",
        "hint": "মালিকানা বোঝাতে its বসে, it's নয়।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ২ (Preposition-এর পর Objective Pronoun) অনুযায়ী সঠিক সর্বনাম লিখুন (I / me):",
        "question": "The professor invited my colleague and [input] to present the research.",
        "correctAnswer": "me",
        "explanation": "লেসনের ব্যাখ্যা অনুযায়ী: Invited (verb)-এর Object হিসেবে \"me\" বসবে।",
        "hint": "Verb-এর অবজেক্ট হিসেবে me বসে, I নয়।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের Relative Pronoun নিয়ম অনুযায়ী সঠিক শব্দ বেছে নিন:",
        "question": "Candidates _______ native language is not English must demonstrate academic proficiency.",
        "options": [
          "A. who",
          "B. which",
          "C. whose",
          "D. whom"
        ],
        "correctAnswer": "C. whose",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"Whose native language\" মানে \"যাদের মাতৃভাষা\", যা মালিকানা বা অধিকার সম্পর্ক নির্দেশ করে।",
        "hint": "যার বা যাদের বোঝাতে whose বসে।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ অনুযায়ী বাক্যের ভুল অংশ চিহ্নিত করুন:",
        "question": "Neither the manager nor her assistants felt that \"them\" were adequately prepared.",
        "options": [
          "A. Neither",
          "B. nor",
          "C. them",
          "D. adequately"
        ],
        "correctAnswer": "C. them",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: \"That\" ক্লজের Subject হিসেবে Objective \"them\"-এর স্থলে Subjective \"they\" বসবে।",
        "hint": "ক্লজের সাবজেক্ট হিসেবে they বসবে।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "সঠিক Reflexive Pronoun পূরণ করুন: \"The students solved the dilemma by [input].\"",
        "question": "The students solved the dilemma by [input].",
        "correctAnswer": "themselves",
        "explanation": "The students (they)-এর reflexive রূপ হলো \"themselves\"।",
        "hint": "They-এর reflexive রূপ হলো themselves।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের Relative Pronoun নিয়ম অনুযায়ী সঠিক সর্বনাম নির্বাচন করুন:",
        "question": "The lead author, _______ groundbreaking paper won the award, accepted a chair at Oxford.",
        "options": [
          "A. who",
          "B. whom",
          "C. whose",
          "D. which"
        ],
        "correctAnswer": "C. whose",
        "explanation": "লেসনের নিয়ম অনুযায়ী: মালিকানা বা স্বত্ব বোঝাতে Possessive Relative Pronoun 'whose' ব্যবহৃত হয়।",
        "hint": "লেখকটির গবেষণাপত্র অর্থাৎ মালিকানা বোঝাতে whose বসে।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের Indefinite Pronoun নিয়ম অনুযায়ী সঠিক ভার্ব রূপ (is/are) টাইপ করুন:",
        "question": "Everyone participating in the international symposium [input] required to submit an abstract.",
        "correctAnswer": "is",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Everyone, everybody, someone সর্বদা ব্যাকরণগতভাবে Singular এবং Singular Verb (is) গ্রহণ করে।",
        "hint": "Everyone-এর সাথে singular verb (is) হবে।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের Reflexive Pronoun (আত্মবাচক সর্বনাম) সংক্রান্ত ভুলটি চিহ্নিত করুন:",
        "question": "Which sentence contains the grammatically incorrect use of a reflexive pronoun?",
        "options": [
          "A. The scientists conducted the experiments themselves.",
          "B. Myself and Dr. Adams compiled the survey data.",
          "C. The algorithm continuously adapts itself to user habits.",
          "D. She taught herself statistical data modeling."
        ],
        "correctAnswer": "B. Myself and Dr. Adams compiled the survey data.",
        "explanation": "লেসনের কমন মিসটেক অনুযায়ী: 'Myself' কখনো বাক্যের Subject হতে পারে না; সঠিক হবে 'Dr. Adams and I compiled'...",
        "hint": "Myself একা বা সাবজেক্ট হিসেবে বসে না।"
      }
    ]
  },
  {
    "id": "l1-adjectives-degrees",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Adjectives, Degrees of Comparison & Adjective Order",
    "bengaliTitle": "অ্যাডজেক্টিভ, তুলনামূলক রূপ (Positive, Comparative, Superlative) ও ধারাবাহিক ক্রম",
    "badge": "Word Descriptor",
    "estimatedMinutes": 20,
    "contextStory": "কল্পনা করুন আপনি দুটি ফোনের তুলনা করছেন। আপনি বলছেন: \"ফোন A ভালো, কিন্তু ফোন B আরও ভালো এবং ফোন C সবচেয়ে ভালো।\" ইংরেজিতে এই তুলনা প্রকাশ করাই হলো Degrees of Comparison (Good -> Better -> Best)। আবার যখন কোনো কিছুর একাধিক বৈশিষ্ট্য বর্ণনা করবেন (যেমন: আকার, বয়স, রঙ), তখন তাদের সাজানোর একটি আন্তর্জাতিক নিয়ম আছে: OSASCOMP (Opinion, Size, Age, Shape, Color, Origin, Material, Purpose)।",
    "conceptBreakdown": [
      "Positive Degree: সাধারণ গুণ বা বৈশিষ্ট্য (e.g. smart, tall, beautiful)। কোনো তুলনা ছাড়া বা as...as দিয়ে সমকক্ষ তুলনা (e.g. \"He is as tall as his brother\")।",
      "Comparative Degree: দুইয়ের মধ্যে তুলনা। সাধারণত -er যোগ হয় বা more বসে + than (e.g. taller than, more intelligent than)।",
      "Superlative Degree: অনেকের মধ্যে সবার চেয়ে সেরা বা নিকৃষ্ট। the + -est বা the most বসে (e.g. the tallest, the most prestigious)।",
      "ব্যতিক্রমী তুলনামূলক রূপ: Good -> Better -> Best; Bad -> Worse -> Worst; Little -> Less -> Least।",
      "Order of Adjectives (OSASCOMP): Opinion (lovely) -> Size (small) -> Age (old) -> Shape (round) -> Color (red) -> Origin (Italian) -> Material (wooden) -> Purpose (dining table)।"
    ],
    "formula": "Comparative: Adj + er + than / more + Adj + than | Superlative: the + Adj-est / the most + Adj",
    "examples": [
      {
        "en": "Electric vehicles are significantly quieter and more efficient than traditional combustion engines.",
        "bn": "বৈদ্যুতিক যানবাহন প্রথাগত জ্বালানি ইঞ্জিনের তুলনায় উল্লেখযোগ্যভাবে বেশি শান্ত এবং অধিক কার্যকর।",
        "context": "Comparative degree (more efficient than)।"
      },
      {
        "en": "The most formidable obstacle to deep space exploration remains cosmic radiation.",
        "bn": "মহাকাশ অভিযানের ক্ষেত্রে সবচেয়ে বড় বাধা হলো মহাজাগতিক বিকিরণ।",
        "context": "Superlative degree (the most formidable)।"
      },
      {
        "en": "She bought an elegant small antique French clock.",
        "bn": "তিনি একটি চমৎকার ছোট প্রাচীন ফরাসি ঘড়ি কিনেছিলেন।",
        "context": "OSASCOMP: Opinion (elegant) -> Size (small) -> Age (antique) -> Origin (French)।"
      },
      {
        "en": "Air quality in rural areas is far better than in industrial hubs.",
        "bn": "গ্রামীণ এলাকার বাতাসের মান শিল্পাঞ্চলের চেয়ে অনেক ভালো।",
        "context": "Irregular comparative \"better\"।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "This building is more taller than that one.",
        "correct": "This building is taller than that one. (or: much taller than that one)",
        "reason": "Double Comparative ভুল: tall-এর comparative রূপ taller, এর আগে \"more\" বসবে না।"
      },
      {
        "wrong": "He is the most smartest student in the class.",
        "correct": "He is the smartest student in the class.",
        "reason": "Double Superlative ভুল: smartest-এর আগে \"most\" বসে না।"
      },
      {
        "wrong": "The situation is getting more bad every day.",
        "correct": "The situation is getting worse every day.",
        "reason": "Bad-এর comparative রূপ \"worse\", \"more bad\" নয়।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ অনুযায়ী সঠিক Comparative Degree নির্বাচন করুন:",
        "question": "Renewable energy infrastructure is becoming _______ than fossil fuel alternatives in many regions.",
        "options": [
          "A. more cheaper",
          "B. cheaper",
          "C. most cheap",
          "D. as cheap"
        ],
        "correctAnswer": "B. cheaper",
        "explanation": "লেসনের নিয়ম ২ ও ভুল টেবিল অনুযায়ী: Cheap এক সিলেবলের শব্দ, তাই comparative রূপ \"cheaper\"। এর আগে \"more\" বসানো Double Comparative ভুল।",
        "hint": "এক সিলেবলের অ্যাডজেক্টিভে শুধু -er যুক্ত হয়।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ৩ অনুযায়ী \"critical\" শব্দটির Superlative রূপ লিখুন (the সহ):",
        "question": "Climate change represents (critical) [input] environmental hazard facing contemporary civilization.",
        "correctAnswer": "the most critical",
        "explanation": "লেসনের ব্যাখ্যা অনুযায়ী: Critical বহু-সিলেবল শব্দ, তাই এর superlative রূপ \"the most critical\"।",
        "hint": "বহু-সিলেবলের ক্ষেত্রে superlative করার জন্য \"the most\" ব্যবহার করুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের OSASCOMP নিয়ম অনুযায়ী স্বাভাবিক ক্রমের বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the sentence with correct adjective ordering:",
        "options": [
          "A. He purchased a leather black handsome jacket.",
          "B. He purchased a handsome black leather jacket.",
          "C. He purchased a black handsome leather jacket.",
          "D. He purchased a leather handsome black jacket."
        ],
        "correctAnswer": "B. He purchased a handsome black leather jacket.",
        "explanation": "লেসনের নিয়ম ৫ (OSASCOMP) অনুযায়ী: Opinion (handsome) -> Color (black) -> Material (leather)।",
        "hint": "মতামত আগে, তারপর রঙ, শেষে উপাদান।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ব্যতিক্রমী রূপ: ব্র্যাকেটের \"bad\" শব্দের সঠিক comparative রূপটি লিখুন:",
        "question": "The economic downturn proved far [input] (bad) than initial projections indicated.",
        "correctAnswer": "worse",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Bad-এর comparative রূপ হলো \"worse\"।",
        "hint": "Bad -> Worse -> Worst।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "Double Comparative/Superlative ভুল চিহ্নিত করুন:",
        "question": "Which of the following sentences contains a grammatical error?",
        "options": [
          "A. The current system is more superior than the old one.",
          "B. The current system is superior to the old one.",
          "C. The current system is much more efficient.",
          "D. The current system is the most reliable."
        ],
        "correctAnswer": "A. The current system is more superior than the old one.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Superior নিজেই তুলনামূলক অর্থ প্রকাশ করে, এর সাথে more বসে না এবং than-এর বদলে to বসে।",
        "hint": "Superior-এর আগে more বসে না।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের বিশেষণ বিন্যাস ক্রম (Order of Adjectives) অনুযায়ী সঠিক বাক্যটি বাছুন:",
        "question": "Select the sentence with the accurate standard adjective sequence:",
        "options": [
          "A. She bought a wooden rectangular antique dining table.",
          "B. She bought a lovely small antique rectangular wooden dining table.",
          "C. She bought a wooden antique small dining lovely table.",
          "D. She bought a dining wooden antique lovely table."
        ],
        "correctAnswer": "B. She bought a lovely small antique rectangular wooden dining table.",
        "explanation": "লেসনের নিয়ম অনুযায়ী ক্রম: Opinion (lovely) + Size (small) + Age (antique) + Shape (rectangular) + Material (wooden) + Purpose (dining)।",
        "hint": "OSASCOMP নিয়ম অনুসরণ করুন।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের -ed বনাম -ing বিশেষণ নিয়ম অনুযায়ী ব্র্যাকেটের শব্দটির সঠিক রূপ লিখুন:",
        "question": "The international trade conference concluded with several [input] (fascinate) keynote speeches.",
        "correctAnswer": "fascinating",
        "explanation": "লেসনের নিয়ম অনুযায়ী: যে বস্তু বা ঘটনা অনুভূতি সৃষ্টি করে তার সাথে -ing বসে (fascinating speeches)।",
        "hint": "Speeches অনুভূতি তৈরি করছে, তাই -ing যোগ করুন।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের ল্যাটিন তুলনামূলক বিশেষণ (Latin Comparatives) নিয়ম অনুযায়ী সঠিক প্রিপজিশন বাছুন:",
        "question": "The original experimental prototype proved vastly superior _______ the commercially available rival.",
        "options": [
          "A. than",
          "B. to",
          "C. over",
          "D. from"
        ],
        "correctAnswer": "B. to",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Superior, inferior, senior, junior-এর পরে 'than' বসে না, Preposition 'to' বসে।",
        "hint": "Superior-এর পর to বসে।"
      }
    ]
  },
  {
    "id": "l1-adverbs-placement",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Adverbs & Adverb Placement in Sentences",
    "bengaliTitle": "অ্যাডভার্ব বা ভাববিশেষণ ও বাক্যে তাদের সঠিক স্থান নির্ধারণ",
    "badge": "Modifier Precision",
    "estimatedMinutes": 20,
    "contextStory": "Adverb হলো বাক্যের গতিপথ নির্দেশক জিপিএস। এটি বলে দেয় কাজটি কীভাবে (Manner), কোথায় (Place), কখন (Time), কত ঘন ঘন (Frequency) বা কতটুকু মাত্রায় (Degree) হচ্ছে। যেমন: \"She walks quickly\" (Manner), \"He lives abroad\" (Place), \"I saw him yesterday\" (Time)। অ্যাডভার্বকে বাক্যের ভুল জায়গায় বসালে পুরো বাক্যের অর্থ বিকৃত হতে পারে!",
    "conceptBreakdown": [
      "Adverb of Manner: কাজ কীভাবে ঘটে (e.g. fluently, precisely, carefully)। সাধারণত বাক্যের শেষে বা কর্মের পরে বসে।",
      "Adverb of Frequency: কাজটি কত ঘন ঘন হয় (e.g. always, usually, often, rarely, never)। এগুলি সাধারণত Main Verb-এর আগে কিন্তু Auxiliary Verb (be, have)-এর পরে বসে (e.g. \"He always arrives on time\", \"She is never late\")।",
      "Adverbs of Degree / Intensifiers: মাত্রাজ্ঞাপক শব্দ (e.g. extremely, significantly, moderately, slightly)।",
      "Adverb vs Adjective Traps: কিছু শব্দের রূপ একই (fast, hard, late)। যেমন: \"He drives fast\" (Adverb), \"He is a fast driver\" (Adjective)। কিন্তু \"Hardly\" শব্দের অর্থ \"কদাচিৎ/প্রায় না\", এটি hard-এর adverb নয়!"
    ],
    "formula": "Subject + Frequency Adverb + Main Verb (e.g. \"They rarely disagree\") OR Subject + Be + Frequency Adverb (e.g. \"They are rarely late\")",
    "examples": [
      {
        "en": "The candidate articulates her arguments extraordinarily persuasively.",
        "bn": "পরীক্ষার্থী তার যুক্তিগুলো অসাধারণ প্রত্যয়জনকভাবে উপস্থাপন করেন।",
        "context": "Adverb of Degree (extraordinarily) + Adverb of Manner (persuasively)।"
      },
      {
        "en": "Urban planners consistently prioritize eco-friendly mass transit solutions.",
        "bn": "নগর পরিকল্পনাবিদরা ধারাবাহিকভাবে পরিবেশবান্ধব গণপরিবহনকে অগ্রাধিকার দেন।",
        "context": "Adverb of Frequency (consistently) main verb (prioritize)-এর পূর্বে বসেছে।"
      },
      {
        "en": "He worked hard all semester, whereas his peers hardly prepared at all.",
        "bn": "তিনি পুরো সেমিস্টার কঠোর পরিশ্রম করেছিলেন, পক্ষান্তরে তার সহপাঠীরা প্রায় প্রস্তুতিই নেয়নি।",
        "context": "Hard (পরিশ্রম) বনাম Hardly (প্রায় না)।"
      },
      {
        "en": "The project was extraordinarily successful despite severe supply constraints.",
        "bn": "তীব্র সরবরাহ সংকট সত্ত্বেও প্রকল্পটি অসাধারণভাবে সফল হয়েছিল।",
        "context": "Adverb of Degree (extraordinarily) adjective (successful)-কে জোর দিচ্ছে।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "He drives very fastly on highways.",
        "correct": "He drives very fast on highways.",
        "reason": "ইংরেজিতে \"fastly\" বলে কোনো শব্দ নেই। \"Fast\" নিজেই Adjective এবং Adverb উভয় হিসেবে কাজ করে।"
      },
      {
        "wrong": "She speaks fluently English.",
        "correct": "She speaks English fluently.",
        "reason": "Verb (speaks) এবং Object (English)-এর মাঝখানে Adverb বসানো যায় না। Object-এর পরে বসাতে হবে।"
      },
      {
        "wrong": "He rarely is late for academic lectures.",
        "correct": "He is rarely late for academic lectures.",
        "reason": "Be-verb (is)-এর পরে frequency adverb (rarely) বসবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ (Adverb of Frequency এর স্থান) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the sentence with grammatically natural adverb placement:",
        "options": [
          "A. Academic researchers publish frequently peer-reviewed papers.",
          "B. Academic researchers frequently publish peer-reviewed papers.",
          "C. Academic researchers publish peer-reviewed frequently papers.",
          "D. Frequently academic researchers publishes papers."
        ],
        "correctAnswer": "B. Academic researchers frequently publish peer-reviewed papers.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: Adverb of frequency (frequently) প্রধান ক্রিয়াপদ (publish)-এর ঠিক আগে বসে।",
        "hint": "Adverb of frequency প্রধান verb-এর আগে বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Hard বনাম Hardly নিয়ম অনুযায়ী শূন্যস্থানে সঠিক শব্দটি লিখুন:",
        "question": "Due to severe network congestion, the candidate could [input] hear the examiner's voice.",
        "correctAnswer": "hardly",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"প্রায় শুনতে পাচ্ছিল না\" বা কদাচিৎ বোঝাতে নেগেটিভ অর্থবোধক \"hardly\" ব্যবহৃত হয়।",
        "hint": "নেগেটিভ বা প্রায় না বোঝাতে hardly বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের সাধারণ ভুল টেবিল অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Identify the grammatically correct sentence:",
        "options": [
          "A. She articulates fluently academic English.",
          "B. She articulates academic English fluently.",
          "C. She articulates academic fluently English.",
          "D. Fluently she articulate English academic."
        ],
        "correctAnswer": "B. She articulates academic English fluently.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: Verb (articulates) এবং Direct Object (academic English)-এর মাঝে Adverb বসানো নিষেধ। Object-এর পরে \"fluently\" বসবে।",
        "hint": "Verb ও Object-এর মাঝখানে Adverb বসানো যায় না।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "Although he drives \"fastly\" across the expressway, he is attentive.",
        "options": [
          "A. Although",
          "B. fastly",
          "C. across",
          "D. attentive"
        ],
        "correctAnswer": "B. fastly",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Fastly কোনো বৈধ ইংরেজি শব্দ নয়; সঠিক শব্দ হলো \"fast\"।",
        "hint": "Fast নিজেই Adverb, fastly কোনো শব্দ নেই।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"dramatic\" শব্দটির Adverb রূপ লিখুন:",
        "question": "Renewable energy production increased [input] between 2015 and 2024.",
        "correctAnswer": "dramatically",
        "explanation": "Increased (verb)-কে বিশেষায়িত করতে Adverb রূপ \"dramatically\" আবশ্যক।",
        "hint": "-ic যুক্ত শব্দের শেষে -ally যোগ হয়ে Adverb হয়।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের পুনরাবৃত্তি ক্রিয়া-বিশেষণ (Adverbs of Frequency) অবস্থান সংক্রান্ত সঠিক বাক্যটি নির্বাচন করুন:",
        "question": "Which sentence follows the standard placement of frequency adverbs?",
        "options": [
          "A. The researchers verify their calibration always accurately.",
          "B. The researchers always verify their calibration accurately.",
          "C. The researchers verify always their calibration accurately.",
          "D. Always the researchers verify their calibration accurately."
        ],
        "correctAnswer": "B. The researchers always verify their calibration accurately.",
        "explanation": "লেসনের অবস্থান নিয়ম অনুযায়ী: Frequency Adverbs (always, often, rarely) মূল ভার্বের (verify) ঠিক পূর্বে বসে।",
        "hint": "Subject এবং মূল Verb-এর মাঝে frequency adverb বসে।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের Hard বনাম Hardly নিয়ম অনুযায়ী ব্র্যাকেটের অর্থপূর্ণ শব্দটি টাইপ করুন (কদাচিৎ/প্রায় না):",
        "question": "Due to dense smog, the monitoring drone could [input] transmit visual surveillance data.",
        "correctAnswer": "hardly",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Hardly' অর্থ 'প্রায়ই না' বা 'কদাচিৎ', যা নেতিবাচক সক্ষমতা বোঝায়।",
        "hint": "প্রায় না বোঝাতে hardly লিখুন।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের একাডেমিক সংযোগকারী অ্যাডভার্ব (Discourse Marker) অনুযায়ী সঠিক রূপ নির্বাচন করুন:",
        "question": "Fuel prices skyrocketed globally. _______, transportation expenditure surged for all freight companies.",
        "options": [
          "A. In contrast",
          "B. Consequently",
          "C. Nevertheless",
          "D. On the contrary"
        ],
        "correctAnswer": "B. Consequently",
        "explanation": "লেসনের নিয়ম অনুযায়ী: পূর্ববর্তী ঘটনার যৌক্তিক ফল নির্দেশ করতে Sentence Adverb হিসেবে 'Consequently' বসে।",
        "hint": "ফলাফল নির্দেশ করতে Consequently ব্যবহার হয়।"
      }
    ]
  },
  {
    "id": "l1-modal-verbs",
    "level": 1,
    "levelTitle": "Level 1: Sentence Foundations (শব্দ ও বাক্য ভিত্তি)",
    "levelSubtitle": "জিরো থেকে ইংরেজি বাক্যের প্রতিটি উপাদানের সঠিক ব্যবহার",
    "title": "Modal Auxiliaries & Semi-Modals",
    "bengaliTitle": "মোডাল অক্সিলিয়ারিজ ও বাস্তব জীবনে তাদের সুনির্দিষ্ট ব্যবহার",
    "badge": "Nuance & Tone",
    "estimatedMinutes": 20,
    "contextStory": "ইংরেজিতে একটি সাধারণ বাক্যের মনোভাব রাতারাতি বদলে দিতে পারে একটি Modal Verb। যেমন: \"You study\" (তুমি পড়ো), কিন্তু \"You must study\" (তোমাকে অবশ্যই পড়তে হবে), \"You should study\" (তোমার পড়া উচিত) এবং \"You might study\" (হয়তো তুমি পড়তে পারো)। মোডাল ভার্ব আপনার বক্তব্যকে ভদ্র, দৃঢ় বা সম্ভাবনাময় রূপ দান করে।",
    "conceptBreakdown": [
      "Modal Auxiliaries: Can, Could, May, Might, Must, Shall, Should, Will, Would। এদের পর সবসময় Base Form of Verb (V1) বসে; কখনো -s/-es, -ed বা to বসে না।",
      "সম্ভাব্যতা ও অনুমান (Degrees of Certainty): Must (১০০% নিশ্চিত সত্য), May/Could (৫০% সম্ভাবনা), Might (অল্প সম্ভাবনা), Can't (অসম্ভব)।",
      "বাধ্যবাধকতা (Obligation): Must (ব্যক্তিগত বা কঠোর বাধ্যবাধকতা), Have to (বাইরের নিয়মের বাধ্যবাধকতা), Should / Ought to (পরামর্শ বা নৈতিক কর্তব্য)।",
      "Modal Perfects (অতীতের অনুমান ও আফসোস): Should have + V3 (উচিত ছিল কিন্তু করা হয়নি); Could have + V3 (করার সক্ষমতা ছিল কিন্তু করেনি); Must have + V3 (নিশ্চয়ই অতীতে ঘটেছিল)।",
      "Academic Hedging: আইএলটিএস রাইটিংয়ে চরম সত্য না বলে Modals (could, might, tends to) ব্যবহার করাকে Hedging বলে, যা ব্যান্ডের মান বৃদ্ধি করে।"
    ],
    "formula": "Subject + Modal + Base Verb (V1) | Past: Subject + Modal + have + V3",
    "examples": [
      {
        "en": "Municipal authorities should implement congestion charges to mitigate urban traffic.",
        "bn": "পৌর কর্তৃপক্ষের উচিত যানজট কমাতে কনজেশন চার্জ কার্যকর করা।",
        "context": "Should + Base Verb (implement) দ্বারা সুপারিশ প্রকাশ।"
      },
      {
        "en": "The rapid decline in biodiversity could precipitate irreversible ecological collapse.",
        "bn": "জীববৈচিত্র্যের দ্রুত পতন অপরিবর্তনীয় বাস্তুসংস্থান ধ্বংসের কারণ হতে পারে।",
        "context": "Could দ্বারা একাডেমিক সম্ভাবনা (Hedging) নির্দেশিত।"
      },
      {
        "en": "The researchers should have calibrated the sensors before initiating the trials.",
        "bn": "গবেষকদের উচিত ছিল ট্রায়াল শুরুর আগেই সেন্সরগুলো ক্যালিব্রেট করে নেওয়া।",
        "context": "Should have + V3 দ্বারা অতীতের অনুশোচনা বা ভুলের নির্দেশ।"
      },
      {
        "en": "The artifact must have been manufactured during the Bronze Age.",
        "bn": "নিদর্শনটি নিশ্চয়ই ব্রোঞ্জ যুগের সময় তৈরি হয়েছিল।",
        "context": "Must have + V3 দ্বারা অতীতের যৌক্তিক দৃঢ় অনুমান।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "He must to attend the meeting.",
        "correct": "He must attend the meeting.",
        "reason": "Modal verb-এর পর \"to\" বসে না (Ought to ছাড়া)।"
      },
      {
        "wrong": "She cans speak four languages fluently.",
        "correct": "She can speak four languages fluently.",
        "reason": "Modal verb-এর সাথে কখনো -s বা -es যুক্ত হয় না।"
      },
      {
        "wrong": "You should had told me yesterday.",
        "correct": "You should have told me yesterday.",
        "reason": "Should-এর পর সবসময় have + V3 বসে, had কখনো বসে না।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ অনুযায়ী সঠিক Modal বাক্যটি নির্বাচন করুন:",
        "question": "Applicants _______ submit verified transcripts prior to the admissions deadline.",
        "options": [
          "A. must to",
          "B. must",
          "C. musting",
          "D. ought"
        ],
        "correctAnswer": "B. must",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Must-এর পর সরাসরি Base Verb (submit) বসে, কোনো to বা ing বসে না।",
        "hint": "Must-এর পরে সরাসরি মূল verb বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Modal Perfect নিয়ম অনুযায়ী ব্র্যাকেটের সঠিক রূপ লিখুন (should have + V3):",
        "question": "The government (anticipate) [input] the economic recession earlier.",
        "correctAnswer": "should have anticipated",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"উচিত ছিল কিন্তু করেনি\" বোঝাতে \"should have anticipated\" সঠিক।",
        "hint": "Should have + past participle রূপ ব্যবহার করুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ ও ৪ অনুযায়ী অতীতের যৌক্তিক অনুমান প্রকাশে সঠিক রূপ কোনটি?",
        "question": "The laboratory lights were extinguished; the scientists _______ departed for the night.",
        "options": [
          "A. must have",
          "B. should have",
          "C. would have",
          "D. can have"
        ],
        "correctAnswer": "A. must have",
        "explanation": "লেসনের নিয়ম ২ ও ৪ অনুযায়ী: \"নিশ্চয়ই চলে গিয়েছিলেন\" বোঝাতে অতীতের জোরালো অনুমান হিসেবে \"must have\" ব্যবহৃত হয়।",
        "hint": "অতীতের জোরালো অনুমান বোঝাতে must have বসে।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "লেসনের সাধারণ ভুল টেবিল অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "The committee members \"could able to\" resolve the disputes after mediation.",
        "options": [
          "A. committee",
          "B. could able to",
          "C. resolve",
          "D. mediation"
        ],
        "correctAnswer": "B. could able to",
        "explanation": "লেসনের ব্যাখ্যা অনুযায়ী: Could এবং able to দুটোই একই অর্থ প্রকাশ করে, তাই একসাথে বসে না। \"were able to\" বা শুধু \"could\" হবে।",
        "hint": "Could এবং able to একসাথে বসে না।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "লেসনের Hedging নিয়ম অনুযায়ী সম্ভাবনা প্রকাশ করতে modal রূপ পূরণ করুন: \"Excessive screen exposure [input] lead to insomnia.\"",
        "question": "Excessive screen exposure [input] lead to insomnia.",
        "correctAnswer": "can",
        "explanation": "লেসনের Hedging নিয়ম অনুযায়ী: সাধারণ সম্ভাবনা প্রকাশে \"can\" বা \"could\" ব্যবহৃত হয়।",
        "hint": "সাধারণ সম্ভাবনা প্রকাশে can বা could বসে।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের Modal + Perfect (অতীত অনুশোচনা বা অনুমান) নিয়ম অনুযায়ী সঠিক গঠন নির্বাচন করুন:",
        "question": "The field engineers _______ the drainage floodgates before the monsoon commenced, but they delayed.",
        "options": [
          "A. should reinforce",
          "B. should have reinforced",
          "C. must reinforce",
          "D. ought reinforce"
        ],
        "correctAnswer": "B. should have reinforced",
        "explanation": "লেসনের নিয়ম অনুযায়ী: অতীতে কোনো কাজ করা উচিত ছিল কিন্তু করা হয়নি বোঝাতে 'should have + V3' ব্যবহৃত হয়।",
        "hint": "অতীতের অনুশোচনায় should have + V3 বসে।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের Semi-Modal নিয়ম অনুযায়ী শূন্যস্থানে প্রয়োজনীয় Preposition টাইপ করুন:",
        "question": "Citizens ought [input] comply with municipal waste management guidelines.",
        "correctAnswer": "to",
        "explanation": "লেসনের সূত্র অনুযায়ী: 'Ought'-এর পর আবশ্যিকভাবে infinitive মার্কার 'to' যুক্ত হয় (ought to do)।",
        "hint": "Ought এর সাথে to বসে।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের নিষেধাজ্ঞা (Prohibition) বনাম অপ্রয়োজনীয়তা (Lack of Obligation) নিয়ম অনুযায়ী সঠিক উত্তর দিন:",
        "question": "Candidates _______ enter the examination auditorium after the biometric doors close at 9:00 AM.",
        "options": [
          "A. do not have to",
          "B. must not",
          "C. should not to",
          "D. need not to"
        ],
        "correctAnswer": "B. must not",
        "explanation": "লেসনের নিয়ম অনুযায়ী: কঠোর নিষেধাজ্ঞা (Strict Prohibition) বোঝাতে 'must not' ব্যবহৃত হয়।",
        "hint": "কঠোর নিষেধাজ্ঞায় must not ব্যবহৃত হয়।"
      }
    ]
  },
  {
    "id": "l2-present-simple-vs-continuous",
    "level": 2,
    "levelTitle": "Level 2: Complete Tense Mastery & Timelines (সম্পূর্ণ ১২টি কাল ও সময়রেখা)",
    "levelSubtitle": "বর্তমান, অতীত ও ভবিষ্যতের সকল টেন্সের বাস্তব প্রয়োগ",
    "title": "Present Simple vs Present Continuous",
    "bengaliTitle": "সাধারণ বর্তমান বনাম চলমান বর্তমান (Fact vs Temporary Action)",
    "badge": "Tense Foundation",
    "estimatedMinutes": 20,
    "contextStory": "আমরা বাংলায় প্রায়ই বলি: \"আমি বুঝতেছি\" বা \"আমি তাকে ভালোবাসতেছি।\" কিন্তু ইংরেজিতে Stative Verbs-এ কখনো Continuous (-ing) হয় না! \"I am understanding\" বা \"I am knowing\" সম্পূর্ণ ভুল ইংরেজি। আবার নিয়মিত অভ্যাস বনাম এই মুহূর্তে ঘটা কাজের মধ্যে Tense-এর পার্থক্য না বুঝলে আইএলটিএস রাইটিং টাস্ক ১-এর ডেটা ব্যাখ্যা ভুল হয়ে যাবে।",
    "conceptBreakdown": [
      "Present Simple (Subject + V1): চিরন্তন সত্য, বৈজ্ঞানিক সত্য, নিয়মিত অভ্যাস ও সাধারণ সত্য বোঝাতে ব্যবহৃত হয় (e.g. \"Water boils at 100°C\", \"He exercises daily\")।",
      "Present Continuous (Subject + am/is/are + V-ing): বর্তমানে এই মুহূর্তে ঘটছে এমন কাজ বা সাময়িক পরিবর্তনশীল ট্রেন্ড বোঝাতে ব্যবহৃত হয় (e.g. \"Global temperatures are rising rapidly\")।",
      "Stative Verbs সতর্কতা: অনুভূতি, মতামত, অধিকার বা মানসিক অবস্থার ক্রিয়ায় সাধারণত -ing হয় না: believe, know, understand, belong, possess, contain, prefer, realize, remember।",
      "Timetable / Scheduled Future: অফিসিয়াল শিডিউল বা সময়সূচি বোঝাতে Present Simple ব্যবহৃত হয় (e.g. \"The train departs at 6:00 PM\")।",
      "Present Continuous for Future Arrangements: ব্যক্তিগত পূর্বপরিকল্পিত ভবিষ্যৎ কর্মকাণ্ড (e.g. \"We are hosting an international summit next Tuesday\")।"
    ],
    "formula": "Simple: Subject + V1 (s/es) | Continuous: Subject + am/is/are + V-ing",
    "examples": [
      {
        "en": "Atmospheric carbon concentrations fluctuate seasonally throughout the calendar year.",
        "bn": "বায়ুমণ্ডলে কার্বনের ঘনত্ব ক্যালেন্ডার বছরজুড়ে ঋতুভিত্তিক ওঠানামা করে।",
        "context": "Present Simple (সাধারণ প্রাকৃতিক নিয়ম ও ফ্যাক্ট)।"
      },
      {
        "en": "Urban populations are currently migrating toward suburban residential peripheries.",
        "bn": "শহুরে জনসংখ্যা বর্তমানে শহরতলির আবাসিক প্রান্তে স্থানান্তরিত হচ্ছে।",
        "context": "Present Continuous (বর্তমান সময়ের পরিবর্তনশীল ট্রেন্ড)।"
      },
      {
        "en": "This comprehensive textbook contains vital empirical data.",
        "bn": "এই বিস্তৃত পাঠ্যবইটিতে গুরুত্বপূর্ণ অভিজ্ঞতামূলক ডেটা রয়েছে।",
        "context": "Stative verb (contains)-এ -ing হয়নি।"
      },
      {
        "en": "The international flight leaves at 9:30 AM tomorrow.",
        "bn": "আন্তর্জাতিক ফ্লাইটটি আগামীকাল সকাল ৯:৩০ মিনিটে ছাড়বে।",
        "context": "অফিসিয়াল সময়সূচি বোঝাতে Present Simple।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "I am believing that renewable energy is vital.",
        "correct": "I believe that renewable energy is vital.",
        "reason": "Believe একটি Stative Verb, এর সাথে -ing হয় না।"
      },
      {
        "wrong": "Look! The stock prices fall rapidly.",
        "correct": "Look! The stock prices are falling rapidly.",
        "reason": "চোখের সামনে এই মুহূর্তে ঘটা কাজ বোঝাতে Present Continuous আবশ্যক।"
      },
      {
        "wrong": "He is having two brothers.",
        "correct": "He has two brothers.",
        "reason": "অধিকার বা মালিকানা বোঝাতে have stative verb, তাই \"has\" হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Stative Verb নিয়ম অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Choose the grammatically accurate sentence:",
        "options": [
          "A. Researchers are understanding the genetic sequence fully now.",
          "B. Researchers understand the genetic sequence fully now.",
          "C. Researchers is understanding the genetic sequence fully now.",
          "D. Researchers understands the sequence fully now."
        ],
        "correctAnswer": "B. Researchers understand the genetic sequence fully now.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Understand একটি Stative Verb, তাই এর সাথে continuous (-ing) হয় না। Plural Subject (Researchers)-এর সাথে \"understand\" সঠিক।",
        "hint": "Understand-এর সাথে -ing যোগ হয় না।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "চলমান ট্রেন্ড বোঝাতে ব্র্যাকেটের শব্দের সঠিক Present Continuous রূপ টাইপ করুন:",
        "question": "Global fossil fuel consumption (decrease) [input] gradually due to solar adoption.",
        "correctAnswer": "is decreasing",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: বর্তমান চলমান ট্রেন্ড বোঝাতে Singular Subject (consumption)-এর সাথে \"is decreasing\" বসবে।",
        "hint": "Present Continuous: is/are + V-ing।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ (চিরন্তন সত্য/ফ্যাক্ট) অনুযায়ী সঠিক রূপ বাছাই করুন:",
        "question": "Water _______ at 100 degrees Celsius under standard atmospheric pressure.",
        "options": [
          "A. is boiling",
          "B. boils",
          "C. boil",
          "D. are boiling"
        ],
        "correctAnswer": "B. boils",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: বৈজ্ঞানিক সত্য প্রকাশে সর্বদা Present Simple (boils) ব্যবহৃত হয়।",
        "hint": "চিরন্তন বৈজ্ঞানিক সত্যে Present Simple বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Stative verb \"belong\"-এর সঠিক রূপ লিখুন: \"These archives [input] (belong) to the central library.\"",
        "question": "These archives [input] to the central library.",
        "correctAnswer": "belong",
        "explanation": "Belong একটি stative verb, তাই continuous হয় না। Plural subject \"These archives\"-এর সাথে \"belong\" বসবে।",
        "hint": "Belong-এ কখনো -ing হয় না।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের শিডিউল ফিউচার নিয়ম অনুযায়ী সঠিক বাক্য চিহ্নিত করুন:",
        "question": "The scheduled symposium on climate adaptation _______ at 10:00 AM tomorrow.",
        "options": [
          "A. commences",
          "B. is commenced",
          "C. commencing",
          "D. will be commence"
        ],
        "correctAnswer": "A. commences",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: অফিসিয়াল পূর্বনির্ধারিত সময়সূচি বোঝাতে Present Simple (commences) ব্যবহৃত হয়।",
        "hint": "অফিসিয়াল সময়সূচিতে Present Simple বসে।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "ভুল অংশ চিহ্নিত করুন:",
        "question": "At present, Dr. Watson \"is having\" three patents in biomedical engineering.",
        "options": [
          "A. At present",
          "B. is having",
          "C. three patents",
          "D. biomedical"
        ],
        "correctAnswer": "B. is having",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: মালিকানা বা অধিকার প্রকাশে have একটি Stative Verb, তাই \"is having\"-এর বদলে \"has\" হবে।",
        "hint": "মালিকানা বোঝাতে have-এ -ing হয় না, has হয়।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের চিরন্তন সত্য নিয়ম অনুযায়ী ব্র্যাকেটের ভার্বটির সঠিক রূপ টাইপ করুন:",
        "question": "Water [input] (boil) at 100 degrees Celsius under normal atmospheric pressure.",
        "correctAnswer": "boils",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: বৈজ্ঞানিক বা চিরন্তন সত্য প্রকাশে সর্বদা Present Simple Tense (boils) হয়।",
        "hint": "Third person singular-এর সাথে -s যোগ করুন।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের চলমান অস্থায়ী প্রবণতা (Temporary Trend) নিয়ম অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Which sentence accurately conveys a temporary trend in current society?",
        "options": [
          "A. More individuals commute by electric scooters these days.",
          "B. More individuals are commuting by electric scooters these days.",
          "C. More individuals have commutes by electric scooters.",
          "D. Individuals commutes always electric scooters."
        ],
        "correctAnswer": "B. More individuals are commuting by electric scooters these days.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: সমসাময়িক চলমান প্রবণতা (trend around now) বোঝাতে Present Continuous ব্যবহৃত হয়।",
        "hint": "These days নির্দেশক থাকলে Present Continuous হয়।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের 'have' ভার্বটির সক্রিয় খাওয়া/পান করা অর্থে সঠিক continuous রূপ লিখুন:",
        "question": "The delegates are currently [input] (have) lunch in the conference dining hall.",
        "correctAnswer": "having",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Have যখন খাওয়া বা কোনো অভিজ্ঞতা গ্রহণ বোঝায়, তখন তার Continuous রূপ (having) সম্পূর্ণ ব্যাকরণগত।",
        "hint": "Eating অর্থে having ব্যবহার করুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের সময়-সূচক শব্দচিহ্ন (Time Markers) নিয়ম অনুযায়ী কোনটি Present Continuous-এর সাথে সামঞ্জস্যপূর্ণ নয়?",
        "question": "Which time expression cannot accompany the sentence: \"The economic team _______ the market data.\"?",
        "options": [
          "A. right now",
          "B. every millennium",
          "C. at this moment",
          "D. currently"
        ],
        "correctAnswer": "B. every millennium",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Every...' পুনরাবৃত্তিমূলক অভ্যাস নির্দেশ করে যা Present Simple-এর সাথে বসে, Continuous-এর সাথে নয়।",
        "hint": "Every যুক্ত শব্দ Present Simple নির্দেশ করে।"
      }
    ]
  },
  {
    "id": "l2-past-simple-vs-present-perfect",
    "level": 2,
    "levelTitle": "Level 2: Complete Tense Mastery & Timelines (সম্পূর্ণ ১২টি কাল ও সময়রেখা)",
    "levelSubtitle": "বর্তমান, অতীত ও ভবিষ্যতের সকল টেন্সের বাস্তব প্রয়োগ",
    "title": "Past Simple vs Present Perfect (IELTS Hotspot)",
    "bengaliTitle": "অতীতের সমাপ্ত ঘটনা বনাম বর্তমানের সাথে সম্পর্কযুক্ত কাল",
    "badge": "IELTS Hotspot #1",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস পরীক্ষার্থীদের খাতা কাটতে গিয়ে এক্সামিনাররা সবচেয়ে বেশি যে ভুলটি দেখেন তা হলো Past Simple এবং Present Perfect গুলিয়ে ফেলা। যেমন অনেকেই লেখেন: \"I have graduated in 2022।\" কিন্তু বাক্যে যখনই অতীতের কোনো সুনির্দিষ্ট সময় (in 2022, yesterday, last week, ago) উল্লেখ থাকে, তখন Present Perfect ব্যবহার করা সম্পূর্ণ নিষিদ্ধ—সেখানে Past Simple (V2) ব্যবহার করতে হবে!",
    "conceptBreakdown": [
      "Past Simple (Subject + V2): অতীতে একটি নির্দিষ্ট সময়ে কাজটি সম্পন্ন হয়ে গেছে এবং বর্তমানের সাথে আর সম্পর্ক নেই (e.g. in 2020, yesterday, five days ago, last month, when I was young)।",
      "Present Perfect (Subject + have/has + V3): কাজটি অতীতে ঘটেছে কিন্তু ফলাফল বর্তমানে বিদ্যমান, অথবা অনির্দিষ্ট সময়, কিংবা জীবনের অভিজ্ঞতা (e.g. already, yet, ever, never, just, so far, recently)।",
      "For বনাম Since নিয়ম: Since ব্যবহৃত হয় নির্দিষ্ট শুরুর বিন্দু বোঝাতে (point in time, e.g. since 2010, since childhood)। For ব্যবহৃত হয় সময়সীমা বোঝাতে (duration, e.g. for five years, for two months)।",
      "IELTS Writing Task 1 Trap: চার্টে যদি সাল উল্লেখ থাকে (e.g. \"Between 2010 and 2015\"), তবে অবশ্যই Past Simple হবে (\"oil prices rose\")। সাল উল্লেখ না থেকে সামগ্রিক চিত্র বোঝালে Present Perfect হতে পারে।",
      "Have been to বনাম Have gone to: Have been to মানে গিয়ে ফিরে এসেছে; Have gone to মানে গিয়ে এখনও সেখানেই অবস্থান করছে।"
    ],
    "formula": "Past Simple: Subject + V2 (specific past time) | Present Perfect: Subject + have/has + V3 (unspecified/ongoing)",
    "examples": [
      {
        "en": "The government introduced stringent carbon emissions quotas in 2018.",
        "bn": "সরকার ২০১৮ সালে কঠোর কার্বন নিঃসরণ কোটা চালু করেছিল।",
        "context": "নির্দিষ্ট অতীতের সাল (in 2018) থাকায় Past Simple (introduced)।"
      },
      {
        "en": "The global community has recognized the perils of climate change over the past decade.",
        "bn": "বিশ্ব সম্প্রদায় গত এক দশকে জলবায়ু পরিবর্তনের বিপদ উপলব্ধি করেছে।",
        "context": "Present Perfect (has recognized) কারণ প্রভাব এখনও বিদ্যমান।"
      },
      {
        "en": "He has worked as an acoustic consultant since 2015.",
        "bn": "তিনি ২০১৫ সাল থেকে শাব্দিক পরামর্শক হিসেবে কাজ করে আসছেন।",
        "context": "নির্দিষ্ট শুরুর সময় থাকায় \"since 2015\"।"
      },
      {
        "en": "The inflation rate plummeted for three consecutive quarters before stabilizing.",
        "bn": "মুদ্রাস্ফীতির হার স্থিতিশীল হওয়ার পূর্বে টানা তিন প্রান্তিক ধরে কমেছিল।",
        "context": "Past Simple (plummeted)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The enterprise has launched the product last Monday.",
        "correct": "The enterprise launched the product last Monday.",
        "reason": "Last Monday অতীতের নির্দিষ্ট সময়, তাই Past Simple (launched) হবে।"
      },
      {
        "wrong": "I lived in this city since 2010.",
        "correct": "I have lived in this city since 2010.",
        "reason": "Since দিয়ে বর্তমান পর্যন্ত অব্যাহত কাজ বোঝাতে Present Perfect (have lived) আবশ্যক।"
      },
      {
        "wrong": "She has worked here for 2015.",
        "correct": "She has worked here since 2015.",
        "reason": "নির্দিষ্ট সালের আগে for বসে না, since বসে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ ও ভুল টেবিল অনুযায়ী সঠিক Tense নির্বাচন করুন:",
        "question": "The United Nations _______ the landmark sustainable development goals in September 2015.",
        "options": [
          "A. has ratified",
          "B. ratified",
          "C. have ratified",
          "D. was ratifying"
        ],
        "correctAnswer": "B. ratified",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: বাক্যে \"in September 2015\" অতীতের নির্দিষ্ট সময় উল্লেখ থাকায় অবশ্যই Past Simple (ratified) হবে, Present Perfect নয়।",
        "hint": "অতীতের নির্দিষ্ট সাল উল্লেখ থাকলে Past Simple (V2) বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Since বনাম For নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (since / for):",
        "question": "Coastal cities have battled severe rising tidal surges [input] over two decades.",
        "correctAnswer": "for",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: \"Over two decades\" একটি সময়সীমা (duration), তাই \"for\" বসবে।",
        "hint": "সময়সীমা (duration)-এর আগে for বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Which sentence correctly demonstrates the Present Perfect tense?",
        "options": [
          "A. Scientists have discovered gravitational waves in 2015.",
          "B. Scientists discovered gravitational waves recently.",
          "C. Scientists have recently discovered significant evidence of extraterrestrial ice.",
          "D. Scientists discovered it three days ago and has published it."
        ],
        "correctAnswer": "C. Scientists have recently discovered significant evidence of extraterrestrial ice.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: \"Recently\" থাকলে অনির্দিষ্ট নিকট অতীতের অর্থে Present Perfect (have recently discovered) সঠিক। A-তে সাল থাকায় Present Perfect ভুল।",
        "hint": "Recently শব্দটির সাথে Present Perfect যথাযথ।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"publish\" শব্দটির সঠিক Past Simple রূপ লিখুন:",
        "question": "The World Health Organization [input] (publish) the health guidelines yesterday.",
        "correctAnswer": "published",
        "explanation": "Yesterday অতীতের সুনির্দিষ্ট দিন, তাই Past Simple রূপ \"published\" হবে।",
        "hint": "Yesterday থাকলে V2 (Past Simple) বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ অনুযায়ী সঠিক পার্থক্য নির্বাচন করুন:",
        "question": "The chief engineer _______ to the Berlin facility and is returning tomorrow.",
        "options": [
          "A. has been",
          "B. has gone",
          "C. went to been",
          "D. is gone to"
        ],
        "correctAnswer": "B. has gone",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: কেউ গিয়ে এখনও সেখানে অবস্থান করলে \"has gone\" বসে; ফিরে আসলে \"has been\" বসত।",
        "hint": "গিয়ে এখনও ফিরে না আসলে has gone বসে।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "ভুল অংশটি চিহ্নিত করুন:",
        "question": "The pharmaceutical corporation \"has acquired\" the regional biotech startup five months ago.",
        "options": [
          "A. pharmaceutical",
          "B. has acquired",
          "C. regional",
          "D. five months ago"
        ],
        "correctAnswer": "B. has acquired",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: \"Five months ago\" অতীতের নির্দিষ্ট সময় নির্দেশ করায় \"has acquired\"-এর পরিবর্তে Past Simple \"acquired\" হবে।",
        "hint": "Ago থাকলে Past Simple বসে।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "লেসনের Since বনাম For নিয়ম অনুযায়ী শূন্যস্থানে উপযুক্ত শব্দটি টাইপ করুন:",
        "question": "The medical academy has operated the charitable clinic [input] over two decades.",
        "correctAnswer": "for",
        "explanation": "লেসনের নিয়ম অনুযায়ী: সময়কাল (duration of time - over two decades) নির্দেশ করতে 'for' বসে।",
        "hint": "সময়ের ব্যপ্তি বোঝাতে for লিখুন।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের নির্দিষ্ট অতীত সময় (Definite Past Time) নিয়ম অনুযায়ী সঠিক ভার্ব বাছুন:",
        "question": "The United Nations _______ the historic declaration on biodiversity in 1992.",
        "options": [
          "A. has adopted",
          "B. adopted",
          "C. was adopting",
          "D. had adopted"
        ],
        "correctAnswer": "B. adopted",
        "explanation": "লেসনের নিয়ম অনুযায়ী: অতীতের নির্দিষ্ট সাল (in 1992) উল্লেখ থাকলে সর্বদা Past Simple (adopted) বসে; Present Perfect কখনো বসে না।",
        "hint": "নির্দিষ্ট সাল থাকলে Past Simple হয়।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের 'yet' ব্যবহার নিয়ম অনুযায়ী নেগেটিভ বাক্যে সঠিক ভার্ব রূপ (not finish) লিখুন:",
        "question": "The construction crew [input] (not finish) the perimeter safety barrier yet.",
        "correctAnswer": "has not finished",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Yet' থাকলে বাক্যে Present Perfect নেগেটিভ (has not finished) ব্যবহৃত হয়।",
        "hint": "has not + V3 রূপ লিখুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের 'have gone to' বনাম 'have been to' নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Which sentence indicates that the director visited Japan and has already returned?",
        "options": [
          "A. The director has gone to Japan.",
          "B. The director has been to Japan.",
          "C. The director was going in Japan.",
          "D. The director has being in Japan."
        ],
        "correctAnswer": "B. The director has been to Japan.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: কোনো স্থানে গিয়ে আবার ফিরে আসা বোঝাতে 'have/has been to' ব্যবহৃত হয়।",
        "hint": "গিয়ে ফিরে আসার অভিজ্ঞতায় been to বসে।"
      }
    ]
  },
  {
    "id": "l2-past-perfect-dual-timelines",
    "level": 2,
    "levelTitle": "Level 2: Complete Tense Mastery & Timelines (সম্পূর্ণ ১২টি কাল ও সময়রেখা)",
    "levelSubtitle": "বর্তমান, অতীত ও ভবিষ্যতের সকল টেন্সের বাস্তব প্রয়োগ",
    "title": "Past Continuous & Past Perfect (Dual Timelines)",
    "bengaliTitle": "অতীত চলমান ও পুরাঘটিত অতীত (Dual Timelines & Sequencing)",
    "badge": "Timeline Sequencing",
    "estimatedMinutes": 20,
    "contextStory": "অতীতে যখন দুটি ঘটনা ঘটেছিল, তখন কোন কাজটি আগে ঘটেছিল এবং কোনটি পরে ঘটেছিল তা বোঝাতে Past Perfect (had + V3) ব্যবহার করা হয়। বাংলায় আমরা বলি: \"ডাক্তার আসার পূর্বে রোগী মারা গেল।\" যে কাজটি আগে হয়েছিল সেটি Past Perfect, আর যে কাজটি পরে হয়েছিল সেটি Past Simple।",
    "conceptBreakdown": [
      "Past Perfect মূল সূত্র: অতীতে দুটি কাজের মধ্যে যে কাজটি অপেক্ষাকৃত আগে ঘটেছিল তা Past Perfect (had + V3), আর পরের কাজটি Past Simple (V2)।",
      "Before এবং After নিয়ম: Before-এর আগের ক্লজটি Past Perfect হয় (Past Perfect + before + Past Simple)। After-এর পরের ক্লজটি Past Perfect হয় (Past Simple + after + Past Perfect)।",
      "Past Continuous (was/were + V-ing): অতীতে কোনো নির্দিষ্ট মুহূর্তে একটি কাজ চলছিল বোঝাতে ব্যবহৃত হয় (e.g. \"At 8 PM yesterday, I was reviewing my essay\")।",
      "Interrupted Actions (While বনাম When): অতীতে দীর্ঘ কাজ চলার সময় হঠাৎ আরেকটি কাজ ঘটলে: দীর্ঘ কাজটিতে Past Continuous (was/were + V-ing) এবং ক্ষণিক কাজটিতে Past Simple (V2) বসে (e.g. \"While I was studying, the power failed\")।",
      "By the time নিয়ম: \"By the time + Past Simple, Subject + Past Perfect\" (e.g. \"By the time firefighters arrived, the blaze had engulfed the structure\")।"
    ],
    "formula": "[Earlier Past Event: had + V3] occurred BEFORE [Later Past Event: V2]",
    "examples": [
      {
        "en": "By the time the rescue team arrived, the mountaineers had exhausted their food rations.",
        "bn": "উদ্ধারকারী দল পৌঁছানোর আগেই পর্বতারোহীদের খাবার শেষ হয়ে গিয়েছিল।",
        "context": "খাবার আগে শেষ হয়েছিল (had exhausted), উদ্ধারকারী দল পরে এসেছিল (arrived)।"
      },
      {
        "en": "The economic analyst noticed the discrepancy while she was cross-examining the ledger.",
        "bn": "অর্থনৈতিক বিশ্লেষক খতিয়ান যাচাই করার সময় অসঙ্গতিটি লক্ষ্য করেছিলেন।",
        "context": "Past continuous (was cross-examining) এর মাঝে Past Simple (noticed)।"
      },
      {
        "en": "The students had revised all practice modules before the examiner distributed the papers.",
        "bn": "পরীক্ষক প্রশ্নপত্র বিতরণের পূর্বেই শিক্ষার্থীরা সকল মডিউল রিভিশন দিয়েছিল।",
        "context": "Past Perfect + before + Past Simple।"
      },
      {
        "en": "The factory ceased operations after the environmental board had revoked its permit.",
        "bn": "পরিবেশ বোর্ড পারমিট বাতিল করার পর কারখানাটি কার্যক্রম বন্ধ করেছিল।",
        "context": "Past Simple + after + Past Perfect।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "When the train arrived, the passengers already boarded.",
        "correct": "When the train arrived, the passengers had already boarded.",
        "reason": "ট্রেন আসার আগেই যাত্রীরা উঠেছিল, তাই Past Perfect (had boarded) আবশ্যক।"
      },
      {
        "wrong": "I was sleeping when the alarm was ringing.",
        "correct": "I was sleeping when the alarm rang.",
        "reason": "অ্যালার্ম বেজে ওঠা একটি ক্ষণিক ঘটনা, তাই Past Simple (rang) হবে।"
      },
      {
        "wrong": "After he submitted the thesis, he realized he made a typo.",
        "correct": "After he had submitted the thesis, he realized he had made a typo.",
        "reason": "থিসিস জমা দেওয়ার ঘটনাটি আগে ঘটেছিল, তাই After-এর পর Past Perfect হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের By the time সূত্র অনুযায়ী সঠিক Tense নির্বাচন করুন:",
        "question": "By the time the delegates convened in Geneva, the draft treaty _______ by all member states.",
        "options": [
          "A. had been signed",
          "B. was signing",
          "C. has been signed",
          "D. signed"
        ],
        "correctAnswer": "A. had been signed",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: By the time + Past Simple থাকলে মূল ক্লজে Past Perfect (had been signed) বসে।",
        "hint": "By the time-এর সাথে Past Perfect বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"leave\" শব্দটির সঠিক Past Perfect রূপ টাইপ করুন:",
        "question": "The distinguished keynote speaker [input] (leave) before the panel discussion commenced.",
        "correctAnswer": "had left",
        "explanation": "লেসনের Before সূত্র অনুযায়ী: প্যানেল আলোচনা শুরুর পূর্বেই স্পিকার চলে গিয়েছিলেন, তাই Past Perfect \"had left\" হবে।",
        "hint": "Past Perfect গঠন: had + V3।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের Interrupted Actions নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Choose the sentence with correct past continuous and simple past coordination:",
        "options": [
          "A. While the technician repaired the server, the power was going out.",
          "B. While the technician was repairing the server, the power went out.",
          "C. The technician repaired the server while power went out.",
          "D. When power went out, the technician repaired the server."
        ],
        "correctAnswer": "B. While the technician was repairing the server, the power went out.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: দীর্ঘ চলমান কাজে Past Continuous (was repairing) এবং হঠাৎ ঘটা ঘটনায় Past Simple (went out) বসে।",
        "hint": "While-এর ক্লজে continuous এবং বাধাদানকারী কাজে simple past বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"conclude\" শব্দটির সঠিক রূপ লিখুন: \"The seminar resumed after the audience [input] (conclude) lunch.\"",
        "question": "The seminar resumed after the audience [input] lunch.",
        "correctAnswer": "had concluded",
        "explanation": "লেসনের After নিয়ম অনুযায়ী: দুপুরের খাবার আগে শেষ হয়েছিল, তাই After-এর পর Past Perfect (had concluded) বসবে।",
        "hint": "After-এর পর Past Perfect (had + V3) বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "Before the inspection began, the supervisor \"already prepared\" the compliance files.",
        "options": [
          "A. Before",
          "B. began",
          "C. already prepared",
          "D. compliance"
        ],
        "correctAnswer": "C. already prepared",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: পরিদর্শনের আগেই ফাইল প্রস্তুত করা হয়েছিল, তাই \"already prepared\"-এর বদলে \"had already prepared\" হবে।",
        "hint": "Before-এর পূর্বে অপেক্ষাকৃত আগের কাজে Past Perfect বসে।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটিতে টাইমলাইন নিখুঁতভাবে রক্ষা করা হয়েছে?",
        "question": "Select the chronologically and grammatically accurate sentence:",
        "options": [
          "A. The patient died before the doctor had arrived.",
          "B. The patient had died before the doctor arrived.",
          "C. The patient died after the doctor arrived.",
          "D. The patient had died after the doctor had arrived."
        ],
        "correctAnswer": "B. The patient had died before the doctor arrived.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: রোগীর মৃত্যু আগে হয়েছিল (had died), ডাক্তার পরে এসেছিলেন (arrived)। Before-এর আগে Past Perfect বসে।",
        "hint": "Before-এর পূর্বের কাজটি Past Perfect (had + V3) হয়।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের 'No sooner had... than' নিয়ম অনুযায়ী সঠিক সংযোজক বাছুন:",
        "question": "No sooner had the keynote speaker commenced her lecture _______ the electrical blackout occurred.",
        "options": [
          "A. when",
          "B. then",
          "C. than",
          "D. that"
        ],
        "correctAnswer": "C. than",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'No sooner had...'-এর সাথে সবসময় সংযোজক হিসেবে 'than' বসে ('when' বা 'then' নয়)।",
        "hint": "No sooner-এর সাথে than জোড়া তৈরি করে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "লেসনের 'Hardly had... when' নিয়ম অনুযায়ী শূন্যস্থানের উপযুক্ত সংযোজকটি টাইপ করুন:",
        "question": "Hardly had the emergency rescue vessel arrived [input] the storm intensified dangerously.",
        "correctAnswer": "when",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Hardly had...' কাঠামোর সাথে ক্লজ সংযোগে 'when' ব্যবহৃত হয়।",
        "hint": "Hardly had এর সাথে when বসে।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের 'By the time' কাঠামো অনুযায়ী সঠিক টেন্স সমন্বয় কোনটি?",
        "question": "By the time the diplomatic envoy _______ in Geneva, the delegates _______ the ceasefire accord.",
        "options": [
          "A. arrived / had already signed",
          "B. had arrived / signed",
          "C. arrives / had signed",
          "D. arrived / have signed"
        ],
        "correctAnswer": "A. arrived / had already signed",
        "explanation": "লেসনের সূত্র অনুযায়ী: 'By the time' ক্লজে Past Simple (arrived) এবং প্রধান ক্লজে Past Perfect (had signed) বসে।",
        "hint": "By the time + Past Simple, Past Perfect।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের পূর্বে ঘটে যাওয়া কাজের Past Perfect (had + V3) নিয়ম অনুযায়ী 'leave' ভার্বটির রূপ লিখুন:",
        "question": "When the supervisor entered the terminal, the freight convoy [input] (leave) thirty minutes prior.",
        "correctAnswer": "had left",
        "explanation": "লেসনের নিয়ম অনুযায়ী: অতীতের দুটি কাজের মধ্যে অধিকতর পূর্বের কাজটিতে Past Perfect (had left) হয়।",
        "hint": "had + V3 (had left) লিখুন।"
      }
    ]
  },
  {
    "id": "l2-future-expressions",
    "level": 2,
    "levelTitle": "Level 2: Complete Tense Mastery & Timelines (সম্পূর্ণ ১২টি কাল ও সময়রেখা)",
    "levelSubtitle": "বর্তমান, অতীত ও ভবিষ্যতের সকল টেন্সের বাস্তব প্রয়োগ",
    "title": "Future Expressions: Will, Be Going To & Future Timelines",
    "bengaliTitle": "ভবিষ্যতের প্রকাশভঙ্গি ও সময়রেখা (Predictions, Plans & Evidence)",
    "badge": "Future Strategy",
    "estimatedMinutes": 20,
    "contextStory": "ইংরেজিতে ভবিষ্যৎ প্রকাশ করার জন্য শুধু \"will\" ব্যবহার করলে আপনার লেখার গভীরতা প্রকাশ পায় না। যেমন: \"Look at those dark clouds! It is going to rain\" (প্রমাণভিত্তিক ভবিষ্যৎ), কিন্তু \"I think technological adoption will accelerate\" (ব্যক্তিগত মতামত বা তাৎক্ষণিক অনুমান)। আইএলটিএস স্পিকিং পার্ট ৩ এবং রাইটিং টাস্ক ২-এ ভবিষ্যতের পূর্বাভাস দেওয়ার জন্য সঠিক Future Form জানা অপরিহার্য।",
    "conceptBreakdown": [
      "Will (Subject + will + V1): তাৎক্ষণিক সিদ্ধান্ত (Instant Decision), ব্যক্তিগত মতামত বা ভবিষ্যৎ প্রতিশ্রুতি (e.g. \"I will assist you\", \"I believe prices will stabilize\")।",
      "Be Going To (Subject + am/is/are going to + V1): পূর্বপরিকল্পিত সিদ্ধান্ত (Prior Intentions) অথবা বর্তমান প্রত্যক্ষ প্রমাণের ভিত্তিতে নিশ্চিত ভবিষ্যৎ (e.g. \"Look at the telemetry data; the booster is going to overheat\")।",
      "Present Continuous for Fixed Arrangements: নির্দিষ্ট দিন ও সময়ের নির্ধারিত ভবিষ্যৎ (e.g. \"The university is hosting the convocation on Friday\")।",
      "Future Continuous (Subject + will be + V-ing): ভবিষ্যতে কোনো নির্দিষ্ট সময়ে একটি কাজ চলতে থাকবে (e.g. \"This time next year, I will be studying in Melbourne\")।",
      "Future Perfect (Subject + will have + V3): ভবিষ্যতের কোনো নির্দিষ্ট সময়সীমার আগেই কাজটি শেষ হয়ে যাবে (e.g. \"By 2030, the nation will have achieved carbon neutrality\")।"
    ],
    "formula": "Future Perfect: By + Future Time, Subject + will have + V3 | Evidence: is/are going to + V1",
    "examples": [
      {
        "en": "By 2050, civil engineers will have constructed submerged floating tunnels across the strait.",
        "bn": "২০৫০ সালের মধ্যে পুরকৌশলীরা প্রণালীর ওপর নিমজ্জিত ভাসমান টানেল নির্মাণ সম্পন্ন করবেন।",
        "context": "Future Perfect (will have constructed) নির্দিষ্ট ডেডলাইন (By 2050)-এর পূর্বে সম্পন্ন কাজ।"
      },
      {
        "en": "Given current thermal anomalies, the Arctic ice pack is going to recede even faster this summer.",
        "bn": "বর্তমান তাপমাত্রাগত অসংগতির কারণে এই গ্রীষ্মে সুমেরু বরফ আরও দ্রুত হ্রাস পেতে চলেছে।",
        "context": "Be going to (বর্তমান প্রমাণের ওপর ভিত্তি করে নিশ্চিত পূর্বাভাস)।"
      },
      {
        "en": "At this hour tomorrow, the examinees will be sitting for their CD-IELTS listening module.",
        "bn": "আগামীকাল এই সময়ে পরীক্ষার্থীরা তাদের সিডি-আইএলটিএস লিসেনিং পরীক্ষায় অংশ নিতে থাকবে।",
        "context": "Future Continuous (নির্দিষ্ট সময়ে চলমান কাজ)।"
      },
      {
        "en": "Economists predict that interest rates will fluctuate over the coming quarter.",
        "bn": "অর্থনীতিবিদরা ভবিষ্যদ্বাণী করেছেন যে আগামী প্রান্তিকে সুদের হার ওঠানামা করবে।",
        "context": "Will (সাধারণ একাডেমিক প্রেডিকশন)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "By next year, I will complete my degree.",
        "correct": "By next year, I will have completed my degree.",
        "reason": "\"By + Future Time\" থাকলে Future Perfect (will have completed) ব্যবহার করতে হবে।"
      },
      {
        "wrong": "Look at the clear sky, it will rain.",
        "correct": "Look at those dark clouds, it is going to rain.",
        "reason": "প্রত্যক্ষ প্রমাণের ওপর ভিত্তি করে ভবিষ্যৎ নির্দেশ করতে \"be going to\" বসে।"
      },
      {
        "wrong": "I will be study at 8 PM tonight.",
        "correct": "I will be studying at 8 PM tonight.",
        "reason": "Future continuous-এ will be-এর পর verb-এর সাথে -ing হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের By + Future Time নিয়ম অনুযায়ী সঠিক Future রূপ নির্বাচন করুন:",
        "question": "By the year 2035, the municipal transport authority _______ the entire transit fleet to electric propulsion.",
        "options": [
          "A. will convert",
          "B. will have converted",
          "C. is converting",
          "D. converts"
        ],
        "correctAnswer": "B. will have converted",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"By + Future Time\" (By the year 2035) থাকলে Future Perfect (will have converted) আবশ্যক।",
        "hint": "By the year ... থাকলে will have + V3 বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "প্রত্যক্ষ প্রমাণের ভিত্তিতে নিশ্চিত ভবিষ্যৎ (be going to) অনুযায়ী ব্র্যাকেটের সঠিক রূপ লিখুন:",
        "question": "The balance sheet reveals massive insolvencies; the enterprise [input] (collapse).",
        "correctAnswer": "is going to collapse",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: বিদ্যমান প্রমাণের ওপর ভিত্তি করে নিশ্চিত ভবিষ্যৎ বোঝাতে \"is going to collapse\" সঠিক।",
        "hint": "প্রমাণভিত্তিক ভবিষ্যৎ প্রকাশে is/are going to + V1 বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৪ অনুযায়ী Future Continuous রূপ কোনটি?",
        "question": "At this exact hour next week, the research delegation _______ over the Pacific Ocean.",
        "options": [
          "A. will fly",
          "B. will be flying",
          "C. will have flown",
          "D. is flown"
        ],
        "correctAnswer": "B. will be flying",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: ভবিষ্যতে কোনো নির্দিষ্ট মুহূর্তে কাজ চলমান থাকবে বোঝাতে Future Continuous (will be flying) ব্যবহৃত হয়।",
        "hint": "নির্দিষ্ট সময়ে চলমান ভবিষ্যৎ বোঝাতে will be + V-ing বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ব্র্যাকেটের \"finish\" শব্দটির Future Perfect রূপ লিখুন: \"By midnight, the team [input] the simulation.\"",
        "question": "By midnight, the team [input] the simulation.",
        "correctAnswer": "will have finished",
        "explanation": "By midnight নির্দিষ্ট ডেডলাইন, তাই Future Perfect \"will have finished\" হবে।",
        "hint": "Will have + V3 লিখুন।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের তাৎক্ষণিক সিদ্ধান্ত (Instant Decision) অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "The phone is ringing vigorously; I _______ it immediately.",
        "options": [
          "A. am answering",
          "B. will answer",
          "C. will have answered",
          "D. answer"
        ],
        "correctAnswer": "B. will answer",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: কোনো ঘটনা ঘটার মুহূর্তে তাৎক্ষণিক সিদ্ধান্ত (Spontaneous Decision) নিতে \"will\" ব্যবহৃত হয়।",
        "hint": "তাৎক্ষণিক সিদ্ধান্তে will বসে।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "ভুল অংশ চিহ্নিত করুন:",
        "question": "By the time she retires in 2030, the professor \"will teach\" over ten thousand students.",
        "options": [
          "A. By the time",
          "B. retires",
          "C. will teach",
          "D. over ten thousand"
        ],
        "correctAnswer": "C. will teach",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: By the time + Future Time থাকলে \"will teach\"-এর জায়গায় Future Perfect \"will have taught\" হবে।",
        "hint": "By the time-এর ক্ষেত্রে Future Perfect বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের প্রত্যক্ষ প্রমাণভিত্তিক ভবিষ্যৎ (Be going to) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Look at those ominous dark cumulus clouds gathering above! It _______ rain soon.",
        "options": [
          "A. will",
          "B. is going to",
          "C. would",
          "D. shall"
        ],
        "correctAnswer": "B. is going to",
        "explanation": "লেসনের নিয়ম অনুযায়ী: ইন্দ্রিয়গ্রাহ্য বা চাক্ষুষ প্রমাণ (visual evidence) থাকলে ভবিষ্যৎ প্রকাশে 'be going to' বসে।",
        "hint": "বর্তমান চাক্ষুষ প্রমাণের ভিত্তিতে is going to বসে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "লেসনের Future Continuous (ভবিষ্যতে চলমান) নিয়ম অনুযায়ী ব্র্যাকেটের রূপটি লিখুন:",
        "question": "At this exact time next Monday, the oceanographers [input] (conduct) seafloor sonar mapping.",
        "correctAnswer": "will be conducting",
        "explanation": "লেসনের সূত্র অনুযায়ী: ভবিষ্যতে নির্দিষ্ট সময়ে কোনো কাজ চলমান থাকবে বোঝাতে Future Continuous (will be conducting) হয়।",
        "hint": "will be + ing রূপ লিখুন।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের Future Perfect (নির্দিষ্ট সময়ে সম্পন্ন হওয়া) নিয়ম অনুযায়ী সঠিক বিকল্প নির্বাচন করুন:",
        "question": "By the end of this fiscal semester, our software engineers _______ the migration completely.",
        "options": [
          "A. will finalize",
          "B. will have finalized",
          "C. have finalized",
          "D. would finalize"
        ],
        "correctAnswer": "B. will have finalized",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'By the end of...' সময়সীমার মধ্যে কাজ সমাপ্তি বোঝাতে Future Perfect (will have + V3) বসে।",
        "hint": "By + ভবিষ্যৎ সময় থাকলে will have + V3 বসে।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের সময় ও শর্ত ক্লজে Future Tense পরিহার নিয়ম অনুযায়ী ব্র্যাকেটের সঠিক রূপ লিখুন (reach):",
        "question": "As soon as the emergency medical squad [input] (reach) the disaster zone, treatment will begin.",
        "correctAnswer": "reaches",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'As soon as / when / if'-এর মতো সময়সূচক সাব-অর্ডিনেট ক্লজে will বসে না, Present Simple (reaches) বসে।",
        "hint": "Time clause-এ will বাদ দিয়ে Present Simple লিখুন।"
      }
    ]
  },
  {
    "id": "l3-active-vs-passive",
    "level": 3,
    "levelTitle": "Level 3: Verb Mechanics, Voice & Narration (ক্রিয়া, বাচ্য ও উক্তি পরিবর্তন)",
    "levelSubtitle": "অ্যাক্টিভ-প্যাসিভ, নারেশন ও উচ্চমানের লেখার রূপান্তর",
    "title": "Active Voice vs Passive Voice (Academic Writing Secret)",
    "bengaliTitle": "অ্যাক্টিভ বনাম প্যাসিভ ভয়েস: একাডেমিক লেখার মূল চাবিকাঠি",
    "badge": "IELTS Academic Weapon",
    "estimatedMinutes": 25,
    "contextStory": "দৈনন্দিন জীবনে আমরা সাধারণত Active Voice ব্যবহার করি, যেমন: \"The chef cooked the meal।\" কিন্তু আইএলটিএস একাডেমিক রাইটিংয়ে কে কাজটি করল তার চেয়ে কাজের গুরুত্ব অনেক বেশি। যেমন গবেষণায় বলা হয় না: \"I mixed the chemicals\", বরং বলা হয়: \"The chemicals were mixed under controlled temperature।\" অবজেক্টকে সাবজেক্টে পরিণত করে কাজের ওপর আলোকপাত করাই হলো প্যাসিভ ভয়েস।",
    "conceptBreakdown": [
      "Active Voice: যেখানে Subject নিজেই কাজটি সম্পন্ন করে (e.g. \"Engineers designed the bridge\")।",
      "Passive Voice: যেখানে Object বাক্যের প্রথমে এসে Subject-এর ভূমিকা নেয় এবং Subject-এর ওপর কাজের প্রভাব পড়ে (e.g. \"The bridge was designed by engineers\")।",
      "প্যাসিভ গঠনের মূল সূত্র: Subject (মূল Object) + Be Verb (টেন্স অনুযায়ী) + Past Participle (V3) + (by + Agent)।",
      "টেন্সভিত্তিক রূপান্তর: Present Simple -> is/are + V3; Past Simple -> was/were + V3; Present Continuous -> is/are being + V3; Present Perfect -> has/have been + V3; Modals -> modal + be + V3।",
      "একাডেমিক লেখায় By-phrase বাদ দেওয়ার নিয়ম: যখন কর্তা অজ্ঞাত, স্পষ্ট বা অপ্রয়োজনীয়, তখন \"by them\" বা \"by someone\" বাদ দেওয়া হয় (e.g. \"Taxes were increased\")।",
      "IELTS Writing Task 1 Process Diagram: যেকোনো ম্যানুফ্যাকচারিং বা ন্যাচারাল প্রসেস বর্ণনায় প্রায় ৮০% বাক্য Passive Voice-এ লিখতে হয়।"
    ],
    "formula": "Active: S + V + O | Passive: O + Be (in correct tense) + V3 + (by S)",
    "examples": [
      {
        "en": "Millions of barrels of crude petroleum are imported annually by emerging economies.",
        "bn": "উদীয়মান অর্থনীতিগুলো দ্বারা প্রতিবছর লাখ লাখ ব্যারেল অপরিশোধিত পেট্রোলিয়াম আমদানি করা হয়।",
        "context": "Present Simple Passive (are imported)।"
      },
      {
        "en": "The historical treaty was ratified by parliamentary representatives in late October.",
        "bn": "অক্টোবরের শেষভাগে সংসদীয় প্রতিনিধিদের দ্বারা ঐতিহাসিক চুক্তিটি অনুমোদিত হয়েছিল।",
        "context": "Past Simple Passive (was ratified)।"
      },
      {
        "en": "Automated electric sorting stations are currently being constructed near the shipping port.",
        "bn": "শিপিং বন্দরের নিকটে বর্তমানে স্বয়ংক্রিয় বৈদ্যুতিক বাছাই কেন্দ্র নির্মাণ করা হচ্ছে।",
        "context": "Present Continuous Passive (are being constructed)।"
      },
      {
        "en": "Significant progress has been accomplished in renewable hydrogen fuel cells.",
        "bn": "নবায়নযোগ্য হাইড্রোজেন জ্বালানি কোষে উল্লেখযোগ্য অগ্রগতি সাধিত হয়েছে।",
        "context": "Present Perfect Passive (has been accomplished) যেখানে বাই-ফ্রেজ অপ্রয়োজনীয়।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The accident was happened yesterday.",
        "correct": "The accident happened yesterday.",
        "reason": "Happen একটি Intransitive Verb, এর কোনো Passive রূপ হয় না।"
      },
      {
        "wrong": "The report was wrote by the supervisor.",
        "correct": "The report was written by the supervisor.",
        "reason": "Passive-এ সর্বদা Past Participle (V3 - written) বসবে, V2 (wrote) নয়।"
      },
      {
        "wrong": "The bridge is constructing now.",
        "correct": "The bridge is being constructed now.",
        "reason": "সেতু নিজে নির্মাণ করতে পারে না, তাই Passive Continuous (is being constructed) আবশ্যক।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের সূত্র অনুযায়ী বাক্যটিকে প্যাসিভ ভয়েসে রূপান্তর করুন:",
        "question": "Active: \"Technicians conduct empirical testing daily.\"",
        "options": [
          "A. Empirical testing is conducted daily by technicians.",
          "B. Empirical testing was conducted daily by technicians.",
          "C. Empirical testing are conducted daily by technicians.",
          "D. Empirical testing is being conducted daily."
        ],
        "correctAnswer": "A. Empirical testing is conducted daily by technicians.",
        "explanation": "লেসনের নিয়ম ৩ ও ৪ অনুযায়ী: Present Simple-এর প্যাসিভ রূপ হলো is/are + V3। Empirical testing একবচন, তাই \"is conducted\" সঠিক।",
        "hint": "Present Simple Passive: is + V3।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Modal Passive নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (modal + be + V3):",
        "question": "Stringent environmental regulations must [input] (enforce) by regional authorities.",
        "correctAnswer": "be enforced",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Modals-এর প্যাসিভ রূপ হলো modal + be + V3 (\"must be enforced\")।",
        "hint": "Modal + be + past participle (enforced)।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ (একাডেমিক স্টাইলে বাই-ফ্রেজ বাদ দেওয়া) অনুযায়ী শ্রেষ্ঠ বাক্য কোনটি?",
        "question": "Identify the most natural academic passive construction:",
        "options": [
          "A. Over one thousand questionnaires were distributed to participants.",
          "B. Over one thousand questionnaires were distributed by somebody.",
          "C. Questionnaires distributed themselves to participants.",
          "D. Participants were distributing by questionnaires."
        ],
        "correctAnswer": "A. Over one thousand questionnaires were distributed to participants.",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: গবেষণাপত্রে প্রশ্নপত্র বিতরণের কাজের ওপর গুরুত্ব দিতে বাই-ফ্রেজ বাদ দিয়ে \"were distributed\" লেখাই আদর্শ একাডেমিক রূপ।",
        "hint": "অপ্রয়োজনীয় বাই-ফ্রেজ বাদ দেওয়া একাডেমিক বৈশিষ্ট্য।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Present Continuous Passive-এ রূপান্তর করুন: \"The laboratory [input] (upgrade) right now.\"",
        "question": "The laboratory [input] right now.",
        "correctAnswer": "is being upgraded",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Present Continuous Passive সূত্র হলো is/are + being + V3 (\"is being upgraded\")।",
        "hint": "is + being + V3 লিখুন।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী নিচের কোন বাক্যটি ব্যাকরণগতভাবে ভুল?",
        "question": "Which of the following passive sentences is ungrammatical?",
        "options": [
          "A. A severe earthquake was occurred in the region.",
          "B. The new expressway was inaugurated last week.",
          "C. Several anomalies were detected during the trial.",
          "D. The hypothesis has been validated by international peers."
        ],
        "correctAnswer": "A. A severe earthquake was occurred in the region.",
        "explanation": "লেসনের ভুল টেবিল ও পরবর্তী লেসনের ইন্ট্রানজিটিভ নিয়ম অনুযায়ী: Occur অকর্মক ক্রিয়া, এর প্যাসিভ রূপ হয় না। সঠিক হবে \"A severe earthquake occurred\"।",
        "hint": "Occur-এর কখনো passive হয় না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "Present Perfect Passive রূপ টাইপ করুন: \"Two new wind farms [input] (commission) since 2022.\"",
        "question": "Two new wind farms [input] since 2022.",
        "correctAnswer": "have been commissioned",
        "explanation": "Plural Subject (Two new wind farms)-এর জন্য Present Perfect Passive রূপ \"have been commissioned\"।",
        "hint": "Have been + V3।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "সঠিক টেন্স অনুযায়ী প্যাসিভ রূপ নির্বাচন করুন:",
        "question": "In the seventeenth century, the ancient library _______ by fire.",
        "options": [
          "A. is destroyed",
          "B. was destroyed",
          "C. has been destroyed",
          "D. was being destroy"
        ],
        "correctAnswer": "B. was destroyed",
        "explanation": "অতীতের নির্দিষ্ট সময় (In the seventeenth century) থাকায় Past Simple Passive (was destroyed) হবে।",
        "hint": "অতীতের নির্দিষ্ট সময়ে was/were + V3 বসে।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের Modal Passive (Modal + be + V3) নিয়ম অনুযায়ী সঠিক রূপ বাছুন:",
        "question": "Rigorous confidentiality protocols _______ by all laboratory research personnel.",
        "options": [
          "A. must strictly observe",
          "B. must be strictly observed",
          "C. must strictly observing",
          "D. must to be observed"
        ],
        "correctAnswer": "B. must be strictly observed",
        "explanation": "লেসনের সূত্র অনুযায়ী: Modal Verb-এর প্যাসিভ রূপ হলো Modal + be + V3 (must be observed)।",
        "hint": "Modal + be + V3 গঠন নিশ্চিত করুন।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের Present Continuous Passive (is/are being + V3) নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন:",
        "question": "The confidential survey responses [input] (process) by the central AI server right now.",
        "correctAnswer": "are being processed",
        "explanation": "লেসনের প্যাসিভ নিয়ম অনুযায়ী: Responses (plural) + are being + V3 (processed)।",
        "hint": "are being + V3 লিখুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের একাডেমিক নির্ভেজাল প্যাসিভ (Impersonal Academic Passive) অনুযায়ী সবচেয়ে গ্রহণযোগ্য বাক্য কোনটি?",
        "question": "Which sentence demonstrates the most formal academic reporting passive?",
        "options": [
          "A. People are believing that the global economy is fluctuating.",
          "B. It is widely acknowledged that urban green spaces mitigate depression.",
          "C. They say that green spaces reduce depression.",
          "D. Green spaces are said by everybody to reduce depression."
        ],
        "correctAnswer": "B. It is widely acknowledged that urban green spaces mitigate depression.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: একাডেমিক লেখায় নৈর্ব্যক্তিক ও বস্তুনিষ্ঠতা বজায় রাখতে 'It is + V3 + that clause' সর্বাধিক মানসম্মত।",
        "hint": "It is widely acknowledged that কাঠামোটি লক্ষ্য করুন।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের Phrasal Verb-এর প্রিপজিশন অপরিবর্তিত রাখার নিয়ম অনুযায়ী প্যাসিভ রূপটি পূর্ণ করুন (laugh at):",
        "question": "The junior clerk felt humiliated because his presentation was laughed [input] by his peers.",
        "correctAnswer": "at",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Laugh at'-এর প্যাসিভেও প্রিপজিশন 'at' বহাল থাকে (was laughed at)।",
        "hint": "Laugh-এর সাথে নির্দিষ্ট প্রিপজিশন at টাইপ করুন।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের Present Perfect Passive (has/have been + V3) নিয়ম অনুযায়ী সঠিক বিকল্প নির্বাচন করুন:",
        "question": "Over 5,000 electric charging hubs _______ across metropolitan highways this fiscal quarter.",
        "options": [
          "A. have installed",
          "B. have been installed",
          "C. were being installed",
          "D. has been installed"
        ],
        "correctAnswer": "B. have been installed",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Plural Subject (hubs) + have been + V3 (installed)।",
        "hint": "Plural subject-এর সাথে have been + V3 হয়।"
      }
    ]
  },
  {
    "id": "l3-transitive-vs-intransitive",
    "level": 3,
    "levelTitle": "Level 3: Verb Mechanics, Voice & Narration (ক্রিয়া, বাচ্য ও উক্তি পরিবর্তন)",
    "levelSubtitle": "অ্যাক্টিভ-প্যাসিভ, নারেশন ও উচ্চমানের লেখার রূপান্তর",
    "title": "Transitive vs Intransitive Verbs (Common Sentence Traps)",
    "bengaliTitle": "সকর্মক বনাম অকর্মক ক্রিয়া: ভুল প্যাসিভ এড়ানোর কৌশল",
    "badge": "Grammar Trap Buster",
    "estimatedMinutes": 20,
    "contextStory": "অনেকেই লেখেন: \"The accident was happened\" বা \"The sun was risen।\" কিন্তু ব্যাকরণের অমোঘ নিয়ম হলো—যেসব ক্রিয়াপদের কোনো কর্ম বা Direct Object থাকে না (Intransitive Verbs), তাদের কোনোদিন প্যাসিভ ভয়েসে রূপান্তর করা যায় না! এই নিয়মটি না জানলে আইএলটিএস রাইটিংয়ে নিশ্চিত ব্যান্ড স্কোর কমে যাবে।",
    "conceptBreakdown": [
      "Transitive Verbs (সকর্মক ক্রিয়া): যেসব ক্রিয়াপদের অর্থ পূর্ণ করতে একটি Direct Object (কর্ম) প্রয়োজন হয় (e.g. build, create, buy, solve, provide)। এরা প্যাসিভ হতে পারে।",
      "Intransitive Verbs (অকর্মক ক্রিয়া): যেসব ক্রিয়াপদের নিজস্ব কোনো Object থাকে না (e.g. happen, occur, arrive, disappear, exist, die, fall, rise)। এরা কখনোই প্যাসিভ হতে পারে না।",
      "Raise বনাম Rise পার্থক্য: Raise হলো Transitive (অর্থ: কোনো কিছু বৃদ্ধি করা বা তোলা, e.g. \"The government raised taxes\")। Rise হলো Intransitive (অর্থ: নিজে নিজে বৃদ্ধি পাওয়া বা ওঠা, e.g. \"Prices rose sharply\")।",
      "Lay বনাম Lie পার্থক্য: Lay (Transitive, e.g. \"lay the foundation\") বনাম Lie (Intransitive, e.g. \"the village lies in a valley\")।",
      "বাক্যের শুদ্ধতা পরীক্ষা: Verb-কে \"কী\" (What) বা \"কাকে\" (Whom) দিয়ে প্রশ্ন করলে যদি উত্তর না পাওয়া যায়, তবে তা Intransitive এবং তার প্যাসিভ করা যাবে না।"
    ],
    "formula": "Transitive: S + V + Object (Passive possible) | Intransitive: S + V (NO Passive possible)",
    "examples": [
      {
        "en": "The catastrophic tsunami occurred without sufficient early seismic warning.",
        "bn": "পর্যাপ্ত প্রাক-ভূমিকম্প সতর্কতা ছাড়াই বিপর্যয়কর সুনামিটি সংঘটিত হয়েছিল।",
        "context": "Occurred (Intransitive) কোনো প্যাসিভ হয়নি।"
      },
      {
        "en": "The central bank raised baseline interest rates by fifty basis points.",
        "bn": "কেন্দ্রীয় ব্যাংক ভিত্তি সুদের হার পঞ্চাশ বেসিস পয়েন্ট বৃদ্ধি করেছিল।",
        "context": "Raised (Transitive) এর Object হলো \"interest rates\"।"
      },
      {
        "en": "Global sea levels rose by nearly twenty centimeters over the previous century.",
        "bn": "বিগত শতাব্দীতে বৈশ্বিক সমুদ্রপৃষ্ঠ প্রায় বিশ সেন্টিমিটার বৃদ্ধি পেয়েছিল।",
        "context": "Rose (Intransitive) নিজে নিজে বৃদ্ধি পাওয়া বোঝায়।"
      },
      {
        "en": "Ancient civilizations disappeared mysteriously from the archaeological record.",
        "bn": "প্রাচীন সভ্যতাগুলো প্রত্নতাত্ত্বিক রেকর্ড থেকে রহস্যজনকভাবে অদৃশ্য হয়ে গিয়েছিল।",
        "context": "Disappeared (Intransitive)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The collision was occurred at midnight.",
        "correct": "The collision occurred at midnight.",
        "reason": "Occur একটি Intransitive Verb, এর প্যাসিভ অসম্ভব।"
      },
      {
        "wrong": "The government rose the minimum wage.",
        "correct": "The government raised the minimum wage.",
        "reason": "বেতন সরকার বাড়িয়েছিল, তাই Transitive Verb \"raised\" বসবে।"
      },
      {
        "wrong": "The missing manuscript was disappeared.",
        "correct": "The missing manuscript disappeared.",
        "reason": "Disappear অকর্মক ক্রিয়া, এর প্যাসিভ রূপ হয় না।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ অনুযায়ী নিচের কোন Verb-টির প্যাসিভ রূপ তৈরি করা সম্ভব নয়?",
        "question": "Which of the following verbs is strictly Intransitive and cannot be passivized?",
        "options": [
          "A. Construct",
          "B. Disappear",
          "C. Facilitate",
          "D. Implement"
        ],
        "correctAnswer": "B. Disappear",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: Disappear অকর্মক ক্রিয়া (Intransitive), এর কোনো Object থাকে না, ফলে এর প্যাসিভ অসম্ভব।",
        "hint": "অদৃশ্য হওয়া (disappear) একটি অকর্মক ক্রিয়া।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Raise বনাম Rise নিয়ম অনুযায়ী সঠিক Verb-টি লিখুন (raised / rose):",
        "question": "Consumer price inflation [input] sharply during the third quarter.",
        "correctAnswer": "rose",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: নিজে নিজে বৃদ্ধি পাওয়া বোঝাতে Intransitive Verb \"rose\" ব্যবহৃত হয়।",
        "hint": "নিজে নিজে বৃদ্ধি পাওয়ায় rise/rose বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের সকর্মক ক্রিয়া নিয়ম অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Identify the sentence with correct Transitive verb usage:",
        "options": [
          "A. The municipal council raised parking fees to discourage vehicular entry.",
          "B. The municipal council rose parking fees to discourage vehicular entry.",
          "C. Parking fees was raised itself.",
          "D. The fees rose the council."
        ],
        "correctAnswer": "A. The municipal council raised parking fees to discourage vehicular entry.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: কাউন্সিল ফি বাড়িয়েছিল (Object: parking fees), তাই Transitive Verb \"raised\" সঠিক।",
        "hint": "অন্য কিছু বৃদ্ধি করা বা তোলার ক্ষেত্রে raise বসে।"
      },
      {
        "id": 4,
        "type": "mcq",
        "instruction": "ভুল প্যাসিভযুক্ত বাক্যটি চিহ্নিত করুন:",
        "question": "Which sentence incorrectly passivizes an Intransitive verb?",
        "options": [
          "A. The new stadium was completed ahead of schedule.",
          "B. The unforeseen technical glitch was occurred during live broadcast.",
          "C. The policy was revised by the minister.",
          "D. Several obstacles were encountered along the trek."
        ],
        "correctAnswer": "B. The unforeseen technical glitch was occurred during live broadcast.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: Occur-এর কখনো প্যাসিভ হয় না; সঠিক বাক্য হবে \"The glitch occurred\"।",
        "hint": "Occur কখনো was occurred হয় না।"
      },
      {
        "id": 5,
        "type": "fill-typing",
        "instruction": "ভুল বাক্যটি সংশোধন করুন: \"The incident was happened at night.\" (সঠিক ক্রিয়া রূপটি টাইপ করুন):",
        "question": "The incident [input] at night.",
        "correctAnswer": "happened",
        "explanation": "Happen অকর্মক ক্রিয়া, তাই \"was happened\"-এর স্থলে কেবল \"happened\" হবে।",
        "hint": "Happen-এর পূর্বে was বসবে না।"
      },
      {
        "id": 6,
        "type": "mcq",
        "instruction": "লেসনের Lay বনাম Lie নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Choose the grammatically accurate sentence:",
        "options": [
          "A. The ancient village lies at the foothills of the Alps.",
          "B. The ancient village lays at the foothills of the Alps.",
          "C. The village was lied by the mountain.",
          "D. The village is laying down."
        ],
        "correctAnswer": "A. The ancient village lies at the foothills of the Alps.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: কোনো স্থানে অবস্থিত থাকা বোঝাতে Intransitive Verb \"lies\" ব্যবহৃত হয়।",
        "hint": "অবস্থিত থাকার ক্ষেত্রে lie/lies বসে।"
      },
      {
        "id": 7,
        "type": "fill-typing",
        "instruction": "সঠিক রূপ লিখুন (arrive / was arrived): \"The diplomatic convoy [input] at dawn.\"",
        "question": "The diplomatic convoy [input] at dawn.",
        "correctAnswer": "arrived",
        "explanation": "Arrive একটি intransitive verb, তাই passive \"was arrived\" হবে না, কেবল \"arrived\" হবে।",
        "hint": "Arrive অকর্মক ক্রিয়া।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের Ergative Verbs (উভয়মুখী রূপান্তর) নিয়ম অনুযায়ী কোন বাক্যে 'melt' ইনট্রানজিটিভ হিসেবে ব্যবহৃত হয়েছে?",
        "question": "In which sentence is the ergative verb \"melt\" functioning intransitively without a passive voice?",
        "options": [
          "A. The technician melted the solder iron.",
          "B. High ambient temperatures melted the arctic glaciers.",
          "C. The arctic glaciers melted at an alarming rate during summer.",
          "D. The solder iron was melted by the furnace."
        ],
        "correctAnswer": "C. The arctic glaciers melted at an alarming rate during summer.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Ergative Verb স্বয়ংক্রিয় কাজের ক্ষেত্রে কোনো Object বা প্যাসিভ সাহায্যকারী ছাড়াই Intransitive হিসেবে কাজ করে।",
        "hint": "যেখানে কোনো বাহ্যিক Object বা passive নেই।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের Rise বনাম Raise নিয়ম অনুযায়ী সঠিক ট্রানজিটিভ ভার্ব রূপ টাইপ করুন (অতীতে তোলা/বৃদ্ধি করা):",
        "question": "The state central bank [input] interest rates by fifty basis points last Thursday.",
        "correctAnswer": "raised",
        "explanation": "লেসনের নিয়ম অনুযায়ী: কোনো কিছু বৃদ্ধি করা (Object: interest rates) অর্থে Transitive Verb 'raise' (Past: raised) বসে।",
        "hint": "Transitive verb raise-এর Past form লিখুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের সম্পূর্ণ অর্থপূর্ণ Intransitive Verb যা কখনো প্যাসিভ হয় না, সেটি বাছুন:",
        "question": "Which sentence contains a grammatically impossible passive transformation?",
        "options": [
          "A. The decision was reached after debate.",
          "B. The catastrophe was occurred in the early hours.",
          "C. The parcel was delivered this morning.",
          "D. The report was compiled by the assistant."
        ],
        "correctAnswer": "B. The catastrophe was occurred in the early hours.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Occur' একটি খাঁটি Intransitive Verb; এর কখনো Passive Voice (was occurred) হয় না।",
        "hint": "Occur-এর প্যাসিভ হওয়া অসম্ভব।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের Lie বনাম Lay নিয়ম অনুযায়ী শুয়ে থাকার অতীত রূপ (lie-এর past) টাইপ করুন:",
        "question": "The exhausted marathon runner [input] (lie) on the track to regain his breath.",
        "correctAnswer": "lay",
        "explanation": "লেসনের নিয়ম অনুযায়ী: স্বয়ং শুয়ে থাকা অর্থে Intransitive 'lie'-এর Past Tense হলো 'lay'।",
        "hint": "Lie এর past form হলো lay।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের অপ্রয়োজনীয় প্রিপজিশন পরিহার নিয়ম অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Choose the grammatically accurate sentence avoiding unnecessary prepositions:",
        "options": [
          "A. The committee discussed about the ecological repercussions.",
          "B. The committee discussed the ecological repercussions.",
          "C. The committee discussed on the ecological repercussions.",
          "D. The committee discussed with the ecological repercussions."
        ],
        "correctAnswer": "B. The committee discussed the ecological repercussions.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Discuss' একটি Transitive Verb; এর পর সরাসরি Object বসে, কোনো 'about/on' বসে না।",
        "hint": "Discuss-এর পরে কোনো about বসে না।"
      }
    ]
  },
  {
    "id": "l3-stative-vs-action-verbs",
    "level": 3,
    "levelTitle": "Level 3: Verb Mechanics, Voice & Narration (ক্রিয়া, বাচ্য ও উক্তি পরিবর্তন)",
    "levelSubtitle": "অ্যাক্টিভ-প্যাসিভ, নারেশন ও উচ্চমানের লেখার রূপান্তর",
    "title": "Stative Verbs vs Dynamic Verbs",
    "bengaliTitle": "স্থিতিশীল ক্রিয়া বনাম গতিশীল ক্রিয়া (কেন কিছু ভার্বে -ing হয় না)",
    "badge": "Lexical Precision",
    "estimatedMinutes": 20,
    "contextStory": "ইংরেজিতে দুই ধরনের Verb রয়েছে: Action Verb (যা শারীরিক কাজ বা নড়াচড়া প্রকাশ করে, যেমন: run, build, write) এবং Stative Verb (যা মানসিক অবস্থা, অনুভূতি, মালিকানা বা অস্তিত্ব প্রকাশ করে, যেমন: understand, belong, believe)। Stative Verb-এর সাথে সাধারণত Continuous (-ing) টেন্স ব্যবহার করা যায় না।",
    "conceptBreakdown": [
      "Dynamic / Action Verbs: শারীরিক বা দৃশ্যমান কর্মকাণ্ড নির্দেশ করে (e.g. develop, execute, construct, test)। এগুলো Simple ও Continuous উভয় রূপেই ব্যবহার করা যায়।",
      "Stative Verbs (স্থিতিশীল ক্রিয়া): মনের ভাব, অনুভূতি, মতামত, পরিমাপ বা অধিকার বোঝায় (e.g. believe, love, hate, prefer, understand, know, belong, possess, consist of, weigh)। এদের সচরাচর -ing হয় না।",
      "দ্বৈত রূপের Verbs (উভয় অর্থে ব্যবহৃত): কিছু Verbs অর্থের ওপর নির্ভর করে Stative অথবা Dynamic হতে পারে। যেমন: \"I think he is honest\" (মতামত = Stative), কিন্তু \"I am thinking about the problem\" (মস্তিষ্কে ভাবনা চলার প্রক্রিয়া = Dynamic)।",
      "Have Verb-এর দ্বৈত অর্থ: \"She has an apartment\" (মালিকানা = Stative), কিন্তু \"She is having lunch\" (খাচ্ছে = Dynamic Action)।",
      "See ও Taste-এর দ্বৈত রূপ: \"The soup tastes delicious\" (স্বাদ এমন = Stative), কিন্তু \"The chef is tasting the soup\" (চামচ দিয়ে চেখে দেখছে = Dynamic)।"
    ],
    "formula": "State/Possession: Simple Tense only (e.g. \"It belongs to us\") | Dynamic Process: Continuous allowed",
    "examples": [
      {
        "en": "The overarching scientific consensus holds that climate action is urgent.",
        "bn": "সামগ্রিক বৈজ্ঞানিক ঐকমত্য মনে করে যে জলবায়ু পদক্ষেপ জরুরি।",
        "context": "Hold (বিশ্বাস/ধারণা করা অর্থে Stative)।"
      },
      {
        "en": "The laboratory is currently having discussions regarding the grant allocation.",
        "bn": "গবেষণাগারটি বর্তমানে অনুদান বরাদ্দ নিয়ে আলোচনা করছে।",
        "context": "Have আলোচনা করার প্রক্রিয়া বোঝানোয় Continuous হয়েছে।"
      },
      {
        "en": "This comprehensive manual contains essential laboratory safety instructions.",
        "bn": "এই বিস্তারিত নির্দেশিকায় অপরিহার্য গবেষণাগার নিরাপত্তা নির্দেশনা রয়েছে।",
        "context": "Contain (ধারণ করা) Stative verb, -ing হয়নি।"
      },
      {
        "en": "He prefers empirical experimentation over purely theoretical assumptions.",
        "bn": "তিনি সম্পূর্ণ তাত্ত্বিক অনুমানের চেয়ে অভিজ্ঞতামূলক গবেষণাকে অগ্রাধিকার দেন।",
        "context": "Prefer Stative verb।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "I am knowing the answer.",
        "correct": "I know the answer.",
        "reason": "Know একটি Stative Verb, এর সাথে কখনো -ing হয় না।"
      },
      {
        "wrong": "The book is belonging to the library.",
        "correct": "The book belongs to the library.",
        "reason": "Belong অধিকার বোঝায়, তাই সর্বদা Simple Tense হবে।"
      },
      {
        "wrong": "She is having a luxury car.",
        "correct": "She has a luxury car.",
        "reason": "মালিকানা বোঝাতে have-এর সাথে -ing হয় না।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ অনুযায়ী Stative Verb সম্বলিত সঠিক বাক্যটি নির্বাচন করুন:",
        "question": "Choose the grammatically accurate sentence:",
        "options": [
          "A. The research committee is believing the results are authentic.",
          "B. The research committee believes the results are authentic.",
          "C. The committee is having a belief now.",
          "D. Believing is the committee results."
        ],
        "correctAnswer": "B. The research committee believes the results are authentic.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: Believe একটি Stative Verb, এর সাথে continuous (-ing) হয় না, তাই \"believes\" সঠিক।",
        "hint": "Believe-এ -ing যুক্ত হয় না।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Stative নিয়ম অনুযায়ী ব্র্যাকেটের \"consist\" শব্দটির সঠিক রূপ লিখুন:",
        "question": "The prospective study cohort [input] (consist) of twelve distinct demographics.",
        "correctAnswer": "consists",
        "explanation": "Consist of একটি stative verb, এর সাথে -ing হয় না। Cohort (singular)-এর সাথে \"consists\" হবে।",
        "hint": "Consist-এ -ing হয় না, -s যুক্ত করুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (দ্বৈত অর্থ) অনুযায়ী কোন বাক্যে \"think\" সঠিক চলমান প্রক্রিয়ায় ব্যবহৃত হয়েছে?",
        "question": "In which sentence is \"think\" correctly used in the continuous form?",
        "options": [
          "A. I am thinking that the policy is fundamentally flawed.",
          "B. The analyst is thinking carefully about alternative methodologies.",
          "C. She is thinking chocolate tastes sweet.",
          "D. They are thinking that education is vital."
        ],
        "correctAnswer": "B. The analyst is thinking carefully about alternative methodologies.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: মস্তিষ্কে কোনো কিছু নিয়ে সক্রিয়ভাবে চিন্তা করার প্রক্রিয়া বোঝাতে \"is thinking\" সঠিক। মতামত দিতে \"think\" হয়।",
        "hint": "সক্রিয় চিন্তা করার প্রক্রিয়ায় thinking হতে পারে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ভুল বাক্যটি সংশোধন করুন: \"This artifact is belonging to the museum.\" (সঠিক ভার্ব রূপ লিখুন):",
        "question": "This artifact [input] to the museum.",
        "correctAnswer": "belongs",
        "explanation": "Belong অধিকার নির্দেশক stative verb, তাই \"belongs\" হবে।",
        "hint": "Belong-এ -ing হয় না।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের সাধারণ ভুল টেবিল অনুযায়ী ভুল বাক্যটি চিহ্নিত করুন:",
        "question": "Which of the following sentences contains a stative verb error?",
        "options": [
          "A. The soup smells delectable.",
          "B. The chef is smelling the soup.",
          "C. I am understanding the complex theorem now.",
          "D. I understand the complex theorem now."
        ],
        "correctAnswer": "C. I am understanding the complex theorem now.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: Understand একটি Stative Verb, \"am understanding\" বলা মারাত্মক ভুল।",
        "hint": "Understand-এ -ing হয় না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "মালিকানা বোঝাতে \"have\" এর সঠিক রূপ লিখুন: \"The candidate [input] (have) substantial experience.\"",
        "question": "The candidate [input] substantial experience.",
        "correctAnswer": "has",
        "explanation": "মালিকানা বা যোগ্যতার ক্ষেত্রে have stative verb, তাই singular subject-এর সাথে \"has\" বসবে।",
        "hint": "Candidate-এর সাথে has বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "Stative verb-এর ক্ষেত্রে সঠিক প্রশ্ন কাঠামো কোনটি?",
        "question": "Select the correct interrogative sentence:",
        "options": [
          "A. Are you recognizing the signature on the treaty?",
          "B. Do you recognize the signature on the treaty?",
          "C. Have you recognizing it?",
          "D. Is recognizing you the treaty?"
        ],
        "correctAnswer": "B. Do you recognize the signature on the treaty?",
        "explanation": "Recognize একটি stative verb, তাই প্রশ্নে Present Simple (Do you recognize) ব্যবহৃত হবে।",
        "hint": "Recognize-এ -ing হয় না, Do দিয়ে প্রশ্ন করতে হয়।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের সংবেদনশীল অনুভূতি (Perception Stative Verbs) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Choose the sentence that uses perception verbs accurately:",
        "options": [
          "A. The experimental chemical compound is smelling pungent.",
          "B. The experimental chemical compound smells pungent.",
          "C. The compound has been smelling pungent currently.",
          "D. Smelling pungent is the compound today."
        ],
        "correctAnswer": "B. The experimental chemical compound smells pungent.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: ঘ্রাণ বা বৈশিষ্ট্য প্রকাশে 'smell' একটি Stative Verb, তাই Simple Tense (smells) সঠিক।",
        "hint": "Smell বৈশিষ্ট্য প্রকাশে Simple Tense হয়।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের মালিকানা নির্দেশক Stative Verb নিয়ম অনুযায়ী 'own' ভার্বটির সঠিক রূপ টাইপ করুন:",
        "question": "The sovereign wealth fund [input] (own) several renewable infrastructure projects worldwide.",
        "correctAnswer": "owns",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Own' মালিকানা প্রকাশ করে, তাই এর সাথে -ing হয় না; singular subject-এর সাথে 'owns' হবে।",
        "hint": "Own-এ ing হয় না, -s যুক্ত করুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের 'taste' ভার্বটির দ্বৈত ব্যবহার (দ্বৈত অর্থ) সংক্রান্ত সঠিক বাক্য চিহ্নিত করুন:",
        "question": "In which sentence is \"taste\" correctly functioning as a deliberate physical action in continuous form?",
        "options": [
          "A. The soup is tasting exquisitely spicy.",
          "B. The executive chef is tasting the sauce to evaluate the seasoning.",
          "C. Sugar is tasting sweet in all desserts.",
          "D. The dessert is tasting bitter to everyone."
        ],
        "correctAnswer": "B. The executive chef is tasting the sauce to evaluate the seasoning.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: রাঁধুনি যখন সক্রিয়ভাবে জিহ্বা দিয়ে স্বাদ পরীক্ষা করছেন, তখন তা Action Verb হিসেবে 'is tasting' হতে পারে।",
        "hint": "সক্রিয়ভাবে পরখ করার ক্ষেত্রে is tasting সঠিক।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের জ্ঞানীয় অবস্থা (Cognitive Stative Verb) নিয়ম অনুযায়ী 'understand' ভার্বের সঠিক রূপ লিখুন:",
        "question": "The international inspectors clearly [input] (understand) the gravity of the nuclear hazard.",
        "correctAnswer": "understand",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Understand' মানসিক ধারণা বোঝায়, এর সাথে Continuous হয় না। Inspectors (plural)-এর সাথে 'understand' হবে।",
        "hint": "Understand-এ কখনো -ing হয় না।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের 'appear' ভার্বের চেহারা বনাম আগমন অর্থ অনুযায়ী সঠিক Continuous প্রয়োগ কোনটি?",
        "question": "Select the sentence where \"appear\" is appropriately used in the continuous form:",
        "options": [
          "A. The diplomat is appearing honest and reliable.",
          "B. The renowned pianist is appearing live at Carnegie Hall tonight.",
          "C. The economic forecast is appearing bleak.",
          "D. It is appearing that inflation is falling."
        ],
        "correctAnswer": "B. The renowned pianist is appearing live at Carnegie Hall tonight.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: মঞ্চে উপস্থিত হওয়া বা পারফর্ম করা অর্থে 'appear' একটি Action Verb (is appearing)।",
        "hint": "মঞ্চে উপস্থিত হওয়া অর্থে is appearing সঠিক।"
      }
    ]
  },
  {
    "id": "l3-causative-verbs",
    "level": 3,
    "levelTitle": "Level 3: Verb Mechanics, Voice & Narration (ক্রিয়া, বাচ্য ও উক্তি পরিবর্তন)",
    "levelSubtitle": "অ্যাক্টিভ-প্যাসিভ, নারেশন ও উচ্চমানের লেখার রূপান্তর",
    "title": "Causative Verbs (Have, Make, Let, Get, Help)",
    "bengaliTitle": "প্রযোজক ক্রিয়া: অপরকে দিয়ে কাজ করানোর বিশেষ কাঠামো",
    "badge": "Structural Mastery",
    "estimatedMinutes": 25,
    "contextStory": "যখন আমরা নিজে কোনো কাজ না করে অন্য কাউকে দিয়ে করাই, তখন Causative Verbs ব্যবহার করা হয়। বাংলায় যেমন \"মা শিশুকে চাঁদ দেখাচ্ছেন\" বা \"আমি গাড়িটি মেরামত করিয়েছি।\" ইংরেজিতে Have, Make, Let, Get হলো প্রধান কজেটিভ ভার্ব। এদের পরে Base Form বসবে নাকি \"to + V1\" বসবে তা একটি সূক্ষ্ম ব্যাকরণগত নিয়ম।",
    "conceptBreakdown": [
      "Make (বাধ্য করা / করান): Subject + make + Person + Base Verb (V1)। যেমন: \"The strict tutor made him rewrite the essay।\" (কখনো \"to rewrite\" হবে না)।",
      "Have (দায়িত্ব দেওয়া / করানো): Subject + have + Person + Base Verb (V1)। যেমন: \"The architect had the builder modify the blueprint।\"",
      "Have Something Done (প্যাসিভ কজেটিভ): Subject + have/get + Object + Past Participle (V3)। যেমন: \"I had my car repaired\" (আমি গাড়ি মেরামত করিয়েছি)।",
      "Let (অনুমতি দেওয়া): Subject + let + Person + Base Verb (V1)। যেমন: \"They let students use scientific calculators।\" (কখনো \"to use\" হবে না)।",
      "Get (অনুরোধ বা রাজি করিয়ে করানো): Subject + get + Person + to + V1। যেমন: \"She got her colleague to proofread the thesis।\" (Get-এর ক্ষেত্রে to আবশ্যক)।",
      "Help: Subject + help + Person + (to) + V1 (to থাকা বা না থাকা উভয়ই শুদ্ধ)।"
    ],
    "formula": "Make/Have/Let + Person + V1 | Get + Person + to + V1 | Have/Get + Thing + V3",
    "examples": [
      {
        "en": "The research director had her assistants compile the survey statistics.",
        "bn": "গবেষণা পরিচালক তার সহকারীদের দিয়ে জরিপের পরিসংখ্যান সংকলন করিয়েছিলেন।",
        "context": "Had + Person (assistants) + Base Verb (compile)।"
      },
      {
        "en": "The department chair got the faculty to approve the curricular modifications.",
        "bn": "বিভাগীয় প্রধান শিক্ষকদের রাজি করিয়ে পাঠ্যক্রমের পরিবর্তন অনুমোদন করিয়েছিলেন।",
        "context": "Got + Person (faculty) + to approve (to + V1)।"
      },
      {
        "en": "The municipal government had the damaged bridges inspected by structural engineers.",
        "bn": "পৌর সরকার অবকাঠামো প্রকৌশলীদের দ্বারা ক্ষতিগ্রস্ত সেতুগুলো পরিদর্শন করিয়েছিল।",
        "context": "Had + Thing (bridges) + V3 (inspected) - Passive Causative।"
      },
      {
        "en": "Stringent health mandates made companies permit flexible remote work.",
        "bn": "কঠোর স্বাস্থ্যবিধি কোম্পানিগুলোকে নমনীয় দূরবর্তী কাজ অনুমোদন করতে বাধ্য করেছিল।",
        "context": "Made + Person + Base Verb (permit)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The teacher made us to write an essay.",
        "correct": "The teacher made us write an essay.",
        "reason": "Make-এর পর Person থাকলে \"to\" বসে না, সরাসরি Base Verb বসে।"
      },
      {
        "wrong": "I had my computer fix yesterday.",
        "correct": "I had my computer fixed yesterday.",
        "reason": "Have something done সূত্রে বস্তুটির পর V3 (fixed) বসবে।"
      },
      {
        "wrong": "She got her brother do her homework.",
        "correct": "She got her brother to do her homework.",
        "reason": "Get-এর পর Person থাকলে অবশ্যই \"to + V1\" বসবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Make সূত্র অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "The senior editor made the freelance journalist _______ the controversial article.",
        "options": [
          "A. to revise",
          "B. revise",
          "C. revising",
          "D. revised"
        ],
        "correctAnswer": "B. revise",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Make + Person-এর পর সরাসরি Base Verb (revise) বসে, \"to\" বসে না।",
        "hint": "Make + Person + V1 (no to)।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Get সূত্র (get + person + to + V1) অনুযায়ী ব্র্যাকেটের শব্দের সঠিক রূপ লিখুন:",
        "question": "The diplomat got the negotiators [input] (reopen) bilateral discussions.",
        "correctAnswer": "to reopen",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: Get + Person-এর পর অবশ্যই \"to + Base Verb\" (to reopen) বসে।",
        "hint": "Get-এর ক্ষেত্রে to + V1 বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের Passive Causative (Have something done) সূত্র অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "The executive committee had the regional financial audit _______ by an independent firm.",
        "options": [
          "A. conduct",
          "B. conducting",
          "C. conducted",
          "D. to conduct"
        ],
        "correctAnswer": "C. conducted",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Have + Thing (audit) + V3 (conducted) সূত্র মেনে প্যাসিভ কজেটিভে V3 বসে।",
        "hint": "Have + বস্তু + V3।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের Let সূত্র অনুযায়ী ব্র্যাকেটের ভার্ব রূপ লিখুন: \"Security regulations do not let visitors [input] (photograph) inside the facility.\"",
        "question": "Security regulations do not let visitors [input] inside the facility.",
        "correctAnswer": "photograph",
        "explanation": "Let + Person-এর পর \"to\" ছাড়া সরাসরি Base Verb (photograph) বসে।",
        "hint": "Let-এর পরে to বসে না, শুধু মূল verb বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "The professor \"made the pupils to complete\" the calculus assignment before noon.",
        "options": [
          "A. made the pupils to complete",
          "B. calculus assignment",
          "C. before noon",
          "D. No error"
        ],
        "correctAnswer": "A. made the pupils to complete",
        "explanation": "লেসনের নিয়ম ১ ও ভুল টেবিল অনুযায়ী: Make-এর পর \"to complete\" ভুল; সঠিক হবে \"made the pupils complete\"।",
        "hint": "Made-এর পর to complete হয় না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "প্যাসিভ কজেটিভ: \"I need to get my passport [input] (renew) before traveling abroad.\"",
        "question": "I need to get my passport [input] before traveling abroad.",
        "correctAnswer": "renewed",
        "explanation": "Get + object (passport) + V3 (renewed) সূত্র প্রযোজ্য।",
        "hint": "Passport-এর পর past participle (renewed) লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটি কজেটিভ নিয়মানুযায়ী সম্পূর্ণ নির্ভুল?",
        "question": "Identify the grammatically flawless causative sentence:",
        "options": [
          "A. She had her car washing at the garage.",
          "B. She had her car washed at the garage.",
          "C. She made her car washed at the garage.",
          "D. She got her car wash at the garage."
        ],
        "correctAnswer": "B. She had her car washed at the garage.",
        "explanation": "Have + Thing (car) + V3 (washed) সূত্রানুযায়ী গাড়িটি ধৌত করানো হয়েছিল।",
        "hint": "Had + বস্তু + V3 রূপটি সঠিক।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের Make + Bare Infinitive (বাধ্যতামূলক পজিটিভ) নিয়ম অনুযায়ী সঠিক গঠন বাছুন:",
        "question": "The strict customs officer made the passenger _______ the suspicious baggage item.",
        "options": [
          "A. opening",
          "B. open",
          "C. to open",
          "D. opened"
        ],
        "correctAnswer": "B. open",
        "explanation": "লেসনের সূত্র অনুযায়ী: Make + Person + Bare Infinitive (verb without to) ব্যবহৃত হয় (made the passenger open)।",
        "hint": "Make-এর পর verb-এর বেস ফর্ম বসে।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের Let + Bare Infinitive নিয়ম অনুযায়ী ব্র্যাকেটের ভার্বটির রূপ টাইপ করুন (to পরিহার করে):",
        "question": "The university authority let the independent researchers [input] (access) the secured digital archives.",
        "correctAnswer": "access",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Let'-এর পরে কোনো 'to' বসে না; সরাসরি Bare Infinitive (access) বসে।",
        "hint": "To ছাড়া সরাসরি access লিখুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের Passive Causative (Have + Object + V3) নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Which sentence expresses getting work completed by a third-party specialist?",
        "options": [
          "A. We had the architect designed our commercial headquarters.",
          "B. We had our commercial headquarters designed by an architect.",
          "C. We got the architect designing our building.",
          "D. We had designed our building with an architect."
        ],
        "correctAnswer": "B. We had our commercial headquarters designed by an architect.",
        "explanation": "লেসনের সূত্র অনুযায়ী: Have + Object + Past Participle (had the headquarters designed) সঠিক প্যাসিভ কজেটিভ।",
        "hint": "Have + object + V3 গঠন অনুসরণ করুন।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের Get + Person + To-Infinitive নিয়ম অনুযায়ী ব্র্যাকেটের রূপটি লিখুন (revise):",
        "question": "The doctoral supervisor got her research students [input] (revise) their methodology chapters.",
        "correctAnswer": "to revise",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Get' দ্বারা কাউকে প্ররোচিত করে কাজ করালে 'to-infinitive' (to revise) বসে।",
        "hint": "Get-এর পর to + verb বসে।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের 'Help' ভার্বের দ্বৈত গ্রহণযোগ্যতা অনুযায়ী কোনটি ব্যাকরণগতভাবে অশুদ্ধ?",
        "question": "Identify the grammatically unacceptable sentence with \"help\":",
        "options": [
          "A. The mentor helped her student formulate a thesis.",
          "B. The mentor helped her student to formulate a thesis.",
          "C. The mentor helped her student formulating a thesis.",
          "D. Regular physical exercises help reduce cardiovascular vulnerability."
        ],
        "correctAnswer": "C. The mentor helped her student formulating a thesis.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Help'-এর পর bare infinitive (formulate) বা to-infinitive (to formulate) উভয়ই শুদ্ধ; কিন্তু gerund (formulating) ভুল।",
        "hint": "Help-এর সাথে gerund (-ing) বসে না।"
      }
    ]
  },
  {
    "id": "l3-narration-direct-indirect",
    "level": 3,
    "levelTitle": "Level 3: Verb Mechanics, Voice & Narration (ক্রিয়া, বাচ্য ও উক্তি পরিবর্তন)",
    "levelSubtitle": "অ্যাক্টিভ-প্যাসিভ, নারেশন ও উচ্চমানের লেখার রূপান্তর",
    "title": "Direct vs Indirect Speech (Narration & Reported Speech)",
    "bengaliTitle": "উক্তি পরিবর্তন: প্রত্যক্ষ ও পরোক্ষ উক্তি (Narration / Reported Speech)",
    "badge": "Academic Quotation",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস রিডিংয়ে কোনো বিজ্ঞানী বা গবেষকের বক্তব্য উদ্ধৃত করা থাকে, যেমন: Dr. Smith noted that atmospheric emissions had surged over the past decade. আবার স্পিকিংয়ে অন্যের কথা বর্ণনা করতে হয়। অন্যের বলা বক্তব্যকে নিজের ভাষায় হুবহু না বলে নিখুঁত গ্রামারে পরিবর্তন করাই হলো Reported Speech। এতে Tense-এর ব্যাকশিফট (Backshift) এবং সর্বনামের রূপান্তর অত্যন্ত সংবেদনশীল।",
    "conceptBreakdown": [
      "Direct Speech: বক্তার মুখের হুবহু কথা ইনভার্টেড কমার (\"...\") মধ্যে থাকে (e.g. He said, \"I am studying today.\")।",
      "Indirect Speech: ইনভার্টেড কমা তুলে দিয়ে that বা if/whether দিয়ে সংযুক্ত করা (e.g. He said that he was studying that day.)।",
      "Tense Backshift Rules (Reporting verb past tense হলে): Present Simple -> Past Simple; Present Continuous -> Past Continuous; Present Perfect -> Past Perfect; Past Simple -> Past Perfect; Will -> Would; Can -> Could।",
      "Say বনাম Tell পার্থক্য: Say-এর পর কোনো Person Object থাকে না (He said that...), কিন্তু Tell-এর পর সরাসরি Person Object বসে (He told me that...)। \"Said to me\" বলা গেলেও \"said me\" মারাত্মক ভুল।",
      "Questions Reporting: Yes/No প্রশ্নে \"if\" বা \"whether\" বসে এবং প্রশ্নবোধক রূপটি সাধারণ Assertive (Subject + Verb) রূপ ধারণ করে (e.g. He asked me if I was ready, NOT if was I ready)।",
      "Time & Place Shifts: today -> that day; tomorrow -> the next day; yesterday -> the previous day; now -> then; here -> there; this -> that।"
    ],
    "formula": "Reporting Subject + said/told/stated + (that) + Subject + Past Backshift Verb",
    "examples": [
      {
        "en": "The lead climatologist announced that global mean temperatures had risen faster than projected.",
        "bn": "প্রধান জলবায়ুবিজ্ঞানী ঘোষণা করেছিলেন যে বৈশ্বিক গড় তাপমাত্রা অনুমানের চেয়ে দ্রুত বৃদ্ধি পেয়েছিল।",
        "context": "Present Perfect রূপান্তরিত হয়ে Past Perfect (had risen)।"
      },
      {
        "en": "She asked the examiner whether she could proceed to Part 2.",
        "bn": "তিনি পরীক্ষককে জিজ্ঞাসা করেছিলেন যে তিনি পার্ট ২-তে এগিয়ে যেতে পারেন কিনা।",
        "context": "Modal can রূপান্তরিত হয়ে could হয়েছে।"
      },
      {
        "en": "The spokesperson told reporters that the emergency meeting would convene the following day.",
        "bn": "মুখপাত্র সাংবাদিকদের বলেছিলেন যে জরুরি বৈঠকটি পরদিন অনুষ্ঠিত হবে।",
        "context": "Told + Person (reporters), will -> would, tomorrow -> the following day।"
      },
      {
        "en": "The analyst remarked that renewable subsidies were stabilizing household utility tariffs.",
        "bn": "বিশ্লেষক মন্তব্য করেছিলেন যে নবায়নযোগ্য ভর্তুকি গৃহস্থালি ইউটিলিটি শুল্ক স্থিতিশীল করছিল।",
        "context": "Present continuous ব্যাকশিফট হয়ে Past Continuous হয়েছে।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "She said me that she was exhausted.",
        "correct": "She told me that she was exhausted. (or: She said that she was exhausted.)",
        "reason": "Say-এর পরে সরাসরি Person Object বসে না; \"told me\" হবে অথবা \"said to me\" হবে।"
      },
      {
        "wrong": "The professor asked where was the laboratory.",
        "correct": "The professor asked where the laboratory was.",
        "reason": "Reported speech-এ প্রশ্নবোধক ক্রম থাকে না; Subject (laboratory) আগে আসবে, তারপর verb (was) বসবে।"
      },
      {
        "wrong": "He stated that he will come tomorrow.",
        "correct": "He stated that he would come the following day.",
        "reason": "Reporting verb past (stated) হওয়ায় will -> would এবং tomorrow -> the following day হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Tense Backshift নিয়ম অনুযায়ী সঠিক Reported Speech নির্বাচন করুন:",
        "question": "Direct: Maria said, \"I have completed all practice modules.\"",
        "options": [
          "A. Maria said that she has completed all practice modules.",
          "B. Maria said that she had completed all practice modules.",
          "C. Maria told that she completed all practice modules.",
          "D. Maria said she completes all practice modules."
        ],
        "correctAnswer": "B. Maria said that she had completed all practice modules.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Reporting verb অতীতে (said) থাকায় Direct-এর Present Perfect (\"have completed\") Indirect-এ Past Perfect (\"had completed\") হয়।",
        "hint": "Present Perfect রূপান্তরিত হয়ে Past Perfect (had + V3) হয়।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Say বনাম Tell নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (said / told):",
        "question": "The invigilator [input] the examinees that electronic wristwatches were strictly prohibited.",
        "correctAnswer": "told",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: সরাসরি Person Object (the examinees) থাকায় \"told\" বসবে। \"Said\"-এর পর সরাসরি object বসে না।",
        "hint": "Object (কাকে বলেছে) উল্লেখ থাকলে told বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ (Questions in Reported Speech) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Direct: The officer asked, \"Where do you reside?\"",
        "options": [
          "A. The officer asked where did I reside.",
          "B. The officer asked where I resided.",
          "C. The officer asked where do I resided.",
          "D. The officer asked whether I reside."
        ],
        "correctAnswer": "B. The officer asked where I resided.",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: Reported Speech-এ প্রশ্নবোধক রূপ সাধারণ Assertive (Subject + Verb) হয়ে যায়। তাই \"where I resided\" সঠিক।",
        "hint": "WH-শব্দের পর সরাসরি Subject আসে, did বসে না।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের Backshift নিয়ম অনুযায়ী \"will\" এর পরোক্ষ রূপ টাইপ করুন: \"He promised that he [input] submit the draft.\"",
        "question": "He promised that he [input] submit the draft.",
        "correctAnswer": "would",
        "explanation": "Reporting verb অতীতে (promised) থাকায় \"will\" পরিবর্তিত হয়ে \"would\" হবে।",
        "hint": "Will-এর past backshift রূপ হলো would।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের Time Shift নিয়ম অনুযায়ী \"tomorrow\"-এর সঠিক রূপ কোনটি?",
        "question": "Direct: \"We will release the report tomorrow,\" the director stated.",
        "options": [
          "A. the next day",
          "B. yesterday",
          "C. the previous day",
          "D. that day"
        ],
        "correctAnswer": "A. the next day",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: Indirect Speech-এ \"tomorrow\" পরিবর্তিত হয়ে \"the next day\" বা \"the following day\" হয়।",
        "hint": "Tomorrow পরিবর্তিত হয়ে the next day হয়।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "Yes/No প্রশ্নে সংযোজক অব্যয়টি লিখুন (if / whether): \"She asked [input] the results had been uploaded.\"",
        "question": "She asked [input] the results had been uploaded.",
        "correctAnswer": "whether",
        "explanation": "Yes/No প্রশ্ন পরোক্ষ উক্তিতে রূপান্তর করতে if বা whether ব্যবহৃত হয়।",
        "hint": "If বা whether ব্যবহার করুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "ভুল বাক্যটি চিহ্নিত করুন:",
        "question": "Which of the following sentences contains a reported speech error?",
        "options": [
          "A. He said me that the train had left.",
          "B. He told me that the train had left.",
          "C. He said that the train had left.",
          "D. He explained that the train had departed."
        ],
        "correctAnswer": "A. He said me that the train had left.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: \"said me\" মারাত্মক ভুল, সঠিক হবে \"told me\" অথবা \"said that\"।",
        "hint": "Said me বলা যায় না, told me বলতে হয়।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "লেসনের বৈজ্ঞানিক ও চিরন্তন সত্য অপরিবর্তিত রাখার নিয়ম অনুযায়ী সঠিক ইনডাইরেক্ট স্পিচ বাছুন:",
        "question": "Direct: The astrophysicist stated, \"Light travels faster than sound in a vacuum.\"",
        "options": [
          "A. The astrophysicist stated that light had traveled faster than sound in a vacuum.",
          "B. The astrophysicist stated that light travels faster than sound in a vacuum.",
          "C. The astrophysicist stated that light would travel faster than sound.",
          "D. The astrophysicist said light was travelling faster than sound."
        ],
        "correctAnswer": "B. The astrophysicist stated that light travels faster than sound in a vacuum.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: বৈজ্ঞানিক ও সার্বজনীন সত্যের ক্ষেত্রে Reporting Verb অতীতে থাকলেও Reported Speech-এর টেন্স পরিবর্তিত হয় না।",
        "hint": "বৈজ্ঞানিক সত্যে টেন্স পরিবর্তন হয় না।"
      },
      {
        "id": 9,
        "type": "fill-typing",
        "instruction": "লেসনের Modal রূপান্তর নিয়ম অনুযায়ী 'can' এর রূপান্তরিত ইনডাইরেক্ট রূপ টাইপ করুন:",
        "question": "The diplomat announced, \"Our sovereign delegation can resolve the crisis.\" -> The diplomat announced that their delegation [input] resolve the crisis.",
        "correctAnswer": "could",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Direct Speech-এর 'can' Indirect Speech-এ রূপান্তরিত হয়ে 'could' হয়।",
        "hint": "Can-এর Past রূপ could লিখুন।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের 'Suggest'-এর পর Gerund বা Subjunctive নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Which reported sentence uses the verb \"suggest\" with impeccable academic grammar?",
        "options": [
          "A. The consultant suggested to audit the financial ledger.",
          "B. The consultant suggested auditing the financial ledger.",
          "C. The consultant suggested them that audit the ledger.",
          "D. The consultant suggested to them audit the ledger."
        ],
        "correctAnswer": "B. The consultant suggested auditing the financial ledger.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Suggest'-এর পর সরাসরি to-infinitive বসে না; Gerund (suggested auditing) অথবা that-clause বসে।",
        "hint": "Suggest-এর পর gerund বা that-clause বসে।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের সময় নির্দেশক শব্দ রূপান্তর নিয়ম অনুযায়ী 'tomorrow' এর ইনডাইরেক্ট রূপ টাইপ করুন:",
        "question": "He said, \"The committee will convene tomorrow.\" -> He said that the committee would convene the [input] day.",
        "correctAnswer": "following",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Direct Speech-এর 'tomorrow' Indirect-এ 'the following day' বা 'the next day' হয়।",
        "hint": "Following শব্দটি টাইপ করুন।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের প্রশ্নবোধক বাক্যে 'if / whether' এবং Statement Word Order নিয়ম অনুযায়ী সঠিক রূপ কোনটি?",
        "question": "\"Did the committee approve the budget?\" -> She enquired _______.",
        "options": [
          "A. if did the committee approve the budget",
          "B. whether the committee had approved the budget",
          "C. that whether the committee approved the budget",
          "D. whether had the committee approved the budget"
        ],
        "correctAnswer": "B. whether the committee had approved the budget",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Yes/No প্রশ্নে whether/if বসে এবং বাক্যটি বর্ণনামূলক (Subject + Verb) রূপ ধারণ করে (had approved)।",
        "hint": "whether + subject + had + V3 রূপ হবে।"
      }
    ]
  },
  {
    "id": "l4-sentence-types-transformation",
    "level": 4,
    "levelTitle": "Level 4: Sentence Architecture & Clauses (বাক্য গঠন ও ক্লজ)",
    "levelSubtitle": "Simple, Compound, Complex ও Band 7.0+ বাক্য শৈলী",
    "title": "Sentence Structures: Simple, Compound, Complex & Transformation",
    "bengaliTitle": "বাক্যের গঠন ও রূপান্তর: সরল, যৌগিক ও মিশ্র/জটিল বাক্য (Simple, Compound, Complex)",
    "badge": "Syntax Architecture",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস এক্সামিনার যখন আপনার লেখার গ্রামাটিক্যাল রেঞ্জ (GRA) যাচাই করেন, তখন তিনি খোঁজেন আপনি কি শুধু ছোট ছোট বাক্য লিখছেন, নাকি যৌগিক ও জটিল বাক্যের ভারসাম্য তৈরি করতে পারছেন। সব বাক্য যদি \"This is bad. That is good\" হয়, তবে ব্যান্ড ৫-এর বেশি পাওয়া সম্ভব নয়। আপনাকে জানতে হবে কখন দুটি বাক্যকে FANBOYS দিয়ে Compound করতে হয় এবং কখন Subordinating Conjunction দিয়ে Complex করতে হয়।",
    "conceptBreakdown": [
      "Simple Sentence: একটি মাত্র স্বাধীন ক্লজ (Independent Clause) যাতে একটি সাবজেক্ট এবং একটি ফাইনাইট ভার্ব থাকে (e.g. \"Renewable energy lowers carbon footprints.\")।",
      "Compound Sentence: দুটি স্বাধীন ক্লজ যা কোঅর্ডিনেটিং কনজাংশন (FANBOYS: For, And, Nor, But, Or, Yet, So) দিয়ে যুক্ত (e.g. \"Public transit is affordable, but many commuters still prefer private vehicles.\")। কমার পরে FANBOYS বসে।",
      "Complex Sentence: একটি স্বাধীন ক্লজ এবং অন্তত একটি নির্ভরশীল ক্লজ (Dependent Clause), যা although, because, since, while, whereas, if দিয়ে শুরু হয় (e.g. \"Although public transit is subsidized, service frequencies remain inadequate.\")।",
      "Compound-Complex Sentence: অন্তত দুটি স্বাধীন ক্লজ এবং এক বা একাধিক নির্ভরশীল ক্লজ (ব্যান্ড ৮+ এর প্রতীক)।",
      "Double Conjunction পরিহার: Although/Though-এর সাথে But বসে না; Because/Since-এর সাথে So বসে না।",
      "Comma রুল: Dependent Clause দিয়ে বাক্য শুরু হলে ক্লজের শেষে কমা (,) আবশ্যক। কিন্তু Independent Clause আগে বসলে সাধারণত কমা লাগে না।"
    ],
    "formula": "Complex: [Subordinator + Dependent Clause], [Independent Clause] | Compound: [Clause 1], [FANBOYS] [Clause 2]",
    "examples": [
      {
        "en": "While metropolitan populations expand exponentially, municipal infrastructure remains underfunded, which induces gridlock.",
        "bn": "যেহেতু মহানগরীর জনসংখ্যা নাটকীয়ভাবে বাড়ছে, ফলে পৌর অবকাঠামো অনুদানহীন থেকে যাচ্ছে, যা যানজটের সৃষ্টি করে।",
        "context": "Compound-Complex কাঠামোর নিখুঁত উদাহরণ।"
      },
      {
        "en": "Solar installations provide sustainable power, but initial capital outlays remain considerable.",
        "bn": "সৌর সংযোগ টেকসই বিদ্যুৎ সরবরাহ করে, কিন্তু প্রারম্ভিক পুঁজি ব্যয় বেশ উল্লেখযোগ্য থেকে যায়।",
        "context": "Compound sentence with \"but\"।"
      },
      {
        "en": "Because educational investments yield long-term societal benefits, governments should prioritize public schooling.",
        "bn": "যেহেতু শিক্ষায় বিনিয়োগ দীর্ঘমেয়াদী সামাজিক সুফল বয়ে আনে, তাই সরকারের উচিত সরকারি বিদ্যালয় শিক্ষাকে অগ্রাধিকার দেওয়া।",
        "context": "Complex sentence with \"Because\" (কমা সহ)।"
      },
      {
        "en": "Industrial automation fosters efficiency, yet it threatens blue-collar employment.",
        "bn": "শিল্প অটোমেশন কার্যকারিতা বাড়ায়, তবুও এটি কায়িক শ্রমের কর্মসংস্থানকে হুমকির মুখে ফেলে।",
        "context": "Compound sentence with \"yet\"।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Although industrial automation improves efficiency, but it causes job losses.",
        "correct": "Although industrial automation improves efficiency, it causes job losses.",
        "reason": "ইংরেজিতে \"Although\" ব্যবহার করলে সেই বাক্যে আবার \"but\" ব্যবহার করা মারাত্মক ভুল (Double Conjunction পরিহার করুন)।"
      },
      {
        "wrong": "Because traffic was heavy, so we arrived late.",
        "correct": "Because traffic was heavy, we arrived late.",
        "reason": "Because থাকলে কমার পরে so বসবে না।"
      },
      {
        "wrong": "He failed the exam, because he did not study.",
        "correct": "He failed the exam because he did not study.",
        "reason": "Because ক্লজ বাক্যের শেষে বসলে সাধারণত কমা বসানো অপ্রয়োজনীয়।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Double Conjunction পরিহার নিয়ম অনুযায়ী সঠিক বাক্যটি নির্বাচন করুন:",
        "question": "Identify the grammatically correct Complex Sentence:",
        "options": [
          "A. Though economic growth accelerated, but income disparity widened.",
          "B. Though economic growth accelerated, income disparity widened.",
          "C. Economic growth accelerated, but however income disparity widened.",
          "D. Because economic growth accelerated, so income disparity widened."
        ],
        "correctAnswer": "B. Though economic growth accelerated, income disparity widened.",
        "explanation": "লেসনের নিয়ম ৫ ও ভুল টেবিল অনুযায়ী: \"Though\" থাকলে কমার পরে \"but\" বসবে না।",
        "hint": "Though বা Although এর সাথে কখনো But বসে না।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের FANBOYS নিয়ম অনুযায়ী বৈপরীত্য প্রকাশে সঠিক কোঅর্ডিনেটিং কনজাংশনটি লিখুন (but / so):",
        "question": "Renewable technologies have matured significantly, [input] adoption rates remain uneven.",
        "correctAnswer": "but",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: দুটি স্বাধীন ক্লজের মাঝে বৈপরীত্য প্রকাশ করতে কমার পরে \"but\" বা \"yet\" বসে।",
        "hint": "বৈপরীত্য প্রকাশে but বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের সংজ্ঞা অনুযায়ী নিচের কোনটি Compound Sentence?",
        "question": "Which of the following sentences is a Compound Sentence?",
        "options": [
          "A. The researcher examined the evidence and submitted the dissertation.",
          "B. The researcher examined the evidence, and she submitted the dissertation.",
          "C. Although she examined the evidence, she made an error.",
          "D. Examining the evidence carefully, she found the truth."
        ],
        "correctAnswer": "B. The researcher examined the evidence, and she submitted the dissertation.",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: দুটি সম্পূর্ণ স্বাধীন ক্লজ (Independent Clauses) কমা + FANBOYS (and) দিয়ে যুক্ত হলে তা Compound Sentence। A-তে একটি মাত্র ক্লজ রয়েছে (compound predicate)।",
        "hint": "দুটি আলাদা সাবজেক্ট ও ভার্ব কমা + and দিয়ে যুক্ত হলে Compound হয়।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Double Conjunction ভুল সংশোধন: \"Because taxes were increased, so consumers reduced spending.\" (অপ্রয়োজনীয় শব্দটি বাদ দিয়ে কমার পরের শব্দটি লিখুন):",
        "question": "Because taxes were increased, [input] reduced spending.",
        "correctAnswer": "consumers",
        "explanation": "Because থাকায় \"so\" সম্পূর্ণ বাদ যাবে এবং কমার পরে সরাসরি সাবজেক্ট \"consumers\" আসবে।",
        "hint": "Because থাকলে so বসবে না।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের কমা রুল (Comma Rule) অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Choose the sentence with correct punctuation:",
        "options": [
          "A. If government subsidies decline solar installations will decrease.",
          "B. If government subsidies decline, solar installations will decrease.",
          "C. Solar installations will decrease, if government subsidies decline.",
          "D. If, government subsidies decline solar installations will decrease."
        ],
        "correctAnswer": "B. If government subsidies decline, solar installations will decrease.",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: Dependent Clause (If government subsidies decline) দিয়ে বাক্য শুরু হলে ক্লজের শেষে কমা (,) আবশ্যক।",
        "hint": "If-ক্লজ আগে বসলে কমা আবশ্যক।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "তুলনা ও বৈপরীত্য প্রকাশ করতে ব্র্যাকেটের সাবঅর্ডিনেটরটি লিখুন (whereas / and):",
        "question": "Developed nations possess robust digital infrastructure, [input] developing economies face severe connectivity gaps.",
        "correctAnswer": "whereas",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: দুই পক্ষের তুলনামূলক বৈপরীত্য প্রকাশে \"whereas\" বা \"while\" ব্যবহৃত হয়।",
        "hint": "তুলনামূলক বৈপরীত্যে whereas বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "নিচের বাক্যটি কোন প্রকারের গঠন প্রকাশ করে?",
        "question": "\"While solar capacity expanded, grid storage remained limited, so power shortages persisted.\"",
        "options": [
          "A. Simple Sentence",
          "B. Compound Sentence",
          "C. Complex Sentence",
          "D. Compound-Complex Sentence"
        ],
        "correctAnswer": "D. Compound-Complex Sentence",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: এতে একটি নির্ভরশীল ক্লজ (While solar capacity expanded) এবং দুটি স্বাধীন ক্লজ \"so\" দিয়ে যুক্ত রয়েছে, যা Compound-Complex Sentence।",
        "hint": "একটি dependent এবং একাধিক independent ক্লজ থাকলে Compound-Complex হয়।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "ভুল অংশটি চিহ্নিত করুন:",
        "question": "Although the clinical trials were successful, \"yet the medicine was not approved\".",
        "options": [
          "A. Although",
          "B. trials were",
          "C. yet the medicine",
          "D. approved"
        ],
        "correctAnswer": "C. yet the medicine",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: Although-এর সাথে yet বা but বসানো Double Conjunction ভুল। \"yet\" বাদ দিতে হবে।",
        "hint": "Although-এর সাথে yet বসে না।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের Compound থেকে Complex বাক্যে রূপান্তর নিয়ম অনুযায়ী সঠিক বিকল্প বাছুন:",
        "question": "\"The budget was constrained, yet the research team developed a revolutionary battery.\" -> In complex form:",
        "options": [
          "A. Because the budget was constrained, the team developed a battery.",
          "B. Although the budget was constrained, the research team developed a revolutionary battery.",
          "C. The budget was constrained and the team developed a battery.",
          "D. Despite the team developed a battery, the budget was constrained."
        ],
        "correctAnswer": "B. Although the budget was constrained, the research team developed a revolutionary battery.",
        "explanation": "লেসনের রূপান্তর নিয়ম অনুযায়ী: বিপরীতমুখী Compound (yet)-কে Complex করতে 'Although / Even though' সাব-অর্ডিনেটিং কনজাংশন বসে।",
        "hint": "বিপরীত ভাব প্রকাশে Although ব্যবহার করুন।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের Comma Splice সংশোধন নিয়ম অনুযায়ী দুটি স্বাধীন ক্লজকে যুক্ত করতে সেমিকোলন টাইপ করুন:",
        "question": "The economic climate deteriorated rapidly [input] consequently, retail consumer confidence plunged.",
        "correctAnswer": ";",
        "explanation": "লেসনের বিরামচিহ্ন নিয়ম অনুযায়ী: দুটি স্বাধীন ক্লজের মাঝে 'consequently' থাকলে তার পূর্বে সেমিকোলন (;) আবশ্যক।",
        "hint": "সেমিকোলন চিহ্নটি (;) টাইপ করুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের Run-on বাক্য সংশোধন সংক্রান্ত সঠিক ব্যাকরণগত বাক্য নির্বাচন করুন:",
        "question": "Which of the following resolves the run-on sentence error accurately?",
        "options": [
          "A. The software crashed it lost all unsaved experimental parameters.",
          "B. The software crashed, it lost all unsaved experimental parameters.",
          "C. When the software crashed, it lost all unsaved experimental parameters.",
          "D. The software crashed so therefore lost unsaved parameters."
        ],
        "correctAnswer": "C. When the software crashed, it lost all unsaved experimental parameters.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Run-on বাক্যকে সাব-অর্ডিনেট ক্লজ (When...) বানিয়ে একটি পূর্ণাঙ্গ Complex বাক্যে পরিণত করা হয়েছে।",
        "hint": "When যুক্ত Complex বাক্যটি সঠিক।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের Simple বাক্য গঠন নিয়ম অনুযায়ী 'Despite' এর পর Preposition ছাড়া সঠিক শব্দ টাইপ করুন:",
        "question": "[input] the torrential monsoon rainfall, the relief helicopter landed securely.",
        "correctAnswer": "Despite",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Noun phrase (the torrential monsoon rainfall)-এর পূর্বে কোনো 'of' ছাড়া 'Despite' বসে।",
        "hint": "Despite শব্দটি টাইপ করুন।"
      }
    ]
  },
  {
    "id": "l4-complex-sentences-connectors",
    "level": 4,
    "levelTitle": "Level 4: Sentence Architecture & Clauses (বাক্য গঠন ও ক্লজ)",
    "levelSubtitle": "Simple, Compound, Complex ও Band 7.0+ বাক্য শৈলী",
    "title": "Advanced Subordinators & Connectors (Although, Whereas, Despite)",
    "bengaliTitle": "উন্নত সংযোজক অব্যয়: Although, Whereas, Despite এবং Cohesion",
    "badge": "Band 7.5+ Connectors",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস রাইটিং টাস্ক ২-এ পরীক্ষার্থীদের সবচেয়ে সাধারণ ভুল হলো Although এবং Despite-এর ব্যাকরণগত গঠন গুলিয়ে ফেলা। যেমন অনেকেই লেখেন: \"Despite it rained, we went out\" অথবা \"Despite of the rain।\" দুটোই সম্পূর্ণ ভুল! Despite/In spite of-এর পর Noun Phrase বা Gerund বসে, কিন্তু Although/Even though-এর পর পূর্ণাঙ্গ Clause (Subject + Verb) বসে।",
    "conceptBreakdown": [
      "Although / Even though + Clause (Subject + Verb): বৈপরীত্য প্রকাশে পূর্ণাঙ্গ বাক্যাংশের সাথে বসে (e.g. \"Although the legislation was controversial, parliament ratified it\")।",
      "Despite / In spite of + Noun Phrase / Verb-ing: কোনো পূর্ণাঙ্গ ক্লজ ছাড়া সরাসরি Noun বা Gerund-এর সাথে বসে (e.g. \"Despite the heavy expenditure, the outcome was negligible\")। \"Despite of\" বলে কোনো শব্দ নেই!",
      "Despite the fact that + Clause: যদি Despite-এর পর পূর্ণাঙ্গ ক্লজ দিতেই হয়, তবে \"the fact that\" যোগ করতে হবে (e.g. \"Despite the fact that he prepared diligently, he felt anxious\")।",
      "Whereas / While: দুটি বিষয়ের তুলনামূলক পার্থক্য ও বৈপরীত্য প্রকাশে ব্যবহৃত হয় (e.g. \"Urban wages surged, whereas rural earnings stagnated\")।",
      "Because (Conjunction) বনাম Because of (Preposition): Because + Clause (Subject + Verb); Because of + Noun Phrase (e.g. \"Because it was raining\" vs \"Because of the rain\")।"
    ],
    "formula": "Although + [S + V], [S + V] | Despite + [Noun Phrase / V-ing], [S + V]",
    "examples": [
      {
        "en": "Despite facing stringent trade embargoes, the domestic economy expanded moderately.",
        "bn": "কঠোর বাণিজ্য নিষেধাজ্ঞা সত্ত্বেও অভ্যন্তরীণ অর্থনীতি মাঝারিভাবে বৃদ্ধি পেয়েছিল।",
        "context": "Despite + Gerund phrase (facing stringent trade embargoes)।"
      },
      {
        "en": "Although academic credentials remain essential, practical industry competence is increasingly prioritized.",
        "bn": "যদিও প্রাতিষ্ঠানিক সনদ অপরিহার্য থেকে যায়, তথাপি ব্যবহারিক দক্ষতা ক্রমশ অগ্রাধিকার পাচ্ছে।",
        "context": "Although + Clause (credentials remain essential)।"
      },
      {
        "en": "Traditional retail footfall plummeted, whereas e-commerce revenues surged exponentially.",
        "bn": "প্রথাগত খুচরা বিক্রির ক্রেতা সমাগম হ্রাস পেয়েছিল, পক্ষান্তরে ই-কমার্স রাজস্ব নাটকীয়ভাবে বৃদ্ধি পেয়েছিল।",
        "context": "Whereas দ্বারা নিখুঁত তুলনামূলক বৈপরীত্য।"
      },
      {
        "en": "The project was halted because of severe budgetary deficits.",
        "bn": "তীব্র বাজেট ঘাটতির কারণে প্রকল্পটি স্থগিত করা হয়েছিল।",
        "context": "Because of + Noun phrase (severe budgetary deficits)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Despite of the rain, they continued playing.",
        "correct": "Despite the rain, they continued playing. (or: In spite of the rain)",
        "reason": "Despite-এর সাথে কখনো \"of\" বসে না; \"In spite of\" বললে of বসবে।"
      },
      {
        "wrong": "Despite he was exhausted, he completed the test.",
        "correct": "Although he was exhausted, he completed the test. (or: Despite being exhausted)",
        "reason": "Despite-এর পর সরাসরি Subject + Verb ক্লজ বসে না।"
      },
      {
        "wrong": "Because of the weather was severe, schools closed.",
        "correct": "Because the weather was severe, schools closed.",
        "reason": "পূর্ণাঙ্গ ক্লজের আগে Because বসে, Because of নয়।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের সূত্র অনুযায়ী সঠিক সংযোজক অব্যয়টি নির্বাচন করুন:",
        "question": "_______ the implementation of stringent austerity measures, the sovereign debt crisis worsened.",
        "options": [
          "A. Although",
          "B. Despite",
          "C. Even though",
          "D. Whereas"
        ],
        "correctAnswer": "B. Despite",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: \"the implementation of...\" একটি Noun Phrase (কোনো Finite Verb নেই), তাই Noun Phrase-এর পূর্বে \"Despite\" বা \"In spite of\" বসে।",
        "hint": "Noun Phrase-এর আগে Despite বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী সঠিক শব্দ লিখুন (Despite নাকি In spite of): \"The expedition persevered [input] of severe blizzards.\"",
        "question": "The expedition persevered [input] of severe blizzards.",
        "correctAnswer": "in spite",
        "explanation": "লেসনের ব্যাখ্যা অনুযায়ী: \"Of\" থাকলে \"in spite\" বসবে। Despite-এর সাথে \"of\" বসে না।",
        "hint": "In spite of হয়, despite of হয় না।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ (Although + Clause) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the grammatically accurate sentence:",
        "options": [
          "A. Despite the algorithm was complex, it yielded rapid predictions.",
          "B. Although the algorithm was complex, it yielded rapid predictions.",
          "C. Although of the algorithm complexity, it yielded rapid predictions.",
          "D. Even though of the complex algorithm, it worked."
        ],
        "correctAnswer": "B. Although the algorithm was complex, it yielded rapid predictions.",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: \"the algorithm was complex\" একটি পূর্ণাঙ্গ ক্লজ (Subject + Verb), তাই এর পূর্বে \"Although\" বা \"Even though\" বসে।",
        "hint": "পূর্ণাঙ্গ ক্লজের পূর্বে Although বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের তুলনামূলক বৈপরীত্য নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (whereas / because):",
        "question": "Wind energy generation requires vast land areas, [input] nuclear plants occupy compact footprints.",
        "correctAnswer": "whereas",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: দুটি ভিন্ন বিষয়ের তুলনামূলক পার্থক্য দেখাতে \"whereas\" বসে।",
        "hint": "তুলনামূলক পার্থক্য প্রকাশে whereas বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ (Because vs Because of) অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "The flight was grounded _______ dense atmospheric fog.",
        "options": [
          "A. because",
          "B. because of",
          "C. since of",
          "D. as for"
        ],
        "correctAnswer": "B. because of",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"dense atmospheric fog\" একটি Noun Phrase, তাই এর পূর্বে Prepositional Phrase \"because of\" বসবে।",
        "hint": "Noun Phrase-এর পূর্বে because of বসে।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "Despite-এর পর পূর্ণাঙ্গ ক্লজ যোগ করতে কোন তিনটি শব্দ যুক্ত করতে হয়? \"Despite [input] the legislation was contested, it passed.\"",
        "question": "Despite [input] the legislation was contested, it passed.",
        "correctAnswer": "the fact that",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Despite-এর পর ক্লজ বসাতে হলে \"the fact that\" যুক্ত করতে হয়।",
        "hint": "the fact that লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "ভুল অংশ চিহ্নিত করুন:",
        "question": "The scientists continued their field surveys \"despite of the hostile weather conditions\".",
        "options": [
          "A. continued",
          "B. field surveys",
          "C. despite of the",
          "D. hostile weather"
        ],
        "correctAnswer": "C. despite of the",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: \"despite of\" ব্যাকরণগত ভুল; \"despite the\" অথবা \"in spite of the\" হতে হবে।",
        "hint": "Despite-এর সাথে of বসে না।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটি ব্যান্ড ৭.৫+ শৈলীতে সঠিক?",
        "question": "Identify the sentence with flawless academic register:",
        "options": [
          "A. While hydro power is renewable, construction of dams disrupts fluvial ecosystems.",
          "B. While hydro power is renewable but construction of dams disrupts ecosystems.",
          "C. In spite hydro power is renewable, dams disrupt ecosystems.",
          "D. Despite of renewable power, dams are harmful."
        ],
        "correctAnswer": "A. While hydro power is renewable, construction of dams disrupts fluvial ecosystems.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: While-এর ক্লজে কমার পরে but বসে না এবং বাক্যটি নির্ভুলভাবে গঠিত।",
        "hint": "While দিয়ে কমপ্লেক্স বাক্য গঠন করুন।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের In spite of বনাম Although নিয়ম অনুযায়ী সঠিক কানেক্টরটি বাছুন:",
        "question": "_______ the severe geopolitical volatility, international foreign direct investment increased by 4%.",
        "options": [
          "A. Although",
          "B. In spite of",
          "C. Even though",
          "D. Whereas"
        ],
        "correctAnswer": "B. In spite of",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Noun Phrase (the severe geopolitical volatility)-এর পূর্বে 'In spite of' বা 'Despite' বসে।",
        "hint": "Noun phrase থাকলে In spite of বসে।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের Cause-and-Effect নিয়ম অনুযায়ী Noun Phrase-এর পূর্বে 'Due to'-এর শূন্যস্থান পূর্ণ করুন:",
        "question": "[input] to rapid urbanization, natural wetland habitats have diminished significantly.",
        "correctAnswer": "Due",
        "explanation": "লেসনের নিয়ম অনুযায়ী: কারণ দর্শাতে Noun Phrase-এর সাথে 'Due to' ফ্রেজটি ব্যবহৃত হয়।",
        "hint": "Due শব্দটি লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের বিপরীতমুখী তুলনা (Concession / Contrast) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Select the sentence illustrating accurate formal comparative contrast:",
        "options": [
          "A. Developed economies consume massive energy whereas developing nations produce raw materials.",
          "B. Developed economies consume energy despite developing nations produce raw materials.",
          "C. Developed economies consume energy because of developing nations produce raw materials.",
          "D. Whereas consume energy developed nations developing nations produce."
        ],
        "correctAnswer": "A. Developed economies consume massive energy whereas developing nations produce raw materials.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: দুটি ভিন্ন বিষয়ের সমান্তরাল তুলনা বা বৈপরীত্য প্রকাশে 'whereas' বা 'while' ক্লজ সঠিক।",
        "hint": "সমান্তরাল বৈপরীত্যে whereas বসে।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের অতিরিক্ত তথ্য সংযোজক কানেক্টর (Addition Connector) টাইপ করুন (Moreover / Furthermore):",
        "question": "The solar installation reduces operating costs. [input], it significantly lowers corporate carbon emissions.",
        "correctAnswer": "Furthermore",
        "explanation": "লেসনের ট্রানজিশন নিয়ম অনুযায়ী: পয়েন্ট আরও শক্তিশালী করতে 'Furthermore' বা 'Moreover' বসে।",
        "hint": "Furthermore শব্দটি লিখুন।"
      }
    ]
  },
  {
    "id": "l4-relative-clauses",
    "level": 4,
    "levelTitle": "Level 4: Sentence Architecture & Clauses (বাক্য গঠন ও ক্লজ)",
    "levelSubtitle": "Simple, Compound, Complex ও Band 7.0+ বাক্য শৈলী",
    "title": "Relative Clauses: Defining vs Non-Defining Mastery",
    "bengaliTitle": "রিলেটিভ ক্লজ: বর্ণনামূলক ও অপরিহার্য ক্লজের নিখুঁত ব্যবহার",
    "badge": "Complex Modifier",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস রাইটিংয়ে ব্যান্ড ৭-৮ পেতে হলে রিলেটিভ ক্লজ (Who, Which, That, Where, Whose) সঠিকভাবে ব্যবহার করা জানতে হবে। কিন্তু বেশিরভাগ শিক্ষার্থী কমা (Comma) ব্যবহারের নিয়ম জানে না। যেমন: \"The students who studied hard passed\" (Defining: শুধু যারা পড়েছিল তারাই পাস করেছে) বনাম \"My brother, who lives in London, is a doctor\" (Non-defining: অতিরিক্ত তথ্য, দুই পাশে কমা আবশ্যক)। Non-defining ক্লজে কখনো \"that\" ব্যবহার করা যায় না!",
    "conceptBreakdown": [
      "Defining Relative Clauses (অপরিহার্য ক্লজ): Noun-টিকে সুনির্দিষ্টভাবে চিহ্নিত করে। এই ক্লজ বাদ দিলে বাক্যের অর্থ অসম্পূর্ণ হয়ে যায়। এতে কোনো কমা (,) বসে না (e.g. \"The report that was published yesterday contains errors\")।",
      "Non-Defining Relative Clauses (অতিরিক্ত বর্ণনামূলক ক্লজ): ইতিমধ্যে নির্দিষ্ট কোনো ব্যক্তি বা বস্তু সম্পর্কে বাড়তি তথ্য দেয়। এই ক্লজের আগে ও পরে কমা (,) আবশ্যক (e.g. \"Oxford University, which was founded centuries ago, is prestigious\")।",
      "That বনাম Which নিয়ম: Defining ক্লজে বস্তু বোঝাতে which বা that উভয়ই ব্যবহার করা যায়। কিন্তু Non-defining ক্লজে (কমার পরে) কখনো \"that\" বসানো যাবে না, সর্বদা \"which\" বসাতে হবে!",
      "Preposition + Relative Pronoun (Formal Academic Style): অনানুষ্ঠানিক ভাষায় বলা হয়: \"the topic which I talked about।\" কিন্তু ব্যান্ড ৮+ ফরমাল ইংরেজিতে বলা হয়: \"the topic about which I spoke\" বা \"the methodology by which data was collected।\"",
      "Whose (মালিকানা): ব্যক্তি বা বস্তু উভয়ের মালিকানা প্রকাশে ব্যবহৃত হয় (e.g. \"The company whose shares plummeted announced insolvency\")।"
    ],
    "formula": "Defining: Noun + who/which/that + clause (NO comma) | Non-defining: Noun, which/who + clause, + main clause",
    "examples": [
      {
        "en": "The geothermal facility, which commenced commercial operations last year, supplies clean electricity.",
        "bn": "ভূ-তাপীয় কেন্দ্রটি, যা গত বছর বাণিজ্যিক কার্যক্রম শুরু করেছিল, পরিচ্ছন্ন বিদ্যুৎ সরবরাহ করে।",
        "context": "Non-defining clause (কমা সহ which, এখানে that নিষিদ্ধ)।"
      },
      {
        "en": "Individuals who exercise regularly exhibit superior cardiovascular resilience.",
        "bn": "যেসব ব্যক্তি নিয়মিত ব্যায়াম করেন তারা উচ্চতর কার্ডিওভাসকুলার সহনশীলতা প্রদর্শন করেন।",
        "context": "Defining relative clause (who exercise regularly - কমা ছাড়া)।"
      },
      {
        "en": "The laboratory framework within which the clinical trials were conducted adhered to ethical protocols.",
        "bn": "যে গবেষণাগার কাঠামোর মধ্যে ক্লিনিকাল ট্রায়ালগুলো পরিচালিত হয়েছিল তা নৈতিক প্রোটোকল মেনে চলেছিল।",
        "context": "Prepositional relative clause (within which)।"
      },
      {
        "en": "Students whose attendance falls below seventy percent are ineligible for final assessments.",
        "bn": "যেসব শিক্ষার্থীর উপস্থিতি সত্তর শতাংশের নিচে নেমে যায় তারা চূড়ান্ত মূল্যায়নের জন্য অযোগ্য।",
        "context": "Possessive relative pronoun (whose attendance)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Harvard University, that is located in the USA, is famous.",
        "correct": "Harvard University, which is located in the USA, is famous.",
        "reason": "Non-defining ক্লজে কমার পর কখনো \"that\" বসে না; সর্বদা \"which\" বসাতে হবে।"
      },
      {
        "wrong": "The person which called you was a doctor.",
        "correct": "The person who called you was a doctor.",
        "reason": "ব্যক্তি নির্দেশ করতে \"who\" বসে, \"which\" নয়।"
      },
      {
        "wrong": "The project, who was funded by the state, failed.",
        "correct": "The project, which was funded by the state, failed.",
        "reason": "বস্তু বা প্রকল্পের ক্ষেত্রে \"which\" বসে, \"who\" নয়।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের That বনাম Which নিয়ম অনুযায়ী সঠিক Relative Pronoun নির্বাচন করুন:",
        "question": "Mount Everest, _______ attracts hundreds of mountaineers annually, faces severe waste issues.",
        "options": [
          "A. that",
          "B. which",
          "C. who",
          "D. whose"
        ],
        "correctAnswer": "B. which",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Non-defining ক্লজে কমার পর কখনো \"that\" বসানো যায় না; সর্বদা \"which\" ব্যবহৃত হয়।",
        "hint": "কমার পরে that বসে না, which বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের মালিকানা নির্দেশক Relative Pronoun লিখুন (whose / whom):",
        "question": "Scholars [input] research papers achieve high citation impact receive institutional grants.",
        "correctAnswer": "whose",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: গবেষকদের গবেষণাপত্র (মালিকানা) বোঝাতে \"whose\" সঠিক।",
        "hint": "যার বা যাদের বোঝাতে whose বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৪ (Preposition + Relative) অনুযায়ী ব্যান্ড ৮+ ফরমাল বাক্য কোনটি?",
        "question": "Identify the sophisticated academic relative structure:",
        "options": [
          "A. The mechanism which the algorithm operates through is complex.",
          "B. The mechanism through which the algorithm operates is complex.",
          "C. The mechanism that through the algorithm operates is complex.",
          "D. The mechanism where through the algorithm operates is complex."
        ],
        "correctAnswer": "B. The mechanism through which the algorithm operates is complex.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: Preposition-কে Relative Pronoun-এর পূর্বে নিয়ে আসা (through which) উচ্চমানের একাডেমিক ফরম্যাট।",
        "hint": "Preposition + which রূপটি নির্বাচন করুন।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "ব্যক্তি সাবজেক্ট নির্দেশ করতে সঠিক Relative Pronoun লিখুন: \"Engineers [input] design solar grids need specialized training.\"",
        "question": "Engineers [input] design solar grids need specialized training.",
        "correctAnswer": "who",
        "explanation": "Engineers ব্যক্তিবাচক সাবজেক্ট, তাই \"who\" বা \"that\" বসবে।",
        "hint": "ব্যক্তি বোঝাতে who বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল বাক্যটি চিহ্নিত করুন:",
        "question": "Which of the following sentences contains a relative clause error?",
        "options": [
          "A. London, which is the capital of the UK, has a vast transit network.",
          "B. London, that is the capital of the UK, has a vast transit network.",
          "C. The city that never sleeps is New York.",
          "D. The professor whom I met was knowledgeable."
        ],
        "correctAnswer": "B. London, that is the capital of the UK, has a vast transit network.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: কমার পর \"that\" বসানো সম্পূর্ণ ব্যাকরণগত ভুল; \"which\" হতে হবে।",
        "hint": "কমার পরে that বসে না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "স্থান নির্দেশক Relative Adverb টাইপ করুন: \"The laboratory [input] the experiments took place was sterile.\"",
        "question": "The laboratory [input] the experiments took place was sterile.",
        "correctAnswer": "where",
        "explanation": "স্থান (laboratory) নির্দেশ করতে \"where\" বা \"in which\" ব্যবহৃত হয়।",
        "hint": "স্থান বোঝাতে where বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের Defining Clause কমা রুল অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Choose the sentence that correctly omits commas for a defining clause:",
        "options": [
          "A. The books, that were damaged, were discarded.",
          "B. The books that were damaged were discarded.",
          "C. The books which, were damaged were discarded.",
          "D. The books, that were damaged were discarded."
        ],
        "correctAnswer": "B. The books that were damaged were discarded.",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Defining ক্লজে কোনো কমা বসে না, কারণ এটি নির্দিষ্ট বইগুলোকে চিহ্নিত করার জন্য অপরিহার্য।",
        "hint": "Defining ক্লজে কমা বসে না।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "ব্যক্তি কর্ম (Objective Case) নির্দেশ করতে কোন Relative Pronoun-টি সবচেয়ে বিধিসম্মত?",
        "question": "The keynote speaker _______ the committee invited delivered an inspiring address.",
        "options": [
          "A. whom",
          "B. which",
          "C. whose",
          "D. what"
        ],
        "correctAnswer": "A. whom",
        "explanation": "লেসনের নিয়ম অনুযায়ী: ব্যক্তি কর্ম হিসেবে ফরমাল ইংরেজিতে \"whom\" সর্বাধিক গ্রহণযোগ্য।",
        "hint": "ব্যক্তি কর্ম হিসেবে whom বসে।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের Non-defining Relative Clause-এ কমা ব্যবহার এবং 'that' পরিহার নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Which sentence accurately adheres to non-defining relative clause punctuation and pronoun rules?",
        "options": [
          "A. The new campus library that cost $40 million, was designed by Norman Foster.",
          "B. The new campus library, which cost $40 million, was designed by Norman Foster.",
          "C. The new campus library which cost $40 million was designed by Norman Foster.",
          "D. The new campus library, that cost $40 million, was designed by Norman Foster."
        ],
        "correctAnswer": "B. The new campus library, which cost $40 million, was designed by Norman Foster.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Non-defining ক্লজে দুটি কমার মাঝে 'which' বসে; কমার পর কখনো 'that' বসে না।",
        "hint": "কমা দিয়ে ঘেরা ক্লজে which বসে, that নয়।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের Preposition + Relative Pronoun নিয়ম অনুযায়ী শূন্যস্থান পূরণ করুন (in which):",
        "question": "The legal framework [input] which multinational corporations operate must be transparent.",
        "correctAnswer": "in",
        "explanation": "লেসনের ফর্মুলা অনুযায়ী: 'Operate in a framework' থেকে আনুষ্ঠানিক রূপান্তর হিসেবে 'in which' ব্যবহৃত হয়।",
        "hint": "In প্রিপজিশনটি লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের সমগ্র পূর্ববর্তী ক্লজকে নির্দেশক 'which' নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Choose the sentence where \"which\" refers to the whole preceding situation rather than a single noun:",
        "options": [
          "A. The government raised carbon taxes, which angered heavy freight haulers.",
          "B. The taxes, which were high, angered haulers.",
          "C. The haulers which paid taxes were angry.",
          "D. Carbon taxes that were raised angered haulers."
        ],
        "correctAnswer": "A. The government raised carbon taxes, which angered heavy freight haulers.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: পুরো বাক্যটির ঘটনাকে (raising taxes) মডিফাই করতে কমার পর 'which' বসে।",
        "hint": "পুরো ঘটনার ফলাফল নির্দেশক কমা + which বাক্যটি দেখুন।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের Relative Pronoun ওমিশন (Omission) নিয়ম অনুযায়ী বাক্যে 'that/which' কি বাদ দেওয়া যায়? (yes/no):",
        "question": "\"The empirical data [that] we collected supported our original hypothesis.\" Can 'that' be omitted here? (yes/no): [input]",
        "correctAnswer": "yes",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Relative Pronoun যখন Object হিসেবে কাজ করে (we collected the data), তখন তা নির্দ্বিধায় বাদ দেওয়া যায়।",
        "hint": "Object ক্লজ হলে বাদ দেওয়া সম্ভব (yes লিখুন)।"
      }
    ]
  },
  {
    "id": "l4-gerund-vs-infinitive",
    "level": 4,
    "levelTitle": "Level 4: Sentence Architecture & Clauses (বাক্য গঠন ও ক্লজ)",
    "levelSubtitle": "Simple, Compound, Complex ও Band 7.0+ বাক্য শৈলী",
    "title": "Non-Finite Verbs: Gerunds vs Infinitives",
    "bengaliTitle": "অসমাপিকা ক্রিয়া: জেরান্ড (Verb+ing) বনাম ইনফিনিটিভ (To + Verb)",
    "badge": "Non-Finite Mastery",
    "estimatedMinutes": 20,
    "contextStory": "আমরা প্রায়ই দ্বিধায় পড়ি: \"I enjoy to swim\" বলব নাকি \"I enjoy swimming\"? \"He decided going\" বলব নাকি \"He decided to go\"? Verb যখন Noun-এর মতো কাজ করে, তখন কিছু নির্দিষ্ট শব্দের পর সবসময় Gerund (V-ing) বসে, আর কিছুর পর Infinitive (to + V1) বসে। এই পার্থক্য জানা না থাকলে প্রতি পাতায় ভুল হবে!",
    "conceptBreakdown": [
      "Gerund (Verb + ing as Noun): সাবজেক্ট বা অবজেক্ট হিসেবে কাজ করে (e.g. \"Exercising regularly improves longevity\")। নির্দিষ্ট কিছু Verbs-এর পর সবসময় Gerund বসে: enjoy, avoid, suggest, admit, consider, mind, postpone, recommend, deny।",
      "Infinitive (to + Base Verb): উদ্দেশ্য বা লক্ষ্য বোঝাতে ব্যবহৃত হয় (e.g. \"He strives to achieve Band 8\")। নির্দিষ্ট Verbs-এর পর সবসময় Infinitive বসে: agree, decide, hope, manage, promise, refuse, plan, offer, attempt।",
      "Preposition + Gerund রুল: যেকোনো Preposition-এর পর ক্রিয়াপদ এলে তা অবশ্যই Gerund (-ing) হবে (e.g. \"interested in learning\", \"responsible for managing\", \"without hesitating\")।",
      "Preposition \"To\" এর বিশেষ ট্র্যাপ: Look forward to, with a view to, be used to, object to-এর \"to\" হলো Preposition, তাই এদের পরে সর্বদা Verb-ing বসে (e.g. \"I look forward to meeting you\")।",
      "অর্থ পরিবর্তিত হয় এমন Verbs: Stop, Remember, Forget। যেমন: \"I stopped smoking\" (ধূমপান স্থায়ীভাবে ত্যাগ করেছি) বনাম \"I stopped to smoke\" (ধূমপান করার উদ্দেশ্যে পথ চলা থামিয়েছি)।"
    ],
    "formula": "Verb + Gerund (e.g. \"avoid making mistakes\") OR Verb + Infinitive (e.g. \"refuse to compromise\")",
    "examples": [
      {
        "en": "Economists recommend investing in renewable solar infrastructure instead of continuing reliance on coal.",
        "bn": "অর্থনীতিবিদরা কয়লার ওপর নির্ভরতা অব্যাহত রাখার পরিবর্তে নবায়নযোগ্য সৌর অবকাঠামোয় বিনিয়োগ করার পরামর্শ দেন।",
        "context": "Recommend-এর পর Gerund (investing) এবং Preposition (of)-এর পর Gerund (continuing)।"
      },
      {
        "en": "The municipal government decided to implement strict congestion pricing downtown.",
        "bn": "পৌর সরকার ডাউনটাউনে কঠোর কনজেশন প্রাইসিং কার্যকর করার সিদ্ধান্ত নিয়েছে।",
        "context": "Decide-এর পর Infinitive (to implement)।"
      },
      {
        "en": "Researchers succeeded in isolating the active viral compound.",
        "bn": "গবেষকেরা সক্রিয় ভাইরাল যৌগটি পৃথক করতে সফল হয়েছিলেন।",
        "context": "Preposition (in)-এর পর Gerund (isolating)।"
      },
      {
        "en": "Candidates look forward to receiving their verified Test Report Forms.",
        "bn": "পরীক্ষার্থীরা তাদের যাচাইকৃত টেস্ট রিপোর্ট ফর্ম পাওয়ার জন্য উন্মুখ হয়ে অপেক্ষা করেন।",
        "context": "\"Look forward to\"-এর পর Gerund (receiving)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "She is looking forward to meet you.",
        "correct": "She is looking forward to meeting you.",
        "reason": "\"Look forward to\"-এর \"to\" হলো Preposition, তাই এর পরে Verb+ing (meeting) হবে।"
      },
      {
        "wrong": "I avoided to talk with the interviewer.",
        "correct": "I avoided talking with the interviewer.",
        "reason": "Avoid শব্দের পর সর্বদা Gerund (talking) বসে, Infinitive নয়।"
      },
      {
        "wrong": "He stopped to smoke last year because of health issues.",
        "correct": "He stopped smoking last year because of health issues.",
        "reason": "স্থায়ীভাবে কোনো কাজ ত্যাগ করা বোঝাতে Gerund (smoking) বসে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Preposition + Gerund নিয়ম অনুযায়ী সঠিক রূপ নির্বাচন করুন:",
        "question": "Government officials succeeded in _______ the escalating inflation rate.",
        "options": [
          "A. to curb",
          "B. curbing",
          "C. curbed",
          "D. curb"
        ],
        "correctAnswer": "B. curbing",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: \"Succeed in\"-এ \"in\" একটি Preposition, আর Preposition-এর ঠিক পরে Verb আসলে তা অবশ্যই Gerund (-ing) হবে।",
        "hint": "Preposition-এর পরের Verb সর্বদা Gerund (-ing) হয়।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের \"Look forward to\" ট্র্যাপ নিয়ম অনুযায়ী ব্র্যাকেটের শব্দের সঠিক রূপ লিখুন:",
        "question": "We look forward to [input] (collaborate) with your esteemed university.",
        "correctAnswer": "collaborating",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"Look forward to\"-এর \"to\" হলো Preposition, তাই এর পরে Gerund \"collaborating\" বসবে।",
        "hint": "Look forward to-এর পর verb-এর সাথে -ing যোগ করুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ (Verbs followed by Gerund) অনুযায়ী সঠিক রূপ কোনটি?",
        "question": "The committee considered _______ the research grant application.",
        "options": [
          "A. to postpone",
          "B. postponing",
          "C. postpone",
          "D. postponed"
        ],
        "correctAnswer": "B. postponing",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Consider শব্দের পর সর্বদা Gerund (-ing) রূপ \"postponing\" বসে।",
        "hint": "Consider-এর পর Gerund বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ২ (Verbs followed by Infinitive) অনুযায়ী \"refuse\"-এর পর সঠিক রূপ লিখুন: \"They refused [input] (compromise) on quality.\"",
        "question": "They refused [input] on quality.",
        "correctAnswer": "to compromise",
        "explanation": "Refuse শব্দের পর সর্বদা Infinitive (to compromise) বসে।",
        "hint": "to + V1 লিখুন।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের Stop-এর অর্থভেদ নিয়ম অনুযায়ী ধূমপান স্থায়ীভাবে ত্যাগ করার সঠিক বাক্য কোনটি?",
        "question": "Choose the sentence that means permanently quitting the habit:",
        "options": [
          "A. He stopped to smoke on his doctor's advice.",
          "B. He stopped smoking on his doctor's advice.",
          "C. He stopped for smoke on his doctor's advice.",
          "D. He stopped smoke on his doctor's advice."
        ],
        "correctAnswer": "B. He stopped smoking on his doctor's advice.",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: কোনো অভ্যাস চিরতরে বন্ধ করা বোঝাতে \"stop + Gerund\" (stopped smoking) সঠিক।",
        "hint": "অভ্যাস বর্জনে stop + Gerund বসে।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "সঠিক Gerund রূপ লিখুন: \"He left the meeting without [input] (say) goodbye.\"",
        "question": "He left the meeting without [input] goodbye.",
        "correctAnswer": "saying",
        "explanation": "Without একটি Preposition, তাই এর পর Gerund \"saying\" বসবে।",
        "hint": "Preposition-এর পর verb+ing হয়।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "ভুল অংশ চিহ্নিত করুন:",
        "question": "The management decided \"postponing the product launch\" until next quarter.",
        "options": [
          "A. management",
          "B. decided",
          "C. postponing the product launch",
          "D. until next quarter"
        ],
        "correctAnswer": "C. postponing the product launch",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: Decide শব্দের পর Infinitive বসে; সঠিক হবে \"to postpone the product launch\"।",
        "hint": "Decide-এর পর to + V1 বসে।"
      },
      {
        "id": 8,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যে \"with a view to\" নিয়মানুযায়ী সঠিক রূপ ব্যবহৃত হয়েছে?",
        "question": "Identify the grammatically correct sentence:",
        "options": [
          "A. He attended the conference with a view to expanding his academic network.",
          "B. He attended the conference with a view to expand his academic network.",
          "C. He attended the conference with a view to expanded network.",
          "D. He attended with a view to for expanding network."
        ],
        "correctAnswer": "A. He attended the conference with a view to expanding his academic network.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"With a view to\"-এর পর সর্বদা Gerund (expanding) বসে।",
        "hint": "With a view to-এর পর verb-ing বসে।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের নির্দিষ্ট কিছু Verb-এর পর শুধুমাত্র Gerund বসার নিয়ম অনুযায়ী সঠিক বিকল্প বাছুন:",
        "question": "To prevent cross-contamination, laboratory technicians strictly avoid _______ cell cultures directly.",
        "options": [
          "A. to touch",
          "B. touching",
          "C. touch",
          "D. touched"
        ],
        "correctAnswer": "B. touching",
        "explanation": "লেসনের তালিকা অনুযায়ী: 'Avoid'-এর পর আবশ্যিকভাবে Gerund (touching) বসে।",
        "hint": "Avoid-এর সাথে Gerund (-ing) বসে।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "লেসনের নির্দিষ্ট Verb-এর পর শুধুমাত্র To-Infinitive বসার নিয়ম অনুযায়ী ব্র্যাকেটের শব্দটির সঠিক রূপ লিখুন:",
        "question": "The consortium decided [input] (postpone) the pipeline installation until environmental clearance was granted.",
        "correctAnswer": "to postpone",
        "explanation": "লেসনের তালিকা অনুযায়ী: 'Decide'-এর পর সর্বদা To-infinitive (to postpone) বসে।",
        "hint": "to + verb বেস ফর্ম লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের 'Stop to do' বনাম 'Stop doing' অর্থ পরিবর্তন নিয়ম অনুযায়ী সঠিক ব্যাখ্যা সম্বলিত বাক্য কোনটি?",
        "question": "What does \"The exhausted pilot stopped to drink some water\" mean?",
        "options": [
          "A. The pilot quit drinking water permanently.",
          "B. The pilot paused his primary journey in order to drink water.",
          "C. The pilot refused the water offered by the attendant.",
          "D. The pilot spilled the water on the aircraft controls."
        ],
        "correctAnswer": "B. The pilot paused his primary journey in order to drink water.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Stop to do' অর্থ কোনো উদ্দেশ্য পূরণের জন্য চলমান কাজ কিছুক্ষণের জন্য থামানো।",
        "hint": "উদ্দেশ্যমূলক বিরতি বোঝায় stop to do।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের Preposition-এর পর Gerund বসার নিয়ম অনুযায়ী 'look forward to' এর পর 'meet' এর সঠিক রূপ লিখুন:",
        "question": "The committee is looking forward to [input] (meet) the delegation tomorrow.",
        "correctAnswer": "meeting",
        "explanation": "লেসনের কমন মিসটেক অনুযায়ী: 'Looking forward to'-তে 'to' একটি Preposition, তাই এরপর Gerund (meeting) আবশ্যক।",
        "hint": "To-এর পর gerund (meeting) লিখুন।"
      }
    ]
  },
  {
    "id": "l5-subject-verb-agreement",
    "level": 5,
    "levelTitle": "Level 5: Precision, Agreement & Inquiry (নিখুঁত ব্যাকরণ ও জিজ্ঞাসা)",
    "levelSubtitle": "সাবজেক্ট-ভার্ব এগ্রিমেন্ট, প্রেপোজিশন ও কমন ভুল দূরীকরণ",
    "title": "Subject-Verb Agreement (The #1 Grammatical Error)",
    "bengaliTitle": "কর্তা ও ক্রিয়ার সঙ্গতি: আইএলটিএস পরীক্ষার্থীদের এক নম্বর ভুলের সমাধান",
    "badge": "Accuracy Milestone",
    "estimatedMinutes": 25,
    "contextStory": "আইএলটিএস পরীক্ষকদের মতে, শিক্ষার্থীদের লেখায় সবচেয়ে বেশি যে ভুলটি দেখা যায় তা হলো Subject-Verb Agreement। যখন একটি বাক্যে Subject এবং Verb-এর মাঝে বড় Prepositional Phrase বা Relative Clause ঢুকে যায়, তখন শিক্ষার্থীরা বিভ্রান্ত হয়ে পাশের শব্দের সাথে Verb মিলিয়ে ফেলে। যেমন: \"The quality of the research papers were high\" (ভুল! আসল সাবজেক্ট হলো quality, যা একবচন, তাই \"was high\" হবে)।",
    "conceptBreakdown": [
      "Intervening Prepositional Phrases: Subject এবং Verb-এর মাঝের অংশ (of, with, in, along with, as well as) আসল সাবজেক্টকে পরিবর্তন করতে পারে না। আসল কর্তাই Verb নির্ধারণ করে (e.g. \"The diversity of species is remarkable\")।",
      "Along with, As well as, In addition to, Together with: এগুলো Conjunction নয়; এদের আগের প্রথম সাবজেক্ট অনুযায়ী Verb নির্ধারিত হয় (e.g. \"The professor, along with her doctoral candidates, is attending the summit\")।",
      "Either...or / Neither...nor / Not only...but also: এদের ক্ষেত্রে শূন্যস্থানের সবচেয়ে নিকটবর্তী (দ্বিতীয়) সাবজেক্ট অনুযায়ী Verb নির্ধারিত হয় (e.g. \"Neither the tutor nor the students were satisfied\")।",
      "Each, Every, Either, Neither, Everyone, Nobody: এগুলো সর্বদা ব্যাকরণগতভাবে Singular এবং একবচন Verb গ্রহণ করে (e.g. \"Each of the participants was awarded a certificate\")।",
      "A number of বনাম The number of: \"A number of + Plural Noun\" এর পর Plural Verb বসে (অর্থ: অনেকগুলো, e.g. \"A number of studies show...\")। কিন্তু \"The number of + Plural Noun\" এর পর Singular Verb বসে (অর্থ: নির্দিষ্ট সংখ্যাটি, e.g. \"The number of commuters has escalated\")।",
      "Collective Nouns (দলগত বিশেষ্য): সমষ্টিগত একতাবদ্ধ কাজ বোঝালে Singular (e.g. \"The committee has reached consensus\")।"
    ],
    "formula": "Real Subject (Singular) + [intervening phrase] + Singular Verb | Real Subject (Plural) + Plural Verb",
    "examples": [
      {
        "en": "The development of novel clean energy technologies requires substantial municipal capital.",
        "bn": "নতুন পরিচ্ছন্ন শক্তি প্রযুক্তির বিকাশে প্রচুর পৌর পুঁজির প্রয়োজন।",
        "context": "Subject হলো একবচন \"The development\", তাই verb হলো \"requires\"।"
      },
      {
        "en": "Neither the lead investigator nor the research assistants were aware of the algorithmic discrepancy.",
        "bn": "প্রধান গবেষক কিংবা গবেষণা সহকারী কেউই অ্যালগরিদমের অসঙ্গতি সম্পর্কে সচেতন ছিলেন না।",
        "context": "Neither...nor-এ নিকটবর্তী সাবজেক্ট \"research assistants\" (plural) অনুযায়ী \"were\"।"
      },
      {
        "en": "The number of electric vehicles registered nationwide has surged exponentially.",
        "bn": "দেশব্যাপী নিবন্ধিত বৈদ্যুতিক যানবাহনের সংখ্যা নাটকীয়ভাবে বৃদ্ধি পেয়েছে।",
        "context": "\"The number of\" এর সাথে Singular Verb (has surged)।"
      },
      {
        "en": "A number of prominent climatologists have cautioned against irreversible tipping points.",
        "bn": "বেশ কয়েকজন প্রখ্যাত জলবায়ুবিজ্ঞানী অপরিবর্তনীয় সন্ধিক্ষণ সম্পর্কে সতর্ক করেছেন।",
        "context": "\"A number of\" এর সাথে Plural Verb (have cautioned)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The quality of the agricultural products were deteriorating.",
        "correct": "The quality of the agricultural products was deteriorating.",
        "reason": "আসল সাবজেক্ট হলো \"The quality\" (Singular), তাই \"was\" হবে, products নয়।"
      },
      {
        "wrong": "The professor along with his students are arriving.",
        "correct": "The professor along with his students is arriving.",
        "reason": "Along with-এর পূর্বের প্রথম সাবজেক্ট \"The professor\" অনুযায়ী Singular Verb (is) হবে।"
      },
      {
        "wrong": "Each of the participants have completed the test.",
        "correct": "Each of the participants has completed the test.",
        "reason": "Each সর্বদা একবচন, তাই \"has\" হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ১ (Intervening Phrase) অনুযায়ী সঠিক Verb নির্বাচন করুন:",
        "question": "The proliferation of counterfeit medications across international borders _______ a grave public hazard.",
        "options": [
          "A. constitute",
          "B. constitutes",
          "C. constituting",
          "D. are constituting"
        ],
        "correctAnswer": "B. constitutes",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: বাক্যের আসল সাবজেক্ট হলো একবচন \"The proliferation\", তাই Singular Verb \"constitutes\" হবে (medications বা borders নয়)।",
        "hint": "Subject হলো The proliferation (একবচন)।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ৫ (The number of বনাম A number of) অনুযায়ী সঠিক Verb লিখুন (has / have):",
        "question": "The number of international applicants seeking asylum [input] escalated steadily.",
        "correctAnswer": "has",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"The number of\" সর্বদা Singular Verb গ্রহণ করে, তাই \"has\" সঠিক।",
        "hint": "The number of-এর সাথে Singular verb (has) বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (Neither...nor) অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Choose the sentence with correct subject-verb coordination:",
        "options": [
          "A. Neither the director nor the supervisors was present at the inquiry.",
          "B. Neither the director nor the supervisors were present at the inquiry.",
          "C. Neither the director nor the supervisors is present.",
          "D. Neither of the supervisors are here."
        ],
        "correctAnswer": "B. Neither the director nor the supervisors were present at the inquiry.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Neither...nor-এর ক্ষেত্রে নিকটবর্তী সাবজেক্ট \"supervisors\" (Plural) অনুযায়ী Plural Verb \"were\" বসবে।",
        "hint": "Nor-এর পরের নিকটবর্তী সাবজেক্ট অনুযায়ী verb নির্ধারিত হয়।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ২ (Along with / As well as) অনুযায়ী সঠিক Verb লিখুন (is / are): \"The prime minister, along with senior cabinet ministers, [input] arriving today.\"",
        "question": "The prime minister, along with senior cabinet ministers, [input] arriving today.",
        "correctAnswer": "is",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: \"along with\"-এর আগের প্রথম সাবজেক্ট \"The prime minister\" (Singular) অনুযায়ী \"is\" বসবে।",
        "hint": "Along with-এর পূর্বের প্রথম সাবজেক্ট অনুযায়ী verb বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৪ (Each / Every) অনুযায়ী সঠিক রূপ বাছাই করুন:",
        "question": "Each of the diagnostic clinical trials _______ conducted under rigorous oversight.",
        "options": [
          "A. was",
          "B. were",
          "C. have been",
          "D. are"
        ],
        "correctAnswer": "A. was",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"Each\" সর্বদা একবচন, তাই \"was\" হবে।",
        "hint": "Each সর্বদা একবচন।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "A number of-এর সঠিক Verb রূপ টাইপ করুন (has / have): \"A number of international scholars [input] confirmed attendance.\"",
        "question": "A number of international scholars [input] confirmed attendance.",
        "correctAnswer": "have",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"A number of\" বহুবচন অর্থ প্রকাশ করে, তাই Plural Verb \"have\" বসবে।",
        "hint": "A number of-এর সাথে have বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "The efficacy of the newly developed antiviral drugs \"were substantiated\" by clinical data.",
        "options": [
          "A. efficacy",
          "B. newly developed",
          "C. were substantiated",
          "D. clinical data"
        ],
        "correctAnswer": "C. were substantiated",
        "explanation": "আসল সাবজেক্ট \"The efficacy\" (Singular), তাই \"were substantiated\"-এর স্থলে \"was substantiated\" হবে।",
        "hint": "Efficacy একবচন, তাই was হবে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Everyone-এর সঠিক Verb রূপ লিখুন: \"Everyone in the advanced classes [input] (need) to submit an abstract.\"",
        "question": "Everyone in the advanced classes [input] to submit an abstract.",
        "correctAnswer": "needs",
        "explanation": "Everyone একবচন, তাই Present Simple-এ Verb-এর সাথে -s যুক্ত হয়ে \"needs\" হবে।",
        "hint": "Everyone-এর সাথে -s যুক্ত একবচন verb বসে।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটি ব্যাকরণগতভাবে সম্পূর্ণ নিখুঁত?",
        "question": "Identify the sentence with flawless subject-verb agreement:",
        "options": [
          "A. One of the main reasons for traffic accidents are reckless driving.",
          "B. One of the main reasons for traffic accidents is reckless driving.",
          "C. One of the reasons are reckless.",
          "D. Reasons for accident is reckless."
        ],
        "correctAnswer": "B. One of the main reasons for traffic accidents is reckless driving.",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: সাবজেক্ট হলো \"One\" (একবচন), তাই Verb হবে \"is\"।",
        "hint": "One of the ... এর আসল সাবজেক্ট হলো One (একবচন)।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের Either... or / Neither... nor (নিকটবর্তী কর্তা) নিয়ম অনুযায়ী সঠিক ভার্ব নির্বাচন করুন:",
        "question": "Neither the chief administrator nor the field inspectors _______ aware of the security breach.",
        "options": [
          "A. was",
          "B. were",
          "C. is",
          "D. has been"
        ],
        "correctAnswer": "B. were",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Neither... nor-এ ভার্ব তার নিকটবর্তী সাবজেক্ট অনুযায়ী নির্ধারিত হয়; 'inspectors' প্লুরাল তাই 'were' সঠিক।",
        "hint": "নিকটবর্তী সাবজেক্ট inspectors বহুবচন।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের 'As well as / Along with' ইন্টারভেনিং ফ্রেজ নিয়ম অনুযায়ী সঠিক ভার্ব রূপ (is/are) টাইপ করুন:",
        "question": "The principal researcher, along with five postdoctoral fellows, [input] arriving in Stockholm today.",
        "correctAnswer": "is",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Along with' যুক্ত ফ্রেজ মূল কর্তাকে পরিবর্তন করে না; মূল কর্তা 'The principal researcher' সিঙ্গুলার হওয়ায় 'is' হবে।",
        "hint": "মূল সাবজেক্ট researcher একবচন, তাই is লিখুন।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের 'A number of' বনাম 'The number of' নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Choose the grammatically faultless sentence:",
        "options": [
          "A. The number of international applicants have doubled this autumn.",
          "B. The number of international applicants has doubled this autumn.",
          "C. A number of applicants has withdrawn their credentials.",
          "D. The number of applicants were declining."
        ],
        "correctAnswer": "B. The number of international applicants has doubled this autumn.",
        "explanation": "লেসনের সূত্র অনুযায়ী: 'The number of' একক সংখ্যা নির্দেশ করায় Singular Verb (has doubled) গ্রহণ করে।",
        "hint": "The number of singular verb গ্রহণ করে।"
      },
      {
        "id": 13,
        "type": "fill-typing",
        "instruction": "লেসনের সমষ্টিবাচক পরিমাপ (Time, Distance, Money as single unit) নিয়ম অনুযায়ী সঠিক ভার্ব (is/are) লিখুন:",
        "question": "Ten million dollars [input] allocated for the oceanic desalination facility.",
        "correctAnswer": "is",
        "explanation": "লেসনের নিয়ম অনুযায়ী: নির্দিষ্ট পরিমাণ অর্থ বা দূরত্ব একটি অবিভাজ্য একক হিসেবে গণ্য হওয়ায় Singular Verb (is) বসে।",
        "hint": "একটি সামগ্রিক অঙ্ক হিসেবে singular verb (is) লিখুন।"
      },
      {
        "id": 14,
        "type": "mcq",
        "instruction": "লেসনের 'Each of / Every one of' নিয়ম অনুযায়ী সঠিক বিকল্প নির্বাচন করুন:",
        "question": "Each of the experimental clinical trials _______ monitored by independent bioethics observers.",
        "options": [
          "A. are rigorously",
          "B. is rigorously",
          "C. were rigorously",
          "D. have been rigorously"
        ],
        "correctAnswer": "B. is rigorously",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Each of'-এর পর Plural Noun থাকলেও মূল সাবজেক্ট 'Each' হওয়ায় সর্বদা Singular Verb (is) বসে।",
        "hint": "Each সর্বদা Singular Verb গ্রহণ করে।"
      }
    ]
  },
  {
    "id": "l5-prepositions-time-place",
    "level": 5,
    "levelTitle": "Level 5: Precision, Agreement & Inquiry (নিখুঁত ব্যাকরণ ও জিজ্ঞাসা)",
    "levelSubtitle": "সাবজেক্ট-ভার্ব এগ্রিমেন্ট, প্রেপোজিশন ও কমন ভুল দূরীকরণ",
    "title": "Prepositions of Time, Place & Dependent Prepositions",
    "bengaliTitle": "সময় ও স্থানের প্রেপোজিশন এবং ফিক্সড কলোকেশন মাস্টারক্লাস",
    "badge": "Collocation Precision",
    "estimatedMinutes": 25,
    "contextStory": "ইংরেজিতে কোনো শিক্ষার্থী কতটা দক্ষ তা যাচাই করার সবচেয়ে সহজ উপায় হলো Preposition-এর সঠিক ব্যবহার। অনেকেই বলেন: \"I arrived to London\" (ভুল! arrived in London), অথবা \"It depends of the situation\" (ভুল! depends on the situation)। ইংরেজিতে এমন শত শত ফিক্সড Dependent Preposition আছে যা মুখস্থ না থাকলে প্রতি লাইনে ভুল হবে।",
    "conceptBreakdown": [
      "Prepositions of Time: AT (নির্দিষ্ট সময়: at 5 PM, at midnight, at dawn); ON (দিন ও তারিখ: on Monday, on 15 August, on my birthday); IN (মাস, বছর, ঋতু, দশক, দীর্ঘ সময়: in July, in 2024, in summer, in the 21st century)।",
      "Prepositions of Place: AT (নির্দিষ্ট বিন্দু বা ঠিকানা: at the airport, at 42 Oxford Street); ON (পৃষ্ঠভাগ বা তল: on the table, on the second floor); IN (ত্রিমাত্রিক আবদ্ধ স্থান, শহর বা দেশ: in a room, in Dhaka, in Australia)।",
      "Dependent Prepositions with Verbs: Depend on, rely on, insist on, succeed in, believe in, participate in, prevent from, suffer from, complain about, approve of।",
      "Dependent Prepositions with Adjectives: Interested in, responsible for, capable of, aware of, accustomed to, addicted to, different from, similar to, good at।",
      "IELTS Writing Hotspot Collocations: \"An increase in\" (সংখ্যা বৃদ্ধি, e.g. an increase in prices), কিন্তু \"Increased by 15%\" (হার)। \"At the beginning of\" (শুরুতে) বনাম \"In the beginning\" (প্রথমে)।"
    ],
    "formula": "Time: AT (specific clock) | ON (days/dates) | IN (months/years/seasons)",
    "examples": [
      {
        "en": "The global summit convened in Paris on the fifteenth of November at precisely 09:00 AM.",
        "bn": "প্যারিসে ১৫ই নভেম্বর ঠিক সকাল ৯:০০ টায় বৈশ্বিক শীর্ষ সম্মেলন অনুষ্ঠিত হয়েছিল।",
        "context": "In Paris (শহর) + On 15th (তারিখ) + At 9:00 AM (নির্দিষ্ট সময়)।"
      },
      {
        "en": "Emerging economies depend heavily on multilateral climate assistance loans.",
        "bn": "উদীয়মান অর্থনীতিগুলো বহুস্তরীয় জলবায়ু সহায়তা ঋণের ওপর ব্যাপকভাবে নির্ভর করে।",
        "context": "Dependent preposition (depend on)।"
      },
      {
        "en": "The lead researcher was highly capable of interpreting ambiguous econometric indicators.",
        "bn": "প্রধান গবেষক দ্ব্যর্থক অর্থনীতিগত সূচক ব্যাখ্যায় অত্যন্ত দক্ষ ছিলেন।",
        "context": "Capable of + Gerund।"
      },
      {
        "en": "There was a substantial rise in consumer spending during the fourth quarter.",
        "bn": "চতুর্থ প্রান্তিকে ভোক্তা ব্যয়ে একটি উল্লেখযোগ্য বৃদ্ধি পরিলক্ষিত হয়েছিল।",
        "context": "\"A rise in\" + noun phrase।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "The success depends of your hard work.",
        "correct": "The success depends on your hard work.",
        "reason": "Depend-এর পর সর্বদা \"on\" বসে, \"of\" নয়।"
      },
      {
        "wrong": "She is very good in mathematics.",
        "correct": "She is very good at mathematics.",
        "reason": "কোনো বিষয়ে দক্ষতা বোঝাতে \"good at\" ব্যবহৃত হয়।"
      },
      {
        "wrong": "The seminar will take place in Monday.",
        "correct": "The seminar will take place on Monday.",
        "reason": "বার বা দিনের নামের পূর্বে সর্বদা \"on\" বসে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Dependent Preposition নিয়ম অনুযায়ী সঠিক প্রেপোজিশন নির্বাচন করুন:",
        "question": "Economic stabilization largely depends _______ the revitalization of export manufacturing.",
        "options": [
          "A. in",
          "B. on",
          "C. of",
          "D. for"
        ],
        "correctAnswer": "B. on",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Depend-এর পর সর্বদা ফিক্সড Dependent Preposition হিসেবে \"on\" বা \"upon\" বসে।",
        "hint": "Depend-এর সাথে on বসে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Time নিয়ম (দিন/তারিখ) অনুযায়ী শূন্যস্থানে সঠিক Preposition লিখুন:",
        "question": "The United Nations treaty was formally ratified [input] the twelfth of December.",
        "correctAnswer": "on",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: যেকোনো নির্দিষ্ট তারিখের আগে সর্বদা \"on\" বসে।",
        "hint": "তারিখের পূর্বে on বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের Adjective Collocation নিয়ম অনুযায়ী সঠিক বিকল্পটি নির্বাচন করুন:",
        "question": "The modern artificial intelligence model is capable _______ synthesizing complex data.",
        "options": [
          "A. to",
          "B. of",
          "C. for",
          "D. in"
        ],
        "correctAnswer": "B. of",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"Capable\"-এর পর সর্বদা ফিক্সড Preposition \"of\" বসে (capable of + Gerund)।",
        "hint": "Capable-এর সাথে of বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "দক্ষতা বোঝাতে Adjective Collocation লিখুন: \"He is exceptionally skilled [input] statistical modeling.\"",
        "question": "He is exceptionally skilled [input] statistical modeling.",
        "correctAnswer": "at",
        "explanation": "কোনো বিষয়ে বিশেষ দক্ষতা প্রকাশে \"good at\" বা \"skilled at\" ব্যবহৃত হয়।",
        "hint": "দক্ষতায় at বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের Place নিয়ম অনুযায়ী সঠিক বিকল্প নির্বাচন করুন:",
        "question": "The headquarters of the intergovernmental agency is located _______ Geneva.",
        "options": [
          "A. at",
          "B. in",
          "C. on",
          "D. into"
        ],
        "correctAnswer": "B. in",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: বড় শহর বা দেশের পূর্বে সর্বদা \"in\" বসে (in Geneva)।",
        "hint": "শহর বা দেশের পূর্বে in বসে।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "সঠিক Preposition লিখুন: \"Scientists prevented the experimental virus [input] escaping the bio-safety facility.\"",
        "question": "Scientists prevented the experimental virus [input] escaping the bio-safety facility.",
        "correctAnswer": "from",
        "explanation": "Prevent-এর পর ফিক্সড Dependent Preposition হলো \"from\" (prevent someone from doing something)।",
        "hint": "Prevent-এর সাথে from বসে।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "The university board strictly disapproved \"about the proposed tuition hike\".",
        "options": [
          "A. strictly",
          "B. disapproved about",
          "C. the proposed",
          "D. tuition hike"
        ],
        "correctAnswer": "B. disapproved about",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Disapprove-এর পর \"of\" বসে; \"disapproved of the proposed tuition hike\" সঠিক রূপ।",
        "hint": "Approve বা disapprove-এর সাথে of বসে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "লেসনের সাল বা বছর নিয়ম অনুযায়ী Preposition লিখুন: \"The industrial revolution accelerated [input] 1760.\"",
        "question": "The industrial revolution accelerated [input] 1760.",
        "correctAnswer": "in",
        "explanation": "সাল বা বছরের পূর্বে সর্বদা \"in\" বসে।",
        "hint": "সালের পূর্বে in বসে।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "আইএলটিএস রাইটিং কলোকেশন অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Identify the sentence with flawless academic preposition usage:",
        "options": [
          "A. There was an increase of 20% in unemployment between 2015 and 2020.",
          "B. Unemployment increased with 20% between 2015 and 2020.",
          "C. There was an increase in unemployment by 20% between 2015 and 2020.",
          "D. Both A and C are grammatically appropriate in academic writing."
        ],
        "correctAnswer": "D. Both A and C are grammatically appropriate in academic writing.",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: An increase in + Noun (in unemployment) এবং by/of 20% দিয়ে হার প্রকাশ উভয়ই বিধিসম্মত।",
        "hint": "Increase-এর পর ক্ষেত্রে in এবং হারে of/by বসে।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের Dependent Preposition (নির্ভরশীল পদান্বয়ী অব্যয়) নিয়ম অনুযায়ী সঠিক শব্দ বাছুন:",
        "question": "High crop yields rely crucially _______ sustainable aquifer management.",
        "options": [
          "A. at",
          "B. in",
          "C. on",
          "D. with"
        ],
        "correctAnswer": "C. on",
        "explanation": "লেসনের তালিকা অনুযায়ী: 'Rely'-এর পর নির্ভরশীল Preposition সর্বদা 'on' অথবা 'upon' বসে।",
        "hint": "Rely-এর সাথে on বসে।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের 'At the end' বনাম 'In the end' নিয়ম অনুযায়ী উপযুক্ত প্রিপজিশন লিখুন (পরিশেষে/অবশেষে):",
        "question": "[input] the end, negotiations proved successful and the treaty was ratified.",
        "correctAnswer": "In",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'অবশেষে/ফলাফলস্বরূপ' বোঝাতে Idiomatic Preposition 'In the end' বসে।",
        "hint": "In শব্দটি লিখুন।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের Adjective + Preposition কোলোকেশন নিয়ম অনুযায়ী সঠিক বিকল্প চিহ্নিত করুন:",
        "question": "The artificial intelligence system is capable _______ diagnosing early-stage malignant tumors.",
        "options": [
          "A. to",
          "B. for",
          "C. of",
          "D. with"
        ],
        "correctAnswer": "C. of",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Capable'-এর পর সর্বদা Preposition 'of' + Gerund (of diagnosing) বসে।",
        "hint": "Capable-এর নির্দিষ্ট প্রিপজিশন of।"
      },
      {
        "id": 13,
        "type": "fill-typing",
        "instruction": "লেসনের Zero Preposition নিয়ম অনুযায়ী 'home'-এর পূর্বে কোনো প্রিপজিশন বসবে কি না? (none/to):",
        "question": "After the diplomatic conference adjourned, the envoys travelled [input] (none/to) home.",
        "correctAnswer": "none",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Go home / travel home'-এর পূর্বে কোনো Preposition (to) বসে না।",
        "hint": "Home-এর আগে কোনো প্রিপজিশন বসে না (none লিখুন)।"
      },
      {
        "id": 14,
        "type": "mcq",
        "instruction": "লেসনের 'Between' বনাম 'Among' নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Select the sentence with accurate usage for more than two entities collectively:",
        "options": [
          "A. The scholarship endowment was divided between the five university departments.",
          "B. The scholarship endowment was divided among the five university departments.",
          "C. The endowment was divided within five university departments.",
          "D. The endowment was divided into between five departments."
        ],
        "correctAnswer": "B. The scholarship endowment was divided among the five university departments.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: দুইয়ের অধিক অনির্দিষ্ট সদস্যের দলের মধ্যে বণ্টন বোঝাতে 'among' ব্যবহৃত হয়।",
        "hint": "দুইয়ের অধিক সদস্যের মধ্যে বোঝাতে among বসে।"
      }
    ]
  },
  {
    "id": "l5-question-formation-tags",
    "level": 5,
    "levelTitle": "Level 5: Precision, Agreement & Inquiry (নিখুঁত ব্যাকরণ ও জিজ্ঞাসা)",
    "levelSubtitle": "সাবজেক্ট-ভার্ব এগ্রিমেন্ট, প্রেপোজিশন ও কমন ভুল দূরীকরণ",
    "title": "Question Formation, WH-Inversion & Tag Questions",
    "bengaliTitle": "প্রশ্ন তৈরির নিখুঁত নিয়ম ও ট্যাগ কোয়েশ্চন (WH-Questions & Question Tags)",
    "badge": "IELTS Speaking Essential",
    "estimatedMinutes": 20,
    "contextStory": "আইএলটিএস স্পিকিং পার্ট ৩-এ বা দৈনন্দিন কথোপকথনে প্রশ্ন করা ও কনফার্মেশন চাওয়ার কৌশল জানা অপরিহার্য। বাংলায় আমরা বলি: \"তুমি আসবে, তাই না?\" ইংরেজিতে এই \"তাই না?\" হলো Tag Question। আর বড় প্রশ্ন করার সময় Auxiliary Verb সাবজেক্টের আগে নিয়ে আসাই হলো Inversion (e.g. \"Why did you choose this?\" নট \"Why you chose this?\")।",
    "conceptBreakdown": [
      "Yes/No Question Structure: Auxiliary Verb + Subject + Main Verb? (e.g. \"Do you agree with this policy?\")।",
      "WH-Question Structure: WH-word + Auxiliary Verb + Subject + Main Verb? (e.g. \"Where does the data originate?\")। সাবজেক্ট যদি নিজেই WH-word হয়, তখন auxiliary দরকার হয় না (e.g. \"Who wrote this report?\")।",
      "Indirect Questions (No Inversion): \"Could you explain why the hypothesis was rejected?\" (এখানে why was the hypothesis rejected বলা ভুল)।",
      "Tag Questions মূল নিয়ম: বাক্যটি Positive হলে Tag হবে Negative; বাক্যটি Negative হলে Tag হবে Positive (e.g. \"You are an educator, aren't you?\", \"She hasn't arrived yet, has she?\")।",
      "বিশেষ Tag নিয়ম ১ (Imperative): \"Let's + Verb\" থাকলে Tag হবে \"shall we?\" (e.g. \"Let's commence, shall we?\")। আদেশ বা অনুরোধে \"will you?\" বসে।",
      "বিশেষ Tag নিয়ম ২ (Negative Adverbs): বাক্যে seldom, rarely, hardly, scarcely, never থাকলে বাক্যটিকে Negative ধরা হয়, তাই Tag হবে Positive (e.g. \"He rarely exercises, does he?\")।",
      "বিশেষ Tag নিয়ম ৩ (Indefinite Pronouns): Everybody, everyone, somebody, nobody থাকলে Tag-এ সর্বনাম সর্বদা plural \"they\" হয় (e.g. \"Everybody passed, didn't they?\", \"Nobody called, did they?\")।"
    ],
    "formula": "WH-word + Aux Verb + Subject + Main Verb? | Statement (+), Tag (-)? | Statement (-), Tag (+)?",
    "examples": [
      {
        "en": "Governments rarely subsidize obsolete industries, do they?",
        "bn": "সরকার কদাচিৎ সেকেলে শিল্পে ভর্তুকি দেয়, তাই না?",
        "context": "\"Rarely\" নেগেটিভ অর্থ প্রকাশ করায় ট্যাগ হয়েছে পজিটিভ (\"do they?\")।"
      },
      {
        "en": "Could you explain how the data processing algorithm functions?",
        "bn": "আপনি কি ব্যাখ্যা করতে পারেন যে ডেটা প্রসেসিং অ্যালগরিদম কীভাবে কাজ করে?",
        "context": "Indirect question-এ inversion হয়নি (algorithm functions)।"
      },
      {
        "en": "Let's review the preliminary findings, shall we?",
        "bn": "চলুন আমরা প্রাথমিক ফলাফলগুলো পর্যালোচনা করি, কেমন?",
        "context": "\"Let's\" এর ট্যাগ সর্বদা \"shall we\"।"
      },
      {
        "en": "Everyone completed the diagnostic module, didn't they?",
        "bn": "প্রত্যেকেই ডায়াগনস্টিক মডিউলটি সম্পন্ন করেছিল, তাই না?",
        "context": "Everyone-এর জন্য Tag-এ \"they\" এবং past simple-এ \"didn't they\"।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Why you did not submit the report on time?",
        "correct": "Why didn't you submit the report on time?",
        "reason": "WH-প্রশ্নে auxiliary verb (didn't) সাবজেক্টের (you) পূর্বে বসাতে হবে।"
      },
      {
        "wrong": "Could you tell me where is the library?",
        "correct": "Could you tell me where the library is?",
        "reason": "Indirect প্রশ্নে ইনভার্সন হয় না; সাবজেক্টের পর ভার্ব বসবে।"
      },
      {
        "wrong": "He rarely visits, doesn't he?",
        "correct": "He rarely visits, does he?",
        "reason": "Rarely নেগেটিভ অর্থ প্রকাশ করে, তাই ট্যাগ পজিটিভ হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৬ (Negative Adverbs) অনুযায়ী সঠিক Tag Question নির্বাচন করুন:",
        "question": "Renewable energy sources seldom produce toxic environmental emissions, _______?",
        "options": [
          "A. don't they",
          "B. do they",
          "C. aren't they",
          "D. doesn't it"
        ],
        "correctAnswer": "B. do they",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: বাক্যে \"seldom\" (কদাচিৎ) থাকায় বাক্যটি Negative, সুতরাং Tag হবে Positive (\"do they\")।",
        "hint": "Seldom একটি নেগেটিভ শব্দ, তাই ট্যাগ পজিটিভ হবে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ৫ অনুযায়ী \"Let's\" এর সঠিক Tag Question টাইপ করুন (shall we):",
        "question": "Let's proceed with the simulated speaking interview, [input]?",
        "correctAnswer": "shall we",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: \"Let's\"-এর জন্য নির্ধারিত Tag হলো \"shall we\"।",
        "hint": "Let's থাকলে shall we বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (Indirect Questions) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the grammatically correct Indirect Question:",
        "options": [
          "A. Could you tell me what did the committee decide?",
          "B. Could you tell me what the committee decided?",
          "C. Could you tell me what was decided the committee?",
          "D. Could you tell me what had decided the committee?"
        ],
        "correctAnswer": "B. Could you tell me what the committee decided?",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Indirect প্রশ্নে সাধারণ Assertive ক্রম (Subject: the committee + Verb: decided) বজায় থাকে।",
        "hint": "Indirect প্রশ্নে did বসে না, স্বাভাবিক বাক্যক্রম থাকে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ৭ (Everyone) অনুযায়ী সঠিক Tag লিখুন: \"Everybody understands the instructions, [input]?\"",
        "question": "Everybody understands the instructions, [input]?",
        "correctAnswer": "don't they",
        "explanation": "Everybody-এর জন্য সর্বনাম \"they\", এবং বাক্যটি Present Simple Positive হওয়ায় Tag হবে \"don't they\"।",
        "hint": "Everybody-এর ট্যাগ সর্বনাম they হয়।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ২ (WH-Inversion) অনুযায়ী সঠিক সরাসরি প্রশ্ন কোনটি?",
        "question": "Select the grammatically accurate Direct WH-Question:",
        "options": [
          "A. Why the researchers discarded the previous dataset?",
          "B. Why did the researchers discard the previous dataset?",
          "C. Why did the researchers discarded the previous dataset?",
          "D. Why the researchers did discard the dataset?"
        ],
        "correctAnswer": "B. Why did the researchers discard the previous dataset?",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: WH-শব্দের পর Auxiliary Verb (did) + Subject (the researchers) + Base Verb (discard) বসবে।",
        "hint": "Did-এর পর মূল verb-এর base form বসে।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "নেগেটিভ স্টেটমেন্টের পজিটিভ ট্যাগ লিখুন: \"The candidate hasn't submitted the portfolio yet, [input]?\"",
        "question": "The candidate hasn't submitted the portfolio yet, [input]?",
        "correctAnswer": "has she",
        "explanation": "বাক্যে \"hasn't\" নেগেটিভ থাকায় Tag হবে পজিটিভ \"has he\" বা \"has she\"।",
        "hint": "Has he বা has she লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল বাক্যটি চিহ্নিত করুন:",
        "question": "Which of the following questions contains a word order error?",
        "options": [
          "A. Where did you conduct the surveys?",
          "B. I wonder where did you conduct the surveys.",
          "C. I wonder where you conducted the surveys.",
          "D. Who conducted the surveys?"
        ],
        "correctAnswer": "B. I wonder where did you conduct the surveys.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: \"I wonder\" একটি পরোক্ষ ভূমিকা, তাই এর পর \"where did you conduct\" ভুল; সঠিক হবে \"where you conducted\"।",
        "hint": "I wonder-এর পর did বসে না।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Nobody থাকলে Tag কি হবে? \"Nobody answered the telephone, [input]?\"",
        "question": "Nobody answered the telephone, [input]?",
        "correctAnswer": "did they",
        "explanation": "Nobody নেগেটিভ শব্দ এবং এর জন্য সর্বনাম they, তাই পজিটিভ ট্যাগ \"did they\" হবে।",
        "hint": "Nobody থাকলে পজিটিভ ট্যাগ did they হয়।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "অনুরোধমূলক বাক্যে (Imperative Sentence) কোন Tag ব্যবহৃত হয়?",
        "question": "Please distribute these evaluation rubrics, _______?",
        "options": [
          "A. don't you",
          "B. will you",
          "C. shall we",
          "D. aren't you"
        ],
        "correctAnswer": "B. will you",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: আদেশ বা অনুরোধমূলক বাক্যের Tag Question হলো \"will you?\"।",
        "hint": "অনুরোধে will you বসে।"
      },
      {
        "id": 10,
        "type": "mcq",
        "instruction": "লেসনের 'Let's' প্রস্তাবমূলক বাক্যের Question Tag নিয়ম অনুযায়ী সঠিক ট্যাগ বাছুন:",
        "question": "\"Let's evaluate the newly calibrated laboratory sensors, _______?\"",
        "options": [
          "A. won't we",
          "B. shall we",
          "C. do we",
          "D. can we"
        ],
        "correctAnswer": "B. shall we",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Let's' দিয়ে শুরু হওয়া প্রস্তাবমূলক বাক্যের Question Tag সর্বদা 'shall we?' হয়।",
        "hint": "Let's থাকলে shall we? বসে।"
      },
      {
        "id": 11,
        "type": "fill-typing",
        "instruction": "লেসনের 'I am' এর নেগেটিভ কোয়েশ্চেন ট্যাগ রূপ টাইপ করুন (aren't I):",
        "question": "\"I am eligible to contest for the academic council chair, [input] (aren't I / am not I)?\"",
        "correctAnswer": "aren't I",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'I am'-এর অনুমোদিত ব্যাকরণগত Question Tag হলো 'aren't I?'।",
        "hint": "aren't I টাইপ করুন।"
      },
      {
        "id": 12,
        "type": "mcq",
        "instruction": "লেসনের প্রচ্ছন্ন নেতিবাচক শব্দ (Hardly, Seldom, Rarely) সম্বলিত ট্যাগের নিয়ম অনুযায়ী সঠিক ট্যাগ বাছুন:",
        "question": "\"The secluded island community rarely experiences seismic tremors, _______?\"",
        "options": [
          "A. doesn't it",
          "B. does it",
          "C. didn't it",
          "D. won't it"
        ],
        "correctAnswer": "B. does it",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Rarely/Seldom' প্রচ্ছন্ন নেতিবাচক শব্দ, তাই এর Question Tag সর্বদা ইতিবাচক (does it?) হবে।",
        "hint": "নেতিবাচক বাক্যের ট্যাগ পজিটিভ (does it) হয়।"
      },
      {
        "id": 13,
        "type": "fill-typing",
        "instruction": "লেসনের Indirect Embedded Question (পরোক্ষ প্রশ্ন)-এর স্বাভাবিক বর্ণনামূলক পদক্রম অনুযায়ী রূপ লিখুন (is):",
        "question": "Could you please clarify what the minimum required test score [input] (is/is it)?",
        "correctAnswer": "is",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Indirect Question-এ প্রশ্নবোধক ইনভার্সন হয় না; Subject (score) + Verb (is) ক্রম বহাল থাকে।",
        "hint": "বর্ণনামূলক পদক্রমে শেষে is লিখুন।"
      },
      {
        "id": 14,
        "type": "mcq",
        "instruction": "লেসনের অনুজ্ঞাসূচক আদেশ/অনুরোধের (Imperative) কোয়েশ্চেন ট্যাগ নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "\"Submit your peer reviews before midnight, _______?\"",
        "options": [
          "A. do you",
          "B. will you",
          "C. don't you",
          "D. shall you"
        ],
        "correctAnswer": "B. will you",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Imperative বাক্যের শেষে অনুরোধ বা তাগিদ প্রকাশে সাধারণত 'will you?' বা 'would you?' বসে।",
        "hint": "আদেশ বা অনুরোধে will you? বসে।"
      }
    ]
  },
  {
    "id": "l6-conditionals-mastery",
    "level": 6,
    "levelTitle": "Level 6: Advanced Band 8.5+ Academic Arsenal (উচ্চমার্গের ব্যাকরণগত অলঙ্কার)",
    "levelSubtitle": "নেগেটিভ ইনভার্সন, কন্ডিশনালস ও উচ্চমার্গের ব্যাকরণগত অলঙ্কার",
    "title": "Conditionals Mastery: 0, 1st, 2nd, 3rd & Mixed Types",
    "bengaliTitle": "শর্তযুক্ত বাক্য: ০, ১ম, ২য়, ৩য় এবং মিক্সড কন্ডিশনালের সম্পূর্ণ ব্যবহার",
    "badge": "Band 8.5 Grammar",
    "estimatedMinutes": 30,
    "contextStory": "আইএলটিএস পরীক্ষায় হাই-ব্যান্ড স্কোরাররা শর্তযুক্ত বাক্য (Conditionals) দক্ষতার সাথে ব্যবহার করেন। যেমন নীতিগত প্রস্তাবনা দিতে: \"If governments invested more in renewables, carbon footprints would shrink\" (2nd conditional)। আবার অতীতের ভুল নিয়ে বিশ্লেষণ করতে: \"If authorities had fortified the embankments, the flooding would not have devastated the delta\" (3rd conditional)। আর অতীতের ভুলের বর্তমান ফলাফল বোঝাতে Mixed Conditional হলো চরম হাতিয়ার।",
    "conceptBreakdown": [
      "Zero Conditional (বৈজ্ঞানিক সত্য/সাধারণ নিয়ম): If + Present Simple, Present Simple (e.g. \"If ice absorbs heat, it melts\")।",
      "First Conditional (বাস্তব ও সম্ভাব্য ভবিষ্যৎ): If + Present Simple, Subject + will/can/may + V1 (e.g. \"If emissions rise, sea levels will inundate lowlands\")।",
      "Second Conditional (অবাস্তব বর্তমান বা ভবিষ্যৎ অনুমান): If + Past Simple, Subject + would/could/might + V1 (e.g. \"If all nations phased out coal, air pollution would decrease dramatically\")। এতে Be-verb হিসেবে সর্বদা \"were\" বসে (\"If I were you\")।",
      "Third Conditional (অতীতের অবাস্তব অনুশোচনা): If + Past Perfect (had + V3), Subject + would/could/might have + V3 (e.g. \"If the alarm had sounded, casualties would have been averted\")।",
      "Mixed Conditional Type 1 (অতীতের শর্তের বর্তমান ফল): If + had + V3, Subject + would + V1 (e.g. \"If he had passed the bar exam last year, he would be a practicing barrister today\")।",
      "Unless (যদি না): Unless = If...not। Unless-এর ক্লজে কখনো দ্বিতীয়বার not বসে না (e.g. \"Unless you prepare diligently, you will not succeed\")।",
      "Provided that / As long as / In case: If-এর বিকল্প শর্তবাচক পদ।"
    ],
    "formula": "Zero: If+Pres, Pres | 1st: If+Pres, will+V1 | 2nd: If+Past, would+V1 | 3rd: If+had+V3, would have+V3 | Mixed: If+had+V3, would+V1",
    "examples": [
      {
        "en": "If the planetary mean temperature increases by two degrees, irreversible ecological degradation will occur.",
        "bn": "যদি গ্রহের গড় তাপমাত্রা দুই ডিগ্রি বৃদ্ধি পায়, তবে অপরিবর্তনীয় পরিবেশগত অবনতি ঘটবে।",
        "context": "First Conditional (বাস্তব বৈজ্ঞানিক পূর্বাভাস)।"
      },
      {
        "en": "If municipal administrators were more visionary, suburban rail infrastructure would receive adequate funding.",
        "bn": "যদি পৌর প্রশাসকরা আরও দূরদর্শী হতেন, তবে শহরতলির রেল অবকাঠামো পর্যাপ্ত অনুদান পেত।",
        "context": "Second Conditional (বর্তমান কাল্পনিক/আকাঙ্ক্ষিত অবস্থা)।"
      },
      {
        "en": "If the structural engineers had reinforced the dam pillars, the barrier would not have collapsed during the deluge.",
        "bn": "যদি অবকাঠামো প্রকৌশলীরা বাঁধের স্তম্ভগুলো শক্তিশালী করতেন, তবে বন্যার সময় বাঁধটি ভেঙে পড়ত না।",
        "context": "Third Conditional (অতীতের অপূর্ণ অনুশোচনা)।"
      },
      {
        "en": "If she had secured the prestigious Rhodes Scholarship in 2020, she would reside in Oxford today.",
        "bn": "তিনি যদি ২০২০ সালে মর্যাদাপূর্ণ রোডস স্কলারশিপ পেতেন, তবে আজ তিনি অক্সফোর্ডে বসবাস করতেন।",
        "context": "Mixed Conditional (অতীতের শর্তের বর্তমান বাস্তবতা)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "If I will study hard, I will pass.",
        "correct": "If I study hard, I will pass.",
        "reason": "If-ক্লজে কখনো \"will\" বসে না; First conditional-এ if-ক্লজ Present Simple হয়।"
      },
      {
        "wrong": "If I was you, I would accept the offer.",
        "correct": "If I were you, I would accept the offer.",
        "reason": "Second conditional-এ কাল্পনিক শর্তে singular-এও সর্বদা \"were\" বসে।"
      },
      {
        "wrong": "Unless you do not hurry, you will miss the train.",
        "correct": "Unless you hurry, you will miss the train.",
        "reason": "Unless নিজেই নেগেটিভ (if not), তাই এর ক্লজে \"do not\" বসানো ভুল।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (Second Conditional - কাল্পনিক শর্ত) অনুযায়ী সঠিক রূপ নির্বাচন করুন:",
        "question": "If municipal governments _______ suburban mass transit, vehicular carbon footprints would plummet.",
        "options": [
          "A. will subsidize",
          "B. subsidized",
          "C. had subsidized",
          "D. subsidize"
        ],
        "correctAnswer": "B. subsidized",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: ফলাফল ক্লজে \"would + V1\" (would plummet) থাকায় If-ক্লজে Past Simple (subsidized) বসবে।",
        "hint": "Second Conditional সূত্র: If + Past Simple, would + V1।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Third Conditional সূত্র অনুযায়ী ব্র্যাকেটের শব্দের সঠিক রূপ লিখুন (would have + V3):",
        "question": "If the early warning telemetry had functioned, the coastal villagers (evacuate) [input] safely.",
        "correctAnswer": "would have evacuated",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: If-ক্লজে \"had functioned\" (had + V3) থাকায় মূল ক্লজে \"would have evacuated\" বসবে।",
        "hint": "Would have + V3 লিখুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ (Mixed Conditional: অতীতের শর্তের বর্তমান ফল) অনুযায়ী সঠিক রূপ কোনটি?",
        "question": "If the candidate had adhered to the preparation schedule last semester, he _______ so anxious today.",
        "options": [
          "A. would not be",
          "B. would not have been",
          "C. is not",
          "D. will not be"
        ],
        "correctAnswer": "A. would not be",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: অতীতের কারণের ফলাফল \"today\" (বর্তমানে) বিদ্যমান থাকায় Mixed Conditional হিসেবে \"would not be\" হবে।",
        "hint": "অতীতের শর্তের বর্তমান ফলে would + V1 বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Second conditional-এ কাল্পনিক কর্তা হিসেবে \"be\" এর সঠিক রূপ লিখুন: \"If the lead scientist [input] (be) here, she would clarify the metrics.\"",
        "question": "If the lead scientist [input] here, she would clarify the metrics.",
        "correctAnswer": "were",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: Second conditional-এর অবাস্তব শর্তে একবচনেও \"was\"-এর পরিবর্তে \"were\" বসে।",
        "hint": "Subjunctive mood-এ were বসে।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৬ (Unless) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the grammatically accurate sentence using \"Unless\":",
        "options": [
          "A. Unless the factory does not upgrade filters, it will face fines.",
          "B. Unless the factory upgrades filters, it will face fines.",
          "C. Unless the factory will upgrade filters, fines will occur.",
          "D. Unless the factory did not upgrade filters, it faced fines."
        ],
        "correctAnswer": "B. Unless the factory upgrades filters, it will face fines.",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: Unless নিজেই নেগেটিভ, তাই এর ক্লজে দ্বিতীয়বার \"does not\" বসানো নিষেধ।",
        "hint": "Unless-এর সাথে do not বসে না।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "First Conditional-এর ফলাফল ক্লজে ব্র্যাকেটের রূপ লিখুন: \"If inflation accelerates, the central bank [input] (increase) rates.\"",
        "question": "If inflation accelerates, the central bank [input] rates.",
        "correctAnswer": "will increase",
        "explanation": "First Conditional-এ If + Present Simple-এর পর মূল ক্লজে will + V1 (will increase) বসে।",
        "hint": "Will + Base Verb লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের সাধারণ ভুল টেবিল অনুযায়ী ভুল বাক্যটি চিহ্নিত করুন:",
        "question": "Which of the following conditional sentences contains a grammatical error?",
        "options": [
          "A. If temperatures rise, ice shelves melt.",
          "B. If you will arrive early, we will start the conference.",
          "C. If you arrive early, we will start the conference.",
          "D. Had I known, I would have warned you."
        ],
        "correctAnswer": "B. If you will arrive early, we will start the conference.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: If-ক্লজে কখনোই \"will\" বসে না; সঠিক হবে \"If you arrive early\"।",
        "hint": "If-ক্লজে will বসে না।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Zero conditional (সাধারণ বৈজ্ঞানিক সত্য): \"If water [input] (freeze), its density decreases.\"",
        "question": "If water [input], its density decreases.",
        "correctAnswer": "freezes",
        "explanation": "Zero Conditional বৈজ্ঞানিক সত্য প্রকাশ করে, উভয় ক্লজেই Present Simple বসে (water freezes)।",
        "hint": "Present Simple একবচনে freezes লিখুন।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "Third Conditional প্যাসিভ ভয়েস অনুযায়ী সঠিক রূপ কোনটি?",
        "question": "If the distress beacon had been triggered, the passengers _______ hours earlier.",
        "options": [
          "A. would be rescued",
          "B. would have been rescued",
          "C. had rescued",
          "D. will have rescued"
        ],
        "correctAnswer": "B. would have been rescued",
        "explanation": "Third Conditional Passive-এ \"would have been + V3\" (would have been rescued) বসে।",
        "hint": "Would have been + V3।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "Provided that (শর্তে) বাক্য সম্পন্ন করুন: \"You may access the archives provided that you [input] (wear) protective gloves.\"",
        "question": "You may access the archives provided that you [input] protective gloves.",
        "correctAnswer": "wear",
        "explanation": "Provided that-এর পর সাধারণ শর্তসূচক Present Simple (wear) বসে।",
        "hint": "Base form wear লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের শর্তসূচক বাক্যে 'Inversion' (Had I...) নিয়ম অনুযায়ী সঠিক বাক্যটি বাছুন:",
        "question": "Select the sentence with accurate inverted Third Conditional architecture:",
        "options": [
          "A. If had we known the seismic hazard, we would evacuate.",
          "B. Had we recognized the tectonic hazard, we would have evacuated immediately.",
          "C. Had we recognized the hazard, we evacuated immediately.",
          "D. Did we recognize the hazard, we would have evacuated."
        ],
        "correctAnswer": "B. Had we recognized the tectonic hazard, we would have evacuated immediately.",
        "explanation": "লেসনের ইনভার্সন ফর্মুলা অনুযায়ী: 'If' বাদ দিয়ে 'Had + Subject + V3, Subject + would have + V3' বসে।",
        "hint": "Had + subject + V3 ... would have + V3 গঠন দেখুন।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের 'Unless' (= if not) নিয়ম অনুযায়ী শূন্যস্থানে উপযুক্ত শব্দটি টাইপ করুন:",
        "question": "The launch will proceed as scheduled [input] severe adverse crosswinds develop.",
        "correctAnswer": "unless",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'যদি না' অর্থে শর্ত প্রকাশ করতে 'unless' বসে (unless crosswinds develop)।",
        "hint": "Unless শব্দটি লিখুন।"
      },
      {
        "id": 13,
        "type": "mcq",
        "instruction": "লেসনের 'Provided that / As long as' নিয়ম অনুযায়ী সঠিক বাক্য নির্বাচন করুন:",
        "question": "Which sentence accurately articulates a contractual condition with \"provided that\"?",
        "options": [
          "A. Grants will be disbursed provided that researchers will maintain ethical standards.",
          "B. Grants will be disbursed provided that researchers maintain ethical standards.",
          "C. Provided that researchers will maintain standards, grants are disbursed.",
          "D. Provided researchers to maintain standards grants will be disbursed."
        ],
        "correctAnswer": "B. Grants will be disbursed provided that researchers maintain ethical standards.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Provided that' ক্লজে শর্ত প্রকাশে Present Simple (maintain) বসে, Future নয়।",
        "hint": "Provided that ক্লজে Present Simple বসে।"
      },
      {
        "id": 14,
        "type": "fill-typing",
        "instruction": "লেসনের 'But for' (শর্তহীন বিকল্প) নিয়ম অনুযায়ী ব্র্যাকেটের শব্দটির সঠিক রূপ লিখুন (intervene):",
        "question": "But for the pilot's swift [input] (intervention), the passenger aircraft would have crashed.",
        "correctAnswer": "intervention",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'But for'-এর পর সর্বদা Noun Phrase (the pilot's swift intervention) বসে।",
        "hint": "Intervention নাউন রূপটি লিখুন।"
      },
      {
        "id": 15,
        "type": "mcq",
        "instruction": "লেসনের মিশ্র শর্ত (Mixed Conditional: Past action, Present consequence) নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Which sentence portrays an unreal past event causing a direct current consequence?",
        "options": [
          "A. If he had pursued medical school, he would be a licensed surgeon today.",
          "B. If he pursued medical school, he would have been a surgeon today.",
          "C. If he had pursued medical school, he would have been a surgeon today.",
          "D. If he pursues medical school, he is a surgeon today."
        ],
        "correctAnswer": "A. If he had pursued medical school, he would be a licensed surgeon today.",
        "explanation": "লেসনের মিক্সড কন্ডিশনাল নিয়ম অনুযায়ী: অতীতে কাজ না ঘটার ফল বর্তমানে বিদ্যমান থাকায় 'had pursued ... would be ... today' বসে।",
        "hint": "অতীতের কারণে বর্তমান ফল: had + V3 ... would be today।"
      }
    ]
  },
  {
    "id": "l6-participle-clauses-reduction",
    "level": 6,
    "levelTitle": "Level 6: Advanced Band 8.5+ Academic Arsenal (উচ্চমার্গের ব্যাকরণগত অলঙ্কার)",
    "levelSubtitle": "নেগেটিভ ইনভার্সন, কন্ডিশনালস ও উচ্চমার্গের ব্যাকরণগত অলঙ্কার",
    "title": "Participle Clauses & Clause Reduction for Academic Writing",
    "bengaliTitle": "পার্টিসিপল ক্লজ ও ক্লজ সংক্ষিপ্তকরণ (Band 8.5+ Academic Writing Style)",
    "badge": "Band 9 Polish",
    "estimatedMinutes": 25,
    "contextStory": "ব্যান্ড ৯ স্কোরারদের লেখার একটি বিশেষ লক্ষণ হলো তারা ক্লজকে সংকুচিত (Reduce) করে বাক্যের গভীরতা বাড়ান। সাধারণ ভাষায় লেখা হয়: \"Because they recognized the looming threat of rising sea levels, coastal engineers constructed tidal barriers.\" কিন্তু পারফেক্ট পার্টিসিপল স্টাইলে লেখা হয়: \"Recognizing the looming threat of rising sea levels, coastal engineers constructed tidal barriers.\" এটি এক ক্লজের ভার্বকে পার্টিসিপলে পরিণত করে লেখাকে অত্যন্ত সাবলীল ও সংক্ষিপ্ত করে তোলে।",
    "conceptBreakdown": [
      "Present Participle Clauses (-ing): সক্রিয় ক্রিয়া এবং একই সময়ে ঘটা বা কারণ দর্শাতে ব্যবহৃত হয় (e.g. \"Having limited resources, the startup pivoted quickly\")।",
      "Past Participle Clauses (-ed/V3): নিষ্ক্রিয় বা প্যাসিভ ভাব প্রকাশে ক্লজ সংক্ষিপ্ত করতে ব্যবহৃত হয় (e.g. \"Built in the seventeenth century, the fortress survived numerous invasions\" = \"Because it was built in...\")।",
      "Perfect Participle Clauses (Having + V3): একটি কাজ অপর কাজের পূর্বে নিশ্চিতভাবে সম্পন্ন হয়েছিল বোঝাতে (e.g. \"Having concluded the clinical trial, the scientists submitted their findings\")।",
      "Dangling Modifier সতর্কতা: পার্টিসিপল ক্লজের সাবজেক্ট এবং মূল বাক্যের সাবজেক্ট একই ব্যক্তি/বস্তু হতে হবে। ভুল: \"Walking down the street, the building caught fire\" (যেন ভবন নিজেই হাঁটছিল!)। সঠিক: \"Walking down the street, I noticed the building on fire\"।",
      "Prepositional Participle Phrases: \"On hearing the announcement...\", \"After graduating from university...\"।"
    ],
    "formula": "Active: [Verb-ing phrase], [Subject + Main Verb] | Passive: [V3 phrase], [Subject + Main Verb]",
    "examples": [
      {
        "en": "Having implemented automated sorting technologies, the logistics hub drastically minimized delivery delays.",
        "bn": "স্বয়ংক্রিয় বাছাই প্রযুক্তি বাস্তবায়ন করার পর, লজিস্টিকস হাবটি ডেলিভারির বিলম্ব ব্যাপকভাবে হ্রাস করেছিল।",
        "context": "Perfect Participle (Having implemented) পূর্ববর্তী কর্মকাণ্ড নির্দেশ করছে।"
      },
      {
        "en": "Facing mounting demographic aging, the municipal government incentivized skilled immigration.",
        "bn": "ক্রমবর্ধমান জনসংখ্যার বার্ধক্যের মুখোমুখি হয়ে, পৌর সরকার দক্ষ অভিবাসনকে উৎসাহিত করেছিল।",
        "context": "Present Participle (Facing mounting demographic aging)।"
      },
      {
        "en": "Constructed predominantly from timber, traditional Japanese pagodas demonstrate remarkable seismic resilience.",
        "bn": "প্রধানত কাঠ দ্বারা নির্মিত হওয়ায়, ঐতিহ্যবাহী জাপানি প্যাগোডাগুলো অসাধারণ ভূমিকম্প সহনশীলতা প্রদর্শন করে।",
        "context": "Past Participle (Constructed predominantly from timber)।"
      },
      {
        "en": "Exhausted by the transatlantic flight, the delegates retired to their quarters immediately.",
        "bn": "ট্রান্সআটলান্টিক ফ্লাইটে ক্লান্ত হয়ে, প্রতিনিধিরা অবিলম্বে তাদের কক্ষে অবসর নিয়েছিলেন।",
        "context": "Past Participle phrase expressing state/cause।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Having arrived at the laboratory, the experiments were begun by the researchers.",
        "correct": "Having arrived at the laboratory, the researchers began the experiments.",
        "reason": "Dangling Modifier: পরীক্ষাগারে গবেষকেরা এসেছিলেন, এক্সপেরিমেন্ট নিজে আসেনি; তাই কমার পরের সাবজেক্ট \"the researchers\" হতে হবে।"
      },
      {
        "wrong": "Walking through the forest, the trees were tall.",
        "correct": "Walking through the forest, I admired the tall trees.",
        "reason": "গাছগুলো হাঁটছিল না; যে হাঁটছিল তাকে কমার পরে সাবজেক্ট করতে হবে।"
      },
      {
        "wrong": "Being rainy, we stayed indoors.",
        "correct": "It being rainy, we stayed indoors. (or: Because it was rainy, we stayed indoors.)",
        "reason": "আবহাওয়ার জন্য impersonal \"It\" আবশ্যক, অন্যথায় Dangling Modifier হবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের Dangling Modifier নিয়ম অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Identify the sentence that avoids a Dangling Modifier:",
        "options": [
          "A. Examining the economic census data, significant income disparities were revealed to the analysts.",
          "B. Examining the economic census data, analysts uncovered significant income disparities.",
          "C. Having examining the census data, significant disparities appeared.",
          "D. Examined the data, the report was drafted."
        ],
        "correctAnswer": "B. Examining the economic census data, analysts uncovered significant income disparities.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: ডেটা পরীক্ষা করেছিলেন \"analysts\", তাই কমার পরে সরাসরি \"analysts\" সাবজেক্ট হিসেবে আসতে হবে। A-তে প্যাসিভ করায় Dangling Modifier তৈরি হয়েছিল।",
        "hint": "পার্টিসিপল ক্লজের কাজটি যে ব্যক্তি করেছে, কমার ঠিক পরেই তাকে সাবজেক্ট হিসেবে রাখুন।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের Perfect Participle সূত্র (Having + V3) অনুযায়ী ব্র্যাকেটের শব্দের সঠিক রূপ লিখুন:",
        "question": "[input] (complete) the extensive field trials, the epidemiologists published their breakthrough thesis.",
        "correctAnswer": "Having completed",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: একটি কাজ সম্পূর্ণভাবে শেষ করে অন্য কাজ শুরু করা বোঝাতে \"Having completed\" ব্যবহৃত হয়।",
        "hint": "Having + V3 লিখুন।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের Past Participle (নিষ্ক্রিয়/প্যাসিভ ভাব) অনুযায়ী সঠিক বাক্যটি নির্বাচন করুন:",
        "question": "Choose the sentence demonstrating a correct Passive Participle clause:",
        "options": [
          "A. Destroyed by the devastating hurricane, the municipal council rebuilt the pier.",
          "B. Destroyed by the devastating hurricane, the historic pier was painstakingly rebuilt by the council.",
          "C. Destroying by the hurricane, the pier collapsed.",
          "D. Having destroyed by hurricane, council rebuilt pier."
        ],
        "correctAnswer": "B. Destroyed by the devastating hurricane, the historic pier was painstakingly rebuilt by the council.",
        "explanation": "লেসনের নিয়ম ২ ও ৪ অনুযায়ী: হারিকেনে ধ্বংস হয়েছিল \"the historic pier\", তাই কমার পরে সরাসরি \"the historic pier\" সাবজেক্ট হিসেবে বসেছে।",
        "hint": "ধ্বংস হয়েছিল জেটিটি (pier), কাউন্সিল নিজে ধ্বংস হয়নি।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Present Participle রূপ লিখুন: \"[input] (recognize) the imminent ecological threat, the treaty was signed by leaders.\"",
        "question": "[input] the imminent ecological threat, leaders signed the multilateral treaty.",
        "correctAnswer": "Recognizing",
        "explanation": "সক্রিয় অবস্থায় কারণ দর্শাতে Present Participle \"Recognizing\" ব্যবহৃত হয়।",
        "hint": "Verb-এর সাথে -ing যোগ করে শুরু করুন।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী নিচের কোন বাক্যে Dangling Modifier রয়েছে?",
        "question": "Which of the following sentences contains a Dangling Modifier error?",
        "options": [
          "A. Walking across the suspension bridge, a dizzying sensation overcame the tourist.",
          "B. Walking across the suspension bridge, the tourist felt a dizzying sensation.",
          "C. Having passed the rigorous examination, she celebrated with her peers.",
          "D. Driven by academic curiosity, the scholar pursued quantum physics."
        ],
        "correctAnswer": "A. Walking across the suspension bridge, a dizzying sensation overcame the tourist.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: ব্রিজের ওপর দিয়ে পর্যটক হাঁটছিলেন, সেনসেশন নিজে হাঁটছিল না; তাই A-তে ড্যাংলিং মডিফায়ার রয়েছে।",
        "hint": "হাঁটছিল পর্যটক, সেনসেশন নয়।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "প্যাসিভ পার্টিসিপল: \"[input] (write) in clear prose, the policy document is accessible to all.\"",
        "question": "[input] in clear prose, the policy document is accessible to all.",
        "correctAnswer": "Written",
        "explanation": "ডকুমেন্টটি লেখা হয়েছিল (প্যাসিভ ভাব), তাই Past Participle \"Written\" সঠিক।",
        "hint": "Write-এর Past Participle (V3) লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটি দুটি ক্লজকে সংকুচিত করে শ্রেষ্ঠ একাডেমিক রূপ প্রকাশ করেছে?",
        "question": "Identify the reduced clause version of: \"Because they feared political unrest, the junta imposed a curfew.\"",
        "options": [
          "A. Fearing political unrest, the junta imposed a curfew.",
          "B. Feared political unrest, the junta imposed curfew.",
          "C. Because fearing unrest, junta imposed curfew.",
          "D. Junta feared unrest, imposing curfew."
        ],
        "correctAnswer": "A. Fearing political unrest, the junta imposed a curfew.",
        "explanation": "সক্রিয় কারণ দর্শাতে Present Participle \"Fearing political unrest\" নিখুঁত সংক্ষেপণ।",
        "hint": "Active cause-এ Verb-ing বসে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Perfect Participle Passive: \"[input] (warn) repeatedly about the storm, the fishermen did not sail.\"",
        "question": "Having been [input], the fishermen did not sail.",
        "correctAnswer": "warned",
        "explanation": "Having been + V3 (warned) প্যাসিভ পারফেক্ট পার্টিসিপল গঠন করে।",
        "hint": "V3 রূপ warned লিখুন।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম অনুযায়ী আবহাওয়া সংক্রান্ত বাক্যটিতে কোনটি সঠিক?",
        "question": "Select the grammatically correct sentence:",
        "options": [
          "A. Being a torrential storm, we canceled the archaeological expedition.",
          "B. It being a torrential storm, we canceled the archaeological expedition.",
          "C. Because being a storm, we canceled expedition.",
          "D. Storm being torrential, expedition was canceled."
        ],
        "correctAnswer": "B. It being a torrential storm, we canceled the archaeological expedition.",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: আবহাওয়ার ক্ষেত্রে সাবজেক্ট হিসেবে \"It\" উল্লেখ করা আবশ্যক (It being a torrential storm)।",
        "hint": "Impersonal It উল্লেখ থাকতে হবে।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "সমসাময়িক কাজ বোঝাতে Present Participle: \"The researcher entered the auditorium [input] (carry) a stack of dossiers.\"",
        "question": "The researcher entered the auditorium [input] a stack of dossiers.",
        "correctAnswer": "carrying",
        "explanation": "একই সাথে ঘটা কাজ নির্দেশ করতে Present Participle \"carrying\" ব্যবহৃত হয়।",
        "hint": "Carry-এর সাথে -ing যোগ করুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের সক্রিয় সমসাময়িক কাজ পার্টিসিপল রূপান্তর (-ing) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "\"While the engineer was inspecting the turbine, he noticed a hairline fracture.\" -> Reduced form:",
        "options": [
          "A. Inspected the turbine, the engineer noticed a fracture.",
          "B. Inspecting the turbine, the engineer noticed a hairline fracture.",
          "C. Having inspected the turbine, the fracture was noticed.",
          "D. Being inspected the turbine, the engineer noticed a fracture."
        ],
        "correctAnswer": "B. Inspecting the turbine, the engineer noticed a hairline fracture.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: সমসাময়িক চলমান সক্রিয় কাজে Present Participle (Inspecting...) বসে।",
        "hint": "চলমান কাজে Present Participle (-ing) বসে।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের নিষ্ক্রিয় পার্টিসিপল সংকোচন (Past Participle Reduction) অনুযায়ী 'surround' এর রূপ টাইপ করুন:",
        "question": "The medieval citadel, [input] (surround) by moat fortifications, withstood every siege.",
        "correctAnswer": "surrounded",
        "explanation": "লেসনের নিয়ম অনুযায়ী: প্যাসিভ রিলেটিভ ক্লজের সংক্ষেপণে Past Participle (surrounded) বসে।",
        "hint": "Past participle (surrounded) লিখুন।"
      },
      {
        "id": 13,
        "type": "mcq",
        "instruction": "লেসনের ঝুলে থাকা পার্টিসিপল (Dangling Modifier Error) বর্জিত শুদ্ধ বাক্যটি চিহ্নিত করুন:",
        "question": "Which sentence is completely free from a dangling participle error?",
        "options": [
          "A. Walking along the shoreline, the sunset appeared mesmerizing to Sarah.",
          "B. Walking along the shoreline, Sarah marveled at the mesmerizing sunset.",
          "C. Having finished the laboratory trial, the beaker broke.",
          "D. Damaged by hail, the farmer repaired the roof."
        ],
        "correctAnswer": "B. Walking along the shoreline, Sarah marveled at the mesmerizing sunset.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: প্রারম্ভিক পার্টিসিপলের কাজ যে ব্যক্তি করছে (Sarah), কমার পর মূল কর্তাও সেই ব্যক্তি হতে হবে।",
        "hint": "হাঁটার কাজটি Sarah করছে, তাই Sarah কমার ঠিক পরে বসবে।"
      },
      {
        "id": 14,
        "type": "fill-typing",
        "instruction": "লেসনের সম্পূর্ণ নিষ্পন্ন কাজের Perfect Participle নিয়ম অনুযায়ী 'Having' এর পর 'complete' এর সঠিক রূপ লিখুন:",
        "question": "Having [input] (complete) the statistical synthesis, the research team submitted the manuscript.",
        "correctAnswer": "completed",
        "explanation": "লেসনের সূত্র অনুযায়ী: পূর্বে সমাপ্ত কাজের Perfect Participle-এ 'Having + V3' (Having completed) বসে।",
        "hint": "Having-এর পর V3 (completed) লিখুন।"
      },
      {
        "id": 15,
        "type": "mcq",
        "instruction": "লেসনের Preposition + Participle (Upon / On doing) নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Select the sentence correctly applying an immediate chronological prepositional participle:",
        "options": [
          "A. Upon receiving the royal summons, the ambassador departed for London.",
          "B. On receive the royal summons, the ambassador departed.",
          "C. At receiving the summons, the ambassador departed.",
          "D. In receiving the summons, departed the ambassador."
        ],
        "correctAnswer": "A. Upon receiving the royal summons, the ambassador departed for London.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: কোনো ঘটনা ঘটার সাথে সাথে পরবর্তী কাজ শুরু হওয়া বোঝাতে 'Upon / On + -ing' (Upon receiving) বসে।",
        "hint": "Upon + -ing গঠনটি সঠিক।"
      }
    ]
  },
  {
    "id": "l6-negative-inversion-conditionals",
    "level": 6,
    "levelTitle": "Level 6: Advanced Band 8.5+ Academic Arsenal (উচ্চমার্গের ব্যাকরণগত অলঙ্কার)",
    "levelSubtitle": "নেগেটিভ ইনভার্সন, কন্ডিশনালস ও উচ্চমার্গের ব্যাকরণগত অলঙ্কার",
    "title": "Advanced Inversion & Fronting for Band 8+ Emphasis",
    "bengaliTitle": "নেগেটিভ ইনভার্সন ও ফ্রন্টিং: বাক্যে জোর প্রদানের উচ্চমার্গীয় অলঙ্কার",
    "badge": "IELTS Band 8.5 Masterclass",
    "estimatedMinutes": 25,
    "contextStory": "ইংরেজি ব্যাকরণের সবচেয়ে জমকালো এবং উচ্চমার্গের শৈলী হলো Negative Inversion। সাধারণ ভাষায় বলা হয়: \"I have never seen such dedication।\" কিন্তু হাই-ব্যান্ড একাডেমিক বা অলঙ্কৃত ভাষায় বলা হয়: \"Never have I witnessed such profound dedication।\" যখন কোনো নেগেটিভ বা সীমাবদ্ধতাসূচক শব্দ (Never, Rarely, Seldom, Hardly, Under no circumstances) বাক্যের শুরুতে আনা হয়, তখন Auxiliary Verb সাবজেক্টের আগে চলে আসে।",
    "conceptBreakdown": [
      "Inversion-এর মূল সূত্র: Negative Adverbial Phrase + Auxiliary Verb + Subject + Main Verb। সাধারণ বাক্যের তুলনায় এটি জোর ও গাম্ভীর্য প্রকাশ করে।",
      "Hardly / Scarcely had... when: \"Hardly had the scientists published the paper when international inquiries flooded in।\" (কখনো than হবে না, when বসবে)।",
      "No sooner had... than: \"No sooner had the legislation been enacted than public compliance improved।\" (No sooner-এর সাথে সর্বদা than বসে)।",
      "Not only... but also Inversion: \"Not only did the policy curb emissions, but it also catalyzed industrial innovation।\"",
      "Under no circumstances / On no account: \"Under no circumstances should sensitive genetic data be disseminated without consent।\"",
      "Conditional Inversion (If বাদ দেওয়া): \"Had I realized...\" (= If I had realized); \"Were the government to intervene...\" (= If the government intervened); \"Should you require assistance...\" (= If you require assistance)।"
    ],
    "formula": "[Negative Word] + [Auxiliary Verb] + [Subject] + [Main Verb] (e.g. \"Rarely do governments reverse...\")",
    "examples": [
      {
        "en": "Seldom do developing economies transition to green infrastructure without substantial international subsidies.",
        "bn": "আন্তর্জাতিক ভর্তুকি ছাড়া উন্নয়নশীল অর্থনীতিগুলো কদাচিৎ সবুজ অবকাঠামোয় রূপান্তরিত হয়।",
        "context": "Negative adverb (Seldom) + Aux (do) + Subject (economies) + Verb (transition)।"
      },
      {
        "en": "No sooner had the regulatory framework been gazetted than multinational corporations adapted their protocols.",
        "bn": "আইনগত কাঠামোটি গেজেটভুক্ত হতে না হতেই বহুজাতিক কর্পোরেশনগুলো তাদের প্রোটোকল মানিয়ে নিয়েছিল।",
        "context": "No sooner had + S + V3 + than।"
      },
      {
        "en": "Under no circumstances should empirical research integrity be compromised for commercial profitability.",
        "bn": "কোনো অবস্থাতেই বাণিজ্যিক মুনাফার জন্য অভিজ্ঞতামূলক গবেষণার সততা ক্ষুণ্ন করা উচিত নয়।",
        "context": "Under no circumstances + modal (should) + Subject (integrity)।"
      },
      {
        "en": "Had the central bank raised liquidity reserves earlier, the monetary panic would have been forestalled.",
        "bn": "কেন্দ্রীয় ব্যাংক যদি আগে তারল্য রিজার্ভ বৃদ্ধি করত, তবে মুদ্রাসংক্রান্ত আতঙ্ক ঠেকানো যেত।",
        "context": "Conditional inversion (Had + S + V3, replacing If)।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Rarely governments do intervene in market trends.",
        "correct": "Rarely do governments intervene in market trends.",
        "reason": "Negative adverb শুরুতে এলে auxiliary verb (do) সাবজেক্টের (governments) আগে আসতে হবে।"
      },
      {
        "wrong": "Hardly had he arrived than the bell rang.",
        "correct": "Hardly had he arrived when the bell rang.",
        "reason": "Hardly-এর সাথে \"when\" বসে, \"than\" বসে না (No sooner-এর সাথে than বসে)।"
      },
      {
        "wrong": "Never I have experienced such a rigorous test.",
        "correct": "Never have I experienced such a rigorous test.",
        "reason": "Never শুরুতে বসলে Auxiliary (have) সাবজেক্টের (I) আগে বসবে।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের সূত্র অনুযায়ী সঠিক Inversion কাঠামো নির্বাচন করুন:",
        "question": "Seldom _______ such unprecedented atmospheric turbulence over maritime flight paths.",
        "options": [
          "A. commercial aviators encounter",
          "B. do commercial aviators encounter",
          "C. commercial aviators do encounter",
          "D. did encountered commercial aviators"
        ],
        "correctAnswer": "B. do commercial aviators encounter",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Seldom শুরুতে থাকায় Auxiliary Verb (do) + Subject (commercial aviators) + Base Verb (encounter) হবে।",
        "hint": "Negative Adverb + Auxiliary + Subject + Main Verb।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ২ ও ৩ অনুযায়ী সঠিক কনজাংশনটি লিখুন (when / than): \"Hardly had the vaccine been synthesized [input] regulatory approval was sought.\"",
        "question": "Hardly had the vaccine been synthesized [input] regulatory approval was sought.",
        "correctAnswer": "when",
        "explanation": "লেসনের নিয়ম ২ অনুযায়ী: Hardly had-এর সাথে সর্বদা \"when\" বসে, \"than\" বসে না।",
        "hint": "Hardly-এর সাথে when বসে।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (No sooner had... than) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Identify the sentence with flawless No sooner inversion:",
        "options": [
          "A. No sooner had the bell rung when students departed.",
          "B. No sooner had the bell rung than students departed.",
          "C. No sooner the bell had rung than students departed.",
          "D. No sooner did the bell rung than students departed."
        ],
        "correctAnswer": "B. No sooner had the bell rung than students departed.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: No sooner had + Subject + V3 + than সমন্বয় ব্যাকরণগতভাবে নিখুঁত।",
        "hint": "No sooner had-এর সাথে than বসে।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "Conditional Inversion: \"If the committee had approved the grant...\" বাক্যটিকে \"If\" বাদ দিয়ে শুরু করুন (Had [input] the grant):",
        "question": "Had the committee [input] the grant, the project would have started.",
        "correctAnswer": "approved",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: If বাদ দিলে \"Had + Subject + V3\" (Had the committee approved) বসে।",
        "hint": "V3 রূপ approved লিখুন।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৪ (Not only... but also Inversion) অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Choose the sentence correctly inverting the first clause:",
        "options": [
          "A. Not only the project was on schedule, but it was also under budget.",
          "B. Not only was the project on schedule, but it was also under budget.",
          "C. Not only on schedule the project was, but it also was under budget.",
          "D. Not only did the project was on schedule, but also under budget."
        ],
        "correctAnswer": "B. Not only was the project on schedule, but it was also under budget.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: \"Not only\"-র পর Be-verb (was) সাবজেক্টের (the project) আগে চলে আসে।",
        "hint": "Not only was the project on schedule..."
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "নিষেধাজ্ঞা প্রকাশে Auxiliary রূপ লিখুন: \"Under no circumstances [input] candidates falsify credentials.\"",
        "question": "Under no circumstances [input] candidates falsify credentials.",
        "correctAnswer": "should",
        "explanation": "Under no circumstances-এর পর মোডাল অক্সিলিয়ারি \"should\" বা \"must\" বসে।",
        "hint": "Should বা must লিখুন।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী ভুল অংশ চিহ্নিত করুন:",
        "question": "Rarely \"the financial analysts observed\" such acute fiscal contraction in emerging markets.",
        "options": [
          "A. Rarely",
          "B. the financial analysts observed",
          "C. such acute fiscal",
          "D. emerging markets"
        ],
        "correctAnswer": "B. the financial analysts observed",
        "explanation": "লেসনের ভুল টেবিল অনুযায়ী: Rarely শুরুতে থাকায় ইনভার্সন বাধ্যতামূলক; \"did the financial analysts observe\" হতে হবে।",
        "hint": "Rarely-এর পর did + Subject + observe হবে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Never-এর সঠিক ইনভার্সন রূপ লিখুন (have I / I have): \"Never [input] witnessed such profound academic rigor.\"",
        "question": "Never [input] witnessed such profound academic rigor.",
        "correctAnswer": "have I",
        "explanation": "Never শুরুতে থাকায় Auxiliary Verb আগে আসবে: \"have I\"।",
        "hint": "have I লিখুন।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "Conditional Inversion-এ \"If I were in your position...\" এর বিকল্প কোনটি?",
        "question": "Which of the following correctly inverts \"If I were in your position\"?",
        "options": [
          "A. Were I in your position",
          "B. Was I in your position",
          "C. Did I were in your position",
          "D. Had I in your position"
        ],
        "correctAnswer": "A. Were I in your position",
        "explanation": "লেসনের নিয়ম ৬ অনুযায়ী: If বাদ দিলে \"Were I in your position\" সঠিক রূপ।",
        "hint": "Were I in your position..."
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "No sooner-এর পর সঠিক অক্সিলিয়ারি লিখুন: \"No sooner [input] the treaty been signed than trade normalized.\"",
        "question": "No sooner [input] the treaty been signed than trade normalized.",
        "correctAnswer": "had",
        "explanation": "No sooner had + Subject + V3 সূত্রানুযায়ী \"had\" বসবে।",
        "hint": "Had লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের 'Seldom' বাক্যের শুরুতে বসলে Inversion পদক্রমের নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Choose the sentence that applies grammatical inversion accurately with \"Seldom\":",
        "options": [
          "A. Seldom economists have witnessed such rapid industrial expansion.",
          "B. Seldom have economists witnessed such rapid industrial expansion.",
          "C. Seldom economists witnessed have such expansion.",
          "D. Seldom witnessed have economists such expansion."
        ],
        "correctAnswer": "B. Seldom have economists witnessed such rapid industrial expansion.",
        "explanation": "লেসনের সূত্র অনুযায়ী: নেগেটিভ অ্যাডভার্ব শুরুতে এলে ইনভার্সন ঘটে: Negative Adverb + Auxiliary Verb (have) + Subject + Main Verb (witnessed)।",
        "hint": "Negative + Auxiliary + Subject + Main Verb পদক্রম খুঁজুন।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের 'Under no circumstances' ইনভার্সন নিয়ম অনুযায়ী সঠিক সহায়ক ক্রিয়া টাইপ করুন (should/you should):",
        "question": "Under no circumstances [input] unauthorized personnel enter the high-voltage turbine chamber.",
        "correctAnswer": "should",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Under no circumstances'-এর পর পরই Auxiliary Verb (should) বসে, তারপর Subject (personnel) আসে।",
        "hint": "Auxiliary verb should টাইপ করুন।"
      },
      {
        "id": 13,
        "type": "mcq",
        "instruction": "লেসনের 'Not only... but also' দিয়ে ইনভার্সন নিয়ম অনুযায়ী সঠিক বাক্য কোনটি?",
        "question": "Select the sentence with impeccable inversion following \"Not only\":",
        "options": [
          "A. Not only the algorithm predicted market movements, but it also executed trades.",
          "B. Not only did the algorithm predict market movements, but it also executed trades.",
          "C. Not only predicted the algorithm movements, but also it executed trades.",
          "D. Not only does predicted the algorithm movements, but executed trades."
        ],
        "correctAnswer": "B. Not only did the algorithm predict market movements, but it also executed trades.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Not only' বাক্যের প্রথমে থাকলে প্রথম ক্লজে ইনভার্সন (did the algorithm predict) আবশ্যক।",
        "hint": "Not only + did + subject + verb বেস ফর্ম।"
      },
      {
        "id": 14,
        "type": "fill-typing",
        "instruction": "লেসনের 'Only after' প্রধান ক্লজে ইনভার্সন নিয়ম অনুযায়ী ব্র্যাকেটের সহায়ক ক্রিয়া টাইপ করুন (did/had):",
        "question": "Only after the forensic data was analyzed [input] the detectives formulate a credible hypothesis.",
        "correctAnswer": "did",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Only after...' ক্লজ শেষে মূল ক্লজে ইনভার্সন ঘটে (did the detectives formulate)।",
        "hint": "Auxiliary verb did লিখুন।"
      },
      {
        "id": 15,
        "type": "mcq",
        "instruction": "লেসনের 'Little' দ্বারা অজ্ঞাত পরিস্থিতি বোঝাতে ইনভার্সন নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Which sentence accurately employs \"Little\" as an introductory negative adverb?",
        "options": [
          "A. Little they knew that the oceanic currents were shifting violently.",
          "B. Little did they know that the oceanic currents were shifting violently.",
          "C. Little knew they that the currents were shifting.",
          "D. Little have they known yesterday that currents shifted."
        ],
        "correctAnswer": "B. Little did they know that the oceanic currents were shifting violently.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: 'Little' শুরুতে বসলে Past Simple-এর ইনভার্সন গঠনে 'did + subject + base verb' (did they know) বসে।",
        "hint": "Little did they know গঠনটি সঠিক।"
      }
    ]
  },
  {
    "id": "l6-nominalization-punctuation",
    "level": 6,
    "levelTitle": "Level 6: Advanced Band 8.5+ Academic Arsenal (উচ্চমার্গের ব্যাকরণগত অলঙ্কার)",
    "levelSubtitle": "নেগেটিভ ইনভার্সন, কন্ডিশনালস ও উচ্চমার্গের ব্যাকরণগত অলঙ্কার",
    "title": "Nominalization & Academic Punctuation (The Semicolon Rule)",
    "bengaliTitle": "নমিন্যালাইজেশন ও বিরামচিহ্নের জাদু (সেমিকোলন ও কমা রুলস)",
    "badge": "IELTS Band 9 Style",
    "estimatedMinutes": 25,
    "contextStory": "নমিন্যালাইজেশন (Nominalization) হলো সাধারণ ইংরেজিকে হাই-ব্যান্ড একাডেমিক ইংরেজিতে রূপান্তরের জাদুকরি চাবিকাঠি। সাধারণ ভাষায় বলা হয়: \"Because the government spent more money on hospitals, people became healthier.\" কিন্তু ব্যান্ড ৮.৫+ স্টাইলে লেখা হয়: \"Increased governmental expenditure on healthcare catalyzed tangible improvements in public health।\" ক্রিয়াপদকে বিশেষ্যে রূপান্তর করে ছোট ও গম্ভীর বাক্য তৈরি করার এই কায়দাই হলো নমিন্যালাইজেশন।",
    "conceptBreakdown": [
      "Nominalization: Verb বা Adjective-কে Noun-এ রূপান্তর করে একাডেমিক ঘনত্ব বাড়ানো (e.g. expand -> expansion, analyze -> analysis, destroy -> destruction, improve -> improvement, diverse -> diversity)।",
      "Semicolon (;) রুল: দুটি ঘনিষ্ঠভাবে সম্পর্কিত স্বাধীন বাক্যকে (Independent Clauses) কোনো কনজাংশন ছাড়া অথবা Conjunctive Adverb (however, therefore, consequently, nevertheless)-এর আগে জোড়া লাগাতে সেমিকোলন ব্যবহৃত হয়।",
      "Semicolon + Transition Formula: [Independent Clause]; [Conjunctive Adverb], [Independent Clause] (e.g. \"Renewable infrastructure requires capital; however, long-term savings justify it\")।",
      "Comma Splice পরিহার: দুটি পূর্ণাঙ্গ বাক্যকে শুধু কমা (,) দিয়ে জোড়া লাগানো একটি মারাত্মক ভুল (e.g. \"The sun set, it grew cold\" - ভুল! সেমিকোলন বা কনজাংশন আবশ্যক)।",
      "Colon (:) রুল: কোনো ব্যাখ্যামূলক তালিকা, উদ্ধৃতি বা পূর্ববর্তী ধারণার বিশদ রূপ দেওয়ার পূর্বে কোলন বসে।"
    ],
    "formula": "[Sentence 1]; however/consequently/therefore, [Sentence 2] | Noun Phrase + Catalyzed/Yielded + Noun Phrase",
    "examples": [
      {
        "en": "The proliferation of algorithmic automation has accelerated industrial productivity; nevertheless, it exacerbates technological unemployment.",
        "bn": "অ্যালগরিদমিক অটোমেশনের বিস্তার শিল্প উৎপাদনশীলতাকে ত্বরান্বিত করেছে; তবুও, এটি প্রযুক্তিগত বেকারত্বকে বাড়িয়ে তোলে।",
        "context": "নমিন্যালাইজেশন (\"The proliferation\") এবং নিখুঁত সেমিকোলন (;) এর ব্যবহার।"
      },
      {
        "en": "Substantial governmental investment in public transit catalyzes significant reductions in vehicular emissions.",
        "bn": "গণপরিবহনে সরকারের পর্যাপ্ত বিনিয়োগ যানবাহনের কার্বন নিঃসরণে উল্লেখযোগ্য হ্রাসের অনুঘটক হিসেবে কাজ করে।",
        "context": "Verb-এর বদলে Noun (investment, reductions) ব্যবহার করে বাক্যকে গম্ভীর করা।"
      },
      {
        "en": "Solar power generation fluctuates with meteorological conditions; consequently, battery storage is indispensable.",
        "bn": "সৌর বিদ্যুৎ উৎপাদন আবহাওয়ার অবস্থার সাথে ওঠানামা করে; ফলস্বরূপ, ব্যাটারি সঞ্চয়স্থান অপরিহার্য।",
        "context": "সেমিকোলন + consequently + কমা।"
      },
      {
        "en": "The scientific symposium addressed three core sustainability frontiers: decarbonization, desalination, and circular agriculture.",
        "bn": "বৈজ্ঞানিক সিম্পোজিয়ামে তিনটি মূল টেকসই ক্ষেত্র আলোচনা করা হয়েছিল: কার্বনমুক্তকরণ, লবণাক্ততামুক্তকরণ এবং বৃত্তাকার কৃষি।",
        "context": "তালিকা প্রকাশের পূর্বে কোলন (:) এর সঠিক ব্যবহার।"
      }
    ],
    "commonMistakes": [
      {
        "wrong": "Electric cars are clean, they reduce emissions.",
        "correct": "Electric cars are clean; they reduce emissions. (or: Electric cars are clean, and they reduce emissions.)",
        "reason": "Comma Splice: দুটি পূর্ণাঙ্গ বাক্যের মাঝে শুধু কমা দেওয়া ব্যাকরণগত ভুল; সেমিকোলন বা কনজাংশন আবশ্যক।"
      },
      {
        "wrong": "The government expanded the highway, consequently traffic eased.",
        "correct": "The government expanded the highway; consequently, traffic eased.",
        "reason": "Consequently-এর আগে সেমিকোলন (;) এবং পরে কমা (,) বসাতে হবে।"
      },
      {
        "wrong": "People pollute rivers because they are careless.",
        "correct": "Careless human practices lead to the pollution of river ecosystems.",
        "reason": "ব্যান্ড ৮+ নমিন্যালাইজড স্টাইলে verb-কে Noun (pollution) করা শ্রেয়।"
      }
    ],
    "exercises": [
      {
        "id": 1,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৩ (Semicolon + Transition) অনুযায়ী সঠিক বিরামচিহ্নযুক্ত বাক্য কোনটি?",
        "question": "Identify the sentence with correct academic punctuation and transition:",
        "options": [
          "A. Solar energy is sustainable, it lowers household electricity expenditure.",
          "B. Solar energy is sustainable; consequently, widespread adoption minimizes carbon emissions.",
          "C. Solar energy is sustainable, consequently, widespread adoption minimizes carbon emissions.",
          "D. Solar energy is sustainable; but widespread adoption minimizes carbon emissions."
        ],
        "correctAnswer": "B. Solar energy is sustainable; consequently, widespread adoption minimizes carbon emissions.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: দুটি স্বাধীন ক্লজের মাঝে সেমিকোলন (;) + Transition Adverb (consequently) + কমা (,) হলো উচ্চমানের একাডেমিক ফরম্যাট।",
        "hint": "\"consequently\"-র আগে সেমিকোলন (;) এবং পরে কমা (,) বসবে।"
      },
      {
        "id": 2,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ১ (Nominalization) অনুযায়ী \"destroy\" ক্রিয়াপদটির Noun রূপ টাইপ করুন:",
        "question": "The wanton (destroy) [input] of ancient mangrove wetlands precipitated severe coastal storm surges.",
        "correctAnswer": "destruction",
        "explanation": "Destroy ক্রিয়াপদের Noun রূপ হলো \"destruction\"।",
        "hint": "Destroy-এর বিশেষ্য রূপ destruction।"
      },
      {
        "id": 3,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৪ অনুযায়ী Comma Splice ভুল সম্বলিত বাক্য কোনটি?",
        "question": "Which of the following sentences exhibits a Comma Splice error?",
        "options": [
          "A. The treaty was ratified; international borders opened immediately.",
          "B. The treaty was ratified, international borders opened immediately.",
          "C. The treaty was ratified, and international borders opened immediately.",
          "D. Because the treaty was ratified, international borders opened."
        ],
        "correctAnswer": "B. The treaty was ratified, international borders opened immediately.",
        "explanation": "লেসনের নিয়ম ৪ অনুযায়ী: দুটি পূর্ণাঙ্গ স্বাধীন বাক্যকে কোনো কনজাংশন ছাড়া কেবল কমা (,) দিয়ে জোড়া লাগানো মারাত্মক Comma Splice ভুল।",
        "hint": "দুটি পূর্ণ বাক্যের মাঝে শুধু কমা থাকলে Comma Splice হয়।"
      },
      {
        "id": 4,
        "type": "fill-typing",
        "instruction": "লেসনের নিয়ম ১ অনুযায়ী \"invest\" ক্রিয়াপদটির Noun রূপ লিখুন: \"Substantial capital [input] is vital for tech startups.\"",
        "question": "Substantial capital [input] is vital for tech startups.",
        "correctAnswer": "investment",
        "explanation": "Invest-এর Noun রূপ হলো \"investment\"।",
        "hint": "Invest-এর বিশেষ্য রূপ investment।"
      },
      {
        "id": 5,
        "type": "mcq",
        "instruction": "লেসনের নিয়ম ৫ (Colon রুল) অনুযায়ী সঠিক বাক্যটি চিহ্নিত করুন:",
        "question": "Choose the sentence demonstrating appropriate colon (:) usage:",
        "options": [
          "A. The research scrutinized three parameters: volatility, liquidity, and solvency.",
          "B. The research scrutinized: three parameters volatility, liquidity, and solvency.",
          "C. The research: scrutinized three parameters.",
          "D. Parameters were: volatility and liquidity."
        ],
        "correctAnswer": "A. The research scrutinized three parameters: volatility, liquidity, and solvency.",
        "explanation": "লেসনের নিয়ম ৫ অনুযায়ী: তালিকার পূর্বে একটি পূর্ণাঙ্গ বাক্য সমাপ্ত হওয়ার পর কোলন (:) বসে।",
        "hint": "তালিকা প্রকাশের পূর্বে কোলন বসে।"
      },
      {
        "id": 6,
        "type": "fill-typing",
        "instruction": "Nominalization: \"improve\"-এর Noun রূপ লিখুন: \"The healthcare intervention led to tangible [input] in infant mortality.\"",
        "question": "The healthcare intervention led to tangible [input] in infant mortality.",
        "correctAnswer": "improvement",
        "explanation": "Improve-এর Noun রূপ হলো \"improvement\"।",
        "hint": "Improve-এর বিশেষ্য রূপ improvement।"
      },
      {
        "id": 7,
        "type": "mcq",
        "instruction": "লেসনের ভুল টেবিল অনুযায়ী নিচের কোন বাক্যটি ব্যাকরণগতভাবে সঠিক?",
        "question": "Select the grammatically flawless sentence:",
        "options": [
          "A. Fuel prices rose rapidly, however consumption did not decline.",
          "B. Fuel prices rose rapidly; however, consumption did not decline.",
          "C. Fuel prices rose rapidly, however, consumption did not decline.",
          "D. Fuel prices rose rapidly; however consumption did not decline."
        ],
        "correctAnswer": "B. Fuel prices rose rapidly; however, consumption did not decline.",
        "explanation": "লেসনের নিয়ম ৩ অনুযায়ী: However-এর পূর্বে সেমিকোলন (;) এবং পরে কমা (,) বসানো আবশ্যক।",
        "hint": "However-এর আগে সেমিকোলন ও পরে কমা বসে।"
      },
      {
        "id": 8,
        "type": "fill-typing",
        "instruction": "Adjective \"diverse\"-এর Noun রূপ টাইপ করুন: \"Biological [input] is vital for healthy ecosystems.\"",
        "question": "Biological [input] is vital for healthy ecosystems.",
        "correctAnswer": "diversity",
        "explanation": "Diverse-এর Noun রূপ হলো \"diversity\"।",
        "hint": "Diverse-এর বিশেষ্য রূপ diversity।"
      },
      {
        "id": 9,
        "type": "mcq",
        "instruction": "নিচের কোন বাক্যটিতে উচ্চমানের Band 9 নমিন্যালাইজড শৈলী ফুটে উঠেছে?",
        "question": "Identify the sentence demonstrating superior academic Nominalization:",
        "options": [
          "A. Because factories polluted the river, fish died.",
          "B. Industrial pollution of the river caused mass aquatic mortality.",
          "C. Factories polluted river so fish died.",
          "D. Fish died because of pollution from factories."
        ],
        "correctAnswer": "B. Industrial pollution of the river caused mass aquatic mortality.",
        "explanation": "লেসনের নিয়ম ১ অনুযায়ী: Verb-কে Noun-এ রূপান্তর করে (pollution, aquatic mortality) সংক্ষিপ্ত ও গম্ভীর একাডেমিক বাক্য গঠন করা হয়েছে।",
        "hint": "ক্রিয়াপদকে বিশেষ্যে রূপান্তর করা বাক্যটি বেছে নিন।"
      },
      {
        "id": 10,
        "type": "fill-typing",
        "instruction": "Transition word \"therefore\"-এর সঠিক বিরামচিহ্ন লিখুন (সেমিকোলন ও কমা সহ): \"Data was corrupted [input] the trial was repeated.\"",
        "question": "Data was corrupted; therefore, the trial was repeated.",
        "correctAnswer": "; therefore,",
        "explanation": "সেমিকোলন + therefore + কমা হলো সঠিক সংযোগ।",
        "hint": "; therefore, লিখুন।"
      },
      {
        "id": 11,
        "type": "mcq",
        "instruction": "লেসনের একাডেমিক নমিনালাইজেশন (Nominalization - ক্রিয়াকে বিশেষ্যে রূপান্তর) নিয়ম অনুযায়ী সবচেয়ে উন্নত বাক্য কোনটি?",
        "question": "Convert the spoken style: \"When the population grew rapidly, it caused food supplies to decline.\" into formal academic prose:",
        "options": [
          "A. Because people grew faster, food got lesser.",
          "B. Rapid population growth precipitated a marked decline in agricultural resources.",
          "C. Population grew fast so declining agricultural food.",
          "D. Food supplies declined when people increased."
        ],
        "correctAnswer": "B. Rapid population growth precipitated a marked decline in agricultural resources.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: ক্রিয়াপদগুলোকে একাডেমিক Noun Phrase (growth, decline) বানিয়ে সংক্ষেপিত ও উচ্চমানের ব্যান্ড ৯ বাক্য তৈরি করা হয়েছে।",
        "hint": "Rapid population growth precipitated a marked decline... গঠনটি লক্ষ্য করুন।"
      },
      {
        "id": 12,
        "type": "fill-typing",
        "instruction": "লেসনের সেমিকোলন (;) বনাম কোলন (:) নিয়ম অনুযায়ী তালিকা বা বিস্তারিত বর্ণনার প্রারম্ভিক চিহ্নটি টাইপ করুন:",
        "question": "The expedition requires three essential instruments [input] a satellite tracker, a desalination kit, and an emergency beacon.",
        "correctAnswer": ":",
        "explanation": "লেসনের বিরামচিহ্ন নিয়ম অনুযায়ী: কোনো পূর্ণাঙ্গ ক্লজের পর তালিকা বা ব্যাখ্যা উপস্থাপন করতে কোলন (:) বসে।",
        "hint": "কোলন চিহ্নটি (:) টাইপ করুন।"
      },
      {
        "id": 13,
        "type": "mcq",
        "instruction": "লেসনের হাইফেনেটেড যৌগিক বিশেষণ (Hyphenated Compound Adjectives) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:",
        "question": "Which sentence accurately punctuates compound modifiers before a noun?",
        "options": [
          "A. The university inaugurated a state of the art laboratory today.",
          "B. The university inaugurated a state-of-the-art laboratory today.",
          "C. The university inaugurated a state-of-the art laboratory today.",
          "D. The laboratory is state-of-the-art."
        ],
        "correctAnswer": "B. The university inaugurated a state-of-the-art laboratory today.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: Noun (laboratory)-এর পূর্বে যৌগিক বিশেষণটি হাইফেনযুক্ত (state-of-the-art) হয়।",
        "hint": "শব্দগুলোর মাঝে হাইফেন যুক্ত state-of-the-art সঠিক।"
      },
      {
        "id": 14,
        "type": "fill-typing",
        "instruction": "লেসনের অতিরিক্ত অবান্তর নমিনালাইজেশন পরিহার (Clarity over Complexity) নিয়ম অনুযায়ী ব্র্যাকেটের স্বাভাবিক ভার্ব লিখুন:",
        "question": "Instead of \"make an examination of\", academic stylists simply recommend to [input] (examine) the specimen directly.",
        "correctAnswer": "examine",
        "explanation": "লেসনের কমন মিসটেক অনুযায়ী: অহেতুক ভারী নাউন পরিহার করে স্পষ্ট ও জোরালো ভার্ব (examine) ব্যবহার করাই উত্তম।",
        "hint": "Examine শব্দটি লিখুন।"
      },
      {
        "id": 15,
        "type": "mcq",
        "instruction": "লেসনের ড্যাশ (Em-dash) বনাম প্যারেন্থেসিস ব্যবহারের নিয়ম অনুযায়ী সঠিক বাক্যটি শনাক্ত করুন:",
        "question": "Select the sentence where parenthetical em-dashes emphasize an unexpected outcome accurately:",
        "options": [
          "A. The experimental drug—despite minimal prior testing—cured 94% of stage-two patients.",
          "B. The experimental drug-despite minimal prior testing-cured patients.",
          "C. The drug—despite minimal prior testing cured patients.",
          "D. The drug despite minimal prior testing—cured patients."
        ],
        "correctAnswer": "A. The experimental drug—despite minimal prior testing—cured 94% of stage-two patients.",
        "explanation": "লেসনের নিয়ম অনুযায়ী: বাক্যের মাঝে আকস্মিক বা চমকপ্রদ অতিরিক্ত তথ্য জোর দিয়ে অন্তর্ভুক্ত করতে জোড়া Em-dash (—...—) ব্যবহৃত হয়।",
        "hint": "উভয়পাশে em-dash (—) দ্বারা আবদ্ধ অংশটি দেখুন।"
      }
    ]
  }
];
