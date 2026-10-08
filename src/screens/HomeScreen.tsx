import React from 'react';
import { Sparkles, Trophy, Play, Star, CheckCircle, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/preschoolData';
import { AgeGroup, CategoryId, UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface HomeScreenProps {
  progress: UserProgress;
  onSelectAge: (age: AgeGroup) => void;
  onOpenCategory: (catId: CategoryId) => void;
  onNavigateTab: (tab: 'lessons' | 'games' | 'quiz' | 'results' | 'settings') => void;
}

const AGE_LABELS: Record<AgeGroup, { title: string; subtitle: string; icon: string }> = {
  '3-4': { title: '3-4 yosh', subtitle: 'Kichik guruh', icon: '🐣' },
  '4-5': { title: '4-5 yosh', subtitle: "O'rta guruh", icon: '🐥' },
  '5-6': { title: '5-6 yosh', subtitle: 'Katta guruh', icon: '🦁' },
  '6-7': { title: '6-7 yosh', subtitle: 'Tayyorlov guruhi', icon: '🎓' },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onSelectAge,
  onOpenCategory,
  onNavigateTab,
}) => {
  const handleAgeChange = (age: AgeGroup) => {
    soundManager.playPop();
    onSelectAge(age);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-3xl mx-auto w-full">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 p-4 sm:p-5 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-7xl sm:text-8xl opacity-30 select-none">
          🎨
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              Bog&apos;cha va Oila Ta&apos;limi
            </span>
            <div className="flex items-center gap-1.5 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black shadow-inner">
              <Star className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>{progress.starsEarned} Yulduzcha</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm font-fun">
            Salom, {progress.childName}! 👋
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 max-w-sm font-medium">
            Bugun qaysi qiziqarli dars yoki didaktik o&apos;yinni o&apos;rganamiz?
          </p>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <button
              onClick={() => {
                soundManager.playPop();
                onNavigateTab('games');
              }}
              className="bg-white text-pink-600 hover:bg-pink-50 active:scale-95 transition px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-pink-600" />
              O&apos;yinlarni Boshlash
            </button>
            <button
              onClick={() => {
                soundManager.playPop();
                onNavigateTab('quiz');
              }}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1 transition"
            >
              <Trophy className="w-3.5 h-3.5" />
              Viktorina
            </button>
          </div>
        </div>
      </div>

      {/* Age Selector Carousel */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Bolaning Yoshi:
          </h3>
          <span className="text-[11px] text-pink-600 dark:text-pink-400 font-bold">
            {AGE_LABELS[progress.selectedAge].subtitle}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(AGE_LABELS) as AgeGroup[]).map((age) => {
            const isSelected = progress.selectedAge === age;
            return (
              <button
                key={age}
                onClick={() => handleAgeChange(age)}
                className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-200 border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-amber-200/70 dark:border-slate-800 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl">{AGE_LABELS[age].icon}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <div className="mt-2">
                  <div className="text-xs sm:text-sm font-black leading-tight">
                    {AGE_LABELS[age].title}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-pink-100' : 'text-slate-400'
                    }`}
                  >
                    {AGE_LABELS[age].subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Hero Didactic Challenge of the Day */}
      <div
        onClick={() => {
          soundManager.playPop();
          onNavigateTab('games');
        }}
        className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-4 text-white shadow-md flex items-center justify-between gap-3 transform hover:scale-[1.01] active:scale-[0.99] transition"
      >
        <div className="space-y-1">
          <span className="bg-emerald-700/60 text-emerald-100 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
            Didaktik O&apos;yin
          </span>
          <h4 className="text-base sm:text-lg font-black font-fun">
            Meva yoki Sabzavot? Savatga yig&apos;amiz! 🧺
          </h4>
          <p className="text-xs text-emerald-100 max-w-sm">
            Sabzi, olma, bodring va bananni o&apos;z savatchasiga to&apos;g&apos;ri joylashtirib yulduz yuting!
          </p>
        </div>
        <div className="text-4xl sm:text-5xl shrink-0 animate-bounce">
          🥕
        </div>
      </div>

      {/* Subject Categories */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            O&apos;quv Bo&apos;limlari:
          </h3>
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigateTab('lessons');
            }}
            className="text-xs text-pink-600 dark:text-pink-400 font-bold hover:underline flex items-center gap-0.5"
          >
            Barchasini ko&apos;rish
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playPop();
                onOpenCategory(cat.id);
              }}
              className="w-full text-left bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-amber-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group flex items-center gap-3.5"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                    {cat.lessonCount} dars
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Progress & Achievements Banner */}
      <div className="bg-amber-100/70 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-xl font-black shadow-sm">
            🏆
          </div>
          <div>
            <h5 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
              O&apos;rganilgan darslar: {progress.completedLessons.length} ta
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sertifikat olish uchun dars va o&apos;yinlarni to&apos;ldiring!
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            soundManager.playPop();
            onNavigateTab('results');
          }}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-sm transition active:scale-95"
        >
          Yutuqlar
        </button>
      </div>
    </div>
  );
};
