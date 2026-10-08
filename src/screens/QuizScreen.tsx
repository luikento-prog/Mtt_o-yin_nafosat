import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  RotateCcw,
  Star,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/preschoolData';
import { QuizQuestion, UserProgress } from '../types';
import { soundManager } from '../utils/audio';

interface QuizScreenProps {
  progress: UserProgress;
  onQuizComplete: (score: number, total: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  progress,
  onQuizComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ question: string; isCorrect: boolean; correctText: string }[]>([]);

  // Filter questions for the user's selected age, or fallback to all
  const questions: QuizQuestion[] = useMemo(() => {
    const matched = QUIZ_QUESTIONS.filter((q) => q.ageGroup === progress.selectedAge);
    return matched.length > 0 ? matched : QUIZ_QUESTIONS.slice(0, 5);
  }, [progress.selectedAge]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return; // Prevent double submission
    soundManager.playPop();
    setSelectedOptionIndex(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    const correctOpt = currentQ.options.find((o) => o.isCorrect)?.text || '';

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ.question,
        isCorrect,
        correctText: correctOpt,
      },
    ]);

    if (isCorrect) {
      soundManager.playCorrect();
      setUserScore((s) => s + 1);
      try {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playPop();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished
      setIsFinished(true);
      soundManager.playVictory();
      onQuizComplete(userScore, questions.length);
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setIsFinished(false);
    setUserAnswers([]);
  };

  const percentage = Math.round((userScore / (questions.length || 1)) * 100);

  return (
    <div className="flex-1 p-3.5 sm:p-5 space-y-4 max-w-2xl mx-auto w-full">
      {/* Title */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-amber-200 dark:border-slate-700">
          Bilimdonlar Viktorinasi
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
          Bilimingizni Sinab Ko&apos;ring! 🏆
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {progress.selectedAge} yosh guruhi uchun maxsus moslashtirilgan savollar
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-amber-200/80 dark:border-slate-800 shadow-xl space-y-5">
          {/* Progress Bar & Question Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black text-slate-600 dark:text-slate-300">
              <span>
                Savol: {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {userScore} to&apos;g&apos;ri
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-amber-50/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-center space-y-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-fun">
              {currentQ.question}
            </h3>
            <button
              onClick={() => soundManager.speakUzbek(currentQ.question)}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>🔊 Savolni eshitish</span>
            </button>
          </div>

          {/* Answer Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let btnStyle =
                'bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-pink-400';

              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  btnStyle =
                    'bg-emerald-500 text-white border-emerald-600 shadow-md font-black';
                } else if (isSelected && !option.isCorrect) {
                  btnStyle =
                    'bg-rose-500 text-white border-rose-600 shadow-md font-black';
                } else {
                  btnStyle =
                    'bg-slate-100 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-150 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold active:scale-[0.99] ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    {option.emoji && (
                      <span className="text-2xl sm:text-3xl">{option.emoji}</span>
                    )}
                    <span>{option.text}</span>
                  </div>

                  {isAnswerSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                  {isAnswerSubmitted && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Explanation Feedback */}
          {isAnswerSubmitted && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 space-y-2 animate-fade-in">
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                💡 <span className="font-black">Izoh:</span> {currentQ.explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <span>
                  {currentIndex < questions.length - 1
                    ? 'Keyingi savol'
                    : 'Natijani ko‘rish'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-800 shadow-xl text-center space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-slate-800 flex items-center justify-center text-4xl shadow-inner animate-bounce">
            {percentage >= 70 ? '🎉' : '👏'}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-fun">
              {percentage >= 70
                ? 'Ofarin, Kichik Bilimdon!'
                : 'Yaxshi harakat, do‘stim!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {percentage >= 70
                ? 'Siz savollarga ajoyib javob berdingiz va yangi yulduzchalarga ega bo‘ldingiz!'
                : 'Darslarni yana bir bor takrorlab, yana urinib ko‘ring!'}
            </p>
          </div>

          {/* Score Summary Box */}
          <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-lg font-black text-emerald-600">
                {userScore}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                To&apos;g&apos;ri
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-lg font-black text-rose-600">
                {questions.length - userScore}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                Noto&apos;g&apos;ri
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-lg font-black text-amber-600">
                {percentage}%
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                Ko&apos;rsatkich
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="text-left space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            <h4 className="text-xs font-black text-slate-700 dark:text-slate-300">
              Javoblar tahlili:
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {userAnswers.map((ans, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between gap-2"
                >
                  <span className="truncate text-slate-800 dark:text-slate-200">
                    {ans.question}
                  </span>
                  {ans.isCorrect ? (
                    <span className="text-emerald-600 font-bold text-[11px] shrink-0">
                      ✓ To&apos;g&apos;ri
                    </span>
                  ) : (
                    <span className="text-rose-500 font-bold text-[11px] shrink-0">
                      ✗ ({ans.correctText})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qaytadan topshirish</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
