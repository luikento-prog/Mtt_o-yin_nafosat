import React, { useRef } from 'react';
import {
  Trophy,
  Star,
  Award,
  CheckCircle2,
  Printer,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface ResultsScreenProps {
  progress: UserProgress;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ progress }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const today = new Date().toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const badges = [
    {
      id: 'b1',
      title: "Boshlang'ich Bilimdon",
      icon: '🌱',
      desc: "Ilovaga kirib, ilk darsni boshlagani uchun",
      unlocked: true,
    },
    {
      id: 'b2',
      title: "Ranglar Do'sti",
      icon: '🎨',
      desc: "Ranglar darsini to'liq o'zlashtirgani uchun",
      unlocked: progress.completedLessons.some((id) => id.startsWith('rang_')),
    },
    {
      id: 'b3',
      title: "Raqamlar Dahosi",
      icon: '🔢',
      desc: "1 dan 10 gacha sanash darslarini bajargani uchun",
      unlocked: progress.completedLessons.some((id) => id.startsWith('raqam_')),
    },
    {
      id: 'b4',
      title: "Meva va Sabzavot Ustasi",
      icon: '🍎',
      desc: "Barcha mevalar va sabzavotlarni saralagani uchun",
      unlocked: progress.completedLessons.some(
        (id) => id.startsWith('meva_') || id.startsWith('sabzavot_')
      ),
    },
    {
      id: 'b5',
      title: "Jonivorlar Do'sti",
      icon: '🐾',
      desc: "Barcha jonivorlarning ovozini topgani uchun",
      unlocked: progress.completedLessons.some((id) => id.startsWith('hayvon_')),
    },
  ];

  const handlePrintCertificate = () => {
    soundManager.playVictory();
    window.print();
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-amber-200 dark:border-slate-700">
          Bolajon Yutuqlari
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
          Natijalar va Sertifikat 🎖️
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          O&apos;rganilgan bilimlar, to&apos;plangan yulduzlar va maxsus mukofotlar
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            ⭐ {progress.starsEarned}
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">
            Yulduzchalar
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-pink-500">
            📚 {progress.completedLessons.length}
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">
            Darslar
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-emerald-500">
            🎯 {progress.bestQuizScore || 10}
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">
            Ball
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-fun flex items-center gap-1.5">
          <Award className="w-4 h-4 text-pink-500" />
          Yutuq Nishonlari (Medallar)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition ${
                badge.unlocked
                  ? 'bg-amber-50/60 dark:bg-slate-800/80 border-amber-300 dark:border-slate-700'
                  : 'bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-50'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-2xl shadow-xs shrink-0">
                {badge.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                    {badge.title}
                  </h4>
                  {badge.unlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Official Preschool Certificate */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Rasmiy Ta&apos;lim Sertifikati:
          </h3>
          <button
            onClick={handlePrintCertificate}
            className="text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Chop etish / Saqlash</span>
          </button>
        </div>

        {/* Certificate Frame */}
        <div
          ref={certRef}
          className="bg-amber-50 text-slate-800 p-6 sm:p-8 rounded-3xl border-8 border-double border-amber-400 shadow-xl text-center space-y-4 relative overflow-hidden font-['Nunito',sans-serif]"
        >
          {/* Subtle decorative corners */}
          <div className="absolute top-2 left-2 text-2xl text-amber-500">🌟</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-500">🌟</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500">🌟</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500">🌟</div>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-amber-700 font-extrabold">
              O&apos;zbekiston Respublikasi Maktabgacha Ta&apos;lim Loyihasi
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-pink-600 font-fun mt-1 tracking-tight">
              BILIMDON SERTIFIKATI
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              Ushbu sertifikat quyidagi yosh bilimdonga beriladi:
            </p>
          </div>

          {/* Child's Name */}
          <div className="py-2 border-b-2 border-dashed border-amber-300 max-w-sm mx-auto">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-fun uppercase">
              {progress.childName}
            </h4>
            <span className="text-xs text-pink-600 font-bold">
              ({progress.selectedAge} yosh guruhi)
            </span>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
            &quot;Maktabgacha Ta&apos;lim&quot; dasturida ranglar, raqamlar, mevalar,
            sabzavotlar va hayvonlar bo&apos;yicha dars hamda didaktik o&apos;yinlarni
            muvaffaqiyatli yakunlab,{' '}
            <strong className="text-amber-700 font-black">
              {progress.starsEarned} ta oltin yulduz
            </strong>{' '}
            sohibi bo&apos;lgani tasdiqlanadi.
          </p>

          {/* Certificate Seal & Date */}
          <div className="pt-2 flex items-center justify-between max-w-sm mx-auto text-xs font-bold text-slate-600 border-t border-amber-200">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Sana: {today}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-700 font-black">
              <span>Muhr:</span>
              <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs font-black shadow-xs">
                🎖️
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
