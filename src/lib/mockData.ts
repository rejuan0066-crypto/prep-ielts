import { ReadingTest, WordDefinition } from './types';

export const DICTIONARY_DATABASE: Record<string, WordDefinition> = {
  phenomenon: {
    word: 'phenomenon',
    phonetic: '/fəˈnɒm.ɪ.nən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'প্রাকৃতিক বা লক্ষ্যণীয় ঘটনা / বিস্ময়কর ব্যাপার',
    englishDefinition: 'A fact or situation that is observed to exist or happen, especially one whose cause is in question.',
    synonyms: ['occurrence', 'event', 'marvel', 'wonder'],
    exampleSentence: 'Global warming is a complex phenomenon that affects weather worldwide.',
  },
  biodiversity: {
    word: 'biodiversity',
    phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'জীববৈচিত্র্য (একটি অঞ্চলে বিভিন্ন প্রকার প্রাণীর সহাবস্থান)',
    englishDefinition: 'The variety of plant and animal life in the world or in a particular habitat.',
    synonyms: ['ecological diversity', 'nature', 'biological variety'],
    exampleSentence: 'The Amazon rainforest is renowned for its incredible biodiversity.',
  },
  deterioration: {
    word: 'deterioration',
    phonetic: '/dɪˌtɪə.ri.əˈreɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'অবনতি / অবস্থার ক্রমাগত খারাপ হওয়া',
    englishDefinition: 'The process of becoming progressively worse.',
    synonyms: ['decline', 'decay', 'degradation'],
    exampleSentence: 'Air pollution causes rapid deterioration in historic stone monuments.',
  },
  substantial: {
    word: 'substantial',
    phonetic: '/səbˈstæn.ʃəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'উল্লেখযোগ্য পরিমাণ / প্রচুর',
    englishDefinition: 'Of considerable importance, size, or worth.',
    synonyms: ['significant', 'considerable', 'sizable', 'extensive'],
    exampleSentence: 'There was a substantial increase in public transit usage last year.',
  },
  accelerate: {
    word: 'accelerate',
    phonetic: '/əkˈsel.ə.reɪt/',
    partOfSpeech: 'verb',
    banglaMeaning: 'গতি বৃদ্ধি করা / ত্বরান্বিত করা',
    englishDefinition: 'To begin to move more quickly or happen sooner.',
    synonyms: ['quicken', 'hasten', 'expedite', 'speed up'],
    exampleSentence: 'Technological innovations continue to accelerate global communications.',
  },
  comprehensive: {
    word: 'comprehensive',
    phonetic: '/ˌkɒm.prɪˈhen.sɪv/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বিস্তৃত / সামগ্রিক / সব বিষয় অন্তর্ভুক্ত এমন',
    englishDefinition: 'Including or dealing with all or nearly all elements or aspects of something.',
    synonyms: ['thorough', 'exhaustive', 'all-inclusive', 'complete'],
    exampleSentence: 'The committee published a comprehensive report on urban emissions.',
  },
  indigenous: {
    word: 'indigenous',
    phonetic: '/ɪnˈdɪdʒ.ɪ.nəs/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'আদিবাসী / স্থানীয় / স্বদেশজাত',
    englishDefinition: 'Originating or occurring naturally in a particular place; native.',
    synonyms: ['native', 'aboriginal', 'endemic', 'local'],
    exampleSentence: 'The sanctuary protects indigenous bird species from extinction.',
  },
  mitigate: {
    word: 'mitigate',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    partOfSpeech: 'verb',
    banglaMeaning: 'তীব্রতা কমানো / উপশম করা / প্রশমিত করা',
    englishDefinition: 'To make something less severe, serious, or painful.',
    synonyms: ['alleviate', 'reduce', 'diminish', 'lessen'],
    exampleSentence: 'Planting trees helps mitigate the urban heat island effect.',
  },
  echolocation: {
    word: 'echolocation',
    phonetic: '/ˌek.əʊ.ləʊˈkeɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'শব্দতরঙ্গের প্রতিধ্বনি দিয়ে অবস্থান নির্ণয় করা',
    englishDefinition: 'The location of objects by reflected sound, in particular that used by animals such as dolphins and bats.',
    synonyms: ['biosonar', 'acoustic navigation', 'sonar tracking'],
    exampleSentence: 'Dolphins rely on high-frequency echolocation to navigate murky coastal waters.',
  },
  anthropogenic: {
    word: 'anthropogenic',
    phonetic: '/ˌæn.θrə.pəˈdʒen.ɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'মানুষের ক্রিয়াকলাপ বা হস্তক্ষেপ দ্বারা সৃষ্ট',
    englishDefinition: 'Chiefly of environmental pollution and pollutants originating in human activity.',
    synonyms: ['human-induced', 'man-made', 'artificial'],
    exampleSentence: 'Anthropogenic ocean noise severely disrupts cetacean mating and foraging calls.',
  },
  stratigraphy: {
    word: 'stratigraphy',
    phonetic: '/strəˈtɪɡ.rə.fi/',
    partOfSpeech: 'noun',
    banglaMeaning: 'মাটি ও পাথরের ভূতাত্ত্বিক স্তরবিন্যাস বিদ্যা',
    englishDefinition: 'The branch of geology concerned with the order and relative position of strata and their relationship to the geological time scale.',
    synonyms: ['geological layering', 'sedimentation analysis'],
    exampleSentence: 'Artificial intelligence decodes archaeological stratigraphy from subterranean LiDAR scans.',
  }
};

