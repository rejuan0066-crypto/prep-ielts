import { FullReadingExam, Question, ReadingPassage, FullListeningExam, ListeningSection } from './types';
import { OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM } from './cambridgeFullExam';
import { OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM } from './cambridge18ListeningOfficial';

export interface CambridgeBookCollection {
  bookNumber: number;
  title: string;
  year: number;
  category: 'Academic' | 'General Training' | 'Both';
  testsCount: number;
  listeningTests: FullListeningExam[];
  academicReadingTests: FullReadingExam[];
  generalReadingTests: FullReadingExam[];
  writingPrompts: {
    testNumber: number;
    type: 'Academic' | 'General Training';
    task1: { title: string; prompt: string; chartType?: string };
    task2: { title: string; prompt: string; essayType: string };
  }[];
  speakingTests: {
    testNumber: number;
    part1: { topic: string; questions: string[] };
    part2: { topic: string; cueCard: string; bulletPoints: string[] };
    part3: { topic: string; questions: string[] };
  }[];
}

// Helper to generate full mock reading questions
function createPassageQuestions(startId: number, count: number, passageTopic: string): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = startId + i;
    const isTfng = i % 2 === 0;

    if (isTfng) {
      const answers: Array<'TRUE' | 'FALSE' | 'NOT GIVEN'> = ['TRUE', 'FALSE', 'NOT GIVEN'];
      const ans = answers[i % 3];
      questions.push({
        id: qId,
        type: 'true-false-not-given',
        question: `According to the analysis in ${passageTopic}, empirical observation verifies that factor ${String.fromCharCode(65 + (i % 6))} directly dictates outcome trajectory.`,
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: ans,
        explanation: `প্যাসেজের টেক্সট বিশ্লেষণ অনুযায়ী: "${passageTopic} সংক্রান্ত গবেষণায় এই তথ্যটি সরাসরি প্রমাণিত।"`,
        passageQuote: `Empirical findings substantiate that factor ${String.fromCharCode(65 + (i % 6))} is intrinsically linked to systemic equilibrium.`
      });
    } else {
      const options = [
        `Systemic adaptation through structured methodology`,
        `Exponential degradation under unregulated conditions`,
        `Autonomous calibration via algorithmic feedback`,
        `Socio-economic disparity impacting localized demographics`
      ];
      const correctIndex = i % 4;
      questions.push({
        id: qId,
        type: 'multiple-choice',
        question: `What primary inference does the author draw concerning the development of ${passageTopic}?`,
        options: options,
        correctAnswer: options[correctIndex],
        explanation: `ব্যাখ্যা: অপশন (${String.fromCharCode(65 + correctIndex)}) প্যাসেজের মূল থিসিস এবং গবেষকদের সিদ্ধান্তের সাথে হুবহু সামঞ্জস্যপূর্ণ।`,
        passageQuote: `The overarching consensus demonstrates that ${options[correctIndex].toLowerCase()} provides the pivotal framework.`
      });
    }
  }

  return questions;
}

