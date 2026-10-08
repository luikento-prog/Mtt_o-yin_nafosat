import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  RotateCcw,
  User,
  Info,
  Type,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { AppSettings, UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface SettingsScreenProps {
  progress: UserProgress;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
  onResetAll: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  progress,
  settings,
  onUpdateSettings,
  onUpdateProgress,
  onResetAll,
}) => {
  const [childNameInput, setChildNameInput] = useState(progress.childName);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childNameInput.trim()) return;
    soundManager.playCorrect();
    onUpdateProgress({ childName: childNameInput.trim() });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-2xl mx-auto w-full">
      {/* Title */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          Ilova Sozlamalari
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
          Moslashtirish va Sozlamalar ⚙️
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ovoz, ko&apos;rinish va bolajon ma&apos;lumotlarini boshqaring
        </p>
      </div>

      {/* Child Profile Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <User className="w-4 h-4 text-pink-500" />
          Bolajon Ismi va Profili
        </h3>

        <form onSubmit={handleSaveName} className="flex gap-2">
          <input
            type="text"
            value={childNameInput}
            onChange={(e) => setChildNameInput(e.target.value)}
            placeholder="Bolaning ismini kiriting..."
            className="flex-1 px-3.5 py-2.5 bg-amber-50/50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-md active:scale-95 transition shrink-0"
          >
            Saqlash
          </button>
        </form>

        {savedNotice && (
          <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Ism muvaffaqiyatli saqlandi!</span>
          </div>
        )}
      </div>

      {/* Audio and Voice Toggles */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 text-amber-500" />
          Ovoz va Nutq Sozlamalari
        </h3>

        <div className="space-y-2">
          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Ovoz effektlari (Musiqa va jaranglar)
              </div>
              <div className="text-[11px] text-slate-400">
                Tugmalar va to&apos;g&apos;ri javoblardagi jarangdor tovushlar
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playPop();
                onUpdateSettings({ soundEnabled: !settings.soundEnabled });
              }}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
                settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Speech Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                O&apos;zbekcha ovozli o&apos;qish (Audio nutq)
              </div>
              <div className="text-[11px] text-slate-400">
                Dars va savollarni bolaga ovoz chiqarib aytib berish
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playPop();
                onUpdateSettings({
                  voiceSpeechEnabled: !settings.voiceSpeechEnabled,
                });
              }}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
                settings.voiceSpeechEnabled
                  ? 'bg-emerald-500'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.voiceSpeechEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Visual & Theme Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Moon className="w-4 h-4 text-purple-500" />
          Ko&apos;rinish va Mavzu
        </h3>

        {/* Theme mode toggle */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Tungi / Kunduzgi rejim (Dark Mode)
            </div>
            <div className="text-[11px] text-slate-400">
              Ko&apos;zni toliqtirmaydigan qulay fon
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onUpdateSettings({ darkMode: !settings.darkMode });
            }}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
              settings.darkMode ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl p-4 sm:p-5 border-2 border-rose-200/80 dark:border-rose-900/50 space-y-2">
        <h3 className="text-xs sm:text-sm font-black text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          Ma&apos;lumotlarni Tozalash
        </h3>
        <p className="text-[11px] text-rose-600 dark:text-rose-400">
          Barcha yig&apos;ilgan yulduzchalar va o&apos;rganilgan darslarni boshlang&apos;ich holatga qaytarish.
        </p>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 transition active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Natijalarni tozalash</span>
          </button>
        ) : (
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-rose-300 dark:border-rose-800 space-y-2">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Rostdan ham barcha natijalarni tozalashni xohlaysizmi?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onResetAll();
                  setShowConfirmReset(false);
                }}
                className="bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm"
              >
                Ha, tozalansin
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* About Box */}
      <div className="p-4 rounded-3xl bg-amber-100/60 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-center space-y-1">
        <div className="text-xs font-black text-slate-800 dark:text-slate-200">
          Maktabgacha Ta&apos;lim (v1.0.0 Production APK)
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Android 8.0 - 15.0 mosligi, 100% oflayn ishlash, Jetpack Compose & Material 3
        </p>
      </div>
    </div>
  );
};