export const CAMBRIDGE_READING_TESTS: ReadingTest[] = [
  {
    id: 'cambridge-18-test-1',
    title: 'Cambridge IELTS 18 - Academic Reading Test 1',
    passageTitle: 'The Urban Green Space Revolution',
    timeLimitMinutes: 20,
    passageText: `As world populations continue to concentrate in metropolitan areas, urban planners face substantial challenges in maintaining the wellbeing of city inhabitants. Over the past three decades, research has demonstrated that access to green spaces is not merely an aesthetic preference but a vital component of public health and psychological equilibrium.

In response to rapid urban deterioration, many European and Asian capitals have begun converting abandoned industrial sites into public parks. A prominent phenomenon in modern architecture is the concept of biophilic design, which incorporates indigenous plants and natural water features into skyscraper facades and public transport hubs.

Scientists note that urban greenery serves to mitigate high temperature spikes caused by concrete heat absorption—a problem known as the Urban Heat Island effect. Furthermore, city vegetation filters airborne particulate matter, thereby accelerating air purification in high-traffic corridors.

Despite these evident benefits, critics argue that the creation of premium green zones frequently triggers ecological gentrification. Low-income residents may face rising property taxes and rent, eventually forcing them to relocate away from newly revitalized neighborhoods. To create a truly comprehensive urban environment, municipal governments must ensure that sustainable parks are distributed equitably across all socioeconomic districts, rather than concentrated solely in wealthy commercial centers.`,
    questions: [
      {
        id: 1,
        type: 'true-false-not-given',
        question: 'Access to urban green spaces is recognized primarily as an aesthetic luxury rather than a public health necessity.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'প্যাসেজে পরিষ্কার বলা হয়েছে: "access to green spaces is not merely an aesthetic preference but a vital component of public health" (এটি শুধু নান্দনিক পছন্দের বিষয় নয়, বরং জনস্বাস্থ্যের অপরিহার্য উপাদান)। তাই বক্তব্যটি FALSE।',
        passageQuote: 'access to green spaces is not merely an aesthetic preference but a vital component of public health'
      },
      {
        id: 2,
        type: 'true-false-not-given',
        question: 'Biophilic design exclusively utilizes non-native imported vegetation in building construction.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'প্যাসেজে বলা হয়েছে biophilic ডিজাইন "indigenous plants" (স্বদেশজাত/আদিবাসী গাছপালা) ব্যবহার করে, imported বা non-native নয়। তাই এটি FALSE।',
        passageQuote: 'which incorporates indigenous plants and natural water features'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'According to paragraph 3, how does urban greenery primarily combat the Urban Heat Island effect?',
        options: [
          'By reflecting sunlight back into the upper atmosphere',
          'By mitigating temperature spikes caused by concrete heat absorption',
          'By replacing all concrete sidewalks with timber tracks',
          'By eliminating vehicular emissions completely'
        ],
        correctAnswer: 'By mitigating temperature spikes caused by concrete heat absorption',
        explanation: 'প্যারাগ্রাফ ৩ এর ১ম লাইনেই লেখা আছে: "serves to mitigate high temperature spikes caused by concrete heat absorption".',
        passageQuote: 'serves to mitigate high temperature spikes caused by concrete heat absorption'
      },
      {
        id: 4,
        type: 'true-false-not-given',
        question: 'The United Nations has set a legal requirement for green spaces in all member state capitals.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'NOT GIVEN',
        explanation: 'প্যাসেজে কোথাও জাতিসংঘ (United Nations) বা এর কোনো আইনি বাধ্যবাধকতার কথা উল্লেখ করা হয়নি। তাই উত্তর NOT GIVEN।',
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the primary concern raised by critics regarding ecological gentrification?',
        options: [
          'Public parks require too much maintenance funding',
          'Indigenous birds damage city infrastructure',
          'Low-income residents are forced out by rising property costs',
          'Biophilic skyscrapers are structurally unsafe'
        ],
        correctAnswer: 'Low-income residents are forced out by rising property costs',
        explanation: '৪র্থ প্যারাগ্রাফে বলা হয়েছে: "Low-income residents may face rising property taxes and rent, eventually forcing them to relocate".',
        passageQuote: 'Low-income residents may face rising property taxes and rent, eventually forcing them to relocate'
      }
    ]
  },
  {
    id: 'cambridge-18-test-2',
    title: 'Cambridge IELTS 18 - Academic Reading Test 2',
    passageTitle: 'Cetacean Communication & Ocean Sonar Ecology',
    timeLimitMinutes: 20,
    passageText: `Cetaceans, comprising whales, dolphins, and porpoises, inhabit a three-dimensional aquatic realm where light penetrates only into shallow surface layers. Consequently, evolutionary adaptations have rendered audition their primary sensory modality for spatial orientation, hunting, and intricate social cohesion.

To navigate turbid or abyssal waters, odontocetes (toothed whales) produce rapid series of ultrasonic clicks through specialized nasal structures termed phonic lips. The acoustic energy propagates forward through the melon—a lipid-rich organ functioning as an acoustic lens—and reflects off surrounding prey and topological features. This biological echolocation confers extraordinary resolution, enabling a bottle-nosed dolphin to detect a golf-ball sized object over one hundred meters away.

However, modern marine ecosystems are subjected to profound acoustic pollution. Anthropogenic noise originating from commercial cargo shipping, naval active low-frequency sonar exercises, and offshore seismic airguns propagates thousands of kilometers across oceanic sound channels. Marine biologists have documented that chronic ambient noise masks critical vocalizations, induces acute stress responses, and frequently precipitates lethal mass stranding events along shallow coastlines.

Addressing this ecological crisis necessitates international maritime regulation. Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise, while alternative quiet propulsion designs offer feasible long-term solutions to safeguard vulnerable marine megafauna.`,
    questions: [
      {
        id: 1,
        type: 'true-false-not-given',
        question: 'Cetaceans rely primarily on exceptional visual acuity rather than hearing to navigate deep waters.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'প্যাসেজের ১ম প্যারাগ্রাফে বলা হয়েছে light penetrates only shallow layers, এবং evolutionary adaptations have rendered audition (শ্রবণশক্তি) their primary sensory modality, visual acuity (দৃষ্টিশক্তি) নয়।',
        passageQuote: 'evolutionary adaptations have rendered audition their primary sensory modality'
      },
      {
        id: 2,
        type: 'true-false-not-given',
        question: 'The melon organ in toothed whales acts as a biological acoustic lens to focus sound pulses.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: '২য় প্যারাগ্রাফে বলা হয়েছে: "through the melon—a lipid-rich organ functioning as an acoustic lens".',
        passageQuote: 'through the melon—a lipid-rich organ functioning as an acoustic lens'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which of the following is identified as a direct consequence of anthropogenic ocean noise on cetaceans?',
        options: [
          'A rapid increase in global dolphin populations',
          'Acoustic masking of communication and mass stranding occurrences',
          'Complete blindness in juvenile whale calves',
          'Loss of dorsal fins due to ultrasonic vibration'
        ],
        correctAnswer: 'Acoustic masking of communication and mass stranding occurrences',
        explanation: 'প্যারাগ্রাফ ৩ অনুযায়ী: "masks critical vocalizations, induces acute stress responses, and frequently precipitates lethal mass stranding events".',
        passageQuote: 'chronic ambient noise masks critical vocalizations, induces acute stress responses, and frequently precipitates lethal mass stranding events'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What immediate mitigation measure is recommended to reduce container ship propeller noise?',
        options: [
          'Navigating only during nighttime hours',
          'Reducing vessel cruising velocity by approximately two knots',
          'Painting ship hulls with acoustic absorbing foam',
          'Switching exclusively to nuclear-powered engines'
        ],
        correctAnswer: 'Reducing vessel cruising velocity by approximately two knots',
        explanation: 'শেষ প্যারাগ্রাফে বলা হয়েছে: "Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise".',
        passageQuote: 'Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise'
      }
    ]
  },
  {
    id: 'cambridge-17-test-1',
    title: 'Cambridge IELTS 17 - Academic Reading Test 1',
    passageTitle: 'Artificial Intelligence in Archaeological Excavations',
    timeLimitMinutes: 20,
    passageText: `For centuries, the discipline of archaeology relied primarily on meticulous manual excavation, rudimentary hand tools, and serendipitous discoveries. However, the contemporary digital epoch has inaugurated an unprecedented synthesis between classical field antiquities and cutting-edge artificial intelligence.

Equipped with aerial LiDAR (Light Detection and Ranging) arrays mounted on autonomous drones, researchers can penetrate dense jungle canopies across Mesoamerica and Southeast Asia. The resultant three-dimensional point clouds capture minute topographical anomalies indistinguishable to the naked eye. Advanced deep learning neural networks, trained on known architectural typologies, process these vast datasets in mere hours, identifying thousands of previously unmapped Mayan pyramids, canal irrigation networks, and defensive ramparts.

Moreover, machine learning algorithms are revolutionizing the decipherment of heavily damaged ancient inscriptions. Fragmented cuneiform clay tablets excavated in Mesopotamia frequently suffer from severe surface erosion and missing textual components. Predictive linguistic neural models, leveraging contextual probability matrices across thousands of digitized tablets, reconstruct missing cuneiform glyphs with unprecedented statistical precision.

Nonetheless, veteran archaeologists caution against excessive reliance on automated predictive modeling. AI cannot substitute for hands-on stratigraphic validation, and algorithmic biases can perpetuate erroneous historical interpretations if training datasets represent only narrow geographic or cultural corpuses.`,
    questions: [
      {
        id: 1,
        type: 'true-false-not-given',
        question: 'Aerial LiDAR systems are incapable of penetrating thick jungle foliage.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'প্যারাগ্রাফ ২ এ বলা হয়েছে LiDAR arrays "can penetrate dense jungle canopies" (ঘন জঙ্গলের ছাউনি ভেদ করতে পারে)। তাই বক্তব্যটি FALSE।',
        passageQuote: 'researchers can penetrate dense jungle canopies across Mesoamerica'
      },
      {
        id: 2,
        type: 'true-false-not-given',
        question: 'Deep learning models reconstructed ancient Mayan irrigation canals from LiDAR point clouds.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: 'প্যারাগ্রাফ ২ এ উল্লেখ আছে: "identifying thousands of previously unmapped Mayan pyramids, canal irrigation networks, and defensive ramparts".',
        passageQuote: 'identifying thousands of previously unmapped Mayan pyramids, canal irrigation networks'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Why do predictive linguistic models successfully reconstruct missing Mesopotamian cuneiform glyphs?',
        options: [
          'Because all clay tablets are identical in size and script',
          'Because they apply statistical probability matrices across thousands of digitized tablets',
          'Because archaeologists have translated all ancient languages fully',
          'Because cuneiform tablets were manufactured with digital watermarks'
        ],
        correctAnswer: 'Because they apply statistical probability matrices across thousands of digitized tablets',
        explanation: 'প্যারাগ্রাফ ৩ অনুযায়ী: "leveraging contextual probability matrices across thousands of digitized tablets, reconstruct missing cuneiform glyphs".',
        passageQuote: 'leveraging contextual probability matrices across thousands of digitized tablets'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What caution do veteran researchers voice regarding automated artificial intelligence in archaeology?',
        options: [
          'Drones crash too frequently in tropical climates',
          'AI can introduce algorithmic bias and cannot replace stratigraphic field verification',
          'LiDAR equipment emits dangerous radiation to artifacts',
          'Ancient scripts are too modern for neural networks'
        ],
        correctAnswer: 'AI can introduce algorithmic bias and cannot replace stratigraphic field verification',
        explanation: 'শেষ প্যারাগ্রাফ অনুযায়ী: "AI cannot substitute for hands-on stratigraphic validation, and algorithmic biases can perpetuate erroneous historical interpretations".',
        passageQuote: 'AI cannot substitute for hands-on stratigraphic validation, and algorithmic biases can perpetuate erroneous historical interpretations'
      }
    ]
  }
];