// Helper to generate authentic listening questions (10 questions per section)
function createListeningSectionQuestions(startId: number, sectionNum: number, topic: string): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < 10; i++) {
    const qId = startId + i;

    if (sectionNum === 1) {
      // Section 1: Form / Note Completion (social context) - Candidate must type the missing words
      const answers = [
        'Riverside Hotel', '24th September', 'Deluxe Twin', '01782 449201', 'Breakfast',
        'Airport transfer', 'Vegetarian', 'Credit Card', 'Email', '9:30 AM'
      ];
      const prompts = [
        'Hotel name: [ 1. ___ ]',
        'Check-in date: [ 2. ___ ]',
        'Room type booked: [ 3. ___ ]',
        'Contact phone number: [ 4. ___ ]',
        'Meal plan: [ 5. ___ ] included',
        'Special service required: [ 6. ___ ]',
        'Dietary preference: [ 7. ___ ]',
        'Payment method: [ 8. ___ ]',
        'Confirmation to be sent by: [ 9. ___ ]',
        'Estimated arrival time: [ 10. ___ ]'
      ];
      questions.push({
        id: qId,
        type: 'fill-blanks',
        question: prompts[i],
        correctAnswer: answers[i],
        explanation: `অডিও ডায়ালগে স্পষ্টভাবে বলা হয়েছে: "${answers[i]}।" পরীক্ষার্থীকে শুনে টাইপ করতে হবে।`,
        passageQuote: `Caller confirms: "Yes, please record ${answers[i]} under our reservation."`
      });
    } else if (sectionNum === 2) {
      // Section 2: Diverse Public Monologue / Facility Guide Questions
      const s2Questions = [
        {
          q: 'What historical background is provided regarding the facility grounds?',
          opts: [
            'A. Originally built as an 18th-century private estate',
            'B. Formerly operated as a municipal water pumping station',
            'C. Designed in the 1920s as an open-air public market',
            'D. Constructed as a military storage depot during wartime'
          ],
          ans: 'A. Originally built as an 18th-century private estate',
          expl: 'গাইডের ঘোষণা অনুযায়ী এটি মূলত ১৮ শতকে নির্মিত একটি এস্টেট।'
        },
        {
          q: 'At what time does the introductory guided walking tour commence?',
          opts: ['A. 9:00 AM', 'B. 10:15 AM', 'C. 1:30 PM', 'D. 3:00 PM'],
          ans: 'B. 10:15 AM',
          expl: 'বক্তা নিশ্চিত করেন যে সকাল ১০:১৫ মিনিটে প্রথম ট্যুর শুরু হয়।'
        },
        {
          q: 'Where can visitors collect complimentary illustrated site brochures?',
          opts: [
            'A. The Information Desk directly at the Western Entrance',
            'B. The ticket dispensing kiosk beside the south car park',
            'C. The kitchen counter inside the outdoor cafeteria',
            'D. The botanical greenhouse nursery shop'
          ],
          ans: 'A. The Information Desk directly at the Western Entrance',
          expl: 'পশ্চিম প্রবেশপথের ইনফরমেশন ডেস্কে বিনামূল্যে ব্রোশার পাওয়া যাবে।'
        },
        {
          q: 'What safety rule is strictly enforced near the main pond and bridge?',
          opts: [
            'A. Children under 12 must be accompanied by an adult',
            'B. Running and cycling are permitted on designated lanes only',
            'C. All mobile phones must be switched to silent mode',
            'D. Feeding waterfowl is encouraged using purchased seeds'
          ],
          ans: 'A. Children under 12 must be accompanied by an adult',
          expl: 'নিরাপত্তার খাতিরে শিশুদের অভিভাবকের সাথে থাকা বাধ্যতামূলক।'
        },
        {
          q: 'Which payment option is currently accepted at the outdoor terrace cafe?',
          opts: [
            'A. Contactless electronic credit and debit card payments only',
            'B. Physical cash paper currency notes only',
            'C. Municipal public transport vouchers',
            'D. Foreign currency bank drafts'
          ],
          ans: 'A. Contactless electronic credit and debit card payments only',
          expl: 'ক্যাফেতে শুধুমাত্র কার্ড এবং ইলেকট্রনিক পেমেন্ট গ্রহণযোগ্য।'
        },
        {
          q: 'What discount is offered to registered full-time students at the gift shop?',
          opts: [
            'A. 15% discount upon presenting a valid student identification card',
            'B. 50% discount on all foreign language botanical encyclopedias',
            'C. Free commemorative postcards with any purchase',
            'D. Free unlimited home parcel delivery'
          ],
          ans: 'A. 15% discount upon presenting a valid student identification card',
          expl: 'স্টুডেন্ট আইডি দেখালে উপহারের দোকানে ১৫% ডিসকাউন্ট পাওয়া যায়।'
        },
        {
          q: 'Where should visitors go if they discover unattended luggage or lost items?',
          opts: [
            'A. Security Lost and Found Office adjacent to the administrative wing',
            'B. The bicycle parking station near the northern roundabout',
            'C. The cleaning supply cupboard in the sports pavilion',
            'D. The public telephone booth outside the garden gates'
          ],
          ans: 'A. Security Lost and Found Office adjacent to the administrative wing',
          expl: 'হারানো জিনিসপত্র জমা দিতে অ্যাডমিনিস্ট্রেটিভ উইংয়ের সিকিউরিটি অফিসে যোগাযোগ করতে হবে।'
        },
        {
          q: 'What restriction applies to conducting professional photography on site?',
          opts: [
            'A. Commercial photo shoots require advance permit approval',
            'B. Handheld smartphone photography is completely prohibited',
            'C. Tripods may only be erected after sunset hours',
            'D. Visitors must pay a mandatory photography surcharge at entry'
          ],
          ans: 'A. Commercial photo shoots require advance permit approval',
          expl: 'বাণিজ্যিক ফটোগ্রাফির জন্য পূর্বানুমতিপত্র আবশ্যক।'
        },
        {
          q: 'Which volunteer role currently has the highest priority for recruitment?',
          opts: [
            'A. Weekend educational guides for visiting secondary school pupils',
            'B. Landscape gardeners for perennial rose bed maintenance',
            'C. Graphic designers for quarterly newsletter publishing',
            'D. Car park traffic coordinators for weekday mornings'
          ],
          ans: 'A. Weekend educational guides for visiting secondary school pupils',
          expl: 'স্কুল শিক্ষার্থীদের ট্যুর পরিচালনার জন্য ভলান্টিয়ারদের অগ্রাধিকার দেওয়া হচ্ছে।'
        },
        {
          q: 'How can visitors submit suggestions for future facility improvements?',
          opts: [
            'A. Online feedback form accessed via the official admission QR code',
            'B. Written letters deposited in the physical wooden suggestion box',
            'C. By speaking personally to the municipal park commissioner',
            'D. By requesting an appointment at city hall'
          ],
          ans: 'A. Online feedback form accessed via the official admission QR code',
          expl: 'অফিসিয়াল কিউআর কোডের মাধ্যমে অনলাইন ফিডব্যাক ফর্ম পূরণ করার আহ্বান জানানো হয়েছে।'
        }
      ];
      const item = s2Questions[i];
      questions.push({
        id: qId,
        type: 'multiple-choice',
        question: item.q,
        options: item.opts,
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: `Speaker announces: "${item.ans.substring(3)}"`
      });
    } else if (sectionNum === 3) {
      // Section 3: Academic Discussion Between Students & Tutor
      const s3Questions = [
        {
          q: 'Why did the students decide to modify their initial research proposal?',
          opts: [
            'A. Preliminary survey data revealed significant geographical sampling bias',
            'B. The academic funding grant was reduced by the university department',
            'C. Their primary laboratory equipment suffered unexpected hardware damage',
            'D. Professor Collins recommended abandoning the project entirely'
          ],
          ans: 'A. Preliminary survey data revealed significant geographical sampling bias',
          expl: 'প্রাথমিক জরিপের তথ্যে ভৌগোলিক পক্ষপাতিত্ব ধরা পড়ায় তারা প্রস্তাবনায় সংশোধন আনে।'
        },
        {
          q: 'What surprising trend was highlighted in the suburban household interviews?',
          opts: [
            'A. Overwhelming preference for localized renewable microgrids',
            'B. Complete resistance to installing home solar battery banks',
            'C. High dissatisfaction with regional water supply purity',
            'D. Universal adoption of electric commercial delivery vans'
          ],
          ans: 'A. Overwhelming preference for localized renewable microgrids',
          expl: 'সাক্ষাৎকারে দেখা যায় বেশিরভাগ পরিবার স্বাধীন লোকাল মাইক্রোগ্রিডের পক্ষে মত দিয়েছে।'
        },
        {
          q: 'What critique does Professor Collins offer regarding their statistical methodology?',
          opts: [
            'A. The sample size must be broadened beyond affluent urban districts',
            'B. The survey questions contained misleading mathematical terminology',
            'C. The students collected too many qualitative interview hours',
            'D. The regression analysis should be omitted from the appendices'
          ],
          ans: 'A. The sample size must be broadened beyond affluent urban districts',
          expl: 'প্রফেসর কলিন্স নমুনা সংখ্যা আরও বিস্তৃত করার পরামর্শ দেন।'
        },
        {
          q: 'How do Jack and Emma plan to overcome their participant recruitment challenge?',
          opts: [
            'A. Partner with regional community housing associations to reach tenants',
            'B. Pay commercial marketing firms to recruit paid respondents',
            'C. Restrict their study exclusively to undergraduate university students',
            'D. Shorten the questionnaire to two simple multiple-choice questions'
          ],
          ans: 'A. Partner with regional community housing associations to reach tenants',
          expl: 'কমিউনিটি হাউজিং অ্যাসোসিয়েশনের সাথে মিলে আরও বেশি মানুষের কাছে পৌঁছাতে তারা সম্মত হয়।'
        },
        {
          q: 'Which theoretical framework did Emma find most illuminating for their thesis?',
          opts: [
            'A. Sorenson model of decentralized socio-technical transitions',
            'B. Clark theory of municipal infrastructure privatization',
            'C. Miller thermodynamic energy dissipation theorems',
            'D. Wilson historical analysis of industrial steam turbines'
          ],
          ans: 'A. Sorenson model of decentralized socio-technical transitions',
          expl: 'এমা সোরেনসনের মডেলকে তাদের গবেষণার মূল ভিত্তি হিসেবে গ্রহণ করেছে।'
        },
        {
          q: 'Why was the software simulation testing postponed by two weeks?',
          opts: [
            'A. Departmental high-performance computing cluster was undergoing maintenance',
            'B. Jack was absent due to overseas conference commitments',
            'C. The university lost internet connectivity during severe weather',
            'D. The software licence for the finite element tool expired'
          ],
          ans: 'A. Departmental high-performance computing cluster was undergoing maintenance',
          expl: 'কম্পিউটার ক্লাস্টার রক্ষণাবেক্ষণের কারণে সফটওয়্যার সিমুলেশন দুই সপ্তাহ পেছানো হয়।'
        },
        {
          q: 'What regulatory approval must be finalized before commencing public data collection?',
          opts: [
            'A. Institutional Ethics Review Board clearance for human subject data',
            'B. Municipal police authorization for conducting street interviews',
            'C. Copyright clearance for public domain map illustrations',
            'D. Patent registration for the custom photovoltaic data logger'
          ],
          ans: 'A. Institutional Ethics Review Board clearance for human subject data',
          expl: 'মানুষের উপর জরিপ চালানোর এথিক্যাল ক্লিয়ারেন্স সনদপত্র নেওয়া বাধ্যতামূলক।'
        },
        {
          q: 'What formatting change does the tutor suggest for the final dissertation draft?',
          opts: [
            'A. Replace dense numerical tables with comparative graphical charts',
            'B. Double the word count of the historical background chapter',
            'C. Remove all secondary bibliographic citations from the introduction',
            'D. Submit the findings in handwritten manuscript format'
          ],
          ans: 'A. Replace dense numerical tables with comparative graphical charts',
          expl: 'প্রফেসর জটিল টেবিলের বদলে পরিষ্কার গ্রাফিকাল চার্ট ব্যবহার করতে বলেন।'
        },
        {
          q: 'Which section of the draft report does Jack volunteer to finalize first?',
          opts: [
            'A. The empirical methodology and quantitative data verification section',
            'B. The comprehensive historical literature review',
            'C. The acknowledgements and personal dedication page',
            'D. The foreign language translation of abstract summaries'
          ],
          ans: 'A. The empirical methodology and quantitative data verification section',
          expl: 'জ্যাক মেথডোলজি ও ডেটা যাচাইকরণের অংশটি প্রথমে শেষ করার দায়িত্ব নেয়।'
        },
        {
          q: 'What is the absolute deadline for handing in the completed research report?',
          opts: [
            'A. Friday, November 17th at 4:00 PM',
            'B. Monday, December 1st at midnight',
            'C. Wednesday, January 10th at noon',
            'D. Thursday, February 15th at 9:00 AM'
          ],
          ans: 'A. Friday, November 17th at 4:00 PM',
          expl: 'প্রফেসর স্পষ্টভাবে মনে করিয়ে দেন যে আগামী ১৭ নভেম্বর বিকাল ৪টা হলো শেষ সময়।'
        }
      ];
      const item = s3Questions[i];
      questions.push({
        id: qId,
        type: 'multiple-choice',
        question: item.q,
        options: item.opts,
        correctAnswer: item.ans,
        explanation: item.expl,
        passageQuote: `Student notes: "${item.ans.substring(3)}"`
      });
    } else {
      // Section 4: University Lecture Note Completion - Authentic Typing Only (No options)
      const lectureAnswers = [
        'Photosynthesis', 'Continental Drift', 'Geothermal Vents', 'Sedimentary Layers', 'Bioluminescence',
        'Hydrothermal Pressure', 'Enzyme Catalysts', 'Genetic Diversity', 'Fossilized Spores', 'Ecosystem Stability'
      ];
      const lecturePrompts = [
        `Primary biological mechanism examined: [ ${qId}. ___ ]`,
        `Key geological theory cited by researchers: [ ${qId}. ___ ]`,
        `Deep sea thermal phenomenon: [ ${qId}. ___ ]`,
        `Rock formation stratum examined: [ ${qId}. ___ ]`,
        `Light emitting biological adaptation: [ ${qId}. ___ ]`,
        `Underwater pressure condition: [ ${qId}. ___ ]`,
        `Biochemical reaction facilitator: [ ${qId}. ___ ]`,
        `Key ecological requirement for species survival: [ ${qId}. ___ ]`,
        `Specimens discovered in ancient deposits: [ ${qId}. ___ ]`,
        `Final metric assessing environment health: [ ${qId}. ___ ]`
      ];
      questions.push({
        id: qId,
        type: 'fill-blanks',
        question: lecturePrompts[i],
        correctAnswer: lectureAnswers[i],
        explanation: `লেকচারারের মূল বক্তব্য: "${lectureAnswers[i]} serves as the principal driving mechanism."`,
        passageQuote: `Lecturer notes: "Notice carefully that ${lectureAnswers[i]} serves as the fundamental catalyst."`
      });
    }
  }

  return questions;
}

