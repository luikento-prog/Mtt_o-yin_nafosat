export type AgeGroup = '3-4' | '4-5' | '5-6' | '6-7';

export type CategoryId = 'ranglar' | 'raqamlar' | 'mevalar' | 'sabzavotlar' | 'hayvonlar';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgLight: string;
  ageGroups: AgeGroup[];
  lessonCount: number;
}

export interface LessonItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  nameEn?: string;
  phoneticUz?: string;
  description: string;
  funFact: string;
  visualEmoji: string;
  colorHex?: string;
  audioText: string;
  minAge: AgeGroup;
  soundType?: string; // e.g. animal sound name
  exampleItems?: string[];
  numberCount?: number;
}

export interface DidacticGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  targetAge: AgeGroup[];
  type: 'color_match' | 'counting' | 'fruit_veg_sort' | 'animal_guess' | 'shadow_match';
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  categoryId: CategoryId;
  ageGroup: AgeGroup;
  options: {
    text: string;
    emoji?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface UserProgress {
  selectedAge: AgeGroup;
  completedLessons: string[]; // lesson ids
  bestQuizScore: number;
  totalQuizzesTaken: number;
  starsEarned: number;
  unlockedBadges: string[];
  gameHighScores: Record<string, number>;
  childName: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  voiceSpeechEnabled: boolean;
  darkMode: boolean;
  fontScale: 'normal' | 'large' | 'xlarge';
  alphabet: 'latin' | 'cyrillic';
}
