import { useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';
import { ReplayButton } from './ReplayButton';
import { useI18n } from '../../i18n/I18nContext';

interface ChoiceExerciseProps {
  mode: 'choose-sound' | 'choose-char';
  prompt: CharacterTemplate;
  options: CharacterTemplate[];
  onAnswered: (correct: boolean) => void;
}

/** "Which sound does this character make?" or "Which character makes this sound?" */
export function ChoiceExercise({ mode, prompt, options, onAnswered }: ChoiceExerciseProps) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (option: CharacterTemplate) => {
    if (picked) return;
    setPicked(option.id);
    onAnswered(option.id === prompt.id);
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">
        {mode === 'choose-sound' ? t('exercise.chooseSound') : t('exercise.chooseChar')}
      </p>

      {mode === 'choose-sound' ? (
        <div className="exercise-prompt-row">
          <ScriptGlyph template={prompt} className="exercise-prompt-glyph" />
          <ReplayButton template={prompt} />
        </div>
      ) : (
        <div className="exercise-prompt-row">
          <div className="exercise-prompt-text">
            {prompt.romanization}
            {prompt.meaning && <span className="exercise-prompt-meaning"> · {prompt.meaning}</span>}
          </div>
          <ReplayButton template={prompt} />
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