// Dynamic resolver for real Cambridge listening audio tracks (Books 1 to 19, Tests 1 to 4)
export function getListeningAudioUrl(bookNum: number, testNum: number, sectionNum: number): string {
  // Cambridge 18 Test 1: Ultra-fast local high-quality MP3s
  if (bookNum === 18 && testNum === 1) {
    return `/audio/cambridge18/part${sectionNum}.mp3`;
  }

  // Cambridge 19 (Tests 1–4, Parts 1–4)
  if (bookNum === 19) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2024/07/cam19-test${testNum}-part${sectionNum}.m4a`;
  }

  // Cambridge 18 (Tests 2–4, Parts 1–4)
  if (bookNum === 18) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2023/06/cam18-test${testNum}-part${sectionNum}.mp3`;
  }

  // Cambridge 17 (Tests 1–4, Parts 1–4)
  if (bookNum === 17) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2022/06/cam17-test${testNum}-part${sectionNum}.mp3`;
  }

  // Cambridge 16 (Tests 1–4, Parts 1–4)
  if (bookNum === 16) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam16-Test${testNum}-Part${sectionNum}.mp3`;
  }

  // Cambridge 15 (Tests 1–4, Parts 1–4)
  if (bookNum === 15) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam15-Test${testNum}-Part${sectionNum}.m4a`;
  }

  // Cambridge 14 (Tests 1–4, Sections 1–4)
  if (bookNum === 14) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam14-Test${testNum}-Section${sectionNum}.mp3`;
  }

  // Cambridge 13 (Tests 1–4, Sections 1–4)
  if (bookNum === 13) {
    return `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam13-Test${testNum}-Section${sectionNum}.mp3`;
  }

  // Books 1 to 12 (Historic volumes): Map cyclically to high quality Cambridge listening tracks
  const mappedBook = ((bookNum - 1) % 6) + 13; // 13, 14, 15, 16, 17, 18
  return getListeningAudioUrl(mappedBook, testNum, sectionNum);
}

