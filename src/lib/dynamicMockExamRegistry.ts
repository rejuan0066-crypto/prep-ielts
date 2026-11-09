import { FullListeningExam, FullReadingExam, Question, ReadingPassage, ListeningSection } from './types';
import { OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM } from './cambridge18ListeningOfficial';
import { OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM } from './cambridgeFullExam';
import { getListeningAudioUrl } from './cambridgeBooksRegistry';

export interface FullMockTestBundle {
  id: string;
  setId: number;
  title: string;
  subtitle: string;
  edition: string;
  difficulty: 'Standard CD-IELTS' | 'Challenging Band 7.5+' | 'Advanced Band 8.5+';
  recommendedFor: string;
  listeningExam: FullListeningExam;
  readingExam: FullReadingExam;
  writingExam: {
    task1: {
      title: string;
      prompt: string;
      chartType: string;
    };
    task2: {
      title: string;
      prompt: string;
      essayType: string;
    };
  };
  speakingExam: {
    part1Topic: string;
    part1Questions: string[];
    part2CueCard: {
      topic: string;
      cues: string[];
    };
    part3Discussion: string[];
  };
}

// -------------------------------------------------------------
// HELPER: Generate authentic 40-question Reading Exam for Mock
// -------------------------------------------------------------
function buildMockReadingPassage(
  passageNumber: 1 | 2 | 3,
  passageTitle: string,
  startQId: number,
  qCount: number,
  topicTheme: string
): ReadingPassage {
  const questions: Question[] = [];

  if (passageNumber === 1) {
    // Passage 1: True / False / Not Given (Q1-Q7) & Summary Note Completion (Q8-Q13)
    const p1TfngStatements = [
      {
        text: `Longitudinal field research into ${topicTheme.toLowerCase()} began more than forty years ago.`,
        ans: 'TRUE',
        quote: 'Over the preceding four decades, institutional research and multidisciplinary field surveys have shown...',
        expl: `প্যাসেজ ১ অনুযায়ী: টেক্সটে বলা হয়েছে "Over the preceding four decades", যা ৪০ বছরের বেশি সময় নির্দেশ করে (TRUE)।`
      },
      {
        text: `Early heuristic techniques proved completely adequate for managing complex external risks.`,
        ans: 'FALSE',
        quote: 'Historically, early practitioners operated under heuristic methodologies that frequently failed to accommodate complex externalities.',
        expl: `প্যাসেজে বলা হয়েছে প্রথম দিকের পদ্ধতিগুলো ঝুঁকি সামলাতে ব্যর্থ হয়েছিল (failed to accommodate), তাই বক্তব্যটি সরাসরি বিপরীত (FALSE)।`
      },
      {
        text: `Modern computer simulations permit proactive intervention before environmental damage occurs.`,
        ans: 'TRUE',
        quote: 'This transformation enables proactive intervention rather than reactive crisis mitigation.',
        expl: `প্যাসেজে স্পষ্টভাবে উল্লেখ রয়েছে: কম্পিউটার মডেলিংয়ের কারণে সংকটের আগেই কার্যকর ব্যবস্থা নেওয়া সম্ভব হয় (TRUE)।`
      },
      {
        text: `Developing countries currently receive a larger share of green infrastructure funding than developed nations.`,
        ans: 'NOT GIVEN',
        quote: 'Analysts emphasize that unless sustainable infrastructure is distributed symmetrically... systemic vulnerabilities emerge.',
        expl: `প্যাসেজে সমবণ্টনের গুরুত্বের কথা বলা হলেও কোনো পক্ষ বেশি অনুদান পাচ্ছে কিনা তা বলা হয়নি (NOT GIVEN)।`
      },
      {
        text: `Environmental baseline parameters have little effect on whether an ecosystem collapses.`,
        ans: 'FALSE',
        quote: 'Empirical observation confirms that baseline environmental parameters directly dictate outcome trajectories across regional habitats.',
        expl: `প্যাসেজে সরাসরি বলা হয়েছে বেইসলাইন প্যারামিটারই সিস্টেম টিকে থাকা বা ভেঙে পড়া নির্ধারণ করে (FALSE)।`
      },
      {
        text: `Every participating jurisdiction has formally adopted unified international regulatory standards.`,
        ans: 'NOT GIVEN',
        quote: 'Consequently, international consortia are prioritizing unified performance benchmarks.',
        expl: `আন্তর্জাতিক সংস্থাগুলো অভিন্ন মান নির্ধারণে কাজ করছে বলা হলেও সব দেশ তা গ্রহণ করেছে কিনা তা অপ্রকাশিত (NOT GIVEN)।`
      },
      {
        text: `Regions that established early proactive oversight experienced measurable improvements in stability.`,
        ans: 'TRUE',
        quote: 'Early adopter regions report a marked stabilization in key performance indices...',
        expl: `প্যাসেজে উল্লেখ রয়েছে যে প্রাথমিক গ্রহণকারী অঞ্চলগুলোতে স্থিতিশীলতার লক্ষণ দেখা গেছে (TRUE)।`
      }
    ];

    const p1GapNotes = [
      {
        prompt: `Early evaluation methods: Practitioners initially relied on [ ${startQId + 7}. ___ ] methodologies.`,
        ans: 'heuristic',
        expl: `প্যাসেজে উল্লেখ আছে: "practitioners operated under heuristic methodologies"। সঠিক উত্তর 'heuristic'।`,
        quote: `practitioners operated under heuristic methodologies`
      },
      {
        prompt: `Modern analysis: Analysts now evaluate high-resolution empirical [ ${startQId + 8}. ___ ]`,
        ans: 'datasets',
        expl: `প্যাসেজ অনুযায়ী: গবেষকরা নিখুঁত "empirical datasets" যাচাই করেন।`,
        quote: `scrutinize high-resolution empirical datasets`
      },
      {
        prompt: `Resource allocation: Vulnerabilities occur unless infrastructure is distributed in an [ ${startQId + 9}. ___ ] manner.`,
        ans: 'equitable',
        expl: `প্যাসেজে টেক্সট: "challenges remain regarding equitable resource allocation"।`,
        quote: `challenges remain regarding equitable resource allocation`
      },
      {
        prompt: `System collapse: Unmonitored environments fail when critical [ ${startQId + 10}. ___ ] are exceeded.`,
        ans: 'thresholds',
        expl: `প্যাসেজে বলা হয়েছে: "maintaining critical thresholds prevents abrupt ecological disruption"।`,
        quote: `maintaining critical thresholds prevents abrupt ecological disruption`
      },
      {
        prompt: `Policy action: Sustainable long-term benefits require proactive capital [ ${startQId + 11}. ___ ]`,
        ans: 'investment',
        expl: `টেক্সটে উল্লেখ আছে: "proactive capital investment yield durable collective benefits"।`,
        quote: `proactive capital investment yield durable collective benefits`
      },
      {
        prompt: `Global standards: International consortia are currently prioritizing unified performance [ ${startQId + 12}. ___ ]`,
        ans: 'benchmarks',
        expl: `প্যাসেজে বলা হয়েছে: "prioritizing unified performance benchmarks"।`,
        quote: `prioritizing unified performance benchmarks`
      }
    ];

    for (let i = 0; i < 7; i++) {
      const item = p1TfngStatements[i];
      questions.push({
        id: startQId + i,
        type: 'true-false-not-given',
        question: item.text,
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: item.quote
      });
    }

    for (let i = 0; i < 6; i++) {
      const item = p1GapNotes[i];
      questions.push({
        id: startQId + 7 + i,
        type: 'fill-blanks',
        question: item.prompt,
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: item.quote
      });
    }
  } else if (passageNumber === 2) {
    // Passage 2: 13 Distinct Multiple Choice Questions (Q14-Q26)
    const p2Questions = [
      {
        q: `What is the primary motivation for introducing modern ${topicTheme} protocols?`,
        opts: [
          'A. To facilitate proactive intervention rather than reactive damage control',
          'B. To replace human laboratory scientists with automated robotic machinery',
          'C. To cut municipal environmental research budgets by half',
          'D. To eliminate public participation in regional conservation decisions'
        ],
        ans: 'A. To facilitate proactive intervention rather than reactive damage control',
        expl: `প্যাসেজের প্যারাগ্রাফ বি অনুযায়ী মূল উদ্দেশ্য হলো সংকটের পর ব্যবস্থা নেওয়ার চেয়ে আগেভাগে প্রতিরোধ করা (A)।`
      },
      {
        q: `Why did historical research methodologies frequently prove insufficient?`,
        opts: [
          'A. They failed to accommodate unexpected external ecosystem variables',
          'B. Field investigators lacked adequate biological field training',
          'C. The computational equipment overheated in high humidity',
          'D. Government agencies refused to permit physical sample collection'
        ],
        ans: 'A. They failed to accommodate unexpected external ecosystem variables',
        expl: `প্যাসেজ উল্লেখ করে যে পুরনো কৌশলগুলো অপ্রত্যাশিত বাহ্যিক প্রভাব সামলাতে পারেনি (failed to accommodate complex externalities)।`
      },
      {
        q: `According to Paragraph C, what condition is essential to prevent regional system failure?`,
        opts: [
          'A. Symmetrical and equitable distribution of sustainable infrastructure',
          'B. Complete privatization of municipal water and energy networks',
          'C. Relocating urban populations away from coastal geographic zones',
          'D. Halting all commercial technological developments indefinitely'
        ],
        ans: 'A. Symmetrical and equitable distribution of sustainable infrastructure',
        expl: `প্যারাগ্রাফ সি জোর দেয় যে সমবণ্টন না হলে পদ্ধতিগত দুর্বলতা তৈরি হবে (A)।`
      },
      {
        q: `What do controlled field experiments indicate regarding ecological thresholds?`,
        opts: [
          'A. Maintaining defined limits prevents sudden systemic breakdown',
          'B. Environmental ecosystems always recover spontaneously without intervention',
          'C. Temperature fluctuation is the sole parameter dictating survival',
          'D. Threshold data cannot be measured with numerical instruments'
        ],
        ans: 'A. Maintaining defined limits prevents sudden systemic breakdown',
        expl: `প্যাসেজে বলা হয়েছে সুনির্দিষ্ট সীমা (threshold) বজায় রাখলে বিপর্যয় রোধ করা যায়।`
      },
      {
        q: `Which benefit was observed in territories that enacted early regulatory frameworks?`,
        opts: [
          'A. Marked and verifiable stabilization in core performance indices',
          'B. Immediate reduction in local municipal taxation rates',
          'C. Total elimination of seasonal climate variations',
          'D. Doubling of local industrial chemical production'
        ],
        ans: 'A. Marked and verifiable stabilization in core performance indices',
        expl: `প্যারাগ্রাফ ই স্পষ্টভাবে উল্লেখ করে: "report a marked stabilization in key performance indices"।`
      },
      {
        q: `How do international advisory agencies propose to coordinate global initiatives?`,
        opts: [
          'A. By establishing standardized and transparent regulatory benchmarks',
          'B. By mandating uniform pricing across all consumer markets',
          'C. By creating a single multinational research corporation',
          'D. By penalizing sovereign nations that publish independent findings'
        ],
        ans: 'A. By establishing standardized and transparent regulatory benchmarks',
        expl: `আন্তর্জাতিক সংস্থাগুলো অভিন্ন স্ট্যান্ডার্ড ও বেঞ্চমার্ক তৈরিতে অগ্রাধিকার দিচ্ছে।`
      },
      {
        q: `What primary obstacle to equitable resource distribution is highlighted?`,
        opts: [
          'A. Persistent structural gaps between developed and developing regions',
          'B. Complete absence of international communication channels',
          'C. Reluctance of computer hardware manufacturers to export sensors',
          'D. Universal public apathy regarding conservation outcomes'
        ],
        ans: 'A. Persistent structural gaps between developed and developing regions',
        expl: `প্যাসেজে উন্নয়নশীল ও উন্নত অঞ্চলের মধ্যকার বৈষম্যের কথা সতর্ক করা হয়েছে।`
      },
      {
        q: `Which technology has enabled the deepest breakthrough in predictive modeling?`,
        opts: [
          'A. High-resolution empirical data processing algorithms',
          'B. Submersible manned submarines for benthic drilling',
          'C. Handheld mechanical measurement calipers',
          'D. Atmospheric helium observation balloons'
        ],
        ans: 'A. High-resolution empirical data processing algorithms',
        expl: `প্যারাগ্রাফ বি নির্দেশ করে যে আধুনিক কম্পিউটেশনাল মডেলিং ডেটাসেট নিখুঁতভাবে যাচাই করতে পারে।`
      },
      {
        q: `What outcome does the author associate with unmonitored ecological zones?`,
        opts: [
          'A. Rapid structural breakdown within compressed timelines',
          'B. Gradual evolutionary adaptation to elevated toxicity',
          'C. Emergence of novel photosynthetic plant species',
          'D. Spontaneous formation of deep mineral reserves'
        ],
        ans: 'A. Rapid structural breakdown within compressed timelines',
        expl: `টেক্সটে বলা আছে: "unmonitored environments suffer structural collapse within compressed timelines"।`
      },
      {
        q: `What overarching recommendation summarizes the author's primary perspective?`,
        opts: [
          'A. Pair rigorous institutional oversight with targeted proactive investment',
          'B. Cease scientific sampling until private funding reaches parity',
          'C. Shift all conservation responsibilities exclusively to non-profit charities',
          'D. Rely entirely upon retrospective historical records'
        ],
        ans: 'A. Pair rigorous institutional oversight with targeted proactive investment',
        expl: `লেখকের চূড়ান্ত বক্তব্য হলো প্রাতিষ্ঠানিক নজরদারি ও কৌশলগত পুঁজি বিনিয়োগ একত্রে বাস্তবায়ন করা।`
      },
      {
        q: `What tone does the author maintain throughout the analytical discussion?`,
        opts: [
          'A. Objective, evidence-based, and academically rigorous',
          'B. Sarcastic and dismissive of current scientific consensus',
          'C. Uncritically celebratory without acknowledging limitations',
          'D. Nostalgic for pre-industrial observation methods'
        ],
        ans: 'A. Objective, evidence-based, and academically rigorous',
        expl: `লেখক যুক্তি ও তথ্যনির্ভর একটি প্রাতিষ্ঠানিক ও অ্যাকাডেমিক বিশ্লেষণ তুলে ধরেছেন।`
      },
      {
        q: `How does Paragraph A frame the evolution of ${topicTheme} over forty years?`,
        opts: [
          'A. A fundamental transformation from heuristic guesswork to systematic evaluation',
          'B. A continuous series of unmitigated failures and abandoned trials',
          'C. A static discipline with virtually no methodological progression',
          'D. A field driven solely by geopolitical military objectives'
        ],
        ans: 'A. A fundamental transformation from heuristic guesswork to systematic evaluation',
        expl: `প্রথম প্যারাগ্রাফ নির্দেশ করে যে গত চার দশকে পদ্ধতিগত মূল্যায়নের মাধ্যমে এক যুগান্তকারী পরিবর্তন এসেছে।`
      },
      {
        q: `Which phrase best captures the final call to action for policy makers?`,
        opts: [
          'A. Proactive collective stewardship based on unified global standards',
          'B. Individual localized deregulation with zero governmental interference',
          'C. Deferral of all binding decisions until the next calendar decade',
          'D. Commercial exploitation of vulnerable habitats for economic profit'
        ],
        ans: 'A. Proactive collective stewardship based on unified global standards',
        expl: `প্যাসেজ ইতিবাচক সম্মিলিত তদারকি ও ঐক্যবদ্ধ বৈশ্বিক মানদণ্ড মেনে চলার আহ্বান জানায়।`
      }
    ];

    for (let i = 0; i < qCount; i++) {
      const item = p2Questions[i % p2Questions.length];
      questions.push({
        id: startQId + i,
        type: 'multiple-choice',
        question: item.q,
        options: item.opts,
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: `Passage excerpt confirms: ${item.ans.substring(3)}`
      });
    }
  } else {
    // Passage 3: Yes / No / Not Given (Q27-Q34) & Analytical Multiple Choice (Q35-Q40)
    const p3Statements = [
      {
        text: `The author believes that 20th-century heuristic paradigms in ${topicTheme.toLowerCase()} remain completely sufficient today.`,
        ans: 'FALSE',
        quote: 'Historically, early practitioners operated under heuristic methodologies that frequently failed...',
        expl: `লেখক স্পষ্ট করেছেন যে পুরনো ধারণাগুলো বর্তমান জটিলতা সামলাতে যথেষ্ট নয় (NO/FALSE)।`
      },
      {
        text: `Technological advances in high-resolution modeling have made crisis mitigation more proactive.`,
        ans: 'TRUE',
        quote: 'This transformation enables proactive intervention rather than reactive crisis mitigation.',
        expl: `আধুনিক প্রযুক্তির ফলে সংকট মোকাবিলার উদ্যোগ আগের চেয়ে বেশি দূরদর্শী ও সক্রিয় হয়েছে (YES/TRUE)।`
      },
      {
        text: `Privatized research consortia consistently outperform publicly funded academic universities.`,
        ans: 'NOT GIVEN',
        quote: 'multidisciplinary field surveys have shown that systematic evaluation is critical...',
        expl: `ব্যক্তিগত বনাম সরকারি প্রতিষ্ঠানের ফলাফলের তুলনামূলক কোনো তথ্য প্যাসেজে নেই (NOT GIVEN)।`
      },
      {
        text: `Neglecting baseline thresholds leads to structural ecosystem collapse in a short timeframe.`,
        ans: 'TRUE',
        quote: 'unmonitored environments suffer structural collapse within compressed timelines.',
        expl: `টেক্সটে সরাসরি উল্লেখ আছে যে সীমা লঙ্ঘন করলে অল্প সময়ের মধ্যেই সিস্টেম ভেঙে পড়ে (TRUE)।`
      },
      {
        text: `Standardized regulatory benchmarks have already resolved all international disagreements.`,
        ans: 'FALSE',
        quote: 'Despite profound technical progress, persistent challenges remain regarding equitable resource allocation...',
        expl: `সব মতবিরোধ সমাধান হয়ে গেছে এই দাবি মিথ্যা, প্যাসেজে বলা হয়েছে এখনও চ্যালেঞ্জ বিদ্যমান (FALSE)।`
      },
      {
        text: `Financial investment alone without governance guarantees lasting environmental stability.`,
        ans: 'FALSE',
        quote: 'demonstrating that rigorous governance and proactive capital investment yield durable collective benefits.',
        expl: `টেক্সট অনুযায়ী সুশাসন (governance) এবং বিনিয়োগ দুটোই একসাথে প্রয়োজন (FALSE)।`
      },
      {
        text: `Developing countries will refuse all international conservation assistance in the future.`,
        ans: 'NOT GIVEN',
        quote: 'unless sustainable infrastructure is distributed symmetrically... systemic vulnerabilities emerge.',
        expl: `উন্নয়নশীল দেশগুলো ভবিষ্যতে সহযোগিতা প্রত্যাখ্যান করবে কিনা তা বলা হয়নি (NOT GIVEN)।`
      },
      {
        text: `Early adopter jurisdictions reported tangible improvements in environmental indices.`,
        ans: 'TRUE',
        quote: 'Early adopter regions report a marked stabilization in key performance indices...',
        expl: `প্রাথমিক গ্রহণকারী দেশগুলো তাদের মূল সূচকে দৃশ্যমান অগ্রগতি লক্ষ্য করেছে (TRUE)।`
      }
    ];

    const p3MultipleChoice = [
      {
        q: `What is the author's primary attitude toward future ${topicTheme} governance?`,
        opts: [
          'A. Cautiously optimistic, provided that rigorous global oversight is established',
          'B. Completely despairing and predicting inevitable worldwide devastation',
          'C. Indifferent, viewing the dilemma as purely academic without practical relevance',
          'D. Demanding the immediate abolishment of all computational modeling'
        ],
        ans: 'A. Cautiously optimistic, provided that rigorous global oversight is established',
        expl: `লেখক গঠনমূলক ও আশাবাদী, তবে তা নির্ভর করছে আন্তর্জাতিক জবাবদিহিতা ও নিয়মতান্ত্রিক তদারকির উপর (A)।`
      },
      {
        q: `In the third paragraph, the term "externalities" most nearly refers to:`,
        opts: [
          'A. Indirect and unintended environmental consequences arising from system activity',
          'B. Financial profits transferred to foreign commercial bank accounts',
          'C. Physical walls built along the perimeter of national nature reserves',
          'D. International tourist visitors arriving without scheduled visas'
        ],
        ans: 'A. Indirect and unintended environmental consequences arising from system activity',
        expl: `অর্থনীতি ও পরিবেশবিদ্যায় 'externalities' বলতে অপ্রত্যাশিত পরোক্ষ প্রভাবকে বোঝায়।`
      },
      {
        q: `What crucial lesson did researchers draw from the early adopter region case study?`,
        opts: [
          'A. Proactive capital spending combined with strict oversight yields sustainable gains',
          'B. Voluntary conservation guidelines achieve superior outcomes to mandatory laws',
          'C. Local communities consistently oppose environmental infrastructure investments',
          'D. Technology should be discarded in favor of unverified ancient folk wisdom'
        ],
        ans: 'A. Proactive capital spending combined with strict oversight yields sustainable gains',
        expl: `কেস স্টাডির শিক্ষা হলো পুঁজি বিনিয়োগ ও কঠোর নজরদারির যৌথ মেলবন্ধনই সফলতার মূল চাবিকাঠি।`
      },
      {
        q: `Why does the author caution against asymmetrical resource distribution?`,
        opts: [
          'A. It generates systemic vulnerabilities that threaten the collective stability of all regions',
          'B. It leads to excessive currency appreciation in export-oriented economies',
          'C. It causes immediate overcrowding in urban university laboratories',
          'D. It prevents private aerospace manufacturers from launching satellites'
        ],
        ans: 'A. It generates systemic vulnerabilities that threaten the collective stability of all regions',
        expl: `লেখক স্পষ্ট সতর্ক করেছেন যে কোনো এক অঞ্চলে অসম বণ্টন হলে তা সামগ্রিক বৈশ্বিক স্থিতিশীলতাকে হুমকিতে ফেলে।`
      },
      {
        q: `Which title would be most appropriate for this reading passage?`,
        opts: [
          `A. The Evolution of ${topicTheme}: From Empirical Uncertainty to Proactive Global Stewardship`,
          'B. Why Environmental Research Has Proven Utterly Futile in Modern Times',
          'C. A Complete Beginner Guide to Purchasing Home Climate Control Systems',
          'D. The Geopolitical History of Medieval European Trade Agreements'
        ],
        ans: `A. The Evolution of ${topicTheme}: From Empirical Uncertainty to Proactive Global Stewardship`,
        expl: `পুরো প্যাসেজে বিষয়টি কীভাবে অনিশ্চয়তা থেকে বৈশ্বিক সুরক্ষায় রূপ নিয়েছে তা সুন্দরভাবে আলোচনা করা হয়েছে।`
      },
      {
        q: `What final synthesis does the author offer in the concluding sentences?`,
        opts: [
          'A. Sustainable resilience is an achievable reality when governance and investment align',
          'B. Individual consumer actions are entirely irrelevant to environmental policy',
          'C. Historical records should be erased to prevent public confusion',
          'D. Scientific research funding should be diverted entirely to space exploration'
        ],
        ans: 'A. Sustainable resilience is an achievable reality when governance and investment align',
        expl: `উপসংহারে লেখক আশাবাদ ব্যক্ত করেন যে সুশাসন ও বিনিয়োগ মিললেই স্থায়ী টেকসই উন্নয়ন সম্ভব।`
      }
    ];

    for (let i = 0; i < 8; i++) {
      const item = p3Statements[i];
      questions.push({
        id: startQId + i,
        type: 'true-false-not-given',
        question: item.text,
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: item.quote
      });
    }

    for (let i = 0; i < 6; i++) {
      const item = p3MultipleChoice[i];
      questions.push({
        id: startQId + 8 + i,
        type: 'multiple-choice',
        question: item.q,
        options: item.opts,
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: `Conclusion explicitly reinforces: ${item.ans.substring(3)}`
      });
    }
  }

  const p1Text = `Paragraph A
Scientific investigation into ${topicTheme.toLowerCase()} has fundamentally transformed contemporary understandings of environmental and socio-technical networks. Over the preceding four decades, institutional research and multidisciplinary field surveys have shown that systematic evaluation is critical for ensuring long-term systemic stability.

Paragraph B
Historically, early practitioners operated under heuristic methodologies that frequently failed to accommodate complex externalities. With the advent of modern computational modelling, analysts can now scrutinize high-resolution empirical datasets across longitudinal parameters. This transformation enables proactive intervention rather than reactive crisis mitigation.

Paragraph C
Despite profound technical progress, persistent challenges remain regarding equitable resource allocation and regional resilience. Analysts emphasize that unless sustainable infrastructure is distributed symmetrically across developing and developed zones alike, systemic vulnerabilities will inevitably emerge. Consequently, international consortia are prioritizing unified performance benchmarks.

Paragraph D
Empirical observation confirms that baseline environmental parameters directly dictate outcome trajectories across regional habitats. Controlled field trials demonstrate that maintaining critical thresholds prevents abrupt ecological disruption, whereas unmonitored environments suffer structural collapse within compressed timelines.

Paragraph E
In response to these systemic dilemmas, international advisory bodies recommend standardized regulatory oversight. Early adopter regions report a marked stabilization in key performance indices, demonstrating that rigorous governance and proactive capital investment yield durable collective benefits.`;

  return {
    passageNumber,
    passageTitle,
    questionRange: `Questions ${startQId}–${startQId + qCount - 1}`,
    passageText: p1Text,
    questions
  };
}

