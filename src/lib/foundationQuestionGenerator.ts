/**
 * Unlimited Dynamic AI Question Engine for Pre-IELTS Foundation Academy
 * Generates infinite, pedagogically aligned practice questions and retake exams
 * mapped 100% strictly to the lesson's grammar rules, formulas, and common mistakes.
 */

import { FoundationLesson, PracticeExercise } from './foundationCurriculumRegistry';

interface QuestionTemplate {
  lessonId: string;
  type: 'mcq' | 'fill-typing';
  instruction: string;
  hint: string;
  generate: (salt: number) => {
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  };
}

// Academic vocabulary and context subjects for dynamic synthesis
const academicContexts = [
  { subj: 'Marine biologists', domain: 'oceanographic conservation', action: 'monitor', noun: 'coral bleaching' },
  { subj: 'Environmental economists', domain: 'renewable policy', action: 'evaluate', noun: 'carbon taxation' },
  { subj: 'Software architects', domain: 'cloud computing', action: 'optimize', noun: 'database latency' },
  { subj: 'Neuroscience researchers', domain: 'cognitive therapy', action: 'investigate', noun: 'neural plasticity' },
  { subj: 'Urban planners', domain: 'sustainable transport', action: 'redesign', noun: 'metropolitan transit' },
  { subj: 'Public health analysts', domain: 'epidemic prevention', action: 'track', noun: 'vaccination equity' },
  { subj: 'Financial auditors', domain: 'corporate governance', action: 'scrutinize', noun: 'fiscal expenditures' },
  { subj: 'Agronomists', domain: 'food security', action: 'cultivate', noun: 'drought-resistant crops' },
  { subj: 'Architectural historians', domain: 'heritage restoration', action: 'document', noun: 'medieval ruins' },
  { subj: 'Aerospace engineers', domain: 'satellite navigation', action: 'calibrate', noun: 'orbital telemetry' }
];

