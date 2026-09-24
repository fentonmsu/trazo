import { useMemo, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';

interface MatchExerciseProps {
  pairs: CharacterTemplate[];
  onAnswer: (correct: boolean) => void;
  onMistake: () => void;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Tap a glyph, then its matching romanization (or vice versa). */
export function MatchExercise({ pairs, onAnswer, onMistake }: MatchExerciseProps) {
  const glyphOrder = useMemo(() => shuffle(pairs), [pairs]);
  const soundOrder = useMemo(() => shuffle(pairs), [pairs]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedGlyph, setSelectedGlyph] = useState<string | null>(null);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const pickGlyph = (id: string) => {
    if (matched.has(id) || shake) return;
    setSelectedGlyph(id);
    if (selectedSound) resolveAttempt(id, selectedSound);
  };

  const pickSound = (id: string) => {
    if (matched.has(id) || shake) return;
    setSelectedSound(id);
    if (selectedGlyph) resolveAttempt(selectedGlyph, id);
  };

  const resolveAttempt = (glyphId: string, soundId: string) => {
    if (glyphId === soundId) {
      const next = new Set(matched);
      next.add(glyphId);
      setMatched(next);
      setSelectedGlyph(null);
      setSelectedSound(null);
      if (next.size === pairs.length) {
        setTimeout(() => onAnswer(true), 400);
      }
    } else {
      setShake(true);
      onMistake();
      setTimeout(() => {
        setShake(false);
        setSelectedGlyph(null);
        setSelectedSound(null);
      }, 600);
    }
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">Toca cada carácter con su sonido</p>
      <div className="match-grid">
        <div className="match-column">
          {glyphOrder.map((item) => (
            <button
              key={item.id}
              className={`match-card ${matched.has(item.id) ? 'matched' : ''} ${selectedGlyph === item.id ? (shake ? 'shake' : 'selected') : ''}`}
              onClick={() => pickGlyph(item.id)}
              disabled={matched.has(item.id)}
            >
              <ScriptGlyph template={item} className="option-glyph" />
            </button>
          ))}
        </div>
        <div className="match-column">
          {soundOrder.map((item) => (
            <button
              key={item.id}
              className={`match-card ${matched.has(item.id) ? 'matched' : ''} ${selectedSound === item.id ? (shake ? 'shake' : 'selected') : ''}`}
              onClick={() => pickSound(item.id)}
              disabled={matched.has(item.id)}
            >
              {item.romanization}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
