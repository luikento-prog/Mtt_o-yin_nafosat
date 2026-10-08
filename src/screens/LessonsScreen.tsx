import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  CheckCircle2,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { CATEGORIES, LESSONS } from '../data/preschoolData';
import { AgeGroup, CategoryId, LessonItem, UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface LessonsScreenProps {
  progress: UserProgress;
  selectedCategory: CategoryId | null;
  onSelectCategory: (cat: CategoryId | null) => void;
  onCompleteLesson: (lessonId: string) => void;
}

export const LessonsScreen: React.FC<LessonsScreenProps> = ({
  progress,
  selectedCategory,
  onSelectCategory,
  onCompleteLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState<LessonItem | null>(null);

  // Filter lessons based on category and search query
  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      const matchesCat = !selectedCategory || lesson.categoryId === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        lesson.name.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        (lesson.nameEn && lesson.nameEn.toLowerCase().includes(query));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenLesson = (lesson: LessonItem) => {
    soundManager.playPop();
    setActiveLesson(lesson);
    soundManager.speakUzbek(lesson.audioText);
    if (lesson.soundType) {
      soundManager.playAnimalSound(lesson.soundType);
    }
  };

  const handleSpeak = (text: string, soundType?: string) => {
    soundManager.playPop();
    soundManager.speakUzbek(text);
    if (soundType) {
      setTimeout(() => soundManager.playAnimalSound(soundType), 500);
    }
  };

  const handleMarkCompleted = (lessonId: string) => {
    soundManager.playCorrect();
    onCompleteLesson(lessonId);
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    const currentIndex = filteredLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex >= 0 && currentIndex < filteredLessons.length - 1) {
      const next = filteredLessons[currentIndex + 1];
      setActiveLesson(next);
      handleSpeak(next.audioText, next.soundType);
    }
  };

  const handlePrevLesson = () => {
    if (!activeLesson) return;
    const currentIndex = filteredLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex > 0) {
      const prev = filteredLessons[currentIndex - 1];
      setActiveLesson(prev);
      handleSpeak(prev.audioText, prev.soundType);
    }
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-4xl mx-auto w-full">
      {/* Header & Search */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
              Ta&apos;limiy Darslar 📚
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranglar, raqamlar, mevalar, sabzavotlar va hayvonlarni o&apos;rganing
            </p>
          </div>
          <div className="text-xs font-bold bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full border border-pink-300/60">
            {progress.completedLessons.length} / {LESSONS.length} o&apos;rganildi
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Dars yoki narsani qidiring (masalan: olma, sariq, 5)..."
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectCategory(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
              selectedCategory === null
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-amber-200/60 dark:border-slate-800 hover:border-pink-300'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Barchasi</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playPop();
                  onSelectCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-amber-200/60 dark:border-slate-800 hover:border-pink-300'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : undefined,
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Flashcards Grid */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-dashed border-amber-300 dark:border-slate-800 space-y-2">
          <div className="text-4xl">🔍</div>
          <h4 className="text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200">
            Hech qanday dars topilmadi
          </h4>
          <p className="text-xs text-slate-400">
            Iltimos, boshqa so&apos;z kiriting yoki barcha toifalarni tanlang.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory(null);
            }}
            className="mt-2 text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
          >
            Filtrni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {filteredLessons.map((lesson) => {
            const isDone = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => handleOpenLesson(lesson)}
                className="cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-amber-200/80 dark:border-slate-800 hover:border-pink-400 shadow-sm hover:shadow-md transition-all duration-200 relative group flex flex-col justify-between"
              >
                {/* Completed badge */}
                {isDone && (
                  <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Visual Icon */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform mb-2"
                  style={{
                    backgroundColor: lesson.colorHex
                      ? `${lesson.colorHex}25`
                      : '#F3F4F6',
                  }}
                >
                  {lesson.visualEmoji}
                </div>

                {/* Info */}
                <div className="text-center space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">
                    {lesson.name}
                  </h3>
                  {lesson.phoneticUz && (
                    <div className="text-[10px] text-pink-600 dark:text-pink-400 font-bold">
                      [{lesson.phoneticUz}]
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {lesson.description}
                  </p>
                </div>

                {/* Play Audio Button */}
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {lesson.minAge} yosh
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(lesson.audioText, lesson.soundType);
                    }}
                    title="Eshiting"
                    className="p-1 rounded-lg text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-800 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lesson Detail Interactive Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div
              className="p-4 sm:p-5 text-white flex items-center justify-between relative overflow-hidden"
              style={{
                backgroundColor: activeLesson.colorHex || '#EC4899',
              }}
            >
              <div className="relative z-10">
                <span className="bg-white/25 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  Dars Mashg&apos;uloti
                </span>
                <h3 className="text-lg sm:text-xl font-black mt-1 font-fun drop-shadow-sm">
                  {activeLesson.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="relative z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Big Visual & Audio Speak */}
              <div className="text-center space-y-2">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl flex items-center justify-center text-5xl sm:text-6xl shadow-inner border-4 border-amber-100 dark:border-slate-800 animate-pop"
                  style={{
                    backgroundColor: activeLesson.colorHex
                      ? `${activeLesson.colorHex}25`
                      : '#FEF3C7',
                  }}
                >
                  {activeLesson.visualEmoji}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      handleSpeak(activeLesson.audioText, activeLesson.soundType)
                    }
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md shadow-pink-500/25 active:scale-95 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Ovozni tinglash 🔊</span>
                  </button>

                  {activeLesson.soundType && (
                    <button
                      onClick={() =>
                        soundManager.playAnimalSound(activeLesson.soundType!)
                      }
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-3.5 py-2 rounded-2xl text-xs font-black shadow-md active:scale-95 transition"
                    >
                      🐾 Ovoz ber!
                    </button>
                  )}
                </div>
              </div>

              {/* Description & Fun Fact */}
              <div className="bg-amber-50/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-slate-700/60 space-y-1.5 text-xs sm:text-sm">
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  {activeLesson.description}
                </p>
                <div className="text-pink-600 dark:text-pink-400 font-bold flex items-center gap-1 text-[11px] sm:text-xs pt-1 border-t border-amber-200/40 dark:border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Qiziqarli fakt: {activeLesson.funFact}</span>
                </div>
              </div>

              {/* Examples */}
              {activeLesson.exampleItems && activeLesson.exampleItems.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Misollar va Hayotdagi narsalar:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLesson.exampleItems.map((ex, i) => (
                      <span
                        key={i}
                        className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevLesson}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition"
                  title="Oldingi dars"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextLesson}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition"
                  title="Keyingi dars"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => handleMarkCompleted(activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md transition ${
                  progress.completedLessons.includes(activeLesson.id)
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {progress.completedLessons.includes(activeLesson.id)
                    ? "O'rganilgan (+1 ⭐)"
                    : "O'rgandim (+1 ⭐)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
