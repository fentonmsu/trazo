import type { CharacterTemplate } from '../../types/character';
import { playCharacterAudio } from '../../engine/speech';
import { useI18n } from '../../i18n/I18nContext';

interface ReplayButtonProps {
  template: CharacterTemplate;
  className?: string;
  label?: string;
}

/** A small speaker button to (re)play a character's audio from within a lesson exercise. */
export function ReplayButton({ template, className, label }: ReplayButtonProps) {
  const { t } = useI18n();
  const listenAgain = t('common.listenAgain');
  return (
    <button
      type="button"
      className={`replay-button ${className ?? ''}`}
      onClick={(e) => {
        e.stopPropagation();
        playCharacterAudio(template);
      }}
      aria-label={listenAgain}
      title={listenAgain}
    >
      🔊{label ? ` ${label}` : ''}
    </button>
  );
}
