/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { BottomNav, TabKey } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { LessonsScreen } from './screens/LessonsScreen';
import { GamesScreen } from './screens/GamesScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { AgeGroup, CategoryId, UserProgress, AppSettings } from './types';
import {
  loadProgress,
  saveProgress,
  loadSettings,
  saveSettings,
  resetAllData,
  DEFAULT_PROGRESS,
  DEFAULT_SETTINGS,
} from './utils/storage';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  // Sync settings with audio manager and document theme
  useEffect(() => {
    soundManager.setSoundEnabled(settings.soundEnabled);
    soundManager.setSpeechEnabled(settings.voiceSpeechEnabled);

    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Persist progress changes
  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...updates };
      saveProgress(next);
      return next;
    });
  };

  // Persist settings changes
  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      saveSettings(next);
      return next;
    });
  };

  const handleSelectAge = (age: AgeGroup) => {
    updateProgress({ selectedAge: age });
  };

  const handleOpenCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('lessons');
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      updateProgress({
        completedLessons: [...progress.completedLessons, lessonId],
        starsEarned: progress.starsEarned + 1,
      });
    }
  };

  const handleAwardStars = (count: number) => {
    updateProgress({
      starsEarned: progress.starsEarned + count,
    });
  };

  const handleQuizComplete = (score: number, total: number) => {
    const starsWon = score;
    updateProgress({
      starsEarned: progress.starsEarned + starsWon,
      bestQuizScore: Math.max(progress.bestQuizScore, score),
      totalQuizzesTaken: progress.totalQuizzesTaken + 1,
    });
  };

  const handleResetAll = () => {
    resetAllData();
    setProgress(DEFAULT_PROGRESS);
    setSettings(DEFAULT_SETTINGS);
    setActiveTab('home');
  };

  return (
    <>
      <AndroidFrame
        soundEnabled={settings.soundEnabled}
        onToggleSound={() =>
          updateSettings({ soundEnabled: !settings.soundEnabled })
        }
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        stars={progress.starsEarned}
      >
        <main className="flex-1 flex flex-col overflow-y-auto">
          {activeTab === 'home' && (
            <HomeScreen
              progress={progress}
              onSelectAge={handleSelectAge}
              onOpenCategory={handleOpenCategory}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'lessons' && (
            <LessonsScreen
              progress={progress}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'games' && (
            <GamesScreen
              progress={progress}
              onAwardStars={handleAwardStars}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizScreen
              progress={progress}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {activeTab === 'results' && (
            <ResultsScreen progress={progress} />
          )}

          {activeTab === 'settings' && (
            <SettingsScreen
              progress={progress}
              settings={settings}
              onUpdateSettings={updateSettings}
              onUpdateProgress={updateProgress}
              onResetAll={handleResetAll}
            />
          )}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </AndroidFrame>

      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </>
  );
}
