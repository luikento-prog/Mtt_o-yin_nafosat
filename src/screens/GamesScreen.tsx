import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  ChevronLeft,
  Star,
} from 'lucide-react';
import { DIDACTIC_GAMES } from '../data/preschoolData';
import { DidacticGame, UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface GamesScreenProps {
  progress: UserProgress;
  onAwardStars: (count: number) => void;
}

export const GamesScreen: React.FC<GamesScreenProps> = ({
  progress,
  onAwardStars,
}) => {
  const [selectedGame, setSelectedGame] = useState<DidacticGame | null>(null);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(1);
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);

  // --- GAME 1: RANGNI TOP DATA ---
  const COLOR_ROUNDS = [
    { targetColor: 'Qizil', colorHex: '#EF4444', options: [{ emoji: '🍎', name: 'Olma', correct: true }, { emoji: '🥒', name: 'Bodring', correct: false }, { emoji: '🍌', name: 'Banan', correct: false }] },
    { targetColor: 'Sariq', colorHex: '#FBBF24', options: [{ emoji: '🍇', name: 'Uzum', correct: false }, { emoji: '☀️', name: 'Quyosh', correct: true }, { emoji: '🥦', name: 'Brokkoli', correct: false }] },
    { targetColor: 'Yashil', colorHex: '#10B981', options: [{ emoji: '🥒', name: 'Bodring', correct: true }, { emoji: '🍓', name: 'Qulupnay', correct: false }, { emoji: '🍊', name: 'Apelsin', correct: false }] },
    { targetColor: 'Moviy (Ko‘k)', colorHex: '#3B82F6', options: [{ emoji: '🍅', name: 'Pomidor', correct: false }, { emoji: '🫐', name: 'Qorag‘at', correct: true }, { emoji: '🌽', name: 'Makkajo‘xori', correct: false }] },
    { targetColor: 'Sabzirang (To‘q sariq)', colorHex: '#F97316', options: [{ emoji: '🥕', name: 'Sabzi', correct: true }, { emoji: '🍆', name: 'Baqlajon', correct: false }, { emoji: '🍏', name: 'Olma', correct: false }] },
  ];

  // --- GAME 2: NECHTA MEVA BOR DATA ---
  const COUNT_ROUNDS = [
    { count: 3, itemEmoji: '🍎', options: [2, 3, 4] },
    { count: 5, itemEmoji: '🍌', options: [4, 5, 6] },
    { count: 2, itemEmoji: '🥕', options: [1, 2, 3] },
    { count: 4, itemEmoji: '🍓', options: [3, 4, 5] },
    { count: 6, itemEmoji: '⭐', options: [5, 6, 7] },
  ];

  // --- GAME 3: MEVA YOKI SABZAVOT DATA ---
  const SORT_ITEMS = [
    { name: 'Olma', emoji: '🍎', type: 'meva' },
    { name: 'Sabzi', emoji: '🥕', type: 'sabzavot' },
    { name: 'Bodring', emoji: '🥒', type: 'sabzavot' },
    { name: 'Nok', emoji: '🍐', type: 'meva' },
    { name: 'Pomidor', emoji: '🍅', type: 'sabzavot' },
    { name: 'Banan', emoji: '🍌', type: 'meva' },
    { name: 'Kartoshka', emoji: '🥔', type: 'sabzavot' },
    { name: 'Qulupnay', emoji: '🍓', type: 'meva' },
  ];

  // --- GAME 4: KIMNING OVOZI DATA ---
  const ANIMAL_ROUNDS = [
    { soundText: 'Miyov-miyov!', soundType: 'mushuk', question: 'Kim "Miyov-miyov" deydi?', options: [{ emoji: '🐱', name: 'Mushukcha', correct: true }, { emoji: '🐶', name: 'Kuchukcha', correct: false }, { emoji: '🐮', name: 'Sigir', correct: false }] },
    { soundText: 'Vov-vov!', soundType: 'kuchuk', question: 'Kim "Vov-vov" deb uyni qo‘riqlaydi?', options: [{ emoji: '🐺', name: 'Bo‘ri', correct: false }, { emoji: '🐶', name: 'Kuchukcha', correct: true }, { emoji: '🐱', name: 'Mushukcha', correct: false }] },
    { soundText: 'Moo-moo!', soundType: 'sigir', question: 'Bizga oppoq sut beradigan jonivor kim?', options: [{ emoji: '🐮', name: 'Sigir', correct: true }, { emoji: '🐑', name: 'Qo‘y', correct: false }, { emoji: '🐴', name: 'Ot', correct: false }] },
    { soundText: 'Roar!', soundType: 'sher', question: 'Hayvonlar qiroli qaysi?', options: [{ emoji: '🐻', name: 'Ayiq', correct: false }, { emoji: '🦁', name: 'Sher', correct: true }, { emoji: '🦊', name: 'Tulki', correct: false }] },
  ];

  // Reset state when entering game
  const handleStartGame = (game: DidacticGame) => {
    soundManager.playPop();
    setSelectedGame(game);
    setScore(0);
    setGameRound(0);
    setFeedback(null);
  };

  const handleCorrect = () => {
    soundManager.playCorrect();
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    setScore((s) => s + 1);
    setFeedback({ text: 'Ofarin! To‘g‘ri topdingiz! 🌟', correct: true });
    onAwardStars(1);

    setTimeout(() => {
      setFeedback(null);
      setGameRound((r) => r + 1);
    }, 1200);
  };

  const handleWrong = () => {
    soundManager.playWrong();
    setFeedback({ text: 'Qaytadan urinib ko‘ring! 💡', correct: false });
    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-4xl mx-auto w-full">
      {/* Game Selection Hub or Active Game */}
      {!selectedGame ? (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-950/70 px-3 py-1 rounded-full border border-pink-200 dark:border-pink-900">
              Didaktik O&apos;yinlar Maydonchasi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
              Qiziqarli Bolalar O&apos;yinlari 🎮
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Ranglar, hisoblash, saralash va jonivorlarni o&apos;rganish uchun qiziqarli mashg&apos;ulotlar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {DIDACTIC_GAMES.map((game) => (
              <div
                key={game.id}
                onClick={() => handleStartGame(game)}
                className="cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/80 dark:border-slate-800 hover:border-pink-400 shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${game.color}20` }}
                  >
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-pink-600 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-bold bg-amber-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        ⭐ 1 yulduz / to&apos;g&apos;ri javob
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Active Game Arena */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-amber-200/80 dark:border-slate-800 shadow-xl space-y-4 relative">
          {/* Top Bar of Game */}
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-slate-800 pb-3">
            <button
              onClick={() => {
                soundManager.playPop();
                setSelectedGame(null);
              }}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chiqish</span>
            </button>

            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-fun">
              {selectedGame.title}
            </h3>

            <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-slate-800 px-3 py-1 rounded-xl text-xs font-black text-amber-800 dark:text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Ball: {score}</span>
            </div>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-3 rounded-2xl text-center text-xs sm:text-sm font-black animate-pop ${
                feedback.correct
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {/* GAME 1: RANGNI TOP */}
          {selectedGame.type === 'color_match' && (
            <div className="space-y-6 text-center py-2">
              {gameRound < COLOR_ROUNDS.length ? (
                <>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      {gameRound + 1}-bosqich ({COLOR_ROUNDS.length} tadan)
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                      Qaysi rasm{' '}
                      <span
                        className="px-2 py-0.5 rounded-lg text-white font-black"
                        style={{
                          backgroundColor: COLOR_ROUNDS[gameRound].colorHex,
                        }}
                      >
                        {COLOR_ROUNDS[gameRound].targetColor}
                      </span>{' '}
                      rangda?
                    </h4>
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                    {COLOR_ROUNDS[gameRound].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => (opt.correct ? handleCorrect() : handleWrong())}
                        className="p-4 sm:p-5 rounded-3xl bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 hover:border-pink-500 hover:scale-105 active:scale-95 transition flex flex-col items-center gap-2 shadow-sm"
                      >
                        <span className="text-4xl sm:text-5xl">{opt.emoji}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {opt.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-6">
                  <div className="text-6xl animate-bounce">🏆</div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white font-fun">
                    Ajoyib! O&apos;yin muvaffaqiyatli tugadi!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Siz barcha ranglarni to&apos;g&apos;ri aniqladingiz va {score} ball to&apos;pladingiz!
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playVictory();
                      setGameRound(0);
                      setScore(0);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-md"
                  >
                    Qaytadan o&apos;ynash 🔄
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: NECHTA MEVA BOR (COUNTING) */}
          {selectedGame.type === 'counting' && (
            <div className="space-y-6 text-center py-2">
              {gameRound < COUNT_ROUNDS.length ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      {gameRound + 1}-bosqich ({COUNT_ROUNDS.length} tadan)
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                      Ekranda nechta buyum bor? Sanang:
                    </h4>
                  </div>

                  {/* Display items in a bouncy bubble */}
                  <div className="min-h-32 bg-amber-50/70 dark:bg-slate-800/60 rounded-3xl p-6 flex flex-wrap items-center justify-center gap-3 border border-amber-200/50 dark:border-slate-700 max-w-sm mx-auto shadow-inner">
                    {Array.from({ length: COUNT_ROUNDS[gameRound].count }).map((_, idx) => (
                      <span
                        key={idx}
                        className="text-4xl sm:text-5xl animate-pop select-none transform hover:scale-125 transition"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {COUNT_ROUNDS[gameRound].itemEmoji}
                      </span>
                    ))}
                  </div>

                  {/* Number choices */}
                  <div className="flex items-center justify-center gap-3">
                    {COUNT_ROUNDS[gameRound].options.map((num) => (
                      <button
                        key={num}
                        onClick={() =>
                          num === COUNT_ROUNDS[gameRound].count
                            ? handleCorrect()
                            : handleWrong()
                        }
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 active:scale-95 text-white font-black text-2xl sm:text-3xl shadow-lg flex items-center justify-center transition"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-6">
                  <div className="text-6xl animate-bounce">🌟</div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white font-fun">
                    Hisoblash bo&apos;yicha mutaxassis!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Siz barcha raqamlarni to&apos;g&apos;ri sanadingiz!
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playVictory();
                      setGameRound(0);
                      setScore(0);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-md"
                  >
                    Qaytadan o&apos;ynash 🔄
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 3: MEVA YOKI SABZAVOT (SORTING BASKET) */}
          {selectedGame.type === 'fruit_veg_sort' && (
            <div className="space-y-6 text-center py-2">
              {gameRound < SORT_ITEMS.length ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      {gameRound + 1}-bosqich ({SORT_ITEMS.length} tadan)
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                      Ushbu mahsulotni to&apos;g&apos;ri savatga joylang:
                    </h4>
                  </div>

                  {/* Current floating item */}
                  <div className="w-28 h-28 mx-auto rounded-3xl bg-amber-100 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 flex flex-col items-center justify-center shadow-lg animate-wiggle">
                    <span className="text-5xl">{SORT_ITEMS[gameRound].emoji}</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                      {SORT_ITEMS[gameRound].name}
                    </span>
                  </div>

                  {/* Two Baskets */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto pt-2">
                    <button
                      onClick={() =>
                        SORT_ITEMS[gameRound].type === 'meva'
                          ? handleCorrect()
                          : handleWrong()
                      }
                      className="p-4 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg hover:scale-105 active:scale-95 transition flex flex-col items-center gap-1.5"
                    >
                      <span className="text-3xl">🍎</span>
                      <span className="text-sm font-black font-fun">
                        Mevalar Savati
                      </span>
                      <span className="text-[10px] text-rose-100">
                        Daraxt va butalarda pishadi
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        SORT_ITEMS[gameRound].type === 'sabzavot'
                          ? handleCorrect()
                          : handleWrong()
                      }
                      className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg hover:scale-105 active:scale-95 transition flex flex-col items-center gap-1.5"
                    >
                      <span className="text-3xl">🥕</span>
                      <span className="text-sm font-black font-fun">
                        Sabzavotlar Savati
                      </span>
                      <span className="text-[10px] text-emerald-100">
                        Poliz va yerda yetiladi
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-6">
                  <div className="text-6xl animate-bounce">🧺</div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white font-fun">
                    Savatchalar to&apos;ldi!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Siz barcha meva va sabzavotlarni adashmasdan saraladingiz!
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playVictory();
                      setGameRound(0);
                      setScore(0);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-md"
                  >
                    Qaytadan o&apos;ynash 🔄
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 4: KIMNING OVOZI */}
          {selectedGame.type === 'animal_guess' && (
            <div className="space-y-6 text-center py-2">
              {gameRound < ANIMAL_ROUNDS.length ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      {gameRound + 1}-bosqich ({ANIMAL_ROUNDS.length} tadan)
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                      {ANIMAL_ROUNDS[gameRound].question}
                    </h4>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        soundManager.playAnimalSound(
                          ANIMAL_ROUNDS[gameRound].soundType
                        )
                      }
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition"
                    >
                      <span>🔊 Ovozni eshiting: &quot;{ANIMAL_ROUNDS[gameRound].soundText}&quot;</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                    {ANIMAL_ROUNDS[gameRound].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => (opt.correct ? handleCorrect() : handleWrong())}
                        className="p-4 rounded-3xl bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 hover:border-amber-500 hover:scale-105 active:scale-95 transition flex flex-col items-center gap-2 shadow-sm"
                      >
                        <span className="text-4xl">{opt.emoji}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {opt.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-6">
                  <div className="text-6xl animate-bounce">🐾</div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white font-fun">
                    Zoologiya ustasi!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Siz barcha jonivorlarning ovozini topdingiz!
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playVictory();
                      setGameRound(0);
                      setScore(0);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-2xl font-black text-sm shadow-md"
                  >
                    Qaytadan o&apos;ynash 🔄
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 5: SHAKL VA SOYA */}
          {selectedGame.type === 'shadow_match' && (
            <div className="space-y-6 text-center py-2">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                  Ushbu soyaga qaysi meva mos keladi? 👤
                </h4>
              </div>

              {/* Shadow outline */}
              <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-5xl text-slate-900/40 shadow-inner">
                🍎
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {[
                  { emoji: '🍌', correct: false },
                  { emoji: '🍎', correct: true },
                  { emoji: '🍇', correct: false },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => (item.correct ? handleCorrect() : handleWrong())}
                    className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition text-4xl"
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
