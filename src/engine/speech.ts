import type { CharacterTemplate } from '../types/character';

/**
 * Plays a pre-generated audio clip for a character instead of using the
 * browser's Web Speech API. speechSynthesis depends on whatever TTS voices
 * happen to be installed on the user's OS - often nothing at all for
 * Japanese/Arabic/Hebrew - so every character ships its own MP3 (generated
 * once via scripts/generate-audio.py) at /audio/<language>/<id>.mp3. This
 * works identically on any device with zero setup.
 */

const audioCache = new Map<string, HTMLAudioElement>();

function audioPathFor(template: CharacterTemplate): string {
  return `/audio/${template.language}/${template.id}.mp3`;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined';
}

export function playCharacterAudio(template: CharacterTemplate): void {
  if (!isSpeechSupported()) return;
  const path = audioPathFor(template);
  let audio = audioCache.get(path);
  if (!audio) {
    audio = new Audio(path);
    audioCache.set(path, audio);
  } else {
    audio.currentTime = 0;
  }
  audio.play().catch(() => {
    // Autoplay can be blocked before any user gesture on the page - safe to ignore.
  });
}