// -------------------------------------------------------------
// HELPER: Generate authentic 40-question Listening Exam for Mock
// -------------------------------------------------------------
function buildMockListeningExam(
  setId: number,
  title: string,
  audioBookNum: number,
  audioTestNum: number
): FullListeningExam {
  const sectionThemes = [
    {
      sNum: 1 as const,
      title: 'Part 1: Community Services & Accommodation Booking',
      context: 'Social Dialogue: Customer Inquiry (Pure Keyboard Typing Only - No Options)',
      answers: ['Oakridge Hotel', '18th November', 'Executive Suite', '07720 918442', 'Breakfast', 'Airport Shuttle', 'Gluten Free', 'MasterCard', 'Text Message', '11:00 AM'],
      prompts: [
        'Accommodation booked at: [ 1. ___ ]',
        'Check-in date confirmed: [ 2. ___ ]',
        'Room category selected: [ 3. ___ ]',
        'Customer contact telephone: [ 4. ___ ]',
        'Complimentary morning [ 5. ___ ] provided',
        'Transportation required: [ 6. ___ ] service',
        'Special dietary requirement: [ 7. ___ ] meals',
        'Settlement completed via: [ 8. ___ ]',
        'Booking receipt to be received by: [ 9. ___ ]',
        'Expected arrival time at venue: [ 10. ___ ]'
      ]
    },
    {
      sNum: 2 as const,
      title: 'Part 2: Regional Botanical Gardens Public Orientation',
      context: 'Public Monologue: Facility Guide & Volunteer Briefing',
      choices: [
        'Main Conservatory and Orchid House',
        'Educational Discovery Center for Children',
        'Organic Farm Produce Market and Cafe',
        'Emergency First Aid and Lost Property Post'
      ]
    },
    {
      sNum: 3 as const,
      title: 'Part 3: Academic Thesis Discussion (Renewable Hydrodynamics)',
      context: 'Academic Discussion: University Students & Faculty Supervisor',
      topics: [
        'A. Recalibrate mathematical flow simulations with real sensor readings',
        'B. Exclude coastal tidal data from the preliminary report',
        'C. Increase the length of the literature review section',
        'D. Limit the project presentation to five summary slides'
      ]
    },
    {
      sNum: 4 as const,
      title: 'Part 4: University Lecture on Ocean Deep-Sea Coral Ecology',
      context: 'University Lecture: Marine Biology & Coral Conservation (Typing Only)',
      lectureAnswers: [
        'Sunlight', 'Photosynthesis', 'Calcium carbonate', 'Currents', 'Microplastics',
        'Temperature', 'Polyp', 'Symbiosis', 'Nutrients', 'Biodiversity'
      ],
      lecturePrompts: [
        'Deep sea corals thrive in areas lacking direct [ 31. ___ ]',
        'Unlike shallow species, they do not rely on [ 32. ___ ] for nutrition',
        'Skeletons are formed primarily through deposits of [ 33. ___ ]',
        'Nutrient distribution is heavily influenced by deep oceanic [ 34. ___ ]',
        'Modern sediment core analysis reveals rising contamination from [ 35. ___ ]',
        'Significant physiological stress occurs when water [ 36. ___ ] rises sharply',
        'Individual coral units are medically classified as a [ 37. ___ ]',
        'Endangered colonies maintain a delicate [ 38. ___ ] with bacterial flora',
        'Benthic sea floors provide essential mineral [ 39. ___ ] for skeletal density',
        'Healthy cold-water reefs are vital for sustaining marine [ 40. ___ ]'
      ]
    }
  ];

  const sections: ListeningSection[] = sectionThemes.map(sec => {
    const qList: Question[] = [];

    if (sec.sNum === 1) {
      for (let i = 0; i < 10; i++) {
        qList.push({
          id: i + 1,
          type: 'fill-blanks',
          question: sec.prompts[i],
          correctAnswer: sec.answers[i],
          explanation: `অডিও ডায়ালগে স্পষ্টভাবে বলা হয়েছে: "${sec.answers[i]}।" রিয়েল পরীক্ষার নিয়মে শুনে টাইপ করতে হবে।`,
          passageQuote: `Applicant confirms: "Yes, please record ${sec.answers[i]} under our registration."`
        });
      }
    } else if (sec.sNum === 2) {
      const s2Questions = [
        {
          q: 'What was the original historical purpose of the main garden estate?',
          opts: [
            'A. A private residential estate belonging to an 18th-century merchant',
            'B. A military hospital during the Napoleonic campaigns',
            'C. A municipal water purification and reservoir facility',
            'D. An open-air livestock trading market'
          ],
          ans: 'A. A private residential estate belonging to an 18th-century merchant',
          expl: 'বক্তা উল্লেখ করেছেন যে অষ্টাদশ শতাব্দীতে একজন ধনী বণিকের ব্যক্তিগত বাসভবন হিসেবে এটি নির্মিত হয়েছিল।'
        },
        {
          q: 'At what time does the first daily botanical guided walk depart?',
          opts: ['A. 9:15 AM', 'B. 10:30 AM', 'C. 1:00 PM', 'D. 3:45 PM'],
          ans: 'B. 10:30 AM',
          expl: 'প্রতিদিন সকাল ১০:৩০ মিনিটে মেইন গেট থেকে গাইডেড ট্যুর শুরু হয়।'
        },
        {
          q: 'What restriction applies to visitors inside the tropical orchid glasshouse?',
          opts: [
            'A. Flash photography is strictly prohibited to protect plant specimens',
            'B. Visitors must remove their shoes at the entrance',
            'C. No bags larger than hand luggage are allowed inside',
            'D. Only adult visitors over 18 years are admitted'
          ],
          ans: 'A. Flash photography is strictly prohibited to protect plant specimens',
          expl: 'অরকিড হাউজে ফ্ল্যাশ ফটোগ্রাফি নিষিদ্ধ বলে বক্তা স্পষ্টভাবে জানান।'
        },
        {
          q: 'Why are children required to be accompanied near the Japanese water pond?',
          opts: [
            'A. The stepping stones are slippery and water depth is over 1.5 meters',
            'B. Rare ornamental fish species might be frightened by sudden noise',
            'C. The perimeter fence is undergoing active electrical maintenance',
            'D. Children receive free commemorative gift tokens at the pond'
          ],
          ans: 'A. The stepping stones are slippery and water depth is over 1.5 meters',
          expl: 'নিরাপত্তার স্বার্থে শিশুদের সাথে বড়দের থাকা বাধ্যতামূলক কারণ পাথরগুলো পিচ্ছিল।'
        },
        {
          q: 'Which payment method is NOT currently accepted at the outdoor cafe pavilion?',
          opts: [
            'A. Physical cash currency notes',
            'B. Contactless debit cards',
            'C. Smartphone mobile pay apps',
            'D. Annual member loyalty discount vouchers'
          ],
          ans: 'A. Physical cash currency notes',
          expl: 'ক্যাফে প্যাভিলিয়নে কেবল ক্যাশলেস কার্ড পেমেন্ট নেওয়া হয়, নগদ ক্যাশ নেওয়া হয় না।'
        },
        {
          q: 'What benefit do annual season-pass members receive in the gift shop?',
          opts: [
            'A. A 15% discount on all gardening tools and botanical publications',
            'B. Free unlimited deliveries anywhere in the county',
            'C. Priority reservations for weekend restaurant dining',
            'D. Complimentary customized name engraving on garden benches'
          ],
          ans: 'A. A 15% discount on all gardening tools and botanical publications',
          expl: 'বার্ষিক মেম্বাররা উপহারের দোকানে ১৫ শতাংশ ছাড় উপভোগ করেন।'
        },
        {
          q: 'Where should visitors report if they misplace personal belongings?',
          opts: [
            'A. The Security Information Desk beside the Western Archway',
            'B. The kitchen counter inside the Mediterranean restaurant',
            'C. The bicycle storage shelter near the car park',
            'D. The central conservatory maintenance workshop'
          ],
          ans: 'A. The Security Information Desk beside the Western Archway',
          expl: 'হারানো জিনিসপত্র জমা ও সংগ্রহের জন্য পশ্চিম আর্চওয়ের সিকিউরিটি ডেস্কে যেতে বলা হয়েছে।'
        },
        {
          q: 'What special requirement is needed for conducting commercial photography?',
          opts: [
            'A. A formal permit obtained from administration at least 48 hours in advance',
            'B. Accompaniment by a certified botanical garden security officer',
            'C. Wearing high-visibility safety clothing throughout the shoot',
            'D. Restricting all filming to the outdoor car parking zone'
          ],
          ans: 'A. A formal permit obtained from administration at least 48 hours in advance',
          expl: 'বাণিজ্যিক ছবি তোলার জন্য ৪৮ ঘণ্টা আগে অনুমতি নেওয়া প্রয়োজন।'
        },
        {
          q: 'Which volunteer team currently has the most urgent need for new recruits?',
          opts: [
            'A. Weekend educational tour leaders for school groups',
            'B. Plant nursery propagation and soil preparation assistants',
            'C. Digital marketing and social media photographers',
            'D. Gift shop inventory stock checkers'
          ],
          ans: 'A. Weekend educational tour leaders for school groups',
          expl: 'স্কুল গ্রুপগুলোর সাথে উইকএন্ডে ট্যুর পরিচালনা করতে ভলান্টিয়ারদের জরুরি প্রয়োজন।'
        },
        {
          q: 'How can visitors provide feedback regarding their experience today?',
          opts: [
            'A. By scanning the QR code printed on exit ticket receipts',
            'B. By writing in the leather-bound visitors log at the reception desk',
            'C. By mailing a handwritten postcard to the municipal council',
            'D. By scheduling a telephone interview with the park director'
          ],
          ans: 'A. By scanning the QR code printed on exit ticket receipts',
          expl: 'টিকিটের রশিদে থাকা কিউআর কোড স্ক্যান করে অনলাইন ফিডব্যাক ফর্ম পূরণ করা যায়।'
        }
      ];

      for (let i = 0; i < 10; i++) {
        const item = s2Questions[i];
        qList.push({
          id: 11 + i,
          type: 'multiple-choice',
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.expl,
          passageQuote: `Speaker announces: "${item.ans.substring(3)}"`
        });
      }
    } else if (sec.sNum === 3) {
      const s3Questions = [
        {
          q: 'Why did Maya choose to focus her research project on solar microgrids?',
          opts: [
            'A. Local installation costs have decreased significantly faster than wind turbines',
            'B. Her family previously operated an agricultural solar cooperative',
            'C. The regional government recently banned offshore wind installations',
            'D. Professor Evans specifically assigned that topic to her team'
          ],
          ans: 'A. Local installation costs have decreased significantly faster than wind turbines',
          expl: 'মায়া ব্যাখ্যা করে যে সৌর মাইক্রোগ্রিডের ব্যয় বায়ুচালিত টারবাইনের চেয়ে অনেক দ্রুত হ্রাস পেয়েছে।'
        },
        {
          q: 'What unexpected finding emerged from their initial residential survey?',
          opts: [
            'A. Most homeowners preferred independent local microgrids to the national power grid',
            'B. Rural residents expressed zero interest in battery storage technology',
            'C. High-income households refused to participate in survey questionnaires',
            'D. Power outages had decreased to zero during the previous winter months'
          ],
          ans: 'A. Most homeowners preferred independent local microgrids to the national power grid',
          expl: 'জরিপের ফলাফল অনুযায়ী বেশিরভাগ গ্রাহক জাতীয় গ্রিডের চেয়ে স্বাধীন মাইক্রোগ্রিড পছন্দ করেন।'
        },
        {
          q: 'What critical concern does Dr. Evans raise regarding their survey data?',
          opts: [
            'A. The sample size is geographically biased toward suburban homeowners',
            'B. The mathematical formulas used in the spreadsheet were outdated',
            'C. The students failed to record the interview participants names',
            'D. The survey was conducted in only one language'
          ],
          ans: 'A. The sample size is geographically biased toward suburban homeowners',
          expl: 'প্রফেসর ইভান্স সতর্ক করেন যে জরিপটি শুধু শহরতলীর বাসিন্দাদের উপর সীমাবদ্ধ ছিল।'
        },
        {
          q: 'How do Liam and Maya resolve the disagreement about data collection?',
          opts: [
            'A. They agree to distribute online questionnaires to rural apartment tenants',
            'B. They decide to completely exclude apartment tenants from their study',
            'C. They ask Dr. Evans to conduct the remaining interviews himself',
            'D. They hire a professional commercial polling agency to collect data'
          ],
          ans: 'A. They agree to distribute online questionnaires to rural apartment tenants',
          expl: 'তারা গ্রামাঞ্চলের ফ্ল্যাট বাসিন্দাদের কাছে অনলাইনে প্রশ্নপত্র পাঠিয়ে তথ্য সংগ্রহে একমত হয়।'
        },
        {
          q: 'Which academic journal article did Liam find most helpful for theoretical grounding?',
          opts: [
            'A. Henderson and Cole on decentralized energy economics',
            'B. Martinez on lithium battery degradation rates',
            'C. Takahashi on high-voltage transmission heat loss',
            'D. Davies on municipal zoning legal disputes'
          ],
          ans: 'A. Henderson and Cole on decentralized energy economics',
          expl: 'লিয়াম হেন্ডারসন ও কোলের গবেষণা প্রবন্ধটিকে সবচেয়ে কার্যকর রেফারেন্স হিসেবে উল্লেখ করে।'
        },
        {
          q: 'Why was the simulation testing delayed by nearly three weeks?',
          opts: [
            'A. The departmental computing cluster was undergoing emergency maintenance',
            'B. The research funding grant was temporarily frozen by the dean',
            'C. Maya was absent due to illness during the testing period',
            'D. The software licence for the fluid dynamics suite had expired'
          ],
          ans: 'A. The departmental computing cluster was undergoing emergency maintenance',
          expl: 'ডিপার্টমেন্টাল সুপারকম্পিউটার রক্ষণাবেক্ষণের কারণে সিমুলেশন রান পিছিয়ে যায়।'
        },
        {
          q: 'What ethical protocol approval is still pending before publication?',
          opts: [
            'A. Anonymized data confidentiality certificates for household energy billing records',
            'B. Patent registry waivers for the custom photovoltaic invertor circuits',
            'C. Copyright clearance for historical newspaper clippings used in the introduction',
            'D. Commercial sponsorship agreements with the regional electrical utility'
          ],
          ans: 'A. Anonymized data confidentiality certificates for household energy billing records',
          expl: 'গ্রাহকদের বিদ্যুৎ বিলের তথ্যের গোপনীয়তা সুরক্ষার ছাড়পত্র এখনও বাকি রয়েছে।'
        },
        {
          q: 'What revision does Dr. Evans suggest for the presentation slides?',
          opts: [
            'A. Replace detailed data tables with high-contrast comparative infographics',
            'B. Reduce the slide presentation time from twenty minutes to five minutes',
            'C. Include video recordings of every individual survey respondent',
            'D. Remove all statistical confidence intervals from the appendix'
          ],
          ans: 'A. Replace detailed data tables with high-contrast comparative infographics',
          expl: 'প্রফেসর পরামর্শ দেন জটিল টেবিলের বদলে পরিষ্কার ইনফোগ্রাফিক্স ব্যবহার করতে।'
        },
        {
          q: 'What task does Liam volunteer to complete by Friday afternoon?',
          opts: [
            'A. Draft the comparative methodology section and compile appendix graphs',
            'B. Print physical bound copies of the full dissertation for the library',
            'C. Travel to the provincial capital to interview government regulators',
            'D. Reformat the entire bibliographic reference list into Harvard style'
          ],
          ans: 'A. Draft the comparative methodology section and compile appendix graphs',
          expl: 'লিয়াম শুক্রবারের মধ্যে মেথডোলজি ড্রাফট ও গ্রাফ প্রস্তুত করতে দায়িত্ব নেয়।'
        },
        {
          q: 'What is the absolute final deadline for the full thesis submission?',
          opts: ['A. October 24th at 5:00 PM', 'B. November 1st at midnight', 'C. December 15th at noon', 'D. January 10th at 9:00 AM'],
          ans: 'A. October 24th at 5:00 PM',
          expl: 'সুপারভাইজার স্মরণ করিয়ে দেন যে আগামী ২৪ অক্টোবর বিকাল ৫টা হলো চূড়ান্ত ডেডলাইন।'
        }
      ];

      for (let i = 0; i < 10; i++) {
        const item = s3Questions[i];
        qList.push({
          id: 21 + i,
          type: 'multiple-choice',
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.expl,
          passageQuote: `Student confirms: "${item.ans.substring(3)}"`
        });
      }
    } else {
      for (let i = 0; i < 10; i++) {
        qList.push({
          id: 31 + i,
          type: 'fill-blanks',
          question: sec.lecturePrompts[i],
          correctAnswer: sec.lectureAnswers[i],
          explanation: `লেকচারারের বক্তব্য অনুযায়ী: "${sec.lectureAnswers[i]} serves as the critical biological determinant."`,
          passageQuote: `Lecturer notes: "Notice carefully that ${sec.lectureAnswers[i]} is fundamental to this ecological process."`
        });
      }
    }

    return {
      sectionNumber: sec.sNum,
      sectionTitle: sec.title,
      contextType: sec.context,
      questionRange: `Questions ${sec.sNum === 1 ? '1–10' : sec.sNum === 2 ? '11–20' : sec.sNum === 3 ? '21–30' : '31–40'}`,
      audioDurationSeconds: sec.sNum === 1 ? 420 : sec.sNum === 2 ? 450 : sec.sNum === 3 ? 480 : 510,
      audioUrl: getListeningAudioUrl(audioBookNum, audioTestNum, sec.sNum),
      audioTranscript: `[Official IELTS Full Mock Audio Simulation - Section ${sec.sNum}]
OFFICIAL ANNOUNCER: You will hear a recording adhering to the latest British Council and IDP CD-IELTS examination standards. Listen carefully to the audio and answer the corresponding questions on your screen.`,
      questions: qList
    };
  });

  return {
    id: `official-mock-test-${setId}-listening`,
    title: `${title} - Listening Exam (40 Questions)`,
    book: `Mock Set ${setId}`,
    testNumber: setId,
    timeLimitMinutes: 30,
    sections
  };
}