// Rich rule generators for lessons
const TEMPLATES: QuestionTemplate[] = [
  // --- LEVEL 1: Sentence Foundations ---
  {
    lessonId: 'l1-parts-of-speech',
    type: 'mcq',
    instruction: 'লেসনের শব্দশ্রেণী (Parts of Speech) নিয়ম অনুযায়ী চিহ্নিত শব্দটি কোন পদ?',
    hint: 'ক্রিয়া কীভাবে ঘটল তা Adverb এবং ক্রিয়া সম্পাদনকারীকে Noun নির্দেশ করে।',
    generate: (salt) => {
      const c = academicContexts[salt % academicContexts.length];
      const adverbs = [
        { word: 'meticulously', base: 'meticulous', pos: 'Adverb' },
        { word: 'comprehensively', base: 'comprehensive', pos: 'Adverb' },
        { word: 'rigorously', base: 'rigorous', pos: 'Adverb' },
        { word: 'efficiently', base: 'efficient', pos: 'Adverb' },
        { word: 'substantially', base: 'substantial', pos: 'Adverb' }
      ];
      const selected = adverbs[salt % adverbs.length];
      return {
        question: `${c.subj} \"${selected.word}\" ${c.action} ${c.noun} to ensure research accuracy.`,
        options: ['A. Adverb', 'B. Adjective', 'C. Noun', 'D. Preposition'],
        correctAnswer: 'A. Adverb',
        explanation: `লেসনের নিয়ম ৫ অনুযায়ী: ${c.action} (Verb)-এর কাজ কীভাবে সম্পন্ন হচ্ছে তা বিশেষায়িত করায় "${selected.word}" একটি Adverb।`
      };
    }
  },
  {
    lessonId: 'l1-parts-of-speech',
    type: 'fill-typing',
    instruction: 'লেসনের SVO নিয়ম অনুযায়ী ব্র্যাকেটের শব্দটির সঠিক Adverb রূপ শূন্যস্থানে টাইপ করুন:',
    hint: 'Adjective-এর শেষে -ly যুক্ত করে Adverb তৈরি করুন।',
    generate: (salt) => {
      const c = academicContexts[(salt + 3) % academicContexts.length];
      const pairs = [
        { adj: 'precise', adv: 'precisely' },
        { adj: 'systematic', adv: 'systematically' },
        { adj: 'thorough', adv: 'thoroughly' },
        { adj: 'consistent', adv: 'consistently' },
        { adj: 'rapid', adv: 'rapidly' }
      ];
      const p = pairs[salt % pairs.length];
      return {
        question: `The laboratory assistant calibrated the measuring equipment [input] (${p.adj}) before the experiment.`,
        correctAnswer: p.adv,
        explanation: `লেসনের নিয়ম অনুযায়ী: Calibrated (verb)-কে মডিফাই করার জন্য "${p.adj}"-এর Adverb রূপ "${p.adv}" প্রয়োজন।`
      };
    }
  },
  {
    lessonId: 'l1-nouns-countability',
    type: 'fill-typing',
    instruction: 'লেসনের Uncountable Noun নিয়ম অনুযায়ী ব্র্যাকেটের বহুবচন পরিহার করে সঠিক রূপ লিখুন:',
    hint: 'Uncountable Noun-এর সাথে -s বা -es যুক্ত হয় না।',
    generate: (salt) => {
      const words = [
        { wrong: 'equipments', correct: 'equipment', mean: 'যন্ত্রপাতি' },
        { wrong: 'informations', correct: 'information', mean: 'তথ্য' },
        { wrong: 'researches', correct: 'research', mean: 'গবেষণা' },
        { wrong: 'furnitures', correct: 'furniture', mean: 'আসবাবপত্র' },
        { wrong: 'evidences', correct: 'evidence', mean: 'প্রমাণ' }
      ];
      const w = words[salt % words.length];
      return {
        question: `The research institute invested heavily in state-of-the-art laboratory [input] (${w.wrong} নয়) for the scientists.`,
        correctAnswer: w.correct,
        explanation: `লেসনের নিয়ম ২ অনুযায়ী: "${w.correct}" একটি Uncountable Noun, যার সাথে কখনোই বহুবচনে 's/es' যোগ করা যায় না।`
      };
    }
  },
  {
    lessonId: 'l1-nouns-countability',
    type: 'mcq',
    instruction: 'লেসনের গ্রিক/ল্যাটিন অনিয়মিত বহুবচন (Irregular Plural) নিয়ম অনুযায়ী সঠিক বহুবচন বাছুন:',
    hint: 'Criterion -> criteria, datum -> data, analysis -> analyses।',
    generate: (salt) => {
      const pairs = [
        { sing: 'criterion', plur: 'criteria' },
        { sing: 'phenomenon', plur: 'phenomena' },
        { sing: 'hypothesis', plur: 'hypotheses' },
        { sing: 'analysis', plur: 'analyses' }
      ];
      const p = pairs[salt % pairs.length];
      return {
        question: `The international admissions panel established five rigorous admission _______ (${p.sing}-এর বহুবচন রূপ):`,
        options: [`A. ${p.plur}`, `B. ${p.sing}s`, `C. ${p.plur}s`, `D. ${p.sing}es`],
        correctAnswer: `A. ${p.plur}`,
        explanation: `লেসনের নিয়ম ৩ অনুযায়ী: "${p.sing}"-এর ব্যাকরণগত শুদ্ধ বহুবচন রূপ হলো "${p.plur}"।`
      };
    }
  },
  {
    lessonId: 'l1-pronoun-accuracy',
    type: 'mcq',
    instruction: 'লেসনের Pronoun Case (Subject vs Object) নিয়ম অনুযায়ী শূন্যস্থানে সঠিক সর্বনাম বসান:',
    hint: 'Preposition-এর পর Object সর্বনাম (me, him, her, them, whom) বসে।',
    generate: (salt) => {
      const c = academicContexts[salt % academicContexts.length];
      return {
        question: `The lead investigator assigned the complex statistical analysis to Dr. Evans and _______ (I / me).`,
        options: ['A. me', 'B. I', 'C. myself', 'D. mine'],
        correctAnswer: 'A. me',
        explanation: `লেসনের নিয়ম ১ অনুযায়ী: Preposition 'to'-এর পর সর্বদা Objective Pronoun 'me' বসে, Subjective 'I' নয়।`
      };
    }
  },

  // --- LEVEL 2: Tense & Aspect Architecture ---
  {
    lessonId: 'l2-present-simple-vs-continuous',
    type: 'mcq',
    instruction: 'লেসনের Present Continuous (সমসাময়িক সাময়িক প্রবণতা) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:',
    hint: 'These days, currently থাকলে চলমান প্রবণতায় Present Continuous হয়।',
    generate: (salt) => {
      const verbs = [
        { verb: 'are adopting', sub: 'More corporate entities', obj: 'renewable solar microgrids' },
        { verb: 'are prioritizing', sub: 'Leading universities', obj: 'interdisciplinary data literacy' },
        { verb: 'are migrating', sub: 'Traditional retailers', obj: 'automated cloud storefronts' }
      ];
      const v = verbs[salt % verbs.length];
      return {
        question: `Which sentence accurately portrays an ongoing societal trend this decade?`,
        options: [
          `A. ${v.sub} ${v.verb} ${v.obj} these days.`,
          `B. ${v.sub} adopts ${v.obj} these days.`,
          `C. ${v.sub} is adopted ${v.obj} these days.`,
          `D. ${v.sub} have adopt ${v.obj} these days.`
        ],
        correctAnswer: `A. ${v.sub} ${v.verb} ${v.obj} these days.`,
        explanation: `লেসনের নিয়ম ২ অনুযায়ী: 'These days' সংবলিত চলমান সামাজিক প্রবণতায় Present Continuous (${v.verb}) ব্যবহৃত হয়।`
      };
    }
  },
  {
    lessonId: 'l2-past-simple-vs-present-perfect',
    type: 'mcq',
    instruction: 'লেসনের নির্দিষ্ট অতীত সাল (Definite Past Time) নিয়ম অনুযায়ী সঠিক টেন্স নির্বাচন করুন:',
    hint: 'অতীতের নির্দিষ্ট সাল (e.g. in 1985, in 2004) থাকলে Past Simple হয়, Present Perfect নয়।',
    generate: (salt) => {
      const years = [1971, 1995, 2008, 2015, 2020];
      const yr = years[salt % years.length];
      return {
        question: `The international consortium _______ the historic treaty on atmospheric emissions in ${yr}.`,
        options: ['A. signed', 'B. has signed', 'C. was signing', 'D. had sign'],
        correctAnswer: 'A. signed',
        explanation: `লেসনের সূত্র অনুযায়ী: নির্দিষ্ট অতীত সাল ('in ${yr}') উল্লেখ থাকায় Past Simple (signed) আবশ্যক; 'has signed' ভুল।`
      };
    }
  },
  {
    lessonId: 'l2-past-perfect-dual-timelines',
    type: 'fill-typing',
    instruction: 'লেসনের পূর্বে সম্পন্ন হওয়া কাজের Past Perfect (had + V3) নিয়ম অনুযায়ী সঠিক ভার্ব রূপ লিখুন:',
    hint: 'অতীতের দুটি কাজের মধ্যে যেটি আগে ঘটেছিল তাতে had + V3 হয়।',
    generate: (salt) => {
      const actions = [
        { past: 'left', verb: 'leave', obj: 'the platform' },
        { past: 'evacuated', verb: 'evacuate', obj: 'the premises' },
        { past: 'submitted', verb: 'submit', obj: 'the revised report' }
      ];
      const a = actions[salt % actions.length];
      return {
        question: `By the time the rescue coordinators arrived, the delegation [input] (had ${a.past} / ${a.verb}) ${a.obj}.`,
        correctAnswer: `had ${a.past}`,
        explanation: `লেসনের নিয়ম অনুযায়ী: 'By the time + Past Simple' ক্লজের বিপরীতে পূর্বে নিষ্পন্ন কাজে Past Perfect (had ${a.past}) বসে।`
      };
    }
  },
  {
    lessonId: 'l2-future-expressions',
    type: 'mcq',
    instruction: 'লেসনের Future Perfect (নির্দিষ্ট সময়ের মধ্যে সম্পন্ন হবে) নিয়ম অনুযায়ী সঠিক বিকল্প বাছুন:',
    hint: 'By the time / By next year থাকলে will have + V3 বসে।',
    generate: (salt) => {
      const timeframes = ['By the end of this fiscal year', 'By next December', 'By 2030'];
      const tf = timeframes[salt % timeframes.length];
      return {
        question: `${tf}, the engineering corporation _______ the automated metro rail extension.`,
        options: ['A. will have completed', 'B. will complete', 'C. completes', 'D. would completed'],
        correctAnswer: 'A. will have completed',
        explanation: `লেসনের নিয়ম অনুযায়ী: '${tf}' সময়সীমার মধ্যে কোনো কাজ সমাপ্তির নিশ্চয়তা বোঝাতে Future Perfect (will have completed) বসে।`
      };
    }
  },

  // --- LEVEL 3: Voice, Verbs & Clauses ---
  {
    lessonId: 'l3-active-vs-passive',
    type: 'mcq',
    instruction: 'লেসনের Modal Passive (Modal + be + V3) নিয়ম অনুযায়ী সঠিক প্যাসিভ বাক্য নির্বাচন করুন:',
    hint: 'Modal + be + Past Participle (V3) গঠন লক্ষ্য করুন।',
    generate: (salt) => {
      const c = academicContexts[salt % academicContexts.length];
      return {
        question: `Active: \"The supervisory council must review the preliminary safety audit.\" -> Passive:`,
        options: [
          'A. The preliminary safety audit must be reviewed by the supervisory council.',
          'B. The preliminary safety audit must reviewed by the council.',
          'C. The safety audit must being reviewed by the council.',
          'D. The council must be review the safety audit.'
        ],
        correctAnswer: 'A. The preliminary safety audit must be reviewed by the supervisory council.',
        explanation: `লেসনের প্যাসিভ সূত্র অনুযায়ী: Modal Verb-এর প্যাসিভ রূপ হলো 'must + be + V3' (must be reviewed)।`
      };
    }
  },
  {
    lessonId: 'l3-active-vs-passive',
    type: 'fill-typing',
    instruction: 'লেসনের Present Continuous Passive (is/are being + V3) নিয়ম অনুযায়ী ব্র্যাকেটের সঠিক রূপ লিখুন:',
    hint: 'is/are being + V3 রূপ লিখুন।',
    generate: (salt) => {
      const c = academicContexts[salt % academicContexts.length];
      return {
        question: `The vital experimental specimens [input] (examine) under electron microscopes right now.`,
        correctAnswer: 'are being examined',
        explanation: `লেসনের নিয়ম অনুযায়ী: বহুবচন কর্তা (specimens) + are being + V3 (examined)।`
      };
    }
  },
  {
    lessonId: 'l3-stative-vs-action-verbs',
    type: 'fill-typing',
    instruction: 'লেসনের Stative Verb (মানসিক অনুভূতি ও বিশ্বাসে -ing না হওয়া) নিয়ম অনুযায়ী সঠিক ভার্ব টাইপ করুন:',
    hint: 'Believe একটি Stative Verb, এর সাথে -ing হয় না; একবচনে -s যুক্ত করুন।',
    generate: (salt) => {
      const c = academicContexts[(salt + 2) % academicContexts.length];
      return {
        question: `The senior climatologist firmly [input] (believe) the ocean temperatures will normalize slowly.`,
        correctAnswer: 'believes',
        explanation: `লেসনের নিয়ম ২ অনুযায়ী: 'Believe' একটি Stative Verb, এর Continuous রূপ হয় না। Climatologist (singular)-এর সাথে 'believes' হবে।`
      };
    }
  },
  {
    lessonId: 'l3-causative-verbs',
    type: 'mcq',
    instruction: 'লেসনের Have + Object + V3 (প্যাসিভ কজেটিভ) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:',
    hint: 'Have + Object + Past Participle (had the documents translated)।',
    generate: (salt) => {
      return {
        question: `Which sentence indicates hiring professional third-party services?`,
        options: [
          'A. The department had the entire historical manuscript translated by linguistic scholars.',
          'B. The department had translated the manuscript by themselves.',
          'C. The department got the manuscript translate.',
          'D. The department had the scholar translating.'
        ],
        correctAnswer: 'A. The department had the entire historical manuscript translated by linguistic scholars.',
        explanation: `লেসনের কজেটিভ সূত্র অনুযায়ী: Have + Object + V3 (had the manuscript translated) অন্য কাউকে দিয়ে কাজ করিয়ে নেওয়া নির্দেশ করে।`
      };
    }
  },

  // --- LEVEL 4: Sentence Architecture ---
  {
    lessonId: 'l4-complex-sentences-connectors',
    type: 'mcq',
    instruction: 'লেসনের In spite of / Despite + Noun Phrase নিয়ম অনুযায়ী সঠিক সংযোগকারী বাছুন:',
    hint: 'Noun phrase-এর পূর্বে Despite বা In spite of বসে; Although-এর পর পূর্ণাঙ্গ ক্লজ বসে।',
    generate: (salt) => {
      return {
        question: `_______ the prohibitive logistical expenditures, the international relief flight delivered the vaccines.`,
        options: ['A. In spite of', 'B. Although', 'C. Even though', 'D. Whereas'],
        correctAnswer: 'A. In spite of',
        explanation: `লেসনের নিয়ম অনুযায়ী: 'the prohibitive logistical expenditures' একটি Noun Phrase, তাই এর পূর্বে 'In spite of' বসে।`
      };
    }
  },
  {
    lessonId: 'l4-relative-clauses',
    type: 'mcq',
    instruction: 'লেসনের Non-defining Relative Clause নিয়ম অনুযায়ী সঠিক বিরামচিহ্ন ও সর্বনামযুক্ত বাক্য বাছুন:',
    hint: 'কমা দিয়ে ঘেরা অতিরিক্ত তথ্যে which বসে, কখনো কমার পর that বসে না।',
    generate: (salt) => {
      return {
        question: `Choose the sentence that applies accurate non-defining relative clause grammar:`,
        options: [
          'A. The newly commissioned laboratory, which cost $12 million, opened on Monday.',
          'B. The newly commissioned laboratory, that cost $12 million, opened on Monday.',
          'C. The newly commissioned laboratory which cost $12 million opened on Monday.',
          'D. The laboratory that cost $12 million, opened on Monday.'
        ],
        correctAnswer: 'A. The newly commissioned laboratory, which cost $12 million, opened on Monday.',
        explanation: `লেসনের নিয়ম অনুযায়ী: কমাযুক্ত Non-defining ক্লজে 'which' বসে; কমার পর কখনো 'that' ব্যবহৃত হয় না।`
      };
    }
  },
  {
    lessonId: 'l4-gerund-vs-infinitive',
    type: 'fill-typing',
    instruction: 'লেসনের Preposition + Gerund নিয়ম অনুযায়ী ব্র্যাকেটের শব্দটির সঠিক রূপ লিখুন:',
    hint: 'Preposition (in, on, of, to, without)-এর পর Verb-এর সাথে -ing যুক্ত হয়।',
    generate: (salt) => {
      const verbs = [
        { v: 'analyzing', base: 'analyze' },
        { v: 'evaluating', base: 'evaluate' },
        { v: 'investigating', base: 'investigate' }
      ];
      const sel = verbs[salt % verbs.length];
      return {
        question: `The researchers succeeded in [input] (${sel.base}) the genomic variance accurately.`,
        correctAnswer: sel.v,
        explanation: `লেসনের নিয়ম অনুযায়ী: Preposition 'in'-এর পর Verb-এর Gerund রূপ (${sel.v}) বসে।`
      };
    }
  },

  // --- LEVEL 5: Academic Accuracy ---
  {
    lessonId: 'l5-subject-verb-agreement',
    type: 'mcq',
    instruction: 'লেসনের Either... or / Neither... nor (নিকটবর্তী কর্তা) নিয়ম অনুযায়ী সঠিক ভার্ব বাছুন:',
    hint: 'Neither... nor-এ ভার্ব তার নিকটবর্তী সাবজেক্ট অনুসারে নির্ধারিত হয়।',
    generate: (salt) => {
      const options = [
        { near: 'the lab assistants', verb: 'were', wrong: 'was' },
        { near: 'the safety inspectors', verb: 'were', wrong: 'was' },
        { near: 'the project supervisors', verb: 'were', wrong: 'was' }
      ];
      const o = options[salt % options.length];
      return {
        question: `Neither the head professor nor ${o.near} _______ present when the alarm triggered.`,
        options: [`A. ${o.verb}`, `B. ${o.wrong}`, 'C. is', 'D. has been'],
        correctAnswer: `A. ${o.verb}`,
        explanation: `লেসনের নিয়ম অনুযায়ী: Neither... nor-এর ক্ষেত্রে ভার্বটি নিকটতম কর্তা (${o.near} - বহুবচন) অনুযায়ী '${o.verb}' হবে।`
      };
    }
  },
  {
    lessonId: 'l5-subject-verb-agreement',
    type: 'fill-typing',
    instruction: 'লেসনের The number of (একবচন) বনাম A number of (বহুবচন) নিয়ম অনুযায়ী সঠিক ভার্ব (has/have) লিখুন:',
    hint: 'The number of একক সংখ্যা বোঝায়, তাই Singular Verb (has) গ্রহণ করে।',
    generate: (salt) => {
      return {
        question: `The number of international applicants seeking research fellowships [input] (has/have) surged rapidly.`,
        correctAnswer: 'has',
        explanation: `লেসনের সূত্র অনুযায়ী: 'The number of' একটি নির্দিষ্ট একক সংখ্যা নির্দেশ করায় সর্বদা Singular Verb (has) গ্রহণ করে।`
      };
    }
  },
  {
    lessonId: 'l5-prepositions-time-place',
    type: 'mcq',
    instruction: 'লেসনের Dependent Preposition নিয়ম অনুযায়ী সঠিক পদান্বয়ী অব্যয় বাছুন:',
    hint: 'Rely on, depend on, contribute to, focus on।',
    generate: (salt) => {
      return {
        question: `Rapid urbanization contributes significantly _______ severe groundwater depletion in dry regions.`,
        options: ['A. to', 'B. in', 'C. for', 'D. with'],
        correctAnswer: 'A. to',
        explanation: `লেসনের তালিকা অনুযায়ী: 'Contribute'-এর নির্দিষ্ট নির্ভরশীল Preposition হলো 'to' (contribute to something)।`
      };
    }
  },

  // --- LEVEL 6: IELTS Mastery & Inversion ---
  {
    lessonId: 'l6-conditionals-mastery',
    type: 'mcq',
    instruction: 'লেসনের শর্তসূচক ইনভার্সন (Inverted 3rd Conditional) নিয়ম অনুযায়ী সঠিক বাক্য বাছুন:',
    hint: 'Had + Subject + V3 ... would have + V3 গঠন দেখুন।',
    generate: (salt) => {
      return {
        question: `Select the sentence with accurate inverted Third Conditional grammar:`,
        options: [
          'A. Had the engineers verified the telemetry, the shuttle would have launched safely.',
          'B. If had the engineers verified the telemetry, the shuttle would launch.',
          'C. Had the engineers verified telemetry, the shuttle launched safely.',
          'D. Did engineers verify the telemetry, the shuttle would launch.'
        ],
        correctAnswer: 'A. Had the engineers verified the telemetry, the shuttle would have launched safely.',
        explanation: `লেসনের ইনভার্সন নিয়ম অনুযায়ী: 'If' বাদ দিয়ে 'Had + Subject + V3, Subject + would have + V3' ফর্মুলা প্রয়োগ করা হয়েছে।`
      };
    }
  },
  {
    lessonId: 'l6-negative-inversion-conditionals',
    type: 'mcq',
    instruction: 'লেসনের নেতিবাচক অ্যাডভার্ব দিয়ে ইনভার্সন (Seldom / Rarely + Aux + Sub) নিয়ম অনুযায়ী সঠিক রূপ বাছুন:',
    hint: 'Negative Adverb শুরুতে এলে Auxiliary Verb সাবজেক্টের পূর্বে বসে।',
    generate: (salt) => {
      const advs = ['Seldom', 'Rarely'];
      const a = advs[salt % advs.length];
      return {
        question: `Which sentence applies grammatical inversion accurately with \"${a}\"?`,
        options: [
          `A. ${a} have meteorologists observed such severe atmospheric pressure drops.`,
          `B. ${a} meteorologists have observed such severe atmospheric pressure drops.`,
          `C. ${a} meteorologists observed have such pressure drops.`,
          `D. ${a} observed have meteorologists such pressure drops.`
        ],
        correctAnswer: `A. ${a} have meteorologists observed such severe atmospheric pressure drops.`,
        explanation: `লেসনের নিয়ম অনুযায়ী: ${a} শুরুতে বসলে Inversion ঘটে: ${a} + Auxiliary (have) + Subject (meteorologists) + V3 (observed)।`
      };
    }
  },
  {
    lessonId: 'l6-nominalization-punctuation',
    type: 'mcq',
    instruction: 'লেসনের ব্যান্ড ৯ একাডেমিক নমিনালাইজেশন (Nominalization) নিয়ম অনুযায়ী সবচেয়ে মানসম্মত বাক্য বাছুন:',
    hint: 'ক্রিয়াগুলোকে শক্তিশালী একাডেমিক নাউনে রূপান্তর করে সংক্ষিপ্ত অথচ তথ্যবহুল বাক্য তৈরি করা হয়।',
    generate: (salt) => {
      return {
        question: `Convert spoken: \"Because the government invested more in green energy, carbon emissions dropped fast.\" into formal IELTS academic prose:`,
        options: [
          'A. Increased governmental investment in renewable energy precipitated a rapid decline in carbon emissions.',
          'B. When government invested more money, emissions dropped very fast.',
          'C. Due to more investing, carbon emissions became lower.',
          'D. Government investing green energy made carbon drop.'
        ],
        correctAnswer: 'A. Increased governmental investment in renewable energy precipitated a rapid decline in carbon emissions.',
        explanation: `লেসনের নিয়ম অনুযায়ী: ক্রিয়াগুলোকে নমিনাল ফ্রেজ (investment, decline) বানিয়ে নির্ভুল একাডেমিক শৈলী নিশ্চিত করা হয়েছে।`
      };
    }
  }
];

