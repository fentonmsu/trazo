import { useMemo, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import type { Lesson } from '../../data/lessons';
import { buildLessonExercises } from '../../engine/exercises';
import { ChoiceExercise } from './ChoiceExercise';
import { ListenExercise } from './ListenExercise';
import { MatchExercise } from './MatchExercise';
import { DrawExercise } from './DrawExercise';

interface LessonRunnerProps {
  lesson: Lesson;
  languagePool: CharacterTemplate[];
  hearts: number;
  onExit: () => void;
  onLoseHeart: () => Promise<number>;
  onComplete: (stars: number, xpEarned: number) => void;
}

type Phase = 'running' | 'success' | 'failed';

export function LessonRunner({ lesson, languagePool, hearts: initialHearts, onExit, onLoseHeart, onComplete }: LessonRunnerProps) {
  const exercises = useMemo(() => {
    const lessonCharacters = languagePool.filter((c) => lesson.characterIds.includes(c.id));
    return buildLessonExercises(lessonCharacters, languagePool);
  }, [lesson, languagePool]);

  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(initialHearts);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('running');
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);

  const finish = (finalCorrectCount: number) => {
    const accuracy = finalCorrectCount / exercises.length;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
    const xpEarned = 10 + stars * 5;
    setResult({ stars, xp: xpEarned });
    setPhase('success');
    onComplete(stars, xpEarned);
  };

  const handleAnswer = async (correct: boolean) => {
    const newCorrectCount = correct ? correctCount + 1 : correctCount;
    if (correct) setCorrectCount(newCorrectCount);

    if (!correct) {
      const newHearts = await onLoseHeart();
      setHearts(newHearts);
      if (newHearts <= 0) {
        setPhase('failed');
        return;
      }
    }

    if (index + 1 >= exercises.length) {
      finish(newCorrectCount);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleMistake = async () => {
    const newHearts = await onLoseHeart();
    setHearts(newHearts);
    if (newHearts <= 0) setPhase('failed');
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

      {current.type === 'choose-sound' && (
        <ChoiceExercise mode="choose-sound" prompt={current.prompt} options={current.options} onAnswer={handleAnswer} />
      )}
      {current.type === 'choose-char' && (
        <ChoiceExercise mode="choose-char" prompt={current.prompt} options={current.options} onAnswer={handleAnswer} />
      )}
      {current.type === 'listen' && (
        <ListenExercise prompt={current.prompt} options={current.options} onAnswer={handleAnswer} />
      )}
      {current.type === 'match' && (
        <MatchExercise pairs={current.pairs} onAnswer={handleAnswer} onMistake={handleMistake} />
      )}
      {current.type === 'draw' && <DrawExercise target={current.target} onAnswer={handleAnswer} />}
    </div>
  );
}
