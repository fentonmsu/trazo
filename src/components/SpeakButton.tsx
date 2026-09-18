import { useEffect, useState } from 'react';
import type { CharacterTemplate } from '../types/character';
import { isSpeechSupported, speakCharacter, hasVoiceForLanguage, subscribeToVoices } from '../engine/speech';

interface SpeakButtonProps {
  template: CharacterTemplate;
  className?: string;
}

export function SpeakButton({ template, className }: SpeakButtonProps) {
  // Voices load asynchronously in some browsers, so re-check once they're ready
  // instead of freezing on whatever was available at first render.
  const [, forceRecheck] = useState(0);
  useEffect(() => subscribeToVoices(() => forceRecheck((n) => n + 1)), []);

  if (!isSpeechSupported()) return null;

  const voiceAvailable = hasVoiceForLanguage(template.language);
  const title = voiceAvailable
    ? `Escuchar "${template.romanization}"`
    : 'Tu sistema no tiene una voz instalada para este idioma - el sonido puede no reproducirse';

  return (
    <button
      type="button"
      className={`speak-button ${voiceAvailable ? '' : 'no-voice'} ${className ?? ''}`}
      title={title}
      aria-label={`Escuchar pronunciación de ${template.char}`}
      onClick={(e) => {
        e.stopPropagation();
        speakCharacter(template.speechOverride ?? template.char, template.language);
      }}
    >
      🔊{!voiceAvailable && <span className="no-voice-mark">!</span>}
    </button>
  );
}