export const SAMPLE_READING_TEST = CAMBRIDGE_READING_TESTS[0];

export const CAMBRIDGE_SPEAKING_TESTS = [
  {
    id: 'spk-1',
    cambridgeSet: 'Cambridge 18 Official Speaking Mock',
    part: 2,
    topicTitle: 'Travel & Memorable Excursions',
    topic: 'Describe a memorable journey you took with friends or family',
    part1Questions: [
      'What do you like most about your hometown?',
      'How has public transportation evolved in your city over recent years?',
      'Do you prefer embarking on long road trips or flying by plane?'
    ],
    cues: [
      'Where you went and with whom',
      'What mode of transport you used',
      'What memorable activities you did there',
      'And explain why this trip remains especially memorable to you'
    ],
    part3Questions: [
      'Why has international travel grown exponentially over the past two decades?',
      'In what ways can governments mitigate the negative cultural impacts of overtourism?',
      'Do you believe virtual reality will ever replace real physical travel?'
    ]
  },
  {
    id: 'spk-2',
    cambridgeSet: 'Cambridge 17 Official Speaking Mock',
    part: 2,
    topicTitle: 'Technology & Problem Solving',
    topic: 'Describe a challenging technical problem you had to solve independently',
    part1Questions: [
      'How much time do you spend using digital devices on an average weekday?',
      'What electronic gadgets do you find indispensable for your daily study or work?',
      'Did you learn computer skills at school or through independent practice?'
    ],
    cues: [
      'What the problem was and what device or software was involved',
      'When this occurrence took place',
      'How you researched or implemented the solution',
      'And explain how you felt once the dilemma was resolved'
    ],
    part3Questions: [
      'Are younger generations overly dependent on automated algorithms to solve basic daily tasks?',
      'How should elementary education balance digital device literacy and traditional pen-and-paper reasoning?',
      'What ethical guidelines should oversee autonomous artificial intelligence systems?'
    ]
  },
  {
    id: 'spk-3',
    cambridgeSet: 'Cambridge 16 Official Speaking Mock',
    part: 2,
    topicTitle: 'Mentorship & Education',
    topic: 'Describe an influential teacher or mentor who profoundly shaped your academic or personal trajectory',
    part1Questions: [
      'What subjects did you find most engaging during secondary school?',
      'Do you keep in touch with any of your former school instructors?',
      'What personality traits characterize an outstanding academic teacher?'
    ],
    cues: [
      'Who this person was and what subject or discipline they taught',
      'When and in what context you first encountered them',
      'What distinctive teaching methodologies or advice they imparted',
      'And explain how their guidance continues to influence your decisions today'
    ],
    part3Questions: [
      'Will generative AI tutoring ever render human classroom teachers obsolete?',
      'Why are educators in many nations remunerated less than corporate financial executives?',
      'How can educational curricula foster creative problem-solving alongside standardized exam preparation?'
    ]
  }
];

