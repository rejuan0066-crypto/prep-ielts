import { WordDefinition } from './types';

export const IELTS_VOCABULARY_DATABASE: Record<string, WordDefinition> = {
  // === 1. ENVIRONMENT, CLIMATE & ECOLOGY ===
  phenomenon: {
    word: 'phenomenon',
    phonetic: '/fəˈnɒm.ɪ.nən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'প্রাকৃতিক বা লক্ষ্যণীয় ঘটনা / বিস্ময়কর ব্যাপার',
    englishDefinition: 'A fact or situation that is observed to exist or happen, especially one whose cause is in question.',
    synonyms: ['occurrence', 'event', 'marvel', 'manifestation'],
    exampleSentence: 'Global warming is a complex phenomenon that affects weather worldwide.',
    category: 'Environment',
    bandLevel: 'Band 7.5',
    collocations: ['natural phenomenon', 'rare phenomenon', 'widespread phenomenon'],
    antonyms: ['regularity', 'normality']
  },
  biodiversity: {
    word: 'biodiversity',
    phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'জীববৈচিত্র্য (একটি অঞ্চলে বিভিন্ন প্রকার প্রাণীর সহাবস্থান)',
    englishDefinition: 'The variety of plant and animal life in the world or in a particular habitat.',
    synonyms: ['ecological diversity', 'biological variety', 'natural flora and fauna'],
    exampleSentence: 'The Amazon rainforest is renowned for its incredible biodiversity.',
    category: 'Environment',
    bandLevel: 'Band 8.0',
    collocations: ['preserve biodiversity', 'loss of biodiversity', 'threaten biodiversity']
  },
  deterioration: {
    word: 'deterioration',
    phonetic: '/dɪˌtɪə.ri.əˈreɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'অবনতি / অবস্থার ক্রমাগত খারাপ হওয়া',
    englishDefinition: 'The process of becoming progressively worse in quality or condition.',
    synonyms: ['decline', 'decay', 'degradation', 'degeneration'],
    exampleSentence: 'Air pollution causes rapid deterioration in historic stone monuments.',
    category: 'Environment',
    bandLevel: 'Band 7.5',
    collocations: ['environmental deterioration', 'rapid deterioration', 'prevent deterioration'],
    antonyms: ['improvement', 'enhancement']
  },
  mitigate: {
    word: 'mitigate',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    partOfSpeech: 'verb',
    banglaMeaning: 'তীব্রতা কমানো / উপশম করা / প্রশমিত করা',
    englishDefinition: 'To make something less severe, serious, or painful.',
    synonyms: ['alleviate', 'reduce', 'diminish', 'assuage'],
    exampleSentence: 'Planting trees helps mitigate the urban heat island effect.',
    category: 'Environment',
    bandLevel: 'Band 8.5',
    collocations: ['mitigate the effects', 'mitigate climate risks', 'mitigate damage'],
    antonyms: ['exacerbate', 'aggravate', 'intensify']
  },
  indigenous: {
    word: 'indigenous',
    phonetic: '/ɪnˈdɪdʒ.ɪ.nəs/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'আদিবাসী / স্থানীয় / স্বদেশজাত উদ্ভিদ বা প্রাণী',
    englishDefinition: 'Originating or occurring naturally in a particular place; native.',
    synonyms: ['native', 'aboriginal', 'endemic', 'local'],
    exampleSentence: 'The sanctuary protects indigenous bird species from extinction.',
    category: 'Environment',
    bandLevel: 'Band 7.5',
    collocations: ['indigenous communities', 'indigenous flora', 'indigenous culture'],
    antonyms: ['exotic', 'introduced', 'foreign']
  },
  anthropogenic: {
    word: 'anthropogenic',
    phonetic: '/ˌæn.θrə.pəˈdʒen.ɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'মানুষের ক্রিয়াকলাপ বা হস্তক্ষেপ দ্বারা সৃষ্ট পরিবেশগত ক্ষতি',
    englishDefinition: 'Originating in human activity, especially in environmental science contexts.',
    synonyms: ['human-induced', 'man-made', 'artificial'],
    exampleSentence: 'Anthropogenic ocean noise severely disrupts marine mammal navigation.',
    category: 'Environment',
    bandLevel: 'Band 9.0',
    collocations: ['anthropogenic emissions', 'anthropogenic climate change']
  },
  deforestation: {
    word: 'deforestation',
    phonetic: '/diːˌfɒr.ɪˈsteɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'ব্যাপক হারে বন উজাড় বা বনভূমি ধ্বংসকরণ',
    englishDefinition: 'The clearing or thinning of forests by humans.',
    synonyms: ['forest clearance', 'logging', 'afforestation destruction'],
    exampleSentence: 'Uncontrolled deforestation threatens water catchment basins across southeast Asia.',
    category: 'Environment',
    bandLevel: 'Band 7.0',
    collocations: ['curb deforestation', 'rate of deforestation', 'illegal deforestation']
  },
  sustainability: {
    word: 'sustainability',
    phonetic: '/səˌsteɪ.nəˈbɪl.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'টেকসই ব্যবস্থা / পরিবেশের ক্ষতি না করে দীর্ঘমেয়াদী স্থিতিশীলতা',
    englishDefinition: 'The quality of being able to continue over a period of time without depleting resources.',
    synonyms: ['ecological balance', 'viability', 'endurance', 'conservation'],
    exampleSentence: 'The municipality promotes urban sustainability through circular waste recycling.',
    category: 'Environment',
    bandLevel: 'Band 7.5',
    collocations: ['environmental sustainability', 'long-term sustainability', 'achieve sustainability']
  },
  depletion: {
    word: 'depletion',
    phonetic: '/dɪˈpliː.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'নিঃশেষকরণ / কোনো সম্পদের বিপজ্জনক মাত্রায় হ্রাস পাওয়া',
    englishDefinition: 'Reduction in the number or quantity of something precious.',
    synonyms: ['exhaustion', 'consumption', 'drain', 'reduction'],
    exampleSentence: 'Overfishing has led to the drastic depletion of coastal tuna populations.',
    category: 'Environment',
    bandLevel: 'Band 8.0',
    collocations: ['ozone depletion', 'resource depletion', 'aquifer depletion'],
    antonyms: ['replenishment', 'restoration']
  },
  catastrophic: {
    word: 'catastrophic',
    phonetic: '/ˌkæt.əˈstrɒf.ɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বিপর্যয়কর / সর্বনাশা / ধ্বংসাত্মক',
    englishDefinition: 'Involving or causing sudden great damage or suffering.',
    synonyms: ['disastrous', 'calamitous', 'devastating', 'fatal'],
    exampleSentence: 'A failure to regulate reservoir dams could lead to catastrophic inundation.',
    category: 'Environment',
    bandLevel: 'Band 8.0',
    collocations: ['catastrophic consequences', 'catastrophic failure', 'catastrophic storm']
  },

  // === 2. TECHNOLOGY, COMPUTING & ARTIFICIAL INTELLIGENCE ===
  accelerate: {
    word: 'accelerate',
    phonetic: '/əkˈsel.ə.reɪt/',
    partOfSpeech: 'verb',
    banglaMeaning: 'গতি বৃদ্ধি করা / ত্বরান্বিত করা',
    englishDefinition: 'To begin to move more quickly or happen sooner.',
    synonyms: ['quicken', 'hasten', 'expedite', 'speed up'],
    exampleSentence: 'Technological innovations continue to accelerate global communications.',
    category: 'Technology',
    bandLevel: 'Band 7.0',
    collocations: ['accelerate progress', 'accelerate growth', 'accelerate adoption'],
    antonyms: ['decelerate', 'delay', 'retard']
  },
  automation: {
    word: 'automation',
    phonetic: '/ˌɔː.təˈmeɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'স্বয়ংক্রিয়করণ (মানুষের শ্রম ছাড়া যন্ত্র দ্বারা কাজ সম্পন্ন করা)',
    englishDefinition: 'The use of largely automatic equipment in a system of manufacturing or work.',
    synonyms: ['mechanization', 'computerization', 'industrial robotics'],
    exampleSentence: 'Widespread factory automation has shifted employment demand toward software control.',
    category: 'Technology',
    bandLevel: 'Band 7.5',
    collocations: ['workplace automation', 'embrace automation', 'automation displacing jobs']
  },
  ubiquitous: {
    word: 'ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'সর্বব্যাপী / সর্বত্র বিদ্যমান বা সহজে দেখা যায় এমন',
    englishDefinition: 'Present, appearing, or found everywhere simultaneously.',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'everywhere'],
    exampleSentence: 'Smartphones have become ubiquitous even in remote agrarian villages.',
    category: 'Technology',
    bandLevel: 'Band 8.5',
    collocations: ['ubiquitous presence', 'become ubiquitous', 'ubiquitous computing'],
    antonyms: ['rare', 'scarce', 'isolated']
  },
  algorithmic: {
    word: 'algorithmic',
    phonetic: '/ˌæl.ɡəˈrɪð.mɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'নির্দিষ্ট গাণিতিক নিয়ম বা অ্যালগরিদম ভিত্তিক',
    englishDefinition: 'Relating to or using a process or set of rules to be followed in calculations.',
    synonyms: ['computational', 'automated', 'rule-based', 'programmatic'],
    exampleSentence: 'Financial institutions rely heavily on algorithmic trading to mitigate human bias.',
    category: 'Technology',
    bandLevel: 'Band 8.0',
    collocations: ['algorithmic bias', 'algorithmic transparency', 'algorithmic recommendation']
  },
  revolutionary: {
    word: 'revolutionary',
    phonetic: '/ˌrev.əˈluː.ʃən.ər.i/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বিপ্লবী / আমূল পরিবর্তনকারী',
    englishDefinition: 'Involving or causing a complete or dramatic change in method or mindset.',
    synonyms: ['groundbreaking', 'innovative', 'transformative', 'pioneering'],
    exampleSentence: 'The invention of CRISPR genetic editing is a revolutionary milestone in medicine.',
    category: 'Technology',
    bandLevel: 'Band 7.5',
    collocations: ['revolutionary concept', 'revolutionary breakthrough', 'revolutionary technology']
  },
  obsolete: {
    word: 'obsolete',
    phonetic: '/ˈɒb.sə.liːt/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'অপ্রচলিত / সেকেলে / ব্যবহার অনুপযোগী',
    englishDefinition: 'No longer produced or used; out of date.',
    synonyms: ['antiquated', 'archaic', 'outdated', 'superseded'],
    exampleSentence: 'Analog television broadcasting became largely obsolete after digital satellite conversion.',
    category: 'Technology',
    bandLevel: 'Band 8.0',
    collocations: ['rendered obsolete', 'become obsolete', 'obsolete equipment'],
    antonyms: ['contemporary', 'cutting-edge', 'modern']
  },
  cybersecurity: {
    word: 'cybersecurity',
    phonetic: '/ˈsaɪ.bə.sɪˌkjʊə.rɪ.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'সাইবার নিরাপত্তা / ডিজিটাল ডেটা সুরক্ষার ব্যবস্থা',
    englishDefinition: 'The state of being protected against the criminal or unauthorized use of electronic data.',
    synonyms: ['data protection', 'digital security', 'network defense'],
    exampleSentence: 'Hospitals must prioritize cybersecurity to protect sensitive biometric records.',
    category: 'Technology',
    bandLevel: 'Band 7.5',
    collocations: ['cybersecurity breach', 'cybersecurity protocols', 'bolster cybersecurity']
  },
  breakthrough: {
    word: 'breakthrough',
    phonetic: '/ˈbreɪk.θruː/',
    partOfSpeech: 'noun',
    banglaMeaning: 'যুগান্তকারী আবিষ্কার বা নাটকীয় অগ্রগতি',
    englishDefinition: 'A sudden, dramatic, and important discovery or development.',
    synonyms: ['advancement', 'quantum leap', 'triumph', 'milestone'],
    exampleSentence: 'The clinical trial demonstrated a major breakthrough in solid oncology treatment.',
    category: 'Technology',
    bandLevel: 'Band 8.0',
    collocations: ['scientific breakthrough', 'major breakthrough', 'technological breakthrough']
  },

  // === 3. SOCIETY, URBANIZATION & CULTURE ===
  comprehensive: {
    word: 'comprehensive',
    phonetic: '/ˌkɒm.prɪˈhen.sɪv/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বিস্তৃত / সামগ্রিক / সব বিষয় অন্তর্ভুক্ত এমন',
    englishDefinition: 'Including or dealing with all or nearly all elements or aspects of something.',
    synonyms: ['thorough', 'exhaustive', 'all-inclusive', 'complete'],
    exampleSentence: 'The committee published a comprehensive report on urban transport integration.',
    category: 'Society',
    bandLevel: 'Band 7.5',
    collocations: ['comprehensive review', 'comprehensive strategy', 'comprehensive approach'],
    antonyms: ['incomplete', 'partial', 'selective']
  },
  substantial: {
    word: 'substantial',
    phonetic: '/səbˈstæn.ʃəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'উল্লেখযোগ্য পরিমাণ / প্রচুর / অর্থবহ',
    englishDefinition: 'Of considerable importance, size, or worth.',
    synonyms: ['significant', 'considerable', 'sizable', 'extensive'],
    exampleSentence: 'There was a substantial increase in public transit usage following the fare subsidy.',
    category: 'Society',
    bandLevel: 'Band 7.5',
    collocations: ['substantial investment', 'substantial contribution', 'substantial evidence'],
    antonyms: ['insignificant', 'negligible', 'nominal']
  },
  gentrification: {
    word: 'gentrification',
    phonetic: '/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'নগরে পুরনো আবাসিক এলাকা আধুনিকায়ন যার ফলে দরিদ্র জনগোষ্ঠী বাস্তুচ্যুত হয়',
    englishDefinition: 'The process of renovating deteriorated urban neighborhoods by influx of wealthier residents.',
    synonyms: ['urban renewal', 'urban remodeling', 'displacement rehousing'],
    exampleSentence: 'Rapid neighborhood gentrification priced out generational artisanal shopkeepers.',
    category: 'Society',
    bandLevel: 'Band 8.5',
    collocations: ['ecological gentrification', 'oppose gentrification', 'wave of gentrification']
  },
  demographic: {
    word: 'demographic',
    phonetic: '/ˌdem.əˈɡræf.ɪk/',
    partOfSpeech: 'noun',
    banglaMeaning: 'জনসংখ্যার কাঠামো বা বয়স-ভিত্তিক শ্রেণিবিভাগ',
    englishDefinition: 'A particular sector of a population relating to age, income, or other statistics.',
    synonyms: ['population sector', 'socioeconomic cohort', 'census profile'],
    exampleSentence: 'The 18-to-24 demographic represented the highest voter turnout in the referendum.',
    category: 'Society',
    bandLevel: 'Band 7.5',
    collocations: ['demographic shift', 'target demographic', 'aging demographic']
  },
  infrastructure: {
    word: 'infrastructure',
    phonetic: '/ˈɪn.frəˌstrʌk.tʃər/',
    partOfSpeech: 'noun',
    banglaMeaning: 'অবকাঠামো (রাস্তা, সেতু, বিদ্যুৎ, ইন্টারনেট ইত্যাদি মৌলিক ব্যবস্থা)',
    englishDefinition: 'The basic physical and organizational structures and facilities needed for the operation of a society.',
    synonyms: ['framework', 'public utilities', 'substructure', 'civic network'],
    exampleSentence: 'Substandard sewage infrastructure exacerbates epidemic waterborne diseases.',
    category: 'Society',
    bandLevel: 'Band 7.0',
    collocations: ['transport infrastructure', 'critical infrastructure', 'upgrade infrastructure']
  },
  marginalize: {
    word: 'marginalize',
    phonetic: '/ˈmɑː.dʒɪ.nəl.aɪz/',
    partOfSpeech: 'verb',
    banglaMeaning: 'প্রান্তিকীকরণ / কাউকে সুযোগ-সুবিধা থেকে বঞ্চিত করে একপাশে ঠেলে দেওয়া',
    englishDefinition: 'Treat (a person, group, or concept) as insignificant or peripheral.',
    synonyms: ['alienate', 'isolate', 'sideline', 'disenfranchise'],
    exampleSentence: 'Economic deregulation must not marginalize underprivileged rural communities.',
    category: 'Society',
    bandLevel: 'Band 8.5',
    collocations: ['marginalized communities', 'further marginalize', 'systematically marginalize'],
    antonyms: ['empower', 'integrate', 'include']
  },
  disparity: {
    word: 'disparity',
    phonetic: '/dɪˈspær.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'বৈষম্য / অসমতা / ব্যাপক পার্থক্য',
    englishDefinition: 'A great difference or inequality between groups or quantities.',
    synonyms: ['imbalance', 'inequality', 'incongruity', 'gap'],
    exampleSentence: 'Income disparity between urban executives and rural laborers has widened noticeably.',
    category: 'Society',
    bandLevel: 'Band 8.0',
    collocations: ['economic disparity', 'regional disparity', 'reduce disparity'],
    antonyms: ['parity', 'equality', 'equilibrium']
  },
  homogeneity: {
    word: 'homogeneity',
    phonetic: '/ˌhɒm.ə.dʒəˈniː.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'সমজাতীয়তা / সর্বত্র একই রকম স্বভাব বা চেহারার বৈশিষ্ট্য',
    englishDefinition: 'The quality or state of all parts being of the same or a similar kind.',
    synonyms: ['uniformity', 'similarity', 'consistency'],
    exampleSentence: 'Cultural globalization has sparked debates over the creeping homogeneity of pop media.',
    category: 'Society',
    bandLevel: 'Band 8.5',
    collocations: ['cultural homogeneity', 'social homogeneity'],
    antonyms: ['heterogeneity', 'diversity']
  },

  // === 4. EDUCATION, RESEARCH & COGNITION ===
  curriculum: {
    word: 'curriculum',
    phonetic: '/kəˈrɪk.jə.ləm/',
    partOfSpeech: 'noun',
    banglaMeaning: 'পাঠ্যক্রম / শিক্ষাক্রম',
    englishDefinition: 'The subjects comprising a course of study in a school or college.',
    synonyms: ['syllabus', 'academic program', 'coursework'],
    exampleSentence: 'The national secondary curriculum was reformed to emphasize critical analytical skills.',
    category: 'Education',
    bandLevel: 'Band 7.0',
    collocations: ['core curriculum', 'integrate into the curriculum', 'curriculum design']
  },
  pedagogical: {
    word: 'pedagogical',
    phonetic: '/ˌped.əˈɡɒdʒ.ɪ.kəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'শিক্ষাদান পদ্ধতি সংক্রান্ত / শিক্ষাবিষয়ক',
    englishDefinition: 'Relating to teaching or educational methods.',
    synonyms: ['educational', 'instructional', 'academic', 'didactic'],
    exampleSentence: 'Online learning platforms require novel pedagogical techniques to sustain attention.',
    category: 'Education',
    bandLevel: 'Band 8.5',
    collocations: ['pedagogical methods', 'pedagogical framework', 'pedagogical approach']
  },
  empirical: {
    word: 'empirical',
    phonetic: '/ɪmˈpɪr.ɪ.kəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বাস্তব পর্যবেক্ষণ বা পরীক্ষামূলক প্রমাণের ওপর নির্ভরশীল',
    englishDefinition: 'Based on, concerned with, or verifiable by observation or experience rather than pure logic.',
    synonyms: ['evidence-based', 'observational', 'factual', 'experimental'],
    exampleSentence: 'His doctoral thesis supported the hypothesis with rigorous empirical data.',
    category: 'Education',
    bandLevel: 'Band 8.5',
    collocations: ['empirical evidence', 'empirical research', 'empirical study'],
    antonyms: ['theoretical', 'hypothetical', 'conjectural']
  },
  cognitive: {
    word: 'cognitive',
    phonetic: '/ˈkɒɡ.nə.tɪv/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'জ্ঞানীয় / মানুষের চিন্তা, বোধশক্তি ও মস্তিষ্কের ধারণ সংক্রান্ত',
    englishDefinition: 'Relating to mental action or process of acquiring knowledge through thought and experience.',
    synonyms: ['mental', 'cerebral', 'intellectual', 'intellective'],
    exampleSentence: 'Learning multiple foreign languages delays cognitive decline in senior demographics.',
    category: 'Education',
    bandLevel: 'Band 8.0',
    collocations: ['cognitive development', 'cognitive abilities', 'cognitive overload']
  },
  paradigm: {
    word: 'paradigm',
    phonetic: '/ˈpær.ə.daɪm/',
    partOfSpeech: 'noun',
    banglaMeaning: 'একটি প্রতিষ্ঠিত চিন্তাভাবনা বা বৈজ্ঞানিক কাঠামোগত দৃষ্টিভঙ্গি',
    englishDefinition: 'A typical example, pattern, or model of something; a prevailing worldview in science.',
    synonyms: ['model', 'archetype', 'framework', 'prototype'],
    exampleSentence: 'The shift from mainframe computers to mobile devices constituted a paradigm shift in IT.',
    category: 'Education',
    bandLevel: 'Band 8.5',
    collocations: ['paradigm shift', 'dominant paradigm', 'new paradigm']
  },
  synthesize: {
    word: 'synthesize',
    phonetic: '/ˈsɪn.θə.saɪz/',
    partOfSpeech: 'verb',
    banglaMeaning: 'বিভিন্ন তথ্য বা তত্ত্ব একত্রিত করে নতুন ধারণা গঠন করা',
    englishDefinition: 'Combine a number of things into a coherent whole.',
    synonyms: ['integrate', 'consolidate', 'amalgamate', 'fuse'],
    exampleSentence: 'IELTS candidates must synthesize information from both bar graphs and pie charts.',
    category: 'Education',
    bandLevel: 'Band 8.0',
    collocations: ['synthesize data', 'synthesize findings', 'synthesize diverse theories'],
    antonyms: ['separate', 'disintegrate', 'dissect']
  },
  scrutinize: {
    word: 'scrutinize',
    phonetic: '/ˈskruː.tɪ.naɪz/',
    partOfSpeech: 'verb',
    banglaMeaning: 'খুঁটিয়ে পরীক্ষা করা / পুঙ্খানুপুঙ্খ পর্যবেক্ষণ করা',
    englishDefinition: 'Examine or inspect closely and thoroughly.',
    synonyms: ['examine', 'inspect', 'investigate', 'probe'],
    exampleSentence: 'Independent scientists scrutinized the lab methodology for statistical flaws.',
    category: 'Education',
    bandLevel: 'Band 8.0',
    collocations: ['closely scrutinize', 'scrutinize documents', 'scrutinize policy']
  },

  // === 5. ECONOMICS, BUSINESS & GLOBAL TRADE ===
  fiscal: {
    word: 'fiscal',
    phonetic: '/ˈfɪs.kəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'সরকারি রাজস্ব ও আয়-ব্যয় সংক্রান্ত / আর্থিক',
    englishDefinition: 'Relating to government revenue, especially taxes and budgetary spending.',
    synonyms: ['monetary', 'financial', 'budgetary', 'economic'],
    exampleSentence: 'The treasury enacted strict fiscal austerity measures to curb national debt.',
    category: 'Economy',
    bandLevel: 'Band 7.5',
    collocations: ['fiscal policy', 'fiscal deficit', 'fiscal year']
  },
  lucrative: {
    word: 'lucrative',
    phonetic: '/ˈluː.krə.tɪv/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'অত্যন্ত লাভজনক / প্রচুর অর্থ উপার্জনকারী',
    englishDefinition: 'Producing a great deal of profit.',
    synonyms: ['profitable', 'remunerative', 'cost-effective', 'gainful'],
    exampleSentence: 'Renewable patent licensing proved a highly lucrative venture for the university.',
    category: 'Economy',
    bandLevel: 'Band 8.0',
    collocations: ['lucrative career', 'lucrative contract', 'lucrative market'],
    antonyms: ['unprofitable', 'loss-making']
  },
  monopoly: {
    word: 'monopoly',
    phonetic: '/məˈnɒp.əl.i/',
    partOfSpeech: 'noun',
    banglaMeaning: 'একচেটিয়া আধিপত্য / কোনো বাজারের একমাত্র নিয়ন্ত্রণকারী অধিকার',
    englishDefinition: 'The exclusive possession or control of the supply of or trade in a commodity.',
    synonyms: ['sole ownership', 'hegemony', 'cartel control'],
    exampleSentence: 'Anti-trust watchdogs intervened to dismantle the telecommunication company\'s monopoly.',
    category: 'Economy',
    bandLevel: 'Band 7.5',
    collocations: ['hold a monopoly', 'break a monopoly', 'natural monopoly']
  },
  prosperity: {
    word: 'prosperity',
    phonetic: '/prɒsˈper.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'সমৃদ্ধি / অর্থনৈতিক প্রাচুর্য ও উন্নতি',
    englishDefinition: 'The state of flourishing, thriving, or being successful, especially financially.',
    synonyms: ['affluence', 'wealth', 'wellbeing', 'success'],
    exampleSentence: 'Political stability and transparent rule of law are paramount to national prosperity.',
    category: 'Economy',
    bandLevel: 'Band 7.5',
    collocations: ['economic prosperity', 'foster prosperity', 'shared prosperity'],
    antonyms: ['poverty', 'adversity', 'hardship']
  },
  fluctuation: {
    word: 'fluctuation',
    phonetic: '/ˌflʌk.tʃuˈeɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'উঠা-নামা / অস্থির পরিবর্তনশীলতা',
    englishDefinition: 'An irregular rising and falling in number or amount; a variation.',
    synonyms: ['oscillation', 'variation', 'instability', 'swing'],
    exampleSentence: 'Currency fluctuation complicates long-term import contracts for small businesses.',
    category: 'Economy',
    bandLevel: 'Band 7.5',
    collocations: ['wild fluctuations', 'price fluctuation', 'subject to fluctuation']
  },
  incentive: {
    word: 'incentive',
    phonetic: '/ɪnˈsen.tɪv/',
    partOfSpeech: 'noun',
    banglaMeaning: 'প্রণোদনা / উৎসাহব্যঞ্জক সুযোগ যা কাউকে কাজ করতে উদ্বুদ্ধ করে',
    englishDefinition: 'A thing that motivates or encourages someone to do something.',
    synonyms: ['inducement', 'motivation', 'catalyst', 'stimulus'],
    exampleSentence: 'Subsidized electric tariffs serve as an incentive for factories to adopt renewables.',
    category: 'Economy',
    bandLevel: 'Band 7.5',
    collocations: ['tax incentive', 'financial incentive', 'provide an incentive'],
    antonyms: ['disincentive', 'deterrent']
  },
  commodification: {
    word: 'commodification',
    phonetic: '/kəˌmɒd.ɪ.fɪˈkeɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'পণ্যায়ন / এমন কিছুকে বিক্রয়যোগ্য পণ্যে রূপান্তর করা যা পণ্য ছিল না (যেমন পানি বা শিক্ষা)',
    englishDefinition: 'The transformation of goods, services, ideas and people into commodities or objects of trade.',
    synonyms: ['commercialization', 'marketization'],
    exampleSentence: 'Critics argue against the creeping commodification of basic healthcare services.',
    category: 'Economy',
    bandLevel: 'Band 8.5',
    collocations: ['commodification of water', 'resist commodification']
  },

  // === 6. HEALTH, MEDICINE & PSYCHOLOGY ===
  sedentary: {
    word: 'sedentary',
    phonetic: '/ˈsed.ən.tər.i/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বসে বসে কাজ করার স্বভাব / শরীরচর্চাহীন অলস জীবনযাপন',
    englishDefinition: 'Tending to spend much time seated; somewhat inactive physically.',
    synonyms: ['inactive', 'desk-bound', 'stationary', 'torpid'],
    exampleSentence: 'A sedentary lifestyle is directly correlated with cardiovascular risk.',
    category: 'Health',
    bandLevel: 'Band 7.5',
    collocations: ['sedentary lifestyle', 'sedentary job', 'sedentary habits'],
    antonyms: ['active', 'athletic', 'dynamic']
  },
  epidemic: {
    word: 'epidemic',
    phonetic: '/ˌep.ɪˈdem.ɪk/',
    partOfSpeech: 'noun',
    banglaMeaning: 'মহামারী / কোনো রোগের আকস্মিক ও ব্যাপক বিস্তার',
    englishDefinition: 'A widespread occurrence of an infectious disease in a community at a particular time.',
    synonyms: ['outbreak', 'plague', 'surge', 'scourge'],
    exampleSentence: 'Early lockdown enforcement effectively halted the pathogen epidemic.',
    category: 'Health',
    bandLevel: 'Band 7.0',
    collocations: ['prevent an epidemic', 'reach epidemic proportions', 'obesity epidemic']
  },
  vulnerability: {
    word: 'vulnerability',
    phonetic: '/ˌvʌl.nər.əˈbɪl.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'ঝুঁকিপূর্ণ বা অরক্ষিত অবস্থা / সহজে আঘাতপ্রাপ্ত হওয়ার সম্ভাবনা',
    englishDefinition: 'The quality or state of being exposed to the possibility of being attacked or harmed.',
    synonyms: ['susceptibility', 'defenselessness', 'fragility', 'weakness'],
    exampleSentence: 'Malnutrition compounds biological vulnerability to infectious seasonal strains.',
    category: 'Health',
    bandLevel: 'Band 8.0',
    collocations: ['heightened vulnerability', 'economic vulnerability', 'reduce vulnerability'],
    antonyms: ['resilience', 'invulnerability', 'immunity']
  },
  chronic: {
    word: 'chronic',
    phonetic: '/ˈkrɒn.ɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'দীর্ঘস্থায়ী / বহুদিনের পুরনো রোগ বা সমস্যা',
    englishDefinition: 'Persisting for a long time or constantly recurring.',
    synonyms: ['persistent', 'long-standing', 'incurable', 'habitual'],
    exampleSentence: 'Inhalation of fine particulates leads to chronic obstructive pulmonary disorders.',
    category: 'Health',
    bandLevel: 'Band 7.5',
    collocations: ['chronic illness', 'chronic pain', 'chronic shortage'],
    antonyms: ['acute', 'temporary', 'transient']
  },
  therapeutic: {
    word: 'therapeutic',
    phonetic: '/ˌθer.əˈpjuː.tɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'রোগ নিরাময়কারী / নিরাময়মূলক',
    englishDefinition: 'Relating to the healing of disease or relaxation of stress.',
    synonyms: ['healing', 'curative', 'restorative', 'medicinal'],
    exampleSentence: 'Hydrotherapy provides significant therapeutic benefits for orthopedic patients.',
    category: 'Health',
    bandLevel: 'Band 8.0',
    collocations: ['therapeutic effect', 'therapeutic intervention', 'therapeutic value']
  },
  resilience: {
    word: 'resilience',
    phonetic: '/rɪˈzɪl.jəns/',
    partOfSpeech: 'noun',
    banglaMeaning: 'বিপর্যয় কাটিয়ে দ্রুত ঘুরে দাঁড়ানোর ক্ষমতা / স্থিতিস্থাপকতা',
    englishDefinition: 'The capacity to withstand or to recover quickly from difficulties; toughness.',
    synonyms: ['toughness', 'adaptability', 'fortitude', 'endurance'],
    exampleSentence: 'Psychological resilience allows students to overcome academic setbacks effectively.',
    category: 'Health',
    bandLevel: 'Band 8.0',
    collocations: ['build resilience', 'emotional resilience', 'climate resilience']
  },

  // === 7. GOVERNMENT, LAW & CRIME ===
  legislation: {
    word: 'legislation',
    phonetic: '/ˌledʒ.ɪˈsleɪ.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'আইন প্রণয়ন / সরকারি আইনসমূহ',
    englishDefinition: 'Laws, considered collectively; the process of making laws.',
    synonyms: ['laws', 'statutes', 'acts', 'legal framework'],
    exampleSentence: 'Strict environmental legislation holds industrial polluters criminally accountable.',
    category: 'Law',
    bandLevel: 'Band 7.0',
    collocations: ['pass legislation', 'introduce legislation', 'pending legislation']
  },
  deterrent: {
    word: 'deterrent',
    phonetic: '/dɪˈter.ənt/',
    partOfSpeech: 'noun',
    banglaMeaning: 'প্রতিবন্ধক বা নিরুৎসাহক ব্যবস্থা / অপরাধ রোধকারী সতর্কতা',
    englishDefinition: 'A thing that discourages or is intended to discourage someone from doing something.',
    synonyms: ['disincentive', 'restraint', 'curb', 'warning'],
    exampleSentence: 'High fines act as an effective deterrent against corporate tax evasion.',
    category: 'Law',
    bandLevel: 'Band 8.0',
    collocations: ['effective deterrent', 'act as a deterrent', 'nuclear deterrent'],
    antonyms: ['encouragement', 'incentive']
  },
  jurisdiction: {
    word: 'jurisdiction',
    phonetic: '/ˌdʒʊə.rɪsˈdɪk.ʃən/',
    partOfSpeech: 'noun',
    banglaMeaning: 'আইনগত কর্তৃত্ব বা বিচারসীমা / এক্তিয়ার',
    englishDefinition: 'The official power to make legal decisions and judgments over an area.',
    synonyms: ['authority', 'control', 'sovereignty', 'dominion'],
    exampleSentence: 'Maritime piracy committed in international waters falls outside national jurisdiction.',
    category: 'Law',
    bandLevel: 'Band 8.5',
    collocations: ['under the jurisdiction', 'within jurisdiction', 'fall outside jurisdiction']
  },
  punitive: {
    word: 'punitive',
    phonetic: '/ˈpjuː.nɪ.tɪv/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'শাস্তিমূলক / দণ্ডমূলক',
    englishDefinition: 'Inflicting or intended as punishment.',
    synonyms: ['disciplinary', 'penal', 'castigatory', 'retributive'],
    exampleSentence: 'The United Nations enforced punitive sanctions on the aggressor state.',
    category: 'Law',
    bandLevel: 'Band 8.0',
    collocations: ['punitive damages', 'punitive measures', 'punitive action']
  },
  compliance: {
    word: 'compliance',
    phonetic: '/kəmˈplaɪ.əns/',
    partOfSpeech: 'noun',
    banglaMeaning: 'আইন বা বিধিনিষেধ মেনে চলা / মান্যতা',
    englishDefinition: 'The action or fact of complying with a wish, command, or standard.',
    synonyms: ['conformity', 'adherence', 'obedience', 'accordance'],
    exampleSentence: 'All chemical processors must demonstrate strict compliance with safety norms.',
    category: 'Law',
    bandLevel: 'Band 7.5',
    collocations: ['in compliance with', 'ensure compliance', 'regulatory compliance'],
    antonyms: ['defiance', 'violation', 'non-compliance']
  },
  accountability: {
    word: 'accountability',
    phonetic: '/əˌkaʊn.təˈbɪl.ə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'জবাবদিহিতা / নিজের কাজের দায় স্বীকার করার দায়বদ্ধতা',
    englishDefinition: 'The fact or condition of being accountable; responsibility.',
    synonyms: ['responsibility', 'answerability', 'liability'],
    exampleSentence: 'Democratic governance requires institutional transparency and public accountability.',
    category: 'Law',
    bandLevel: 'Band 7.5',
    collocations: ['hold someone to accountability', 'lack of accountability', 'promote accountability']
  },

  // === 8. ADVANCED ACADEMIC DISCOURSE & ESSAY WRITING ===
  unequivocal: {
    word: 'unequivocal',
    phonetic: '/ˌʌn.ɪˈkwɪv.ə.kəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'স্পষ্ট / দ্ব্যর্থহীন / কোনো সন্দেহের অবকাশ নেই এমন',
    englishDefinition: 'Leaving no doubt; unambiguous.',
    synonyms: ['unambiguous', 'indisputable', 'unmistakable', 'explicit'],
    exampleSentence: 'The Intergovernmental Panel presented unequivocal evidence of rising sea levels.',
    category: 'Academic',
    bandLevel: 'Band 9.0',
    collocations: ['unequivocal evidence', 'unequivocal support', 'unequivocal statement'],
    antonyms: ['ambiguous', 'equivocal', 'vague']
  },
  exacerbate: {
    word: 'exacerbate',
    phonetic: '/ɪɡˈzæs.ə.beɪt/',
    partOfSpeech: 'verb',
    banglaMeaning: 'পরিস্থিতি আরও খারাপ করা / কোনো সমস্যাকে বাড়িয়ে তোলা',
    englishDefinition: 'Make a problem, bad situation, or negative feeling worse.',
    synonyms: ['aggravate', 'worsen', 'inflame', 'compound'],
    exampleSentence: 'Uncontrolled real estate speculation will exacerbate the affordable housing deficit.',
    category: 'Academic',
    bandLevel: 'Band 8.5',
    collocations: ['exacerbate the problem', 'exacerbate tensions', 'further exacerbate'],
    antonyms: ['mitigate', 'alleviate', 'soothe']
  },
  pragmatic: {
    word: 'pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বাস্তবধর্মী / তত্ত্ব বাদ দিয়ে বাস্তবসম্মত সমাধানের অনুসারী',
    englishDefinition: 'Dealing with things sensibly and realistically in a way based on practical rather than theoretical considerations.',
    synonyms: ['practical', 'sensible', 'utilitarian', 'realistic'],
    exampleSentence: 'Urban engineers must adopt a pragmatic approach to flood defense zoning.',
    category: 'Academic',
    bandLevel: 'Band 8.0',
    collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic compromise'],
    antonyms: ['idealistic', 'impractical', 'utopian']
  },
  feasible: {
    word: 'feasible',
    phonetic: '/ˈfiː.zə.bəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বাস্তবায়নযোগ্য / যা সম্ভবপর ও ফলপ্রসূ',
    englishDefinition: 'Possible to do easily or conveniently.',
    synonyms: ['practicable', 'viable', 'achievable', 'workable'],
    exampleSentence: 'The study concluded that a 100% solar microgrid was economically feasible for the island.',
    category: 'Academic',
    bandLevel: 'Band 7.5',
    collocations: ['economically feasible', 'technically feasible', 'feasible alternative'],
    antonyms: ['infeasible', 'impossible', 'unworkable']
  },
  catalyst: {
    word: 'catalyst',
    phonetic: '/ˈkæt.əl.ɪst/',
    partOfSpeech: 'noun',
    banglaMeaning: 'অনুঘটক / যা কোনো পরিবর্তন বা প্রক্রিয়াকে দ্রুততর করে',
    englishDefinition: 'A person or thing that precipitates an event or change.',
    synonyms: ['spark', 'stimulus', 'impetus', 'driving force'],
    exampleSentence: 'The construction of the high-speed railway served as a catalyst for regional trade.',
    category: 'Academic',
    bandLevel: 'Band 8.0',
    collocations: ['act as a catalyst', 'catalyst for change', 'catalyst for growth']
  },
  plausible: {
    word: 'plausible',
    phonetic: '/ˈplɔː.zə.bəl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'বিশ্বাসযোগ্য / যুক্তিযুক্ত ও সম্ভাব্য',
    englishDefinition: 'Seeming reasonable or probable.',
    synonyms: ['credible', 'believable', 'reasonable', 'tenable'],
    exampleSentence: 'The forensic investigator offered a plausible explanation for the sudden power grid failure.',
    category: 'Academic',
    bandLevel: 'Band 8.0',
    collocations: ['plausible explanation', 'plausible scenario', 'perfectly plausible'],
    antonyms: ['implausible', 'unbelievable', 'far-fetched']
  },
  inadvertent: {
    word: 'inadvertent',
    phonetic: '/ˌɪn.ədˈvɜː.tənt/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'অনিচ্ছাকৃত / অসাবধানতাবশত ঘটে যাওয়া',
    englishDefinition: 'Not resulting from or achieved through deliberate planning.',
    synonyms: ['unintentional', 'accidental', 'unintended', 'unwitting'],
    exampleSentence: 'The leak was an inadvertent error caused by outdated server firewall settings.',
    category: 'Academic',
    bandLevel: 'Band 8.5',
    collocations: ['inadvertent mistake', 'inadvertent omission'],
    antonyms: ['deliberate', 'intentional', 'willful']
  },
  detrimental: {
    word: 'detrimental',
    phonetic: '/ˌdet.rɪˈmen.təl/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'ক্ষতিকর / অনিষ্টকারী',
    englishDefinition: 'Tending to cause harm.',
    synonyms: ['harmful', 'damaging', 'injurious', 'deleterious'],
    exampleSentence: 'Excessive reliance on ultra-processed foods is detrimental to long-term liver health.',
    category: 'Academic',
    bandLevel: 'Band 8.0',
    collocations: ['detrimental effect', 'detrimental impact', 'highly detrimental'],
    antonyms: ['beneficial', 'advantageous', 'salutary']
  },
  ubiquity: {
    word: 'ubiquity',
    phonetic: '/juːˈbɪk.wə.ti/',
    partOfSpeech: 'noun',
    banglaMeaning: 'সর্বত্র বিদ্যমানতা বা ব্যাপক বিস্তৃতি',
    englishDefinition: 'The state or capacity of being everywhere, especially at the same time.',
    synonyms: ['omnipresence', 'pervasiveness', 'universality'],
    exampleSentence: 'The ubiquity of disposable plastic packaging poses a monumental marine crisis.',
    category: 'Academic',
    bandLevel: 'Band 9.0',
    collocations: ['the ubiquity of smartphones', 'growing ubiquity']
  },
  prevalent: {
    word: 'prevalent',
    phonetic: '/ˈprev.əl.ənt/',
    partOfSpeech: 'adjective',
    banglaMeaning: 'প্রচলিত / বহুল বিস্তৃত',
    englishDefinition: 'Widespread in a particular area or at a particular time.',
    synonyms: ['widespread', 'common', 'pervasive', 'predominant'],
    exampleSentence: 'Respiratory complaints are increasingly prevalent in industrial river deltas.',
    category: 'Academic',
    bandLevel: 'Band 7.5',
    collocations: ['widely prevalent', 'most prevalent', 'prevalent view'],
    antonyms: ['rare', 'uncommon']
  },
  ecosystem: {
    "word": "ecosystem",
    "phonetic": "/ˈiː.kəʊˌsɪs.təm/",
    "partOfSpeech": "noun",
    "banglaMeaning": "বাস্তুতন্ত্র (পরিবেশের জীব ও জড় উপাদানের পারস্পরিক আন্তঃসম্পর্ক)",
    "englishDefinition": "A biological community of interacting organisms and their physical environment.",
    "synonyms": [
      "biome",
      "ecological network",
      "biosphere"
    ],
    "exampleSentence": "Industrial runoff disrupts the delicate freshwater ecosystem of the marshlands.",
    "category": "Environment",
    "bandLevel": "Band 7.0",
    "collocations": [
      "fragile ecosystem",
      "marine ecosystem",
      "threaten the ecosystem"
    ]
  },
  degradation: {
    "word": "degradation",
    "phonetic": "/ˌdeɡ.rəˈdeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "অবনতি বা ধ্বংসসাধন (পরিবেশ বা ভূমির উর্বরতা নষ্ট হওয়া)",
    "englishDefinition": "The condition or process of deteriorating or being degraded.",
    "synonyms": [
      "deterioration",
      "decay",
      "erosion",
      "damage"
    ],
    "exampleSentence": "Excessive synthetic pesticide use causes catastrophic soil degradation.",
    "category": "Environment",
    "bandLevel": "Band 7.5",
    "collocations": [
      "environmental degradation",
      "land degradation",
      "halt degradation"
    ]
  },
  conservation: {
    "word": "conservation",
    "phonetic": "/ˌkɒn.səˈveɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "সংরক্ষণ / প্রাকৃতিক সম্পদের টেকসই সুরক্ষা",
    "englishDefinition": "The prevention of wasteful use of a resource and protection of habitats.",
    "synonyms": [
      "preservation",
      "protection",
      "safeguarding"
    ],
    "exampleSentence": "Marine conservation reserves allow coral reefs to recover from bleaching.",
    "category": "Environment",
    "bandLevel": "Band 7.0",
    "collocations": [
      "wildlife conservation",
      "energy conservation",
      "conservation efforts"
    ]
  },
  inundation: {
    "word": "inundation",
    "phonetic": "/ˌɪn.ʌnˈdeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "প্লাবন / ব্যাপক বন্যা বা পানিতে তলিয়ে যাওয়া",
    "englishDefinition": "An overwhelming abundance of people or things; a flood.",
    "synonyms": [
      "flooding",
      "deluge",
      "submersion",
      "overflow"
    ],
    "exampleSentence": "Low-lying river delta regions face annual seasonal inundation.",
    "category": "Environment",
    "bandLevel": "Band 8.5",
    "collocations": [
      "coastal inundation",
      "risk of inundation",
      "catastrophic inundation"
    ]
  },
  acidification: {
    "word": "acidification",
    "phonetic": "/əˌsɪd.ɪ.fɪˈkeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "অম্লীকরণ (মহাসাগরের পানিতে কার্বন শোষণের ফলে অম্লের মাত্রা বৃদ্ধি)",
    "englishDefinition": "The process of becoming acid or being converted into an acid.",
    "synonyms": [
      "acid buildup",
      "chemical acidification"
    ],
    "exampleSentence": "Ocean acidification dissolves the calcium carbonate shells of mollusks.",
    "category": "Environment",
    "bandLevel": "Band 8.5",
    "collocations": [
      "ocean acidification",
      "rate of acidification"
    ]
  },
  renewable: {
    "word": "renewable",
    "phonetic": "/rɪˈnjuː.ə.bəl/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "নবায়নযোগ্য (যা শেষ হয় না যেমন সৌর ও বায়ু শক্তি)",
    "englishDefinition": "Capable of being renewed or replaced by natural ecological cycles.",
    "synonyms": [
      "sustainable",
      "inexhaustible",
      "green",
      "clean"
    ],
    "exampleSentence": "Developing economies must transition rapidly to renewable energy grids.",
    "category": "Environment",
    "bandLevel": "Band 7.0",
    "collocations": [
      "renewable energy",
      "renewable resources",
      "renewable sources"
    ]
  },
  autonomous: {
    "word": "autonomous",
    "phonetic": "/ɔːˈtɒn.ə.məs/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "স্বায়ত্তশাসিত / স্বচালিত (চালকহীন স্বয়ংক্রিয় ব্যবস্থা)",
    "englishDefinition": "Having the freedom to act independently; acting without human intervention.",
    "synonyms": [
      "self-governing",
      "self-operating",
      "automated",
      "independent"
    ],
    "exampleSentence": "Autonomous electric vehicles navigate complex intersections using LiDAR sensors.",
    "category": "Technology",
    "bandLevel": "Band 8.0",
    "collocations": [
      "autonomous vehicles",
      "autonomous weapons",
      "autonomous systems"
    ]
  },
  surveillance: {
    "word": "surveillance",
    "phonetic": "/sɜːˈveɪ.ləns/",
    "partOfSpeech": "noun",
    "banglaMeaning": "নজরদারি / কঠোর পর্যবেক্ষণ ও মনিটরিং",
    "englishDefinition": "Close observation, especially of a suspected spy or criminal.",
    "synonyms": [
      "monitoring",
      "observation",
      "scrutiny",
      "vigilance"
    ],
    "exampleSentence": "Widespread facial recognition surveillance raises serious civil privacy concerns.",
    "category": "Technology",
    "bandLevel": "Band 7.5",
    "collocations": [
      "mass surveillance",
      "surveillance cameras",
      "under surveillance"
    ]
  },
  biometric: {
    "word": "biometric",
    "phonetic": "/ˌbaɪ.əʊˈmet.rɪk/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "বায়োমেট্রিক / মানুষের শারীরিক বৈশিষ্ট্যের ডিজিটাল পরিমাপ",
    "englishDefinition": "Relating to the application of statistical analysis to biological data.",
    "synonyms": [
      "biological verification",
      "biomarking"
    ],
    "exampleSentence": "International airports employ biometric fingerprint gates to accelerate customs clearance.",
    "category": "Technology",
    "bandLevel": "Band 8.0",
    "collocations": [
      "biometric authentication",
      "biometric data",
      "biometric scanning"
    ]
  },
  digitization: {
    "word": "digitization",
    "phonetic": "/ˌdɪdʒ.ɪ.taɪˈzeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "ডিজিটালাইজেশন / অ্যানালগ তথ্যকে ডিজিটাল ফরম্যাটে রূপান্তর",
    "englishDefinition": "The conversion of text, pictures, or sound into a digital form that can be processed by a computer.",
    "synonyms": [
      "computerization",
      "digital conversion",
      "data encoding"
    ],
    "exampleSentence": "The digitization of ancient university archives protects delicate papyrus from humidity.",
    "category": "Technology",
    "bandLevel": "Band 7.5",
    "collocations": [
      "rapid digitization",
      "digitization of records",
      "accelerate digitization"
    ]
  },
  urbanization: {
    "word": "urbanization",
    "phonetic": "/ˌɜː.bən.aɪˈzeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "নগরায়ণ (গ্রাম ছেড়ে দলে দলে শহরে বসবাস শুরু করার প্রক্রিয়া)",
    "englishDefinition": "The process of making an area more urban; the progressive movement of populations into cities.",
    "synonyms": [
      "city growth",
      "metropolitan expansion",
      "civic sprawl"
    ],
    "exampleSentence": "Uncontrolled urbanization places immense pressure on potable water reservoirs.",
    "category": "Society",
    "bandLevel": "Band 7.0",
    "collocations": [
      "rapid urbanization",
      "pace of urbanization",
      "rural-urban migration"
    ]
  },
  assimilation: {
    "word": "assimilation",
    "phonetic": "/əˌsɪm.ɪˈleɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "একীভবন / নতুন সমাজে নিজস্ব সংস্কৃতি সমন্বয় করে মিশে যাওয়া",
    "englishDefinition": "The process of taking in and fully understanding information or ideas; cultural integration.",
    "synonyms": [
      "integration",
      "absorption",
      "adaptation",
      "acculturation"
    ],
    "exampleSentence": "Language proficiency classes accelerate immigrant assimilation into host workforces.",
    "category": "Society",
    "bandLevel": "Band 8.5",
    "collocations": [
      "cultural assimilation",
      "social assimilation",
      "resist assimilation"
    ]
  },
  segregation: {
    "word": "segregation",
    "phonetic": "/ˌseɡ.rɪˈɡeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "পৃথকীকরণ / সমাজ বা গোষ্ঠীকে আলাদা করে বিচ্ছিন্ন রাখা",
    "englishDefinition": "The action or state of setting someone or something apart from others.",
    "synonyms": [
      "separation",
      "isolation",
      "exclusion",
      "partition"
    ],
    "exampleSentence": "Zoning laws unintentionally exacerbated economic residential segregation.",
    "category": "Society",
    "bandLevel": "Band 8.0",
    "collocations": [
      "residential segregation",
      "racial segregation",
      "end segregation"
    ]
  },
  multiculturalism: {
    "word": "multiculturalism",
    "phonetic": "/ˌmʌl.tiˈkʌl.tʃər.əl.ɪ.zəm/",
    "partOfSpeech": "noun",
    "banglaMeaning": "বহুসংস্কৃতিবাদ (ভিন্ন ভিন্ন সংস্কৃতির পারস্পরিক সহাবস্থান)",
    "englishDefinition": "The presence of, or support for the presence of, several distinct cultural or ethnic groups within a society.",
    "synonyms": [
      "cultural pluralism",
      "diversity",
      "coexistence"
    ],
    "exampleSentence": "Metropolitan Toronto is frequently celebrated as a vibrant model of multiculturalism.",
    "category": "Society",
    "bandLevel": "Band 7.5",
    "collocations": [
      "embrace multiculturalism",
      "policy of multiculturalism"
    ]
  },
  elucidate: {
    "word": "elucidate",
    "phonetic": "/iˈluː.sɪ.deɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "স্পষ্টভাবে ব্যাখ্যা করা / প্রাঞ্জলভাবে তুলে ধরা",
    "englishDefinition": "Make something clear; explain in lucid detail.",
    "synonyms": [
      "clarify",
      "illuminate",
      "expound",
      "unravel"
    ],
    "exampleSentence": "The professor used molecular models to elucidate complex chemical bonds.",
    "category": "Education",
    "bandLevel": "Band 8.5",
    "collocations": [
      "elucidate the mechanism",
      "elucidate the findings",
      "further elucidate"
    ]
  },
  substantiate: {
    "word": "substantiate",
    "phonetic": "/səbˈstæn.ʃi.eɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "প্রমাণ দ্বারা প্রতিষ্ঠিত করা / সত্যতা প্রমাণ করা",
    "englishDefinition": "Provide evidence to support or prove the truth of something.",
    "synonyms": [
      "validate",
      "corroborate",
      "verify",
      "authenticate"
    ],
    "exampleSentence": "The author failed to substantiate his radical claims with statistical evidence.",
    "category": "Education",
    "bandLevel": "Band 8.5",
    "collocations": [
      "substantiate allegations",
      "substantiate claims",
      "amply substantiate"
    ]
  },
  delineate: {
    "word": "delineate",
    "phonetic": "/dɪˈlɪn.i.eɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "সুনির্দিষ্টভাবে বর্ণনা বা চিহ্নিত করা",
    "englishDefinition": "Describe or portray something precisely; indicate the exact position of a border.",
    "synonyms": [
      "outline",
      "demarcate",
      "depict",
      "define"
    ],
    "exampleSentence": "The curriculum clearly delineates assessment criteria for undergraduate dissertations.",
    "category": "Education",
    "bandLevel": "Band 8.5",
    "collocations": [
      "clearly delineate",
      "delineate responsibilities",
      "delineate boundaries"
    ]
  },
  epitomize: {
    "word": "epitomize",
    "phonetic": "/ɪˈpɪt.ə.maɪz/",
    "partOfSpeech": "verb",
    "banglaMeaning": "মূর্ত প্রতীক হওয়া / সর্বোৎকৃষ্ট উদাহরণ হওয়া",
    "englishDefinition": "Be a perfect example of a quality, style, or trait.",
    "synonyms": [
      "typify",
      "exemplify",
      "personify",
      "embody"
    ],
    "exampleSentence": "The Sydney Opera House epitomizes modern modernist maritime architecture.",
    "category": "Education",
    "bandLevel": "Band 9.0",
    "collocations": [
      "epitomize the spirit",
      "epitomize modern architecture"
    ]
  },
  plagiarism: {
    "word": "plagiarism",
    "phonetic": "/ˈpleɪ.dʒər.ɪ.zəm/",
    "partOfSpeech": "noun",
    "banglaMeaning": "চৌর্যবৃত্তি / অন্যের লেখা বা চিন্তা নিজের নামে চালিয়ে দেওয়া",
    "englishDefinition": "The practice of taking someone else's work or ideas and passing them off as one's own.",
    "synonyms": [
      "intellectual theft",
      "infringement",
      "copying",
      "bootlegging"
    ],
    "exampleSentence": "Modern academic universities enforce zero tolerance for digital plagiarism.",
    "category": "Education",
    "bandLevel": "Band 7.5",
    "collocations": [
      "commit plagiarism",
      "accused of plagiarism",
      "plagiarism software"
    ]
  },
  stagnation: {
    "word": "stagnation",
    "phonetic": "/stæɡˈneɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "স্থবিরতা / অর্থনৈতিক অচলাবস্থা বা উন্নতির অনুপস্থিতি",
    "englishDefinition": "A prolonged period of little or no growth in an economy.",
    "synonyms": [
      "sluggishness",
      "inertia",
      "downturn",
      "standstill"
    ],
    "exampleSentence": "A decade of wage stagnation has severely curtailed middle-class disposable savings.",
    "category": "Economy",
    "bandLevel": "Band 8.0",
    "collocations": [
      "economic stagnation",
      "prolonged stagnation",
      "escape stagnation"
    ]
  },
  entrepreneurship: {
    "word": "entrepreneurship",
    "phonetic": "/ˌɒn.trə.prəˈnɜː.ʃɪp/",
    "partOfSpeech": "noun",
    "banglaMeaning": "উদ্যোক্তা হওয়া / নতুন ব্যবসা প্রতিষ্ঠা ও উদ্ভাবন ক্ষমতা",
    "englishDefinition": "The activity of setting up a business or businesses, taking on financial risks in hope of profit.",
    "synonyms": [
      "enterprise",
      "business innovation",
      "commercial venture"
    ],
    "exampleSentence": "Seed funding grants foster youth entrepreneurship in developing tech ecosystems.",
    "category": "Economy",
    "bandLevel": "Band 7.5",
    "collocations": [
      "foster entrepreneurship",
      "spirit of entrepreneurship",
      "social entrepreneurship"
    ]
  },
  subsidy: {
    "word": "subsidy",
    "phonetic": "/ˈsʌb.sɪ.di/",
    "partOfSpeech": "noun",
    "banglaMeaning": "ভর্তুকি / জনস্বার্থে সরকার কর্তৃক আর্থিক অনুদান",
    "englishDefinition": "A sum of money granted by the government to assist an industry or business to keep prices low.",
    "synonyms": [
      "grant",
      "financial aid",
      "subvention",
      "allowance"
    ],
    "exampleSentence": "Government agricultural subsidies protect wheat farmers against market price collapses.",
    "category": "Economy",
    "bandLevel": "Band 7.5",
    "collocations": [
      "state subsidy",
      "agricultural subsidy",
      "receive a subsidy"
    ]
  },
  liquidity: {
    "word": "liquidity",
    "phonetic": "/lɪˈkwɪd.ə.ti/",
    "partOfSpeech": "noun",
    "banglaMeaning": "তারল্য (সম্পদ দ্রুত ও সহজে নগদে রূপান্তর করার ক্ষমতা)",
    "englishDefinition": "The availability of liquid assets to a market or company.",
    "synonyms": [
      "cash flow",
      "market liquidity",
      "convertibility"
    ],
    "exampleSentence": "Central banks injected liquidity to forestall widespread commercial bank runs.",
    "category": "Economy",
    "bandLevel": "Band 8.5",
    "collocations": [
      "market liquidity",
      "excess liquidity",
      "liquidity crisis"
    ]
  },
  longevity: {
    "word": "longevity",
    "phonetic": "/lɒnˈdʒev.ə.ti/",
    "partOfSpeech": "noun",
    "banglaMeaning": "দীর্ঘায়ু / দীর্ঘ জীবনকাল",
    "englishDefinition": "Long life or long existence.",
    "synonyms": [
      "long life",
      "durability",
      "permanence",
      "tenacity"
    ],
    "exampleSentence": "Mediterranean diets rich in cold-pressed olive oil are associated with increased longevity.",
    "category": "Health",
    "bandLevel": "Band 7.5",
    "collocations": [
      "exceptional longevity",
      "promote longevity",
      "factors influencing longevity"
    ]
  },
  immunization: {
    "word": "immunization",
    "phonetic": "/ˌɪm.jə.naɪˈzeɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "টিকাদান কর্মসূচি / রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
    "englishDefinition": "The action of making a person or animal immune to infection, typically by inoculation.",
    "synonyms": [
      "vaccination",
      "inoculation",
      "preventative shot"
    ],
    "exampleSentence": "Universal pediatric immunization virtually eliminated poliomyelitis worldwide.",
    "category": "Health",
    "bandLevel": "Band 7.5",
    "collocations": [
      "routine immunization",
      "immunization campaign",
      "widespread immunization"
    ]
  },
  psychiatric: {
    "word": "psychiatric",
    "phonetic": "/ˌsaɪ.kiˈæt.rɪk/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "মানসিক ব্যাধি সংক্রান্ত / মনোরোগ বিষয়ক",
    "englishDefinition": "Relating to mental illness or its treatment.",
    "synonyms": [
      "psychological",
      "mental health",
      "clinical cognitive"
    ],
    "exampleSentence": "Urban clinics integrated psychiatric counseling into general outpatient healthcare.",
    "category": "Health",
    "bandLevel": "Band 7.5",
    "collocations": [
      "psychiatric disorder",
      "psychiatric evaluation",
      "psychiatric hospital"
    ]
  },
  cardiovascular: {
    "word": "cardiovascular",
    "phonetic": "/ˌkɑː.di.əʊˈvæs.kjə.lər/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "হৃদযন্ত্র ও রক্তনালী সংক্রান্ত",
    "englishDefinition": "Relating to the heart and blood vessels.",
    "synonyms": [
      "circulatory",
      "coronary",
      "cardiac"
    ],
    "exampleSentence": "Aerobic swimming strengthens overall cardiovascular endurance and regulates arterial blood pressure.",
    "category": "Health",
    "bandLevel": "Band 7.5",
    "collocations": [
      "cardiovascular disease",
      "cardiovascular fitness",
      "cardiovascular health"
    ]
  },
  judiciary: {
    "word": "judiciary",
    "phonetic": "/dʒuːˈdɪʃ.ər.i/",
    "partOfSpeech": "noun",
    "banglaMeaning": "বিচার বিভাগ / দেশের বিচারকমণ্ডলী ও আদালতসমূহ",
    "englishDefinition": "The judicial authorities of a country; judges collectively.",
    "synonyms": [
      "bench",
      "magistracy",
      "court system",
      "justice system"
    ],
    "exampleSentence": "An independent judiciary safeguards civilian constitutional rights against executive overreach.",
    "category": "Law",
    "bandLevel": "Band 8.0",
    "collocations": [
      "independent judiciary",
      "impartial judiciary",
      "reverence for the judiciary"
    ]
  },
  sovereignty: {
    "word": "sovereignty",
    "phonetic": "/ˈsɒv.rɪn.ti/",
    "partOfSpeech": "noun",
    "banglaMeaning": "সার্বভৌমত্ব / স্বাধীনভাবে সিদ্ধান্ত নেওয়ার সর্বোচ্চ ক্ষমতা",
    "englishDefinition": "Supreme power or authority; the authority of a state to govern itself.",
    "synonyms": [
      "autonomy",
      "independence",
      "self-determination",
      "dominion"
    ],
    "exampleSentence": "International maritime agreements respect the economic sovereignty of island nations.",
    "category": "Law",
    "bandLevel": "Band 8.0",
    "collocations": [
      "national sovereignty",
      "violate sovereignty",
      "territorial sovereignty"
    ]
  },
  rehabilitation: {
    "word": "rehabilitation",
    "phonetic": "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "পুনর্বাসন (অপরাধী বা রোগীকে স্বাভাবিক জীবনে ফিরিয়ে আনা)",
    "englishDefinition": "The action of restoring someone to health or normal life through training and therapy.",
    "synonyms": [
      "reintegration",
      "restoration",
      "reform",
      "recovery"
    ],
    "exampleSentence": "Modern penology prioritizes prisoner education and psychological rehabilitation over harsh solitary confinement.",
    "category": "Law",
    "bandLevel": "Band 7.5",
    "collocations": [
      "prisoner rehabilitation",
      "community rehabilitation",
      "rehabilitation program"
    ]
  },
  prosecution: {
    "word": "prosecution",
    "phonetic": "/ˌprɒs.ɪˈkjuː.ʃən/",
    "partOfSpeech": "noun",
    "banglaMeaning": "মামলা পরিচালনা বা অভিযুক্ত ব্যক্তির বিরুদ্ধে আইনগত পদক্ষেপ",
    "englishDefinition": "The institution and conducting of legal proceedings against someone in respect of a criminal charge.",
    "synonyms": [
      "legal proceedings",
      "indictment",
      "trial action"
    ],
    "exampleSentence": "The public prosecution submitted definitive forensic DNA matches to the jury.",
    "category": "Law",
    "bandLevel": "Band 7.5",
    "collocations": [
      "lead the prosecution",
      "immune from prosecution",
      "face prosecution"
    ]
  },
  facilitate: {
    "word": "facilitate",
    "phonetic": "/fəˈsɪl.ɪ.teɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "সহজতর করা / কোনো প্রক্রিয়াকে সুগম ও সহজ করা",
    "englishDefinition": "Make an action or process easy or easier.",
    "synonyms": [
      "ease",
      "expedite",
      "smooth",
      "accelerate"
    ],
    "exampleSentence": "Modern cloud intranet portals facilitate seamless collaboration between multinational teams.",
    "category": "Academic",
    "bandLevel": "Band 7.5",
    "collocations": [
      "facilitate communication",
      "facilitate trade",
      "facilitate learning"
    ],
    "antonyms": [
      "hinder",
      "obstruct",
      "impede"
    ]
  },
  undermine: {
    "word": "undermine",
    "phonetic": "/ˌʌn.dəˈmaɪn/",
    "partOfSpeech": "verb",
    "banglaMeaning": "তলে তলে দুর্বল করা / ভিত্তি নষ্ট করা",
    "englishDefinition": "Lessen the effectiveness, power, or ability of, especially gradually or insidiously.",
    "synonyms": [
      "subvert",
      "weaken",
      "compromise",
      "erode"
    ],
    "exampleSentence": "Unverified digital disinformation campaigns undermine public trust in scientific consensus.",
    "category": "Academic",
    "bandLevel": "Band 8.0",
    "collocations": [
      "undermine credibility",
      "undermine confidence",
      "undermine authority"
    ],
    "antonyms": [
      "reinforce",
      "strengthen",
      "bolster"
    ]
  },
  corroborate: {
    "word": "corroborate",
    "phonetic": "/kəˈrɒb.ə.reɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "অন্য প্রমাণ দিয়ে সমর্থন বা নিশ্চিত করা",
    "englishDefinition": "Confirm or give support to a statement, theory, or finding.",
    "synonyms": [
      "confirm",
      "substantiate",
      "verify",
      "endorse"
    ],
    "exampleSentence": "Independent tree-ring core samples corroborated meteorological records of medieval droughts.",
    "category": "Academic",
    "bandLevel": "Band 8.5",
    "collocations": [
      "corroborate evidence",
      "corroborate findings",
      "amply corroborate"
    ],
    "antonyms": [
      "contradict",
      "disprove",
      "refute"
    ]
  },
  proliferate: {
    "word": "proliferate",
    "phonetic": "/prəˈlɪf.ər.eɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "দ্রুত বংশবৃদ্ধি বা অতি দ্রুত সংখ্যা বৃদ্ধি পাওয়া",
    "englishDefinition": "Increase rapidly in numbers; multiply.",
    "synonyms": [
      "multiply",
      "burgeon",
      "escalate",
      "spread"
    ],
    "exampleSentence": "Low-cost satellite internet caused regional remote startups to proliferate exponentially.",
    "category": "Academic",
    "bandLevel": "Band 8.5",
    "collocations": [
      "proliferate rapidly",
      "startups proliferate",
      "weapons proliferate"
    ],
    "antonyms": [
      "dwindle",
      "decline",
      "diminish"
    ]
  },
  accentuate: {
    "word": "accentuate",
    "phonetic": "/əkˈsen.tʃu.eɪt/",
    "partOfSpeech": "verb",
    "banglaMeaning": "স্পষ্ট বা লক্ষণীয় করে তোলা / জোর দেওয়া",
    "englishDefinition": "Make more noticeable or prominent.",
    "synonyms": [
      "emphasize",
      "highlight",
      "underline",
      "heighten"
    ],
    "exampleSentence": "The global pandemic accentuated preexisting economic disparities between white-collar and hourly workers.",
    "category": "Academic",
    "bandLevel": "Band 8.0",
    "collocations": [
      "accentuate the positive",
      "accentuate inequalities",
      "accentuate differences"
    ]
  },
  imperative: {
    "word": "imperative",
    "phonetic": "/ɪmˈper.ə.tɪv/",
    "partOfSpeech": "adjective",
    "banglaMeaning": "অপরিহার্য / অত্যন্ত জরুরি ও বাধ্যতামূলক",
    "englishDefinition": "Of vital importance; crucial.",
    "synonyms": [
      "vital",
      "crucial",
      "essential",
      "indispensable"
    ],
    "exampleSentence": "It is imperative that developed nations fulfill their climate adaptation pledge.",
    "category": "Academic",
    "bandLevel": "Band 8.0",
    "collocations": [
      "moral imperative",
      "vital imperative",
      "economically imperative"
    ],
    "antonyms": [
      "optional",
      "secondary",
      "trivial"
    ]
  }
};

export const VOCABULARY_CATEGORIES = [
  'All',
  'Environment',
  'Technology',
  'Society',
  'Education',
  'Economy',
  'Health',
  'Law',
  'Academic'
] as const;

export const VOCABULARY_BAND_LEVELS = [
  'All',
  'Band 7.0',
  'Band 7.5',
  'Band 8.0',
  'Band 8.5',
  'Band 9.0'
] as const;
