import { useMemo, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import type { Lesson } from '../../data/lessons';
import { buildLessonExercises, type Exercise } from '../../engine/exercises';
import { ChoiceExercise } from './ChoiceExercise';
import { ListenExercise } from './ListenExercise';
import { MatchExercise } from './MatchExercise';
import { DrawExercise } from './DrawExercise';
import { ReviewCard } from './ReviewCard';

interface LessonRunnerProps {
  lesson: Lesson;
  languagePool: CharacterTemplate[];
  hearts: number;
  onExit: () => void;
  onLoseHeart: () => Promise<number>;
  onComplete: (stars: number, xpEarned: number) => void;
}

type Phase = 'running' | 'success' | 'failed';

interface HistoryEntry {
  exercise: Exercise;
  correct: boolean;
}

export function LessonRunner({ lesson, languagePool, hearts: initialHearts, onExit, onLoseHeart, onComplete }: LessonRunnerProps) {
  const exercises = useMemo(() => {
    const lessonCharacters = languagePool.filter((c) => lesson.characterIds.includes(c.id));
    return buildLessonExercises(lessonCharacters, languagePool);
  }, [lesson, languagePool]);

  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(initialHearts);
  const [phase, setPhase] = useState<Phase>('running');
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);

  // The current live exercise's own answered/correct state - separate from
  // `history`, which only gets a new entry once the person clicks Siguiente.
  const [liveAnswered, setLiveAnswered] = useState(false);
  const [liveCorrect, setLiveCorrect] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState(false);

  const finish = (finalCorrectCount: number, totalExercises: number) => {
    const accuracy = finalCorrectCount / totalExercises;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
    const xpEarned = 10 + stars * 5;
    setResult({ stars, xp: xpEarned });
    setPhase('success');
    onComplete(stars, xpEarned);
  };

  const handleAnswered = async (correct: boolean) => {
    setLiveAnswered(true);
    setLiveCorrect(correct);
    if (!correct) {
      const newHearts = await onLoseHeart();
      setHearts(newHearts);
      if (newHearts <= 0) setOutOfHearts(true);
    }
  };

  const handleMistake = async () => {
    const newHearts = await onLoseHeart();
    setHearts(newHearts);
    if (newHearts <= 0) setOutOfHearts(true);
  };

  const handleSiguiente = () => {
    if (reviewIndex !== null) {
      if (reviewIndex < history.length - 1) {
        setReviewIndex(reviewIndex + 1);
      } else {
        setReviewIndex(null);
      }
      return;
    }

    if (!liveAnswered) return;

    const newHistory = [...history, { exercise: exercises[index], correct: liveCorrect }];
    setHistory(newHistory);

    if (outOfHearts) {
      setPhase('failed');
      return;
    }

    if (index + 1 >= exercises.length) {
      finish(newHistory.filter((h) => h.correct).length, exercises.length);
    } else {
      setIndex((i) => i + 1);
      setLiveAnswered(false);
      setLiveCorrect(false);
    }
  };

  const handleAtras = () => {
    if (reviewIndex !== null) {
      if (reviewIndex > 0) setReviewIndex(reviewIndex - 1);
      return;
    }
    if (history.length > 0) setReviewIndex(history.length - 1);
  };

  if (phase === 'failed') {
    return (
      <div className="lesson-end">
        <h2>💔 Sin corazones</h2>
        <p>Se te acabaron los corazones por hoy. Volvé mañana para seguir con esta lección.</p>
        <button className="primary" onClick={onExit}>
          Volver
        </button>
      </div>
    );
  }

  if (phase === 'success' && result) {
    return (
      <div className="lesson-end">
        <h2>{'⭐'.repeat(result.stars)}</h2>
        <p>¡Lección completada!</p>
        <p className="lesson-end-xp">+{result.xp} XP</p>
        <button className="primary" onClick={onExit}>
          Continuar
        </button>
      </div>
    );
  }

  const current = exercises[index];
  const canGoBack = reviewIndex !== null ? reviewIndex > 0 : history.length > 0;
  const canGoNext = reviewIndex !== null || liveAnswered;

  return (
    <div className="lesson-runner">
      <div className="lesson-header">
        <button className="lesson-exit" onClick={onExit} aria-label="Salir de la lección">
          ✕
        </button>
        <div className="lesson-progress-bar">
          <div className="lesson-progress-fill" style={{ width: `${(index / exercises.length) * 100}%` }} />
        </div>
        <span className="lesson-hearts">{'❤️'.repeat(hearts)}</span>
      </div>

      {reviewIndex !== null ? (
        <ReviewCard exercise={history[reviewIndex].exercise} correct={history[reviewIndex].correct} />
      ) : (
        <>
          {current.type === 'choose-sound' && (
            <ChoiceExercise mode="choose-sound" prompt={current.prompt} options={current.options} onAnswered={handleAnswered} />
          )}
          {current.type === 'choose-char' && (
            <ChoiceExercise mode="choose-char" prompt={current.prompt} options={current.options} onAnswered={handleAnswered} />
          )}
          {current.type === 'listen' && (
            <ListenExercise prompt={current.prompt} options={current.options} onAnswered={handleAnswered} />
          )}
          {current.type === 'match' && (
            <MatchExercise pairs={current.pairs} onAnswered={handleAnswered} onMistake={handleMistake} />
          )}
          {current.type === 'draw' && <DrawExercise target={current.target} onAnswered={handleAnswered} />}
        </>
      )}

      <div className="lesson-nav">
        <button className="lesson-nav-button" onClick={handleAtras} disabled={!canGoBack}>
          ← Atrás
        </button>
        <button className="lesson-nav-button primary" onClick={handleSiguiente} disabled={!canGoNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
