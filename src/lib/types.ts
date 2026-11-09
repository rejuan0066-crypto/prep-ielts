export type BandScore = number; // e.g. 5.5, 6.0, 7.5

export interface WordDefinition {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  banglaMeaning: string;
  englishDefinition: string;
  synonyms: string[];
  exampleSentence: string;
  category?: string;
  bandLevel?: string;
  collocations?: string[];
  antonyms?: string[];
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false-not-given' | 'fill-blanks' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  passageQuote?: string;
}

export interface ReadingTest {
  id: string;
  title: string;
  passageTitle: string;
  timeLimitMinutes: number;
  passageText: string;
  questions: Question[];
}

export interface ReadingPassage {
  passageNumber: 1 | 2 | 3;
  passageTitle: string;
  passageText: string;
  questionRange: string;
  questions: Question[];
}

export interface FullReadingExam {
  id: string;
  title: string;
  book: string;
  testNumber: number;
  timeLimitMinutes: number;
  passages: ReadingPassage[];
}

export interface ListeningSection {
  sectionNumber: 1 | 2 | 3 | 4;
  sectionTitle: string;
  contextType: string; // e.g. "Social Dialogue", "Community Monologue", "Academic Discussion", "University Lecture"
  questionRange: string;
  audioDurationSeconds: number;
  audioUrl?: string; // MP3 URL (local or remote stream)
  audioTranscript: string;
  questions: Question[];
}

export interface FullListeningExam {
  id: string;
  title: string;
  book: string;
  testNumber: number;
  timeLimitMinutes: number; // 30 mins
  sections: ListeningSection[];
}

export interface WritingFeedback {
  overallBand: number;
  taskAchievement: { score: number; feedback: string };
  coherenceCohesion: { score: number; feedback: string };
  lexicalResource: { score: number; feedback: string };
  grammaticalRange: { score: number; feedback: string };
  strengths: string[];
  weaknesses: string[];
  upgradedSentences: Array<{
    original: string;
    improved: string;
    reason: string;
  }>;
}

export interface SpeakingFeedback {
  overallBand: number;
  fluencyCoherence: { score: number; feedback: string };
  lexicalResource: { score: number; feedback: string };
  grammaticalRange: { score: number; feedback: string };
  pronunciation: { score: number; feedback: string };
  identifiedMistakes: Array<{
    phrase: string;
    suggestion: string;
    type: 'Grammar' | 'Vocabulary' | 'Pronunciation' | 'Fluency';
  }>;
}

export interface DailyMission {
  id: string;
  dayNumber: number;
  title: string;
  completed: boolean;
  tasks: Array<{
    title: string;
    duration: string;
    type: 'vocab' | 'technique' | 'practice' | 'speaking';
    status: 'pending' | 'in-progress' | 'completed';
    url: string;
  }>;
}
