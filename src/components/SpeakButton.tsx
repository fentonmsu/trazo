import type { CharacterTemplate } from '../types/character';
import { isSpeechSupported, playCharacterAudio } from '../engine/speech';

interface SpeakButtonProps {
  template: CharacterTemplate;
  className?: string;
}

export function SpeakButton({ template, className }: SpeakButtonProps) {
  if (!isSpeechSupported()) return null;

  return (
    <button
      type="button"
      className={`speak-button ${className ?? ''}`}
      title={`Escuchar "${template.romanization}"`}
      aria-label={`Escuchar pronunciación de ${template.char}`}
      onClick={(e) => {
        e.stopPropagation();
        playCharacterAudio(template);
      }}
    >
      🔊
    </button>
  );
}