// -------------------------------------------------------------
// CURATED MOCK TEST BUNDLES (LATEST CAMBRIDGE STANDARDS)
// -------------------------------------------------------------
export const OFFICIAL_MOCK_TEST_SETS: FullMockTestBundle[] = [
  {
    id: 'mock-set-1',
    setId: 1,
    title: 'IELTS Full Mock Test 1 (2025/2026 British Council Standard)',
    subtitle: 'সর্বশেষ ব্রিটিশ কাউন্সিল ও আইডিপি সিডি-আইএলটিএস ফ্রেমওয়ার্ক অনুযায়ী পূর্ণাঙ্গ যাচাই পরীক্ষা',
    edition: 'Official Benchmark Mock Edition 1',
    difficulty: 'Standard CD-IELTS',
    recommendedFor: 'সব স্তরের শিক্ষার্থীদের পরীক্ষার প্রস্তুতি ও টাইমিং যাচাইয়ের জন্য সেরা',
    listeningExam: buildMockListeningExam(1, 'IELTS Full Mock Test 1', 18, 1),
    readingExam: {
      id: 'mock-set-1-reading',
      title: 'IELTS Full Mock Test 1 - Academic Reading (40 Questions)',
      book: 'Mock Set 1',
      testNumber: 1,
      timeLimitMinutes: 60,
      passages: [
        buildMockReadingPassage(1, 'Passage 1: Urban Microclimates and Sustainable Heat Mitigation', 1, 13, 'Urban Microclimates'),
        buildMockReadingPassage(2, 'Passage 2: The Evolution of Marine Navigation Cartography', 14, 13, 'Navigational Cartography'),
        buildMockReadingPassage(3, 'Passage 3: Cognitive Linguistic Determinism in Multilingual Brains', 27, 14, 'Cognitive Linguistics')
      ]
    },
    writingExam: {
      task1: {
        title: 'Academic Writing Task 1: Comparative Urban Infrastructure Investment',
        prompt: 'The charts below illustrate municipal spending on renewable energy, public transport, and flood defences across four European metropolitan centers between 2010 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        chartType: 'Multi-Bar Chart & Trend Line'
      },
      task2: {
        title: 'Academic Writing Task 2: Artificial Intelligence & Workforce Automation',
        prompt: 'In recent years, advancements in artificial intelligence have automated many professional tasks once performed exclusively by humans. Some argue that this development threatens economic stability and job security, while others believe it generates unprecedented creative and technological opportunities. Discuss both views and give your own opinion.',
        essayType: 'Discussion & Personal Stance Essay'
      }
    },
    speakingExam: {
      part1Topic: 'Hometown, Urban Greenery, and Daily Commuting Habits',
      part1Questions: [
        'Where do you currently reside, and what do you appreciate most about your local neighbourhood?',
        'Do you believe your city provides adequate public parks and recreational spaces for residents?',
        'How do you usually commute to work or school, and what improvements would you like to see in transport?'
      ],
      part2CueCard: {
        topic: 'Describe an ambitious long-term project you successfully executed or participated in.',
        cues: [
          'What the project was and what objectives it sought to accomplish',
          'Who you collaborated with and what specific role you assumed',
          'What unexpected challenges arose during its implementation',
          'And explain why the successful conclusion of this project was meaningful to you.'
        ]
      },
      part3Discussion: [
        'Why do modern organizations place increasing emphasis on multidisciplinary collaborative projects?',
        'How does digital telecommunication influence the cohesion of global project teams?',
        'To what extent should governments allocate capital to high-risk experimental innovation projects?'
      ]
    }
  },
  {
    id: 'mock-set-2',
    setId: 2,
    title: 'IELTS Full Mock Test 2 (IDP Academic High-Yield Benchmark)',
    subtitle: 'কঠিন ভোকেবুলারি ও জটিল অডিও অ্যাকসেন্ট সমৃদ্ধ উচ্চ-গ্রেড পরীক্ষা',
    edition: 'Intensive Academic Simulation Edition 2',
    difficulty: 'Challenging Band 7.5+',
    recommendedFor: 'যাঁরা ব্যান্ড স্কোর ৭.৫ থেকে ৮.০+ টার্গেট করছেন তাঁদের জন্য বিশেষভাবে তৈরি',
    listeningExam: buildMockListeningExam(2, 'IELTS Full Mock Test 2', 19, 1),
    readingExam: {
      id: 'mock-set-2-reading',
      title: 'IELTS Full Mock Test 2 - Academic Reading (40 Questions)',
      book: 'Mock Set 2',
      testNumber: 2,
      timeLimitMinutes: 60,
      passages: [
        buildMockReadingPassage(1, 'Passage 1: Subterranean Glacial Hydrology & Climate Indicators', 1, 13, 'Glacial Hydrology'),
        buildMockReadingPassage(2, 'Passage 2: Biomimicry and Tensile Architecture in Megastructures', 14, 13, 'Biomimetic Architecture'),
        buildMockReadingPassage(3, 'Passage 3: Neuroplasticity and Cognitive Resilience Across Lifespans', 27, 14, 'Neuroplastic Resilience')
      ]
    },
    writingExam: {
      task1: {
        title: 'Academic Writing Task 1: Global Agricultural Water Usage and Crop Yields',
        prompt: 'The table below details freshwater consumption metrics and proportional agricultural yields across five climatic zones between 2000 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        chartType: 'Data Table & Comparative Matrix'
      },
      task2: {
        title: 'Academic Writing Task 2: Higher Education Funding and Economic Prosperity',
        prompt: 'Some educational sociologists assert that university tuition fees should be entirely waived by governments to maximize national innovation, whereas economists contend that students must finance their own degrees as higher education delivers private financial returns. Discuss both views and give your reasoned perspective.',
        essayType: 'Argumentative & Evaluative Essay'
      }
    },
    speakingExam: {
      part1Topic: 'Scientific Innovations, Reading Habits, and Digital Media',
      part1Questions: [
        'How often do you read scientific or technological articles in your spare time?',
        'Do you think modern students read physical books less frequently than previous generations?',
        'What recent technological discovery has captured your interest the most?'
      ],
      part2CueCard: {
        topic: 'Describe a challenging intellectual skill or academic subject you mastered recently.',
        cues: [
          'What the skill or subject was and why you decided to pursue it',
          'How you organized your study schedule and what resources you consulted',
          'What cognitive hurdles or frustrations you had to surmount',
          'And explain how mastering this capability has broadened your academic or career horizons.'
        ]
      },
      part3Discussion: [
        'Should school curricula place higher priority on algorithmic thinking and data literacy?',
        'How do autodidactic learners using the internet compare with those receiving formal instruction?',
        'Will continuous adult upskilling become mandatory for professional survival in coming decades?'
      ]
    }
  },
  {
    id: 'mock-set-3',
    setId: 3,
    title: 'IELTS Full Mock Test 3 (Cambridge 19 Advanced Pattern)',
    subtitle: 'ক্যামব্রিজ ১৯ এর আধুনিক প্রশ্ন বিন্যাস ও টাইপ-বেইজড গ্যাপ ফিলিং টেস্ট',
    edition: 'Cambridge 19 Pattern Edition 3',
    difficulty: 'Advanced Band 8.5+',
    recommendedFor: 'ক্যামব্রিজের একদম নতুন নিয়ম ও ফার্স্ট-টাইম এক্সাম ফোকাসিংয়ের জন্য উপযোগী',
    listeningExam: buildMockListeningExam(3, 'IELTS Full Mock Test 3', 19, 2),
    readingExam: {
      id: 'mock-set-3-reading',
      title: 'IELTS Full Mock Test 3 - Academic Reading (40 Questions)',
      book: 'Mock Set 3',
      testNumber: 3,
      timeLimitMinutes: 60,
      passages: [
        buildMockReadingPassage(1, 'Passage 1: Ancient Irrigation Networks in Arid Mesopotamia', 1, 13, 'Ancient Hydrology'),
        buildMockReadingPassage(2, 'Passage 2: Deep-Sea Hydrothermal Chemosynthesis & Astrobiology', 14, 13, 'Hydrothermal Biology'),
        buildMockReadingPassage(3, 'Passage 3: Macroeconomic Transitions in Post-Industrial Economies', 27, 14, 'Macroeconomic Realignment')
      ]
    },
    writingExam: {
      task1: {
        title: 'Academic Writing Task 1: Renewable Energy Transition Projections (2020-2050)',
        prompt: 'The pie charts and stacked bar graph compare the global primary energy consumption by source in 2020 with projected transitions through 2050. Summarise the key trends, proportions, and significant comparative shifts.',
        chartType: 'Dual Pie Chart & Stacked Bar'
      },
      task2: {
        title: 'Academic Writing Task 2: Urbanization vs Regional Rural Preservation',
        prompt: 'Accelerated migration toward mega-cities is creating overcrowded urban centers while causing rural communities to experience demographic decline and loss of cultural heritage. To what extent do the benefits of rapid urbanization outweigh the disadvantages for national development?',
        essayType: 'Advantages vs Disadvantages Stance Essay'
      }
    },
    speakingExam: {
      part1Topic: 'Cultural Traditions, Music Festivals, and Social Community Life',
      part1Questions: [
        'Do you participate in traditional cultural celebrations in your community?',
        'What genre of music do you find most rejuvenating after intensive academic study?',
        'How do community festivals help foster social bonds among diverse populations?'
      ],
      part2CueCard: {
        topic: 'Describe a memorable cultural festival or public exhibition you attended.',
        cues: [
          'Where and when the event took place',
          'Who accompanied you and what activities were organized',
          'What distinctive customs, performances, or exhibits you observed',
          'And explain how this experience influenced your appreciation of artistic or cultural heritage.'
        ]
      },
      part3Discussion: [
        'How does globalization influence traditional artistic and culinary practices?',
        'Should national governments financially underwrite local cultural festivities?',
        'Can digital live-streaming ever replicate the visceral atmosphere of in-person public events?'
      ]
    }
  },
  {
    id: 'mock-set-4',
    setId: 4,
    title: 'IELTS Full Mock Test 4 (Diagnostic Assessment & Speed Test)',
    subtitle: 'টাইম ম্যানেজমেন্ট ও স্পেলিং এক্যুরেসি নিখুঁত করার এক্সক্লুসিভ স্পিড মক',
    edition: 'Speed & Accuracy Diagnostic Edition 4',
    difficulty: 'Standard CD-IELTS',
    recommendedFor: 'পরীক্ষার সময়ের মধ্যে ৪০টি প্রশ্নের নির্ভুল উত্তর দেওয়া ও স্পেলিং মিস রোধের জন্য আদর্শ',
    listeningExam: buildMockListeningExam(4, 'IELTS Full Mock Test 4', 17, 1),
    readingExam: {
      id: 'mock-set-4-reading',
      title: 'IELTS Full Mock Test 4 - Academic Reading (40 Questions)',
      book: 'Mock Set 4',
      testNumber: 4,
      timeLimitMinutes: 60,
      passages: [
        buildMockReadingPassage(1, 'Passage 1: Wildlife Corridors & Habitat Fragmentation Biology', 1, 13, 'Wildlife Connectivity'),
        buildMockReadingPassage(2, 'Passage 2: The Evolution of Autonomous Oceanic Cartography', 14, 13, 'Ocean Cartography'),
        buildMockReadingPassage(3, 'Passage 3: Linguistic Evolution and Digital Sociolects in Global English', 27, 14, 'Sociolinguistic Variation')
      ]
    },
    writingExam: {
      task1: {
        title: 'Academic Writing Task 1: Public Transportation Passenger Density & Reliability',
        prompt: 'The line graph details average passenger volumes across five transit networks throughout typical weekdays, alongside a table displaying delay frequencies. Summarise the key data points and contrast network performances.',
        chartType: 'Line Graph & Frequency Table'
      },
      task2: {
        title: 'Academic Writing Task 2: Environmental Protection vs Industrial Expansion',
        prompt: 'Some argue that developing countries must prioritize industrial growth and manufacturing even if it causes environmental degradation, whereas others maintain that environmental conservation must remain paramount. Discuss both views and state your personal conclusion.',
        essayType: 'Balanced Evaluation & Opinion Essay'
      }
    },
    speakingExam: {
      part1Topic: 'Environmental Awareness, Recycling, and Consumer Habits',
      part1Questions: [
        'Do you consciously separate household recyclables in your everyday routine?',
        'Have you noticed any changes in air quality or temperature in your city over recent years?',
        'Do you prefer purchasing products from companies that demonstrate sustainable practices?'
      ],
      part2CueCard: {
        topic: 'Describe an environmental initiative or conservation campaign you learned about or supported.',
        cues: [
          'What the initiative was and what environmental challenge it targeted',
          'How the organizers engaged the public or implemented practical solutions',
          'What measurable impact or positive transformation it produced',
          'And explain why you found this particular initiative admirable.'
        ]
      },
      part3Discussion: [
        'Who bears greater responsibility for environmental restoration: individual consumers or multi-national corporations?',
        'Can economic growth be decoupled from environmental resource depletion?',
        'How effective are international carbon reduction summits in compelling sovereign state compliance?'
      ]
    }
  }
];

