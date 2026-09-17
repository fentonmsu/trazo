import { useRef, useState } from 'react';
import type { CharacterTemplate } from '../types/character';
import { DrawingCanvas, type DrawingCanvasHandle } from './DrawingCanvas';
import { SpeakButton } from './SpeakButton';
import { HebrewGlyph } from './HebrewGlyph';
import { scoreDrawing, recognizeCharacter, type DrawingScoreResult, type RecognitionMatch } from '../engine/recognizer';
import { isHebrewScript } from '../data/languages';

interface TrainerViewProps {
  mode: 'practice' | 'recognize';
  target: CharacterTemplate | null;
  candidates: CharacterTemplate[];
  onScored?: (templateId: string, score: number) => void;
}

export function TrainerView({ mode, target, candidates, onScored }: TrainerViewProps) {
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [result, setResult] = useState<DrawingScoreResult | null>(null);
  const [matches, setMatches] = useState<RecognitionMatch[] | null>(null);

  const reset = () => {
    canvasRef.current?.clear();
    setResult(null);
    setMatches(null);
  };

  const handleCheck = () => {
    const strokes = canvasRef.current?.getStrokes() ?? [];
    if (mode === 'practice' && target) {
      const scored = scoreDrawing(strokes, target);
      setResult(scored);
      setMatches(null);
      onScored?.(target.id, scored.score);
    } else {
      const ranked = recognizeCharacter(strokes, candidates, 5);
      setMatches(ranked);
      setResult(null);
    }
  };

  if (mode === 'practice' && !target) {
    return <p className="hint">Elige un carácter de la lista para empezar a practicar.</p>;
  }

  return (
    <div className="trainer">
      {mode === 'practice' && target && (
        <div className="target-card" dir={isHebrewScript(target.language) ? 'rtl' : 'ltr'}>
          {isHebrewScript(target.language) ? (
            <HebrewGlyph char={target.char} className="target-glyph hebrew-glyph" />
          ) : (
            <div className="target-glyph">{target.char}</div>
          )}
          <div className="target-meta">
            <div className="romanization-row">
              {target.romanization}
              <SpeakButton template={target} />
            </div>
            {target.meaning && <div className="meaning">{target.meaning}</div>}
          </div>
        </div>
      )}

      {mode === 'recognize' && (
        <p className="hint">Dibuja cualquier carácter de este alfabeto. La app intentará adivinar cuál escribiste.</p>
      )}

      <div className="canvas-wrap">
        <DrawingCanvas
          ref={canvasRef}
          size={320}
          guideStrokes={mode === 'practice' && showGuide ? target?.strokes : undefined}
          onStrokesChange={() => {
            setResult(null);
            setMatches(null);
          }}
        />
      </div>

      <div className="controls">
        <button onClick={() => canvasRef.current?.undo()}>Deshacer trazo</button>
        <button onClick={reset}>Borrar</button>
        {mode === 'practice' && (
          <label className="guide-toggle">
            <input type="checkbox" checked={showGuide} onChange={(e) => setShowGuide(e.target.checked)} />
            Mostrar guía
          </label>
        )}
        <button className="primary" onClick={handleCheck}>
          {mode === 'practice' ? 'Comprobar' : '¿Qué dibujé?'}
        </button>
      </div>

      {result && (
        <div className={`result ${result.score >= 85 ? 'good' : result.score >= 50 ? 'ok' : 'bad'}`}>
          <div className="score">{result.score}%</div>
          <ul>
            {result.feedback.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {matches && (
        <div className="matches" dir={matches[0] && isHebrewScript(matches[0].template.language) ? 'rtl' : 'ltr'}>
          {matches.length === 0 && <p>Dibuja algo primero.</p>}
          {matches.map((m, i) => (
            <div key={m.template.id} className={`match-row ${i === 0 ? 'top' : ''}`}>
              {isHebrewScript(m.template.language) ? (
                <HebrewGlyph char={m.template.char} className="match-glyph hebrew-glyph" />
              ) : (
                <span className="match-glyph">{m.template.char}</span>
              )}
              <span className="match-name">{m.template.romanization}</span>
              <div className="match-bar-bg">
                <div className="match-bar" style={{ width: `${Math.min(100, Math.max(0, m.confidence))}%` }} />
              </div>
              <span className="match-pct">{Math.round(m.confidence)}%</span>
              <SpeakButton template={m.template} className="match-speak" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
