import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Maximize2,
  RotateCw,
  Code2,
  Volume2,
  VolumeX,
  Wifi,
  BatteryCharging,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export type DeviceMode = 'phone-small' | 'phone-modern' | 'tablet' | 'full';

interface AndroidFrameProps {
  children: React.ReactNode;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCodeModal: () => void;
  stars: number;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  soundEnabled,
  onToggleSound,
  onOpenCodeModal,
  stars,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('phone-modern');
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const currentTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const getDimensions = () => {
    if (deviceMode === 'full') return 'w-full h-full max-w-full';

    if (deviceMode === 'phone-small') {
      return isLandscape
        ? 'w-[740px] h-[360px] max-w-[95vw]'
        : 'w-[360px] h-[740px] max-h-[92vh]';
    }

    if (deviceMode === 'tablet') {
      return isLandscape
        ? 'w-[980px] h-[680px] max-w-[96vw]'
        : 'w-[680px] h-[920px] max-h-[92vh]';
    }

    // Modern phone default (Pixel 8 / Galaxy S24)
    return isLandscape
      ? 'w-[840px] h-[412px] max-w-[95vw]'
      : 'w-[412px] h-[840px] max-h-[92vh]';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4">
      {/* Top Control Bar for Simulator & Android Studio Tools */}
      <header className="w-full max-w-5xl mb-3 flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl px-4 py-2.5 shadow-lg text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-lg font-bold shadow-md">
            👶
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm sm:text-base tracking-wide flex items-center gap-1.5">
              Maktabgacha Ta&apos;lim
              <span className="text-[10px] bg-pink-500/20 text-pink-300 font-semibold px-2 py-0.5 rounded-full border border-pink-500/30">
                Android APK Loyihasi
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              3-7 yoshli bolalar uchun didaktik o&apos;yinlar va darslar
            </p>
          </div>
        </div>

        {/* Device Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setDeviceMode('phone-small');
              soundManager.playPop();
            }}
            title="Kichik telefon (360x740)"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              deviceMode === 'phone-small'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">360px</span>
          </button>

          <button
            onClick={() => {
              setDeviceMode('phone-modern');
              soundManager.playPop();
            }}
            title="Zamonaviy telefon (412x840)"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              deviceMode === 'phone-modern'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">412px</span>
          </button>

          <button
            onClick={() => {
              setDeviceMode('tablet');
              soundManager.playPop();
            }}
            title="Planshet rejimi (Planshet / Tablet)"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              deviceMode === 'tablet'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Planshet</span>
          </button>

          <button
            onClick={() => {
              setDeviceMode('full');
              soundManager.playPop();
            }}
            title="To'liq oyna rejimi"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              deviceMode === 'full'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">To&apos;liq</span>
          </button>

          {deviceMode !== 'full' && (
            <button
              onClick={() => {
                setIsLandscape(!isLandscape);
                soundManager.playPop();
              }}
              title="Ekran yo'nalishini almashtirish (Portrait / Landscape)"
              className={`p-1.5 rounded-lg text-xs transition ml-1 ${
                isLandscape ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sound toggle & Android Studio Code button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Ovozlarni o'chirish" : 'Ovozlarni yoqish'}
            className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={onOpenCodeModal}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition transform active:scale-95"
          >
            <Code2 className="w-4 h-4" />
            <span>Android Kod & APK</span>
          </button>
        </div>
      </header>

      {/* Device Shell Frame */}
      <div
        className={`relative transition-all duration-300 ease-out flex flex-col overflow-hidden ${
          deviceMode === 'full'
            ? 'w-full flex-1 max-w-5xl rounded-3xl border-2 border-slate-700 bg-amber-50/20 shadow-2xl'
            : `${getDimensions()} rounded-[40px] border-[10px] border-slate-800 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]`
        }`}
      >
        {/* Simulated Android Status Bar */}
        <div className="w-full bg-amber-100/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none z-30 border-b border-amber-200/40 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span>{currentTime}</span>
            <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold ml-1">
              ⭐ {stars}
            </span>
          </div>

          {/* Notch / Punch hole camera simulation */}
          {deviceMode !== 'full' && !isLandscape && (
            <div className="w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full border border-slate-700"></div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            <span className="text-[10px]">5G</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">98%</span>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-amber-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-['Nunito',sans-serif]">
          {children}
        </div>

        {/* Simulated Android Gesture Navigation Bar */}
        {deviceMode !== 'full' && (
          <div className="w-full bg-amber-100/70 dark:bg-slate-900/80 py-1 flex items-center justify-center z-30">
            <div className="w-32 h-1 bg-slate-400/80 dark:bg-slate-600 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
