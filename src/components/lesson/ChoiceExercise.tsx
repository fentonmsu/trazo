import { useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';

interface ChoiceExerciseProps {
  mode: 'choose-sound' | 'choose-char';
  prompt: CharacterTemplate;
  options: CharacterTemplate[];
  onAnswer: (correct: boolean) => void;
}

/** "Which sound does this character make?" or "Which character makes this sound?" */
export function ChoiceExercise({ mode, prompt, options, onAnswer }: ChoiceExerciseProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (option: CharacterTemplate) => {
    if (picked) return;
    setPicked(option.id);
    const correct = option.id === prompt.id;
    setTimeout(() => onAnswer(correct), 700);
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">
        {mode === 'choose-sound' ? '¿Cómo suena este carácter?' : '¿Cuál es el carácter correcto?'}
      </p>

      {mode === 'choose-sound' ? (
        <ScriptGlyph template={prompt} className="exercise-prompt-glyph" />
      ) : (
        <div className="exercise-prompt-text">
          {prompt.romanization}
          {prompt.meaning && <span className="exercise-prompt-meaning"> · {prompt.meaning}</span>}
        </div>
      )}

      <div className="exercise-options">
        {options.map((option) => {
          const isPicked = picked === option.id;
          const isCorrectOption = option.id === prompt.id;
          const state = picked ? (isCorrectOption ? 'correct' : isPicked ? 'wrong' : '') : '';
          return (
            <button
              key={option.id}
              className={`exercise-option ${state}`}
              onClick={() => handlePick(option)}
              disabled={picked !== null}
            >
              {mode === 'choose-sound' ? option.romanization : <ScriptGlyph template={option} className="option-glyph" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