/**
 * Generates an unlimited, fresh batch of exercises for any lesson and attempt count.
 * Combines existing verified exercises with dynamically generated variations so questions never exhaust.
 */
export function generateUnlimitedLessonQuiz(
  lesson: FoundationLesson,
  attemptNumber: number = 1,
  targetCount?: number
): PracticeExercise[] {
  const count = targetCount || (lesson.exercises ? lesson.exercises.length : 8);
  const baseExercises = lesson.exercises || [];

  // If Attempt 1, return the curated canonical exercises
  if (attemptNumber === 1 && baseExercises.length >= count) {
    return baseExercises.slice(0, count);
  }

  // Find matching generator templates for this lesson
  const matchingTemplates = TEMPLATES.filter(t => t.lessonId === lesson.id);

  // Generate dynamic questions using salt derived from lesson.id and attemptNumber
  const dynamicGenerated: PracticeExercise[] = [];
  const saltBase = attemptNumber * 37 + lesson.level * 11;

  matchingTemplates.forEach((template, idx) => {
    const salt = saltBase + idx * 7;
    const generated = template.generate(salt);
    dynamicGenerated.push({
      id: 1000 + attemptNumber * 50 + idx + 1,
      type: template.type,
      instruction: template.instruction,
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      explanation: generated.explanation,
      hint: template.hint
    });
  });

  // Also create variations of base exercises by rotating/permuting their indices
  const rotatedBase: PracticeExercise[] = baseExercises.map((ex, idx) => {
    const offsetId = ((idx + attemptNumber) % baseExercises.length);
    const sourceEx = baseExercises[offsetId];
    return {
      ...sourceEx,
      id: idx + 1, // keep clean 1..N numbering for the student UI
    };
  });

  // Combine dynamic + rotated base to form a completely fresh exam
  const pool = [...dynamicGenerated, ...rotatedBase];

  // Pick unique questions up to target count
  const result: PracticeExercise[] = [];
  const seenQuestions = new Set<string>();

  for (const item of pool) {
    if (!seenQuestions.has(item.question) && result.length < count) {
      seenQuestions.add(item.question);
      result.push({
        ...item,
        id: result.length + 1 // normalized 1-based index
      });
    }
  }

  // If pool was smaller than count, fill remainder from baseExercises
  if (result.length < count) {
    for (const b of baseExercises) {
      if (result.length >= count) break;
      if (!seenQuestions.has(b.question)) {
        seenQuestions.add(b.question);
        result.push({ ...b, id: result.length + 1 });
      }
    }
  }

  return result;
}
