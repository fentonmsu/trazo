import { useRef, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';
import { ReplayButton } from './ReplayButton';
import { DrawingCanvas, type DrawingCanvasHandle } from '../DrawingCanvas';
import { scoreDrawing } from '../../engine/recognizer';
import { useI18n } from '../../i18n/I18nContext';

const PASS_THRESHOLD = 50;

interface DrawExerciseProps {
  target: CharacterTemplate;
  onAnswered: (correct: boolean) => void;
}

export function DrawExercise({ target, onAnswered }: DrawExerciseProps) {
  const { t } = useI18n();
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleCheck = () => {
    const strokes = canvasRef.current?.getStrokes() ?? [];
    const result = scoreDrawing(strokes, target);
    setScore(result.score);
    onAnswered(result.score >= PASS_THRESHOLD);
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">{t('exercise.drawInstruction')}</p>
      <div className="draw-exercise-target">
        <ScriptGlyph template={target} className="exercise-prompt-glyph small" />
        <span>{target.romanization}</span>
        <ReplayButton template={target} />
      </div>

      <div className="canvas-wrap">
        <DrawingCanvas ref={canvasRef} size={260} guideStrokes={target.strokes} />
      </div>

      {score === null ? (
        <button className="primary" onClick={handleCheck}>
          {t('common.check')}
        </button>
      ) : (
        <p className={`draw-exercise-result ${score >= PASS_THRESHOLD ? 'correct' : 'wrong'}`}>{score}%</p>
      )}
    </div>
  );
}
