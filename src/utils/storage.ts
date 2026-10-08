import { AppSettings, UserProgress } from '../types';

const PROGRESS_KEY = 'maktabgacha_user_progress_v1';
const SETTINGS_KEY = 'maktabgacha_app_settings_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  selectedAge: '3-4',
  completedLessons: ['rang_qizil', 'raqam_1', 'meva_olma'],
  bestQuizScore: 0,
  totalQuizzesTaken: 0,
  starsEarned: 12,
  unlockedBadges: ['Boshlang‘ich bilimdon', 'Ranglar do‘sti'],
  gameHighScores: {
    game_color_match: 5,
    game_counting: 4,
    game_fruit_veg: 6,
  },
  childName: 'Bolajon',
};

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  voiceSpeechEnabled: true,
  darkMode: false,
  fontScale: 'normal',
  alphabet: 'latin',
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Storage quota or privacy mode error handled
  }
}

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    // ignore
  }
}