// -------------------------------------------------------------
// DYNAMIC MOCK GENERATOR (NEVER FIXED - CHANGES ON DEMAND)
// -------------------------------------------------------------
export function generateDynamicMockTest(customSeed?: number): FullMockTestBundle {
  const seed = customSeed || Math.floor(Math.random() * 100000);
  const baseBookList = [19, 18, 17, 16];
  const chosenBook = baseBookList[seed % baseBookList.length];
  const chosenTest = (seed % 4) + 1;
  const mockNum = (seed % 99) + 5;

  const topicsPool = [
    { theme: 'Deep Ocean Bioluminescence', p1: 'Deep Ocean Bioluminescence and Microbial Flora', p2: 'Submarine Volcano Geophysics', p3: 'Paleoclimate Antarctic Core Records' },
    { theme: 'Urban Microclimates', p1: 'Urban Thermal Inversions and Canopy Engineering', p2: 'Autonomous Electric Mass Transit Networks', p3: 'Computational Economics of Megacities' },
    { theme: 'Ancient Epigraphy', p1: 'Decipherment of Ancient Indus Script Characters', p2: 'Architectural Acoustic Resonance in Greco-Roman Amphitheatres', p3: 'The Philosophical Enlightenment and Epistemology' },
    { theme: 'Synthetic Biology', p1: 'Engineered Microbial Enchancement in Soil Rehabilitation', p2: 'Bio-Polymer Replacement for Commercial Plastics', p3: 'Bioethics and Gene Editing Regulatory Frameworks' }
  ];

  const chosenTopic = topicsPool[seed % topicsPool.length];

  const listeningExam = buildMockListeningExam(
    mockNum,
    `Dynamic IELTS Mock Test #${mockNum} (Auto-Generated)`,
    chosenBook,
    chosenTest
  );

  const readingExam: FullReadingExam = {
    id: `dynamic-mock-${seed}-reading`,
    title: `Dynamic Academic Reading Mock #${mockNum} (40 Questions)`,
    book: `Dynamic Mock #${mockNum}`,
    testNumber: mockNum,
    timeLimitMinutes: 60,
    passages: [
      buildMockReadingPassage(1, `Passage 1: ${chosenTopic.p1}`, 1, 13, chosenTopic.theme),
      buildMockReadingPassage(2, `Passage 2: ${chosenTopic.p2}`, 14, 13, chosenTopic.theme),
      buildMockReadingPassage(3, `Passage 3: ${chosenTopic.p3}`, 27, 14, chosenTopic.theme)
    ]
  };

  return {
    id: `dynamic-mock-${seed}`,
    setId: mockNum,
    title: `Dynamic IELTS Full Mock Test #${mockNum} (Randomized CD-IELTS)`,
    subtitle: `স্বয়ংক্রিয়ভাবে পরিবর্তিত ডাইনামিক প্রশ্ন ও অডিও সেট — কোনো ফিক্সড ফরম্যাট নয়`,
    edition: `Auto-Generated Dynamic Edition ${seed}`,
    difficulty: 'Standard CD-IELTS',
    recommendedFor: 'প্রতিবার নতুন নতুন আনকমন প্রশ্ন ও প্যাসেজে নিজেকে যাচাই করার জন্য',
    listeningExam,
    readingExam,
    writingExam: {
      task1: {
        title: `Dynamic Task 1: Analysis of ${chosenTopic.theme} Quantitative Trends`,
        prompt: `The comparative visual representation presents developmental data concerning ${chosenTopic.theme.toLowerCase()} across global geographic zones over a twenty-year timeframe. Summarise the key analytical patterns, contrast pivotal data clusters, and outline the overarching trajectory.`,
        chartType: 'Multi-Variable Data Graph & Comparative Matrix'
      },
      task2: {
        title: `Dynamic Task 2: Contemporary Dilemmas Surrounding ${chosenTopic.theme}`,
        prompt: `Contemporary societies increasingly confront the complex socioeconomic and ethical ramifications associated with rapid progress in ${chosenTopic.theme.toLowerCase()}. Some theorists insist that immediate technological deployment is essential for human advancement, while opponents caution that unregulated deployment threatens ecological and social equilibrium. Discuss both arguments and substantiate your personal viewpoint.`,
        essayType: 'Balanced Discussion & Analytical Synthesis'
      }
    },
    speakingExam: {
      part1Topic: `Daily Routine, Learning Styles, and ${chosenTopic.theme}`,
      part1Questions: [
        'How do you manage your daily schedule when preparing for demanding intellectual challenges?',
        `Have you ever read articles discussing recent advancements in ${chosenTopic.theme.toLowerCase()}?`,
        'Do you prefer studying complex subjects independently or in collaborative study groups?'
      ],
      part2CueCard: {
        topic: `Describe an encounter with a surprising scientific or academic concept that reshaped your perspective.`,
        cues: [
          'What the concept or discovery was and how you learned about it',
          'Why you initially found it counterintuitive or challenging to understand',
          'What investigation or inquiry you conducted to verify it',
          'And explain how this conceptual shift influenced your broader intellectual outlook.'
        ]
      },
      part3Discussion: [
        'Why do contemporary academic institutions place rising emphasis on cross-disciplinary research?',
        'How can scientists communicate intricate empirical discoveries effectively to the general public without distorting accuracy?',
        'To what degree should public taxation subsidize exploratory scientific inquiries without immediate commercial utility?'
      ]
    }
  };
}
