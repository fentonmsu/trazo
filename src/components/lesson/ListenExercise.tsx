import { useEffect, useState } from 'react';
import type { CharacterTemplate } from '../../types/character';
import { ScriptGlyph } from '../ScriptGlyph';
import { playCharacterAudio } from '../../engine/speech';
import { ReplayButton } from './ReplayButton';
import { useI18n } from '../../i18n/I18nContext';

interface ListenExerciseProps {
  prompt: CharacterTemplate;
  options: CharacterTemplate[];
  onAnswered: (correct: boolean) => void;
}

/** "Listen to the sound, then pick the character that makes it." */
export function ListenExercise({ prompt, options, onAnswered }: ListenExerciseProps) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    playCharacterAudio(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt.id]);

  const handlePick = (option: CharacterTemplate) => {
    if (picked) return;
    setPicked(option.id);
    onAnswered(option.id === prompt.id);
  };

  return (
    <div className="exercise">
      <p className="exercise-instruction">{t('exercise.listenInstruction')}</p>

      <ReplayButton template={prompt} className="listen-replay" label={t('common.listenAgain')} />

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
              <ScriptGlyph template={option} className="option-glyph" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