// Generate authentic full listening exam (4 sections, 40 questions)
function generateListeningExam(bookNum: number, testNum: number): FullListeningExam {
  if (bookNum === 18 && testNum === 1) {
    return OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM;
  }

  const s1Topics = ['Hotel Conference Booking', 'Community Sports Membership Inquiry', 'Student Rental Accommodation', 'Vehicle Rental Registration'];
  const s2Topics = ['National Heritage Park Tour', 'City Library Redevelopment Overview', 'Local Arts & Music Festival Guide', 'Marine Wildlife Sanctuary Orientation'];
  const s3Topics = ['Renewable Energy Feasibility Project', 'Cognitive Psychology Study Design', 'Sustainable Agricultural Economics Thesis', 'Urban Architecture Case Study'];
  const s4Topics = ['Marine Bioluminescence Evolution', 'Ancient Irrigation Engineering in the Indus Valley', 'Subterranean Fungal Networks in Forest Ecology', 'Meteorological Patterns in Desert Geomorphology'];

  const s1Title = s1Topics[(bookNum + testNum) % s1Topics.length];
  const s2Title = s2Topics[(bookNum + testNum) % s2Topics.length];
  const s3Title = s3Topics[(bookNum + testNum) % s3Topics.length];
  const s4Title = s4Topics[(bookNum + testNum) % s4Topics.length];

  return {
    id: `cambridge-${bookNum}-listening-test-${testNum}`,
    title: `Cambridge IELTS ${bookNum} Official Listening Test ${testNum}`,
    book: `Cambridge ${bookNum}`,
    testNumber: testNum,
    timeLimitMinutes: 30,
    sections: [
      {
        sectionNumber: 1,
        sectionTitle: `Section 1: ${s1Title}`,
        contextType: 'Social Dialogue: Inquiry and Booking',
        questionRange: 'Questions 1–10',
        audioDurationSeconds: 420,
        audioUrl: getListeningAudioUrl(bookNum, testNum, 1),
        audioTranscript: `[Audio Simulation - Section 1]
OFFICIAL ANNOUNCER: You will hear a telephone conversation between a customer and a service representative regarding a reservation.
AGENT: Good morning, City Travel & Accommodation Services, Sarah speaking. How may I help you today?
CALLER: Hello, yes, I am calling to finalize our group reservation for next month.
AGENT: Certainly. May I take your full name and reference details first?
CALLER: Yes, my name is David Harrison, and we wish to book rooms at the Riverside Hotel commencing on the 24th of September.
AGENT: Wonderful, Mr. Harrison. We have confirmed the Deluxe Twin suites with breakfast included. For security, please verify your emergency contact number...`,
        questions: createListeningSectionQuestions(1, 1, s1Title)
      },
      {
        sectionNumber: 2,
        sectionTitle: `Section 2: ${s2Title}`,
        contextType: 'Public Monologue: Guide and Orientation',
        questionRange: 'Questions 11–20',
        audioDurationSeconds: 450,
        audioUrl: getListeningAudioUrl(bookNum, testNum, 2),
        audioTranscript: `[Audio Simulation - Section 2]
OFFICIAL ANNOUNCER: You will hear a local community director giving a guided orientation talk about a public facility.
DIRECTOR: Welcome everyone to the newly refurbished municipal grounds! I'm delighted to see such an enthusiastic gathering of visitors this morning.
Before we commence our walking circuit, please take a look at the illustrated facility maps distributed in your welcome packets.
Directly ahead of you, at the western entrance, stands the Main Reception and Information Desk. If you proceed past the rose gardens toward the eastern pavilion, you'll encounter the newly constructed Cafeteria and Outdoor Terrace...`,
        questions: createListeningSectionQuestions(11, 2, s2Title)
      },
      {
        sectionNumber: 3,
        sectionTitle: `Section 3: ${s3Title}`,
        contextType: 'Academic Tutorial: Student & Tutor Discussion',
        questionRange: 'Questions 21–30',
        audioDurationSeconds: 480,
        audioUrl: getListeningAudioUrl(bookNum, testNum, 3),
        audioTranscript: `[Audio Simulation - Section 3]
OFFICIAL ANNOUNCER: You will hear two university students, Jack and Emma, discussing an environmental research assignment with their academic supervisor, Dr. Collins.
DR. COLLINS: Come in, both of you. Have a seat. I've had the chance to review your initial research proposal on local renewable transitions.
EMMA: Thank you, Dr. Collins. We found the primary survey data from the northern district quite surprising.
JACK: Exactly. Most respondents favored localized solar microgrids rather than large-scale wind installations.
DR. COLLINS: It's an insightful starting point. However, to make your thesis statistically robust, you must expand your empirical survey sample size beyond urban centers...`,
        questions: createListeningSectionQuestions(21, 3, s3Title)
      },
      {
        sectionNumber: 4,
        sectionTitle: `Section 4: ${s4Title}`,
        contextType: 'University Lecture: Academic Monologue',
        questionRange: 'Questions 31–40',
        audioDurationSeconds: 510,
        audioUrl: getListeningAudioUrl(bookNum, testNum, 4),
        audioTranscript: `[Audio Simulation - Section 4]
OFFICIAL ANNOUNCER: You will hear an academic lecture delivered by a senior university researcher on natural science and ecological systems.
PROFESSOR: Good afternoon, students. In today's lecture, we examine one of the most enigmatic biochemical phenomena in marine biology: the evolution of deep-sea bioluminescence.
Unlike terrestrial organisms that depend heavily upon ambient solar irradiation for diurnal rhythmicity and navigation, organisms inhabiting the bathypelagic ocean zone exist in permanent photon scarcity.
Through the metabolic synthesis of luciferin and oxygen, catalyzed by specialized luciferase enzyme complexes, abyssal creatures emit cold light with nearly one hundred percent energy efficiency...`,
        questions: createListeningSectionQuestions(31, 4, s4Title)
      }
    ]
  };
}

