import type { CharacterTemplate } from '../types/character';
import { isSpeechSupported, playCharacterAudio } from '../engine/speech';
import { useI18n } from '../i18n/I18nContext';

interface SpeakButtonProps {
  template: CharacterTemplate;
  className?: string;
}

export function SpeakButton({ template, className }: SpeakButtonProps) {
  const { t } = useI18n();
  if (!isSpeechSupported()) return null;

  return (
    <button
      type="button"
      className={`speak-button ${className ?? ''}`}
      title={t('speak.title', { romanization: template.romanization })}
      aria-label={t('speak.ariaLabel', { char: template.char })}
      onClick={(e) => {
        e.stopPropagation();
        playCharacterAudio(template);
      }}
    >
      🔊
    </button>
  );
}
