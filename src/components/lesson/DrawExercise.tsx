import { useRef, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';
import { DrawingCanvas, type DrawingCanvasHandle } from '../DrawingCanvas';
import { scoreDrawing } from '../../engine/recognizer';

const PASS_THRESHOLD = 50;

interface DrawExerciseProps {
  target: CharacterTemplate;
  onAnswer: (correct: boolean) => void;
}

export function DrawExercise({ target, onAnswer }: DrawExerciseProps) {
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleCheck = () => {
    const strokes = canvasRef.current?.getStrokes() ?? [];
    const result = scoreDrawing(strokes, target);
    setScore(result.score);
  };

  const handleContinue = () => {
    if (score === null) return;
    onAnswer(score >= PASS_THRESHOLD);
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">Dibuja este carácter</p>
      <div className="draw-exercise-target">
        <ScriptGlyph template={target} className="exercise-prompt-glyph small" />
        <span>{target.romanization}</span>
      </div>

      <div className="canvas-wrap">
        <DrawingCanvas ref={canvasRef} size={260} guideStrokes={target.strokes} />
      </div>

      {score === null ? (
        <button className="primary" onClick={handleCheck}>
          Comprobar
        </button>
      ) : (
        <div className={`draw-exercise-result ${score >= PASS_THRESHOLD ? 'correct' : 'wrong'}`}>
          <p>{score}%</p>
          <button className="primary" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
