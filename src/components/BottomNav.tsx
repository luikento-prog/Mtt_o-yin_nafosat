import React from 'react';
import { Home, BookOpen, Gamepad2, Award, Trophy, Settings } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type TabKey = 'home' | 'lessons' | 'games' | 'quiz' | 'results' | 'settings';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: 'Bosh sahifa', icon: <Home className="w-5 h-5" /> },
    { key: 'lessons', label: 'Darslar', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'games', label: "O'yinlar", icon: <Gamepad2 className="w-5 h-5" /> },
    { key: 'quiz', label: 'Viktorina', icon: <Award className="w-5 h-5" /> },
    { key: 'results', label: 'Yutuqlar', icon: <Trophy className="w-5 h-5" /> },
    { key: 'settings', label: 'Sozlamalar', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Asosiy navigatsiya"
      className="sticky bottom-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-amber-200/60 dark:border-slate-800 px-1 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                soundManager.playPop();
                onTabChange(tab.key);
              }}
              className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-pink-600 dark:text-pink-400 font-extrabold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400'
                    : 'bg-transparent'
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 tracking-tight line-clamp-1">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