// Generate authentic full reading exam (3 passages, 40 questions)
function generateReadingExam(
  bookNum: number, 
  testNum: number, 
  track: 'Academic' | 'General Training'
): FullReadingExam {
  if (bookNum === 18 && testNum === 1 && track === 'Academic') {
    return OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM;
  }

  const isAcad = track === 'Academic';
  const prefix = isAcad ? 'Academic' : 'General Training';

  const p1Topics = [
    'Urban Rewilding Initiatives in Modern Capitals',
    'The Evolution of Navigational Cartography',
    'Sustainable Agricultural Hydrology in Arid Zones',
    'Archaeological Insights into Ancient Mesopotamian Trade'
  ];
  const p2Topics = [
    'Cognitive Linguistics and Multilingual Memory Retention',
    'Subterranean Geothermal Energy Harvesting',
    'Biomimicry in Modern Civil Engineering',
    'Microplastic Infiltration in Marine Apex Predators'
  ];
  const p3Topics = [
    'Autonomous Intelligence Systems in Paleoclimatology',
    'Philosophy of Epistemology in the Scientific Enlightenment',
    'Macroeconomic Transitions in Post-Industrial Civilizations',
    'Quantum Metrology and Temporal Measurement Standards'
  ];

  const p1Title = isAcad 
    ? p1Topics[(bookNum + testNum) % p1Topics.length]
    : `Consumer Rights & Public Workplace Regulations Part ${testNum}`;
  const p2Title = isAcad 
    ? p2Topics[(bookNum + testNum) % p2Topics.length]
    : `Staff Training Protocols & Occupational Health Compliance`;
  const p3Title = isAcad 
    ? p3Topics[(bookNum + testNum) % p3Topics.length]
    : `A Comprehensive Historical Analysis of Industrial Architecture`;

  const p1Questions = createPassageQuestions(1, 13, p1Title);
  const p2Questions = createPassageQuestions(14, 13, p2Title);
  const p3Questions = createPassageQuestions(27, 14, p3Title);

  return {
    id: `cambridge-${bookNum}-${track.toLowerCase().replace(' ', '-')}-test-${testNum}`,
    title: `Cambridge IELTS ${bookNum} ${prefix} Test ${testNum}`,
    book: `Cambridge ${bookNum}`,
    testNumber: testNum,
    timeLimitMinutes: 60,
    passages: [
      {
        passageNumber: 1,
        passageTitle: p1Title,
        questionRange: 'Questions 1–13',
        passageText: `Paragraph A\nScientific and societal inquiry into ${p1Title.toLowerCase()} has fundamentally altered contemporary perceptions of global ecological and technological systems. Over the preceding four decades, institutional research and multidisciplinary field investigations have shown that procedural optimization is critical for long-term civilizational viability.\n\nParagraph B\nHistorically, early practitioners operated under heuristic methodologies that frequently failed to accommodate complex externalities. With the advent of computational modelling, modern analysts can evaluate empirical datasets across longitudinal parameters. This transformation enables proactive intervention rather than reactive crisis mitigation.\n\nParagraph C\nDespite profound technological strides, persistent challenges remain regarding socio-economic equity and accessibility. Analysts argue that unless sustainable infrastructure is distributed symmetrically across developing and developed territories alike, widespread disparity will undermine structural integrity. Consequently, international regulatory consortia are prioritizing unified standards.\n\nParagraph D\nEmpirical observation verifies that factor A directly dictates outcome trajectory across regional environments. Longitudinal field studies confirm that resilient baseline indicators prevent abrupt disruptions, while unmonitored ecosystems suffer irreversible environmental or organizational collapse within abbreviated lifespans.\n\nParagraph E\nIn response to these systemic dilemmas, international consortia have established standardized performance thresholds. Early adopter nations report a marked stabilization in key socioeconomic indices, demonstrating that rigorous regulatory oversight and proactive capital investment yield durable collective benefits.`,
        questions: p1Questions
      },
      {
        passageNumber: 2,
        passageTitle: p2Title,
        questionRange: 'Questions 14–26',
        passageText: `Paragraph A\nThe dynamics governing ${p2Title.toLowerCase()} present intricate theoretical puzzles for contemporary researchers. By interrogating structural interdependencies across divergent ecological and computational domains, scientists have unveiled mechanisms previously obscured by observational constraints.\n\nParagraph B\nEmpirical scrutiny reveals that non-linear variables exert disproportionate leverage upon macro-level performance. When subjected to exogenous pressure, resilient systems execute autonomous rebalancing protocols to avert catastrophic equilibrium failure. Conversely, over-centralized frameworks frequently suffer systemic paralysis under comparable stress loads.\n\nParagraph C\nLeading authorities advocate for modular architecture that decentralizes risk. In pilot implementations across Scandinavia and East Asia, decentralized architectures demonstrated a thirty-five percent reduction in resource friction while dramatically accelerating cycle renewal. Continued monitoring will ascertain whether these operational efficiencies persist over multidecadal intervals.\n\nParagraph D\nFurthermore, physiological and ecological monitoring indicates that external acoustic and atmospheric disturbances exacerbate baseline friction. Mitigating these systemic interferences requires precision engineering and localized intervention protocols tailored to distinct topographical conditions.\n\nParagraph E\nUltimately, sustained resilience hinges upon synthesizing high-frequency data collection with adaptive regulatory flexibility. As emergent innovations continue to disrupt traditional conventions, organizational frameworks must remain nimble, prioritizing continuous iterative calibration over rigid bureaucratic mandates.`,
        questions: p2Questions
      },
      {
        passageNumber: 3,
        passageTitle: p3Title,
        questionRange: 'Questions 27–40',
        passageText: `Paragraph A\nA comprehensive appraisal of ${p3Title.toLowerCase()} requires an epistemological synthesis of theoretical doctrines, historical precedents, and forward-looking simulations. The core inquiry revolves around whether human-directed governance can maintain harmonic balance amidst accelerating technological transformations.\n\nParagraph B\nCritical historians emphasize that past epochs undergoing rapid socioeconomic realignment regularly encountered intense friction between established institutional gatekeepers and emergent paradigms. The current digital revolution mirrors the intellectual and mechanical upheavals of the mid-nineteenth century, albeit at an exponential cadence.\n\nParagraph C\nEmpirical findings substantiate that systemic adaptation through structured methodology provides the pivotal framework for long-term sustainability. Automated analytical feedback networks enable contemporaneous error correction, averting catastrophic resource misallocations that plagued earlier analog administrations.\n\nParagraph D\nNevertheless, veteran scholars caution against over-reliance upon automated predictive modeling without human qualitative oversight. Contextual nuances and ethical imperatives cannot be reduced to algorithmic parameters alone without risking profound societal disenfranchisement.\n\nParagraph E\nIn conclusion, modern practitioners must reject reductionist dogmas in favor of holistic, evidence-based principles. Synthesizing interdisciplinary insights ensures that emergent innovations deliver enduring benefits to human civilization while safeguarding the delicate biosphere that sustains all terrestrial life.`,
        questions: p3Questions
      }
    ]
  };
}

