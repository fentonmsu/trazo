import type { Exercise } from '../../engine/exercises';
import { ScriptGlyph } from '../ScriptGlyph';
import { ReplayButton } from './ReplayButton';

interface ReviewCardProps {
  exercise: Exercise;
  correct: boolean;
}

/** Read-only replay of a finished exercise, shown when stepping back with "Atrás". */
export function ReviewCard({ exercise, correct }: ReviewCardProps) {
  const target = exercise.type === 'draw' ? exercise.target : exercise.type === 'match' ? exercise.pairs[0] : exercise.prompt;

  return (
    <div className="exercise review-card">
      <p className={`review-status ${correct ? 'correct' : 'wrong'}`}>{correct ? '✓ Correcto' : '✗ Incorrecto'}</p>

      {exercise.type === 'match' ? (
        <>
          <p className="exercise-instruction">Ejercicio de emparejar</p>
          <div className="review-match-list">
            {exercise.pairs.map((p) => (
              <div key={p.id} className="review-match-item">
                <ScriptGlyph template={p} className="option-glyph" />
                <span>{p.romanization}</span>
                <ReplayButton template={p} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <ScriptGlyph template={target} className="exercise-prompt-glyph" />
          <div className="review-answer">
            <span>{target.romanization}</span>
            {target.meaning && <span className="exercise-prompt-meaning"> · {target.meaning}</span>}
            <ReplayButton template={target} />
          </div>
        </>
      )}
    </div>
  );
}
