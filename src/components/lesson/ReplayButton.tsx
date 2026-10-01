import type { CharacterTemplate } from '../../types/character';
import { playCharacterAudio } from '../../engine/speech';

interface ReplayButtonProps {
  template: CharacterTemplate;
  className?: string;
  label?: string;
}

/** A small speaker button to (re)play a character's audio from within a lesson exercise. */
export function ReplayButton({ template, className, label }: ReplayButtonProps) {
  return (
    <button
      type="button"
      className={`replay-button ${className ?? ''}`}
      onClick={(e) => {
        e.stopPropagation();
        playCharacterAudio(template);
      }}
      aria-label="Escuchar de nuevo"
      title="Escuchar de nuevo"
    >
      🔊{label ? ` ${label}` : ''}
    </button>
  );
}