export const SAMPLE_SPEAKING_TOPIC = {
  part: 2,
  topic: 'Describe a memorable journey you took with friends or family',
  cuePoints: [
    'Where you went and with whom',
    'What mode of transport you used',
    'What memorable activities you did there',
    'And explain why this trip remains especially memorable to you'
  ],
  prepTimeSeconds: 60,
  talkTimeSeconds: 120
};

export const CAMBRIDGE_WRITING_PROMPTS = [
  {
    id: 'w-1',
    taskNumber: 2,
    category: 'Discussion & Opinion',
    title: 'University Education vs Practical Vocational Experience',
    promptText: 'Some people argue that tertiary university education provides the most reliable route to career prosperity, whereas others assert that entering the workforce directly after secondary school offers superior practical advantages. Discuss both viewpoints and articulate your personal perspective.',
    targetWordCount: 250,
    timeAllowedMinutes: 40
  },
  {
    id: 'w-2',
    taskNumber: 2,
    category: 'Problem & Solution',
    title: 'Urban Traffic Gridlock & Metropolitan Overcrowding',
    promptText: 'In numerous capital cities across the globe, acute traffic congestion and air pollution have reached critical thresholds. What are the principal causes of this urban deterioration, and what pragmatic measures can municipal authorities institute to remediate this crisis?',
    targetWordCount: 250,
    timeAllowedMinutes: 40
  },
  {
    id: 'w-3',
    taskNumber: 2,
    category: 'Advantages & Disadvantages',
    title: 'The Proliferation of Remote Telecommuting',
    promptText: 'In the post-pandemic global economy, an unprecedented proportion of corporate employees execute their professional responsibilities remotely from home rather than in traditional corporate offices. Do the advantages of this work paradigm outweigh its drawbacks?',
    targetWordCount: 250,
    timeAllowedMinutes: 40
  },
  {
    id: 'w-4',
    taskNumber: 1,
    category: 'Academic Chart / Graph',
    title: 'Renewable Power Generation Across Four Industrialized Economies (2010–2025)',
    promptText: 'The line graph illustrates the percentage share of national electricity generated via renewable photovoltaic and wind infrastructure across Germany, Denmark, Canada, and Australia between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    targetWordCount: 150,
    timeAllowedMinutes: 20
  }
];

export const SAMPLE_WRITING_PROMPT = CAMBRIDGE_WRITING_PROMPTS[0];