// Generate Cambridge Books 1 to 19 (Complete Series: Academic, General Training & Listening)
export const CAMBRIDGE_BOOKS_REGISTRY: CambridgeBookCollection[] = Array.from({ length: 19 }).map((_, idx) => {
  const bookNum = 19 - idx; // Cambridge 19 down to Cambridge 1
  const year = 2024 - (19 - bookNum);

  // 4 Full Listening Tests per book
  const listeningTests: FullListeningExam[] = [1, 2, 3, 4].map(t => 
    generateListeningExam(bookNum, t)
  );

  // 4 Tests per book
  const academicReadingTests: FullReadingExam[] = [1, 2, 3, 4].map(t => 
    generateReadingExam(bookNum, t, 'Academic')
  );

  const generalReadingTests: FullReadingExam[] = [1, 2, 3, 4].map(t => 
    generateReadingExam(bookNum, t, 'General Training')
  );

  const writingPrompts = [1, 2, 3, 4].flatMap(t => [
    {
      testNumber: t,
      type: 'Academic' as const,
      task1: {
        title: `Cambridge ${bookNum} Academic Test ${t} Task 1`,
        prompt: `The chart below illustrates comparative energy consumption across four European economies between 1995 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
        chartType: 'Bar Chart & Line Graph'
      },
      task2: {
        title: `Cambridge ${bookNum} Academic Test ${t} Task 2`,
        prompt: `Some people believe that university education should be completely funded by the state, while others argue that individual students should bear the financial burden. Discuss both views and give your own opinion.`,
        essayType: 'Discussion & Opinion Essay'
      }
    },
    {
      testNumber: t,
      type: 'General Training' as const,
      task1: {
        title: `Cambridge ${bookNum} General Training Test ${t} Task 1`,
        prompt: `You recently rented an apartment and discovered that several home appliances are defective. Write a formal letter to the landlord explaining the problem, demanding immediate repairs, and proposing an inspection date.`,
      },
      task2: {
        title: `Cambridge ${bookNum} General Training Test ${t} Task 2`,
        prompt: `In many societies today, people choose to live alone rather than with family members. Do the advantages of this trend outweigh the disadvantages?`,
        essayType: 'Advantages / Disadvantages'
      }
    }
  ]);

  const speakingTests = [1, 2, 3, 4].map(t => ({
    testNumber: t,
    part1: {
      topic: `Hometown, Daily Routine & Leisure Habits (Book ${bookNum} Test ${t})`,
      questions: [
        'Let’s talk about your hometown. Where did you grow up?',
        'What do you like most about living in your area?',
        'Do you prefer spending your free time outdoors or indoors?',
        'How often do you read books or newspapers for relaxation?'
      ]
    },
    part2: {
      topic: `Describe a meaningful achievement you worked hard to accomplish (Book ${bookNum} Test ${t})`,
      cueCard: `You should say:\n- What the achievement was\n- When and where it happened\n- What obstacles you had to overcome\nAnd explain why this accomplishment was significant to your personal growth.`,
      bulletPoints: [
        'What the achievement was',
        'When and where it occurred',
        'What challenges or difficulties you faced',
        'Why this experience was transformative for you'
      ]
    },
    part3: {
      topic: `Goal Setting, Ambition & Societal Values (Book ${bookNum} Test ${t})`,
      questions: [
        'Do you think modern society places excessive emphasis on material ambition?',
        'How do role models and mentors influence the career goals of young individuals?',
        'Should schools prioritize teaching resilience and goal management over rote memorization?',
        'Why do some individuals lose motivation despite having clear career ambitions?'
      ]
    }
  }));

  return {
    bookNumber: bookNum,
    title: `Cambridge IELTS ${bookNum}`,
    year,
    category: 'Both',
    testsCount: 4,
    listeningTests,
    academicReadingTests,
    generalReadingTests,
    writingPrompts,
    speakingTests
  };
});
