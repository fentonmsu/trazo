import type { CharacterTemplate } from '../types/character';
import { isSpeechSupported, speakCharacter } from '../engine/speech';

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
        // Niqqud marks are shown on a dotted-circle placeholder, not a real
        // letter, so there's nothing meaningful to read aloud - speak the
        // vowel sound (romanization) instead.
        const textToSpeak = template.language === 'niqqud' ? template.romanization : template.char;
        speakCharacter(textToSpeak, template.language);
      }}
    >
      🔊
    </button>
  );
}
